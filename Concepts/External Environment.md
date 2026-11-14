---
aliases:
  - Business Environment
  - Market Opportunity
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fa5c60330f1aa8f3e4efccc994960ad215f0acc5c4cd0bd538741a2732b6257b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Environment.md
---

The **External Environment** is everything outside an organization that shapes what it can achieve and that it cannot directly control. Scanning it turns its forces into **opportunities**, conditions that would help the organization reach its objectives, and **threats**, conditions that would hinder it.

Hitt, Ireland and Hoskisson divide the external environment into three levels:

1. **The general environment**: the broad segments a firm cannot change, which are demographic, economic, political/legal, sociocultural, technological, global and the sustainable physical environment. A PESTEL scan covers much the same ground under the headings political, economic, social, technological, environmental and legal.
2. **The industry environment**: the group of firms making close substitutes, whose structure [[Porter's Five Forces]] summarize. Entry barriers, buyer and supplier power, substitutes and rivalry set the profit an average firm can earn.
3. **The competitor environment**: the particular rivals the firm faces. Competitor analysis asks what drives a rival (its future objectives), what it is doing (current strategy), what it believes about the industry (assumptions) and what it can do (capabilities). It feeds into predicting [[Competitive Dynamics|competitive dynamics]].

The general environment's segments act on the firm through the industry. A new regulation matters because it raises an entry barrier or a cost.

> [!example]- A life insurer's underwriting system is outdated, and a new insurtech is entering its simplified-issue term market. Which is a threat? {Example}
> - The outdated system is inside the firm, so it is a weakness, not a threat.
> - The insurtech is a competitor entering from outside, so it is a threat from the competitor environment.
> - Its entry acts through the industry as a new entrant, one of the five forces.

## The analysis process

Hitt describes four activities:

1. **Scanning** for early signals of change.
2. **Monitoring** the trends that matter.
3. **Forecasting** where they lead.
4. **Assessing** their timing and importance for the firm.

The results pair with the internal analysis of resources and capabilities in a [[SWOT Analysis|SWOT analysis]]. One factor can be both an opportunity and a threat. An ageing population is an opportunity for an annuity writer and a threat to a term-life book that depends on young buyers. The sign of the impact belongs to the firm, not to the trend.

## Scoring opportunities and threats

A scan can score each factor by its probability and its impact. The score of factor $i$ is

> $$S_i = p_i \times I_i$$

- $p_i$ is the probability that factor $i$ develops over the planning horizon.
- $I_i$ is its signed impact on a measure tied to the objective, such as operating income.

A positive $S_i$ marks an opportunity and a negative one a threat. The net expected effect of the environment is

> $$N = \sum_i S_i$$

> [!example]- What is the net expected effect of this insurer's environment, and which factors matter most? {Example}
> A life and annuity insurer scans its market over three years. For each factor it estimates the probability $p_i$ and the impact $I_i$ on cumulative operating income, in millions:
>
> | Segment | Factor | $p_i$ | $I_i$ |
> |:---|:---|---:|---:|
> | Demographic | Retirees buy more annuities | 0.90 | +12 |
> | Economic | Rates fall 100 bp, compressing spreads | 0.30 | -20 |
> | Political/legal | New conduct rules raise compliance costs | 0.50 | -4 |
> | Sociocultural | Buyers move to digital purchase | 0.70 | +5 |
> | Technological | An insurtech enters simplified-issue term | 0.40 | -10 |
> | Global | Reinsurance capacity tightens | 0.20 | -6 |
> | Physical | A pandemic raises mortality | 0.05 | -40 |
>
> > [!answer]-
> > - The scores $p_i I_i$ are 10.8, -6.0, -2.0, 3.5, -4.0, -1.2 and -2.0.
> > - The opportunities sum to $10.8 + 3.5 = 14.3$.
> > - The threats sum to $-6.0 - 2.0 - 4.0 - 1.2 - 2.0 = -15.2$.
> > - The net expected effect is $N = 14.3 - 15.2 = -0.9$, close to zero.
> > - The largest scores are annuity demand (10.8), falling rates (-6.0) and the insurtech (-4.0), so the insurer should build annuity capacity, hedge its spread exposure and answer the entrant with its own digital channel.
> > - The pandemic scores low only because it is unlikely. At $\$40$ million it is the largest single impact, so it belongs in [[Stress Testing|stress testing]].

## Impact on objectives

For [[Enterprise Risk Management|ERM]], the external environment is a source of risk to the business plan. Interest rates, [[Inflation|inflation]], regulation, [[Climate Risk|climate]], technology and new entrants such as [[Insurtech|insurtechs]] can each move earnings, capital or growth away from target. These threats are a large part of an insurer's strategic risk. They are identified alongside internal risks in [[Risk Identification|risk identification]] and watched through [[Key Risk Indicator|key risk indicators]].

> [!example]- How likely is the board to meet its ROE objective under these scenarios? {Example}
> The board's objective is a return on equity of at least 10% next year. The plan produces 12% in the base case (probability 0.60), 8% if interest rates fall sharply (0.25) and 3% in a recession with credit losses (0.15).
>
> > [!answer]-
> > - The expected ROE is $0.60(12\%) + 0.25(8\%) + 0.15(3\%) = 9.65\%$, below the target.
> > - The objective is met only in the base case, so the probability of meeting it is 0.60.
> > - The external environment is a material strategic risk to the plan.
> > - Management can reduce rate sensitivity through asset-liability matching, set the target with the scenarios in view, or report the 40% chance of a miss against the [[Risk Appetite|risk appetite]].

> [!trap] Ranking by expected value alone
> Multiplying probability by impact hides severe, unlikely events. A low-probability catastrophe can be the factor that threatens solvency, so stress test it rather than ranking it last.
