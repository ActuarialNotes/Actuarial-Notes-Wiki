---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:86baa3f9b352d1106bcf4e4d7a91a8bf2ed58835651a4a4ff9e0deeeaa146efd
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.1 Joint Probability Density Function (probability as the double integral; marginal PDFs; normalisation with inner limit in the outer variable), web page as fetched 2026-09-28, sha256:256703bb60bfcdf98140e34bd6b476a7875aabd59ced22f8f881189b09ec8886 — https://www.probabilitycourse.com/chapter5/5_2_1_joint_pdf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.2.3 Conditioning and Independence (f_X|Y = f_XY/f_Y; independence iff f_XY = f_X f_Y), web page as fetched 2026-09-28, sha256:a87cccc76b2d0a5139f26cd6a59fa1aac41b982e3e3d2d16bb353b9c41dac04c — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 4.2 (density factorisation iff independent, PDF p.173), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Joint Probability Density Function.md
---
![[Media/Figures/Joint_Probability_Density_Function.svg|340]]

A **Joint Probability Density Function** of two continuous [[Random Variable|random variables]] $X$ and $Y$ is a function $f(x,y)$ whose volume over a region is the probability that $(X,Y)$ lies in that region. It describes their [[Multivariate Distribution|joint distribution]]. The probability that $(X,Y)$ lies in a region $A$ is

> $$P\bigl((X,Y) \in A\bigr) = \iint_A f(x,y)\,dA$$

- $dA$ is the area element, $dy\,dx$ or $dx\,dy$ in an iterated integral.

A valid joint density satisfies $f(x,y) \geq 0$ and integrates to 1 over its support. Setting that double integral equal to 1 is how an unknown constant $c$ is found. The support is the set of points $(x,y)$ where $f(x,y) > 0$.

> [!example]- $f(x,y) = c(x+y)$ on the region $0 < x < y < 1$. What is $c$? {Example}
> - The support is the triangle above the line $y = x$ inside the unit square.
> - For each $x$ from 0 to 1, $y$ runs from $x$ to 1.
> - The inner integral is $\int_x^1 (x+y)\,dy = x + \tfrac{1}{2} - \tfrac{3x^2}{2}$.
> - Integrating over $x$ from 0 to 1 gives $\tfrac{1}{2} + \tfrac{1}{2} - \tfrac{1}{2} = \tfrac{1}{2}$, so the double integral is $\tfrac{c}{2}$.
> - Setting $\tfrac{c}{2} = 1$ gives $c = 2$.

## Limits of integration

The integrand is rarely the hard part. The region is. With $x$ as the outer variable, a probability is the iterated integral

> $$\int_{a}^{b}\int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx$$

- $a$ and $b$ are the smallest and largest values of $x$ in the region, and are numbers.
- $g_1(x)$ and $g_2(x)$ are the lower and upper limits of $y$ for that $x$.

The limits are set up in four steps:

1. Sketch the support, shading the points $(x,y)$ where $f > 0$.
2. Pick an outer variable and read off its full range. Those limits are constants.
3. Hold the outer variable fixed and read the inner variable's range off the sketch. Those limits may involve the outer variable.
4. Check that the limits on $dy$ never contain $y$.

Reversing the order of integration is often easier, but the limits must be read again from the sketch, not swapped.

> [!example]- $X$ and $Y$ have joint density $f(x,y) = 8xy$ for $0 < x < y < 1$. What is $P(Y > 2X)$? {Example}
> - The event $Y > 2X$ is the part of the triangle above the line $y = 2x$.
> - With $x$ outer, $y$ runs from $2x$ to 1, and $x$ can go no higher than $\tfrac{1}{2}$.
> - The inner integral is $\int_{2x}^{1} 8xy\,dy = 4x(1 - 4x^2) = 4x - 16x^3$.
> - The outer integral is $\int_0^{1/2} (4x - 16x^3)\,dx = \left[2x^2 - 4x^4\right]_0^{1/2} = \tfrac{1}{2} - \tfrac{1}{4}$.
> - $P(Y > 2X) = 0.25$.

## Marginal density

The [[Marginal Probability Function|marginal density]] of $X$ integrates $y$ out of the joint density:

> $$f_X(x) = \int f(x,y)\,dy$$

The limits on that inner integral depend on $x$ whenever the support is not a rectangle. The marginal is a function of $x$ alone, so if $y$ survives, the limits were wrong. In the same way, $f_Y(y)$ integrates $x$ out.

> [!example]- Losses on two coverages have joint density $f(x,y) = 8xy$ for $0 < x < y < 1$. What is the marginal density of $Y$? {Example}
> - For a fixed $y$, $x$ runs from 0 to $y$, not from 0 to 1.
> - $f_Y(y) = \int_0^y 8xy\,dx = 8y \cdot \tfrac{y^2}{2} = 4y^3$ for $0 < y < 1$.
> - As a check, $\int_0^1 4y^3\,dy = 1$.
> - Limits of 0 to 1 for $x$ would have given $4y$, which integrates to 2, a sign the region was wrong.

## Conditional density

Given $X = x$, the [[Conditional Probability Function|conditional density]] of $Y$ is the joint density divided by the marginal:

> $$f_{Y \mid X}(y \mid x) = \frac{f(x,y)}{f_X(x)}$$

- $f_X(x) > 0$.

> [!example]- With $f(x,y) = 8xy$ on $0 < x < y < 1$ and $f_Y(y) = 4y^3$, what is the conditional density of $X$ given $Y = y$? {Example}
> - Divide the joint density by the marginal of $Y$: $f_{X \mid Y}(x \mid y) = \dfrac{8xy}{4y^3}$.
> - $f_{X \mid Y}(x \mid y) = \dfrac{2x}{y^2}$ for $0 < x < y$.
> - Given $Y = y$, $X$ is confined to $(0, y)$, so the conditional support shrinks with $y$.

## Independence

$X$ and $Y$ are [[Independent Random Variables|independent]] if and only if the joint density is the product of the marginals:

> $$f(x,y) = f_X(x)\,f_Y(y)$$

Independent $X$ and $Y$ therefore have a rectangular support. A triangular support such as $0 < x < y < 1$ forces dependence no matter how the formula factors, because the range of $Y$ depends on $x$.

## Expected value of a function

The expected value of a function $g(X,Y)$ is

> $$E[g(X,Y)] = \iint g(x,y) f(x,y)\,dx\,dy$$

The integral runs over the support. With $g(x,y) = xy$ it gives $E[XY]$, which [[Moments for Joint Distributions]] and [[Covariance]] use.

> [!trap] A formula that factors on a triangle
> $f(x,y) = 8xy$ on $0 < x < y < 1$ factors as $(8x)(y)$, but $X$ and $Y$ are not independent. The support is a triangle, so the range of $X$ depends on $y$. Check the support before the formula.
