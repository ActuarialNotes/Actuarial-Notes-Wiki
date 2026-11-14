---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0383f8b50cf4f767cc524a62b9ec5342cd23624f17a6af0b373320e3c96116cb
  sources:
    - "Cornell LII Wex, \"negligence\", whole entry, sha256:83fcfd0343f79398b5caeca4fa538f5e938906edbbbbd01840c24b5988fa3ef5 — https://www.law.cornell.edu/wex/negligence"
    - "Cornell LII Wex, \"comparative negligence\", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence"
    - "Cornell LII Wex, \"contributory negligence\", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence"
    - "Cornell LII Wex, \"last clear chance\", whole entry, sha256:d75968f2adf4d2ba5f99c9f140845273ed20c5655d7e459ea49845078d08c7ae — https://www.law.cornell.edu/wex/last_clear_chance"
    - "Cornell LII Wex, \"assumption of risk\", whole entry, sha256:7d1a8b51f5c9e813c2400cea1e0f97d008b86d4774b3df78c8d3547bb1213a05 — https://www.law.cornell.edu/wex/assumption_of_risk"
    - "Cornell LII Wex, \"reasonable person\", whole entry, sha256:95fd7d2cb35ece8b94eb180ce801dd3c766ed37fcc5f3fa9b2af748750757aea — https://www.law.cornell.edu/wex/reasonable_person"
    - "Cornell LII Wex, \"negligence per se\", whole entry, sha256:39f6a834b3b01a847a3115bf669f8b689041362fca9cbd71ff55e378cff8ed28 — https://www.law.cornell.edu/wex/negligence_per_se"
    - "Cornell LII Wex, \"res ipsa loquitur\", whole entry, sha256:b24e2995dd0ac2e041e444044aa9f45d994083ccaa65eb1bd71615e560688f7a — https://www.law.cornell.edu/wex/res_ipsa_loquitur"
    - "Cornell LII Wex, \"malpractice\", whole entry, sha256:9bc11df876168536a7a5d22b872e5123c74373d81e0dda0b4d5cd36c9d893b4d — https://www.law.cornell.edu/wex/malpractice"
    - "Cornell LII Wex, \"statute of limitations\", whole entry, sha256:204224ba9aaf2d0435a55bfcbda5d125a170752530f15e50677a921839782bf9 — https://www.law.cornell.edu/wex/statute_of_limitations"
    - "Cornell LII Wex, \"statute of repose\", whole entry, sha256:6ae5fa0e18758b179bab831e21ebce635107ea0b903c83fd73203f03e21a4305 — https://www.law.cornell.edu/wex/statute_of_repose"
    - "Cornell LII Wex, \"sovereign immunity\", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity"
    - "Cornell LII Wex, \"punitive damages\", whole entry, sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages"
    - "United States v. Carroll Towing Co., 159 F.2d 169 (2d Cir. 1947) (Caselaw Access Project), Hand formula passage, sha256:2c13a0d99f6fad58ed353a70bc9d5c8d4d4f9d9be29526c74fa6b48d58681ef6 — https://static.case.law/f2d/159/cases/0169-01.json"
    - "CTS Corp. v. Waldburger, 573 U.S. 1 (2014), via LII, opinion Part II-A, sha256:30cdfdc9b2ea45f8b22dcd057cefa53457c2de03c06a56fc95ae8f3182caab7c — https://www.law.cornell.edu/supremecourt/text/13-339"
    - "ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), s.V def. 13 \"occurrence\"; s.I Coverage A exclusion 2.a, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Negligence.md
---

**Negligence** is the failure to use the care that a reasonably prudent person would use in the same circumstances, and the [[Tort Law|tort]] that makes a person liable for the harm that failure causes. It is the basis of most claims under auto, premises and [[Professional Liability Insurance|professional liability]] policies.

A plaintiff wins a negligence suit only by proving four elements: the defendant owed a duty, breached it, the breach caused the harm, and the plaintiff suffered actual damages.

1. **Duty**: a legal obligation to act toward others with reasonable care.
2. **Breach**: conduct that falls below that standard of care.
3. **Causation**: the breach is both the actual cause and the proximate cause of the harm.
4. **Damages**: actual harm to the plaintiff.

Where fault is not required at all, the claim is one of [[Strict Liability|strict liability]] instead.

## Duty

A duty arises from a relationship (carrier and passenger, landowner and visitor), from a statute, or from conduct that creates a risk to others. The common law generally imposes no duty to rescue a stranger, so a bystander who does nothing is not negligent. One who begins a rescue must carry it out with reasonable care.

## Breach and the reasonable person

The standard is objective. A defendant is measured against a hypothetical reasonably prudent person, not against their own best effort. A professional is held to the skill of a reasonable member of the profession, and a child to the care of a child of like age, intelligence and experience.

Violating a safety statute meant to protect the plaintiff's class from the harm that occurred is *negligence per se* in many states. *Res ipsa loquitur* lets a jury infer breach when the accident ordinarily doesn't happen without negligence and the cause was under the defendant's exclusive control.

The "Learned Hand" test from *United States v. Carroll Towing* (1947) finds a breach when the precaution not taken would have cost less than the harm it prevents, that is, when

> $$B < P \times L$$

- $B$ is the burden of the precaution the defendant didn't take.
- $P$ is the probability of harm without it.
- $L$ is the size of the loss if harm occurs.

> [!example]- Was this store's decision to stop its floor checks a breach, and are the other elements met? {Example}
> A grocery store stopped its hourly floor inspections, which cost \$40 a day in staff time. Without them, illustrative store data show a 0.2% chance on any given day that a customer slips on an unnoticed spill, and the average injury costs \$25,000. A customer slips on a spill that had been on the floor for three hours.
>
> > [!answer]-
> > - The expected daily loss the inspections prevent is $P \times L = 0.002 \times \$25{,}000 = \$50$.
> > - The daily burden is $B = \$40 < \$50$, so a reasonable store would have kept inspecting, and stopping was a breach.
> > - The store owed the customer, an invitee, a duty to keep the floor reasonably safe ([[Premises Liability]]).
> > - An hourly check would have found a spill left for three hours, so the breach is the actual cause.
> > - A slip is the foreseeable result of a spill, so the breach is also the proximate cause.
> > - The customer's injury supplies the damages, so all four elements are met.

## Causation

The breach must be the *actual cause* of the harm, usually tested by "but for the breach, would the harm have occurred?" It must also be the *proximate cause*, meaning the harm was a foreseeable result with no superseding cause breaking the chain. A defendant who left a ladder in a hallway is a proximate cause of the trip over it, but not of a fire an arsonist later set.

## Damages

Negligence requires actual harm, so a near miss with no injury is not actionable. What the plaintiff recovers is measured as [[Compensatory Damages]]. Punitive damages are rare, because ordinary negligence is not the reckless or malicious conduct they punish.

## Comparative and contributory negligence

Under pure *contributory negligence*, any fault of the plaintiff bars recovery, a rule that survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia. The *last clear chance* doctrine softens it where the defendant could still have avoided the accident.

Every other state uses *comparative negligence*, which reduces the award by the plaintiff's share of fault, either in full (pure) or until the plaintiff reaches the bar $t$ (modified). Under pure comparative negligence the recovery is

> $$R_{\text{pure}} = (1-p)\,D$$

- $D$ is the damages assessed.
- $p$ is the plaintiff's own share of fault.

Under modified comparative negligence the recovery is

> $$R_{\text{modified}} = \begin{cases} (1-p)\,D & p < t \\ 0 & p \geq t \end{cases}$$

- $t$ is the bar: $50\%$ (barred at half fault) or $51\%$ (barred only when more at fault than the defendants), the same convention as [[Tort Law]].

> [!example]- What does this customer recover under each fault rule if her share of fault is 20%, 50% or 60%? {Example}
> A customer's damages from a fall in a store are assessed at \$300,000. The jury finds the customer, who was looking at a phone, partly at fault. The rules are pure comparative negligence, the 50% bar rule, the 51% bar rule and contributory negligence.
>
> > [!answer]-
> > - At $p = 20\%$ the customer is below both bars, so pure, 50% bar and 51% bar all give $0.80 \times \$300{,}000 = \$240{,}000$, and contributory negligence gives \$0.
> > - At $p = 50\%$ pure gives $0.50 \times \$300{,}000 = \$150{,}000$.
> > - Under the 50% bar a plaintiff at half fault recovers nothing, while the 51% bar still allows recovery because the plaintiff is not more at fault than the defendant, so the 51% bar gives \$150,000.
> > - At $p = 60\%$ only pure comparative negligence lets a plaintiff who is mostly at fault recover, $0.40 \times \$300{,}000 = \$120{,}000$.
> > - The store's liability insurer faces anything from \$0 to \$240,000 on the same facts, so the state's fault rule is a rating and reserving variable for liability lines.

## Time limits

A *statute of limitations* bars a suit not filed within a set period, usually running from the injury or from when it was, or should have been, discovered. A *statute of repose* runs from a fixed event, such as the sale of a product or the completion of a building, and bars the claim when it expires even if the injury hasn't happened yet. The discovery rule can extend a statute of limitations but not a statute of repose.

The other defenses, [[Defenses Against Negligence#Assumption of risk|assumption of risk]] and [[Defenses Against Negligence#Immunities|immunity]], are set out with these on [[Defenses Against Negligence]].

> [!example]- Is each suit against this contractor timely? {Example}
> A contractor finished a building in June 2014. The state allows two years from injury to sue in negligence, and has a ten-year statute of repose for claims arising from improvements to real property (both illustrative).
>
> 1. A ceiling collapses on a tenant in March 2023 and the suit is filed in May 2025.
> 2. The ceiling collapses in August 2024 and the suit is filed in January 2025.
>
> > [!answer]-
> > - In the first case, March 2023 is less than ten years after June 2014, so the injury falls within the repose period.
> > - That suit is filed 26 months after the injury, more than two years, so the statute of limitations bars it.
> > - In the second case, the suit is filed five months after the injury, well inside the limitation period.
> > - But the injury came more than ten years after the building was finished, so the statute of repose had already expired and the claim is barred before it arose.
> > - Repose limits a contractor's (and its [[Products and Completed Operations Liability|completed operations]] insurer's) exposure to a fixed horizon, which matters for long-tail reserving.

## Negligence and liability insurance

Negligent injury is accidental from the insured's standpoint, so it fits the "occurrence" a [[Liability Insurance|liability policy]] covers, unlike an [[Intentional Tort|intentional tort]].

> [!trap] Reversing the 50% and 51% bars
> At exactly 50% fault, a plaintiff recovers nothing under the 50% bar and half the damages under the 51% bar. Reversing them is the most common slip in a recovery calculation.
