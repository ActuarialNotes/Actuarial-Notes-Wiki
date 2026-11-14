---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f4ba6543beb659400fcc4a2a5f76c25f30bc00d0b221f8f127a5202106242ab6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Leveraged Loan.md
---

A **Leveraged Loan** is a senior secured, floating-rate term loan made to a company rated below investment grade, usually to fund a leveraged buyout, an acquisition or a refinancing. It is arranged by banks, sold in pieces to institutional lenders, and ranks first in the borrower's [[Capital Structure|capital structure]], ahead of its high-yield [[Corporate Bond|bonds]].

The loan pays a reference rate, now SOFR, plus a fixed spread $m$, the margin. A floor $f$ sets a minimum on the reference rate, so the coupon rate set at reset date $t$ is

> $$c_t = \max(\text{SOFR}_t,\ f) + m$$

- $\text{SOFR}_t$ is the reference rate for the period.

The coupon resets every one or three months, and each quarter pays a quarter of the annual coupon rate on the par amount. The loan therefore has almost no [[Interest Rate Risk|interest rate]] [[Duration|duration]], and its income rises with short rates. It still has spread duration, so its price falls when credit spreads widen. The floor pays the lender only when rates are low.

> [!example]- What is the quarterly interest on this loan if SOFR resets at 4.30%, or at 0.15%? {Example}
> An insurer holds $\$10$ million of a term loan paying three-month SOFR plus 375 basis points, with a 0.50% floor.
>
> > [!answer]-
> > - At 4.30%, SOFR is above the floor, so $c = 4.30\% + 3.75\% = 8.05\%$.
> > - The quarterly interest is $10{,}000{,}000 \times 0.0805/4 = \$201{,}250$.
> > - At 0.15%, the floor replaces SOFR, so $c = 0.50\% + 3.75\% = 4.25\%$.
> > - The quarterly interest is $10{,}000{,}000 \times 0.0425/4 = \$106{,}250$.
> > - On the low-rate path the floor adds $\$8{,}750$ a quarter, the 0.35% gap between the floor and SOFR. On the high-rate path it is worth nothing.

## Original issue discount

A new loan sold below par carries an original issue discount (OID), which lets the arranger raise the yield without changing the stated margin. Loans are usually refinanced long before maturity, so the market spreads the OID over a three-year life. A loan bought at price $P$ per 100 of par has a spread to a three-year life of about

> $$s_{3\text{y}} \approx m + \frac{100 - P}{3}$$

> [!example]- A loan at SOFR plus 375 basis points is bought at 98.50. What is its spread to a three-year life? {Example}
> - The OID is $100 - 98.50 = 1.50$ points.
> - Spread over three years, it adds $1.50\%/3 = 0.50\%$ a year.
> - The spread is $3.75\% + 0.50\% = 4.25\%$, so the lender earns about SOFR plus 425 basis points if the loan is repaid at par in three years.

## Security, recovery and covenants

First-lien loans are secured on the borrower's assets and rank ahead of unsecured bonds, so their recoveries after default have historically been much higher than those of high-yield bonds. That recovery gap is the main reason a loan can pay a lower spread than a bond of the same issuer. With default probability $PD$ and recovery rate $R$, as in [[Credit Risk|credit risk]], the expected loss is

> $$EL = PD \times (1 - R)$$

> [!example]- Which pays more after expected loss, this issuer's loan or its bond? {Example}
> A single-B issuer has a first-lien term loan at SOFR plus 375 basis points and senior unsecured bonds at a spread of 450 basis points over Treasuries. Both default with an annual probability of 3.0%. The expected recovery is 70% on the loan and 40% on the bonds.
>
> > [!answer]-
> > - The loan's expected loss is $0.030 \times (1 - 0.70) = 0.90\%$.
> > - The bond's expected loss is $0.030 \times (1 - 0.40) = 1.80\%$.
> > - After expected loss, the loan pays $3.75\% - 0.90\% = 2.85\%$.
> > - After expected loss, the bond pays $4.50\% - 1.80\% = 2.70\%$.
> > - The bond's spread is 75 basis points wider, but after expected loss the loan pays 15 basis points more. The bond offers call protection and liquidity, which the loan lacks, so the comparison is a choice between these features.

Traditional loans carried maintenance covenants, tests such as a maximum leverage that the borrower had to pass every quarter. Most institutional loans are now **covenant-lite**, with only incurrence covenants, tested when the borrower takes an action such as issuing more debt. Covenant-lite does not mean unsecured. The loan keeps its lien and its senior rank, but the lender loses the early warning, and recoveries may be lower.

## Syndication, trading and prepayment

An arranging bank structures the loan and syndicates it. The amortizing term loan A goes to banks, and the institutional term loan B, with little amortization, goes to funds. Loans are not securities. They trade through assignments and settle slowly, so they are less liquid than bonds.

The borrower can usually repay at par at any time, often after a short period of soft call protection at a small premium. When spreads tighten, borrowers reprice or refinance, so the lender's upside is capped in the same way as with a [[Callable Bond|callable bond]].

Collateralized loan obligations (CLOs) are the largest buyers of leveraged loans. They pool loans and issue tranches with the attachment and detachment structure of [[Structured Finance|structured finance]]. Insurers hold loans directly or, more often, through the investment grade tranches of CLOs.

> [!trap] Applying the floor when SOFR is above it
> The floor replaces SOFR only when SOFR is below it. Adding the floor to the margin, or using it when SOFR is above it, overstates the coupon.
