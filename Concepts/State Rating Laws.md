---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:6d386e3e2bf5addc022e6ec7f9188cfd8e627d05e32b4b1db2f2113632a0a435
  sources:
    - "NAIC P&C Model Rating Law (File and Use Version), GL-1775 (Jan 2010), s.5A rate standards, s.6A(1) multiplier/expense constant, sha256:82cbaca64cef6d07d206222e733d6632c607b4ac302a947311f54c93f7864a1e — https://content.naic.org/sites/default/files/GL1775.pdf"
    - "NAIC P&C Model Rating Law (Prior Approval Version), GL-1780 (July 2009), s.5C and drafting note (15 to 90 days), sha256:2ae77bc038564784874e25044d6b9b88d2dd4db1176ecb84269799bae5415bac — https://content.naic.org/sites/default/files/GL1780.pdf"
    - "NAIC State Insurance Chart PA-10, Rate Filing Methods (2026), Definitions of Rating Laws; rows AL, CO, FL, NC, OR, TX, sha256:d479b50c6d65a7a81d2df71eb1e98e72cf2e12af706ec8355e5403b2aa1dad1f — https://content.naic.org/sites/default/files/model-law-chart-pa-10-rate-filing-methods-for-property-casualty-insurance-workers-comp-title.pdf"
    - "Fla. Stat. s.627.062 (2024), (2)(e)1, 3, 5, 6, sha256:c46ceab2aa5de2c5cc384cc16d5eb3b90d743198ea510dc9479f149371be4386 — https://www.flsenate.gov/Laws/Statutes/2024/627.062"
    - "CAS Statement of Principles Regarding P&C Insurance Ratemaking (1988, reinstated 2021), Principle 4, sha256:85fec5eb6e65372a22093082c02a712d8e4ea94b59410b51be2bdb80ee8e449b — https://www.casact.org/sites/default/files/2021-06/Statement%20of%20Principles%20Regarding%20P%26C%20Casualty%20Insurance%20Ratemaking_2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/State Rating Laws.md
---

A **State Rating Law** is a statute under which a U.S. state regulates the property and casualty insurance rates of policies written in that state. It holds every rate to the standard that it be not excessive, not inadequate and not unfairly discriminatory, and it sets the filing method that decides whether an insurer may use a rate before the insurance department has reviewed it. The Canadian counterpart is [[Rate Regulation]].

## Rate standards

Rates shall not be excessive, inadequate or unfairly discriminatory. In the NAIC's file and use model rating law:

1. **Not excessive.** A rate in a competitive market is not excessive. In a noncompetitive market it is excessive if it is likely to produce a profit unreasonably high for the insurance provided, or if expenses are unreasonably high for the services rendered.
2. **Not inadequate.** A rate is inadequate if it is clearly insufficient to sustain projected losses, expenses and special assessments, and its use substantially lessens competition or tends to create a monopoly. An optional version ties inadequacy to endangering the insurer's solvency instead. A rate too low to cover expected losses and expenses fails this standard, however much it helps buyers today.
3. **Not unfairly discriminatory.** Unfair discrimination exists if, after allowing for practical limitations, price differences fail to reflect equitably the differences in expected losses and expenses.

A rate must consider past and prospective loss experience within and outside the state, catastrophe hazards, a reasonable margin for profit and contingencies with all investment income on the line taken into account, dividends to policyholders, and expenses. Risks may be grouped in classifications by any difference shown to have a probable effect on losses or expenses. No classification may be based on race, creed, national origin or religion.

The actuarial version of the same test is that a rate meets all three standards if it is an actuarially sound estimate of the expected value of all future costs of the risk transfer.

> [!example]- Under a statute worded like Florida's, which standard does each of these four rates fail? {Example}
> 1. A rate plan, with investment income counted, is clearly insufficient to sustain projected losses and expenses in the class.
> 2. A discount far larger than the expense savings and expected loss experience of the discounted risks justify.
> 3. A surcharge that bears no reasonable relationship to the expected loss and expense experience of the surcharged risks.
> 4. In a noncompetitive market, rates likely to produce an unreasonably high profit for the risk involved.
>
> > [!answer]-
> > - (1) is inadequate.
> > - (2) is inadequate as to the premium charged the discounted risks, because the discount exceeds what their expenses and losses justify.
> > - (3) is unfairly discriminatory, because the surcharge doesn't track differences in expected losses and expenses.
> > - (4) is excessive. Under the NAIC file and use model a rate in a competitive market is not excessive, so this test applies only where the market is not competitive.

## Filing methods

The filing method ranges from state-made rates to no filing at all:

| Method | When the insurer may use the rate |
| :--- | :--- |
| State-made or bureau rates | The state sets the rate, or a rate bureau files it for prior approval |
| Prior approval | After the department approves the filing |
| Modified prior approval | After approval for a change in the expense ratio or rate relativities; a change based on experience alone is file and use |
| Flex rating | At once for a change inside the band; after approval for a change outside it |
| File and use | As soon as it is filed, without waiting for approval |
| Use and file | Before filing; it is filed within a set period after it takes effect |
| No file | Without filing; the insurer keeps the experience and other information behind it for the commissioner |

Under prior approval, approval can come through a *deemer* provision, under which a filing is approved unless denied within a set number of days. Existing state waiting periods range from 15 to 90 days. A filing that is not denied within the deemer period is treated as approved, but it may not be used before then. Under file and use, the department may disapprove a rate later.

Under flex rating, prior approval is required only for a change of more than a set percentage above, and sometimes below, the rates on file. Oregon, for example, applies flex rating to commercial casualty with a 15% band.

States call the competitive systems by different names. Colorado regulates most lines by "open competition", with rates filed and used unless the commissioner finds them excessive or destructive of solvency. At the other extreme, the Texas commissioner sets title insurance rates and the Florida department sets title rates. In North Carolina residential property, private passenger auto and workers compensation rates are filed by a rate bureau for prior approval.

The method often depends on the line. Alabama uses prior approval for personal lines, workers compensation and medical malpractice, file and use for other commercial lines, and prior approval again for any filing seeking an overall increase of 10% or more. The NAIC's chart of rate filing methods (PA-10) records each state's rules by line.

> [!example]- Which of these four Oregon filings need prior approval? {Example}
> In Oregon, commercial casualty rates are under flex rating with a 15% band, workers compensation rates need prior approval (30 days), and other property and casualty lines are file and use. An insurer plans:
>
> 1. A 9% increase in commercial general liability.
> 2. An 18% decrease in general liability rates for contractors.
> 3. A 4% workers compensation increase.
> 4. A 12% homeowners increase.
>
> > [!answer]-
> > - (1) does not. It is commercial casualty, and 9% is inside the 15% band.
> > - (2) does. Oregon's band applies to decreases as well as increases, and 18% exceeds it.
> > - (3) does. Workers compensation needs prior approval however small the change.
> > - (4) does not. Homeowners is file and use, so the insurer files and may use the rate, though the department can still disapprove it.

## Loss cost filings

Under the NAIC's model rating laws an insurer may file its final rates, or file a multiplier $m$ and, if applicable, an expense constant $e$ to apply to the prospective loss cost $LC$ that an advisory organization has filed for it. The rate is then

> $$R = m \cdot LC + e$$

> [!example]- An advisory organization's loss cost is $\$400$, and an insurer files a multiplier of $1.40$ and an expense constant of $\$25$. What rate does it charge? {Example}
> - The rate is $R = 1.40 \times 400 + 25 = \$585$.
> - The advisory organization supplies the loss cost, and the insurer's own multiplier and expense constant load it for the insurer's expenses and profit.

> [!trap] Mixing up file and use with use and file
> File and use files the rate before it is used. Use and file files it after. Neither waits for approval, while a prior approval filing under a deemer still waits out the deemer period.
