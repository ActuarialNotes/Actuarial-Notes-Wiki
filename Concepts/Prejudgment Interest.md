---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fb3f749716a5491ef8e7377d3a56e7a32b4e2ecdb07c871ffbfebe3e6e460676
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prejudgment Interest.md
---

![[Media/Figures/Prejudgment_Interest.svg|340]]

**Prejudgment Interest** (PJI) is interest a court adds to a damages award to compensate the plaintiff for being kept out of their money between the date the cause of action arose and the date of judgment. It is set by statute in each province, and because bodily injury cases take years to resolve, it is a material part of what an insurer ultimately pays.

At simple interest, the amount of a judgment is

> $$\text{Judgment} = \text{Damages} + D \times r \times t$$

- $D$ is the part of the damages on which PJI runs.
- $r$ is the prescribed PJI rate.
- $t$ is the time in years from the cause of action to judgment.

PJI generally does not run on future losses, which are already valued as at judgment. It runs on pre-judgment pecuniary loss and on non-pecuniary damages, which materially reduces the PJI on a large future-care award. Rates are prescribed, usually by regulation, and often differ by head of damage. Ontario, for example, has historically applied a fixed rate to non-pecuniary damages and a market-linked quarterly rate to pecuniary damages.

> [!example]- What does the insurer pay on this claim, and what does it mean for the case reserve? {Example}
> A claim arising in March 2020 settles in September 2025 for $\$400{,}000$ of assessed damages: $\$150{,}000$ non-pecuniary, $\$100{,}000$ pre-judgment income loss and $\$150{,}000$ future care. PJI applies at $5\%$ simple interest to the non-pecuniary and pre-judgment pecuniary amounts only.
>
> > [!answer]-
> > - The elapsed time is $5.5$ years.
> > - PJI runs on $150{,}000 + 100{,}000 = \$250{,}000$, and not on the future care.
> > - The PJI is $250{,}000 \times 0.05 \times 5.5 = \$68{,}750$.
> > - The total paid is $400{,}000 + 68{,}750 = \$468{,}750$, so PJI adds about $17\%$ to the assessed damages and $27.5\%$ to the amounts it runs on.
> > - A case reserve set at the assessed $\$400{,}000$ is about $15\%$ short of the payment, and the shortfall grows every year the file stays open.

## Purpose of the rate

PJI removes the defendant's incentive to delay. Without it, an insurer holding the money for four years earns the investment return while the plaintiff bears the loss. With it, delay is roughly cost-neutral, which is the design intent.

Where the rate is set below market, the incentive returns: a defendant earning $5\%$ while paying $2\%$ PJI profits from delay. Where it is set above market, plaintiffs gain from delay. Neither is neutral, so rate-setting is a recurring [[Tort Reform|tort reform]] issue.

## Actuarial treatment

PJI is part of the ultimate claim cost and must be included in reserves. Its effect depends on how long claims stay open, so it interacts directly with development patterns: a line whose claims take five years to settle carries far more PJI than one that settles in one.

A paid triangle already contains PJI, so development factors applied to paid data capture it. A reserve built bottom-up from adjusters' damage assessments does not, unless PJI is added explicitly. If an insurer's average time to settlement lengthens from four years to six, ultimate cost rises through PJI with no change in damages, an effect a "no severity trend" assumption would miss.

> [!trap] Netting PJI against discounting
> Under [[IFRS 17]], PJI increases the nominal cash flow the insurer will pay, while the [[IFRS 17 Discount Rates|discount rate]] reduces its present value. They are separate adjustments in opposite directions and must not be netted informally.
