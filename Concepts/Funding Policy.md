---
aliases:
  - Stakeholders' Interest
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:46a188c43a68c977d7efa7287125d3d8a3ff8f9bca8f51bef9dec93436005869
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Funding Policy.md
---
A **Funding Policy** is the written statement in which the sponsor or administrator of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] sets out how the plan will be [[Funding|funded]]: the objectives it pursues and the methods, margins, amortization rules and use of surplus that serve them. It works inside the band that legislation draws, and it weighs the interests of every stakeholder in the plan.

Under a funding policy that amortizes each layer of unfunded liability separately, the contribution for year $t$, $C_t$, is

> $$C_t = NC_t + \sum_j \frac{U_j}{\ddot{a}_{\overline{n_j}|}}$$

- $NC_t$ is the [[Normal Cost|normal cost]] under the chosen [[Actuarial Cost Method|actuarial cost method]].
- $U_j$ is a layer of unfunded liability, such as the initial deficit or a later experience loss.
- $n_j$ is the number of years over which layer $j$ is amortized, at the valuation rate, with payments annually in advance.

The policy chooses the cost method, the [[Margin for Adverse Deviations|margins]] in the assumptions or a target funded ratio above 100%, the [[Asset Valuation Method|asset smoothing]], the amortization periods for deficits, and when surplus may reduce contributions or fund benefit improvements. Shorter amortization and larger margins buy security at the price of higher, more volatile contributions.

> [!example]- How do the 10-year and 15-year funding policies compare? {Example}
> A going-concern valuation shows a normal cost of $\$3$ million and an unfunded liability of $\$12$ million at a valuation rate of 5%, with payments annually in advance. One funding policy amortizes deficits over 10 years and another over 15 years. The next valuation then adds a new $\$5$ million layer of loss.
>
> > [!answer]-
> > - The annuity-due factors at 5% are $\ddot{a}_{\overline{10}|} = 8.1078$ and $\ddot{a}_{\overline{15}|} = 10.8986$.
> > - Over 10 years, the contribution is $3{,}000{,}000 + 12{,}000{,}000/8.1078 = \$4{,}480{,}052$.
> > - Over 15 years, it is $3{,}000{,}000 + 12{,}000{,}000/10.8986 = \$4{,}101{,}055$.
> > - The new layer adds $5{,}000{,}000/8.1078 = \$616{,}688$ a year under the 10-year policy and $5{,}000{,}000/10.8986 = \$458{,}773$ under the 15-year policy.
> > - The shorter period restores security faster and costs less in total, $\$14.80$ million of payments on the first layer against $\$16.52$ million, but each loss moves the contribution about a third more.
> > - A sponsor that ranks contribution stability first, within the legislated maximum period, chooses 15 years.

## Objectives and stakeholders

Members want their benefits secure. The sponsor and its shareholders want contributions that are stable and affordable, and in a public plan the taxpayers bear what the employer pays. Fairness between generations asks that each cohort pay for the benefits it earns rather than leaving a deficit to its successors. These objectives conflict, and the policy records how the sponsor ranks them. Contributing the legislated minimum is a funding approach but not a funding policy, because it does not say which objectives the choices serve.

## The legislative band

The contribution a funding policy sets must lie in the band

> $$C_t^{\min} \le C_t \le C_t^{\max}$$

- $C_t^{\min}$ is the minimum the pension standards legislation requires.
- $C_t^{\max}$ is the most the tax rules let the sponsor contribute and deduct.

Minimum funding in Canada requires a going-concern valuation and, in most jurisdictions, a [[Solvency|solvency]] valuation, each deficit amortized over a legislated period. At the top, the Income Tax Act stops deductible contributions once the going-concern surplus passes a threshold. A policy that holds a large margin can run into that limit, and a funding target above the threshold cannot be reached with deductible contributions.

## Funding target and surplus

A policy that sets a target measures the plan by its funded ratio, which is

> $$FR_t = \frac{AVA_t}{AL_t}$$

- $AVA_t$ is the actuarial value of assets.
- $AL_t$ is the accrued liability.

A target above 100% is a margin for adverse experience, and the policy says whether surplus above the target may reduce contributions or fund benefit improvements.

> [!example]- What is this year's contribution under this plan's target funded ratio? {Example}
> A plan's funding policy sets a target of 110% of the going-concern accrued liability and lets surplus above the target reduce contributions, spread over 5 years at 5%, annually in advance. The accrued liability is $\$100$ million, the actuarial value of assets is $\$115$ million, and the normal cost is $\$3$ million.
>
> > [!answer]-
> > - Only the surplus above the target is available: $115{,}000{,}000 - 1.10 \times 100{,}000{,}000 = \$5{,}000{,}000$.
> > - Spread over 5 years, the credit is $5{,}000{,}000/\ddot{a}_{\overline{5}|} = 5{,}000{,}000/4.5460 = \$1{,}099{,}880$.
> > - The contribution is $3{,}000{,}000 - 1{,}099{,}880 = \$1{,}900{,}120$.
> > - The 10% cushion means a fall in assets of up to $\$10$ million would still leave the plan fully funded.
> > - Spreading the surplus over five years, rather than taking a full contribution holiday, keeps the contribution from swinging from $\$3$ million to nothing and back.

## Contents of a funding policy

The Canadian Association of Pension Supervisory Authorities sets out what a funding policy should cover in CAPSA Guideline No. 7, *Pension Plan Funding Policy Guideline*. Following it, a policy describes:

1. The plan and its sponsor.
2. The funding objectives.
3. The key risks: interest rates, investment returns, longevity and demographics.
4. The cost-sharing arrangements.
5. The funding target and margins.
6. The actuarial methods and assumptions.
7. The use of surplus and contribution holidays.
8. How often the plan is valued and the policy reviewed.

The policy is consistent with the plan's [[Investment Policy Statement|investment policy]], because the risk the assets take is the risk the funding has to absorb.

## Funding policy by plan type

A single-employer plan's sponsor can adjust contributions, so its policy mostly manages the size and timing of deficits. A [[Multi-Employer Plan|multi-employer plan]] has contributions fixed by collective agreements, so its policy decides how benefits change when the fixed contributions are not enough. In such a plan, or a [[Target Benefit Plan|target benefit plan]], the members bear the funding risk through benefit changes, and higher sponsor contributions are not the lever. A [[Public Sector Pension Plan|public sector plan]] commonly funds on entry age normal with layered fixed-period amortization of each year's gains and losses, aiming at a level cost as a share of payroll.

> [!trap] A longer amortization period is not more conservative
> A longer amortization period or more asset smoothing makes contributions more stable but leaves deficits outstanding longer. It trades security for stability, so calling it "more conservative" gets the trade-off backwards.
