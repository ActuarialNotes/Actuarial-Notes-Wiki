---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:08f0189c971a6fa2dfb1591b87c30a46c751cae228ecc682ef36312b32475d4b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp. 49-51, 58 (PDF pp. 61-63, 70); Ch. 6 p. 101 (PDF p. 113); App. D p. D-2 (PDF p. 395), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exposure Base.md
---

![[Media/Figures/Exposure_Base.svg|340]]

An **Exposure Base** is the basic unit of risk that underlies the premium, the quantity the rate is charged *per*. It measures a policy's exposure to loss, which is why it is the basis of the premium: base rates are expressed per exposure, and it is the denominator of the pure premium. The premium is

> $$\text{Premium} = \text{Rate} \times \text{Exposures}$$

and the [[Pure Premium|pure premium]] is

> $$\text{Pure Premium} = \frac{\text{Losses} + \text{LAE}}{\text{Earned Exposures}}$$

- LAE is the loss adjustment expense.

> [!example]- A homeowners book has 10,000 earned house-years, with losses of $\$5{,}600{,}000$ and LAE of $\$600{,}000$. What is its pure premium? {Example}
> - The pure premium is $(5{,}600{,}000 + 600{,}000)/10{,}000 = \$620$ per house-year.

## Criteria for an exposure base

Werner & Modlin give three criteria for choosing one:

1. **Proportional to expected loss.** All else equal, a policy with two exposures should have twice the expected loss of a similar policy with one. Expected loss varies by many other factors too. Those become rating or underwriting variables, and the factor with the most direct relationship to losses is chosen as the base.
2. **Practical.** Objective, and relatively easy and inexpensive to obtain and verify, which also keeps policyholders and producers from manipulating it (declared annual mileage invites more dishonesty than car-years). Where the most proportional measure cannot be tracked, a practical proxy is used: products liability rates on gross sales because products in use cannot be counted.
3. **Consistent with historical precedence.** A change of base can cause large premium swings for individual insureds, requires a change in the rating algorithm and systems, and may force significant adjustments to the several years of data a ratemaking analysis uses.

> [!example]- A homeowners insurer rates on house-years and proposes rating on amount of insurance (AOI) per $\$1{,}000$ instead. Its book has the losses below. Should it change the base? {Example}
>
> | AOI band | Earned house-years | Losses |
> |---|---|---|
> | $\$100$K–$200$K | $20{,}000$ | $\$12{,}000{,}000$ |
> | $\$200$K–$400$K | $15{,}000$ | $\$13{,}500{,}000$ |
> | over $\$400$K | $5{,}000$ | $\$7{,}000{,}000$ |
>
> - The pure premiums per house-year are $\$600$, $\$900$ and $\$1{,}400$.
> - Loss cost rises with amount of insurance, but far from proportionally: by a factor of $1{,}400/600 = 2.3$ while the band boundaries quadruple from $\$100$K to $\$400$K.
> - Rating per $\$1{,}000$ of AOI would over-charge large homes, so it fails the proportionality criterion.
> - House-years remain the exposure base, and amount of insurance is used as a **rating variable**, an AOI relativity applied to the base rate per house-year.

Where no single base is proportional to loss across the whole book, the shortfall is picked up by rating variables instead: this is the boundary between the exposure base and [[Classification Ratemaking|classification]]. Werner notes that some U.K. homeowners insurers do use AOI or number of bedrooms as the base, adjusting the rating algorithm for the lack of proportionality.

## Counting exposures

Exposure is counted per year of coverage. One home insured for two years has twice the expected loss of the same home insured for one year, so it is two house-years of exposure. A policy written for a term other than a year counts its term in exposure units, and a six-month policy is one-half of a written exposure (Werner & Modlin, Ch. 4).

Exposures come in the same four kinds as premium: **written**, [[Earned Exposure|earned]], unearned and [[In-Force|in-force]]. Which one is used depends on the analysis, and pure premium is typically calculated on earned exposures.

> [!example]- On January 1 an insurer writes 100 annual policies and 50 six-month policies. How many exposures are written, and how many are earned by June 30? {Example}
> - Written exposures are $100 + 50 \times 0.5 = 125$.
> - By June 30 each annual policy has earned half a year and each six-month policy its whole term, so earned exposures are $100 \times 0.5 + 50 \times 0.5 = 75$.

## Common exposure bases

| Line | Exposure base |
|---|---|
| Personal auto | earned car-years |
| Homeowners | earned house-years |
| Workers compensation | payroll, in hundreds of dollars in the U.S. |
| Commercial general liability | sales revenue, payroll, square footage or number of units |
| Commercial business property | amount of insurance |

Workers compensation uses payroll because, as the number of workers or the hours they work rise or fall, payroll and the risk of loss move together (Werner & Modlin, Ch. 4). Payroll also tracks the size of claims: indemnity benefits are a percentage of the injured worker's pre-injury wage (Ch. 6), and as indemnity benefits are tied to wage levels, they change as wages change (App. D). So payroll reflects both how much the workforce is exposed to injury and the size of its indemnity claims, whereas hours worked measure only the time exposed. The 1980s proposal to switch to hours worked was for the medical coverage (Ch. 4).

In underwriting (DISC-RM), the premium base for a general liability account follows its classification. IRMI lists payroll, receipts, sales, square footage, area or man-hours for general liability, units for auto and value per \$1,000 for property, and a [[Premium Audit|premium audit]] verifies the base after the policy ends ([[Commercial General Liability]]).

In Bailey and Simon's merit rating study, claim frequency is measured per unit of premium rather than per car year ([[Merit Rating]]).

> [!example]- Two employers in the same class code have identical operations. Employer A employs 10 workers at $\$200{,}000$ each, and Employer B employs 20 workers at $\$50{,}000$ each. How do payroll and headcount compare as the exposure base? {Example}
> - A's payroll is $\$2{,}000{,}000$ and B's is $\$1{,}000{,}000$.
> - Under headcount, B pays twice A's premium. Under payroll, A pays twice B's.
> - A pays twice B's premium for half the workers, purely because its wages are higher.
> - In the 1980s there was pressure to move workers compensation medical coverage to *hours worked*, to correct perceived inadequacies of payroll for union companies with higher pay scales. The base was not changed, with concerns about the transition a major reason: historical precedence at work.

> [!trap] Inflation in the exposure base
> Some bases, such as payroll and sales revenue, are highly influenced by inflation, which is what [[Exposure Trend|exposure trend]] measures. Count-based bases (car-years, house-years) are not. A payroll-based rate needs its exposures trended as well as its losses.
