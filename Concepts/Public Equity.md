---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a62ff4c912ee265c12d1dae386970379f05c656edfa27669767f65b73533778
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Public Equity.md
---

**Public equity** is the [[Asset Class|asset class]] of ownership shares in companies listed and traded on a stock exchange. A shareholder is paid through dividends and through the change in the share price, both of which depend on the company's earnings and on what the market will pay for them, and in a [[Portfolio|portfolio]] it is the main source of long-run growth, bought with high short-term volatility.

> $$R = \frac{D_1}{P_0} + \frac{P_1 - P_0}{P_0}$$

> $$\frac{P_1}{P_0} = \frac{E_1}{E_0} \times \frac{(P/E)_1}{(P/E)_0}$$

> $$E[R] \approx \frac{D}{P} - \%\Delta S + i + g + \%\Delta(P/E)$$

- **Symbols:** $P_0$ and $P_1$ are the share or index prices at the start and end of the period, $D_1$ the dividends paid during it, $E_0$ and $E_1$ the earnings per share, and $P/E$ the price-earnings ratio. In the last line, the Grinold-Kroner model, $D/P$ is the dividend yield, $\%\Delta S$ the percentage change in shares outstanding (negative when the company buys back shares), $i$ expected inflation, $g$ real earnings growth and $\%\Delta(P/E)$ the expected annual change in the valuation multiple.
- **Sources of return:** The second line splits the price change into earnings growth and the change in the multiple, so a total return comes from three sources: income (the dividend yield), growth (earnings growth, nominal or real plus inflation) and repricing (the change in the P/E). Over long periods income and growth dominate, while over a year or two the change in the multiple usually dominates.
- **Roles in a portfolio:** The CFA Institute's equity portfolio management reading lists four roles. Equities provide capital appreciation, as earnings grow with the economy, and dividend income, which is often steadier than prices. They diversify other asset classes, such as bonds, because their returns are driven by earnings rather than by interest rates alone. And over long horizons they are a partial hedge against [[Inflation|inflation]], because companies can raise prices, although equities often fall when inflation rises unexpectedly in the short run.
- **Segmentation by size and style:** Stocks are divided by market capitalization into large, mid and small cap, and by style into value (low price relative to earnings or book value), growth (high expected earnings growth) and core or blend. Small-cap and value stocks have historically earned premiums for extra risk, so a manager's size and style tilts explain much of its return relative to a broad index.
- **Segmentation by geography and sector:** Markets are divided into developed, emerging and frontier markets, which differ in growth, liquidity, governance and currency risk. Within a market, stocks are grouped by economic activity into sectors and industries, such as financials or energy, and a portfolio's sector weights are a source of risk relative to its benchmark.
- **Ways to own it:** An investor can hold equity through [[Passive Management|passive]] index funds, which track a capitalization-weighted index at low cost, or through [[Active Management|active]] managers who try to beat it. Public equity is far more liquid than [[Private Equity|private equity]], so it is also where a portfolio raises cash quickly or [[Portfolio Rebalancing|rebalances]].
- **For an insurer or pension plan:** Equity has no fixed cash flows to match against liabilities, so it adds surplus volatility, and regulators set a high capital requirement for it. Long-horizon investors such as pension plans and endowments hold more of it than insurers do, because they can wait out a fall and need the growth.

> [!example]- Decomposing an Index's Total Return {Example}
> At the start of a year an equity index stands at 4,000, with earnings per share of 200. During the year it pays dividends of 80. Earnings grow by 6%, and by year end the market values the index at 19 times earnings. Find the total return and split it into dividend yield, earnings growth and the change in the P/E ratio.
>
> > [!answer]-
> > The starting P/E is $4{,}000 / 200 = 20$, and earnings grow to $200(1.06) = 212$.
> > $$
> > \begin{align*}
> > P_1 &= 212 \times 19 \\
> > &= 4{,}028 \\
> > \frac{P_1}{P_0} &= 1.06 \times \frac{19}{20} \\
> > &= 1.007 \\
> > R &= \frac{80}{4{,}000} + 0.007 \\
> > &= 0.02 + 0.007 \\
> > &= 2.7\%
> > \end{align*}
> > $$
> > The dividend yield is 2%, earnings growth adds 6% and the fall in the multiple from 20 to 19 subtracts 5%. Adding them gives 3.0%. The exact price return is $1.06 \times 0.95 - 1 = 0.7\%$ rather than $6\% - 5\% = 1\%$, and the 0.3% difference is the cross term $0.06 \times (-0.05)$. Strong earnings growth was mostly cancelled by the market paying less for each unit of earnings.

> [!example]- Expected Equity Return from the Grinold-Kroner Model {Example}
> An insurer's investment committee is setting a long-term expected return for its domestic equity allocation. The index has a dividend yield of 1.8%, and companies are expected to reduce shares outstanding by 0.5% a year through buybacks. Expected inflation is 2.5%, real earnings growth is 2.0% a year, and the committee expects the P/E ratio to fall by 1.0% a year as valuations return toward their average. Estimate the expected annual return.
>
> > [!answer]-
> > A reduction in shares outstanding enters with a positive sign, because each remaining share gets a larger part of the earnings.
> > $$
> > \begin{align*}
> > E[R] &\approx 1.8\% - (-0.5\%) + 2.5\% + 2.0\% + (-1.0\%) \\
> > &= 5.8\%
> > \end{align*}
> > $$
> > Income, made up of the dividend yield and the buyback yield, provides 2.3%, nominal earnings growth provides 4.5%, and repricing takes away 1.0%. The equity risk premium over a long government bond yield of, say, 4.0% would be about 1.8%, which is the figure the committee would compare with the extra surplus volatility and capital that equities bring.

> [!tip]- How it appears on the exam
> - **INV-101, learning objective 1b:** Candidates describe the distinguishing investment characteristics of public equity and its potential contribution to a portfolio. Expect a written answer that lists its roles (capital appreciation, dividend income, diversification and an inflation hedge) and compares it with private equity, real estate or hedge funds for a stated investor.
> - **Segmentation:** Questions may ask how an equity universe is divided, by size and style, by geography or by sector, and how a manager's tilts along those lines show up in its return relative to a benchmark.
> - **Equity strategies:** The later objectives on passive and active equity strategies build on this page. A short calculation, such as a return decomposition or an expected return, supports a recommendation about how much equity to hold.

> [!warning]- Exam traps
> - **Adding instead of compounding:** Earnings growth and the change in the P/E multiply, so the exact price return is $(1 + g)(1 + c) - 1$. Simply adding them overstates the return when both are positive and misstates it whenever they are large.
> - **Buybacks have the opposite sign:** In the Grinold-Kroner model, $-\%\Delta S$ adds to the return when shares outstanding fall. Entering a 0.5% buyback rate as $-0.5\%$ reduces the expected return when it should raise it.
> - **Inflation hedge only in the long run:** Equities hedge inflation over long horizons, but an unexpected rise in inflation usually raises discount rates and lowers P/E ratios. Claiming that equities protect against an inflation shock in the short run is wrong.
> - **Dividend yield is not the whole return:** A low-yield stock is not a low-return stock, because growth and buybacks also return value to shareholders. Judging equities by their income alone undervalues them for a long-horizon investor.
