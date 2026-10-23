---
id: "faml-2-02"
exam: "Exam FAM"
topic: "Variance for Conditional and Marginal Distributions"
learning_objective: "Mortality Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Variance+for+Conditional+and+Marginal+Distributions
  - Concepts/Binomial+Distribution
  - Concepts/Mixture+Distribution
  - Concepts/Survival+Model
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:42d4f53cef3c2d46c90310e42f96d2d1096e6d48d064e94e316d4e2912a9fb9b
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q2.2, p.6 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q2.2, p.4 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-02.md
---

Scientists are searching for a vaccine for a disease. You are given:

(i) 100,000 lives age $x$ are exposed to the disease

(ii) Future lifetimes are independent, except that the vaccine, if available, will be given to all at the end of year 1

(iii) The probability that the vaccine will be available is 0.2

(iv) For each life during year 1, $q_{x} = 0.02$

(v) For each life during year 2, $q_{x+1} = 0.01$ if the vaccine has been given, and $q_{x+1} = 0.02$ if it has not been given

Calculate the standard deviation of the number of survivors at the end of year 2.

[Question 20 on the Spring 2013 exam]

- A) 100
- B) 200
- C) 300
- D) 400
- E) 500

## Explanation

This is a mixed distribution for the population, since the vaccine will apply to all once available.

$S$ = # of survivors.

| Available? $(A)$ | $\Pr(A)$ | ${}_{2}p \mid A$ | $E(S \mid A)$ | $Var(S \mid A)$ | $E(S^{2} \mid A)$ |
|---|---|---|---|---|---|
| Yes | 0.2 | 0.9702 | 97,020 | 2,891 | 9,412,883,291 |
| No | 0.8 | 0.9604 | 96,040 | 3,803 | 9,223,685,403 |

$E(S) = 96{,}236$, $E(S^{2}) = 9{,}261{,}524{,}981$, $Var(S) = 157{,}285$, $SD(S) = 397$.

As an example, the formulas for the "No" row are

$\Pr(\text{No}) = 1 - 0.2 = 0.8$

${}_{2}p$ given No = (0.98 during year 1)(0.98 during year 2) = 0.9604.

$E(S \mid \text{No})$, $Var(S \mid \text{No})$ and $E(S^{2} \mid \text{No})$ are just binomial, $n = 100{,}000$; p(success) = 0.9604

$E(S)$, $E(S^{2})$ are weighted averages, $Var(S) = E(S^{2}) - E(S)^{2}$

Or, by the conditional variance formula:

$$\begin{align*}
Var(S) &= Var[E(S \mid A)] + E[Var(S \mid A)] \\
&= 0.2(0.8)(97{,}020 - 96{,}040)^{2} + 0.2(2{,}891) + 0.8(3{,}803) \\
&= 153{,}664 + 3{,}621 \\
&= 157{,}285
\end{align*}$$

$StdDev(S) = 397$

The answer is **D**.
