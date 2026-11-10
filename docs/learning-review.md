# Learning review: does the app prepare a candidate to pass?

_A review of Study Mode against the research on learning and exam preparation, 2026-11-01.
Its proposals are on the roadmap as L11–L18 (§3.4 *Proposed*, §4.2), with three decisions,
D32–D34 (§6.1)._

The app's goal is that a candidate **passes** an actuarial exam. This review asks how well
Study Mode serves that goal, as opposed to how much material it covers or how often people
come back. It reads the code as it stands on `main` (2026-11-01), not the design docs'
intentions. Where the two differ, the code wins.

---

## 1. What passing takes

A candidate passes when, **on the day**, under the exam's **clock** and in its **format**,
they score above the **pass mark** on **questions they have not seen before**. Each of the
five bold words is a separate requirement, and preparation can fall short on any of them:

| Requirement | What has to be true | What builds it |
|---|---|---|
| **Knowledge** | The syllabus is learned and still remembered on exam day | Retrieval practice, spacing, relearning |
| **Transfer** | It can be applied to a new problem, not just a familiar one | Varied practice, interleaving, unseen items, worked examples that fade |
| **Format** | The candidate can produce the answer the paper asks for: a choice, a number, a written justification | Practice in the paper's own item types; marking written answers honestly |
| **Clock** | Enough points within the time | Timed practice, pacing feedback, fluency on routine steps |
| **Pass mark** | The candidate knows where they stand against the pass mark, early enough to change course | Calibrated self-assessment, a score forecast checked against real outcomes |

Study Mode is strong on the first requirement and on its own measurement of it. It is
weaker on the other four, and it doesn't yet measure any of them.

---

## 2. What the app already gets right

These hold up against the research and should be kept:

- **Retrieval is the unit of work.** XP, mastery and the plan are all driven by answering
  questions, not by reading (Roediger & Karpicke 2006; Dunlosky et al. 2013 rate practice
  testing *high utility*).
- **Forgetting is modelled.** Mastery decays (30 / 14 / 7 days), and readiness reads the
  decayed level, so an unreviewed concept stops counting.
- **Worked examples come first.** Concept pages lead with an example, and the pre-quiz
  concept list opens New concepts before a cold question (Sweller & Cooper 1985).
- **Exam-shaped practice exams.** `lib/practiceExam.ts` assembles a paper with the real
  length or points, section weights and item types, with the exam's pace on a timer.
- **The Tutor** (`docs/tutor.md`, Exam 5, Preview) already applies most of what this review
  asks for: FSRS-4.5 memory capped by days left, successive relearning, interleaving with
  confusable siblings, a confidence tap with hypercorrection, phases up to a taper. **The
  research-backed engine already exists; most of Study Mode just doesn't use it.**
- **Honest written credit.** A written part now counts only as its self-grade, and an
  ungraded one earns nothing (`questionCredit` in `lib/parser.ts`; roadmap L9, now done).
- **Content trust.** Every served question on a ready exam is fact-checked and answerable
  from its pages (gates G7, G8). That is a real advantage over most study tools.

---

## 3. Where it falls short

Ranked by how much each gap could cost a candidate their pass. Each one gives the evidence,
what the code does today, and the proposal.

### 3.1 Readiness measures coverage, not the likely score (→ L11)

**Evidence.** Learners judge their readiness by familiarity and are overconfident, and weak
students the most (Kruger & Dunning 1999; Dunlosky & Rawson 2012: overconfidence leads
students to stop studying too early, and they score lower). A readiness number they trust
has to predict the result, or it makes this worse.

**Today.** `computeExamReadiness` has one criterion, syllabus coverage: each concept
contributes 0, ⅓, ⅔ or 1 by its ladder level, weighted by section. Level 3 means **three
correct answers on separate days, on questions of any difficulty, including ones seen
before**. So *Exam ready* (85+) can be reached by answering easy, familiar questions three
times each, without a timed paper. The number says how much of the syllabus has been
touched. It doesn't say whether the candidate would pass.

**Proposal.** A **predicted score**, shown beside coverage rather than replacing it: the
expected share of points on a paper with this exam's blueprint, estimated from the reader's
**first attempts on unseen questions**, weighted by section and difficulty, with a range
that narrows as the evidence grows. Practice exams are its strongest evidence. Where the
examining body publishes a pass mark, it is transcribed (never estimated), and the forecast
is read against it ("likely 58–66%, pass mark 60%"). This is also item 1 of the Pro
proposal (`pro-proposal.md`, "a readiness forecast with a date"), so it is built once for
both. It can only be trusted once checked against real results (§3.8). Until then it is
labelled an estimate. **D32** decides whether it ever becomes the headline number.

### 3.2 Mastery counts remembering a question as knowing the concept (→ L12)

**Evidence.** The testing effect transfers to new problems much less than it helps on the
same items (Pan & Rickard 2018, meta-analysis), and transfer depends on practising varied,
new items (Butler 2010). Answering a remembered question again tests memory of that answer.

**Today.** `mastery.ts` increments `correct_count` on any correct answer. It can't know
whether the question was new: the only "seen" filter is today's plan holding back what
today's quizzes served, and that set is per device (`dailyProgressStore.ts`). Exam P's bank
is mostly the SOA's well-known sample set, so a returning candidate can climb the ladder on
recognised answers. Practice exams are drawn from the same pool, so they aren't unseen
either.

**Proposal.**
1. **Weight evidence by novelty.** A first attempt on a question counts fully. A repeat
   counts only once it has been spaced (days later) and for less. The seen set comes from
   `question_responses`, which is already per account and across devices.
2. **Prefer unseen questions in every draw**, not only today's plan.
3. **A held-out set per exam** (**D33**): a fixed share of each bank, never served in
   quizzes, kept for practice exams and the forecast, so at least one score is always on
   new questions. Cost: fewer questions to quiz on, which matters most for the small banks.

### 3.3 Study Mode isn't using the memory model it already has (→ L13)

**Evidence.** Expanding, individualised spacing beats fixed intervals (Cepeda et al. 2006,
2008). The best gap depends on the time left before the test. Successive relearning
(Rawson & Dunlosky 2011) means relearning a miss until it is correct in three separate
sessions. Mixing confusable topics helps most where problems look alike (Rohrer & Taylor
2007; Brunmair & Richter 2019). For actuarial exams the skill tested is often *which method
this problem calls for*.

**Today.** The main ladder uses fixed counts and fixed decay (L6 has been parked for this).
The study plan orders concepts by syllabus and doesn't interleave (L5). A missed question
is not systematically asked again later (L3). The Tutor does all three (`lib/tutor/`:
`memory.ts`, `log.ts`, `scheduler.ts`), but only for Exam 5 and one account.

**Proposal.** Make the Tutor's engine **the scheduler behind Today's Study Plan for every
ready exam**, independent of the Tutor's character and its rollout stage:
- FSRS state per concept, with gaps capped by the days left.
- Misses relearned in the session, then at +1 and +3 days.
- Plan sessions that mix sections and put confusable siblings together.

The ladder becomes how that state is *displayed* (its levels read off FSRS retrievability),
so collection, XP and readiness keep working. This merges L3, L5 and L6 into one change,
with the Tutor as the reference. It is the biggest single lever in this review, and the
largest piece of work: Phase 1 ports the scheduler behind the plan, Phase 2 maps the ladder.

### 3.4 Written answers are self-marked without a standard (→ L14)

**Evidence.** Students mark their own answers too leniently, and the lowest scorers most of
all. Comparing the answer against an **idea-unit checklist** of the expected answer's
points makes self-scoring markedly more accurate (Rawson & Dunlosky 2007; Dunlosky & Rawson
2012). On a CAS upper-level paper roughly half the points are for explaining, justifying
and recommending, which is exactly where a candidate can't tell what they missed.

**Today.** `GradePartsDialog` asks *Full credit / Partial / No credit* after showing the
sample answer and the examiner's report. There is nothing to check against point by point,
and a lenient grade now moves mastery (L9).

**Proposal.** Before the grade, a **checklist of the sample answer's points**, cut
mechanically from the sample's own lines and bullets (the vault's rule: nothing reworded,
nothing invented). The reader ticks what their answer contains, the suggested grade follows
from the ticks, and they can still override it. Where the examiner's report names a common
omission, it becomes one of the items. The existing connector's `check_answer` is mentioned
as a second opinion ("mark it in Claude"), not built into the app, which calls no model.

### 3.5 The clock is set but not taught (→ L15)

**Evidence.** Pacing is a skill, and it improves with feedback on time spent per item
(deliberate practice: Ericsson et al. 1993). On the SOA's multiple-choice papers speed on
routine steps is part of what is tested, and fluency comes from short, repeated, timed
practice on those steps.

**Today.** Every answer's `timeSpent` is stored (`quiz_sessions.time_spent_seconds`), and
timed quizzes count down at the exam's pace (`lib/quizTiming.ts`). The results screen shows
none of it. Time appears only in the mistakes modal. A candidate finishes a practice exam
without knowing which questions cost them the clock.

**Proposal.**
1. A **pacing report** on the results screen of any timed quiz or practice exam: time per
   question against its budget, the questions that took over twice their share, points per
   minute, and the points left unanswered when time ran out.
2. **Triage practice:** a practice exam's review says which long questions were worth
   skipping at first pass, by points per minute.
3. **Fluency sets:** short (5–10 minute) timed sets of one routine calculation, for the
   SOA's multiple-choice exams, built from the existing bank by concept and difficulty.

### 3.6 Confidence and errors are not captured in the quiz (→ L2, L3; widened)

**Evidence.** A confident error, once corrected, is remembered best (hypercorrection:
Butterfield & Metcalfe 2001). Feedback works when it says *what kind* of mistake was made
and what to do next (Hattie & Timperley 2007; Shute 2008).

**Today.** Both exist only in the Tutor. The quiz has no confidence tap and records no
error type.

**Proposal (widens L2 and L3).** One tap before the reveal (*sure / unsure / guess*), and on
a miss an optional one-tap reason: *didn't know it / misread / slip / ran out of time*.
Sure-and-wrong misses lead the relearning queue. A *slip* or *misread* doesn't drop a
concept toward Forgotten the way *didn't know* does. A calibration line on the Dashboard
("when you're sure, you're right 71% of the time") is the metric §7 already reserves for L2.

### 3.7 Novices start cold, and returning candidates start from zero (→ L16, L17)

**Evidence.** Studying a worked example, then a partly worked one, then solving alone beats
going straight to problems for novices, and the support should fade as skill grows (Renkl,
Atkinson et al. 2002; Kalyuga et al. 2003, the expertise reversal effect). A pretest before
study also improves later learning, even when it is answered wrongly (Richland, Kornell &
Kao 2009).

**Today.** The pre-quiz list opens a New concept's page, but the first question after it is
a full problem. Every account starts every concept at New: a candidate who studied with a
commercial manual for two months gets the same plan as a beginner, and the plan's pacing
assumes it.

**Proposal.**
- **L16, completion problems:** for a multi-part question whose published solution has
  steps, a *worked-through* mode showing the first steps and asking for the next one, faded
  as the concept's level rises. Steps are the publisher's own, split mechanically.
- **L17, a placement check:** an optional short diagnostic (about one question per
  section, adaptive) when an exam is added, which seeds mastery at Level 1 where it is
  answered right. It might also lower the first-quiz drop-off (L10), if new users leave
  because the start feels too basic.

### 3.8 The app never learns whether its users passed (→ L18)

**Evidence.** Without outcomes, none of the above can be checked: whether the forecast
predicts, whether a ready exam's material is enough, whether a feature helps or only
engages. §7's success metrics measure activation, retention and retention-of-concepts, but
none of them measures passing.

**Today.** Nothing asks. Sittings come two or three times a year, so a year without the
question is a year of evidence lost.

**Proposal.** After a sitting's results date (already transcribed in
`data/examSittingDetails.ts`), the Dashboard asks once: *Did you sit it? How did it go?*
(passed / didn't pass / didn't sit / rather not say), optionally with the score where the
body reports one. Opt-in, private to the account, used only in aggregate (**D34**). It
validates L11's forecast, gives a candidate who didn't pass a way into the comeback plan
(Pro proposal), and turns §7 into a measure of the goal. **This is the cheapest item here
and the one to start first**, because its data takes longest to accumulate.

**Built (2026-11-10).** `lib/examOutcome.ts` decides what to ask and when:
the sitting the reader's recorded exam date falls in (`exam_progress.target_date`), from that
sitting's first transcribed `results` date in `data/examSittingDetails.ts`, or, for a CAS
sitting (CAS publishes none), eight weeks after the window closes, the far end of the "6–8
weeks" in CAS's candidate guide. An SOA sitting with no published results date isn't asked
about until one is transcribed. The question stays up for 90 days. *No results yet* puts it
away for 14 days; closing it puts it away for good on that device. Answers go to
`exam_outcomes` (`supabase/migrations/20261110_exam_outcomes.sql`): own rows only, keyed by
exam and sitting, so an answered sitting isn't asked again on another device. The card is
`components/ExamOutcomePrompt.tsx`, lazy on the Dashboard, signed-in readers only. No score is
asked (D34's default) and nothing is sent to analytics. One limit: a reader who moves their
exam date to the next sitting before the results arrive isn't asked about the one they left.

---

## 4. Smaller observations

- **Multiple choice can be answered without retrieving.** Choices allow elimination, and
  recognising an answer is easier than producing it (generation effect, Slamecka & Graf
  1978). Well-built distractors do require retrieval (Little et al. 2012), and the SOA's
  papers are multiple choice, so this is a *practice option*, not a format change: an
  "answer before the options" setting that covers the choices until the reader has a
  number written down.
- **Plan realism.** The plan paces concepts to the date but says nothing about whether the
  date is realistic. Once L11 exists, the forecast at the current pace answers that.
- **The final week.** The Tutor tapers; the study plan doesn't. Two short, evidence-based
  pre-exam practices could be offered in the last days without any gamification:
  reappraising nerves as useful arousal (Jamieson et al. 2010) and a brief expressive-writing
  exercise before the exam (Ramirez & Beilock 2011).
- **Gamification stays informational.** Principle 6 holds. XP already favours hard and
  decaying concepts. With L12, it should also favour unseen questions, so it never pays
  more for recognising answers.

---

## 5. Order of work

| # | Item | Size | Why this place |
|---|---|---|---|
| 1 | **L18** exam outcomes | S | Cheapest, and its data takes longest to accumulate; everything else is checked against it |
| 2 | **L12** novelty-weighted evidence, unseen-first draws | M | Every later number (mastery, forecast) is inflated by repeats until it's done |
| 3 | **L15** pacing report | S | The data is already stored; it's a results-screen change |
| 4 | **L2 + L3 widened** confidence and error reason | M | Feeds L13's queue and §7's calibration metric |
| 5 | **L14** rubric self-marking | M | Makes the CAS written exams' mastery trustworthy |
| 6 | **L11** predicted score | M | Needs L12's clean evidence; check against L18 as outcomes arrive |
| 7 | **L13** the Tutor's engine behind the study plan | L | The biggest lever; easier once 4 is in the quiz |
| 8 | **L16, L17** completion problems, placement check | M each | Help novices and returning candidates; L17 may help L10 |

---

## References

- Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning. *Psychological Bulletin*.
- Butler, A. C. (2010). Repeated testing produces superior transfer of learning relative to repeated studying. *JEP: LMC*.
- Butterfield, B., & Metcalfe, J. (2001). Errors committed with high confidence are hypercorrected. *JEP: LMC*.
- Cepeda, N. J., et al. (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*. — (2008). Spacing effects in learning: A temporal ridgeline of optimal retention. *Psychological Science*.
- Dunlosky, J., & Rawson, K. A. (2012). Overconfidence produces underachievement. *Learning and Instruction*.
- Dunlosky, J., et al. (2013). Improving students' learning with effective learning techniques. *Psychological Science in the Public Interest*.
- Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993). The role of deliberate practice in the acquisition of expert performance. *Psychological Review*.
- Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of Educational Research*.
- Jamieson, J. P., et al. (2010). Turning the knots in your stomach into bows. *Journal of Experimental Social Psychology*.
- Kalyuga, S., et al. (2003). The expertise reversal effect. *Educational Psychologist*.
- Kruger, J., & Dunning, D. (1999). Unskilled and unaware of it. *JPSP*.
- Little, J. L., Bjork, E. L., Bjork, R. A., & Angello, G. (2012). Multiple-choice tests exonerated, at least of some charges. *Psychological Science*.
- Pan, S. C., & Rickard, T. C. (2018). Transfer of test-enhanced learning: Meta-analytic review and synthesis. *Psychological Bulletin*.
- Ramirez, G., & Beilock, S. L. (2011). Writing about testing worries boosts exam performance in the classroom. *Science*.
- Rawson, K. A., & Dunlosky, J. (2007). Improving students' self-evaluation of learning for key concepts in textbook materials. *European Journal of Cognitive Psychology*. — (2011). Optimizing schedules of retrieval practice for durable and efficient learning. *JEP: General*.
- Renkl, A., Atkinson, R. K., Maier, U. H., & Staley, R. (2002). From example study to problem solving: Smooth transitions help learning. *Journal of Experimental Education*.
- Richland, L. E., Kornell, N., & Kao, L. S. (2009). The pretesting effect. *JEP: Applied*.
- Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning. *Psychological Science*.
- Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems improves learning. *Instructional Science*.
- Shute, V. J. (2008). Focus on formative feedback. *Review of Educational Research*.
- Slamecka, N. J., & Graf, P. (1978). The generation effect. *JEP: Human Learning and Memory*.
- Sweller, J., & Cooper, G. A. (1985). The use of worked examples as a substitute for problem solving in learning algebra. *Cognition and Instruction*.
