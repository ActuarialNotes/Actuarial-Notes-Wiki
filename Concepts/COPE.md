---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa1d656b3b34205729aba941f04c5092eec13815d41649c1b2c811be5185c165
  sources:
    - "IRMI Glossary, 'construction, occupancy, protection, and exposure (COPE)', entry, sha256:ea50c61618dbbaca26029ea3116e38d8f76f12e2a959a9fee2a939aa54c6c035 — https://www.irmi.com/term/insurance-definitions/cope"
    - "Verisk, Building Fundamentals sample report (ISO CLM construction classes 1-6, CSP occupancy codes, PPC), p.2 ISO Construction Class, Occupancy, PPC, sha256:ec0d18b4de14f24ce24f64c12aa59d49cf84cd6579bc72a80539aec9c44abff7 — https://www.verisk.com/49ba9b/siteassets/media/downloads/commercial-property/building-fundamentals-report.pdf"
    - "Verisk ISO Mitigation, PPC program page, entry, sha256:b5fbc3d99b2fc0609bcefbe9be85c7d295aeb2ca552a9ee106b2ce82bad2a873 — https://www.isomitigation.com/ppc/"
    - "Verisk ISO Mitigation, 'How the PPC Program Works', entry, sha256:e7b86d0083e066bfb8e97f6f159812abb8258368c0bd9b0104930b8cb57462df — https://www.isomitigation.com/ppc/program-works/"
    - "Verisk ISO Mitigation, 'Fire Suppression Rating Schedule', entry, sha256:d6bb347922d8dfc4699c1806bf0cfc4fdc78f0c02b63cad70bbe4e3a93cd6a62 — https://www.isomitigation.com/ppc/fsrs/"
    - "Verisk ISO Mitigation, 'Scores and PPC Ratings', entry, sha256:4dc8a5df7de6acd02ca0a768ef688ded26c994b46ac7d7baf0922fdab747a9d4 — https://www.isomitigation.com/ppc/program-works/scores-and-ppc-ratings/"
    - "Verisk ISO Mitigation, 'Split Classifications', entry, sha256:97d23bc95c64d3e50a71e9e0162445f52ccb7f4642ca677bb14f7bab50b155d9 — https://www.isomitigation.com/ppc/program-works/split-classifications/"
    - "NFPA One-Stop Data Shop fact sheet 'U.S. Experience with Sprinklers' (2004-2008 data), pp.1-2, sha256:2e411c9a24fcc9f5d04dc3aeca23c8c78ce347a6dad1bbbd356d0eeddcc7a3a0 — https://www.windsorfire.com/wp-content/uploads/sprinkler-fact-sheet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/COPE.md
---

**COPE** stands for construction, occupancy, protection and exposure, the four characteristics of a property an underwriter reviews when evaluating a submission for property insurance. Underwriters use it to analyze a property's fire exposure alongside its other [[Causes of Loss|causes of loss]]:

1. **Construction:** how susceptible the building is to fire damage.
2. **Occupancy:** how the building is used, which decides what can start a fire.
3. **Protection:** how quickly a fire would be put out.
4. **Exposure:** what could reach the building from outside.

## Construction

ISO's Commercial Lines Manual sorts buildings into six construction classes by how susceptible they are to fire damage, from least to most fire resistive:

1. **Frame:** exterior walls of wood, brick or stone veneer, wood ironclad, or stucco on wood.
2. **Joisted masonry:** exterior walls of masonry, such as brick, concrete, block, stone or tile, with a combustible floor and roof.
3. **Noncombustible:** exterior walls, floor and supports of metal, gypsum or other noncombustible materials.
4. **Masonry noncombustible:** masonry exterior walls with a floor and roof of metal or other noncombustible materials.
5. **Modified fire resistive:** walls, floors and roof of masonry or fire-resistive material rated for at least one hour but less than two.
6. **Fire resistive:** walls, floors and roof of masonry or fire-resistive material rated for at least two hours.

Masonry walls alone don't make a building noncombustible. Only masonry noncombustible and the two fire-resistive classes have noncombustible floors and roofs.

> [!example]- What is the ISO construction class of each of these four buildings? {Example}
> An underwriter receives a schedule of four buildings:
>
> 1. A retail store with brick exterior walls, wood joists and a wood roof deck.
> 2. A warehouse with metal walls, a metal roof and steel supports.
> 3. An office tower with walls, floors and roof of concrete rated for three hours.
> 4. A restaurant with stucco over wood framing.
>
> > [!answer]-
> > - The store is joisted masonry, Class 2, because its walls are masonry but its floor and roof are combustible.
> > - The warehouse is noncombustible, Class 3, because its walls, roof and supports are metal.
> > - The office tower is fire resistive, Class 6, because its rating is at least two hours.
> > - The restaurant is frame, Class 1, because stucco on wood is a frame exterior.

## Occupancy

Occupancy is how the building is used, which determines what can start a fire and what burns once it starts. It covers the hazards of the insured's own operations. Commercial occupancies are coded by the business conducted in the building, using ISO's four-digit Commercial Statistical Plan classification codes. For homeowners it is whether the dwelling is owner-occupied or rented and how many families it is designed for.

## Public protection

ISO's Fire Suppression Rating Schedule (FSRS) scores a community's fire protection on a scale of 0 to 105.5. It awards up to 10 points for emergency communications, up to 50 for the fire department and up to 40 for the water supply, plus up to 5.5 extra points for community risk reduction (fire prevention, public fire safety education and fire investigation). For a community with score $S$, its Public Protection Classification (PPC) is

> $$\text{PPC} = \begin{cases} 1 & S \ge 90 \\[4pt] 10 - \lfloor S/10 \rfloor & 0 \le S < 90 \end{cases}$$

- The community meets ISO's minimum criteria for a rating, and Class 10 means its fire suppression does not meet them.

A score of 80.00 to 89.99 gives Class 2, and 0.00 to 9.99 gives Class 10. Most U.S. property insurers use the class in pricing, and a community with a better class generally pays less for property insurance, all else equal.

Many communities get a split class such as 4/4X or 4/4Y. The first number applies to properties within 5 road miles of a fire station and within 1,000 feet of a creditable water supply. The X or Y class applies to properties within 5 road miles but farther than 1,000 feet from water, and properties beyond 5 road miles generally get Class 10.

> [!example]- What protection class applies to each of these three properties? {Example}
> A town's FSRS score is 63.40, it meets ISO's minimum criteria, and it has a split classification:
>
> 1. A store 2 road miles from a station with a hydrant 300 feet away.
> 2. A farm supply building 4 road miles from a station and 2,500 feet from the nearest creditable water.
> 3. A barn 7 road miles from the nearest station.
>
> > [!answer]-
> > - The town's class is $10 - \lfloor 63.40/10 \rfloor = 10 - 6 = 4$, so it is graded 4/4X or 4/4Y.
> > - The store is Class 4, within 5 road miles of a station and 1,000 feet of water.
> > - The farm supply building is Class 4X or 4Y, within 5 road miles but beyond 1,000 feet of creditable water.
> > - The barn generally gets Class 10, beyond 5 road miles of a station.

## Private protection

Protection also includes what the owner installs, of which automatic sprinklers are the most important. In NFPA's 2004–2008 data, sprinklers operated in 91% of reported fires large enough to activate them and were effective in 87%. Flame damage was confined to the room of origin in 95% of fires in sprinklered properties, against 73% without automatic extinguishing equipment. Where sprinklers failed to operate, 64% of the failures were systems shut off before the fire, which is why an underwriter asks how the valves are supervised and the system maintained.

## External exposure

External exposure is the risk of loss from neighboring property and the surrounding area: what is next door, such as an office building, a subdivision or a fireworks factory, and how a fire there could reach the insured building. A fire-resistive building next to a combustible, hazardous occupancy still faces that neighbor's fire. The insured's own operations are occupancy, not exposure.

> [!trap] Reading the two class numberings the same way
> In the PPC, Class 1 is superior protection and Class 10 doesn't meet the minimum criteria. For construction, Class 1 is frame, the least fire resistive. The two numbering systems run in opposite directions.
