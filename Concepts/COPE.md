**COPE** stands for construction, occupancy, protection and exposure, the four characteristics of a property an underwriter reviews when evaluating a submission for property insurance. Together they describe how likely a fire is to start, how fast it would spread, how quickly it would be put out, and what could reach the building from outside, which is why underwriters use COPE to analyze a property's fire exposure alongside its other [[Causes of Loss|causes of loss]].

> $$\text{PPC} = \begin{cases} 1 & S \ge 90 \\[4pt] 10 - \lfloor S/10 \rfloor & 0 \le S < 90 \end{cases}$$

- **Symbols:** $S$ is a community's score under ISO's Fire Suppression Rating Schedule (FSRS), on a scale of 0 to 105.5, and PPC is its Public Protection Classification. A score of 80.00 to 89.99 gives Class 2, and 0.00 to 9.99 gives Class 10. The bands apply only after the community meets ISO's minimum criteria for a rating, and Class 10 means its fire suppression does not meet them.
- **Construction:** ISO's Commercial Lines Manual sorts buildings into six construction classes by how susceptible they are to fire damage, from least to most fire resistive:
  1. **Frame:** exterior walls of wood, brick or stone veneer, wood ironclad, or stucco on wood.
  2. **Joisted masonry:** exterior walls of masonry, such as brick, concrete, block, stone or tile, with a combustible floor and roof.
  3. **Noncombustible:** exterior walls, floor and supports of metal, gypsum or other noncombustible materials.
  4. **Masonry noncombustible:** masonry exterior walls with a floor and roof of metal or other noncombustible materials.
  5. **Modified fire resistive:** walls, floors and roof of masonry or fire-resistive material rated for at least one hour but less than two.
  6. **Fire resistive:** walls, floors and roof of masonry or fire-resistive material rated for at least two hours.
- **Occupancy:** Occupancy is how the building is used, which determines what can start a fire and what burns once it starts. Commercial occupancies are coded by the business conducted in the building, using ISO's four-digit Commercial Statistical Plan classification codes. For homeowners it is whether the dwelling is owner-occupied or rented and how many families it is designed for.
- **Public protection:** The FSRS awards up to 10 points for emergency communications, up to 50 for the fire department and up to 40 for the water supply, plus up to 5.5 extra points for community risk reduction (fire prevention, public fire safety education and fire investigation). Most U.S. property insurers use the resulting class in pricing, and a community with a better class generally pays less for property insurance, all else equal.
- **Split classes:** Many communities get a split class such as 4/4X or 4/4Y. The first number applies to properties within 5 road miles of a fire station and within 1,000 feet of a creditable water supply. The X or Y class applies to properties within 5 road miles but farther than 1,000 feet from water, and properties beyond 5 road miles generally get Class 10.
- **Private protection:** Protection also includes what the owner installs, of which automatic sprinklers are the most important. In NFPA's 2004–2008 data, sprinklers operated in 91% of reported fires large enough to activate them and were effective in 87%, and flame damage was confined to the room of origin in 95% of fires in sprinklered properties against 73% without automatic extinguishing equipment. Where sprinklers failed to operate, 64% of the failures were systems shut off before the fire, which is why an underwriter asks how the valves are supervised and the system maintained.
- **Exposure:** External exposure is the risk of loss from neighboring property and the surrounding area: what is next door, such as an office building, a subdivision or a fireworks factory, and how a fire there could reach the insured building. A fire-resistive building next to a combustible, hazardous occupancy still faces that neighbor's fire.

> [!example]- Classifying Construction for Four Buildings {Example}
> An underwriter receives a schedule of four buildings: (A) a retail store with brick exterior walls, wood joists and a wood roof deck; (B) a warehouse with metal walls, a metal roof and steel supports; (C) an office tower with walls, floors and roof of concrete rated for three hours; (D) a restaurant with stucco over wood framing. Give each building's ISO construction class, and rank them by susceptibility to fire damage.
>
> > [!answer]-
> > - **(A) Joisted masonry, Class 2:** the exterior walls are masonry, but the floor and roof are combustible.
> > - **(B) Noncombustible, Class 3:** walls, roof and supports are metal.
> > - **(C) Fire resistive, Class 6:** the rating is at least two hours.
> > - **(D) Frame, Class 1:** stucco on wood is a frame exterior.
> >
> > From most to least susceptible: D, A, B, C. Construction is only one letter of COPE. The restaurant's cooking (occupancy) and the town's fire department (protection) can matter as much as its walls.

> [!example]- Reading a Protection Class {Example}
> A town's FSRS score is 63.40, it meets ISO's minimum criteria, and it has a split classification for properties far from water. Three submissions are in the town: (A) a store 2 road miles from a station with a hydrant 300 feet away; (B) a farm supply building 4 road miles from a station and 2,500 feet from the nearest creditable water; (C) a barn 7 road miles from the nearest station. What class applies to each?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PPC} &= 10 - \lfloor 63.40/10 \rfloor \\
> > &= 10 - 6 \\
> > &= 4
> > \end{align*}
> > $$
> > The score of 63.40 falls in the 60.00 to 69.99 band, Class 4, so the town is graded 4/4X or 4/4Y.
> > - **(A) Class 4:** within 5 road miles of a station and 1,000 feet of water.
> > - **(B) Class 4X or 4Y:** within 5 road miles but beyond 1,000 feet of creditable water.
> > - **(C) Class 10, generally:** beyond 5 road miles of a station.
> >
> > The barn's construction and occupancy might be identical to the store's, yet its expected fire severity is far higher because help arrives late, if at all.

> [!example]- Weighing All Four Elements {Example}
> Two submissions for a furniture warehouse are identical in value and contents. Warehouse 1 is masonry noncombustible, fully sprinklered with supervised valves, in protection class 3, and stands alone on its lot. Warehouse 2 is joisted masonry, unsprinklered, in protection class 3, and shares a wall with a woodworking shop. Which elements of COPE differ, and which warehouse presents the larger fire exposure?
>
> > [!answer]-
> > Occupancy and public protection are the same. Construction differs, since the combustible roof of joisted masonry burns where a noncombustible roof does not. Private protection differs, since sprinklers usually confine a fire to the room where it started. External exposure differs, since the woodworking shop next door is a fire source the insured cannot control. Warehouse 2 is the larger exposure on all three counts, so it needs a higher rate, more restrictive terms, or a decline under the [[Underwriting Guidelines|guidelines]], and the underwriter's estimate of its [[Probable Maximum Loss|probable maximum loss]] should be close to its full value.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The commercial property underwriting section analyzes fire exposure through COPE. Questions describe a building and ask which element a fact belongs to, such as a sprinkler system (protection) or a paint shop next door (exposure).
> - **Construction class** questions give materials and ask for the ISO class, or rank buildings by fire resistance.
> - **Protection** questions ask what the Public Protection Classification measures, how a split class applies to a property far from water, or why sprinkler maintenance matters to an underwriter.

> [!warning]- Exam traps
> - **Class 1 is the best:** In the PPC, Class 1 is superior protection and Class 10 doesn't meet the minimum criteria. For construction, Class 1 is frame, the least fire resistive. The two numbering systems run in opposite directions.
> - **Masonry walls don't make a building noncombustible:** Joisted masonry has masonry walls but a combustible floor and roof. Only masonry noncombustible and the two fire-resistive classes have noncombustible floors and roofs.
> - **Exposure means neighbors:** In COPE, exposure is the hazard from surrounding property, not the insured's own values or operations. The insured's own operations are occupancy.
> - **A sprinkler only helps if it's on:** Most sprinkler failures in NFPA's data came from systems shut off before the fire. Crediting a sprinkler system without asking about valve supervision and maintenance overstates the protection.
