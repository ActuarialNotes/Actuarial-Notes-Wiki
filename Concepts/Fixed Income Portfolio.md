---
aliases:
  - Fixed Income Investment
  - Enhance Yield
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4feae8ff9f7630c0b5c97de33aad359e19014bb063b79d821c6e8951873d855a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fixed Income Portfolio.md
---
A **Fixed Income Portfolio** is a [[Portfolio|portfolio]] of debt instruments, such as government and [[Corporate Bond|corporate bonds]], [[Mortgage-Backed Security|mortgage-backed securities]], [[Leveraged Loan|loans]] and [[Private Debt|private debt]], managed to a mandate set either by the liabilities it must fund or by a benchmark it must beat. Its manager can **enhance yield** and manage liquidity by borrowing against the bonds in the repo market, by trading futures in place of bonds, and by lending the securities out for a fee.

Fixed income diversifies an equity portfolio, because high-quality bond prices have often risen when equity prices fell. It also provides regular income, hedges liabilities whose value moves with interest rates, and, through inflation-linked bonds, hedges [[Inflation|inflation]]. Each role points to a different kind of bond.

The main risks are [[Interest Rate Risk|interest rate risk]], measured by [[Duration|duration]] and [[Convexity|convexity]], and [[Credit Risk|credit risk]]. The others are [[Prepayment Risk|prepayment]] and other embedded option risk, [[Reinvestment Risk|reinvestment risk]], liquidity risk, and currency risk on foreign bonds.

## Liability-based and total-return mandates

A **liability-based mandate** manages the portfolio to fund known liabilities, such as an insurer's claims or a pension plan's benefits. Its strategies are [[Cash Flow Matching|cash flow matching]], [[Duration Matching|duration matching]] and [[Immunization|immunization]], which locks in a target return over a horizon. Success is measured against the liabilities rather than an index.

A **total-return mandate** manages the portfolio against a bond index. Pure indexing replicates the index, usually by stratified sampling, as described in [[Passive Management|passive management]]. Enhanced indexing keeps the index's duration and risk factors but tilts slightly to add return, and [[Active Management|active management]] takes larger positions in duration, curve, sector or credit.

## Leverage

A portfolio that borrows $B$ at rate $r_B$ on top of the investor's equity $E$, and earns $r_I$ on the whole invested portfolio, returns on the investor's own capital

> $$r_P = r_I + \frac{B}{E}\left(r_I - r_B\right)$$

- $B/E$ is the leverage.

Leverage raises the return on capital when the portfolio earns more than the borrowing rate and lowers it when it earns less. It increases both the expected return and the volatility of the return on capital.

> [!example]- What is this portfolio's return on capital if it returns 5.5%, or 3.0%? {Example}
> A $\$100$ million bond portfolio is financed by $\$60$ million of the manager's capital and $\$40$ million borrowed through repo at 4.5%.
>
> > [!answer]-
> > - The leverage is $B/E = 40/60$.
> > - At 5.5%, $r_P = 5.5\% + (40/60)(1.0\%) = 6.17\%$.
> > - At 3.0%, $r_P = 3.0\% + (40/60)(-1.5\%) = 2.00\%$.
> > - Leverage adds 0.67 percentage points in the first case and takes away 1.00 point in the second.

## Repurchase agreements

In a repurchase agreement (repo), the portfolio sells bonds for cash and agrees to buy them back at a higher price, which is a collateralized loan. The portfolio keeps the bonds' risk and income. A repo raises short-term cash without selling the bonds, or levers the portfolio. Its risks are a rise in the repo rate, a larger haircut, and the need to roll the loan when markets are stressed. On an actual/360 day count, the interest on a repo is

> $$\text{Repo interest} = C \times r_{\text{repo}} \times \frac{d}{360}$$

- $C$ is the cash lent against the bonds, which is their value less a haircut.
- $r_{\text{repo}}$ is the repo rate.
- $d$ is the number of days.

> [!example]- An insurer repos $\$20$ million of Treasuries for 30 days at 4.40%, with a 2% haircut. What cash does it raise, and what interest? {Example}
> - The cash raised is $C = 20{,}000{,}000 \times (1 - 0.02) = \$19{,}600{,}000$.
> - The interest is $19{,}600{,}000 \times 0.044 \times 30/360 = \$71{,}866.67$.
> - The insurer pays its claims and keeps the bonds, and their income, in the portfolio.

## Futures and swaps

Bond futures and interest rate swaps, which are [[Interest Rate Derivative|interest rate derivatives]], change the portfolio's duration cheaply and quickly without trading the bonds. They also add leverage, since only margin is posted, and they create [[Daily Settlement|daily settlement]] cash calls that the portfolio must fund.

## Securities lending

In securities lending, the portfolio lends bonds to a borrower, usually a dealer covering a short, and receives cash or securities as collateral. With cash collateral, the lender reinvests it and pays the borrower a rebate rate, so it earns the spread between the two. The risks are the borrower's default and losses on the reinvested collateral.

> [!example]- A portfolio lends $\$50$ million of bonds for a year against 102% cash collateral, reinvested at 4.6% with a 4.3% rebate. What does it earn? {Example}
> - The collateral is $1.02 \times 50{,}000{,}000 = \$51{,}000{,}000$.
> - The lending income is $51{,}000{,}000 \times (4.6\% - 4.3\%) = \$153{,}000$.
> - That is about 31 basis points a year on the bonds lent, provided the reinvested collateral holds its value.

> [!trap] Leaving out the borrowing cost
> The leverage term is $(B/E)(r_I - r_B)$, which is negative when the portfolio earns less than the borrowing rate. Adding $(B/E)\,r_I$ without subtracting the borrowing cost overstates the return.
