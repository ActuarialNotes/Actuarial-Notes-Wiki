**Holistic risk treatment** chooses how to treat an organization's risks by looking at all of them together, as one portfolio across every unit and category, instead of treating each risk separately in its own department or "silo". It is how [[Enterprise Risk Management|enterprise risk management]] carries out the treatment step of the [[Risk Management Process|risk management process]]: the treatment is judged by its effect on the whole organization's risk, measured against the [[Risk Appetite|risk appetite]] the board has set.

> $$\sigma_P = \sqrt{\sigma_1^2 + \sigma_2^2 + 2\rho\,\sigma_1\sigma_2}$$

> $$\sigma_P \leq \sigma_1 + \sigma_2$$

- **Symbols:** $\sigma_1$ and $\sigma_2$ are the [[Standard Deviation|standard deviations]] of two units' results (or two risks), $\rho$ their [[Correlation|correlation]] and $\sigma_P$ the standard deviation of the combined result. Only at $\rho = 1$ does the combined risk equal the sum of the parts; at $\rho = -1$ the risks are a perfect *natural hedge*. With many risks the same idea uses a covariance matrix, whose number of entries grows with the square of the number of risks.
- **Portfolio, not silos:** The CAS's 2003 ERM overview states three principles: portfolio risk is not the simple sum of the individual risks; understanding it needs the individual risks *and* their interactions; and the risk to the whole organization is what matters for its key decisions. Managing risks separately within silos is "inefficient at best, and can be counter-productive". In practice the chief risk officer's role is to integrate the silos, because risks interact: a flood can cause fires, and an earthquake that destroys a supplier can interrupt business far away.
- **Natural hedges:** Some risks offset each other. An insurer that sells both life insurance and annuities to similar customers hedges its mortality risk naturally, since longer lives cost the annuities what they save the life policies, so reinsuring the mortality risk of each product separately would be wasted money. Likewise a group with one division long a currency and another short the same currency does not need two hedges.
- **Concentrations:** Correlation also works the other way. The CAS overview notes that inflation, a driver of claim costs in many business segments, is highly correlated with interest rates, a driver of asset values, and calls capturing such correlations "the essence of ERM". Small risks with high frequency in each department can add up to a severe one in the aggregate, which only a map of all the organization's risks shows ([[Risk Assessment]]).
- **Risk appetite and tolerance:** COSO defines risk appetite as "the amount of risk, on a broad level, an organization is willing to accept in pursuit of value", and risk tolerance as the acceptable level of variation for a specific objective. Because an organization has a portfolio of objectives and a portfolio of risks, appetite has meaning at both levels. COSO's 2017 framework prioritizes risks by severity in the context of risk appetite, has management select responses, and then develop a portfolio view of the total risk assumed.
- **The responses:** The CAS overview lists the responses as avoiding, retaining (and financing), reducing, transferring or exploiting a risk; COSO's 2004 summary lists avoidance, reduction, sharing and acceptance. Insurance has been the main transfer mechanism for hazard risk, capital markets for commodity, interest rate and currency risk, and operational and strategic risks have mostly had to be avoided or retained ([[Risk Treatment]], [[Risk Classifications]]). Exploiting is the response a silo view misses: the overview's steel maker, expecting tariffs on foreign steel, locks in fixed prices with domestic suppliers.
- **Integrated programs:** Treating risks together changes how they are financed. In one CAS case a large retailer built a model of its hazard and financial risks, individually and as an aggregate portfolio, and used it to choose among insurance submissions, set retention levels, plan negotiations, design an overall risk financing strategy and prioritize risk control. In another, a property-casualty insurer paired a more aggressive asset allocation with an integrated reinsurance program, including an integrated stop-loss cover with an investment hedge against the portfolio underperforming its target. The result is one program sized to the combined risk rather than separate purchases by each unit ([[Risk Diversification]]).
- **The actuarial / Exam 9 treatment:** Correlated capital models, economic capital and the ORSA that apply this to an insurer are in [[Enterprise Risk Management]].

> [!example]- Division Limits Versus the Enterprise's Tolerance {Example}
> A manufacturer's two divisions have annual results with standard deviations of \$6 million and \$8 million. Each division head plans to buy extra insurance because each figure is close to the \$9 million limit set for a single division. The board's tolerance for the whole company is a standard deviation of \$10 million. Find the company's standard deviation if the correlation between the divisions is $-0.5$, $0$ or $0.5$, and say what the holistic view implies for each.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \sigma_P(\rho = -0.5) &= \sqrt{36 + 64 + 2(-0.5)(6)(8)} \\
> > &= \sqrt{52} \\
> > &\approx 7.21
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \sigma_P(\rho = 0) &= \sqrt{36 + 64} \\
> > &= 10.00
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \sigma_P(\rho = 0.5) &= \sqrt{36 + 64 + 2(0.5)(6)(8)} \\
> > &= \sqrt{148} \\
> > &\approx 12.17
> > \end{align*}
> > $$
> > The simple sum, \$14 million, is never the company's risk. With $\rho = -0.5$ the divisions partly hedge each other and the company is well inside its \$10 million tolerance, so the extra insurance each head wants buys little for the company. With $\rho = 0$ it sits exactly at its tolerance. With $\rho = 0.5$ the company is \$2.17 million over tolerance even though each division is inside its own limit, so treatment is needed, chosen for the combined position rather than one purchase per division.

> [!example]- A Natural Hedge Between Two Product Lines {Example}
> An insurer writes life insurance and annuities to similar customers. If its customers live longer than expected, the life block gains \$4 million and the annuity block loses \$5 million; if they die sooner than expected, the life block loses \$4 million and the annuity block gains \$5 million. Each product manager proposes reinsuring their block's mortality risk. What is the insurer's net exposure, and how should it treat the risk?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Longer lives: } 4 - 5 &= -1 \\
> > \text{Shorter lives: } -4 + 5 &= +1
> > \end{align*}
> > $$
> > Each block alone faces a swing of \$4 million or \$5 million, but the company's net exposure is only \$1 million either way, because the two blocks' results move in opposite directions. Reinsuring each block separately would pay to remove risk that the portfolio has already offset. The holistic treatment is to retain the hedged part and, if the remaining \$1 million exceeds the company's tolerance, treat only that.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The section on treating risk ends with treating risk holistically. Questions describe several units or risks and ask what a portfolio view changes: why a natural hedge makes separate hedges unnecessary, why units inside their own limits can leave the whole organization over its tolerance, or how risk appetite guides the choice.
> - **Responses:** A question may ask which response, including exploiting a risk, fits a situation once it is seen across the organization.
> - **Short calculations:** Combining two standard deviations with a correlation, and comparing the result with a tolerance.

> [!warning]- Exam traps
> - **Risk does not add up:** Adding the units' risks overstates the total unless they move perfectly together. Use the correlation.
> - **Within every limit is not within appetite:** If the units' results are positively correlated, the organization can exceed its tolerance while no unit exceeds its limit.
> - **Holistic does not mean one technique:** Avoidance, control, retention and transfer are still used. What changes is that each is chosen for its effect on the whole portfolio.
> - **Appetite versus tolerance:** Risk appetite is the broad amount of risk accepted in pursuit of value; risk tolerance is the acceptable variation for a specific objective.
