---
aliases:
  - Applicable Best Practice
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a86243fdbbdc7b26da64d38ae61eaf1633bfd2f4e90e5cb95cf39ae32501f8e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Best Practice.md
---
**Best Practice**, on SOA syllabi "applicable best practices", is the standard an actuary's work is held to for a given task: the professional standards that apply to it ([[Actuarial Standards of Practice|ASOPs]] in the United States, the CIA's [[Standards of Practice]] in Canada), together with the methods, checks, documentation and disclosures those standards and accepted practice expect. Outside actuarial work (CFE-201, INV-101) it means the processes regarded as leading practice in a field, such as credit risk management.

Which standards apply depends on the task and the jurisdiction. The guides name them:

| Task | Standard |
| :--- | :--- |
| Incurred claims | ASOP 5 |
| Other health assets and liabilities | ASOP 42 |
| Cash flow analysis | ASOP 7 |
| Data | ASOP 23 |
| Communications | ASOP 41 |
| Risk adjustment | ASOP 45 |
| Risk classification | ASOP 12 |
| Credibility | ASOP 25 |
| Long-term care | ASOP 18 |
| Audits | ASOP 21 |

GH-201C and CP-321 point to the CIA's standards and educational notes instead, as described under [[Accepted Actuarial Practice]].

The standards share common threads:

1. Consider more than one method (ASOP 5, section 3.4).
2. Consider any explicit provision for adverse deviation, and disclose it (ASOP 5, sections 3.3.1(d) and 4.1).
3. Review the [[Data Quality|data]] for reasonableness and disclose its limitations.
4. Document the work well enough for another actuary to assess it.
5. Disclose any deviation from a standard's guidance in the [[Actuarial Communication|actuarial communication]].

A standard says "should" for what is normally expected and "may" for what is optional. A practice note or educational note that is not binding describes common practice but does not itself set the standard.

## The follow-up study

The follow-up study is the clearest quantitative best practice in reserving. ASOP 5 (section 3.5) lets the actuary test the reasonableness of prior estimates against what has since emerged. If $\hat{U}_0$ is the liability held at the prior valuation for claims incurred before it, the runout ratio is

> $$\text{Runout ratio} = \frac{P_{0 \to 1} + \hat{U}_1}{\hat{U}_0}$$

- $P_{0 \to 1}$ is what has since been paid on those claims.
- $\hat{U}_1$ is today's estimate of what remains unpaid on them.

The difference between the prior liability and its runout is

> $$\Delta = \hat{U}_0 - \left(P_{0 \to 1} + \hat{U}_1\right)$$

A positive $\Delta$ is a redundancy, and a negative $\Delta$ is a deficiency.

> [!example]- How good was this health insurer's prior estimate of unpaid claims? {Example}
> At last year-end a health insurer held $\$4.2$M of unpaid claims: a best estimate of $\$4.0$M plus an explicit, disclosed $\$0.2$M provision for adverse deviation. Since then $\$3.75$M has been paid on those claims, and $\$0.15$M is estimated to remain.
>
> > [!answer]-
> > - The runout is $3.75 + 0.15 = \$3.90$M.
> > - Against the held liability, $\Delta = 4.20 - 3.90 = \$0.30$M, a redundancy of $0.30/4.20 = 7.1\%$.
> > - Against the best estimate, $\Delta = 4.00 - 3.90 = \$0.10$M, a redundancy of $0.10/4.00 = 2.5\%$.
> > - Most of the 7.1% is the margin doing its job. The best estimate was only 2.5% high.
> > - Best practice is to compare the runout against the best estimate, check whether the redundancy recurs across valuations (a systematic bias in the completion factors), and reflect what is learned in this year's [[Claim Reserve|claim reserve]] assumptions.

## Budget neutrality in risk adjustment

A risk adjustment program pays each plan a base rate scaled by its members' risk score. ASOP 45 (section 3.8) has the actuary consider budget neutrality, so that risk adjustment moves money between plans without changing the total. With $\bar{r}$ the average risk score weighted by the members paid, plan $i$'s risk-adjusted rate is

> $$\text{PMPM}_i = \text{Base PMPM} \times \frac{r_i}{\bar{r}}$$

- $r_i$ is plan $i$'s average raw risk score.

> [!example]- What is each plan's risk-adjusted PMPM in this budget-neutral program? {Example}
> A state Medicaid program pays three health plans a base capitation of $\$400$ PMPM adjusted by risk score. The program is to be budget neutral.
>
> | Plan | Members | Raw risk score |
> | :--- | ---: | ---: |
> | A | 50,000 | 1.10 |
> | B | 30,000 | 0.95 |
> | C | 20,000 | 0.80 |
>
> > [!answer]-
> > - The member-weighted average score is $\bar{r} = (55{,}000 + 28{,}500 + 16{,}000)/100{,}000 = 0.995$.
> > - Plan A is paid $400 \times 1.10/0.995 = \$442.21$ PMPM.
> > - Plan B is paid $400 \times 0.95/0.995 = \$381.91$ PMPM.
> > - Plan C is paid $400 \times 0.80/0.995 = \$321.61$ PMPM.
> > - Monthly payments are $\$22.111$M, $\$11.457$M and $\$6.432$M, which total the $\$40.000$M budget.
> > - Paying $400$ times the raw score would have paid $\$39.8$M, so the normalization keeps the total at budget.

> [!trap] Calling a margin a redundancy
> A runout measured against the held liability mixes the explicit provision for adverse deviation with estimation error. In the example above the held liability was 7.1% redundant, but the best estimate only 2.5%. Measure against the best estimate, and disclose the explicit provision.
