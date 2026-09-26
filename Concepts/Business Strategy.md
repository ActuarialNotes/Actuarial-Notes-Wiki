---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3579d5edd9f47da964867a08a850877cf8ce161367b5261b1d8dd19c78cc1b56
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Strategy.md
---

**Business Strategy** is the set of choices by which an insurer pursues its goals: which lines, markets and customers to write, how much risk to retain, and how much capital to hold and where to deploy it. **Strategic management** is the process of setting, executing and monitoring those choices. [[Enterprise Risk Management|ERM]] ties risk to strategy by putting every option on a common risk-adjusted footing. In a modelling project, the business goal decides what the model must predict and how its success is judged.

> $$\text{RAROC} = \frac{E[\text{Profit}]}{\text{Risk Capital}}$$

> $$\text{EVA} = E[\text{Profit}] - r_h \times \text{Risk Capital}$$

- **Risk capital** comes from the ERM model through a [[Risk Measure|risk measure]], such as VaR or TVaR at a chosen level ([[Risk Capital]]). $r_h$ is the hurdle rate, the [[Cost of Capital|cost of capital]]. A strategy adds value when RAROC exceeds $r_h$, or equivalently when EVA (economic value added) is positive ([[Risk-Adjusted Performance]]). Ranking by RAROC and by EVA can disagree: the ratio can favour a smaller business, while EVA measures the value actually added.
- **How risk measures and models shape strategy (Exam 9).** The ERM model turns strategic questions into comparable distributions of results. Those questions include capital adequacy, allocating capital to lines and units, reinsurance ([[Reinsurance Strategy]]), asset mix and planned growth. Plotting the alternatives by risk and return traces an **efficient frontier**, and the insurer picks a point on it within its [[Risk Appetite|risk appetite]].
- **The choice of risk measure matters.** Changing the measure, its confidence level or the allocation method changes each unit's capital, and so its measured return and which lines look worth growing.
- **Strategic risk.** The risk of choosing the wrong strategy, or executing it badly, is a risk category in its own right ([[Risk Taxonomies]], [[Business Risk]]).
- **Business goals in a model (PCPA).** The goal sets the target (loss cost, retention, litigation), the unit of analysis and the success metric. The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] names lack of stakeholder alignment on goals and outcomes as one of the most common reasons modelling projects fail or fall behind. Results are reported as business outcomes, such as premium movements, expected loss ratio and retention ([[Actuarial Communication]]).

> [!example]- Choosing a Reinsurance Strategy by EVA {Example}
> The hurdle rate is $12\%$. Expected profit and risk capital (from the ERM model, in \$ millions) under three options are:
>
> - A, no reinsurance: profit $60$, capital $400$
> - B, a 40% quota share: profit $45$, capital $250$
> - C, catastrophe excess of loss: profit $52$, capital $300$
>
> Rank the options by RAROC and by EVA.
>
> > [!answer]-
> > - **RAROC:** A $60/400 = 15.0\%$, B $45/250 = 18.0\%$, C $52/300 = 17.3\%$.
> > - **EVA:** A $60 - 0.12(400) = 12$, B $45 - 0.12(250) = 15$, C $52 - 0.12(300) = 16$.
> >
> > All three clear the hurdle. **B has the best ratio, but C adds the most value**: it gives up less profit to the reinsurer than the quota share while still releasing $\$100$ million of capital. If the choice were made on RAROC alone, the insurer would shrink more than it should.
> >
> > The ranking is only as good as the capital figures. Under a different risk measure or confidence level, the three capital amounts change, and so can the ranking.

> [!example]- Same Data, Different Business Goal {Example}
> A commercial property insurer asks for two models from the same submissions data. Underwriting wants to decide which new submissions get an on-site inspection, and it can inspect 15% of them. Pricing wants new rating relativities. How should the two designs differ?
>
> > [!answer]-
> > - **Target.** Underwriting needs the probability of a large loss, or of a loss ratio above a threshold. Pricing needs the expected pure premium (frequency and severity, or Tweedie) with an exposure [[Offset Variable|offset]].
> > - **Success metric.** Underwriting needs the share of large losses captured in the top 15% of scores, because that is the inspection budget. Pricing needs lift over the current plan: quantile plots, a double lift chart and a loss ratio chart.
> > - **Constraints.** The underwriting model may use any submission information available when the decision is made, subject to underwriting rules. Pricing variables must be permissible, filable and programmable.
> > - **The message to the business.** For underwriting: *"inspecting the top 15% finds about X% of the large losses."* For pricing: which customers' premiums move, by how much, and the expected change in loss ratio.
> >
> > A single model built without settling these questions would serve neither goal well.
