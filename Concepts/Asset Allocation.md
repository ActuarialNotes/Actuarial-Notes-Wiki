---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:db38ab58e03de4753be0741d094afe67f734cc8acaced12851df4ba10dadc16a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Asset Allocation.md
---

**Asset allocation** is the decision of how an investor's [[Portfolio|portfolio]] is divided among asset classes, such as equities, bonds, [[Real Estate|real estate]] and [[Private Equity|private equity]]. The strategic asset allocation (SAA) sets the long-term target weights that best meet the investor's return objective, risk tolerance and constraints, and it is chosen either for the assets alone or relative to the liabilities the assets must fund.

> $$U_m = E(R_m) - \tfrac{1}{2}\lambda\,\sigma_m^2$$

> $$\sigma_m^2 = \sum_i\sum_j w_i w_j\,\rho_{ij}\,\sigma_i\sigma_j$$

> $$R_S = R_A - \frac{L_0}{A_0}\,R_L$$

- **Symbols:** $U_m$ is the investor's risk-adjusted expected return on asset mix $m$, $E(R_m)$ and $\sigma_m$ are the mix's expected return and standard deviation, and $\lambda$ is the investor's risk aversion. In the variance, $w_i$ is the weight of asset class $i$, $\sigma_i$ its standard deviation and $\rho_{ij}$ the [[Correlation|correlation]] between classes. In the surplus return $R_S$, $A_0$ and $L_0$ are the assets and liabilities at the start, and $R_A$ and $R_L$ are their returns over the period.
- **Strategic and tactical:** The SAA is the policy portfolio, written into the [[Investment Policy Statement|investment policy statement]] with a target and a permitted range for each class. Tactical asset allocation (TAA) is a deliberate short-term departure from the targets to exploit a view on relative returns, and it is judged by whether it beats the SAA after costs. [[Portfolio Rebalancing|Rebalancing]] is the opposite move, trading back to the targets after market drift.
- **Asset classes:** An asset class used in an allocation should be internally similar, distinct from the other classes, large enough to hold without moving prices, and should add something to the risk and return of the whole. Grouping classes by the risk factors they share, such as equity risk, duration and inflation, shows overlaps that a list of class names hides.
- **Asset-only, mean-variance:** Mean-variance optimization chooses the mix on the efficient frontier that maximizes $U_m$. Its weaknesses are well known: small changes in expected returns produce large changes in weights, the optimal mixes are concentrated in a few classes, and the inputs are estimates. Reverse optimization, which backs expected returns out of market-capitalization weights, Black-Litterman views layered on top of them, resampling, and constraints on the weights are the usual remedies.
- **Liability-relative:** For a pension plan or an insurer the risk that matters is a shortfall of assets against liabilities, so the allocation is optimized on the surplus return $R_S$ rather than on $R_A$. A common form splits the assets into a hedging portfolio that moves with the liabilities, typically long bonds matched on duration, and a return-seeking portfolio for the rest. This is [[Asset-Liability Management|asset-liability management]] applied to the allocation, and it ties to [[Immunization|immunization]] of the [[Asset-Liability Portfolio|asset-liability portfolio]].
- **Goals-based:** A private investor's wealth can be split into sub-portfolios, one for each goal, each with its own horizon and required probability of success. The overall allocation is the sum of the sub-portfolios.
- **Constraints:** The size of the assets, liquidity needs, time horizon, regulation, tax and the investor's preferences all narrow the choice. An institution with large assets can use private markets that a small one cannot, and an insurer's regulator limits how much of some classes it may hold.
- **Behavioural biases:** Familiarity and home bias overweight domestic or own-company assets, loss aversion and mental accounting distort the risk taken in different pots, and the illusion of control and hindsight lead to overconfident tactical moves. A formal policy and a governance process are the defence against them.

> [!example]- Choosing a Mix by Risk Aversion {Example}
> With illustrative capital market assumptions, equities have an expected return of $8\%$ and a standard deviation of $18\%$, bonds $4\%$ and $6\%$, and their correlation is $0.2$. Compare equity weights of $30\%$, $50\%$ and $70\%$ for an investor with $\lambda = 4$ and one with $\lambda = 2$.
>
> > [!answer]-
> > For the $30\%$ mix, the expected return is $0.3(8\%) + 0.7(4\%) = 5.2\%$.
> > $$
> > \begin{align*}
> > \sigma_m^2 &= 0.3^2(0.18)^2 + 0.7^2(0.06)^2 \\
> > &\quad + 2(0.3)(0.7)(0.2)(0.18)(0.06) \\
> > &= 0.005587 \\
> > U_m &= 0.052 - \tfrac{1}{2}(4)(0.005587) \\
> > &= 4.08\%
> > \end{align*}
> > $$
> > The same steps give variances of $0.010080$ and $0.017107$ for the $50\%$ and $70\%$ mixes, with expected returns of $6.0\%$ and $6.8\%$. With $\lambda = 4$ the utilities are $4.08\%$, $3.98\%$ and $3.38\%$, so the more risk-averse investor holds $30\%$ equities. With $\lambda = 2$ they are $4.64\%$, $4.99\%$ and $5.09\%$, so the less risk-averse investor holds $70\%$. The capital market assumptions are the same for both, and only the risk aversion changes the answer.

> [!example]- Cash Is Not Risk-Free for a Pension Plan {Example}
> A pension plan has assets of \$100 million and liabilities of \$90 million. The liabilities grow by an expected $4\%$ a year with a standard deviation of $10\%$ from interest rate moves. Compare holding the assets in cash, which returns $2\%$ with no volatility, with holding long bonds that return an expected $4.5\%$ with a standard deviation of $10\%$ and a correlation of $0.95$ with the liabilities. The figures are illustrative.
>
> > [!answer]-
> > With $L_0/A_0 = 0.9$, the surplus variance is $\sigma_A^2 + 0.9^2\sigma_L^2 - 2(0.9)\rho\,\sigma_A\sigma_L$.
> > $$
> > \begin{align*}
> > E(R_S)_{\text{cash}} &= 2\% - 0.9(4\%) \\
> > &= -1.6\% \\
> > \sigma_{S,\text{cash}} &= 0.9(10\%) \\
> > &= 9.0\% \\
> > E(R_S)_{\text{bonds}} &= 4.5\% - 0.9(4\%) \\
> > &= 0.9\% \\
> > \sigma_{S,\text{bonds}}^2 &= 0.01 + 0.0081 - 0.0171 \\
> > &= 0.0010 \\
> > \sigma_{S,\text{bonds}} &= 3.2\%
> > \end{align*}
> > $$
> > Cash is the risk-free asset in an asset-only view, but against the liabilities it leaves the surplus fully exposed to falling interest rates. The long bonds have a higher expected surplus return and about a third of the surplus risk, because they hedge most of the liabilities' interest rate sensitivity.

> [!tip]- How it appears on the exam
> - **INV-101, portfolio construction:** The objective on construction approaches and techniques for asset allocation is read in the CFA Institute's *Portfolio Management in Practice, Volume 1* chapters on the overview and the principles of asset allocation. Expect to distinguish asset-only, liability-relative and goals-based approaches, to explain SAA against TAA, to criticize mean-variance optimization and name its remedies, and to recommend an approach for a described investor.
> - **INV-101, calculations:** Questions give capital market assumptions and a risk aversion and ask for the mix with the highest risk-adjusted return, or ask how a liability changes the choice.
> - **INV-101, behavioural bias:** The section of the real-world constraints chapter on the syllabus covers the biases that affect asset allocation decisions and how a policy process limits them.

> [!warning]- Exam traps
> - **Units in the utility:** The reading writes the penalty as $0.005\,\lambda\,\sigma_m^2$ with returns in percent, which equals $\tfrac{1}{2}\lambda\sigma_m^2$ with returns as decimals. Mixing the two, such as a percent return with a decimal variance, gives a utility that is wrong by a factor of 100.
> - **The risk-free asset depends on the liabilities:** For a liability-relative investor, the least risky portfolio is the one that hedges the liabilities, not cash. Recommending cash as the safe choice for a pension plan answers the asset-only question.
> - **Tactical is not rebalancing:** TAA moves away from the targets on purpose, and rebalancing moves back to them. A question about a deliberate overweight on a market view is about TAA and its costs, not about corridors.
> - **Surplus scale:** The surplus return is measured on the assets, so the liability return is multiplied by $L_0/A_0$. Subtracting $R_L$ at full weight overstates the liability's effect when the plan is in surplus and understates it in deficit.
