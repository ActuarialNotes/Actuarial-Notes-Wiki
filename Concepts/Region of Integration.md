---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:e1b9ab828f53dc3efc5d73702c893a86301f6236802dd43f6a4b5d29d99dcabc
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.1 Joint Probability Density Function (eq. 5.15, marginal PDFs, Example 5.15), web page as fetched 2026-09-28, sha256:c2ca39bee0f18d77474ce3ddaf824f6c191da3903c3f4a2ce4389c6ffae9bc94 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php"
    - "Orloff & Bloom, MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022), Reading 7a: Joint Distributions, Independence — §3.1 joint pmf properties p.2, §3.2 joint pdf properties and constant-density area rule p.3, §3.4 joint cdf and f = d2F/dxdy p.5, §3.5 cdf properties p.6, §3.7 marginal pmf p.7, §3.8 marginal pdf p.8, §4 independence and Ex. 13 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §4.1 Def. 4.3 and Ex. 4.12-4.13 (joint distribution function, marginal distributions, independence) pp.142-143 (PDF pp.150-151); §4.2 Def. 4.6, eq. (4.4), Def. 4.7, Thm 4.2 p.165 (PDF p.173); conditional density f_X|Y = f_X,Y/f_Y, PDF p.290; §7.2 Sum of Two Independent Exponential Random Variables (PDF p.300), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), incomplete gamma definition and Gamma entry F(x) = Gamma(alpha; x/theta), PDF p.9, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning objective and outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Region of Integration.md
---

The **Region of Integration** $R$ is the set of points $(x, y)$ over which a double integral of a [[Joint Probability Density Function|joint density]] is taken: the event $A$ whose probability is wanted, cut down to the support where $f(x,y) > 0$. Turning $R$ into limits — constant outer limits, inner limits that may depend on the outer variable — is most of the work in a continuous multivariate Exam P problem.

> $$P\big((X,Y) \in A\big) = \iint_{R} f(x,y)\,dA$$

> $$R = A \cap \{(x,y) : f(x,y) > 0\}$$

> $$\iint_R f\,dA = \int_{a}^{b}\!\!\int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx$$

- **Sketch first.** Shade the support, draw the event's boundary (such as the line $x + y = s$ or $y = 2x$) and mark where they cross. Integrating over $A$ while ignoring the support — or the reverse — is the most common error.
- **Vertical slices** (outer $x$): $a$ and $b$ are the smallest and largest $x$ in $R$; $g_1(x)$ and $g_2(x)$ are the lower and upper edges a vertical line crosses. **Horizontal slices** swap the roles. Choose the order in which one formula describes every slice; if an edge changes formula part-way, split $R$ there and add the pieces.
- **Complement.** When $R$ is awkward, $P(A) = 1 - P(A^c)$ and the complement is often a single slice.
- **Constant density** (independent uniforms): no integral needed. $P(A) = \text{area}(R)/\text{area}(\text{support})$.
- Standard shapes: $X < Y$ lies above the diagonal; $X + Y \le s$ below the anti-diagonal — the CDF method for a sum, see [[Transformations of Random Variables]]; for non-negative variables $\max(X,Y) \le t$ is the square $[0,t]^2$ and $\min(X,Y) > t$ the quadrant beyond $(t, t)$. The [[Joint Cumulative Distribution Function|joint CDF]] $F(x,y)$ integrates over the quadrant below and left of $(x,y)$.
- The same region-setting drives normalising constants, [[Marginal Probability Function|marginals]] and expectations of a [[Continuous Random Variable|continuous]] pair. The [[Discrete Random Variable|discrete]] analogue is choosing which cells of the joint table to add.

> [!example]- Two Report Times and a Split Region {Example}
> Two claims are reported at independent exponential times with mean 1 year. With $X$ the earlier and $Y$ the later report time, $f(x,y) = 2e^{-x-y}$ for $0 < x < y$. Find $P(X + Y < 2)$.
>
> > [!answer]-
> > The support is above the diagonal $y = x$; the event is below $y = 2 - x$. They cross at $(1, 1)$, so $R$ is the triangle with corners $(0,0)$, $(1,1)$ and $(0,2)$.
> >
> > With $x$ outermost, every vertical slice runs from $y = x$ up to $y = 2 - x$ — one integral. With $y$ outermost the right-hand edge changes at $y = 1$ (it is $x = y$ below, $x = 2 - y$ above), so that order needs two integrals. Take $x$ outside:
> > $$
> > \begin{align*}
> > P &= \int_0^1\!\!\int_x^{2-x} 2e^{-x}e^{-y}\,dy\,dx \\
> >   &= \int_0^1 2e^{-x}\left(e^{-x} - e^{-(2-x)}\right)dx \\
> >   &= \int_0^1 \left(2e^{-2x} - 2e^{-2}\right)dx \\
> >   &= \left(1 - e^{-2}\right) - 2e^{-2} \\
> >   &= 1 - 3e^{-2} \\
> >   &= 0.594
> > \end{align*}
> > $$
> > Check: $X + Y$ is just the sum of the two report times, a [[Gamma]]$(2, 1)$, and $P(\text{Gamma}(2,1) < 2) = 1 - e^{-2}(1 + 2)$. The region was right.

> [!example]- Aggregate Cover on Two Uniform Losses {Example}
> Losses $X$ and $Y$ on two policies are independent and uniform on $(0, 10)$, in \$000s. An aggregate cover responds when $X + Y > 12$. Find the probability it responds.
>
> > [!answer]-
> > The density is the constant $\tfrac{1}{100}$ on the square, so the answer is an area ratio. The region above $x + y = 12$ inside the square is a right triangle with corners $(2,10)$, $(10,10)$ and $(10,2)$ — legs of 8, area 32. As an integral:
> > $$
> > \begin{align*}
> > P(X + Y > 12) &= \int_2^{10}\!\!\int_{12-x}^{10} \frac{1}{100}\,dy\,dx \\
> >               &= \int_2^{10} \frac{x - 2}{100}\,dx \\
> >               &= \frac{32}{100} \\
> >               &= 0.32
> > \end{align*}
> > $$
> > The outer limit starts at $x = 2$, not 0: below it even $y = 10$ cannot reach 12. That clipping by the support is exactly what the sketch is for.
