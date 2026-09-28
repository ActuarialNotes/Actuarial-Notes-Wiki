---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:94689dfb8cae0f23c9b1ea6956c879198b6ec2ff4c6fa38d7b45308d3e7d0254
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 160, solutions PDF p.42, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Arithmetic Progression.md
---

In the context of annuities, an **arithmetic progression** refers to a sequence of payments where each payment increases (or decreases) by a fixed amount $Q$ per period. Starting from an initial payment $P$, the payments are $P, P+Q, P+2Q, \ldots$

- The present value of the increasing portion uses the increasing annuity symbol $(I\ddot{a})_{\overline{n}|}$ or $(Ia)_{\overline{n}|}$:

> $$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

- Any arithmetic annuity can be decomposed into a [[Level Annuity]] of $P$ per period plus a pure increasing annuity of $Q$ per period.

![[Media/Figures/Arithmetic_Progression.svg|340]]

> [!example]- Increasing Annuity {Example}
> Payments of $100, 200, 300, \ldots, 500$ are made at end of years 1–5. Find the PV at $i=6\%$.
>
> > [!answer]-
> > $P=100$, $Q=100$, $n=5$. This equals $100 \times (Ia)_{\overline{5}|6\%}$ where $(Ia)_{\overline{5}|}= (\ddot{a}_{\overline{5}|} - 5v^5)/i$.
> > $\ddot{a}_{\overline{5}|} = (1.06)a_{\overline{5}|} = 1.06 \times 4.2124 = 4.4651$. $5v^5 = 5(1.06)^{-5} = 5(0.7473) = 3.7363$.
> > $(Ia)_{\overline{5}|} = (4.4651-3.7363)/0.06 = 12.147$. PV $= 100 \times 12.147 = 1214.72$.
