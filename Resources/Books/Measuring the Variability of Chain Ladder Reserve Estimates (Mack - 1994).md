---
Title: "Measuring the Variability of Chain Ladder Reserve Estimates"
Authors: "Thomas Mack"
Publisher: "Casualty Actuarial Society"
Year: "1994"
date: "1994"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1bca0951f5ea809d199345c17af2f1825b83a94ced33de3bdde3f8fe5f028f03
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994).md
---
![[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994) - Cover.svg]]

Thomas Mack's paper quantifies the variability of chain ladder reserve estimates without assuming any specific claims amount distribution function. It establishes a formula for the standard error — an estimate of the standard deviation of the outstanding claims reserve — from the usual chain ladder formulae alone, shows how to construct confidence intervals for the reserve and the ultimate claims amount, and shows when the chain ladder method is appropriate and when not. Submitted by Mack, of Munich Re, to the 1993 CAS Prize Paper Competition on "Variability of Loss Reserves", it is printed in the Casualty Actuarial Society Forum, Spring 1994, pp. 101–182.

> [!info] On the syllabus
> - [[Exam 7 (CAS)|Exam 7]] — objectives A2 and A6–A8; the whole paper (Casualty Actuarial Society Forum, Spring 1994).

## 1 Introduction and Overview
- The [[Chain Ladder Method|chain ladder method]] is probably the most popular method for estimating outstanding claims reserves, because of its simplicity and because it seems to be distribution-free; the paper shows that this impression is wrong and that the algorithm has far-reaching implications.
- Those implications allow the variability of chain ladder reserve estimates to be measured and a [[Confidence Interval|confidence interval]] to be constructed for the ultimate claims amount and the reserve — of much greater information value than a point estimate, a way to bring business policy into reserving through the chosen confidence probability, and a way to see whether the chain ladder and another method differ significantly.
- Chapters 2 and 3 derive two assumptions underlying the method; with a third, the independence of accident years, Chapter 4 calculates the standard error; Chapter 5 checks the assumptions with plots; Chapter 6 applies everything, including the two tests of Appendices G and H, to a numerical example; Appendices A–F hold the proofs.

## 2 Notations and First Analysis of the Chain Ladder Method
- $C_{ik}$ is the accumulated total claims amount, paid or incurred, of accident year $i$ up to development year $k$, known for $i + k \le I + 1$ (the [[Development Triangle|run-off triangle]]); $R_i = C_{iI} - C_{i,I+1-i}$ is the outstanding claims reserve.
- The chain ladder estimates the ultimate claims amount with the [[Age to Age Factor|age-to-age factors]] $\hat f_k$:

> $$\hat C_{iI} = C_{i,I+1-i} \cdot \hat f_{I+1-i} \cdots \hat f_{I-1}$$
>
> $$\hat f_k = \frac{\sum_{j=1}^{I-k} C_{j,k+1}}{\sum_{j=1}^{I-k} C_{jk}}$$

- Using the same factor for every accident year, and only the latest amount $C_{i,I+1-i}$ as the basis of the projection, means the method implicitly assumes (3), $E(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik} f_k$ — a rather strong assumption that cannot be taken as met for every run-off triangle ([[Mack Chain Ladder Model]]).
- A consequence of (3), proved in Appendix G: subsequent development factors $C_{ik}/C_{i,k-1}$ and $C_{i,k+1}/C_{ik}$ are uncorrelated, so the method should not be applied to business where a rather high factor is usually followed by a rather small one, and vice versa.

## 3 Analysis of the Age-to-Age Factor Formula: the Key to Measuring the Variability
- The $\hat f_k$ are [[Unbiasedness|unbiased]] (Appendix A) under the additional assumption (4) that the accident years are independent — also implicit in the chain ladder, since neither formula takes any dependency between accident years into account.
- Assumption (4) cannot be taken as met for every triangle either: [[Calendar Year Effect|calendar year effects]] such as a major change in claims handling or case reserving, or greater changes in the [[Inflation|inflation]] rate, can affect several accident years in the same way (Appendix H).
- $\hat f_k$ is the $C_{jk}$-weighted average of the individual development factors $C_{j,k+1}/C_{jk}$; every such weighted average is unbiased, and the one with the [[Minimum Variance|smallest variance]] has weights inversely proportional to $\text{Var}(C_{j,k+1}/C_{jk} \mid C_{j1}, \dots, C_{jk})$ (Appendix B).
- So the chain ladder's weights imply the variance assumption (5):

> $$\text{Var}(C_{i,k+1} \mid C_{i1}, \dots, C_{ik}) = C_{ik}\,\alpha_k^2$$

## 4 Quantifying the Variability of the Ultimate Claims Amount
- $\hat C_{iI}$ is unbiased (Appendix C); its precision is measured by the [[Mean Square Error|mean squared error]] conditional on the observed data $D$, because the error wanted is the one due to future randomness only.
- The mse is the sum of the pure future random error $\text{Var}(C_{iI} \mid D)$ and the estimation error $(E(C_{iI} \mid D) - \hat C_{iI})^2$; it does not take into account future changes in the underlying model, of which the emergence of asbestos is an extreme example.
- The standard error of $\hat C_{iI}$ equals that of the reserve estimate $\hat R_i$, and is given by (7), with $\hat\alpha_k^2$ from (8) an unbiased estimator of $\alpha_k^2$ (Appendix E) and $\hat C_{ik}$ the amounts of the triangle completed by the chain ladder:

> $$
> \begin{aligned}
> \big(\text{s.e.}(\hat C_{iI})\big)^2 &= \hat C_{iI}^2 \sum_{k=I+1-i}^{I-1} \frac{\hat\alpha_k^2}{\hat f_k^2} \\
> &\quad \times \left(\frac{1}{\hat C_{ik}} + \frac{1}{\sum_{j=1}^{I-k} C_{jk}}\right)
> \end{aligned}
> $$
>
> $$\hat\alpha_k^2 = \frac{1}{I-k-1}\sum_{j=1}^{I-k} C_{jk}\left(\frac{C_{j,k+1}}{C_{jk}} - \hat f_k\right)^2$$

- (8) gives no estimator for $\alpha_{I-1}$: it can be set to $0$ if $f_{I-1} = 1$ and development is believed finished; otherwise the decreasing series is extrapolated by one member, by log-linear regression or by (9):

> $$\hat\alpha_{I-1}^2 = \min\left(\frac{\hat\alpha_{I-2}^4}{\hat\alpha_{I-3}^2},\ \min\big(\hat\alpha_{I-3}^2,\ \hat\alpha_{I-2}^2\big)\right)$$

- If the volume of outstanding claims is large enough, the [[Central Limit Theorem|central limit theorem]] allows a [[Normal Distribution|Normal]] approximation, with $(\hat R_i - 2\,\text{s.e.},\ \hat R_i + 2\,\text{s.e.})$ a symmetric 95% interval; when $\text{s.e.}(\hat R_i)$ is greater than 50% of $\hat R_i$ the distribution is rather skewed, and an approach based on the [[Lognormal Distribution|Lognormal distribution]] is recommended, fitted by matching mean and variance:

> $$\sigma_i^2 = \ln\left(1 + \frac{\text{s.e.}(\hat R_i)^2}{\hat R_i^2}\right)$$
>
> $$\mu_i = \ln(\hat R_i) - \frac{\sigma_i^2}{2}$$

- With $\text{s.e.}/\hat R_i = 1$ the Lognormal 90th [[Percentile|percentile]] is $2.05\,\hat R_i$ and the Normal one $2.28\,\hat R_i$: there is no general rule that the Lognormal percentile is higher, and the Lognormal approximation only prevents a negative lower confidence limit; which confidence probability to choose is a business policy decision.
- For the overall reserve the squared standard errors cannot simply be added: the $\hat R_i$ are positively correlated because they all use the same $\hat f_k$, and Appendix F gives (11):

> $$
> \begin{aligned}
> \big(\text{s.e.}(\hat R)\big)^2 &= \sum_{i=2}^{I}\Bigg\{\big(\text{s.e.}(\hat R_i)\big)^2 + \hat C_{iI}\sum_{j=i+1}^{I}\hat C_{jI} \\
> &\qquad \times \sum_{k=I+1-i}^{I-1}\frac{2\hat\alpha_k^2/\hat f_k^2}{\sum_{n=1}^{I-k} C_{nk}}\Bigg\}
> \end{aligned}
> $$

## 5 Checking the Chain Ladder Assumptions Against the Data
- For a fixed $k$, (3) is a regression through the origin of $C_{i,k+1}$ on $C_{ik}$: [[Ordinary Least Squares|ordinary least squares]] gives $f_{k0} = \sum C_{ik}C_{i,k+1}/\sum C_{ik}^2$ (constant variance), weights $1/C_{ik}$ give the chain ladder factor $f_{k1} = \hat f_k$ (assumption 5), and weights $1/C_{ik}^2$ give the unweighted average $f_{k2}$ of the development factors.
- First plot $C_{i,k+1}$ against $C_{ik}$ to see whether the relationship is approximately linear around a straight line through the origin with slope $\hat f_k$; then plot the weighted [[Residual|residuals]] $(C_{i,k+1} - C_{ik}\hat f_k)/\sqrt{C_{ik}}$ against $C_{ik}$, which should show no specific trend but appear purely random.
- Compare the three [[Residual Plot|residual plots]] (Plot 0, 1 and 2) for every $k$ with at least six data points: if Plot 1 is nonrandom while Plot 0 or Plot 2 is not, for several $k$, replacing $\hat f_k$ with $f_{k0}$ or $f_{k2}$ should be seriously considered ([[Chain Ladder Assumptions]]).

## 6 Numerical Example
- The data are the Reinsurance Association of America's run-off triangle of automatic facultative general liability business excluding asbestos and environmental, from its Historical Loss Development Study, 1991 Edition — cumulative [[Incurred Losses|incurred case losses]] in \$1,000 for accident years 1981 to 1990.
- The plots for $k = 1$ show that the line through the origin does not capture the data well — it should have a positive intercept and a flatter slope — so any forecast of $C_{10,2}$ is highly uncertain; the plots for $k = 2$ and $k = 4$ are satisfactory, and the alternatives $f_{k0}$ and $f_{k2}$ bring no clear improvement, so the usual chain ladder factors are kept.
- Neither the test for calendar year influences nor the test for correlations between subsequent development factors rejects its assumption.
- Extrapolating the plot of $\ln(\hat\alpha_k^2)$ against $k$ linearly would give $\hat\alpha_9^2 = 0.64$; formula (9), easier to program and a bit more on the safe side, gives $1.34$; the overall reserve is 52,135 with a standard error of 26,909 (52%), and 150% for the most recent accident year, mainly because of the uncertain forecast of $C_{10,2}$.
- With all standard errors close to or above 50%, Lognormal limits are used: the overall 90th percentile, $1.655\,\hat R = 86{,}298$, is allocated to accident years at a common standard normal percentile $t = 1.13208$ (the 87th percentile per year), and the 10th percentile, $0.477\,\hat R = 24{,}871$, at $t = -0.8211$ (the 21st) — so a 66% interval for each accident year gives an 80% interval for the total.
- Empirical limits built from the minimum and maximum observed development factors are narrower than the confidence intervals for the early accident years and wider for the recent ones, so that approach does not seem reasonable.
- The "chain ladder model" of Ben Zehnwirth's ICRFS package, a loglinearized approximation of the method, gives reserves that differ considerably for the last years but are all within one standard error, and so not significantly different.
- Figures 1–13, at the end of the paper, plot $C_{i,k+1}$ against $C_{ik}$ with the weighted residuals for $k = 1$ to $8$, the residual plots for $f_{k0}$ and $f_{k2}$, and $\ln(\hat\alpha_k^2)$ against $k$.

## 7 Final Remark
- The weak points of the chain ladder method remain: the last two or three factors rest on very few observations, and the known amount $C_{I1}$ of the last accident year is a very uncertain basis for the projection to ultimate — if it is $0$, the reserve and its standard error are both $0$.
- Even when the statistical instruments do not reject the method, the result must be judged by an actuary or underwriter who knows the business; simple methods have the advantage that the user knows exactly how they work and where their weaknesses are.

## Appendix A: Unbiasedness of Age-to-Age Factors
- Under (3) and (4), $E(\hat f_k) = f_k$.

## Appendix B: Minimizing the Variance of Independent Estimators
- A linear combination of independent unbiased estimators, with weights summing to one, has minimal variance if and only if the weights are inversely proportional to the estimators' variances.

## Appendix C: Unbiasedness of the Estimated Ultimate Claims Amount
- The $\hat f_k$ are uncorrelated, and under (3) and (4) $E(\hat C_{iI}) = E(C_{iI})$.

## Appendix D: Calculation of the Standard Error of $\hat C_{iI}$
- Proves (7): the process term $\text{Var}(C_{iI} \mid D)$ is estimated by replacing $f_k$ and $\alpha_k^2$ with their unbiased estimators, and the squared estimation error by varying and averaging as little data as possible.

## Appendix E: Unbiasedness of the Estimator $\hat\alpha_k^2$
- Under (3)–(5), $E(\hat\alpha_k^2) = \alpha_k^2$ for $1 \le k \le I-2$.

## Appendix F: The Standard Error of the Overall Reserve Estimate
- Proves (11) by the same route as Appendix D, carrying the cross-products of the accident years' estimation errors.

## Appendix G: Testing for Correlations between Subsequent Development Factors
- Because the usual test for uncorrelatedness needs identically distributed Normal pairs, the [[Development Factor Correlation Test|test]] uses Spearman's rank correlation coefficient, which is distribution-free:

> $$T_k = 1 - \frac{6\sum_{i=1}^{I-k}(r_{ik} - s_{ik})^2}{(I-k)^3 - I + k}$$

- $r_{ik}$ ranks the factors $C_{i,k+1}/C_{ik}$ and $s_{ik}$ the preceding factors $C_{ik}/C_{i,k-1}$ of the same accident years; to test the triangle as a whole, the $T_k$ for $k = 2, \dots, I-2$ are averaged with weights $I-k-1$ into $T$, with $E(T) = 0$ and $\text{Var}(T) = 1/\big((I-2)(I-3)/2\big)$.
- Because the test is only approximate, and should detect correlations already in a substantial part of the triangle, a 50% interval is used: if $T$ falls outside $\pm 0.67/\sqrt{(I-2)(I-3)/2}$, the chain ladder should be applied with reluctance and the correlations analysed in more detail.
- For the example, $T = 0.070$ lies inside $\pm 0.127$, so uncorrelated factors are not rejected.

## Appendix H: Testing for Calendar Year Effects
- A calendar year influence affects a diagonal of the triangle and so makes the development factors on one side of it larger and those on the other side smaller than usual.
- Each column of development factors is split at its [[Median|median]] into larger (L) and smaller (S) factors; for each diagonal, $Z_j = \min(L_j, S_j)$, whose moments under the null hypothesis follow from the [[Binomial Distribution|Binomial distribution]], with $n = L_j + S_j$ and $m = \lfloor (n-1)/2 \rfloor$:

> $$E(Z_j) = \frac{n}{2} - \binom{n-1}{m}\frac{n}{2^n}$$
>
> $$\text{Var}(Z_j) = \frac{n(n-1)}{4} - \binom{n-1}{m}\frac{n(n-1)}{2^n} + E(Z_j) - E(Z_j)^2$$

- $Z = Z_2 + \dots + Z_{I-1}$ is approximately Normal, and the hypothesis of no significant calendar year effects is rejected, with an error probability of 5%, only if $Z$ falls outside $E(Z) \pm 2\sqrt{\text{Var}(Z)}$.
- For the example, $Z = 14$ lies inside $(8.886,\ 16.864)$, so the chain ladder method can continue to be applied.

## Related readings
- [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)]] — cites this paper, restates its three assumptions and adds further tests of them.

## Sources
- [Measuring the Variability of Chain Ladder Reserve Estimates (CAS Forum, Spring 1994)](https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf) — the document: title page, abstract, chapter and appendix headings, and the text of Chapters 1–7 and Appendices A–H (an OCR scan; formulas and tables read from the rendered pages)
- [CAS Exam 7 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf) — the citation and the assigned scope
