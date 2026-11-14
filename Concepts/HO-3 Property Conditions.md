---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:195ec2547cf73a35e642f27dbbebbb3625c93b5a2f1650ef2da6160a796c69cc
  sources:
    - "ISO Homeowners 3 – Special Form HO 00 03 05 11 (Maine Bureau of Insurance copy), Section I – Conditions A–S, pp.13–17, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/HO-3 Property Conditions.md
---

**HO-3 Property Conditions** are the Section I conditions of the ISO Homeowners 3 – Special Form (HO 00 03, 05 11 edition): the rules that decide how much a covered property loss is worth and how it is paid. They cover insurable interest, the deductible, the insured's duties after a loss, [[Loss Settlement Provisions|loss settlement]] including the 80% replacement cost rule, pairs and sets, appraisal, other insurance, suits against the insurer, the mortgage clause and the other conditions that finish Section I.

However many people have an interest in the property, the insurer pays no insured more than that insured's [[Insurable Interest|interest]] at the time of loss, and no more than the limit. Unless the policy says otherwise, the insurer pays only the part of the total of all loss payable from one loss that exceeds the deductible, subject to the limit. If two or more deductibles apply, only the highest applies.

## Loss settlement

Personal property, awnings, carpeting, household appliances, outdoor antennas and equipment, structures that are not buildings, and grave markers are settled at actual cash value at the time of loss, but not more than the cost to repair or replace.

Buildings under Coverage A or B are settled at replacement cost without deduction for depreciation if the insurance on the building is at least 80% of its full replacement cost immediately before the loss ([[Insurance to Value]]). When $I \ge 0.8\,\text{RC}$, the amount paid before the deductible is

> $$\text{Paid} = \min(L,\ \text{RC}_{\text{loss}},\ \text{Spent})$$

- $I$ is the amount of insurance on the damaged building.
- $\text{RC}$ is the full [[Replacement Cost|replacement cost]] of the building immediately before the loss.
- $L$ is the limit of liability that applies to the building.
- $\text{RC}_{\text{loss}}$ is the cost to repair or replace the damaged part with material of like kind and quality for like use.
- $\text{Spent}$ is the amount actually and necessarily spent to repair it.

Below 80%, the insurer pays the greater of the actual cash value of the damage and the proportion of the replacement cost of the damage that the insurance bears to 80% of the building's replacement cost, up to the limit. That proportion is

> $$P = \frac{I}{0.8\,\text{RC}} \times \text{RC}_{\text{loss}}$$

and when $I < 0.8\,\text{RC}$ the amount paid before the deductible is

> $$\text{Paid} = \min\big(L,\ \max(\text{ACV}_{\text{loss}},\ P)\big)$$

- $\text{ACV}_{\text{loss}}$ is the [[Actual Cash Value|actual cash value]] of the damaged part.

Excavations, foundations and supports below the lowest basement floor or below ground, and underground flues, pipes, wiring and drains, are left out of the replacement cost when testing the 80%. The deductible comes off after these amounts.

> [!example]- What does the insurer pay for this roof, and what if the house were insured for $\$320{,}000$? {Example}
> A house has a full replacement cost of \$400,000 and is insured for \$280,000 with a \$1,000 deductible. A windstorm damages the roof: replacing it costs \$30,000, and the damaged roof's actual cash value is \$18,000. The roof is replaced.
>
> > [!answer]-
> > - \$280,000 is 70% of the replacement cost, below 80%, so the insurer pays the greater of the ACV and the proportional replacement cost.
> > - $0.8 \times 400{,}000 = 320{,}000$, so $P = \frac{280{,}000}{320{,}000} \times 30{,}000 = 0.875 \times 30{,}000 = \$26{,}250$.
> > - The insurer pays $\max(18{,}000,\ 26{,}250) - 1{,}000 = \$25{,}250$.
> > - Insured for \$320,000, exactly 80% of the replacement cost, the roof is paid at replacement cost: $30{,}000 - 1{,}000 = \$29{,}000$.
> > - Underinsuring by \$40,000 cost the insured \$3,750 on a partial loss.

> [!trap] Paying the lesser of ACV and the proportional amount
> Below 80%, the HO-3 pays the *greater* of the actual cash value and the proportional replacement cost. Paying the lesser, or the proportional amount alone when the ACV is higher, understates the payment.

## Until the repair is done

The insurer pays no more than actual cash value until the repair or replacement is complete, unless the cost is both less than 5% of the insurance on the building and less than \$2,500. The insured may claim on an actual cash value basis first and then claim the rest, as long as it notifies the insurer within 180 days after the loss of its intent to repair or replace. A building rebuilt somewhere else is paid no more than rebuilding at the original premises would cost, and the increased cost of complying with an ordinance or law is paid only under the ordinance or law additional coverage.

> [!example]- What can the insured collect now, before the deductible, for each unrepaired loss? {Example}
> A house is insured for \$300,000, more than 80% of its replacement cost. (a) Hail damage costs \$2,000 to repair. (b) A fire causes damage that would cost \$40,000 to repair, with an actual cash value of \$28,000. The insured has not yet repaired either.
>
> > [!answer]-
> > - 5% of the insurance is $0.05 \times 300{,}000 = \$15{,}000$.
> > - (a) \$2,000 is less than \$15,000 and less than \$2,500, so the loss is settled at replacement cost now: \$2,000.
> > - (b) \$40,000 fails both tests, so the insurer pays only the \$28,000 actual cash value until the repair is complete.
> > - The insured can collect the remaining \$12,000 after repairing, provided it told the insurer within 180 days of the loss that it intended to repair.

## Duties after loss

The insurer has no duty to provide coverage if failing to perform these duties is prejudicial to it. The named insured, an insured seeking coverage or a representative must:

1. Give prompt notice.
2. Notify the police of a theft, and the card company for a credit card loss.
3. Protect the property from further damage, making reasonable and necessary repairs and keeping a record of their cost.
4. Cooperate in the investigation.
5. Prepare an inventory of damaged personal property with quantity, description, actual cash value and amount of loss, with bills and receipts.
6. As often as reasonably required, show the damaged property, provide records and submit to examination under oath outside the presence of other insureds.
7. Within 60 days after the insurer's request, send a signed, sworn proof of loss.

## Pairs, appraisal, other insurance and suits

For loss to a pair or set, the insurer may repair or replace any part to restore the pair or set to its value before the loss, or pay the difference between its actual cash value before and after the loss.

If the insured and insurer disagree on the amount of loss, either may demand appraisal. Each chooses a competent and impartial appraiser within 20 days of a written request; the appraisers choose an umpire, and a judge does if they can't agree within 15 days. Each appraiser sets the loss separately, an agreement between the two or a decision by any two of the three sets the amount, and each party pays its own appraiser and shares the umpire's and other costs.

When other insurance covers the loss, the insurer pays the proportion its limit bears to all the insurance covering it. This policy's share is

> $$\text{Share} = \frac{L}{\sum_k L_k}$$

- $L_k$ is the limit of policy $k$ covering the loss.

The policy is excess over a service agreement, such as a home warranty or a property restoration plan. No action can be brought against the insurer unless the insured has fully complied with Section I and it is started within two years after the date of loss.

> [!example]- A $\$50{,}000$ Coverage A loss is covered by this policy, limit $\$300{,}000$, and another, limit $\$200{,}000$. What does this policy pay? {Example}
> - All the insurance covering the loss is $300{,}000 + 200{,}000 = \$500{,}000$.
> - This policy's share is $300{,}000 / 500{,}000 = 0.6$, so it pays $0.6 \times 50{,}000 = \$30{,}000$.
> - The other insurer pays \$20,000.

## Loss payment and the mortgage clause

With written notice within 30 days after receiving the sworn proof of loss, the insurer may repair or replace with property of like kind and quality. It adjusts losses with the named insured, pays the named insured unless someone else is named or entitled, and pays within 60 days after the proof of loss once there is an agreement, a final judgment or an appraisal award. It need not accept property an insured abandons.

A Coverage A or B loss is paid to the named mortgagee and the named insured as interests appear, mortgagees in order of precedence. If the insurer denies the insured's claim, the denial doesn't apply to the mortgagee if it reports changes in ownership, occupancy or substantial change in risk that it knows of, pays premium due when the insured hasn't, and submits a sworn statement of loss within 60 days after notice of the insured's failure to. The mortgagee gets at least 10 days' notice of cancellation or nonrenewal. If the insurer pays the mortgagee and denies the insured, it is subrogated to the mortgagee's rights, or may pay off the mortgage and take an assignment of it.

> [!example]- The named insured burns down his own house, and the bank holding the mortgage has met the mortgage clause's conditions. Who is paid? {Example}
> - The mortgagee is paid and the insured is not.
> - Intentional loss bars the insured, but the denial does not apply to the mortgagee's valid claim.
> - Having paid the bank, the insurer is subrogated to the bank's rights under the mortgage against the insured.

## The rest of Section I

The insurance does not benefit a bailee holding, storing or moving property for a fee. Nuclear hazard is not treated as fire, explosion or smoke, but direct loss by fire resulting from it is covered. Recovered property may be returned to the insured with the payment adjusted, or kept by the insurer. Volcanic eruptions within 72 hours are one eruption. The policy covers only losses during the policy period. If any insured intentionally concealed or misrepresented a material fact, engaged in fraudulent conduct or made false statements relating to the insurance, before or after a loss, no insured is covered under Section I. A loss payee shown for listed personal property is an insured for that property and is notified of cancellation or nonrenewal.
