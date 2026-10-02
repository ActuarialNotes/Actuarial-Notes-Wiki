---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:359fd2568b4ad4bf7009bf05c9ac5a00c403e31d4685f92a0e1993be9ff17e49
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.228-230, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 115, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Continuous Annuity.md
---

The **continuous annuity** $\bar{a}_{\overline{n}|}$ is the [[Present Value]] of a payment stream flowing continuously at a constant rate of 1 per unit time over $[0, n]$, discounted at a constant [[Force of Interest]] $\delta$.

> $$\bar{a}_{\overline{n}|} = \int_0^n e^{-\delta t}\,dt$$

> $$= \frac{1 - v^n}{\delta}$$

> $$\bar{s}_{\overline{n}|} = \int_0^n e^{\delta(n-t)}\,dt$$

> $$= \frac{(1+i)^n - 1}{\delta}$$

- Here $v = e^{-\delta}$ is the annual discount factor and $\delta = \ln(1+i)$ links the force of interest to the effective annual rate $i$.
- Equivalent forms: $\bar{a}_{\overline{n}|} = \dfrac{1 - e^{-\delta n}}{\delta}$ and $\bar{s}_{\overline{n}|} = \dfrac{e^{\delta n} - 1}{\delta}$.
- Compared with the [[Annuity Immediate|annuity-immediate]] $a_{\overline{n}|} = (1 - v^n)/i$, the interest rate $i$ in the denominator is replaced by $\delta$. Since $\delta < i$, we have $\bar{a}_{\overline{n}|} > a_{\overline{n}|}$ — continuous receipt is worth more than end-of-period receipt.
- [[Accumulated Value]] and present value are linked by $\bar{s}_{\overline{n}|} = (1+i)^n\,\bar{a}_{\overline{n}|}$.

![[Media/Figures/Continuous_Annuity.svg|340]]

> [!example]- Present Value of a Continuous Annuity {Example}
> Payments flow continuously at a rate of \$$1{,}000$ per year for 10 years at a force of interest $\delta = 0.06$. Find the present value.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{a}_{\overline{10}|} &= \frac{1 - e^{-0.06 \times 10}}{0.06} \\
> > &= \frac{1 - 0.5488116}{0.06} \\
> > &= \frac{0.4511884}{0.06} \\
> > &= 7.519807 \\
> > PV &= 1{,}000 \times 7.519807 \\
> > &= \$7{,}519.81
> > \end{align*}
> > $$

> [!example]- Accumulated Value of a Continuous Annuity {Example}
> A fund receives contributions continuously at \$$500$ per year for 8 years. The annual effective interest rate is $i = 5\%$. Find the accumulated value at time 8.
>
> > [!answer]-
> > First convert to the force of interest: $\delta = \ln(1.05) = 0.04879016$.
> > $$
> > \begin{align*}
> > \bar{s}_{\overline{8}|} &= \frac{(1.05)^8 - 1}{0.04879016} \\
> > &= \frac{1.4774554 - 1}{0.04879016} \\
> > &= \frac{0.4774554}{0.04879016} \\
> > &= 9.785895 \\
> > AV &= 500 \times 9.785895 \\
> > &= \$4{,}892.95
> > \end{align*}
> > $$
