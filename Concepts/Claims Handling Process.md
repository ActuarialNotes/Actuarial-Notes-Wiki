---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:d68734dccccaab9f4446f5e64690d4ef31f8dc2def375190f9e7064382ca8cde
  sources:
    - "Tokio Marine HCC, Public Risk Claims — 'typical claims management process and workflow' (receipt; review/assignment/acknowledgement; coverage determination; contact with insured, liability-damages determination; resolution; closure), sha256:64a1ae6e60ed41927cd63a32887e9088e1d7f10e11237e6411b14a66077c83e4 — https://tmhcc.com/en-us/claims/public-risk-claims"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), §7.3 'Claims Adjusting', sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html"
    - "NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf"
    - "NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf"
    - "IRMI glossary, 'reservation of rights', sha256:ada48198a157a8c1c8d24b80c061118d4ac01e8fdc21df0f28d2cba0746333b4 — https://www.irmi.com/term/insurance-definitions/reservation-of-rights"
    - "Dunn & Fencl, Reservation of Rights 101 (ALFA International), §§1, 3: ROR generally unilateral, non-waiver agreement sometimes bilateral, untimely ROR risks waiver/estoppel, jurisdictional variation, sha256:bcfbba032e5df89d121c693bc0226a8b0c8e9f90c9f3d8a84ef46879cc162d08 — https://www.alfainternational.com/publications_news/reservation-of-rights-101/"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), A.2.a property not covered (money), D. Deductible, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Handling Process.md
---
The **Claims Handling Process** is the sequence of activities by which an insurer moves a [[Claim|claim]] from first report to conclusion. Each activity answers a question the next one depends on, and each is subject to the minimum standards of the state's [[Unfair Claims Settlement Practices|unfair claims settlement practices]] law.

1. **Acknowledge and assign.** The insurer confirms receipt of the claim and assigns it to someone with the right expertise and authority. Small property losses may be adjusted by the producer, and larger ones by a staff adjuster, an employee of the insurer, or by an independent adjuster who works for an adjusting firm serving several insurers for a fee per claim.
2. **Identify the policy.** The adjuster confirms that a policy was in force on the date of loss, and which coverages, limits, deductibles and endorsements apply. If a coverage question appears, the insurer can protect its position with a reservation of rights before investigating further.
3. **Contact the insured.** The adjuster explains the process and what the insured must do. The insurer must promptly provide the claim forms, instructions and reasonable help a first-party claimant needs to meet the policy's conditions, and must disclose all the benefits and coverages pertinent to the claim.
4. **Investigate and document.** The adjuster gathers the facts: statements, an inspection of the damage, records, and reports. Every relevant document goes into the claim file, dated when received, processed or mailed, so that the insurer's handling can be reconstructed by an examiner later.
5. **Determine cause of loss, liability and amount.** The adjuster decides whether the loss is covered or excluded under the contract, whether the insured is legally liable in a third-party claim, and how much is owed. This is where the [[Coverage Analysis|coverage analysis]] framework is applied to the facts.
6. **Conclude the claim.** A valid claim is paid promptly, and an invalid claim is denied. Disagreements about amount can go to the policy's appraisal provision or to litigation.

## Deadlines and denials in the model regulation

Under the NAIC model regulation the acknowledgment is due within 15 days of notice unless the claim is paid sooner, and notice to the insurer's agent counts as notice to the insurer. A valid claim is paid within 30 days after the insurer affirms liability for an amount not in dispute. An invalid claim is denied in writing, citing the policy provision, condition or exclusion relied on, and a claimant who objects must be told that the insurance department can review the denial.

## The amount payable

For a covered first-party loss, the payment is

> $$\text{Payment} = \min\big(\max(L - D,\ 0),\ \text{Limit}\big)$$

- $L$ is the amount of loss on the policy's valuation basis.
- $D$ is the [[Deductible|deductible]].
- $\text{Limit}$ is the applicable limit of insurance.

The formula is the last calculation of the process. It means nothing until the earlier activities have established that a policy was in force and that the cause of loss is covered.

> [!example]- How does this bakery's fire claim go through the six activities, and what does the insurer pay? {Example}
> A bakery reports a kitchen fire to its producer. Its property policy has a $\$500{,}000$ building limit and a $\$5{,}000$ deductible. The adjuster learns that the bakery had moved its ovens into an addition not shown on the declarations, and wonders whether the addition is covered property. The investigation finds that the addition is attached to the described building and within its limit, that the fire started in a fryer, and that the damage costs $\$86{,}000$ to repair on the policy's valuation basis.
>
> > [!answer]-
> > - The producer's notice is notice to the insurer, which acknowledges it within 15 days and assigns a property adjuster.
> > - The policy was in force. The addition raises a coverage question, so the insurer sends a reservation of rights before investigating, which preserves its right to deny if the addition proves not to be covered.
> > - The adjuster explains the process to the bakery and sends the proof of loss form and instructions.
> > - The adjuster inspects the damage, takes statements, records how the fire started and how the addition is attached, and dates every document in the file.
> > - Fire is a covered cause of loss and the addition is part of the covered building, so the claim is covered.
> > - The payment is $\min(86{,}000 - 5{,}000,\ 500{,}000) = \$81{,}000$.
> > - The insurer affirms liability and pays $\$81{,}000$ within 30 days. Because the coverage question was resolved in the bakery's favor, the reservation of rights never had to be used.

## Reservation of rights

When coverage is in doubt, the insurer sends the insured a reservation of rights, a notice that coverage may not apply. It lets the insurer investigate, or even defend, the claim without waiving its right to deny coverage later on what the investigation reveals, and it warns the insured to protect any interest that may turn out to be uninsured. It is generally a one-sided letter from the insurer. It is not a denial, and the claim may still be paid in full.

A **non-waiver agreement** serves the same purpose but, in one common usage, is signed by both the insurer and the insured. Delay in reserving rights risks the insurer being held to have waived, or being estopped from asserting, its coverage defenses, and how strictly courts apply that varies by state.

The outcome of the process is a payment that keeps the insurer's promise and no more than the policy owes. [[Claims Handling#Measuring claims performance|Claims performance measures]] judge how well a claims department does that.

> [!trap] Settling the amount before coverage
> The policy and the cause of loss are settled before the amount. Negotiating an amount while a coverage question is open, without a reservation of rights, risks waiving the insurer's defense.
