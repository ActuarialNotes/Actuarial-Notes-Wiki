---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b48a97527bfebc844a20d0e1fb0b1145583aacb19055307e5a628945af6bc20
  sources:
    - "Coval, Jurek & Stafford, The Economics of Structured Finance, Harvard Business School Working Paper 09-060 (2008, the authors' institution's copy), printed pp.1-28 read in full (PDF pp.1-37) with Tables 1-3, sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Credit Risk.md
---

**Credit Risk** is the risk of loss because a counterparty fails to pay what it owes (**default**) or because its credit standing deteriorates, lowering the value of the claim before any default occurs. An insurer's credit exposures are its bonds and loans, securitisations, [[Reinsurance Credit Risk|reinsurance recoverables]], premium receivables from agents and brokers, and derivative counterparties.

> $$E[\text{Credit loss}] = PD \times LGD \times EAD$$

- $PD$ is the probability of default over the horizon, $LGD = 1 - \text{recovery rate}$ the share of the exposure lost if default occurs (it depends, among other things, on the collateral), and $EAD$ the amount outstanding at default. As a percentage of exposure, $E[\text{Credit loss}] = PD \times LGD$.
- **Spreads pay for more than expected loss.** Observed credit spreads are many times the expected default loss $PD \times LGD$ — the *credit spread puzzle*. The explanations offered are taxes, risk premia, liquidity premia, and default risk that is hard to diversify because the return distribution of a bond portfolio is highly negatively skewed.
- **On Exam 9.** Task C5 of the Fall 2026 outline reads "Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)": prepayment is named, with default and reinsurance, as an example of the interest rate and credit risk of C5. Prepayment is a borrower repaying principal early, usually when rates fall; see [[Prepayment Risk]].
- **Loss before default.** A deterioration in credit standing widens a bond's credit spread over the risk-free curve and lowers its value before any default (*spread risk*). [[Credit Rating Migration|Rating transition]] matrices give the probabilities of downgrades as well as defaults, so a portfolio's credit risk includes mark-to-market loss, not only default.
- **Correlation is the portfolio risk.** Defaults cluster, so the loss distribution of a credit portfolio is skewed with a heavy tail whose size is set by **default correlation**. This is the central lesson of [[Structured Finance]]: a tranche's rating depends on default correlation as well as on default probability — Coval, Jurek & Stafford's AAA senior tranche falls to A+ at a correlation of 40% and to BBB− at 60% — tranches of tranches (CDO²) are far more sensitive still, and senior claims default in exactly the economic states where investors are worst off.
- **Managing it.** Approved-counterparty lists and exposure limits per counterparty ([[Concentration Risk]]); collateral and letters of credit; credit default swaps. Regulators charge capital for it — the U.S. [[Risk-Based Capital]] formula (R1 for fixed income, which covers both interest rate changes and default; R3 for receivables and reinsurance recoverables) and, in Canada, the [[Credit Risk Margin|credit risk]] requirement of the [[MCT]], whose factors follow the counterparty's rating and are reduced by collateral. Credit risk and [[Interest Rate Risk]] are both [[Financial Risk|financial risks]] of a bond portfolio.

> [!example]- Expected Loss versus Spread on a Corporate Bond {Example}
> An insurer holds $\$50$M of BBB corporate bonds. The one-year probability of default is $0.25\%$, the expected recovery $40\%$, and the bonds yield $1.30\%$ over Treasuries. Compare the expected credit loss with the spread earned.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[\text{loss}] &= 0.0025 \times 0.60 \times \$50\text{M} \\
> > &= \$75{,}000 \\
> > \text{Spread income} &= 0.0130 \times \$50\text{M} \\
> > &= \$650{,}000
> > \end{align*}
> > $$
> >
> > The expected loss is $0.15\%$ a year, so $\$575{,}000$ of the spread is something other than compensation for expected default — the taxes, risk and liquidity premia and undiversifiable default risk of the credit spread puzzle. The spread is not a measure of expected credit loss.

> [!example]- Default Correlation and the Joint Tail {Example}
> Two counterparties each have a one-year default probability of $5\%$. Find the probability that both default if defaults are (a) independent, (b) correlated with default correlation $0.2$. Also find the distribution of the number of defaults.
>
> > [!answer]-
> > For two default indicators with common probability $p$ and correlation $\rho$, $P(\text{both}) = p^2 + \rho\,p(1-p)$.
> >
> > $$
> > \begin{align*}
> > P_{\text{indep}}(\text{both}) &= 0.05^2 \\
> > &= 0.25\% \\
> > P_{\rho}(\text{both}) &= 0.0025 + 0.2(0.05)(0.95) \\
> > &= 1.20\%
> > \end{align*}
> > $$
> >
> > Number of defaults:
> >
> > - Independent: $0$ w.p. $90.25\%$, $1$ w.p. $9.50\%$, $2$ w.p. $0.25\%$
> > - Correlated: $0$ w.p. $91.2\%$, $1$ w.p. $7.6\%$, $2$ w.p. $1.2\%$
> >
> > The expected number of defaults is $0.10$ in both cases, but the chance of losing both counterparties is almost five times higher. Expected loss is blind to correlation; the tail — what capital, a senior tranche, or a two-reinsurer panel is exposed to — is not.
