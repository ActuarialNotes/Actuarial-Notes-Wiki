---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:37e9ac2525e66f0bdccb059711686ae843ba0f5a02ab502fe57dc710b9054d70
  sources:
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions D.2.a-e (pp.14-15), B, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7, G.3 (pp.12, 15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "IRMI Insurance Glossary, 'replacement cost' (fetched 2026-10-10), sha256:a4b7b01ad247b36aae2cb3ed207d8d4c482fa2a16b812ad68ae7874bd0316c29 — https://www.irmi.com/term/insurance-definitions/replacement-cost"
    - "IRMI Insurance Glossary, 'actual cash value (ACV)' (fetched 2026-10-10), sha256:5f284ad72439afe65429eed3341df2aa74bdea4fe89c9f1835b801646fc5053a — https://www.irmi.com/term/insurance-definitions/actual-cash-value"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Replacement Cost.md
---

**Replacement Cost** is the cost to repair or replace damaged property with property of like kind and quality at current prices, with no deduction for depreciation. It is one of the two main valuation bases in property insurance.

Replacement cost prices the property as it was, with the same size, materials and grade, at today's prices. It does not pay for an upgrade. It is not the property's market value either, which includes the land and reflects location and demand, so a house's sale price can be far above or below the cost to rebuild.

The other valuation basis, actual cash value (ACV), is usually

> $$\text{ACV} = \text{Replacement cost} - \text{Depreciation}$$

- $\text{Depreciation}$ reflects age, wear and obsolescence.

A replacement cost policy therefore pays more than an ACV policy for any loss to property that has aged.

## Straight-line depreciation

A straight-line estimate assumes the property loses value evenly over its useful life, so the depreciation is

> $$\text{Depreciation} = \text{Replacement cost} \times \frac{\text{Age}}{\text{Useful life}}$$

ACV deducts depreciation from today's replacement cost, not from the original purchase price.

> [!example]- What does the insurer pay for this roof at actual cash value, and at replacement cost? {Example}
> Hail destroys the roof of a house. A new roof of the same kind and quality costs \$18,000 today. The old roof was 15 years into a 25-year useful life, and the policy has a \$1,000 deductible.
>
> > [!answer]-
> > - The depreciation is $18{,}000 \times 15/25 = \$10{,}800$.
> > - The ACV is $18{,}000 - 10{,}800 = \$7{,}200$.
> > - On an ACV basis the insurer pays $7{,}200 - 1{,}000 = \$6{,}200$, and the homeowner bears \$11,800.
> > - On a replacement cost basis it pays $18{,}000 - 1{,}000 = \$17{,}000$: the same \$6,200 at first, and the \$10,800 holdback once the new roof is on.

## Other measures of actual cash value

Not every jurisdiction measures ACV as replacement cost less depreciation. Some use fair market value, the price a willing buyer would pay a willing seller. Others apply the broad evidence rule, under which a court weighs all relevant evidence, including replacement cost less depreciation, market value and obsolescence.

## Replacement cost settlement

A replacement cost policy usually pays ACV first and the remainder, the holdback, once the property has actually been repaired or replaced, so an insured who does not rebuild recovers only ACV.

The homeowners form also pays replacement cost only when the dwelling is insured for at least 80% of its full replacement cost, which is an [[Insurance to Value|insurance to value]] provision. The condition compares the limit with 80% of the full replacement cost of the whole dwelling, not with the cost of the damaged part. Below the requirement, the insurer pays the larger of the ACV of the damage and the share of the replacement cost that the limit bears to the requirement.

> [!example]- What does the insurer pay for this kitchen fire under the homeowners 80% condition? {Example}
> A house has a full replacement cost of \$400,000 and is insured for \$280,000. A kitchen fire causes damage that costs \$60,000 to repair at replacement cost, and depreciation on the damaged part is 35%. The deductible is \$1,000.
>
> > [!answer]-
> > - The requirement is $0.80 \times 400{,}000 = \$320{,}000$, and the insured carries only \$280,000.
> > - The ACV of the damage is $60{,}000 \times (1 - 0.35) = \$39{,}000$.
> > - The proportional amount is $280{,}000/320{,}000 \times 60{,}000 = \$52{,}500$, the larger of the two.
> > - The insurer pays $52{,}500 - 1{,}000 = \$51{,}500$.
> > - With at least \$320,000 of insurance, it would have paid $60{,}000 - 1{,}000 = \$59{,}000$. The ACV floor matters only for an insured carrying less than \$208,000.

## Replacement cost and indemnity

Paying new for old leaves the insured better off than before the loss, which goes beyond strict indemnity. Insurers offer it because otherwise the insured has to fund the gap between ACV and the cost of rebuilding, and the repair requirement limits the [[Moral Hazard|moral hazard]] of paying more than the property was worth.

> [!trap] Depreciating the purchase price
> ACV is today's replacement cost less depreciation. Depreciating the price paid 15 years ago understates the ACV whenever costs have risen.
