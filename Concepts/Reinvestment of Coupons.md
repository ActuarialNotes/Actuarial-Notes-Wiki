---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:81fe49b4f09cdba669bfb1857548cef9c7705ac7ac3e6d6749e07148c8782ac4
  sources:
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 427, questions PDF p.181, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 427, solutions PDF p.111, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.4, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinvestment of Coupons.md
---

**Reinvestment of coupons** refers to the practice of investing each periodic coupon payment at a reinvestment rate $r_i$, which may differ from the original [[Yield Rate]] $j$.

> $$AV = Fr \cdot s_{\overline{n}|r_i} + C$$

- When coupons are reinvested at a rate $r_i$ per period, the **accumulated value** at the end of $n$ periods equals the future value of the coupon annuity at the reinvestment rate plus the redemption value $C$.
- Here $Fr$ is the coupon per period, $s_{\overline{n}|r_i}$ is the accumulated value factor for an annuity-immediate at rate $r_i$, and $C$ is the redemption payment received at time $n$.
- If the reinvestment rate equals the original yield ($r_i = j$), the total accumulated value equals $P(1+j)^n$, confirming that the investor earns exactly the yield rate.
- If $r_i < j$, the accumulated value is lower and the realized return falls below $j$; if $r_i > j$, the investor does better than the promised yield.
- This analysis motivates [[Reinvestment Risk]] as an important practical concern for coupon bonds.

![[Media/Figures/Reinvestment_of_Coupons.svg|340]]

> [!example]- Accumulated Value with Coupon Reinvestment {Example}
> A \$$1{,}000$ face value 4-year bond pays 7% annual coupons and is redeemed at par. It is bought at par, for \$$1{,}000$ (a 7% yield). Coupons are reinvested at 4% per year. Find the total accumulated value at the end of 4 years and the realized annual yield.
>
> > [!answer]-
> > Coupon $= Fr = 1000 \times 0.07 = \$70$ per year. $s_{\overline{4}|4\%} = \dfrac{(1.04)^4 - 1}{0.04} = \dfrac{1.16985856 - 1}{0.04} = 4.246464$.
> >
> > $$AV = 70 \times 4.246464 + 1000 = 297.25 + 1000 = \$1{,}297.25$$
> >
> > The purchase price is $P = \$1{,}000$. The realized yield $r$ satisfies $1000(1+r)^4 = 1297.25$, giving $(1+r)^4 = 1.29725$, so $r = 1.29725^{1/4} - 1 \approx 6.72\%$. This is below the 7% yield the bond was bought at because the coupons were reinvested at only 4%.
