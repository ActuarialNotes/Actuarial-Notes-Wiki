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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:385fd2f9f959834cbef7d3d4c8319927aa886d068c07c3050c2eadfa6bda45be
  sources:
    - "Brunner, \"Exploring the hazard function of the gamma distribution\", STA312 F23 lecture notes (U. Toronto, CC BY-SA), p.1 (alpha=1: exponential, hazard constant at lambda); p.12 (alpha > 1: h(t) increasing and bounded above by lambda; alpha < 1: decreasing), rate lambda = 1/theta, sha256:af161497b7e389ccd381754c64741ddf7ef2209e9702094ce9c08906a6572428 — https://utstat.utoronto.ca/~brunner/oldclass/312f23/lectures/312f23Hazardplots.pdf"
    - "\"Some Ageing Properties of Dynamic Additive Mean Residual Life Model\" (arXiv:1705.10238), p.5 proof: \"since X is IFR, it is also DMRL, so that m_X(t) is decreasing in t\" (increasing failure rate implies decreasing mean residual life), sha256:8bd0d6953690e43efe9ac7b128dd543bb801ff3c0e8ae036aec408dffdf04205 — https://arxiv.org/pdf/1705.10238"
    - "Ghosh & Resnick, \"A Discussion on Mean Excess Plots\" (arXiv:0907.5236v2), pp.1-2 (Pareto/GPD mean excess linear; exponential constant), p.19 (lognormal mean excess ~ u/ln u, rising), sha256:5ae739d69bff50980752dc2c83c3c5d952464e245d3f0ee9bbe097306cbbfbed — https://arxiv.org/pdf/0907.5236"
    - "Siegrist, randomservices.org, ch.5 The Weibull Distribution, failure rate r(t) = k t^(k-1): decreasing for k < 1, increasing without bound for k > 1; ln(-ln S) linear in ln t, sha256:d673ebeb4242d5daa56d213fd6245374f7ead872173ad01ad58e5e74ee4bc57f — https://www.randomservices.org/random/special/Weibull.html"
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.2.2 Pareto hazard function decreasing (heavy tail), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "CAS Exam MAS-I Tables, A.3.2.3 Weibull F(x) = 1 - exp(-(x/theta)^tau), PDF p.12, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks and readings (Tse 2.2-2.5), PDF pp.4, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
A gamma with shape $\alpha > 1$ has an increasing hazard rate, bounded above by $\theta^{-1}$, and an increasing hazard rate makes the mean excess loss decrease. A Weibull with shape above 1 also has a rising hazard, but it keeps rising without limit — and that option is not offered. **A** has a constant hazard from the start; **C** and **D** have falling hazards, and **E**'s mean excess keeps rising.
