---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c4869faa25c8bdc07204409811de558f4e848a668c2cfe6a06b9a28e457f086
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 2 Annuities/cash flows with non-contingent payments (20-30%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, arithmetic progression, PDF p.234-237, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §16 Example 16.5, PDF p.160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §17 Deferred annuity, PDF p.168-169, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §22 rate at the payment frequency, PDF p.206, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §23 annuities payable less frequently than interest is convertible, PDF p.210, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §27 Example 27.5, PDF p.252, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §28 varying m-thly annuities, PDF p.259, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
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

### Splitting a stream into standard pieces

- Value a non-level stream by splitting it into standard pieces — level, arithmetic increasing or decreasing, geometric, perpetuity — each valued one period before its own first payment (or as an annuity-due at its first payment), then discounted to time 0 and summed.
- A stream whose pattern changes partway is split into pieces of standard form; value each later piece one period before its first payment, then move that value to the valuation date by discounting with $v^k$, or by accumulating with $(1+i)^k$ when that point lies before the valuation date.
- Overlapping level layers also work: a step up from $P$ to $2P$ after $k$ periods is $P$ over the whole term plus a deferred $P$ over the later payments, valued as $P\,a_{\overline{n}|} + P\,v^k a_{\overline{n-k}|}$.
- A stream whose payments repeat in a cycle of $k$ periods splits into $k$ streams, each paying once every $k$ periods and valued at the $k$-period effective rate $(1+i)^k - 1$, then discounted from its own start.
- When payments are level within each year but change from year to year, value each year's payments as one amount at the start or end of that year at the per-payment-period rate, then value those yearly amounts as an annual stream at the annual effective rate.
- The yearly amounts follow the payments' pattern: a $g\%$ change in the payments changes each yearly amount by the same $g\%$, so the annual stream is level, arithmetic or geometric as the payments are.

> $$\text{PV} = P\,a_{\overline{n}|} + P\,v^k a_{\overline{n-k}|}$$

![[Media/Figures/Non-level_Annuities.svg|340]]

> [!example]- Staircase Payments {Example}
> Payments of $100$, $200$, $300$, $400$ are made at end of years 1–4. Find the PV at $i = 5\%$.
>
> > [!answer]-
> > $$\text{PV} = 100v + 200v^2 + 300v^3 + 400v^4 = \frac{100}{1.05} + \frac{200}{1.05^2} + \frac{300}{1.05^3} + \frac{400}{1.05^4}$$
> > $= 95.24 + 181.41 + 259.15 + 329.08 = 864.88$
