---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:71033300911478bebd0a2c7e02d5c22bc3e90a7adcc4772ff41d18b43ca94681
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Endorsement.md
---

An **Endorsement** is a written provision that adds to, removes from or otherwise changes the provisions of the [[Insurance Policy|insurance policy]] form it is attached to. It can be attached when the policy is issued or added during the policy period.

Endorsements let insurers tailor a standard form, such as the [[Personal Auto Policy|personal auto policy]] (PAP), the [[Homeowners Policy|homeowners policy]] or the [[Commercial General Liability|commercial general liability]] (CGL) form, to one insured without writing a new contract. Each endorsement replaces the provisions it changes and leaves the rest of the form as it was. An endorsement can:

1. Add coverage the form leaves out.
2. Remove a coverage or an exposure.
3. Change limits, deductibles or valuation.
4. Add insureds.
5. Record changes, such as a new address or vehicle.
6. Change a national form to comply with a state's law (a state amendatory endorsement).

Where an endorsement conflicts with the form, the endorsement controls, because it is the more specific term and the one most recently agreed. Typed or handwritten terms likewise prevail over printed ones. A [[Coverage Analysis|coverage analysis]] therefore reads the endorsements together with the form before deciding what the policy covers.

## Premium for a midterm endorsement

An endorsement added during the term changes the premium only for the rest of the term. With pro rata adjustment, the change in premium is

> $$\Delta P = \Delta P_{\text{annual}} \times \frac{t_{\text{rem}}}{t_{\text{term}}}$$

- $\Delta P_{\text{annual}}$ is the change in annual premium the endorsement makes.
- $t_{\text{rem}}$ is the number of days remaining in the term when it takes effect.
- $t_{\text{term}}$ is the number of days in the term.
- A positive $\Delta P$ is an additional premium and a negative one a return premium.

Charging the full annual premium for an addition made partway through the year overstates it. A cancellation of the whole policy at the insured's request might instead use a short-rate table that returns less than the pro rata premium.

> [!example]- With pro rata adjustments, what does this insured pay or receive? {Example}
> An annual PAP has 245 days left to run when the insured adds a motorcycle by the miscellaneous type vehicle endorsement, at an annual premium of $\$480$. On the same day the insured drops collision coverage on an older car, which carried an annual collision premium of $\$310$.
>
> > [!answer]-
> > - The motorcycle adds $480 \times 245/365 = \$322.19$.
> > - Dropping collision returns $310 \times 245/365 = \$208.08$.
> > - Both changes are endorsements to the same policy, effective on the same date, so they are netted: $322.19 - 208.08 = 114.11$.
> > - The insured pays an additional premium of $\$114.11$.

## Personal auto policy endorsements

The PAP's endorsements for other vehicles and drivers are:

- The **miscellaneous type vehicle endorsement** extends the PAP to motor homes, motorcycles, golf carts and similar vehicles.
- A **snowmobile endorsement** covers snowmobiles.
- **Named non-owner coverage** insures a person who owns no auto but drives borrowed or rented ones.
- **Extended non-owned coverage** covers the named individual for a car furnished for regular use, such as a company car, which the PAP excludes.

Other common PAP additions include towing and labor costs, coverage for customized equipment, auto loan or lease coverage that pays the gap between the vehicle's actual cash value and the balance owed, and joint ownership coverage for unrelated people who own a car together. Some insurers use endorsements to cover personal autos used for a [[Transportation Network Company Insurance|transportation network company]], which the public or livery conveyance exclusion would otherwise remove.

> [!trap] Named non-owner versus extended non-owned
> A company car is excluded from the PAP because it is furnished for regular use, and only extended non-owned coverage restores it. Named non-owner coverage is for a person with no owned auto at all, so it is the wrong answer for a car owner who also drives a company car.

## Homeowners endorsements

The personal property replacement cost endorsement settles contents at [[Replacement Cost|replacement cost]] in place of actual cash value. A scheduled personal property endorsement insures listed valuables, such as jewelry, furs and fine art, for stated amounts on an open perils basis. Other common choices add earthquake coverage, water backup and sump discharge, an inflation guard, home business coverage, identity fraud expense, and personal injury liability for offenses such as libel.

Special limits cap categories of personal property under Coverage C. Raising Coverage C does not raise them. Scheduling the item, or an endorsement that raises the special limit, does.

> [!example]- What does this HO-3 pay for the ring, with and without the endorsement, and what if the ring were lost down a drain? {Example}
> An HO-3 has a $\$500$ deductible and, for illustration, a $\$1{,}500$ special limit on theft of jewelry. A $\$9{,}000$ ring is stolen. A scheduled personal property endorsement would list the ring at $\$9{,}000$ and apply no deductible.
>
> > [!answer]-
> > - Without the endorsement, the special limit caps the theft payment: $\min(9{,}000,\ 1{,}500) - 500 = \$1{,}000$.
> > - With the endorsement, the ring is paid at its scheduled amount: $\$9{,}000$.
> > - Losing property is not one of the named perils that cover personal property, so the unendorsed HO-3 would pay nothing for a ring lost down a drain.
> > - The endorsement covers the scheduled ring on an open perils basis, so it pays $\$9{,}000$ either way.

## CGL additional insured endorsements

An additional insured endorsement gives a third party, such as a project owner, a landlord or a vendor, the status of an insured under the named insured's CGL policy. The status is usually only for liability arising out of the named insured's operations, premises or products. These endorsements are how contracts transfer liability risk to the other party's insurer.
