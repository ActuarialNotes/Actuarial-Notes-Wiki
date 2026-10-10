---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0071a115b64bf27623e23b1007e381376e28cf3d407f6226c2cdc1ba58a76b45
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Control.md
---

**Risk control** is the set of techniques that reduce the frequency or severity of losses, or make them more predictable, as distinct from risk financing, which pays for the losses that still occur. The techniques are avoidance, loss prevention, loss reduction, separation, duplication and diversification. Insurers also use the term for their risk control function, whose representatives survey accounts for [[Underwriting|underwriting]] and advise policyholders on preventing losses, in cooperation with the insurer's other [[Insurance Operations|functions]].

> $$\Delta E[L] = f_0\,s_0 - f_1\,s_1$$

> $$\text{NPV} = \sum_{t=1}^{n} \frac{B_t}{(1+i)^t} - C_0$$

- **Symbols:** $f_0$ and $s_0$ are the [[Frequency|frequency]] and [[Severity|severity]] of losses before a measure, and $f_1$ and $s_1$ are their values after it, so $\Delta E[L]$ is the reduction in [[Expected Loss|expected loss]] a year. In the cost-benefit test, $C_0$ is the cost of putting the measure in place, $B_t$ is its net benefit in year $t$, which is the reduction in expected loss plus any premium savings less running costs, $i$ is the discount rate and $n$ is the measure's useful life. A measure passes the test when its [[Net Present Value|net present value]] is positive.
- **Avoidance:** Avoidance eliminates an exposure by never undertaking the activity or by abandoning it, so the probability of loss from it becomes zero. It is often impractical, because the activity usually earns the income the organization exists for, and abandoning one activity can create another exposure.
- **Loss prevention and loss reduction:** Loss prevention lowers frequency, as machine guarding, driver training and fire-resistive storage do. Loss reduction lowers severity once a loss has begun, as sprinklers, fire walls, seat belts and early return-to-work programs do. Some measures do both, and the label follows the measure's main effect.
- **Separation, duplication and diversification:** Separation divides an exposure among several locations or units, such as two warehouses instead of one, so a single event damages less. Duplication keeps a spare or backup that is used only when the original is lost, such as off-site copies of records. Diversification spreads activity across products, customers or regions whose losses are not perfectly correlated. All three make losses more predictable, and separation and duplication can raise frequency or cost while they cut the worst case.
- **The cost-benefit test:** A measure is worth adopting when the present value of what it saves exceeds what it costs. The savings include indirect ones, such as less downtime, better employee morale and protection of reputation, and some measures are required by law or by a lender whatever their return. An insured organization captures much of the saving through lower premiums and fewer uninsured costs rather than through lower insured losses.
- **Insurer risk control goals:** An insurer's risk control function supports its overall goals. It helps the insurer earn a profit by improving the accounts it writes and keeping good ones, it meets customer needs with advice they value, it fulfills a duty to society by reducing injuries and damage, and it meets legal requirements, such as inspections that some jurisdictions require for boilers and pressure vessels.
- **Insurer risk control services:** Risk control representatives conduct physical surveys of an account's premises and operations, report what they find to underwriters, and make recommendations to the policyholder. Larger accounts may receive consulting, such as help designing a safety program, training, or analysis of loss data. The service level depends on the size of the account and the line of business, and some insurers sell risk control services for a fee to organizations they do not insure.
- **Cooperation with other functions:** Risk control helps marketing and producers attract and keep accounts, and it gives underwriters the information they need to accept, modify or decline one. It shares what it learns about operations with [[Premium Audit|premium auditing]], and claims data shows it where losses occur, while its findings can help [[Claims Handling|claims]] investigate them.
- **Place in risk management:** Risk control is one half of risk treatment, with risk financing through retention and [[Risk Transfer|transfer]] the other ([[Risk Mitigation]]). It works on the exposures found by [[Risk Identification|risk identification]] and ranked by [[Risk Assessment|risk assessment]], and it rarely removes the need for financing, because what it leaves behind still has to be paid for.

> [!example]- Should the Warehouse Install Sprinklers? {Example}
> A company retains its own fire losses. With illustrative figures, a fire at its warehouse has frequency 0.02 a year and would cost \$2,000,000. Sprinklers would cost \$250,000 to install, last 20 years and cost \$3,000 a year to maintain, and they would limit a fire's cost to \$400,000 without changing how often fires start. At a 6% discount rate, do the sprinklers pass the cost-benefit test?
>
> > [!answer]-
> > Sprinklers are loss reduction, so only severity changes.
> > $$
> > \begin{align*}
> > \Delta E[L] &= 0.02(2{,}000{,}000) - 0.02(400{,}000) \\
> > &= 32{,}000 \\
> > B_t &= 32{,}000 - 3{,}000 \\
> > &= 29{,}000 \\
> > a_{\overline{20}|0.06} &= 11.4699 \\
> > \text{NPV} &= 29{,}000(11.4699) - 250{,}000 \\
> > &= 82{,}628
> > \end{align*}
> > $$
> > The net present value is positive, so the sprinklers pass. They would break even if they cut a fire's cost by about \$1,240,000, since that saves the \$24,796 a year needed to cover maintenance and repay the installation over 20 years. If the company were insured, the premium credit for sprinklers would replace part of $\Delta E[L]$ as its benefit.

> [!example]- Classifying a Trucking Company's Measures {Example}
> A trucking company is considering six measures:
>
> 1. Stop hauling hazardous materials.
> 2. Install fatigue-monitoring systems in its cabs.
> 3. Fit fire suppression systems in its maintenance garage.
> 4. Park its fleet at two depots instead of one.
> 5. Keep a copy of its dispatch system at a second site.
> 6. Add a warehousing business so that less of its income depends on freight rates.
>
> Classify each measure as a risk control technique.
>
> > [!answer]-
> > Stopping hazardous materials hauling is avoidance, because the exposure ends with the activity. Fatigue monitoring is loss prevention, because it reduces how often accidents happen. Fire suppression is loss reduction, because it limits a fire that has already started. Two depots is separation, since one hail storm or fire can no longer damage the whole fleet. The second copy of the dispatch system is duplication, since it is used only when the original fails. The warehousing business is diversification, which reduces the company's dependence on one source of income.
> >
> > Each measure is then tested on cost and benefit. Avoidance gives up the hazardous materials revenue, and the second depot adds rent and travel, so neither is right merely because it lowers risk.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The risk control and premium auditing section asks candidates to describe the insurer's risk control goals, the services risk control provides, and how risk control cooperates with marketing, underwriting, premium auditing and claims. Scenario questions describe an account and ask which services or recommendations fit it, and how the information should flow to the other functions. The risk treatment sections ask candidates to classify measures by technique and to apply the cost-benefit test.

> [!warning]- Exam traps
> - **Prevention versus reduction:** Loss prevention acts before a loss and lowers frequency, and loss reduction acts during or after one and lowers severity. Sprinklers do not stop fires starting, so they are loss reduction.
> - **Separation versus duplication:** Separation puts units that are all in daily use in different places, and duplication keeps a backup that sits idle until it is needed. A second working depot is separation and a standby generator is duplication.
> - **Avoidance has a cost:** Avoiding an activity gives up its income and can create new exposures in whatever replaces it. Recommending avoidance for every severe exposure ignores the cost side of the test.
> - **Risk control is not financing:** Risk control changes losses and risk financing pays for them. A deductible or a reinsurance treaty changes who pays, not how often or how badly losses occur.
