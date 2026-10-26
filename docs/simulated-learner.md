# Simulated learner

`simulations/` holds a simulated learner: a model playing a configured student
who studies the vault's study pages, practises questions, keeps notes, and is
marked. Its logs and reports show where the guides and questions fail
particular kinds of learner. It never edits the vault.

```bash
cd simulations
./run-learner --profile profiles/career-changer.yaml --exam FM --sessions 3
./run-learner --profile profiles/*.yaml --sessions 2 --parallel 4   # + comparison.md
./run-learner --profile profiles/career-changer.yaml --backend scripted   # free dry run, no model
./run-learner --profile profiles/career-changer.yaml --control-sample 20  # cap the control learner
./run-learner --profile profiles/career-changer.yaml --no-control         # skip it
./compare-learners runs/<run-id>
./check-answerable --exam MAS-II                  # every served question: answerable from its pages?
./check-answerable --exam MAS-II --ids masii-2019s-q4 --run-id <run-id>   # some, into a run
./check-answerable --exam MAS-II --run-id <run-id> --report-only          # rewrite report.md, free
python3 -m unittest discover -s tests -t .
```

The same folder holds the **answerability check** (`check-answerable`, below), which needs no
student: it asks whether each question can be answered from the pages the vault gives for it.

## Modules

| Module | Role |
|---|---|
| `vault_parse.py` | Reads question files whole, answer keys and solutions included. Trusted code only. |
| `content_loader.py` | The only source of what the learner sees: study pages (exam page, `Concepts/`, this exam's `Guides/` tips, the general guide) and `LearnerQuestion`s built from an allowlist of fields. |
| `grader.py` | Holds the key. Marks multiple choice exactly; sends written parts to the **grading agent**, a separate isolated model call that sees the sample answer and examiner's report. Returns a `Feedback`: the verdict and points, plus the solution only under `feedback: solution`. |
| `learner.py` | The persona and the JSON action protocol. Imports nothing that can read the vault. |
| `guard.py` | Every byte sent to the learner model passes through it. It is recorded, and the guard refuses to send anything that carries an unreleased solution. |
| `backends.py` | Headless Claude Code (`claude -p`, stream-json, one process per session) with tools, MCP, skills and project context switched off. It fails closed if the `init` event reports any capability. Also scripted stand-ins for tests. |
| `session.py`, `strategies.py` | The orchestrator, the four strategies and the simulated clock. |
| `auditor.py` | Flags attempts that use knowledge the profile doesn't have. |
| `control.py` | The control learner: the same student with no pages and no notes, put to every question the learner attempted, so a report can say what studying added. |
| `analysis.py`, `diagnostician.py`, `report.py` | Findings, model-written root causes and edit suggestions, and the markdown reports. |
| `answerability.py` | The answerability check (below). Reads solutions, so trusted code like the grader. |

## Isolation

The learner sees study pages and question stems and options, nothing else.
This is enforced in code, at five layers, and `tests/test_isolation.py`
proves each one:

1. **Allowlisted construction.** A `LearnerQuestion` has no field a key or
   solution could ride in. Every question in every bank is rendered and checked
   for its own solution text.
2. **Path allowlist.** Question files, resources, comprehension checks and
   `.verify/` logs cannot be opened, and frontmatter is never shown.
3. **The guard.** Solutions are fingerprinted as 8-word shingles, minus
   anything public (stems, pages). A solution is released only after its answer
   is committed, and only under `feedback: solution`.
4. **The backend.** No tools, no MCP, safe mode, an empty working directory.
   A session reporting any capability, or attempting a tool call, is killed.
5. **Module boundary.** `learner.py` cannot import the parser, the grader or
   the loader.

Staying in character cannot be enforced, only made visible. The persona draws
a knowledge boundary, each answer lists the sources it used (`page: …`,
`notes`, `prior: …`, or `guess` for none), and the auditor flags what can't be
traced to them. Notes are the only memory carried between sessions.

Two checks don't depend on anything the learner says about itself:

- **Beyond its knowledge** (`auditor.beyond_knowledge`, run in `analysis.py`).
  A right answer, at 70% confidence or more and not pressed into a guess, on a
  question none of whose concepts the learner could have met, is out of
  character. A concept counts as met if the learner opened its page, or its
  name appears on a page it opened, in its notes (as the session left them), in
  its prior knowledge, or on a question whose solution it was shown earlier in
  the session. All of that is lenient on purpose: it catches only the clear
  cases.
- **The control learner** (`control.py`). After the run, every question the
  learner attempted goes to a fresh learner with the same persona and prior
  knowledge but no pages and no notes, in one conversation through its own
  guard, never told how it did. The report's *What studying added* section sets
  the two scores side by side, overall and by concept, and lists the questions
  the control got right: the model knew those without the guide, so the guide
  gets no credit for them. This is the number that credits the guide. It costs
  about as much as the run's own answers; `--control-sample N` caps it, `--max-cost` covers it, and a
  continued run asks only the questions the control hasn't answered.

The learner's working is not part of the record. The protocol asks for the
answer as the student would submit it, with no reasoning field and no
free-text "thought"; a reply is kept only as its action and that action's own
fields (`trim_reply`, which `context.jsonl` uses), so prose around the JSON is
never stored. The reports show the answer, confidence, sources listed, pages
read and time spent, and the diagnostician and auditor judge from those, not
from anything the learner wrote about how it got there. With no working to
measure, a question's simulated time is the stem's reading time plus the length
of the submitted answer, so a multiple-choice question costs little more than
reading it: compare simulated minutes within the new protocol, not with runs
made before it.

## Profiles

YAML in `simulations/profiles/`, with these fields: `name`, `exam`,
`description`, `prior_knowledge` (free-form, plus `mastered_concepts`),
`gaps`, `traits` (`reading_thoroughness`, `skim_tendency`,
`derivation_patience`, `math_anxiety`, `guess_tendency` in 0–1,
`confidence_bias` in −1–1, `reading_speed_wpm`, `lookups_during_questions`),
`study_strategy` (`read-then-practice`, `practice-first`, `spaced-review`,
`self-directed`), `time_budget` (`steps_per_session`,
`questions_per_session`), `feedback` (`score` | `solution`) and `seed`.

Some traits act in code as well as in the prompt:

- `skim_tendency` can turn a full read into a skim, which folds collapsed
  callouts and keeps first sentences.
- `derivation_patience` cuts long display maths short.
- `guess_tendency` presses the learner to commit early.

## Outputs

Each run writes `simulations/runs/<run-id>/<profile>/`. It holds
`events.jsonl`, `context.jsonl` (everything the model was sent, and each reply
reduced to its action and fields), `control.jsonl` and `control-context.jsonl`
(the control learner's answers and messages), `notes/session-N.md`, `state.json`, `analysis.json` and `report.md`, plus
`comparison.md` when several profiles share an exam. Only the reports are
committed (`simulations/.gitignore`).

The question pool leaves out questions that are off-syllabus, have an open
critical fact-check finding, or need a figure the learner cannot see.

## Answerability

The first live run (MAS-II, below) showed the limit of the simulated learner: a model playing a
student can't forget what it knows. The control learner, with no pages, scored 90%; the learner
who studied scored 86%. Where the run did find real gaps, it found them by setting an official
solution beside the page the student read. `check-answerable` does that directly, for every
question an exam serves, with no persona.

For each question, two isolated calls and a check in code:

1. **Requirements.** The question and its official solution, and *no* study page, go to a model
   that lists the knowledge the solution uses — definitions, formulas, procedure steps, facts —
   in general form, each with the concept it belongs to. Arithmetic, data the question gives
   and picking among the options are left out. Not seeing the pages keeps it from shaping the
   list to what they say.
2. **Location.** The requirements and the candidate pages go to a second call, which copies the
   passage that teaches each item, character for character, up to three places per item. The
   candidates are, in this order: the concepts the question is tagged with, the pages a search
   for each requirement (and the requirement's own concept) turns up, and up to eight pages one
   link from a tagged page. The exam page is never one: an objective line names a concept, it
   doesn't teach it.
3. **Verification.** `PageIndex` normalises a page (frontmatter, `>` markers, emphasis and
   whitespace dropped) and a quote counts only if it is on a shown page. A model saying "the
   page covers this" is not evidence; a quote that is there is — VERIFY's P1 again. An item with
   nothing verified gets one more, targeted look before it is called missing, because a missed
   passage is the costly error (it becomes backlog) and the locator misses passages it finds
   on another run.

Each item ends `tagged`, `linked` (one link away), `prerequisite` (on a page of an exam this one
assumes), `elsewhere` (in the vault, but out of reach) or `missing`, and `collapsed` when every
place it is taught sits in a folded callout. What an exam assumes is read off its page's
*Prerequisite knowledge* callout, transitively: a concept page it links, and every
learning-objective concept of an exam page it links (MAS-II's names MAS-I, MAS-I's names P and
FM). A question is **answerable** (everything tagged, linked or prerequisite), **untagged** (all
in the vault, some of it out of reach) or a **gap**. `report.md` ranks the gaps by the page that should hold
them (`home_page` maps the extractor's free concept names onto pages), lists the tagging gaps
and the collapsed-only items, and counts verdicts by sitting: a paper whose gaps far outrun the
rest may be testing a reading the syllabus has dropped. `results.jsonl` keeps every question's
record, so a run is continued with `--run-id`, and an error is retried.

**The record, and the gate it feeds (G8).** `results.jsonl` stays local, like every run's raw
log. Each run is also merged into the bank's committed record,
`simulations/answerability/<bank>.json` (`--no-record` skips it). It holds, per question, the
hash of the text the check read (the file below its frontmatter), its requirements, and every
verified place with its quote. `scripts/answerability_lib.py` reads the record against the vault
as it is now, in code and with no model, and that is the publication gate **G8**
(`docs/content-plan.md` §1, D29). Every requirement must have a quote that is still on its page,
on a page still in the question's reach, or a recorded `not-required`. A question whose text has
changed since its check goes back to the check.

```bash
python3 scripts/answerability_lib.py status --exam MAS-II        # what G8 still needs
python3 scripts/answerability_lib.py resolve --exam MAS-II --item <qid>:<rid> \
    --page "<page>" --quote "<passage, copied exactly>" --note "<what was done>" --run <run>
python3 scripts/answerability_lib.py not-required --exam MAS-II --item <qid>:<rid> --note "<why>"
python3 scripts/answerability_lib.py import-report --exam <id> runs/<run>/report.md   # a run with no results.jsonl
```

A reader sees the record too: the question's Fact Check panel ends in an **Answerability** card
(`quiz/src/components/AnswerabilitySection.tsx`, `lib/answerability.ts`) that fetches the bank's
record when the panel opens and lays out the question's history — the check (its date from the run
id, its verdict, each requirement with where it is taught and the passage quoted for it) and every
`resolve` / `not-required` written since, newest first. It reports the record as of the check; G8,
not the panel, re-reads the quotes against the vault.

`resolve` refuses a quote that isn't on the page, and says whether the page is in the question's
reach. A retag needs no `resolve`: the gate re-reads the tags. A re-run replaces a question's
entry and keeps only the `not-required` calls on requirements worded exactly as before.
`PageIndex`, the quote matcher, lives in `answerability_lib.py`, so the gate reads a quote exactly
as the check accepted it.

Answerable is necessary, not sufficient: a page can hold the formula and still not teach it.
And a gap is fixed from the syllabus reading, in general form — never by putting the
question's own numbers on the page, which would make every later check (and the learner) pass
by recall — and the edited page is fact checked again.

**First run, MAS-II, 2026-10-25** (`runs/answerability-20261025-mas-ii/report.md`, Sonnet for
both calls, $31 for 141 questions, about $0.22 each): 62 answerable (44%), 25 untagged (18%),
54 with a gap (38%); of 651 requirements, 444 were taught on a tagged page, 40 one link away,
54 elsewhere and 113 nowhere. It found both gaps the simulated learner's diagnosis named on
`masii-2019s-q4` (the Bühlmann-Straub estimators of μ and *a*, and scaling by next period's
exposure), and showed its third — a missing link to limited fluctuation credibility on
`masii-an-024` — was wrong: that question is tagged with the page. Rebuilt into the record with
`import-report` and read under G8, 74 are answerable: 26 of the 54 "elsewhere" items are taught
on MAS-I pages, which MAS-II's callout puts in reach. The rest:

- **Fall 2018 is 70% gaps** (33 of 47), against 24–34% for the 2019 papers. 16 of them are
  McElreath's Bayesian computation (MCMC, Gibbs and Hamiltonian sampling, WAIC, Gelman-Rubin),
  filed under *Introduction to Credibility*. D24 marked the 2019 papers' McElreath questions
  `off_syllabus`; Fall 2018's look like the same case, still served.
- **Linear Mixed Model** (10 questions): West's material the page doesn't carry — the level 1 /
  level 2 equations and their substitution into one model, tests for fixed effects, the GLS
  variance and why it is understated, which covariates can take a random effect.
- **Principal Components Analysis** (4): the proportion of variance explained from scores,
  biplots, a zero eigenvalue.

## Status

The offline pipeline and its 71 tests pass (`tests/test_answerability.py` among them), and CI
runs them (`content-validation.yml`, job `simulated learner isolation`). The first live run with
Claude Code (Sonnet) as the learner was refused on its opening turn by the model's safeguards;
the second, on MAS-II (2026-10-25, profile `mas-ii-analyst`, 3 sessions, $1.82), ran: 86% over
21 questions against the control learner's 90% — studying added nothing measurable, because
the model knew the material. It also lost one answer written beside `args` rather than in it;
such a field is now lifted into `args` (`action_args`), and an answer with nothing in it leaves
the question open instead of being marked wrong.

What the learner is still for: put it only on the questions the control learner gets wrong —
the only ones its score says anything about the guide on — and re-run it after a page is fixed,
as a before-and-after.
