---
id: "fam-an-005"
exam: "Exam FAM"
topic: "Defined Contribution Plan"
learning_objective: "Long-Term Insurance Coverages and Retirement Financial Security Programs"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Defined+Contribution+Plan
  - Concepts/Retirement+Plan
  - Concepts/Life+Annuity
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-19
  last_checked_by: agent:validate-v1
  content_hash: sha256:680f8ab018529d27aa82cd7733cfc1bf1800298dffacfabe3de7850e1423476a
  sources:
    - "U.S. Department of Labor, Types of Retirement Plans, DB promises a specified benefit, commonly by a salary x service formula; DC promises no specific benefit, the employee receives the account balance, sha256:4912cef7b2b15ae09cb8f96b1f886fb79526235f311f5d7f92f0ebec6563fd90 — https://www.dol.gov/general/topic/retirement/typesofplans"
    - "FCA Occasional Paper No. 5, The value for money of annuities and other retirement income strategies in the UK (2014), Executive summary p.7: annuity bought with the pension pot; fall in interest rates and rise in life expectancy lowered annuity rates, sha256:7ca5c4391368b49314470e253696f181048e57f25bb27bac82a271279ea40e2d — https://www.fca.org.uk/publication/occasional-papers/occasional-paper-5.pdf"
    - "Wikipedia, Defined contribution plan (fetched 2026-10-19), investment risk borne by the employee/retiree, not the sponsor, sha256:7df0e221baa29fd2929b0ae1664dcc2852fc2a0c66ab90c4ffdd87bf89b3791c — https://en.wikipedia.org/wiki/Defined_contribution_plan"
    - "SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fam-an-005.md
---

A member of a defined contribution pension plan retires at age 65. You are given:

i) Throughout her membership, 8% of her salary was paid into her individual account.

ii) Her final salary is 90,000.

iii) Her account balance at age 65 is 480,000, and she uses all of it to buy a monthly life annuity.

iv) When she joined, the plan's illustration projected her pension using an annuity price of 12.0 per 1 of annual income, and showed a pension of 40% of final salary.

v) At age 65, because interest rates have fallen and mortality has improved, the annuity costs 15.0 per 1 of annual income.

vi) Long-term interest rates at age 65 are 3%.

Calculate her annual pension.

- A) 7,200
- B) 14,400
- C) 32,000
- D) 36,000
- E) 40,000

## Explanation

In a defined contribution plan the contribution is defined and the benefit is not: the pension is whatever the accumulated account buys at the annuity price on the day of retirement.

$$\begin{align*}
\text{Annual pension} &= \frac{\text{Account balance}}{\text{Annuity price per 1 of annual income}} \\
&= \frac{480{,}000}{15.0} \\
&= 32{,}000
\end{align*}$$

The illustration's annuity price and target were projections, not promises. The member bears the risk that annuities are dearer at retirement, from lower interest rates and longer expected lifetimes. The answer is **C**.

**Why not the others**

- **A** is the annual contribution, 8% of 90,000, or 7,200: it treats the contribution rate as a benefit rate.
- **B** is the interest on the account, 3% of 480,000, or 14,400, as if the member kept the balance and lived on its income; the given account is converted to a life annuity, which pays out capital as well as interest.
- **D** is the illustrated 40% of final salary: it treats a DC illustration as a defined benefit promise.
- **E** prices the annuity at the illustration's 12.0, giving 480,000 / 12.0 = 40,000: it assumes the plan, not the member, bears the change in annuity prices.
