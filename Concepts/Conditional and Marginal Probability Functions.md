---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ef8adf816dce7ff122dcd1b160e6c3e4244bbb5d024a5419c60b9a28bd0fe2aa
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (P(A|B)=P(A∩B)/P(B); f_X|Y = f_XY/f_Y; independence gives f_X|Y = f_X), web page as fetched 2026-09-28, sha256:440ec280d6efdc0929cc844b4e80449f095eeb361179491311b023da88395b95 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Conditional and Marginal Probability Functions.md
---

The **marginal** and **conditional probability functions** each describe a single component of a joint distribution: the marginal PMF $p_X(x)$ is the distribution of $X$ on its own, and the conditional PMF $p_{X \mid Y}(x \mid y)$ is the distribution of $X$ once $Y = y$ is known.

> $$p_X(x) = \sum_y p_{X,Y}(x, y)$$

> $$p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x, y)}{p_Y(y)}$$

- The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability Function|joint PMF]] over the other variable.
- The conditional is defined wherever $p_Y(y) > 0$; it renormalizes the joint by the [[Marginal Probability Function|marginal]] of the conditioning variable.
- If $X$ and $Y$ are [[Independent Random Variables|independent]], the conditional equals the marginal: $p_{X \mid Y}(x \mid y) = p_X(x)$.

> [!example]- Insurance Claims by Policy Type {Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policy type (1 or 2), with joint PMF $p(0,1)=0.3$, $p(1,1)=0.2$, $p(0,2)=0.1$, $p(1,2)=0.4$. Find the marginal distribution of $X$ and $P(X=1 \mid Y=2)$.
>
> > [!answer]-
> > Marginals of $X$: $p_X(0) = 0.3 + 0.1 = 0.4$ and $p_X(1) = 0.2 + 0.4 = 0.6$. Marginal of $Y$ at 2: $p_Y(2) = 0.1 + 0.4 = 0.5$. The conditional is:
> > $$p_{X \mid Y}(1 \mid 2) = \frac{p(1,2)}{p_Y(2)} = \frac{0.4}{0.5} = 0.8$$
> > Given a type-2 policy, there is an 80% chance of a claim.
