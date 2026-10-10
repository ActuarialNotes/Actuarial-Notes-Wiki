---
aliases:
  - Shared Risk Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:38990ba65fcfc36ee9ff41e6406869185420b28ec4874d5545d6738f9b1b0f1a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Target Benefit Plan.md
---
A **Target Benefit Plan** (TBP) is a [[Retirement Plan|retirement plan]] in which contributions are fixed, or may move only within a narrow band, while the benefit formula sets a *target* pension that can be raised or cut, for accrued as well as future service, according to the plan's funded status. Funding risk therefore falls on the members as a group rather than on a [[Plan Sponsor|sponsor]] that pays whatever the benefits cost. A written [[Funding Policy|funding policy]] fixes in advance which actions are taken, and in what order, when the plan is in surplus or deficit. New Brunswick's **shared risk plan** is the best-known regulated form.

> $$C_t = c\,S_t$$

> $$c_{\min} \le c \le c_{\max}$$

> $$FR_t = \frac{A_t}{L_t}$$

> $$I_t = \min\left(\text{CPI}_t,\ \max\left(0,\ \frac{A_t}{FR^{*}\,L_t} - 1\right)\right)$$

> $$k_t = 1 - \frac{A_t + PV_t^{\Delta C}}{L_t}$$

- **Symbols:** $C_t$ is the total contribution for year $t$, set as a rate $c$ times the covered payroll $S_t$ and held inside the band $[c_{\min}, c_{\max}]$. $A_t$ is the fund and $L_t$ the liability for the target benefits accrued to date, so $FR_t$ is the funded ratio. $I_t$ is the indexation granted under an illustrative policy that pays inflation only while the funded ratio after the increase stays at or above a threshold $FR^{*}$. $k_t$ is the uniform cut to accrued benefits that restores full funding once the present value of any contribution increase, $PV_t^{\Delta C}$, has been counted.
- **Between DB and DC:** Like a [[Defined Benefit Plan|DB plan]], a TBP pools assets, pays a lifetime pension from a formula and pools longevity risk among the members. Like a [[Defined Contribution Plan|DC plan]], it caps the employer's cost, so investment, interest-rate and longevity shocks end up in the benefits. Unlike a DC plan, those shocks are shared across all members, active and retired, and smoothed through the funding policy rather than landing on one account.
- **Base and ancillary benefits:** Most designs split the target into a base pension, which the policy aims to protect, and ancillary benefits, such as indexation or early retirement subsidies, which are granted only when funding allows. Adjustments run down a ladder: ancillary benefits are withheld first, contributions rise within the band next, and accrued base benefits are cut only as a last resort. Restoring past cuts comes before granting new ancillary benefits on the way back up.
- **Shared risk plans:** New Brunswick's 2012 framework requires the funding policy to pass a stochastic risk management test, under which base benefits should have at least a 97.5% probability of not being reduced over 20 years. The plan must also carry a deficit recovery plan and a surplus utilization plan that act automatically on the open group funded ratio. Several other provinces have since adopted target benefit rules of their own.
- **CIA Task Force:** The Canadian Institute of Actuaries' 2015 *Report of the Task Force on Target Benefit Plans* sets out how such plans should be designed and run. Its recommendations include a board that answers to all members, a funding policy with explicit margins and a benefit adjustment policy, a clear statement to members that benefits can fall, and fairness between generations when deficits and surpluses are shared.
- **Relatives:** Collective DC plans, as in the Netherlands and the U.K., and the *defined ambition* designs in the RET-101 readings follow the same logic of a fixed contribution and a flexible, pooled pension. The [[Multi-Employer Plan|multi-employer plan]], whose negotiated contributions fix what the trustees can promise, is the older North American form of the same idea.
- **Who bears which risk:** The employer bears little beyond its share of a contribution increase within the band. Members bear investment and longevity risk collectively, and the timing of the adjustments decides which cohort pays. Cutting accrued benefits spreads a loss across retirees and actives, while relying only on future accruals and contributions loads it onto younger members.

> [!example]- A Funded-Ratio Trigger After an Asset Shock {Example}
> A target benefit plan's illustrative funding policy has three steps. Inflation indexation is granted only to the extent the funded ratio after it stays at or above 105%. Below 100%, the contribution rate rises by 1% of pay for 15 years. If the plan is still below 100% after that increase, accrued benefits are cut uniformly to restore full funding.
>
> 1. At one valuation the fund is \$1,080 million, the liability is \$1,000 million and inflation was 2%.
> 2. A year later, after a market fall, the fund is \$900 million and the liability, before any indexation, is \$1,040 million. Payroll is \$300 million and is expected to grow 3% a year, and the valuation rate is 5%.
>
> Find the indexation at the first valuation and the action taken at the second.
>
> > [!answer]-
> > At the first valuation, the plan can afford up to 2.86% of indexation before it falls below 105%, so the full 2% is granted.
> > $$
> > \begin{align*}
> > \frac{A}{1.05\,L} - 1 &= \frac{1{,}080}{1{,}050} - 1 \\
> > &= 2.86\% \\
> > FR &= \frac{1{,}080}{1{,}000 \times 1.02} \\
> > &= 105.9\%
> > \end{align*}
> > $$
> > At the second valuation the funded ratio is $900 / 1{,}040 = 86.5\%$, so there is no indexation. The contribution increase is a growing annuity-due of 1% of payroll, valued with $q = 1.03/1.05$.
> > $$
> > \begin{align*}
> > PV^{\Delta C} &= 0.01 \times 300 \times \frac{1 - q^{15}}{1 - q} \\
> > &= 3 \times 13.156 \\
> > &= 39.47 \\
> > k &= 1 - \frac{900 + 39.47}{1{,}040} \\
> > &= 9.67\%
> > \end{align*}
> > $$
> > The contribution increase lifts the funded ratio only to 90.3%, so every member's accrued pension, retirees' included, is cut by 9.67%, and the liability falls to \$939.5 million. In a DB plan the same \$140 million deficit would be the sponsor's, funded by special payments of about \$12.8 million a year over 15 years at 5%. If markets recover, the policy's first use of surplus is to restore the 9.67% cut, and indexation resumes only after that.

> [!tip]- How it appears on the exam
> - **RET-101 (1a):** Candidates describe the structure of a target benefit or shared risk plan and contrast it with traditional DB and DC plans and with the hybrids, naming where each risk sits.
> - **RET-101 (2d, 3):** Written questions ask how the design manages participant risk, and which sponsor risks remain, such as a contribution band that may have to rise or a legal challenge to a benefit cut.
> - **RET-101 (4):** A design recommendation may call for a TBP when an employer wants a lifetime pension with a fixed cost. The answer is expected to weigh the governance burden and the intergenerational trade-offs, citing the CIA Task Force report and the SOA's analysis of design options.
> - **Calculations:** Short calculations apply a stated funding policy: the indexation it allows, the contribution increase within the band, or the benefit cut that restores a target funded ratio.

> [!warning]- Exam traps
> - **Fixed contribution does not mean DC:** A TBP pays a pooled lifetime pension from a formula. Describing it as an individual-account plan misses the pooling of longevity and investment risk that defines it.
> - **The order of actions:** A funding policy cuts ancillary benefits and raises contributions before it touches accrued base benefits. Cutting base benefits first, or granting indexation before restoring past cuts, reverses the ladder.
> - **Count the contribution increase:** The benefit cut is what remains after the present value of the contribution increase is added to the assets. Dividing the assets alone by the liability overstates the cut.
> - **Intergenerational effects:** A deficit funded only from future contributions or future accruals falls on younger members, and a cut to accrued benefits reaches retirees too. A question about fairness wants that distinction stated, not just the size of the cut.
> - **Not a guarantee:** The target is not a promise. Candidates who call a TBP's benefit "guaranteed" or treat a deficit as the employer's debt have described a DB plan.
