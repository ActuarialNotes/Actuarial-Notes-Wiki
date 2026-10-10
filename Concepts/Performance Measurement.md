---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b163d281ab11ea4db220da9b233d8177728b53594f87cfd6f4a6e307800a4751
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Performance Measurement.md
---

**Performance measurement** is the process of calculating a [[Portfolio|portfolio's]] return, adjusting it for the risk taken, comparing it with a benchmark, and attributing the difference to the manager's decisions. Its three parts answer what return was earned, whether it was enough for the risk, and where it came from.

> $$1 + R_{TW} = \prod_{k=1}^{n}\left(1 + r_k\right)$$

> $$S_p = \frac{R_p - R_f}{\sigma_p}$$

> $$T_p = \frac{R_p - R_f}{\beta_p}$$

> $$\alpha_p = R_p - \left[R_f + \beta_p\left(R_m - R_f\right)\right]$$

> $$R_P - R_B = \sum_i \left(A_i + S_i + I_i\right)$$

- **Symbols:** $r_k$ is the return over sub-period $k$, between external cash flows, so $R_{TW}$ is the time-weighted return. $R_p$, $\sigma_p$ and $\beta_p$ are the portfolio's return, standard deviation and beta, $R_f$ is the risk-free rate and $R_m$ the market return, which give the Sharpe ratio $S_p$, the Treynor ratio $T_p$ and Jensen's alpha $\alpha_p$. In the last block $A_i$, $S_i$ and $I_i$ are the allocation, selection and interaction effects of segment $i$, defined in the attribution bullet.
- **Time-weighted and money-weighted returns:** The time-weighted return chains the sub-period returns, so it does not depend on when the client added or withdrew money, and it is the standard for judging a manager. The money-weighted return is the [[Internal Rate of Return|internal rate of return]] of the portfolio's cash flows, and it measures the investor's own experience, including the timing of the flows. The [[Rate of Return|rate of return]] page works an example of both. The money-weighted return suits a manager who controls the flows, as in [[Private Equity|private equity]].
- **Risk-adjusted measures:** The Sharpe ratio rewards return per unit of total risk and suits a portfolio that is the investor's whole wealth. The Treynor ratio and Jensen's alpha use only systematic risk, so they suit a portfolio that is one part of a diversified whole, and they rely on the capital asset pricing model and a correct market proxy. The information ratio, the active return over the active risk, judges a manager against the benchmark the manager was given, as in [[Active Management|active management]].
- **Benchmarks:** A valid benchmark is specified in advance, appropriate to the manager's style, measurable, unambiguous, reflective of the manager's current holdings, accepted by the manager, and investable. A broad market index, a style index, a custom security-based benchmark and a peer group are the usual choices, and a peer group fails several of the tests because its members and their weights are not known in advance.
- **Brinson attribution:** With $w_i$ and $w_i^B$ the portfolio and benchmark weights of segment $i$, $R_i$ and $R_i^B$ their returns in it, and $R_B$ the benchmark's total return, the allocation effect is $A_i = (w_i - w_i^B)(R_i^B - R_B)$, the selection effect is $S_i = w_i^B(R_i - R_i^B)$, and the interaction effect is $I_i = (w_i - w_i^B)(R_i - R_i^B)$. Allocation rewards overweighting segments that beat the benchmark, selection rewards picking better securities within a segment, and the three add up to the active return.
- **Fixed income and other attribution:** Bond portfolios are attributed to yield curve, duration, sector and spread and security selection effects, because a sector split misses the main bets. Factor-based attribution, using a returns-based or holdings-based factor model, separates a style tilt from skill.
- **Appraisal and luck:** A good period may be luck. Judging skill needs a long record, consistency of the results with the manager's stated process, and the [[Statistical Significance|statistical significance]] of the alpha or the information ratio.
- **Insurers:** The performance of a general insurer as a whole is measured with financial ratios rather than with portfolio returns. See [[Key Financial Measures]] and [[Risk-Adjusted Performance]].

> [!example]- Ranking Two Portfolios on Sharpe, Treynor and Alpha {Example}
> The risk-free rate is $3\%$ and the market returned $9\%$ with a standard deviation of $16\%$. Portfolio X returned $11\%$ with a standard deviation of $20\%$ and a beta of $1.2$. Portfolio Y returned $8\%$ with a standard deviation of $12\%$ and a beta of $0.7$. Compute the three measures for each.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > S_X &= \frac{11\% - 3\%}{20\%} \\
> > &= 0.400 \\
> > S_Y &= \frac{8\% - 3\%}{12\%} \\
> > &= 0.417 \\
> > T_X &= \frac{8\%}{1.2} \\
> > &= 6.67\% \\
> > T_Y &= \frac{5\%}{0.7} \\
> > &= 7.14\% \\
> > \alpha_X &= 11\% - [3\% + 1.2(6\%)] \\
> > &= 0.8\% \\
> > \alpha_Y &= 8\% - [3\% + 0.7(6\%)] \\
> > &= 0.8\%
> > \end{align*}
> > $$
> > Both portfolios have the same alpha, but Y earns it with less risk, so it ranks higher on both ratios. Both beat the market's Sharpe ratio of $6\%/16\% = 0.375$. Portfolio X's higher raw return comes from taking more market risk, which an investor could have had by holding the market with borrowing.

> [!example]- Brinson Attribution Across Two Sectors {Example}
> A benchmark is $40\%$ technology, which returned $12\%$, and $60\%$ other stocks, which returned $5\%$. A manager held $50\%$ technology, which returned $10\%$ in the portfolio, and $50\%$ other stocks, which returned $6\%$. Attribute the active return.
>
> > [!answer]-
> > The benchmark returns $0.4(12\%) + 0.6(5\%) = 7.8\%$ and the portfolio $0.5(10\%) + 0.5(6\%) = 8.0\%$, so the active return is $0.2\%$.
> > $$
> > \begin{align*}
> > A &= 0.1(12\% - 7.8\%) \\
> > &\quad - 0.1(5\% - 7.8\%) \\
> > &= 0.70\% \\
> > S &= 0.4(10\% - 12\%) \\
> > &\quad + 0.6(6\% - 5\%) \\
> > &= -0.20\% \\
> > I &= 0.1(10\% - 12\%) \\
> > &\quad - 0.1(6\% - 5\%) \\
> > &= -0.30\%
> > \end{align*}
> > $$
> > The effects add to $0.70\% - 0.20\% - 0.30\% = 0.20\%$. The manager's sector call added value, and the stock selection in technology took most of it away. The interaction is negative because the manager overweighted the sector where the selection was poor.

> [!tip]- How it appears on the exam
> - **INV-101:** The objectives on performance measurement, benchmarks and attribution are read in the CFA Institute's chapter on portfolio performance evaluation. Expect to compute time-weighted and money-weighted returns, the Sharpe and Treynor ratios, Jensen's alpha and the information ratio, to judge whether a benchmark is valid, and to carry out and interpret a Brinson attribution.
> - **GI-201:** The financial health objective asks about the considerations in measuring the performance of a general insurer, read in the SOA's *General Insurance Financial Reporting Topics*. There the subject is the insurer's results and capital rather than an investment manager's return, and it sits beside the chapter on financial ratios.

> [!warning]- Exam traps
> - **Which return judges the manager:** The time-weighted return is the right one when the client controls the cash flows. Using the money-weighted return penalizes or rewards the manager for the client's timing.
> - **Total or systematic risk:** The Sharpe ratio uses the standard deviation and the Treynor ratio uses beta. A poorly diversified portfolio can rank well on Treynor and badly on Sharpe, and the right choice depends on whether the portfolio is the investor's whole wealth.
> - **Allocation measured against the benchmark total:** In the Brinson-Fachler form the allocation effect multiplies the weight difference by the segment's benchmark return less the total benchmark return. Overweighting a segment with a positive but below-benchmark return detracts value.
> - **Selection uses benchmark weights:** The selection effect weights the return difference by the benchmark weight. The part due to the portfolio's different weight is the interaction effect, and some presentations fold it into selection, so the question's definition decides which to report.
