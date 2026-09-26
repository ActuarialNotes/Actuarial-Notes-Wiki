---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a163703b50ccf551cb02ce2037ee90fd0e6809060142df148ecf0de27551503e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Modeling.md
---

**Risk Modeling** is the construction of a stochastic model of an organisation's material risks and their dependencies — for an insurer, an **internal risk model** (IRM), also called a dynamic financial analysis model — that simulates the distribution of its results, so that [[Risk Measure|risk measures]] can be computed and strategies compared on one basis.

> $$S_1^{(i)} = S_0 + P - L^{(i)} - X + I^{(i)}$$

> $$\widehat{\text{TVaR}}_{\alpha} = \frac{1}{m}\sum_{j=1}^{m} Y_{(n+1-j)}$$

- In scenario $i$ of $n$, year-end surplus $S_1^{(i)}$ is opening surplus $S_0$ plus premium $P$, less simulated losses $L^{(i)}$ and expenses $X$, plus the simulated investment result $I^{(i)}$. $Y_{(1)} \leq \cdots \leq Y_{(n)}$ are the simulated losses (or surplus declines) in order, and TVaR at level $\alpha$ averages the worst $m = n(1 - \alpha)$ of them.
- **Brehm's components:** underwriting risk (frequency and severity, pricing risk, [[Parameter Risk|parameter risk]], catastrophe risk), reserve risk, asset risk from an economic scenario generator, and — what makes the model realistic — **dependencies**: common drivers such as inflation acting on claims and asset values together, catastrophes crossing lines, the cycle moving lines together, and tail dependence. Without them the enterprise looks unrealistically stable.
- **Selecting models for diverse risks.** Each category needs a model suited to its nature, data and materiality — see [[Risk Taxonomies]] for the mapping and [[Model Selection]] for the statistical criteria. Parsimony matters: a model management cannot follow will not be used, and every added parameter adds estimation error and [[Model Risk|model risk]].
- **The effect on strategic management.** An IRM answers strategic questions: how much capital a target rating or ruin probability requires, how to allocate it ([[Risk Capital]]), which reinsurance programme or asset mix sits on the **efficient frontier** of return against risk, and whether the business plan fits [[Risk Appetite|appetite]]. Brehm stresses integration — the model should sit in the planning and reinsurance-buying calendar, not be run once for a report.
- **The choice of risk measure is itself strategic.** VaR reads one quantile; TVaR averages the tail beyond it; they can rank the same strategies differently. Brehm recommends looking at several metrics rather than one.

> [!example]- VaR and TVaR Pick Different Growth Plans {Example}
> An insurer's model gives next year's net loss (in $\$$M) under two growth plans with the same premium.
>
> - Plan A (grow coastal property): $10$ with probability $90\%$, $40$ with $8\%$, $200$ with $2\%$.
> - Plan B (grow commercial liability): $12$ with probability $90\%$, $60$ with $9\%$, $100$ with $1\%$.
>
> Compare the mean, $\text{VaR}_{95\%}$ and $\text{TVaR}_{95\%}$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L_A] &= 9 + 3.2 + 4 \\
> > &= 16.2 \\
> > E[L_B] &= 10.8 + 5.4 + 1 \\
> > &= 17.2
> > \end{align*}
> > $$
> >
> > The $95$th percentile is where the cumulative probability first reaches $95\%$: $\text{VaR}_A = 40$ (cumulative $98\%$) and $\text{VaR}_B = 60$ (cumulative $99\%$). TVaR averages the worst $5\%$:
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_A &= \frac{0.02(200) + 0.03(40)}{0.05} \\
> > &= 104 \\
> > \text{TVaR}_B &= \frac{0.01(100) + 0.04(60)}{0.05} \\
> > &= 68
> > \end{align*}
> > $$
> >
> > On the mean and on VaR, plan A looks better; on TVaR, plan B is far safer. VaR does not see A's $2\%$ chance of a $200$ loss at all. A board whose appetite is written in VaR will choose A, one whose appetite is written in TVaR will choose B — the risk measure has made the strategic decision.

> [!example]- Ignoring Dependence Understates Capital {Example}
> Two lines each lose $50$ with probability $90\%$ and $150$ with probability $10\%$. Find $\text{TVaR}_{95\%}$ and capital $= \text{TVaR}_{95\%} - E[L]$ for the combined book (a) assuming independence, (b) if a common inflation driver makes both lines bad together $5\%$ of the time.
>
> > [!answer]-
> > Either way $E[L] = 2(0.9 \times 50 + 0.1 \times 150) = 120$.
> >
> > **(a) Independent:** $100$ with $81\%$, $200$ with $18\%$, $300$ with $1\%$.
> >
> > $$
> > \begin{align*}
> > \text{TVaR}_{95\%} &= \frac{0.01(300) + 0.04(200)}{0.05} \\
> > &= 220
> > \end{align*}
> > $$
> >
> > Capital $= 220 - 120 = 100$.
> >
> > **(b) Common driver:** both bad $5\%$ (loss $300$), exactly one bad $2(10\% - 5\%) = 10\%$ (loss $200$), neither $85\%$ (loss $100$). The worst $5\%$ is all $300$, so $\text{TVaR}_{95\%} = 300$ and capital $= 180$.
> >
> > Same marginal distributions, same mean — but the independent model understates capital by $80$, or $44\%$. The implied correlation between the lines' bad years is only $(0.05 - 0.01)/(0.1 \times 0.9) = 0.44$.
