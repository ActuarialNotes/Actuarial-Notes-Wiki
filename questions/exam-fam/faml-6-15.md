---
id: "faml-6-15"
exam: "Exam FAM"
topic: "Woolhouse's Formula"
learning_objective: "Premium and Policy Value Calculation for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Woolhouse's+Formula
  - Concepts/Fractional+Age+Assumption
  - Concepts/Equivalence+Principle
  - Concepts/Whole+Life+Insurance
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a47ecd5dbe701fbbd72652c2537210c20cb844fed9b160a75055279eca62d012
  sources:
    - "SOA Exam FAM-L Sample Questions (Oct 2024), Q6.15, p.61, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Oct 2024), Q6.15, p.42, sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-6-15.md
---

For a fully discrete whole life insurance of 1000 on $(x)$ with net premiums payable quarterly, you are given:

(i) $i = 0.05$

(ii) $\ddot{a}_{x} = 3.4611$

(iii) $P^{(W)}$ and $P^{(UDD)}$ are the annualized net premiums calculated using the 2-term Woolhouse ($W$) and the uniform distribution of deaths ($UDD$) assumptions, respectively

Calculate $\dfrac{P^{(UDD)}}{P^{(W)}}$.

[A modified version of Question 9 on the Spring 2014 exam]

- A) 1.000
- B) 1.002
- C) 1.004
- D) 1.006
- E) 1.008

## Explanation

Woolhouse:

$$\begin{align*}
{}^{W}\ddot{a}_{x}^{(4)} &= 3.4611 - \frac{3}{8} \\
&= 3.0861
\end{align*}$$

UDD:

$$\begin{align*}
{}^{UDD}\ddot{a}_{x}^{(4)} &= \alpha(4)\ddot{a}_{x} - \beta(4) \\
&= 1.00019(3.4611) - 0.38272 \\
&= 3.0790
\end{align*}$$

and

$$\begin{align*}
A_{x} &= 1 - d\,\ddot{a}_{x} \\
&= 1 - (0.04762)(3.4611) \\
&= 0.83518
\end{align*}$$

$$\begin{align*}
P^{(W)} &= \frac{1000(0.83518)}{3.0861} \\
&= 270.63
\end{align*}$$

$$\begin{align*}
P^{(UDD)} &= \frac{1000(0.83518)}{3.0790} \\
&= 271.25
\end{align*}$$

$$\begin{align*}
\frac{P^{(UDD)}}{P^{(W)}} &= \frac{271.25}{270.63} \\
&= 1.0023
\end{align*}$$

The answer is **B**.
