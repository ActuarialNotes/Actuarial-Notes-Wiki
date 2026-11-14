---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea1072d65bd574cc0333e379e0e1f7d24a363a0fae92ca55122c635450a314a7
  sources:
    - "ISO CG 20 10 04 13 Additional Insured – Owners, Lessees or Contractors – Scheduled Person or Organization (City of Hayward sample), paras A-C, sha256:1b76886d2dc2530490dd2f276acf6cacd08529e5fc75b33ed76b0cf3a15aba04 — https://hayward-ca.gov/sites/default/files/documents/Sample-Additional-Insured_0.pdf"
    - "DASNY sample endorsements: ISO CG 20 10 04 13, CG 20 37 04 13, CG 20 01 04 13, CG 20 37 04 13 paras A-B; CG 20 01 04 13, sha256:dcb2734e92fede914e0caaf08f46ba527e34cfde7c218b021bd970a0315ee2a1 — https://www.dasny.org/sites/default/files/rfp-documents/2024-01/5b.%20Sample%20Endorsement.pdf"
    - "ISO CG 24 04 05 09 Waiver of Transfer of Rights of Recovery Against Others to Us, full text, sha256:9b2b5c2d0afcd1dfd98d7bdc7595929ba25980b93e947439f3cab050947200de — https://www.mofbinsurance.com/Content/PDFs/PolicyForms/CPP/CG24040509.pdf"
    - "ISO CG 25 03 05 09 Designated Construction Project(s) General Aggregate Limit (NY OGS SPC Exhibit 21), paras A-E, sha256:509a3393d259f4582657f70278d7e328c56fcf7c1af5b0fc3fc6a091ec1bec17 — https://ogs.ny.gov/spc-exhibit-21"
    - "Ted Kinney, 'Liquor Liability Coverage Changes under New ISO Forms', IA Magazine, May 23 2013, liquor endorsements CG 21 50/21 51/29 52/29 53, sha256:a58026708cc1e9f3a44e92763eb3f3fd58afd33720eaca1357199cf9de997431 — https://www.iamagazine.com/2013/05/23/liquor-liability-coverage-changes-under-new-iso-forms/"
    - "FC&S Editors, 'Claims-Made CGL Form' (PropertyCasualty360, Feb 18 2014), reproducing CG 00 02 04 13 Coverage A/B triggers, conditions and Section V Extended Reporting Periods, CG 00 02 04 13 Coverage A trigger and Section V Extended Reporting Periods paras 1-6, sha256:50deda297f1951ab725a435ed84e2aef1287e833a2365374cede46df9213a9b7 — https://www.propertycasualty360.com/fcs/2014/02/18/claims-made-cgl-form"
    - "Craig F. Stanovich, 'The Claims-Made CGL Policy' (Austin & Stanovich / IRMI Expert Commentary, Nov 2012), pp.1-5, retroactive date, BERP, SERP, sha256:ecdd3b4915a46649d53fd844be39f49d3994758f9e0ed6028230f208b76d497f — https://austinstanovich.com/pdf/claims-made-cgl-policy.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/CGL Endorsements.md
---

A **CGL Endorsement** is an ISO form attached to the [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01) that changes what it covers, by adding insureds, restricting or broadening coverage, changing how limits or other insurance apply, or waiving the insurer's rights. An [[Endorsement|endorsement]] overrides the printed form, so a coverage question about a CGL is answered from the form as endorsed.

The endorsements a contract most often calls for are:

| Form | Endorsement | What it changes |
| :--- | :--- | :--- |
| CG 20 10 04 13 | Additional Insured – Owners, Lessees or Contractors – Scheduled Person or Organization | Adds insureds for the named insured's ongoing operations |
| CG 20 37 04 13 | Additional Insured – Owners, Lessees or Contractors – Completed Operations | Adds insureds for the named insured's completed work |
| CG 20 01 04 13 | Primary and Noncontributory – Other Insurance Condition | Makes the policy pay first for an additional insured |
| CG 24 04 05 09 | Waiver of Transfer of Rights of Recovery Against Others to Us | Waives subrogation against a scheduled party |
| CG 25 03 05 09 | Designated Construction Project(s) General Aggregate Limit | Gives each scheduled project its own aggregate |

In the 2013 revision ISO also revised the endorsements that amend the liquor liability exclusion (CG 21 50 and CG 21 51, with products-completed operations versions CG 29 52 and CG 29 53). CG 21 50 extends the exclusion to businesses that regularly serve alcohol whether or not for profit, and CG 21 51 adds an exception for scheduled activities ([[CGL Coverage A Exclusions]]). The same coverage part can also be written on ISO's claims-made form, CG 00 02, instead of the occurrence form.

## Additional insured endorsements

CG 20 10 amends [[CGL Who Is an Insured|Who Is an Insured]] to include the scheduled persons or organizations, but only for bodily injury, property damage or personal and advertising injury caused in whole or in part by the named insured's acts or omissions, or those of people acting on its behalf, in performing its ongoing operations for the additional insured at the scheduled locations. It excludes injury or damage occurring after all the work on the project to be performed by or for the additional insured at the location is completed, or after the part of the named insured's work causing the injury has been put to its intended use by anyone other than another contractor on the same project.

CG 20 37 covers the scheduled persons or organizations for bodily injury or property damage caused in whole or in part by the named insured's work at the scheduled location, performed for that additional insured and within the products-completed operations hazard. CG 20 10 and CG 20 37 are used together to cover a project owner during and after the work. Both only add insureds. They don't set the order of payment or waive subrogation.

Both apply only to the extent permitted by law, and if a contract requires the coverage, it is no broader than the contract requires. The endorsement does not increase the limits. When a contract requires the coverage, the most paid on the additional insured's behalf is

> $$\text{Paid}_{\text{AI}} = \min\left(D_{\text{AI}},\ L_{\text{contract}},\ L_{\text{policy}}\right)$$

- $D_{\text{AI}}$ is the damages covered for the additional insured.
- $L_{\text{contract}}$ is the amount of insurance the contract requires.
- $L_{\text{policy}}$ is what is available under the policy's limits.

> [!example]- Which of these three suits against the project owner does the contractor's CG 20 10 cover? {Example}
> A plumbing contractor's CGL has a $\$2{,}000{,}000$ each occurrence limit and carries CG 20 10 04 13 scheduling a project owner at the job site. The construction contract requires the contractor to insure the owner for $\$1{,}000{,}000$.
>
> - (a) While the plumbing work is under way, a visitor trips over the contractor's pipes left on the owner's floor and sues the owner for $\$1{,}500{,}000$.
> - (b) A visitor slips on ice in the owner's parking lot, which the owner was responsible for clearing. The contractor's work had nothing to do with it.
> - (c) Eight months after the building is finished and occupied, a pipe the contractor installed bursts and injures a tenant, who sues the owner.
>
> > [!answer]-
> > - Suit (a) is covered, because the injury was caused at least in part by the named insured's acts in performing ongoing operations for the owner at the scheduled location.
> > - The owner is paid $\min(1{,}500{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) = \$1{,}000{,}000$, the contract amount.
> > - Suit (b) is not covered. The injury was not caused in whole or in part by the contractor's acts or omissions, so the owner is not an additional insured for it.
> > - Suit (c) is not covered by CG 20 10, whose exclusion removes injury occurring after the project's work is completed. The owner needed CG 20 37.

## Primary and noncontributory, and waiver of subrogation

CG 20 01 makes the policy primary to, and not seek contribution from, other insurance available to an additional insured under which that additional insured is a named insured, provided the named insured agreed in a written contract that its insurance would be primary and noncontributory. Without it, the [[CGL Conditions|other insurance condition]] could have the policies share.

CG 24 04 adds to the transfer of rights of recovery condition. The insurer waives its right to recover from the scheduled person or organization for payments arising out of the named insured's ongoing operations, or its work done under a contract with that party and included in the products-completed operations hazard. It applies only to the scheduled party.

## Designated construction project aggregate

CG 25 03 gives each scheduled construction project its own aggregate, equal to the general aggregate in the declarations, for Coverage A damages (other than products-completed operations) and Coverage C medical expenses attributable only to ongoing operations at that single project. Payments for one project reduce only that project's aggregate. Losses not attributable to a single project reduce the general aggregate or the products-completed operations aggregate as usual, and products-completed operations claims reduce only that aggregate. The each occurrence, damage to premises rented and medical expense limits still apply ([[CGL Limits of Insurance]]). A project that is delayed, abandoned and restarted, or changed from its plans, is still the same project. The endorsement does not change which policy pays first.

> [!example]- What does the insurer pay this general contractor in the policy year? {Example}
> A general contractor's CGL has a $\$1{,}000{,}000$ each occurrence limit, a $\$2{,}000{,}000$ general aggregate and a $\$2{,}000{,}000$ products-completed operations aggregate, with CG 25 03 scheduling its projects. In one policy year:
>
> | Source | Occurrences ($) |
> | :--- | ---: |
> | Ongoing operations at Project X | 900,000; 800,000; 800,000 |
> | Ongoing operations at Project Y | 700,000 |
> | Visitor at the contractor's own office | 400,000 |
> | Building finished last year (completed operations) | 600,000 |
>
> > [!answer]-
> > - Project X has its own $\$2{,}000{,}000$ aggregate. Its first two occurrences use $\$1{,}700{,}000$ of it.
> > - The third Project X occurrence is cut to the $\$300{,}000$ left, so Project X is paid $\$2{,}000{,}000$.
> > - Project Y's $\$700{,}000$ reduces only Project Y's aggregate.
> > - The office claim is not attributable to a single project, so its $\$400{,}000$ reduces the general aggregate.
> > - The completed operations claim's $\$600{,}000$ reduces only the products-completed operations aggregate.
> > - The insurer pays $2{,}000{,}000 + 700{,}000 + 400{,}000 + 600{,}000 = \$3{,}700{,}000$. Without the endorsement, the four ongoing-operations claims and the office claim would all share one $\$2{,}000{,}000$ general aggregate.

## The claims-made CGL

The claims-made CGL, CG 00 02, is triggered when a claim is first made against an insured during the policy period or an extended reporting period ([[Claims Made Coverage]]). The bodily injury or property damage must still be caused by an occurrence, and must not occur before the retroactive date in the declarations or after the policy period ends. The retroactive date applies to the date of the injury or damage, not to the date of the act that caused it. It stops an insured from buying coverage for injury that has already happened.

If a claims-made CGL is cancelled or not renewed, replaced with an occurrence policy, or renewed with a later retroactive date, a basic extended reporting period applies automatically at no charge. A claim from an occurrence reported to the insurer no later than 60 days after the policy ends is covered if made within five years after the end of the policy. A claim from an unreported occurrence is covered only if made within 60 days after the policy ends. The basic period does not apply if later insurance covers the claim, and it does not reinstate the aggregate limits.

The insured may elect, in writing within 60 days after the policy ends, an optional supplemental extended reporting period of unlimited duration, for an additional premium capped at 200% of the annual premium. It starts when the basic period ends, reinstates the aggregate limits for the claims it covers, and is excess over other valid insurance. Neither period covers injury that occurs after the policy period.

> [!example]- Which of these five claims does the claims-made CGL cover? {Example}
> A claims-made CGL runs from January 1, 2025 to January 1, 2026 with a retroactive date of January 1, 2023, and is not renewed. No supplemental extended reporting period is bought.
>
> | Claim | Injury | Reported to the insurer | Claim made |
> | :--- | :--- | :--- | :--- |
> | (a) | March 2022 | | June 2025 |
> | (b) | August 2025 | December 2025 | February 2027 |
> | (c) | September 2025 | Never | February 15, 2026 |
> | (d) | October 2025 | Never | June 2026 |
> | (e) | February 2026 | | March 2026 |
>
> > [!answer]-
> > - Claim (a) is not covered, because the injury occurred before the retroactive date.
> > - Claim (b) is covered. The occurrence was reported within 60 days after the policy ended (in fact during it), so the basic period lasts five years.
> > - Claim (c) is covered. For an unreported occurrence, the basic period covers claims made within 60 days after the policy ends, which is by March 2, 2026.
> > - Claim (d) is not covered, because it came after the 60-day window and the occurrence wasn't reported. A supplemental period elected within 60 days would have covered it.
> > - Claim (e) is not covered, because the injury happened after the policy period.

> [!trap] Covering the additional insured's sole negligence
> CG 20 10 and CG 20 37 cover the additional insured only for injury caused at least in part by the named insured or those acting for it. An injury caused by the additional insured alone, such as the owner's icy parking lot, is not covered.
