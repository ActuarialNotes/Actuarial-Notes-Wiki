---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:3b36ffc7ff6c5723c1e65cc4515ad4846e0733e4661adfa99b88b782d6d27349
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "IRMI Insurance Definitions, treaty reinsurance, definition (cedant agrees to cede classes; reinsurer accepts all qualifying business; cedant assured its risks are reinsured), Types of Treaty Reinsurance, sha256:895c96d7bd919d52198d86e98bc4109e0d09b9088b2d33c8a3370fe87802ed9a — https://www.irmi.com/term/insurance-definitions/treaty-reinsurance"
    - "Singapore Reinsurers' Association, Glossary of Reinsurance Terms, entries Automatic Treaty, Facultative Reinsurance (proportional and excess of loss; faculty to accept or reject), Obligatory Treaty, sha256:b953321c537f6d447ae917f92e3e6e2315942bd5ce2e76aedffb5f6bdedf45aa — https://sg-reinsurers.org.sg/glossary-reinsurance-terms"
    - "Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Treaty Reinsurance.md
---

**Treaty Reinsurance** is reinsurance of a defined portfolio (a line, a class or a whole book) under one agreement, typically for a year. The cedant agrees to cede the classes of business the treaty covers, and the reinsurer agrees to accept all business qualifying under it, so the contract is priced on the portfolio as a rate on subject premium.

The treaty premium is

> $$\text{Treaty premium} = \text{Rate} \times \text{Subject premium}$$

- $\text{Rate}$ is the treaty rate, the loss cost divided by the reinsurer's expected loss ratio.
- $\text{Subject premium}$ is the premium on the business the treaty covers, net of any reinsurance that *inures* to it (a surplus share, facultative certificates) but gross of the treaty being priced.

Subject premium is called GNEPI (gross net earned premium income) on a losses-occurring basis and GNWPI (gross net written premium income) on a risks-attaching basis. Because the premium is a rate on subject premium, it rises automatically if the cedant writes more business.

The loss cost is the expected ceded loss as a share of subject premium:

> $$\text{Loss cost} = \frac{E[\text{Ceded loss}]}{\text{Subject premium}}$$

It is estimated by experience rating (the treaty's own or "as-if" history, developed, trended and brought to current rate level) and by exposure rating (the current risk profile, through [[Exposure Curves|exposure curves]] or [[Increased Limits|ILFs]]). The two are blended with [[Credibility|credibility]] ([[Reinsurance Pricing]]).

> [!example]- What are the treaty rate and premium for this per-risk excess treaty? {Example}
> A cedant's projected gross earned premium is $\$30$ million. A surplus share that inures to its per-risk excess treaty cedes $\$10$ million of it. For the per-risk layer, experience rating indicates a loss cost of 7.5% with credibility $Z = 0.4$, and exposure rating indicates 9.0%. The reinsurer prices to a 75% expected loss ratio.
>
> > [!answer]-
> > - The subject premium is net of the inuring surplus share, so GNEPI is $30 - 10 = \$20$ million.
> > - The loss cost is $0.4(7.5\%) + 0.6(9.0\%) = 8.4\%$.
> > - The rate is $8.4\% / 0.75 = 11.2\%$.
> > - The expected ceded loss is $0.084 \times 20 = \$1.68$ million.
> > - The treaty premium is $0.112 \times 20 = \$2.24$ million.

Any structure can be written as a treaty: [[Quota Share|quota share]], [[Surplus Share|surplus share]], per-risk or per-occurrence [[Excess of Loss|excess of loss]], and [[Aggregate Excess of Loss|aggregate excess of loss]].

## Treaty and facultative reinsurance

The cedant is assured that every risk within the treaty's terms is reinsured. The reinsurer accepts business it has not underwritten risk by risk, so it shares the results of the cedant's underwriting. In theory it "follows the fortunes" of the cedant, but in practice the two results can differ a great deal, which is why treaties carry [[Reinsurance Contract Provisions|adjustable provisions]].

In [[Facultative Reinsurance|facultative reinsurance]], each risk is offered, underwritten and priced on its own, and the reinsurer may decline it.

## Losses occurring and risks attaching

A *losses-occurring* treaty covers losses that occur during the treaty period, whenever the policy incepted. It is priced on earned premium and [[Accident Year|accident-year]] losses. A *risks-attaching* treaty covers losses on policies written during the period, which can occur up to a policy term after the treaty expires. It is priced on written premium and [[Policy Year|policy-year]] losses, which emerge later and develop longer.

Under a risks-attaching *catastrophe* cover, one event on 3/15/2026 hits policies written in 2025 and in 2026, so both treaty years respond and the reinsurer could pay two limits. An *interlocking clause* apportions such an event between the contracts.

> [!example]- Which of these losses does a 2026 calendar-year treaty cover if it is losses occurring, and which if it is risks attaching? {Example}
> The cedant writes annual policies.
>
> | Loss | Policy effective | Loss date |
> | :--- | :--- | :--- |
> | A | 7/1/2025 | 3/1/2026 |
> | B | 1/1/2026 | 6/1/2026 |
> | C | 10/1/2026 | 5/1/2027 |
>
> > [!answer]-
> > - A losses-occurring treaty looks at the loss date, so the 2026 treaty covers A and B. Loss C falls to the 2027 treaty.
> > - A risks-attaching treaty looks at the policy's effective date, so the 2026 treaty covers B and C. Loss A belongs to the 2025 treaty.

> [!trap] Gross premium as subject premium
> Subject premium is net of the reinsurance that inures to the treaty. In the example above, applying the 11.2% rate to the $\$30$ million gross premium gives $\$3.36$ million, overcharging for $\$10$ million of business the surplus share has already ceded.
