---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4cf0a9cd05b3096ee3bb79ed600820afbc0a4340ba5a8c716ebe679c50d19cb6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IRIS Ratios.md
---

**IRIS Ratios** are the thirteen property/casualty financial ratios that the NAIC's Insurance Regulatory Information System computes from each insurer's statutory annual statement and compares with a published **usual range**, so that state regulators can decide which insurers to look at first. They are a public screening tool, not a verdict.

The thirteen P&C ratios and their usual ranges (NAIC *IRIS Ratios Manual*, 2025 edition) are below. A result is unusual when it is **equal to or beyond** the bound. PHS is policyholders' surplus.

| Group | Ratio | Usual range |
| :--- | :--- | :--- |
| Overall | 1. Gross premiums written to PHS | Below $900\%$ |
| Overall | 2. Net premiums written to PHS | Below $300\%$ |
| Overall | 3. Change in net premiums written | $-33\%$ to $+33\%$ |
| Overall | 4. Surplus aid to PHS | Below $15\%$ |
| Profitability | 5. Two-year overall operating ratio | Below $100\%$ |
| Profitability | 6. Investment yield | $2.0\%$ to $5.5\%$ |
| Profitability | 7. Gross change in PHS | $-10\%$ to $+50\%$ |
| Profitability | 8. Change in adjusted PHS | $-10\%$ to $+25\%$ |
| Liquidity | 9. Adjusted liabilities to liquid assets | Below $100\%$ |
| Liquidity | 10. Gross agents' balances in collection to PHS | Below $40\%$ |
| Reserves | 11. One-year reserve development to PHS | Below $20\%$ |
| Reserves | 12. Two-year reserve development to PHS | Below $20\%$ |
| Reserves | 13. Estimated current reserve deficiency to PHS | Below $25\%$ |

The ranges are reviewed every year and have moved, the investment-yield band in particular, so cite the current manual.

Ratios 1–2 measure [[Insurance Leverage|leverage]]. Ratios 3, 7 and 8 flag rapid change, 5–6 profitability, 9–10 liquidity, and 11–13 reserve adequacy, built from [[Schedule P]] Part 2. Ratio 4 warns that ceding commissions may be flattering the others.

## Two-year overall operating ratio

Ratio 5 adds the two-year loss ratio and expense ratio and subtracts the investment income ratio:

> $$\text{Ratio 5} = \text{Loss ratio} + \text{Expense ratio} - \text{Investment income ratio}$$

- $\text{Loss ratio}$ is losses and LAE incurred plus policyholder dividends, over earned premium, for the two years.
- $\text{Expense ratio}$ is other underwriting expenses less other income, over net written premium, for the two years.
- $\text{Investment income ratio}$ is net investment income over earned premium, for the two years.

> [!example]- What is this insurer's IRIS ratio 5? {Example}
> In $\$$ millions:
>
> | Item | Current year | Prior year |
> | :--- | ---: | ---: |
> | Losses and LAE incurred | 400 | 350 |
> | Policyholder dividends | 5 | 5 |
> | Earned premium | 520 | 480 |
> | Other underwriting expenses | 160 | 150 |
> | Other income | 2 | 2 |
> | Net written premium | 540 | 500 |
> | Net investment income | 40 | 36 |
>
> > [!answer]-
> > - The loss ratio is $(400 + 350 + 5 + 5)/(520 + 480) = 76.0\%$.
> > - The expense ratio is $(160 + 150 - 2 - 2)/(540 + 500) = 29.4\%$.
> > - The investment income ratio is $(40 + 36)/(520 + 480) = 7.6\%$.
> > - The operating ratio is $76.0 + 29.4 - 7.6 = 97.8\%$, reported as $98\%$, inside the usual range.
> > - Underwriting alone runs at about $105\%$, and investment income turns it into a small operating profit.

## Leverage and reserve development

Ratio 2 is

> $$\text{Ratio 2} = \frac{\text{Net premiums written}}{\text{Policyholders' surplus}}$$

Ratio 11 is

> $$\text{Ratio 11} = \frac{\text{One-year reserve development}}{\text{Prior year-end PHS}}$$

- $\text{One-year reserve development}$ is the change over the year in the estimate of loss and LAE for all prior accident years: payments plus remaining reserves, less last year's reserves.

A positive development ratio means reserves were **deficient**.

> [!example]- What are this insurer's ratios 2 and 11, and what do they say? {Example}
> An insurer has net premiums written of $\$540$ million and a two-year operating ratio of $98\%$. Its policyholders' surplus is $\$180$ million this year-end and $\$170$ million last year-end. Schedule P shows one-year reserve development of $+\$38$ million.
>
> > [!answer]-
> > - Ratio 2 is $540/180 = 300\%$, which is unusual because it is equal to the bound.
> > - Ratio 11 is $38/170 = 22.4\%$, which is unusual because it exceeds $20\%$.
> > - Last year's reserves were short by more than a fifth of last year's surplus, so that surplus, and the leverage computed on it, were overstated.
> > - If this year's reserves are set the same way, the $98\%$ operating ratio is flattered too, which is what ratio 13 tests.
> > - The analyst's next steps are Schedule P Part 2 by line and accident year, to locate the deficiency, and ratio 12. If two-year development is persistently worse than one-year, the manual flags possible deliberate under-reserving, and an on-site examination may be needed.

## What an unusual value means

An unusual value means only that the insurer merits a closer look. The manual says that stable insurers can fall outside several ranges in a volatile year, because surplus is the denominator of many ratios and an equity-market fall moves many at once. It also says that no state should rely on IRIS as its only surveillance.

IRIS results are public. The NAIC's regulator-only scoring tools and the Analyst Team build on them within [[Solvency Monitoring]]. Unlike [[Risk-Based Capital]], an IRIS result carries no legal consequence.

> [!trap] Reading positive reserve development as redundancy
> Development is the re-estimate less last year's reserves, so a positive ratio 11 or 12 means the reserves were too low. A $+22\%$ development ratio is a sign of deficiency, and it also means the prior surplus was overstated.
