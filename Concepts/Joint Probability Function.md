---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:f60f3c09c618e76fc0969f3d5a0c0f3e21212aec979fa2e0509d56239c836d93
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.1 Joint Probability Mass Function (sum of the joint PMF over its range = 1; marginal PMF), web page as fetched 2026-09-28, sha256:29a5a73be1d726200cac31415dba2c0cd3ec0184d5f6f81d333ac195ab3a707a — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (discrete conditional PMF P_X|Y = P_XY/P_Y), web page as fetched 2026-09-28, sha256:a87cccc76b2d0a5139f26cd6a59fa1aac41b982e3e3d2d16bb353b9c41dac04c — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Probability Function.md
---

The **joint probability function** (joint PMF) of discrete random variables $X$ and $Y$ fully characterizes the [[Multivariate Distribution]] of $(X, Y)$.

> $$p(x,y) = P(X = x,\; Y = y)$$

- It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$
- [[Marginal Probability Function]]s are obtained by summing out one variable
- [[Conditional Probability Function]]s are obtained by fixing one variable and dividing by its marginal, so the slice sums to 1: $p_{X \mid Y}(x \mid y) = \dfrac{p(x,y)}{p_Y(y)}$ for $p_Y(y) > 0$

![[Media/Figures/Joint_Probability_Function.svg|340]]

> [!example]- Number of Claims and Policies Lapsed {Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policies lapsed (0 or 1). Joint PMF:
>
> | | $Y=0$ | $Y=1$ |
> |---|---|---|
> | $X=0$ | 0.50 | 0.20 |
> | $X=1$ | 0.20 | 0.10 |
>
> > [!answer]-
> > $P(X=1, Y=1) = 0.10$. Marginal $P(X=1) = 0.20 + 0.10 = 0.30$.
> >
> > Conditional: fixing $Y = 1$ leaves the slice $(0.20, 0.10)$, which sums to $p_Y(1) = 0.30$, so $P(X=1 \mid Y=1) = 0.10/0.30 = 1/3$ and $P(X=0 \mid Y=1) = 2/3$.
