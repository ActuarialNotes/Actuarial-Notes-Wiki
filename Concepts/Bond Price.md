---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:f09cf7e182f088adb315b96b93298cb797f8548a08cb985c2ac89ed92b881cd1
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.384-385, p.396, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.19, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 421, solutions PDF p.110, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bond Price.md
---

The **bond price** $P$ is the present value of all future cash flows from a bond, discounted at the yield rate $j$ per period.

> $$P = Fr \cdot a_{\overline{n}|j} + C \cdot v^n$$

- Here $F$ is the face value, $r$ is the coupon rate per period (so $Fr$ is the periodic coupon amount), $C$ is the redemption value (often equal to $F$), $n$ is the total number of coupon periods, and $v = 1/(1+j)$.
- An equivalent form is the **premium/discount formula**: $P = C + (Fr - Cj) \cdot a_{\overline{n}|j}$, which makes the premium or discount explicit.
- When $Fr > Cj$ the bond sells at a **premium** ($P > C$); when $Fr < Cj$ it sells at a **discount** ($P < C$); when $Fr = Cj$ it sells at **par** ($P = C$).

![[Media/Figures/Bond_Price.svg|340]]

> [!example]- Bond Price Calculation {Example}
> A \$$1{,}000$ face value 10-year bond pays semi-annual coupons at a coupon rate of $8\%$ per year. The bond is priced to yield $6\%$ per year convertible semi-annually. Find the bond price.
>
> > [!answer]-
> > Per-period values: $F = C = 1000$, $r = 4\% = 0.04$, $j = 3\% = 0.03$, $n = 20$.
> >
> > $$Fr = 1000(0.04) = 40$$
> >
> > $$v^{20} = (1.03)^{-20} = 0.5536758$$
> >
> > $$a_{\overline{20}|3\%} = \frac{1 - v^{20}}{0.03} = 14.877475$$
> >
> > $$
> > \begin{align*}
> > P &= 40(14.877475) + 1000(0.5536758) \\
> > &= 595.0990 + 553.6758 \\
> > &= 1148.7748 \\
> > &\approx \$1{,}148.77
> > \end{align*}
> > $$
> >
> > Since $Fr = 40$ exceeds $Cj = 30$ (with $C = F$, the coupon rate per period, $4\%$, exceeds the yield rate per period, $3\%$), the bond sells at a **premium** above its \$$1{,}000$ redemption value.
