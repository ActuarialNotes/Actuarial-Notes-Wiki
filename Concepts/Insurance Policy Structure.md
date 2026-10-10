---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:714f215e3b27e6f5a3c4e480b89259c3f999ee4060f82dcf440a9785faee7d73
  sources:
    - "IRMI Insurance Glossary, 'manuscript form or policy' (fetched 2026-10-10), sha256:d5cb32be678fc42bc2d7a367be03e7046cb8a470cd2b332eb72ee9d7eb9a9775 — https://www.irmi.com/term/insurance-definitions/manuscript-form-or-policy"
    - "IRMI Insurance Glossary, 'self contained policy' (fetched 2026-10-10), sha256:bf6aa36ad95643301e5205ea7339da26516fab9d72645a0998e4d30bab7e0fa1 — https://www.irmi.com/term/insurance-definitions/self-contained-policy"
    - "IRMI Insurance Glossary, 'coverage form' (fetched 2026-10-10), sha256:3b2efd2d9b604968430343a2504e9a7c8e0baecb929ceb1d67ab2fa7065a2744 — https://www.irmi.com/term/insurance-definitions/coverage-form"
    - "IRMI Insurance Glossary, 'endorsement' (fetched 2026-10-10), sha256:5806986e590bb3829918bbb5b020492be72a4e695df5a5d4cd2762d56f6240d9 — https://www.irmi.com/term/insurance-definitions/endorsement"
    - "IRMI Insurance Glossary, 'declarations' (fetched 2026-10-10), sha256:4a5f12e7b5f4f9eabf5b519cee03f5b46cdbd6d2f69e544e4c3f89afe40db29c — https://www.irmi.com/term/insurance-definitions/declarations"
    - "IRMI Insurance Glossary, 'insuring agreement' (fetched 2026-10-10), sha256:9edf607fea438a90ad44c611deee77d7866d809a96088da7ebc810860a49975f — https://www.irmi.com/term/insurance-definitions/insuring-agreement"
    - "IRMI Insurance Glossary, 'exclusion' (fetched 2026-10-10), sha256:97f68148c1497de089ad8471d0f95ee3f74ec75db149c52761f1382183cb64e7 — https://www.irmi.com/term/insurance-definitions/exclusion"
    - "IRMI Insurance Glossary, 'policy conditions' (fetched 2026-10-10), sha256:ab5225f0b2d79a69ce4994722a3f9db6e1b18a0820b75e48ea47fa46c0bae80f — https://www.irmi.com/term/insurance-definitions/policy-conditions"
    - "IRMI Insurance Glossary, 'package policy' (fetched 2026-10-10), sha256:0a3dba9b9d2eae68d1c37976d43e2812dfae52ed5ad7f4c8e597d5ede04dea75 — https://www.irmi.com/term/insurance-definitions/package-policy"
    - "IRMI Insurance Glossary, 'commercial package policy' (fetched 2026-10-10), sha256:46474c11ca899048a7e0c6159ebc1a01886a105ee593f8454a76002acd44098f — https://www.irmi.com/term/insurance-definitions/commercial-package-policy"
    - "Wollner, 'A Vote Against Broker-Drafted Manuscript Policies (in Most Cases)', IRMI Expert Commentary, April 2003 (fetched 2026-10-10), sha256:1f2013a05d6dce9552c6be284676609dfeb4b93f96402d918d29bc1419175407 — https://www.irmi.com/articles/expert-commentary/a-vote-against-broker-drafted-manuscript-policies-in-most-cases"
    - "ISO IL 00 17 11 98, Common Policy Conditions (RSUI copy), lead line, A, B, sha256:f1854d69221a8b317236ebd98e8ade32b3181dd0b4e28786526bdfef36c8029c — https://baservices.rsui.com/fs/api/docid/12603"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, A.3, B, E/F introductions, D (pp.2, 9-10, 13), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), form structure, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Policy Structure.md
---

**Insurance Policy Structure** is the way a policy is physically put together: which documents make it up, who drafted them, and where each kind of provision is found. A policy can be built from **preprinted** standard forms or written as a **manuscript** for one insured, and it can be **self-contained**, one document holding every insuring agreement, or **modular**, assembled from a declarations page, coverage forms, conditions forms and [[Endorsement|endorsements]]. Knowing the structure tells a reader where to look for the [[Policy Provisions|provisions]] that decide a claim.

> $$\text{Policy} = \text{Declarations} + \text{Form(s)} + \text{Endorsements}$$

> $$\begin{aligned} \text{Modular policy} = {} & \text{Common declarations} + \text{Common conditions} \\ & + \textstyle\sum_k \text{Coverage part}_k \end{aligned}$$

- **Symbols:** Coverage part $k$ is one line of coverage within the policy, such as commercial property or commercial general liability, made up of its own declarations, its coverage form or forms, its conditions and its endorsements.
- **Preprinted and manuscript:** Standard forms are drafted for insurers' use by insurance industry service organizations such as the American Association of Insurance Services (AAIS), Insurance Services Office (ISO) and the National Council on Compensation Insurance (NCCI), and are printed for use with many insureds. A **manuscript** form or policy is custom designed for one insured. Manuscript wording can meet a particular risk management goal, but it can lose the insured the protections courts give a standard form, such as construing ambiguous wording against the drafter ([[Insurance Contract Characteristics|contract of adhesion]]) when the insured or its broker helped write it. More often, a standard form is customized only a little, through endorsements.
- **Self-contained policies:** A self-contained policy is a single document containing all the insuring agreements between insurer and insured. It is often preprinted and standardized for a large number of insureds, and it is tailored through endorsements. The ISO homeowners form HO 00 03 is built this way: one form carries the definitions, the Section I property coverages and the Section II liability coverages, with their exclusions and conditions, and the declarations page and endorsements are attached to it.
- **Modular policies:** A modular policy is assembled from separate standardized forms. A **coverage form** is one of the primary forms used to construct the contract, and generally holds the insuring agreement, coverage conditions, exclusions and definitions. The ISO commercial package is the example: one set of Common Policy Declarations and the [[Common Policy Conditions]] (IL 00 17), which apply to every coverage part, plus coverage parts that are each built from forms. A commercial property coverage part combines its declarations, the [[Building and Personal Property Coverage Form]] (CP 00 10), a causes of loss form that the BPP refers to for both the covered causes of loss and the exclusions, and the [[Commercial Property Conditions]]. A commercial general liability coverage part is added the same way around the [[Commercial General Liability|CGL coverage form]] (CG 00 01). A package policy combines several coverages in this way, usually general liability and property.
- **Endorsements:** An endorsement is a form that changes or adds to the provisions of one or more other forms in the policy. It may broaden or restrict coverage, clarify how coverage applies to an unusual exposure, add insureds or add locations. Under the Common Policy Conditions the policy's terms can be amended or waived only by an endorsement the insurer issues.
- **Where each provision sits:** The **declarations** are the front page or pages: the named insured, address, policy period, locations, limits and other information that varies from insured to insured. **Definitions**, **insuring agreements**, **exclusions** and **conditions** are usually in the coverage form. Exclusions can also be in a causes of loss form, and conditions in a separate conditions form that applies to a whole coverage part or the whole policy. The categories themselves, and what each does, are on [[Policy Provisions]].

> [!example]- Sorting a Commercial Package {Example}
> A retailer's commercial package policy contains these documents: Common Policy Declarations; IL 00 17 Common Policy Conditions; Commercial Property declarations; CP 00 10 Building and Personal Property Coverage Form; a Causes of Loss – Special Form; Commercial Property Conditions; Commercial General Liability declarations; CG 00 01 Commercial General Liability Coverage Form; and an endorsement adding the retailer's landlord as an additional insured on the CGL. Group them by coverage part, and say which apply to the whole policy.
>
> > [!answer]-
> > - **Whole policy:** the Common Policy Declarations and IL 00 17, which applies to all coverage parts included in the policy.
> > - **Commercial property coverage part:** its declarations, CP 00 10, the causes of loss form and the Commercial Property Conditions. The BPP itself refers to the causes of loss form for what is covered and excluded, so neither form works alone.
> > - **Commercial general liability coverage part:** its declarations, CG 00 01 and the additional insured endorsement, which changes only that part.
> >
> > The policy is modular: each part was assembled from standard forms, and a different insured could take the same CGL part with a different property part.

> [!example]- Where Would You Look? {Example}
> For the package policy above, say where each answer is found.
>
> 1. How many days' notice the insurer must give before cancelling the whole policy for nonpayment.
> 2. The limit of insurance on the retailer's building.
> 3. Whether flood damage to the building is covered.
> 4. How a deductible is applied to a property loss.
>
> > [!answer]-
> > 1. **IL 00 17**, the Common Policy Conditions: 10 days for nonpayment of premium, 30 days for any other reason. Cancellation applies to the policy as a whole, so it sits in the common conditions.
> > 2. **The commercial property declarations**, because limits vary from insured to insured.
> > 3. **The causes of loss form**, which the BPP points to for its covered causes of loss and exclusions.
> > 4. **CP 00 10**, section D, Deductible, within the coverage form ([[Property Insurance Limits and Deductibles]]).

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is insurance policy structure. Expect questions that ask the difference between preprinted and manuscript forms or between self-contained and modular policies, or that list a set of documents and ask which coverage part or category each belongs to.
> - **Applied:** A question can describe a provision, such as a cancellation notice, a limit, a peril exclusion or an additional insured, and ask where in the policy it would be found.
> - **Linked objective:** The next objective, [[Policy Provisions|insurance policy provisions]], asks what each category of provision does, so questions often pair structure with function.

> [!warning]- Exam traps
> - **Common conditions are not in the coverage form:** In a commercial package, cancellation, changes, premiums and transfer of rights sit in IL 00 17 and apply to every coverage part.
> - **The BPP does not list its perils:** Covered causes of loss and their exclusions come from a separate causes of loss form. Looking for them in CP 00 10 finds only a cross-reference.
> - **Manuscript is not the same as endorsed:** An endorsement modifies a standard form; a manuscript form is drafted for one insured. Only the second risks losing the rule that ambiguities are construed against the insurer.
> - **Self-contained still uses endorsements:** A self-contained policy holds all its insuring agreements in one document, but it is tailored through endorsements.
