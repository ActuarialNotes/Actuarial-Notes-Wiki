---
id: "faml-4-07"
exam: "Exam FAM"
topic: "Pure Endowment"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Pure+Endowment
  - Concepts/Variance
  - Concepts/Interest+Rate
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:73138168d2459c97403b41aa3f20a936d3bcf8a836625e05a18f4b13ee74172e
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.7, p.29 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.7, p.21 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-07.md
---

For a 25-year pure endowment of 1 on $(x)$, you are given:

(i) $Z$ is the present value random variable at issue of the benefit payment

(ii) $Var(Z) = 0.10E[Z]$

(iii) $_{25}p_{x} = 0.57$

Calculate the annual effective interest rate.

[Question 6 on the Fall 2017 exam]

- A) 5.8%
- B) 6.0%
- C) 6.2%
- D) 6.4%
- E) 6.6%

## Explanation

$$\begin{align*}
Var(Z) = 0.10E[Z] &\Rightarrow v^{50}\,{}_{25}p_{x}(1 - {}_{25}p_{x}) = 0.10 \cdot v^{25}\,{}_{25}p_{x} \\
&\Rightarrow \frac{(1 - 0.57)}{(1 + i)^{50}} = 0.10 \times \frac{1}{(1 + i)^{25}} \\
&\Rightarrow (1 + i)^{25} = \frac{0.43}{0.10} \\
&\Rightarrow (1 + i)^{25} = 4.3 \\
&\Rightarrow i = 0.06
\end{align*}$$

The answer is **B**.
