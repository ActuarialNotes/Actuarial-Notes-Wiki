---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ad3efaf5a9bd078d2b38a6287a159dfb56956ca4583c97e1d9c8542b18a30850
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Communication.md
---

**Actuarial Communication** is any written, electronic or oral communication an actuary issues about actuarial services, from a model's technical documentation to a two-minute verbal summary for an executive. In the U.S. it is governed by [[ASOP 41 - Actuarial Communications|ASOP No. 41]], *Actuarial Communications*, and its form, content and language must suit the **intended users**.

ASOP No. 41 nests its terms:

1. An *actuarial communication* is any communication about actuarial services, written, electronic or oral.
   1. An *actuarial document* is a communication in recorded form, such as a report, e-mail, spreadsheet or presentation. An oral communication is a communication but not a document.
      1. The *[[Actuarial Report|actuarial report]]* is the set of documents the actuary identifies as relevant to specific findings and available to an intended user.

## The actuarial report

A report is required when findings are meant to be relied on. It must identify the methods, procedures, assumptions and data clearly enough that another actuary qualified in the same practice area could make an objective appraisal of the work. Its required disclosures include:

- uncertainty or risk,
- reliance on others for data ([[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]]),
- who is responsible for each material assumption and method, and
- the information date.

For model work, [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] adds its own requirements.

> [!example]- What is missing from this draft pricing-model report? {Example}
> The draft reads, in full: *"We fitted a Tweedie GLM ($p = 1.6$) to the pricing department's data. The Gini index improved from $0.21$ to $0.29$. We recommend implementation."* The data run through 30 June 2025, and marketing required that one variable be excluded.
>
> > [!answer]-
> > - The responsible actuary is not named, nor whether they are available for questions.
> > - There is not enough to appraise the work: the target and exposure, the variables and how they were selected, why $p = 1.6$, and whether the Gini was measured on [[Holdout Sample|holdout]] data. On training data the improvement is not evidence.
> > - The data came from another department, so the report should disclose the reliance and the reasonableness checks done.
> > - Excluding the variable was marketing's choice, not the actuary's, and that should be disclosed.
> > - The information date (30 June 2025) and the uncertainty (how stable the lift is and what the model cannot see) are missing.
> > - For the business audience, it also needs the consequence: which customers' premiums rise or fall, by how much, and the expected change in loss ratio.

## Communicating to a technical audience

A technical report documents the methodology: data and adjustments, target, distribution and [[Link Function|link]], offsets and validation design. It records each modelling decision with its reason and the alternatives rejected ([[Variable Selection|variable selection]]). It interprets the output ([[Parameter Estimate Tables|coefficients]], significance and diagnostics), states the limitations, and keeps the work reproducible.

## Communicating to a non-technical audience

A business report leads with the answer and what it means for the business, in the audience's units (dollars, loss-ratio points, share of customers affected), not deviance. It uses one clear visual per message ([[Data Visualization|data visualization]]) with no misleading scales, and it states uncertainty plainly. Exhibits such as the [[Quantile Plot|quantile plot]], the [[Double Lift Chart|double lift chart]] and the loss ratio chart are used because they read without a modelling background.

The translation a non-technical audience needs most is a log-link coefficient's effect. A coefficient $\hat{\beta}$ in a log-link model changes the expected outcome, other variables held fixed, by

> $$\%\ \text{change in mean} = e^{\hat{\beta}} - 1$$

> [!example]- How should these GLM coefficients be stated for a VP of personal lines? {Example}
> A log-link frequency GLM gives a coefficient of $0.262$ ($\mathrm{SE} = 0.031$) for an at-fault claim in the prior three years, and $0.018$ per $1{,}000$ miles of annual mileage.
>
> > [!answer]-
> > - An at-fault claim changes expected frequency by $e^{0.262} - 1 = 0.300$, about $+30\%$.
> > - The 95% interval for the coefficient is $0.262 \pm 1.96 \times 0.031 = [0.201, 0.323]$, which is $+22\%$ to $+38\%$ after exponentiating.
> > - Ten thousand extra miles a year changes it by $e^{0.018 \times 10} - 1 = 0.197$, about $+20\%$.
> > - The statement: *"Drivers with an at-fault claim in the last three years are expected to have about 30% more claims than otherwise similar drivers, somewhere between about 22% and 38%. Each extra 10,000 miles driven a year adds roughly 20%."*

> [!trap] Reading a log-link coefficient as the percentage change
> A coefficient of $0.262$ is not a $26.2\%$ change. The change is $e^{0.262} - 1 = 30.0\%$, and the gap widens as the coefficient grows.
