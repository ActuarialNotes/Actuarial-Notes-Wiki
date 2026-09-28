---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:cb44352df8f797e3752c952bbd96b971eae75d236737a8e5a0be02d7cb92ed90
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.2 Joint Cumulative Distribution Function (properties list; f = d2F/dxdy), web page as fetched 2026-09-28, sha256:fc19c160488ff9c1371e9f6493b4a7ae3ba62c1099de5298d9486ca71ed68b97 — https://www.probabilitycourse.com/chapter5/5_2_2_joint_cdf.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Joint Cumulative Distribution Function.md
---

The **joint cumulative distribution function** (joint CDF) of random variables $X$ and $Y$ gives the probability that $X \leq x$ and $Y \leq y$ simultaneously.

> $$F(x,y) = P(X \leq x,\; Y \leq y)$$

- It is non-decreasing in each argument and right-continuous
- $F(-\infty, y) = F(x, -\infty) = 0$ and $F(\infty, \infty) = 1$
- For continuous jointly distributed variables, the joint PDF is recovered by:

> $$f(x,y) = \frac{\partial^2 F(x,y)}{\partial x\, \partial y}$$

- The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$

![[Media/Figures/Joint_Cumulative_Distribution_Function.svg|340]]

> [!example]- Computing a Joint Probability {Example}
> $X$ and $Y$ are independent, each Uniform on $[0,1]$. Find $P(X \leq 0.4,\; Y \leq 0.6)$.
>
> > [!answer]-
> > Since $X$ and $Y$ are independent with $F_X(x) = x$ and $F_Y(y) = y$:
> > $$F(0.4, 0.6) = F_X(0.4) \cdot F_Y(0.6) = 0.4 \times 0.6 = 0.24$$
