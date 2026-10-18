---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9f5612c6d2753185f2c08abd8c6c7b950ab2a87dd271336fc04a4b4f37442353
  sources:
    - "Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf"
    - "Pastor, A Statistical Simulation Approach for Estimating the Reserve for Uncollectible Reinsurance (CAS Forum, Fall 2003), pp.306-309 (PDF pp.2-5): uncollectible reinsurance has caused cedant insolvencies; defaults from disputes and inability to pay; catastrophes and market conditions weakening many reinsurers and the cedant together; correlation of failures between reinsurers and over time; timing of recoveries (property sooner, excess WC years later); commutation; Schedule F provision for overdue authorized and unauthorized reinsurance; offsets (funds withheld, LOCs), sha256:55099f51f2acfa78cae67cbc9364ae8dda2cdbce940be3f6405577550d87c01d — https://www.casact.org/sites/default/files/database/forum_03fforum_03ff305.pdf"
    - "Bodoff, Discarding Risk Avoidance and Embracing Risk Optimization: Managing Reinsurance Credit Risk (CAS E-Forum, Winter 2011), pp.1-3: definition; approved reinsurer lists, exposure limits per reinsurer, collateral and letters of credit; deterioration after inception on long-tail lines; credit default swaps, sha256:75501990bd6888e036e7c52a00dbb2408a9833da87f0112fec6ffb8a47a3c2ac — https://casact.org/sites/default/files/database/forum_11wforum_bodoff.pdf"
    - "OSFI, Minimum Capital Test Guideline (2024), §4.3.2.2 registered reinsurance risk factors, §4.3.3 unregistered reinsurers (deduction net of acceptable collateral, 20% margin), Ch. 6 Credit Risk (definition, counterparties, rating-based factors, collateral), sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "BCBS, An Explanatory Note on the Basel II IRB Risk Weight Functions (BIS, July 2005), §2, pp.3-4 (EL = PD * EAD * LGD; PD, EAD, LGD defined; LGD depends on collateral), sha256:387f8627a148dbd0a6eff3c5a0a020e44044051d3d8f34f0485b8297f49b503d — https://www.bis.org/publications/explanatory-note-basel-ii-irb-risk-weight-functions.pdf"
    - "Lakdawalla & Zanjani, Catastrophe Bonds, Reinsurance, and the Optimal Collateralization of Risk-Transfer (NBER WP 12742, Dec 2006), abstract (PDF p.2: full collateralization; protects insureds from insurer default), PDF p.9 (indemnity triggers avoid basis risk), PDF p.20 conclusions (basis risk faced by issuers), sha256:0bac6e3c4dbbc4de716529e6f08676f9459db04467462b1dc3ba03d2f6c8fcc2 — https://www.nber.org/system/files/working_papers/w12742/w12742.pdf"
    - "AIG supplemental letter to the SEC on Form S-1 / Form 10-K 2005 (May 2, 2006), attachment, response to SEC question 7: 28% of Transatlantic's in-force reinsurance contracts let the ceding company cancel upon a ratings downgrade, sha256:1e083fd25e84b1d213900960452037ca4278a00cc75d1ca35d088e8363ae6fc3 — https://aig.gcs-web.com/node/51781/html"
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Credit Risk.md
---

**Reinsurance Credit Risk** is the risk that a reinsurer fails to pay, in full or on time, the recoverables it owes under its [[Reinsurance|reinsurance]] contracts — through insolvency, dispute or slow payment — leaving the cedant to bear the loss itself; inability to collect reinsurance has driven cedants into insolvency. It turns part of the insurance risk a cedant has shed back into [[Credit Risk|credit risk]] against its reinsurers.

> $$E[\text{Credit loss}] = \sum_j PD_j \times LGD_j \times EAD_j$$

> $$EAD_j = \max\bigl(R_j - \text{Collateral}_j,\; 0\bigr)$$

- $R_j$ is everything due from reinsurer $j$ — ceded paid losses not yet collected, ceded case and IBNR reserves, and ceded unearned premium — and collateral is funds withheld, trust accounts or letters of credit the cedant can draw on. $PD_j$ is the reinsurer's default probability over the whole collection period, not one year.
- **What makes it distinctive.**
  - **Long horizon.** Recoverables on long-tailed and excess covers (an excess workers compensation treaty, say) may be collected years after the cession, while property recoverables are collected sooner. A reinsurer vetted at inception can deteriorate before its share of the [[Ceded Losses|ceded losses]] is due.
  - **Wrong-way risk.** The catastrophes and market conditions that create large recoverables also weaken reinsurers — many of them at once — and the cedant itself, so reinsurer failures are correlated with each other, over time, and with the need to collect.
  - **Concentration.** Recoverables can be concentrated with one reinsurer ([[Concentration Risk]]), which is why cedants limit their exposure to each.
  - **Disputes.** A reinsurer may refuse to pay because it disagrees on coverage or amount, not only because it cannot pay; disputes and slow payment cause losses without any insolvency.
- **Exposure depends on the contract.** Across the [[Types of Reinsurance|types of reinsurance]], a quota share generates a steady stream of recoverables on every claim, while excess and catastrophe covers concentrate them in a few large, late or event-driven recoveries — see [[Reinsurance Recovery]].
- **Regulatory recognition.** In the U.S., [[Schedule F]] of the statutory annual statement computes a **provision for reinsurance**, a liability whose change is charged directly to surplus, for recoverables from reinsurers that are not authorized in the cedant's state and not adequately secured, and for recoverables that are overdue or in dispute; [[Risk-Based Capital]] adds a credit charge on recoverables. In Canada the [[MCT]] applies [[Credit Risk Margin|credit risk factors]] to recoverables, and cessions to [[Unregistered Reinsurance|unregistered reinsurers]] earn capital credit only against collateral ([[Registered Reinsurance]]).
- **Managing it.** Select counterparties by [[Rating Agency|rating]] and financial strength (an approved list); set limits by reinsurer; require collateral or letters of credit; include clauses that let the cedant cancel the contract if the reinsurer's rating is downgraded; settle long-dated recoverables early by [[Commutations|commutation]], trading future coverage for certain cash; and use fully collateralised capacity such as [[CAT Bonds]], which protects the cedant from the reinsurer's default, though a bond on a trigger other than the cedant's own losses leaves it basis risk.

> [!example]- Expected Credit Loss on a Reinsurance Panel {Example}
> A cedant's recoverables ($\$$M), with default probabilities over the expected collection period:
>
> - **Reinsurer A** (AA): recoverable $40$, no collateral, $PD = 0.5\%$, $LGD = 50\%$
> - **Reinsurer B** (BBB): recoverable $25$, no collateral, $PD = 3\%$, $LGD = 60\%$
> - **Reinsurer C** (unrated captive): recoverable $20$, trust fund $15$, $PD = 10\%$, $LGD = 80\%$
>
> Compute the expected credit loss.
>
> > [!answer]-
> > Reinsurer C's exposure is $\max(20 - 15, 0) = 5$.
> >
> > $$
> > \begin{align*}
> > EL_A &= 0.005 \times 0.50 \times 40 \\
> > &= 0.10 \\
> > EL_B &= 0.03 \times 0.60 \times 25 \\
> > &= 0.45 \\
> > EL_C &= 0.10 \times 0.80 \times 5 \\
> > &= 0.40
> > \end{align*}
> > $$
> >
> > Total expected credit loss is $\$0.95$M on $\$85$M of recoverables, about $1.1\%$. Without its trust fund, C alone would cost $0.10 \times 0.80 \times 20 = \$1.6$M — collateral is doing most of the work on the weakest counterparty, while the unsecured BBB reinsurer is now the largest source of expected loss.

> [!example]- Wrong-Way Risk on a Catastrophe Cover {Example}
> A catastrophe treaty would pay $\$200$M in a 1-in-100-year event. The reinsurer's unconditional annual default probability is $1\%$, but its default probability given that event is $10\%$. $LGD = 50\%$. Compare the expected credit loss using each default probability.
>
> > [!answer]-
> > The recoverable exists only if the event happens, so the relevant default probability is the conditional one:
> >
> > $$
> > \begin{align*}
> > EL_{\text{naive}} &= 0.01 \times 0.01 \times 0.50 \times 200 \\
> > &= \$0.01\text{M} \\
> > EL_{\text{conditional}} &= 0.01 \times 0.10 \times 0.50 \times 200 \\
> > &= \$0.10\text{M}
> > \end{align*}
> > $$
> >
> > Treating the default as independent of the catastrophe understates the expected credit loss tenfold. Given the event, the expected shortfall is $0.10 \times 0.50 \times 200 = \$10$M — arriving when the same event has also struck the cedant.
