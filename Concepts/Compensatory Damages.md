---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a2c5e596552a9cb5c997f4842851dc26f8124c7e838dd6e1c45a84521e7d45dc
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
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Compensatory Damages.md
---

**Compensatory Damages** are the money a court awards to make an injured plaintiff whole, restoring as far as money can the position the plaintiff was in before the tort. They come in two parts: *special damages* for economic losses that can be calculated, and *general damages* for non-economic harm such as pain and suffering. They differ from punitive damages, which punish the defendant rather than compensate the plaintiff, and they are what a liability policy pays as "damages" on behalf of its insured.

> $$D = S + G$$

> $$S = M + W + E + P$$

> $$V = q \times (1 - p) \times D$$

- **Symbols:** $D$ is the total compensatory award, $S$ the special damages and $G$ the general damages. Within $S$, $M$ is medical expense, $W$ lost wages to date, $E$ the [[Present Value|present value]] of future losses such as future medical care and lost earning capacity, and $P$ property damage. In the claim value $V$, $q$ is the probability a jury finds the defendant liable and $p$ the plaintiff's share of fault, so $V$ is the expected award an adjuster weighs a settlement offer against.
- **Special (economic) damages:** These are losses with a market price, proved with bills, pay records and expert testimony. They include past and future medical expenses, lost wages, lost future earning capacity, property damage and, in a death claim, funeral costs and lost support. Future losses are projected and discounted to present value, so the discount rate and the assumed growth in wages and medical costs can move the award substantially.
- **General (non-economic) damages:** These compensate pain and suffering, emotional distress, disfigurement, loss of enjoyment of life and a spouse's loss of consortium. Nothing prices them, so they are left to the jury.
- **Punitive damages:** Punitive (or exemplary) damages are awarded on top of compensatory damages when the defendant's conduct was malicious, fraudulent or grossly reckless, to punish and deter. The U.S. Supreme Court has suggested that a ratio of punitive to compensatory damages above single digits will rarely satisfy due process (*State Farm v. Campbell*, 2003). Some states prohibit insuring punitive damages as a matter of public policy, so they may fall on the insured even when the compensatory award is covered.
- **Rules that shape the award:** The plaintiff must take reasonable steps to *mitigate* the loss, such as following medical advice, and cannot recover what reasonable mitigation would have avoided. Under the *collateral source rule* the award is traditionally not reduced by benefits the plaintiff received from other sources, such as health insurance, although many states have modified it. Comparative fault then reduces the award by the plaintiff's share, as on [[Negligence]].
- **Factors affecting liability claim valuation:** The factors that move $q$, $p$ or $D$ in the claim value are worked through, with the comparative fault rules and joint and several liability, on [[Liability Claim Valuation]].
- **Actuarial significance:** Because general damages and venue dominate the largest awards, rising jury awards show up as severity trend beyond economic inflation, the pattern discussed under [[Social Inflation]] and [[Nuclear Verdicts]]. Case reserves on open claims are set from these same valuation factors, so a shift in a venue's awards revalues claims already on the books.

> [!example]- Building a Bodily Injury Valuation {Example}
> A 40-year-old construction worker breaks his leg when the insured's truck runs a red light. His medical bills to date are \$38,000, his surgeon expects a further \$12,000 operation in two years, he lost six months' wages at \$5,000 a month, and the injury will reduce his earnings by \$8,000 a year for 20 years, paid at the end of each year. His car, a total loss, was worth \$9,000. The adjuster discounts future amounts at 4% a year and estimates general damages at three times the medical specials. A jury is expected to find him 25% at fault for speeding, in a pure comparative negligence state, and the adjuster puts the probability of a liability finding at 80%. Estimate the compensatory damages and the claim's value.
>
> > [!answer]-
> > Discount the future surgery and value the lost earning capacity as a 20-year [[Annuity Immediate|annuity-immediate]].
> > $$
> > \begin{align*}
> > \text{Future surgery} &= \frac{12{,}000}{1.04^{2}} \\
> > &= 11{,}095 \\
> > a_{\overline{20}|} &= \frac{1 - 1.04^{-20}}{0.04} \\
> > &= 13.5903 \\
> > \text{Earning capacity} &= 8{,}000 \times 13.5903 \\
> > &= 108{,}723
> > \end{align*}
> > $$
> > Add the special damages, then the general damages at three times the medical specials.
> > $$
> > \begin{align*}
> > S &= 38{,}000 + 11{,}095 + 30{,}000 \\
> > &\quad + 108{,}723 + 9{,}000 \\
> > &= 196{,}818 \\
> > G &= 3 \times (38{,}000 + 11{,}095) \\
> > &= 147{,}285 \\
> > D &= 196{,}818 + 147{,}285 \\
> > &= 344{,}103
> > \end{align*}
> > $$
> > Apply comparative fault and the probability of a liability finding.
> > $$
> > \begin{align*}
> > (1 - 0.25) \times 344{,}103 &= 258{,}077 \\
> > V &= 0.80 \times 258{,}077 \\
> > &= 206{,}462
> > \end{align*}
> > $$
> > A verdict for the claimant would be about \$258,000, and the claim is worth about \$206,000 before defence costs, the figure against which the insurer weighs a settlement offer and sets its [[Case Reserves|case reserve]].

> [!example]- Compensatory and Punitive in One Verdict {Example}
> A jury awards a plaintiff \$500,000 in compensatory damages and \$2,000,000 in punitive damages against a trucking company whose manager knowingly let a driver exceed his hours of service. The company's auto liability limit is \$1,000,000, and the state prohibits insurance of punitive damages assessed directly against a wrongdoer. What does the insurer pay, and is the punitive award in a range courts generally uphold?
>
> > [!answer]-
> > The insurer pays the compensatory award, which is within the limit. The punitive award is uninsurable in this state, so the company pays it from its own funds even though \$500,000 of limit is unused.
> > $$
> > \begin{align*}
> > \text{Insurer pays} &= \$500{,}000 \\
> > \frac{\text{Punitive}}{\text{Compensatory}} &= \frac{2{,}000{,}000}{500{,}000} \\
> > &= 4
> > \end{align*}
> > $$
> > A ratio of 4 to 1 is in the single digits that the Supreme Court has treated as generally consistent with due process, so the award is likely to stand. In a state that permits insuring punitive damages, the insurer would also pay \$500,000 of it, up to the remaining limit.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask whether a listed loss is special or general damages, how punitive damages differ from compensatory damages, or which factors raise or lower a liability claim's value. A calculation question may total a claimant's damages and reduce them for comparative fault.
> - **Claims handling:** The claim valuation factors appear where the syllabus covers common policy concepts, as the reasons two claims with the same injury settle for different amounts.

> [!warning]- Exam traps
> - **Special means economic:** Special damages are the calculable economic losses, and general damages are the non-economic ones. The names suggest the opposite to many candidates.
> - **Punitive damages aren't compensatory:** They are not part of making the plaintiff whole, they need conduct worse than ordinary negligence, and they may be uninsurable. Adding them into $D$ before applying comparative fault or the policy limit is a common error.
> - **Discount future losses:** A stream of future lost earnings is worth its present value at trial, not the simple sum of the payments. Summing \$8,000 for 20 years gives \$160,000 rather than about \$108,700.
> - **Collateral sources:** Under the traditional rule, health insurance payments to the plaintiff don't reduce the award. Check whether the question's state has modified the rule before deducting them.
