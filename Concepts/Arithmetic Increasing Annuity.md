---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:43d6091e9ba51549d85b32b71a6a19a1eacbf612a83a0181bf66bf51f3d347e0
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 118, solutions PDF p.33, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Arithmetic Increasing Annuity.md
---

An **arithmetic increasing annuity** has payments $1, 2, 3, \ldots, n$ at the end of periods $1, 2, \ldots, n$. Its present value is denoted $(Ia)_{\overline{n}|}$:

> $$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

- Here $\ddot{a}_{\overline{n}|}$ is the [[Annuity Due|annuity-due]] present value.
- The corresponding accumulated value is $(Is)_{\overline{n}|} = (1+i)^n (Ia)_{\overline{n}|}$.
- For the more general case with first payment $P$ and constant increase $Q$ per period (payments $P,\, P+Q,\, P+2Q,\, \ldots,\, P+(n-1)Q$), the present value is:

> $$PV = P \cdot a_{\overline{n}|} + \frac{Q}{i}\!\left(a_{\overline{n}|} - nv^n\right)$$

![[Media/Figures/Arithmetic_Increasing_Annuity.svg|340]]

> [!example]- Present Value of Payments 1, 2, 3, 4, 5 {Example}
> An annuity pays \$$100,\,\$200,\,\$300,\,\$400,\,\$500$ at the end of years 1 through 5. The effective annual rate is $i = 6\%$. Find the present value.
>
> > [!answer]-
> > Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}|0.06}$.
> > $$\ddot{a}_{\overline{5}|} = (1.06)\,a_{\overline{5}|} = (1.06) \times 4.2124 \approx 4.4651$$
> > $$v^5 = (1.06)^{-5} \approx 0.74726$$
> > $$(Ia)_{\overline{5}|} = \frac{4.4651 - 5(0.74726)}{0.06} = \frac{4.4651 - 3.7363}{0.06} = \frac{0.7288}{0.06} \approx 12.1467$$
> > $$PV = 100 \times 12.1467 \approx \$1{,}214.67$$
