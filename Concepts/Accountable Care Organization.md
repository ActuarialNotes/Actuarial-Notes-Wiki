---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4b76ff95ad782b010e9ebec1ffd0e5b57bd71d443eeb1004b26e08c16e1c5c09
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accountable Care Organization.md
---
An **Accountable Care Organization** (ACO) is a group of physicians, hospitals and other providers that agrees to be held accountable for the total cost and the quality of care of the beneficiaries attributed to it, in exchange for a share of any savings it achieves against a cost benchmark. It is a form of value-based [[Provider Reimbursement|provider reimbursement]] layered on top of fee-for-service, so its providers are still paid claim by claim and a reconciliation after the year rewards or penalizes the ACO for the population's total spending.

If $B$ is the benchmark and $A$ the actual expenditure per attributed beneficiary per year, the ACO's savings rate is

> $$\text{SR} = \frac{B - A}{B}$$

## Shared savings

When the savings rate reaches the minimum savings rate (MSR), the shared savings payment to an ACO with $N$ attributed beneficiaries is

> $$\text{SS} = s\,q\,(B - A)\,N$$

- $s$ is the sharing rate.
- $q$ is the ACO's quality score, which scales the sharing rate.

Below the MSR the payment is zero. Spending for a small population varies from year to year by chance, and the MSR stops the program paying for that random variation. It is larger for smaller ACOs because their results are less credible. Once the savings rate clears the MSR, sharing usually applies to all the savings, unless the arrangement is stated net of the MSR.

An ACO must report quality measures and meet a quality standard to share in savings. This protects against savings achieved by withholding care, the risk every arrangement that rewards lower spending carries.

> [!example]- What shared savings payment does this ACO receive, and what would it receive if actual spending were $\$11{,}350$? {Example}
> An ACO has 20,000 attributed beneficiaries and a benchmark of $\$11{,}500$ per beneficiary per year. Actual spending is $\$11{,}040$ per beneficiary. Under illustrative terms the MSR is 2.0%, the sharing rate is 50%, and the ACO's quality score of 92% scales the sharing rate.
>
> > [!answer]-
> > - The savings rate is $(11{,}500 - 11{,}040)/11{,}500 = 4.0\%$, which clears the 2.0% MSR.
> > - The total savings are $460 \times 20{,}000 = \$9{,}200{,}000$.
> > - The payment is $0.50 \times 0.92 \times 9{,}200{,}000 = \$4{,}232{,}000$, and the payer keeps the other $\$4{,}968{,}000$.
> > - At $\$11{,}350$ the savings rate is $150/11{,}500 = 1.30\%$, below the MSR, so the ACO receives nothing although the population cost $\$3{,}000{,}000$ less than the benchmark.

## Shared losses

A one-sided arrangement shares savings but no losses, which suits an ACO new to risk. A two-sided arrangement shares losses too and in return offers a higher sharing rate. The Medicare Shared Savings Program offers tracks along this path, and commercial payers write similar contracts. In a two-sided arrangement, an ACO whose spending exceeds the benchmark by at least a minimum loss rate, measured as $(A - B)/B$, repays a shared loss of

> $$\text{SL} = \min\big(\ell\,(A - B)\,N,\ c\,B\,N\big)$$

- $\ell$ is the shared loss rate.
- $c$ is the loss cap as a share of the benchmark.

Shared savings are capped as a share of the benchmark in the same way.

> [!example]- How much does this two-sided ACO repay? {Example}
> A two-sided ACO with 20,000 beneficiaries and a $\$11{,}500$ benchmark spends $\$12{,}600$ per beneficiary. Under illustrative terms the minimum loss rate is 2.0%, the shared loss rate is 50%, and losses are capped at 4% of the benchmark.
>
> > [!answer]-
> > - The loss rate is $1{,}100/11{,}500 = 9.57\%$, above the 2.0% minimum.
> > - The ACO's share of the loss is $0.50 \times 1{,}100 \times 20{,}000 = \$11{,}000{,}000$.
> > - The cap is $0.04 \times 11{,}500 \times 20{,}000 = \$9{,}200{,}000$, which is lower.
> > - The ACO repays $\$9{,}200{,}000$, and the payer bears the other $\$12{,}800{,}000$ of the $\$22{,}000{,}000$ overrun. This is why payers look at an ACO's financial reserves before it enters a two-sided track.

## Attribution

Beneficiaries are assigned to an ACO from claims, usually to the ACO whose primary care clinicians provided the plurality of their primary care services. A beneficiary can also choose a clinician, which is voluntary alignment. Prospective attribution fixes the population at the start of the year, so the ACO knows whom to manage. Retrospective attribution assigns it after the year from the care actually received, which is more accurate but leaves the ACO guessing.

## The benchmark

The benchmark estimates what the attributed population would have cost without the ACO. In [[Medicare]]'s programs it starts from the population's historical expenditure, is trended forward with national or regional growth, and is adjusted for the change in the population's [[Health Risk Adjustment|risk scores]]. That adjustment is often capped, so that more complete coding cannot raise the benchmark without limit. A benchmark set too high pays for savings that never happened, and one set too low punishes an efficient ACO.

The ACO Realizing Equity, Access, and Community Health (ACO REACH) model from the CMS Innovation Center offers higher-risk options, including one in which the ACO takes full risk for its population's total cost, and adds capitated payments for primary care. Its benchmarks include a health equity adjustment for underserved beneficiaries and a retrospective trend adjustment that updates the trend once actual fee-for-service growth is known.

## Effects on cost and quality

ACOs aim to lower [[Utilization|utilization]] of avoidable admissions, emergency visits and post-acute care through care coordination and [[Care Management Program|care management]]. Spending below the benchmark is not proof that the ACO saved money, because a benchmark inflated by coding or by favourable attribution produces savings with no change in care. Evaluations therefore compare the attributed population's cost and quality with a control group.

> [!trap] Sharing only the savings above the MSR
> The MSR decides whether any savings are shared, and the sharing rate then usually applies to all of them. In the first example, sharing only the $\$4{,}600{,}000$ of savings above the MSR gives $0.50 \times 0.92 \times 4{,}600{,}000 = \$2{,}116{,}000$ instead of $\$4{,}232{,}000$. Subtract the MSR only when the question states a net-of-MSR arrangement.
