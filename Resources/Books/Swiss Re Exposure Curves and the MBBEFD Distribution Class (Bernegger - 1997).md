---
Title: "The Swiss Re Exposure Curves and the MBBEFD Distribution Class"
Authors: "Stefan Bernegger"
Publisher: "ASTIN Bulletin"
Year: "1997"
date: "1997"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:0b1e0fc949bf9c95753402c9314dbab1350f31fe7f87c9e93de5fad8853aa066
  sources:
    - "Bernegger, The Swiss Re Exposure Curves and the MBBEFD Distribution Class (ASTIN Bulletin 27(1), 1997), pp.99-111 (whole paper; every equation (2.1)-(4.6) and figure caption read from the page images, OCR text for the prose), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Swiss Re Exposure Curves and the MBBEFD Distribution Class (Bernegger - 1997).md
---
![[Swiss Re Exposure Curves and the MBBEFD Distribution Class (Bernegger - 1997) - Cover.svg]]

A paper introducing a new two-parameter family of analytical functions, the MBBEFD class, for modelling loss distributions and exposure curves. The family contains the Maxwell-Boltzmann, Bose-Einstein and Fermi-Dirac distributions of statistical mechanics, and can be used on the finite interval [0, 1] as well as on [0, ∞). The functions defined on [0, 1] are related in detail to the Swiss Re exposure curves used in practice, and can be fitted to the first two moments of a loss distribution or to its first moment and total loss probability.

> [!info] On the syllabus
> - [[Exam 9 (CAS)|Exam 9]] — objective A1, fit loss distribution-based exposure curves; the whole paper, with no exclusions in the content outline.

## 1 Introduction
- Rating of non proportional (NP) [[Reinsurance|reinsurance]] treaties should rely not only on past loss experience but also on actual exposure; for per risk covers, exposure rating is based on risk profiles, in which all risks of similar size (SI, MPL or EML) are summarized in a risk band, assumed homogeneous and modelled by one loss distribution function.
- The problem of exposure rating is how to divide the total premiums of one band between the ceding company and the reinsurer, solved in two steps: the overall risk premiums per band are estimated by applying an appropriate loss ratio to the gross premiums, then divided into risk premiums for the retention and for the cession.
- That division is possible, in NP reinsurance, only with the help of the loss distribution function; the correct one for an individual band is hardly known in practice, so distribution functions derived from large portfolios of similar risks are used, available as exposure curves ([[Exposure Curves|exposure curves]]), which directly give the risk premium ratio the reinsurer requires as a function of the [[Deductible|deductible]].
- Underwriters often have only a finite number of discrete exposure curves, in graphical or tabular form, and might want a virtual curve lying between two of them; this can be achieved by replacing the discrete curves with analytical exposure curves, each set of parameters defining another curve.
- A curve family with many (more than two) parameters makes it difficult to find parameters associated with the information available for a class of risks, so the family is restricted to a one- or two-parameter subclass whose parameters underwriters can interpret.
- Section 2 discusses general relations between a distribution function and its exposure curve, Section 3 introduces the new two-parameter class of distribution functions, and Section 4 discusses practical aspects and the link to the Swiss Re property exposure curves $Y_i$.

## Conventions
- Following the notation of Daykin et al., stochastic variables are denoted by bold letters (**X** or **x**), monetary variables by capital letters (X or M), and ratio variables by small letters ($x = X/M$).

## 2 Distribution Function and Exposure Curve
- 2.1 Definition of the exposure curve
    - The relation between the distribution function $F(x)$ on the interval [0, 1] and its [[Limited Expected Value|limited expected value]] function $L(d) = E[\min(d, \mathbf{x})]$, with $d = D/M$ the normalized deductible and $\mathbf{x} = \mathbf{X}/M$ the normalized gross loss ($\mathbf{X} \le M$).
    - The deductible $D$ is the cedent's maximum retention under a non proportional reinsurance treaty; $M$ is the maximum possible loss (MPL); $M \cdot L(d)$ is the expected value of the losses retained by the cedent and $M \cdot (L(1) - L(d))$ the expected value of the losses paid by the reinsurer.
    - The ratio of the pure risk premiums retained by the cedent is the relative limited expected value function $G(d) = L(d)/L(1)$, also called the **exposure curve**:

> $$G(d) = \frac{L(d)}{L(1)} = \frac{\int_0^d (1-F(y))\,dy}{\int_0^1 (1-F(y))\,dy} = \frac{\int_0^d (1-F(y))\,dy}{E[x]}$$

    - Because $1 - F(x) \ge 0$ and $F'(x) = f(x) \ge 0$, $G(d)$ is an increasing and concave function on [0, 1], with $G(0) = 0$ and $G(1) = 1$ by definition.
- 2.2 Deriving the distribution function from the exposure curve
    - If the exposure curve $G(x)$ is given, the distribution function follows from $G'(d) = \dfrac{1 - F(d)}{E[x]}$ (2.2).
    - With $F(0) = 0$ and $G'(0) = 1/E[x]$: $F(x) = 1$ for $x = 1$, and $F(x) = 1 - G'(x)/G'(0)$ for $0 \le x < 1$ (2.3).
    - $F(x)$ and $G(x)$ are therefore equivalent representations of the loss distribution.
- 2.3 Total loss probability and expected value
    - The total loss probability $p$ equals $1 - F(1^-)$ and the expected (or average) loss $\mu$ equals $E[x]$; both can be derived directly from the derivatives of $G(x)$ at $x = 0$ and $x = 1$:

> $$\mu = E[x] = \frac{1}{G'(0)}, \qquad p = 1 - F(1^-) = \frac{G'(1)}{G'(0)}$$

    - Because $G(x)$ is concave and increasing on [0, 1] with $G(0) = 0$ and $G(1) = 1$, $G'(0) \ge 1 \ge G'(1) \ge 0$ (2.5), which is reflected in $0 \le p \le \mu \le 1$ (2.6).
- 2.4 Unlimited distributions
    - If $F(X)$ is defined on $[0, \infty]$ the relations are slightly modified: there is no finite maximum loss $M$, and the deductible $D$ and the losses $\mathbf{X}$ are normalized with respect to an arbitrary reference loss $X_0$, as $\mathbf{x} = \mathbf{X}/X_0$ and $d = D/X_0$.
    - $G(x)$ is still concave and increasing with $G(0) = 0$ and $G(\infty) = 1$, and $\mu = E[x]$ is still $1/G'(0)$, but there are no total losses, i.e. $G'(\infty) = 0$.

## 3 The MBBEFD Class of Two-Parameter Exposure Curves
- 3.1 Definition of the curve
    - The exposure curve and the related distribution function are defined by (3.1 a) and (3.1 b); the denominator and the term $-\ln(a+1)$ in the numerator ensure the boundary conditions $G(0) = 0$ and $G(1) = 1$, and the cases $a = \{-1, 0, \infty\}$ or $b = \{0, 1, \infty\}$ must be treated separately:

> $$G(x) = \frac{\ln(a + b^x) - \ln(a+1)}{\ln(a+b) - \ln(a+1)}$$

> $$F(x) = \begin{cases} 1 - \dfrac{(a+1)\,b^x}{a + b^x} & 0 \le x < 1 \\ 1 & x = 1 \end{cases}$$

    - Distribution functions of this type, defined on $[0, \infty]$ or $[-\infty, \infty]$, are well known in statistical mechanics (Maxwell-Boltzmann, Bose-Einstein, Fermi-Dirac and Planck distributions).
    - Using them in risk theory does not mean the distribution of insured losses can be derived from the theory of statistical mechanics, but the MBBEFD class shows itself to be very appropriate for modelling empirical loss distributions on the interval [0, 1].
- 3.2 New parametrisation
    - The parameters $\{a, b\}$ are restricted to those values for which $G_{a,b}(x)$ is a real, increasing and concave function on [0, 1]; this is easier to fulfil by using $g = 1/p$, the inverse of the total loss probability, as a curve parameter and replacing $a$ (3.2):

> $$g = \frac{a+b}{(a+1)b}; \qquad a = \frac{(g-1)b}{1-gb}$$

    - The condition $0 \le p \le 1$ holds only for $g \ge 1$, and $G(x)$ is real only for $b \ge 0$; no other restrictions on the parameters are necessary.
    - The cases $b = 1$ ($a = -1$), $b = 0$ or $g = 1$ ($a = 0$) and $b \cdot g = 1$ ($a = \infty$) must be treated as special cases; the cases $b \cdot g = 1$ ($a = \infty$), $b \cdot g > 1$ ($a < 0$) and $b \cdot g < 1$ ($a > 0$) correspond to the MB, the BE and the FD distribution respectively (cf. Figure 4.1).
    - All real, increasing and concave functions $G(x)$ on [0, 1] with $G(0) = 0$ and $G(1) = 1$ belonging to the MBBEFD class are given by the four-case function $G_{b,g}(x)$ (3.3): $x$ for $g = 1 \vee b = 0$; $\dfrac{\ln(1 + (g-1)x)}{\ln(g)}$ for $b = 1 \wedge g > 1$; $\dfrac{1 - b^x}{1 - b}$ for $bg = 1 \wedge g > 1$; and $\dfrac{\ln\!\left(\frac{(g-1)b + (1-gb)b^x}{1-b}\right)}{\ln(gb)}$ for $b > 0 \wedge b \ne 1 \wedge bg \ne 1 \wedge g > 1$.
    - Figure 3.1 shows sets of MBBEFD exposure curves, a) with constant total loss probability $p = 0.1$ ($g = 10$) and b) with constant expected value $\mu = E[x] = 0.1$; Figure 3.2 shows the corresponding distribution functions.
- 3.3 Derivatives
    - The derivatives $G'(x)$ of the exposure curves are given case by case in (3.4), with $G'(0)$ in (3.4 a) and $G'(1)$ in (3.4 b).
    - The relation $p = G'(1)/G'(0) = 1/g$ is obtained immediately from (3.4 a) and (3.4 b).
- 3.4 Expected value
    - According to (2.4), $\mu = E[x] = 1/G'(0)$ is given case by case in (3.5): $1$ for $g = 1 \vee b = 0$; $\dfrac{\ln(g)}{g-1}$ for $b = 1 \wedge g > 1$; $\dfrac{b-1}{\ln(b)} = \dfrac{g-1}{\ln(g)g}$ for $bg = 1 \wedge g > 1$; and $\dfrac{\ln(gb)(1-b)}{\ln(b)(1-gb)}$ for the general case.
    - Figure 3.3 represents $\mu$ as a function of the parameters $b$ and $g$, discussed in Section 3.7.
- 3.5 Distribution function
    - According to (2.3), the distribution function belonging to $G_{b,g}(x)$ is given case by case in (3.6): $1$ for $x = 1$; $0$ for $x < 1 \wedge (g = 1 \vee b = 0)$; $1 - \dfrac{1}{1 + (g-1)x}$ for $b = 1 \wedge g > 1$; $1 - b^x$ for $bg = 1 \wedge g > 1$; and $1 - \dfrac{1-b}{(g-1)b^{1-x} + (1-gb)}$ for the general case.
- 3.6 Density function
    - Because of the finite probability $p = 1/g$ for a total loss, the density function $f(x) = F'(x)$ is defined only on the interval [0, 1) and is given case by case in (3.7), with $f(x) = 0$ for $g = 1 \vee b = 0$ and $f(x) = -\ln(b)\,b^x$ for $bg = 1 \wedge g > 1$.
- 3.7 Discussion
    - $\mu(b, g)$ is a decreasing function of $b$ (for $g > 1$ constant) and a decreasing function of $g$ (for $b > 0$ constant), as shown by (3.8): $\dfrac{\partial}{\partial b}\mu_g(b) \le 0$ and $\dfrac{\partial}{\partial g}\mu_b(g) \le 0$.
    - The extreme values of the parameters give $\lim_{b \to 0}\mu_g(b) = 1$, $\lim_{b \to \infty}\mu_g(b) = 1/g = p$, $\lim_{g \to 1}\mu_b(g) = 1$ and $\lim_{g \to \infty}\mu_b(g) = 0$ (3.9).
- 3.8 Unlimited distributions
    - So far only distributions defined on [0, 1] have been discussed; as the MB, the BE and the FD are defined on $[-\infty, \infty]$ or $[0, \infty]$, the MBBEFD class can also model loss distributions on $[0, \infty]$, with $\mathbf{x} = \mathbf{X}/X_0$ and $d = D/X_0$ normalized with respect to an arbitrary reference loss $X_0$.
    - The exposure curve $G_{b,g}(x)$ is then given by (3.10): $1 - b^x$ for $bg = 1 \wedge g > 1$, and $\dfrac{\ln\!\left(\frac{(g-1)b + (1-gb)b^x}{1-b}\right)}{\ln\!\left(\frac{(g-1)b}{1-b}\right)}$ for $0 < b < 1 \wedge bg \ne 1 \wedge g > 1$; its derivatives are (3.11) to (3.11 c), with $G'(\infty) = 0$, and the distribution function is (3.12).
    - The restriction $0 < b < 1$ is obtained from (3.12) and the condition $F(\infty) = 1$, and the restriction $g > 1$ from (3.10), where the argument of the logarithm in the denominator must be greater than 0; the relation $p = G'(1)/G'(0) = 1/g$ is still valid, so $g$ is the inverse of the probability $p$ of a loss $\mathbf{X}$ exceeding the reference loss $X_0$.

## 4 Curve Fitting
- 4.1 Expected value $\mu$ and total loss probability $p$
    - Because of (3.8) and (3.9), exactly one MBBEFD distribution function exists for each given pair of functionals $p$ and $\mu$ that fulfil the conditions (2.6); the curve parameter $g = 1/p$ is obtained directly, and $b$ is calculated with the help of (3.5).
    - The cases to distinguish (4.1) are: a) $\mu = 1 \Rightarrow b = 0$; b) $\mu = \dfrac{g-1}{\ln(g)g} \Rightarrow b = 1/g$; c) $\mu = \dfrac{\ln(g)}{g-1} \Rightarrow b = 1$; d) $\mu = 1/g \Rightarrow b = \infty$; e) else $\Rightarrow 0 < b < \infty \wedge b \ne 1/g \wedge b \ne 1$.
    - In the general case e), $b$ has to be calculated iteratively by solving $\mu = \dfrac{\ln(gb)(1-b)}{\ln(b)(1-gb)}$ (4.2); because $\mu_g(b)$ is a decreasing function of $b$ the iteration causes no problems, and an upper and a lower limit for $b$ can be derived directly from (4.1).
- 4.2 Expected value $\mu$ and standard deviation $\sigma$
    - It is possible to find an MBBEFD distribution assuming the first two moments ($\mu$ and $\sigma$) are known, provided the moments fulfil certain conditions; for a distribution function with total loss probability $p$ they are $\mu = E[x] = p + \int_0^{1^-} x f(x)\,dx$ and $\mu^2 + \sigma^2 = E[x^2] = p + \int_0^{1^-} x^2 f(x)\,dx \le \mu$ (4.3).
    - According to (4.3) the first two moments of $F(x)$ and $p$ must fulfil $\mu^2 \le E[x^2] \le \mu$ and $p \le E[x^2]$ (4.4).
    - Calculation of $g$ and $b$
        - Start with $p^* = E[x^2] \ge p$ as a first estimate (upper limit) for $p$, and calculate $b^*$ and $g^*$ for the given functionals $\mu$ and $p^*$ with the method of Section 4.1.
        - Compare the second moment $E^*[x^2]$ with the given moment $E[x^2]$ and find a new estimate for $p^*$.
        - Repeat until $E^*[x^2]$ is close enough to $E[x^2]$.
        - If the first moment $\mu$ is kept constant, the second moment $E^*[x^2]$ is an increasing function of $p^*$, so the parameters $g$ and $b$ can be calculated without complications.
    - The second moment of the MBBEFD distribution has to be calculated numerically, best done by replacing $F(x)$ with a discrete distribution function with the same upper tail area $L(x_{i+1}) - L(x_i)$ on each discretized interval $[x_i, x_{i+1}]$.
- 4.3 The MBBEFD distribution class and the Swiss Re $Y_i$ property exposure curves
    - The Swiss Re $Y_i$ exposure curves ($i = 1 \ldots 4$) are well known and widely used by non proportional property underwriters, and all of them can be approximated very well by a subclass of the MBBEFD exposure curves.
    - The parameters $b_i$ and $g_i$ were first evaluated for each curve $i$; plotting these pairs in the $\{b, g\}$ plane, the points lay on a smooth curve, which was modelled as a function of a single curve parameter $c$, and the parameters $c_i$ representing the curves $Y_i$ were then evaluated.
    - The one-parameter subclass is $G_c(x) = G_{b_c, g_c}(x)$ (4.5) with (4.6):

> $$b_c = b(c) = e^{3.1 - 0.15(1+c)c}, \qquad g_c = g(c) = e^{(0.78 + 0.12c)c}$$

    - The position of the curves $c = 0 \ldots 10$ in the $\{p, \mu\}$ plane is shown in Figure 4.1, with the special cases $b = 0, p, 1, \infty$ and $g = 1$; the dashed part of the $c$ curve has no empirical counterparts.
    - The curves $c = 0.0, \ldots, 5.0$ of Figure 4.2 relate to exposure curves used in practice: $c = 0$ represents a distribution of total losses only because $g(0) = 1$; the four curves $c = \{1.5, 2.0, 3.0, 4.0\}$ coincide very well with the Swiss Re curves $\{Y_1, Y_2, Y_3, Y_4\}$; and $c = 5.0$ coincides very well with a Lloyd's curve used for the rating of industrial risks.
    - The exposure curves defined in (4.6) are very well suited for practical purposes: the underwriter can use curve parameters that are very familiar, the class is continuous, and all curves lying between the individual curves $Y_i$ are at the underwriter's disposal too.

## References
- One work: Daykin, Pentikäinen and Pesonen (1994), "Practical Risk Theory for Actuaries", Chapman & Hall, London.

## Sources
- [The Swiss Re Exposure Curves and the MBBEFD Distribution Class (Bernegger, ASTIN Bulletin, 1997)](https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf) — the document (sha256 5c07f557257622c9…), a 13-page scan with no text layer (ASTIN Bulletin, Vol. 27, No. 1, pp. 99-111), every page read from its image: the title page, abstract, section and sub-section headings, the text and equations of Sections 1-4, and the references
- [CAS Exam 9 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf) — the citation (Bernegger, S., ASTIN Bulletin, Vol. 27, No. 1, May 1997, pp. 99-111), the task assigned (A1) and the absence of exclusions
