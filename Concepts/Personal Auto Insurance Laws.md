---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ca8f0fad7749dff6931ae1c3c51d21f4f6916b26292767ac87b689ffd0cfb4dc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Personal Auto Insurance Laws.md
---

**Personal Auto Insurance Laws** are the U.S. state laws that make a driver financially answerable for the harm an auto accident causes and that shape the market around the [[Personal Auto Policy|personal auto policy]]. They are financial responsibility laws, compulsory insurance laws, uninsured motorist funds and coverage requirements, no-fault laws, and the residual market plans that give high-risk drivers access to the coverage the law requires. Each state writes its own, so the rules, minimum limits and penalties differ from state to state.

> $$\text{Paid}_{\text{BI}} = \min\Big(\sum_i \min(D_i,\ L_{\text{pp}}),\ L_{\text{acc}}\Big)$$

> $$\text{Driver owes} = \sum_i D_i + D_{\text{PD}} - \text{Paid}_{\text{BI}} - \min(D_{\text{PD}},\ L_{\text{PD}})$$

- **Symbols:** A state minimum written 30/60/25 means $L_{\text{pp}} = \$30{,}000$ of bodily injury liability for each person, $L_{\text{acc}} = \$60{,}000$ for all persons in one accident, and $L_{\text{PD}} = \$25{,}000$ of property damage liability. $D_i$ is injured person $i$'s bodily injury damages and $D_{\text{PD}}$ the property damage. The minimum is a floor, not a measure of the damages a driver can cause, and whatever the limits don't pay falls on the driver personally.
- **Financial responsibility laws:** These laws require vehicle owners to show they can pay damages arising from owning or using a vehicle. They typically bite after an event: in Texas a driver whose license is suspended after a crash, who is convicted a second time of driving without insurance, or who has a civil judgment from a crash must file a certificate (an SR-22) from an insurer and keep the coverage for two years, and the insurer tells the state if it lapses. The ISO personal auto policy says that when it is certified as future proof of financial responsibility it complies with the law, and when an accident happens in another state with higher financial responsibility limits, it provides those limits.
- **Compulsory insurance laws:** Virtually all states require auto liability insurance, or another approved form of financial security, before a vehicle may legally be driven. Massachusetts was first, in 1927. New Hampshire has no compulsory insurance law and instead requires drivers to show they can pay if they cause an accident, and Virginia lets a motorist pay a fee to register an uninsured vehicle. States enforce the laws with proof-of-insurance cards, evidence of insurance at registration or after a crash, insurer reports to the motor vehicle department when a policy is cancelled or not renewed, and online verification of coverage. Penalties include fines, license or registration suspension, and in some states jail or impoundment.
- **Their limits:** Compulsory laws haven't stopped uninsured driving. About 14% of U.S. motorists were uninsured in 2022, by the Insurance Research Council's estimate, and the laws do nothing against hit-and-run drivers, stolen vehicles or a driver who cancels a policy right after getting the proof card. About a dozen states have "no pay, no play" laws that bar uninsured drivers from suing for noneconomic damages such as pain and suffering.
- **Uninsured motorist funds and coverage:** A few states set up unsatisfied judgment funds to pay accident victims when the at-fault driver can't pay a judgment, though their effectiveness proved limited. Maryland's Automobile Insurance Fund has an Uninsured Division that pays Maryland residents injured in Maryland by uninsured or unidentified drivers when no other insurance recovery is available, funded by uninsured motorist fines, investment income and collections, and it may recover from the at-fault driver. The more common remedy is [[Uninsured Motorists Coverage|uninsured and underinsured motorists coverage]], mandatory in about 20 jurisdictions and required to be offered in the others.
- **No-fault laws:** In a no-fault state each driver claims first-party benefits, called personal injury protection (PIP), from their own insurer regardless of fault, and may sue for pain and suffering only above a threshold. Twelve states and Puerto Rico have such laws. Florida, Michigan, New Jersey, New York and Pennsylvania use a **verbal** threshold, defined by the seriousness of the injury, and Hawaii, Kansas, Kentucky, Massachusetts, Minnesota, North Dakota and Utah a **monetary** threshold of medical expenses. In New Jersey, Pennsylvania and Kentucky drivers may choose to keep an unrestricted right to sue. **Add-on** states give first-party benefits without restricting suits, and **tort** states have neither. Canada's provincial schemes are described in [[No-Fault Insurance]].
- **Residual markets and low-cost policies:** Because coverage is compulsory, drivers the voluntary market declines must still be able to get it, through an assigned risk plan, a joint underwriting association, a reinsurance facility or a state fund ([[Automobile Plans]]). Some states add low-cost policies for low-income drivers, such as California's program, with limits of 10/20/3, and New Jersey's basic policy.
- **Canada:** Every province makes auto insurance compulsory on its own terms, described in [[Compulsory Auto Insurance]].

> [!example]- Minimum Limits Against Real Damages {Example}
> A Texas driver carries the state minimum of 30/60/25 and causes a crash. One person has \$45,000 of bodily injury damages, another \$25,000, and the other car, worth \$28,000, is destroyed. How much does the driver's policy pay, and how much does the driver owe personally?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Paid}_{\text{BI}} &= \min\big(\min(45{,}000,\ 30{,}000) + \min(25{,}000,\ 30{,}000),\ 60{,}000\big) \\
> > &= \min(55{,}000,\ 60{,}000) \\
> > &= 55{,}000 \\
> > \text{Paid}_{\text{PD}} &= \min(28{,}000,\ 25{,}000) \\
> > &= 25{,}000 \\
> > \text{Driver owes} &= 45{,}000 + 25{,}000 + 28{,}000 - 55{,}000 - 25{,}000 \\
> > &= 18{,}000
> > \end{align*}
> > $$
> > The policy pays \$80,000, and the driver is personally liable for \$15,000 of the first person's injury and \$3,000 of the car. Meeting the law's minimum didn't protect the driver's own assets.

> [!example]- Which Law Is at Work? {Example}
> Name the law or mechanism in each case: (a) a Texas driver convicted a second time of driving without insurance must file an SR-22 and keep coverage for two years; (b) a Maryland resident hurt in Maryland by a hit-and-run driver, with no other insurance to claim from, is paid by a state fund; (c) a New Jersey driver who did not reject the lawsuit threshold may sue for pain and suffering only for a serious injury; (d) a driver declined by every insurer gets the liability coverage the state requires through a plan that places him with an insurer.
>
> > [!answer]-
> > - **(a)** A financial responsibility law, requiring proof of future ability to pay after a triggering event.
> > - **(b)** An uninsured motorist fund, the Uninsured Division of the Maryland Automobile Insurance Fund.
> > - **(c)** A no-fault law with a verbal threshold, in a choice state where the threshold applies unless the driver rejects it.
> > - **(d)** An automobile insurance plan, the assigned risk form of the residual market.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective is the personal vehicle risk management environment. Questions describe a driver or an accident and ask which law applies (financial responsibility, compulsory insurance, an uninsured motorist fund, no-fault) or what it requires.
> - **Limits arithmetic:** A question may give split limits such as 30/60/25 and the damages, and ask what the policy pays and what the driver owes.
> - **Why the PAP looks as it does:** Expect links to the policy itself: Part C uninsured motorists coverage and the out-of-state and financial responsibility provisions of Part A.

> [!warning]- Exam traps
> - **Financial responsibility is not compulsory insurance:** A financial responsibility law requires proof of ability to pay, usually after an accident, conviction or judgment. A compulsory law requires coverage before the car is driven at all.
> - **The minimum is not adequate:** State minimum limits are often far below the damages an accident causes, and the excess is the driver's own debt.
> - **No-fault has a threshold:** Strict no-fault both pays first-party benefits and restricts suits. A state that pays benefits without restricting suits is an add-on state.
> - **Split limits read per person, per accident, property damage:** In 30/60/25, the \$60,000 caps all bodily injury in one accident, and no one person gets more than \$30,000.
