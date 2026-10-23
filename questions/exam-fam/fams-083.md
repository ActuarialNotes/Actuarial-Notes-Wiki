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
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:49b583a16941eb00764d263ba7e1744405468e8084bf06c0d4fafecf8e0272e7
  sources:
    - "SOA Exam FAM Sample Questions, Syllabus Topics 1-6 (June 15, 2026), Q83, p.65, sha256:ef535e2198444052082114642e5884d8fe279975ebe7059abb363c5ecfcfd4de — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-s-sample-questions.pdf"
    - "SOA Exam FAM Sample Solutions, Syllabus Topics 1-6 (July 17, 2026), Q83, p.33, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
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
