# INS-ActBench, and evaluating the connector, tools and skill against it

Proposal, 2026-10-30 (roadmap §3.4, **A8**). It reviews INS-ActBench (Chen, Lin & Xu, Fudan
University: [arXiv 2607.24273](https://arxiv.org/abs/2607.24273), code at
[FDU-INS/INS-ActBench](https://github.com/FDU-INS/INS-ActBench), read at commit `4afea9b`) and
proposes how it can be used to measure what the vault gives an assistant. Today nothing measures
that. The MCP tests (`docs/ai-connector.md`, *Tests*) prove the connector answers correctly; the
simulated learner and the answerability check (`docs/simulated-learner.md`) measure the pages for
a *student*. No test asks whether Claude, with the connector and the skill, answers actuarial
questions better than Claude without them.

## 1. What INS-ActBench is

There are 12,050 items, taken from the public exams and sample questions of 16 actuarial
associations. The paper groups SOA and CAS together as "SOA" (2,728 items, 22.6%), then IFoA
(2,129), then "Others" (7,193). The Others group includes the CIA, CAA, IAJ, IAI, DAV, ASSA and the
Actuaries Institute. Items were restructured, not copied: reworded, options shuffled, written
answers turned into objective items. Items more than five years old were filtered out. Every item
was checked by a person, and 9.65% were revised.

| Part | Format | Items | Scoring |
|---|---|---:|---|
| **Know**: PS, EF, AMA, LI, NLI, AMO | single-answer MC, two-shot | 9,749 | accuracy. Each item is tagged numerical or non-numerical |
| **Case**: CA | multiple-select over case material averaging 58K tokens (175K max), plus a ≤ 32K short version | 1,149 | exact set match. Partial credit is reported as a secondary score |
| **Practice**: SS | write openpyxl Python that fills a workbook's answer cells | 636 | each answer cell checked against a reference value, within a relative tolerance |
| **Practice**: R | write base R (no packages), run it in Docker, print the numbers | 516 | the printed numbers checked against the reference values, 0.2% relative |

The headline total is the mean of the three parts, so Know's size does not swamp it.

Headline results (Table 3):

| | Know | Case | Practice | Total |
|---|---:|---:|---:|---:|
| GPT-5.5 | 93.3 | 56.3 | 69.2 | 72.9 |
| Gemini-3.1-Pro | 94.5 | 55.5 | 67.9 | 72.7 |
| Claude-Opus-4.7 | 81.1 | 43.3 | 65.4 | 63.3 |
| Human experts (300 items, offline with textbooks) | 84.4 | 79.6 | 84.9 | 83.0 |

What the paper finds:

1. **Knowledge is close to solved for frontier models; case reasoning and practical work are
   not.** On Know the models beat the human panel. On Case and Practice they are 25–35 points
   behind it.
2. **Claude is weak on numerical Know.** Opus 4.7 scores 79.8 on numerical items and 90.3 on
   non-numerical ones, a −10.5 gap. The other frontier models show none (Table 4).
3. **Case errors are mostly omissions.** Under partial credit every model's Case score rises
   sharply: models miss conditions, they rarely pick wrong ones (§C.2).
4. **Practice errors are about the actuarial method, not about calling the tool.** Tool-call
   failures are a small share. Most errors are a wrong model, formula or derivation (Figure 3).
5. **Jurisdiction matters most where knowledge stops being standard.** The SOA/IFoA/Others spread
   is small on Know and large on Case and Practice (Table 5).
6. **Contamination checks** (13-gram web search, rebuilding the options from memory, a time split
   on the May 2026 sitting) find no clear memorization effect on Know (Appendix D).

## 2. Can we use it? Four constraints

1. **The data is not released.** The repo holds the runner, prompts, scorer and Docker image, but
   no items. `run.py --test-data /path/to/LV1.1.json` expects a file that is not published, and
   neither the paper nor the README links to a dataset. Using the benchmark means writing to the
   corresponding author (xianxu@fudan.edu.cn) for access and terms.
2. **There is no licence.** The repo has no LICENSE file, so its code cannot be vendored. The
   items are reworded copies of the SOA's, CAS's, IFoA's and twelve other bodies' exam
   materials, so their terms are the bodies' as well as the authors'. The vault's rule applies:
   **never cite an unauthorized copy** (`docs/content-plan.md`). An INS-ActBench item is never
   imported into `questions/`, never used as a tool fixture, never quoted on a page, and never
   committed to the repo. At most we use it as a private, held-out yardstick, with the run
   reports holding scores and item ids only.
3. **It overlaps our bank, and `fetch` leaks answers.** Most SOA/CAS items will be rewordings of
   papers already in `questions/` (P, FM, FAM, SRM, MAS-I/II, ASTAM, ALTAM, 5–9). `fetch` returns
   a question *with its answer*, and `search` ranks questions. An assistant with the connector
   could therefore look up the key instead of reasoning. Measuring the connector without
   measuring that leak needs an eval mode that serves no questions (§4.2).
4. **Its published scores are not a baseline for us.** `config.yaml` sends Claude, GPT and Gemini
   through a third-party reseller (`api.kr777.top`), with thinking settings passed through it, and
   asks for one bare letter as output. Claude's 81% may partly come from that setup. We run our
   own control arm, the same model with nothing added, and compare against that.

A code discrepancy, worth knowing before trusting the Practice scores: the paper says Spreadsheet
answers are checked within 0.2%, but `bench_runner/spreadsheet.py` defaults `_numeric_match` to
`tolerance=0.01` (1%), and the call that scores each cell does not override it. Our
`check_answer` also counts anything within 1% as *close*, so a 0.2% rule would be stricter than
the app's.

## 3. Where it maps onto what we have

| INS-ActBench | Ours | Fit |
|---|---|---|
| Know: PS, EF | Exam P, FM (+ SRM, MAS-I) banks, concept pages | strong: our most complete exams (`ready`) |
| Know: NLI, AMO | MAS-I/II, Exams 5–9, the reserving, ratemaking and credibility tools | strong for P&C. AMO partly |
| Know: LI, AMA | FAM, ALTAM, ASTAM: pages `development`, banks `beta` | weak: our life content is thin, so expect little or no lift |
| Know: numerical (the −10.5 gap) | `run_tool`: 37 calculators, each tested against published work | **this is where the connector should help Claude most** |
| Case | Exam 5/6C/7 written parts; PCPA; Cowork source documents | no bank like it. Our written parts are graded by the reader |
| Practice: SS / R | Tools; the PCPA workspace (webR, Pyodide, a spreadsheet) | the task shape matches. The *assistant* writes the code, which our tools could replace (§4.3) |
| Jurisdiction (Others: CIA …) | 6C vs 6U, the FCIA pages, Cowork's Canadian sources | we can build this split from our own bank |

## 4. The proposal

### 4.1 Build our own eval first; INS-ActBench comes second

The parts of INS-ActBench worth having are its method and its findings, and we can apply both to
material we already own and have verified. A **connector eval**, `simulations/connector_eval/`
next to the learner, run by hand like the learner and never in CI (it costs model calls). It
reuses `learner_sim/backends.py` (headless Claude Code) with the opposite isolation rule: arms
that must have the connector fail closed if the `init` event does not list it, and the control
arm fails closed if it does.

Four arms, the same model and the same items:

| Arm | Capabilities | Measures |
|---|---|---|
| **A0 control** | nothing (the learner's isolation) | what the model knows already |
| **A1 connector, no questions** | the MCP server with questions withheld from `search`/`fetch` (§4.2) | what the pages and the tools add |
| **A2 = A1 + skill** | A1 + `quiz/skills/actuarial-notes/SKILL.md` as the system prompt | what the skill adds |
| **A3 tools only** | `list_tools` / `describe_tool` / `run_tool` | the calculators' share of A1's lift |

The headline number is **lift**, A1 − A0 and A2 − A1, reported per exam, per INS subcategory, and
split numerical / non-numerical, Bloom level and fact-check status. This is what the learner's
control does (`control.py`, *What studying added*), turned towards the assistant.

The items come from our own bank, in three groups. Each group answers the contamination question
in a different way:

- **Vault-written questions** (`*-an-*`, 663 of them): never published, so no model can have seen
  them. INS-ActBench has no clean group like this, and it is the most valuable one we have.
- **Recent sittings**: the Spring 2026 ASTAM and ALTAM papers and the 2025 sittings. This is the
  paper's time split, with our sittings' dates.
- **Older past papers**: kept for comparison. A large A0 score with a small lift is itself a
  finding: the model knew it already.

Scoring follows INS-ActBench where it is careful: exact letter for MC; exact set for multi-select,
with partial credit reported beside it; numbers within 0.2% relative and, separately, within the
app's 1% *close*; and a total that averages the parts, not the items. Written parts stay out of v1,
because they need a grader and the vault's rule is that a model never decides a learner's answer.
The **error taxonomy** of Practice becomes the connector's: *tool not called* (or `isError`
input), *wrong tool or judgment* (an envelope with the wrong method or a default left as a
selection), *right tool, wrong number* (a tool or page bug, so it goes to `.verify/` as a finding
against that tool or page).

Reports go under `simulations/connector_runs/`. They hold the scores, item ids and the transcript
digest; like the learner's runs, they never hold a question's text from outside the vault.

### 4.2 An eval mode that serves no questions

`MCP_EVAL_WITHHOLD_QUESTIONS=1` (or a header the local server sets) makes `search` skip
`type: question`, makes `fetch` refuse a question id, and makes `get_practice_questions` /
`check_answer` return errors. Without it, A1 measures lookup, not help. It goes in
`quiz/api/_mcp/server.js` with a test in `mcpServer.test.ts`, and stays off in production. The
connector's contract is unchanged, because the mode only takes things away.

### 4.3 Then INS-ActBench, if the authors release it to us

Once there is access with terms that allow private evaluation:

1. **Dedupe against our bank before scoring.** Use 13-gram overlap (the paper's own method) of
   each item's stem against `questions/`. An item that matches one of ours is scored separately,
   with A1 run in the withholding mode, because its answer is in the vault in another form.
2. **Run A0–A3 on Know (SOA/CAS group + NLI + AMO + PS + EF) and on Practice.** Know answers
   finding 2: does `run_tool` close Claude's numerical gap? Practice gets a fifth arm, **A4:
   tools instead of code**, where the assistant may call `run_tool` before writing the openpyxl or
   R. That measures whether our tested calculators beat the model's own code on the error class
   the paper finds most often, a wrong method.
3. **Practice items no tool can answer become the tools backlog.** Group them by method (a
   bootstrap, a GLM fit, a Lee–Carter projection …) and rank them by count. That ranking feeds A2
   and the Phase 2 tool list in `actuarial-tools.md`. A tool is still only claimed once it
   reproduces a *published* worked example (§17 there). An INS item is a pointer to the source
   paper, found by its `source` / `year` / `season` fields and transcribed from the publisher by
   the existing pipeline. The item itself is never a fixture.
4. **Case is optional.** Our sources are not case books, and the long cases need 58K-token inputs.
   The finding is still usable without the data (§4.4).
5. **Know's LI/AMA scores are a coverage report, not a target.** A small lift there says the life
   pages (FAM, ALTAM, ASTAM) are thin, which `content-plan.md` already lists. It is not a reason
   to reorder the content phases.

### 4.4 What changes now, without any data

These findings shape the skill and the tools before anything is measured:

- **The skill: "check every condition."** The Case result says models under-select. One line in
  `SKILL.md`'s answering loop: before answering a question with several true statements or
  conditions, list each against the page that supports it.
- **The skill: say when no tool covered it.** `SKILL.md` already says "Don't do the arithmetic
  yourself" and sends calculations to `run_tool`. Finding 2 says the rest needs care too. Add one
  line: when no tool covers a calculation, say so and show each step, so the reader can check the
  arithmetic the assistant did itself.
- **Jurisdiction.** Finding 5 is a reason to check that answers from `get_exam` and `get_concept`
  make the region clear (6C vs 6U, the CIA pages). The eval reports Canadian items (6C, the CIA
  pages) as their own group.

## 5. Order of work and cost

1. §4.2, the withholding mode (small; one PR with its test).
2. §4.1 on the vault-written questions and the 2025–26 sittings, A0–A2, one model. At the
   learner's rates that is roughly 1,000 items × 3 arms. Size the sample from a pilot of 50
   items before running the whole set.
3. §4.4's two skill lines, measured by A2 − A1 before and after.
4. Write to the authors (§2.1). If they grant access, run §4.3.

## 6. Decisions for the maintainer

| ID | Decision | Default until decided |
|---|---|---|
| D-B1 | Ask the INS-ActBench authors for the data, on terms that allow private evaluation only? | Yes: ask, and accept only terms that keep items out of the repo |
| D-B2 | A budget for connector-eval runs | A 50-item pilot per arm; nothing more without a figure |
| D-B3 | Publish lift figures (on the Settings card or `llms.txt`)? | No: internal until two runs agree |
