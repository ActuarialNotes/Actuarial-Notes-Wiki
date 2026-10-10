---
aliases:
  - Fixed Income Investment
  - Enhance Yield
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e055a5b0867f2ec66fa150c4b433c9ee168916bffc1e81f8e423291e32dff8d8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fixed Income Portfolio.md
---
A **Fixed Income Portfolio** is a [[Portfolio|portfolio]] of debt instruments, such as government and [[Corporate Bond|corporate bonds]], [[Mortgage-Backed Security|mortgage-backed securities]], [[Leveraged Loan|loans]] and [[Private Debt|private debt]], managed to a mandate that is set either by the liabilities it must fund or by a benchmark it must beat. Its manager can **enhance yield** and manage liquidity by borrowing against the bonds in the repo market, by trading futures in place of bonds, and by lending the securities out for a fee.

> $$r_P = r_I + \frac{B}{E}\left(r_I - r_B\right)$$

> $$\text{Repo interest} = C \times r_{\text{repo}} \times \frac{d}{360}$$

- **Symbols:** $r_P$ is the return on the investor's own capital, $r_I$ the return on the whole invested portfolio, $B$ the amount borrowed, $E$ the investor's equity and $r_B$ the borrowing rate, so $B/E$ is the leverage. In a repo, $C$ is the cash lent against the bonds, which is their value less a haircut, $r_{\text{repo}}$ the repo rate and $d$ the number of days.
- **Roles in a portfolio:** Fixed income diversifies an equity portfolio, because high-quality bond prices have often risen when equity prices fell. It provides regular income, hedges liabilities whose value moves with interest rates, and through inflation-linked bonds hedges [[Inflation|inflation]]. Each role points to a different kind of bond.
- **Risks:** The main risks are [[Interest Rate Risk|interest rate risk]], measured by [[Duration|duration]] and [[Convexity|convexity]], [[Credit Risk|credit risk]], [[Prepayment Risk|prepayment]] and other embedded option risk, [[Reinvestment Risk|reinvestment risk]], liquidity risk, and currency risk on foreign bonds.
- **Liability-based mandates:** The portfolio is managed to fund known liabilities, such as an insurer's claims or a pension plan's benefits. The strategies are [[Cash Flow Matching|cash flow matching]], [[Duration Matching|duration matching]] and [[Immunization|immunization]], which locks in a target return over a horizon, and success is measured against the liabilities rather than an index.
- **Total-return mandates:** The portfolio is managed against a bond index. **Pure indexing** replicates the index, usually by stratified sampling, as described on [[Passive Management]]. **Enhanced indexing** keeps the index's duration and risk factors but tilts slightly to add return, and [[Active Management|active management]] takes larger positions in duration, curve, sector or credit.
- **Repo:** In a repurchase agreement, the portfolio sells bonds for cash and agrees to buy them back at a higher price, which is a collateralized loan. It is used to raise short-term cash without selling the bonds, or to lever the portfolio, and its risks are a rise in the repo rate, a larger haircut, and the need to roll the loan when markets are stressed.
- **Futures and swaps:** Bond futures and interest rate swaps, which are [[Interest Rate Derivative|interest rate derivatives]], change the portfolio's duration without trading the bonds, cheaply and quickly. They also add leverage, since only margin is posted, and they create [[Daily Settlement|daily settlement]] cash calls that the portfolio must fund.
- **Securities lending:** The portfolio lends bonds to a borrower, usually a dealer covering a short, and receives cash or securities as collateral. With cash collateral, the lender reinvests it and pays the borrower a rebate rate, so it earns the spread between the two; the risks are the borrower's default and losses on the reinvested collateral.

> [!example]- Levered Return of a Repo-Financed Portfolio {Example}
> A bond manager holds a \$100 million portfolio, financed by \$60 million of its own capital and \$40 million borrowed through repo at 4.5%. Find the return on the manager's capital if the portfolio returns (a) 5.5% and (b) 3.0% over the year.
>
> > [!answer]-
> > The leverage is $B/E = 40/60$.
> > $$
> > \begin{align*}
> > r_{P(a)} &= 5.5\% + \frac{40}{60}(5.5\% - 4.5\%) \\
> > &= 6.17\% \\
> > r_{P(b)} &= 3.0\% + \frac{40}{60}(3.0\% - 4.5\%) \\
> > &= 2.00\%
> > \end{align*}
> > $$
> > Leverage adds 0.67 percentage points when the portfolio earns more than the borrowing cost and takes away 1.00 point when it earns less. It increases both the expected return and the volatility of the return on capital.

> [!example]- Repo for Liquidity and Securities Lending for Yield {Example}
> An insurer needs \$19.6 million of cash for 30 days to pay claims. Rather than sell bonds, it repos \$20 million of Treasuries with a 2% haircut at a repo rate of 4.40%. Separately, it lends \$50 million of corporate bonds for a year against cash collateral of 102%, reinvests the collateral at 4.6% and pays the borrower a rebate of 4.3%. Find the repo interest and the lending income.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C &= 20{,}000{,}000 \times (1 - 0.02) \\
> > &= 19{,}600{,}000 \\
> > \text{Repo interest} &= 19{,}600{,}000 \times 0.044 \times \frac{30}{360} \\
> > &= 71{,}866.67 \\
> > \text{Collateral} &= 1.02 \times 50{,}000{,}000 \\
> > &= 51{,}000{,}000 \\
> > \text{Lending income} &= 51{,}000{,}000 \times (4.6\% - 4.3\%) \\
> > &= 153{,}000
> > \end{align*}
> > $$
> > The repo costs \$71,867 and keeps the bonds, and their income, in the portfolio. The lending adds about 31 basis points a year on the bonds lent, but the gain depends on the reinvested collateral holding its value, which is where securities lenders lost money in 2008.

> [!tip]- How it appears on the exam
> - **INV-101:** Learning outcome 2e asks for the techniques that enhance yield and manage liquidity in fixed income portfolios, from the CFA chapter on fixed-income portfolio management, and 2f asks the candidate to construct portfolios under indexing and target-return strategies. Learning outcome 1a covers the cash flows and risks of the instruments the portfolio holds.
> - **Calculations:** Questions ask for a levered return with $r_P = r_I + (B/E)(r_I - r_B)$, for repo interest on a given haircut and term, or for the income from securities lending.
> - **Written answers:** Questions ask which mandate suits an investor, such as an insurer with known claims or a pension plan, and why, or ask for the risks of using repo, futures or securities lending. They pair with [[Immunization]] and [[Passive Management]].

> [!warning]- Exam traps
> - **Leverage cuts both ways:** The leverage term is $(B/E)(r_I - r_B)$, which is negative when the portfolio earns less than the borrowing rate. Adding $(B/E)\,r_I$ without subtracting the borrowing cost overstates the return.
> - **Repo is a loan, not a sale:** The portfolio keeps the bonds' risk and income in a repo, and must buy them back. Treating the bonds as sold understates the portfolio's duration and credit exposure.
> - **Haircut and day count:** The cash raised is the value less the haircut, and repo interest uses an actual/360 day count. Using the full value or a 365-day year gets the interest wrong.
> - **Mandate and benchmark:** A liability-based mandate is judged against the liabilities, not a bond index. Recommending an index fund for an insurer's claims portfolio ignores the duration and cash flow profile it must match.
