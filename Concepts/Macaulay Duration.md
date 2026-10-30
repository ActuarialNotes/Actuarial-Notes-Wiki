---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:dd294b0519d6cc22acd036d5982eaa4b1bda9a2f5b33b9448d770af8545e4a6c
  sources:
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 31, questions PDF p.15, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 31, solutions PDF pp.10-11, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 144, solutions PDF p.39, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Macaulay and Modified Durations, d as PV-weighted average time, Examples 54.1, 54.3-54.4 (coupon rate vs duration, zero-coupon = term), PDF pp.468-470, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54, modified duration = vd, Examples 54.5-54.7 ((Ia)_n/a_n, perpetuity (Ia)_inf/a_inf), PDF pp.471-472, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §54 Problem 54.7 (perpetuity-immediate vs perpetuity-due duration), PDF p.476, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §26 Varying Annuity-Immediate, eq. (26.5) (Ia)_n = (ä_n - n v^n)/i, PDF p.235, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 50 and Q 53, solutions PDF pp.15-16 (par bond duration = annuity-due; just before the first coupon duration is one year less; numerators identical, extra coupon in the price), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 389, solutions PDF p.103 (Macaulay duration a weighted sum of payment times, so deferring by six years adds exactly 6), sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Macaulay Duration.md
---

**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, where each cash flow is weighted by its [[Present Value]] as a fraction of total price:

> $$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_t \cdot v^t}$$

> $$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$

- where $v = 1/(1+j)$ and $P$ is the bond price; Macaulay duration is measured in time units (years)
- The relationship to [[Modified Duration]] is $D_{Mod} = D_{Mac}/(1+j)$
- For a level [[Perpetuity]]-immediate — payments of 1 at the **end** of each period, forever — $D_{Mac} = (1+j)/j = 1/d$ periods. The formula depends on that timing: a perpetuity-due pays each amount one period sooner, so it does not apply there

![[Media/Figures/Macaulay_Duration.svg|340]]

### Standard streams in annuity symbols

- Scaling every cash flow by the same constant leaves the Macaulay duration unchanged, because the constant cancels between the numerator and the price.
- For a level annuity-immediate of $n$ payments the payment cancels, so $D_{Mac} = (Ia)_{\overline{n}|} / a_{\overline{n}|}$ periods.
- For a coupon bond with coupon $Fr$, redemption value $C$ and price $P$, $D_{Mac} = \left[Fr\,(Ia)_{\overline{n}|j} + n\,C\,v^n\right] / P$ coupon periods.

> $$D_{Mac}^{\text{bond}} = \frac{Fr\,(Ia)_{\overline{n}|j} + n\,C\,v^n}{P}$$

- A bond bought at par (coupon rate equal to the yield rate, $Fr = Cj$, so $P = C$) has a Macaulay duration of $\ddot{a}_{\overline{n}|j}$ coupon periods, since $j\,(Ia)_{\overline{n}|j} + n\,v^n = \ddot{a}_{\overline{n}|j}$.
- A level perpetuity-due (first payment now) pays each amount one period sooner than the perpetuity-immediate, so its Macaulay duration is $1/d - 1 = 1/j$ periods.
- For bonds of the same term and yield, a higher coupon rate puts more present-value weight on the early coupons and less on the redemption payment, so it lowers the Macaulay duration; a zero-coupon bond, the extreme, has duration equal to its term.

### Moving the stream in time

- Deferring every cash flow by $k$ periods adds exactly $k$ to the Macaulay duration (and $k/(1+j)$ to the modified duration), because every time in the weighted average shifts by $k$ while the weights stay the same.
- At an unchanged yield, the duration of the remaining cash flows falls one-for-one with time elapsed between payment dates: $s$ periods later, provided no payment has been made in between (up to just before the next payment), it is the earlier duration minus $s$.
- Immediately after a payment is made, that payment drops out and the duration is recomputed from the remaining cash flows only, so it jumps up — a payment due now adds to the price but nothing to the numerator.

> [!example]- Macaulay Duration of a Bond {Example}
> A 2-year bond pays $100$ per year plus $1000$ at maturity, priced at $j = 5\%$. Find $D_{Mac}$.
>
> > [!answer]-
> > $\text{PV}_1 = 100/1.05 = 95.24$, $\text{PV}_2 = 1100/1.05^2 = 997.73$. $P = 95.24 + 997.73 = 1092.97$.
> > $$D_{Mac} = \frac{1 \times 95.24 + 2 \times 997.73}{1092.97} = \frac{95.24 + 1995.46}{1092.97} = \frac{2090.70}{1092.97} = 1.913 \text{ years}$$
