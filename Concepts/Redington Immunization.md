---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:44992605a82c4d5ffb895079981f99c9630e5d62ed8db705938c3a7608dafc93
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF pp.69-70, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 106, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF pp.112-113, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 390, solutions PDF pp.103-104, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.479-480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Redington Immunization.md
---

**Redington immunization** is a strategy for protecting a portfolio's surplus $S = V_A - V_L$ against small parallel shifts in interest rates. It requires three conditions to be satisfied simultaneously at the current yield rate $j$:

1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)
2. $D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration|Macaulay durations]] are equal (equivalently their [[Modified Duration|modified durations]], since both are measured at the same rate $j$)
3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity

- When all three hold, a small change $\Delta j$ causes $S \geq 0$ because the convexity term dominates: $\Delta S \approx \tfrac{1}{2}(C_A - C_L) \cdot V \cdot (\Delta j)^2 \geq 0$
- Redington immunization only protects against small, parallel rate shifts and must be rebalanced as time passes and rates change
- Less restrictive than [[Cash Flow Matching]] since exact cash flow timing is not required

![[Media/Figures/Redington_Immunization.svg|340]]

> [!example]- Verifying Redington Immunization {Example}
> A company has a single liability of \$$10{,}000$ due in 4 years. It immunizes using two zero-coupon bonds: Bond A maturing in 2 years and Bond B maturing in 6 years. The current yield rate is $5\%$. Find the face values of the two bonds that satisfy the first two Redington conditions, and verify the third.
>
> > [!answer]-
> > Let $X$ = face of the 2-year bond, $Y$ = face of the 6-year bond, $v = 1/1.05$.
> >
> > **Condition 1** ($PV_A = PV_L$):
> > $$X v^2 + Y v^6 = 10{,}000 v^4$$
> > **Condition 2** ($D_{Mac}(A) = D_{Mac}(L) = 4$), multiplying through by the common present value:
> > $$2 X v^2 + 6 Y v^6 = 4(10{,}000 v^4)$$
> > Subtracting twice Condition 1 from Condition 2 gives $4Yv^6 = 20{,}000v^4$, so each bond carries half the liability's present value:
> > $$
> > \begin{align*}
> > X v^2 = Y v^6 &= 5{,}000 v^4 = 4{,}113.51 \\
> > X = 5{,}000 v^2 &= 4{,}535.15 \\
> > Y = 5{,}000 v^{-2} &= 5{,}512.50
> > \end{align*}
> > $$
> > **Condition 3**: a zero-coupon payment at time $t$ has (modified) convexity $t(t+1)/(1+j)^2$, and a portfolio's convexity is the present-value-weighted average of its pieces'. The two bonds carry equal present values, so
> > $$
> > \begin{align*}
> > C_A &= \frac{\tfrac{1}{2}\left[2(3) + 6(7)\right]}{1.05^2} \\
> > &= \frac{24}{1.1025} \\
> > &= 21.77 \\
> > C_L &= \frac{4(5)}{1.05^2} \\
> > &= 18.14
> > \end{align*}
> > $$
> > Since $21.77 > 18.14$, the asset convexity exceeds the liability convexity and Condition 3 holds: the position is Redington immunized.
