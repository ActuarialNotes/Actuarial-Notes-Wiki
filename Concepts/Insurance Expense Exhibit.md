---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9582dd89667d7ddd6b7c2564e7651bebf7832458f2493b49586a6e407a71e8dc
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Expense Exhibit.md
---

**The Insurance Expense Exhibit** (IEE) is a supplement to the [[NAIC Annual Statement]], filed by every P&C insurer by April 1, that allocates the company's expenses to expense groups and then allocates premiums, losses, loss adjustment expenses, underwriting expenses and investment gain to lines of business — net of reinsurance and on a direct basis — to show a pre-tax profit or loss for each line.

> $$\begin{aligned} \text{UW result} = {} & \text{EP} - \text{Div} - \text{Losses} - \text{DCC} - \text{AO} \\ & - \text{UW expenses} + \text{Other income} \end{aligned}$$
>
> $$\text{Total profit} = \text{UW result} + I_{\text{ins}} + I_{\text{C\&S}}$$

- EP is earned premium, Div policyholder dividends, UW expenses the four underwriting expense groups (commission and brokerage; taxes, licenses and fees; other acquisition, field supervision and collection; general), $I_{\text{ins}}$ the investment gain on funds attributable to insurance transactions, and $I_{\text{C\&S}}$ the investment gain attributable to capital and surplus. All figures are pre-tax.
- **Part I — allocation to expense groups.** Splits the company's other underwriting expenses into acquisition, field supervision and collection; general; and taxes, licenses and fees, alongside loss adjustment and investment expenses, following the NAIC's Uniform Classification of Expenses.
- **Part II — lines of business, net of reinsurance.** For each line: premiums written and earned, dividends, incurred losses, DCC and AO, unpaid losses and LAE, unearned premium, agents' balances, the four expense groups, other income — then pre-tax profit excluding all investment gain, profit after investment gain on insurance funds, and total profit after investment gain on capital and surplus.
- **Part III — lines of business, direct.** The same underwriting elements before reinsurance, which the instructions describe as simulating results without the effect of reinsurance. Comparing Parts II and III shows what reinsurance did to each line.
- **Investment gain allocation** follows a prescribed formula: a line's insurance funds are its mean loss and LAE reserves plus mean unearned premium (less the prepaid acquisition expense within it) plus ceded premiums payable, less agents' balances; surplus is allocated in proportion to reserves plus earned premium. The instructions warn that the allocation of investment income from capital and surplus by line may not accurately reflect a line's profitability for ratemaking.
- **Uses:** regulators build industry profitability by line and state from it; actuaries use it for expense ratios by line in rate filings ([[Expense Provisions]]); analysts use it to find lines subsidised by others and to judge [[Insurance Profitability]] beyond the company-wide [[Combined Ratio]]. See also [[Expense Ratio]], [[Underwriting Profit]] and [[Loss and Loss Adjustment Expense]].

> [!example]- Pro Forma Profitability of One Line {Example}
> IEE Part II, commercial auto liability ($\$000$): earned premium $100{,}000$; dividends $0$; incurred losses $68{,}000$; DCC $7{,}000$; AO $6{,}000$; commission and brokerage $12{,}000$; taxes, licenses and fees $2{,}500$; other acquisition $5{,}000$; general $6{,}000$; other income less other expenses $-500$; investment gain on insurance funds $9{,}500$; investment gain on capital and surplus $4{,}000$.
>
> Compute the three profit measures and interpret them.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{LAE-inclusive losses} &= 68{,}000 + 7{,}000 + 6{,}000 \\
> > &= 81{,}000 \\[4pt]
> > \text{UW expenses} &= 12{,}000 + 2{,}500 + 5{,}000 + 6{,}000 \\
> > &= 25{,}500 \\[4pt]
> > \text{UW result} &= 100{,}000 - 81{,}000 - 25{,}500 - 500 \\
> > &= -7{,}000 \\[4pt]
> > \text{After } I_{\text{ins}} &= -7{,}000 + 9{,}500 \\
> > &= 2{,}500 \\[4pt]
> > \text{Total profit} &= 2{,}500 + 4{,}000 \\
> > &= 6{,}500
> > \end{align*}
> > $$
> >
> > The line runs at a $107\%$ combined ratio to earned premium — an underwriting loss of $7\%$ — and is rescued by investment income on its long-tailed reserves. Only $\$2.5$ million is earned from the insurance operation once its own funds are credited; the remaining $\$4.0$ million is income on surplus allocated by formula, which the NAIC itself cautions against reading as line profitability.

> [!example]- Expense Ratios for a Rate Filing {Example}
> IEE Part III, other liability ($\$000$):
>
> | Year | Written | Earned | Other acquisition | General |
> |---|---|---|---|---|
> | $2023$ | $50{,}000$ | $48{,}000$ | $2{,}600$ | $3{,}000$ |
> | $2024$ | $54{,}000$ | $52{,}000$ | $2{,}750$ | $3{,}250$ |
> | $2025$ | $58{,}000$ | $56{,}500$ | $3{,}000$ | $3{,}450$ |
>
> Compute three-year ratios for other acquisition expense to written premium and general expense to earned premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Other acquisition} &= \frac{2{,}600 + 2{,}750 + 3{,}000}{50{,}000 + 54{,}000 + 58{,}000} \\
> > &= \frac{8{,}350}{162{,}000} \\
> > &= 5.15\% \\[4pt]
> > \text{General} &= \frac{3{,}000 + 3{,}250 + 3{,}450}{48{,}000 + 52{,}000 + 56{,}500} \\
> > &= \frac{9{,}700}{156{,}500} \\
> > &= 6.20\%
> > \end{align*}
> > $$
> >
> > Acquisition costs are incurred as policies are written, so they are related to written premium; general expenses are incurred through the policy term, so they are related to earned premium. Direct (Part III) data are the natural base because rates are charged on direct business. The selected ratios then feed the fixed and variable expense provisions of the indicated rate.
