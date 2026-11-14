---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aba854fd6971b45557f912f321fd58413e6ab72f405a0d06eb8e7f96a9607745
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Private Debt.md
---

**Private Debt** is credit extended to a company directly by one or a few institutional lenders, without a public offering or an exchange listing. The two main forms are **private placements**, mostly investment grade fixed-rate notes sold to insurers and other institutions, and **direct lending**, mostly floating-rate senior loans by private credit funds to middle-market companies.

The lender gives up liquidity and takes on the work of negotiating and monitoring the loan. It is paid with a yield above that of a comparable public [[Corporate Bond|bond]] or [[Leveraged Loan|leveraged loan]], tighter covenants and, often, better recoveries. The yield pick-up is

> $$\Delta y = y_{\text{priv}} - y_{\text{pub}}$$

- $y_{\text{priv}}$ is the yield of the private loan.
- $y_{\text{pub}}$ is the yield of a public bond of the same credit quality and term.

## Sources of the extra yield

Private debt has no active secondary market, so a seller must find a buyer and accept a discount. Investors who can hold to maturity are paid an illiquidity premium for bearing that risk. Part of the pick-up also pays for smaller issuers, complexity and the lender's own credit work.

Private notes usually carry financial maintenance covenants, such as a maximum leverage ratio or a minimum interest coverage, tested every quarter. A breach lets the few lenders renegotiate early, and with few lenders an amendment is quicker than with widely held public bonds. This is one reason recoveries on private placements have tended to be higher.

A private deal can also be shaped to both sides: a delayed draw, an unusual amortization schedule, a currency or maturity the public market does not offer, or a borrower too small or too complex for a public issue. Prepayment is usually protected by a make-whole provision.

## Net yield pick-up

The extra yield is not all profit. Netting out the difference in expected loss and a cost for illiquidity gives

> $$\text{Net pick-up} = \Delta y - \left(EL_{\text{priv}} - EL_{\text{pub}}\right) - q\,c$$

- $EL = PD \times LGD$ is the annual expected loss of each, as in [[Credit Risk|credit risk]].
- $q$ is the annual chance that the investor must sell before maturity.
- $c$ is the price concession it then accepts, so $q\,c$ is an annual haircut for illiquidity.

> [!example]- What is the net pick-up of this private placement? {Example}
> A life insurer can buy a 10-year A-rated private placement at 6.10% or a comparable public bond at 5.30%. Both have a 0.35% annual default probability. Because of its covenants, the private note's expected recovery is 60%, against 40% on the public bond. The insurer estimates a 5% annual chance of having to sell before maturity, at a 6% price concession.
>
> > [!answer]-
> > - The yield pick-up is $6.10\% - 5.30\% = 0.80\%$.
> > - The private note's expected loss is $0.0035 \times (1 - 0.60) = 0.14\%$.
> > - The public bond's expected loss is $0.0035 \times (1 - 0.40) = 0.21\%$.
> > - The illiquidity haircut is $0.05 \times 0.06 = 0.30\%$.
> > - The net pick-up is $0.80\% + 0.07\% - 0.30\% = 0.57\%$ a year.
> > - An insurer with sticky liabilities, for which $q$ is small, keeps more of the pick-up.

## Direct lending

A direct lender's loan is compared with a broadly syndicated loan by spreading any discount over the expected life and subtracting the expected loss.

> [!example]- Which earns more after expected loss, this direct loan or this syndicated loan? {Example}
> A direct lender offers a middle-market company a senior unitranche loan at SOFR plus 600 basis points, issued at 98, with an expected life of four years, an annual default probability of 2.5% and an expected recovery of 65%. A broadly syndicated loan to a larger borrower pays SOFR plus 375 basis points at 98.50, with a three-year life convention, a 3.0% default probability and a 70% recovery.
>
> > [!answer]-
> > - The direct loan's spread is $6.00\% + 2.00\%/4 = 6.50\%$.
> > - Its expected loss is $0.025 \times (1 - 0.65) = 0.875\%$, leaving $5.625\%$.
> > - The syndicated loan's spread is $3.75\% + 1.50\%/3 = 4.25\%$.
> > - Its expected loss is $0.030 \times (1 - 0.70) = 0.90\%$, leaving $3.35\%$.
> > - The direct loan earns about 2.3 percentage points more after expected loss. That pays for illiquidity, a smaller and less diversified borrower, appraisal-based valuation and the lender's own underwriting.

## Private placements and Rule 144A

Traditional private placements are sold to accredited institutions under an exemption from registration and are usually held to maturity. Rule 144A issues are sold to qualified institutional buyers but trade among them, so they sit between public bonds and true private debt in liquidity.

A U.S. insurer must report each holding with an NAIC designation from 1 (highest quality) to 6, which sets its [[Risk-Based Capital|risk-based capital]] charge. Private placements without a public rating are filed with the NAIC's Securities Valuation Office or rely on a private letter rating, so a reviewer should check whether the designation reflects the credit.

## Private debt in a life insurer's portfolio

Life insurers and annuity writers have long, predictable liabilities and seldom need to sell, so they can collect the illiquidity premium at little cost. Private placements offer long maturities, call protection and covenants that suit [[Asset-Liability Management|asset-liability matching]], and the extra yield supports crediting rates on annuities.

The investor bears credit risk, concentration risk with few issuers, and valuation risk because prices are appraised rather than observed. Appraised prices move less than market prices, so private debt looks less volatile and less correlated with public credit than it is. It also bears liquidity risk if liabilities change unexpectedly, such as a surge of annuity surrenders, because a forced sale realizes the haircut the premium was meant to pay for.

> [!trap] Treating the gross pick-up as the premium
> The yield pick-up includes compensation for expected loss and illiquidity. Subtract the difference in expected loss and an illiquidity cost before calling the remainder a premium.
