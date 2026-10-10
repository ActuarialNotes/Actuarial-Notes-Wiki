---
aliases:
  - Stakeholders' Interest
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eb5387bf3b9025ba4dc55cc6d42d85e11a819a17c72bfb760ba9f8bdd44081c8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Funding Policy.md
---
A **Funding Policy** is the written statement in which the sponsor or administrator of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] sets out how the plan will be [[Funding|funded]]: the objectives it pursues, such as benefit security, contribution stability and fairness between generations of members, and the methods, margins, amortization rules and use of surplus that serve them. It works inside the band that legislation draws, between the regulatory minimum contribution and the maximum the tax rules allow, and it weighs the interests of every stakeholder in the plan. The Canadian Association of Pension Supervisory Authorities sets out what such a policy should cover in CAPSA Guideline No. 7, *Pension Plan Funding Policy Guideline*.

> $$C_t = NC_t + \sum_j \frac{U_j}{\ddot{a}_{\overline{n_j}|}}$$

> $$C_t^{\min} \le C_t \le C_t^{\max}$$

> $$FR_t = \frac{AVA_t}{AL_t}$$

- **Symbols:** $C_t$ is the contribution for year $t$ and $NC_t$ the [[Normal Cost|normal cost]] under the chosen [[Actuarial Cost Method|actuarial cost method]]. $U_j$ is a layer of unfunded liability, such as the initial deficit or a later experience loss, amortized over $n_j$ years at the valuation rate (annually in advance here). $C_t^{\min}$ is the minimum the pension standards legislation requires, $C_t^{\max}$ the most the tax rules let the sponsor contribute and deduct, and $FR_t$ the funded ratio of the actuarial value of assets to the accrued liability.
- **Objectives and stakeholders:** Members want their benefits secure, the sponsor and its shareholders want contributions that are stable and affordable, and in a public plan the taxpayers bear what the employer pays. Fairness between generations asks that each cohort pay for the benefits it earns rather than leaving a deficit to its successors. These objectives conflict, and the policy records how the sponsor ranks them.
- **The levers:** A policy chooses the cost method, the [[Margin for Adverse Deviations|margins]] in the assumptions or a target funded ratio above 100%, the [[Asset Valuation Method|asset smoothing]], the amortization periods for deficits, and when surplus may reduce contributions or fund benefit improvements. Shorter amortization and larger margins buy security at the price of higher, more volatile contributions.
- **Canadian content:** Following CAPSA Guideline No. 7, a policy describes the plan and its sponsor, the funding objectives, the key risks (interest rates, investment returns, longevity, demographics), the cost-sharing arrangements, the funding target and margins, the actuarial methods and assumptions, the use of surplus and contribution holidays, and how often the plan is valued and the policy reviewed. It is consistent with the plan's [[Investment Policy Statement|investment policy]], because the risk the assets take is the risk the funding has to absorb.
- **Plan types:** A single-employer plan's sponsor can adjust contributions, so its policy mostly manages the size and timing of deficits. A [[Multi-Employer Plan|multi-employer plan]] has contributions fixed by collective agreements, so its policy decides how benefits change when the fixed contributions are not enough. A [[Public Sector Pension Plan|public sector plan]] commonly funds on entry age normal with layered fixed-period amortization of each year's gains and losses, aiming at a level cost as a share of payroll.
- **The legislative band:** Minimum funding in Canada requires a going-concern valuation and, in most jurisdictions, a [[Solvency|solvency]] valuation, each deficit amortized over a legislated period. At the top, the Income Tax Act stops deductible contributions once the going-concern surplus passes a threshold, so a policy cannot build an unlimited cushion.

> [!example]- Amortizing a Deficit Over 10 or 15 Years {Example}
> A going-concern valuation shows a normal cost of \$3 million and an unfunded liability of \$12 million at a valuation rate of 5%. Payments are made annually in advance. Find the contribution under a policy that amortizes deficits over 10 years and under one that uses 15 years. Then suppose the next valuation adds a new \$5 million layer of loss and find the increase in contributions under each policy.
>
> > [!answer]-
> > Each amortization payment is the deficit divided by an annuity-due factor at 5%.
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{10}|} &= 8.1078 \\
> > \ddot{a}_{\overline{15}|} &= 10.8986 \\
> > C^{(10)} &= 3{,}000{,}000 + 12{,}000{,}000 / 8.1078 \\
> > &= 4{,}480{,}052 \\
> > C^{(15)} &= 3{,}000{,}000 + 12{,}000{,}000 / 10.8986 \\
> > &= 4{,}101{,}055
> > \end{align*}
> > $$
> > The new \$5 million layer adds $5{,}000{,}000/8.1078 = 616{,}688$ a year under the 10-year policy and $5{,}000{,}000/10.8986 = 458{,}773$ under the 15-year policy. The shorter period restores security faster and costs less in total, \$14.80 million of payments against \$16.52 million on the first layer, but each loss moves the contribution about a third more. A sponsor that ranks contribution stability first, within the legislated maximum period, chooses the longer one.

> [!example]- Using Surplus Under a Target Funded Ratio {Example}
> A plan's funding policy sets a target of 110% of the going-concern accrued liability and lets surplus above the target reduce contributions, spread over 5 years at 5%, annually in advance. The accrued liability is \$100 million, the actuarial value of assets is \$115 million, and the normal cost is \$3 million. Find this year's contribution.
>
> > [!answer]-
> > Only the surplus above the target is available.
> > $$
> > \begin{align*}
> > \text{Excess} &= 115{,}000{,}000 - 1.10(100{,}000{,}000) \\
> > &= 5{,}000{,}000 \\
> > \text{Credit} &= 5{,}000{,}000 / \ddot{a}_{\overline{5}|} \\
> > &= 5{,}000{,}000 / 4.5460 \\
> > &= 1{,}099{,}880 \\
> > C &= 3{,}000{,}000 - 1{,}099{,}880 \\
> > &= 1{,}900{,}120
> > \end{align*}
> > $$
> > The 10% cushion is the policy's margin for adverse experience: a fall in assets of up to \$10 million would still leave the plan fully funded. Spreading the surplus over five years, rather than taking a full contribution holiday, keeps the contribution from swinging from \$3 million to nothing and back.

> [!tip]- How it appears on the exam
> - **RET-201 Funding:** Case questions describe a sponsor, its plan type, its regulatory environment, its asset mix and its goals, and ask the candidate to recommend and defend a funding policy, naming the objectives it serves and the stakeholders who bear its risks.
> - **Calculations:** Short calculations compare contributions under different amortization periods, margins or surplus rules, and ask what each does to stability and security.
> - **Plan types:** Questions often contrast a single-employer plan with a multi-employer or public plan, where the contribution is fixed or politically set and the policy's lever is the benefit.

> [!warning]- Exam traps
> - **Minimum is not a policy:** Contributing the legislated minimum is a funding approach but not a funding policy. A recommendation has to say which objectives the choices serve and why.
> - **Stability versus security:** A longer amortization period or more asset smoothing makes contributions more stable but leaves deficits outstanding longer. Calling a longer period "more conservative" gets the trade-off backwards.
> - **The tax ceiling:** A policy that holds a large margin can run into the tax limit on deductible contributions. A recommended funding target above that threshold cannot be reached with deductible contributions.
> - **Fixed contributions shift the risk:** In a multi-employer or [[Target Benefit Plan|target benefit plan]] the members bear the funding risk through benefit changes. Recommending higher sponsor contributions misreads how such a plan is governed.
