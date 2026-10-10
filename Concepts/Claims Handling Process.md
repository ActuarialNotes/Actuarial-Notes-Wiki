---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:edfd6e71dfb189b96937feb81ae9cf507b254abf4de6d08fa329420903c0a1d7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Handling Process.md
---

The **Claims Handling Process** is the sequence of activities by which an insurer moves a [[Claim|claim]] from first report to conclusion: acknowledge the claim and assign it, identify the policy, contact the insured, investigate and document the loss, determine the cause of loss, liability and amount, and conclude the claim by payment or denial. Each activity answers a question the next one depends on, and each is subject to the minimum standards of the state's [[Unfair Claims Settlement Practices|unfair claims settlement practices]] law.

> $$\text{Payment} = \min\big(\max(L - D,\ 0),\ \text{Limit}\big)$$

- **Symbols:** For a covered first-party loss, $L$ is the amount of loss on the policy's valuation basis, $D$ is the [[Deductible|deductible]] and Limit is the applicable limit of insurance. The formula is the last calculation of the process. It means nothing until the earlier activities have established that a policy was in force and that the cause of loss is covered.
- **1. Acknowledge and assign:** The insurer confirms receipt of the claim and assigns it to someone with the right expertise and authority. Small property losses may be adjusted by the producer, and larger ones by a staff adjuster, an employee of the insurer, or by an independent adjuster who works for an adjusting firm serving several insurers for a fee per claim. Under the NAIC model regulation the acknowledgment is due within 15 days of notice unless the claim is paid sooner, and notice to the insurer's agent counts as notice to the insurer.
- **2. Identify the policy:** The adjuster confirms that a policy was in force on the date of loss, and which coverages, limits, deductibles and endorsements apply. If a coverage question appears, the insurer can protect its position before investigating further (see below).
- **3. Contact the insured:** The adjuster explains the process and what the insured must do. The insurer must promptly provide the claim forms, instructions and reasonable help a first-party claimant needs to meet the policy's conditions, and must disclose all the benefits and coverages pertinent to the claim.
- **4. Investigate and document:** The adjuster gathers the facts: statements, an inspection of the damage, records, and reports. Every relevant document goes into the claim file, dated when received, processed or mailed, so that the insurer's handling can be reconstructed by an examiner later.
- **5. Determine cause of loss, liability and amount:** The adjuster decides whether the loss is covered or excluded under the contract, whether the insured is legally liable in a third-party claim, and how much is owed. This is where the [[Coverage Analysis|coverage analysis]] framework is applied to the facts.
- **6. Conclude the claim:** A valid claim is paid promptly, within 30 days after the insurer affirms liability for an amount not in dispute under the model regulation. An invalid claim is denied in writing, citing the policy provision, condition or exclusion relied on, and a claimant who objects must be told that the insurance department can review the denial. Disagreements about amount can go to the policy's appraisal provision or to litigation.
- **Reservation of rights:** When coverage is in doubt, the insurer sends the insured a reservation of rights, a notice that coverage may not apply. It lets the insurer investigate, or even defend, the claim without waiving its right to deny coverage later on what the investigation reveals, and it warns the insured to protect any interest that may turn out to be uninsured. It is generally a one-sided letter from the insurer. A **non-waiver agreement** serves the same purpose but, in one common usage, is signed by both the insurer and the insured. Delay in reserving rights risks the insurer being held to have waived, or being estopped from asserting, its coverage defenses, and how strictly courts apply that varies by state.
- **Measuring the process:** The outcome of the process is a payment that keeps the insurer's promise and no more than the policy owes. [[Claims Handling]] covers the measures used to judge how well a claims department does that.

> [!example]- A Commercial Fire Claim Through the Six Activities {Example}
> A bakery reports a kitchen fire to its producer. Its property policy has a \$500,000 building limit and a \$5,000 deductible. The adjuster learns that the bakery had moved its ovens into an addition not shown on the declarations, and wonders whether the addition is covered property. The investigation finds that the addition is attached to the described building and within its limit, that the fire started in a fryer, and that the damage costs \$86,000 to repair on the policy's valuation basis. Walk through the claim.
>
> > [!answer]-
> > - **Acknowledge and assign:** The producer's notice is notice to the insurer, which acknowledges it within 15 days and assigns a property adjuster.
> > - **Identify the policy:** The policy was in force. The addition raises a coverage question, so the insurer sends a reservation of rights before investigating, which preserves its right to deny if the addition proves not to be covered.
> > - **Contact the insured:** The adjuster explains the process and sends the proof of loss form and instructions.
> > - **Investigate and document:** The adjuster inspects the damage, takes statements and records how the fire started and how the addition is attached, and dates every document in the file.
> > - **Determine:** Fire is a covered cause of loss, the addition is part of the covered building, and the amount follows from the repair cost.
> > $$
> > \begin{align*}
> > \text{Payment} &= \min\big(86{,}000 - 5{,}000,\ 500{,}000\big) \\
> > &= 81{,}000
> > \end{align*}
> > $$
> > - **Conclude:** The insurer affirms liability and pays \$81,000 within 30 days. Because the coverage question was resolved in the bakery's favor, the reservation of rights never had to be used.

> [!example]- A Third-Party Claim from an Unrepresented Claimant {Example}
> A customer trips on a broken step outside a hardware store and claims against the store's liability insurer. She has no lawyer. The adjuster investigates and concludes that the store was negligent and that \$14,000 is a fair settlement, but negotiations drag on, and the statute of limitations for her claim will expire in ten weeks. What must the adjuster do, and why does it matter that liability is now reasonably clear?
>
> > [!answer]-
> > - **The limitation notice:** An insurer negotiating directly with an unrepresented claimant whose rights may be affected by a statute of limitations must warn her in writing, at least 60 days before it expires for a third-party claimant. Ten weeks is 70 days, so the notice must go out within the next 10 days.
> > - **Good-faith settlement:** Once liability is reasonably clear, failing to attempt in good faith a prompt, fair and equitable settlement is one of the model act's unfair practices. The adjuster should make a fair offer rather than letting the deadline do the work.
> > - **No misleading pressure:** The adjuster may not suggest that her rights depend on signing a release by a deadline, except to tell her about the statute of limitations.
> >
> > Here step 5 found liability, and step 6 is the settlement. The regulation sets the minimum conduct between them.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask for the activities of the claims handling process in order, or give an activity and ask which one it is, such as sending a reservation of rights (identifying the policy) or confirming the date of loss.
> - **Applied** questions combine the process with the [[Coverage Analysis|coverage analysis]] framework on a described loss, asking what the adjuster should do next and whether, and how much, the policy pays.
> - **Compliance** questions ask what a file must contain, or which deadline a step must meet.

> [!warning]- Exam traps
> - **Coverage before amount:** The policy and the cause of loss are settled before the amount. Negotiating an amount while a coverage question is open, without a reservation of rights, risks waiving the insurer's defense.
> - **A reservation of rights is not a denial:** It keeps the question open while the insurer investigates, and the claim may still be paid in full.
> - **Notice to the agent counts:** The acknowledgment clock starts when the insurer's agent is notified, not when the claim reaches the claims department.
> - **Denials need reasons:** A denial must be in writing and cite the provision relied on. A correct denial without the reason still breaches the regulation.
