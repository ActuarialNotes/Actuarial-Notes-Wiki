---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:d70020408b05c1c21164fdf86890b884a35bfc30fd8179903541653043b0a9f7
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §D, F.1, F.2.d–e (delta re-check of example (b)), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §E.1–E.7, F.1 (Examples 1–3), F.2 pp.10–14, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form (specimen), §E.7.e(2) incl. the renewal-option sentence, p.13 (delta re-check of the valuation bullet, symbols bullet and Unrepaired Tenant Improvements example), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/BPP Loss Conditions and Additional Conditions.md
---

The **loss conditions and additional conditions** of the [[Building and Personal Property Coverage Form|BPP]] are the rules in sections E and F of ISO CP 00 10 10 12 that decide how a covered loss is reported, valued, settled and shared. They apply alongside the [[Common Policy Conditions]] and the [[Commercial Property Conditions]].

The seven loss conditions are abandonment, appraisal, duties in the event of loss or damage, loss payment, recovered property, vacancy and valuation. The two additional conditions are coinsurance and mortgageholders. The valuation condition decides how the amount of a covered loss is measured, and coinsurance and vacancy can reduce it.

## Duties, loss payment and recovered property

After a loss the insured must give prompt notice, protect the property from further damage, allow inspection, send a signed, sworn proof of loss within 60 days after the insurer's request, and cooperate. The insured cannot abandon damaged property to the insurer. Instead the insurer chooses to pay the value of the property, pay the cost to repair or replace it, take it at an agreed or appraised value, or repair or replace it with property of like kind and quality. It never pays more than the insured's financial interest. Whichever party recovers property after settlement must tell the other, and at the insured's option the property is returned to it for repayment of what the insurer paid for it.

## Appraisal

If the parties disagree on the value of the property or the amount of loss, either may demand an appraisal in writing. Each picks a competent and impartial appraiser, the two pick an umpire (or a judge does if they cannot agree), and a decision agreed by any two is binding. Each party pays its own appraiser, and they share the umpire's and other costs equally. Appraisal settles the amount only, and the insurer keeps its right to deny the claim.

## Valuation

Property is valued at [[Actual Cash Value|actual cash value]] at the time of loss, with these exceptions:

1. Building repairs costing $\$2{,}500$ or less are paid at [[Replacement Cost|replacement cost]] if the building limit satisfies coinsurance. Awnings, floor coverings, appliances and outdoor equipment stay at actual cash value.
2. Stock sold but not delivered is valued at the selling price less discounts and unincurred expenses.
3. Glass is valued at the cost of safety glazing where the law requires it.
4. A tenant's improvements and betterments are valued at actual cash value if repaired promptly, at a proportion of original cost if not, and at nothing if others pay for the repair.

The [[BPP Optional Coverages|replacement cost optional coverage]] substitutes replacement cost for actual cash value. The value of unrepaired improvements and betterments is

> $$\text{TIB} = K \times \frac{n_{\text{remaining}}}{n_{\text{total}}}$$

- $K$ is the original cost of the improvements and betterments.
- $n_{\text{remaining}}$ is the number of days from the loss to the expiration of the lease.
- $n_{\text{total}}$ is the number of days from installation to the expiration of the lease.
- If the lease contains a renewal option, the expiration of the renewal option period replaces the expiration of the lease in both counts.

> [!example]- How are these unrepaired improvements valued, and what if the lease had a 730-day renewal option? {Example}
> A tenant spent $\$90{,}000$ on improvements and betterments when it moved in. The lease runs 1,825 days from the installation. A fire destroys the improvements with 730 days left on the lease, and the tenant decides not to repair them.
>
> > [!answer]-
> > - The tenant does not repair promptly, so the improvements are valued at a proportion of original cost.
> > - With no renewal option, $\text{TIB} = 90{,}000 \times 730 / 1{,}825 = \$36{,}000$.
> > - With a 730-day renewal option, both counts run to the end of the renewal option period, $730 + 730 = 1{,}460$ days remaining out of $1{,}825 + 730 = 2{,}555$.
> > - Then $\text{TIB} = 90{,}000 \times 1{,}460 / 2{,}555 = \$51{,}428.57$.
> > - Had the landlord paid to restore them, the tenant would have lost nothing and the value would be zero.

## Vacancy

A tenant's unit is vacant when it does not contain enough business personal property to conduct customary operations. An owner's or general lessee's building is vacant unless at least 31% of its total square footage is rented and used by tenants for their customary operations, or used by the owner for its own. Buildings under construction or renovation are not vacant.

Once the building has been vacant for more than 60 consecutive days before the loss, the insurer pays nothing for six causes of loss:

1. Vandalism.
2. Sprinkler leakage, unless the system was protected against freezing.
3. Building glass breakage.
4. Water damage.
5. Theft.
6. Attempted theft.

For any other covered cause of loss, such as fire, the payment is reduced by 15%:

> $$\text{Paid}_{\text{vacant}} = 0.85 \times \text{Paid}$$

- $\text{Paid}$ is what the insurer would pay if the building were not vacant, the loss less the deductible.

> [!example]- An owner's building has had 20% of its floor area in use for 75 days when a fire causes $\$200{,}000$ of damage. With a $\$1{,}000$ deductible, what is paid? {Example}
> - With less than 31% of the floor area in use, the building is vacant, and it has been for more than 60 days.
> - Fire is not one of the six causes of loss the condition removes, so the payment is reduced by 15%.
> - The insurer pays $0.85 \times (200{,}000 - 1{,}000) = \$169{,}150$.

## Coinsurance

If the value of covered property at the time of loss times the coinsurance percentage exceeds the limit, the insurer divides the limit by that product, multiplies the loss before the deductible by the result, subtracts the deductible and pays that or the limit, whichever is less:

> $$\text{Paid} = \min\left(\frac{C}{p\,V} \times L - D,\ C\right)$$

- $C$ is the limit of insurance.
- $p$ is the coinsurance percentage.
- $V$ is the value of the covered property at the time of loss.
- $L$ is the loss before the deductible, and $D$ is the deductible.
- The formula applies when $pV > C$. Otherwise there is no penalty, and the loss less the deductible is paid, up to the limit.

When one limit covers several items, the test uses the total value of all of them, as in [[Blanket Insurance|blanket insurance]]. The clause rests on [[Insurance to Value|insurance to value]].

> [!example]- What does the insurer pay for this fire, and what does the coinsurance penalty cost the owner? {Example}
> A building worth $\$600{,}000$ at the time of loss is insured for $\$450{,}000$ with a 90% coinsurance percentage and a $\$2{,}500$ deductible. A fire causes a $\$120{,}000$ loss.
>
> > [!answer]-
> > - The required insurance is $0.90 \times 600{,}000 = \$540{,}000$, more than the limit, so there is a penalty.
> > - The ratio is $450{,}000 / 540{,}000 = 5/6$.
> > - The reduced loss is $5/6 \times 120{,}000 = \$100{,}000$.
> > - The insurer pays $100{,}000 - 2{,}500 = \$97{,}500$, which is less than the limit.
> > - With a limit of at least $\$540{,}000$ it would have paid $120{,}000 - 2{,}500 = \$117{,}500$, so the penalty costs the owner $\$20{,}000$ on top of the deductible.

## Mortgageholders

The insurer pays covered building losses to each mortgageholder in the declarations, in order of precedence, as interests may appear, even if the mortgageholder has started foreclosure. If the owner's claim is denied for its own acts or noncompliance, the mortgageholder is still paid if it:

1. pays any premium due at the insurer's request,
2. submits a sworn proof of loss within 60 days after notice of the owner's failure, and
3. has told the insurer of changes in ownership, occupancy or substantial changes in risk it knew of.

The insurer then takes over the mortgageholder's rights against the owner to the extent of its payment, or may pay off the whole mortgage and take an assignment of it. The mortgageholder gets 10 days' notice of cancellation for nonpayment, 30 days for any other reason, and 10 days' notice of nonrenewal.

> [!trap] Testing coinsurance against the value when the policy was written
> Coinsurance compares the limit with the value of the property at the time of loss. A limit that met the requirement at inception can fall short after a year of rising values, and the penalty follows.
