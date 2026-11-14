---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:05025adf8b5feeb3a253b9f0943b6572d67143048e62eca40f1a118421361f5f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Exposure.md
---
A **Loss Exposure** is any condition or situation that presents a possibility of loss, whether or not a loss actually occurs. Identifying loss exposures and measuring how often and how badly they produce losses is where [[Risk Management|risk management]], [[Underwriting|underwriting]] and the design of every insurance policy begin.

The Institutes describe every loss exposure by three elements:

1. **The asset exposed to loss.** It is whatever has value and could be lost, including property, legal freedom from claims, people's services, and future income.
2. **The cause of loss, or peril.** It is what produces the loss, such as fire, theft, a lawsuit, or a death.
3. **The financial consequences.** They are what the loss costs the party that owns the asset, and they depend on both the asset and the cause.

A complete description of an exposure names all three, as in "the warehouse, to fire, costing the rebuilding cost and the income lost while it is rebuilt".

The [[Expected Loss|expected loss]] a year from one exposure is

> $$E[L] = f \times s$$

- $f$ is the expected number of losses a year from one exposure, its [[Frequency|frequency]].
- $s$ is the expected size of each loss, its [[Severity|severity]].

Over the separate exposures $k$ an individual or organization faces, such as a building to fire, a fleet to auto liability claims, or a key employee to disability, the expected loss is

> $$E[L_{\text{total}}] = \sum_{k} f_k \, s_k$$

> [!example]- What is this distributor's expected annual loss? {Example}
> A distribution company estimates the following for the coming year, with illustrative figures:
>
> | Exposure | Frequency | Severity ($) |
> | --- | ---: | ---: |
> | Fire at its warehouse | 0.02 | 1,500,000 |
> | Product liability claims from goods it sells | 0.5 | 40,000 |
> | Disability of its founder (lost contracts and recruiting) | 0.01 | 300,000 |
> | Lost profits and continuing expenses while the warehouse is rebuilt | 0.02 | 600,000 |
>
> > [!answer]-
> > - The fire is a property exposure, the product claims are a liability exposure, the founder's disability is a personnel exposure, and the lost profits are a net income exposure.
> > - The expected losses are $0.02(1{,}500{,}000) = 30{,}000$, $0.5(40{,}000) = 20{,}000$, $0.01(300{,}000) = 3{,}000$ and $0.02(600{,}000) = 12{,}000$.
> > - The expected loss is $\$65{,}000$ a year.
> > - The net income loss is caused by the same fire as the property loss, so the two happen together. A fire would cost about $\$2{,}100{,}000$ in one year, so the company has to plan for the combined event rather than for each exposure on its own.

## Types of loss exposure

- A **[[Property Loss Exposure|property loss exposure]]** is the possibility of damage to, destruction of, or loss of use of property in which a party has a financial interest.
- A **[[Liability Loss Exposure|liability loss exposure]]** is the possibility of a claim alleging legal responsibility for injury or damage suffered by another party.
- A **personnel loss exposure** is the possibility of an organization losing the services of key people through death, disability, retirement or resignation. The loss an individual or family suffers from their own death, illness or unemployment is a different exposure, called a personal loss exposure.
- A **net income loss exposure** is the possibility of lower revenue or higher expenses, and it usually follows from one of the other three.

## Frequency and severity

The two dimensions are measured separately because they call for different treatment. Frequent small losses are predictable enough to retain or budget for, while rare large losses are the ones to [[Risk Transfer|transfer]]. Severity is also judged by the worst case. The Institutes distinguish the maximum possible loss, the total value exposed at one location or in one event, from the probable maximum loss, the largest loss likely to occur. The [[Probable Maximum Loss]] page covers the catastrophe-modelling sense of the second term.

> [!example]- How should this contractor treat two exposures with the same expected loss? {Example}
> A plumbing contractor runs 10 vans. Physical damage to the vans occurs with frequency 0.15 per van a year and severity $\$4{,}000$. Auto liability claims large enough to threaten the business occur with frequency 0.002 a year for the whole fleet and severity $\$3{,}000{,}000$. Both sets of figures are illustrative.
>
> > [!answer]-
> > - The physical damage exposure costs $10 \times 0.15 \times 4{,}000 = \$6{,}000$ a year on average.
> > - The liability exposure costs $0.002 \times 3{,}000{,}000 = \$6{,}000$ a year on average.
> > - The contractor expects one or two physical damage losses every year and can absorb them, so retaining that exposure, or buying physical damage cover with a high deductible, is reasonable.
> > - The liability exposure rarely produces a loss, but one loss would exceed the business's resources, so it has to be transferred through liability insurance.

## Hazards

A hazard is a condition that increases the frequency or severity of losses from an exposure without being the cause itself. Physical hazards are tangible conditions such as stored flammables. [[Moral Hazard|Moral hazard]] is dishonesty that leads an insured to cause or inflate a loss, and morale hazard is carelessness because a loss is insured.

## Commercial property and auto exposures

A business's property exposures fall into its buildings, its business personal property such as inventory and equipment, and property of others in its care. The net income exposure that follows a property loss, the income lost and the extra expense of staying open while the property is repaired, is the fourth category. [[Commercial Property Insurance|Commercial property insurance]] answers these categories with the [[Building and Personal Property Coverage Form|building and personal property coverage form]] and [[Business Income Coverage|business income coverage]].

Owning, renting or using autos exposes a business to liability for bodily injury and property damage it causes to others, including [[Vicarious Liability|vicarious liability]] for employees driving their own cars on business. It also exposes the business to damage to its own vehicles, which is the [[Auto Physical Damage Coverage|physical damage]] exposure, and to injuries to its own drivers and passengers.

[[Risk Identification|Risk identification]] finds the exposures, [[Risk Assessment|risk assessment]] measures their frequency and severity, and the treatment step chooses among [[Risk Control|risk control]] and risk financing techniques ([[Risk Mitigation]]).

> [!trap] Listing a hazard as a cause of loss
> Fire is a cause of loss, and the oily rags stored beside the furnace are a hazard that makes a fire more likely. An answer that lists hazards as causes of loss, or the reverse, loses the distinction.
