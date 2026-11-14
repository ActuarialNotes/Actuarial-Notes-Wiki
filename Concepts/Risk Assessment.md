---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:2ecaed5ce1e9437d2e72c5276c7ec11d5509623fb4a3eb4e97a5f90aa233f83b
  sources:
    - "NIST SP 800-30 Rev. 1, Guide for Conducting Risk Assessments (2012), §2.3.1 pp.11-14 (risk as a function of likelihood and impact; qualitative and semi-quantitative scales), sha256:f214087f0bdb35932a28c16eb93932a33c67a6edfb5e6f1638866bd201c98e04 — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-30r1.pdf"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), p.114 (PDF p.16) risk map, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s06-02 probability measures, sha256:2cd18f66c1d1d9bc8162fb93bce73ddf75b766f3363ac06e3ec20e165d473773 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s06-02-measures-of-risk-putting-it-to.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-02 risk map on a severity and frequency grid, sha256:dec6416a8007b65db78c8e3f276df42752fe416836dc8624db763169180cc31c — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-02-beginning-steps-communication-.html"
    - "OSHA, Incident [Accident] Investigations: A Guide for Employers (Dec 2015), pp.1-4 (root causes, close calls), sha256:828756cf17298e2da0eac2235d32c10a5c98973b55cd54a84e6ffcf4acbbe659 — https://www.osha.gov/sites/default/files/IncInvGuide4Empl_Dec2015.pdf"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 p.53 Exhibit 3.2, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Risk Assessment.md
---
**Risk Assessment** is the step of [[Risk Management|risk management]] that measures the risks found by [[Risk Identification|risk identification]], estimating how likely each is and how large its effect would be, so they can be ranked and treated in order of importance. In ISO 31000 the term is broader and covers identification, analysis and evaluation together.

Its tools are:

1. Likelihood and impact scoring.
2. Risk maps.
3. Probability analysis.
4. Trend analysis.
5. Root cause analysis.

Qualitative ratings let an organization rank risks with no data, such as strategic and reputational ones, and quantitative tools refine the rankings where data exist. The results are compared with the organization's [[Risk Appetite|risk appetite]] to decide which risks need [[Risk Control|risk control]], [[Risk Transfer|transfer]] or no action.

## Likelihood and impact scoring

Each risk is given a likelihood rating $\ell$ and an impact rating $m$, each usually on a scale of 1 to 5. The two are rated separately because they lead to different treatment. Impact can be rated in money, or in effects on safety, reputation and objectives that have no price, which is why ordinal scales are common. The risk score is

> $$S = \ell \times m$$

A score is a way to rank risks, not a measure of expected loss, since the scales are not proportional to probabilities or dollars.

## Risk maps

A risk map, or heat map, plots each risk by likelihood on one axis and impact on the other, with zones that mark which risks need action first. The map shows what a single score hides. Two risks with the same score can be a frequent small risk and a rare severe one, and they call for retention and control in the first case and transfer in the second. The treatment depends on where each sits on the map, not on the product alone.

> [!example]- How do these risks rank by score, and what does the map show that the scores do not? {Example}
> A distributor rates five risks on scales of 1 to 5, with illustrative ratings:
>
> | Risk | Likelihood | Impact |
> | :--- | ---: | ---: |
> | Warehouse fire | 2 | 5 |
> | Delivery vehicle accidents | 4 | 2 |
> | Data breach | 3 | 4 |
> | Loss of the largest customer | 2 | 4 |
> | Minor employee injuries | 5 | 1 |
>
> > [!answer]-
> > - The scores are 12 for the breach, 10 for the fire, 8 for vehicle accidents, 8 for the customer and 5 for injuries.
> > - The data breach ranks first and the fire second.
> > - Vehicle accidents and the loss of the largest customer tie at 8, but they sit in different corners of the map.
> > - Vehicle accidents are frequent and modest, so they suit retention and loss prevention such as driver training.
> > - Losing the customer is rare and severe, and it is a strategic risk that insurance does not cover, so it calls for diversifying the customer base.
> > - The fire, with the highest impact, is the one to transfer, even though it scores below the breach.

## Probability analysis

Where data exist, a risk is described by a probability distribution of outcomes rather than a rating ([[Probability Distributions]]). An empirical distribution comes from the organization's own loss history and a theoretical one from a fitted model. The [[Expected Value|expected value]] measures the central tendency, and the [[Standard Deviation|standard deviation]] measures how far outcomes may stray from it. The [[Expected Loss|expected loss]] for a period is

> $$E[L] = E[N] \times E[X]$$

- $E[N]$ is the expected number of losses, the [[Frequency|frequency]].
- $E[X]$ is the expected size of each loss, the [[Severity|severity]].

## Trend analysis

Losses are examined over time for patterns in frequency and severity, after adjusting for changes in exposure and for inflation ([[Loss Trend]], [[Trend]]). A projected trend turns past losses into an estimate of future ones and can show that a risk is growing before it becomes large. With an annual trend $g$, the severity projected $t$ years ahead of a base period is

> $$X_{t} = X_0 (1 + g)^{t}$$

- $X_0$ is the severity observed in the base period.

> [!example]- What are the mean and standard deviation of the annual number of accidents, and the expected cost two years after the base year? {Example}
> The distributor's records give this empirical distribution of vehicle accidents a year:
>
> | Accidents | 0 | 1 | 2 | 3 |
> | :--- | ---: | ---: | ---: | ---: |
> | Probability | 0.3 | 0.4 | 0.2 | 0.1 |
>
> The average accident cost \$9,000 in the base year, and severity has trended up 4% a year.
>
> > [!answer]-
> > - The mean is $E[N] = 0(0.3) + 1(0.4) + 2(0.2) + 3(0.1) = 1.1$.
> > - The second moment is $E[N^2] = 1(0.4) + 4(0.2) + 9(0.1) = 2.1$.
> > - The standard deviation is $\sqrt{2.1 - 1.1^2} = 0.943$.
> > - The projected severity is $X_2 = 9{,}000(1.04)^2 = \$9{,}734.40$.
> > - The expected cost is $E[L] = 1.1 \times 9{,}734.40 = \$10{,}707.84$, about \$10,700 a year.
> > - A year with three accidents, about \$29,000 of losses, is well within normal experience, since the standard deviation is nearly one accident.

## Root cause analysis

Root cause analysis works back from a loss or a near miss to the underlying cause, asking why it happened until the answer is something the organization can change. Techniques include asking "why" repeatedly and cause-and-effect diagrams. The immediate cause of a loss, such as a worker slipping, is usually a symptom of something else, such as a cleaning schedule that leaves floors wet at shift change. Treating a root cause prevents a family of losses, while treating a symptom prevents only the one that was seen.

## Group underwriting

In group health and group life, risk assessment is the underwriter's evaluation of a group, including its size, industry, age and sex mix, participation and contribution rules, and its past claims, including large claims ([[Underwriting]]). The result sets the rate, through a blend of the [[Manual Rate|manual rate]] and the group's own experience weighted by [[Credibility|credibility]]. It also guides which [[Funding|funding arrangement]] suits the employer, from fully insured to self-funded with stop-loss.

> [!trap] Reading a score as an expected loss
> Likelihood and impact ratings are ordinal, so a score of 12 is not twice as bad as a score of 6. Comparing scores as if they were dollars overstates their precision.
