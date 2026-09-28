---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc832a642006cb825a96f06782fd33cdf7ca2469440e6996a74f9da9a03ccace
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 5.1 and Corollary 5.1 (PDF p.218), Corollary 5.2 (PDF p.220), Theorem 6.2 (PDF p.239), Theorem 6.7 (PDF p.267), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.3 Functions of Continuous Random Variables (CDF method, Theorem 4.1 method of transformations, general form (4.6), Uniform(-1,1) squared example), sha256:fc521c3f2e55589d01948dd57e551aee1c34ccda1a11b52302064a9672de23bf — https://www.probabilitycourse.com/chapter4/4_1_3_functions_continuous_var.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §4.1.2 Expected Value and Variance (LOTUS (4.3), E[aX+b] = aEX + b, Var(aX+b) = a^2 Var(X) (4.4)), sha256:120c9fb88296609ab0cd0c2d2e74064ec745b889842a1a93703e328dbf9266ab — https://www.probabilitycourse.com/chapter4/4_1_2_expected_val_variance.php"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), Deductibles (PDF p.7), Benefit Limits (PDF p.8), Inflation (PDF p.9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 learning outcomes a, e, f and Topic 3 learning outcomes a-e, g (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Transformations of Random Variables.md
---

A **Transformation of a Random Variable** produces a new variable $Y = g(X)$ from an existing one. The reliable way to find its distribution is the **CDF method**: write $F_Y(y) = P(g(X) \leq y)$, rearrange the inequality into an event about $X$, evaluate with $F_X$, then differentiate to get the density.

> $$F_Y(y) = P\bigl(g(X) \leq y\bigr)$$

> $$f_Y(y) = \frac{d}{dy}F_Y(y)$$

> $$f_Y(y) = f_X\bigl(g^{-1}(y)\bigr)\left|\frac{d}{dy}g^{-1}(y)\right|$$

- The third line is the **change-of-variable shortcut**, valid only when $g$ is strictly monotone on the support of $X$. The Jacobian factor $|dg^{-1}/dy|$ is what most solutions forget.
- If $g$ is **not** monotone (e.g. $Y = X^2$ with $X$ taking both signs), the shortcut fails — go back to the CDF method and collect every branch of $X$ that maps into the region.
- Always carry the **support** through the transformation. Deriving a correct formula on the wrong interval is the most common way to lose the mark.
- A linear transformation $Y = aX + b$ gives $E[Y] = aE[X] + b$ and $\text{Var}(Y) = a^2\text{Var}(X)$ directly, with no integration needed.
- Insurance applications are transformations: $Y = (X-d)_+$ under a [[Deductible]], $Y = \min(X, u)$ under a [[Benefit Limit]], and $X' = (1+r)X$ under [[Inflation]] all reshape the [[Loss Random Variable]] into the [[Payment Random Variable]].
- If $E[g(X)]$ is all that is wanted, do **not** find $f_Y$ — use $E[g(X)] = \int g(x) f_X(x)\,dx$ directly.

![[Media/Figures/Transformations_of_Random_Variables.svg|340]]

> [!example]- Scaling an Exponential Loss for Inflation {Example}
> Losses follow $X \sim \text{Exponential}$ with mean 1000. Next year losses inflate by 10%, so $Y = 1.1X$. Find the density of $Y$.
>
> > [!answer]-
> > $g(x) = 1.1x$ is strictly increasing, with $g^{-1}(y) = y/1.1$ and $\frac{d}{dy}g^{-1}(y) = 1/1.1$. Apply the change-of-variable formula:
> > $$
> > \begin{align*}
> > f_Y(y) &= f_X\!\left(\frac{y}{1.1}\right) \cdot \frac{1}{1.1} \\
> >        &= \frac{1}{1000}e^{-y/1100} \cdot \frac{1}{1.1} \\
> >        &= \frac{1}{1100}e^{-y/1100}, \quad y > 0
> > \end{align*}
> > $$
> > That is exponential with mean 1100 — scaling an exponential just scales its mean. Dropping the $1/1.1$ Jacobian would have left a density that does not integrate to 1.

> [!example]- The Probability Integral Transform {Example}
> $X$ is continuous with strictly increasing CDF $F_X$. Show that $U = F_X(X)$ is $\text{Uniform}(0,1)$.
>
> > [!answer]-
> > Use the CDF method. For $0 < u < 1$:
> > $$
> > \begin{align*}
> > F_U(u) &= P\bigl(F_X(X) \leq u\bigr) \\
> >        &= P\bigl(X \leq F_X^{-1}(u)\bigr) \\
> >        &= F_X\bigl(F_X^{-1}(u)\bigr) \\
> >        &= u
> > \end{align*}
> > $$
> > $F_U(u) = u$ on $(0,1)$ is exactly the [[Uniform Continuous Distribution|uniform]] CDF. Run backwards, for any CDF $F$ that is strictly increasing where $0 < F < 1$, $X = F^{-1}(U)$ has CDF $F$ — so uniform random numbers can be turned into samples from such a distribution, the basis of simulation.

> [!example]- A Non-Monotone Transformation {Example}
> $X \sim \text{Uniform}(-1, 1)$, so $f_X(x) = 1/2$ on $(-1,1)$. Find the density of $Y = X^2$.
>
> > [!answer]-
> > $g(x) = x^2$ is not monotone on $(-1,1)$, so the shortcut does not apply. Use the CDF method, keeping **both** branches of $X$ that produce $Y \leq y$:
> > $$
> > \begin{align*}
> > F_Y(y) &= P(X^2 \leq y) \\
> >        &= P(-\sqrt{y} \leq X \leq \sqrt{y}) \\
> >        &= \frac{2\sqrt{y}}{2} \\
> >        &= \sqrt{y}, \quad 0 < y < 1
> > \end{align*}
> > $$
> > Differentiating:
> > $$f_Y(y) = \frac{1}{2\sqrt{y}}, \quad 0 < y < 1$$
> > Note the support collapsed from $(-1,1)$ to $(0,1)$ — squaring folds the negative half onto the positive half.
