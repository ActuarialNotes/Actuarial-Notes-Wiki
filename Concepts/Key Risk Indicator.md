---
aliases:
  - Monitoring Mechanism
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b070827a75838ee0b82ed981a5a6be07914d3dc4aa8d6d910f2ad88fd890965b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Key Risk Indicator.md
---
**A key risk indicator** (KRI) is a metric, measured regularly, that tracks the level of a risk or a change in its drivers and is compared with thresholds tied to the organisation's [[Risk Appetite|risk appetite]], so that management is warned while there is still time to act. KRIs are the usual monitoring mechanism in [[Enterprise Risk Management|ERM]], both for established risks and for [[Emerging Risk|emerging risks]] that cannot yet be measured directly.

> $$\text{Status}_t = \begin{cases} \text{Green}, & x_t < A \\ \text{Amber}, & A \le x_t < R \\ \text{Red}, & x_t \ge R \end{cases}$$

> $$A = \bar{x} + 2s$$

> $$R = \bar{x} + 3s$$

- **Symbols:** $x_t$ is the indicator's value in period $t$, $A$ is the amber (early-warning) threshold and $R$ is the red threshold. When thresholds are calibrated statistically, $\bar{x}$ and $s$ are the mean and standard deviation of the indicator over a period judged normal, and the multipliers 2 and 3 are choices that management owns. For an indicator where low values are bad, such as a solvency ratio, the inequalities reverse.
- **Leading and lagging indicators:** A leading indicator moves before losses occur, such as the number of customer complaints before a rise in lapses, staff turnover in a claims unit before an increase in claim errors, or overdue system patches before a cyber incident. A lagging indicator, such as an operational loss total, confirms what has already happened. A good KRI set mixes both, and leans on leading indicators for risks that develop fast.
- **Link to appetite:** The red threshold is set at or inside the risk tolerance implied by the risk appetite statement, so that a red reading means the organisation is about to breach, or has breached, a limit the board approved. The amber threshold sits inside it to give time for a response, and each threshold carries a pre-agreed action and an owner.
- **Calibration:** Thresholds can come from history (a number of standard deviations, or percentiles of past values), from the appetite itself by translating a tolerated loss into the indicator's units, or from benchmarks and expert judgment where data is thin. They are recalibrated when the business changes, since a threshold drawn from an old book can be too loose or too tight for the new one.
- **Design qualities:** A useful KRI is measurable, available on time, comparable over periods, owned by someone who can act on it, and clearly linked to a risk in the [[Risk Taxonomies|risk taxonomy]]. Indicators that nobody acts on, or that stay green for years, add noise rather than information.
- **Reporting:** KRIs are reported on a dashboard with their trend and status, escalating from the risk owner to the risk committee and the board as the colour changes. Trends matter as well as levels, so a dashboard often flags several consecutive moves in the wrong direction even while the indicator is still green.
- **For emerging risks:** An emerging risk usually has no loss data, so its KRIs track drivers instead: litigation filings for a new liability theory, the share of business underwritten by an untested model, or a scientific measure behind a [[Climate Risk|climate risk]]. Crossing a threshold triggers a reassessment of the risk rather than a fixed action.

> [!example]- Calibrating Triggers for a Quarterly Lapse-Rate KRI {Example}
> A life insurer monitors the quarterly [[Lapse|lapse]] rate on a block of universal life policies. Over eight quarters judged normal the rates were 2.1%, 2.4%, 1.9%, 2.2%, 2.0%, 2.3%, 2.5% and 2.0%. Set the amber trigger at the mean plus two standard deviations and the red trigger at the mean plus three, using the sample standard deviation. The next four quarters show 2.3%, 2.7%, 2.9% and 2.5%. Which quarters breach?
>
> > [!answer]-
> > The eight rates sum to 17.4%, and their sample standard deviation is 0.212%.
> > $$
> > \begin{align*}
> > \bar{x} &= 17.4 / 8 \\
> > &= 2.175 \\
> > A &= 2.175 + 2(0.212) \\
> > &= 2.60 \\
> > R &= 2.175 + 3(0.212) \\
> > &= 2.81
> > \end{align*}
> > $$
> > The first quarter, at 2.3%, is green. The second, at 2.7%, is amber, which should prompt the owner to investigate the cause, such as a competitor's new product or a crediting-rate change. The third, at 2.9%, is red and escalates to the risk committee with its agreed action. The fourth, at 2.5%, is back to green, but the dashboard should still show the run of high quarters, since one green reading after a red one doesn't mean the cause has gone.

> [!example]- Setting the Red Threshold from the Risk Appetite {Example}
> The same insurer prices the block on an annual lapse rate of 8%. Its actuaries estimate that each percentage point of annual lapses above 8% reduces surplus by \$15 million, and the board's appetite statement tolerates a lapse-driven loss of at most \$45 million. Management wants the amber trigger where three-quarters of that tolerance is used up. Find the red and amber thresholds for the annual lapse rate.
>
> > [!answer]-
> > The tolerance converts into percentage points of lapse rate at \$15 million each.
> > $$
> > \begin{align*}
> > R &= 8 + \frac{45}{15} \\
> > &= 11.0\% \\
> > A &= 8 + 0.75 \times \frac{45}{15} \\
> > &= 10.25\%
> > \end{align*}
> > $$
> > A red reading now means the appetite limit has been reached, which ties the indicator directly to the board's statement. In practice the insurer would check that the historical trigger from the first example, about 10.4% a year at four times the quarterly 2.60%, sits close to this one, and would investigate if the two calibrations disagreed widely.

> [!tip]- How it appears on the exam
> - **CFE-101:** Questions ask candidates to determine an appropriate monitoring mechanism for an emerging risk described in a case study. A full answer names leading and lagging KRIs, says how their thresholds would be calibrated and tied to risk appetite, and describes who receives the report and what happens on a breach.
> - **Numbers:** A calculation may give a history of an indicator and ask for amber and red triggers, or for the quarter that first breaches. Another version gives a tolerance in dollars and asks candidates to translate it into the indicator's units.
> - **Critique:** Candidates may be asked to critique a KRI dashboard, spotting lagging-only indicators, thresholds unrelated to appetite, or indicators with no owner.

> [!warning]- Exam traps
> - **KRI versus KPI:** A key performance indicator measures progress toward an objective, such as new business volume, while a KRI measures exposure to a risk. The same metric can be both, but a KRI needs thresholds tied to the appetite and an escalation path.
> - **Lagging-only sets:** Loss totals and incident counts only report damage already done. A set with no leading indicators cannot give the early warning that the monitoring mechanism exists for.
> - **Direction of the inequality:** For an indicator where falling values are bad, such as a capital ratio or a liquidity coverage ratio, the triggers sit below the normal range. Applying the upper-tail formula to such an indicator flags the wrong quarters.
> - **Stale calibration:** Thresholds based on a quiet period are too tight after the business grows or its mix changes, and they turn the dashboard red for no reason. Thresholds should be reviewed whenever the business or the appetite changes.
