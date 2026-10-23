---
id: "astam-2026s-q5"
exam: "Exam ASTAM"
topic: "Bühlmann-Straub Credibility"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: hard
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Chain+Ladder+Method
  - Concepts/Bühlmann-Straub+Credibility
  - Concepts/Bornhuetter-Ferguson+Method
  - Concepts/Unpaid+Claims
  - Concepts/Credibility
points: 11
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:2baae69f2da4d3d2b8c69b2b0bd05f8ad9ddb903be3210fb203f0b6c311b7dcd
  sources:
    - "SOA Exam ASTAM Spring 2026 — exam questions, Q5, p.12, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf"
    - "SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q5, pp.10-12, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2026s-q5.md
---

You are analyzing the following cumulative claims run-off triangle for a commercial insurance. Assume that claims are fully developed by the end of Development Year 2.

| Accident Year (AY) $i$ / Development Year $j$ | 0 | 1 | 2 |
|---|---|---|---|
| 0 | 235 | 317 | 349 |
| 1 | 320 | 390 | |
| 2 | 416 | | |

## Part a (2 points)

You first use the chain ladder method to estimate the ultimate claims.

(i) Show that the projected cumulative claims for AY1 are 430 to the nearest 10. You should calculate the value to the nearest 1.

(ii) Calculate the projected cumulative claims for AY2.

### Explanation
$$f_0 = \frac{317 + 390}{235 + 320} = 1.2739; \qquad f_1 = \frac{349}{317} = 1.100946$$

(i) $$\widehat{C}_{1,2} = 390 f_1 = 429.37$$

(ii) $$\widehat{C}_{2,2} = 416 f_0 f_1 = 583.43$$

## Part b (1 point)

You next decide to estimate the outstanding claims using the Bühlmann-Straub model. You are given that $\hat{\gamma}_0 = 0.71303$, $\hat{\gamma}_1 = 0.19528$, and $\hat{\gamma}_2 = 0.09169$.

Explain in words what the $\gamma_j$ values represent.

### Explanation
The $\gamma_j$ values represent the proportion of claims settled in DY $j$.

### Examiner Report
1. Part (a) was done very well, with almost all candidates earning full credit.
2. Part (b) was also done well, though a number of candidates simply described the formula for $\gamma_j$ in words, rather than giving the interpretation. The Examiners are looking for evidence that candidates can see beyond the formulas.

## Part c (3 points)

You are given that $s_0^2 = 625.41$ and $\bar{C} = 440.61$.

Show that $\hat{v}$ is 940 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
From the formula sheet:

$$\begin{align*}
\hat{v} &= \frac{1}{I}\sum_{i=0}^{I-1} \hat{s}_i^2 \\
\hat{s}_i^2 &= \frac{1}{I - i}\sum_{j=0}^{I-i} \hat{\gamma}_j \left(\frac{X_{i,j}}{\hat{\gamma}_j} - \widehat{C}_{i,J}\right)^2
\end{align*}$$

$I = 2 \qquad X_{1,0} = C_{1,0} = 320 \qquad X_{1,1} = C_{1,1} - C_{1,0} = 70 \qquad \widehat{C}_{1,2} = 429.37$

$$\begin{align*}
\Rightarrow \hat{s}_1^2 &= \hat{\gamma}_0\left(\frac{X_{1,0}}{\hat{\gamma}_0} - \widehat{C}_{1,2}\right)^2 + \hat{\gamma}_1\left(\frac{X_{1,1}}{\hat{\gamma}_1} - \widehat{C}_{1,2}\right)^2 \\
&= 0.71303(19.420)^2 + 0.19528(-70.909)^2 \\
 &= 1250.80 \\
\Rightarrow \hat{v} &= (625.41 + 1250.80)/2 \\
                    &= 938.11
\end{align*}$$

### Examiner Report
1. This question required candidates to understand how to use the formula given on the formula sheet.
2. More than half of the candidates earned full credit on this part.
3. Candidates who lost credit generally did so through misinterpreting the formula inputs. For example, a common error was to use the cumulative claims (i.e. $C_{1,1}$) in the second term of the formula, instead of the incremental claims (i.e. $X_{1,1}$). This demonstrates the value for all candidates in being very familiar with the formula sheet,
4. Note that $\dfrac{X_{1,j}}{\hat{\gamma}_j}$ is an estimate of $C_{1,2}$, and so each of the two terms in the formula is a squared error term.
5. A few candidates also calculated $\hat{s}_0^2$, even though it was given in the question. There is a lot of value in reading the question through several times before embarking on any calculations.
6. Many candidates used Excel to do the calculations for this question. Candidates who wrote down the formulas used and the inputs earned full credit if the calculation was done correctly. A few candidates wrote down the answer with no explanation. Because the question used the wording "Show that" these answers received little credit.
7. Some candidates used wrong inputs or formulas and magically ended up with the rounded answer given. However, the examiners do read every line of the candidates' work. A candidate who honestly records an answer that is incorrect may receive more partial credit for the same error than a candidate who tries to bluff the examiners.

## Part d (3 points)

You are given that $\hat{a} = 12{,}231$

(i) Calculate the credibility factors, $Z_0$, $Z_1$, $Z_2$.

(ii) Explain briefly why, in general, we expect $Z_0 > Z_1 > Z_2$.

(iii) Show that $\hat{\mu} = 452.77$.

(iv) Calculate the Bühlmann-Straub estimate of the projected cumulative claims for AY 2.

### Explanation
(i) From the formula sheet:

$$Z_i = \frac{\hat{\beta}_{I-i}}{\hat{\beta}_{I-i} + \hat{v}/\hat{a}}$$

where $\hat{\beta}_0 = \gamma_0 = 0.71303$; $\hat{\beta}_1 = \gamma_0 + \gamma_1 = 0.90831$; $\hat{\beta}_2 = \gamma_0 + \gamma_1 + \gamma_2 = 1$

$$\frac{\hat{v}}{\hat{a}} = 0.07670$$

$$\begin{align*}
\Rightarrow Z_0 &= \frac{1}{1.07670} \\
                &= 0.92877; \\
Z_1 &= \frac{0.90831}{0.98501} \\
    &= 0.922134; \\
Z_2 &= \frac{0.71303}{0.78973} \\
    &= 0.902879
\end{align*}$$

(ii) $Z_i$ measures the credibility of the chain ladder estimate of ultimate claims for AY $i$. For AY0, we have 3 years of data, for AY1 we have 2 years, and for AY2 we have 1 year, so the credibility of the estimates is highest for AY0 and lowest for AY2.

(iii) From the formula sheet, $\hat{\mu}$ is the average of the estimated ultimate claims, weighted by the credibility factors; that is

$$\hat{\mu} = \frac{Z_0\widehat{C}_{0,2} + Z_1\widehat{C}_{1,2} + Z_2\widehat{C}_{2,2}}{Z_0 + Z_1 + Z_2} = \frac{1246.84}{2.7538} = 452.77$$

(iv)

$$\begin{align*}
\tilde{C}_{2,2}^{\text{BS}} &= Z_2\widehat{C}_{2,2} + \left(1 - Z_2\right)\hat{\mu} \\
&= \left(0.90288\right)\left(583.43\right) + \left(0.09712\right)\left(452.77\right) \\
 &= 570.74
\end{align*}$$

$$\begin{align*}
\tilde{C}_{2,2}^{\text{BS2}} &= Z_2^*\widehat{C}_{2,2} + \left(1 - Z_2^*\right)\mu \\
Z_2^* &= 1 - \left(1 - \beta_0\right)\left(1 - Z_2\right) \\
      &= 0.97213 \\
\Rightarrow \tilde{C}_{2,2}^{\text{BS2}} &= 0.97213(583.43) + 0.02787(452.77) \\
                                         &= 579.78
\end{align*}$$

### Examiner Report
1. This part was done well by most candidates.
2. Most of the required formulas were on the formula sheet.
3. In part (iv), full credit was awarded for either the first or second iterated Bühlmann Straub estimate.

## Part e (2 points)

The Bornhuetter-Ferguson method can also be expressed as a credibility estimate. Describe two advantages and one disadvantage of the Bühlmann-Straub approach compared with the Bornhuetter-Ferguson method. You do not need to describe the Bornhuetter-Ferguson method in detail.

### Explanation
Advantages (2 required):

- Buhlmann-Straub (B-S) provides an objective, empirical estimate for the 'prior' mean $\mu$. B-F typically uses the loss ratio estimate, which is subjective.
- The B-S estimate of $\mu$ is automatically updated as more data is available.
- The B-S credibility factors reflect both the within-AY volatility ($v$) and the between AY volatility ($a$). The B-F credibility factors do not reflect either, based solely on the average development pattern.

Disadvantages (1 required):

- The B-S approach assumes that the $\mu$ parameter is the same for all AY. The B-F method allows different $\mu$ values for different AY's.
- The B-F method requires fewer calculations.
- The B-F method is more widely used and recognized.

### Examiner Report
1. This part was done less well than the rest of the question.
2. Many candidates listed advantages and disadvantages of B-F compared with the Chain Ladder, which did not answer the question.
3. Many candidates claimed that B-S used credibility, and B-F did not, which is incorrect. B-F is implicitly a credibility based method, where the credibility factor for an AY with data up to DY j is $\beta_j$. Similarly, many candidates claimed that the B-S method gave more weight where there is more data, but the B-F also does this, through the $\beta_j$ credibility factors.
4. Many candidates claimed that B-S required more information or data than B-F which is not correct. Both use the run-off triangle data, but B-F requires an external candidate for the prior mean. The BS method requires no other information.
