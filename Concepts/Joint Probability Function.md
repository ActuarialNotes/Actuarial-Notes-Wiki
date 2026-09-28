---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c9880160640fce2f5be6068310e6706026a5af30e3e434c8dd31765dabd2ee4
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
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
