---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:50118a5798a3e4129dfdcbefe9d13b952ba4efca97cb2fb4edd5bc90acc90cf1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Communication.md
---

**Actuarial Communication** is any written, electronic or oral communication an actuary issues about actuarial services, from a model's technical documentation to a two-minute verbal summary for an executive. In the U.S. it is governed by ASOP No. 41, *Actuarial Communications*. Form, content and language must suit the **intended users**, and anything meant to be relied on must be documented well enough for another qualified actuary to appraise it.

> $$
> \begin{aligned}
> \text{Actuarial Report} &\subseteq \text{Actuarial Documents} \\
> &\subset \text{Actuarial Communications}
> \end{aligned}
> $$

> $$\%\ \text{change in mean} = e^{\hat{\beta}} - 1$$

- **ASOP No. 41's terms.**
  - An *actuarial document* is a communication in recorded form, such as a report, e-mail, spreadsheet or presentation. An oral communication is a communication but not a document.
  - The *actuarial report* is the set of documents the actuary identifies as relevant to specific findings and available to an intended user.
  - A report is required when findings are meant to be relied on. It must identify the methods, procedures, assumptions and data clearly enough that another actuary qualified in the same practice area could make an objective appraisal of the work.
  - Required disclosures include uncertainty or risk, reliance on others for data ([[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]]), who is responsible for each material assumption and method, and the information date.
  - For model work, [[ASOP 56 - Modeling (ASB - 2019)|ASOP No. 56]] adds its own requirements. See also [[Actuarial Report]].
- **The second formula** is the translation a non-technical audience needs most. A log-link coefficient $\hat{\beta}$ means a $100(e^{\hat{\beta}} - 1)\%$ change in the expected outcome, other variables held fixed.
- **Technical audience (PCPA).** Document the methodology: data and adjustments, target, distribution and [[Link Function|link]], offsets, validation design. Record each modelling decision with its reason and the alternatives rejected ([[Variable Selection]]). Interpret the output: [[Parameter Estimate Tables|coefficients]], significance and diagnostics. State the limitations, and keep the work reproducible.
- **Non-technical audience (PCPA).** Lead with the answer and what it means for the business, in the audience's units (dollars, loss-ratio points, share of customers affected), not deviance. Use one clear visual per message ([[Data Visualization]], [[Storytelling with Data (Knaflic - 2015)|Knaflic]]) and no misleading scales ([[How Charts Lie (Cairo - 2020)|Cairo]]). State uncertainty plainly. Exhibits such as the [[Quantile Plot|quantile plot]], the [[Double Lift Chart|double lift chart]] and the loss ratio chart are used because they read without a modelling background.
- ASOP No. 41 was last revised in 2010, and a further revision has since been exposed for comment. Related: [[Reserve Communication]], [[Stakeholder Reporting]], [[Materiality]].

> [!example]- Translating GLM Output for an Executive {Example}
> A frequency GLM (log link) reports a coefficient of $0.262$ ($\mathrm{SE} = 0.031$) for "at-fault claim in the prior three years" and $0.018$ per $1{,}000$ miles of annual mileage. Rewrite these for a VP of personal lines.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > e^{0.262} - 1 &= 0.300 \\
> > e^{0.018 \times 10} - 1 &= 0.197
> > \end{align*}
> > $$
> >
> > The 95% interval for the first coefficient is $0.262 \pm 1.96(0.031)$, which is $[0.201, 0.323]$, or $+22\%$ to $+38\%$ after exponentiating.
> >
> > *"Drivers with an at-fault claim in the last three years are expected to have about **30% more claims** than otherwise similar drivers. The effect is well established, somewhere between about 22% and 38%. Each extra 10,000 miles driven a year adds roughly **20%**."*
> >
> > The coefficients, the log scale and the standard error are gone. What is left is a size, a direction, a unit the reader uses, and an honest range.

> [!example]- Reviewing a Draft Model Report {Example}
> A draft pricing-model report reads, in full: *"We fitted a Tweedie GLM ($p = 1.6$) to the pricing department's data. The Gini index improved from $0.21$ to $0.29$. We recommend implementation."* The data run through 30 June 2025, and marketing required that one variable be excluded. What is missing?
>
> > [!answer]-
> > Measured against ASOP No. 41, it is missing:
> >
> > - **The responsible actuary**, and whether they are available for questions.
> > - **Enough to appraise the work**: the target and exposure, the variables and how they were selected, why $p = 1.6$, and whether the Gini was measured on **holdout** data. On training data the improvement is not evidence.
> > - **Reliance on others for data**: the data came from another department, so the report should say so and state what reasonableness checks were done.
> > - **Responsibility for assumptions**: excluding the variable was marketing's choice, not the actuary's, and that should be disclosed.
> > - **The information date** (30 June 2025), and the **uncertainty**: how stable the lift is and what the model cannot see.
> >
> > For the business audience, it also needs the consequence: which customers' premiums rise or fall, by how much, and the expected change in loss ratio.
