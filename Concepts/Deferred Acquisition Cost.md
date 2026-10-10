---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c27837b011dc42aba96d7473efc25089cd6ff27fe8da19703a5e22286ef7f147
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deferred Acquisition Cost.md
---

**Deferred Acquisition Cost** (DAC) is the U.S. [[GAAP]] asset that holds the costs an insurer incurs to acquire new contracts, so that they are expensed over the life of those contracts rather than all at once when the contracts are written. For long-duration life and annuity contracts under ASC 944 as amended by the long-duration targeted improvements (LDTI), only the incremental costs of successful acquisitions are capitalised, and the balance is amortised on a constant-level basis, such as the number of contracts or the face amount in force, with no interest and no recoverability test.

> $$r_t = \frac{\text{DAC}_t}{\sum_{k \geq t} \text{expected units in force}_k}$$

> $$\text{Amortisation}_t = r_t \times \text{units in force}_t$$

> $$\text{Write-off} = \text{DAC}_{t+1} \times \frac{\text{unexpected terminations}}{\text{expected units}_{t+1}}$$

- **Symbols:** $\text{DAC}_t$ is the unamortised balance at the start of year $t$, and the units are the measure of business in force: contracts, face amount or, for some products, account value. The rate $r_t$ is the amortisation per unit-year over the expected remaining term of the cohort. The write-off removes the balance carried by contracts that terminated beyond what was expected.
- **What is capitalised:** Since ASU 2010-26, deferrable costs are those that result directly from, and are essential to, successfully issuing a contract, and that the insurer would not have incurred otherwise. They include commissions on issued business, medical exams and inspection reports for issued policies, and the share of underwriters' and issue staff's pay for time spent on applications that were issued. Costs of declined or withdrawn applications, overhead, and most advertising are expensed as incurred.
- **Constant-level amortisation:** LDTI requires a basis that approximates straight-line amortisation of each contract over its expected term. Contracts are grouped consistently with the [[Liability for Future Policy Benefits|liability for future policy benefits]], and the assumptions used are consistent with it.
- **No interest, no test:** The balance does not accrete interest and is not tested for recoverability or impairment. Changes in assumptions apply prospectively, by recomputing the rate over the remaining expected units, and terminations beyond expectations are written off when they happen.
- **Before LDTI:** Traditional contracts amortised DAC in proportion to premium revenue, with interest, on locked-in assumptions. [[Universal Life Insurance|Universal life]] and investment contracts amortised it in proportion to estimated gross profits, with retrospective unlocking, so DAC moved with equity markets and interest rates. Both were subject to loss recognition testing, which LDTI removed for DAC.
- **Statutory and IFRS:** [[Statutory Accounting Principles|Statutory]] accounting expenses acquisition costs as incurred, which creates first-year surplus strain and is one reason the [[Commissioners Reserve Valuation Method|CRVM]] reserve allows for an expense allowance. Under [[IFRS 17]], [[Insurance Acquisition Cash Flows|insurance acquisition cash flows]] are not a separate asset but reduce the [[Contractual Service Margin|contractual service margin]].
- **Tax DAC:** U.S. tax law has its own, unrelated capitalisation, a fixed percentage of net premiums amortised over 15 years, described under [[Life Insurance Company Taxation|life insurance company taxation]].

> [!example]- Which Acquisition Costs Are Deferred {Example}
> In its first year, a block of term policies incurs the following costs:
>
> - Commissions on policies issued: \$4,200.
> - Medical exams and inspection reports: \$1,300, of which \$300 was for applications that were declined.
> - Underwriters' salaries for time spent on applications that were issued: \$220.
> - Rent for the agency office: \$500.
> - A television advertising campaign: \$700.
>
> Find the DAC asset under US GAAP and the first-year acquisition expense under statutory accounting.
>
> > [!answer]-
> > Only costs tied to contracts that were actually issued are deferred.
> > $$
> > \begin{align*}
> > \text{DAC} &= 4{,}200 + (1{,}300 - 300) + 220 \\
> > &= 5{,}420 \\
> > \text{Expensed now} &= 300 + 500 + 700 \\
> > &= 1{,}500
> > \end{align*}
> > $$
> > Under GAAP, \$1,500 is expensed in year 1 and \$5,420 is deferred. The declined applications are unsuccessful efforts, rent is overhead, and general advertising is not tied to any contract. Statutory accounting expenses all \$6,920 as incurred.

> [!example]- Amortising DAC on Face in Force {Example}
> The \$5,420 DAC above relates to three-year term policies with \$1,000,000 of face amount at issue. The insurer expects 10% of the face in force to terminate by death or lapse at the end of each of years 1 and 2, so the expected face in force is \$1,000,000, \$900,000 and \$810,000 in years 1 to 3. At the end of year 1, the actual face in force is \$850,000. Find the amortisation in each year, assuming years 2 and 3 go as expected.
>
> > [!answer]-
> > The expected face-years total 2,710,000, so the rate is 0.002 per dollar of face in force.
> > $$
> > \begin{align*}
> > r_1 &= \frac{5{,}420}{2{,}710{,}000} \\
> > &= 0.002 \\
> > \text{Amort}_1 &= 0.002(1{,}000{,}000) \\
> > &= 2{,}000 \\
> > \text{Write-off} &= 3{,}420 \times \frac{50{,}000}{900{,}000} \\
> > &= 190
> > \end{align*}
> > $$
> > The \$50,000 of face that terminated beyond expectations carried \$190 of the remaining balance, which is written off at the end of year 1. The remaining \$3,230 is spread over the expected face-years still to come, $850{,}000 + 765{,}000 = 1{,}615{,}000$.
> > $$
> > \begin{align*}
> > r_2 &= \frac{3{,}230}{1{,}615{,}000} \\
> > &= 0.002 \\
> > \text{Amort}_2 &= 0.002(850{,}000) \\
> > &= 1{,}700 \\
> > \text{Amort}_3 &= 0.002(765{,}000) \\
> > &= 1{,}530
> > \end{align*}
> > $$
> > The charges total $2{,}000 + 190 + 1{,}700 + 1{,}530 = 5{,}420$, so the asset is fully amortised by the end of the term. No interest is credited and no recoverability test is applied, even though the higher lapses reduce the future profit of the cohort.

> [!tip]- How it appears on the exam
> - **ILA-101:** Candidates decide which costs can be deferred, then calculate the DAC balance and its amortisation on a stated basis, usually alongside the term insurance reserve under US GAAP.
> - **ILA-201U:** Questions compare the LDTI amortisation with the pre-LDTI methods, both premium-based with interest and estimated gross profits, and explain how assumption changes and unexpected terminations flow through the DAC balance.

> [!warning]- Exam traps
> - **Successful efforts only:** Costs for declined or withdrawn applications are not deferred, even if they are incremental. Deferring the whole underwriting cost overstates the asset.
> - **No interest under LDTI:** The constant-level method has no interest accretion. Accreting the balance at the discount rate applies the pre-LDTI traditional method.
> - **Prospective changes:** A change in expected persistency is spread over the remaining term by recomputing the rate. There is no catch-up adjustment for DAC, unlike the liability for future policy benefits.
> - **No loss recognition:** Under LDTI, DAC is not written down because a cohort becomes unprofitable. Losses show up in the liability for future policy benefits, through the 100% cap on its net premium ratio.
