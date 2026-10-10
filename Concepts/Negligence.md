---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:72aaa4b42c84725955b73a4b31f20afb9a55baf8b73c45748532fc3adbfe4516
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
  open_findings: 1
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
- **Damages:** Negligence requires actual harm, so a near miss with no injury is not actionable. What the plaintiff recovers is measured as [[Compensatory Damages]], and Punitive damages are rare because ordinary negligence is not the reckless or malicious conduct they punish.
- **Comparative and contributory negligence:** Under pure *contributory negligence*, any fault of the plaintiff bars recovery, a rule that survives only in Alabama, Maryland, North Carolina, Virginia and the District of Columbia. The *last clear chance* doctrine softens it where the defendant could still have avoided the accident. Every other state uses *comparative negligence*, which reduces the award by the plaintiff's share of fault, either in full (pure) or until the plaintiff reaches the bar $t$ (modified).
- **Assumption of risk:** A plaintiff who knowingly and voluntarily accepted a known risk may be barred. *Express* assumption is a signed release or waiver. *Implied* assumption is inferred from conduct, such as a spectator at a ball game, and most comparative negligence states now fold the implied form into the fault allocation rather than treating it as a complete bar.
- **Time limits and immunity:** A *statute of limitations* bars a suit not filed within a set period, usually running from the injury or from when it was, or should have been, discovered. A *statute of repose* runs from a fixed event, such as the sale of a product or the completion of a building, and bars the claim when it expires even if the injury hasn't happened yet. *Immunity* protects some defendants entirely or partly: governments (sovereign immunity, much reduced by tort claims acts), and in some states charities and family members, though most states have abolished or narrowed both. Each defense, with the rules for applying it, is set out on [[Defenses Against Negligence]].
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
