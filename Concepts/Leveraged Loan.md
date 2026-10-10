---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a29e24cfd889163e6f8f1211d2916dbd405b1856b7b0738dd4178f1a4ca807e1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Leveraged Loan.md
---

A **Leveraged Loan** is a senior secured, floating-rate term loan made to a company rated below investment grade, usually to fund a leveraged buyout, an acquisition or a refinancing. It pays a reference rate, now SOFR, plus a fixed spread, is arranged by banks and sold in pieces to institutional lenders, and ranks first in the borrower's [[Capital Structure|capital structure]], ahead of its high-yield [[Corporate Bond|bonds]].

> $$c_t = \max(\text{SOFR}_t,\ f) + m$$

> $$s_{3\text{y}} \approx m + \frac{100 - P}{3}$$

> $$EL = PD \times (1 - R)$$

- **Symbols:** $c_t$ is the coupon rate set at reset date $t$, $\text{SOFR}_t$ is the reference rate for the period, $f$ is the floor and $m$ is the fixed spread, or margin. $P$ is the price per 100 of par, so $100 - P$ is the original issue discount (OID) when the loan is new. $PD$, $R$ and $EL$ are the default probability, recovery rate and expected loss, as on [[Credit Risk]].
- **Floating rate:** The coupon resets every one or three months, so the loan has almost no [[Interest Rate Risk|interest rate]] [[Duration|duration]] and its income rises with short rates. It still has spread duration, so its price falls when credit spreads widen.
- **Floors and OID:** A floor sets a minimum on the reference rate and pays the lender only when rates are low. OID lets the arranger raise the yield without changing the stated margin, and the market quotes the result as a spread to a three-year life, because loans are usually refinanced long before maturity.
- **Security and recovery:** First-lien loans are secured on the borrower's assets and rank ahead of unsecured bonds, so their recoveries after default have historically been much higher than those of high-yield bonds. That recovery gap is the main reason a loan can pay a lower spread than a bond of the same issuer.
- **Covenants:** Traditional loans carried maintenance covenants, tests such as maximum leverage that the borrower had to pass every quarter. Most institutional loans are now **covenant-lite**, with only incurrence covenants tested when the borrower takes an action such as issuing more debt, which removes the lender's early warning and may lower recoveries.
- **Syndication and trading:** An arranging bank structures the loan and syndicates it, with the amortizing term loan A going to banks and the institutional term loan B, with little amortization, going to funds. Loans are not securities, trade through assignments and settle slowly, so they are less liquid than bonds.
- **Prepayment:** The borrower can usually repay at par at any time, often after a short period of soft call protection at a small premium. When spreads tighten, borrowers reprice or refinance, so the lender's upside is capped in the same way as with a [[Callable Bond|callable bond]].
- **Who buys them:** Collateralized loan obligations (CLOs) are the largest buyers of leveraged loans; they pool loans and issue tranches with the attachment and detachment structure described on [[Structured Finance]]. Insurers hold loans directly or, more often, through the investment grade tranches of CLOs.

> [!example]- Coupon Reset with a SOFR Floor {Example}
> An insurer holds \$10 million of a term loan B paying three-month SOFR plus 375 basis points with a 0.50% floor, bought at 98.50. Find the quarterly interest on two rate paths: (a) SOFR resets at 4.30%; (b) SOFR resets at 0.15%. Then estimate the spread to a three-year life.
>
> > [!answer]-
> > Each quarter pays a quarter of the annual coupon rate on the par amount.
> > $$
> > \begin{align*}
> > c_{(a)} &= \max(4.30\%,\ 0.50\%) + 3.75\% \\
> > &= 8.05\% \\
> > I_{(a)} &= 10{,}000{,}000 \times 0.0805 / 4 \\
> > &= 201{,}250 \\
> > c_{(b)} &= \max(0.15\%,\ 0.50\%) + 3.75\% \\
> > &= 4.25\% \\
> > I_{(b)} &= 10{,}000{,}000 \times 0.0425 / 4 \\
> > &= 106{,}250
> > \end{align*}
> > $$
> > On the low-rate path the floor adds \$8,750 a quarter, the 0.35% gap between the floor and SOFR. On the high-rate path it is worth nothing. The OID adds to the yield as well.
> > $$
> > \begin{align*}
> > s_{3\text{y}} &\approx 3.75\% + \frac{1.50\%}{3} \\
> > &= 4.25\%
> > \end{align*}
> > $$
> > The insurer earns about SOFR plus 425 basis points if the loan is repaid at par in three years.

> [!example]- Recovery-Adjusted Spread: Loan versus Bond {Example}
> A single-B issuer has a first-lien term loan at SOFR plus 375 basis points and senior unsecured bonds at a spread of 450 basis points over Treasuries. Both default with an annual probability of 3.0%. The expected recovery is 70% on the loan and 40% on the bonds. Compare the spreads after expected loss.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > EL_{\text{loan}} &= 0.030 \times (1 - 0.70) \\
> > &= 0.90\% \\
> > EL_{\text{bond}} &= 0.030 \times (1 - 0.40) \\
> > &= 1.80\% \\
> > s_{\text{loan}} - EL_{\text{loan}} &= 3.75\% - 0.90\% \\
> > &= 2.85\% \\
> > s_{\text{bond}} - EL_{\text{bond}} &= 4.50\% - 1.80\% \\
> > &= 2.70\%
> > \end{align*}
> > $$
> > The bond's spread is 75 basis points wider, but after expected loss the loan pays 15 basis points more. The loan also has almost no rate duration. The bond offers call protection and liquidity, which the loan lacks, so the comparison is a choice between these features rather than a free gain.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 1a lists leveraged loans among the fixed income investments whose cash flows, risks and portfolio role the candidate must describe, from Fabozzi's chapter on leveraged loans and the CLO primer.
> - **Written answers:** Questions ask how a loan differs from a high-yield bond: floating versus fixed coupon, secured versus unsecured, covenants, prepayment at par, liquidity and settlement. Many ask why the loan's recovery is higher and its spread lower.
> - **Calculations:** Short calculations reset a coupon with a floor, convert OID into a three-year spread, or compare loss-adjusted spreads. The CLO side links the loan market to tranche losses, as on [[Structured Finance]].

> [!warning]- Exam traps
> - **Floors bind only at low rates:** The floor replaces SOFR only when SOFR is below it. Adding the floor to the spread, or applying it when SOFR is above it, overstates the coupon.
> - **Floating rate is not riskless:** A floating coupon removes interest rate duration but not credit risk or spread duration. A loan's price still falls when spreads widen, as in 2008 and early 2020.
> - **Covenant-lite:** Covenant-lite does not mean unsecured. The loan keeps its lien and its senior rank, but the lender loses the maintenance tests that would let it act before a default.
> - **OID in the yield:** Ignoring the discount understates the loan's return, and spreading it over the stated maturity, often seven years, understates it too. The market convention spreads it over three years because most loans are repaid early.
