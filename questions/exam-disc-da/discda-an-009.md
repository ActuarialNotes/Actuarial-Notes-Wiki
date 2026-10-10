---
id: "discda-an-009"
exam: "Exam DISC-DA"
topic: "External Data"
learning_objective: "2. Collecting Data for Insurer Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/External+Data
  - Concepts/Missing+Data
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9a218c91b11a1a72c983a62980e399454d0c775ce1cba17b658676b0d1d1afe8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-009.md
---

An insurer sends its 20,000 homeowners policies to a vendor for a wildfire-risk score. Of 4,000 rural policies, 2,000 are matched; of the 16,000 other policies, 15,600 are matched. The modeler proposes dropping the unmatched policies before fitting the model. What is the main problem with the proposal?

- A) The overall match rate of 88% is too low for the score to be used at all
- B) The vendor's scores must be audited before any record can be matched
- C) Unmatched records are a random sample, so dropping them only reduces volume
- D) Missing scores cluster in rural risks, so dropping them biases the model

## Explanation

Compute the match rates by segment:

$$
\begin{align*}
\text{Rural} &= \frac{2{,}000}{4{,}000} \\
&= 50\% \\
\text{Other} &= \frac{15{,}600}{16{,}000} \\
&= 97.5\% \\
\text{Overall} &= \frac{17{,}600}{20{,}000} \\
&= 88\%
\end{align*}
$$

The unmatched policies are not a random sample: half the rural book is unmatched, against 2.5% of the rest. Dropping them would remove half of the rural risks, so the model would learn mostly from urban and suburban homes. Keeping them with "no score" as a level of its own avoids that. The answer is **D**.

**Why not the others**

- **A** — 88% overall can be workable; the problem is where the 12% falls, not its size.
- **B** — matching attaches the score to a record by a key such as the address; it does not require an audit of the vendor's data first.
- **C** — the segment rates show the opposite: missingness depends on location, which is tied to wildfire risk.
