---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3cdf9973608669f776361b1252b8950843a67bc0a64a4e8e6903b0dc6827b3c
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §18 Annuities with Infinite Payments: Perpetuities, PDF p.176-177, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Perpetuity.md
---

A **perpetuity** is an annuity that pays 1 per period forever. For a **perpetuity-immediate** (payments at end of each period) the present value is obtained by letting $n \to \infty$ in $a_{\overline{n}|} = (1-v^n)/i$; since $v^n \to 0$:

> $$a_{\overline{\infty}|} = \frac{1}{i}$$

- For a **perpetuity-due** (payments at start of each period), the present value is one period's interest charge earlier:

> $$\ddot{a}_{\overline{\infty}|} = \frac{1}{d}$$

> $$= \frac{1+i}{i}$$

- The relationship $\ddot{a}_{\overline{\infty}|} = 1 + a_{\overline{\infty}|}$ holds because the perpetuity-due can be seen as an immediate payment of 1 followed by a perpetuity-immediate.
- Perpetuities model instruments such as consols, preferred stock with fixed dividends, or endowments intended to last indefinitely.

![[Media/Figures/Perpetuity.svg|340]]

> [!example]- Endowment Fund Perpetuity {Example}
> A university endowment must pay \$$50{,}000$ per year in perpetuity, with the first payment one year from now. If the fund earns $i = 4\%$ per year, how much must be deposited today?
>
> > [!answer]-
> > This is a perpetuity-immediate, so:
> > $$PV = \frac{50{,}000}{i} = \frac{50{,}000}{0.04} = \$1{,}250{,}000$$
