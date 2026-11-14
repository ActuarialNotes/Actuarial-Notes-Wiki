---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-16
  last_checked_by: agent:validate-v1
  content_hash: sha256:6023e135ef51045fe4b9a5dbc02026b483275b95f80ea1e81604432fa39c3208
  sources:
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates (1994), eqs. (3)-(5), pp.107-113 (PDF pp.7-13), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf"
    - "Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), pp.809-819 (PDF pp.3-13): assumptions, testable implications, Implication 1, alternative emergence patterns, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf"
    - "Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Assumptions.md
---

An **Actuarial Assumption** is a statement about the future, explicit or implicit, on which an actuary's method or model rests. In estimating [[Unpaid Claims|unpaid claims]], the assumptions include those built into each [[Loss Reserving|reserving method]], such as that past development patterns will repeat and that accident years are independent, and the parameters chosen to apply it, such as development factors, a [[Tail Factor|tail factor]], an expected loss ratio or a trend rate.

[[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)|Mack (1994)]] shows the [[Chain Ladder Method|chain ladder]] makes three assumptions implicitly. The first is that the expected cumulative loss $C_{i,k+1}$ of accident year $i$ is the current cumulative loss $C_{ik}$ times a development factor $f_k$ common to all years. Given the losses to date, that expected loss is

> $$E\left[C_{i,k+1} \mid C_{i1}, \dots, C_{ik}\right] = C_{ik}\,f_k$$

- $k$ is the development age.

The other two are independence of accident years and a variance proportional to $C_{ik}$. Together the three make up the [[Mack Chain Ladder Model]].

## Reasonableness of assumptions

[[ASOP 43 - Property Casualty Unpaid Claim Estimates (ASB - 2007)|ASOP 43]] §3.6.2 has the actuary consider the reasonableness of the assumptions underlying each method or model. Assumptions may be implicit or explicit, and may interpret past data or project future trends. They should have no known significant bias to underestimation or overestimation of the intended measure, and should not be internally inconsistent.

The actuary should consider the sensitivity of the estimate to reasonable alternative assumptions. When the effect would be material, the actuary should notify the principal and attempt to discuss it. Changes in assumptions with a material impact on an updated estimate are disclosed, with the reasons for them.

> [!example]- How much does the choice of tail factor move this unpaid claim estimate? {Example}
> Cumulative reported losses at the last age in the triangle total $\$50{,}000$K across accident years. The rest of the unpaid claim estimate, case reserves and IBNR to that age, is $\$18{,}500$K. The actuary selects a tail factor of $1.03$, and a tail of $1.06$ is also reasonable.
>
> > [!answer]-
> > - With the selected tail, the tail IBNR is $50{,}000 \times 0.03 = \$1{,}500$K, and the unpaid claim estimate is $\$20{,}000$K.
> > - With the alternative, the tail IBNR is $50{,}000 \times 0.06 = \$3{,}000$K, and the estimate is $\$21{,}500$K.
> > - The choice moves the estimate by $\$1{,}500$K, which is $7.5\%$.

## Testing assumptions

An implicit assumption can be tested against the data it was fitted to. [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)|Venter (1998)]] turns the [[Chain Ladder Assumptions|chain ladder's assumptions]] into testable implications:

1. Significant factors.
2. Linearity.
3. Stability.
4. No [[Development Factor Correlation Test|correlation between development factors]].
5. No [[Calendar Year Effect|calendar-year effects]].

Residual diagnostics, such as [[Residual Plot|residual plots]], tests for [[Heteroscedasticity|heteroscedasticity]] and for normality, test the assumptions of a stochastic model such as the [[ODP Bootstrap Model|ODP bootstrap]].

A failed test points to the assumption to change, not only to a wider range. Venter's alternatives to the chain ladder, such as a constant added to the factor, [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]], each replace the chain ladder's assumption about expected emergence with a different emergence pattern.

> [!example]- Does this development factor pass Venter's significance test? {Example}
> Incremental reported loss from $12$ to $24$ months is regressed on cumulative loss at $12$ months across accident years, with no constant. The estimated factor, the age-to-age factor less $1$, is $0.35$ with a standard deviation of $0.20$.
>
> > [!answer]-
> > - Venter requires the absolute value of a factor to be at least twice its standard deviation, which is $2 \times 0.20 = 0.40$.
> > - The factor $0.35$ is less than $0.40$, so it is not significantly different from zero.
> > - The chain ladder's assumption that the next period's development is proportional to the losses to date is not supported for this column.
> > - Venter treats this as a level of comfort rather than a strict statistical test. The next step is to try the alternatives, such as a factor plus a constant or a Bornhuetter-Ferguson form, and compare their fit.
