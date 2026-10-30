# Pro: a proposal to make the offer compelling

**Status:** Proposed, not yet ranked (`docs/roadmap.md` §3.4). Nothing here changes price,
access or the Upgrade page until the maintainer decides the §6 questions.

**Why this exists.** The Pro offer on `/upgrade` sells four tools: a daily plan, a study
strategy, mastery levels and the PCPA simulator. Each answers "what does it do?" and none
answers "what happens to me if I pay?" This page proposes the outcomes, promises and identity
Pro should sell, ranks the features that deliver them, and lists the decisions only the
maintainer can make.

---

## 1. The buyer and what they fear

A candidate is studying 200 to 300+ hours around a job, for an exam that many people fail. A
fail costs months, fees and sometimes a promotion or raise tied to the credential. Four feelings
sit under that:

| Feeling | What it sounds like | What Pro should offer |
|---|---|---|
| **Am I ready, or fooling myself?** | "I did 400 questions but I don't know if that's enough." | Control: a date and a gap, not a score. |
| **Am I behind?** | "Everyone else has finished the readings." | Certainty about the next step. |
| **I'm doing this alone.** | "No one understands why this takes so long." | Company: people on the same exam, and a coach that knows the syllabus. |
| **I'm becoming an actuary.** | "I'm the kind of person who sits these." | Identity: a path, a record and a card to show. |

**Headline promise (proposed):** *Know you're ready before you sit.*

The current headline, "Pass exams and have fun doing it," sells fun to someone who is afraid.

---

## 2. Proposals, ranked by expected effect on paid conversion

Each item says which feeling it answers and the promise it makes. Items marked **build** need code;
items marked **packaging** reuse what exists.

### Tier 1: sell the outcome

**1. A readiness forecast with a date** *(build, small; packaging-heavy)*
Turn the readiness score into a forecast: "At your current pace you're ready on 12 April, nine days
before your sitting," with the three concepts that would move that date most. Free readers keep the
number. Pro gets the date and the gap.
*Answers:* control. *Promise:* "We'll tell you when you're ready."
*Reuses:* `computeExamReadiness` (`lib/readiness.ts`), the readiness projection, the study plan.

**2. A reverse trial** *(packaging, small)*
There is no trial today. When an account sets an exam date, give it Pro for 14 days, then take it
away. Losing a plan you've been following converts better than a locked feature you never saw.
*Answers:* the first three feelings, by letting the reader feel the plan before they pay.
*Promise:* "Try the plan on us."

**3. A Sitting Pass, with a receipt** *(packaging, small)*
One price that runs through exam day, instead of an open-ended monthly drain. The Upgrade page
produces an invoice an employee can expense, with the copy "Most employers reimburse exam study
costs." Monthly billing stays for those who want it.
*Answers:* identity. A professional with a study budget, not a student counting dollars.
*Promise:* "Your employer pays. We make the paperwork easy."

**4. A pass promise** *(packaging, needs terms)*
"Reach Ready before your sitting with Pro. If you don't pass, your next sitting is on us." The
terms have to be decided (§6), and the promise is only safe if it is honest about what "Ready"
means. Today no exam's bank passes the publication gates (`examStatus.ts`), so the promise cannot
be made for any exam yet. It is worth proposing now, but should not be shown until the first
exam is `ready` (see §5).
*Answers:* the fear itself. *Promise:* "We're on the hook with you."

### Tier 2: deliver the promises

**5. Study Group: chat with people sitting the same exam** *(build, medium; new surface)*
This is the answer to "I'm doing this alone," in place of the Tutor. Proposed shape:
- A group per exam, scoped by the exam and the sitting. Members are readers who have set that exam
  as their goal, and only they can see it.
- Plain chat, with threads by concept or by reading. A concept's thread is one tap from its popup.
- Opt-in and anonymous by default: a display name, no profile photo, no link to a real identity,
  and no mastery or score shown unless the member chooses to share it.
- A "study with" invitation for a short session (a quiz or battle), which reuses Quiz Battle's
  engine rather than forking it (`docs/quiz-battle.md`).
- Moderation from day one: report, mute, and a maintainer-held removal path, because an open chat
  for exam candidates will attract cheating, answer-sharing and harassment.

*Answers:* company, and the sense of a cohort. *Promise:* "Your exam has people on it right now."
*Overlaps:* `Actuaria` cohorts (`docs/actuaria-online.md`) already put people into groups by
approved accounts, and G6 in the roadmap names study-group leagues as the model to copy. Build it
as its own surface first, and decide with the maintainer whether cohorts and study groups are one
mechanism (§6, D-P4). **Note on ranking:** under `roadmap.md` §0.3 a new surface is Later until
rules 1–3 are clear for its lane. It is ranked here as a conversion lever, so it should be proposed
for Next only with a privacy and moderation design attached.

**6. The Tutor, for Pro** *(already built for Exam 5, Preview; roadmap L8 and D25)*
A coach that knows what you get wrong: the next part to revisit, your confusions and your examiner
notes, with no model in the loop. It stays in the proposal, as the maintainer asked. The Tutor is
Exam 5 only, so its value to a reader of any other exam is limited until a second exam is added.
*Answers:* "I'm not sure what to do next," which is the study group's gap too.
*Promise:* "Someone is watching where you struggle."

**7. "Mark like an examiner" for CAS written answers** *(build, medium)*
CAS written-answer candidates have the weakest alternatives. The examiners' reports in the vault
can become a checklist per question: where credit was lost, in the examiners' own words, against the
candidate's self-grade. Note the dependency on L9 (§3.4 *Proposed*, L9): until a written part's
self-grade counts properly, this has no scoring to report against.
*Answers:* control, for the part of the exam nobody else can mark.

**8. A comeback plan after a fail** *(build, medium)*
The morning after a fail is when a candidate is most willing to pay. Take their score band and
their record, and rebuild the plan around the weak sections: "Here's why, here's the next five
months." Market it to that moment specifically.
*Answers:* "Am I behind?", at the moment it hurts most.

**9. Study in the gaps** *(packaging; one decision)*
Listen recordings, the morning email and offline review, sold as "turn your commute into study
hours." Listen is planned as free (D12). Bundling it is a choice to revisit.
*Answers:* "Am I behind?" by finding hours the reader didn't know they had.

### Tier 3: identity and retention

**10. A record of your path.** Exams passed, the route to ASA, ACAS or FCAS, and a shareable card
("Passed Exam 5 with Actuarial Notes"). It works as a referral surface and makes cancelling feel
like losing part of yourself. Referrals are parked (G5), so this waits on that.

**11. Practice exams under real conditions, with an estimated pass mark.** A strong promise only once
a bank passes answerability (gate G8). No exam is `ready` yet.

**12. Cowork and Tools for working actuaries.** A different buyer, usually an employer paying for
it, and probably a different product with its own price. Keep it out of the student Pro offer.

---

## 3. What changes on the Upgrade page

- **Stop gating the reader's own mastery levels.** Hiding someone's own data reads as a hostage
  situation, and people don't value what they've never seen. Levels become free. Pro gets what
  happens next: the plan, the forecast, the study group and the Tutor. This also keeps to G4's rule:
  never paywall the core retrieval loop.
- **Drop "Fund new exams and questions."** It reads as a donation appeal. A thank-you line after
  purchase is enough.
- **Change the headline** to the outcome in §1.
- **Show the forecast, not a feature list.** The first screen answers "when am I ready?" with the
  reader's own number if they have one.

---

## 4. Suggested order

1. Headline and copy change (§3). Packaging only, no code beyond the page. *Needs §6 D-P1 first.*
2. Reverse trial (item 2). Small, and measurable through the existing Stripe and GA events.
3. Readiness forecast (item 1). Reuses existing code.
4. Sitting Pass with an invoice (item 3).
5. Study Group design, privacy and moderation review, then build (item 5).
6. Tutor to Pro, and a second exam for it (item 6), as D25 allows.
7. Pass promise (item 4), only once an exam is `ready`.
8. Examiner marking (item 7), after L9.

Items 1–4 mostly reuse existing code. Item 5 is the largest new surface and needs a privacy
review before any code.

---

## 5. Measures

Read these before and after each change, using the instrumentation in
`docs/analytics-and-monitoring.md`:

- Upgrade-page visits to checkout starts, and checkout starts to paid (Stripe).
- Trial to paid, and Pro retention at 1, 3 and 6 months (roadmap §7 already names these).
- For the study group: share of Pro members who post, and whether members stay active on their exam
  past week four.
- For the pass promise: none until it is live. Track the pass rate of Pro members against
  published pass rates, and report it honestly whichever way it goes.

---

## 6. Decisions for the maintainer

Each needs a decision before anything is built or shown. Until one is made, the default in the
last column applies.

| ID | Decision | Default until decided |
|---|---|---|
| D-P1 | Headline and the outcome-first copy on `/upgrade` | Keep current copy |
| D-P2 | Trial length and whether it is offered to every account that sets an exam date | Not offered |
| D-P3 | The Sitting Pass: price, duration and whether it replaces or sits beside monthly | Not offered |
| D-P4 | Study Group: separate from Actuaria cohorts, or the same mechanism | Separate |
| D-P5 | Study Group privacy: anonymous by default, and whether members can ever be named | Anonymous, not nameable |
| D-P6 | Pass promise: what "Ready" means, what is refunded or re-offered, and when it goes live | Not shown |
| D-P7 | Whether Listen is Pro (D12) | Free |
| D-P8 | Whether the Tutor is Pro beyond Beta (D25) and the second exam for it | Pro at Beta, Exam 5 only |

Money, account access and who sees a product are the maintainer's calls (`roadmap.md` §0.1).
This page does not change any of them.
