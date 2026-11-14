---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:19ae98a6a17f232f394e672ead1bd60a50d4373d0cc770cae02a54681cdd9b0f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Operational Risk Margin.md
---

![[Media/Figures/Operational_Risk_Margin.svg|340]]

The **Operational Risk Margin** is the [[MCT]] component that covers losses from failed internal processes, people and systems, or from external events, such as fraud, cyber incidents, model error, legal and compliance failures and business disruption. It is not derived from an insurer's own operational loss history. It is a formula applied to volume measures.

Operational losses are infrequent, idiosyncratic and poorly captured by any one insurer's data, so the MCT uses a proxy built from three parts:

1. A charge on written premiums.
2. A charge on [[Insurance Contract Liabilities|insurance contract liabilities]].
3. An additional charge on premium growth above a threshold.

The total is subject to an overall cap relative to the rest of [[Capital Required]].

Rapid growth is itself an operational risk indicator. Systems, staffing, underwriting discipline and claims handling all strain when volume rises quickly, and rapid growth is a recurring precursor in [[PACICC]]'s analysis of insurer failures. The MCT charges for it explicitly.

> [!example]- What is this insurer's operational risk margin, and what does its growth charge signal? {Example}
> Suppose an insurer's operational risk margin is $2.5\%$ of written premium plus $0.5\%$ of liabilities, plus $2.5\%$ of the amount by which written premium exceeds $120\%$ of the prior year's. Written premium rises from $\$400$ million to $\$540$ million, and liabilities are $\$700$ million.
>
> > [!answer]-
> > - Premium grew by $(540 - 400)/400 = 35\%$, above the $20\%$ threshold.
> > - The premium above the threshold is $540 - 1.20 \times 400 = \$60$ million.
> > - The premium charge is $0.025 \times 540 = \$13.5$ million, and the liability charge is $0.005 \times 700 = \$3.5$ million.
> > - The growth charge is $0.025 \times 60 = \$1.5$ million.
> > - The margin is $13.5 + 3.5 + 1.5 = \$18.5$ million.
> > - The growth charge is small. The larger capital cost of growth is in the [[Insurance Risk Margin]], which rises with the liabilities the new business creates.
> > - The charge makes growth visible in the capital calculation. An insurer growing $35\%$ should expect [[OSFI]] to ask what changed, and to look for the [[PACICC]] failure pattern of growth, underpricing and reserve deficiency.

## Operational risk and diversification

The operational risk margin is added after the [[Diversification Credit]], which applies between [[Insurance Risk Margin|insurance]] and [[Market Risk Margin|market]] risk. Operational risk is not diversified against them, because it can strike at any time and often strikes hardest when other things are going wrong.

## What the formula does not measure

Two insurers with identical premium and liabilities attract the same charge whatever the strength of their controls. [[ORSA]] and [[Corporate Governance]] expectations fill that gap: the insurer forms its own view of operational risk and reflects it in its [[Internal Target Capital Ratio|internal target]]. If its claims systems, underwriting controls and staffing cannot absorb rapid growth, the internal target should rise by more than the formula's growth charge.

[[Model Risk]] is an operational risk. A mis-specified pricing or reserving model is an operational failure with insurance-risk consequences, and OSFI's model risk expectations sit alongside the capital charge. Cyber risk has grown into the dominant operational exposure for most insurers, and it is the clearest example of a risk the volume-based formula does not measure.

> [!trap] Treating the growth charge as the cost of growth
> The growth charge in the example is $\$1.5$ million on $\$140$ million of new premium. Most of the extra capital that growth needs comes through the insurance risk margin on the new liabilities, and the real operational question is answered in the ORSA.
