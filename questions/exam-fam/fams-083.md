---
id: "fams-083"
exam: "Exam FAM"
topic: "Frequency Distribution"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: hard
type: multiple-choice
wiki_link:
  - Concepts/Frequency+Distribution
  - Concepts/Binomial+Distribution
  - Concepts/Probability+Distributions
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:49b583a16941eb00764d263ba7e1744405468e8084bf06c0d4fafecf8e0272e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-083.md
---

The distribution of the number of claims, $N$, is a member of the $(a, b, 0)$ class. You are given:

i) $P(N = k) = p_k$

ii) $\dfrac{p_6}{p_4} = 0.5$ and $\dfrac{p_5}{p_4} = 0.8$

A zero-modified distribution, $N^M$, associated with $N$ has $P(N^M = 0) = 0.1$.

Calculate $E(N^M)$.

- A) 3.64
- B) 3.73
- C) 3.85
- D) 4.00
- E) 4.05

## Explanation

$$\frac{p_k}{p_{k-1}} = a + \frac{b}{k}$$

$$\Rightarrow\ 0.8 = a + \frac{b}{5} \quad \text{and} \quad \frac{0.5}{0.8} = 0.625 = a + \frac{b}{6}$$

$$\Rightarrow\ 0.8 - 0.625 = b\left(\frac{1}{5} - \frac{1}{6}\right)$$

$$\Rightarrow\ b = 5.25 \quad \text{and} \quad a = -0.25$$

$\Rightarrow N$ is binomial with

$$\frac{-q}{1-q} = -0.25 \quad \text{and} \quad (m+1)\frac{q}{1-q} = 5.25$$

$$\Rightarrow\ m = 20 \quad \text{and} \quad q = 0.2$$

$$\begin{align*}
\Rightarrow E(N^M) &= \left(1 - p_0^M\right)\frac{mq}{1 - (1-q)^m} \\
&= 3.64
\end{align*}$$

The answer is **A**.
