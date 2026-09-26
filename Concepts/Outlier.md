---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:754a86e15eedaf80f5dda4f429dcbb749d88020c7aab7b796791dbe344b794a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Outlier.md
---

An **Outlier** is an observation that lies far from the bulk of the data, or far from what a model predicts for it. The first question to ask about one is always *why*: an outlier is either an **error** to be corrected, or a **real but extreme** value, such as a [[Large Loss|large loss]], that has to be kept but kept from dominating the fit.

> $$\text{Lower fence} = Q_1 - 1.5 \times \text{IQR}$$
>
> $$\text{Upper fence} = Q_3 + 1.5 \times \text{IQR}$$

- $Q_1$ and $Q_3$ are the first and third quartiles and $\text{IQR} = Q_3 - Q_1$; a value outside the fences is flagged. This is the rule a [[Box Plot]] draws, and it relies on quartiles, which the outliers themselves barely move
- **In a model**, an outlier is a point with a large standardized [[Residual Plot|residual]]; a point is **influential** when removing it would change the fitted coefficients materially (high leverage, measured by Cook's distance). A point can be influential without having a large residual, because it pulls the fit toward itself
- Insurance losses are **right-skewed by nature**, so a fence built for symmetric data flags many legitimate claims. Judge a flagged value against the business, not only against the rule
- Treatments: **correct** a data error at source; **cap** (winsorize) extreme values at a threshold and load the excess back separately; **transform** the variable (a log compresses the tail); or model with a distribution suited to heavy tails. Deleting a real observation because it is inconvenient biases the result
- Whatever is done has to be described: the PCPA project rubric awards credit for stating which anomalies were found and how they were handled

> [!example]- Flagging Outliers with the IQR Rule {Example}
> For $2{,}000$ auto physical damage claims, $Q_1 = \$1{,}200$ and $Q_3 = \$6{,}800$. Which of these claims are flagged: $\$14{,}000$, $\$95{,}000$, and a claim recorded as $-\$3{,}000$?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{IQR} &= 6{,}800 - 1{,}200 = 5{,}600 \\
> > \text{Upper fence} &= 6{,}800 + 1.5(5{,}600) = 15{,}200 \\
> > \text{Lower fence} &= 1{,}200 - 1.5(5{,}600) = -7{,}200
> > \end{align*}
> > $$
> > Only the $\$95{,}000$ claim is flagged. It could well be a genuine total loss on an expensive vehicle, so check it rather than drop it. The **$-\$3{,}000$ claim passes the fence but is still wrong**: a negative claim is probably a salvage or subrogation recovery recorded as a separate transaction. That is a [[Data Quality|data quality]] problem the fence cannot see.

> [!example]- Capping Losses Before Fitting a Severity Model {Example}
> Five claims of $\$10{,}000$, $\$40{,}000$, $\$80{,}000$, $\$300{,}000$ and $\$600{,}000$ are capped at $\$250{,}000$ before fitting a severity model. What are the capped losses, and how much is removed?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Capped} &= 10 + 40 + 80 + 250 + 250 \\
> > &= 630 \text{ (thousand)} \\
> > \text{Uncapped} &= 10 + 40 + 80 + 300 + 600 \\
> > &= 1{,}030 \text{ (thousand)} \\
> > \text{Removed} &= 1{,}030 - 630 = 400 \text{ (thousand)}
> > \end{align*}
> > $$
> > The model now fits the relativities without two claims driving them. The $\$400{,}000$ above the cap is not thrown away: it comes back as an **excess load**, estimated from a longer or broader base than these five claims (see [[Large Loss]]).
