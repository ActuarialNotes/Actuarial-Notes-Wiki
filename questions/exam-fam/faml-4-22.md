---
id: "faml-4-22"
exam: "Exam FAM"
topic: "Term Life Insurance"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Term+Life+Insurance
  - Concepts/Life+Table
  - Concepts/Mortality
answer: "A"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:0c5bf7821e0002c41bcee9ec929632b2a92bdd47eff35b4fd0ff1c1a517db2cc
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q4.22, p.40 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q4.22, p.27 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM Tables, Standard Ultimate Life Table, pp.20-21, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-4-22.md
---

(50) just had surgery to remove a life-threatening tumor and is purchasing a 3-year term life insurance policy with a face amount of 100,000. You are given:

i) The probability of (50) surviving the first year after surgery is 55% of the Standard Ultimate Life Table survival probability

ii) If (50) survives the first year, subsequent mortality follows the Standard Ultimate Life Table

iii) Benefits are payable at the end of the year of death

iv) $i = 0.05$

Calculate the expected present value of the death benefit.

[Question on October 2022 FAM-L Exam]

- A) 43,000
- B) 44,000
- C) 45,000
- D) 46,000
- E) 47,000

## Explanation

Probability (50) survives one year under Standard Ultimate Life Table $= 1 - 0.001209 = 0.998791$

Probability (50) survives one year following surgery $= 0.55 \times 0.998791 = 0.5493 = p_{50}$

$$\begin{align*}
q_{50} &= 1 - p_{50} \\
&= 0.4507
\end{align*}$$

$$\begin{align*}
A_{50:\overline{3}|}\text{ (as printed)} &= q_{50}\left(\frac{1}{1.05}\right) + p_{50}q_{51}\left(\frac{1}{1.05^{2}}\right) + p_{50}p_{51}q_{52}\left(\frac{1}{1.05^{3}}\right) \\
&= (0.4507)\left(\frac{1}{1.05}\right) + (0.5493)(0.001331)\left(\frac{1}{1.05^{2}}\right) + (0.5493)(0.99867)(0.001469)\left(\frac{1}{1.05^{3}}\right) \\
&= 0.4306
\end{align*}$$

Therefore, answer $= 100{,}000 \times 0.4306 \approx 43{,}000$ (A)

The answer is **A**.
