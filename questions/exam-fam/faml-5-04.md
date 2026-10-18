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
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cc364508952f52b4d4b0df3c096452038625f435c19aee4574723567413f1872
  sources: []
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
\bar{a}_{\overline{50}|} &= \int_{0}^{50} e^{-\delta t}\,dt \\
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
