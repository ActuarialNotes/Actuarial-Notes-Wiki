---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ee09b99e81cf0535eba3798baa0c51a7c04c0656ba1c88f09ba9a54d763f3eff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Exposure.md
---

A **loss exposure** is any condition or situation that presents a possibility of loss, whether or not a loss actually occurs. The Institutes describe every loss exposure by three elements: the asset exposed to loss, the cause of loss, and the financial consequences of that loss. Identifying loss exposures and measuring how often and how badly they produce losses is where [[Risk Management|risk management]], [[Underwriting|underwriting]] and the design of every insurance policy begin.

> $$E[L] = f \times s$$

> $$E[L_{\text{total}}] = \sum_{k} f_k \, s_k$$

- **Symbols:** $f$ is the expected number of losses a year from one exposure, its [[Frequency|frequency]], and $s$ is the expected size of each loss, its [[Severity|severity]]. $E[L]$ is the [[Expected Loss|expected loss]] a year. The sum runs over the separate exposures $k$ an individual or organization faces, such as a building to fire, a fleet to auto liability claims, or a key employee to disability.
- **The three elements:** The asset is whatever has value and could be lost, including property, legal freedom from claims, people's services, and future income. The cause of loss, or peril, is what produces the loss, such as fire, theft, a lawsuit, or a death. The financial consequences are what the loss costs the party that owns the asset, and they depend on both the asset and the cause. A complete description of an exposure names all three, as in "the warehouse, to fire, costing the rebuilding cost and the income lost while it is rebuilt".
- **The four types:** A [[Property Loss Exposure|property loss exposure]] is the possibility of damage to, destruction of, or loss of use of property in which a party has a financial interest. A [[Liability Loss Exposure|liability loss exposure]] is the possibility of a claim alleging legal responsibility for injury or damage suffered by another party. A personnel loss exposure is the possibility of losing the services of key people through death, disability, retirement or resignation. A net income loss exposure is the possibility of lower revenue or higher expenses, and it usually follows from one of the other three.
- **Frequency and severity:** The two dimensions are measured separately because they call for different treatment. Frequent small losses are predictable enough to retain or budget for, while rare large losses are the ones to [[Risk Transfer|transfer]]. Severity is also judged by the worst case: The Institutes distinguish the maximum possible loss, the total value exposed at one location or in one event, from the probable maximum loss, the largest loss likely to occur. The [[Probable Maximum Loss]] page covers the catastrophe-modelling sense of the second term.
- **Hazards:** A hazard is a condition that increases the frequency or severity of losses from an exposure without being the cause itself. Physical hazards are tangible conditions such as stored flammables, [[Moral Hazard|moral hazard]] is dishonesty that leads an insured to cause or inflate a loss, and morale hazard is carelessness because a loss is insured.
- **Commercial property categories (GI-302):** A business's property exposures fall into its buildings, its business personal property such as inventory and equipment, and property of others in its care. The net income exposure that follows a property loss, the income lost and the extra expense of staying open while the property is repaired, is the fourth category. [[Commercial Property Insurance|Commercial property insurance]] answers these categories with the [[Building and Personal Property Coverage Form|building and personal property coverage form]] and [[Business Income Coverage|business income coverage]].
- **Commercial auto exposures (GI-302):** Owning, renting or using autos exposes a business to liability for bodily injury and property damage it causes to others, including [[Vicarious Liability|vicarious liability]] for employees driving their own cars on business. It also exposes the business to damage to its own vehicles, which is the [[Auto Physical Damage Coverage|physical damage]] exposure, and to injuries to its own drivers and passengers.
- **Where the concept leads:** [[Risk Identification|Risk identification]] finds the exposures, [[Risk Assessment|risk assessment]] measures their frequency and severity, and the treatment step chooses among [[Risk Control|risk control]] and risk financing techniques ([[Risk Mitigation]]).

> [!example]- Expected Annual Loss for a Distributor {Example}
> A distribution company estimates the following for the coming year, with illustrative figures:
>
> 1. A fire at its warehouse, with frequency 0.02 and severity \$1,500,000.
> 2. Product liability claims from goods it sells, with frequency 0.5 and severity \$40,000.
> 3. Disability of its founder, with frequency 0.01 and a cost to the company of \$300,000 in lost contracts and recruiting.
> 4. Lost profits and continuing expenses while the warehouse is rebuilt after a fire, with frequency 0.02 and severity \$600,000.
>
> Classify each exposure by type and find the expected annual loss.
>
> > [!answer]-
> > The fire is a property exposure, the product claims are a liability exposure, the founder's disability is a personnel exposure, and the lost profits are a net income exposure.
> > $$
> > \begin{align*}
> > E[L_{\text{total}}] &= 0.02(1{,}500{,}000) + 0.5(40{,}000) \\
> > &\quad + 0.01(300{,}000) + 0.02(600{,}000) \\
> > &= 30{,}000 + 20{,}000 + 3{,}000 + 12{,}000 \\
> > &= 65{,}000
> > \end{align*}
> > $$
> > The expected loss is \$65,000 a year. The net income loss is caused by the same fire as the property loss, so the two happen together. A fire would cost about \$2,100,000 in one year, which is why the company has to plan for the combined event rather than for each exposure on its own.

> [!example]- Same Expected Loss, Different Treatment {Example}
> A plumbing contractor runs 10 vans. Physical damage to the vans occurs with frequency 0.15 per van a year and severity \$4,000. Auto liability claims large enough to threaten the business occur with frequency 0.002 a year for the whole fleet and severity \$3,000,000. Both sets of figures are illustrative. Compare the two exposures.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[L_{\text{PD}}] &= 10 \times 0.15 \times 4{,}000 \\
> > &= 6{,}000 \\
> > E[L_{\text{liab}}] &= 0.002 \times 3{,}000{,}000 \\
> > &= 6{,}000
> > \end{align*}
> > $$
> > Both exposures cost \$6,000 a year on average. The contractor expects one or two physical damage losses every year and can absorb them, so retaining that exposure, or buying physical damage cover with a high deductible, is reasonable. The liability exposure produces a loss rarely, but one loss would exceed the business's resources, so it has to be transferred through liability insurance. Expected loss alone does not decide the treatment, because frequency and severity matter separately.

> [!tip]- How it appears on the exam
> - **GI-302:** Candidates describe commercial property insurance in terms of the categories of loss exposures, which are buildings, business personal property, property of others, and the business income and extra expense that follow a loss. Candidates also describe commercial auto insurance in terms of the liability, physical damage and injury exposures that auto ownership and use create.
> - **DISC-RM and DISC-IA:** The term runs through the personal and commercial exposure analysis sections, where a scenario names an individual or business and asks which property, liability, personnel or net income exposures it faces and what their financial consequences would be.
> - **Applied questions:** A question can give frequencies and severities for several exposures and ask which to retain and which to transfer, which turns on severity relative to the party's resources as much as on expected loss.

> [!warning]- Exam traps
> - **Exposure is not loss:** A loss exposure exists whether or not a loss ever occurs. A building that has never burned still presents a property loss exposure to fire.
> - **Cause versus hazard:** Fire is a cause of loss, and the oily rags stored beside the furnace are a hazard that makes a fire more likely. Answers that list hazards as causes of loss, or the reverse, lose the distinction the course tests.
> - **Missing the net income exposure:** A property loss usually brings lost income and extra expense with it. Describing a fire's financial consequences as the repair cost alone understates them.
> - **Personnel versus personal:** A personnel loss exposure is an organization's loss of a key person's services. The loss an individual or family suffers from their own death, illness or unemployment is a different exposure, called a personal loss exposure.
