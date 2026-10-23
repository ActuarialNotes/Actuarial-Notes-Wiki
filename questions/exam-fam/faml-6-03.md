---
id: "faml-6-03"
exam: "Exam FAM"
topic: "Equivalence Principle"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Equivalence+Principle
  - Concepts/Deferred+Annuity
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Life+Table
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:433ec989c1b19786779747b47a7df1405df096be3d379bf4c1bca0c055836eab
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.3, p.51, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.3, p.35, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables (Oct 2024), Standard Ultimate Life Table pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-03.md
---

S, now age 65, purchased a 20-year deferred whole life annuity-due of 1 per year at age 45. You are given:

(i) Equal annual premiums, determined using the equivalence principle, were paid at the beginning of each year during the deferral period

(ii) Mortality at ages 65 and older follows the Standard Ultimate Life Table

(iii) $i = 0.05$

(iv) $Y$ is the present value random variable at age 65 for S's annuity benefits

Calculate the probability that $Y$ is less than the actuarial accumulated value of S's premiums.

[A modified version of Question 20 on the Fall 2012 exam]

- A) 0.35
- B) 0.37
- C) 0.39
- D) 0.41
- E) 0.43

## Explanation

Let $C$ be the annual contribution, then $C = \dfrac{{}_{20}E_{45}\,\ddot{a}_{65}}{\ddot{a}_{45:\overline{20}|}}$

Let $K_{65}$ be the curtate future lifetime of (65). The required probability is

$$\begin{align*}
\Pr\left(\frac{C\ddot{a}_{45:\overline{20}|}}{{}_{20}E_{45}} > \ddot{a}_{\overline{K_{65}+1}|}\right) &= \Pr\left(\frac{{}_{20}E_{45}\,\ddot{a}_{65}}{\ddot{a}_{45:\overline{20}|}}\,\frac{\ddot{a}_{45:\overline{20}|}}{{}_{20}E_{45}} > \ddot{a}_{\overline{K_{65}+1}|}\right) \\
&= \Pr\left(\ddot{a}_{65} > \ddot{a}_{\overline{K_{65}+1}|}\right) \\
&= \Pr\left(13.5498 > \ddot{a}_{\overline{K_{65}+1}|}\right)
\end{align*}$$

Thus, since $\ddot{a}_{\overline{21}|} = 13.4622$ and $\ddot{a}_{\overline{22}|} = 13.8212$ we have

$$\begin{align*}
\Pr\left(\ddot{a}_{\overline{K_{65}+1}|} < 13.5498\right) &= \Pr\left(K_{65} + 1 \le 21\right) \\
&= 1 - {}_{21}p_{65} \\
&= 1 - \frac{l_{86}}{l_{65}} \\
&= 1 - \frac{57{,}656.7}{94{,}579.7} \\
&= 0.390
\end{align*}$$

The answer is **C**.
