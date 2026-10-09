---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d90ea5cccc530cde66d9c4057eda14df2fc8b77b318ecc9179a1097e0df8e9d1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Utilization.md
---

**Utilization** is how much of a covered benefit the insured population actually uses. In health insurance it is the rate at which members use services, such as hospital admissions, days, visits or prescriptions, usually counted per 1,000 members per year, and multiplied by the cost per service it gives the claim cost per member per month (PMPM). In life insurance and annuities it is the share of eligible policyholders who exercise an option, such as starting withdrawals under a guaranteed living benefit or converting a term policy.

> $$U = \frac{\text{Services}}{\text{Member months}} \times 12{,}000$$

> $$\text{PMPM} = \frac{U \times C}{12{,}000}$$

> $$u_t = \frac{\text{Exercising}_t}{\text{Eligible}_t}$$

- **Symbols:** $U$ is utilization per 1,000 members per year, and $C$ is the average cost per service, or unit cost. Dividing by 12,000 converts a rate per 1,000 members per year into one per member per month. In the last formula $u_t$ is the utilization rate of an option in year $t$: the number of policyholders who exercise it divided by the number eligible to.
- **Units of service:** Each category of a health plan is measured in its own unit: admissions and days for inpatient care, visits for outpatient and physician care, and scripts for drugs. Inpatient days are admissions times the average length of stay, so a change in either moves the days and the cost.
- **Utilization and unit cost:** Claim cost [[Trend|trend]] splits into a utilization trend and a unit cost trend, which compound: $(1 + u)(1 + c) - 1$. A change in how members use care and a change in what providers are paid look the same in the PMPM, and separating them shows which one a plan's contracting or care management can address.
- **What drives it:** Utilization depends on the members' age, sex and health, on benefit design, since lower cost sharing raises use through [[Moral Hazard|moral hazard]], and on the providers. Physicians decide most of the services a patient receives, so the local supply of providers, their practice patterns and the way they are paid all shape it ([[Health Care System]]).
- **Reimbursement and utilization:** Under fee-for-service, each extra service earns the provider more, which tends to raise utilization. Capitation and bundled payments shift that incentive, rewarding fewer services within the payment, which can also mean too few ([[Provider Reimbursement]]).
- **Accountable care organizations:** An accountable care organization (ACO) is a group of providers that takes responsibility for the total cost and quality of care for an attributed population and shares in the savings against a benchmark. Its savings must come mostly from lower utilization, such as fewer avoidable admissions, readmissions and emergency visits, and quality measures guard against savings from withholding necessary care. Evaluating an ACO means measuring utilization against a risk-adjusted benchmark rather than against the prior year alone.
- **Life and annuity utilization:** For a variable annuity with a [[Guaranteed Minimum Withdrawal Benefit|guaranteed withdrawal benefit]], the cost of the guarantee depends on when and how fully policyholders take withdrawals. Utilization tends to rise with age and with how far the guarantee is in the money, and it differs by whether the contract is held in a tax-qualified plan. The assumption is set from an [[Experience Study|experience study]] by cell, with [[Actual vs Expected Analysis|actual-to-expected ratios]] and [[Credibility|credibility]], as [[Lapse|lapse]] assumptions are.

> [!example]- Building a PMPM and Measuring an ACO's Savings {Example}
> A health plan's illustrative experience is 60 admissions per 1,000 members a year with an average length of stay of 4.5 days and a cost per day of \$3,000, 900 outpatient visits per 1,000 at \$400, and 4,500 physician visits per 1,000 at \$110. Find the PMPM. An ACO then reduces admissions by 5% with no change in length of stay or unit cost. Find the PMPM saving.
>
> > [!answer]-
> > Days per 1,000 are $60 \times 4.5 = 270$.
> > $$
> > \begin{align*}
> > \text{PMPM}_{\text{IP}} &= \frac{270 \times 3{,}000}{12{,}000} \\
> > &= 67.50 \\
> > \text{PMPM}_{\text{OP}} &= \frac{900 \times 400}{12{,}000} \\
> > &= 30.00 \\
> > \text{PMPM}_{\text{Phys}} &= \frac{4{,}500 \times 110}{12{,}000} \\
> > &= 41.25
> > \end{align*}
> > $$
> > The total is \$138.75 PMPM. With 57 admissions per 1,000, days fall to 256.5.
> > $$
> > \begin{align*}
> > \text{PMPM}_{\text{IP}}' &= \frac{256.5 \times 3{,}000}{12{,}000} \\
> > &= 64.125 \\
> > \text{Saving} &= 67.50 - 64.125 \\
> > &= 3.375
> > \end{align*}
> > $$
> > The ACO saves about \$3.38 PMPM, or 2.4% of the total. In practice some of the avoided admissions move to outpatient and physician care, which would offset part of the saving.

> [!example]- Withdrawal Utilization in an Experience Study {Example}
> A company studies the first year in which variable annuity contracts with a guaranteed withdrawal benefit become eligible to withdraw. Of 800 eligible contracts whose guarantee is in the money, 200 begin withdrawals, against an assumed rate of 20%. Of 1,200 eligible contracts out of the money, 120 begin, against an assumed rate of 12%. Find the actual-to-expected (A/E) ratio in each cell and in total.
>
> > [!answer]-
> > Expected withdrawals are $0.20 \times 800 = 160$ and $0.12 \times 1{,}200 = 144$.
> > $$
> > \begin{align*}
> > \text{A/E}_{\text{in}} &= \frac{200}{160} \\
> > &= 1.25 \\
> > \text{A/E}_{\text{out}} &= \frac{120}{144} \\
> > &= 0.833 \\
> > \text{A/E}_{\text{total}} &= \frac{320}{304} \\
> > &= 1.053
> > \end{align*}
> > $$
> > The total looks close to the assumption, but in-the-money contracts withdraw 25% more than assumed. Those are the contracts on which the guarantee costs the company money, so the assumption understates the cost even though the total A/E is near 1.

> [!tip]- How it appears on the exam
> - **GH-301:** The Provider Contracting and Reimbursement section asks candidates to evaluate ACOs and their impact on quality, utilization and cost. A question can give utilization and unit cost by category before and after an intervention and ask for the PMPM change, or ask how an ACO's shared savings depend on lower utilization against its benchmark.
> - **ILA-101:** The Assumption Development and Experience Studies section asks candidates to describe and evaluate utilization assumptions, alongside mortality, lapse, premium persistency and term conversions, and to apply methods for developing them. Its readings include a study of utilization of variable annuity guaranteed living benefits, so the calculation is an experience study of option exercise by cell.

> [!warning]- Exam traps
> - **The 12,000:** A rate per 1,000 members per year becomes a PMPM by multiplying by the unit cost and dividing by 12,000, not by 1,000 or by 12 alone. Dividing by 1,000 gives an annual cost per member, twelve times too large for a PMPM.
> - **Admissions versus days:** Inpatient cost per day applies to days, not admissions. Multiplying admissions by a per-diem cost leaves out the length of stay and understates the cost.
> - **Trends compound:** A 2% utilization trend and a 5% unit cost trend give a 7.1% cost trend, not 7%. Adding them understates the total over several years.
> - **Aggregate A/E hides the cost:** An option is exercised most where it is most valuable. A total A/E near 1 can hide high utilization in the cells where the guarantee is in the money, which is where the cost is.
