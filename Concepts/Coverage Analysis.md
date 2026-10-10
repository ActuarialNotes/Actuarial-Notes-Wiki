---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:564c5dae981708e01cbdba02ba806761afe49c319e8efbecddd4d78939005b45
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coverage Analysis.md
---

**Coverage Analysis** is the systematic reading of an [[Insurance Policy|insurance policy]] to decide whether it covers a particular loss or claim and, if it does, how much it pays. The Institutes' framework works through the policy in a fixed order: the declarations, the insuring agreement and its definitions, the conditions, the exclusions, and the endorsements and other provisions that modify them, and then the provisions that set the amount payable. It is the core of the coverage decision in [[Claims Handling|claims handling]], and the method behind every "is this covered?" question on the [[Building and Personal Property Coverage Form|BPP]] or the [[Commercial General Liability|CGL]].

> $$\mathbf{1}_{\text{cov}} = I_{\text{dec}} \times I_{\text{ins}} \times I_{\text{cond}} \times (1 - I_{\text{excl}})$$

> $$\text{Paid} = \mathbf{1}_{\text{cov}} \times \min\big((L - D)^+,\ C\big)$$

- **Symbols:** $I_{\text{dec}}$ is 1 when the declarations fit the loss, $I_{\text{ins}}$ when an insuring agreement is triggered, $I_{\text{cond}}$ when the conditions have been met, and $I_{\text{excl}}$ is 1 when an exclusion removes coverage and no exception restores it. $L$ is the covered loss valued as the policy states, $D$ is the [[Deductible|deductible]] and $C$ is the applicable [[Policy Limit|limit]]. A loss can fail one step for part of its amount and pass for the rest, so each part of a loss is analysed separately.
- **Declarations:** The first step confirms that the policy was in force on the date of loss, that the person making the claim is an insured, and that the property or location is the one described. The declarations also show the limits, deductibles and forms that will be needed later.
- **Insuring agreement:** The next step asks whether the event fits the promise the insurer made. Under the BPP that is direct physical loss to covered property from a covered cause, read with the [[Causes of Loss|causes-of-loss]] form. Under the CGL it is bodily injury or property damage caused by an occurrence during the policy period, or a listed personal and advertising injury offense. The policy's definitions give the defined words their meaning.
- **Conditions:** The analyst then checks that the insured has met the conditions, such as prompt notice, cooperation, protecting the property from further damage and filing a proof of loss. A condition can also change the result directly, as the vacancy condition does.
- **Exclusions:** Exclusions remove coverage the insuring agreement would otherwise give, often because another policy is designed for the loss. An exception to an exclusion restores coverage, so the analysis reads each exclusion to its end.
- **Endorsements and other provisions:** [[Endorsement|Endorsements]] add, remove or change coverage, and they take precedence over the printed form where the two conflict. Miscellaneous provisions, such as the other insurance clause, are read last.
- **Amount payable:** Once a loss is covered, the valuation basis, the limits, the deductible, any [[Insurance to Value|coinsurance]] condition and other insurance set what the insurer pays. In a liability claim, the analyst also decides whether the insurer must defend, which the [[Duty to Defend|duty to defend]] makes broader than the duty to pay.
- **In the claims process:** The analysis is done when the claim is reported and again as facts emerge. When coverage is in doubt, the insurer can investigate under a reservation of rights, and when part of a loss is not covered, it must explain the denial in writing, citing the policy language.
- **Determining whether the BPP covers a loss:** Mapped onto the sections of ISO CP 00 10 10 12, the questions are: (1) is the damaged property covered property, a building, business personal property or property of others with a limit shown, and not on the list of property not covered ([[BPP Covered Property]]); (2) did the loss happen at the described premises, or within one of the coverage extensions, during the policy period and in the coverage territory ([[Commercial Property Conditions]]); (3) was it caused by a covered cause of loss under the attached form, with no exclusion or limitation removing it, or an exception restoring it ([[Causes of Loss Basic and Broad Forms]], [[Causes of Loss Special Form]]); (4) does an additional coverage or extension pay a cost the insuring agreement does not, such as debris removal ([[BPP Additional Coverages and Coverage Extensions]]); (5) has the insured met its duties, and do the vacancy or other loss conditions change the result ([[BPP Loss Conditions and Additional Conditions]]); and (6) how much is paid, after valuation, coinsurance or agreed value, the deductible, the limit and any special limit ([[BPP Limits of Insurance and Deductible]], [[BPP Optional Coverages]]).
- **Determining whether the CGL covers a claim:** Mapped onto the sections of ISO CG 00 01 04 13, the questions are: (1) is the person sued an insured, the named insured in the capacity its form of organization gives it, or an employee, volunteer worker or other person or organization Section II adds ([[CGL Who Is an Insured]]); (2) does the claim fit an insuring agreement: under Coverage A, damages because of bodily injury or property damage caused by an occurrence in the coverage territory, occurring during the policy period and not known to an insured before it began ([[CGL Coverage A Insuring Agreement]]); under Coverage B, damages because of personal and advertising injury caused by an offense arising out of the named insured's business and committed in the coverage territory during the policy period ([[CGL Coverage B]]); or under Coverage C, medical expenses for bodily injury caused by an accident on or next to premises the named insured owns or rents, or because of its operations, paid regardless of fault ([[CGL Coverage C]]); (3) does an exclusion of that coverage remove it, with each exclusion read through its exceptions: Coverage A's exclusions a to q, from expected or intended injury to the recording and distribution of material ([[CGL Coverage A Exclusions]]), and Coverage B's and Coverage C's own lists; (4) has the insured met the conditions, giving notice of an occurrence, offense, claim or suit as soon as practicable, sending the suit papers, cooperating and not volunteering payments, and how does other insurance share the loss ([[CGL Conditions]]); (5) how much is paid, within the each occurrence limit and the general or products-completed operations aggregate, and the personal and advertising injury, damage to premises rented and medical expense limits where they apply ([[CGL Limits of Insurance]]), with defense costs and the other supplementary payments paid in addition ([[CGL Supplementary Payments]]); and (6) must the insurer defend: it has the right and duty to defend any suit seeking damages to which Coverage A or B applies, until the applicable limit is used up paying judgments or settlements.

> [!example]- Does the BPP Cover a Windstorm Loss? {Example}
> A hardware store is insured under the BPP with the special causes-of-loss form, a building limit of \$800,000, a business personal property limit of \$300,000 and a \$2,500 deductible, and it meets the coinsurance requirement. A windstorm tears off part of the roof, causing \$65,000 of building damage. Rain pours in through the opening and ruins \$48,000 of stock and \$1,800 of cash in the register. The owner reports the loss the next morning and covers the opening with tarps. Analyse the claim.
>
> > [!answer]-
> > The policy was in force, the store is the named insured and the damage is at the described premises. Windstorm is a covered cause of loss, and the rain damage inside is covered because it entered through an opening the windstorm caused. Prompt notice and the tarps meet the insured's duties after a loss. The cash fails the insuring agreement: money is property not covered under the BPP, so it belongs to a crime policy. The deductible applies once to the occurrence.
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{bldg}} &= \min(65{,}000 - 2{,}500,\ 800{,}000) \\
> > &= 62{,}500 \\
> > \text{Paid}_{\text{BPP}} &= \min(48{,}000,\ 300{,}000) \\
> > &= 48{,}000
> > \end{align*}
> > $$
> > The insurer pays \$110,500, and the store bears the \$2,500 deductible and the \$1,800 of cash. Had rain entered through an old leak rather than wind damage, the special form's limitation on rain damage to interiors would have removed the stock loss.

> [!example]- Does the CGL Cover a Product Claim? {Example}
> A retailer's occurrence CGL policy has a \$1,000,000 each occurrence limit and no deductible. A space heater it sold overheats in a customer's home during the policy period, burning the customer (\$140,000 of damages), a sofa (\$2,200) and the heater itself (\$300). Separately, one of the retailer's own employees is hurt unloading heaters and sues. Analyse both claims.
>
> > [!answer]-
> > The customer's burns are bodily injury and the sofa is property damage, both caused by an accident during the policy period, and the retailer is the named insured, so the insuring agreement is triggered under the products-completed operations hazard. The "damage to your product" exclusion removes the heater itself.
> > $$
> > \begin{align*}
> > \text{Paid} &= \min(140{,}000 + 2{,}200,\ 1{,}000{,}000) \\
> > &= 142{,}200
> > \end{align*}
> > $$
> > Defense costs are paid in addition. The employee's injury fits the insuring agreement but is removed by the employer's liability exclusion, because [[Workers Compensation Underwriting|workers compensation]] is the policy designed for it.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions describe a loss or a claim and ask whether the BPP or the CGL covers it, and for how much. Answers that earn the marks name each step: the declarations, the insuring agreement and definitions, the conditions, the exclusions and their exceptions, the endorsements, and the limits, deductible and coinsurance.
> - **DISC-RM:** Questions ask candidates to list the steps of the framework for coverage analysis and to apply them, together with the claims handling process, to a case from report to payment or denial.

> [!warning]- Exam traps
> - **Exclusions before the insuring agreement:** An exclusion only removes coverage the insuring agreement gave. Arguing that a loss is excluded before establishing that it falls within the insuring agreement skips the step that often settles the question.
> - **Exceptions restore coverage:** Many exclusions end with an exception, such as the CGL's exception for work done by a subcontractor. Stopping at the exclusion's first sentence denies a covered loss.
> - **Endorsements override the form:** An endorsement attached to the policy changes the printed form. Analysing the form alone can give the wrong result whenever an endorsement adds or removes the coverage in question.
> - **Covered is not paid in full:** A covered loss still passes through valuation, limits, deductible and coinsurance. A coverage answer that stops at "covered" leaves out the amount the question asks for.
