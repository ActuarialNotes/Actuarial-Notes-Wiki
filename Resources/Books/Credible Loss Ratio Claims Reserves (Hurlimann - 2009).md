---
Title: "Credible Loss Ratio Claims Reserves: The Benktander, Neuhaus and Mack Methods Revisited"
Authors: "Werner Hürlimann"
Publisher: "ASTIN Bulletin"
Year: "2009"
date: "2009"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Hurlimann.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:feebe0a19b5f5b9928b6d86c6e0bdc52b300449f136d1973a97ff3e661ba2706
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Credible Loss Ratio Claims Reserves (Hurlimann - 2009).md
---
![[Credible Loss Ratio Claims Reserves (Hurlimann - 2009) - Cover.svg]]

A paper reconsidering the Benktander (1976) and Neuhaus (1992) credibility claims reserving methods in the framework of a credible loss ratio reserving method. Its main contribution is a simple optimal credibility weight for combining the individual loss ratio reserve (the grossed-up latest claims experience of an origin period) with the collective loss ratio reserve (an experience-based burning cost estimate of its total ultimate claims), minimizing both the mean squared error and the variance of the reserve. Werner Hürlimann's approach is inspired by Mack (2000) but works on a full claims triangle with a premium for each origin period; it appeared in ASTIN Bulletin 39(1), 2009, pp. 81–99.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A1–A3, A6 and A11; the whole paper, including errata; candidates are not responsible for mathematical proofs.

## 1 Introduction
- The method is inspired by, similar to but different from the Benktander method reviewed in Mack (2000), Section 2: where Mack worked with a single origin period, this approach uses a full development triangle of paid (or incurred) claims over several origin periods, plus a measure of exposure such as premium for each.
- Where the standard methods — [[Chain Ladder Method|chain-ladder]], [[Cape Cod Method|Cape Cod]] and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] — apply link ratios of cumulative paid claims, this approach is based on loss ratios, the average ratio of incremental paid claims to exposure in each development period.
- The main contribution is Theorem 6.1, an optimal credibility weight for combining the individual and collective loss ratio reserves that minimizes the mean squared error and the variance of the claims reserve simultaneously.

## 2 The Collective and Individual Loss Ratio Claims Reserves
- $S_{ik}$ is the paid claims of origin period $i$ paid in development period $k$, $C_{ik}$ their cumulative sum, $R_i$ the $i$-th period claims reserve and $V_i$ the premium of origin period $i$; after $n$ development periods all claims are assumed known and closed.
- The loss ratios $m_k$ are the expected incremental paid claims per unit of premium in each development period, and $V_i \sum_k m_k$ is the expected burning cost of the total ultimate claims, similar to the Bornhuetter-Ferguson prior estimate in Mack (2000):

> $$m_k = \frac{E\left[\sum_{i=1}^{n-k+1} S_{ik}\right]}{\sum_{i=1}^{n-k+1} V_i}$$

- The loss ratio payout (or lag) factor $p_i = \sum_{k=1}^{n-i+1} m_k \big/ \sum_{k=1}^{n} m_k$ is the proportion of total ultimate claims expected to be paid by development period $n-i+1$, and the loss ratio reserve factor $q_i = 1 - p_i$ the proportion still unpaid.
- Grossing up the latest paid claims gives the individual total ultimate claims $U_i^{ind} = C_{i,n-i+1}/p_i$, similar to the chain-ladder estimate in Mack (2000), and the individual loss ratio claims reserve $R_i^{ind} = q_i\,U_i^{ind}$ ([[Credible Loss Ratio Reserve|credible loss ratio reserve]]).
- The burning cost gives the collective loss ratio claims reserve $R_i^{coll} = q_i\,U_i^{BC}$, which depends solely on the portfolio claims experience of all origin periods and coincides with the loss ratio reserving method of Mack (1997); its total ultimate $U_i^{coll} = R_i^{coll} + C_{i,n-i+1}$ is similar to the Bornhuetter-Ferguson posterior estimate in Mack (2000).
- Unlike the Bornhuetter-Ferguson reserve in Mack (2000), the collective reserve gives different actuaries the same result provided they use the same premiums.

## 3 Credible Loss Ratio Claims Reserves
- The individual reserve treats the latest paid claims as fully credible and ignores the burning cost, and the collective reserve does the opposite, so the natural estimate is their [[Credibility|credibility]] mixture, the credible loss ratio claims reserve:

> $$R_i^{c} = Z_i\,R_i^{ind} + (1-Z_i)\,R_i^{coll}$$

- Gunnar Benktander's (1976) weight $Z_i^{GB} = p_i$ gives the Benktander loss ratio claims reserve ([[Benktander Method|Benktander method]]); Walter Neuhaus's (1992) choice, per Mack (1997), is $Z_i^{WN} = p_i\sum_{k=1}^n m_k$, giving the Neuhaus loss ratio claims reserve.
- In numerical examples both simple choices are quite close to an optimal credible loss ratio claims reserve, whose weights are derived in Section 6.
- Theorem 3.1, paraphrasing Theorem 1 of Mack (2000): iterating $R_i^{(m)} = q_i U_i^{(m)}$, $U_i^{(m+1)} = C_{i,n-i+1} + R_i^{(m)}$ from any starting point $U_i^{0}$ gives the mixtures $U_i^{(m)} = (1-q_i^m)\,U_i^{ind} + q_i^m\,U_i^{0}$, which start at the collective method and lead via the Benktander method to the individual method as $m \to \infty$.

## 4 The Optimal Credibility Weights and the Mean Squared Error
- Assuming the burning cost estimate is independent of $C_{i,n-i+1}$, $R_i$ and $U_i$, with the usual unbiasedness, Theorem 4.1 gives the credibility weights $Z_i^*$ that minimize the mean squared error of $R_i^c$.
- Under Mack's (2000) conditional model for the loss ratio payout, $E[C_{i,n-i+1}/U_i \mid U_i] = p_i$ and $Var[C_{i,n-i+1}/U_i \mid U_i] = p_i q_i \beta_i^2(U_i)$, Theorem 4.2 puts the optimal weights in the form below, with $t_i$ built from $E[\alpha_i^2(U_i)]$, $Var[U_i^{BC}]$ and $Var[U_i]$, where $\alpha_i^2(U_i) = U_i^2\beta_i^2(U_i)$:

> $$Z_i^* = \frac{p_i}{p_i + t_i}$$

- Theorem 4.3 gives the mean squared errors of the collective, individual and credible reserves under the same model.

## 5 A Pragmatic Estimation Method
- The optimal weights need estimates of $Var[U_i^{BC}]$, $Var[U_i]$ and $E[\alpha_i^2(U_i)]$ from a triangle of paid claims and the exposures; $Var[U_i^{BC}]$ follows the standard estimate from Mack (1997), built from the spread of each period's incremental loss ratios.
- As pragmatic estimates, $Var[U_i] = f_i \cdot Var[U_i^{BC}]$ for some $f_i \ge 1$ ($U_i$ at least as volatile as the burning cost), $E[U_i] = U_i^{BC}$, and $\beta_i^2$ is a constant for all periods; together they give an estimate $\hat t_i$ of the optimal credibility parameter.

## 6 The Optimal Credible Claims Reserve with Minimum Variance
- Choosing the remaining parameters to minimize also the variance of the optimal credible reserve gives a parameter-free result, comparable in simplicity to the Neuhaus and Benktander reserves; it compares with Benktander's $t_i^{GB} = q_i$ and Neuhaus's $t_i^{WN} = q_i + (1-\sum m_k)/\sum m_k$:

> $$t_i^{*} = \sqrt{p_i}$$

- All three methods give monotone decreasing credibility weights across the origin periods, and the optimal weights satisfy $Z_i^* \le 1/2$, with equality for the first origin period; the Benktander and Neuhaus methods usually give higher weights.
- The case $f_i = 1$ — identical volatilities for $U_i$ and $U_i^{BC}$ — is the most appealing: besides minimum variance, it gives the smallest weights to the individual reserve of all choices $f_i \ge 1$, putting more emphasis on the collective reserve.
- Theorem 6.1 gives, for general $f_i$, the weights $Z_i^* = p_i/(p_i + t_i^*)$ with $t_i^* = \left[f_i - 1 + \sqrt{(f_i+1)(f_i-1+2p_i)}\right]/2$, which minimize both the mean squared error and the variance.
- Remark 6.1: the payout factor has mostly been estimated in practice with chain-ladder lag factors $p_i^{CL} = 1/F_{n-i+1}^{CL}$ from [[Cumulative Development Factor|LDF paid factors]], rather than the loss ratio based factors, and the standard methods can be reinterpreted in the credible context:
    - The Chain-Ladder Method
        - Similar to the individual loss ratio method, with the chain-ladder lag factors in place of the loss ratio lag factors.
    - The Cape Cod Method
        - A (Benktander type) credibility mixture of the type (3.1), with the chain-ladder individual reserve, a collective reserve $q_i^{CL}\cdot LR\cdot V_i$ whose loss ratio is $LR = \sum_i C_{i,n-i+1}\big/\sum_i p_i^{CL} V_i$, and $Z_i = p_i^{CL}$.
    - The Optimal Cape Cod Method
        - The same mixture with the optimal credibility weights $Z_i = p_i^{CL}\big/\left(p_i^{CL} + \sqrt{p_i^{CL}}\right)$.
    - The Bornhuetter-Ferguson Method
        - A (Benktander type) credibility mixture with a collective reserve $q_i^{CL}\cdot LR_i\cdot V_i$ built on a selected initial loss ratio $LR_i$ for each origin period, and $Z_i = p_i^{CL}$.
    - The Optimal Bornhuetter-Ferguson Method
        - The same mixture with the optimal credibility weights.

## 7 Numerical Examples
- The first example takes the paid claims triangle and exposures of Mack (1997), Table 3.1.5.1 (six origin periods), applying the minimum variance estimator with $f_i = 1$ and $t_i = \sqrt{p_i}$; Tables 7.2–7.5 give the parameters, the reserves and ultimate claims by method, and the mean squared errors as ratios to the optimal.
- Its total reserves are 25,154 (collective), 26,972 (individual), 25,913 (Neuhaus), 25,999 (Benktander) and 25,914 (optimal); the Neuhaus and Benktander reserves are quite close to the optimal credible reserve, and applying a credible loss ratio method reduces the mean squared error substantially.
- In absence of sufficient information to estimate the optimal credibility weights more precisely, the three simple credible methods are highly recommended for actuarial practice.
- A second example, a slightly modified real-life project (Tables 7.6–7.10), leads to the same conclusions.
- A third compares the 2004 A.M. Best paid loss development factors for General Liability claims-made policies with the inverse loss ratio payout factors of each method (Tables 7.11–7.12): the A.M. Best factors slightly but systematically overestimate the optimal and nearly optimal Benktander and Neuhaus factors.

## References
- Benktander (1976), Boulter and Grubbs (2000), Mack (1997), Mack (2000) and Neuhaus (1992).

## Errata
- Table 7.4, page 95: the collective ultimate claims become 85,992 for all periods and 10,043, 12,878, 11,731, 19,284 and 17,749 for origin periods 2–6; the optimal become 86,752 for all periods and 9,964, 12,772, 11,443, 20,826 and 17,440.
- Table 7.5, page 95: the mean squared error ratios change for the collective method (1.058037, 1.115379, 1.198610 and 1.244422 for origin periods 3–6), the Neuhaus method (1.023277, 1.023764, 1.003211 and 1.008555 for periods 3–6) and the Benktander method (1.002208 for period 6).
- Table 7.10, page 97: the ratios for origin period 2 become 1.001566 (collective), 1.001571 (individual), 1.001342 (Neuhaus) and 1.001551 (Benktander), with further small changes for periods 3–6.
- Formula (4.14), page 88: the first term of $mse(R_i^{ind})$ is $Var[R_i^{ind}]$, not $Var[R_i^{coll}]$.
- Page 92: in the estimate of $Var[R_i^c]$, the factor $\hat t_i/(1-\hat t_i)$ becomes $\hat t_i/(1+\hat t_i)$.

## Related readings
- [[Credible Claims Reserves: The Benktander Method (Mack - 2000)]] — Mack (2000), which the paper's approach is inspired by and which it cites throughout.

## Sources
- [Credible Loss Ratio Claims Reserves: The Benktander, Neuhaus and Mack Methods Revisited (ASTIN Bulletin 39(1), 2009)](https://www.casact.org/sites/default/files/2021-03/7_Hurlimann.pdf) — the document: title, author, abstract, the ASTIN Bulletin citation on its first page (39(1), 81–99), the section headings and the text of Sections 1–7, with formulas and tables read from the page images
- [Errata to Hürlimann, Version 1.0, January 31, 2020 (CAS)](https://www.casact.org/sites/default/files/2021-03/7_Hurlimann_Errata.pdf) — the corrections to Tables 7.4, 7.5 and 7.10 and to the formulas on pages 88 and 92, prepared by the Exam 7 Syllabus Committee
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation, the assigned scope and the note that candidates are not responsible for mathematical proofs
