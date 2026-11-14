---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ff348d9c76c2826c67c0abdd439a5082b087f1897f747f6f403fc06bf609da60
  sources:
    - "Cornell LII Wex, \"contributory negligence\", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence"
    - "Cornell LII Wex, \"comparative negligence\", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence"
    - "Cornell LII Wex, \"last clear chance\", whole entry, sha256:d75968f2adf4d2ba5f99c9f140845273ed20c5655d7e459ea49845078d08c7ae — https://www.law.cornell.edu/wex/last_clear_chance"
    - "Cornell LII Wex, \"assumption of risk\", whole entry, sha256:7d1a8b51f5c9e813c2400cea1e0f97d008b86d4774b3df78c8d3547bb1213a05 — https://www.law.cornell.edu/wex/assumption_of_risk"
    - "Cornell LII Wex, \"sovereign immunity\", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity"
    - "Cornell LII Wex, \"statute of limitations\", whole entry, sha256:204224ba9aaf2d0435a55bfcbda5d125a170752530f15e50677a921839782bf9 — https://www.law.cornell.edu/wex/statute_of_limitations"
    - "Cornell LII Wex, \"statute of repose\", whole entry, sha256:6ae5fa0e18758b179bab831e21ebce635107ea0b903c83fd73203f03e21a4305 — https://www.law.cornell.edu/wex/statute_of_repose"
    - "CTS Corp. v. Waldburger, 573 U.S. 1 (2014), via LII, opinion Part II-A, sha256:30cdfdc9b2ea45f8b22dcd057cefa53457c2de03c06a56fc95ae8f3182caab7c — https://www.law.cornell.edu/supremecourt/text/13-339"
    - "Picher v. Roman Catholic Bishop of Portland, 2009 ME 67 (Me. SJC), paras 12-17 (Restatement s.895E; Prosser & Keeton), read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://caselaw.findlaw.com/court/me-supreme-judicial-court/1010006.html"
    - "IRMI Glossary, \"charitable immunity\", whole entry, sha256:47ebf562ed2ec4097fd4bc0536f6cab0fdaf2f5a419d9b0f82903cbf112fe6c1 — https://www.irmi.com/term/insurance-definitions/charitable-immunity"
    - "Wikipedia, \"Charitable immunity\" (rank 3), lead, sha256:c5c858f200396511907d662f8c47c5fade366dea21cdf8cffb637848e3235084 — https://en.wikipedia.org/wiki/Charitable_immunity"
    - "Heino v. Harper, 306 Or. 347 (1988) (Caselaw Access Project), Restatement s.895F discussion, sha256:da9c72437d9d8a0b53f37086f9e6e6a6d03bea17d44f218c15ac0d68f4a76e5c — https://static.case.law/or/306/cases/0347-01.json"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Defenses Against Negligence.md
---

**Defenses Against Negligence** are the grounds on which a defendant who is otherwise liable in [[Negligence|negligence]] avoids or reduces paying damages. They are state law, so the same accident can be worth the full damages, a reduced amount or nothing depending on where it happened.

The defenses fall in three groups:

1. The plaintiff's own conduct: contributory negligence, comparative negligence and assumption of risk.
2. The defendant's status: sovereign, charitable and interspousal immunity.
3. Time: statutes of limitations and statutes of repose.

Each defense changes what a [[Liability Insurance|liability insurer]] pays on its insured's behalf.

## Contributory negligence

The common law rule bars a plaintiff who was negligent in causing their own harm from recovering anything, so a plaintiff 1% at fault recovers nothing from a defendant 99% at fault. Its advantage is that a court need not measure shares of blame, and its drawback is outcomes many see as unfair. It survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia.

Courts softened the contributory negligence bar with the doctrine of *last clear chance*: a negligent plaintiff can still recover if the defendant had the last opportunity to avoid the accident and failed to take it. In *Davies v. Mann* the plaintiff negligently left a donkey tied by a road, and recovered from a defendant who drove into it at speed, because the defendant had the last clear chance. A defendant can also argue that it was the plaintiff who had the last clear chance.

## Comparative negligence

Most states replaced the bar with comparative negligence, which reduces the award by the plaintiff's share of fault. Under *pure* comparative negligence, followed in roughly a third of the states including California and New York, a plaintiff 99% at fault still recovers 1% of the damages. A plaintiff who proves damages $D$ and bears a share $p$ of the fault recovers

> $$R = (1 - p)\,D$$

Under *modified* comparative negligence, the majority approach, the plaintiff recovers the reduced amount only below a threshold: under the 50% bar rule a plaintiff 50% or more at fault recovers nothing, and under the 51% bar rule only a plaintiff 51% or more at fault is barred. The recovery is

> $$R = \begin{cases} (1 - p)\,D & p < b \\ 0 & p \geq b \end{cases}$$

- $b$ is the bar, 50% or 51%.

> [!example]- What does the cyclist recover under pure comparative negligence, each bar rule and contributory negligence? {Example}
> A cyclist riding at night without a light is struck by a driver who was speeding. Her damages are $\$400{,}000$. The jury finds her 30% at fault for riding without a light and a further 20% at fault for knowingly riding in a closed construction zone, a secondary assumption of risk that the state folds into comparative fault. In the contributory negligence state, what changes if the driver saw her in time to stop but was looking at a phone?
>
> > [!answer]-
> > - Her combined share of fault is $p = 0.30 + 0.20 = 0.50$.
> > - Under pure comparative negligence she recovers $(1 - 0.50) \times 400{,}000 = \$200{,}000$.
> > - At exactly 50% fault the plaintiff is barred under the 50% bar rule and recovers half under the 51% bar rule, so she recovers nothing under the first and $\$200{,}000$ under the second.
> > - Under contributory negligence any fault bars her, so she recovers nothing.
> > - If the driver had the last clear chance to avoid her and failed to take it, the contributory negligence bar is lifted and the driver's insurer pays the full $\$400{,}000$.

## Assumption of risk

A plaintiff who voluntarily accepts a known risk may be unable to recover for harm from it. The forms are:

1. *Express* assumption, usually a signed waiver, enforced within its terms unless it is against public policy.
2. *Implied* assumption, which requires that the plaintiff knew and appreciated the risk:
   - *Primary* implied assumption means the defendant owed no duty at all against risks inherent in the activity, such as contact in a sport, so it remains a complete bar.
   - *Secondary* implied assumption, where the defendant did owe and breach a duty, is folded into comparative negligence in many states, reducing rather than barring recovery.

> [!example]- Which defense does each defendant raise? {Example}
> - (a) A skydiving school is sued by a customer hurt on a jump, who signed a release of the school's liability for the jump's ordinary risks.
> - (b) A baseball club is sued by a fan hit by a foul ball in the stands.
>
> > [!answer]-
> > - (a) Express assumption of risk. The signed release bars recovery within its terms, unless a court finds it against public policy.
> > - (b) Primary implied assumption of risk. Being hit by a ball is inherent in watching the game, so the club owed no duty against it and the fan's claim fails, not merely shrinks.

## Immunities

*Sovereign immunity* means a government cannot be sued without its consent. The federal government waived it for many tort claims in the Federal Tort Claims Act, and states may waive theirs in whole or in part. A claim outside the terms of a waiver is barred.

*Charitable immunity* once shielded charities from tort suits, but virtually every state with decisions on it has rejected complete charitable immunity or limited it. *Interspousal immunity*, which barred spouses from suing each other, has been abrogated or modified in many states, and very few still recognize it.

## Statutes of limitations and repose

A limitations statute bars a claim filed too long after it accrues. For personal injury the claim accrues when the injury occurred or was discovered, or when it should reasonably have been discovered, and the period varies by state and by type of claim. Equitable tolling can pause the clock when a diligent plaintiff is prevented from suing by extraordinary circumstances.

A repose statute runs from the defendant's last culpable act, such as designing or manufacturing a product, not from the injury. It can bar a claim before the plaintiff is even hurt, and its period is fixed: it is not extended by tolling or estoppel. It reflects a legislative judgment that a defendant should be free of liability after a set time, which is why it matters most for long-tail exposures such as [[Products Liability|products]].

> [!example]- Is this consumer's suit against the heater manufacturer timely? {Example}
> A state has a three-year statute of limitations for personal injury, running from discovery, and a ten-year statute of repose for products, running from the manufacturer's last act. A consumer is injured by a heater 8 years after the manufacturer last modified it, discovers the cause of her illness 2 years after the injury, and sues 1 year after that. A court finds she was diligent and was misled about the cause, which would justify equitable tolling.
>
> > [!answer]-
> > - She sues 1 year after discovery, well inside the 3-year limitations period, so the statute of limitations is met.
> > - She sues $8 + 2 + 1 = 11$ years after the manufacturer's last act, a year after the 10-year repose period expired.
> > - A repose period is not extended by tolling or by when the injury was discovered.
> > - Both time limits must be met, so the claim fails.

> [!trap] Mixing up the 50% and 51% bar rules
> At exactly 50% fault the plaintiff recovers nothing under the 50% bar rule and half the damages under the 51% bar rule. Swapping the two flips the answer.
