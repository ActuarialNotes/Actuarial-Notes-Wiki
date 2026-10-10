---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a38f4f4fa212b87a85600f89322097449775fef2e4a8f0b1d53dd6974b4b94b9
  sources:
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions D.2.a-e (pp.14-15), B, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, E.7, G.3 (pp.12, 15), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "IRMI Insurance Glossary, 'replacement cost' (fetched 2026-10-10), sha256:a4b7b01ad247b36aae2cb3ed207d8d4c482fa2a16b812ad68ae7874bd0316c29 — https://www.irmi.com/term/insurance-definitions/replacement-cost"
    - "IRMI Insurance Glossary, 'actual cash value (ACV)' (fetched 2026-10-10), sha256:5f284ad72439afe65429eed3341df2aa74bdea4fe89c9f1835b801646fc5053a — https://www.irmi.com/term/insurance-definitions/actual-cash-value"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Replacement Cost.md
---

**Replacement Cost** is the cost to repair or replace damaged property with property of like kind and quality at current prices, with no deduction for depreciation. It is one of the two main valuation bases in property insurance. The other, actual cash value (ACV), is usually replacement cost less depreciation, so a replacement cost policy pays more than an ACV policy for any loss to property that has aged.

> $$\text{ACV} = \text{Replacement cost} - \text{Depreciation}$$

> $$\text{Depreciation} = \text{Replacement cost} \times \frac{\text{Age}}{\text{Useful life}}$$

- **Like kind and quality:** Replacement cost prices the property as it was, with the same size, materials and grade, at today's prices. It does not pay for an upgrade, and it is not the property's market value, which includes the land and reflects location and demand.
- **Actual cash value:** Depreciation reflects age, wear and obsolescence, and the second block is a straight-line estimate, which assumes the property loses value evenly over its useful life. Not every jurisdiction measures ACV as replacement cost less depreciation. Some use fair market value, the price a willing buyer would pay a willing seller, and others apply the broad evidence rule, under which a court weighs all relevant evidence, including replacement cost less depreciation, market value and obsolescence.
- **Settlement:** A replacement cost policy usually pays ACV first and the remainder, the holdback, once the property has actually been repaired or replaced, so an insured who does not rebuild recovers only ACV. The homeowners form also pays replacement cost only when the dwelling is insured for at least 80% of its full replacement cost, which is an [[Insurance to Value|insurance to value]] provision.
- **Indemnity and moral hazard:** Paying new for old leaves the insured better off than before the loss, which goes beyond strict indemnity. Insurers offer it because otherwise the insured has to fund the gap between ACV and the cost of rebuilding, and the repair requirement limits the [[Moral Hazard|moral hazard]] of paying more than the property was worth.

> [!example]- A Hail-Damaged Roof on Each Basis {Example}
> Hail destroys the roof of a house. A new roof of the same kind and quality costs \$18,000 today. The old roof was 15 years into a 25-year useful life, and the policy has a \$1,000 deductible. Find the payment if the roof is insured at actual cash value, and if it is insured at replacement cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Depreciation} &= 18{,}000 \times \frac{15}{25} \\
> > &= 10{,}800 \\
> > \text{ACV} &= 18{,}000 - 10{,}800 \\
> > &= 7{,}200
> > \end{align*}
> > $$
> > On an ACV basis the insurer pays $7{,}200 - 1{,}000 = 6{,}200$. On a replacement cost basis it pays $18{,}000 - 1{,}000 = 17{,}000$: the same \$6,200 at first, and the \$10,800 holdback once the new roof is on. The homeowner bears \$11,800 under the ACV policy and only the deductible under the replacement cost policy, which is the difference the extra premium buys.

> [!example]- The Homeowners 80% Condition {Example}
> A house has a full replacement cost of \$400,000 and is insured for \$280,000. A kitchen fire causes damage that costs \$60,000 to repair at replacement cost, and depreciation on the damaged part is 35%. The deductible is \$1,000. Under a homeowners replacement cost condition with an 80% requirement, what does the insurer pay?
>
> > [!answer]-
> > The requirement is $0.80 \times 400{,}000 = 320{,}000$, and the insured carries only \$280,000. Below the requirement, the insurer pays the larger of the ACV of the damage and the share of the replacement cost that the limit bears to the requirement.
> > $$
> > \begin{align*}
> > \text{ACV} &= 60{,}000(1 - 0.35) \\
> > &= 39{,}000 \\
> > \text{Proportional} &= \frac{280{,}000}{320{,}000} \times 60{,}000 \\
> > &= 52{,}500 \\
> > \text{Payment} &= 52{,}500 - 1{,}000 \\
> > &= 51{,}500
> > \end{align*}
> > $$
> > With at least \$320,000 of insurance, the insurer would have paid $60{,}000 - 1{,}000 = 59{,}000$. The ACV floor matters only for an insured far below the requirement, here one carrying less than \$208,000, because the proportional amount falls as the limit falls and the ACV does not.

> [!tip]- How it appears on the exam
> - **DISC-IA** asks candidates to determine replacement cost and actual cash value. A question gives the cost to replace a damaged item, its age and useful life or a depreciation amount, and asks for its ACV and for the payment on each valuation basis.
> - **Combined provisions:** A settlement question can add a deductible, a limit, a coinsurance clause or the homeowners 80% condition, each applied in the order the policy states.
> - **Definitions:** A question can ask which valuation a policy uses, or how ACV is measured under the market value approach or the broad evidence rule.

> [!warning]- Exam traps
> - **Replacement cost or market value:** Replacement cost is the cost to rebuild and excludes the land. A house's sale price includes the land and the location, so it measures something else and can be far above or below the cost to rebuild.
> - **Depreciation on the right base:** ACV deducts depreciation from today's replacement cost, not from the original purchase price. Depreciating the price paid 15 years ago understates the ACV whenever costs have risen.
> - **The 80% test:** The homeowners condition compares the limit with 80% of the full replacement cost of the whole dwelling, not with the cost of the damaged part.
> - **The holdback:** A replacement cost policy pays the difference over ACV only after the property is repaired or replaced. An answer that pays full replacement cost to an insured who has not rebuilt overstates the payment.
