---
aliases:
  - Indexing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:85bbfb608bab1e5b864fd0b6d2868d4f52fd2914603cdbdbeb167d62adee93eb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Passive Management.md
---

**Passive Management**, or indexing, is building and holding a [[Portfolio|portfolio]] designed to track the return of a chosen index rather than to beat it. It takes no view on which securities will do better, so its aims are low cost and low tracking error.

The manager's choices are about the index, how closely to hold it, and how to keep the portfolio in line as the index changes. In a capitalization-weighted index, the weight of security $i$ is

> $$w_i^B = \frac{P_i\,Q_i}{\sum_j P_j\,Q_j}$$

- $P_i$ is the price of security $i$.
- $Q_i$ is its shares outstanding, usually reduced to the shares freely available for trading (float adjustment).

The index is the strategy, so choosing it is an active decision. Market-capitalization weighting is the default and holds the market portfolio. Price, equal and fundamental weighting, and factor-based (smart beta) indices, tilt toward small companies, value or other factors and need more rebalancing. Such an index is still passively managed, but its return will differ from the capitalization-weighted market, and its tilts are deliberate bets. An index's rules for reconstitution and rebalancing decide when the indexer must trade.

## Tracking error

With $R_P$ and $R_B$ the returns of the portfolio and the benchmark, the active return is

> $$R_A = R_P - R_B$$

The tracking error is the standard deviation of the active return. It is

> $$TE = \sqrt{\text{Var}(R_P - R_B)}$$

From the two volatilities $\sigma_P$ and $\sigma_B$, the squared tracking error is

> $$TE^2 = \sigma_P^2 + \sigma_B^2 - 2\rho\,\sigma_P\sigma_B$$

- $\rho$ is the [[Correlation|correlation]] between portfolio and benchmark returns.

> [!example]- What is this fund's tracking error, and in what range should its active return fall in about 19 years out of 20? {Example}
> A sampled index fund has a volatility of $15.2\%$ a year, its benchmark has a volatility of $15.0\%$, and their correlation is $0.995$ (illustrative values). The fund's expected active return is $-0.05\%$ a year, the cost of its fees. Assume active returns are normal.
>
> > [!answer]-
> > - The squared tracking error is $0.152^2 + 0.150^2 - 2(0.995)(0.152)(0.150) = 0.045604 - 0.045372 = 0.000232$.
> > - The tracking error is $\sqrt{0.000232} = 1.52\%$.
> > - The range is $-0.05\% \pm 1.96(1.52\%)$, from about $-3.0\%$ to $+2.9\%$.
> > - A correlation of $0.995$ sounds close to perfect, but the fund could lag its index by three points in a year with no change in the manager's skill, which is why indexers report tracking error directly rather than correlation.

Fees, cash held for flows, sampling, the cost of trading at reconstitution, and taxes withheld on dividends all pull the portfolio away from the index, which itself bears no costs. Securities lending income offsets part of the drag. Index funds, exchange-traded funds, futures and total return swaps are the main vehicles for holding an index.

> [!trap] Tracking error is a standard deviation
> Tracking error measures how much the active return varies, not its average. A fund can trail its index by its fee every year with almost no tracking error.

## Replicating an index

Full replication holds every security in the index at its index weight. It gives the lowest tracking error when the index has a few hundred liquid securities, but costs too much in trading for an index with thousands of small or illiquid names.

Stratified sampling divides the index into cells, such as sector by size, or for bonds sector by duration by quality, and holds a sample of securities in each cell at the cell's index weight. Fewer holdings are needed, at the cost of some tracking error.

Optimization uses a risk model to choose the holdings that minimize forecast tracking error, subject to constraints such as the number of names. It uses fewer securities still, but the forecast is only as good as the model, and the portfolio has to be re-optimized as correlations change.

## Fixed income indexing

A bond index holds thousands of issues, many rarely traded, and its composition changes every month as bonds mature and are issued, so full replication is rarely possible. The manager matches the primary risk factors instead: [[Duration|duration]], the spread of cash flows along the [[Yield Curve|yield curve]], sector and quality weights, call and prepayment exposure, and issuer concentration. Each factor is matched on its own. Matching each sector's weight but not its duration, or the total duration but not each sector's contribution, leaves a sector or curve bet. Enhanced indexing allows small deliberate mismatches to cover costs.

> [!example]- How should the manager split the corporate cell between the two bonds to match this index? {Example}
> A bond index is $40\%$ Treasuries with a duration of 6.0, $35\%$ corporates with a duration of 7.0, and $25\%$ mortgage-backed securities with a duration of 4.5. The manager will fill the corporate cell with two bonds of durations 5 and 10, matching the cell's weight and its contribution to duration.
>
> > [!answer]-
> > - The index duration is $0.40(6.0) + 0.35(7.0) + 0.25(4.5) = 5.975$.
> > - The corporate cell must contribute $0.35 \times 7.0 = 2.45$ to it.
> > - With $x$ in the five-year-duration bond and $0.35 - x$ in the other, $5x + 10(0.35 - x) = 2.45$, so $3.5 - 5x = 2.45$ and $x = 0.21$.
> > - Matching the cell's contribution, rather than only the total duration, keeps the portfolio from a hidden bet on corporate spreads against Treasuries. It does not match the cell's cash flow spread, so a non-parallel move in rates can still cause tracking error.
> > - The portfolio holds $21\%$ in the five-year-duration bond and $14\%$ in the ten-year-duration bond.

## Hidden dangers of passive investing

Indexing is cheap for each investor, but heavy use of it has costs for the market and for the indexer. Capitalization weights buy more of what has risen, so the index can become concentrated in a few large companies, and flows into the same index funds move prices without regard to value. Bond funds that offer daily liquidity on illiquid holdings carry a liquidity mismatch that has to be absorbed in a sell-off. An index fund has close to zero active risk but the full market risk of its index, so passive holders can still lose heavily.

In retirement plan design, indexing also means increasing benefits with inflation. On the investment side, index funds are a common [[Defined Contribution Plan|defined contribution]] investment option, and the alternative to them is [[Active Management|active management]].
