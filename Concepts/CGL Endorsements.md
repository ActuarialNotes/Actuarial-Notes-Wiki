---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa6a224e774cecb4fc79eb5253829b61cb18da5134a9576df07137d1b3f65b5c
  sources:
    - "ISO CG 20 10 04 13 Additional Insured – Owners, Lessees or Contractors – Scheduled Person or Organization (City of Hayward sample), paras A-C, sha256:1b76886d2dc2530490dd2f276acf6cacd08529e5fc75b33ed76b0cf3a15aba04 — https://hayward-ca.gov/sites/default/files/documents/Sample-Additional-Insured_0.pdf"
    - "DASNY sample endorsements: ISO CG 20 10 04 13, CG 20 37 04 13, CG 20 01 04 13, CG 20 37 04 13 paras A-B; CG 20 01 04 13, sha256:dcb2734e92fede914e0caaf08f46ba527e34cfde7c218b021bd970a0315ee2a1 — https://www.dasny.org/sites/default/files/rfp-documents/2024-01/5b.%20Sample%20Endorsement.pdf"
    - "ISO CG 24 04 05 09 Waiver of Transfer of Rights of Recovery Against Others to Us, full text, sha256:9b2b5c2d0afcd1dfd98d7bdc7595929ba25980b93e947439f3cab050947200de — https://www.mofbinsurance.com/Content/PDFs/PolicyForms/CPP/CG24040509.pdf"
    - "ISO CG 25 03 05 09 Designated Construction Project(s) General Aggregate Limit (NY OGS SPC Exhibit 21), paras A-E, sha256:509a3393d259f4582657f70278d7e328c56fcf7c1af5b0fc3fc6a091ec1bec17 — https://ogs.ny.gov/spc-exhibit-21"
    - "Ted Kinney, 'Liquor Liability Coverage Changes under New ISO Forms', IA Magazine, May 23 2013, liquor endorsements CG 21 50/21 51/29 52/29 53, sha256:a58026708cc1e9f3a44e92763eb3f3fd58afd33720eaca1357199cf9de997431 — https://www.iamagazine.com/2013/05/23/liquor-liability-coverage-changes-under-new-iso-forms/"
    - "FC&S Editors, 'Claims-Made CGL Form' (PropertyCasualty360, Feb 18 2014), reproducing CG 00 02 04 13 Coverage A/B triggers, conditions and Section V Extended Reporting Periods, CG 00 02 04 13 Coverage A trigger and Section V Extended Reporting Periods paras 1-6, sha256:50deda297f1951ab725a435ed84e2aef1287e833a2365374cede46df9213a9b7 — https://www.propertycasualty360.com/fcs/2014/02/18/claims-made-cgl-form"
    - "Craig F. Stanovich, 'The Claims-Made CGL Policy' (Austin & Stanovich / IRMI Expert Commentary, Nov 2012), pp.1-5, retroactive date, BERP, SERP, sha256:ecdd3b4915a46649d53fd844be39f49d3994758f9e0ed6028230f208b76d497f — https://austinstanovich.com/pdf/claims-made-cgl-policy.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/CGL Endorsements.md
---

**CGL endorsements** are the ISO forms attached to the [[Commercial General Liability|Commercial General Liability Coverage Form]] (CG 00 01) that change what it covers: adding insureds, restricting or broadening coverage, changing how limits or other insurance apply, or waiving the insurer's rights. An [[Endorsement|endorsement]] overrides the printed form, so a coverage question about a CGL is answered from the form as endorsed. The same coverage part can also be written on ISO's claims-made form, CG 00 02, instead of the occurrence form.

> $$\text{Paid}_{\text{AI}} = \min\left(D_{\text{AI}},\ L_{\text{contract}},\ L_{\text{policy}}\right)$$

> $$G_p = G \quad \text{for each designated project } p$$

- **Symbols:** Under an additional insured endorsement, $D_{\text{AI}}$ is the damages covered for the additional insured, $L_{\text{contract}}$ is the amount of insurance the contract with it requires, and $L_{\text{policy}}$ is what is available under the policy's limits. Under the designated construction project aggregate endorsement, $G_p$ is project $p$'s own aggregate, equal to the general aggregate $G$ in the declarations.
- **Adding insureds, ongoing operations (CG 20 10 04 13):** Additional Insured – Owners, Lessees or Contractors – Scheduled Person or Organization amends [[CGL Who Is an Insured|Who Is an Insured]] to include the scheduled persons or organizations, but only for bodily injury, property damage or personal and advertising injury caused in whole or in part by the named insured's acts or omissions, or those of people acting on its behalf, in performing its ongoing operations for the additional insured at the scheduled locations. The coverage applies only to the extent permitted by law, and if a contract requires it, it is no broader than the contract requires.
- **Its exclusions and limit:** CG 20 10 excludes injury or damage occurring after all the work on the project to be performed by or for the additional insured at the location is completed, or after the part of the named insured's work causing the injury has been put to its intended use by anyone other than another contractor on the same project. When a contract requires the coverage, the most paid on the additional insured's behalf is the lesser of the amount the contract requires and the limits available, and the endorsement does not increase the limits.
- **Adding insureds, completed operations (CG 20 37 04 13):** Additional Insured – Owners, Lessees or Contractors – Completed Operations covers the scheduled persons or organizations for bodily injury or property damage caused in whole or in part by the named insured's work at the scheduled location, performed for that additional insured and within the products-completed operations hazard. It carries the same "to the extent permitted by law", "no broader than the contract" and lesser-of-contract-or-limits terms. CG 20 10 and CG 20 37 are used together to cover a project owner during and after the work.
- **Other insurance (CG 20 01 04 13):** Primary and Noncontributory – Other Insurance Condition makes the policy primary to, and not seek contribution from, other insurance available to an additional insured under which that additional insured is a named insured, provided the named insured agreed in a written contract that its insurance would be primary and noncontributory. Without it, the [[CGL Conditions|other insurance condition]] could have the policies share.
- **Waiving subrogation (CG 24 04 05 09):** Waiver of Transfer of Rights of Recovery Against Others to Us adds to the transfer of rights of recovery condition: the insurer waives its right to recover from the scheduled person or organization for payments arising out of the named insured's ongoing operations or its work done under a contract with that party and included in the products-completed operations hazard. It applies only to the scheduled party.
- **Changing the aggregate (CG 25 03 05 09):** Designated Construction Project(s) General Aggregate Limit gives each scheduled construction project its own aggregate, equal to the general aggregate, for Coverage A damages (other than products-completed operations) and Coverage C medical expenses attributable only to ongoing operations at that single project. Payments for one project reduce only that project's aggregate; losses not attributable to a single project reduce the general aggregate or the products-completed operations aggregate as usual; products-completed operations claims reduce only that aggregate. The each occurrence, damage to premises rented and medical expense limits still apply, and a project that is delayed, abandoned and restarted, or changed from its plans, is still the same project ([[CGL Limits of Insurance]]).
- **Amending the liquor exclusion:** In the 2013 revision ISO issued endorsements that amend the liquor liability exclusion (CG 21 50 and CG 21 51, with products-completed operations versions CG 29 52 and CG 29 53); CG 21 50 extends the exclusion to businesses that regularly serve alcohol whether or not for profit, and CG 21 51 adds an exception for scheduled activities ([[CGL Coverage A Exclusions]]).
- **The claims-made version (CG 00 02):** The claims-made CGL is triggered when a claim is first made against an insured during the policy period (or an extended reporting period), and the bodily injury or property damage must still be caused by an occurrence and must not occur before the retroactive date in the declarations or after the policy period ends ([[Claims Made Coverage]]). The retroactive date applies to the date of the injury or damage, not to the date of the act that caused it, and it stops an insured from buying coverage for injury that has already happened.
- **Basic extended reporting period:** If a claims-made CGL is cancelled or not renewed, replaced with an occurrence policy, or renewed with a later retroactive date, a basic extended reporting period applies automatically at no charge. A claim from an occurrence reported to the insurer no later than 60 days after the policy ends is covered if made within five years after the end of the policy; a claim from an unreported occurrence is covered only if made within 60 days after the policy ends. It does not apply if later insurance covers the claim, and it does not reinstate the aggregate limits.
- **Supplemental extended reporting period:** The insured may elect, in writing within 60 days after the policy ends, an optional supplemental extended reporting period of unlimited duration, for an additional premium capped at 200% of the annual premium. It starts when the basic period ends, reinstates the aggregate limits for the claims it covers, and is excess over other valid insurance. Neither tail covers injury that occurs after the policy period.

> [!example]- A Project Owner as Additional Insured {Example}
> A plumbing contractor's CGL has a \$2,000,000 each occurrence limit and carries CG 20 10 04 13 scheduling a project owner at the job site. The construction contract requires the contractor to insure the owner for \$1,000,000. (a) While the plumbing work is under way, a visitor trips over the contractor's pipes left on the owner's floor and sues the owner for \$1,500,000. (b) A visitor slips on ice in the owner's parking lot, which the owner was responsible for clearing; the contractor's work had nothing to do with it. (c) Eight months after the building is finished and occupied, a pipe the contractor installed bursts and injures a tenant, who sues the owner.
>
> > [!answer]-
> > - **(a) Covered up to \$1,000,000:** The injury was caused, at least in part, by the named insured's acts in performing ongoing operations for the owner at the scheduled location. The most paid on the owner's behalf is the lesser of the contract amount and the available limit.
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{AI}} &= \min(1{,}500{,}000,\ 1{,}000{,}000,\ 2{,}000{,}000) \\
> > &= 1{,}000{,}000
> > \end{align*}
> > $$
> > - **(b) Not covered:** The injury was not caused in whole or in part by the contractor's acts or omissions, so the owner is not an additional insured for it.
> > - **(c) Not covered by CG 20 10:** Its exclusion removes injury occurring after the project's work is completed. The owner needed CG 20 37, the completed operations additional insured endorsement.

> [!example]- Three Projects, Three Aggregates {Example}
> A general contractor's CGL has a \$1,000,000 each occurrence limit, a \$2,000,000 general aggregate and a \$2,000,000 products-completed operations aggregate, with CG 25 03 scheduling its projects. In one policy year, ongoing operations at Project X produce three occurrences of \$900,000, \$800,000 and \$800,000; ongoing operations at Project Y produce one of \$700,000; a visitor at the contractor's own office recovers \$400,000; and a building finished last year causes a \$600,000 completed operations claim. What does the insurer pay?
>
> > [!answer]-
> > Project X has its own \$2,000,000 aggregate, so its third occurrence is cut to what is left.
> > $$
> > \begin{align*}
> > \text{Paid}_X &= 900{,}000 + 800{,}000 + \min(800{,}000,\ 2{,}000{,}000 - 1{,}700{,}000) \\
> > &= 2{,}000{,}000 \\
> > \text{Total} &= 2{,}000{,}000 + 700{,}000 + 400{,}000 + 600{,}000 \\
> > &= 3{,}700{,}000
> > \end{align*}
> > $$
> > Project Y's claim reduces only Project Y's aggregate, the office claim (not attributable to a single project) reduces the general aggregate, and the completed operations claim reduces only the products-completed operations aggregate. Without the endorsement, the first four ongoing-operations claims and the office claim would all share one \$2,000,000 general aggregate.

> [!example]- When Does a Claims-Made CGL Respond? {Example}
> A claims-made CGL runs from January 1, 2025 to January 1, 2026 with a retroactive date of January 1, 2023, and is not renewed. No supplemental tail is bought. Which claims are covered? (a) Injury in March 2022, claim made in June 2025. (b) Injury in August 2025, reported to the insurer in December 2025, claim made in February 2027. (c) Injury in September 2025, never reported, claim made on February 15, 2026. (d) Injury in October 2025, never reported, claim made in June 2026. (e) Injury in February 2026, claim made in March 2026.
>
> > [!answer]-
> > - **(a) No:** The injury occurred before the retroactive date.
> > - **(b) Yes:** The occurrence was reported within 60 days after the policy ended (in fact during it), so the basic extended reporting period lasts five years, and a claim in February 2027 is treated as made during the policy period.
> > - **(c) Yes:** For an unreported occurrence, the basic period covers claims made within 60 days after the policy ends, which is by March 2, 2026.
> > - **(d) No:** The claim came after the 60-day window and the occurrence wasn't reported. A supplemental extended reporting period, elected within 60 days, would have covered it.
> > - **(e) No:** The injury happened after the policy period. No extended reporting period covers injury that occurs after the policy ends.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Section 11's "Modifying the CGL Coverage Form" objective asks how endorsements add insureds, restrict or broaden coverage, and how the claims-made version differs from the occurrence form.
> - **Applied questions:** A contract case asks which endorsement gives a project owner what it requires: additional insured status for ongoing or completed operations, primary and noncontributory, or a waiver of subrogation.
> - **Claims-made timing:** A timeline question gives injury, report and claim dates and asks which are covered under the retroactive date and the extended reporting periods.

> [!warning]- Exam traps
> - **Caused in whole or in part:** The CG 20 10 and CG 20 37 additional insured endorsements cover the additional insured only for injury caused at least in part by the named insured or those acting for it, not for the additional insured's own sole negligence.
> - **Ongoing versus completed:** CG 20 10 stops covering the additional insured once the work is completed; completed operations need CG 20 37.
> - **Contract caps the coverage:** The additional insured gets no broader coverage, and no more limit, than the contract requires.
> - **The retroactive date is about injury:** On a claims-made CGL the retroactive date tests when the injury or damage occurred, not when the work was done.
> - **Tails don't add injury dates:** Extended reporting periods extend the time to make a claim; they never cover injury occurring after the policy ends. Only the supplemental period reinstates the aggregates.
