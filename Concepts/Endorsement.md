---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:efec7f6c7f5c75f3d46e59d7c74022aeeba7bc59d2486a9b5387f7e8eeaf78a4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Endorsement.md
---

An **Endorsement** is a written provision that adds to, removes from or otherwise changes the provisions of the [[Insurance Policy|insurance policy]] form it is attached to. It can be attached when the policy is issued or added during the policy period. Endorsements let insurers tailor a standard form, such as the [[Personal Auto Policy|personal auto policy]], the [[Homeowners Policy|homeowners policy]] or the [[Commercial General Liability|commercial general liability]] form, to one insured without writing a new contract.

> $$\text{Policy} = \text{Form} \oplus E_1 \oplus \cdots \oplus E_n$$

> $$\Delta P = \Delta P_{\text{annual}} \times \frac{t_{\text{rem}}}{t_{\text{term}}}$$

- **Symbols:** $E_1, \dots, E_n$ are the endorsements attached to the form, and $\oplus$ means that each one replaces the provisions it changes and leaves the rest of the form as it was. $\Delta P_{\text{annual}}$ is the change in annual premium an endorsement makes, $t_{\text{rem}}$ the days remaining in the term when it takes effect and $t_{\text{term}}$ the days in the term. A positive $\Delta P$ is an additional premium and a negative one a return premium.
- **Precedence:** Where an endorsement conflicts with the form, the endorsement controls, because it is the more specific term and the one most recently agreed. Typed or handwritten terms likewise prevail over printed ones. A [[Coverage Analysis|coverage analysis]] therefore reads the endorsements together with the form before deciding what the policy covers.
- **Uses:** Endorsements add coverage the form leaves out, remove a coverage or an exposure, change limits, deductibles or valuation, add insureds, and record changes such as a new address or vehicle. State amendatory endorsements change a national form to comply with a state's law.
- **PAP endorsements for other vehicles:** The miscellaneous type vehicle endorsement extends the PAP to motor homes, motorcycles, golf carts and similar vehicles, and a snowmobile endorsement covers snowmobiles. Named non-owner coverage insures a person who owns no auto but drives borrowed or rented ones. Extended non-owned coverage covers the named individual for a car furnished for regular use, such as a company car, which the PAP excludes.
- **Other PAP endorsements:** Common additions include towing and labor costs, coverage for customized equipment, auto loan or lease coverage that pays the gap between the vehicle's actual cash value and the balance owed, and joint ownership coverage for unrelated people who own a car together. Some insurers use endorsements to cover personal autos used for a [[Transportation Network Company Insurance|transportation network company]], which the public or livery conveyance exclusion would otherwise remove.
- **Homeowners endorsements:** The personal property replacement cost endorsement settles contents at [[Replacement Cost|replacement cost]] in place of actual cash value. A scheduled personal property endorsement insures listed valuables, such as jewelry, furs and fine art, for stated amounts on an open perils basis. Other common choices add earthquake coverage, water backup and sump discharge, an inflation guard, home business coverage, identity fraud expense, and personal injury liability for offenses such as libel.
- **CGL additional insured endorsements:** These give a third party, such as a project owner, a landlord or a vendor, the status of an insured under the named insured's CGL policy, usually only for liability arising out of the named insured's operations, premises or products. They are how contracts transfer liability risk to the other party's insurer.

> [!example]- Adding a Motorcycle and Dropping Collision Midterm {Example}
> An annual PAP has 245 days left to run when the insured adds a motorcycle by the miscellaneous type vehicle endorsement, at an annual premium of \$480. On the same day the insured drops collision coverage on an older car, which carried an annual collision premium of \$310. With pro rata adjustments, what does the insured pay or receive?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \Delta P_{\text{add}} &= 480 \times \frac{245}{365} \\
> > &= 322.19 \\
> > \Delta P_{\text{drop}} &= -310 \times \frac{245}{365} \\
> > &= -208.08 \\
> > \Delta P &= 322.19 - 208.08 \\
> > &= 114.11
> > \end{align*}
> > $$
> > The insured pays an additional premium of \$114.11. Both changes are endorsements to the same policy, effective on the same date, so they are netted. A cancellation of the whole policy at the insured's request might instead use a short-rate table that returns less than the pro rata premium.

> [!example]- Scheduling an Engagement Ring {Example}
> An HO-3 has a \$500 deductible and, for illustration, a \$1,500 special limit on theft of jewelry. A \$9,000 ring is stolen. Find the payment without an endorsement, and with a scheduled personal property endorsement listing the ring at \$9,000 that applies no deductible. What if the ring had instead been lost down a drain?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Unscheduled} &= \min(9{,}000,\ 1{,}500) - 500 \\
> > &= 1{,}000 \\
> > \text{Scheduled} &= \min(9{,}000,\ 9{,}000) \\
> > &= 9{,}000
> > \end{align*}
> > $$
> > The special limit caps the theft payment under the form. If the ring were lost down a drain, the unendorsed HO-3 would pay nothing, because losing property is not one of the named perils that cover personal property. The endorsement covers the scheduled ring on an open perils basis, so it would pay the \$9,000 either way.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions describe an insured's vehicles or situation and ask which PAP endorsement covers a motorcycle, a motor home, a company car or a driver who owns no auto. Others ask which additional PAP endorsement fills a gap, such as an auto loan that exceeds the car's value.
> - **Homeowners:** Questions describe a household's property and activities, such as valuable jewelry, a basement prone to sewer backup or a business run from home, and ask which endorsement to recommend and what it changes in the HO-3.
> - **Reading an endorsed policy:** A coverage question can attach an endorsement to a form and ask whether a loss is covered, which turns on the endorsement prevailing over the form wherever the two conflict.

> [!warning]- Exam traps
> - **The endorsement wins:** When an endorsement and the form say different things, the endorsement controls. Answering from the unendorsed form misses the change the endorsement made.
> - **Regular use:** A company car is excluded from the PAP because it is furnished for regular use, and only extended non-owned coverage restores it. Named non-owner coverage is for a person with no owned auto at all, so it is the wrong answer for a car owner who also drives a company car.
> - **Special limits versus scheduling:** Special limits cap categories of personal property under Coverage C. Raising Coverage C does not raise them, and scheduling the item, or an endorsement that raises the special limit, does.
> - **Pro rata, not full annual:** A midterm endorsement changes the premium only for the rest of the term. Charging the full annual premium for an addition made partway through the year overstates it.
