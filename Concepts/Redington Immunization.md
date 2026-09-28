---
verification:
  status: verified
  confidence: low
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:33e026b5d2e007b3cdc7517bc9d2d6fc59c248247a5e20c0066cb5a68fa153b3
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.479, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §55 Redington Immunization and Convexity, PDF p.480, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 268, questions PDF p.113, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 268, solutions PDF p.69, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 295, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 432, solutions PDF p.112, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 106, solutions PDF p.30, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 390, solutions PDF p.103, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Alps, Using Duration and Convexity to Approximate Change in Present Value (SOA study note FM-24-17, 2017), §5, (5.4), PDF p.8, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Redington Immunization.md
---

**Redington immunization** is a strategy for protecting a portfolio's surplus $S = V_A - V_L$ against small parallel shifts in interest rates. It requires three conditions to be satisfied simultaneously at the current yield rate $j$:

1. $PV(A) = PV(L)$ — asset and liability present values are equal (surplus $S = 0$)
2. $D_{Mac}(A) = D_{Mac}(L)$ — asset and liability [[Macaulay Duration|Macaulay durations]] are equal
3. $\text{Convexity}(A) > \text{Convexity}(L)$ — asset [[Convexity]] exceeds liability convexity

- When all three hold, a small change $\Delta j$ causes $S \geq 0$ because the convexity term dominates: $\Delta S \approx \tfrac{1}{2}(C_A - C_L) \cdot V \cdot (\Delta j)^2 \geq 0$
- Redington immunization only protects against small, parallel rate shifts and must be rebalanced as time passes and rates change
- Less restrictive than [[Cash Flow Matching]] since exact cash flow timing is not required

![[Media/Figures/Redington_Immunization.svg|340]]

> [!example]- Verifying Redington Immunization {Example}
> A company has a single liability of \$$10{,}000$ due in 4 years. It immunizes using two zero-coupon bonds: Bond A maturing in 2 years and Bond B maturing in 6 years. The current yield rate is $5\%$. Find the face values of the two bonds that satisfy the first two Redington conditions, and verify the third.
>
> > [!answer]-
> > Let $X$ = face of 2-year bond, $Y$ = face of 6-year bond, $v = 1/1.05$.
> >
> > **Condition 1** ($PV_A = PV_L$):
> > $$X v^2 + Y v^6 = 10000 v^4$$
> > **Condition 2** ($D_{Mac}(A) = D_{Mac}(L) = 4$):
> > $$\frac{2 X v^2 + 6 Y v^6}{X v^2 + Y v^6} = 4 \implies 2 X v^2 + 6 Y v^6 = 4(10000 v^4)$$
> >
> > From Condition 1: $X v^2 + Y v^6 = 10000 v^4$. Substituting into Condition 2: $2Xv^2 + 6Yv^6 = 40000v^4$. Solving the system gives $Xv^2 = 5000v^4$ and $Yv^6 = 5000v^4$, so $X = 5000v^2 = 5000/1.05^2 \approx \$4{,}535$ face and $Y = 5000v^{-2} = 5000(1.05)^2 \approx \$5{,}513$ face.
> >
> > **Condition 3**: For zero-coupon bonds, convexity of the asset portfolio equals a weighted average of $t(t+1)$ terms. Asset convexity involves terms $2(3)$ and $6(7)$; liability convexity involves $4(5) = 20$. Asset convexity $= \tfrac{1}{2}[2(3) + 6(7)] = \tfrac{1}{2}[6+42] = 24 > 20$. Condition 3 is satisfied.
