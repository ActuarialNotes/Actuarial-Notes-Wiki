---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5bc5be6f5a454356cdbac6e74259054752be6567d8a06fb97c46cd3d599d58a9
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.459, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.462, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 225, questions PDF p.94, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 225, solutions PDF p.56, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 371, questions PDF p.157, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 371, solutions PDF p.98, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 99, solutions PDF p.28, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Spot Rate.md
---

The **$n$-year spot rate** $s_n$ is the yield to maturity on a zero-coupon bond that matures in exactly $n$ years, representing the market's required return for a single cash flow received at time $n$ with no intermediate payments. A coupon bond is priced by discounting each cash flow at the spot rate for that maturity:

> $$P = \sum_{t=1}^{n} \frac{C_t}{(1+s_t)^t}$$

- Spot rates are read from the [[Yield Curve]] or bootstrapped from observed bond prices
- The relationship between spot rates and [[Forward Rate|forward rates]] is $(1+s_n)^n = (1+s_{n-1})^{n-1}(1+f_{n-1,n})$, where $f_{n-1,n}$ is the one-year forward rate from year $n-1$ to $n$

![[Media/Figures/Spot_Rate.svg|340]]

> [!example]- Pricing a Bond with Spot Rates {Example}
> Spot rates are $s_1 = 4\%$, $s_2 = 5\%$, $s_3 = 6\%$. Find the price of a \$$1{,}000$ face value 3-year bond paying annual coupons of \$$60$.
>
> > [!answer]-
> > Discount each cash flow at the corresponding spot rate:
> > $$P = \frac{60}{1.04} + \frac{60}{1.05^2} + \frac{1060}{1.06^3}$$
> > $$P = 57.69 + 54.42 + 890.00 = \$1{,}002.11$$
> > Note this differs from using a single flat yield, because the spot curve is upward-sloping (longer maturities have higher rates).
