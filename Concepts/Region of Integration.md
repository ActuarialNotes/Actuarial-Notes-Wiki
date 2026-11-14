---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:43f84fd39cb1dfa9b5ff1052e8f749dc716949f173bf64962c8e3878d2b9f5fc
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
The **Region of Integration** is the set $R$ of points $(x, y)$ over which a double integral of a [[Joint Probability Density Function|joint density]] $f(x, y)$ is taken. It is the part of the event $E$ whose probability is wanted that lies in the support, where $f(x, y) > 0$. For a [[Continuous Random Variable|continuous]] pair $(X, Y)$, the probability of $E$ is

> $$P\big((X, Y) \in E\big) = \iint_R f(x, y)\,dA$$

- $dA$ is the area element, $dy\,dx$ or $dx\,dy$ in the order the limits are taken.

To evaluate it, $R$ is cut into vertical slices, one for each $x$, so the integral is

> $$\iint_R f\,dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x, y)\,dy\,dx$$

- $a$ and $b$ are the smallest and largest $x$ in $R$.
- $g_1(x)$ and $g_2(x)$ are the lower and upper edges of $R$ that the vertical line at $x$ crosses.

Horizontal slices swap the roles of $x$ and $y$. Choose the order in which one formula describes every slice. If an edge changes formula part-way, split $R$ there and add the pieces. When $R$ is awkward, its complement is often a single slice, and $P(E) = 1 - P(E^c)$.

> [!example]- What is $P(X + Y < 2)$ for these two report times? {Example}
> Two claims are reported at independent exponential times with mean 1 year. With $X$ the earlier and $Y$ the later report time, the joint density is $f(x, y) = 2e^{-x-y}$ for $0 < x < y$.
>
> > [!answer]-
> > - The support lies above the diagonal $y = x$, and the event lies below the line $y = 2 - x$.
> > - They cross at $(1, 1)$, so $R$ is the triangle with corners $(0, 0)$, $(1, 1)$ and $(0, 2)$.
> > - With $x$ outside, every vertical slice runs from $y = x$ up to $y = 2 - x$, so one integral covers $R$. With $y$ outside, the right edge changes at $y = 1$ and two integrals are needed.
> > - The inner integral is $\int_x^{2-x} 2e^{-x}e^{-y}\,dy = 2e^{-2x} - 2e^{-2}$.
> > - The outer integral is $\int_0^1 \left(2e^{-2x} - 2e^{-2}\right)dx = (1 - e^{-2}) - 2e^{-2}$.
> > - So $P(X + Y < 2) = 1 - 3e^{-2} = 0.594$.
> > - Check: $X + Y$ is the sum of the two report times, a [[Gamma]]$(2, 1)$, and $P(\text{Gamma}(2, 1) < 2) = 1 - e^{-2}(1 + 2)$, the same value.

## Constant density

When $f$ is constant on its support, as for independent uniform variables, no integral is needed. The probability of $E$ is

> $$P(E) = \frac{\text{area}(R)}{\text{area of the support}}$$

> [!example]- $X$ and $Y$ are independent and uniform on $(0, 10)$. What is $P(X + Y > 12)$? {Example}
> - The density is the constant $\frac{1}{100}$ on the square, so the probability is an area ratio.
> - The part of the square above $x + y = 12$ is the triangle with corners $(2, 10)$, $(10, 10)$ and $(10, 2)$.
> - Its legs are 8, so its area is $\frac{1}{2} \times 8 \times 8 = 32$.
> - $P(X + Y > 12) = \frac{32}{100} = 0.32$.
> - As an integral, the outer limit starts at $x = 2$, because below it even $y = 10$ cannot reach 12.

## Common regions

| Event | Region |
| --- | --- |
| $X < Y$ | above the diagonal $y = x$ |
| $X + Y \le s$ | below the line $x + y = s$ |
| $\max(X, Y) \le t$ | both $x \le t$ and $y \le t$; for non-negative variables the square $[0, t]^2$ |
| $\min(X, Y) > t$ | both $x > t$ and $y > t$, the quadrant beyond $(t, t)$ |
| $X \le x_0$ and $Y \le y_0$ | the quadrant below and left of $(x_0, y_0)$ |

The region below $x + y = s$ gives the cdf of a sum, the [[Transformations of Random Variables#Transformations of several random variables|cdf method]] for $X + Y$. The last region is the [[Joint Cumulative Distribution Function|joint cdf]] $F(x_0, y_0)$. The same limits give normalizing constants, [[Marginal Probability Function|marginals]] and expectations of a continuous pair. For a [[Discrete Random Variable|discrete]] pair, the region is the set of cells of the joint table to add.

> [!trap] Integrating over the event and ignoring the support
> Sketch the support, draw the event's boundary and mark where they cross before writing any limit. In the uniform example, integrating $x$ from 0 instead of 2 gives $\int_0^{10} \frac{x - 2}{100}\,dx = 0.3$, not 0.32.
