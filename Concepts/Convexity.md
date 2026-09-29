---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:fe3a2b70522cee8931739e0bc4f3697a732e890b7dff353b7695bdc63e45bfdf
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.7-8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Convexity.md
---

**Convexity** measures the curvature of the price–yield relationship for a bond or portfolio. While [[Modified Duration]] gives the first-order approximation of price sensitivity to yield changes, convexity captures the second-order effect. On Exam FM, "convexity" means **modified convexity** unless a question says otherwise:

> $$C_{Mod} = \frac{1}{P} \cdot \frac{d^2P}{dj^2}$$

> $$C_{Mod} = \frac{\displaystyle\sum_{t=1}^{n} t(t+1) \cdot C_t \cdot v^{t+2}}{P}$$

**Macaulay convexity** is the present-value-weighted average of the *squared* times of the cash flows, and the two convexities are linked through the [[Macaulay Duration]] $D_{Mac}$:

> $$C_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t^2 \cdot C_t \cdot v^{t}}{P}$$

> $$C_{Mod} = \frac{C_{Mac} + D_{Mac}}{(1+j)^2}$$

The second-order approximation of the price change uses the modified measures:

> $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j + \tfrac{1}{2} \cdot C_{Mod} \cdot (\Delta j)^2$$

- In the formulas, $C_t$ is the cash flow at time $t$, $j$ the effective yield per period, $v = 1/(1+j)$, and $P = \sum C_t v^t$ is the price
- Modified convexity weights each cash flow by $t(t+1)v^{t+2}$; Macaulay convexity by $t^2 v^t$. For a single cash flow at time $t$, $C_{Mac} = t^2$ and $C_{Mod} = t(t+1)/(1+j)^2$
- Higher convexity is beneficial: to second order, for the same price and modified duration, a more convex bond rises more when yields fall and falls less when yields rise
- [[Redington Immunization]] requires the convexity of the assets to exceed the convexity of the liabilities

![[Media/Figures/Convexity.svg|340]]

> [!example]- Convexity Price Approximation {Example}
> A bond has modified duration $D_{Mod} = 7.5$ years and convexity $C_{Mod} = 68$. If yields rise by $0.5\%$ ($\Delta j = 0.005$), estimate the percentage price change.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \frac{\Delta P}{P} &\approx -D_{Mod} \cdot \Delta j + \tfrac{1}{2} \cdot C_{Mod} \cdot (\Delta j)^2 \\
> > &= -(7.5)(0.005) + \tfrac{1}{2}(68)(0.005)^2 \\
> > &= -0.0375 + 0.00085 \\
> > &= -0.03665
> > \end{align*}
> > $$
> > The bond price decreases by approximately $3.67\%$. Without the convexity term the estimate would be $-3.75\%$; convexity reduces the actual price decline slightly.

> [!example]- Macaulay and Modified Convexity of an Annuity {Example}
> A 10-year annuity-immediate pays $1{,}000$ at the end of each year. At $j = 7\%$ its price is $P = 7{,}023.5815$ and its Macaulay duration is $D_{Mac} = 4.9460710$. Find its Macaulay and modified convexity.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C_{Mac} &= \frac{\sum_{t=1}^{10} 1{,}000\, t^2 (1.07)^{-t}}{7{,}023.5815} \\
> > &= \frac{228{,}451.20}{7{,}023.5815} \\
> > &= 32.526311
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > C_{Mod} &= \frac{C_{Mac} + D_{Mac}}{(1.07)^2} \\
> > &= \frac{32.526311 + 4.946071}{1.1449} \\
> > &= 32.729830
> > \end{align*}
> > $$
> > Summing $t(t+1)(1{,}000)(1.07)^{-(t+2)}$ directly and dividing by $P$ gives the same $32.729830$.
