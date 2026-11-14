---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5fc698c8f2b4c7da4d5830831f1de4b9b8fe2f90cd926e2a0495067ab60af642
  sources:
    - "QBE Aviation Policy QBAV-AV1002 (07-17), Coverages A-E (passenger BI only if 'including passengers'; medical expense), F-H (open peril ground and flight / not in flight / not in motion), Exclusions 1(a) (in flight for purpose not designated) and 2(a) (in flight piloted by other than designated pilots), limits incl. 'passenger liability limited internally', total loss = insured value less deductible, salvage to the Company, 'pleasure and business' excludes hire, pp.1-8, sha256:536a24536fb92b4498def6223fd9a5417b61a68cbe007c29dd53d3e5c2a526c2 — https://www.qbe.com/us/-/media/north%20america/files/aviation-forms/qbav-av1002-07-17-aviation-policy.pdf"
    - "AIG sample aircraft policy (OLAD01 (9/00)), coverage summary with separate Not-in-Motion / Not-in-Flight / Flight deductible columns and Agreed Value (p.1), definitions of Not-in-Motion, Not-in-Flight, Non-Commercial use and Total Loss (repair cost plus salvage value at least the agreed value) (p.11), salvage to the insurer (p.8), sha256:0e5b7dd1e2ca890eba061e3865f1dc3887e6017d48c350f3b03cc370eff725ca — https://bwifly.com/wp-content/uploads/2016/09/AIG-Sample-Aircraft-Policy.pdf"
    - "N.Y. Dept. of Financial Services, OGC Opinion No. 01-11-16 (Nov. 13, 2001), 'Causal Connection Between the Policy Exclusion and the Loss' (expired FAA medical certificate: New York courts require no causal connection; plaintiffs argued Pennsylvania statute 74 Pa.C.S. §5501 made denial without causal connection inappropriate), sha256:08faafc1159d55748fd033473a47a06591ce2d0f38a35a195a02c7a1ad69119a — https://www.dfs.ny.gov/insurance/ogco2001/rg111131.htm"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Aircraft Insurance.md
---

**Aircraft Insurance** covers physical damage to an aircraft, called hull coverage, and the owner's or operator's [[Liability Insurance|liability]] for bodily injury and property damage arising from its ownership, maintenance and use. It is written by specialist insurers and pools rather than on standard commercial forms, because each policy is shaped by the aircraft, the pilots who may fly it and the uses it is put to.

Hull coverage is usually on an agreed value basis: the insurer and the owner agree the aircraft's value, $V$, when the policy is written, and that amount is paid on a total loss without depreciation or argument. A loss is a total loss when the cost of repair plus the salvage value equals or exceeds the agreed value. The payment on a total loss is

> $$\text{Paid}_{\text{total}} = V - D$$

- $D$ is the deductible that applies. Policies schedule separate deductibles for a loss not in motion, not in flight and in flight.

On a total loss the insurer pays the agreed value less the deductible and takes the salvage, so its net cost is lower by whatever the wreck sells for. A partial loss is paid at the cost of repair, up to the agreed value, so the payment on a partial loss is

> $$\text{Paid}_{\text{partial}} = \min(R,\ V) - D$$

- $R$ is the cost of repairing the partial loss.

> [!example]- What does the insurer pay for each of these hull losses? {Example}
> A business aircraft is insured for all risks ground and flight at an agreed value of $\$1{,}200{,}000$. The deductible is $\$1{,}000$ while the aircraft is not in motion and 5% of the agreed value while it is in motion.
>
> 1. Hail damages the aircraft while it is parked, and repairs cost $\$85{,}000$.
> 2. The landing gear collapses on landing, and repairs cost $\$310{,}000$.
> 3. The aircraft crashes and is destroyed, and the wreck is sold for $\$90{,}000$.
>
> > [!answer]-
> > - The in-motion deductible is $0.05 \times 1{,}200{,}000 = \$60{,}000$.
> > - The parked aircraft is not in motion, so the hail loss pays $85{,}000 - 1{,}000 = \$84{,}000$.
> > - The landing is in motion, so the gear collapse pays $310{,}000 - 60{,}000 = \$250{,}000$.
> > - The crash is a total loss, so the insurer pays the agreed value less the deductible, $1{,}200{,}000 - 60{,}000 = \$1{,}140{,}000$, without deducting depreciation.
> > - It recovers $\$90{,}000$ from the salvage, so its net cost is $\$1{,}050{,}000$.

## Hull coverage options

1. **All risks ground and flight**, the broadest option, covers the aircraft on the ground and in flight.
2. **Not in flight** covers it only while it is not in flight.
3. **Not in motion** covers it only while it is not in motion, which suits an aircraft laid up for the winter or under long maintenance.

The narrower options are cheaper.

> [!trap] Treating taxiing as not in motion
> A taxiing accident is in motion, even though the aircraft is not in flight. Applying the not-in-motion deductible to it understates the insured's share.

## Liability coverages

The policy covers bodily injury to people other than passengers, passenger bodily injury, and property damage, such as a hangar or a car on the ground. Many policies offer medical payments for passengers. Liability coverage is usually a single limit per occurrence. It may apply to all claimants alike, or carry a per-passenger limit ("passenger liability limited internally"), which caps each passenger's recovery below the occurrence limit.

> [!example]- What does the insurer pay for this crash, with and without a per-passenger sublimit? {Example}
> A private aircraft crashes on landing and damages a fence and a parked vehicle. Three passengers are injured, with damages of $\$400{,}000$, $\$150{,}000$ and $\$60{,}000$, and the property damage is $\$200{,}000$. The policy has a $\$1{,}000{,}000$ single limit per occurrence.
>
> > [!answer]-
> > - Without a sublimit every claim is paid in full, because their total, $400{,}000 + 150{,}000 + 60{,}000 + 200{,}000 = \$810{,}000$, is within the occurrence limit.
> > - Under a $\$100{,}000$ per-passenger sublimit, each passenger recovers at most $\$100{,}000$, and the property damage is not sublimited.
> > - The payment is then $100{,}000 + 100{,}000 + 60{,}000 + 200{,}000 = \$460{,}000$.
> > - The owner is personally exposed to the $\$350{,}000$ of passenger damages above the sublimits, although the policy's $\$1{,}000{,}000$ limit is far from used up.

The CGL excludes bodily injury and property damage arising out of any aircraft owned or operated by, or rented or loaned to, an insured, so those exposures need an aircraft policy.

## Pilot warranty and use limitations

The policy names the pilots who may fly the aircraft, or the qualifications a pilot must hold, such as certificates, ratings, logged hours on the type and a current medical certificate. When a pilot who does not meet the requirement is flying, the policy excludes coverage.

Whether the insurer must also show that the shortfall caused the loss varies by state. Under New York law a pilot who does not meet the policy's requirement leaves the flight uncovered even if the shortfall had nothing to do with the accident. Some states require the insurer to show a causal connection, so check which law governs before arguing either way.

The policy also states the uses covered, such as private business and pleasure, corporate use flown by salaried pilots, flight instruction, rental or carrying passengers for hire. Using the aircraft outside them, for example by charging for a flight on a pleasure policy, voids coverage for that flight.

> [!example]- Is this hull loss covered under New York law? {Example}
> A pilot whose medical certificate has expired lands a private aircraft, and a gust causes a hull loss that has nothing to do with the pilot's health.
>
> > [!answer]-
> > - The pilot does not meet the policy's requirement of a current medical certificate, so the pilot warranty excludes coverage for the flight.
> > - New York courts require no causal connection between the shortfall and the loss.
> > - The loss is not covered, although the expired certificate had nothing to do with the accident.
