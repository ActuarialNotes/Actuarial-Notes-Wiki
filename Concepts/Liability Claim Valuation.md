---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:df550391df0b027cab2623cc6da722df033ea171e3ceee313b6a2f3349359169
  sources:
    - "Cornell LII Wex, 'comparative negligence' (fetched 2026-10-10), sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence"
    - "Cornell LII Wex, 'contributory negligence' (fetched 2026-10-10), sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence"
    - "Cornell LII Wex, 'joint and several liability' (fetched 2026-10-10), sha256:907bf1f785eab437a0b3da0331f065d205461aad65c49955408c9687146bdf55 — https://www.law.cornell.edu/wex/joint_and_several_liability"
    - "Cornell LII Wex, 'liability' (fetched 2026-10-10), sha256:5e5133629e30514829c097894862e195692f293ec1d6328976c8c51f9299084b — https://www.law.cornell.edu/wex/liability"
    - "Cornell LII Wex, 'special damages' (fetched 2026-10-10), sha256:50a0d567faf8e938120a8709acd04442ee0437f98dc5e175332ffb6f96c4f848 — https://www.law.cornell.edu/wex/special_damages"
    - "Cornell LII Wex, 'general damages' (fetched 2026-10-10), sha256:73b3dfcd9c5034fa1de640407d282759b73b3c8dd99c158ba6bee25aec98467d — https://www.law.cornell.edu/wex/general_damages"
    - "Cornell LII Wex, 'pain and suffering' (fetched 2026-10-10), sha256:8bebda58f72744ca76736c295defa015303743f52b27e54eb56af05443504a8f — https://www.law.cornell.edu/wex/pain_and_suffering"
    - "Cornell LII Wex, 'compensatory damages' (fetched 2026-10-10), sha256:92774229ad1d9384ec8fcb5661d421edc88df5736e2e901f042c3cf93c07a4d5 — https://www.law.cornell.edu/wex/compensatory_damages"
    - "Cornell LII Wex, 'punitive damages' (fetched 2026-10-10), sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages"
    - "Cornell LII Wex, 'collateral source rule' (fetched 2026-10-10), sha256:68039d6a72a6692b38df2497943d4749ae907b17351045a558d3eb2577fc71c6 — https://www.law.cornell.edu/wex/collateral_source_rule"
    - "Cornell LII Wex, 'mitigation of damages' (fetched 2026-10-10), sha256:bbeb6c3bbe7435cfc3bdde7b4b9c37374d4021ec944f3544c3213d37b070ce4e — https://www.law.cornell.edu/wex/mitigation_of_damages"
    - "Cornell LII Wex, 'venue' (fetched 2026-10-10), sha256:e5b2203bc173822a183dbf32b045ef06fad619404c8cbf8f6e99b9e033e92881 — https://www.law.cornell.edu/wex/venue"
    - "NAIC, Insurance Topics: Social Inflation (Last Updated 12/19/2025), read via WebFetch 2026-10-10 (host refuses scripted fetch, no digest) — https://content.naic.org/insurance-topics/social-inflation"
    - "ISO CG 00 01 04 13, Commercial General Liability Coverage Form (Cooper & Scully copy), Coverage A 1.a(2); Supplementary Payments 1.a-g (pp.1, 8-9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Liability Claim Valuation.md
---

**Liability Claim Valuation** is estimating what a third-party liability claim is worth: the amount the insured is likely to be found legally obligated to pay, and the cost to the insurer of resolving it. The expected compensatory award, $V$, is

> $$V = q \times W(p) \times (S + G)$$

- $q$ is the probability the insured is found liable.
- $W(p)$ is the share of damages the claimant can recover when the claimant's own share of fault is $p$.
- $S$ is the claimant's special damages and $G$ the general damages.

The value turns on whether and how far the insured is liable, the rules the jurisdiction applies to shared fault and multiple defendants, the claimant's [[Compensatory Damages|compensatory damages]], any [[Punitive Damages|punitive damages]], who the claimant is and where the case would be tried, the cost of defense, and the policy limits.

## Liability

A claim has value only if the insured is legally responsible. For most claims that means proving [[Negligence|negligence]]: duty, breach, causation and damages. Clear liability raises $q$. Disputed facts, a good defense or weak evidence lower it.

## Comparative and contributory negligence

Under comparative negligence the court assigns each party a percentage of fault and reduces the plaintiff's recovery by the plaintiff's own share. With a bar $b$ set by the jurisdiction, the share the claimant recovers is

> $$W(p) = \begin{cases} 1 - p, & p < b \\ 0, & p \geq b \end{cases}$$

- $b$ is the claimant's share of fault at which recovery is barred.

The jurisdictions follow one of three rules:

1. Under **pure** comparative negligence, followed by almost a third of states including California, Florida and New York, a plaintiff 99% at fault still recovers 1%. In effect $b = 1$.
2. Under **modified** comparative negligence, followed by most states, recovery is barred at 50% or more fault under one version ($b = 0.50$) and at 51% or more under the other ($b = 0.51$).
3. Alabama, Maryland, North Carolina, Virginia and the District of Columbia still apply **contributory negligence**, under which a plaintiff who contributed at all recovers nothing. Then $W(p) = 0$ for every $p > 0$.

> [!example]- What can this pedestrian recover in each kind of state? {Example}
> A pedestrian sues the insured driver for a \$200,000 injury: \$80,000 of special damages and \$120,000 of general damages. A jury would find both equally at fault, 50% each, and liability is otherwise clear. The states are a pure comparative negligence state, a modified state with a 50% bar, a modified state with a 51% bar and a contributory negligence state.
>
> > [!answer]-
> > - Under pure comparative negligence the pedestrian recovers $(1 - 0.50) \times \$200{,}000 = \$100{,}000$.
> > - Under the 50% bar, $p = 0.50$ reaches the bar, so the pedestrian recovers nothing.
> > - Under the 51% bar, $p = 0.50$ is below the bar, so the pedestrian recovers $\$100{,}000$.
> > - Under contributory negligence any fault bars recovery, so the pedestrian recovers nothing.
> > - The same accident is worth \$100,000 or nothing depending on the state, so the rule must be known before any figure for damages matters.

## Joint and several liability

Where defendants are jointly and severally liable, the plaintiff can collect the whole judgment from any one of them, who must then seek contribution from the others and bears the loss if they cannot pay. In a state with several liability only, each defendant pays only its own share. An insured co-defendant in a joint and several state can therefore be worth far more to the claimant than its share of fault ([[Joint and Several Liability]]).

> [!example]- How much can the plaintiff collect from this insured under each rule? {Example}
> A plaintiff wins \$600,000 against two defendants. The jury assigns 30% of the fault to the insured and 70% to a co-defendant who has no insurance and no assets. The rules are joint and several liability and several liability only.
>
> > [!answer]-
> > - Under joint and several liability the plaintiff can collect the whole \$600,000 from the insured, who is left to seek contribution from a co-defendant who cannot pay.
> > - Under several liability only, the insured pays its own share, $0.30 \times \$600{,}000 = \$180{,}000$.
> > - The insured's share of fault is the same in both states, and the joint and several rule more than triples what the claim is worth against it.

## Damages

1. **Special damages** can actually be ascertained, such as medical expenses or the cost of repairing a dented car.
2. **General damages** have no set monetary cost, such as pain and suffering, the physical discomfort and emotional distress that accompany an injury, which are noneconomic damages.
3. **Punitive damages** are awarded in addition to compensatory damages when the defendant's conduct was particularly harmful, for example an intentional tort or wanton and willful misconduct. They punish rather than compensate, so they are not part of $S + G$, and whether a liability policy pays them depends on the policy and on the law that applies to it.

Courts measuring compensatory damages look at the market value of damaged property, lost wages and necessarily incurred expenses. They may include emotional distress, though its application is inconsistent because it is hard to price.

Two rules adjust the award. The claimant cannot recover damages that reasonable efforts would have avoided (mitigation). Under the **collateral source rule**, damages are generally not reduced by compensation the claimant received from others, such as health insurance or workers compensation, and the defendant may not tell the jury about it, though there are exceptions.

## The claimant and the jurisdiction

Venue, the place of trial, is set by statute, and a claim can often be brought in more than one place. The NAIC notes that the demographic makeup of jury pools, public distrust of large corporations, and social media and legal marketing can all influence jury verdicts and awards. It also notes that third-party litigation funding lets investors finance plaintiffs' suits for a share of the settlement. Verdicts above \$10 million are called [[Nuclear Verdicts|nuclear verdicts]], and claim costs rising faster than general inflation for these reasons are [[Social Inflation|social inflation]].

## Defense costs and policy limits

When the claim is settled or tried for $V_{\text{settled}}$, the insurer's cost is

> $$\text{Insurer cost} = \min(V_{\text{settled}},\ C) + \text{Defense}$$

- $C$ is the policy limit.
- $\text{Defense}$ is the cost of defending the claim, which under a [[Commercial General Liability|CGL]] policy is paid in addition to the limit.

Under the ISO CGL form (CG 00 01 04 13), the insurer's own claim expenses, certain bond costs, the insured's reasonable expenses at the insurer's request, court costs and interest are supplementary payments that do not reduce the limits ([[CGL Supplementary Payments]]). Damages are paid only up to the limit, and the duty to defend ends when the limit is used up in judgments or settlements. A claim worth more than the limit leaves the excess with the insured, or with an [[Umbrella Liability Insurance|umbrella policy]].

> [!example]- What are this claim's expected value and the insurer's and the store's costs? {Example}
> A customer injured at the insured's store sues. The adjuster estimates special damages of \$300,000 and general damages of \$500,000, a 90% chance the store is found liable, and no fault on the customer's part. The CGL policy has a \$500,000 each occurrence limit, and defense through trial is expected to cost \$120,000. The case is tried and the jury awards the full damages.
>
> > [!answer]-
> > - With no fault on the customer's part, $W(0) = 1$.
> > - The expected value is $V = 0.90 \times 1 \times (\$300{,}000 + \$500{,}000) = \$720{,}000$.
> > - At trial the award is \$800,000, so the insurer pays $\min(\$800{,}000,\ \$500{,}000) + \$120{,}000 = \$620{,}000$.
> > - The defense costs are a supplementary payment, paid in addition to the limit, so they do not reduce the \$500,000 available for damages.
> > - The store bears the \$300,000 of the award above the limit.
> > - The expected value of \$720,000 already exceeds the limit, so even a settlement at that value would leave the store with part of the cost.

> [!trap] Mixing up the 50% and 51% bars
> At exactly 50% fault the bar matters. A plaintiff 50% at fault recovers half in a 51% bar state but nothing in a 50% bar state.
