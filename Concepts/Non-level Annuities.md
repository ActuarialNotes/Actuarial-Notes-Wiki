---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:1ffdb36d5968b307d807c9ebc867304f9fbf2213e78b358376a443ca0f5a444b
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Non-level Annuities.md
---

**Non-level annuities** have payments that vary over time. Key types covered on Exam FM:

- **[[Arithmetic Increasing Annuity|Arithmetic progression]]**: payments increase (or decrease) by a constant amount each period — $(P), (P+Q), (P+2Q), \ldots$
- **[[Geometric Increasing Annuity|Geometric progression]]**: payments grow at a constant rate each period — $(1), (1+g), (1+g)^2, \ldots$
- **Other non-level cash flows**: solved using first-principles discounting, annuity decomposition, or recursive techniques

- Any non-level cash flow stream can be valued by discounting each payment individually:

> $$\text{PV} = \sum_{t=1}^{n} C_t \cdot v^t$$

![[Media/Figures/Non-level_Annuities.svg|340]]

> [!example]- Staircase Payments {Example}
> Payments of $100$, $200$, $300$, $400$ are made at end of years 1–4. Find the PV at $i = 5\%$.
>
> > [!answer]-
> > $$\text{PV} = 100v + 200v^2 + 300v^3 + 400v^4 = \frac{100}{1.05} + \frac{200}{1.05^2} + \frac{300}{1.05^3} + \frac{400}{1.05^4}$$
> > $= 95.24 + 181.41 + 259.15 + 329.08 = 864.88$
