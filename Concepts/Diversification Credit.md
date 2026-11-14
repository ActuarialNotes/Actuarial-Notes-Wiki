---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ae5483181317ed909c336323e71bf005eb53ce229cd850d4e2b3c58f88f650f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Diversification Credit.md
---
![[Media/Figures/Diversification_Credit.svg|340]]

The **Diversification Credit** is the reduction in [[MCT]] [[Capital Required|capital required]] recognising that [[Insurance Risk Margin|insurance risk]] and the combined [[Market Risk Margin|market]] and [[Credit Risk Margin|credit]] risk do not crystallise at the same time. Adding the margins together assumes perfect correlation, and the credit removes part of that overstatement.

Capital required is

> $$\text{CR} = \text{Insurance} + \text{Market} + \text{Credit} + \text{Operational} - D$$

- $\text{CR}$ is capital required.
- $\text{Insurance}$, $\text{Market}$, $\text{Credit}$ and $\text{Operational}$ are the four risk margins.
- $D$ is the diversification credit.

A hurricane and an equity market crash are largely unrelated events. An insurer that would need $\$100$ million for one and $\$80$ million for the other does not need $\$180$ million to survive both, because the probability of both occurring at their modelled severities in the same year is far below the probability of either. When the correlation is below one, the capital needed for the combined risks is less than the sum of the capital each needs alone.

## The MCT formula

The MCT recognises diversification between two blocks (MCT §8), with a correlation factor of $50\%$. The credit is

> $$D = A + I - \sqrt{A^2 + I^2 + 2 \times 0.5 \times A \times I}$$

- $I$ is the insurance risk requirement.
- $A$ is the sum of the credit and market risk requirements.

Credit and market risk are added to each other with no credit, since credit losses correlate with market stress. [[Operational Risk Margin|Operational risk]] gets no credit at all, because operational failures tend to occur when everything else is going wrong. The credit is largest when the two blocks are of similar size. An insurer whose capital requirement is almost entirely insurance risk gets little benefit, because there is little to diversify against.

> [!example]- What are this insurer's diversification credit and capital required, and what if the two blocks were perfectly correlated? {Example}
> An insurer has capital available of $\$450$ million and these risk margins:
>
> | Risk margin | Amount |
> | :--- | ---: |
> | Insurance | $\$110$ million |
> | Market | $\$65$ million |
> | Credit | $\$18$ million |
> | Operational | $\$14$ million |
>
> > [!answer]-
> > - The credit-and-market block is $A = \$65\text{M} + \$18\text{M} = \$83$ million.
> > - The combined requirement is $\sqrt{110^2 + 83^2 + 110 \times 83} = \sqrt{28{,}119} = 167.7$, in millions.
> > - The credit is $D = 110 + 83 - 167.7 = \$25.3$ million.
> > - Capital required is $110 + 65 + 18 + 14 - 25.3 = \$181.7$ million.
> > - Minimum capital required is $\$181.7\text{M}/1.5 = \$121.1$ million, and the MCT ratio is $450/121.1 = 372\%$.
> > - With a correlation of one, the square root is $110 + 83 = 193$ and the credit is zero.
> > - Capital required is then $\$207$ million and minimum capital required $\$138.0$ million, $\$16.9$ million more.
> > - The MCT ratio falls to $450/138.0 = 326\%$, about 45 points lower from the correlation assumption alone.

## Correlation in a crisis

Correlation is not constant, which is the standing criticism of the credit. In a severe crisis, correlations rise toward one. A catastrophe triggers asset sales, and a market collapse coincides with an economic downturn that raises claim frequency and fraud. A credit calibrated to normal-time correlation overstates the benefit in the scenario where it matters.

An insurer relying on the credit should test in its [[ORSA]] scenarios what happens if the risks do coincide, and reflect the answer in its [[Internal Target Capital Ratio|internal target]].

> [!trap] Adding the margins with no credit
> Summing the four margins assumes the risks are perfectly correlated. Capital required subtracts the diversification credit between the insurance block and the credit-and-market block, and gives none for operational risk.
