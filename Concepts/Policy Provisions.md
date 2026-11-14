---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:31673f2aa2903dbefd6670cd7374635c90f7968be8205366eb930f52f8ac0d8e
  sources:
    - "ISO CG 00 01 04 13, Commercial General Liability Coverage Form (Cooper & Scully copy), Coverage A 1.a-b, Exclusions 2.e and 2.j, Supplementary Payments (pp.1-2, 8-9), sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Perils Insured Against A.2.c(1), Coverage C peril 14, Section I Conditions C.8 (pp.8, 12, 14), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "IRMI Insurance Glossary, 'declarations' (fetched 2026-10-10), sha256:4a5f12e7b5f4f9eabf5b519cee03f5b46cdbd6d2f69e544e4c3f89afe40db29c — https://www.irmi.com/term/insurance-definitions/declarations"
    - "IRMI Insurance Glossary, 'insuring agreement' (fetched 2026-10-10), sha256:9edf607fea438a90ad44c611deee77d7866d809a96088da7ebc810860a49975f — https://www.irmi.com/term/insurance-definitions/insuring-agreement"
    - "IRMI Insurance Glossary, 'exclusion' (fetched 2026-10-10), sha256:97f68148c1497de089ad8471d0f95ee3f74ec75db149c52761f1382183cb64e7 — https://www.irmi.com/term/insurance-definitions/exclusion"
    - "IRMI Insurance Glossary, 'policy conditions' (fetched 2026-10-10), sha256:ab5225f0b2d79a69ce4994722a3f9db6e1b18a0820b75e48ea47fa46c0bae80f — https://www.irmi.com/term/insurance-definitions/policy-conditions"
    - "Cornell LII Wex, 'contra proferentem' (fetched 2026-10-10), sha256:e17e688d536be7c5603d1061dd780ba795f218487fddb7b78bff817bb6f654f1 — https://www.law.cornell.edu/wex/contra_proferentem"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Provisions.md
---

**Policy Provisions** are the statements in an [[Insurance Policy|insurance policy]] that together decide what it covers and how much it pays. [[Endorsement|Endorsements]] add to or change any of them.

The provisions fall into six categories:

1. **Declarations.** The declarations page holds the facts particular to this policy: the named insured, the policy period, the property or activities insured, the limits, deductibles and premium, and the forms and endorsements attached.
2. **Definitions.** Defined terms, usually printed in quotation marks or bold, mean only what the definition says, and they can narrow or widen a coverage.
3. **Insuring agreements.** An insuring agreement states what the insurer promises.
4. **Exclusions.** Exclusions remove causes of loss, kinds of loss or kinds of property from the insuring agreement.
5. **Conditions.** Conditions qualify the insurer's promise.
6. **Other provisions.** These say how the policy shares a loss with other insurance and how the parties settle a dispute over the amount of a loss. The homeowners form places both among its conditions.

Whether a provision sits on the declarations page, in a coverage form, a causes of loss or conditions form, or an endorsement depends on how the policy is assembled ([[Insurance Policy Structure]]). The legal features that shape how courts read the provisions are on [[Insurance Contract Characteristics]]. Courts read genuine ambiguity against the insurer that drafted the form.

## Insuring agreements

The [[Commercial General Liability|CGL]] Coverage A agreement promises to pay the sums the insured becomes legally obligated to pay as damages because of bodily injury or property damage to which the insurance applies, and to defend the insured. It applies only to injury caused by an occurrence, in the coverage territory and during the policy period. An open perils agreement promises to pay for any direct physical loss not excluded, and a named perils agreement only for the perils listed. Additional coverages and supplementary payments are smaller insuring agreements of their own.

## Exclusions and exceptions

A policy pays nothing for a loss an exclusion removes. An exception to an exclusion gives back part of what the exclusion took away, such as coverage for fire following an excluded earthquake.

## Conditions

The insured must pay the premium, report a loss promptly, protect property from further damage, cooperate and submit proof of loss, and the insurer is relieved of its obligation if the insured fails to comply in a way that matters. A condition does not remove a type of loss. It sets duties, and a breach can release the insurer from a loss that would otherwise be covered. Other conditions set out the insurer's own duties, such as when it must pay.

## Reading the provisions together

No single provision answers whether a loss is covered, so they are read together, as a [[Coverage Analysis|coverage analysis]] does. The amount the policy pays for a loss $X$ is

> $$\text{Pay} = \mathbb{1}_{\text{IA}} \times \big(1 - \mathbb{1}_{\text{Ex}}\big) \times \mathbb{1}_{\text{Co}} \times g(X)$$

- $\mathbb{1}_{\text{IA}}$ is 1 when the loss falls within an insuring agreement, and 0 otherwise.
- $\mathbb{1}_{\text{Ex}}$ is 1 when an exclusion applies and no exception to it restores coverage, and 0 otherwise.
- $\mathbb{1}_{\text{Co}}$ is 1 when the conditions have been met, and 0 otherwise.
- $g(X)$ is the amount the valuation and limit provisions produce from the loss.

For property insurance the provisions that value a loss are the valuation basis, such as actual cash value, [[Replacement Cost|replacement cost]] or agreed value, the coinsurance clause ([[Insurance to Value]]), the deductible and the limit. Together they give

> $$g(X) = \min\big(\max(R \times X - D,\ 0),\ C\big)$$

- $R$ is the coinsurance ratio, as on [[Property Insurance]].
- $D$ is the deductible.
- $C$ is the limit.

The general payment function is on [[Policy Information]].

> [!example]- Is this frozen-pipe loss covered, and what would the insurer pay if the insured had kept the heat on? {Example}
> An HO-3 insured spends a winter month away and turns off the heat without shutting off and draining the water. A pipe freezes and bursts, causing \$14,000 of damage to the floors and walls and \$6,000 to furniture. The deductible is \$1,000.
>
> > [!answer]-
> > - The dwelling is insured on an open perils basis, so its insuring agreement applies.
> > - The HO-3 excludes freezing of the plumbing unless the insured used reasonable care to maintain heat or to shut off the water and drain the system.
> > - The furniture's named peril, freezing, carries the same qualification, so $\mathbb{1}_{\text{Ex}} = 1$ for both and the insurer pays nothing.
> > - With the heat maintained, the exclusion does not apply, and the insurer pays $\$14{,}000 + \$6{,}000 - \$1{,}000 = \$19{,}000$.

> [!example]- Which of these three claims against a contractor's CGL does Coverage A pay? {Example}
> A contractor's CGL policy has a \$1,000,000 each occurrence limit. During the policy period a crane on a job site drops a beam. The beam damages a client's car parked nearby, costing \$22,000, damages the contractor's own truck, costing \$9,000, and injures one of the contractor's employees.
>
> > [!answer]-
> > - The client's car is property damage the contractor is legally obligated to pay, caused by an accident at the job site. It is within the insuring agreement and no exclusion applies, so Coverage A pays the \$22,000, which is within the limit.
> > - The truck fails the insuring agreement, because a CGL pays damages owed to others, not the insured's own property damage. That belongs to auto physical damage coverage.
> > - The employee's injury is within the insuring agreement, but the employer's liability exclusion removes it, and the claim goes to [[Workers Compensation Insurance|workers compensation]].

> [!trap] Looking for an exclusion before the insuring agreement
> An exclusion can only remove what an insuring agreement granted. A loss outside every insuring agreement is not covered, and no exclusion needs to be found.
