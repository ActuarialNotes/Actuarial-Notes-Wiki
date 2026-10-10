---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:83d4154f2764568a34a390018b85479a0d20b4f5bb336b252f8fb860bf06d419
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Class.md
---

An **asset class** is a group of investments whose returns are driven by the same economic factors, so that they behave alike within the group and differently from other groups, and which an investor can therefore treat as one building block when setting a [[Portfolio|portfolio's]] [[Asset Allocation|strategic asset allocation]]. Each class is described by its cash flows, the risks that drive them and the role it plays in the portfolio, and a class earns a place only if adding it improves the portfolio's risk and return.

> $$E[R_p] = \sum_j w_j\,E[R_j]$$

> $$\sigma_p^2 = \sum_i \sum_j w_i\,w_j\,\rho_{ij}\,\sigma_i\,\sigma_j$$

> $$\frac{E[R_k] - R_f}{\sigma_k} > \rho_{k,p}\,\frac{E[R_p] - R_f}{\sigma_p}$$

- **Symbols:** $w_j$ is the weight of class $j$, $E[R_j]$ its expected return, $\sigma_j$ its [[Volatility|volatility]] and $\rho_{ij}$ the [[Correlation|correlation]] between classes $i$ and $j$. $R_f$ is the risk-free rate. The last line is the test for adding class $k$ to an existing portfolio $p$: a small allocation raises the portfolio's Sharpe ratio when the new class's Sharpe ratio exceeds the existing portfolio's Sharpe ratio times their correlation.
- **What makes a class:** The CFA Institute's asset allocation reading asks that the assets within a class be relatively homogeneous, that the classes be mutually exclusive, that each class diversify the others rather than duplicate them, that together they cover most of the investable wealth available, and that each be able to absorb a meaningful share of the portfolio without moving its own prices. A label that fails these tests, such as a single manager's strategy, is better treated as a way of accessing a class than as a class of its own.
- **Fixed income:** Government bonds ([[Bonds]]) pay fixed coupons with almost no default risk, so their risk is interest rate risk, and they provide liquidity and a hedge against falling rates and recessions. A [[Corporate Bond|corporate bond]] adds a credit spread for default and downgrade risk. A [[Leveraged Loan|leveraged loan]] is a senior secured, floating-rate loan to a sub-investment-grade borrower, so it carries credit risk with little duration. A [[Mortgage Loan|mortgage loan]], commercial or residential, is secured by property and amortizes. A [[Mortgage-Backed Security|mortgage-backed security]] passes the pooled mortgage payments through to investors, which adds [[Prepayment Risk|prepayment risk]] and negative convexity. [[Structured Finance|Structured credit]], such as collateralized loan obligations, tranches a pool of loans so that each tranche takes a different share of the losses. [[Private Debt|Private debt]] is lending outside public markets, which pays an illiquidity premium.
- **Equity and alternatives:** [[Public Equity|Public equity]] is the main source of long-run growth, through dividends and rising earnings, with high volatility. [[Private Equity|Private equity]] seeks a higher return in exchange for illiquidity, long commitments and stale valuations. [[Real Estate|Real estate]] earns rent and a change in property value, which gives it a partial hedge against inflation. A [[Hedge Fund|hedge fund]] is a pooled vehicle that uses leverage, short selling and derivatives to target returns that depend less on the market's direction.
- **Roles in the portfolio:** Classes are often grouped by what they do for the investor rather than by their legal form. Equities and private capital provide growth, government bonds provide liquidity and protection in a downturn, and real estate, infrastructure and inflation-linked bonds protect against [[Inflation|inflation]]. An insurer or pension plan also judges each class against its liabilities, so a long bond that hedges the liabilities can be the lowest-risk asset even when its own volatility is high.
- **Measured risk can mislead:** Private equity, private debt and real estate are valued by appraisal or by the manager, so their reported returns are smoothed. Smoothing understates both their volatility and their correlation with public markets, which makes them look more diversifying in an optimizer than they are.

| Class | Cash flows | Main risks | Typical role |
|---|---|---|---|
| Government bonds | Fixed coupons and principal | Interest rate, inflation | Liquidity, liability hedge |
| Corporate bonds | Fixed coupons plus a spread | Credit, spread, rates | Income |
| Leveraged loans | Floating coupons | Credit, liquidity | Income with little duration |
| Mortgages and MBS | Amortizing payments | Prepayment, credit, rates | Income, spread |
| Private debt | Floating or fixed coupons | Credit, illiquidity | Illiquidity premium |
| Public equity | Dividends, price change | Market, earnings | Growth |
| Private equity | Distributions on exit | Market, illiquidity, leverage | Growth |
| Real estate | Rent, value change | Property market, leverage | Income, inflation hedge |
| Hedge funds | Manager-driven returns | Manager, leverage, liquidity | Diversification |

> [!example]- What a Low-Correlation Class Adds to an Equity Portfolio {Example}
> A portfolio holds only public equity, with an expected return of 7.5% and volatility of 16%. The investor considers moving 30% into a second class with an expected return of 5.5% and volatility of 12%. The risk-free rate is 3%. Find the expected return, volatility and Sharpe ratio of the 70/30 mix if the second class has a correlation with equity of (a) 0.9 and (b) 0.3, and check each against the test for adding a class.
>
> > [!answer]-
> > The expected return doesn't depend on the correlation.
> > $$
> > \begin{align*}
> > E[R_p] &= 0.7(7.5\%) + 0.3(5.5\%) \\
> > &= 6.9\%
> > \end{align*}
> > $$
> > The variance has two fixed terms and a covariance term that depends on $\rho$.
> > $$
> > \begin{align*}
> > \sigma_p^2(0.9) &= 0.49(0.16^2) + 0.09(0.12^2) + 2(0.21)(0.9)(0.16)(0.12) \\
> > &= 0.012544 + 0.001296 + 0.007258 \\
> > &= 0.021098 \\
> > \sigma_p^2(0.3) &= 0.012544 + 0.001296 + 0.002419 \\
> > &= 0.016259
> > \end{align*}
> > $$
> > So $\sigma_p = 14.53\%$ with $\rho = 0.9$ and $\sigma_p = 12.75\%$ with $\rho = 0.3$. The Sharpe ratios are $(6.9 - 3)/14.53 = 0.268$ and $(6.9 - 3)/12.75 = 0.306$, against $(7.5 - 3)/16 = 0.281$ for equity alone.
> >
> > The second class has a Sharpe ratio of $(5.5 - 3)/12 = 0.208$. The hurdle is $0.9(0.281) = 0.253$ in case (a), which it fails, and $0.3(0.281) = 0.084$ in case (b), which it passes. With high correlation the new class is a weaker version of equity and the mix is worse. With low correlation the same class, with a lower return and a lower Sharpe ratio than equity, improves the portfolio, because it removes more risk than return.

> [!tip]- How it appears on the exam
> - **INV-101, cash flows and risks:** Learning objective 1a asks candidates to describe the cash flow characteristics, underlying risks and portfolio roles of government and corporate bonds, leveraged loans, commercial and residential mortgages, mortgage-backed securities, structured credit and private debt. Expect a written answer that compares two of them, such as a corporate bond against a leveraged loan, or that recommends one for a stated investor.
> - **INV-101, equity and alternatives:** Learning objective 1b asks for the distinguishing characteristics and contributions of public equity, private equity, real estate and hedge funds. Questions often give an investor's objectives and ask which class suits it and why.
> - **Asset allocation:** The same classes are the inputs to the asset allocation objectives in the second section of the syllabus, where a calculation of a mix's return, volatility or Sharpe ratio supports the recommendation.

> [!warning]- Exam traps
> - **Correlation, not return, decides diversification:** A class with a lower expected return and a lower Sharpe ratio than the current portfolio can still improve it, as the example shows. Rejecting it on its standalone return ignores the covariance term.
> - **Floating rate is not low risk:** A leveraged loan's floating coupon removes most of its interest rate risk, but it is lent to sub-investment-grade borrowers, so its credit risk is high. Describing it as a safe, short-duration asset misses the main risk.
> - **MBS duration moves with rates:** A mortgage-backed security's duration shortens when rates fall, because borrowers refinance, and lengthens when rates rise. Treating it as a fixed-cash-flow bond overstates its gain when rates fall.
> - **Smoothed returns:** Using appraisal-based returns for real estate or private equity in an optimizer understates their volatility and correlation and leads to too large an allocation. Unsmoothing the returns, or capping the weights, is the usual fix.
> - **Vehicle versus class:** A hedge fund's return comes from its strategy and its manager's skill rather than from one shared risk factor, so the same label covers very different exposures. Treat hedge funds as a heterogeneous group when judging their role.
