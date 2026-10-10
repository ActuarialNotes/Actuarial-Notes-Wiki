---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0da8a17bce8ee81c78fe71120f6aed36898302634523da4e78623fc04a627d6c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accountable Care Organization.md
---

An **accountable care organization** (ACO) is a group of physicians, hospitals and other providers that agrees to be held accountable for the total cost and the quality of care of a defined population, the beneficiaries attributed to it, in exchange for a share of any savings it achieves against a cost benchmark. It is a form of value-based [[Provider Reimbursement|provider reimbursement]] layered on top of fee-for-service: providers are still paid claim by claim, and the reconciliation after the year rewards or penalizes the ACO for the population's total spending.

> $$\text{SR} = \frac{B - A}{B}$$

> $$\text{SS} = \begin{cases} s\,q\,(B - A)\,N & \text{SR} \geq \text{MSR} \\ 0 & \text{SR} < \text{MSR} \end{cases}$$

> $$\text{SL} = \min\big(\ell\,(A - B)\,N,\ c\,B\,N\big)$$

- **Symbols:** $B$ is the benchmark and $A$ the actual expenditure per attributed beneficiary per year, $N$ the number of attributed beneficiaries, and SR the savings rate. SS is the shared savings payment, $s$ the sharing rate, $q$ the quality score that scales it, and MSR the minimum savings rate. SL is the shared loss repaid in a two-sided arrangement, $\ell$ the shared loss rate and $c$ the loss cap as a share of the benchmark. A loss is repaid only if $(A - B)/B$ reaches a minimum loss rate.
- **Attribution:** Beneficiaries are assigned to an ACO from claims, usually to the ACO whose primary care clinicians provided the plurality of their primary care services, or by the beneficiary choosing a clinician, which is voluntary alignment. Prospective attribution fixes the population at the start of the year, so the ACO knows whom to manage. Retrospective attribution assigns it after the year from the care actually received, which is more accurate but leaves the ACO guessing.
- **The benchmark:** The benchmark estimates what the attributed population would have cost without the ACO. In [[Medicare]]'s programs it starts from the population's historical expenditure, is trended forward with national or regional growth, and is adjusted for the change in the population's [[Health Risk Adjustment|risk scores]], often within a cap so that more complete coding cannot raise it without limit. A benchmark set too high pays for savings that never happened, and one set too low punishes an efficient ACO.
- **The minimum savings rate:** Spending for a small population varies from year to year by chance. Requiring savings above an MSR before anything is shared stops the program paying for random variation, and the MSR is larger for smaller ACOs because their results are less credible.
- **Quality gates:** An ACO must report quality measures and meet a quality standard to share in savings, and its quality score can scale the sharing rate. This protects against savings achieved by withholding care, the risk every arrangement that rewards lower spending carries.
- **One-sided and two-sided risk:** A one-sided arrangement shares savings but no losses, which suits an ACO new to risk. A two-sided arrangement shares losses too and in return offers a higher sharing rate. The Medicare Shared Savings Program offers tracks along this path, and commercial payers write similar contracts.
- **ACO REACH:** The ACO Realizing Equity, Access, and Community Health model from the CMS Innovation Center offers higher-risk options, including one in which the ACO takes full risk for its population's total cost, and adds capitated payments for primary care. Its benchmarks include a health equity adjustment for underserved beneficiaries and a retrospective trend adjustment that updates the trend once actual fee-for-service growth is known.
- **Effects on cost and quality:** ACOs aim to lower [[Utilization|utilization]] of avoidable admissions, emergency visits and post-acute care through care coordination and [[Care Management Program|care management]]. Evaluation compares the attributed population's cost and quality with a control group, because savings measured against a benchmark depend on how the benchmark was set.

> [!example]- Shared Savings Payout {Example}
> An ACO has 20,000 attributed beneficiaries and a benchmark of \$11,500 per beneficiary per year. Actual spending is \$11,040 per beneficiary. Under illustrative terms the MSR is 2.0%, the sharing rate is 50%, and the ACO's quality score of 92% scales the sharing rate. Find the shared savings payment. Then say what happens if actual spending had been \$11,350.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{SR} &= \frac{11{,}500 - 11{,}040}{11{,}500} \\
> > &= 4.0\% \\
> > (B - A)\,N &= 460 \times 20{,}000 \\
> > &= 9{,}200{,}000 \\
> > \text{SS} &= 0.50 \times 0.92 \times 9{,}200{,}000 \\
> > &= 4{,}232{,}000
> > \end{align*}
> > $$
> > The savings rate of 4.0% clears the 2.0% MSR, so the ACO receives \$4,232,000 and the payer keeps the other \$4,968,000 of the savings. At \$11,350 the savings rate would be $150 / 11{,}500 = 1.30\%$, below the MSR, so the ACO would receive nothing even though the population cost \$3,000,000 less than the benchmark.

> [!example]- A Two-Sided ACO Over Its Benchmark {Example}
> A two-sided ACO with the same 20,000 beneficiaries and \$11,500 benchmark spends \$12,600 per beneficiary. Under illustrative terms the minimum loss rate is 2.0%, the shared loss rate is 50%, and losses are capped at 4% of the benchmark. Find the amount the ACO repays.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \frac{A - B}{B} &= \frac{1{,}100}{11{,}500} \\
> > &= 9.57\% \\
> > \ell\,(A - B)\,N &= 0.50 \times 1{,}100 \times 20{,}000 \\
> > &= 11{,}000{,}000 \\
> > c\,B\,N &= 0.04 \times 11{,}500 \times 20{,}000 \\
> > &= 9{,}200{,}000
> > \end{align*}
> > $$
> > The loss rate exceeds the 2.0% minimum, and the ACO's share of the loss, \$11,000,000, exceeds the cap, so it repays \$9,200,000. The payer bears the other \$12,800,000 of the \$22,000,000 overrun, which is why payers look at the ACO's financial reserves before it enters a two-sided track.

> [!tip]- How it appears on the exam
> - **GH-301 calculations:** Questions give a benchmark, actual spending, an MSR, a sharing rate and a quality score, and ask for the shared savings or shared loss, sometimes after first building the benchmark from trended and risk-adjusted historical spending.
> - **GH-301 written parts:** Candidates evaluate ACOs and their effect on quality, utilization and cost, explain attribution, the MSR and the quality gate, or discuss how ACO REACH's benchmark adjustments change an ACO's prospects.

> [!warning]- Exam traps
> - **The MSR is a threshold:** Once the savings rate clears the MSR, sharing usually applies to all the savings, not only to those above the MSR, unless the question states a net-of-MSR arrangement. Check which the question uses before subtracting.
> - **Per beneficiary or in total:** The benchmark and actual spending are usually per beneficiary per year, so the dollar savings need multiplying by the number of attributed beneficiaries.
> - **Quality scales the share:** The quality score multiplies the sharing rate, not the savings rate. Applying it to the savings rate before the MSR test can wrongly push the ACO below the threshold.
> - **Caps on both sides:** Shared savings and shared losses are each capped as a share of the benchmark. Compare the formula result with the cap before reporting the payment.
> - **Savings against a benchmark:** Spending below the benchmark is not proof that the ACO saved money. A benchmark inflated by coding or by favourable attribution produces savings with no change in care.
