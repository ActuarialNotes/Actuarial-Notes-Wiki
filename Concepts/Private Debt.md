---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8c8a285f35f64f29954fad9f901fedd8ac7fd9b378ce48fceccb6b4c081708b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Private Debt.md
---

**Private Debt** is credit extended to a company directly by one or a few institutional lenders, without a public offering or an exchange listing. The two main forms are **private placements**, mostly investment grade fixed-rate notes sold to insurers and other institutions, and **direct lending**, mostly floating-rate senior loans by private credit funds to middle-market companies. The lender gives up liquidity and takes on the work of negotiating and monitoring the loan, and it is paid for that with a yield above a comparable public [[Corporate Bond|bond]] or [[Leveraged Loan|leveraged loan]], tighter covenants and, often, better recoveries.

> $$\Delta y = y_{\text{priv}} - y_{\text{pub}}$$

> $$\text{Net pick-up} = \Delta y - \left(EL_{\text{priv}} - EL_{\text{pub}}\right) - q\,c$$

- **Symbols:** $y_{\text{priv}}$ and $y_{\text{pub}}$ are the yields of the private loan and a public bond of the same credit quality and term, and $\Delta y$ is the yield pick-up. $EL = PD \times LGD$ is the annual expected loss of each, as on [[Credit Risk]]. $q$ is the annual chance that the investor must sell before maturity and $c$ the price concession it then accepts, so $q\,c$ is an annual haircut for illiquidity.
- **Illiquidity premium:** Private debt has no active secondary market, so a seller must find a buyer and accept a discount. Investors who can hold to maturity are paid a premium for bearing that risk, and part of the pick-up also pays for smaller issuers, complexity and the lender's own credit work.
- **Covenants and monitoring:** Private notes usually carry financial maintenance covenants, such as a maximum leverage ratio or a minimum interest coverage, that are tested every quarter. A breach lets the few lenders renegotiate early, and because there are few of them, an amendment is quicker than with widely held public bonds. This is one reason recoveries on private placements have tended to be higher.
- **Bespoke structures:** A private deal can be shaped to both sides: a delayed draw, an unusual amortization schedule, a currency or maturity the public market does not offer, or a borrower too small or too complex for a public issue. Prepayment is usually protected by a make-whole provision.
- **Private placements and Rule 144A:** Traditional private placements are sold to accredited institutions under an exemption from registration and are usually held to maturity. Rule 144A issues are sold to qualified institutional buyers but trade among them, so they sit between public bonds and true private debt in liquidity.
- **NAIC designations:** A U.S. insurer must report each holding with an NAIC designation from 1 (highest quality) to 6, which sets its [[Risk-Based Capital|risk-based capital]] charge. Private placements without a public rating are filed with the NAIC's Securities Valuation Office or rely on a private letter rating, so a reviewer should check whether the designation reflects the credit.
- **Why life insurers favor it:** Life insurers and annuity writers have long, predictable liabilities and seldom need to sell, so they can collect the illiquidity premium at little cost. Private placements offer long maturities, call protection and covenants that suit [[Asset-Liability Management|asset-liability matching]], and the extra yield supports crediting rates on annuities.
- **Risks:** The investor bears credit risk, valuation risk because prices are appraised rather than observed, concentration risk with few issuers, and liquidity risk if liabilities change unexpectedly, such as a surge of annuity surrenders.

> [!example]- Net Pick-Up of a Private Placement {Example}
> A life insurer can buy a 10-year A-rated private placement at 6.10% or a comparable public bond at 5.30%. Both have a 0.35% annual default probability. Because of its covenants, the private note's expected recovery is 60%, against 40% on the public bond. The insurer estimates a 5% annual chance of having to sell before maturity, at a 6% price concession. Find the net pick-up.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta y &= 6.10\% - 5.30\% \\
> > &= 0.80\% \\
> > EL_{\text{priv}} &= 0.0035 \times (1 - 0.60) \\
> > &= 0.14\% \\
> > EL_{\text{pub}} &= 0.0035 \times (1 - 0.40) \\
> > &= 0.21\% \\
> > q\,c &= 0.05 \times 0.06 \\
> > &= 0.30\% \\
> > \text{Net pick-up} &= 0.80\% + 0.07\% - 0.30\% \\
> > &= 0.57\%
> > \end{align*}
> > $$
> > The higher recovery adds 7 basis points and the illiquidity haircut takes 30, leaving 57 basis points a year. An insurer with sticky liabilities, for which $q$ is small, keeps more of the pick-up, which is the economic case for private debt in a life insurer's portfolio.

> [!example]- Direct Lending against a Syndicated Loan {Example}
> A direct lender offers a middle-market company a senior unitranche loan at SOFR plus 600 basis points, issued at 98 with an expected life of four years. Its annual default probability is 2.5% and its expected recovery 65%. A broadly syndicated loan to a larger borrower pays SOFR plus 375 basis points at 98.50, has a three-year life convention, a 3.0% default probability and a 70% recovery. Compare the loss-adjusted spreads.
>
> > [!answer]-
> > Spread the discount over the expected life, then subtract the expected loss.
> > $$
> > \begin{align*}
> > s_{\text{DL}} &= 6.00\% + \frac{2.00\%}{4} - 0.025 \times 0.35 \\
> > &= 6.50\% - 0.875\% \\
> > &= 5.625\% \\
> > s_{\text{BSL}} &= 3.75\% + \frac{1.50\%}{3} - 0.030 \times 0.30 \\
> > &= 4.25\% - 0.90\% \\
> > &= 3.35\%
> > \end{align*}
> > $$
> > The direct loan earns about 2.3 percentage points more after expected loss. That premium pays for illiquidity, a smaller and less diversified borrower, appraisal-based valuation and the lender's own underwriting, and it should be compared with the capital and liquidity cost of holding the loan.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 1a lists private debt, from Fabozzi's overview of investing in private corporate debt. Written answers describe the forms of private debt, the sources of its extra return, its covenants and monitoring, and its risks.
> - **Insurer suitability:** Questions ask why private debt suits a life insurer or annuity writer, linking illiquidity tolerance to the length and stability of the liabilities and to the [[Investment Policy Statement|investment policy statement]].
> - **Calculations:** Short calculations net expected loss and an illiquidity cost out of a yield pick-up, or compare loss-adjusted spreads across private and public credit.

> [!warning]- Exam traps
> - **Gross pick-up is not the premium:** The extra yield is not all profit. Subtract the difference in expected loss and an illiquidity cost before calling the remainder a premium.
> - **Recovery works both ways:** Better covenants usually raise the private note's recovery, so its expected loss is lower than a public bond's at the same default probability. Assuming equal expected losses misstates the comparison.
> - **Smoothed values:** Appraised prices move less than market prices, so private debt looks less volatile and less correlated with public credit than it is. Using the reported volatility in an allocation overweights it.
> - **Liquidity matches the liabilities:** Private debt suits sticky liabilities. A portfolio backing surrenderable products or collateral calls needs enough liquid assets, because a forced sale realizes the very haircut the premium was meant to pay for.
