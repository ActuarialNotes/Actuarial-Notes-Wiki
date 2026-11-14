---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:3cce6e43117060b244590e2b772f7ee4bd796a0a5ffe719f6631dc2358d8f898
  sources:
    - "ISO Homeowners 3 – Special Form HO 00 03 05 11 (Maine Bureau of Insurance copy), Definitions; Section I Coverages A–D and Additional Coverages E.1–E.12, pp.1–9, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/HO-3 Property Coverages.md
---

**HO-3 Property Coverages** are the four coverages and twelve additional coverages of Section I of the ISO Homeowners 3 – Special Form (HO 00 03, 05 11 edition). Together they define *what* property and expense the [[Homeowners Policy|homeowners policy]] insures; the perils and the conditions decide when and how much it pays. The coverages are:

1. Coverage A, the dwelling.
2. Coverage B, other structures.
3. Coverage C, personal property.
4. Coverage D, loss of use.
5. Twelve additional coverages, such as debris removal, trees, collapse and ordinance or law.

## Coverage A and Coverage B

Coverage A covers the dwelling on the "residence premises" and structures attached to it, plus materials and supplies on or next to the premises for building, altering or repairing the dwelling or other structures there. Land, including the land under the dwelling, is not covered.

Coverage B covers structures on the residence premises set apart from the dwelling by clear space, including ones connected only by a fence, utility line or similar connection. The most it pays is

> $$B_{\max} = 0.10 \times A$$

- $A$ is the Coverage A limit in the declarations.

Coverage B is additional insurance and does not reduce the Coverage A limit. It excludes land; structures rented or held for rental to anyone who isn't a tenant of the dwelling, unless used only as a private garage; structures from which a "business" is conducted; and structures used to store business property. A structure holding business property owned only by an insured or a tenant is covered as long as the property isn't gaseous or liquid fuel (other than fuel in a parked vehicle's tank).

## Coverage C: personal property

Coverage C covers personal property owned or used by an insured anywhere in the world. At the named insured's request after a loss, it also covers others' property on the part of the residence premises an insured occupies, and a guest's or residence employee's property in any residence an insured occupies.

Property usually kept at another residence of an insured, and property in a self-storage facility, is limited to

> $$C_{\text{other residence}} = \max(0.10 \times C,\ 1{,}000)$$

- $C$ is the Coverage C limit in the declarations.

The limit does not apply to property moved out because the residence premises is being repaired and is unfit to live in, or for 30 days to property in a newly acquired principal residence; and the self-storage limit doesn't apply to property usually kept at another residence.

The special limits are each the total for each loss for the whole category, and none increases Coverage C:

1. \$200 on money, bank notes, bullion, coins, medals, stored value cards and the like.
2. \$1,500 on securities, deeds, manuscripts, personal records, passports, tickets and stamps.
3. \$1,500 on watercraft with their trailers, equipment and motors, and \$1,500 on other trailers.
4. \$1,500 for *theft* of jewelry, watches, furs and precious stones.
5. \$2,500 for *theft* of firearms.
6. \$2,500 for *theft* of silverware, goldware and pewterware.
7. \$2,500 on business property on the residence premises and \$1,500 away from it.
8. \$1,500 on portable electronic equipment in a motor vehicle that can run on the vehicle's power, and \$250 on media for such equipment in a motor vehicle.

Property with no special limit is covered up to its loss, within the Coverage C limit. Property not covered is: articles separately described and specifically insured; animals, birds or fish; motor vehicles and their parts, except portable electronics that can run on another power source and unregistered vehicles used only to service a residence or to assist the handicapped; aircraft other than model or hobby aircraft; hovercraft; property of roomers, boarders and tenants not related to an insured; property in an apartment rented to others (other than landlord's furnishings) and property rented to others off the premises; business data, though blank media and retail software are covered; credit and fund transfer cards (except under the additional coverage); and water or steam.

> [!example]- What does Coverage C pay for this burglary? {Example}
> Burglars take \$3,000 in cash, a \$1,000 coin collection, jewelry worth \$6,000, two firearms worth \$3,000 and a laptop worth \$1,800 from an HO-3 insured's home. Every amount is the actual cash value, and the deductible is \$1,000.
>
> > [!answer]-
> > - Cash and coins are one special limit category, so together they are paid \$200.
> > - Jewelry and firearms are limited because the loss is theft: \$1,500 and \$2,500.
> > - The laptop has no special limit, so it is paid \$1,800.
> > - The loss payable is $200 + 1{,}500 + 2{,}500 + 1{,}800 = \$6{,}000$, and Coverage C pays $6{,}000 - 1{,}000 = \$5{,}000$.
> > - Scheduling the jewelry and the guns on a scheduled personal property endorsement would have covered their full value ([[Homeowners Endorsements]]).

> [!trap] Applying the theft limits to every loss
> The jewelry, firearms and silverware limits apply only to theft. Jewelry destroyed in a fire is paid up to the Coverage C limit.

> [!example]- Which coverage, if any, insures each item? {Example}
> (a) A detached cottage on the residence premises that the insured rents to a college student; (b) a guest's suitcase damaged in a fire in the insured's home; (c) the insured's car, parked in the attached garage when it burns; (d) a riding mower used only to maintain the yard; (e) furniture the insured keeps in a self-storage unit, when Coverage C is \$200,000.
>
> > [!answer]-
> > - **(a) Not covered.** Coverage B excludes a structure rented or held for rental to someone who isn't a tenant of the dwelling, unless it is used solely as a private garage.
> > - **(b) Coverage C**, at the named insured's request after the loss, because a guest's property in a residence an insured occupies can be covered.
> > - **(c) Not covered.** Motor vehicles are property not covered; the car belongs on the [[Auto Physical Damage Coverage|auto policy's physical damage coverage]]. The attached garage itself is Coverage A.
> > - **(d) Coverage C.** An unregistered motor vehicle used solely to service the residence is an exception to the motor vehicle exclusion.
> > - **(e) Coverage C, up to \$20,000.** Property in a self-storage facility is limited to the greater of $0.10 \times 200{,}000 = \$20{,}000$ and \$1,000.

## Coverage D: loss of use

One limit covers three things:

1. Additional living expense pays the necessary increase in living expenses so the household keeps its normal standard of living, for the shortest time needed to repair or, on a permanent move, to settle elsewhere. Coverage D pays the increase over normal living costs, not the whole rent elsewhere.
2. Fair rental value pays the rent lost on a part of the premises rented to others, less expenses that stop.
3. Civil authority pays both for up to two weeks when a civil authority prohibits use of the premises because of direct damage to neighboring premises by a peril insured against.

Cancelling a lease is not covered, and the time periods are not cut short by the policy expiring.

## Additional coverages

The twelve additional coverages are:

1. Debris removal of covered property damaged by a covered peril, within the limit, plus an extra 5% of the limit when damage and debris removal together exceed it; and up to \$1,000 a loss, no more than \$500 a tree, to remove trees felled by windstorm, hail or weight of ice, snow or sleet, or a neighbor's tree felled by a Coverage C peril, that damage a covered structure or block a driveway or a handicap ramp.
2. Reasonable repairs to protect covered property from further damage.
3. Trees, shrubs and plants against fire, lightning, explosion, riot, aircraft, vehicles not owned or operated by a resident, vandalism and theft, but not windstorm.
4. Up to \$500 of fire department service charges assumed by contract, if the property is outside the district furnishing the response, with no deductible.
5. Property removed from premises endangered by a covered peril, against any cause for 30 days.
6. Up to \$500 for credit card, fund transfer card, forgery and counterfeit money losses, with no deductible.
7. Up to \$1,000 of loss assessment by a property owners' association for covered loss to collectively owned property.
8. Abrupt collapse caused by a Coverage C peril, hidden decay or insect damage, weight of contents or rain, or defective construction methods during construction.
9. Glass or safety glazing breakage.
10. Up to \$2,500 for landlord's furnishings in an apartment rented to others.
11. Up to 10% of Coverage A for the increased costs of complying with an ordinance or law.
12. Up to \$5,000 for grave markers.

Trees, shrubs and plants are paid up to 5% of Coverage A in all and \$500 a plant, so the payment is

> $$\text{Trees} = \min\Big(\sum_j \min(T_j,\ 500),\ 0.05 \times A\Big)$$

- $T_j$ is the loss to tree, shrub or plant $j$.

Windstorm is not on the trees' list of perils, but removing a tree felled by wind that hits a structure or blocks the driveway is paid under debris removal.

> [!example]- What does Section I pay for this major fire? {Example}
> An HO-3 insures a dwelling for \$300,000, its full replacement cost, with a \$1,000 deductible. A fire nearly destroys it: the repairs, completed, cost \$296,000, and debris removal costs \$10,000. Three trees burn, worth \$800, \$400 and \$1,200. The family rents elsewhere for four months at \$2,000 a month above its normal living costs. The house is outside the fire district, which bills \$600 for its response.
>
> > [!answer]-
> > - Damage plus debris removal is $296{,}000 + 10{,}000 = \$306{,}000$, more than the \$300,000 limit, so up to $0.05 \times 300{,}000 = \$15{,}000$ more is available for the debris. All \$306,000 is paid.
> > - Each tree is capped at \$500, so the trees are paid $500 + 400 + 500 = \$1{,}400$, within 5% of Coverage A.
> > - Coverage D pays the increase in living costs, $4 \times 2{,}000 = \$8{,}000$.
> > - The fire department charge is capped at \$500 and takes no deductible.
> > - The deductible applies once to the total loss, so Section I pays $306{,}000 + 1{,}400 + 8{,}000 - 1{,}000 + 500 = \$314{,}900$.
