---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6c42fa2701cf4e1778595482127ddd0e697f7250aa79d95a5dc6a23428463a6d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Public Equity.md
---

**Public Equity** is the [[Asset Class|asset class]] of ownership shares in companies listed and traded on a stock exchange. A shareholder is paid through dividends and through the change in the share price, both of which depend on the company's earnings and on what the market will pay for them. If a share or index is priced $P_0$ at the start of a period and $P_1$ at the end, and pays dividends $D_1$ during it, its total return is

> $$R = \frac{D_1}{P_0} + \frac{P_1 - P_0}{P_0}$$

In a [[Portfolio|portfolio]], public equity is the main source of long-run growth, bought with high short-term volatility.

## Sources of return

With earnings per share $E_0$ and $E_1$ at the start and end of the period, the price change splits into earnings growth and the change in the price-earnings ratio $P/E$:

> $$\frac{P_1}{P_0} = \frac{E_1}{E_0} \times \frac{(P/E)_1}{(P/E)_0}$$

A total return therefore comes from three sources: income (the dividend yield), growth (earnings growth) and repricing (the change in the P/E). Over long periods income and growth dominate. Over a year or two, the change in the multiple usually dominates. Earnings growth and the change in the P/E multiply, so adding them only approximates the price return.

> [!example]- What is this index's total return, and how does it split into dividend yield, earnings growth and the change in the P/E? {Example}
> At the start of a year an equity index stands at 4,000, with earnings per share of 200. During the year it pays dividends of 80. Earnings grow by 6%, and by year end the market values the index at 19 times earnings.
>
> > [!answer]-
> > - The starting P/E is $4{,}000/200 = 20$, and earnings grow to $200 \times 1.06 = 212$.
> > - The year-end price is $212 \times 19 = 4{,}028$, so the price return is $1.06 \times 0.95 - 1 = 0.7\%$.
> > - The dividend yield is $80/4{,}000 = 2\%$, so the total return is $2\% + 0.7\% = 2.7\%$.
> > - Earnings growth adds 6% and the fall in the multiple from 20 to 19 subtracts 5%.
> > - Adding the three parts gives 3.0%. The 0.3% difference is the cross term $0.06 \times (-0.05)$.

## The Grinold-Kroner model

The Grinold-Kroner model estimates the expected return on equity from its income, growth and repricing:

> $$E[R] \approx \frac{D}{P} - \%\Delta S + i + g + \%\Delta(P/E)$$

- $D/P$ is the dividend yield.
- $\%\Delta S$ is the percentage change in shares outstanding, negative when companies buy back shares.
- $i$ is expected inflation.
- $g$ is real earnings growth.
- $\%\Delta(P/E)$ is the expected annual change in the valuation multiple.

A reduction in shares outstanding raises the return, because each remaining share gets a larger part of the earnings.

> [!example]- What is the expected annual return on this equity allocation? {Example}
> The index has a dividend yield of 1.8%, and companies are expected to reduce shares outstanding by 0.5% a year through buybacks. Expected inflation is 2.5%, real earnings growth is 2.0% a year, and the P/E ratio is expected to fall by 1.0% a year.
>
> > [!answer]-
> > - The buybacks make $\%\Delta S = -0.5\%$, so $-\%\Delta S = +0.5\%$.
> > - $E[R] \approx 1.8\% + 0.5\% + 2.5\% + 2.0\% - 1.0\% = 5.8\%$.
> > - Income provides 2.3%, nominal earnings growth 4.5%, and repricing takes away 1.0%.

## Roles in a portfolio

The CFA Institute's equity portfolio management reading lists four roles:

1. **Capital appreciation**, as earnings grow with the economy.
2. **Dividend income**, which is often steadier than prices.
3. **Diversification** of other asset classes, such as bonds, because equity returns are driven by earnings rather than by interest rates alone.
4. **An inflation hedge** over long horizons, because companies can raise prices. An unexpected rise in inflation usually raises discount rates and lowers P/E ratios, so equities often fall in the short run.

Equity has no fixed cash flows to match against liabilities, so for an insurer or pension plan it adds surplus volatility, and regulators set a high capital requirement for it. Long-horizon investors such as pension plans and endowments hold more of it than insurers do, because they can wait out a fall and need the growth.

## Segmentation

By market capitalization, stocks are divided into large, mid and small cap. By style, they are divided into value (low price relative to earnings or book value), growth (high expected earnings growth) and core or blend. Small-cap and value stocks have historically earned premiums for extra risk, so a manager's size and style tilts explain much of its return relative to a broad index.

By geography, markets are divided into developed, emerging and frontier markets, which differ in growth, liquidity, governance and currency risk. Within a market, stocks are grouped by economic activity into sectors and industries, such as financials or energy, and a portfolio's sector weights are a source of risk relative to its benchmark.

## Ways to own public equity

An investor can hold equity through [[Passive Management|passive]] index funds, which track a capitalization-weighted index at low cost, or through [[Active Management|active]] managers who try to beat it. Public equity is far more liquid than [[Private Equity|private equity]], so it is also where a portfolio raises cash quickly or [[Portfolio Rebalancing|rebalances]].

> [!trap] Entering buybacks with the wrong sign
> In the Grinold-Kroner model, $-\%\Delta S$ adds to the return when shares outstanding fall. Entering a 0.5% buyback rate as $-0.5\%$ in the return lowers the expected return when it should raise it.
