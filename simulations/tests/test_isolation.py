"""The learner never sees a solution: proven at every layer it could leak through.

1. The loader: every question in every bank, turned into what the learner
   gets, carries none of its own solution text, answer key or frontmatter —
   and an adversarial file (odd headings, comments, frontmatter sources) is
   stripped the same way.
2. The pages: only study pages can be opened, and none carries frontmatter.
3. A whole simulated run, recorded byte for byte: under `feedback: score` no
   solution text is ever sent; under `feedback: solution` a question's
   solution is sent only after the learner has committed its answer.
4. The guard: it blocks a leak the loader lets through.
5. The backend: Claude Code is launched with no tools, no MCP and no project
   context, and a session that reports any capability is refused.
6. The module boundary: the learner module can't reach the answer key.
"""

from __future__ import annotations

import ast
import json
import os
import shutil
import stat
import sys
import tempfile
import textwrap
import unittest
from dataclasses import asdict

SIM_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, SIM_DIR)

import learner_sim  # noqa: E402
from learner_sim.backends import (ISOLATION_ARGS, ClaudeCodeSession, IsolationError, ScriptedSession,  # noqa: E402
                                  check_init_event)
from learner_sim.content_loader import ContentLoader  # noqa: E402
from learner_sim.control import run_control  # noqa: E402
from learner_sim.exams import resolve_exam  # noqa: E402
from learner_sim.guard import ContextGuard, SolutionIndex  # noqa: E402
from learner_sim.profiles import profile_from_dict  # noqa: E402
from learner_sim.scripted import ScriptedPolicy  # noqa: E402
from learner_sim.session import RunConfig, SimulationRun  # noqa: E402
from learner_sim.textmatch import shingles, tokens  # noqa: E402
from learner_sim.vault_parse import load_bank, parse_question_text  # noqa: E402

ROOT = learner_sim.REPO_ROOT
BANKS = sorted(d for d in os.listdir(os.path.join(ROOT, "questions")) if os.path.isdir(os.path.join(ROOT, "questions", d)))
FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "adversarial.md")

EXPECTED_QUESTION_FIELDS = {"qid", "exam_title", "sitting", "points", "kind", "stem", "option_keys", "parts",
                            "has_figure"}
EXPECTED_PART_FIELDS = {"label", "points", "stem", "option_keys"}

_FM_LOADER: ContentLoader | None = None


def fm_loader() -> ContentLoader:
    global _FM_LOADER
    if _FM_LOADER is None:
        _FM_LOADER = ContentLoader(resolve_exam("FM"))
    return _FM_LOADER


def learner_view(lq) -> str:
    # The dump's escaped newlines become spaces: `tokens` drops a backslash and the
    # letters after it as a LaTeX command, so "\\n\\niii. Fixed" would lose its "iii".
    return lq.render() + "\n" + json.dumps(asdict(lq)).replace("\\n", " ")


class LoaderStripsSolutions(unittest.TestCase):
    def test_learner_question_has_only_allowlisted_fields(self):
        from learner_sim.content_loader import ALLOWED_PART_FIELDS, ALLOWED_QUESTION_FIELDS
        self.assertEqual(ALLOWED_QUESTION_FIELDS, EXPECTED_QUESTION_FIELDS,
                         "a field was added to LearnerQuestion — make sure it can't carry a solution, then update this test")
        self.assertEqual(ALLOWED_PART_FIELDS, EXPECTED_PART_FIELDS)

    def test_no_question_in_any_bank_leaks_its_solution(self):
        loader = fm_loader()
        failures = []
        checked = 0
        for bank in BANKS:
            for sid, q in load_bank(ROOT, bank).items():
                lq = loader.learner_question(q, "Q1")
                view = learner_view(lq)
                # A solution 8-word run that is new information: not a 7-word run of
                # the stem plus one word (the stem's last sentence + the next block).
                stem7 = set()
                for t in q.stem_texts():
                    stem7 |= shingles(t, 7)
                forbidden = {sh for t in q.solution_texts() for sh in shingles(t)
                             if sh[:-1] not in stem7 and sh[1:] not in stem7}
                leaked = shingles(view) & forbidden
                if leaked:
                    failures.append(f"{q.path}: {' '.join(next(iter(leaked)))}")
                stem_tokens = " ".join(tokens(" ".join(q.stem_texts())))
                view_tokens = " ".join(tokens(view))
                for ans in [q.answer_text] + [p.answer_text for p in q.parts]:
                    at = " ".join(tokens(ans))
                    if len(at) >= 4 and at not in stem_tokens and at in view_tokens:
                        failures.append(f"{q.path}: answer text '{at[:60]}' visible")
                for marker in ("verification:", "content_hash", "Examiner Report", "### Explanation",
                               "## Explanation", "Examiner's Report", "learning_objective", "wiki_link"):
                    if marker in view:
                        failures.append(f"{q.path}: '{marker}' visible")
                self.assertFalse(hasattr(lq, "answer"))
                checked += 1
        self.assertGreater(checked, 2000)
        self.assertEqual(failures, [], f"{len(failures)} leaks, e.g. {failures[:5]}")

    def test_adversarial_question_is_stripped(self):
        with open(FIXTURE, encoding="utf-8") as fh:
            q = parse_question_text(fh.read(), "fixtures/adversarial.md", "fixture")
        lq = fm_loader().learner_question(q, "Q9")
        view = learner_view(lq)
        for secret in ("sapphire", "cobalt", "purple elephants", "tangerine", "silver octopuses", "amber kangaroos",
                       "zebras", "Solution", "Answer\n", "Sample Answer", "verification"):
            self.assertNotIn(secret, view)
        self.assertIn("Fixed effects", view, "a heading inside a code fence is stem, not a section")
        self.assertIn("[figure:", view)
        self.assertEqual([p.label for p in lq.parts], ["a", "b"])
        self.assertIn("tangerine", q.parts[0].answer_text, "a level-2 Answer heading after a solution stays solution")


class OnlyStudyPagesOpen(unittest.TestCase):
    def test_allowlisted_paths_only(self):
        loader = fm_loader()
        for title, (rel, kind) in loader.pages.items():
            top = rel.split("/")[0]
            self.assertTrue(top in ("Concepts", "Guides") or (rel.startswith("Exam ") and "/" not in rel), rel)
            if top == "Guides" and rel.count("/") == 2:
                self.assertTrue(rel.startswith(f"Guides/{loader.exam.title}/"), "another exam's tips")

    def test_questions_resources_and_logs_cannot_be_opened(self):
        loader = fm_loader()
        book = sorted(os.listdir(os.path.join(ROOT, "Resources", "Books")))[0][:-3]
        for req in ("fm-001", "questions/exam-fm/fm-001", book, ".verify/Concepts/Force of Interest",
                    "Bayes Theorem.md/../../questions/exam-p/p-001"):
            self.assertIsNone(loader.page(req), req)

    def test_no_page_shows_frontmatter(self):
        loader = fm_loader()
        for title in loader.pages:
            for mode in ("full", "skim"):
                text = loader.page(title, mode).text
                self.assertNotIn("content_hash", text, title)
                self.assertNotIn("last_checked_by", text, title)


def _profile(**kw):
    base = {"name": "Test learner", "exam": "FM", "time_budget": {"steps_per_session": 18, "questions_per_session": 4},
            "traits": {"skim_tendency": 0.0}, "seed": 3}
    base.update(kw)
    return profile_from_dict(base)


class RecordingFactory:
    def __init__(self):
        self.sessions: list[ScriptedSession] = []

    def __call__(self):
        s = ScriptedSession(ScriptedPolicy())
        self.sessions.append(s)
        return s

    def messages(self) -> list[str]:
        return [m for s in self.sessions for m in s.sent]


class WholeRunNeverLeaks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.exam = resolve_exam("FM")
        cls.loader = fm_loader()
        cls.bank = load_bank(ROOT, cls.exam.bank)
        cls.index = SolutionIndex(cls.bank.values(), cls.loader.allowed_texts().values())
        cls.tmp = tempfile.mkdtemp(prefix="learner-test-")

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def _run(self, feedback: str, name: str):
        factory = RecordingFactory()
        out = os.path.join(self.tmp, name)
        run = SimulationRun(_profile(feedback=feedback), self.exam, out, RunConfig(sessions=2), factory,
                            loader=self.loader, bank=self.bank)
        run.run()
        with open(os.path.join(out, "state.json")) as fh:
            qids = {v: k for k, v in json.load(fh)["qids"].items()}
        return factory, qids

    def test_score_mode_sends_no_solution_text_at_all(self):
        factory, qids = self._run("score", "score")
        self.assertGreaterEqual(len(qids), 4, "the run attempted questions")
        for msg in factory.messages():
            self.assertEqual(self.index.hits(msg, set()), {}, msg[:300])
            self.assertNotIn("Official solution", msg)
            self.assertNotIn("Answer key", msg)

    def test_solution_mode_releases_a_solution_only_after_its_attempt(self):
        factory, qids = self._run("solution", "solution")
        released: set[str] = set()
        shown = set()
        for msg in factory.messages():
            if msg.startswith("Result for Q"):
                qid = msg.split()[2].rstrip(":")
                released.add(qids[qid])
                if self.index.hits(msg, set()).get(qids[qid]):
                    shown.add(qids[qid])
            self.assertEqual(self.index.hits(msg, released), {}, msg[:300])
        self.assertTrue(shown, "positive control: released solutions do reach the learner and are detectable")

    def test_control_learner_is_never_shown_a_solution_or_a_result(self):
        _, qids = self._run("solution", "control")
        run = SimulationRun(_profile(feedback="solution"), self.exam, os.path.join(self.tmp, "control"),
                            RunConfig(sessions=0), RecordingFactory(), loader=self.loader, bank=self.bank)
        factory = RecordingFactory()
        asked = run_control(run, factory)
        self.assertEqual(asked, len(qids), "every question the learner attempted goes to the control")
        msgs = factory.messages()
        self.assertNotIn("notes", msgs[0].split("## The knowledge boundary")[1].split("## How you act")[0]
                         .replace("no notes", ""))
        for msg in msgs:
            self.assertEqual(self.index.hits(msg, set()), {}, msg[:300])
            for told in ("Official solution", "Answer key", "Result for", "correct"):
                self.assertNotIn(told, msg)

    def test_guard_blocks_a_leaky_loader(self):
        loader = ContentLoader(self.exam)
        original = loader.learner_question

        def leaky(raw, qid):
            lq = original(raw, qid)
            return lq.__class__(**{**asdict(lq), "parts": lq.parts, "stem": lq.stem + "\n" + raw.explanation})
        loader.learner_question = leaky
        run = SimulationRun(_profile(), self.exam, os.path.join(self.tmp, "leaky"), RunConfig(sessions=1),
                            RecordingFactory(), loader=loader, bank=self.bank)
        with self.assertRaises(IsolationError):
            run.run()

    def test_guard_releases_only_what_was_answered(self):
        q = self.bank["fm-001"]
        guard = ContextGuard(ScriptedSession(lambda t: "{}"), self.index)
        guard.start("persona")
        with self.assertRaises(IsolationError):
            guard.send("Here is a hint: " + q.explanation)
        guard.release("fm-001")
        guard.send("Official solution: " + q.explanation)


FAKE_CLAUDE = textwrap.dedent('''\
    #!/usr/bin/env python3
    import json, os, sys
    tools = json.loads(os.environ.get("FAKE_TOOLS", "[]"))
    tool_use = os.environ.get("FAKE_TOOL_USE") == "1"
    for line in sys.stdin:
        print(json.dumps({"type": "system", "subtype": "init", "tools": tools, "mcp_servers": []}), flush=True)
        if tool_use:
            print(json.dumps({"type": "assistant", "message": {"content": [{"type": "tool_use", "name": "Read"}]}}), flush=True)
        report = {"argv": sys.argv[1:], "cwd_entries": os.listdir("."),
                  "claude_md_env": "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD" in os.environ}
        print(json.dumps({"type": "result", "result": json.dumps(report), "total_cost_usd": 0.01,
                          "usage": {"input_tokens": 1, "output_tokens": 1}}), flush=True)
''')


class BackendIsolation(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.mkdtemp(prefix="fake-claude-")
        self.bin = os.path.join(self.dir, "claude")
        with open(self.bin, "w") as fh:
            fh.write(FAKE_CLAUDE)
        os.chmod(self.bin, os.stat(self.bin).st_mode | stat.S_IEXEC)
        os.environ["CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD"] = "1"

    def tearDown(self):
        shutil.rmtree(self.dir, ignore_errors=True)
        for k in ("FAKE_TOOLS", "FAKE_TOOL_USE", "CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD"):
            os.environ.pop(k, None)

    def test_launch_flags_and_sandbox(self):
        s = ClaudeCodeSession(claude_bin=self.bin, timeout=30)
        s.start("persona")
        report = json.loads(s.send("hello"))
        s.close()
        argv = report["argv"]
        i = argv.index("--tools")
        self.assertEqual(argv[i + 1], "", "built-in tools switched off")
        for flag in ("--strict-mcp-config", "--safe-mode", "--disable-slash-commands", "--no-session-persistence"):
            self.assertIn(flag, argv)
        self.assertIn('{"mcpServers":{}}', argv)
        self.assertEqual(report["cwd_entries"], [], "runs in an empty directory")
        self.assertFalse(report["claude_md_env"], "no extra CLAUDE.md directories")
        for arg in ISOLATION_ARGS:
            self.assertIn(arg, argv)

    def test_refuses_a_session_with_tools(self):
        os.environ["FAKE_TOOLS"] = '["Read", "WebSearch"]'
        s = ClaudeCodeSession(claude_bin=self.bin, timeout=30)
        s.start("persona")
        with self.assertRaises(IsolationError):
            s.send("hello")

    def test_refuses_a_tool_call(self):
        os.environ["FAKE_TOOL_USE"] = "1"
        s = ClaudeCodeSession(claude_bin=self.bin, timeout=30)
        s.start("persona")
        with self.assertRaises(IsolationError):
            s.send("hello")

    def test_init_check(self):
        check_init_event({"tools": [], "mcp_servers": []})
        for bad in ({"tools": ["Bash"], "mcp_servers": []}, {"tools": [], "mcp_servers": [{"name": "x"}]}, {}):
            with self.assertRaises(IsolationError):
                check_init_event(bad)


class ModuleBoundary(unittest.TestCase):
    def test_learner_module_cannot_reach_the_key(self):
        path = os.path.join(SIM_DIR, "learner_sim", "learner.py")
        with open(path) as fh:
            tree = ast.parse(fh.read())
        imported = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom):
                imported.add((node.module or "").split(".")[-1])
                imported |= {a.name for a in node.names}
            elif isinstance(node, ast.Import):
                imported |= {a.name.split(".")[-1] for a in node.names}
            elif isinstance(node, ast.Call) and getattr(node.func, "id", None) == "open":
                self.fail("learner.py opens a file")
        for forbidden in ("vault_parse", "grader", "content_loader", "session", "analysis", "diagnostician",
                          "Grader", "RawQuestion", "load_bank", "os", "pathlib"):
            self.assertNotIn(forbidden, imported)


if __name__ == "__main__":
    unittest.main()
