---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3b6d04dbb66986a2d655217ffff6b7e7f87b967cbdfb94431ba0f4d51dbd074c
  sources:
    - "ISO CP 10 10 10 12 Causes of Loss – Basic Form (specimen), §A.1–11, B.1–B.3, C, D pp.1–6, sha256:14aea49e74f393f8370fa78a89f12e99a9f4927dc704bd386fc7e41a9223f5b4 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+10+10&ed=10-12 (The Nationwide forms host regenerates its PDFs per request: bytes differ from the writer's copies, extracted text identical.)"
    - "ISO CP 10 20 10 12 Causes of Loss – Broad Form (specimen), §A.12–14, B.2, C (Collapse), D, E pp.2–7, sha256:fde6a92d0aabc909a84622d0588db0ac570c564ced0c056fa7efbcb454768207 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+10+20&ed=10-12"
    - "Saxe Doernberger & Vita, 'Whose Burden is It Anyway: All Risk vs. Covered Peril Policies' (law-firm publication, rank 3), burden-of-proof paragraph, sha256:9cf2c29c7cf0c376d6551a6d00f279616e5ff0b0435a688d8d792b2cdacca718 — https://www.sdvlaw.com/publications/whose-burden-is-it-anyway-all-risk-vs-covered-peril-policies/"
    - "Adelstein, 'Proving and Challenging Causation Under Named Perils Property Insurance Policy' (Florida Construction Legal Updates, 2020, citing Citizens v. Kings Creek South Condo, Fla. 3d DCA 2020; rank 3), first paragraph, sha256:16e95d4f02d6f3b7e73c2f7d64601ad26d7d75e7eeca3fdcdc4c0a12ab157432 — https://floridaconstructionlegalupdates.com/?p=5789"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Causes of Loss Basic and Broad Forms.md
---

The **Causes of Loss Basic and Broad Forms** are the two named perils options of the ISO commercial property program, CP 10 10 (basic) and CP 10 20 (broad). Attached to a coverage form such as the [[Building and Personal Property Coverage Form|BPP]], each defines the covered causes of loss as a list of perils, then excludes a common set of causes.

A loss from cause $c$ is covered if

> $$c \in N \ \text{and}\ c \notin E$$

- $N$ is the list of named perils in the form attached.
- $E$ is the set of excluded causes.

The insured has to show that a named peril caused the loss. Anything not on the list, such as theft, is not covered. The open perils alternative, which covers theft, is the [[Causes of Loss Special Form|special form]], and the general idea is on [[Causes of Loss]].

## Perils of the basic form

The basic form names eleven perils, paraphrased here from CP 10 10 10 12, section A:

1. Fire.
2. Lightning.
3. Explosion, including explosion of gases or fuel in a furnace or its flues, but not rupture or bursting of pressure-relief devices or of a building's contents swelling from water.
4. Windstorm or hail, but not frost or cold weather; ice (other than hail), snow or sleet; damage to the interior or contents by rain, snow, sand or dust unless wind or hail first damages the roof or walls and it enters through the opening; or hail damage to a vegetated roof.
5. Smoke causing sudden and accidental damage, but not smoke from agricultural smudging or industrial operations.
6. Aircraft or vehicles, meaning physical contact with the property or the building containing it, including objects falling from aircraft, but not vehicles the insured owns or that are operated in the course of its business.
7. Riot or civil commotion, including acts of striking employees occupying the premises and looting at the time and place of a riot.
8. Vandalism, meaning willful and malicious damage, but not theft, except building damage caused by burglars breaking in or out.
9. Sprinkler leakage, meaning leakage or discharge from an automatic sprinkler system, including collapse of its tank. If the building is covered property, the form also pays to repair the system when the damage results in leakage or is caused by freezing, and to tear out and replace part of the building to repair it.
10. Sinkhole collapse, meaning sudden sinking of land into spaces water has dissolved in limestone or dolomite, but not filling the sinkhole or collapse into man-made cavities.
11. Volcanic action, meaning damage from airborne blast or shock waves, ash, dust or particulate matter, or lava flow. All eruptions within 168 hours are one occurrence, and removing ash that caused no damage is not covered.

The basic form also excludes rupture of water pipes and leakage from water or steam systems unless caused by a covered cause of loss.

## Perils the broad form adds

The broad form names the same eleven perils and adds three, paraphrased from CP 10 20 10 12, section A:

12. Falling objects, but not personal property in the open, or a building's interior or contents unless the roof or an outside wall is first damaged by the falling object.
13. Weight of snow, ice or sleet, but not personal property outside buildings or a vegetated roof.
14. Water damage, meaning accidental discharge or leakage of water or steam as the direct result of a plumbing, heating, air conditioning or other system or appliance on the premises breaking apart or cracking.

Water damage fills the gap the basic form's pipe exclusion leaves. It excludes discharge from a sprinkler system, a sump or roof drains and gutters, seepage over 14 days or more, and freezing unless the insured did its best to maintain heat or drained the system. It pays to tear out and replace part of the building to repair the system, but not the cost to repair the defect itself.

> [!example]- What does each form cover of this distributor's four losses? {Example}
> A distributor has four losses. Ignore deductibles.
>
> 1. A pipe in the office cracks and leaks, causing $\$18{,}000$ of water damage to stock, $\$1{,}400$ to tear out a wall to reach the pipe, and $\$600$ to repair the pipe itself.
> 2. On a calm day, a tree that a contractor is cutting down falls through the roof, causing $\$9{,}000$ to the roof and $\$4{,}000$ to stock below.
> 3. Its own delivery truck backs into the loading dock wall, causing $\$5{,}500$.
> 4. Burglars break the door ($\$2{,}500$) and steal $\$10{,}000$ of stock.
>
> > [!answer]-
> > - Under the basic form, the pipe leak is excluded because the system was not damaged by a covered cause of loss.
> > - The tree is not windstorm or any other basic peril.
> > - The truck is a vehicle the insured owns, so the aircraft or vehicles peril excludes it under both forms.
> > - The burglars' building damage is vandalism, but the theft is excluded under both forms. The basic form pays $\$2{,}500$.
> > - The broad form adds water damage, including the tear-out but not the $\$600$ repair of the cracked pipe: $18{,}000 + 1{,}400 = \$19{,}400$.
> > - It also adds falling objects, which covers the stock because the roof was damaged first: $9{,}000 + 4{,}000 = \$13{,}000$.
> > - The broad form pays $2{,}500 + 19{,}400 + 13{,}000 = \$34{,}900$. Theft needs the special form.

## Exclusions

Both forms exclude the following, whatever other cause contributes concurrently or in any sequence:

- Ordinance or law.
- Earth movement, with fire or explosion that follows it covered.
- Governmental action, except destruction ordered to stop a covered fire from spreading.
- Nuclear hazard, with ensuing fire covered.
- Failure of utility service originating away from the premises, with an ensuing covered cause covered.
- War and military action.
- Water, meaning flood, mudslide, sewer or sump backup and underground water, with ensuing fire, explosion or sprinkler leakage covered.
- Fungus, wet or dry rot and bacteria.

The water exclusion does not reach the broad form's water damage peril, which is a burst or cracked system on the premises. Both forms also exclude artificially generated electrical current (with ensuing fire covered), explosion of the insured's steam boilers (with ensuing fire or combustion explosion covered), mechanical breakdown and neglect to protect property after a loss. Special exclusions limit the business income, leasehold interest and legal liability coverage forms. Under both forms, animals are covered only if killed or their destruction is made necessary.

## Additional coverages

Both forms pay up to $\$15{,}000$ in a 12-month period for fungus, wet or dry rot or bacteria resulting from a covered cause of loss other than fire or lightning, including tear-out and testing, within the limit of insurance.

Only the broad form adds collapse, as an additional coverage rather than a peril. It covers abrupt collapse of a building caused by:

- A named peril or breakage of building glass.
- Hidden decay or hidden insect damage not known to the insured.
- The weight of people or personal property.
- The weight of rain collecting on a roof.
- Defective construction methods during construction.

A building merely in danger of collapse, or still standing though cracked or sagging, is not covered, and the coverage does not increase the limits.

> [!example]- Which form covers this roof that fell in under ponded rain? {Example}
> After a heavy storm, water ponds on a flat roof and its weight brings part of the roof down, ruining $\$30{,}000$ of equipment below. The roof repair costs $\$45{,}000$. Wind did not damage the roof.
>
> > [!answer]-
> > - The cause is the weight of rain collecting on the roof.
> > - That is not windstorm, and rain entering a building whose roof wind has not damaged is outside the windstorm peril.
> > - The broad form's weight of snow, ice or sleet peril names only those three, not rain. The basic form pays nothing.
> > - The broad form's collapse additional coverage covers abrupt collapse caused by the weight of rain that collects on a roof, so it pays the $30{,}000 + 45{,}000 = \$75{,}000$, within the limits of insurance.
> > - Had the roof only sagged without falling in, collapse coverage would not apply.

> [!trap] Covering theft as vandalism
> Neither form names theft. Vandalism covers only the building damage burglars cause getting in or out, so the stolen property is paid only under the special form.
