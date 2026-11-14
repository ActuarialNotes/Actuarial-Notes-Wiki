---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:143f6df89c569d55d26af3128a81a889b24e345699c2352e57cdd64cec0dd933
  sources:
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form, F.1 coinsurance steps (1)-(4); G.1 Agreed Value; G.2 Inflation Guard, sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "ISO CP 00 30 10 12 Business Income (And Extra Expense) Coverage Form, F.1 coinsurance base; G optional coverages, sha256:4b77049e08827380f912161468b9aef9b182853f5a217f50993546366d101b98 — https://forms.nationwideexcessandsurplus.com/FormsExternal/ContractForm?num=CP+00+30&ed=10-12"
    - "ISO HO 00 03 05 11 Homeowners 3 – Special Form (Maine BOI copy), Section I Conditions, Loss Settlement 80%, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 'Coinsurance Clause', PDF pp.220-222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance to Value.md
---

**Insurance to Value** (ITV) means insuring property for its full value, or close to it, so that the amount of insurance, which is the base a property premium is charged on, reflects the exposure. Most property losses are partial, so an insured who carries a low limit would otherwise pay a smaller premium for nearly the same expected recovery. Property policies therefore contain insurance-to-value provisions, chief among them the coinsurance clause, which reduce the recovery of an insured who carries too little.

## The coinsurance clause

A coinsurance clause requires the insured to carry a limit of at least a stated share of the property's value. The coinsurance ratio is

> $$R = \min\left(\frac{C}{p \times V},\ 1\right)$$

- $C$ is the amount of insurance carried, $p$ is the coinsurance percentage (such as 80%, 90% or 100%), and $V$ is the property's value at the time of the loss, measured on the policy's valuation basis, either [[Replacement Cost|replacement cost]] or [[Actual Cash Value|actual cash value]].
- $p \times V$ is the amount of insurance required.

The insurer's payment on a loss is

> $$\text{Payment} = \min\big(R \times L - D,\ C\big)$$

- $L$ is the loss, on the same valuation basis as $V$.
- $D$ is the [[Deductible|deductible]].

In the standard commercial property form, the deductible is subtracted after the coinsurance ratio $R$ has been applied. If $R \times L$ is no more than the deductible, the insurer pays nothing.

The requirement is tested against the value when the loss happens, not when the policy was bought. Rising construction costs can turn an adequate limit into an inadequate one during the policy year.

The coinsurance penalty is the payment the insured would have received without the clause, less the payment made. The clause cannot raise the payment above the limit, and on a total loss the insurer pays the full limit whether or not the requirement is met. The penalty therefore matters only for partial losses.

> [!example]- What does the insurer pay on this fire loss? {Example}
> A commercial building was worth \$1,000,000 when its policy was written, with a limit of \$800,000, an 80% coinsurance clause and a \$5,000 deductible. Construction costs rise, and by the date of a \$300,000 fire the building's replacement cost is \$1,150,000.
>
> > [!answer]-
> > - The insured met the requirement at inception, but the test uses the value at the time of loss.
> > - The amount required is $0.80 \times 1{,}150{,}000 = 920{,}000$.
> > - The coinsurance ratio is $R = 800{,}000 / 920{,}000 = 0.86957$.
> > - The ratio applies to the full loss, then the deductible comes off: $0.86957 \times 300{,}000 - 5{,}000 = 255{,}869.57$.
> > - Without the penalty the insurer would pay \$295,000, so the insured bears \$39,130.43 more than the deductible.
> > - The insurer pays **\$255,869.57**. An agreed value option, or a limit reviewed against current building costs at renewal, would have avoided the penalty.

## Coinsurance and rate adequacy

Property rates are charged per \$100 of insurance, but expected losses depend on the property and hardly at all on the limit chosen. A book insured below value therefore collects too little premium at the filed rate. The coinsurance clause lets the insurer charge one rate per \$100 by making under-insurance cost the insured on every partial loss. The pricing of the clause itself is [[Coinsurance Rating|coinsurance rating]].

> [!example]- How does an 80% coinsurance clause change warehouse B's loss ratio? {Example}
> Two warehouses are each worth \$2,000,000, and each has expected losses of \$7,000 a year, all from partial losses below \$1,000,000. The rate is \$0.40 per \$100 of insurance. Warehouse A is insured for \$2,000,000 and warehouse B for \$1,000,000.
>
> > [!answer]-
> > - Warehouse A pays \$8,000 of premium and B pays \$4,000.
> > - With no clause, both recover their expected \$7,000 in full, so A's loss ratio is $7{,}000/8{,}000 = 87.5\%$ and B's is $7{,}000/4{,}000 = 175.0\%$.
> > - Under an 80% clause, B recovers $1{,}000{,}000/1{,}600{,}000 = 62.5\%$ of each loss, so its loss ratio is $0.625 \times 7{,}000/4{,}000 = 109.4\%$.
> > - An insured carrying exactly \$1,600,000 also has a loss ratio of $7{,}000/6{,}400 = 109.4\%$.
> > - Under the clause every insured at or below 80% of value produces the same loss ratio, so a rate set for 80% insurance to value is adequate for all of them.
> > - Without the clause, the rate would have to reflect the book's actual mix of insurance to value, and insureds who carry full value would subsidise the rest.

## Verifying and maintaining values

Because the test uses the value at the time of loss, underwriters verify property values with appraisals and building cost estimates. Insureds can buy options that keep them clear of a penalty:

- An **agreed value** option suspends the coinsurance clause.
- An **inflation guard** raises the limit through the year.

The homeowners replacement cost condition pays full replacement cost only when the dwelling is insured for at least 80% of its replacement cost.

## Business income coverage

[[Business Income Coverage|Business income coverage]] applies coinsurance to income rather than property. The limit is compared with the coinsurance percentage times the net income and operating expenses expected in the 12 months after the policy's inception or anniversary. The insured can instead choose an option that suspends coinsurance, such as a maximum period of indemnity, a monthly limit of indemnity or a business income agreed value.

> [!trap] Subtracting the deductible before applying the ratio
> Under the standard commercial form, the coinsurance ratio applies to the full loss and the deductible comes off afterwards. Subtracting the deductible first gives a slightly larger payment: in the fire example, $0.86957 \times 295{,}000 = 256{,}521.74$ instead of $255{,}869.57$.
