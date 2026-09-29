---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:09c20f2fc6d0bb1c2f5f8735cb48b57627f25da2788aaf5ee7ad7b69546da47a
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.279, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §31 Uniqueness of IRR, PDF p.285, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §31 Uniqueness of IRR, Theorem 31.1, PDF p.287, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §33 Dollar-Weighted Interest Rate, (33.1)-(33.3), PDF p.302, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §33, (33.4), PDF p.303, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §34 Time-Weighted Rate of Interest, PDF p.311, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §34 Time-Weighted Rate of Interest, PDF p.312, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Suggested Textbooks, Broverman Chapter 5 (excluding 5.2 ...), PDF p.6, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Broverman, Mathematics of Investment and Credit (Eighth Edition, ACTEX Learning, 2023), publisher's sample PDF, table of contents, Chapter 5 §5.2 'Dollar-weighted and Time-weighted Rate of Return', PDF p.8-9, sha256:1560f9e2bbcabe090d090abfea1e8e82a93ca4c7ff289e73b4180e30ab4d3eee — https://www.actexlearning.com/samples/MIC_8th_edition_051923_SAMPLE.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Rate of Return.md
---

The **rate of return** on an investment is the interest rate at which the money put in and the money taken out are equivalent — the [[Yield Rate|yield rate]] or **internal rate of return (IRR)** of its cash flows.

> $$\sum_{t} C_t\, v^t = 0$$

- $C_t$ is the net cash flow at time $t$ (outflows negative) and $v = 1/(1+i)$; the IRR is the $i$ that makes the [[Net Present Value|net present value]] zero. For a bond it is the yield to maturity.
- It is unique when the cash flows change sign only once — all outlays before all receipts; with several sign changes there can be more than one root.
- On Exam FM, "yield rate/rate of return" is a term of Topic 5, General Cash Flows, Portfolios, and Asset Liability Management, studied alongside [[Duration]] and [[Immunization]].

> [!example]- IRR of an Investment {Example}
> An insurer pays \$10,000 today for a note that returns \$6,000 in one year and \$5,500 in two years. Find the rate of return.
>
> > [!answer]-
> > Set the net present value to zero and solve the quadratic in $v$:
> >
> > $$
> > \begin{align*}
> > -10{,}000 + 6{,}000v + 5{,}500v^2 &= 0 \\
> > v &= \frac{-6{,}000 + \sqrt{6{,}000^2 + 4(5{,}500)(10{,}000)}}{2(5{,}500)} \\
> > &= \frac{-6{,}000 + 16{,}000}{11{,}000} \\
> > &= 0.90909
> > \end{align*}
> > $$
> >
> > So $i = 1/0.90909 - 1 = 10\%$. There is one sign change, so this is the only rate of return.

## Dollar-weighted and time-weighted returns

*Not on the December 2026 Exam FM syllabus.* Its learning outcomes name only "yield rate/rate of return"; the textbook sections devoted to these measures are left out of its assigned readings (Broverman §5.2, Dollar-weighted and Time-weighted Rate of Return; Vaaler §2.6, Dollar-weighted yield rates; Brown & Kopp §§7.3–7.4, since only §§7.1–7.2 of that chapter are assigned); and SOA's sample questions, pruned to the syllabus since October 2022, include none. They are kept here for reference.

For a fund with deposits and withdrawals during the year, the rate of return is measured two ways: **dollar-weighted**, which reflects the investor's own timing, and **time-weighted**, which removes it.

> $$i_{DW} \approx \frac{I}{A + \sum_t C_t\,(1-t)}$$

> $$1 + i_{TW} = \prod_{k=1}^{m} \frac{B_k}{B_{k-1} + C_{k-1}}$$

- **Dollar-weighted.** Over one year, $A$ is the fund at the start, $B$ at the end, $C_t$ the net deposit at time $t$ (withdrawals negative), $C = \sum C_t$, and $I = B - A - C$ the interest earned. The formula is the simple-interest approximation to the exact equation $A(1+i) + \sum_t C_t (1+i)^{1-t} = B$.
- **Time-weighted.** Split the year at every deposit or withdrawal. $B_0 = A$, $C_0 = 0$, $B_k$ is the fund value just before cash flow $C_k$, and $B_m = B$. Each ratio is one sub-period's growth; chaining them gives a return that does not depend on how much money was in the fund when.
- **Which to use.** The time-weighted rate measures the **fund manager** (who does not control the deposits); the dollar-weighted rate measures the **investor's** actual experience. With no cash flows during the year, the two coincide.

> [!example]- Dollar-Weighted Versus Time-Weighted Return {Example}
> An insurer's investment fund is worth \$100,000 on January 1. On July 1 it is worth \$120,000, and the insurer immediately deposits another \$50,000. On December 31 the fund is worth \$160,000. Find the dollar-weighted and time-weighted rates of return.
>
> > [!answer]-
> > Dollar-weighted, with $I = 160{,}000 - 100{,}000 - 50{,}000 = 10{,}000$:
> >
> > $$
> > \begin{align*}
> > i_{DW} &\approx \frac{10{,}000}{100{,}000 + 50{,}000(0.5)} \\
> > &= \frac{10{,}000}{125{,}000} \\
> > &= 8.00\%
> > \end{align*}
> > $$
> >
> > (Solving the exact equation $100{,}000(1+i) + 50{,}000(1+i)^{0.5} = 160{,}000$ gives $8.03\%$.)
> >
> > Time-weighted, splitting the year at July 1:
> >
> > $$
> > \begin{align*}
> > 1 + i_{TW} &= \frac{120{,}000}{100{,}000} \times \frac{160{,}000}{120{,}000 + 50{,}000} \\
> > &= 1.2 \times 0.94118 \\
> > &= 1.12941
> > \end{align*}
> > $$
> >
> > So $i_{TW} = 12.94\%$. The manager earned $20\%$ in the first half and lost $5.9\%$ in the second; the dollar-weighted rate is lower because the insurer added money just before the losing half.
