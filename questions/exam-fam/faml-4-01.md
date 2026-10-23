---
id: "faml-4-01"
exam: "Exam FAM"
topic: "Whole Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Whole+Life+Insurance
  - Concepts/Term+Life+Insurance
  - Concepts/Variance
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:bbc33ff0008408cab6fb6a68d16c0dab31cce3a3fbc223742704de5749b2cbfc
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.1, p.26 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.1, p.18 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-01.md
---

For a special whole life insurance policy issued on (40), you are given:

(i) Death benefits are payable at the end of the year of death

(ii) The amount of benefit is 2 if death occurs within the first 20 years and is 1 thereafter

(iii) $Z$ is the present value random variable for the payments under this insurance

(iv) $i = 0.03$

(v)

| $x$ | $A_{x}$ | $_{20}E_{x}$ |
|---|---|---|
| 40 | 0.36987 | 0.51276 |
| 60 | 0.62567 | 0.17878 |

(vi) $E[Z^{2}] = 0.24954$

Calculate the standard deviation of $Z$.

[Question 14 on the Fall 2012 exam]

- A) 0.27
- B) 0.32
- C) 0.37
- D) 0.42
- E) 0.47

## Explanation

$$\begin{align*}
E[Z] &= 2 \cdot A_{40} - {}_{20}E_{40}\,A_{60} \\
&= (2)(0.36987) - (0.51276)(0.62567) \\
&= 0.41892
\end{align*}$$

$E[Z^{2}] = 0.24954$, which is given in the problem.

$$\begin{align*}
Var(Z) &= E[Z^{2}] - (E[Z])^{2} \\
&= 0.24954 - 0.41892^{2} \\
&= 0.07405 \\
SD(Z) &= \sqrt{0.07405} \\
&= 0.27212
\end{align*}$$

An alternative way to obtain the mean is $E[Z] = 2A^{1}_{40:\overline{20}|} + {}_{20|}A_{40}$. Had the problem asked for the evaluation of the second moment, a formula is

$$\begin{align*}
E[Z^{2}] &= (2^{2})\left({}^{2}A^{1}_{40:\overline{20}|}\right) + (v^{2})^{20}\left({}_{20}p_{40}\right)\left({}^{2}A_{60}\right)
\end{align*}$$

The answer is **A**.
