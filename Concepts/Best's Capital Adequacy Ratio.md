---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:13f59a8153f2590ab2221272e20a68c6ccdee3bfb8b75478862e247f1039b1c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Best's Capital Adequacy Ratio.md"
---

**Best's Capital Adequacy Ratio** (BCAR) is A.M. Best's measure of an insurer's balance-sheet strength: the capital it has, set against the **net required capital** (NRC) that its investment, credit and underwriting risks call for once a covariance adjustment allows that those risks are unlikely to peak together. It is one of the [[Key Financial Measures|key financial measures]] used by [[Rating Agency|rating agencies]].

Net required capital is

> $$\text{NRC} = \sqrt{S} + B_7$$

- $B_7$ is the charge for business (off-balance-sheet) risk.
- $S$ is the sum of the squared charges below.

The sum of squares is

> $$
> \begin{aligned}
> S ={}& B_1^2 + B_2^2 + B_3^2 + (0.5B_4)^2 \\
> &+ (0.5B_4 + B_5)^2 + B_6^2
> \end{aligned}
> $$

- $B_1$ is the charge for fixed-income securities.
- $B_2$ is the charge for equity securities.
- $B_3$ is the charge for interest rate risk.
- $B_4$ is the charge for credit risk.
- $B_5$ is the charge for loss and LAE reserves.
- $B_6$ is the charge for net premiums written.

The components are grouped as investment, credit and underwriting risk, the three categories the 2015–2017 sample answers name. BCAR, the ratio, is

> $$\text{BCAR} = \frac{\text{Adjusted surplus}}{\text{NRC}}$$

The 2013 and 2014 answers use this ratio, and the 2013 answer reads a BCAR over $100\%$ as secure. BCAR feeds balance-sheet strength, which the 2015 answer lists with operating performance and business profile as the components of a Best's rating.

> [!example]- What is this insurer's BCAR, calculated as the 2013 sample answer does? {Example}
> An insurer reports (\$000s): $B_1 = 6{,}000$, $B_2 = 14{,}000$, $B_3 = 2{,}500$, $B_5 = 52{,}000$, $B_6 = 24{,}000$, $B_7 = 100$, and adjusted surplus of $80{,}000$. For credit risk, agents' balances of $3{,}000$ carry a $5\%$ factor. Reinsurer X (rated A+) owes recoverables of $40{,}000$ plus a ceded reserve deficiency of $1{,}000$, with a $2\%$ capital factor. Reinsurer Y (rated A-) owes $15{,}000$ plus $1{,}500$, with a $6\%$ factor. The reinsurance dependence factor is $1.20$, with a minimum dependence charge of $1\%$ of adjusted recoverables.
>
> > [!answer]-
> > - Recoverables are charged on the amount including the ceded deficiency: $41{,}000(0.02) + 16{,}500(0.06) = 820 + 990 = 1{,}810$.
> > - The dependence charge is $\max\big(1{,}810(0.20),\ 0.01(57{,}500)\big) = \max(362,\ 575) = 575$.
> > - The credit charge is $B_4 = 150 + 1{,}810 + 575 = 2{,}535$, so half of it, $1{,}267.5$, stands alone and half is added to the reserve charge, $53{,}267.5$.
> > - $S = 6{,}000^2 + 14{,}000^2 + 2{,}500^2 + 1{,}267.5^2 + 53{,}267.5^2 + 24{,}000^2 = 3{,}653{,}283{,}113$.
> > - $\text{NRC} = \sqrt{S} + 100 = 60{,}442 + 100 = 60{,}542$.
> > - $\text{BCAR} = 80{,}000/60{,}542 = 132\%$, above $100\%$, so secure on the 2013 reading.
> > - The components sum to $101{,}135$, so the covariance adjustment removes about $40\%$ of gross required capital. Almost all of what is left is reserve and premium risk.

## Calibration of the charges

[[Feldblum]] describes how BCAR keeps the [[Risk-Based Capital|RBC]] structure of independent categories with a covariance adjustment. It adds interest-rate risk and risks hard to read from the statements (asbestos and pollution, catastrophe), and calibrates every charge to a **$1\%$ expected policyholder deficit** — the capital $Z$ at which aggregate excess-of-loss cover above $Z$ has a pure premium of $1\%$ of reserves. On industry figures a $120$ basis point rate rise gives that $1\%$, so each portfolio is stressed by $120$ bp.

## The covariance adjustment

The square root recognises that the components are unlikely to develop at the same time. It shrinks small categories most. With equal volatility, equities one-tenth the size of reserves have one-tenth their marginal effect (Feldblum). Feldblum prints the root as a plain sum of $B_1^2$ to $B_6^2$. The published answers, like A.M. Best's own criteria, add half the credit charge to the reserve charge before squaring. $B_7$ stays outside the root because A.M. Best expects capital for it without a diversification benefit.

## The BCAR score

A.M. Best's current criteria, and the Fall 2019 answer, add a catastrophe charge $B_8^2$ inside the root and state BCAR as a score. The score is

> $$\text{BCAR} = \frac{\text{AC} - \text{NRC}}{\text{AC}} \times 100$$

- $\text{AC}$ is available capital.

The score is positive when available capital exceeds NRC, and scores are read at several VaR confidence levels.

> [!example]- If the insurer above also had a catastrophe charge $B_8 = 20{,}000$ and available capital of $80{,}000$, what is its BCAR score? {Example}
> - $B_8^2$ joins the root, so $\text{NRC} = \sqrt{S + 20{,}000^2} + 100 = 63{,}765$.
> - The score is $(80{,}000 - 63{,}765)/80{,}000 \times 100 = 20.3$.
> - Adding a $20{,}000$ charge raises NRC by only about $3{,}200$, because inside the root a charge much smaller than the reserve charge adds little.
> - The positive score says available capital exceeds NRC, by $20\%$ of available capital.

## The natural catastrophe stress test

The stress test takes a first event off surplus, raises recoverables and reserves by $40\%$ of the ceded and net losses, and deducts a second event. Its purpose is to show how sensitive balance-sheet strength is to a catastrophe. A.M. Best does not require an insurer to survive two major events. How far the stressed BCAR may fall, the **tolerance**, depends on:

1. **Financial flexibility**: able and willing to replace capital at once.
2. **Historical volatility** of the balance sheet and results.
3. **Exposure to frequency**: several events in a season.

A.M. Best's current criteria keep the first three adjustments, on the 1-in-100 year all-perils PML. In place of a second-event deduction they adjust the $B_8$ catastrophe charge for the reinsurance left after the first event.

> [!example]- What is the stressed BCAR, and would A.M. Best tolerate it? {Example}
> The insurer above (adjusted surplus $80{,}000$, in \$000s) is a subsidiary of an international group with ten years of stable combined ratios. Earthquake is its main catastrophe exposure, and its tax rate is $25\%$. For the first event, its gross pre-tax PML is $150{,}000$ and its net pre-tax PML $30{,}000$ (after retention, coinsurance and reinstatement premium). Its 1-in-100 year net pre-tax earthquake PML is $16{,}000$. With the higher recoverables and reserves, net required capital rises to $64{,}000$. Apply the stress test as the 2013 and 2016 sample answers describe it.
>
> > [!answer]-
> > - The first event takes $30{,}000(1 - 0.25) = 22{,}500$ off surplus.
> > - Recoverables rise by $0.40(150{,}000 - 30{,}000) = 48{,}000$ and reserves by $0.40(30{,}000) = 12{,}000$. These raise the credit and reserve charges, which is why NRC rises.
> > - The second event is the 1-in-100 year loss because earthquake is the main exposure. It takes $16{,}000(1 - 0.25) = 12{,}000$ off surplus. Where hurricanes dominate, the answers take the second event equal to the first.
> > - The stressed surplus is $80{,}000 - 22{,}500 - 12{,}000 = 45{,}500$, so the stressed BCAR is $45{,}500/64{,}000 = 71\%$.
> > - A fall from $132\%$ to $71\%$ is large, but all three factors favour this insurer. A parent group gives financial flexibility to replace capital quickly, and stable results mean low historical volatility.
> > - An earthquake is not a peril that recurs within a season the way hail, tornado or hurricane can. A regional mutual with volatile results and hail exposure, stressed to the same figure, would get less tolerance.

## Comparison with the MCT

BCAR charges significantly for future premium, because A.M. Best expects the balance sheet to support next year's planned business as well as the current book (2018 answer). The [[MCT]]'s unexpired-coverage margin applies its factors to the greater of net unexpired coverage and $30\%$ of net premiums received in the past year. Both reduce capital for diversification. The MCT's [[Diversification Credit|diversification credit]] uses one $50\%$ correlation between asset risk (credit plus market) and insurance risk, where BCAR takes a square root over all its components. Against DCAT (renamed [[FCT]] in 2020), BCAR's catastrophe test shares the multiple events but uses a different severity threshold (2015 answer).

> [!trap] Squaring half the credit charge
> The term is $(0.5B_4)^2$, half the charge squared, not $0.5B_4^2$. Writing $0.5B_4^2$, and leaving a score unmultiplied by $100$, were the common errors on the 2019 exam.
