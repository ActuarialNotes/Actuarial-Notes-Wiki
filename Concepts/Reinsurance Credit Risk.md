---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9f5612c6d2753185f2c08abd8c6c7b950ab2a87dd271336fc04a4b4f37442353
  sources:
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
    - "Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
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
