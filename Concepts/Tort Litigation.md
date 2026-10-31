---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:60573c938f5e5aeb242177ac9ba18612d08ca771f538837e4dd6cfacf506ef9e
  sources:
    - "Davidson, The Cap on Non-Pecuniary General Damages (CAS Exam 6C reading), pp. 1-5 (the 1978 trilogy and the non-pecuniary cap), sha256:9b544951d4a031e08f3c40a9a30b552764f705bc09a7a6ea2af3d57e5907149f — https://www.casact.org/sites/default/files/2021-03/6C_Davidson.pdf"
    - "Cappelletti, Tort Law: Topics for General Insurance Actuaries (SOA study note, rev. May 2025), §3 p. 8 fn 11; §6 pp. 53-64 (loser pays in Canada, $100,000 trilogy cap indexed to inflation, U.S. noneconomic awards much greater), sha256:5316698581bb73d51dbcfb9a74ea92254fed6fc2b018253e2b26abc346ca2a6f — https://www.soa.org/globalassets/assets/files/edu/2025/fall/study-note/2025-11-gi-201-study-note-tort-law.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Tort Litigation.md
---

**Tort Litigation** is the civil action by which an injured person recovers damages from the person whose negligence caused the injury. It is the compensation mechanism that liability insurance responds to, and its cost, duration and unpredictability are the reason Canadian provinces have progressively replaced parts of it with [[No-Fault Insurance|no-fault]] benefits.

> $$\text{Damages} = \underbrace{\text{Pecuniary}}_{\text{income, care, cost}} + \underbrace{\text{Non-pecuniary}}_{\text{pain and suffering}}$$

- **What must be proved:** a duty of care, breach of the standard of care, causation, and damages. Failure on any element defeats the claim entirely.
- **Contributory negligence** apportions the loss: a plaintiff $30\%$ responsible for their own injury recovers $70\%$ of assessed damages. Canada uses apportionment.
- **The non-pecuniary cap.** Since the Supreme Court's 1978 trilogy, Canadian awards for pain and suffering are capped at an inflation-indexed ceiling (roughly $\$100{,}000$ in 1978 dollars). This is the structural reason Canadian bodily injury severities are far below American ones, and candidates should cite it whenever asked to compare the two systems.
- **Costs follow the event** in Canada: the losing party generally pays a portion of the winner's legal costs. This discourages weak claims and weak defences alike, and is another significant difference from the American rule.
- **Actuarial consequences:** tort claims are **long-tailed** (years from accident to resolution) and sensitive to judicial trend. Development patterns depend on court backlogs, limitation periods and settlement practice.
- Future losses are converted to present value using court-prescribed or evidence-based discount rates.

![[Media/Figures/Tort_Litigation.svg|340]]

> [!example]- Building a Bodily Injury Award {Example}
> A plaintiff aged $40$, earning $\$70{,}000$ per year, is permanently unable to work after a collision. The court assesses $25$ years of future income loss, $\$300{,}000$ of future care, and $\$180{,}000$ for pain and suffering. The plaintiff is found $20\%$ contributorily negligent. Accident benefits of $\$95{,}000$ have been paid for income replacement. Assume future losses are discounted at $2\%$ net of wage inflation.
>
> Compute the award.
>
> > [!answer]-
> > **Future income loss**, as a present value at a net rate of $2\%$ over $25$ years:
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
> > Observe where the money is: $74\%$ of the award is **future income loss**, a discounted annuity.
