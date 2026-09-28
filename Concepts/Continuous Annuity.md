---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:a1b70a2287cab36bc7571e59023262474a3503dd38e560e06df2fd1601f7b00c
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 115, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §25 Continuous Annuities, PDF p.228-230, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
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
- Compared with the [[Annuity Immediate|annuity-immediate]] $a_{\overline{n}|} = (1 - v^n)/i$, the discount rate $i$ is replaced by $\delta$. Since $\delta < i$, we have $\bar{a}_{\overline{n}|} > a_{\overline{n}|}$ — continuous receipt is worth more than end-of-period receipt.
- [[Accumulated Value]] and present value are linked by $\bar{s}_{\overline{n}|} = (1+i)^n\,\bar{a}_{\overline{n}|}$.

![[Media/Figures/Continuous_Annuity.svg|340]]

> [!example]- Present Value of a Continuous Annuity {Example}
> Payments flow continuously at a rate of \$$1{,}000$ per year for 10 years at a force of interest $\delta = 0.06$. Find the present value.
>
> > [!answer]-
> > $$\begin{align*} \bar{a}_{\overline{10}|} &= \frac{1 - e^{-0.06 \times 10}}{0.06} \\ &= \frac{1 - e^{-0.6}}{0.06} \\ &= \frac{1 - 0.54881}{0.06} \\ &= \frac{0.45119}{0.06} \approx 7.5198 \end{align*}$$
> > $$PV = 1{,}000 \times 7.5198 \approx \$7{,}519.81$$

> [!example]- Accumulated Value of a Continuous Annuity {Example}
> A fund receives contributions continuously at \$$500$ per year for 8 years. The annual effective interest rate is $i = 5\%$. Find the accumulated value at time 8.
>
> > [!answer]-
> > First convert to the force of interest: $\delta = \ln(1.05) = 0.048790$.
> > $$\begin{align*} \bar{s}_{\overline{8}|} &= \frac{(1.05)^8 - 1}{0.048790} \\ &= \frac{1.47746 - 1}{0.048790} \\ &= \frac{0.47746}{0.048790} \approx 9.7859 \end{align*}$$
> > $$AV = 500 \times 9.7859 \approx \$4{,}892.94$$
