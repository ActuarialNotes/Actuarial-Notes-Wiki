**Liability Claim Valuation** is estimating what a third-party liability claim is worth: the amount the insured is likely to be found legally obligated to pay, and the cost to the insurer of resolving it. The value turns on whether and how far the insured is liable, which rules the jurisdiction applies to shared fault and multiple defendants, the claimant's [[Compensatory Damages|compensatory damages]], special and general, any [[Punitive Damages|punitive damages]], who the claimant is and where the case would be tried, the cost of defense, and the policy limits.

> $$V = q \times W(p) \times (S + G)$$

> $$W(p) = \begin{cases} 1 - p, & p < b \\ 0, & p \geq b \end{cases}$$

> $$\text{Insurer cost} = \min(V_{\text{settled}},\ C) + \text{Defense}$$

- **Symbols:** $V$ is the expected compensatory award, $q$ the probability the insured is found liable, $p$ the claimant's share of fault and $b$ the bar the jurisdiction sets, so $W(p)$ is the share of damages the claimant can recover. $S$ is special damages and $G$ general damages. $C$ is the policy limit and Defense the cost of defending the claim, which under a [[Commercial General Liability|CGL]] policy is paid in addition to the limit. A pure comparative negligence state has $b = 1$ in effect, and a contributory negligence state $b = 0$, where any fault bars recovery.
- **Liability:** A claim has value only if the insured is legally responsible, which for most claims means proving [[Negligence|negligence]]: duty, breach, causation and damages. Clear liability raises $q$; disputed facts, a good defense or weak evidence lower it.
- **Comparative fault:** Under comparative negligence the court assigns each party a percentage of fault and reduces the plaintiff's recovery by the plaintiff's own share. Under **pure** comparative negligence, followed by almost a third of states including California, Florida and New York, a plaintiff 99% at fault still recovers 1%. Under **modified** comparative negligence, followed by most states, recovery is barred at 50% or more fault under one version and at 51% or more under the other. Alabama, Maryland, North Carolina, Virginia and the District of Columbia still apply **contributory negligence**, under which a plaintiff who contributed at all recovers nothing.
- **Several defendants:** Where defendants are jointly and severally liable, the plaintiff can collect the whole judgment from any one of them, who must then seek contribution from the others and bears the loss if they cannot pay. In a state with several liability only, each defendant pays only its own share. An insured co-defendant in a joint and several state can therefore be worth far more to the claimant than its share of fault ([[Joint and Several Liability]]).
- **Special and general damages:** Special damages can actually be ascertained, such as medical expenses or the cost of repairing a dented car. General damages have no set monetary cost, such as pain and suffering, the physical discomfort and emotional distress that accompany an injury, which are noneconomic damages. Courts measuring compensatory damages look at the market value of damaged property, lost wages and necessarily incurred expenses, and may include emotional distress, though its application is inconsistent because it is hard to price.
- **Punitive damages:** Punitive damages are awarded in addition to compensatory damages when the defendant's conduct was particularly harmful, for example an intentional tort or wanton and willful misconduct. They punish rather than compensate, so they are not part of $S + G$, and whether a liability policy pays them depends on the policy and on the law that applies to it.
- **Rules that adjust the award:** The claimant cannot recover damages that reasonable efforts would have avoided (mitigation). Under the **collateral source rule**, damages are generally not reduced by compensation the claimant received from others, such as health insurance or workers compensation, and the defendant may not tell the jury about it, though there are exceptions ([[Collateral Benefits]]).
- **The claimant and the jurisdiction:** Venue, the place of trial, is set by statute, and a claim can often be brought in more than one place. The NAIC notes that the demographic makeup of jury pools, public distrust of large corporations, and social media and legal marketing can all influence jury verdicts and awards, and that third-party litigation funding lets investors finance plaintiffs' suits for a share of the settlement. Verdicts above \$10 million are called [[Nuclear Verdicts|nuclear verdicts]], and claim costs rising faster than general inflation for these reasons are [[Social Inflation|social inflation]].
- **Defense costs and limits:** Under the ISO CGL form (CG 00 01 04 13), the insurer's own claim expenses, certain bond costs, the insured's reasonable expenses at the insurer's request, court costs and interest are supplementary payments that do not reduce the limits ([[CGL Supplementary Payments]]). Damages are paid only up to the limit, and the duty to defend ends when the limit is used up in judgments or settlements. A claim worth more than the limit leaves the excess with the insured, or with an [[Umbrella Liability Insurance|umbrella policy]].

> [!example]- One Injury in Four Kinds of State {Example}
> A pedestrian sues the insured driver for a \$200,000 injury: \$80,000 of special damages and \$120,000 of general damages. A jury would find both equally at fault, 50% each, and liability is otherwise clear. What can the pedestrian recover in a pure comparative negligence state, a modified state with a 50% bar, a modified state with a 51% bar, and a contributory negligence state?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Pure: } (1 - 0.50) \times 200{,}000 &= 100{,}000 \\
> > \text{50\% bar } (p \geq 0.50) &= 0 \\
> > \text{51\% bar } (p < 0.51) &= 100{,}000 \\
> > \text{Contributory} &= 0
> > \end{align*}
> > $$
> > The same accident is worth \$100,000 or nothing depending on the state. A claims professional valuing it has to know which rule the jurisdiction follows before any figure for damages matters.

> [!example]- Valuing a Claim Against a CGL Policy {Example}
> A customer injured at the insured's store sues. The adjuster estimates special damages of \$300,000 and general damages of \$500,000, a 90% chance the store is found liable, and no fault on the customer's part. The CGL policy has a \$500,000 each occurrence limit, and defense through trial is expected to cost \$120,000. Estimate the claim's expected value, and the insurer's and the store's costs if the case is tried and the jury awards the full damages.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > V &= 0.90 \times 1 \times (300{,}000 + 500{,}000) \\
> > &= 720{,}000 \\
> > \text{Insurer cost} &= \min(800{,}000,\ 500{,}000) + 120{,}000 \\
> > &= 620{,}000
> > \end{align*}
> > $$
> > The store bears the \$300,000 of the award above the limit. The defense costs are a supplementary payment, paid in addition to the limit, so they do not reduce the \$500,000 available for damages. The expected value of \$720,000 already exceeds the limit, so even a settlement at the claim's expected value would leave the store with part of the cost.

> [!example]- An Insolvent Co-Defendant {Example}
> A plaintiff wins \$600,000 against two defendants. The jury assigns 30% of the fault to the insured and 70% to a co-defendant who has no insurance and no assets. How much can the plaintiff collect from the insured in a joint and several liability state, and in a state with several liability only?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Joint and several} &= 600{,}000 \\
> > \text{Several only} &= 0.30 \times 600{,}000 \\
> > &= 180{,}000
> > \end{align*}
> > $$
> > Under joint and several liability the insured can be made to pay the whole judgment and is left to seek contribution from a co-defendant who cannot pay. The insured's share of fault is the same in both states; the jurisdiction's rule triples what the claim is worth against it.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is the factors affecting liability claim valuation. Expect a scenario describing a claim, its injuries, the parties' fault, the state and the policy, and a question asking which factor would raise or lower its value, or what the claimant would recover.
> - **Calculations:** Short calculations reduce damages for comparative fault under a named rule, or split a judgment under joint and several liability, and compare the result with the policy limit.
> - **Linked pages:** Damages are classified on [[Compensatory Damages]] and the elements of negligence on [[Negligence]]; this objective asks how they combine into a value.

> [!warning]- Exam traps
> - **The bar matters at exactly 50%:** A plaintiff 50% at fault recovers half in a 51% bar state but nothing in a 50% bar state.
> - **Special does not mean unusual:** Special damages are the ascertainable economic losses; general damages, such as pain and suffering, have no set price.
> - **Punitive damages are separate:** They are not part of the compensatory award to be reduced for fault or compared with medical specials, and they may not be covered.
> - **Defense is outside the CGL limit:** Supplementary payments do not erode the limit, but the duty to defend ends once the limit is paid out in judgments or settlements.
> - **Collateral sources usually stay in:** Under the collateral source rule the award is generally not reduced for the claimant's own health insurance, subject to exceptions.
