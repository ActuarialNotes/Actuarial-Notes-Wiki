---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:2d96686ea70ef6bac6449a0a0c2575ab0047fdcc003f84fb830591dbd842bb9e
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.13 pp.239-246, 255-257 (PDF pp.251-258, 267-269); Ch.9 p.158 (PDF p.170); Ch.14 pp.280-284 (PDF pp.292-296), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section I p.1, Section II p.2 Principle 4, Section III p.4, Section IV p.5, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ratemaking Constraints.md
---

**Ratemaking Constraints** are the regulatory, competitive, operational and legal limits that cause the **filed** rate change to differ from the **indicated** one. The actuary's obligation is not that the two agree, but that the indication is computed properly and the departure is identified and documented.

> $$\text{Selected Change} = f\!\left(\text{Indication},\; \text{Credibility},\; \text{Constraints}\right)$$

- **Regulatory.** Some jurisdictions require the regulator's approval before new rates are used; some limit the overall average change, the change for any individual customer or group of customers, or both; others impose written notice to all insureds or a public hearing above a threshold, so a company may file just under it. Some prescribe ratemaking techniques, and a regulator may simply disagree with an assumption such as the selected trend — and negotiating that difference has a cost, including delayed implementation.
- **Legal.** Certain rating variables are prohibited or restricted even when they are demonstrably strong predictors of risk: some jurisdictions limit or ban insurance credit scores, some states prohibit gender, and some allow a variable in underwriting but not in the rating algorithm. A variable that is actuarially sound and operationally practical can still be unusable.
- **Competitive.** The traditional indication sets a rate without regard to whether the product will be bought. Past some price the business lost outweighs the higher price on what remains, and rate changes themselves prompt renewing customers to shop. Companies weigh the indication against competitive comparisons, close and retention ratios and policyholder dislocation, and some model it directly with [[Lifetime Value|lifetime value]] analysis and retention and conversion models.
- **Operational.** Base rates and relativities are usually easy to change; changing the structure of the rating algorithm can require significant systems changes, and a new rating variable may need data that has never been captured (inspectors, questionnaires). A cost-benefit analysis decides whether the change is worth making.
- **Consumer disruption.** Capping the change to a rating variable's levels, or a premium transition rule that caps any one renewal's change, limits individual premium movement. The base rate has to be adjusted to make up the capped premium, and the actuary must decide whether the overall target is met over the whole transition or only by its end.

The professional position: the CAS [[Principles of Ratemaking|Statement of Principles]] confines itself to *estimating* the costs of the risk transfer — marketing goals, competition and legal restrictions enter only to the extent they affect that estimate — and under Principle 4 a rate is not excessive, inadequate or unfairly discriminatory if it is an actuarially sound estimate of those costs. The indication is the actuary's best cost-based estimate; the company may still elect to implement something else, and the Statement asks that material assumptions be documented and available for disclosure.

![[Media/Figures/Ratemaking_Constraints.svg|340]]

> [!example]- A Regulatory Cap {Example}
> The indication is $+18\%$; the regulator caps a single filing at $+10\%$. The book earns $\$25{,}000{,}000$.
>
> What are the insurer's options and what is the cost of the constraint?
>
> > [!answer]-
> > Filing $+10\%$ leaves a residual inadequacy of
> >
> > $$\frac{1.18}{1.10} - 1 = +7.3\%$$
> >
> > Read the $\$25{,}000{,}000$ as the premium the book earns at the filed ($+10\%$) level. The premium the indication calls for is $7.3\%$ more, so the annual shortfall is
> >
> > $$\$25{,}000{,}000 \times 0.0727 \approx \$1{,}820{,}000$$
> >
> > Options:
> >
> > - **File again next cycle** for the residual $+7.3\%$, plus whatever the intervening trend adds.
> > - **Non-pricing action** — revise underwriting guidelines to limit the business written at inadequate rates, or change marketing directives to steer new business toward where rates are adequate. These reach adequacy through the loss side rather than the premium side ([[Considerations for Implementing Rates]]).
> > - **Challenge the regulation** through legal action.
> >
> > What the actuary records either way: the indication is $+18\%$, the selection is $+10\%$, the reason is the regulatory cap, and the premium at the filed rate falls about $\$1.82$M a year short of the indication until the gap is closed.

> [!example]- When a Rating Variable Is Prohibited {Example}
> A jurisdiction bans the use of credit-based insurance scores. The insurer's GLM shows the variable is highly predictive: the worst credit tier has a pure premium relativity of $1.62$ against the best.
>
> What happens to the book, and what should the actuary do?
>
> > [!answer]-
> > Removing the variable does not remove the cost difference — it removes the ability to charge for it. Two consequences follow immediately:
> >
> > 1. **Cross-subsidy.** Good-credit insureds are over-charged relative to their expected cost and poor-credit insureds under-charged. In a competitive market the over-charged group is the one with alternatives, so the book drifts toward the under-priced segment and the average loss ratio deteriorates — [[Mix of Business|mix]] change caused by the pricing structure itself.
> > 2. **Rate level.** The overall indication must anticipate that drift. An indication built on the historical mix will be inadequate by the time the new mix arrives.
> >
> > The actuarial responses are to **re-fit the model without the variable** — so that the remaining variables absorb what correlated signal they legitimately can, rather than leaving the effect unmodelled — and to monitor the mix shift explicitly rather than waiting for it to appear as adverse experience.
> >
> > Werner lists the actions a company can take against a regulatory restriction: challenge the regulation legally; revise underwriting guidelines to limit business written at inadequate rates (where the jurisdiction does not require insurers to take all comers); change marketing directives to minimize new applicants whose rates are thought inadequate; and, where a variable is banned or restricted, use a different, allowable rating variable — payment history with the company is Werner's example — that it believes explains some or all of the restricted variable's effect.
