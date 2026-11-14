---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8065c9b115c3ee14da15fb98785050f7a9755901088497d7ccffd9d8568ff090
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hedge Fund.md
---

A **Hedge Fund** is a privately offered investment fund, open only to institutions and wealthy investors, whose manager can use leverage, short selling and derivatives to pursue returns that depend less on the direction of the markets than a long-only fund's do. In a [[Portfolio|portfolio]] it is held mainly as a diversifier and a source of returns from the manager's skill.

A hedge fund charges a management fee on assets plus an incentive fee on profits. With $V_t$ the value of the investor's stake at the end of period $t$ before fees, the management fee is

> $$F^{m}_t = m\,V_t$$

- $m$ is the management fee rate.

The incentive fee is

> $$F^{I}_t = p \times \max\left(0,\ V_t - F^{m}_t - H_{t-1}\right)$$

- $p$ is the incentive fee rate, so "2 and 20" means $m = 2\%$ and $p = 20\%$.
- $H_{t-1}$ is the high-water mark, the highest net asset value on which an incentive fee has been charged, starting at the amount invested.

After the fees are paid, the high-water mark is

> $$H_t = \max\left(H_{t-1},\ V_t - F^{m}_t - F^{I}_t\right)$$

This convention charges the management fee on end-of-period assets and the incentive fee on gains net of the management fee. A fund's documents may calculate either fee differently, so check the question's wording each time.

The high-water mark stops the manager from earning an incentive fee twice on the same gain, so after a loss the fund must recover to its previous peak before any incentive fee is paid. A hurdle rate requires a minimum return first. Under a hard hurdle the fee is charged only on the return above the hurdle, while under a soft hurdle the whole gain is fee-bearing once the hurdle is cleared.

> [!example]- What is the investor's two-year net return, and what does the high-water mark save? {Example}
> An investor puts \$100 million into a hedge fund that charges 2 and 20, with a high-water mark and no hurdle. The management fee is 2% of assets at year end, and the incentive fee is 20% of the value after the management fee above the high-water mark. The fund's gross return is $-10\%$ in year 1 and $+25\%$ in year 2.
>
> > [!answer]-
> > - Year 1 is a loss, so only the management fee is charged and the high-water mark stays at 100.
> > - The gross value is $100(0.90) = 90.00$, the management fee $0.02(90.00) = 1.80$, and the value after fees $88.20$.
> > - In year 2 the gross value is $88.20(1.25) = 110.25$ and the management fee $0.02(110.25) = 2.205$.
> > - The incentive fee is $0.20 \times (110.25 - 2.205 - 100) = 0.20(8.045) = 1.609$.
> > - The value after fees is $108.045 - 1.609 = 106.436$, which is the new high-water mark.
> > - Without a high-water mark, the incentive fee would be $0.20(108.045 - 88.20) = 3.969$, leaving $104.076$.
> > - The two-year net return is 6.4%, against a gross return of $0.90 \times 1.25 - 1 = 12.5\%$. The high-water mark saves the investor about \$2.36 million, because the first \$11.8 million of the year 2 gain only recovered the year 1 loss.

## Hedge fund strategies

In equity hedge strategies, equity long/short managers buy stocks they expect to rise and sell short those they expect to fall, keeping some net exposure to the market. Market-neutral funds aim for none, and short-biased funds hold more short than long positions.

Event-driven strategies profit from corporate events. Merger arbitrage buys the target of an announced takeover and often shorts the acquirer, and its main risk is that the deal fails. Distressed investing buys the debt of companies near or in bankruptcy, and activist funds take stakes to push management to change.

Relative value strategies buy one security and sell a related one when their prices are out of line, such as a convertible bond against the issuer's shares, or two bonds on the same yield curve. The spreads they earn are small, so they use heavy leverage, which makes them vulnerable when spreads widen and financing is withdrawn.

In macro strategies, global macro funds take directional positions in interest rates, currencies, commodities and equity indexes based on economic views, and managed futures funds follow price trends systematically. These strategies have often done well in sharp market falls, which makes them valuable diversifiers.

Because their returns come from very different strategies and from manager skill, hedge funds are not one [[Asset Class|asset class]]. A macro fund and a merger arbitrage fund carry very different risks. Investors judge a fund on its net-of-fee return relative to the market exposure it carries, and on whether it protects the portfolio when equities fall.

## Liquidity terms

A lock-up period bars withdrawals for the first year or more, after which investors can usually redeem only monthly or quarterly with 30 to 90 days' notice. A gate lets the manager limit the share of the fund redeemed on any date, and a side pocket separates illiquid assets that leaving investors can't take out until they are sold. These terms protect the remaining investors from forced sales, but the investor can't count on hedge fund money for liquidity. Whether a hedge fund allocation suits an institutional investor turns on its liquidity needs against these terms.

## Biases in the return data

Funds report to databases voluntarily. Survivorship bias arises because funds that close, usually after poor returns, drop out of the database. Backfill bias arises because a fund that starts reporting after a good run adds its earlier, favourable history. Both inflate the average reported return. Stale prices on illiquid holdings smooth returns and understate volatility and correlation with markets, so a Sharpe ratio built from database returns overstates what an investor can expect.

> [!example]- What is the survivorship bias in this database's reported return? {Example}
> A database starts the year with ten funds. Eight survive the year and earn an average return of 10%. Two close during the year after losing an average of 20%, and the database deletes their records.
>
> > [!answer]-
> > - The database reports the survivors' average, 10%.
> > - The average over all ten funds is $\dfrac{8(10\%) + 2(-20\%)}{10} = 4\%$.
> > - An investor who had picked a fund at random at the start of the year expected 4%.
> > - The survivorship bias is $10\% - 4\% = 6\%$.

> [!trap] Forgetting the high-water mark after a loss
> The incentive fee in a year that follows a loss is charged only on the gain above the previous peak. Charging it on the whole year's gain overstates the fee, as the example's 3.969 against 1.609 shows.
