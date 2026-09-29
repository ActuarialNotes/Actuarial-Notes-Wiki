---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:de2502c8705b5fec9413820d9ca176910ac6ec2e71608429a289f57e30f109d4
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.234-235, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
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
> An annuity pays \$100, \$200, \$300, \$400 and \$500 at the end of years 1 through 5. The effective annual rate is $i = 6\%$. Find the present value.
>
> > [!answer]-
> > Factor out 100: $PV = 100\cdot(Ia)_{\overline{5}|0.06}$.
> > $$
> > \begin{align*}
> > v^5 &= (1.06)^{-5} \\
> > &= 0.747258 \\
> > \ddot{a}_{\overline{5}|} &= (1.06)\,\frac{1-0.747258}{0.06} \\
> > &= 4.465106 \\
> > (Ia)_{\overline{5}|} &= \frac{4.465106 - 5(0.747258)}{0.06} \\
> > &= \frac{4.465106 - 3.736291}{0.06} \\
> > &= \frac{0.728815}{0.06} \\
> > &= 12.1469 \\
> > PV &= 100 \times 12.1469 \\
> > &= \$1{,}214.69
> > \end{align*}
> > $$
