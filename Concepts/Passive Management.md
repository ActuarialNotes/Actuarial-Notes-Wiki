---
aliases:
  - Indexing
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:57da7312232bd8c89da20f8a2543b28348644b4e0049e6925377eef9ae5a789a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Passive Management.md
---
**Passive management**, or indexing, builds and holds a [[Portfolio|portfolio]] designed to track the return of a chosen index rather than to beat it. It takes no view on which securities will do better, so its aims are low cost and low tracking error, and the manager's choices are about the index, how closely to hold it, and how to keep the portfolio in line as the index changes.

> $$w_i^B = \frac{P_i\,Q_i}{\sum_j P_j\,Q_j}$$

> $$R_A = R_P - R_B$$

> $$TE = \sqrt{\text{Var}(R_P - R_B)}$$

> $$TE^2 = \sigma_P^2 + \sigma_B^2 - 2\rho\,\sigma_P\sigma_B$$

- **Symbols:** $w_i^B$ is the weight of security $i$ in a capitalization-weighted index, $P_i$ is its price and $Q_i$ its shares outstanding, usually reduced to the shares freely available for trading (float adjustment). $R_P$ and $R_B$ are the returns of the portfolio and the benchmark, $R_A$ is the active return, and the tracking error $TE$ is the standard deviation of the active return. In the last block $\rho$ is the [[Correlation|correlation]] between portfolio and benchmark returns.
- **Index choice:** The index is the strategy, so choosing it is an active decision. Market-capitalization weighting is the default and holds the market portfolio, while price, equal and fundamental weighting, and factor-based (smart beta) indices tilt toward small companies, value or other factors and need more rebalancing. An index's rules for reconstitution and rebalancing decide when the indexer must trade.
- **Full replication:** The portfolio holds every security in the index at its index weight. It gives the lowest tracking error when the index has a few hundred liquid securities, but costs too much in trading for an index with thousands of small or illiquid names.
- **Stratified sampling:** The index is divided into cells, such as sector by size, or for bonds sector by duration by quality, and the portfolio holds a sample of securities in each cell at the cell's index weight. Fewer holdings are needed, at the cost of some tracking error.
- **Optimization:** A risk model chooses the holdings that minimize forecast tracking error, subject to constraints such as the number of names. It uses fewer securities still, but the forecast is only as good as the model, and the portfolio has to be re-optimized as correlations change.
- **Fixed income indexing:** A bond index holds thousands of issues, many rarely traded, and its composition changes every month as bonds mature and are issued, so full replication is rarely possible. The manager matches the primary risk factors instead: [[Duration|duration]], the spread of cash flows along the [[Yield Curve|yield curve]], sector and quality weights, call and prepayment exposure, and issuer concentration. Enhanced indexing allows small deliberate mismatches to cover costs.
- **Sources of tracking error:** Fees, cash held for flows, sampling, the cost of trading at reconstitution, and taxes withheld on dividends all pull the portfolio away from the index, which itself bears no costs. Securities lending income offsets part of the drag. Index funds, exchange-traded funds, futures and total return swaps are the main vehicles for holding an index.
- **Hidden dangers:** Indexing is cheap for each investor, but heavy use of it has costs for the market and for the indexer. Capitalization weights buy more of what has risen, so the index can become concentrated in a few large companies, and flows into the same index funds move prices without regard to value. Bond funds that offer daily liquidity on illiquid holdings carry a liquidity mismatch that has to be absorbed in a sell-off, and passive holders can still lose heavily, because tracking the market means owning its falls.

> [!example]- Tracking Error of a Sampled Equity Fund {Example}
> A sampled index fund has a volatility of $15.2\%$ a year, its benchmark has a volatility of $15.0\%$, and their correlation is $0.995$ (illustrative values). The fund's expected active return is $-0.05\%$ a year, the cost of its fees. Find the tracking error and a range that should hold the active return in about 19 years out of 20, assuming active returns are normal.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > TE^2 &= 0.152^2 + 0.150^2 \\
> > &\quad - 2(0.995)(0.152)(0.150) \\
> > &= 0.045604 - 0.045372 \\
> > &= 0.000232 \\
> > TE &= 1.52\%
> > \end{align*}
> > $$
> > The range is $-0.05\% \pm 1.96(1.52\%)$, from about $-3.0\%$ to $+2.9\%$. A correlation of $0.995$ sounds close to perfect, but it leaves a tracking error large enough that an investor could see the fund lag its index by three points in a year with no change in the manager's skill. That is why indexers report tracking error directly rather than correlation.

> [!example]- Matching Duration by Cell in a Bond Index {Example}
> A bond index is $40\%$ Treasuries with a duration of 6.0, $35\%$ corporates with a duration of 7.0, and $25\%$ mortgage-backed securities with a duration of 4.5. The manager will fill the corporate cell with two bonds of durations 5 and 10. Find the index duration and the weight of each corporate bond so that the cell's weight and its contribution to duration match the index.
>
> > [!answer]-
> > The index duration is the weighted sum of the cell durations, and the corporate cell must contribute $0.35 \times 7.0 = 2.45$.
> > $$
> > \begin{align*}
> > D_B &= 0.40(6.0) + 0.35(7.0) + 0.25(4.5) \\
> > &= 5.975 \\
> > 5x + 10(0.35 - x) &= 2.45 \\
> > 3.5 - 5x &= 2.45 \\
> > x &= 0.21
> > \end{align*}
> > $$
> > The portfolio holds $21\%$ in the five-year-duration bond and $14\%$ in the ten-year-duration bond. Matching the cell's contribution, rather than only the portfolio's total duration, keeps the portfolio from taking a hidden bet on corporate spreads against Treasuries. Matching the contribution to duration does not match the cell's cash flow spread, so a non-parallel move in rates can still cause tracking error.

> [!tip]- How it appears on the exam
> - **INV-101, fixed income:** The objective on fixed income strategies, including indexing, is read in the CFA Institute's chapter on liability-driven and index-based strategies. Expect to explain why a bond index is hard to replicate, to compare full replication with matching the primary risk factors, and to match an index's duration or contributions to duration.
> - **INV-101, equity:** The passive equity objective covers index construction and weighting, replication, stratified sampling and optimization, the vehicles for indexing, and the sources of tracking error, with a study note on the hidden dangers of passive investing.
> - **RET-101:** The plan-features list includes indexing, which in plan design means increasing benefits with inflation. On the investment side, the objective on managing retirement fund assets asks candidates to distinguish passive from [[Active Management|active]] strategies, and index funds are a common [[Defined Contribution Plan|defined contribution]] investment option.

> [!warning]- Exam traps
> - **Tracking error is a standard deviation:** It measures how much the active return varies, not its average. A fund can trail its index by its fee every year with almost no tracking error.
> - **Passive is not riskless:** An index fund has close to zero active risk but the full market risk of its index. Low tracking error says nothing about how much the fund can lose.
> - **Index weight versus duration contribution:** In a bond portfolio, matching each sector's weight but not its duration, or the total duration but not each sector's contribution, leaves a sector or curve bet. The risk factors are matched one by one.
> - **Choosing the index is a decision:** A factor-based or equally weighted index is still passively managed, but its return will differ from the capitalization-weighted market. Its tilts should be judged as deliberate bets, not as costless tracking.
