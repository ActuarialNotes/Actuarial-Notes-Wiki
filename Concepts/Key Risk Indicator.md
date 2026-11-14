---
aliases:
  - Monitoring Mechanism
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:11efe4dfbdb5716bf4846ac8c81e41e6e0caced4f6563fb8faf76ba48fb00276
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Key Risk Indicator.md
---

A **Key Risk Indicator** (KRI) is a metric, measured regularly, that tracks the level of a risk or a change in its drivers and is compared with thresholds tied to the organisation's [[Risk Appetite|risk appetite]], so that management is warned while there is still time to act. KRIs are the usual monitoring mechanism in [[Enterprise Risk Management|ERM]], both for established risks and for [[Emerging Risk|emerging risks]] that cannot yet be measured directly.

For an indicator with value $x_t$ in period $t$, where high values are bad, the indicator's status is

> $$\text{Status}_t = \begin{cases} \text{Green}, & x_t < A \\ \text{Amber}, & A \le x_t < R \\ \text{Red}, & x_t \ge R \end{cases}$$

- $A$ is the amber, or early-warning, threshold.
- $R$ is the red threshold.

For an indicator where low values are bad, such as a solvency ratio, the inequalities reverse. Each threshold carries a pre-agreed action and an owner.

> [!trap] Triggers on the wrong side for a falling indicator
> For an indicator where falling values are bad, such as a capital ratio or a liquidity coverage ratio, the triggers sit below the normal range. Applying the upper-tail thresholds to such an indicator flags the wrong periods.

## Calibrating thresholds from history

When thresholds are calibrated statistically, the amber threshold is

> $$A = \bar{x} + 2s$$

- $\bar{x}$ is the mean of the indicator over a period judged normal.
- $s$ is the standard deviation of the indicator over that period.

The red threshold is

> $$R = \bar{x} + 3s$$

The multipliers 2 and 3 are choices that management owns.

Thresholds can also come from percentiles of past values, or from benchmarks and expert judgment where data is thin. They are recalibrated when the business or the appetite changes. A threshold drawn from a quiet period or an old book can be too tight after the business grows or its mix changes, which turns the dashboard red for no reason, or too loose.

> [!example]- Which of these quarters breach the lapse-rate KRI's triggers? {Example}
> A life insurer monitors the quarterly [[Lapse|lapse]] rate on a block of universal life policies. Over eight quarters judged normal the rates were 2.1%, 2.4%, 1.9%, 2.2%, 2.0%, 2.3%, 2.5% and 2.0%. The amber trigger is the mean plus two sample standard deviations, and the red trigger is the mean plus three. The next four quarters show 2.3%, 2.7%, 2.9% and 2.5%.
>
> > [!answer]-
> > - The eight rates sum to 17.4%, so $\bar{x} = 17.4/8 = 2.175\%$.
> > - Their sample standard deviation is $s = 0.212\%$.
> > - The amber trigger is $A = 2.175 + 2(0.212) = 2.60\%$.
> > - The red trigger is $R = 2.175 + 3(0.212) = 2.81\%$.
> > - The first quarter, at 2.3%, is green.
> > - The second, at 2.7%, is amber, which should prompt the owner to investigate the cause, such as a competitor's new product or a crediting-rate change.
> > - The third, at 2.9%, is red and escalates to the risk committee with its agreed action.
> > - The fourth, at 2.5%, is back to green, but the dashboard should still show the run of high quarters, since one green reading after a red one doesn't mean the cause has gone.

## Calibrating thresholds from the risk appetite

The red threshold is set at or inside the risk tolerance implied by the risk appetite statement, so that a red reading means the organisation is about to breach, or has breached, a limit the board approved. The amber threshold sits inside it to give time for a response. To set them, the tolerated loss is translated into the indicator's units.

> [!example]- What are the red and amber thresholds for this block's annual lapse rate? {Example}
> The insurer in the example above prices the block on an annual lapse rate of 8%. Each percentage point of annual lapses above 8% reduces surplus by $\$15$ million, and the board's appetite statement tolerates a lapse-driven loss of at most $\$45$ million. Management wants the amber trigger where three-quarters of that tolerance is used up.
>
> > [!answer]-
> > - The tolerance is $45/15 = 3$ percentage points of lapse rate.
> > - The red threshold is $8 + 3 = 11.0\%$.
> > - The amber threshold is $8 + 0.75 \times 3 = 10.25\%$.
> > - A red reading now means the appetite limit has been reached, which ties the indicator directly to the board's statement.
> > - The historical trigger from the first example, about 10.4% a year at four times the quarterly 2.60%, sits close to this one. The insurer would investigate if the two calibrations disagreed widely.

## Leading and lagging indicators

A leading indicator moves before losses occur. Examples are the number of customer complaints before a rise in lapses, staff turnover in a claims unit before an increase in claim errors, and overdue system patches before a cyber incident. A lagging indicator, such as an operational loss total, confirms what has already happened. A good KRI set mixes both, and leans on leading indicators for risks that develop fast. A set with only lagging indicators cannot give the early warning that the monitoring mechanism exists for.

## Qualities of a useful KRI

A useful KRI is:

1. Measurable.
2. Available on time.
3. Comparable over periods.
4. Owned by someone who can act on it.
5. Clearly linked to a risk in the [[Risk Taxonomies|risk taxonomy]].

Indicators that nobody acts on, or that stay green for years, add noise rather than information.

A key performance indicator (KPI) measures progress toward an objective, such as new business volume, while a KRI measures exposure to a risk. The same metric can be both, but a KRI needs thresholds tied to the appetite and an escalation path.

## Reporting

KRIs are reported on a dashboard with their trend and status, escalating from the risk owner to the risk committee and the board as the colour changes. Trends matter as well as levels, so a dashboard often flags several consecutive moves in the wrong direction even while the indicator is still green.

## KRIs for emerging risks

An emerging risk usually has no loss data, so its KRIs track drivers instead: litigation filings for a new liability theory, the share of business underwritten by an untested model, or a scientific measure behind a [[Climate Risk|climate risk]]. Crossing a threshold triggers a reassessment of the risk rather than a fixed action.
