---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:19c590cb51a5a92de91cbd5308b1cb3b3e5d7258dc75d09134af0c5b172126dc
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.459, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.462, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 371, questions PDF p.157, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 371, solutions PDF p.98, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 225, solutions PDF p.56, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Yield Curve.md
---

The **yield curve** is a graph plotting the [[Spot Rate]] $s_t$ — the yield rate on a zero-coupon bond maturing at $t$ — against time to maturity $t$, summarizing the term structure of interest rates at a given point in time. Bonds are priced by discounting each cash flow at the spot rate for its maturity:

> $$P = \sum_{t=1}^{n} \frac{C_t}{(1+s_t)^t}$$

- A **normal (upward-sloping)** yield curve has long rates above short rates; its shape reflects the market's expectation that interest rates will rise
- An **inverted (downward-sloping)** curve has short rates above long rates
- A **flat** yield curve has the same rate at all maturities
- The yield curve is bootstrapped from observed market prices of coupon bonds to extract the implied spot rates $s_1, s_2, \ldots, s_n$

![[Media/Figures/Yield_Curve.svg|340]]

> [!example]- Reading and Using a Yield Curve {Example}
> The yield curve gives $s_1 = 3\%$, $s_2 = 4\%$, $s_3 = 4.5\%$. Price a 3-year \$$1{,}000$ bond paying annual coupons of \$$50$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P &= \frac{50}{1.03} + \frac{50}{1.04^2} + \frac{1{,}050}{1.045^3} \\
> > &= 48.54 + 46.23 + 920.11 \\
> > &= 1{,}014.88
> > \end{align*}
> > $$
> > This is an upward-sloping (normal) yield curve. The bond prices above par because the coupon rate ($5\%$) exceeds even the longest spot rate ($4.5\%$), so the bond is a premium bond.
