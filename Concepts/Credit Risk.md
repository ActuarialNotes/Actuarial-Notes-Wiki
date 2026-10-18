---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b48a97527bfebc844a20d0e1fb0b1145583aacb19055307e5a628945af6bc20
  sources:
    - "BCBS, An Explanatory Note on the Basel II IRB Risk Weight Functions (BIS, July 2005), §2, pp.3-4 (EL = PD * EAD * LGD; PD, EAD, LGD defined; LGD depends on collateral), sha256:387f8627a148dbd0a6eff3c5a0a020e44044051d3d8f34f0485b8297f49b503d — https://www.bis.org/publications/explanatory-note-basel-ii-irb-risk-weight-functions.pdf"
    - "BIS Quarterly Review, December 2003, Amato & Remolona, The credit spread puzzle, pp.51-53 (PDF pp.56-58), Table 1 (spreads many times expected default loss; taxes, risk premia, liquidity premia; negatively skewed returns hard to diversify; transition matrix with downgrades and defaults), sha256:e3b7518fe973471144d23ade36aac097a96d02921c12b8e320f20eb4d04269f8 — https://www.bis.org/publications/qr-200312_1.pdf"
    - "Directive 2009/138/EC (Solvency II), EUR-Lex, Art. 13(32) credit risk, 13(35) concentration risk, Art. 105(5)(a) interest rate risk, 105(5)(d) spread risk, 105(6) counterparty default risk (reinsurance arrangements, securitisations, derivatives, receivables from intermediaries; collateral), sha256:ad77288b3961fb0425f2e8db221ecc9706975bf72c37d7d3adcf8f0df62f702e — https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32009L0138"
    - "OSFI, Minimum Capital Test Guideline (2024), §4.3.2.2 registered reinsurance risk factors, §4.3.3 unregistered reinsurers (deduction net of acceptable collateral, 20% margin), Ch. 6 Credit Risk (definition, counterparties, rating-based factors, collateral), sha256:d24a1551e11bac611332379a895a9001c80ce749975b5fe4abfb203170efd5bf — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf"
    - "Bodoff, Discarding Risk Avoidance and Embracing Risk Optimization: Managing Reinsurance Credit Risk (CAS E-Forum, Winter 2011), pp.1-3: definition; approved reinsurer lists, exposure limits per reinsurer, collateral and letters of credit; deterioration after inception on long-tail lines; credit default swaps, sha256:75501990bd6888e036e7c52a00dbb2408a9833da87f0112fec6ffb8a47a3c2ac — https://casact.org/sites/default/files/database/forum_11wforum_bodoff.pdf"
    - "Coval, Jurek & Stafford, The Economics of Structured Finance (HBS Working Paper 09-060, 2008, the authors' institution's copy), pp.7-8 and fn.1 (default correlation), pp.14-15 and Table 3 p.34 (senior CDO tranche AAA at rho=20%, A+ at 40%, BBB- at 60%; CDO2 senior claims far more sensitive), pp.18-19 (systematic risk; defaults in the worst economic states), sha256:887b5c53aeb5367b127322c6972a1c41176e96dc613bc52eee296002b971c551 — https://www.hbs.edu/ris/Publication%20Files/09-060.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
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
