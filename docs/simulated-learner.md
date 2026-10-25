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
python3 -m unittest discover -s tests -t .
```

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

## Status

The offline pipeline and its 51 tests pass, and CI runs them
(`content-validation.yml`, job `simulated learner isolation`). The first live
run with Claude Code (Sonnet) as the learner was refused on its opening turn by
the model's safeguards. No live results exist yet.
