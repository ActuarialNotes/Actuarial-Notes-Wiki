---
id: "faml-7-05"
exam: "Exam FAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Policy+Value
  - Concepts/Fractional+Age+Assumption
  - Concepts/Recursion
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:d90f6d89336e14c9460d34eaf798f02cdf94a04cdc73d60ac2fe304a04738376
  sources:
    - "SOA Exam FAM-L Sample Questions (October 2024), Q7.5, p.97, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (October 2024), Q7.5, p.66, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-7-05.md
---

For a fully discrete whole life insurance of 10,000 on ($x$), you are given:

(i) Deaths are uniformly distributed over each year of age

(ii) The net premium is 647.46

(iii) The net premium policy value at the end of year 4 is 1405.08

(iv) $q_{x+4} = 0.04561$

(v) $i = 0.03$

Calculate the net premium policy value at the end of 4.5 years.

[A modified version of Question 9 on the Spring 2013 exam]

- A) 1570
- B) 1680
- C) 1750
- D) 1830
- E) 1900

## Explanation

$${}_{4.5}V = v^{0.5}\,{}_{0.5}p_{x+4.5}\,{}_{5}V + v^{0.5}\,{}_{0.5}q_{x+4.5}\,b$$

where $b = 10{,}000$ is the death benefit during year 5.

$$\begin{align*}
{}_{0.5}q_{x+4.5} &= \frac{{}_{0.5}q_{x+4}}{1 - {}_{0.5}q_{x+4}} \\
&= \frac{0.5(0.04561)}{1 - 0.5(0.04561)} \\
&= 0.02334
\end{align*}$$

$${}_{0.5}p_{x+4.5} = 0.97666$$

$$\begin{align*}
{}_{5}V &= \frac{({}_{4}V + P)(1.03) - q_{x+4}b}{p_{x+4}} \\
{}_{5}V &= \frac{(1{,}405.08 + 647.46)(1.03) - 0.04561(10{,}000)}{0.95439} \\
&= 1{,}737.25
\end{align*}$$

$$\begin{align*}
{}_{4.5}V &= (1.03)^{-0.5}(0.97666)(1{,}737.25) + (1.03)^{-0.5}(0.02334)(10{,}000) \\
&= 1{,}671.81 + 229.98 \\
&= 1{,}902
\end{align*}$$

${}_{4.5}V$ can also be calculated recursively:

$$\begin{align*}
{}_{0.5}q_{x+4} &= 0.5(0.04561) \\
&= 0.02281
\end{align*}$$

$$\begin{align*}
{}_{4.5}V &= \frac{(1{,}405.08 + 647.16\text{ (as printed)})(1.03)^{0.5} - 0.02281(10{,}000)/(1.03)^{0.5}}{1 - 0.02281} \\
&= 1{,}902
\end{align*}$$

The interest adjustment on the death benefit term is needed because the death benefit will not be paid for another one-half year.

The answer is **E**.
