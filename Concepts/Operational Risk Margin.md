---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:55d089ef8b383d9ad55f4f2a771dba69d8e68cb41ad1a8a82f8d21e410c67054
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Operational Risk Margin.md
---

**The Operational Risk Margin** is the [[MCT]] component covering losses from **failed internal processes, people and systems, or from external events** — fraud, cyber incidents, model error, legal and compliance failures, business disruption. It is not derived from an insurer's own operational loss history; it is a **formula** applied to volume measures.

> $$\text{Operational risk} \approx f(\text{premiums},\; \text{liabilities},\; \text{growth})$$

- **Formula-based by design.** Operational losses are infrequent, idiosyncratic and poorly captured by any one insurer's data, so the MCT uses a proxy: charges on written premiums and on [[Insurance Contract Liabilities|liabilities]], with an **additional charge on premium growth** above a threshold, subject to an overall cap relative to the rest of [[Capital Required]].
- **The growth charge is the interesting feature.** Rapid growth is itself an operational risk indicator — systems, staffing, underwriting discipline and claims handling all strain when volume rises quickly — and it is a recurring precursor in [[PACICC]]'s analysis of insurer failures. The MCT charges for it explicitly.
- **The margin is added after the [[Diversification Credit]]**, which applies between [[Insurance Risk Margin|insurance]] and [[Market Risk Margin|market]] risk. Operational risk is not diversified against them, on the reasoning that it can strike at any time and often strikes hardest when other things are going wrong.
- **The formula cannot see quality.** Two insurers with identical premium and liabilities attract the same charge regardless of the strength of their controls. That gap is what [[ORSA]] and [[Corporate Governance]] expectations are there to fill: the insurer must form its own view of operational risk and reflect it in the [[Internal Target Capital Ratio|internal target]].
- **[[Model Risk]] is an operational risk**, and OSFI's model risk expectations sit alongside the capital charge — a mis-specified pricing or reserving model is an operational failure with insurance-risk consequences.
- **Cyber risk** has grown into the dominant operational exposure for most insurers, and it is the clearest example of a risk the volume-based formula does not measure.

> [!example]- The Growth Charge in Action {Example}
> An insurer's operational risk margin is computed as $2.5\%$ of written premium plus $0.5\%$ of liabilities, plus an additional $2.5\%$ of the amount by which premium growth exceeds $20\%$. Written premium rises from $\$400$ million to $\$540$ million; liabilities are $\$700$ million.
>
> Compute the margin and comment.
>
> > [!answer]-
> > **Growth rate:**
> >
> > $$\frac{\$540\text{M} - \$400\text{M}}{\$400\text{M}} = 35\%$$
> >
> > **Premium above the $20\%$ threshold:**
> >
> > $$\$540\text{M} - 1.20(\$400\text{M}) = \$540\text{M} - \$480\text{M} = \$60\text{M}$$
> >
> > **Margin:**
> >
> > $$\begin{align*}
> > &= 0.025(\$540\text{M}) + 0.005(\$700\text{M}) + 0.025(\$60\text{M}) \\
> > &= \$13.5\text{M} + \$3.5\text{M} + \$1.5\text{M} \\
> > &= \$18.5\text{M}
> > \end{align*}$$
> >
> > The growth surcharge is $\$1.5$ million — modest in itself, and that is the point worth making: **the operational charge is not where rapid growth mainly costs capital.** The larger effect is in the [[Insurance Risk Margin]], which rises with the liabilities the new business creates.
> >
> > **What the surcharge signals rather than funds.** Its real function is to make growth visible in the capital calculation and to prompt the supervisory question. An insurer growing $35\%$ should expect [[OSFI]] to ask what changed — new distribution, a new line, a competitor's withdrawal, or a price that is below the market — and to look for the [[PACICC]] failure pattern of growth plus underpricing plus reserve deficiency.
> >
> > **What the formula cannot tell anyone:** whether this insurer's claims systems, underwriting controls and staffing can actually absorb $35\%$ more business. That assessment belongs in [[ORSA]], and if the answer is no, the [[Internal Target Capital Ratio|internal target]] should rise by considerably more than $\$1.5$ million.
