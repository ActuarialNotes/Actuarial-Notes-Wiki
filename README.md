# Actuarial Notes

**A knowledge base for actuaries.** The syllabi, concepts, source documents and practice
questions behind the SOA and CAS exams, written as linked notes and checked against the
documents they come from.

[Read it online](https://quiz.actuarialnotes.com) ·
[Use it in Claude or ChatGPT](#in-claude-or-chatgpt) ·
[Open it in Obsidian](#in-obsidian) ·
[How it's kept accurate](#how-its-kept-accurate)

---

The material an actuary has to know is scattered: syllabus PDFs, textbooks, study notes,
standards of practice, regulators' guidelines and decades of past exam papers. Actuarial Notes
gathers it into one place. Each exam's syllabus is broken into its learning objectives, each
term on those syllabi gets its own page, each assigned reading is described from the document
itself, and the exams' published questions are worked through in full. Pages link to the pages
they depend on, so a definition is always one click from the ideas it is built on and the
reading it comes from.

It is written for two readers: **candidates** working through the exams, and **practising
actuaries** who want a quick, sourced reference to material they last studied years ago.

## What's inside

| | | |
|---|---|---|
| **Exam pages** | 14 | One per exam. Learning objectives with their syllabus weights, the concepts under each objective, and the assigned readings with the chapters that are examinable. `Exam *.md` |
| **Concepts** | ~900 | One idea per page: a precise definition, the formula in LaTeX, worked examples with the answer folded away, and a figure where a picture helps. `Concepts/` |
| **Sources** | ~140 | One real document per page: textbooks, papers, CAS study notes, CIA educational notes, OSFI guidelines, standards of practice and regulatory returns. Each page gives the document's own outline and which exams assign it. Alongside them is a dated timeline of Canadian P&C regulation and events. `Resources/` |
| **Practice questions** | 2,000+ | SOA sample questions and CAS past papers, each tagged to its concepts and learning objective, with a worked solution. Questions from the written-answer papers (Exams 5, 7, 8 and 9) also carry the examiner's report. `questions/<exam>/` |
| **Guides** | ~45 | How to study for the exams in general, plus format, pacing, scoring and exam-day advice for P, FM, MAS-I, MAS-II and Exam 5. `Guides/` |

### Exam coverage

| Exam | Body | Subject | Status | Practice questions |
|---|---|---|---|---|
| [P](Exam%20P-1%20(SOA).md) | SOA | Probability | Complete | SOA sample questions |
| [FM](Exam%20FM-2%20(SOA).md) | SOA | Financial Mathematics | Complete | SOA sample questions |
| [MAS-I](Exam%20MAS-I%20(CAS).md) | CAS | Modern Actuarial Statistics I | Beta | 2018–2019 papers |
| [MAS-II](Exam%20MAS-II%20(CAS).md) | CAS | Modern Actuarial Statistics II | Beta | 2018–2019 papers |
| [5](Exam%205%20(CAS).md) | CAS | Basic Techniques for Ratemaking and Estimating Claim Liabilities | Beta | 2013–2019 papers |
| [6C](Exam%206C%20(CAS).md) | CAS | Regulation and Financial Reporting (Canada) | In development | — |
| [6U](Exam%206U%20(CAS).md) | CAS | Regulation and Financial Reporting (United States) | In development | — |
| [7](Exam%207%20(CAS).md) | CAS | Advanced Estimation of Claims Liabilities | In development | 2012–2019 papers |
| [8](Exam%208%20(CAS).md) | CAS | Advanced Ratemaking | In development | 2012–2019 papers |
| [9](Exam%209%20(CAS).md) | CAS | Risk Management for Actuaries | In development | 2012–2019 papers |
| [PCPA](Exam%20PCPA%20(CAS).md) | CAS | Property and Casualty Predictive Analytics | In development | Project simulator |
| [DISC-DA](Exam%20DISC-DA%20(CAS).md), [DISC-RM](Exam%20DISC-RM%20(CAS).md), [DISC-IA](Exam%20DISC-IA%20(CAS).md) | CAS | The Institutes' online courses | In development | — |

**Complete:** syllabus, concept pages and question bank are all in place. **Beta:** usable, and
still being filled out. **In development:** the syllabus is mapped, but its concept pages and
questions are still being written.

## Ways to read it

### On the web

**[quiz.actuarialnotes.com](https://quiz.actuarialnotes.com)** renders the vault as a wiki and
builds a study tool on top of it: quizzes and timed past papers drawn from the question bank,
flashcards, per-concept mastery that fades if you stop reviewing, a daily study plan paced to
your exam date, and an exam-readiness score. The wiki and the practice questions work without
an account; signing in keeps your progress across devices.

### In Claude or ChatGPT

Actuarial Notes is also an MCP server. Add it to your assistant as a custom connector and it
can search the notes, read a syllabus or concept page, quiz you without showing the answer
first, and mark your answer against the official solution. It cites the page it used and that
page's fact-check status. No sign-in, read-only.

```
https://quiz.actuarialnotes.com/api/mcp
```

- **Claude:** *Customize → Connectors → + → Add custom connector*, paste the URL, leave
  authentication off.
- **ChatGPT:** turn on *Developer mode* under *Settings → Security and login*, then add an app
  for the URL with no authentication.
- **Claude Code:** `claude mcp add --transport http actuarial-notes https://quiz.actuarialnotes.com/api/mcp`

An Agent Skill that teaches the assistant how to tutor from the notes is at
[`/ai/actuarial-notes-skill.zip`](https://quiz.actuarialnotes.com/ai/actuarial-notes-skill.zip).
The full account is in [`docs/ai-connector.md`](docs/ai-connector.md).

### In Obsidian

This repository is an Obsidian vault. Clone it and open the root folder as a vault:
`[[wiki links]]`, callouts, embeds and LaTeX render as written, and the graph view shows how a
syllabus hangs together.

### As plain markdown

Every page is a markdown file with YAML frontmatter. You can grep it, diff it, or feed it to
your own tools.

## How it's kept accurate

Every content file carries a **Fact Check** status in its frontmatter, and every check made
against it is recorded in an append-only log under `.verify/`. The rules behind that status:

- **Only a source can verify a page.** A page is marked *verified* only when its claims have
  been checked against a citable external source: the official exam material first, then the
  syllabus reading. Reasoning alone, human or AI, can find an error but cannot confirm a page.
- **Numbers are checked twice.** An answer is recomputed from scratch *before* it is compared
  with the official solution.
- **A check covers exact bytes.** Verification is bound to the file's contents, so any edit
  sends the page back to *stale* until it is checked again.
- **Known errors are withheld.** A question with an open critical finding is kept out of
  quizzes and out of the AI connector until the finding is resolved.

The app and the connector show each page's status, so you always know whether you're reading
something checked. [`Validation Status.md`](Validation%20Status.md) is the running tally. As of
September 2026 the whole Exam P question bank is verified against the SOA's published
solutions, and most other pages have not been fact checked yet.

Found a mistake? Open the Fact Check panel on any page or question in the app and choose
**Report an issue**. Reports feed into the same log. The design is written up in
[`docs/verification.md`](docs/verification.md).

## The credentials it covers

- **Society of Actuaries (SOA):** life, health, pensions, retirement and financial risk.
  [ASA](Concepts/Associate%20of%20the%20Society%20of%20Actuaries%20(ASA).md) ·
  [FSA](Concepts/Fellow%20of%20the%20Society%20of%20Actuaries%20(FSA).md)
- **Casualty Actuarial Society (CAS):** property and casualty insurance.
  [ACAS](Concepts/Associate%20of%20the%20Casualty%20Actuarial%20Society%20(ACAS).md) ·
  [FCAS](Concepts/Fellow%20of%20the%20Casualty%20Actuarial%20Society%20(FCAS).md)
- **[Canadian Institute of Actuaries (CIA)](Concepts/Canadian%20Institute%20of%20Actuaries%20(CIA).md):**
  the national body for actuaries in Canada. It sets the standards of practice there, and it
  is why the vault carries Canadian regulation, OSFI guidance and CIA educational notes.

For how the exams, courses and credentials fit together, start with
[How to Study for Actuarial Exams](Guides/How%20to%20Study%20for%20Actuarial%20Exams.md).

## Contributing

Corrections are the most valuable contribution. Report them from the app, or open a pull
request against the markdown.

- The content conventions are in [`CLAUDE.md`](CLAUDE.md) under *Content conventions*.
  Resource pages follow [`docs/resource-pages.md`](docs/resource-pages.md).
- Never hand-edit a page's `verification:` block. `python3 scripts/verify_check.py --sync`
  maintains it.
- CI checks the question bank (`scripts/validate_content.py`), the resource pages
  (`scripts/resource_lint.py`), the syllabus links and the fact-check records
  (`scripts/verify_check.py`) on every pull request.

## Repository layout

```
Exam *.md                  exam syllabus pages
Concepts/                  concept pages
Resources/                 source pages and the dated timeline
questions/<exam>/          practice question bank
Guides/                    study guides
Media/                     figures and cover images
.verify/                   fact-check logs, one per content file
scripts/                   content-maintenance and fact-check tooling (Python)
docs/                      design notes
quiz/                      the web app (React + Vite + TypeScript) and the MCP server
supabase/                  database migrations and edge functions
```

To run the app locally:

```bash
cd quiz
npm install
npm run dev
```

The environment variables it expects are listed in `quiz/.env.example`. The developer's guide
to the codebase is [`CLAUDE.md`](CLAUDE.md).

## About the Wiki

Actuarial Notes is built by one developer with AI assistance. AI is used to organise content,
write code and review pages. No wiki content is published 100% AI-written without human
review, and no page is marked verified on an AI's word alone.

This is study material, not professional actuarial advice. The official syllabus and its
readings always have the final say, and every page points to them.
