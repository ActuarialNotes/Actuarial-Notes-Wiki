---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c6357e5ff7c64c678667426babca38f6f41b7498d99eb5db43eff532311ae99
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transportation Network Company Insurance.md
---
**Transportation Network Company Insurance** is automobile insurance for a vehicle used to provide prearranged transportation of passengers for compensation through a transportation network company's (TNC's) app. In Alberta it is written on a standard form approved by the Superintendent of Insurance, the **S.P.F. No. 9** (Standard Automobile Form – Transportation Network), whose July 2016 edition was in force when the past-paper questions were set.

The TNC buys the policy, and it insures the TNC's drivers and vehicle owners only while the vehicle is being used as a transportation network automobile. Personal use stays with the driver's own [[Compulsory Auto Insurance|personal auto policy]]. The topic is not in any Fall 2026 reading. It was examined on the 2017–2019 papers.

## Coverage by period

The policy defines "use as a transportation network automobile" in three stages. The published answers and examiner's reports number the periods 0 to 3, with period 0 as the time off the app:

| Period | Driver's status | Third-party liability | Accident benefits | Physical damage |
| --- | --- | --- | --- | --- |
| 0 | Not logged on | No (personal use) | No | No |
| 1 | Logged on and waiting, no request accepted | Only if the driver's own insurer denies liability, capped at $\$1{,}000{,}000$ | Yes | No |
| 2 | Request accepted, until the first passenger enters or the trip is cancelled, whichever is later | Yes, to the policy limit | Yes | Yes |
| 3 | Passengers aboard, until the last passenger leaves | Yes, to the policy limit | Yes | Yes |

Accident benefits are Section B, and physical damage is Section C. In periods 2 and 3, the published answer treats the SPF 9 insurer as the only insurer covering all three.

[[Statutory Accident Benefits|Accident benefits]] run from log-on. Section B is primary until the insurer of the driver's own policy accepts liability for the benefits. Because it covers all three stages, the published answer puts the start of accident-benefit coverage at logging onto the app. It puts the end at logging off, and it also accepted "when the last passenger leaves".

Physical damage carries a deductible per occurrence, except for fire, lightning or theft of the entire automobile. The January 2022 edition of the form keeps the same three-stage structure and the $\$1{,}000{,}000$ period-1 cap.

> [!example]- What does the SPF 9 insurer pay for this accident in each of periods 0 to 3? {Example}
> A TNC in Alberta holds an SPF 9 with a $\$3{,}000{,}000$ third-party liability limit and a $\$2{,}500$ collision deductible. One of its drivers causes an accident, with $\$1{,}400{,}000$ of third-party liability and $\$18{,}000$ of damage to the driver's own car, and the driver is injured.
>
> > [!answer]-
> > - Period 0 is personal use, so the SPF 9 pays nothing, and the claim goes to the driver's own policy.
> > - In period 1 the driver reports first to their own insurer. The SPF 9 insurer responds on liability only if that insurer denies the claim, and then pays $\min(\$1{,}400{,}000, \$1{,}000{,}000) = \$1{,}000{,}000$.
> > - In period 1 it pays nothing for the car, because Section C does not apply, and it pays the driver's accident benefits as primary cover until the driver's own insurer accepts liability for them.
> > - In periods 2 and 3 it pays the full $\$1{,}400{,}000$ of liability, which is within the $\$3{,}000{,}000$ limit.
> > - It also pays $\$18{,}000 - \$2{,}500 = \$15{,}500$ for the car, and the driver's accident benefits.
> > - The common errors in the examiner's report are paying the full liability claim in period 1, paying physical damage in period 1, and not saying which insurer the driver should report to.

## Who is insured

Every transportation network driver and every transportation network automobile owner is indemnified as an insured person, but drivers and owners have no right to cancel, renew or amend the contract. The policy is written by private insurers. The Alberta government does not provide it (a 2019 published answer).

## Uses the policy does not cover

The policy's definitions reach only prearranged transportation of passengers through the network, and the policy excludes use as a taxicab or livery. Even while the driver is logged on, the published answer lists two uses it does not cover: carrying merchandise, and a passenger who hails the car on the street without booking through the app.

> [!example]- Does the TNC's SPF 9 insurer respond to an accident in each of these cases? {Example}
> A driver in Alberta is logged onto a TNC app.
>
> 1. A pedestrian flags the driver down on the street, and the accident happens on that trip.
> 2. The driver is delivering a parcel booked through the app.
> 3. The driver accepts a request, the passenger cancels, and the driver, still logged on, collides with another car while waiting for the next request.
> 4. The last passenger gets out, the driver logs off, and the accident happens on the way home.
>
> > [!answer]-
> > 1. No, because the ride was not prearranged through the network.
> > 2. No, because carrying merchandise is not transporting passengers.
> > 3. Yes, but only as period 1. Period 2 ended when the trip was cancelled, and being logged on and waiting is period 1: liability only if the driver's own insurer denies it, capped at $\$1{,}000{,}000$, accident benefits primary, and no cover for the driver's car.
> > 4. No, because logged off is period 0, and the driver's own policy responds.

## Car-sharing in Ontario

In Ontario, a 2016 published answer holds that a personal auto insurer may charge more when its insured starts driving for a car-sharing service, "since the additional risk is related to the use of a vehicle for mercantile activities" and the annual mileage is higher. The examiner's report adds that this is done by endorsement or by moving the insured to a commercial policy.

> [!trap] Starting accident benefits when a ride is accepted
> Section B covers all three stages, so accident-benefit coverage starts when the driver logs onto the app. The examiner's report warns against starting it only when a ride is accepted, which is when liability to the policy limit and physical damage begin.
