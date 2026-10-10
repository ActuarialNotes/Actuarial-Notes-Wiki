---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f9ceb121350da48a9a2797a3875535b82912a3fd43712a8566f17d6e3fe5034
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hedge Fund.md
---

A **hedge fund** is a privately offered investment fund, open only to institutions and wealthy investors, whose manager can use leverage, short selling and derivatives to pursue returns that depend less on the direction of the markets than a long-only fund's do. It charges a management fee on assets plus an incentive fee on profits, restricts how often investors can withdraw, and in a [[Portfolio|portfolio]] it is held mainly as a diversifier and a source of returns from the manager's skill.

> $$F^{m}_t = m\,V_t$$

> $$F^{I}_t = p \times \max\left(0,\ V_t - F^{m}_t - H_{t-1}\right)$$

> $$H_t = \max\left(H_{t-1},\ V_t - F^{m}_t - F^{I}_t\right)$$

- **Symbols:** $V_t$ is the value of the investor's stake at the end of period $t$ before fees, $m$ the management fee rate and $p$ the incentive fee rate, so "2 and 20" means $m = 2\%$ and $p = 20\%$. $H_{t-1}$ is the high-water mark: the highest net asset value on which an incentive fee has been charged, starting at the amount invested. This convention charges the management fee on end-of-period assets and the incentive fee on gains net of the management fee; a fund's documents may calculate either fee differently.
- **High-water mark and hurdle:** The high-water mark stops the manager from earning an incentive fee twice on the same gain, so after a loss the fund must recover to its previous peak before any incentive fee is paid. A hurdle rate requires a minimum return first. Under a hard hurdle the fee is charged only on the return above the hurdle, while under a soft hurdle the whole gain is fee-bearing once the hurdle is cleared.
- **Equity hedge strategies:** Equity long/short managers buy stocks they expect to rise and sell short those they expect to fall, keeping some net exposure to the market. Market-neutral funds aim for none, and short-biased funds hold more short than long positions.
- **Event-driven strategies:** These profit from corporate events. Merger arbitrage buys the target of an announced takeover and often shorts the acquirer, and the main risk is that the deal fails. Distressed investing buys the debt of companies near or in bankruptcy, and activist funds take stakes to push management to change.
- **Relative value strategies:** These buy one security and sell a related one when their prices are out of line, such as a convertible bond against the issuer's shares, or two bonds on the same yield curve. The spreads they earn are small, so they use heavy leverage, which makes them vulnerable when spreads widen and financing is withdrawn.
- **Macro strategies:** Global macro funds take directional positions in interest rates, currencies, commodities and equity indexes based on economic views, and managed futures funds follow price trends systematically. These strategies have often done well in sharp market falls, which makes them valuable diversifiers.
- **Liquidity terms:** A lock-up period bars withdrawals for the first year or more, after which investors can usually redeem only monthly or quarterly with 30 to 90 days' notice. A gate lets the manager limit the share of the fund redeemed on any date, and a side pocket separates illiquid assets that leaving investors can't take out until they are sold. These terms protect the remaining investors from forced sales but mean the investor can't count on hedge fund money for liquidity.
- **Biases in the return data:** Funds report to databases voluntarily. Survivorship bias arises because funds that close, usually after poor returns, drop out of the database. Backfill bias arises because a fund that starts reporting after a good run adds its earlier, favourable history. Both inflate the average reported return, and stale prices on illiquid holdings smooth returns and understate volatility and correlation with markets.
- **Role as a diversifier:** Hedge funds are not one [[Asset Class|asset class]], because their returns come from very different strategies and from manager skill. Investors judge them on their net-of-fee return relative to the market exposure they carry, and on whether they protect the portfolio when equities fall.

> [!example]- Net-of-Fee Return with a High-Water Mark {Example}
> An investor puts \$100 million into a hedge fund that charges 2 and 20, with a high-water mark and no hurdle. The management fee is 2% of assets at year end, and the incentive fee is 20% of the value after the management fee above the high-water mark. The fund's gross return is $-10\%$ in year 1 and $+25\%$ in year 2. Find the investor's value after fees at the end of each year and the two-year net return, and compare the result with having no high-water mark.
>
> > [!answer]-
> > In year 1 there is a loss, so only the management fee is charged and the high-water mark stays at 100.
> > $$
> > \begin{align*}
> > V_1 &= 100(0.90) \\
> > &= 90.00 \\
> > F^{m}_1 &= 0.02(90.00) \\
> > &= 1.80 \\
> > \text{NAV}_1 &= 90.00 - 1.80 \\
> > &= 88.20
> > \end{align*}
> > $$
> > In year 2 the gross value is $88.20(1.25) = 110.25$, and the management fee is $0.02(110.25) = 2.205$.
> > $$
> > \begin{align*}
> > F^{I}_2 &= 0.20 \times \max(0,\ 110.25 - 2.205 - 100) \\
> > &= 0.20(8.045) \\
> > &= 1.609 \\
> > \text{NAV}_2 &= 108.045 - 1.609 \\
> > &= 106.436
> > \end{align*}
> > $$
> > The two-year net return is 6.4%, against a gross return of $0.90 \times 1.25 - 1 = 12.5\%$, and the new high-water mark is 106.436. Without a high-water mark, the incentive fee would be charged on the whole year 2 gain of $108.045 - 88.20 = 19.845$, giving a fee of 3.969 and a value of \$104.076 million. The high-water mark saves the investor about \$2.36 million, because the first \$11.8 million of the year 2 gain only recovered the year 1 loss.

> [!example]- Survivorship Bias in a Hedge Fund Index {Example}
> A database starts the year with ten funds. Eight survive the year and earn an average return of 10%. Two close during the year after losing an average of 20%, and the database deletes their records. Find the average return reported by the database and the survivorship bias.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{R}_{\text{all}} &= \frac{8(10\%) + 2(-20\%)}{10} \\
> > &= 4\% \\
> > \text{Bias} &= 10\% - 4\% \\
> > &= 6\%
> > \end{align*}
> > $$
> > An investor who had picked a fund at random at the start of the year expected 4%, not the 10% the surviving funds report. A pension plan that sets its hedge fund return assumption from the database's history builds the same error into its asset allocation.

> [!tip]- How it appears on the exam
> - **INV-101, learning objective 1b:** Candidates describe the distinguishing investment characteristics of hedge funds and their potential contribution to a portfolio, alongside public equity, private equity and real estate. Expect a written answer on the main strategies, the fee structure, the liquidity terms and the biases in reported returns.
> - **Fee calculations:** A short calculation of the net-of-fee return under a management fee, an incentive fee, a hurdle and a high-water mark is a natural question, sometimes over two or more years so that the high-water mark matters.
> - **Recommendations:** Questions may give an institutional investor's liquidity needs and ask whether a hedge fund allocation suits it, which turns on the lock-up, notice period and gates.

> [!warning]- Exam traps
> - **Forgetting the high-water mark after a loss:** The incentive fee in a year that follows a loss is charged only on the gain above the previous peak. Charging it on the whole year's gain overstates the fee.
> - **Fee order:** The question decides whether the management fee is deducted before the incentive fee is calculated, and whether it is charged on beginning or ending assets. Using a different convention from the question's gives a different answer, so check the wording each time.
> - **Hard versus soft hurdle:** Under a hard hurdle the incentive fee applies only to the return above the hurdle. Under a soft hurdle, once the hurdle is cleared, the fee applies to the whole return, so mixing them up misstates the fee.
> - **Taking database returns at face value:** Survivorship and backfill biases both raise the average reported return, and smoothing lowers the measured volatility. A Sharpe ratio built from database returns overstates what an investor can expect.
> - **Not an asset class:** A hedge fund's exposure depends on its strategy, so a macro fund and a merger arbitrage fund carry very different risks. Treating hedge funds as one homogeneous class leads to wrong conclusions about diversification.
