---
id: "fams-017"
exam: "Exam FAM"
topic: "Loss Elimination Ratio"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Deductible
  - Concepts/Limited+Expected+Value
answer: "E"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f42aa913986ca33a79792b34240dcc2090fa2e0c4b21d6bc009ac750452a2a3
  sources:
    - "SOA Exam FAM-S sample questions (June 15, 2026), Q17, p.15, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM-S sample solutions (July 17, 2026), Q17, p.9, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-017.md
---

The graph of the density function for losses is:

![Graph of the density function f(x) against loss amount x: constant at 0.010 from x = 0 to x = 80, then falling in a straight line to 0.000 at x = 120. The vertical axis is marked from 0.000 to 0.012 in steps of 0.002; the horizontal axis at 0, 80 and 120.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/fam-s-q017-density.png)

Calculate the loss elimination ratio for an ordinary deductible of 20.

- A) 0.20
- B) 0.24
- C) 0.28
- D) 0.32
- E) 0.36

## Explanation

$$f(x) = \begin{cases} 0.01, & 0 \le x \le 80 \\ 0.01 - 0.00025(x-80) = 0.03 - 0.00025x, & 80 < x \le 120 \end{cases}$$

$$\begin{align*}
E(x) &= \int_0^{80} 0.01x\,dx + \int_{80}^{120}(0.03x - 0.00025x^2)\,dx \\
&= \frac{0.01x^2}{2}\Bigg|_0^{80} + \frac{0.03x^2}{2}\Bigg|_{80}^{120} - \frac{0.00025x^3}{3}\Bigg|_{80}^{120} \\
&= 32 + 120 - 101.33 \\
&= 50.66667
\end{align*}$$

$$\begin{align*}
E(X-20)_+ &= E(X) - \int_0^{20} xf(x)\,dx - 20\left[1 - \int_0^{20} f(x)\,dx\right] \\
&= 50.6667 - \frac{0.01x^2}{2}\Bigg|_0^{20} - 20\left(1 - 0.01x\Big|_0^{20}\right) \\
&= 50.6667 - 2 - 20(0.8) \\
&= 32.6667
\end{align*}$$

$$\begin{align*}
\text{Loss Elimination Ratio} &= 1 - \frac{32.6667}{50.6667} \\
&= 0.3553
\end{align*}$$

The answer is **E**.
