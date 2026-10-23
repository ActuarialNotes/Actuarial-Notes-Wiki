---
id: "faml-5-04"
exam: "Exam FAM"
topic: "Continuous Annuity"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Continuous+Annuity
  - Concepts/Deferred+Annuity
  - Concepts/Life+Annuity
  - Concepts/Payable+Continuously
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:edc6e7e61edcbb21a3791893a696af3647c2e877a0a2c7cec1cd713eb92c423c
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.4, p.43 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.4, p.29 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-04.md
---

(40) wins the SOA lottery and will receive both:

- A deferred life annuity of $K$ per year, payable continuously, starting at age $40 + \mathring{e}_{40}$ and
- An annuity certain of $K$ per year, payable continuously, for $\mathring{e}_{40}$ years

You are given:

(i) $\mu = 0.02$

(ii) $\delta = 0.01$

(iii) The actuarial present value of the payments is 10,000

Calculate $K$.

[A modified version of Question 5 on the Fall 2013 exam]

- A) 214
- B) 216
- C) 218
- D) 220
- E) 222

## Explanation

$$\mathring{e}_{40} = \frac{1}{\mu} = 50$$

So, receive $K$ for 50 years guaranteed and for life thereafter.

$$10{,}000 = K\left[\bar{a}_{\overline{50}|} + {}_{50|}\bar{a}_{40}\right]$$

$$\begin{align*}
\bar{a}_{\overline{50}|} &= \int_{0}^{50} e^{-\delta t}\text{ (as printed)} \\
&= \frac{1 - e^{-50\delta}}{\delta} \\
&= \frac{1 - e^{-50(0.01)}}{0.01} \\
&= 39.35
\end{align*}$$

$$\begin{align*}
{}_{50|}\bar{a}_{40} &= {}_{50}E_{40}\,\bar{a}_{40+50} \\
&= e^{-(\delta+\mu)50}\,\frac{1}{\mu+\delta} \\
&= e^{-1.5}\,\frac{1}{0.03} \\
&= 7.44
\end{align*}$$

$$\begin{align*}
K &= \frac{10{,}000}{39.35 + 7.44} \\
&= 213.7
\end{align*}$$

The answer is **A**.
