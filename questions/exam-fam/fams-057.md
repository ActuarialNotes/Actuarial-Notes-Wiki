---
id: "fams-057"
exam: "Exam FAM"
topic: "Deductible"
learning_objective: "Short-Term Insurance and Reinsurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Deductible
  - Concepts/Limited+Expected+Value
  - Concepts/Policy+Limit
  - Concepts/Coinsurance
  - Concepts/Short-Term+Insurance+Coverage
answer: "B"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:f8997ed95761c024869252d945fbfd2374446818afde9f420fe6bca8b4658368
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q57, p.47, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q57, p.25, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-057.md
---

Loss amounts have the distribution function

$$F(x) = \begin{cases} (x/100)^2, & 0 \le x \le 100 \\ 1, & x > 100 \end{cases}$$

An insurance policy pays 80% of the amount of the loss in excess of an ordinary deductible of 20, subject to a maximum payment of 60 per loss.

Calculate the conditional expected claim payment, given that a payment has been made.

- A) 37
- B) 39
- C) 43
- D) 47
- E) 49

## Explanation

Pays 80% of loss over 20, with cap of payment at 60, hence $u = 60/0.8 + 20 = 95$.

$$\begin{align*}
E(Y \text{ per loss}) &= \alpha[E(X \wedge 95) - E(X \wedge 20)] \\
&= 0.8\left[\int_0^{95} S(x)\,dx - \int_0^{20} S(x)\,dx\right] \\
&= 0.8\int_{20}^{95} S(x)\,dx \\
&= 0.8\int_{20}^{95}\left(1 - \frac{x^2}{10{,}000}\right)dx \\
&= 0.8\left(x - \frac{x^3}{30{,}000}\right)\Bigg|_{20}^{95} \\
&= 37.35
\end{align*}$$

$$\begin{align*}
E(Y \text{ per payment}) &= \frac{E(Y \text{ per loss})}{1 - F(20)} \\
&= \frac{37.35}{0.96} \\
&= 38.91
\end{align*}$$

The answer is **B**.
