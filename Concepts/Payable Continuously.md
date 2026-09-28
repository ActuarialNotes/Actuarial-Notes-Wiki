---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ab69d00eb37ce92e6621a6a2f20a40f9e8f156406271fb39d85164c3471ab372
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §25 Continuous Annuities, PDF p.228-230, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 115, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payable Continuously.md
---

An annuity **payable continuously** pays at a constant rate of $1$ per year, with payments flowing continuously. The present value of a continuous $n$-year annuity is denoted $\bar{a}_{\overline{n}|}$:

> $$\bar{a}_{\overline{n}|} = \int_0^n v^t\,dt$$

> $$= \int_0^n e^{-\delta t}\,dt$$

> $$= \frac{1-e^{-\delta n}}{\delta}$$

> $$= \frac{1-v^n}{\delta}$$

- Here $\delta$ is the [[Force of Interest]].
- This is the limiting case of a [[Payable m-thly]] annuity as $m \to \infty$.

![[Media/Figures/Payable_Continuously.svg|340]]

> [!example]- Continuous Annuity Present Value {Example}
> Find the present value of a 5-year continuous annuity paying at rate $1000$ per year, at $\delta = 0.07$.
>
> > [!answer]-
> > $$\text{PV} = 1000 \cdot \bar{a}_{\overline{5}|} = 1000 \cdot \frac{1-e^{-0.35}}{0.07} = 1000 \cdot \frac{1-0.70469}{0.07} = 1000 \times 4.219 = 4219$$
