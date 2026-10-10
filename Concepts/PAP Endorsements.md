---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:01c837af9de5263bb6547411114e0c7806b321751d30eae95b5c26882dc05d23
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/PAP Endorsements.md
---

**PAP Endorsements** are the ISO forms that modify the [[Personal Auto Policy|personal auto policy]] (PP 00 01) for exposures the unendorsed policy leaves out or covers too narrowly. One group extends the policy to vehicles other than private passenger autos, such as motorcycles, motor homes, trailers and snowmobiles; another adds coverages, such as underinsured motorists, towing and non-owner coverage, or changes how a limit or a loss settlement works.

> $$\text{Payment} = \min(S,\ \text{ACV},\ \text{Repair}) - d$$

- **Symbols:** For a vehicle insured for physical damage at a scheduled amount, $S$ is the amount shown in the schedule or declarations, ACV is the vehicle's actual cash value, Repair is the cost to repair or replace with property of like kind and quality, and $d$ is the deductible. The scheduled amount is a ceiling, not an agreed value.
- **Why endorsements are needed:** The PAP excludes liability for any vehicle with fewer than four wheels or designed mainly for off-road use (Part A exclusion B.1), excludes medical payments for injury on a motorized vehicle with fewer than four wheels (Part B exclusion 1), and excludes physical damage to a trailer, camper body or motor home not shown in the declarations (Part D exclusion 7). It also excludes vehicles furnished for regular use, and it insures a private passenger auto, pickup or van that someone owns. Each endorsement below removes one of these gaps.

**Vehicles other than private passenger autos**

- **Miscellaneous type vehicle (PP 03 23):** Converts the PAP to cover a described "miscellaneous type vehicle", which ISO's Virginia version (PP 13 63 01 20) defines as a motor home, motorcycle or similar vehicle, all-terrain vehicle, dune buggy or golf cart. "Your covered auto" becomes the scheduled vehicle, a newly acquired auto or miscellaneous vehicle of the same type, any trailer, and a temporary substitute. Liability exclusion B.1 does not apply to a vehicle insured under the endorsement. Part D covers the facilities and equipment of a scheduled motor home, such as cooking, plumbing and awnings, but adds exclusions for clothing and luggage, business or office equipment, sales samples, and fungi, wet or dry rot or bacteria. Physical damage is paid at the least of the scheduled amount, ACV and repair cost, less the deductible. The schedule offers an optional passenger hazard exclusion, which removes bodily injury to anyone occupying the vehicle in exchange for a lower premium.
- **Motor homes (PP 03 28):** Used with PP 03 23, it excludes liability, medical payments and physical damage coverage for an owned motor home while it is rented or leased to others, unless the schedule buys back that rental exposure. It also excludes physical damage to a motor home fraudulently acquired by someone it was rented to, and that exclusion can't be bought back.
- **Snowmobile (PP 03 20):** Schedules coverage for snowmobiles, which the PAP excludes as vehicles designed for off-road use, with an option to exclude the passenger hazard.
- **Trailer/camper body (PP 03 07):** Covers a described trailer or camper body and its facilities and equipment, such as cooking and refrigeration facilities and awnings, for collision and other than collision. Payment is the least of the scheduled amount, ACV and repair cost, less the deductible, and the motor home endorsement's exclusions for clothing, business equipment and fungi apply.
- **Damage to your auto, maximum limit (PP 03 08):** Puts a scheduled ceiling on Part D for a vehicle whose value doesn't fall the way a typical car's does, such as a well-kept limited edition. The loss is settled at the least of the scheduled amount, ACV and repair cost. The form is not agreed value: a car worth more than its scheduled amount is paid only that amount, and a car worth less is paid its ACV.

**Additional endorsements**

- **Named non-owner coverage (PP 03 22):** For an individual who owns no auto but drives others' vehicles. "You" is the person named in the schedule, family members are covered only if the schedule elects them, and "your covered auto" is only a newly acquired auto, for 14 days after it is acquired. It provides liability, medical payments and uninsured motorists coverage, and from the 09 18 edition optional physical damage on a non-owned auto, and coverage for vehicles furnished for the named individual's regular use can be elected.
- **Extended non-owned coverage (PP 03 06):** Gives a named individual, and family members if elected, liability and medical payments coverage while using a non-owned vehicle furnished or available for regular use, such as a company car, by making Part A exclusion B.2.b and Part B exclusion 5.b inapplicable. It does not cover a vehicle the named individual or a family member owns.
- **Joint ownership coverage (PP 03 34):** Lets people who jointly own a private passenger auto, other than a married couple, be insured as joint owners: relatives regardless of where they live, or unrelated people in one household, such as siblings, roommates or separated spouses.
- **Underinsured motorists (PP 03 11):** Pays the bodily injury damages an insured could recover from a driver whose liability limit is lower than the insured's UIM limit, once that limit is exhausted or a tentative settlement is reported ([[Uninsured Motorists Coverage]]).
- **Towing and labor costs (PP 03 03):** Pays up to the scheduled amount for towing and labor when a covered owned or non-owned auto is disabled, but only for labor done at the place of disablement, not at a garage.
- **Single liability limit (PP 03 09):** Replaces Part A's split limits with one limit for all damages from one accident ([[PAP Liability Coverage]]). ISO's Virginia version (PP 13 59 01 20) adds that the single limit is applied to meet any separate legal minimums for bodily injury and property damage without increasing the total.
- **Other coverage additions:** Optional limits transportation expenses (PP 03 02) raise Part D's daily and total caps; excess electronic equipment (PP 03 13) adds to the PAP's modest coverage for electronics, and excess custom equipment (PP 03 18) covers custom equipment above Part D's \$1,500 sublimit; auto loan/lease coverage (PP 03 35) pays the gap between an ACV settlement on a total loss and the loan or lease balance; limited Mexico coverage (PP 03 21) extends the policy to accidents in Mexico within 25 miles of the U.S. border on trips of 10 days or less; and transportation network driver coverage (PP 23 41) gives back coverage while the driver is logged into a ride-hailing app with no passenger.

> [!example]- A Car Insured at a Scheduled Amount {Example}
> A collector's car is insured under PP 03 08 at a scheduled amount of \$20,000 with a \$500 collision deductible. Its ACV has risen to \$26,000. Find the payment for (a) a total loss whose repair would cost \$30,000, and (b) a collision that costs \$4,000 to repair. (c) A second car with an ACV of \$14,000 and a \$9,000 repair estimate is insured under the same endorsement at \$30,000. What is its payment?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{(a)} &= \min(20{,}000,\ 26{,}000,\ 30{,}000) - 500 \\
> > &= 19{,}500 \\
> > \text{(b)} &= \min(20{,}000,\ 26{,}000,\ 4{,}000) - 500 \\
> > &= 3{,}500 \\
> > \text{(c)} &= \min(30{,}000,\ 14{,}000,\ 9{,}000) - 500 \\
> > &= 8{,}500
> > \end{align*}
> > $$
> > The scheduled amount caps the first car's total loss below its value, so the owner should keep it up to date. It is not an agreed value, so the second car is paid on its repair cost, not its \$30,000 scheduled amount.

> [!example]- Matching the Exposure to the Endorsement {Example}
> Which endorsement does each person need? (a) A driver who owns a motorcycle and a dune buggy; (b) a city resident who owns no car but rents one most weekends; (c) a sales manager who drives a company car every day and owns a personal car; (d) two unrelated roommates who bought a car together; (e) a family that rents its motor home to others in the summer.
>
> > [!answer]-
> > - **(a)** Miscellaneous type vehicle (PP 03 23). Both vehicles fall under PAP Part A exclusion B.1, the motorcycle for having fewer than four wheels and the dune buggy for being designed mainly for off-road use.
> > - **(b)** Named non-owner coverage (PP 03 22). Without a PAP of his own he has no liability coverage that follows him into a rented car.
> > - **(c)** Extended non-owned coverage (PP 03 06). Her own PAP excludes the company car because it is furnished for her regular use.
> > - **(d)** Joint ownership coverage (PP 03 34), which lets unrelated residents of one household be insured as joint owners.
> > - **(e)** Motor home rental coverage bought back on PP 03 28, attached to PP 03 23. Without it there is no liability, medical payments or physical damage coverage while the motor home is rented to others.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Sections 4.7 and 4.8 cover PAP endorsements for vehicles other than personal autos and the additional endorsements. Questions describe a household's vehicles and driving and ask which exposure the unendorsed PAP leaves out and which endorsement fills the gap.
> - **Applied questions:** A loss to a scheduled motor home, trailer or collector car tests the endorsement's own exclusions and its least-of settlement.

> [!warning]- Exam traps
> - **Scheduled amount is a ceiling:** PP 03 08 and the miscellaneous type vehicle endorsement pay the least of the scheduled amount, ACV and repair cost. Paying the scheduled amount on every total loss treats it as agreed value.
> - **Named non-owner versus extended non-owned:** PP 03 22 is for someone who owns no auto. PP 03 06 adds coverage for a regularly furnished vehicle to someone who may already own and insure a car.
> - **Regular use is the gap, not ownership:** The unendorsed PAP covers a friend's car borrowed occasionally. The endorsement is needed for a vehicle furnished for regular use.
> - **Motor home rented out:** The motor home endorsement excludes rental to others unless that coverage is bought back, and a fraudulent renter's damage is excluded either way.
