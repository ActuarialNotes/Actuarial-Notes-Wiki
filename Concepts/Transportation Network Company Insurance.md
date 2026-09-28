---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:308b16bada28e610df814aabbc8fbc3ed378eb3f29b07c66232afc9976579688
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Transportation Network Company Insurance.md
---

**Transportation Network Company Insurance** is automobile insurance for a vehicle used to provide *prearranged* transportation of passengers for compensation through a transportation network company's (TNC's) app: ride-hailing. In Alberta it is written on a standard form approved by the Superintendent of Insurance: the **S.P.F. No. 9** (Standard Automobile Form – Transportation Network), whose July 2016 edition was in force when the past-paper questions were set. The TNC buys it, and it insures the TNC's drivers and vehicle owners only while the vehicle is being used as a transportation network automobile. Personal use stays with the driver's own [[Compulsory Auto Insurance|personal auto policy]]. The topic is not in any Fall 2026 reading; it was examined on the 2017–2019 papers.

- **Who is insured.** Every transportation network driver and every transportation network automobile owner is indemnified as an insured person, but drivers and owners have no right to cancel, renew or amend the contract. The policy is written by private insurers; the Alberta government does not provide it (a 2019 published answer).
- **The use periods.** The policy defines "use as a transportation network automobile" in three stages. The published answers and examiner's reports number the periods 0 to 3, with period 0 as the time off the app:
  - **Period 0, not logged on:** personal use, and the SPF 9 does not respond.
  - **Period 1, logged on and waiting, no request accepted:** third-party liability only if the insurer of the driver's own policy has **denied liability**, and then capped at $\$1{,}000{,}000$. [[Statutory Accident Benefits|Accident benefits]] (Section B) respond. There is **no** physical damage cover (Section C).
  - **Period 2, request accepted:** from acceptance, en route to the passenger, until the first passenger enters or the trip is cancelled, whichever is later. Liability to the policy limit, accident benefits and physical damage all respond; the published answer treats the SPF 9 insurer as the only insurer covering them.
  - **Period 3, passengers aboard:** until the last passenger leaves. The cover is the same as period 2.
- **Accident benefits run from log-on.** Section B is primary until the insurer of the driver's own policy accepts liability for the benefits. Because it covers all three stages, the published answer puts the start of accident-benefit coverage at logging onto the app. It puts the end at logging off, and it also accepted "when the last passenger leaves". The examiner's report warns against starting coverage only when a ride is accepted.
- **Not covered even while logged on.** The published answer lists carrying merchandise and a passenger who hails the car on the street without booking through the app. The policy's definitions reach only *prearranged* transportation of *passengers* through the network, and the policy excludes use as a taxicab or livery.
- **Physical damage** carries a deductible per occurrence, except for fire, lightning or theft of the entire automobile. The January 2022 edition of the form keeps the same three-stage structure and the $\$1{,}000{,}000$ period-1 cap.
- **In Ontario**, a 2016 published answer holds that a personal auto insurer may charge more when its insured starts driving for a car-sharing service, "since the additional risk is related to the use of a vehicle for mercantile activities" and the annual mileage is higher. The examiner's report adds that this is done by endorsement or by moving the insured to a commercial policy ([[Risk Classification Restrictions]]).

> [!example]- One Accident in Each Period {Example}
> A TNC in Alberta holds an SPF 9 with a $\$3{,}000{,}000$ third-party liability limit and a $\$2{,}500$ collision deductible. One of its drivers causes an accident, with $\$1{,}400{,}000$ of third-party liability and $\$18{,}000$ of damage to the driver's own car, and the driver is injured.
>
> What does the SPF 9 insurer pay if the accident happens in each of periods 0 to 3?
>
> > [!answer]-
> > **Period 0 (not logged on).** Nothing. This is personal use, and the claim goes to the driver's own policy.
> >
> > **Period 1 (logged on, no request accepted).** The driver reports first to their own insurer. The SPF 9 insurer responds on liability only if that insurer denies the claim, and then only up to $\$1{,}000{,}000$:
> >
> > $$
> > \begin{align*}
> > \text{TPL paid} &= \min(\$1{,}400{,}000,\; \$1{,}000{,}000) \\
> > &= \$1{,}000{,}000
> > \end{align*}
> > $$
> >
> > It pays nothing for the car, because Section C does not apply in period 1. It pays the driver's accident benefits as primary cover until the driver's own insurer accepts liability for them.
> >
> > **Periods 2 and 3 (request accepted, or passenger aboard).** The SPF 9 insurer responds on all three sections:
> >
> > $$
> > \begin{align*}
> > \text{TPL paid} &= \$1{,}400{,}000 \\
> > \text{Collision paid} &= \$18{,}000 - \$2{,}500 \\
> > &= \$15{,}500
> > \end{align*}
> > $$
> >
> > It also pays the driver's accident benefits. The liability claim is within the $\$3{,}000{,}000$ limit, so the $\$1{,}000{,}000$ cap applies only in period 1. The common errors in the examiner's report are paying the full liability claim in period 1, paying physical damage in period 1, and not saying which insurer the driver should report to.

> [!example]- Does the SPF 9 Respond? {Example}
> A driver in Alberta is logged onto a TNC app. Does the TNC's SPF 9 insurer respond to an accident in each case?
>
> 1. A pedestrian flags the driver down on the street, and the accident happens on that trip.
> 2. The driver is delivering a parcel booked through the app.
> 3. The driver accepts a request, the passenger cancels, and the driver, still logged on, collides with another car while waiting for the next request.
> 4. The last passenger gets out, the driver logs off, and the accident happens on the way home.
>
> > [!answer]-
> > 1. **No.** The ride was not prearranged through the network, and the policy covers only prearranged passenger transportation.
> > 2. **No.** Carrying merchandise is not transporting passengers.
> > 3. **Yes, but only as period 1.** The period-2 stage ended when the trip was cancelled. Being logged on and waiting puts the driver back in period 1: liability only if the driver's own insurer denies it, and then capped at $\$1{,}000{,}000$, accident benefits primary, and no cover for the driver's car.
> > 4. **No.** Logged off is period 0, and the driver's own policy responds.
> >
> > The test in every case is whether the vehicle was being used as a transportation network automobile at the moment of the accident, as the policy defines it. The app being open is not enough by itself (cases 1 and 2), and a cancelled trip does not by itself end cover (case 3).
