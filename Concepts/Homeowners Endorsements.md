---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:59abef2f9de917bdac2145a5c2e02c9396c8592ede5b3bd58b6ae331d4e28ad3
  sources:
    - "ISO HO 04 54 10 00 Earthquake (© ISO 1999), A–D, p.1, sha256:482ba852fa920fddc10d71f40081a7f0b4f696c9a8a0680a08a7e7787c4998f1 — https://soi.policyport.com/wp-content/uploads/2018/04/HO-04-54-10-00.pdf"
    - "ISO HO 04 42 10 00 Permitted Incidental Occupancies (© ISO 1999), Sections I and II, p.1, sha256:89d06b98eeaae4308e3614f7eea1aa113622835c63397b912aca06b8c69991cd — https://soi.policyport.com/wp-content/uploads/2018/04/HO-04-42-10-00.pdf"
    - "ISO HO 04 77 10 00 Ordinance Or Law Increased Amount Of Coverage (© ISO 1999), p.1, sha256:7494ac8507e7e3e28492c8367e5c9d3383f46ab58b41a43ffd07c4114ab65f2a — https://www.iiat.org/uploads/files/general/InfoCentral/Homeowners/h04771000.pdf"
    - "ISO HO 24 82 04 91 Personal Injury (© ISO 1990; Auto Club forms index copy), whole form, sha256:7f6262e729c9c3bf94aaa21cc174fd32265920cbb4dc494af4ad7a6d429c0a01 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/IN/HomeOwners/HO248204-91.html"
    - "ISO HO 04 90 04 91 Personal Property Replacement Cost (© ISO 1990; Auto Club forms index copy), paragraphs 1–2, sha256:869c43c273d3f479e07e17436267f6a0826ed0b772e49f3f41eaae2427203790 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/AR/HomeOwners/HO049004-91.html"
    - "Auto Club Family Ins. Co. CO 04 90 07 05 Personal Property Replacement Cost (includes ISO material), paragraphs 1–2, sha256:c26f3d8c14eae615b11df8fdedb8247b4a65e38d317a1e07054a53a00a26c476 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/AR/HomeOwners/CO049007-05.html"
    - "Auto Club CO 04 95 11 03 Water Back Up and Sump Overflow (includes ISO material © 1992), paragraphs 1–4, sha256:3ffc9e81782703c089c92ff24f282272c4dcbf28f54ca53847f7dfa1d527fe23 — https://services.autoclubmo.aaa.com/InsuranceAux/Forms/AR/HomeOwners/CO049511-03.html"
    - "PF&M, HO 04 61 Scheduled Personal Property Endorsement (July 2017), Classes, Newly Acquired, Perils, Loss Settlement, sha256:66876bbc748c7b6b2a29da3994ff0cfa3e064e29abc648d00d17aa54ea42c853 — https://www.aeblyandassociates.com/Portals/0/ISO%20Scheduled%20Personal%20Property.pdf"
    - "PF&M Analysis, ISO Homeowners Optional Coverage Endorsements (July 2014), entries HO 04 20, 04 55, 04 60, 04 65/66, 04 90, 04 95, 07 01, 24 10, 24 75, 24 77, sha256:30d362c5d7646426712b329f7fcc730c605eecad660479b01d5b9dbda2ffe11c — https://wvohoa.org/wp-content/uploads/2017/06/2014_HomeownersOptionalCoverageInsurance.pdf (host answered 403 to a direct fetch this run; read from a byte-identical copy, sha256 verified)"
    - "ISO Homeowners 3 – Special Form HO 00 03 05 11 (Maine Bureau of Insurance copy), Coverage C 3–4, Additional Coverage E.11, Section I Exclusions A.2–A.3, Section II E.2, pp.4–5, 8, 12, 19, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "PF&M Analysis, ISO Homeowners Optional Coverage Endorsements (July 2014), entry HO 24 75 (re-check of the F-001 fix) and entries HO 04 20, 04 55, 04 60, 04 65/66, 04 90, 04 95, 07 01, 24 10, 24 75, 24 77, sha256:30d362c5d7646426712b329f7fcc730c605eecad660479b01d5b9dbda2ffe11c — https://wvohoa.org/wp-content/uploads/2017/06/2014_HomeownersOptionalCoverageInsurance.pdf (host answered 403 to a direct fetch this run; read from a byte-identical copy, sha256 verified)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Homeowners Endorsements.md
---

**Homeowners Endorsements** are the ISO forms attached to a [[Homeowners Policy|homeowners policy]] to cover what the HO-3 excludes or limits. Each answers a specific gap in the HO 00 03 form, so recommending one starts from the gap:

| Gap in the HO-3 | Endorsement |
| :--- | :--- |
| Valuable articles held to small special limits and named perils | Scheduled personal property (HO 04 61) |
| Contents settled at actual cash value | Personal property replacement cost (HO 04 90) |
| Earth movement excluded | Earthquake (HO 04 54) |
| Water that backs up through sewers or drains excluded | Water back-up and sump discharge or overflow (HO 04 95) |
| Ordinance or law cost limited to 10% of Coverage A | Ordinance or law, increased amount (HO 04 77) |
| Business property, structures and liability limited or excluded | Permitted incidental occupancies (HO 04 42), home business insurance coverage (HO 07 01) |
| Liability only for bodily injury from an accident | Personal injury (HO 24 82) |

> [!example]- Which endorsement does each homeowner need? {Example}
> (a) A \$12,000 engagement ring; (b) a finished basement in a neighborhood whose sewers back up in heavy rain; (c) an older home in a city whose code would require major upgrades in any rebuild, with Coverage A of \$400,000 and estimated code costs of \$90,000; (d) an accountant who sees clients in a converted detached garage; (e) a homeowner who posts online reviews of local businesses; (f) a family whose \$3,000 sofa set, now worth \$1,200 after depreciation, would be replaced if destroyed.
>
> > [!answer]-
> > - **(a) Scheduled personal property (HO 04 61).** Theft of jewelry is limited to \$1,500 under Coverage C, and the schedule covers the ring for its value against open perils with no deductible.
> > - **(b) Water back-up and sump discharge or overflow (HO 04 95).** Water backing up through sewers or drains is excluded.
> > - **(c) Ordinance or law, increased amount (HO 04 77).** The HO-3 gives $0.10 \times 400{,}000 = \$40{,}000$, and a 25% schedule would give $0.25 \times 400{,}000 = \$100{,}000$.
> > - **(d) Permitted incidental occupancies (HO 04 42) or, for more, home business coverage (HO 07 01).** Coverage B excludes a structure from which a business is conducted, and Section II excludes business liability.
> > - **(e) Personal injury (HO 24 82).** A libel or defamation claim is not bodily injury from an occurrence under Coverage E.
> > - **(f) Personal property replacement cost (HO 04 90).** Without it the sofa set is paid at \$1,200 actual cash value; with it, \$3,000 once it is replaced.

## Scheduled personal property

Scheduled personal property (HO 04 61) insures listed articles and classes (jewelry, furs, cameras, musical instruments, silverware, golfers' equipment, fine arts, stamps and coins), each for a scheduled amount, against risks of direct physical loss rather than named perils, with no deductible. It removes the theft special limits (\$1,500 for jewelry and furs, \$2,500 for silverware) and the named perils restriction on contents. A scheduled article is "property not covered" under Coverage C, so the schedule is its only coverage.

It excludes wear and tear, gradual deterioration, inherent vice, insects or vermin, war and nuclear hazard. Fine arts also exclude repair or restoration and most breakage of fragile articles. Newly acquired jewelry, furs, cameras and musical instruments are covered for 30 days up to 25% of the class amount or \$10,000, whichever is less, and a professionally used musical instrument is not covered. A version with agreed value loss settlement (HO 04 60) also exists.

## Personal property replacement cost

Personal property replacement cost (HO 04 90) changes Coverage C's loss settlement from actual cash value to replacement cost. In one insurer's filed version built on ISO's form (CO 04 90 07 05), awnings, carpeting, appliances and outdoor equipment and several scheduled classes are also settled at replacement cost, and the insurer pays

> $$\text{RC}_{\text{contents}} = \min(\text{RC},\ \text{Repair},\ \text{Limit})$$

- $\text{RC}$ is the replacement cost without depreciation.
- $\text{Repair}$ is the full cost of repair.
- $\text{Limit}$ is the Coverage C limit, any special limit, or a scheduled item's limit, whichever applies.

Antiques, fine art, memorabilia, collectors' items, articles not in good or workable condition, and outdated articles in storage stay at actual cash value. Replacement cost needs replacement: above \$500 it pays only actual cash value until the property is repaired or replaced, with 180 days to claim the rest.

## Earthquake

Earthquake (HO 04 54) covers direct physical loss to Section I property caused by earthquake, including tremors around a volcanic eruption, with all shocks within 72 hours treated as one earthquake. In the 10 00 edition read, the deductible is the scheduled percentage times the larger of the Coverage A and C limits, at least \$250, and applies to all Section I loss except Coverage D and the additional coverages:

> $$\text{EQ deductible} = \max\big(p \times \max(A,\ C),\ 250\big)$$

- $p$ is the earthquake deductible percentage in the endorsement's schedule.
- $A$ and $C$ are the Coverage A and C limits.

Exterior masonry veneer (not stucco) is excluded unless the schedule says otherwise, and its value is deducted before the deductible; flood or tidal wave caused or aggravated by earthquake is excluded; and the cost of filling land is not covered. The coverage does not increase the policy's limits.

> [!example]- What does the insurer pay for this earthquake loss? {Example}
> An HO-3 with Coverage A of \$400,000 and Coverage C of \$200,000 carries HO 04 54 with a 10% deductible and the masonry veneer exclusion in force. An earthquake causes \$120,000 of damage to the dwelling, of which \$15,000 is exterior brick veneer, and the family incurs \$6,000 of additional living expense.
>
> > [!answer]-
> > - The deductible is 10% of the larger of the Coverage A and C limits: $0.10 \times \max(400{,}000,\ 200{,}000) = \$40{,}000$.
> > - The veneer is excluded and deducted before the deductible, so the dwelling is paid $120{,}000 - 15{,}000 - 40{,}000 = \$65{,}000$.
> > - Coverage D takes no earthquake deductible, so the \$6,000 of additional living expense is paid in full.
> > - The insurer pays $65{,}000 + 6{,}000 = \$71{,}000$.
> > - Without the endorsement, the earth movement exclusion would leave all of it uncovered except any fire, explosion or theft that followed.

> [!trap] Applying the earthquake percentage to the loss
> The deductible percentage applies to the larger of the Coverage A and Coverage C limits, not to the size of the loss. With Coverage A of \$400,000 and Coverage C of \$200,000, a 10% deductible is \$40,000 whether the loss is \$60,000 or \$120,000.

## Water back-up and sump discharge or overflow

Water back-up and sump discharge or overflow (HO 04 95) restores, up to a stated amount, coverage for water that backs up through sewers or drains or overflows from a sump, which Section I's water exclusion removes. The stated amount is separate from and doesn't increase Coverages A to D. In one filed version built on ISO material (CO 04 95 11 03) the amount is \$5,000 with its own \$500 deductible, the sump pump itself is not covered when it breaks down, and the loss must not be caused by an insured's negligence. Flood and surface water stay excluded under both this and the earthquake endorsement, and belong on [[Flood Insurance|flood insurance]].

## Ordinance or law, increased amount

Ordinance or law, increased amount (HO 04 77) raises the ordinance or law additional coverage from 10% of Coverage A to the percentage in the schedule. The limit is

> $$\text{O\&L limit} = q \times A$$

- $q$ is the ordinance or law percentage of Coverage A, 10% in the unendorsed HO-3 and the scheduled percentage under the endorsement.

It changes only the amount: the additional coverage still pays the increased cost of complying with building codes for the damaged part, for demolishing and rebuilding an undamaged part when the code requires the whole building to come down, and for the related debris removal, and it still excludes loss in value and pollutant cleanup.

## Home business

The HO-3 limits business property to \$2,500 on the premises and \$1,500 away from it, excludes other structures used for business under Coverage B, and excludes liability arising out of a business under Section II.

*Permitted incidental occupancies* (HO 04 42) covers a described business conducted at the residence premises. It insures a described other structure for its own limit, applies the full Coverage C limit to the business's furnishings, supplies and equipment, and lifts the business liability exclusion for the necessary or incidental use of the premises, but it does not cover bodily injury to the insured's employees. *Home business insurance coverage* (HO 07 01) is far broader, with the structure of a self-contained policy for both the business's property and its liability.

## Personal injury

Personal injury (HO 24 82) amends "bodily injury" under Coverage E to include personal injury: injury from false arrest, detention or imprisonment or malicious prosecution; libel, slander or defamation of character; or invasion of privacy, wrongful eviction or wrongful entry. Section II's exclusions don't apply to it. Its own exclusions (04 91 edition) remove assumed liability other than indemnity under a contract about the premises, violation of a penal law with an insured's knowledge, offenses related to employing the injured person, business activities, civic or public activities performed for pay, and injury to an insured. HO 24 10 is the same coverage with an aggregate limit.

## Other endorsements

Specified additional amount of insurance for Coverage A (HO 04 20) adds a scheduled percentage of the Coverage A limit as extra dwelling insurance, useful when improvements outrun the limit. Others are Coverage C increased special limits (HO 04 65, HO 04 66); identity fraud expense (HO 04 55); watercraft (HO 24 75) for a described boat with outboard motors of more than 25 total horsepower or a described sailing vessel, other boats belonging on a yacht policy; and a canine liability exclusion (HO 24 77) that removes a named dog.
