---
aliases:
  - Umbrella Liability
  - Excess Liability
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0c7ccab7493779636383ceb8db0f605d3147c0180de3d667fe5382132582dfff
  sources:
    - "ISO CU 00 01 04 13 Commercial Liability Umbrella Coverage Form, IV.13 Maintenance Of/Changes To Underlying Insurance; V 'retained limit', 'self-insured retention'; limits ¶5, sha256:cc5fa6ae2dd91ff4ab9b7820b132a73da1d6681521a8ce25a33471459edcd405 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CU+00+01&ed=04-13"
    - "IRMI Glossary, 'umbrella liability policy', entry, sha256:5cce6a9bbdf4f78a8916a7a9cd477c31d14051abe9f552582a8af7b7e6e14268 — https://www.irmi.com/term/insurance-definitions/umbrella-liability-policy"
    - "IRMI Glossary, 'excess liability policy', entry, sha256:8400c1a7acec64412e464cfeb44e9a19b1bd14cbc14a81d33caaee9f680e2d38 — https://www.irmi.com/term/insurance-definitions/excess-liability-policy"
    - "IRMI Glossary, 'self-insured retention (SIR)', entry, sha256:cc734858023b47db3112cb5e4f0ff025ca8f50ad098792ee7110f802a7c5cca6 — https://www.irmi.com/term/insurance-definitions/self-insured-retention"
    - "Rough Notes, 'PF&M at a Glance' — ISO Commercial Liability Umbrella (April 2008), underwriting paragraphs, sha256:e3b7dcc9d8afbdd93ef2cc9a887f3273e8497f2246b8cf769c79becb5fab1f4f — https://roughnotes.com/rnmagazine/2008/april08/04p016.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Umbrella Liability Insurance.md
---
**Umbrella Liability Insurance** provides high [[Liability Insurance|liability]] limits above several primary policies at once, typically [[Commercial General Liability|general liability]], business auto liability and employers liability, and also covers some claims those policies don't, above a [[Self-Insured Retention|self-insured retention]]. **Excess liability insurance** is the narrower form of the same idea: it adds limits above one or more underlying policies without broadening their coverage. Both are forms of [[Excess Insurance|excess insurance]], responding only to the part of a claim above what the insured or the primary insurers retain.

> $$A_k = \begin{cases} \min\big(L_u,\ G_{k-1}\big) & \text{underlying covers} \\ S & \text{umbrella only} \end{cases}$$

> $$\text{Paid}_k = \min\big((X_k - A_k)^+,\ L\big)$$

- **Symbols:** $X_k$ is the damages from occurrence $k$, $L_u$ is the underlying policy's each occurrence limit and $G_{k-1}$ is what remains of its aggregate before the occurrence. $S$ is the self-insured retention that applies to claims the underlying policies do not cover, and $L$ is the umbrella's each occurrence limit. $A_k$ is the retained limit, the amount below which the umbrella does not pay.
- **Excess forms:** An excess policy can be following form, subject to the same terms as the underlying policy, so it covers a claim only if the underlying policy does. It can be self-contained, with its own insuring agreement and exclusions, or a combination that follows the underlying form except where it states otherwise. A self-contained excess policy can be narrower than the underlying coverage, leaving a gap the insured bears.
- **Drop-down over exhausted aggregates:** When an underlying aggregate has been reduced, the umbrella attaches at the reduced amount, and when it has been exhausted the umbrella pays from the first dollar in its place. Without this feature, claims late in a bad policy year would fall on the insured.
- **Drop-down for uncovered claims:** An umbrella also covers some claims that no underlying policy covers, such as a claim from outside the underlying coverage territory or an exposure the primary forms exclude. For those claims the insured first retains the self-insured retention, and the umbrella pays the rest up to its limit.
- **Required underlying insurance:** The declarations schedule the underlying policies and their minimum limits, and the insured must keep them in force. If an underlying policy lapses or its limits are reduced, the umbrella still pays only what it would have paid had the scheduled insurance been in force, so the insured bears the gap.
- **Underwriting:** The underwriter of a commercial umbrella or excess policy relies on the primary insurers' underwriting and reviews the underlying policies, their limits and the insurers that write them. The exposures that drive severity matter most, such as a large auto fleet, products sold widely or a hazardous operation, together with loss history and the exposures the umbrella covers that the primary policies don't. Claims are rare but severe, so experience is seldom credible, and pricing leans on [[Increased Limits|increased limits]] and judgment.

> [!example]- An Umbrella Across One Year of Claims {Example}
> A contractor's CGL policy has a \$1,000,000 each occurrence limit and a \$2,000,000 general aggregate. Its umbrella has a \$5,000,000 limit and a \$25,000 self-insured retention. During the year, in this order:
>
> 1. A worksite injury to a member of the public settles for \$1,600,000.
> 2. A crane accident damages a neighboring building, settling for \$1,300,000.
> 3. A pedestrian struck by falling debris recovers \$700,000.
> 4. A suit arising from work abroad, outside the CGL's coverage territory but within the umbrella's, settles for \$250,000.
>
> What does the umbrella pay on each?
>
> > [!answer]-
> > The first two claims attach at the full occurrence limit, and together they exhaust the general aggregate.
> > $$
> > \begin{align*}
> > \text{Paid}_1 &= 1{,}600{,}000 - 1{,}000{,}000 \\
> > &= 600{,}000 \\
> > G_1 &= 2{,}000{,}000 - 1{,}000{,}000 \\
> > &= 1{,}000{,}000 \\
> > \text{Paid}_2 &= 1{,}300{,}000 - \min(1{,}000{,}000,\ 1{,}000{,}000) \\
> > &= 300{,}000
> > \end{align*}
> > $$
> > After the second claim $G_2 = 0$, so the umbrella drops down and pays the third claim from the first dollar, \$700,000. The fourth claim is not covered by the CGL, so the retention applies.
> > $$
> > \begin{align*}
> > \text{Paid}_4 &= 250{,}000 - 25{,}000 \\
> > &= 225{,}000
> > \end{align*}
> > $$
> > The umbrella pays \$1,825,000 in total. With a following form excess policy instead, it would have paid the same on the first three claims if the policy dropped down over the exhausted aggregate, but nothing on the fourth, which the underlying policy excludes.

> [!example]- A Lapsed Underlying Limit {Example}
> A distributor's \$5,000,000 umbrella requires underlying business auto liability of \$1,000,000 per accident. At renewal the distributor cuts its auto limit to \$500,000 to save premium. A delivery truck then causes an accident with damages of \$1,800,000. How is the loss shared?
>
> > [!answer]-
> > The umbrella pays as if the required \$1,000,000 had been in force.
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{umb}} &= \min(1{,}800{,}000 - 1{,}000{,}000,\ 5{,}000{,}000) \\
> > &= 800{,}000 \\
> > \text{Gap} &= 1{,}000{,}000 - 500{,}000 \\
> > &= 500{,}000
> > \end{align*}
> > $$
> > The auto insurer pays \$500,000, the umbrella \$800,000, and the distributor \$500,000 of its own money, the gap between the required and the actual underlying limit. The premium saved on the auto policy was small next to that.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask how excess and umbrella policies differ, what following form means, and how an umbrella responds when an underlying aggregate is exhausted or when a claim is not covered by the underlying policies. Applied questions allocate a claim among the primary policy, the umbrella and the insured.
> - **DISC-RM:** The underwriting questions ask what a commercial umbrella or excess underwriter evaluates, including the underlying policies and insurers, the severity exposures and the required underlying limits.
> - **GI-302:** Candidates describe excess liability and umbrella liability among the specialty coverages, alongside professional liability, cyber, surety and terrorism.

> [!warning]- Exam traps
> - **Umbrella is not just excess:** An excess policy only adds limits. An umbrella also covers some claims the underlying policies exclude, above a self-insured retention, so an answer that pays nothing on such a claim under an umbrella is wrong.
> - **The retention applies only to uncovered claims:** A claim the underlying policy covers attaches at the underlying limit, not at the self-insured retention. Subtracting the retention from a claim above the primary limit double counts it.
> - **Exhausted aggregate:** Once the underlying aggregate is used up, the umbrella attaches at zero for claims the underlying policy would have covered. Attaching it at the occurrence limit leaves the insured with a loss the umbrella pays.
> - **The insured fills the gap:** If required underlying insurance is not maintained, the umbrella does not drop down to cover the shortfall. The insured pays it.
