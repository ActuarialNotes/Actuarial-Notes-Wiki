---
id: "masi-an-072"
exam: "Exam MAS-I"
topic: "Severity Distribution"
learning_objective: "Statistics"
difficulty: medium
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Severity+Distribution
  - Concepts/Mean+Excess+Loss
  - Concepts/Hazard+Rate
  - Concepts/Exponential+Distribution
  - Concepts/Gamma
  - Concepts/Weibull+Distribution
  - Concepts/Pareto+Distribution
points: 4
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:fa454c3125e2127c8eebe4f4cdd36d74c7052d26532f265c3e6aebc44aa81ce8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-072.md
---

An actuary examines four large samples of claim sizes, one from each of four lines of business. For each, match what the data show to the severity family that best explains it. An option may be used more than once or not at all.

## Part a (1 point)
The empirical mean excess loss rises in a straight line as the threshold increases, by about 0.5 for each unit increase in the threshold.

- A) Exponential
- B) Gamma with shape greater than 1
- C) Weibull with shape less than 1
- D) Pareto
- E) Lognormal

### Answer
D

### Explanation
The Pareto's mean excess loss is $e(d) = (d + \theta)/(\alpha - 1)$, linear in $d$; a slope of 0.5 points to $\alpha = 3$. The Weibull with shape below 1 and the lognormal also have rising mean excess losses, but they rise more slowly than linearly; the exponential's is flat and the gamma's (shape above 1) falls.

## Part b (1 point)
A plot of $\ln\big[-\ln S_n(x)\big]$ against $\ln x$, where $S_n$ is the empirical survival function, is close to a straight line with slope 0.6.

- A) Exponential
- B) Gamma with shape greater than 1
- C) Weibull with shape less than 1
- D) Pareto
- E) Lognormal

### Answer
C

### Explanation
For a Weibull, $S(x) = e^{-(x/\theta)^{\tau}}$, so $\ln[-\ln S(x)] = \tau\ln x - \tau\ln\theta$: a straight line with slope $\tau$. Slope 0.6 means $\tau = 0.6 < 1$. An exponential is the Weibull with $\tau = 1$, so it would give slope 1 (**A** is wrong); the other families give curved plots.

## Part c (1 point)
The empirical mean excess loss is roughly the same at every threshold.

- A) Exponential
- B) Gamma with shape greater than 1
- C) Weibull with shape less than 1
- D) Pareto
- E) Lognormal

### Answer
A

### Explanation
A constant mean excess loss is memorylessness: the exponential's excess over any threshold is exponential with the same mean. **B** has a falling mean excess, **C**, **D** and **E** rising ones.

## Part d (1 point)
The empirical hazard rate rises with claim size and then levels off, and the mean excess loss falls toward a constant as the threshold grows.

- A) Exponential
- B) Gamma with shape greater than 1
- C) Weibull with shape less than 1
- D) Pareto
- E) Lognormal

### Answer
B

### Explanation
A gamma with shape $\alpha > 1$ has an increasing hazard rate that approaches $\theta^{-1}$ from below, so its tail behaves ever more like an exponential with mean $\theta$; its mean excess loss accordingly falls toward $\theta$. A Weibull with shape above 1 also has a rising hazard, but it keeps rising without limit — and that option is not offered. **A** has a constant hazard from the start; **C**, **D** and **E** have hazards that eventually fall.
