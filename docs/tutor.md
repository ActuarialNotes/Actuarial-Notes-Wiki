# Tutor

_Status: **Preview** — built for Exam 5, open to one approved account (`TUTOR_APPROVED_EMAILS`
in `quiz/src/lib/tutor/access.ts`). The next stage is **Beta** for Pro subscribers, which is a
one-line change of `TUTOR_STAGE`. Roadmap item **L8**._

The Tutor is the candidate's own character — the fox, owl, koala … they chose and dressed in the
Gem Shop — sitting in the corner of every page. It knows where a candidate is in
their preparation for the exam, works out what the most valuable next few minutes of study are,
offers them at the moment they are worth the most, and — when something goes wrong — helps the
candidate find out *what kind* of wrong it was.

It is **purely algorithmic**. No model is called, nothing is generated, and every word of
feedback a candidate reads is either the vault's own (a concept page, the examiners' sample
answer, the examiners' report) or a sentence the Tutor composes about the candidate's *own*
record ("You've been sure and wrong on this twice"). It is the app's existing parts — the
question bank, the syllabus, the mastery ladder, the study plan, the examiner reports —
orchestrated by a schedule a learner would otherwise have to keep in their head.

This document is the plan: why it exists (§1), the learning science it is built on (§2), the
walk through the exam it guides (§3), when it serves a question (§4), what it serves (§5), how
it decides when a concept is due (§6), how it finds what is confusing (§7), what it knows about
the screen (§8), the character (§9), who can use it (§10), its data (§11), what it measures
(§12), what it deliberately does not do (§13), and the build phases (§14). §15 is the module
map.

---

## 1. The problem it solves

The app already has everything a candidate needs to practise: a bank of 356 Exam 5 questions
(752 lettered parts, 731 of them with the examiners' report), a syllabus with its weights, concept pages
with worked examples, a mastery ladder with decay, a study plan, a mistakes card. What it does
not have is anyone **deciding**. A candidate has to choose, every day, what to read, what to
practise, when to come back to it and what their mistakes mean — and the evidence on how
people choose is not encouraging. Left alone, learners:

1. **Re-read instead of retrieving.** Re-reading feels productive because the page becomes
   familiar; familiarity is mistaken for knowing it (the *fluency illusion*).
2. **Mass their practice.** Twenty Bornhuetter-Ferguson questions on Tuesday, none for a month.
3. **Block their practice.** All the BF questions, then all the Cape Cod — so they never learn
   the thing the exam actually tests, which is *which method this scenario calls for*.
4. **Are overconfident.** They don't know what they don't know, and stop studying it.
5. **Treat a mistake as a score** rather than as information about what to fix.
6. **Practise the calculations and skip the words.** On a CAS written paper roughly half the
   points are for *explaining*, *justifying* and *recommending*; the examiners' reports return
   to it on almost every paper ("candidates often were able to elaborate on only one of the two
   elements").
7. **Don't rehearse the sitting.** Exam 5 is four hours and about 55 points: 4.4 minutes a
   point. Nobody discovers their pace in the exam room on purpose.

Each of these has a mechanism in the Tutor (§2 maps them). And for Exam 5 there is a
mechanical problem too, found while planning: the quiz counts a written-only question as
**correct for mastery whatever was written** (`effectiveIsCorrect` skips essay parts, and with
none left returns `true`). 144 of Exam 5's 278 lettered questions, and 58 of its 72 unlettered
ones, are written-only, so a candidate can level up Exam 5 concepts by pressing *Check
answers*. The Tutor grades every written part by the candidate's own self-grade against the
examiners' answer, and banks that honestly (§5.4). The quiz-side fix is proposed separately on
the roadmap (§3.4, *L9*), because it changes how every CAS written exam's mastery works.

---

## 2. What it is built on

Dunlosky et al. (2013) reviewed ten study techniques and rated two of them *high utility*:
**practice testing** and **distributed practice**. Three more — interleaving, elaborative
interrogation and self-explanation — were *moderate*. Re-reading, highlighting and summarising
were *low*. The Tutor is organised around the two high-utility techniques and uses the moderate
ones where the bank supports them.

| Principle | Evidence | What the Tutor does |
|---|---|---|
| **Retrieval practice** | Roediger & Karpicke 2006; Karpicke & Blunt 2011; Dunlosky et al. 2013 | The unit of work is a *question part*, not a page. Reading a concept page is followed by a check on it (§4, M1), and the Tutor nudges a candidate who has read four pages without retrieving anything (M6). |
| **Spacing** | Cepeda et al. 2006 (meta-analysis); Cepeda et al. 2008 | Every concept has a memory state and a date it is next due (§6). The optimal gap grows with how long the knowledge has to last — about 10–30% of the retention interval for horizons of one to three months — so the gaps are capped by the time left to the exam. Massed repetition earns nothing: a second success the same day adds no stability. |
| **Successive relearning** | Rawson & Dunlosky 2011; Rawson, Dunlosky & Sciartelli 2013 | A miss is not the end of an item. It comes back later in the same session (after at least three other items), then the next day, then three days on — until it has been answered correctly in three separate sessions. |
| **Interleaving** | Rohrer & Taylor 2007; Brunmair & Richter 2019 (largest benefit for similar-looking categories) | A session never serves two items on one concept back to back, alternates between ratemaking and reserving, and puts **confusable siblings** next to each other on purpose (§7.4). |
| **Desirable difficulty** | Bjork 1994; Wilson et al. 2019 ("the eighty-five percent rule") | The Tutor keeps a rolling success rate and steers the difficulty of the parts it picks to hold it between about 65% and 85%. |
| **Calibration, and the hypercorrection effect** | Dunlosky & Rawson 2012; Butterfield & Metcalfe 2001 | Before every reveal: *Sure*, *Unsure* or *Guessing*. A high-confidence error is the most valuable mistake there is — confident errors, once corrected, are corrected more durably — so it jumps the queue and leads the *Confusing* list. The calibration readout says how often *sure* was right. |
| **Worked examples, then fading** | Sweller & Cooper 1985; Renkl 2005; Kalyuga 2003 (expertise reversal) | A concept's first contact is its page and its worked example (the `[!example]` callouts with hidden answers), not a cold question. Once the concept is learned, problems come straight away; worked examples stop being offered. This is also roadmap principle 5, *scaffold novices*. |
| **Elaborated feedback** | Shute 2008; Hattie & Timperley 2007 | After every written part: the examiners' sample answer(s), then their report. After a miss: **where candidates lose points** on that concept, quoted from the reports (§7.6). |
| **Generation and self-explanation** | Slamecka & Graf 1978; Chi et al. 1994 | A written part asks for an answer *before* the reveal — typed, or worked on paper — and the comparison against the sample is the self-explanation. Explanation and judgment parts are tracked separately from calculations (§7.3). |
| **Autonomy** | Ryan & Deci 2000; roadmap principle 6 | The Tutor offers; it never blocks, never scolds, and never pays a reward of its own. Every offer can be declined; two declines of a kind and it stops offering that kind for the day. *Quiet* mode keeps it to a dot. |
| **Implementation intentions** | Gollwitzer 1999; roadmap principle 7 | A session has a length the candidate chose (10, 20, 30 or 45 minutes), and the day's work is presented as a plan with a start, not as a backlog. |

The references are the ones a reader can check; the Tutor's constants (§6, §4) cite which one
they come from.

---

## 3. The walk through the exam

A candidate's preparation has phases, and the Tutor's job changes with them. The phase is a pure
function of two facts the candidate can't argue with — **how many days are left** and **how much
of the syllabus they have met** — and it decides the mix of a session.

| Phase | When | What a session is | What the Tutor says |
|---|---|---|---|
| **Set up** | No exam date | — | Pick the sitting (from the published windows) or a target date, and a session length. CAS has published no 2027 dates, so after the October 2026 window the Tutor says so and asks for a target rather than inventing one. |
| **Learn** | More than 21 days left, under 80% of concepts met | What's due first, then up to **5 new concepts** a day (read → worked example → first check) | Takes new concepts in the study plan's order — today's plan when there is one, syllabus order otherwise. |
| **Consolidate** | More than 21 days left, 80% met | Spaced, interleaved review; up to **2 new** a day | Mistakes, confusable siblings, the weakest *kind* of part. |
| **Rehearse** | 6–21 days left | Review; **1 new** a day. Timed sets at exam pace (4.4 min a point) are Phase 2 | Points per minute, not questions per minute. |
| **Taper** | 1–5 days left | Everything due before the exam is due now: a last look at what is heavy and what was wrong while sure | Nothing new unless asked: *Keep going* with nothing met left meets the heaviest unmet concepts, page first. |
| **Exam** | Inside the window | — | Good luck, and nothing else. |
| **After** | The window has closed | — | Results, if transcribed; otherwise asks for the next target. |

**The exam date** is read in this order: the date the candidate set for Exam 5 (the
`exam_progress.target_date` the dashboard and study plan already use — one exam date in the app,
and the Tutor's date picker writes that same field); else the next published sitting; else none.
The panel says which it is using.

**Coverage** is the share of Exam 5's syllabus concepts the candidate has *met*: checked at least
once in the Tutor, or at Level 1 or above on the mastery ladder. It is a count ("84 of 139"),
never a percentage dressed up as readiness: the readiness number is `computeExamReadiness`'s, and
the Tutor doesn't print a second one.

**The day's plan** is what a session start shows: *due* reviews, items to *relearn*, the next
*new* concepts, and an estimate in minutes from the parts' point values at exam pace.

---

## 4. When a question is served — the moments

"Exactly the right moment" means a rule. Each moment is a trigger plus the conditions under which
an offer is worth an interruption; everything else waits quietly as a count on the character.

| | Moment | Trigger | Why then |
|---|---|---|---|
| **M1** | **After reading** | A syllabus concept's page has been open at least **40 s**, and the candidate has *left* it (closed the popup or moved on) | The page is out of sight, so the answer is retrieved rather than copied, while the encoding is still fresh. Not offered if the concept was checked in the last 24 h — that would be massing. |
| **M2** | **Due** | A concept's next review date has passed | Never a bubble on its own: a count on the character, and the head of the day's plan. |
| **M3** | **Relearn** | A missed item, three items and five minutes later | Successive relearning: soon enough to still matter, late enough to be retrieval. Inside a running session only; otherwise it waits for tomorrow. |
| **M4** | **Debrief** | `/review` after a quiz | One offer: the concept that cost the most in that quiz, and its sibling. *(Phase 2.)* |
| **M5** | **Arrival** | The first page of the day | A one-line briefing: what's due and what's next. |
| **M6** | **Reading streak** | Four concept pages read in fifteen minutes with no retrieval in between | The fluency illusion, caught in the act. |

And the rules that keep it unobtrusive — the part that decides whether a tool like this is used
or switched off:

- **Never** while a quiz is in progress, a battle is on, the PDF reader is open, a field has
  focus or a page is in focus mode. The character stays, silent.
- **One bubble at a time**, at least **8 minutes** apart (M1 may follow 3 minutes after another
  bubble — it is the highest-value moment). A bubble hides itself after 12 seconds and leaves a
  dot behind.
- **Two declines** of one kind in a row and that kind is off for the rest of the day.
- **Quiet mode**: no bubbles at all, only the dot and the count.
- **Hide**: the character folds into a tab on the edge of the screen until it is tapped.

---

## 5. What is served — the item

### 5.1 An item is a part

Exam 5 is a written paper. A question is typically a table of given information and three
lettered parts worth 0.25 to 2 points each; served whole, it is a ten-minute commitment, which is
the wrong size for "check yourself now". So the Tutor's unit — an **item** — is one part: the
question's shared preamble (the table), then that part's own prompt. An unlettered question is
one item, and a multiple-choice question (Exam 5 has six) is one item graded on the click.

Each item carries, all derived from the bank (`lib/tutor/items.ts`):

- **Its concepts** — the question's `wiki_link` concepts that the part's own text (prompt,
  answer, sample answer) names, by the same name forms `conceptMentions.ts` uses. A part that
  names none of them gets all of them. So a miss on part (c), about large losses, doesn't count
  against the trend concept part (a) was about.
- **Its kind** — *calculation*, *explanation* or *judgment*, read off the command word of the
  instruction sentence (the last sentence that has one): `recommend`, `justify`, `evaluate`,
  `assess`, `select`, `propose` … → judgment; `calculate`, `estimate`, `determine`, `construct`,
  `develop` … → calculation; `explain`, `discuss`, `describe`, `identify`, `define`, `list` … →
  explanation. Judgment outranks calculation outranks explanation within a sentence ("Calculate …
  and recommend …" is a judgment). A part with no command word takes the preamble's. On today's
  bank: 386 calculation, 252 explanation, 149 judgment, 43 read from the preamble.
- **Its minutes** — points × 240 / 55 (the exam's pace, `quizTiming.ts`), at least a minute and
  a half.
- **Its feedback** — the answer key line, the sample answer(s) (`splitSampleAnswers`), the
  examiners' report, and the report's *lost-points* sentences (§7.6).

### 5.2 Choosing an item for a concept

The scheduler (§6) decides *which concept* is next; then an item is chosen for it, in order:

1. a **relearn** item for that concept, if one is ready (the same item — successive relearning
   works on the same retrieval);
2. otherwise an item **not seen in 14 days**, from a question other than the last one served;
3. in the **difficulty** band the rolling success rate asks for (above 85% → hard first; below
   65% → easy and medium first);
4. and, when the candidate's weakest *kind* is explanation or judgment (§7.3), that kind first.

### 5.3 The practice card

The card is the quiz's own furniture, so a part looks the same wherever it is answered:
`MarkdownText` for the preamble and the prompt, then

1. **Write it** — a scratch box ("for you; nothing reads it"), or work on paper.
2. **How sure are you?** — *Sure*, *Unsure*, *Guessing*. Asked *before* the reveal, because a
   judgement made after seeing the answer measures nothing (hindsight bias).
3. **Reveal** — the answer key line, `SampleAnswerCards`, `ExaminerReportCard`.
4. **Mark it** — `SelfGradeButtons`: *Full credit*, *Partial*, *No credit*.
5. On a miss, **where candidates lose points** on this concept (§7.6) and the way into the
   concept's page.

### 5.4 What an answer does

Every answer is written twice:

- **To the Tutor's log** (§11), at once — it drives the schedule.
- **To the rest of the app**, through `recordReviewAnswers` — the path the Fix-Mistakes reviewer
  uses — so a part answered in the Tutor counts toward mastery, XP, the streak, quests, the daily
  heatmap and the question's attempt badge exactly as one answered in a quiz. Each item is banked
  as a one-part question carrying only *its* concepts, under its question's id, with the self-grade
  as the manual grade. Full credit is correct; partial and no credit are not — the quiz's own rule
  for a manually graded part. Answers are banked in batches (on closing the panel, every five
  items, and when the page is hidden), at most one part of a question per batch.

The grade the **memory model** sees (§6) also uses the confidence: *No credit* → Again;
*Partial* → Hard; *Full credit* while *guessing* → Hard (a lucky right answer is fragile);
*Full credit* otherwise → Good. The Tutor never grades *Easy*: a self-marked answer is
evidence, not proof.

---

## 6. When a concept is due — the memory model

The mastery ladder (`mastery.ts`) is what a candidate *sees*: five states, fixed decay. It is too
coarse to schedule with — it can't tell a concept recalled on its due date from one recalled the
day after it was learned, and that difference is the whole of the spacing effect. So the Tutor
keeps a **scheduler**, never a score: it prints no level and no percentage of its own.

The model is **FSRS-4.5**'s (Ye, *open-spaced-repetition*), the published equations with their
published default weights, which were fitted to hundreds of millions of real reviews. Per concept
it keeps a **stability** *S* (the days after which recall falls to 90%) and a **difficulty** *D*
(1–10):

- Recall after *t* days: $R(t) = (1 + \tfrac{19}{81}\tfrac{t}{S})^{-1/2}$.
- First review: $S_0 = w_{G-1}$; $D_0 = w_4 - (G-3)\,w_5$.
- A success multiplies stability, by more when recall was harder (lower *R*) and the concept
  easier: $S' = S\,\big(e^{w_8}(11-D)\,S^{-w_9}(e^{w_{10}(1-R)}-1)\,h + 1\big)$, $h = w_{15}$ for
  Hard. At $R = 1$ — the same day — the bracket is 1: **massed repetition adds nothing.**
- A lapse resets it: $S' = w_{11} D^{-w_{12}}\big((S+1)^{w_{13}}-1\big)e^{w_{14}(1-R)}$.
- Difficulty moves with the grade and drifts back toward its mean ($w_6$, $w_7$).

**The interval** for a target recall of 0.9 is *S* days, and then two exam-aware rules:

- **No gap longer than a quarter of the days left** (Cepeda et al. 2008's optimal gaps are
  10–30% of the retention interval at these horizons), and never past the day before the exam.
- **Taper**: everything due in the final week is pulled into it, so every high-weight concept
  gets one last look.

**Seeding.** A concept the Tutor has never seen but the ladder has starts from the ladder: Level 3
as $S = 21$, Level 2 as 7, Level 1 as 2, Forgotten as a lapse at $S = 0.5$, each from its last
correct answer. (For Exam 5 those ladder states may be inflated by the written-only rule in §1;
the Tutor's first check corrects them.)

**The queue.** Due concepts are ordered by
$\text{weight} \times (1 - R_{\text{now}}) \times \text{boost}$: weight is the concept's objective's
exam weight (the midpoint of `{45–55%}`) shared among its concepts; the boost is ×2 for an open
high-confidence error, ×1.5 for an open *I'm confused* flag, ×1.3 for a ladder state of
Forgotten. Relearn items come before everything; new concepts after the due ones, at most five a
day (the study plan's cap) and fewer in later phases. A session takes from the queue until its
minutes are spent, interleaved (§2): no concept twice in a row, objectives alternated.

---

## 7. Finding what's confusing

"I got it wrong" is not a diagnosis. The Tutor reads the candidate's record for seven patterns,
each a function of data the app already has, and each with something to *do* about it.

### 7.1 Sure and wrong
A part marked *No credit* or *Partial* after *Sure*. A misconception rather than a gap — and the
item learners correct most durably when shown the answer (hypercorrection). Listed first, boosted
×2 in the queue until the concept has two full-credit answers.

### 7.2 Persistent misses
A concept with two or more lapses across separate days. Offered: read the page again (the worked
example first), then a different item on it.

### 7.3 The kind of part
Success by kind — calculation, explanation, judgment — once each has at least five answers. A
kind 20 points below the others is named ("You score 82% on calculations and 41% on *justify* and
*recommend* parts"), and the item picker leans toward it (§5.2). This is the single most
CAS-specific finding the Tutor makes.

### 7.4 Confusable siblings
Concepts the syllabus names **on one objective line** — *Calendar Year, Policy Year, Accident
Year, Report Year*; *Chain Ladder, Expected Loss, Bornhuetter-Ferguson, Cape Cod, Benktander* —
are the ones a candidate mixes up, because the exam asks them to tell those apart. When two
siblings both carry misses, the Tutor says so, opens both pages side by side (the popup's page
stack) and serves their items back to back. Siblings are read from the exam page
(`parseExamSyllabus`'s line excerpts); nothing is authored.

### 7.5 What it is built on
The concepts a page's **definition sentence links to**, and those its **defining formula**
names, that are on Exam 5's syllabus — *Pure Premium = Frequency × Severity*; *Cape Cod* is
the *Bornhuetter-Ferguson* technique with a derived a priori; *Incurred Losses* are *Paid
Losses* plus *Case Reserves*. A name merely written out doesn't count ("Policy Year, also
called underwriting year, … in a given calendar year" names two concepts it isn't made of),
and two pages that define each other are a pair, not a foundation. When a missed concept's
foundations are New, Level 1 or Forgotten, the Tutor suggests the foundation first. On today's
pages 35 of Exam 5's 139 concepts have one. (A deliberately light reading of Concept Craft's
recipe reader, `openingNames`.)

### 7.6 Where candidates lose points
The examiners' reports, mined for the sentences that describe a loss of credit — *common
mistake*, *common error*, *struggled*, *did not*, *failed to*, *incorrectly*, *lost credit*,
*most candidates* — and quoted **verbatim**, with the sitting and part they come from, for every
item on the concept. On today's bank that is about 460 "common mistake" sentences alone. It is
the closest thing the vault has to thousands of candidates' answers, and it is the
written-paper equivalent of a misconception list. Shown after a miss and on the concept's card.

### 7.7 "I'm confused"
A button on any syllabus concept. It asks *what* is confusing, with options built from the
concept:

| Option | What the Tutor does |
|---|---|
| What it means | Opens the page at its definition, worked example first |
| How it differs from … (its siblings) | Opens both pages, serves one item on each |
| The calculation | Serves a calculation item, with the page's worked example offered first |
| When to use it | Serves a judgment or explanation item |
| Something it builds on (its foundations) | Serves an item on the weakest foundation |

The flag stays on the *Confusing* list, boosting the concept ×1.5, until two full-credit answers
clear it.

### 7.8 Calibration
How often *Sure* was right, and *Guessing* — "When you're sure you're right 64% of the time" —
once there are ten confidence-rated answers. Overconfidence (sure right less than 75%) is said
plainly; it is the most common pattern in learners, and the cheapest to fix once seen.

---

## 8. What it knows about the screen

The Tutor reads, without any page having to tell it: the route, the concept popup's open page
(`useConceptPopup`), whether a quiz is running (`quizStore`), whether the PDF reader is open, and
how long the current page has been open. `lib/tutor/context.ts` turns that into a **surface** and
the panel leads with a card about it:

| Surface | The card |
|---|---|
| A **concept** on Exam 5's syllabus (page or popup) | Its level (the ladder's), when it is next due, **how often CAS has tested it** — "on 11 of 14 papers, 31 parts, 24.5 points", counted from the bank — where candidates lose points on it, its siblings. *Check yourself* and *I'm confused*. |
| The **Exam 5 study guide** | The phase, the day's plan, the exam date. |
| A **quiz** in progress | Nothing: silent. |
| The **review** after a quiz | The debrief offer (M4, Phase 2). |
| The **dashboard** | The briefing. |
| Another exam's pages | "The Tutor covers Exam 5 for now." |

"How often CAS has tested it" is the fact candidates go looking for in forums; here it is computed
from the papers themselves.

---

## 9. The character

The Tutor has no face of its own: it **is the candidate's character** — the animal and the
colourway on their account (`user_metadata.avatar_url`), the same one the Gem Shop sells, equips
and draws, drawn by the same `AvatarDisplay`. A skin bought in the shop is the Tutor the next time
it looks up; that is the gem economy's cosmetics given something to do. An account with no animal
equipped (a colour or a photo) is tutored by the first free character, the fox, until it picks
one — the Journey view's *Change* opens the Gem Shop's own character picker, where an owned
character or colourway equips and a locked one leads to the shop (`lib/tutor/character.ts`).

It sits in a 52-pixel disc, bottom right, riding above a page's action bar and the concept popup's
split pane the way the resume dock does; chrome in a page move (`paper-chrome-tutor`). Its moods
are done *to* the drawing, never inside it, so a bought skin is shown exactly as bought, with the
primary colour kept for one thing: the dot that says it has something.

| State | Looks like |
|---|---|
| Idle | Still |
| Has something | The primary dot, with the count of due items |
| Speaking | A bubble beside it, one line and two buttons |
| Thinking | A slow breath while the bank loads (none under reduced motion) |
| Pleased | A small hop on a relearned item answered with full credit |
| Quiet | Greyed, dozing |

The **panel** opens from it: on a desktop a 26-rem card above the character (40 rem while a session runs, because a part carries a table), on a phone a bottom
sheet. It is a complementary panel, not a dialog — the page behind stays live — and it closes
with `Esc`. When the Tutor sends the candidate to *read* something it folds itself away and waits;
M1 brings it back when the page is left.

---

## 10. Who can use it

| Stage | Who | Change to move on |
|---|---|---|
| **Preview** (now) | `TUTOR_APPROVED_EMAILS` — `jordan@actuarialnotes.com` | — |
| **Beta** | The approved accounts and every Pro subscriber | `TUTOR_STAGE = 'beta'` |
| **Open** | Every signed-in account (decision **D25**: free or Pro) | `TUTOR_STAGE = 'open'` |

`TUTOR_ENABLED` (`featureFlags.ts`) turns the whole thing off. To everyone the stage leaves out
the Tutor doesn't exist — no character, no setting — and its code is a lazy chunk they never
download (`TutorHost` is the only part in the entry bundle, and it is a few lines). The rule is
`canUseTutor` in `lib/tutor/access.ts`, pure and tested.

**Exams.** `TUTOR_EXAMS` (`lib/tutor/exams.ts`) lists the exams it covers — Exam 5 alone. An exam
can join when it has a bank with sample answers or explanations, a syllabus page, and a pace in
`quizTiming.ts`. The written CAS exams (6C, 7, 8, 9) fit the same item model unchanged; the
multiple-choice exams (P, FM, MAS-I, MAS-II) need only the click-graded item, which already
exists.

---

## 11. Its data

The Tutor's state is an **append-only event log**, and everything it knows is a fold over it
(`lib/tutor/log.ts`): memories, relearn queue, calibration, flags, offer history. That makes the
model deterministic, testable from fixtures, and easy to sync later.

```ts
{ t: 'answer',  at, item, question, concepts, kind, points, grade, confidence, seconds, relearn }
{ t: 'confused', at, concept, reason }
{ t: 'read',    at, concept, seconds }
{ t: 'offer',   at, kind, response }   // shown / accepted / declined
```

- **Where:** localStorage, `actuarial_tutor_v1:<user id>`, capped at 4,000 events (the oldest
  `read` and `offer` events go first; `answer` and `confused` events are kept).
- **What is not here:** mastery, XP, attempts — those are banked through `recordReviewAnswers`
  into the tables they always lived in (§5.4), so they are already on every device.
- **Cross-device** for the log itself is Phase 2: a `user_tutor_events` table of the same shape,
  append-only, own rows only, union-merged like the flashcard sync.
- **Settings** sit beside the log: session minutes, quiet, hidden. The exam date is not a Tutor
  setting; it is `exam_progress.target_date` (§3).

---

## 12. What it measures

Typed in `AnalyticsEventMap`, no personal data:

| Event | Params | Answers |
|---|---|---|
| `tutor_offer` | `kind`, `exam`, `response` | Which moments are accepted, and which are ignored |
| `tutor_answer` | `exam`, `kind`, `grade`, `confidence`, `relearn`, `days_since_last` | Retention at each gap; relearning success; calibration over time |
| `tutor_confused` | `exam`, `reason` | What kind of confusion is common |
| `tutor_session` | `exam`, `items`, `minutes`, `phase` | Whether sessions are finished |

**Did it work?** Three numbers: `concept_retention` (L1) for concepts the Tutor scheduled against
those it didn't; the share of relearned items that come back at full credit; and the calibration
gap narrowing over a candidate's weeks. With one account in Preview none of this is a result; the
events exist so that Beta can be one.

---

## 13. What it deliberately does not do

- **Call a model, or grade free text.** The candidate marks their answer against the examiners'
  own. No sentence of feedback is invented.
- **Keep a second mastery number, or a currency.** Levels are the ladder's, readiness is
  `computeExamReadiness`'s, XP is earned by answering. The Tutor pays nothing of its own.
- **Interrupt.** No bubble during a quiz, a battle, a document or a field; one bubble at a time;
  quiet and hide are one tap.
- **Guilt.** No "you missed three days". A day away is a reason to show what's due, not a
  failure.
- **Replace the study plan.** It reads it: today's new concepts are the plan's.
- **Invent an exam date.** An unpublished sitting is said to be unpublished.

---

## 14. Build phases

**Phase 1 — this PR.** The engine (§5–§7, all of it pure and tested); the character, its bubble
and its panel (*Now*, *Confusing*, *Journey*); the practice card with confidence and self-grade,
banked through `recordReviewAnswers`; moments M1, M2, M3, M5 and M6; the context cards of §8;
Exam 5; Preview access.

**Phase 2.** The debrief (M4); timed sets for *Rehearse*; the `user_tutor_events` sync; a
calibration chart; the full Concept Craft recipe reader for §7.5.

**Phase 3.** Beta for Pro (D25); the other written CAS exams, then the multiple-choice ones;
A/B the moments' constants against `concept_retention`.

---

## 15. Module map

| Module | What it is |
|---|---|
| `lib/tutor/access.ts` | Stages, approved emails, `canUseTutor`; the e2e build's `tutorPreviewRequested` |
| `lib/tutor/exams.ts` | `TUTOR_EXAMS`: Exam 5's ids, label, pace |
| `lib/tutor/items.ts` | Questions → items: parts, kinds, concepts, minutes |
| `lib/tutor/examinerNotes.ts` | The lost-points sentences of a report |
| `lib/tutor/memory.ts` | FSRS-4.5 core, exam-aware intervals, seeding from the ladder |
| `lib/tutor/log.ts` | Events, and the fold into the model: memories, relearning, flags, calibration |
| `lib/tutor/scheduler.ts` | The syllabus as scheduled, the next step, item choice, interleaving, the day's plan |
| `lib/tutor/journey.ts` | Phases, exam date resolution, coverage |
| `lib/tutor/diagnosis.ts` | §7: the patterns, the foundations a page names, "I'm confused" options |
| `lib/tutor/moments.ts` | §4: when to offer, and the quiet rules |
| `lib/tutor/context.ts` | §8: route + popup + quiz → place; how often a concept was asked |
| `lib/tutor/bank.ts` | §5.4: answers shaped for `recordReviewAnswers` |
| `lib/tutor/copy.ts` | The only sentences the Tutor writes itself |
| `stores/tutorStore.ts` | The log, settings, the panel and session state; persistence |
| `hooks/useTutorEngine.ts` | The app's data (syllabus, mastery, exam date, study plan, bank, concept pages) → the model |
| `components/tutor/TutorHost.tsx` | The gate, in the entry bundle; lazy-loads the rest |
| `components/tutor/TutorApp.tsx` | The lazy root: the character and its bubble, context, moments, banking, actions |
| `lib/tutor/character.ts`, `components/tutor/TutorCharacter.tsx` | Who the Tutor is — the account's own Gem Shop character — and its moods |
| `components/tutor/TutorPanel.tsx` | The panel; its views are `TutorNowView`, `TutorConfusingView`, `TutorJourneyView` and `TutorSessionView` |
| `components/tutor/TutorPractice.tsx` | The practice card |

All of `lib/tutor/` is pure; the impure edges are the store (localStorage), the engine hook and
`TutorApp` (reading the app's hooks and banking answers).

**Testing.** `lib/tutor/*.test.ts` hold the rules, and `tutorVault.test.ts` runs them over the
real Exam 5 page and bank — the items, the notes, how often a concept was asked, and a played
session (page first, no repeats, no concept twice running, a miss relearned three items later).
`e2e/tutor.spec.ts` walks the Tutor, the panel and a session in a browser. The e2e build sets
`VITE_TUTOR_PREVIEW=on` (`TUTOR_OPEN_TO_ALL`), and even then the Tutor appears only on a page that
sets `localStorage.actuarial_tutor_preview = 'on'`, so no other spec ever meets it.
