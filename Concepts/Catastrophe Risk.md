---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:79e234bd9ba2b95dd2d01ed0bd008ed0702db62041d77cc3a3a9d75a265eb2aa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Risk.md
---

**Catastrophe Risk** is the risk of a very large loss from a single event — hurricane, earthquake, flood, wildfire, severe convective storm, or a man-made event such as terrorism — that damages many insured exposures at once. Its defining feature is **correlation**: one event strikes many policies together, so pooling does not diversify it the way it diversifies independent claims.

> $$\text{EP}(x) = P(\text{annual loss} > x)$$
>
> $$\text{Return period}(x) = \frac{1}{\text{EP}(x)}$$

- The **exceedance probability curve** $\text{EP}(x)$ is the standard description of catastrophe risk. The *occurrence* curve (OEP) looks at the largest single event in a year, the *aggregate* curve (AEP) at the year's total. The area under the AEP curve is the average annual loss ([[Catastrophe Expected Loss Cost]]), and the loss at a chosen return period is the [[Probable Maximum Loss|PML]].
- **How it is modelled.** Grossi and Kunreuther describe a catastrophe model in four parts: *hazard* (where events occur, how often, how intense), *inventory* (the exposed properties), *vulnerability* (damage given intensity) and *loss* (the financial result after policy terms). See [[Catastrophe Modelling]].
- **Two kinds of uncertainty.** *Aleatory* uncertainty is the inherent randomness of events and cannot be reduced; *epistemic* uncertainty comes from incomplete knowledge of the hazard, vulnerability and exposure, and can be. Different vendor models give materially different answers for the same book ([[Model Risk]]).
- **Why it is capital-hungry.** Because the [[Law of Large Numbers]] does not apply across a correlated book, catastrophe risk needs capital out of proportion to its expected loss: it supports little [[Insurance Leverage|leverage]] and needs high margin ratios. It is the main reason insurers buy [[Reinsurance|reinsurance]] ([[Reinsurance Pricing]]) and manage accumulations ([[Catastrophe Exposure Management]]).
- **Capital markets.** [[Securitization]] moves catastrophe risk to investors through [[CAT Bonds]] and other [[Insurance-Linked Securities]]. A cat bond's principal is held in a collateral trust, largely removing counterparty credit risk. Its trigger — indemnity (the sponsor's own losses), industry index, parametric (physical event measures) or modelled loss — trades *basis risk* (the payout not matching the sponsor's loss) against moral hazard, transparency and speed of settlement.
- Public mechanisms share part of the risk, for example the [[Florida Hurricane Catastrophe Fund]]; a changing climate shifts the hazard itself ([[Climate Risk]]).

> [!example]- Why Pooling Fails: Independent Versus Correlated Homes {Example}
> An insurer covers $1{,}000$ homes, each with a $1\%$ annual chance of a \$200,000 total loss. Compare the mean and standard deviation of annual losses if (a) the losses are independent (fires) and (b) a single event destroys every home at once with probability $1\%$ (a storm).
>
> > [!answer]-
> > The mean is the same in both: $1{,}000 \times 0.01 \times \$200{,}000 = \$2$M.
> >
> > $$
> > \begin{align*}
> > \sigma_{(a)} &= \$200{,}000\sqrt{1{,}000(0.01)(0.99)} \\
> > &= \$0.63\text{M} \\
> > \sigma_{(b)} &= \$200\text{M}\sqrt{0.01(0.99)} \\
> > &= \$19.9\text{M}
> > \end{align*}
> > $$
> >
> > The coefficient of variation is $0.31$ for independent losses and $9.95$ for correlated ones — about $32$ times as large. Adding homes shrinks the relative volatility in (a) but not at all in (b). The expected loss is identical; the capital needed is not.

> [!example]- Occurrence Versus Aggregate Exceedance {Example}
> A region faces two independent perils, each striking at most once a year: a hurricane costing $60$ with probability $0.05$, and a hailstorm costing $30$ with probability $0.10$. Find the AAL, the occurrence and aggregate exceedance probabilities at $50$ and $70$, and the return period of a year's losses exceeding $70$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{AAL} &= 0.05(60) + 0.10(30) \\
> > &= 6 \\
> > \text{OEP}(50) &= P(\text{hurricane}) \\
> > &= 0.05 \\
> > \text{AEP}(70) &= P(\text{both occur}) \\
> > &= 0.05(0.10) \\
> > &= 0.005
> > \end{align*}
> > $$
> >
> > $\text{AEP}(50) = 0.05$ as well, since the year's total exceeds $50$ exactly when the hurricane occurs; but $\text{OEP}(70) = 0$, because no single event exceeds $70$. The year's total exceeds $70$ once in $1/0.005 = 200$ years. A per-occurrence cover attaching at $70$ would never pay; an aggregate cover attaching at $70$ would — which is why the two curves answer different questions.
