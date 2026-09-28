---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:4935507c2dc67707d5c1ac46d28fda5623a63f47ce0c230db7fdee27fc4ee63b
  sources:
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.1 Joint Probability Density Function (eq. 5.15, marginal PDFs, Example 5.15), web page as fetched 2026-09-28, sha256:c2ca39bee0f18d77474ce3ddaf824f6c191da3903c3f4a2ce4389c6ffae9bc94 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q244 (marginal by adding columns, PDF p.72), Q239 (discrete joint cdf, PDF p.71), Q410 (discrete joint cdf, PDF p.115), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Marginal Probability Function.md
---

The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p(x,y)$ by summing over all values of $Y$, describing the behavior of each variable in isolation.

> $$p_X(x) = P(X = x)$$

> $$= \sum_y p(x, y)$$

- Similarly $p_Y(y) = \sum_x p(x,y)$
- In the continuous case, the marginal PDF is:

> $$f_X(x) = \int_{-\infty}^{\infty} f(x,y)\,dy$$

- Marginal distributions are the starting point for computing [[Moments for Joint Distributions]] and assessing [[Independent Random Variables|independence]]

![[Media/Figures/Marginal_Probability_Function.svg|340]]

> [!example]- Finding a Marginal PMF {Example}
> Joint PMF: $p(1,1) = 0.2$, $p(1,2) = 0.3$, $p(2,1) = 0.1$, $p(2,2) = 0.4$. Find $p_X(x)$.
>
> > [!answer]-
> > $$p_X(1) = p(1,1) + p(1,2) = 0.2 + 0.3 = 0.5$$
> > $$p_X(2) = p(2,1) + p(2,2) = 0.1 + 0.4 = 0.5$$
