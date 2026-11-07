---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:824fe341c903ea2ece42adc19192a271c03f6d43ef6b444f6ee4e4d1decdc9f8
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.13 pp.239-246, 255-257 (PDF pp.251-258, 267-269); Ch.9 p.158 (PDF p.170); Ch.14 pp.280-284 (PDF pp.292-296), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section I p.1, Section II p.2 Principle 4, Section III p.4, Section IV p.5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ratemaking Constraints.md
---

![[Media/Figures/Ratemaking_Constraints.svg|340]]

**Ratemaking Constraints** are the regulatory, legal, competitive and operational limits that make the filed [[Rate Change|rate change]] differ from the indicated one. The actuary's obligation is not that the two agree, but that the indication is computed properly and the departure from it is identified and documented. The constraints are:

1. **Regulatory.** Some jurisdictions require the regulator's approval before new rates are used. Some limit the overall average change, the change for any individual customer or group of customers, or both. Others require written notice to all insureds or a public hearing above a threshold, so a company may file just under it. Some prescribe ratemaking techniques, and a regulator may simply disagree with an assumption such as the selected trend, and negotiating that difference costs time.
2. **Legal.** Certain rating variables are prohibited or restricted even when they are strong predictors of risk. Some jurisdictions limit or ban insurance credit scores, some states prohibit gender, and some allow a variable in underwriting but not in the rating algorithm.
3. **Competitive.** The indication sets a rate without regard to whether the product will be bought. Past some price, the business lost outweighs the higher price on what remains, and rate changes themselves prompt renewing customers to shop. Rates must also be competitive to attract business in a new market, where loading unusual costs into the rates would hinder the growth needed to spread expenses.
4. **Operational.** Base rates and relativities are usually easy to change. Changing the structure of the rating algorithm can require significant systems changes, and a new rating variable may need data that has never been captured. A cost-benefit analysis decides whether the change is worth making.
5. **Customer disruption.** Capping the change to a rating variable's levels, or a transition rule that caps any one renewal's change, limits individual premium movement.

The CAS [[Principles of Ratemaking|Statement of Principles]] confines itself to estimating the costs of the risk transfer. Under Principle 4, a rate is reasonable and not excessive, inadequate or unfairly discriminatory if it is an actuarially sound estimate of those costs. Affordability is not one of the principles, and a rate chosen to maximize profit from a retention model, rather than from estimated future costs, does not by itself show compliance with them. The company may still elect to implement something other than the indication, and the material assumptions are documented and available for disclosure.

> [!example]- The indication is $+18\%$, and the regulator caps a single filing at $+10\%$. The book earns $\$25{,}000{,}000$ at the filed rates. What does the constraint cost, and what are the insurer's options? {Example}
> - The residual inadequacy is $1.18/1.10 - 1 = +7.3\%$.
> - At the filed level the premium falls about $25{,}000{,}000 \times 0.073 = \$1{,}820{,}000$ a year short of the indication.
> - The insurer can file again for the residual change, plus whatever the intervening trend adds.
> - It can take non-pricing action, such as revising underwriting guidelines to limit the business written at inadequate rates.
> - It can challenge the regulation through legal action.
> - The actuary records the $+18\%$ indication, the $+10\%$ selection and the reason for the difference.

## Responses to a constraint

A pricing shortfall can be offset in several ways ([[Non-Pricing Solutions|non-pricing solutions]]):

1. **Reduce expenses**, such as through staffing or distribution.
2. **Reduce loss costs**, through loss control, safety programmes or stricter underwriting guidelines.
3. **Change marketing directives**, to minimize new applicants whose rates are thought inadequate.
4. **Accept a lower profit**, or rely on more investment income.
5. **Use an allowable rating variable**, such as payment history with the company, that explains some or all of a restricted variable's effect.
6. **Challenge the regulation** through legal action.

Revising underwriting guidelines is open only where the jurisdiction does not require insurers to take all comers.

> [!example]- A jurisdiction bans credit-based insurance scores, which the insurer's model shows to be highly predictive. What happens to the book, and what can the actuary do? {Example}
> - Removing the variable does not remove the cost difference, only the ability to charge for it.
> - Good-credit insureds are over-charged and poor-credit insureds under-charged, and in a competitive market the over-charged group leaves, so the mix shifts toward the under-priced segment.
> - The model is re-fit without the variable, so the remaining variables absorb what correlated signal they legitimately can.
> - An allowable variable, such as payment history with the company, may explain some of the restricted variable's effect.

## Capping by territory or class

When the change in one territory or class is capped below its indication, the premium falls short of what is needed to reach the permissible loss ratio overall. The shortfall is the current premium times the indicated change less the capped change, and the change in each uncapped territory is scaled up by a common redistribution factor so that total premium still meets the target. The actuary decides whether the target is met over the whole transition or only by its end.

> [!example]- A territory with $\$1{,}000{,}000$ of premium has a $+25\%$ indication capped at $+15\%$. The other territory has $\$3{,}000{,}000$ of premium and a $+5\%$ indication. How is the overall $+10\%$ kept? {Example}
> - The capped territory's shortfall is $1{,}000{,}000 \times 0.10 = \$100{,}000$.
> - The other territory's indicated premium is $\$3{,}150{,}000$, and the redistribution factor is $1 + 100{,}000/3{,}150{,}000 = 1.0317$.
> - Its change is $1.05 \times 1.0317 - 1 = +8.3\%$.

## Competition and retention

A large rate increase relative to competitors' prices lowers the retention ratio and the new business close ratio. Volume and market share shrink, while the loss ratio and profit per risk on the retained business improve. An insured's propensity to renew depends on the size of the rate change at renewal, the price relative to competitors and the service and claim handling received. The longer the insured has been with the carrier, the less sensitive the insured is to premium increases. Companies weigh the indication against competitive comparisons, close and retention ratios and policyholder dislocation, and some model the trade-off directly with [[Lifetime Value|lifetime value]] analysis and retention and conversion models.
