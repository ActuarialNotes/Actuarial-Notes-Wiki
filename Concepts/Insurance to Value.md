---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b6e95e50c8c08bf4448a973867d060c074d3e47869030e182969a2c9eecd87bb
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

> $$R = \min\left(\frac{C}{p \times V},\ 1\right)$$

> $$\text{Payment} = \min\big(R \times L - D,\ C\big)$$

- **Symbols:** $C$ is the amount of insurance carried, $p$ is the coinsurance percentage (such as 80%, 90% or 100%), and $V$ is the property's value at the time of the loss, measured on the policy's valuation basis, either [[Replacement Cost|replacement cost]] or actual cash value. $L$ is the loss on the same basis, and $D$ is the deductible. In the standard commercial property form, the deductible is subtracted after the coinsurance ratio $R$ has been applied.
- **Value at the time of loss:** The requirement is tested against the value when the loss happens, not when the policy was bought. Rising construction costs can turn an adequate limit into an inadequate one during the policy year. That is why underwriters verify property values with appraisals and building cost estimates, and why insureds buy options such as an agreed value, which suspends the clause, or an inflation guard, which raises the limit through the year.
- **Rate adequacy:** Property rates are charged per \$100 of insurance, but expected losses depend on the property and hardly at all on the limit chosen. A book insured below value therefore collects too little premium at the filed rate. The coinsurance clause lets the insurer charge one rate per \$100 by making under-insurance cost the insured on every partial loss. The pricing of the clause itself is [[Coinsurance Rating|coinsurance rating]].
- **Other provisions:** The homeowners replacement cost condition pays full replacement cost only when the dwelling is insured for at least 80% of its replacement cost (see the second example on [[Replacement Cost]]). Business income coverage applies coinsurance to income rather than property: the limit is compared with the coinsurance percentage times the net income and operating expenses expected in the 12 months after the policy's inception or anniversary. The insured can instead choose an option that suspends coinsurance, such as a maximum period of indemnity, a monthly limit of indemnity or a business income agreed value.

> [!example]- A Coinsurance Penalty After Building Costs Rise {Example}
> A commercial building was worth \$1,000,000 when its policy was written, with a limit of \$800,000, an 80% coinsurance clause and a \$5,000 deductible. Construction costs rise, and by the date of a \$300,000 fire the building's replacement cost is \$1,150,000. What does the insurer pay?
>
> > [!answer]-
> > The insured met the requirement at inception, but the test uses the value at the time of loss.
> > $$
> > \begin{align*}
> > p \times V &= 0.80 \times 1{,}150{,}000 \\
> > &= 920{,}000 \\
> > R &= \frac{800{,}000}{920{,}000} \\
> > &= 0.86957 \\
> > \text{Payment} &= 0.86957(300{,}000) - 5{,}000 \\
> > &= 255{,}869.57
> > \end{align*}
> > $$
> > Without the penalty the insurer would pay \$295,000, so the insured bears \$39,130.43 more than the deductible. An agreed value option, or a limit reviewed against current building costs at renewal, would have avoided it.

> [!example]- Why the Clause Keeps One Rate Adequate {Example}
> Two warehouses are each worth \$2,000,000, and each has expected losses of \$7,000 a year, all from partial losses below \$1,000,000. The rate is \$0.40 per \$100 of insurance. Warehouse A is insured for \$2,000,000 and warehouse B for \$1,000,000. Find each loss ratio with no coinsurance clause, and B's loss ratio under an 80% clause.
>
> > [!answer]-
> > Warehouse A pays \$8,000 of premium and B pays \$4,000. With no clause, both recover their expected \$7,000 in full.
> > $$
> > \begin{align*}
> > \text{LR}_A &= \frac{7{,}000}{8{,}000} \\
> > &= 87.5\% \\
> > \text{LR}_B &= \frac{7{,}000}{4{,}000} \\
> > &= 175.0\%
> > \end{align*}
> > $$
> > Under an 80% clause, B recovers $1{,}000{,}000/1{,}600{,}000 = 62.5\%$ of each loss.
> > $$
> > \begin{align*}
> > \text{LR}_B &= \frac{0.625(7{,}000)}{4{,}000} \\
> > &= 109.4\%
> > \end{align*}
> > $$
> > An insured carrying exactly \$1,600,000 also has a loss ratio of $7{,}000/6{,}400 = 109.4\%$. Under the clause every insured at or below 80% of value produces the same loss ratio, so a rate set for 80% insurance to value is adequate for all of them. Without the clause, the rate would have to reflect the book's actual mix of insurance to value, and insureds who carry full value would subsidise the rest.

> [!tip]- How it appears on the exam
> - **DISC-IA** asks candidates to apply coinsurance and other insurance-to-value provisions. A question gives a property's value, the limit, the coinsurance percentage, the deductible and a loss, and asks for the amount the insurer pays.
> - **DISC-RM** treats insurance to value as an underwriting task. Questions ask how an underwriter verifies property values, and how insurance to value works for business income coverage, where the coinsurance basis is income rather than property value.
> - **Explaining the purpose:** A question can ask why the clause exists, which is answered by its effect on premium adequacy and equity between insureds who insure to different shares of value.

> [!warning]- Exam traps
> - **Value at inception:** The coinsurance requirement uses the value at the time of the loss. Testing it against the value when the policy was written misses a penalty that inflation has created.
> - **Deductible order:** Under the standard commercial form, the coinsurance ratio applies to the full loss and the deductible comes off afterwards. Subtracting the deductible first gives a slightly larger payment.
> - **Total losses:** The clause cannot raise the payment above the limit, and on a total loss the insurer pays the full limit whether or not the requirement is met. The penalty therefore matters only for partial losses.
> - **Coinsurance percentage, not share paid:** The property coinsurance clause is a condition on the limit carried. It is different from the percentage participation in health insurance, where the insured pays a share of every loss whatever limit is carried, and [[Coinsurance Rating]] treats the two forms separately.
