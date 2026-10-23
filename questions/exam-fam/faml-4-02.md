---
id: "faml-4-02"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Present+Value
  - Concepts/Fractional+Age+Assumption
answer: "D"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b98bf17f9f9de58074509a9c28fe8d98b4ab1b28acc7e76d99119211cd82e440
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.2, p.27 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.2, p.18 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-02.md
---

For a special 2-year term insurance policy on $(x)$, you are given:

(i) Death benefits are payable at the end of the half-year of death

(ii) The amount of the death benefit is 300,000 for the first half-year and increases by 30,000 per half-year thereafter

(iii) $q_{x} = 0.16$ and $q_{x+1} = 0.23$

(iv) $i^{(2)} = 0.18$

(v) Deaths are assumed to follow a constant force of mortality between integral ages

(vi) $Z$ is the present value random variable for this insurance

Calculate $\Pr(Z > 277{,}000)$.

[Question 15 on the Fall 2012 exam]

- A) 0.08
- B) 0.11
- C) 0.14
- D) 0.18
- E) 0.21

## Explanation

| Half-year | PV of Benefit |
|---|---|
| 1 | $300{,}000v^{0.5} = (300{,}000)(1.09)^{-1} = 275{,}229$ |
| 2 | $330{,}000v^{1} = (330{,}000)(1.09)^{-2} = 277{,}754$ |
| 3 | $360{,}000v^{1.5} = (360{,}000)(1.09)^{-3} = 277{,}986$ |
| 4 | $390{,}000v^{2} = (390{,}000)(1.09)^{-4} = 276{,}286$ |

$PV > 277{,}000$ if and only if $(x)$ dies in the 2nd or 3rd half years.

Under CF assumption,

$$\begin{align*}
{}_{0.5}p_{x} = {}_{0.5}p_{x+0.5} &= (0.84)^{0.5} \\
&= 0.9165
\end{align*}$$

and

$$\begin{align*}
{}_{0.5}p_{x+1} = {}_{0.5}p_{x+1.5} &= (0.77)^{0.5} \\
&= 0.8775
\end{align*}$$

Then the probability of dying in the 2nd or 3rd half-years is

$$\begin{align*}
\left({}_{0.5}p_{x}\right)\left(1 - {}_{0.5}p_{x+0.5}\right) + \left(p_{x}\right)\left(1 - {}_{0.5}p_{x+1}\right) &= (0.9165)(0.0835) + (0.84)(0.1225) \\
&= 0.1794
\end{align*}$$

The answer is **D**.
