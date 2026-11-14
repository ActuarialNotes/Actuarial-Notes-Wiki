---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:536fe5c92934b41c8663e7b99bbc54320b5973d7e6bc5dc6e0cbcf895a755332
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deferred Acquisition Cost.md
---
**Deferred Acquisition Cost** (DAC) is the U.S. [[GAAP]] asset that holds the costs an insurer incurs to acquire new contracts, so that they are expensed over the life of those contracts rather than all at once when the contracts are written. For long-duration life and annuity contracts under ASC 944 as amended by the long-duration targeted improvements (LDTI), the balance is amortised on a constant-level basis, with no interest and no recoverability test.

## What is capitalised

Since ASU 2010-26, a cost is deferred only if it:

1. results directly from, and is essential to, successfully issuing a contract, and
2. would not have been incurred otherwise.

Deferred costs include commissions on issued business, medical exams and inspection reports for issued policies, and the share of underwriters' and issue staff's pay for time spent on applications that were issued. Costs of declined or withdrawn applications, overhead, and most advertising are expensed as incurred.

> [!example]- Which of a block's first-year costs are deferred, and what is expensed? {Example}
> In its first year, a block of term policies incurs these costs:
>
> | Cost | Amount ($) |
> | :--- | ---: |
> | Commissions on policies issued | 4,200 |
> | Medical exams and inspection reports | 1,300 |
> | of which, for declined applications | 300 |
> | Underwriters' salaries, issued applications | 220 |
> | Rent for the agency office | 500 |
> | A television advertising campaign | 700 |
>
> > [!answer]-
> > - Only costs tied to contracts that were actually issued are deferred.
> > - The DAC is $4{,}200 + (1{,}300 - 300) + 220 = \$5{,}420$.
> > - The declined applications are unsuccessful efforts, rent is overhead, and general advertising is not tied to any contract.
> > - Under GAAP, $300 + 500 + 700 = \$1{,}500$ is expensed in year 1.
> > - Statutory accounting expenses all $\$6{,}920$ as incurred.

## Constant-level amortisation

LDTI requires a basis that approximates straight-line amortisation of each contract over its expected term, such as the number of contracts or the face amount in force. Contracts are grouped consistently with the [[Liability for Future Policy Benefits|liability for future policy benefits]], and the assumptions used are consistent with it. The amortisation rate per unit-year at the start of year $t$ is

> $$r_t = \frac{\text{DAC}_t}{\sum_{k \geq t} \text{expected units in force}_k}$$

- $\text{DAC}_t$ is the unamortised balance at the start of year $t$.
- The units are the measure of business in force: contracts, face amount or, for some products, account value.

The amortisation charged in year $t$ is

> $$\text{Amortisation}_t = r_t \times \text{units in force}_t$$

The balance does not accrete interest and is not tested for recoverability or impairment. Changes in assumptions apply prospectively, by recomputing the rate over the remaining expected units, with no catch-up adjustment, unlike the liability for future policy benefits. Contracts that terminate beyond what was expected take their share of the balance with them, and the write-off is

> $$\text{Write-off} = \text{DAC}_{t+1} \times \frac{\text{unexpected terminations}}{\text{expected units}_{t+1}}$$

> [!example]- What is this DAC's amortisation in each year? {Example}
> The $\$5{,}420$ DAC above relates to three-year term policies with $\$1{,}000{,}000$ of face amount at issue. The insurer expects 10% of the face in force to terminate at the end of each of years 1 and 2, so the expected face in force is $\$1{,}000{,}000$, $\$900{,}000$ and $\$810{,}000$ in years 1 to 3. At the end of year 1, the actual face in force is $\$850{,}000$. Years 2 and 3 go as expected.
>
> > [!answer]-
> > - The expected face-years total 2,710,000, so $r_1 = 5{,}420/2{,}710{,}000 = 0.002$.
> > - The year 1 amortisation is $0.002 \times 1{,}000{,}000 = \$2{,}000$, leaving $\$3{,}420$.
> > - The $\$50{,}000$ of face that terminated beyond expectations carried $3{,}420 \times 50{,}000/900{,}000 = \$190$, which is written off at the end of year 1.
> > - The remaining $\$3{,}230$ is spread over $850{,}000 + 765{,}000 = 1{,}615{,}000$ face-years, so $r_2 = 0.002$.
> > - The amortisation is $\$1{,}700$ in year 2 and $\$1{,}530$ in year 3.
> > - The charges total $2{,}000 + 190 + 1{,}700 + 1{,}530 = \$5{,}420$, so the asset is fully amortised by the end of the term, with no interest and no recoverability test.

## Before LDTI

Traditional contracts amortised DAC in proportion to premium revenue, with interest, on locked-in assumptions. [[Universal Life Insurance|Universal life]] and investment contracts amortised it in proportion to estimated gross profits, with retrospective unlocking, so DAC moved with equity markets and interest rates. Both were subject to loss recognition testing, which LDTI removed for DAC. Under LDTI, losses on an unprofitable cohort show up in the liability for future policy benefits, through the 100% cap on its net premium ratio.

## Statutory, IFRS and tax

[[Statutory Accounting Principles|Statutory]] accounting expenses acquisition costs as incurred, which creates first-year surplus strain and is one reason the [[Commissioners Reserve Valuation Method|CRVM]] reserve allows for an expense allowance. Under [[IFRS 17]], [[Insurance Acquisition Cash Flows|insurance acquisition cash flows]] are not a separate asset but reduce the [[Contractual Service Margin|contractual service margin]]. U.S. tax law has its own, unrelated capitalisation, a fixed percentage of net premiums amortised over 15 years, described under [[Life Insurance Company Taxation|life insurance company taxation]].

> [!trap] Deferring the costs of declined applications
> Costs for declined or withdrawn applications are not deferred, even if they are incremental. In the first example, deferring the whole $\$1{,}300$ of exams gives a DAC of $\$5{,}720$ instead of $\$5{,}420$.
