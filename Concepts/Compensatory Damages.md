---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0b7cd4decb6eb5cba73897376210c8ac76bfd773a642e437b42a33861ad46323
  sources:
    - "Cornell LII Wex, \"compensatory damages\", whole entry, sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages"
    - "Cornell LII Wex, \"special damages\", whole entry, sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages"
    - "Cornell LII Wex, \"general damages\", whole entry, sha256:73b3dfcd9c5034fa1de640407d282759b73b3c8dd99c158ba6bee25aec98467d — https://www.law.cornell.edu/wex/general_damages"
    - "Cornell LII Wex, \"damages\", whole entry, sha256:e169e41ceee2e8068b1c0589dfe44e28f80a5083629db8514471dd451912586d — https://www.law.cornell.edu/wex/damages"
    - "Cornell LII Wex, \"mitigation of damages\", whole entry, sha256:bbeb6c3bbe7435cfc3bdde7b4b9c37374d4021ec944f3544c3213d37b070ce4e — https://www.law.cornell.edu/wex/mitigation_of_damages"
    - "Cornell LII Wex, \"collateral source rule\", whole entry, sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule"
    - "Cornell LII Wex, \"loss of consortium\", whole entry, sha256:534bdcb801d6f77a49964d80edc3243aaf1ef9000140b8972bb1acb1da6c4a7f — https://www.law.cornell.edu/wex/loss_of_consortium"
    - "Cornell LII Wex, \"punitive damages\", whole entry, sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages"
    - "State Farm v. Campbell, 538 U.S. 408 (2003), syllabus via LII, syllabus point (2), sha256:1aa5960343fff7c168cb91204ea8295eab0b0edd9a87e3cc63b1eb3aad1853a8 — https://www.law.cornell.edu/supct/html/01-1289.ZS.html"
    - "PPG Industries v. Transamerica, 20 Cal. 4th 310 (1999) (Caselaw Access Project), public-policy discussion of insuring punitive damages, sha256:ef2c38bf2ecf125988034d0e1094372fb85140e3e5deb61d5912f8b7b556536d — https://static.case.law/cal-4th/20/cases/0310-01.json"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Compensatory Damages.md
---

**Compensatory Damages** are the money a court awards to make an injured plaintiff whole, restoring as far as money can the position the plaintiff was in before the tort. They come in two parts: *special damages* for economic losses that can be calculated, and *general damages* for non-economic harm such as pain and suffering. They are what a liability policy pays as "damages" on behalf of its insured.

The total compensatory award is

> $$D = S + G$$

- $S$ is the special damages.
- $G$ is the general damages.

## Special damages

Special (economic) damages are losses with a market price, proved with bills, pay records and expert testimony. They include past and future medical expenses, lost wages, lost future earning capacity, property damage and, in a death claim, funeral costs and lost support. In a bodily injury claim they are

> $$S = M + W + E + P$$

- $M$ is medical expense to date.
- $W$ is lost wages to date.
- $E$ is the [[Present Value|present value]] of future losses such as future medical care and lost earning capacity.
- $P$ is property damage.

Future losses are projected and discounted to present value, so the discount rate and the assumed growth in wages and medical costs can move the award substantially.

## General damages

General (non-economic) damages compensate pain and suffering, emotional distress, disfigurement, loss of enjoyment of life and a spouse's loss of consortium. Nothing prices them, so they are left to the jury.

## Rules that shape the award

The plaintiff must take reasonable steps to *mitigate* the loss, such as following medical advice, and cannot recover what reasonable mitigation would have avoided. Under the *collateral source rule* the award is traditionally not reduced by benefits the plaintiff received from other sources, such as health insurance, although many states have modified it. Comparative fault then reduces the award by the plaintiff's share, as on [[Negligence]].

An adjuster weighs a settlement offer against the expected award, the claim value

> $$V = q \times (1 - p) \times D$$

- $q$ is the probability a jury finds the defendant liable.
- $p$ is the plaintiff's share of fault.

The factors that move $q$, $p$ or $D$ are worked through on [[Liability Claim Valuation]].

> [!example]- What are this worker's compensatory damages, and what is the claim worth? {Example}
> A construction worker breaks his leg when the insured's truck runs a red light, in a pure comparative negligence state:
>
> | Item | Amount |
> | :--- | :--- |
> | Medical bills to date | \$38,000 |
> | Further operation in two years | \$12,000 |
> | Lost wages | six months at \$5,000 a month |
> | Reduced earnings | \$8,000 a year for 20 years, at each year's end |
> | His car, a total loss | \$9,000 |
>
> The adjuster discounts future amounts at 4% a year, estimates general damages at three times the medical specials, expects the jury to find him 25% at fault for speeding, and puts the probability of a liability finding at 80%.
>
> > [!answer]-
> > - The future surgery is worth $12{,}000 / 1.04^{2} = \$11{,}095$ today.
> > - The lost earning capacity is a 20-year [[Annuity Immediate|annuity-immediate]], with $a_{\overline{20}|} = (1 - 1.04^{-20})/0.04 = 13.5903$, so it is worth $8{,}000 \times 13.5903 = \$108{,}723$.
> > - The lost wages to date are $6 \times 5{,}000 = \$30{,}000$.
> > - The special damages are $38{,}000 + 11{,}095 + 30{,}000 + 108{,}723 + 9{,}000 \approx \$196{,}817$.
> > - The general damages are $3 \times (38{,}000 + 11{,}095) \approx \$147{,}284$.
> > - The compensatory damages are $D \approx \$344{,}101$.
> > - His 25% share of fault leaves a verdict of $0.75 \times 344{,}101 \approx \$258{,}076$.
> > - The claim value is $0.80 \times 258{,}076 \approx \$206{,}461$ before defence costs, the figure against which the insurer weighs a settlement offer and sets its [[Case Reserves|case reserve]].

## Punitive damages

Punitive (or exemplary) damages are awarded on top of compensatory damages when the defendant's conduct was malicious, fraudulent or grossly reckless, to punish and deter. They are not part of making the plaintiff whole. The U.S. Supreme Court has suggested that a ratio of punitive to compensatory damages above single digits will rarely satisfy due process (*State Farm v. Campbell*, 2003). Some states prohibit insuring punitive damages as a matter of public policy, so they may fall on the insured even when the compensatory award is covered.

> [!example]- What does the insurer pay on this verdict, and is the punitive award in a range courts generally uphold? {Example}
> A jury awards a plaintiff $\$500{,}000$ in compensatory damages and $\$2{,}000{,}000$ in punitive damages against a trucking company whose manager knowingly let a driver exceed his hours of service. The company's auto liability limit is $\$1{,}000{,}000$, and the state prohibits insurance of punitive damages assessed directly against a wrongdoer.
>
> > [!answer]-
> > - The insurer pays the $\$500{,}000$ compensatory award, which is within the limit.
> > - The punitive award is uninsurable in this state, so the company pays it from its own funds even though $\$500{,}000$ of limit is unused.
> > - The ratio of punitive to compensatory damages is $2{,}000{,}000 / 500{,}000 = 4$, in the single digits the Supreme Court has treated as generally consistent with due process, so the award is likely to stand.

> [!trap] Treating special damages as the non-economic ones
> Special damages are the calculable economic losses, and general damages are the non-economic ones. The names suggest the opposite to many candidates.
