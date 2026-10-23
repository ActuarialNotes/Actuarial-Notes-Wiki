---
id: "fams-099"
exam: "Exam FAM"
topic: "On-Leveling"
learning_objective: "Pricing and Reserving for Short-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/On-Leveling
  - Concepts/Parallelogram+Method
  - Concepts/Earned+Premium
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2ba10ef82a4010b21780b1c72e7e473f57ece9821eb9b240f03e63dd3f8a4739
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q99, p.81, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q99, p.39, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-099.md
---

Company XYZ sells dental insurance policies. You are given:

(i) All policies have a one-year term.

(ii) Policy effective dates are uniformly distributed.

(iii) The earned premium for Calendar Year 3 is 600.

The following rate changes have occurred:

| Date | Rate change |
|---|---|
| September 1, CY1 | 3.0% |
| May 15, CY3 | 2.0% |
| August 1, CY4 | 5.0% |

Rates are currently at the level set on August 1, CY4.

Calculate the earned premium at current rates for CY3.

- A) 610
- B) 617
- C) 632
- D) 640
- E) 659

## Explanation

![Parallelogram diagram: calendar years CY1 to CY5 across, with diagonal lines rising from Sep (CY1), May (CY3) and Aug (CY4). In CY3 the rate level is P above the May line and 1.02P below it; after the Aug line it is (1.02)(1.05)P.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/fam-s-q099-parallelogram.png)

Let $P$ denote the rate following the Sept 1, CY1 rate change.

For CY3, the average rate level for the earned exposure is:

$$\begin{align*}
&\left[1 - \frac{1}{2}\left(\frac{7.5}{12}\right)^2\right]P + \frac{1}{2}\left(\frac{7.5}{12}\right)^2(1.02P) \\
&= 1.00390625P
\end{align*}$$

Current rates are

$$\begin{align*}
&1.02 \times 1.05P \\
&= 1.071P
\end{align*}$$

$$\begin{align*}
\text{CY3 earned premium at current rates} &= 600 \times \frac{1.071P}{1.00390625P} \\
&= 640.10
\end{align*}$$

The answer is **D**.
