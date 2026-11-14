---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:388182672129af6f56429947d3dee853fc072abf8d38beb3bf2cb2aa369e1304
  sources:
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Pricing.md
---

**Insurance Pricing** is setting the premium for a policy or a portfolio so that it covers the expected loss, the expenses of writing and servicing it, and a margin that pays the capital providers for the risk they bear. On a *risk-adjusted* basis, business that consumes more capital pays more margin.

With expenses, taxes and investment income set aside, the premium $P$ that earns a target [[Return on Capital|return]] $\iota$ on capital $Q$ is

> $$P = L + \iota\, Q$$

- $L$ is the expected loss, strictly $E[X \wedge a]$, the loss the insurer can actually pay.
- $Q = a - P$ is the capital, where $a$ is the assets.

The [[Insurance Margin|margin]] is $M = P - L$, so the investors' required return on the capital they contribute is met by the margin, $M = \iota Q$. As a percentage of premium it is $M/P$.

Substituting $Q = a - P$ and solving for $P$, the premium is

> $$P = \frac{L + \iota\, a}{1 + \iota}$$

> $$P = \nu L + \delta a$$

- $\nu = 1/(1+\iota)$ and $\delta = \iota/(1+\iota)$, so $\nu + \delta = 1$.

The premium is a weighted average of expected loss and assets, so given $\iota$, $L$ and $a$ the premium is fixed. Equivalently, $P = L + \delta\,(a - L)$.

> [!example]- What risk premium earns a $12\%$ return on a portfolio with expected loss $80$ and assets set at $\text{TVaR}_{0.99} = 150$? {Example}
> - $\delta = 0.12/1.12 = 0.10714$.
> - $P = 80 + 0.10714 \times (150 - 80) = 87.50$.
> - The margin is $M = 87.50 - 80 = 7.50$ and the capital is $Q = 150 - 87.50 = 62.50$.
> - As a check, $M/Q = 7.50/62.50 = 12\%$, so the risk premium is $87.50$.

## Components of a risk-adjusted pricing model

A risk-adjusted pricing model has three ingredients ([[Cost of Capital]], [[Risk Capital]]):

1. The total capital: assets set by a capital [[Risk Measure|risk measure]] such as VaR or TVaR, or by a regulatory or rating-agency standard.
2. The cost of that capital.
3. The allocation of that cost to lines or policies.

## Actuarial and financial pricing

Once product design fixes the loss and the capital standard fixes the assets, one degree of freedom remains. Actuarial pricing sets it through a [[Target Loss Ratio|target loss ratio]], and financial pricing through a target return on capital. They are the same decision seen from two sides ([[Insurance Profitability|insurance profitability]]).

## Portfolio and marginal pricing

[[Risk Loads|Risk loads]] are not additive, so the portfolio premium is set top-down and then allocated. A policy's price depends on the portfolio it joins, through its marginal effect on expected loss and on required capital ([[Risk-Adjusted Pricing|risk-adjusted pricing]]).

> [!example]- What is this new policy's price stand-alone and at its marginal effect on the portfolio? {Example}
> A portfolio is priced to a $12\%$ return, so $\delta = 0.10714$. A new policy has expected loss $1.0$. Written alone it would need assets of $12$. Added to the portfolio it raises TVaR-based assets by only $4$, because its large losses rarely coincide with the portfolio's.
>
> > [!answer]-
> > - Stand-alone, $P = 1.0 + 0.10714 \times (12 - 1.0) = 2.18$, a $46\%$ loss ratio.
> > - At its marginal effect, $P = 1.0 + 0.10714 \times (4 - 1.0) = 1.32$, a $76\%$ loss ratio.
> > - The difference is the diversification the portfolio supplies.

## Expenses and the time value of money

The theory produces a risk premium with no expenses, taxes or investment income. Mildenhall and Major set expenses aside and take the risk-free rate as zero. Practice grosses the premium up for expenses, much as Exam 5 does with [[Expense Provisions|expense provisions]] and the [[Profit and Contingency Provision|profit and contingency provision]], and allows for the time value of money ([[Insurance Cash Flows]], [[Economic Value]]).
