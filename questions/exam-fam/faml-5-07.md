---
id: "faml-5-07"
exam: "Exam FAM"
topic: "Woolhouse's Formula"
learning_objective: "Present Value Random Variables for Long-Term Insurance Coverages"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Woolhouse's+Formula
  - Concepts/Annuity+Due
  - Concepts/Endowment+Insurance
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b0eaba0f2eb29a6ff33e0febbd1de490734322d3c82ec13db0d069741daf68d7
  sources:
    - "SOA Exam FAM-L Sample Questions (Topics 7-10, Aug 2026 version), Q5.7, p.45 (question), sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "SOA Exam FAM-L Sample Solutions (Topics 7-10), Q5.7, p.30 (solution and key), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-5-07.md
---

You are given:

(i) $A_{35} = 0.188$

(ii) $A_{65} = 0.498$

(iii) ${}_{30}p_{35} = 0.883$

(iv) $i = 0.04$

Calculate $1000\,\ddot{a}^{(2)}_{35:\overline{30}|}$ using the two-term Woolhouse approximation.

[Question 7 on the Spring 2015 exam]

- A) 17,060
- B) 17,310
- C) 17,380
- D) 17,490
- E) 17,530

## Explanation

$$\ddot{a}^{(2)}_{35:\overline{30}|} \approx \ddot{a}_{35:\overline{30}|} - \frac{(m-1)}{2m}\left(1 - v^{30}\,{}_{30}p_{35}\right)$$

$$\begin{align*}
\ddot{a}_{35:\overline{30}|} &= \frac{1 - A_{35:\overline{30}|}}{d} \\
&= \frac{1 - A^{1}_{35:\overline{30}|} - {}_{30}E_{35}}{d} \\
&= \frac{1 - \left(A_{35} - {}_{30}E_{35} \times A_{65}\right) - {}_{30}E_{35}}{d}
\end{align*}$$

Since ${}_{30}E_{35} = v^{30}\,{}_{30}p_{35} = 0.2722$, then

$$\begin{align*}
\ddot{a}_{35:\overline{30}|} &= \frac{1 - \left(A_{35} - v^{30}\,{}_{30}p_{35} \times A_{65}\right) - v^{30}\,{}_{30}p_{35}}{d} \\
&= \frac{1 - (0.188 - (0.2722)(0.498)) - 0.2722}{(0.04/1.04)} \\
&= 17.5592
\end{align*}$$

$$\begin{align*}
\ddot{a}^{(2)}_{35:\overline{30}|} &\approx 17.5592 - \frac{1}{4}(1 - 0.2722) \\
&= 17.38
\end{align*}$$

$$\begin{align*}
1000\,\ddot{a}^{(2)}_{35:\overline{30}|} &\approx 1000 \times 17.38 \\
&= 17{,}380
\end{align*}$$

The answer is **C**.
