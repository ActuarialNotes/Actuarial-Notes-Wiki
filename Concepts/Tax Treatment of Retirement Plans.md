---
aliases:
  - Tax Incentive
  - Taxpayers' Perspective
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2e5e5b2e71e7def83c1cb72e36ee84aec07fd2b8105799b4018f796684ea28b3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tax Treatment of Retirement Plans.md
---
The **Tax Treatment of Retirement Plans** is the set of rules under which governments favour saving for retirement through a registered or qualified [[Retirement Plan|retirement plan]]. In exchange for the incentive, the law limits how much can be contributed or promised and who must be covered.

A treatment is named by three letters, for contributions, investment income and withdrawals in turn, each E for exempt or T for taxed:

| Treatment | Contributions | Investment income | Withdrawals | Example |
| :--- | :--- | :--- | :--- | :--- |
| EET | Deductible | Not taxed in the plan | Taxed | Registered or qualified plan |
| TEE | Taxed | Not taxed | Not taxed | TFSA in Canada, Roth account in the United States |
| TTE | Taxed | Taxed | Not taxed | Ordinary saving |

The revenue the government gives up, the tax expenditure, is measured against a comprehensive income tax, roughly TTE. It is the cost of the plan from the taxpayers' perspective.

## After-tax wealth at retirement

A saver sets aside pre-tax income $C$ at the start of each year for $n$ years at an investment return $i$. With a marginal tax rate $t_w$ while working and $t_r$ on retirement income, the after-tax wealth at retirement under EET is

> $$W^{\text{EET}} = C\,\ddot{s}_{\overline{n}|i}\,(1 - t_r)$$

Under TEE it is

> $$W^{\text{TEE}} = C\,(1 - t_w)\,\ddot{s}_{\overline{n}|i}$$

Under TTE the investment income is taxed, so the fund grows at the after-tax return and the wealth is

> $$W^{\text{TTE}} = C\,(1 - t_w)\,\ddot{s}_{\overline{n}|i(1-t_w)}$$

When $t_r = t_w$, EET and TEE give the same wealth, so the gain over TTE comes from the untaxed investment income. EET wins over TEE only when the retirement rate is lower, and TEE wins when it is higher, for example when retirement income is clawed back from income-tested benefits.

> [!example]- What is this worker's after-tax wealth at retirement under EET, TEE and TTE? {Example}
> A worker sets aside $\$10{,}000$ of pre-tax income at the start of each year for 30 years, and the investments earn 6% a year. The worker's marginal tax rate is 30% while working and 30% in retirement. Ignore the timing of withdrawals.
>
> > [!answer]-
> > - At 6%, $\ddot{s}_{\overline{30}|} = 83.8017$.
> > - Under EET, $W = 10{,}000 \times 83.8017 \times 0.70 = \$586{,}612$.
> > - Under TEE, the worker invests $\$7{,}000$ a year, and $W = 7{,}000 \times 83.8017 = \$586{,}612$.
> > - Under TTE, the $\$7{,}000$ earns $6\% \times 0.70 = 4.2\%$, where $\ddot{s}_{\overline{30}|4.2\%} = 60.4318$, so $W = 7{,}000 \times 60.4318 = \$423{,}022$.
> > - EET and TEE both leave the worker $\$163{,}589$ better off than TTE. That is the value of the untaxed investment income and the cost of the incentive to taxpayers.
> > - If the retirement rate were 20%, EET would give $10{,}000 \times 83.8017 \times 0.80 = \$670{,}413$, another $\$83{,}802$ from deferring tax to a lower bracket.

> [!trap] Taxing the investment income in TTE
> TTE accumulates at the after-tax return $i(1 - t_w)$. Accumulating the after-tax contribution at the full return $i$ gives TEE, not TTE.

## Why governments offer the incentive

Retirement saving reduces later reliance on [[Social Insurance|social insurance]] and means-tested benefits. The incentive also lets an employer offer a [[Pension Plan|pension]] that is worth more than the same pay in cash. It is therefore paired with rules that keep it aimed at retirement income for a broad workforce.

## Contribution and benefit limits

In Canada, the Income Tax Act caps a registered [[Defined Benefit Plan|DB]] pension at a dollar amount per year of service and an accrual rate of 2% of pay. It caps [[Defined Contribution Plan|DC]] contributions at the money purchase limit, and it reduces [[Registered Retirement Savings Plan|RRSP]] room by the pension adjustment so members of every kind of plan get about the same shelter. In the United States, Internal Revenue Code section 415 limits DB benefits and DC annual additions, and section 401(a)(17) caps the pay a plan may count.

The Canadian DB limit is a dollar amount per year of service, not a total. The registered pension is the lesser of the plan formula and the limit, each times service.

> [!example]- What pension may this registered plan pay the executive, and what part needs a supplementary plan? {Example}
> A registered DB plan pays 2% of final average earnings per year of service. An executive retires with 25 years of service and final average earnings of $\$300{,}000$. Use an illustrative Income Tax Act defined benefit limit of $\$3{,}600$ a year per year of service.
>
> > [!answer]-
> > - The plan formula gives $0.02 \times 300{,}000 \times 25 = \$150{,}000$ a year.
> > - The limit gives $3{,}600 \times 25 = \$90{,}000$ a year, so the registered plan pays $\$90{,}000$.
> > - The other $150{,}000 - 90{,}000 = \$60{,}000$ must come from an unregistered arrangement with no tax shelter.
> > - The limit binds for every member earning more than $3{,}600 / 0.02 = \$180{,}000$.

## Coverage and nondiscrimination

U.S. qualified plans must pass coverage tests and must not discriminate in favour of highly compensated employees in contributions or benefits. Canadian registration rules instead restrict benefits for connected persons and designated plans. These rules stop the incentive from being used mainly by owners and executives.

## Pay above the limits

Benefits above the tax limits are paid from an unregistered [[Executive Retirement Plan|supplementary plan]], which gets no EET treatment. The employer's deduction is deferred until benefits are paid, and the security of the benefit usually depends on the employer. A recommendation that relies on the registered plan to deliver an executive's full target pension ignores the cap.

## Taxpayers' perspective

A design that moves benefits to the highly paid, that lets money leave the plan before retirement, or that is generous only because of the deduction asks taxpayers to fund a goal that is the sponsor's, not the public's.
