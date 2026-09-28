---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:c6b01c6664aef8623f691057623b81da14502db20cea569fb975a07e6ec400b6
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §18 Annuities with Infinite Payments: Perpetuities, PDF p.176-177, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Level Perpetuity.md
---

A **level perpetuity** is a [[Perpetuity]] with equal payments at every period, continuing forever. The present value of a perpetuity-immediate (payments at end of period) paying $1$ per period at rate $i$:

> $$a_{\overline{\infty}|} = \frac{1}{i}$$

- For a perpetuity-due (payments at start of period):

> $$\ddot{a}_{\overline{\infty}|} = \frac{1}{d}$$

> $$= \frac{1+i}{i}$$

- The present value formula follows from the limit of the finite annuity as $n \to \infty$, since $v^n \to 0$.
- Level perpetuities model preferred stock dividends, ground rents, and endowments.

![[Media/Figures/Level_Perpetuity.svg|340]]

> [!example]- Endowment Fund {Example}
> A university endowment must pay $50{,}000$ annually (end of year) forever. At $5\%$ effective annual interest, how large must the endowment be?
>
> > [!answer]-
> > $$\text{PV} = \frac{50{,}000}{0.05} = 1{,}000{,}000$$
