---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f58d6ec7b3c436eb167bc55f69fea54e95069b032e63f01e2a497629aae0d8e1
  sources:
    - "Froot, Risk Management, Capital Budgeting and Capital Structure Policy for Insurers and Reinsurers (NBER WP 10184, 2003), pp.2-10, 16, sha256:0de3a439eb286ea2a5ed225fcfa4cbb2ed62d964dc2485dbb79239dabfb6383e — https://www.nber.org/system/files/working_papers/w10184/w10184.pdf"
    - "Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Graham & Smith, Tax Incentives to Hedge (J. Finance 54(6), 1999), RePEc abstract record, abstract, sha256:f1b793f26ddc2edd92e073f09a0d27fc90905875865d1cd8825a5ced49823d39 — https://ideas.repec.org/a/bla/jfinan/v54y1999i6p2241-2262.html"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "D'Arcy, Capital Allocation in the Property-Liability Insurance Industry (Variance 5:2), pp.141-146 (PDF pp.1-6), sha256:e7a4dc616cf02bf9721fd906a35cdd3c2a017ae92921b058a6a932555c955612 — https://www.casact.org/sites/default/files/2021-07/Capital-Allocation-Darcy.pdf"
    - "Erel, Myers & Read, A Theory of Risk Capital (JFE-2013-0394 revised, Oct 2013), abstract p.1; p.7 (Merton and Perold's definition of risk capital), sha256:1fb728de691bf9eed3c3443629227c8c0b6040fb83145ef2690f4a0c5ed815cf — https://web.actuaries.ie/sites/default/files/erm-resources/a_theory_of_risk_capital.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR 3(1), 2000), abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
    - "Froot, Scharfstein & Stein, Risk Management: Coordinating Corporate Investment and Financing Policies, NBER WP 4084 (1992), PDF p.5 (risk management at the interface of investment and financing; Lessard on funding growth options such as R&D when external capital is costly), p.13 fn. (intangibles such as R&D have no value in liquidation) (OCR), sha256:1e9b795ecb03d60a0027b3c19faf67cee69a726718d6da0c4785349ef9c29bcd — https://www.nber.org/system/files/working_papers/w4084/w4084.pdf"
    - "CAS Exam 7 Spring 2012 - exam and sample answers, Q21(c) PDF pp.25, 86 (firms with higher market-to-book or R&D: capital-intensive, long payout, unstable cash flow, few tangible assets, costlier distress and capital), sha256:e38b20bb58b4c7dbd208b14d350fe3c9c6bc48b789aef61118d8cdae0566582a — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam7_12-7.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Market Imperfections.md
---

An **Insurance Market Imperfection** is a departure from a frictionless (Modigliani–Miller) market, such as taxes, costs of financial distress, agency conflicts, asymmetric information, competition, regulation or costly external capital, that makes capital expensive for an insurer to hold and to raise. Imperfections are why insurers behave as if they were risk-averse, why [[Reinsurance|reinsurance]] and hedging can add value, and why an insurance price must carry a margin beyond the market price of risk.

With imperfections, the premium $P$ is

> $$P = \text{PV}(E[L]) + \text{Expenses} + \text{Risk premium} + \text{Frictional costs}$$

- $\text{PV}(E[L])$ is the present value of the expected losses.
- The risk premium is the market's charge for systematic risk.
- The frictional costs depend on the insurer's total risk and on how much capital it holds. They are the [[Cost of Capital|cost of capital]] charged on [[Risk Capital|risk capital]].

In a perfect market the premium would stop at the first three terms, since diversifiable risk is free.

## Sources of imperfections

1. **Taxes.** Investment income on capital held inside an insurer is taxed at the corporate level before shareholders receive it, a cost investors avoid by holding the same assets directly. For most firms the tax function is also convex, because losses cannot always be offset in full or in time. Volatile income therefore raises the expected tax bill, and hedging lowers it.
2. **Financial distress.** Policyholders are customers who, unlike investors, find it costly to diversify their insurer's default risk. They pay less for, or buy less from, a weaker insurer. Higher-[[Rating Agency|rated]] insurers get higher premiums and grow faster, and a failing insurer leaves its customers cancelling policies, pursuing claims and finding new cover. The cost reaches future business through reputation as well as the business in place.
3. **Agency costs.** Managers may spend surplus capital on low-return growth or acquisitions instead of returning it. Shareholders, protected by limited liability, gain from taking more asset or underwriting risk once premiums are collected, at the policyholders' expense.
4. **Asymmetric information.** Outsiders know less than management about reserve adequacy and exposure, so new equity raised after a large loss is sold at a discount, if at all. When external capital is costly, the firm should act risk-averse toward risks it cannot hedge (the Froot–Stein argument). On the underwriting side the same problem appears as [[Adverse Selection|adverse selection]] and [[Moral Hazard|moral hazard]].
5. **Competition.** The market is very competitive, and competing classification plans make the winning quote biased low (the winner's curse). That justifies a margin over expected loss even when the estimates are unbiased. When capacity is plentiful, insurers cut prices relative to competitors to buy market share, and an insurer that misallocates its capital writes unprofitable business and loses profitable business to competitors.
6. **Regulation.** Minimum capital standards ([[Risk-Based Capital|risk-based capital]], the [[MCT]]) and rate regulation impose costs of their own. A regulatory or rating-agency capital model is often the binding constraint on how much capital the insurer holds.

> [!example]- What is this hedge worth to the insurer? {Example}
> An insurer's pre-tax income next year is $-\$100$M or $+\$300$M with equal probability. Tax is $21\%$ of positive income, and a loss earns no tax credit. A hedge at no cost would fix pre-tax income at its mean of $\$100$M.
>
> > [!answer]-
> > - Unhedged, the expected tax is $0.5 \times 0 + 0.5 \times 0.21 \times 300 = \$31.5$M.
> > - Hedged, the tax is $0.21 \times 100 = \$21.0$M.
> > - Expected after-tax income rises from $\$68.5$M to $\$79.0$M.
> > - The hedge is worth $\$10.5$M a year, although it leaves pre-tax income unchanged on average. Without convex taxes it would be worth nothing.

## Firms that gain most from risk management

When external finance is costly, hedging is worth most to the firms whose investment it protects. Froot, Scharfstein and Stein, quoting Lessard, put its strongest case as ensuring a firm can fund the exercise prices of its growth options, such as its R&D budget, when raising outside capital after a shortfall would be costly. Firms with many growth opportunities, shown by high market-to-book ratios or heavy R&D spending, have few tangible assets of value in liquidation. Financial distress costs them more, so risk management adds more value to them than to other firms.

## Consequences for insurers

Insurers price in a cost of capital, diversify, buy reinsurance at more than its expected loss and manage their [[Financial Risk|financial risk]]. After a catastrophe they find capital scarce and prices rising, which is the hard-market side of the underwriting cycle.

> [!example]- An insurer buys catastrophe cover priced at about twice its expected recovery. Does that only transfer value to the reinsurer? {Example}
> - In a frictionless market it would. Shareholders could diversify the catastrophe risk themselves, and paying a margin to shed it destroys value.
> - After a major event the insurer would have to raise equity when its information disadvantage is greatest and every competitor is raising at once, at a steep discount or not at all.
> - A large net loss risks a downgrade, the flight of default-averse policyholders and the loss of renewal franchise value. A shareholder's own diversification recovers none of these.
> - The cover lowers required capital, and capital is costly to hold.
> - A catastrophe year wastes tax shields that a smoothed result would use.
> - The premium always exceeds the expected loss, since the reinsurer faces frictional costs too. The cover adds value when the margin paid is smaller than the frictional costs it removes, which is the comparison [[Financial Risk Management|financial risk management]] makes.
