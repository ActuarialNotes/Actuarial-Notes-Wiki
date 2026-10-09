---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:50c0800785643e2ff091735f829e31b141f64e0c93d9e9f9bc4d548ef0c71368
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Assessment.md
---

**Risk assessment** is the step of [[Risk Management|risk management]] that measures the risks found by [[Risk Identification|risk identification]], estimating how likely each is and how large its effect would be, so they can be ranked and treated in order of importance. Its tools range from qualitative scores and risk maps to probability analysis, trend analysis and root cause analysis. In ISO 31000 the term is broader and covers identification, analysis and evaluation together.

> $$S = \ell \times m$$

> $$E[L] = E[N] \times E[X]$$

> $$X_{t} = X_0 (1 + g)^{t}$$

- **Symbols:** $S$ is a risk score, the product of a likelihood rating $\ell$ and an impact rating $m$, each usually on a scale of 1 to 5. $E[L]$ is the [[Expected Loss|expected loss]] for a period, $E[N]$ is the expected number of losses, its [[Frequency|frequency]], and $E[X]$ is the expected size of each, its [[Severity|severity]]. $X_0$ is the severity observed in the base period, $g$ is the annual trend, and $X_t$ is the severity projected $t$ years ahead.
- **Likelihood and impact:** The two dimensions are rated separately because they lead to different treatment. Impact can be rated in money, or in effects on safety, reputation and objectives that have no price, which is why ordinal scales are common. A score is a way to rank risks, not a measure of expected loss, since the scales are not proportional to probabilities or dollars.
- **Risk maps:** A risk map, or heat map, plots each risk by likelihood on one axis and impact on the other, with zones that mark which risks need action first. The map shows what a single score hides: a frequent small risk and a rare severe one can share a score but call for retention and control in the first case and transfer in the second.
- **Probability analysis:** Where data exist, a risk is described by a probability distribution of outcomes rather than a rating ([[Probability Distributions]]). An empirical distribution comes from the organization's own loss history and a theoretical one from a fitted model. The [[Expected Value|expected value]] measures the central tendency, and the [[Standard Deviation|standard deviation]] measures how far outcomes may stray from it.
- **Trend analysis:** Losses are examined over time for patterns in frequency and severity, after adjusting for changes in exposure and for inflation ([[Loss Trend]], [[Trend]]). A projected trend turns past losses into an estimate of future ones and can show that a risk is growing before it becomes large.
- **Root cause analysis:** Root cause analysis works back from a loss or a near miss to the underlying cause, asking why it happened until the answer is something the organization can change. Techniques include asking "why" repeatedly and cause-and-effect diagrams. Treating a root cause prevents a family of losses, while treating a symptom prevents only the one that was seen.
- **Qualitative and quantitative together:** Qualitative ratings let an organization rank risks with no data, such as strategic and reputational ones, and quantitative tools refine the rankings where data exist. The results are compared with the organization's [[Risk Appetite|risk appetite]] to decide which risks need [[Risk Control|risk control]], [[Risk Transfer|transfer]] or no action.
- **Group underwriting (GH-101):** In group health and group life, risk assessment is the underwriter's evaluation of a group, including its size, industry, age and sex mix, participation and contribution rules, and its past claims, including large claims ([[Underwriting]]). The result sets the rate, through a blend of the [[Manual Rate|manual rate]] and the group's own experience weighted by [[Credibility|credibility]], and guides which [[Funding|funding arrangement]] suits the employer, from fully insured to self-funded with stop-loss.

> [!example]- Scoring and Mapping a Distributor's Risks {Example}
> A distributor rates five risks on scales of 1 to 5, with illustrative ratings: a warehouse fire (likelihood 2, impact 5), delivery vehicle accidents (4, 2), a data breach (3, 4), the loss of its largest customer (2, 4), and minor employee injuries (5, 1). Score and rank the risks, and say what the map shows that the scores do not.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > S_{\text{breach}} &= 3 \times 4 = 12 \\
> > S_{\text{fire}} &= 2 \times 5 = 10 \\
> > S_{\text{vehicle}} &= 4 \times 2 = 8 \\
> > S_{\text{customer}} &= 2 \times 4 = 8 \\
> > S_{\text{injury}} &= 5 \times 1 = 5
> > \end{align*}
> > $$
> > The data breach ranks first and the fire second. Vehicle accidents and the loss of the largest customer tie at 8, but they sit in different corners of the map. Vehicle accidents are frequent and modest, so they suit retention and loss prevention such as driver training. Losing the customer is rare and severe, and it is a strategic risk that insurance does not cover, so it calls for diversifying the customer base. The fire, with the highest impact, is the one to transfer, even though it scores below the breach.

> [!example]- Projecting Vehicle Losses From History {Example}
> The distributor's records give an empirical distribution of vehicle accidents a year: none with probability 0.3, one with 0.4, two with 0.2, and three with 0.1. The average accident cost \$9,000 in the base year, and severity has trended up 4% a year. Find the mean and standard deviation of the annual number of accidents, and the expected cost two years after the base year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[N] &= 0(0.3) + 1(0.4) + 2(0.2) + 3(0.1) \\
> > &= 1.1 \\
> > E[N^2] &= 1(0.4) + 4(0.2) + 9(0.1) \\
> > &= 2.1 \\
> > \sigma_N &= \sqrt{2.1 - 1.1^2} \\
> > &= 0.943
> > \end{align*}
> > $$
> > The trend is applied to severity over two years.
> > $$
> > \begin{align*}
> > X_2 &= 9{,}000(1.04)^2 \\
> > &= 9{,}734.40 \\
> > E[L] &= 1.1 \times 9{,}734.40 \\
> > &= 10{,}707.84
> > \end{align*}
> > $$
> > The distributor expects about \$10,700 of vehicle losses a year. The standard deviation of nearly one accident around a mean of 1.1 says that a year with three accidents, and about \$29,000 of losses, is well within the range of normal experience.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The section on identifying risk asks candidates to describe the assessment tools and techniques, which are likelihood and impact scoring, risk maps, probability analysis, trend analysis and root cause analysis, and to say which suits a given risk. Applied questions give ratings or loss data and ask for a ranking, an expected loss or a projection.
> - **GH-101:** The underwriting and funding section asks candidates to apply pricing, risk assessment and funding principles to an underwriting situation. A case describes an employer group, and candidates evaluate its risk characteristics and experience and recommend a rate basis and a funding arrangement.

> [!warning]- Exam traps
> - **A score is not an expected loss:** Likelihood and impact ratings are ordinal, so a score of 12 is not twice as bad as a score of 6. Comparing scores as if they were dollars overstates their precision.
> - **Equal scores, different treatment:** Two risks with the same score can be a frequent small risk and a rare severe one. The treatment depends on where each sits on the map, not on the product alone.
> - **Trend needs an adjusted base:** Loss counts that grow with the size of the business are not a trend in frequency. Adjust for exposure growth and inflation before reading a pattern into the history.
> - **Symptom versus root cause:** The immediate cause of a loss, such as a worker slipping, is usually a symptom of something else, such as a cleaning schedule that leaves floors wet at shift change. Treating the immediate cause leaves the root cause to produce the next loss.
