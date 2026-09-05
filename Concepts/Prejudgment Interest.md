---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1db1eaa7f084ae9da5a3e3ca27a76ac6554f1df948af0792162bada4a100de7a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Prejudgment Interest.md
---

**Prejudgment Interest** (PJI) is interest a court adds to a damages award to compensate the plaintiff for being kept out of their money between the date the cause of action arose and the date of judgment. It is set by statute in each province, and because bodily injury cases take years to resolve, it is a material component of the amount an insurer ultimately pays.

> $$\text{Judgment} = \text{Damages} + \text{Damages} \times r \times t$$

- **Rates are prescribed**, usually by regulation and often differing by head of damage — Ontario, for example, has historically applied a fixed rate to non-pecuniary damages and a market-linked quarterly rate to pecuniary damages.
- **Purpose and side-effect.** PJI removes the defendant's incentive to delay: without it, an insurer holding money for four years earns the investment return and the plaintiff bears the loss. With it, delay is roughly cost-neutral, which is the design intent.
- **Where the rate is set below market**, the incentive returns — a defendant earning $5\%$ while paying $2\%$ PJI profits from delay. Where it is set above market, plaintiffs gain from delay. Neither is neutral, and rate-setting is therefore a recurring [[Tort Reform]] issue.
- **Actuarial treatment.** PJI is part of the ultimate claim cost and must be included in reserves. Its effect is a function of **duration**, so it interacts directly with development patterns: a line whose claims take five years to settle carries far more PJI than one that settles in one.
- Under **[[IFRS 17]]**, note the distinction: PJI increases the *nominal* cash flow the insurer will pay, whereas the [[IFRS 17 Discount Rates|discount rate]] reduces its present value. The two are separate adjustments moving in opposite directions and must not be netted informally.
- Prejudgment interest generally does **not** run on future losses (which are already valued as at judgment), only on pre-judgment pecuniary loss and non-pecuniary damages — a distinction that materially reduces the amount on a large future-care award.

> [!example]- Interest on a Delayed Settlement {Example}
> A claim arising in March 2020 settles in September 2025 for $\$400{,}000$, of which $\$150{,}000$ is non-pecuniary, $\$100{,}000$ is pre-judgment income loss, and $\$150{,}000$ is future care. Prejudgment interest applies at $5\%$ simple to the non-pecuniary and pre-judgment pecuniary amounts only.
>
> Compute the total payment and comment on the reserving implication.
>
> > [!answer]-
> > The elapsed period is $5.5$ years, and PJI applies to $\$150{,}000 + \$100{,}000 = \$250{,}000$:
> >
> > $$\begin{align*}
> > \text{PJI} &= \$250{,}000 \times 0.05 \times 5.5 \\
> > &= \$68{,}750 \\[4pt]
> > \text{Total paid} &= \$400{,}000 + \$68{,}750 \\
> > &= \$468{,}750
> > \end{align*}$$
> >
> > PJI adds **$17\%$** to the assessed damages — on the head amounts it touches, it adds $27.5\%$.
> >
> > The reserving implication is the part that matters. A case reserve set at the assessed damages of $\$400{,}000$ is $15\%$ short, and the shortfall grows every year the file stays open. Two consequences:
> >
> > - **Development patterns embed PJI.** A paid triangle already contains it, so applying development factors to paid data captures it automatically; a reserve built bottom-up from adjuster damage assessments does not, unless PJI is added explicitly.
> > - **Slowing settlement is not free.** If an insurer's average time to settlement lengthens from four years to six, ultimate cost rises through PJI even with no change in damages — a real effect that a "no severity trend" assumption would miss entirely.
