---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1d6cbb3571d605590b1402de3fa25cf16c6106d090d19f21d43f6209206a78e2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tort Litigation.md
---

**Tort Litigation** is the civil action by which an injured person recovers damages from the person whose negligence caused the injury. It is the compensation mechanism that liability insurance responds to, and its cost, duration and unpredictability are the reason Canadian provinces have progressively replaced parts of it with [[No-Fault Insurance|no-fault]] benefits.

> $$\text{Damages} = \underbrace{\text{Pecuniary}}_{\text{income, care, cost}} + \underbrace{\text{Non-pecuniary}}_{\text{pain and suffering}}$$

- **What must be proved:** a duty of care, breach of the standard of care, causation, and damages. Failure on any element defeats the claim entirely, which is why liability is contested rather than conceded.
- **Contributory negligence** apportions the loss: a plaintiff $30\%$ responsible for their own injury recovers $70\%$ of assessed damages. Canada uses apportionment rather than the old bar to recovery.
- **The non-pecuniary cap.** Since the Supreme Court's 1978 trilogy, Canadian awards for pain and suffering are capped at an inflation-indexed ceiling (roughly $\$100{,}000$ in 1978 dollars). This is the structural reason Canadian bodily injury severities are far below American ones, and candidates should cite it whenever asked to compare the two systems.
- **Costs follow the event** in Canada: the losing party generally pays a portion of the winner's legal costs. This discourages weak claims and weak defences alike, and is another significant difference from the American rule.
- **Actuarial consequences:** tort claims are **long-tailed** (years from accident to resolution), **severity-driven**, and sensitive to judicial trend, so they carry the largest reserve uncertainty in a P&C book. Development patterns depend on court backlogs, limitation periods and settlement practice as much as on injury severity.
- Tort damages are reduced by [[Collateral Benefits]] already received, and future losses are converted to present value using court-prescribed or evidence-based discount rates.

> [!example]- Building a Bodily Injury Award {Example}
> A plaintiff aged $40$, earning $\$70{,}000$ per year, is permanently unable to work after a collision. The court assesses $25$ years of future income loss, $\$300{,}000$ of future care, and $\$180{,}000$ for pain and suffering. The plaintiff is found $20\%$ contributorily negligent. Accident benefits of $\$95{,}000$ have been paid for income replacement. Assume future losses are discounted at $2\%$ net of wage inflation.
>
> Compute the award.
>
> > [!answer]-
> > **Future income loss**, as an annuity-due-style present value at a net rate of $2\%$ over $25$ years:
> >
> > $$\begin{align*}
> > \text{PV} &= \$70{,}000 \times \frac{1 - 1.02^{-25}}{0.02} \\
> > &= \$70{,}000 \times 19.523 \\
> > &= \$1{,}366{,}610
> > \end{align*}$$
> >
> > **Gross damages:**
> >
> > $$\begin{align*}
> > \text{Total} &= \$1{,}366{,}610 + \$300{,}000 + \$180{,}000 \\
> > &= \$1{,}846{,}610
> > \end{align*}$$
> >
> > **Contributory negligence** of $20\%$:
> >
> > $$0.80 \times \$1{,}846{,}610 = \$1{,}477{,}288$$
> >
> > **Less collateral benefits** already paid for the same head of loss:
> >
> > $$\$1{,}477{,}288 - \$95{,}000 = \$1{,}382{,}288$$
> >
> > Observe where the money is: $74\%$ of the award is **future income loss**, a discounted annuity. That is why the prescribed discount rate is one of the most consequential numbers in the Canadian tort system, and why a $1\%$ change in it moves liability reserves far more than a change in claim frequency does.
