---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9fb38a467e6498c7898638bc3d3b29c03e8e5f0f9da94b6261644430f0d11020
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Utilization.md
---
**Utilization** is how much of a covered benefit the insured population actually uses. In health insurance it is the rate at which members use services, such as hospital admissions, days, visits or prescriptions. In life insurance and annuities it is the share of eligible policyholders who exercise an option, such as starting withdrawals under a guaranteed living benefit or converting a term policy.

Health utilization is usually counted per 1,000 members per year, so the utilization of a service, $U$, is

> $$U = \frac{\text{Services}}{\text{Member months}} \times 12{,}000$$

Multiplied by the average cost per service, or unit cost, $C$, utilization gives the claim cost per member per month, which is

> $$\text{PMPM} = \frac{U \times C}{12{,}000}$$

- Dividing by 12,000 converts a rate per 1,000 members per year into one per member per month.

Each category of a health plan is measured in its own unit of service: admissions and days for inpatient care, visits for outpatient and physician care, and scripts for drugs. Inpatient days are admissions times the average length of stay, so a change in either moves the days and the cost. An inpatient cost per day applies to days, not admissions.

> [!example]- What is this health plan's claim cost PMPM? {Example}
> A health plan's experience is 60 admissions per 1,000 members a year with an average length of stay of 4.5 days and a cost per day of $\$3{,}000$, 900 outpatient visits per 1,000 at $\$400$, and 4,500 physician visits per 1,000 at $\$110$.
>
> > [!answer]-
> > - Inpatient days per 1,000 are $60 \times 4.5 = 270$.
> > - Inpatient cost is $270 \times 3{,}000/12{,}000 = \$67.50$ PMPM.
> > - Outpatient cost is $900 \times 400/12{,}000 = \$30.00$ PMPM.
> > - Physician cost is $4{,}500 \times 110/12{,}000 = \$41.25$ PMPM.
> > - The total is $\$138.75$ PMPM.

## Utilization trend and unit cost trend

Claim cost [[Trend|trend]] splits into a utilization trend and a unit cost trend, which compound, so the claim cost trend is

> $$\text{Cost trend} = (1 + \text{utilization trend})(1 + \text{unit cost trend}) - 1$$

A 2% utilization trend and a 5% unit cost trend give a 7.1% cost trend, not 7%. A change in how members use care and a change in what providers are paid look the same in the PMPM, and separating them shows which one a plan's contracting or care management can address.

## What drives utilization

Utilization depends on the members' age, sex and health, and on benefit design, since lower cost sharing raises use through [[Moral Hazard|moral hazard]]. It also depends on the providers. In the [[Health Care System|health care system]], physicians decide most of the services a patient receives, so the local supply of providers, their practice patterns and the way they are paid all shape it.

Under fee-for-service [[Provider Reimbursement|provider reimbursement]], each extra service earns the provider more, which tends to raise utilization. Capitation and bundled payments shift that incentive, rewarding fewer services within the payment, which can also mean too few.

## Accountable care organizations

An accountable care organization (ACO) is a group of providers that takes responsibility for the total cost and quality of care for an attributed population and shares in the savings against a benchmark. Its savings must come mostly from lower utilization, such as fewer avoidable admissions, readmissions and emergency visits. Quality measures guard against savings from withholding necessary care. Evaluating an ACO means measuring utilization against a risk-adjusted benchmark rather than against the prior year alone.

> [!example]- An ACO reduces admissions in the plan above by 5% with no change in length of stay or unit cost. What does it save PMPM? {Example}
> - Admissions fall to 57 per 1,000, so days fall to $57 \times 4.5 = 256.5$.
> - Inpatient cost becomes $256.5 \times 3{,}000/12{,}000 = \$64.125$ PMPM.
> - The saving is $67.50 - 64.125 = \$3.375$, about $\$3.38$ PMPM or 2.4% of the $\$138.75$ total.
> - In practice some of the avoided admissions move to outpatient and physician care, which would offset part of the saving.

## Utilization of policyholder options

In life insurance and annuities, the utilization rate of an option in year $t$ is

> $$u_t = \frac{\text{Exercising}_t}{\text{Eligible}_t}$$

- $\text{Exercising}_t$ is the number of policyholders who exercise the option in year $t$.
- $\text{Eligible}_t$ is the number eligible to.

For a variable annuity with a [[Guaranteed Minimum Withdrawal Benefit|guaranteed withdrawal benefit]], the cost of the guarantee depends on when and how fully policyholders take withdrawals. Utilization tends to rise with age and with how far the guarantee is in the money, and it differs by whether the contract is held in a tax-qualified plan. The assumption is set from an [[Experience Study|experience study]] by cell, with [[Actual vs Expected Analysis|actual-to-expected ratios]] and [[Credibility|credibility]], as [[Lapse|lapse]] assumptions are. An option is exercised most where it is most valuable, so a total actual-to-expected ratio near 1 can hide high utilization in the cells where the guarantee costs the most.

> [!example]- What are the actual-to-expected ratios in this withdrawal study? {Example}
> A company studies the first year in which variable annuity contracts with a guaranteed withdrawal benefit become eligible to withdraw.
>
> | Cell | Eligible | Began withdrawals | Assumed rate |
> | :--- | ---: | ---: | ---: |
> | In the money | 800 | 200 | 20% |
> | Out of the money | 1,200 | 120 | 12% |
>
> > [!answer]-
> > - Expected withdrawals are $0.20 \times 800 = 160$ in the money and $0.12 \times 1{,}200 = 144$ out of the money.
> > - In the money, A/E $= 200/160 = 1.25$.
> > - Out of the money, A/E $= 120/144 = 0.833$.
> > - In total, A/E $= 320/304 = 1.053$.
> > - The total looks close to the assumption, but in-the-money contracts withdraw 25% more than assumed. Those are the contracts on which the guarantee costs the company money, so the assumption understates the cost.

> [!trap] Dividing by 1,000 instead of 12,000
> A rate per 1,000 members per year becomes a PMPM by multiplying by the unit cost and dividing by 12,000. Dividing by 1,000 gives an annual cost per member, twelve times too large for a PMPM.
