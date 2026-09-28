---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:3af57ed49174a1f11402c354cf54ce8d7ebd54dfc7ab10591d650a29c9dd6827
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 5, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Decreasing Annuity.md
---

An **arithmetic decreasing annuity** has payments $n, n-1, n-2, \ldots, 1$ at the end of periods $1, 2, \ldots, n$. Its present value is denoted $(Da)_{\overline{n}|}$:

> $$(Da)_{\overline{n}|} = \frac{n - a_{\overline{n}|}}{i}$$

- The corresponding accumulated value is $(Ds)_{\overline{n}|} = (1+i)^n (Da)_{\overline{n}|}$.
- Paired with the [[Arithmetic Increasing Annuity|increasing annuity]], $(Ia)_{\overline{n}|} + (Da)_{\overline{n}|} = (n+1)\,a_{\overline{n}|}$, since the two payment streams sum to $n+1$ in every period.
- For a first payment $P$ decreasing by $Q$ per period (payments $P,\, P-Q,\, P-2Q,\, \ldots,\, P-(n-1)Q$), the present value is:

> $$PV = P \cdot a_{\overline{n}|} - \frac{Q}{i}\!\left(a_{\overline{n}|} - nv^n\right)$$

![[Media/Figures/Decreasing_Annuity.svg|340]]

> [!example]- Present Value of Payments 5, 4, 3, 2, 1 {Example}
> A decreasing annuity pays \$$500,\,\$400,\,\$300,\,\$200,\,\$100$ at the end of years 1 through 5. The effective annual rate is $i = 6\%$. Find the present value.
>
> > [!answer]-
> > Factor out 100: $PV = 100\cdot(Da)_{\overline{5}|0.06}$.
> > $$a_{\overline{5}|} = 4.2124$$
> > $$(Da)_{\overline{5}|} = \frac{5 - 4.2124}{0.06} = \frac{0.7876}{0.06} \approx 13.1273$$
> > $$PV = 100 \times 13.1273 \approx \$1{,}312.73$$
