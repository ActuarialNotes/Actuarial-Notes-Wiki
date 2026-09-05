---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bb6d3e3ab03cfecbe20e97aa48ad88cd6a59f6419c1ce022cdf2e2a8f783ae7c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Base Solvency Buffer.md
---

**The Base Solvency Buffer** (BSB) is the denominator of the [[MCT]] ratio: **$1.5$ times [[Capital Required]]**. An insurer meets the minimum standard when [[Capital Available]] equals the buffer — that is, when it holds one and a half times the capital its risk margins alone would demand.

> $$\text{BSB} = 1.5 \times \text{Capital Required}$$

- **Why a multiplier at all.** The risk margins are calibrated to a defined level of adverse experience; the $1.5$ factor builds in a further cushion so that an insurer at the $100\%$ minimum still has resources above the modelled requirement. It converts "enough capital for the modelled risks" into "enough capital plus a margin for what the model missed."
- **The thresholds compound.** At the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], an insurer holds $1.5 \times 1.5 = 2.25$ times capital required. At a $200\%$ [[Internal Target Capital Ratio|internal target]], three times. The headline percentages therefore understate how much capital the framework actually asks for.
- **Every change in the risk profile moves it.** Growth, a shift toward longer-tail lines, a riskier investment mix, or reduced reinsurance credit all raise capital required and therefore the buffer — and lower the ratio without any loss occurring.
- **Reading a falling ratio requires decomposing it.** A ratio can fall because capital available fell (losses, dividends, market movements) or because the buffer rose (growth, risk mix, lost reinsurance credit). The remedies differ entirely, so the decomposition is the first analytical step.
- The buffer is recomputed every quarter in the [[Quarterly Return]], which is what lets [[OSFI]] track the trend rather than a single annual snapshot.

> [!example]- Decomposing a Ratio Decline {Example}
> An insurer's MCT ratio fell from $188\%$ to $161\%$ over a year. Capital available went from $\$282$ million to $\$276$ million.
>
> Determine what drove the decline.
>
> > [!answer]-
> > **Back out the buffer in each year:**
> >
> > $$\begin{align*}
> > \text{BSB}_{\text{open}} &= \frac{\$282\text{M}}{1.88} = \$150.0\text{M} \\[6pt]
> > \text{BSB}_{\text{close}} &= \frac{\$276\text{M}}{1.61} = \$171.4\text{M}
> > \end{align*}$$
> >
> > **Attribute the $27$-point fall.** Holding the buffer at its opening level, the capital decline alone would give:
> >
> > $$\frac{\$276\text{M}}{\$150.0\text{M}} = 184\%$$
> >
> > So capital available explains $4$ points, and the buffer increase explains the remaining $23$.
> >
> > **The buffer rose $14\%$**, implying capital required rose $14\%$ — from growth, a change in business or asset mix, or lost reinsurance credit. **This is a growth or risk-profile story, not a loss story.**
> >
> > **Why that matters for the response.** Had the decline been driven by losses, the remedies would be pricing, reserving and expense action. Because it is driven by the buffer, the effective remedies are different: moderate growth, buy more reinsurance (with attention to [[Registered Reinsurance|registration]] so the credit is actually granted), de-risk the investment portfolio, or raise capital to fund the expansion.
> >
> > **The question to ask management** is whether the growth was planned and funded. Growth that the capital plan anticipated is a strategy; growth that shows up as a surprise in the buffer is a governance failure, and it is exactly what [[ORSA]] exists to prevent.
