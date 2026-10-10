---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:daa0aaab33c4deeef916c007906e8f5a247f1a8549336b0716909ec409b8dcab
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Negligence.md
---

**Negligence** is the failure to use the care that a reasonably prudent person would use in the same circumstances, and the [[Tort Law|tort]] that makes a person liable for the harm that failure causes. A plaintiff wins a negligence suit only by proving four elements: the defendant owed a duty, breached it, the breach caused the harm, and the plaintiff suffered actual damages. It is the basis of most claims under auto, premises and [[Professional Liability Insurance|professional liability]] policies.

> $$\text{Liable} \iff \text{Duty} \wedge \text{Breach} \wedge \text{Causation} \wedge \text{Damages}$$

> $$\text{Breach if } B < P \times L$$

> $$R_{\text{pure}} = (1-p)\,D$$

> $$R_{\text{modified}} = \begin{cases} (1-p)\,D & p < t \\ 0 & p \geq t \end{cases}$$

- **Symbols:** $B$ is the burden of the precaution the defendant didn't take, $P$ the probability of harm without it, and $L$ the size of the loss if harm occurs, so the second line is the "Learned Hand" test for breach from *United States v. Carroll Towing* (1947). $D$ is the damages assessed, $p$ the plaintiff's own share of fault, $R$ the recovery, and $t$ the bar in a modified comparative negligence state: $50\%$ (barred at half fault) or $51\%$ (barred only when more at fault than the defendants), the same convention as [[Tort Law]].
- **Duty:** A duty is a legal obligation to act toward others with reasonable care. It arises from a relationship (carrier and passenger, landowner and visitor), from a statute, or from conduct that creates a risk to others. The common law generally imposes no duty to rescue a stranger, so a bystander who does nothing is not negligent, although one who begins a rescue must carry it out with reasonable care.
- **Breach and the reasonable person:** The standard is objective. A defendant is measured against a hypothetical reasonably prudent person, not against their own best effort. A professional is held to the skill of a reasonable member of the profession, and a child to the care of a child of like age, intelligence and experience. Violating a safety statute meant to protect the plaintiff's class from the harm that occurred is *negligence per se* in many states, and *res ipsa loquitur* lets a jury infer breach when the accident ordinarily doesn't happen without negligence and the cause was under the defendant's exclusive control.
- **Causation:** The breach must be the *actual cause* of the harm, usually tested by "but for the breach, would the harm have occurred?", and the *proximate cause*, meaning the harm was a foreseeable result with no superseding cause breaking the chain. A defendant who left a ladder in a hallway is a proximate cause of the trip over it, but not of a fire an arsonist later set.
- **Damages:** Negligence requires actual harm, so a near miss with no injury is not actionable. What the plaintiff recovers is measured as [[Compensatory Damages]], and [[Punitive Damages]] are rare because ordinary negligence is not the reckless or malicious conduct they punish.
- **Comparative and contributory negligence:** Under pure *contributory negligence*, any fault of the plaintiff bars recovery, a rule that survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia. The *last clear chance* doctrine softens it where the defendant could still have avoided the accident. Every other state uses *comparative negligence*, which reduces the award by the plaintiff's share of fault, either in full (pure) or until the plaintiff reaches the bar $t$ (modified).
- **Assumption of risk:** A plaintiff who knowingly and voluntarily accepted a known risk may be barred. *Express* assumption is a signed release or waiver. *Implied* assumption is inferred from conduct, such as a spectator at a ball game, and most comparative negligence states now fold the implied form into the fault allocation rather than treating it as a complete bar.
- **Time limits and immunity:** A *statute of limitations* bars a suit not filed within a set period, usually running from the injury or from when it was, or should have been, discovered. A *statute of repose* runs from a fixed event, such as the sale of a product or the completion of a building, and bars the claim when it expires even if the injury hasn't happened yet. *Immunity* protects some defendants entirely or partly: governments (sovereign immunity, much reduced by tort claims acts), and in some states charities and family members, though most states have abolished or narrowed both.
- **Insurance:** Negligent injury is accidental from the insured's standpoint, so it fits the "occurrence" a [[Liability Insurance|liability policy]] covers, unlike an [[Intentional Tort|intentional tort]]. Where fault is not required at all, the claim is one of [[Strict Liability|strict liability]] instead.

> [!example]- One Verdict Under Each Fault Rule {Example}
> A customer's damages from a fall in a store are assessed at \$300,000. The jury finds the customer, who was looking at a phone, partly at fault. Find the recovery under pure comparative negligence, the 50% bar rule, the 51% bar rule and contributory negligence if the customer's share of fault is (a) 20%, (b) 50%, (c) 60%.
>
> > [!answer]-
> > **(a) $p = 20\%$:** The plaintiff is below both bars, so only contributory negligence denies recovery.
> > $$
> > \begin{align*}
> > R_{\text{pure}} &= 0.80 \times \$300{,}000 \\
> > &= \$240{,}000 \\
> > R_{50\%} &= R_{51\%} \\
> > &= \$240{,}000 \\
> > R_{\text{contributory}} &= \$0
> > \end{align*}
> > $$
> > **(b) $p = 50\%$:** Under the 50% bar a plaintiff at half fault recovers nothing, while the 51% bar still allows recovery because the plaintiff is not more at fault than the defendant.
> > $$
> > \begin{align*}
> > R_{\text{pure}} &= 0.50 \times \$300{,}000 \\
> > &= \$150{,}000 \\
> > R_{50\%} &= \$0 \\
> > R_{51\%} &= \$150{,}000 \\
> > R_{\text{contributory}} &= \$0
> > \end{align*}
> > $$
> > **(c) $p = 60\%$:** Only pure comparative negligence lets a plaintiff who is mostly at fault recover.
> > $$
> > \begin{align*}
> > R_{\text{pure}} &= 0.40 \times \$300{,}000 \\
> > &= \$120{,}000 \\
> > R_{50\%} &= R_{51\%} \\
> > &= \$0
> > \end{align*}
> > $$
> > The store's liability insurer faces anything from \$0 to \$240,000 on the same facts, which is why the state's fault rule is a rating and reserving variable for liability lines.

> [!example]- Was Skipping the Floor Checks a Breach? {Example}
> A grocery store stopped its hourly floor inspections, which cost \$40 a day in staff time. Without them, illustrative store data show a 0.2% chance on any given day that a customer slips on an unnoticed spill, and the average injury costs \$25,000. A customer slips on a spill that had been on the floor for three hours. Apply the Hand test, and identify the remaining elements.
>
> > [!answer]-
> > Compare the daily burden of the precaution with the expected daily loss it would prevent.
> > $$
> > \begin{align*}
> > P \times L &= 0.002 \times \$25{,}000 \\
> > &= \$50 \\
> > B &= \$40 < \$50
> > \end{align*}
> > $$
> > The precaution costs less than the harm it prevents, so a reasonable store would have kept inspecting, and stopping was a breach. The store owed the customer, an invitee, a duty to keep the floor reasonably safe (see [[Premises Liability]]). A spill left for three hours would have been found by an hourly check, so the breach is the actual cause, and a slip is the foreseeable result of a spill, so it is the proximate cause. The customer's injury supplies the damages, and all four elements are met.

> [!example]- Limitation or Repose? {Example}
> A contractor finished a building in June 2014. The state allows two years from injury to sue in negligence, and has a ten-year statute of repose for claims arising from improvements to real property (both illustrative). Is the suit timely if (a) a ceiling collapses on a tenant in March 2023 and the suit is filed in May 2025, (b) the ceiling collapses in August 2024 and the suit is filed in January 2025?
>
> > [!answer]-
> > (a) The suit falls within the repose period, since March 2023 is less than ten years after June 2014. It is filed 26 months after the injury, which is more than two years, so it is barred by the statute of limitations.
> >
> > (b) The suit is filed five months after the injury, well inside the limitation period. But the injury came more than ten years after the building was finished, so the statute of repose had already expired and the claim is barred before it arose. Repose protects a contractor's (and its [[Products and Completed Operations Liability|completed operations]] insurer's) exposure to a fixed horizon, which is why it matters for long-tail reserving.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions give a fact pattern and ask which element of negligence is missing, most often proximate cause or a duty the defendant didn't owe. Others ask which defence applies, or how much the plaintiff recovers under a named comparative negligence rule.
> - **Coverage link:** A question may follow the tort into the policy, asking whether the negligent act is an occurrence the insured's [[Commercial General Liability|CGL]], homeowners or auto policy covers.

> [!warning]- Exam traps
> - **The two bars:** At exactly 50% fault, a plaintiff recovers nothing under the 50% bar and half the damages under the 51% bar. Reversing them is the most common slip in a recovery calculation.
> - **Actual versus proximate cause:** A breach can be the but-for cause of a harm and still not its proximate cause, when the harm was unforeseeable or a superseding cause intervened. Proving one does not prove the other.
> - **Limitation versus repose:** A statute of limitations can be extended by the discovery rule, while a statute of repose cannot. A repose period can expire before the injury ever occurs.
> - **Reasonable person, not best effort:** A defendant who tried their hardest but fell below what a reasonable person would do is still negligent. The test is objective, apart from the adjustments for professionals and children.
> - **No harm, no claim:** Careless conduct that injures no one is not actionable negligence, because damages are an element rather than a remedy added afterwards.
