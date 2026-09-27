# The AI connector — Actuarial Notes in Claude and ChatGPT

_Last updated: 2026-09-26_

A reader can connect Actuarial Notes to Claude or ChatGPT and study with the vault as the
assistant's knowledge base. Three layers make that work, and each maps to one part of the
build:

| Layer | What the assistant gets | Where it lives |
|---|---|---|
| **Facts** | Every exam syllabus, concept, source page, study guide and practice question. Each item carries its URL and its fact-check verdict | `quiz/src/lib/knowledgeBase.ts` → `/ai/knowledge-base.json` |
| **Tools** | An MCP server: search and read the notes, get a syllabus, draw practice questions without their answers, and mark answers against the official solutions | `quiz/api/mcp.js` + `quiz/api/_mcp/` |
| **Skills** | How to use the tools well: four MCP prompts (study session, explain a concept, practice quiz, study plan), the server's instructions, and a portable Agent Skill | `quiz/api/_mcp/server.js`, `quiz/skills/actuarial-notes/` |

The endpoint is **`https://quiz.actuarialnotes.com/api/mcp`**: Streamable HTTP, stateless,
read-only, and public. It needs no sign-in, because everything it serves is the published vault.

This is Phase A of `docs/actuarial-agent-product-plan.md` ("grounded Q&A") delivered
through the assistants people already use, rather than a chat surface of our own.

---

## Connecting (for readers)

**Claude** (web, desktop, mobile; Free allows one custom connector)
1. *Customize → Connectors → **+** → Add custom connector*.
2. Paste the URL, leave authentication off, and choose *Add*.
3. In a chat, enable it from **+** → *Connectors*. The four prompts appear in the same menu.

On Team and Enterprise, an owner adds it once under *Organization settings → Connectors*.

**ChatGPT** (Plus, Pro, Business, Enterprise, Edu; on the web)
1. *Settings → Security and login* → turn on **Developer mode**.
2. Open *Plugins*, choose **+**, and create an app for the URL with **No authentication**.
   It shows under *Drafts*.
3. Every tool declares `readOnlyHint`, so ChatGPT runs them without a confirmation prompt.
   `search` and `fetch` follow ChatGPT's connector contract, so deep research and company
   knowledge can use the notes as well.

**The skill.** `https://quiz.actuarialnotes.com/ai/actuarial-notes-skill.zip` is the
`quiz/skills/actuarial-notes/` folder, zipped by the build. Upload it where the assistant takes
skills: Claude's *Customize → Skills*, or ChatGPT's *Skills* (Business, Enterprise, Edu). It
teaches the assistant the tutoring loop and the grounding rules, and it tells the reader how to
add the connector when the connector is missing.

**Developers**
- Claude Code: `claude mcp add --transport http actuarial-notes https://quiz.actuarialnotes.com/api/mcp`
- Claude API (MCP connector, beta `mcp-client-2025-11-20`). It needs both halves:
  ```python
  client.beta.messages.create(
      model="claude-opus-5", max_tokens=4096,
      betas=["mcp-client-2025-11-20"],
      mcp_servers=[{"type": "url", "url": "https://quiz.actuarialnotes.com/api/mcp", "name": "actuarial-notes"}],
      tools=[{"type": "mcp_toolset", "mcp_server_name": "actuarial-notes"}],
      messages=[{"role": "user", "content": "Quiz me on Exam P conditional probability."}],
  )
  ```
- OpenAI Responses API: the tool is
  `{"type": "mcp", "server_label": "actuarial-notes", "server_url": "https://quiz.actuarialnotes.com/api/mcp", "require_approval": "never"}`.

The app's **Settings → AI assistants** section shows the URL with a copy button and links the
skill download (`components/AiConnectorCard.tsx`, addresses from `lib/aiConnector.ts`).
`/llms.txt` points any browsing assistant at both.

---

## The contract: what an assistant may be told

The rules below hold the feature up. Each one is enforced in code and pinned by a test.

1. **Nothing is invented.** Every field is read off the vault through the app's own parsers:
   questions through `parseQuestion`, objectives through `parseExamSyllabus`, readings through
   `extractSourceMaterial`, verdicts through `factCheckBadge`. When an exam page has no weight,
   the tool gives none. When a question names no sitting, the tool doesn't guess one.
2. **The fact check travels with the fact.** Every result carries the verdict the in-app badge
   would show. The server's instructions tell the model what each verdict means. Most pages are
   *Not fact checked*: out of ~2,900 files, only a few dozen are verified. The connector says so
   rather than implying the notes are vetted. "Checked against" sources are printed only after a
   check has actually happened.
3. **A critically flagged question reaches nobody.** `filterQuestions` keeps these questions out
   of every quiz in the app, and the exporter goes further: it leaves them out of the export
   entirely and lists them as `withheld`. `fetch` and `check_answer` explain that such a question
   is withheld, and search can't find it.
4. **Practice never leaks an answer.** `get_practice_questions` returns stems and options only.
   Search snippets come from the stem, never the solution. When `check_answer` can't read the
   student's choice, it returns an error without the key.
5. **Off-syllabus questions stay out of draws**, the same rule the app applies. A sitting filter,
   an id or a search still finds them.
6. **Read-only and public.** No tool changes anything, and no personal data is involved, so the
   server has no auth and no sessions.

---

## Architecture

```
vite build ──► lib/knowledgeBase.ts ──► dist/ai/knowledge-base.json   (~10 MB, static)
                 (the app's parsers)       dist/ai/actuarial-notes-skill.zip
                                           dist/llms.txt

Claude / ChatGPT ──POST──► /api/mcp ──► _mcp/protocol.js   both MCP eras, validation
                                          _mcp/server.js     tools · resources · prompts
                                          _mcp/knowledgeBase.js  index · search · lookups
                                          _mcp/load.js ──GET──► /ai/knowledge-base.json
                                                                (same deployment, cached)
```

**Why the function fetches its own static asset.** Vercel can package the functions in
`quiz/api/` before the app build has written anything, so an export the function imported
might not exist when the function is bundled. Fetched from the deployment's own origin (the
request's Host), the export is always the one that deployment serves. It is fetched once per
warm instance, and the index is cached by URL. A failed load isn't cached, so the next request
retries. Preview deployments sit behind Vercel's deployment protection; when the project has an
automation bypass secret (`VERCEL_AUTOMATION_BYPASS_SECRET`), `load.js` sends it. `MCP_KB_URL`
points the function at any other copy.

**Why it is zero-dependency.** The function is plain ESM with no packages: the same approach
as `lib/xlsx.ts`, and small enough to read end to end. The protocol surface a read-only
stateless server needs is small, and `_mcp/protocol.js` implements it directly. It is checked
against the official clients (see *Testing*).

### Two protocol eras on one endpoint

MCP changed shape in revision **2026-07-28**. The `initialize` handshake is gone. Every request
now carries its version and client capabilities in `params._meta`, mirrors its method and name
into `Mcp-Method` / `Mcp-Name` headers, and gets back a `resultType`. Deployed assistants don't
all move at once, so the server is **dual-era**, as the spec allows (basic/versioning):

| | Legacy (2024-11-05 … 2025-11-25) | Modern (2026-07-28) |
|---|---|---|
| Recognised by | an `initialize`, or no per-request version | `_meta["io.modelcontextprotocol/protocolVersion"]` |
| Handshake | `initialize` → echo the client's version if spoken, else 2025-11-25; no session ever minted | none; optional `server/discover` |
| Headers checked | `MCP-Protocol-Version` (absent = 2025-03-26) | `MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name` (base64 sentinel decoded) must match the body → else **400 / -32020** |
| Results | plain | `resultType: "complete"`, server identity in `_meta`, `ttlMs`/`cacheScope` on lists and reads |
| Unknown method | JSON-RPC error, HTTP 200 | **404 / -32601** |
| Missing resource | -32002 | -32602 |
| Unsupported version | **400 / -32022** with `data.supported` (both eras) | same |
| Change notifications | none advertised | `subscriptions/listen` is acknowledged with an empty filter, then closed gracefully: the export never changes while a deployment is live |

GET and DELETE return 405 in both eras, because there is no standalone stream and no session to
end. JSON-RPC batches are answered only for 2025-03-26 clients, the one revision that had them.

### Tools

All tools are read-only (`readOnlyHint: true`) and deterministic apart from the practice draw.

| Tool | Input | Returns |
|---|---|---|
| `search` | `query`, optional `type`, `exam`, `limit` | ChatGPT's shape, as JSON text: `{"results": [{id, title, url, text, type, exams, fact_check}]}`. BM25 over titles, aliases and bodies; pages outrank questions |
| `fetch` | `id` (from search; a name or exam key also works) | `{id, title, text, url, metadata}` — the document as markdown. A question comes back with its answer |
| `list_exams` | — | The exam table: key, subject, body, how complete, objective / concept / question counts |
| `get_exam` | `exam` ("P", "MAS 1", "Probability"…) | Objectives with weights and concepts (★ keystones), readings with chapters, keystones with their one-line *why*, exam guides, question counts by objective and difficulty |
| `get_concept` | `name` (aliases, abbreviations, plurals, no accents) | The page, where it is examined, keystone status, linked pages, question counts, fact check; suggestions when not found |
| `get_practice_questions` | `exam` or `concept`; optional `objective`, `topic`, `difficulty`, `sitting`, `count` (≤10), `exclude`, `seed` | Stems and options only, plus an app link to take the same set (`/quiz?ids=…`, where progress is tracked) |
| `check_answer` | `question_id`, `answer` or `parts` | The verdict (MC letters however written; numbers compared as the app does, with a "close" for rounding slips), then the official solution and examiner's report. Written parts come back to be graded against the model answer |

A bad argument returns a tool result with `isError: true` and a message the model can act on.
An unknown tool is a protocol error (-32602).

### Resources and prompts

- **Resources**: `actuarialnotes://exams` and one `actuarialnotes://exam/{key}` per exam are
  listed. Templates cover `concept/{name}`, `resource/{name}` and `question/{id}`, and a
  `guide/{…}` URI reads too. All return markdown. `completion/complete` fills exam keys,
  concept names and question ids.
- **Prompts** (the skills in MCP form): `study_session`, `explain_concept`, `practice_quiz`,
  `study_plan`. The session, explain and plan prompts attach the syllabus or concept page as an
  embedded resource, so the model starts grounded.

### Search, and name resolution

`_mcp/knowledgeBase.js` indexes ~3,000 documents in ~0.4 s and answers a query in a few
milliseconds. Exams resolve from any reasonable spelling (`examLookupKey`). Concepts resolve in
this order:

1. the page title;
2. either half of a bracketed title (`PDF` / `Probability Density Function`), when that half
   names only one page;
3. the curated `scripts/concept_aliases.json`;
4. the vault's own unambiguous link text (`[[Independent Events|Independence]]`);
5. a plural or singular form.

Ranking is BM25, softened for coverage and with a bonus for title matches. Unfiltered, a
question weighs 0.55 of a page: a page that explains something should beat a question that
merely uses the same words.

---

## Operating it

| Variable | Default | Purpose |
|---|---|---|
| `MCP_KB_URL` | this deployment's `/ai/knowledge-base.json` | read the export from elsewhere |
| `MCP_PUBLIC_SITE_URL` | `https://quiz.actuarialnotes.com` | the site named in the server's identity and icon |
| `MCP_ALLOWED_ORIGINS` | any | comma-separated browser origins allowed to call it (server-to-server calls carry no Origin) |
| `MCP_RATE_LIMIT` | 600 | requests per minute per client address, per instance; `0` turns it off |

The rate limit is generous on purpose. Claude and ChatGPT reach a connector from shared
addresses, so a tight per-address limit would throttle every user of the same assistant at once.
Use Vercel's firewall for anything stricter.

**Testing locally**
```bash
cd quiz && npm run build && npm run mcp:local     # http://localhost:8787/api/mcp
npx @modelcontextprotocol/inspector              # Streamable HTTP, that URL
```
`scripts/mcp-local.mjs` serves `dist/` beside the real handler, so the handler reads the export
from its own origin exactly as it does when deployed. It was verified with the official
TypeScript clients in all four modes: `@modelcontextprotocol/sdk` 1.x (legacy, negotiates
2025-11-25), and `@modelcontextprotocol/client` 2.x in legacy mode, in `auto` (probes
`server/discover`, goes modern) and pinned to 2026-07-28.

**Tests**
- `lib/knowledgeBase.test.ts`: the exporter, plus the real vault (every catalogue exam, every
  parsed question accounted for, unique ids, paren-free https URLs, aliases that resolve).
- `lib/mcpProtocol.test.ts`: both eras and every rejection a client relies on.
- `lib/mcpServer.test.ts`: every tool, resource and prompt over a fixture built by the real
  exporter; the mirrors below; and a sweep of the real vault (every syllabus, every page, a
  question from every bank).
- `lib/mcpEndpoint.test.ts`: the Vercel handler (CORS, origin policy, rate limit, body parsing)
  and the loader (host handling, caching, failure and retry).

---

## Changing it

- **Adding a tool.** Add it to `TOOLS` in `_mcp/server.js` with a `title`, a `description` that
  says *when* to use it, a JSON-Schema `inputSchema`, read-only `annotations` and a `run`. Test it
  in `mcpServer.test.ts`, then mention it in the skill if it changes the tutoring loop. Tool names
  are part of the contract with every connected assistant, so rename nothing lightly.
  `search` / `fetch` must keep ChatGPT's exact shapes.
- **Changing the export's shape.** Bump `KNOWLEDGE_BASE_VERSION` (`lib/knowledgeBase.ts`) and
  `SUPPORTED_KB_VERSION` (`_mcp/knowledgeBase.js`) together. The endpoint refuses an export whose
  version it doesn't know, rather than misreading it.
- **The mirrors.** The endpoint is plain JS and can't import the app's TypeScript, so a few
  helpers are duplicated: `normalizeTerm`, `objectiveKey`, `normalizeAnswerText`, the site URL
  and the export path. `mcpServer.test.ts` compares each one against its original, so drift
  fails CI.
- **A new content directory.** Add it to `readKnowledgeBaseSources`, the one list of what an
  assistant can read.
- **The skill.** Edit `quiz/skills/actuarial-notes/SKILL.md`. The build re-zips it. Readers keep
  whatever copy they uploaded, so keep it about *how to use the tools*, and let facts come from
  the tools.

## Not yet

- **Personal progress.** With OAuth (Supabase can act as the authorization server), the tools
  could read a signed-in reader's mastery and study plan, and `check_answer` could record
  attempts. This needs `cacheScope: "private"` and per-user rate limits, and it changes the
  "public, read-only" contract above, so it should be a deliberate step.
- **Directory listings.** A public ChatGPT app and a Claude connector-directory entry would
  put the connector in front of readers who never visit Settings. Both need a review submission.
- **Calculators.** The distribution simulators' tested maths (`lib/distributionMath.ts`) would
  make a good `distribution` tool, grounded in the exam parameterizations. Today it is
  TypeScript the function can't import.
