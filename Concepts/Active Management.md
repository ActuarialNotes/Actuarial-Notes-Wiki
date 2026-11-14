---
aliases:
  - Active Strategy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8f63b9c7c6d9bafe5ec145dcd6a85b11c3e89bd0517cb1f9ff99b54d4d33f63
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Active Management.md
---

**Active Management** is holding a [[Portfolio|portfolio]] that departs from its benchmark on purpose, overweighting the securities, sectors or factors the manager expects to do better and underweighting the rest. Its aim is a return above the benchmark after costs.

The difference between the portfolio's return and the benchmark's is the active return. With $w_i$ and $w_i^B$ the weights of security $i$ in the portfolio and the benchmark, the active return is

> $$R_A = \sum_i \left(w_i - w_i^B\right) R_i$$

- $R_i$ is the return on security $i$.

The standard deviation of the active return, $\sigma(R_A)$, is the active risk, or tracking error.

> [!example]- What is this manager's active return? {Example}
> A manager holds three stocks against a benchmark of the same three:
>
> | Stock | Benchmark weight | Portfolio weight | Return |
> | :--- | ---: | ---: | ---: |
> | X | 50% | 30% | 10% |
> | Y | 30% | 30% | 4% |
> | Z | 20% | 40% | −2% |
>
> > [!answer]-
> > - Only the weights that differ contribute: X is underweight by $0.20$ and Z overweight by $0.20$.
> > - The active return is $(-0.20)(10\%) + (0.20)(-2\%) = -2.4\%$.
> > - As a check, the benchmark returns $5.8\%$ and the portfolio $3.4\%$, a difference of $-2.4\%$.

## Information ratio and the fundamental law

The information ratio measures the active return earned per unit of active risk. It is

> $$IR = \frac{E(R_A)}{\sigma(R_A)}$$

The fundamental law of active management relates the information ratio to the manager's skill and the number of independent bets. It is

> $$IR \approx TC \times IC \times \sqrt{BR}$$

- $IC$ is the information coefficient, the correlation between the manager's forecasts and the returns that follow.
- $BR$ is the breadth, the number of independent bets a year.
- $TC$ is the transfer coefficient, between 0 and 1, which measures how fully the constraints let forecasts become positions.

A manager reaches a high information ratio either by forecasting well or by making many independent forecasts. Breadth enters through its square root, so quadrupling the number of independent bets only doubles the information ratio, while doubling the information coefficient doubles it directly. Constraints such as no short sales lower $TC$, and with it the realized $IR$. The law gives the information ratio before costs.

> [!example]- Which of these two managers has the higher expected information ratio and active return? {Example}
> Manager A forecasts returns for a broad stock universe, with an information coefficient of $0.04$ and the equivalent of 100 independent bets a year, but a long-only constraint gives a transfer coefficient of $0.6$. Manager B makes sector calls, with an information coefficient of $0.10$, 9 independent bets a year and no constraints. Both run $4\%$ active risk. The figures are illustrative.
>
> > [!answer]-
> > - Manager A's information ratio is $0.6 \times 0.04 \times \sqrt{100} = 0.24$.
> > - Manager B's is $1.0 \times 0.10 \times \sqrt{9} = 0.30$.
> > - The expected active return is the information ratio times the active risk: $0.24 \times 4\% = 0.96\%$ for A and $0.30 \times 4\% = 1.20\%$ for B.
> > - B's few, more accurate bets win here only because the constraint takes away 40% of A's skill. Without it, A's information ratio would be $0.40$.
> > - Manager B has the higher information ratio and active return, provided its nine sector calls are independent, which is hard to achieve when sectors move together.

## Active share and active risk

Active share measures how much of the portfolio differs from the benchmark. It is

> $$\text{Active share} = \tfrac{1}{2}\sum_i \left|w_i - w_i^B\right|$$

Active risk measures how much the difference matters to return. A portfolio with high active share spread across many small, diversified positions can have low active risk, while a concentrated factor bet can have high active risk with modest active share. Comparing the two classifies a manager as a closet indexer, a diversified stock picker or a concentrated one.

> [!example]- A benchmark holds X, Y and Z at $50\%$, $30\%$ and $20\%$, and a manager at $30\%$, $30\%$ and $40\%$. What is the active share? {Example}
> - The weight differences are $0.20$, $0$ and $0.20$.
> - The active share is $\tfrac{1}{2}(0.20 + 0 + 0.20) = 20\%$.
> - In the year X returned $10\%$ and Z $-2\%$, the manager moved a fifth of the portfolio from the best stock to the worst, so active share measures the size of the bets, not whether they are right.

## Fundamental and quantitative strategies

A fundamental, or discretionary, manager forms views from research on companies and industries, bottom-up from individual firms or top-down from the economy, sectors and countries. Its styles include value, which buys companies cheap against earnings or assets, growth, which pays for faster expected earnings growth, and growth at a reasonable price, between the two. Activist investors buy a stake and press management for change.

A quantitative, or systematic, manager ranks securities on factors, such as value, momentum, quality and size, and builds a portfolio from the ranks with a risk model. Statistical arbitrage, including pairs trading, bets that a historical relation between prices will be restored. The risks are data mining, look-ahead and survivorship bias in the back-test, and many managers crowding into the same signals.

## Costs and measurement

Management fees, trading costs and the market impact of large trades come out of the active return, and turnover multiplies the trading costs. A strategy with high turnover can have a good gross information ratio and a poor net one. The same skill earns a lower net information ratio in a small, illiquid market than in a liquid one, because the costs of acting on it are higher. [[Passive Management|Passive management]] is the alternative a manager must beat net of all of them.

Whether the active return came from skill is assessed through [[Performance Measurement|performance measurement]], including attribution to allocation and selection and the information ratio over a long enough period to separate skill from luck.

> [!trap] Counting holdings as breadth
> Breadth counts independent bets. Overweighting fifty banks on one view of interest rates is one bet, not fifty, so using the number of holdings as $BR$ overstates the information ratio.
