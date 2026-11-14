---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e657efc5092fea2b7ab746a53db14f05b98516c5d53116eab3d54cbb7e971e8
  sources:
    - "CreditMetrics Technical Document (J.P. Morgan 1997; RiskMetrics 2007 reprint): Sec. 1.6.1 rows = current rating, columns = rating at horizon, rows sum to 100%, matrices published by S&P and Moody's PDF p.36; Sec. 2.5.3 two-year matrix = one-year matrix times itself, and Altman & Kao's positive autocorrelation in downgrades PDF pp.48-49; Sec. 6.4.1 transition matrix as a Markov process PDF p.88; Sec. 6.4 'since default is an absorbing state, eventually all firms will default' PDF p.91, sha256:b9e9cf7e01f8cc89dedd1ca1c1df377714c6ecefa99c587d1addbb130d7367c7 - https://www.msci.com/documents/10199/93396227-d449-4229-9143-24a94dab122f"
    - "Fei, Fuertes & Kalotychou, 'Credit Rating Migration Risk and Business Cycles' (accepted manuscript, J. Business Finance & Accounting): Sec. 2.1 Markov (A1) and time-homogeneity (A2) assumptions, n-year matrix Q(n) = Q(1)^n, footnote 4 rating momentum/drift - 'a downgraded issuer is prone to further subsequent downgrades', PDF p.6; default state absorbing PDF p.12, sha256:f7229981d59f7ed4eafc1c56bf6773a39a24fc77106aeeb35c9d029ae819c637 - https://www.aifirm.it/wp-content/uploads/2014/11/Fuertes-e-Credit-Rating-Migration-Risk-and-Business-Cycles.pdf"
    - "Nickell, Perraudin & Varotto, 'Stability of ratings transitions', Bank of England Working Paper 133 (2001): Abstract and Summary, Sec. 1 (transition matrices vary with the business cycle), Sec. 2.4 business cycle effects PDF pp.3-6, 14-15, sha256:fa30a76187f297da75a593e68afc41fe3bde535d643ee5abc71aed6a72bbbb78 - https://www.bankofengland.co.uk/-/media/boe/files/working-paper/2001/stability-of-ratings-transitions.pdf"
    - "Basel Committee on Banking Supervision, 'An Explanatory Note on the Basel II IRB Risk Weight Functions' (July 2005), Sec. 2: EL = PD * EAD * LGD; LGD = percentage of exposure lost in default, PDF pp.7-8, sha256:387f8627a148dbd0a6eff3c5a0a020e44044051d3d8f34f0485b8297f49b503d - https://www.bis.org/publications/explanatory-note-basel-ii-irb-risk-weight-functions.pdf"
    - "Mubyana, 'Reinsurance Counterparty Risk - A Transition Matrix / Recovery Rate Approach', CAS 2013 CLRS handout (Towers Watson): reinsurance counterparty risk on ceded balances modelled with base/stressed transition matrices, PDF pp.1-7, sha256:f0bedcc686a415cfbb3625713e1fcb11841207c44d1a8999c21c5dd2550c46c8 - https://www.casact.org/sites/default/files/presentation/clrs_2013_handouts_paper_2475_handout_1388_0.pdf"
    - "Ross, Introduction to Probability Models, Ch. 4 (course-hosted copy on NTNU TMA4265 page; edition earlier than the 11th-13th the 2026 outline lists): absorbing-set technique - being in an absorbing set at time n = having entered it by time n, p.192, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 - https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Rating Migration.md
---

**Credit Rating Migration** is the movement of an issuer between credit rating grades over time, modelled as a [[Markov Chain|Markov chain]] with default as an absorbing state. A one-year rating transition matrix $\mathbf{P}$ gives the probability of moving from each grade to every other grade or to default, and its powers give multi-year migration and default probabilities.

The rows of $\mathbf{P}$ are the current rating and the columns the rating a year later. Default $D$ is absorbing, $P_{DD} = 1$. Being in $D$ at time $n$ therefore means having defaulted by time $n$, so for an issuer rated $i$ the cumulative default probability (PD) over $n$ years is

> $$P(\text{default within } n \text{ years} \mid \text{rated } i) = P_{iD}^{\,n}$$

- $P_{iD}^{\,n}$ is the $(i, D)$ entry of the matrix power $\mathbf{P}^n$.

The default probability in year $n$ alone is $P^n_{iD} - P^{n-1}_{iD}$. Credit rating agencies publish historical one-year transition matrices in their default studies, and the multi-year probabilities come from matrix powers under the Markov assumption.

Migration matters even for a grade with no one-year default risk. A high-grade bond can default within two years only by first being downgraded, and the [[Chapman-Kolmogorov Equations]] pick up that path.

> [!example]- What are the two-year default probabilities of an A-rated and a B-rated bond, and the B bond's default probability in year 2 alone? {Example}
> An insurer's investment team uses this one-year rating matrix:
>
> | From \ To | $A$ | $B$ | $C$ | $D$ |
> | :--- | ---: | ---: | ---: | ---: |
> | $A$ | 0.90 | 0.08 | 0.02 | 0 |
> | $B$ | 0.05 | 0.85 | 0.08 | 0.02 |
> | $C$ | 0 | 0.10 | 0.80 | 0.10 |
> | $D$ | 0 | 0 | 0 | 1 |
>
> > [!answer]-
> > - Condition on the rating after one year.
> > - An A bond defaults within two years only through B or C, so $P^2_{AD} = 0.08(0.02) + 0.02(0.10) = 0.0036$.
> > - A B bond can default from B, from C or by staying in D, so $P^2_{BD} = 0.85(0.02) + 0.08(0.10) + 0.02(1) = 0.045$.
> > - The B bond's year-2 default probability is $0.045 - 0.020 = 0.025$.
> > - The A bond cannot default in one year but has a $0.36\%$ probability of defaulting within two, entirely through downgrades.

## Expected credit loss

With LGD the loss given default, the share of the exposure not recovered, the expected credit loss is

> $$\text{Expected credit loss} = \text{Exposure} \times \text{PD} \times \text{LGD}$$

The actuarial uses are [[Credit Risk|credit risk]] on an insurer's [[Bonds|bond]] portfolio and [[Reinsurance Credit Risk|reinsurer default risk]] on recoverables.

> [!example]- An insurer holds $\$20$ million of the A bonds and $\$10$ million of the B bonds above. With an LGD of $60\%$, what is their two-year expected credit loss? {Example}
> - The timing of the defaults is ignored.
> - The expected default amount is $20{,}000{,}000(0.0036) + 10{,}000{,}000(0.045) = 72{,}000 + 450{,}000 = 522{,}000$.
> - The expected credit loss is $0.60 \times 522{,}000 = \$313{,}200$.
> - The B bonds are a third of the exposure but $450/522 = 86\%$ of the expected loss.

## Limits of the Markov assumption

The Markov assumption is an approximation. Transition rates vary with the credit cycle, so the matrix is not really constant. Recently downgraded issuers tend to be downgraded again (rating momentum), so the next move depends on more than the current grade.

The [[Stationary Distribution|stationary distribution]] is of no use here. With default absorbing, all probability eventually ends in $D$, so the work is over finite horizons.

> [!trap] Adding the yearly default probabilities from a one-year matrix
> $P^2_{iD}$ is not $2P_{iD}$. A bond with $P_{AD} = 0$ still has a two-year default probability of $0.0036$ above, because it can be downgraded first and then default.
