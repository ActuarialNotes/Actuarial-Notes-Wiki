---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6a19e8a34cd98433e6b6135996b91b574d18c052558bd693198c953e3a226f83
  sources:
    - "QBE Aviation Policy QBAV-AV1002 (07-17), Coverages A-E (passenger BI only if 'including passengers'; medical expense), F-H (open peril ground and flight / not in flight / not in motion), Exclusions 1(a) (in flight for purpose not designated) and 2(a) (in flight piloted by other than designated pilots), limits incl. 'passenger liability limited internally', total loss = insured value less deductible, salvage to the Company, 'pleasure and business' excludes hire, pp.1-8, sha256:536a24536fb92b4498def6223fd9a5417b61a68cbe007c29dd53d3e5c2a526c2 — https://www.qbe.com/us/-/media/north%20america/files/aviation-forms/qbav-av1002-07-17-aviation-policy.pdf"
    - "N.Y. Dept. of Financial Services, OGC Opinion No. 01-11-16 (Nov. 13, 2001), 'Causal Connection Between the Policy Exclusion and the Loss' (expired FAA medical certificate: New York courts require no causal connection; plaintiffs argued Pennsylvania statute 74 Pa.C.S. §5501 made denial without causal connection inappropriate), sha256:08faafc1159d55748fd033473a47a06591ce2d0f38a35a195a02c7a1ad69119a — https://www.dfs.ny.gov/insurance/ogco2001/rg111131.htm"
    - "ISO CG 00 01 04 13 Commercial General Liability Coverage Form, exclusion f. Pollution (pp.3-4: heating-equipment and hostile-fire exceptions; clean-up costs), g. Aircraft, p. Electronic Data (p.5); no employment-related practices, professional services or data-disclosure exclusion in the base form, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Aircraft Insurance.md
---

**Aircraft Insurance** covers physical damage to an aircraft, called hull coverage, and the owner's or operator's [[Liability Insurance|liability]] for bodily injury and property damage arising from its ownership, maintenance and use. It is written by specialist insurers and pools rather than on standard commercial forms, because each policy is shaped by the aircraft, the pilots who may fly it and the uses it is put to. Hull coverage is usually on an agreed value basis, and liability coverage is usually a single limit per occurrence.

> $$\text{Paid}_{\text{partial}} = \min(R,\ V) - D$$

> $$\text{Paid}_{\text{total}} = V - D$$

- **Symbols:** $V$ is the agreed (stated) value written in the policy, $R$ is the cost of repairing a partial loss and $D$ is the deductible that applies, which is usually larger for a loss while the aircraft is in motion. On a total loss the insurer pays the agreed value less the deductible and takes the salvage, so its net cost is lower by whatever the wreck sells for.
- **Hull coverage options:** The broadest option, all risks ground and flight, covers the aircraft on the ground and in flight. Narrower and cheaper options cover it only while not in flight, or only while not in motion, which suits an aircraft laid up for the winter or under long maintenance.
- **Agreed value:** The insurer and the owner agree the aircraft's value when the policy is written, and that amount is paid on a total loss without depreciation or argument. A partial loss is paid at the cost of repair, up to the agreed value, and the insurer may declare a total loss when repairs would cost nearly as much.
- **Liability coverages:** The policy covers bodily injury to people other than passengers, passenger bodily injury, and property damage, such as a hangar or a car on the ground. Many policies offer medical payments for passengers. A single limit per occurrence may be "smooth", applying to all claimants alike, or carry a per-passenger sublimit, which caps each passenger's recovery well below the occurrence limit.
- **Pilot warranty:** The policy names the pilots who may fly the aircraft, or the qualifications a pilot must hold, such as certificates, ratings, logged hours on the type and a current medical certificate. When a pilot who does not meet the warranty is flying, there is no coverage, whether or not the pilot's shortfall caused the loss.
- **Use limitations:** The policy states the uses covered, such as private business and pleasure, corporate use flown by salaried pilots, flight instruction, rental or carrying passengers for hire. Using the aircraft outside them, for example by charging for a flight on a pleasure policy, voids coverage for that flight.
- **Airport liability:** Airports, fixed-base operators and other aviation businesses buy airport or aviation premises liability for injury on their premises and from their operations, since the CGL excludes aircraft. Hangarkeepers liability covers customers' aircraft in their care, custody or control.

> [!example]- A Hull Loss Under an Agreed Value Policy {Example}
> A business aircraft is insured for all risks ground and flight at an agreed value of \$1,200,000. The deductible is \$1,000 while the aircraft is not in motion and 5% of the agreed value while it is in motion. Find the insurer's payment for each loss:
>
> 1. Hail damages the aircraft while it is parked, and repairs cost \$85,000.
> 2. The landing gear collapses on landing, and repairs cost \$310,000.
> 3. The aircraft crashes and is destroyed, and the wreck is sold for \$90,000.
>
> > [!answer]-
> > The in-motion deductible is 5% of the agreed value.
> > $$
> > \begin{align*}
> > D_{\text{motion}} &= 0.05 \times 1{,}200{,}000 \\
> > &= 60{,}000 \\
> > \text{Paid}_1 &= 85{,}000 - 1{,}000 \\
> > &= 84{,}000 \\
> > \text{Paid}_2 &= 310{,}000 - 60{,}000 \\
> > &= 250{,}000 \\
> > \text{Paid}_3 &= 1{,}200{,}000 - 60{,}000 \\
> > &= 1{,}140{,}000
> > \end{align*}
> > $$
> > On the total loss the insurer pays the agreed value less the deductible, without deducting depreciation, and recovers \$90,000 from the salvage, so its net cost is \$1,050,000. The in-motion deductible is larger because landing and takeoff accidents are the most frequent and most costly hull losses.

> [!example]- Smooth Limit Versus a Per-Passenger Sublimit {Example}
> A private aircraft crashes on landing and damages a fence and a parked vehicle. Three passengers are injured, with damages of \$400,000, \$150,000 and \$60,000, and the property damage is \$200,000. Find the insurer's liability payment under (a) a \$1,000,000 smooth single limit per occurrence and (b) a \$1,000,000 single limit per occurrence with a \$100,000 per-passenger sublimit.
>
> > [!answer]-
> > Under the smooth limit every claim is paid in full, because their total is within the occurrence limit.
> > $$
> > \begin{align*}
> > \text{Paid}_a &= 400{,}000 + 150{,}000 + 60{,}000 + 200{,}000 \\
> > &= 810{,}000
> > \end{align*}
> > $$
> > Under the sublimit each passenger recovers at most \$100,000, while the property damage is not sublimited.
> > $$
> > \begin{align*}
> > \text{Paid}_b &= 100{,}000 + 100{,}000 + 60{,}000 + 200{,}000 \\
> > &= 460{,}000
> > \end{align*}
> > $$
> > The owner is personally exposed to the \$350,000 of passenger damages above the sublimits, even though the policy's \$1,000,000 limit is far from used up.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask what hull and aircraft liability coverages pay, how the ground and flight options differ, and how pilot warranties and use limitations restrict coverage. The applied version gives a loss with the pilot and the purpose of the flight and asks whether the policy covers it and how much it pays.
> - **Specialty market:** Aircraft insurance appears with the other specialty coverages, such as [[Cyber Insurance|cyber]] and [[International Insurance|international]] programs, as a line the standard commercial forms leave out.

> [!warning]- Exam traps
> - **Warranty, not causation:** A pilot who does not meet the pilot warranty voids coverage for the flight even if the shortfall had nothing to do with the accident. Arguing that the loss would have happened anyway does not restore coverage.
> - **Agreed value is paid on a total loss:** The insurer pays the agreed value less the deductible, not the market value at the time of loss. A partial loss is paid at the repair cost, not a share of the agreed value.
> - **Which deductible:** A taxiing accident is in motion, even though the aircraft is not in flight. Applying the not-in-motion deductible to it understates the insured's share.
> - **Sublimits bind before the limit:** A per-passenger sublimit caps each passenger's recovery, so the occurrence limit can be far from exhausted while passengers go uncompensated.
> - **The CGL excludes aircraft:** An aviation business cannot rely on its CGL for aircraft exposures, which is why airport and hangarkeepers liability policies exist.
