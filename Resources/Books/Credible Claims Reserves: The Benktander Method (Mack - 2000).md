---
Title: "Credible Claims Reserves: The Benktander Method"
Authors: "Thomas Mack"
Publisher: "ASTIN Bulletin"
Year: "2000"
date: "2000"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26058507f71dcc08bf60d7d85a42bcee05aa8552175a35f9cb42a86e7390c409
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Resources/Books/Credible Claims Reserves: The Benktander Method (Mack - 2000).md"
---
![[Credible Claims Reserves- The Benktander Method (Mack - 2000) - Cover.svg]]

Thomas Mack's paper reviews the claims reserving method Gunnar Benktander introduced in 1976, a very intuitive credibility mixture of Bornhuetter/Ferguson and chain ladder. It calculates and compares the mean squared errors of all three methods on the basis of a very simple stochastic model, and finds the Benktander method almost always has a smaller mean squared error than the other two and is almost as precise as an exact Bayesian procedure. Written by Mack, of Munich Re, for Benktander's 80th anniversary, it appeared in ASTIN Bulletin Vol. 30, No. 2, 2000, pp. 333–347; the CAS copy ends with the author's one-page correction note.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A1–A3, A9 and A11–A12; the whole paper, cited by the outline as ASTIN Bulletin, 2000, "pp. 333-337" (the paper runs to p. 347).

## 1 Introduction
- Benktander published the method in 1976 in The Actuarial Review, the CAS's quarterly newsletter, as "An Approach to Credibility in Calculating IBNR for Casualty Excess Reinsurance"; it was proposed again by Esa Hovinen at the 1981 ASTIN Colloquium ("Additive and Continuous IBNR") and a third time by Walter Neuhaus in 1992 ("Another Pragmatic Loss Reserving Method or Bornhuetter/Ferguson Revisited").
- In recent years it has been used in actuarial reports under the name "Iterated Bornhuetter/Ferguson Method"; the paper connects it with its first publisher and, using a simple stochastic model, shows that it outperforms the Bornhuetter/Ferguson and chain ladder methods in many situations.

## 2 Review of the Method
- For one accident year and paid claims, with a given payout pattern $p_j$ (the proportion of ultimate claims expected to be paid after $j$ years), $q_k = 1 - p_k$, and a prior estimate $U_0$ of the ultimate claims — from premium calculation, for instance — the [[Bornhuetter-Ferguson Method|Bornhuetter/Ferguson]] (BF) reserve $R_{BF} = q_k U_0$ ignores the claims paid $C_k$ completely; its posterior ultimate is $U_{BF} = C_k + R_{BF}$.
- The [[Chain Ladder Method|chain ladder]] (CL) grosses up the current claims, $U_{CL} = C_k/p_k$ and $R_{CL} = q_k U_{CL}$, treating $C_k$ as fully credible and ignoring $U_0$; with CL different actuaries always come to similar results, which is not the case with BF because there may be dissent regarding $U_0$.
- BF and CL are extreme positions, so Benktander (GB) replaced the prior with a [[Credibility|credibility]] mixture $U_c = cU_{CL} + (1-c)U_0$ with $c = p_k$:

> $$R_{GB} = q_k\,U_{p_k} = q_k\,U_{BF}$$
>
> $$U_{GB} = (1 - q_k^2)\,U_{CL} + q_k^2\,U_0$$

- The [[Benktander Method|Benktander reserve]] is therefore the BF procedure applied a second time, to the BF posterior ultimate — the "iterated Bornhuetter/Ferguson method"; Hovinen's reserve $cR_{CL} + (1-c)R_{BF}$ with $c = p_k$ is identical to it.
- Theorem 1 (Table 1, "Iteration of Bornhuetter/Ferguson"): from any starting point $U^{(0)} = U_0$, the iteration $R^{(m)} = q_k U^{(m)}$, $U^{(m+1)} = C_k + R^{(m)}$ gives credibility mixtures $U^{(m)} = (1-q_k^m)U_{CL} + q_k^m U_0$ that start at BF and lead via GB to CL as $m \to \infty$.
- Neuhaus (1992), in a full [[Bühlmann-Straub Credibility|Bühlmann/Straub]] framework with $U_0 = E(U)$, showed that the mean squared error of $R_{GB}$ is almost as small as that of the optimal credibility reserve $R_{c^*}$ except if $p_k$ is small and $c^*$ large at the same time, and smaller than that of $R_{BF}$ whenever $c^* > p_k/2$.

## 3 Calculation of the Optimal Credibility Factor $c^*$ and of the Mean Squared Error of $R_c$
- $R_c = cR_{CL} + (1-c)R_{BF}$ is compared by its [[Mean Square Error|mean squared error]] $E(R_c - R)^2$, a quadratic function of $c$; $U_0$ is taken as an estimator independent of $C_k$, $R$ and $U$ with $E(U_0) = E(U)$ (Theorem 2 gives $c^*$ in terms of $\text{Cov}(C_k, R)$, $\text{Var}(C_k)$ and $\text{Var}(U_0)$).
- The model, "not more than a slightly refined definition of the payout pattern", is $E(C_k/U \mid U) = p_k$ and $\text{Var}(C_k/U \mid U) = p_k q_k \beta^2(U)$, with $\alpha^2(U) = U^2\beta^2(U)$; a Beta-distributed $C_k/U$ is a parametric example.
- Theorem 3 gives the optimal credibility factor:

> $$c^* = \frac{p_k}{p_k + t}$$
>
> $$t = \frac{E\big(\alpha^2(U)\big)}{\text{Var}(U_0) + \text{Var}(U) - E\big(\alpha^2(U)\big)}$$

- Theorem 4 gives the mean squared errors:

> $$\text{mse}(R_{BF}) = E\big(\alpha^2(U)\big)\,q_k\left(1 + \frac{q_k}{t}\right)$$
>
> $$\text{mse}(R_{CL}) = E\big(\alpha^2(U)\big)\,\frac{q_k}{p_k}$$
>
> $$\text{mse}(R_c) = E\big(\alpha^2(U)\big)\left(\frac{c^2}{p_k} + \frac{1}{q_k} + \frac{(1-c)^2}{t}\right)q_k^2$$

- This $\text{mse}(R_{CL})$ differs from the distribution-free chain ladder model of Mack (1993) because that model assumes $E(U/C_k \mid C_k) = 1/p_k$ rather than $E(C_k/U \mid U) = p_k$.
- BF beats CL if and only if $p_k < t$ — BF for the green years, CL for the rather mature ones — but $t$ varies from one business to another and should be estimated in every case; GB beats BF if and only if $t < 2 - p_k$, and beats CL if and only if $t > p_k q_k/(1 + p_k)$ (Figure 1, "Areas of smallest mean squared error").

## 4 Numerical Example
- With $U_0 = 90\%$ of premium, $p_k = 0.50$ and paid claims $C_k = 55\%$: $R_{BF} = 45\%$, $U_{CL} = 110\%$, $R_{CL} = 55\%$ and $R_{GB} = 50\%$.
- $\text{Var}(U) = (35\%)^2$ from a shifted lognormal with mean 90% that is never below 60% and above 150% only once in 20 years; $\text{Var}(C_k/U \mid U) = 0.10^2$ from the two-sigma rule, so $\beta^2 = 0.20^2$ and $E(\alpha^2(U)) = 0.193^2$; and $\text{Var}(U_0) = (15\%)^2$, the most difficult to assess but of much less influence on $t$.
- Then $t = 0.346$, and the standard errors are $R_{BF} = 45\% \pm 21.3\%$, $R_{CL} = 55\% \pm 19.3\%$, $R_{GB} = 50\% \pm 17.3\%$ and $R_{c^*} = 50.9\% \pm 17.2\%$ with $c^* = 0.591$ — based on the unconditional mean squared error and a known payout pattern.
- A more stable business ($\text{Var}(U) = (10\%)^2$, $\text{Var}(U_0) = (5\%)^2$, $\text{Var}(C_k/U \mid U) = 0.03^2$) gives $t = 0.309$ and again the smallest mean squared error for GB.
- $t$ is essentially determined by the ratio $\text{Var}(C_k/U \mid U)/\text{Var}(U)$: $\text{Var}(C_k/U \mid U) \ge 0.153^2$ gives $t \ge 1.51$ and BF best, $\le 0.074^2$ gives $t \le 0.164$ and CL best, but across the large range of normal values GB is better than both.

## 5 Application of an Exact Bayesian Model to the Numerical Example
- Gogol (1993) assumed that $U$ and $C_k \mid U$ are [[Lognormal Distribution|lognormal]], so that $U \mid C_k$ is lognormal too by [[Bayes Theorem|Bayes' theorem]]; applied to the first example this gives $E(U \mid C_k)$, $E(R \mid C_k)$ and $\text{Var}(R \mid C_k)$ exactly (as corrected in the Errata below).
- In reserving the conditional mean squared error given $C_k$ should be minimized, but the unconditional (average) mean squared error is the appropriate measure to compare the precision of different reserving methods, and the Section 4 figures are unconditional.
- The Bayesian model's unconditional mean squared error $E(\text{Var}(R \mid C_k))$ is only slightly smaller than those of $R_{c^*}$ and $R_{GB}$ — an improvement that does not pay for the strong assumption of exactly known distributions.

## 6 Connection to the Credibility Model
- Neuhaus applied the Bühlmann/Straub model to incremental claims $S_j = C_j - C_{j-1}$ and the incremental payout pattern $m_j = p_j - p_{j-1}$: given the accident year's quality $\Theta$, the $S_j$ are independent with $E(S_j/m_j \mid \Theta) = \mu(\Theta)$ and $\text{Var}(S_j/m_j \mid \Theta) = \sigma^2(\Theta)/m_j$.
- There $\text{Var}(C_k \mid \Theta) = p_k\sigma^2(\Theta)$, so the model differs from model (2)–(3), but Theorem 5: the formulae of Theorems 3 and 4 hold for it after replacing $E(\alpha^2(U))$ with $E(\sigma^2(\Theta))$.
- The unbiased estimator of $E(\sigma^2(\Theta))$ is the $m_j$-weighted squared deviation of the ratios $S_j/m_j$ from $U_{CL}$:

> $$\hat\sigma^2 = \frac{1}{k-1}\sum_{j=1}^{k} m_j\left(\frac{S_j}{m_j} - U_{CL}\right)^2$$

- With $p_1 = 0.10$, $p_2 = 0.30$, $C_1 = 15\%$ and $C_2 = 27\%$ it is $0.205^2$, and with $C_1 = 10\%$ and $C_2 = 30\%$ it is $0.061^2$, a more stable case; estimating $E(\alpha^2(U))$ instead needs several accident years, but model (2)–(3) is less demanding.

## 7 Conclusion
- The actuary usually has two independent estimators, $R_{BF}$ from prior knowledge and $R_{CL}$ from the claims paid, and a linear combination of independent unbiased estimators is better than either; GB has a smaller mean squared error than BF and CL if the payout pattern is neither extremely volatile nor extremely stable, so actuaries should include the Benktander method in their standard reserving methods.
- All the formulae rely on the prior $U_0$ being independent of the observed claims $C_k$; a prior adjusted during the development period is like choosing $U_c$ with an unknown $c$, a procedure much less objective than the Benktander method.

## Errata
- Correction Note by Thomas Mack (the last page of the CAS copy), Section 5: the posterior parameter is $\mu_1 = z(\tau^2/2 + \ln(C_k/p_k)) + (1-z)\mu = 0.05155$, with $\tau^2/2$ in place of $\tau^2$.
- In consequence, $E(U \mid C_k) = 106.9\%$ (not 108.6%), $E(R \mid C_k) = 51.9\%$ (not 53.6%) and $\text{Var}(R \mid C_k) = (18.9\%)^2$ (not $(19.2\%)^2$).
- In the last equations of Section 5, $2z\tau^2$ replaces $3z\tau^2$ in the second line and $(1+z)\sigma^2$ replaces $2\sigma^2$ in the third, so $E(\text{Var}(R \mid C_k)) = (16.8\%)^2$, not $(17.0\%)^2$.

## Related readings
- [[Credible Loss Ratio Claims Reserves (Hurlimann - 2009)]] — assigned with this paper for objectives A1–A3 and A11; the outline cites it as "The Benktander, Neuhaus and Mack Methods Revisited".

## Sources
- [Credible Claims Reserves: The Benktander Method (ASTIN Bulletin 30(2), 2000), CAS copy](https://www.casact.org/sites/default/files/2021-03/7_Mack_2000.pdf) — the document: title, abstract, section headings, the text of Sections 1–7 with Table 1 and Figure 1, and the author's correction note on its last page (the page before it is a blank scan)
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
