---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:509e8b10cfbf17c8ef5a8fe9e0256bd0ecca90c98b3b7e9b978f669bdcd2ad02
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 136, solutions PDF p.37, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 43, questions PDF pp.20-21, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 43, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 42, solutions PDF p.13, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.420-421, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Callable Bond.md
---

A **callable bond** gives the **issuer** the right (but not the obligation) to redeem the bond before maturity at a specified [[Call Price]] on or after a specified call date. Issuers call bonds when interest rates fall, allowing them to refinance at a lower rate.

> $$P = \min_{m}\left(Fr\,a_{\overline{m}|j} + C_m\,v_j^{\,m}\right)$$

- The investor faces reinvestment risk: if the bond is called early, the proceeds must be reinvested at the lower prevailing rates. The investor therefore assumes the issuer calls on the date **worst for the investor**. To guarantee a yield of at least $j$ per period, the most the investor will pay is the **smallest** price over all the possible call dates.
- In the formula, $m$ runs over every possible call date (in coupon periods), **including maturity**; $C_m$ is the call price at date $m$ (the [[Redemption Value|redemption value]] at maturity), $Fr$ the coupon and $v_j = 1/(1+j)$. Given a price instead, the investor's yield is the smallest of the yields at the possible call dates.
- **Shortcut, when the call price is the same on every call date, maturity included:**
  - If the bond is at a **premium** (price $>$ redemption value, i.e. the yield is below the modified coupon rate $g = Fr/C$): assume the **earliest** call date.
  - If the bond is at a **discount** (price $<$ redemption value): assume the **latest** possible redemption date, which is maturity.
- **When the call price differs between dates**, the shortcut does not hold: the worst date need not be the earliest or the latest. Price the bond at each possible call date and take the minimum. Within a stretch of dates sharing one call price $K$, the price moves steadily one way (up with $m$ when $Fr > Kj$, down when $Fr < Kj$), so only the two ends of each stretch need checking.

![[Media/Figures/Callable_Bond.svg|340]]

> [!example]- Callable Bond Price {Example}
> A $1{,}000$ bond with 8% annual coupons matures in 10 years but is callable at par on any coupon date from year 5 on. Find the price to guarantee a minimum yield of 6%.
>
> > [!answer]-
> > The call price is par on every call date and at maturity, so the shortcut applies. Price will exceed par (coupon $>$ yield), so assume a call at year 5 (earliest call, worst case):
> > $P = 80 \cdot a_{\overline{5}|6\%} + 1000(1.06)^{-5} = 80(4.2124) + 747.26 = 336.99 + 747.26 = 1084.25$

> [!example]- Call Prices That Step Down {Example}
> A $100$ par bond with a 4% coupon rate payable semiannually is callable at $109$ from 5 to 9 years after issue, at $104.50$ from 10 to 14 years, and matures at par in 15 years. What should an investor pay at issue to be sure of a yield of at least 3% convertible semiannually?
>
> > [!answer]-
> > Per half-year the coupon is $2$ and $j = 1.5\%$. Since $2 > 109(0.015)$, $2 > 104.50(0.015)$ and $2 > 100(0.015)$, the bond is at a premium against every call price, so within each stretch the earliest date is the worst. Price at the start of each stretch and at maturity:
> >
> > $$
> > \begin{align*}
> > \text{Call at 5 years: } P &= 2\,a_{\overline{10}|1.5\%} + 109\,v^{10} \\
> > &= 112.37 \\
> > \text{Call at 10 years: } P &= 2\,a_{\overline{20}|1.5\%} + 104.50\,v^{20} \\
> > &= 111.93 \\
> > \text{Maturity: } P &= 2\,a_{\overline{30}|1.5\%} + 100\,v^{30} \\
> > &= 112.01
> > \end{align*}
> > $$
> >
> > The investor pays at most $111.93$, the price for a call at 10 years — neither the earliest call date nor maturity.
