---
id: "faml-2-05"
exam: "Exam FAM"
topic: "Future Lifetime Random Variable"
learning_objective: "Mortality Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Survival+Model
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:064962263e7c3bd2bb593da5894e8c963824fa4a86613207af88e8044451a664
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/faml-2-05.md
---

You are given the following:

(i) $e_{40:\overline{20}|} = 18$

(ii) $e_{60} = 25$

(iii) $_{20}q_{40} = 0.2$

(iv) $q_{40} = 0.003$

Calculate $e_{41}$.

- A) 36.1
- B) 37.1
- C) 38.1
- D) 39.1
- E) 40.1

## Explanation

$$\begin{align*}
e_{40} &= e_{40:\overline{20}|} + {}_{20}p_{40} \cdot e_{60} \\
&= 18 + (1 - 0.2)(25) \\
&= 38
\end{align*}$$

$$e_{40} = e_{40:\overline{1}|} + p_{40} \cdot e_{41}$$

$$\begin{align*}
\Rightarrow e_{41} &= \frac{e_{40} - e_{40:\overline{1}|}}{p_{40}} \\
&= \frac{e_{40} - p_{40}}{p_{40}} \\
&= \frac{38 - 0.997}{0.997} \\
&= 37.11434
\end{align*}$$

The answer is **B**.
