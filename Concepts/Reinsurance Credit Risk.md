---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5f9a049a7b957c30ebb76d04663d2f3c42515cf14ba4f5362ae13f4b53e3ca8f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reinsurance Credit Risk.md
---

**Reinsurance Credit Risk** is the risk that a reinsurer fails to pay, in full or on time, the recoverables it owes under its [[Reinsurance|reinsurance]] contracts — through insolvency, dispute or slow payment — while the cedant remains fully liable to its own policyholders. It turns part of the insurance risk a cedant has shed back into [[Credit Risk|credit risk]] against its reinsurers.

> $$E[\text{Credit loss}] = \sum_j PD_j \times LGD_j \times EAD_j$$

> $$EAD_j = \max\bigl(R_j - \text{Collateral}_j,\; 0\bigr)$$

- $R_j$ is everything due from reinsurer $j$ — ceded paid losses not yet collected, ceded case and IBNR reserves, and ceded unearned premium — and collateral is funds withheld, trust accounts or letters of credit the cedant can draw on. $PD_j$ is the reinsurer's default probability over the whole collection period, not one year.
- **What makes it distinctive.**
  - **Long horizon.** Recoverables on long-tailed and excess layers are collected years after the cession, because [[Ceded Losses|ceded losses]] develop later than gross; the reinsurer's credit quality can migrate a long way in that time.
  - **Wrong-way risk.** The largest recoverables arise from catastrophes that also strike reinsurers' own books, so a reinsurer is most likely to fail exactly when it owes the most.
  - **Concentration.** Programmes are placed with a handful of reinsurers ([[Concentration Risk]]).
  - **Disputes.** Coverage disagreements and slow payment cause losses without any insolvency.
- **Exposure depends on the contract.** Across the [[Types of Reinsurance|types of reinsurance]], a quota share generates a steady stream of recoverables on every claim, while excess and catastrophe covers concentrate them in a few large, late or event-driven recoveries — see [[Reinsurance Recovery]].
- **Regulatory recognition.** In the U.S., [[Schedule F]] of the statutory annual statement computes a **provision for reinsurance**, a liability charged against surplus, for recoverables from reinsurers that are not authorized in the cedant's state and not adequately secured, and for recoverables that are overdue or in dispute; [[Risk-Based Capital]] adds a credit charge on recoverables. In Canada the [[MCT]] applies [[Credit Risk Margin|credit risk factors]] to recoverables, and cessions to [[Unregistered Reinsurance|unregistered reinsurers]] earn capital credit only against collateral ([[Registered Reinsurance]]).
- **Managing it.** Select counterparties by [[Rating Agency|rating]] and financial strength; set limits by reinsurer; require collateral; include downgrade (special termination) clauses that let the cedant cancel or demand security if a reinsurer is downgraded; settle long-dated recoverables early by [[Commutations|commutation]]; and use fully collateralised capacity such as [[CAT Bonds]], which removes counterparty risk at the cost of basis risk.

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
> > Treating the default as independent of the catastrophe understates the expected credit loss tenfold. Given the event, the expected shortfall is $0.10 \times 0.50 \times 200 = \$10$M — arriving exactly when the cedant is weakest, which is why panels are spread across reinsurers with different catastrophe exposures and why collateralised capacity is valued above its expected-loss arithmetic.
