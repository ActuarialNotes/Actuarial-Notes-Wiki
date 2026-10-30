"""How the agents talk to a model: headless Claude Code, or a script (tests).

`ClaudeCodeSession` runs `claude -p` as one persistent stream-json process per
learner session, with every way out of the conversation switched off:

  --tools ""                       no built-in tools (no Read, Bash, WebSearch …)
  --strict-mcp-config + empty set  no MCP servers (the Actuarial Notes connector's
                                   `check_answer` would hand over the key)
  --safe-mode                      no CLAUDE.md, skills, plugins, hooks, agents
  --disable-slash-commands         no skills by name either
  --no-session-persistence         nothing written to resume later
  cwd = an empty temp directory    nothing in reach even if a tool slipped in

and it fails closed: the `init` event Claude Code emits lists the tools and MCP
servers the model was given, and the session is killed with an
`IsolationError` unless both lists are empty. The same applies to the one-shot
calls the grading agent, the auditor and the diagnostician make.
"""

from __future__ import annotations

import json
import os
import queue
import shutil
import subprocess
import tempfile
import threading
from dataclasses import dataclass
from typing import Callable, Protocol

ISOLATION_ARGS = [
    "--tools", "",
    "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
    "--disable-slash-commands",
    "--no-session-persistence",
    "--safe-mode",
]
# Environment that would point a child at extra CLAUDE.md directories.
SCRUBBED_ENV = ("CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD",)


class IsolationError(RuntimeError):
    """Something that must not reach the learner was about to, or the model was
    given a capability (a tool, an MCP server) it must not have."""


class BackendError(RuntimeError):
    pass


@dataclass
class Usage:
    cost_usd: float = 0.0
    turns: int = 0
    input_tokens: int = 0
    output_tokens: int = 0

    def add(self, other: "Usage") -> None:
        self.cost_usd += other.cost_usd
        self.turns += other.turns
        self.input_tokens += other.input_tokens
        self.output_tokens += other.output_tokens


class ChatSession(Protocol):
    usage: Usage

    def start(self, system_prompt: str) -> None: ...
    def send(self, text: str) -> str: ...
    def close(self) -> None: ...


OneShot = Callable[[str, str], str]   # (system prompt, user prompt) → reply text


def check_init_event(ev: dict) -> None:
    tools = ev.get("tools")
    mcp = ev.get("mcp_servers")
    if tools is None or mcp is None:
        raise IsolationError("Claude Code init event did not report its tools / MCP servers")
    if tools or mcp:
        raise IsolationError(f"model was given capabilities: tools={tools} mcp_servers={mcp}")


def _env() -> dict:
    env = dict(os.environ)
    for k in SCRUBBED_ENV:
        env.pop(k, None)
    return env


def _usage_from(ev: dict) -> Usage:
    u = ev.get("usage") or {}
    return Usage(
        turns=1,
        input_tokens=int(u.get("input_tokens") or 0) + int(u.get("cache_read_input_tokens") or 0)
        + int(u.get("cache_creation_input_tokens") or 0),
        output_tokens=int(u.get("output_tokens") or 0),
    )


class ClaudeCodeSession:
    """One learner session: a persistent headless Claude Code conversation."""

    def __init__(self, model: str | None = None, effort: str | None = None, timeout: float = 900,
                 claude_bin: str = "claude"):
        self.model = model
        self.effort = effort
        self.timeout = timeout
        self.claude_bin = claude_bin
        self.usage = Usage()
        self._proc: subprocess.Popen | None = None
        self._reader: threading.Thread | None = None
        self._lines: queue.Queue = queue.Queue()
        self._cwd: str | None = None
        self._last_cost = 0.0
        self._init_checked = False

    def command(self, system_prompt: str) -> list[str]:
        cmd = [self.claude_bin, "-p", "--input-format", "stream-json", "--output-format", "stream-json",
               "--verbose", *ISOLATION_ARGS, "--system-prompt", system_prompt]
        if self.model:
            cmd += ["--model", self.model]
        if self.effort:
            cmd += ["--effort", self.effort]
        return cmd

    def start(self, system_prompt: str) -> None:
        if not shutil.which(self.claude_bin):
            raise BackendError(f"`{self.claude_bin}` not found on PATH — the learner runs on Claude Code")
        self._cwd = tempfile.mkdtemp(prefix="learner-sandbox-")
        self._proc = subprocess.Popen(self.command(system_prompt), stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                      stderr=subprocess.DEVNULL, text=True, env=_env(), cwd=self._cwd, bufsize=1)
        self._reader = threading.Thread(target=self._pump, daemon=True)
        self._reader.start()

    def _pump(self) -> None:
        assert self._proc and self._proc.stdout
        for line in self._proc.stdout:
            self._lines.put(line)
        self._lines.put(None)

    def send(self, text: str) -> str:
        if not self._proc or not self._proc.stdin:
            raise BackendError("session not started")
        msg = {"type": "user", "message": {"role": "user", "content": text}}
        self._proc.stdin.write(json.dumps(msg) + "\n")
        self._proc.stdin.flush()
        while True:
            try:
                line = self._lines.get(timeout=self.timeout)
            except queue.Empty:
                self.close()
                raise BackendError(f"no reply from Claude Code within {self.timeout:.0f}s")
            if line is None:
                raise BackendError("Claude Code exited mid-conversation")
            try:
                ev = json.loads(line)
            except json.JSONDecodeError:
                continue
            if ev.get("type") == "system" and ev.get("subtype") == "init":
                try:
                    check_init_event(ev)
                except IsolationError:
                    self.close()
                    raise
                self._init_checked = True
            elif ev.get("type") == "assistant":
                for block in (ev.get("message") or {}).get("content") or []:
                    if isinstance(block, dict) and block.get("type") in ("tool_use", "server_tool_use"):
                        self.close()
                        raise IsolationError(f"model attempted a tool call: {block.get('name')}")
            elif ev.get("type") == "result":
                if not self._init_checked:
                    self.close()
                    raise IsolationError("Claude Code replied without an init event to verify")
                u = _usage_from(ev)
                cost = float(ev.get("total_cost_usd") or 0.0)
                u.cost_usd = max(0.0, cost - self._last_cost)
                self._last_cost = max(self._last_cost, cost)
                self.usage.add(u)
                if ev.get("is_error"):
                    raise BackendError(str(ev.get("result") or ev.get("subtype")))
                return str(ev.get("result") or "")

    def close(self) -> None:
        if self._proc:
            try:
                if self._proc.stdin:
                    self._proc.stdin.close()
                self._proc.wait(timeout=20)
            except Exception:
                self._proc.kill()
                self._proc.wait()
            if self._reader:
                self._reader.join(timeout=5)
            if self._proc.stdout:
                self._proc.stdout.close()
            self._proc = None
        if self._cwd:
            shutil.rmtree(self._cwd, ignore_errors=True)
            self._cwd = None


class ClaudeCodeOneShot:
    """A single isolated question-and-answer call (grading agent, auditor, analyst)."""

    def __init__(self, model: str | None = None, effort: str | None = None, timeout: float = 900,
                 claude_bin: str = "claude"):
        self.model, self.effort, self.timeout, self.claude_bin = model, effort, timeout, claude_bin
        self.usage = Usage()

    def __call__(self, system_prompt: str, prompt: str) -> str:
        s = ClaudeCodeSession(self.model, self.effort, self.timeout, self.claude_bin)
        s.start(system_prompt)
        try:
            return s.send(prompt)
        finally:
            s.close()
            self.usage.add(s.usage)


class ClaudeCodeConversation:
    """Successive questions in one headless conversation: the first call starts it with its system prompt, and
    each later call is a follow-up turn. What the first turn sent (a locator's study pages) is then read back
    from the prompt cache rather than sent and paid for again. `close()` ends it."""

    continues = True

    def __init__(self, model: str | None = None, effort: str | None = None, timeout: float = 900,
                 claude_bin: str = "claude"):
        self.model, self.effort, self.timeout, self.claude_bin = model, effort, timeout, claude_bin
        self.usage = Usage()
        self._session: ClaudeCodeSession | None = None
        self._system: str | None = None

    def __call__(self, system_prompt: str, prompt: str) -> str:
        if self._session is None:
            self._session = ClaudeCodeSession(self.model, self.effort, self.timeout, self.claude_bin)
            self._session.start(system_prompt)
            self._system = system_prompt
        elif system_prompt != self._system:
            raise BackendError("a conversation keeps the system prompt it started with")
        return self._session.send(prompt)

    def close(self) -> None:
        """End the conversation; its usage is counted here, once."""
        if self._session is not None:
            self._session.close()
            self.usage.add(self._session.usage)
            self._session = None


class ScriptedSession:
    """A stand-in learner model for tests and `--backend scripted` dry runs.

    `policy(transcript)` gets the system prompt and every message so far and
    returns the next reply. `sent` records everything sent to the "model"."""

    def __init__(self, policy: Callable[[list[str]], str]):
        self.policy = policy
        self.usage = Usage()
        self.sent: list[str] = []

    def start(self, system_prompt: str) -> None:
        self.sent = [system_prompt]

    def send(self, text: str) -> str:
        self.sent.append(text)
        self.usage.turns += 1
        return self.policy(self.sent)

    def close(self) -> None:
        pass


class ScriptedOneShot:
    def __init__(self, fn: Callable[[str, str], str]):
        self.fn = fn
        self.usage = Usage()
        self.calls: list[tuple[str, str]] = []

    def __call__(self, system_prompt: str, prompt: str) -> str:
        self.calls.append((system_prompt, prompt))
        self.usage.turns += 1
        return self.fn(system_prompt, prompt)


def extract_json(text: str):
    """The first JSON object in a reply (bare, or inside a ``` fence)."""
    dec = json.JSONDecoder()
    i = text.find("{")
    while i != -1:
        try:
            obj, _ = dec.raw_decode(text[i:])
            if isinstance(obj, dict):
                return obj
        except json.JSONDecodeError:
            pass
        i = text.find("{", i + 1)
    raise ValueError("no JSON object in reply")
