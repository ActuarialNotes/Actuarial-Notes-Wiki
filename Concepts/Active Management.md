---
aliases:
  - Active Strategy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e8ae008b26ee1c8ef09928b41139867c69c18a1a75a27923296bac836cdbbbd4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Active Management.md
---
**Active management** holds a [[Portfolio|portfolio]] that departs from its benchmark on purpose, overweighting the securities, sectors or factors the manager expects to do better and underweighting the rest, in order to earn a return above the benchmark after costs. Its result is measured by the active return, its risk by the active risk, and the two together by the information ratio, which the fundamental law of active management relates to the manager's skill and the number of independent bets.

> $$R_A = \sum_i \left(w_i - w_i^B\right) R_i$$

> $$IR = \frac{E(R_A)}{\sigma(R_A)}$$

> $$IR \approx TC \times IC \times \sqrt{BR}$$

> $$\text{Active share} = \tfrac{1}{2}\sum_i \left|w_i - w_i^B\right|$$

- **Symbols:** $w_i$ and $w_i^B$ are the weights of security $i$ in the portfolio and the benchmark, and $R_i$ is its return, so $R_A$ is the active return, the portfolio's return less the benchmark's. Its standard deviation $\sigma(R_A)$ is the active risk, or tracking error, and $IR$ is the information ratio. $IC$ is the information coefficient, the correlation between the manager's forecasts and the returns that follow, $BR$ is the breadth, the number of independent bets a year, and $TC$ is the transfer coefficient, between 0 and 1, which measures how fully the constraints let forecasts become positions.
- **The fundamental law:** A manager reaches a high information ratio either by forecasting well or by making many independent forecasts. The bets must really be independent: overweighting fifty banks on one view of interest rates is one bet, not fifty. Constraints such as no short sales lower $TC$ and with it the realized $IR$.
- **Fundamental strategies:** A discretionary manager forms views from research on companies and industries, bottom-up from individual firms or top-down from the economy, sectors and countries. Styles include value, which buys companies cheap against earnings or assets, growth, which pays for faster expected earnings growth, and growth at a reasonable price, between the two. Activist investors buy a stake and press management for change.
- **Quantitative strategies:** A systematic manager ranks securities on factors, such as value, momentum, quality and size, and builds a portfolio from the ranks with a risk model. Statistical arbitrage, including pairs trading, bets that a historical relation between prices will be restored. The risks are data mining, look-ahead and survivorship bias in the back-test, and many managers crowding into the same signals.
- **Active share and active risk:** Active share measures how much of the portfolio differs from the benchmark, and active risk measures how much the difference matters to return. A portfolio with high active share spread across many small, diversified positions can have low active risk, while a concentrated factor bet can have high active risk with modest active share.
- **Costs:** Management fees, trading costs and the market impact of large trades come out of the active return, and turnover multiplies the trading costs. The same skill earns a lower net information ratio in a small, illiquid market than in a liquid one, because the costs of acting on it are higher. [[Passive Management|Passive management]] is the alternative a manager must beat net of all of them.
- **Measurement:** Whether the active return came from skill is assessed through [[Performance Measurement|performance measurement]], including attribution to allocation and selection and the information ratio over a long enough period to separate skill from luck.

> [!example]- Two Managers and the Fundamental Law {Example}
> Manager A forecasts returns for a broad stock universe, with an information coefficient of $0.04$ and the equivalent of 100 independent bets a year, but a long-only constraint gives a transfer coefficient of $0.6$. Manager B makes sector calls, with an information coefficient of $0.10$, 9 independent bets a year and no constraints. Both run $4\%$ active risk. Compare their expected information ratios and active returns. The figures are illustrative.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > IR_A &\approx 0.6 \times 0.04 \times \sqrt{100} \\
> > &= 0.24 \\
> > IR_B &\approx 1.0 \times 0.10 \times \sqrt{9} \\
> > &= 0.30 \\
> > E(R_A)_A &= 0.24 \times 4\% \\
> > &= 0.96\% \\
> > E(R_A)_B &= 0.30 \times 4\% \\
> > &= 1.20\%
> > \end{align*}
> > $$
> > Manager B's few, more accurate bets beat A's many weak ones here, but only because the constraint takes away 40% of A's skill. Without it, A's information ratio would be $0.40$. The comparison also assumes B's nine sector calls are independent, which is hard to achieve when sectors move together.

> [!example]- Active Return and Active Share on a Three-Stock Benchmark {Example}
> A benchmark holds stocks X, Y and Z at weights $50\%$, $30\%$ and $20\%$. A manager holds them at $30\%$, $30\%$ and $40\%$. Over the year, X returns $10\%$, Y $4\%$ and Z $-2\%$. Find the active return and the active share.
>
> > [!answer]-
> > Only the weights that differ contribute to the active return.
> > $$
> > \begin{align*}
> > R_A &= (-0.20)(10\%) + (0)(4\%) \\
> > &\quad + (0.20)(-2\%) \\
> > &= -2.4\% \\
> > \text{Active share} &= \tfrac{1}{2}(0.20 + 0 + 0.20) \\
> > &= 20\%
> > \end{align*}
> > $$
> > The check is direct: the benchmark returns $5.8\%$ and the portfolio $3.4\%$. The manager moved a fifth of the portfolio from the best stock to the worst, which shows that active share measures the size of the bets, not whether they are right.

> [!tip]- How it appears on the exam
> - **INV-101:** The objective on constructing and managing equity portfolios under active strategies is read in the CFA Institute's chapter on active equity strategies. Expect to describe and compare fundamental and quantitative approaches, the main styles, and the pitfalls of each, and to recommend a strategy for a described investor.
> - **INV-101, calculations:** Questions apply the fundamental law, compute an information ratio or active return, or compare active share with active risk to classify a manager as a closet indexer, a diversified stock picker or a concentrated one.

> [!warning]- Exam traps
> - **Breadth counts independent bets:** Two hundred positions driven by one macro view are close to one bet. Using the number of holdings as $BR$ overstates the information ratio.
> - **The square root:** Breadth enters through its square root, so quadrupling the number of independent bets only doubles the information ratio. Doubling the information coefficient doubles it directly.
> - **Active return, not total return:** An information ratio divides the active return by the active risk. Using the total return or the total volatility gives a Sharpe ratio, which measures something else.
> - **Gross versus net:** The fundamental law gives the information ratio before costs. A strategy with high turnover can have a good gross ratio and a poor net one.
