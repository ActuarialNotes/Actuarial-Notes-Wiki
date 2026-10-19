---
id: "astam-2024f-q5"
exam: "Exam ASTAM"
topic: "Empirical Bayes Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Empirical+Bayes+Credibility
  - Concepts/Bühlmann+Credibility
  - Concepts/Geometric+Distribution
  - Concepts/Credibility
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d1a3708b3686e569dd972dc483edde65e712a21a07077fecf78256f86e443c48
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024f-q5.md
---

## Part a (1 point)

An insurer uses the Bühlmann Credibility Model to estimate expected claim frequency for risks in a portfolio. Let $X$ denote the number of claims from an individual risk in a single year.

You are given that $\mu(\Theta) = \mathrm{E}[X \mid \Theta]$ and that $v(\Theta) = \mathrm{Var}[X \mid \Theta]$.

Define the Bühlmann Credibility Model parameters $\mu$, $v$, and $a$ in terms of the functions $\mu(\Theta)$ and $v(\Theta)$.

### Explanation
$$\mu = E[\mu(\Theta)]; \qquad v = E[v(\Theta)]; \qquad a = Var[\mu(\Theta)]$$

### Examiner Report
Parts (a) and (b) were generally done well by candidates. The only common error was to mistakenly assume that $\beta$ had a Geometric distribution, rather than $X|\beta$. Some candidates lost credit in part (b) by simply writing the result rather than showing any steps or assumptions.

## Part b (1 point)

The insurer will use the semiparametric approach to estimate the Bühlmann Credibility Model parameters $\mu$, $v$, and $a$.

The insurer assumes that the frequency of claims for an individual policy, conditional on an unknown parameter $\beta$, follows a Geometric distribution with parameter $\beta$.

(i) Show that $\mu = E[\beta]$

(ii) Show that $a = \mathrm{Var}[\beta]$

### Explanation
Note that $X|\beta$ has a Geometric distribution with parameter $\beta$ so that:

$$\Theta = \beta,\ \mu(\Theta) = E[X|\beta] = \beta,\ v(\theta) = Var[X|\beta] = \beta(1 + \beta)$$

(i) $\mu = E[\mu(\theta)] = E\big[E[X|\beta]\big] = E[\beta]$

(ii) $a = Var\big[E[X|\beta]\big] = Var[\beta]$

## Part c (3 points)

(i) Show that $\mathrm{Var}[X] = 2\mathrm{Var}[\beta] + \mathrm{E}[\beta]\left(1 + \mathrm{E}[\beta]\right)$

(ii) Hence show that

$$a = \frac{\mathrm{Var}[X] - E[X]\left(1 + E[X]\right)}{2}$$

### Explanation
(i)

$$\begin{align*}
Var(X) &= E\big[Var[X|\beta]\big] + Var\big[E[X|\beta]\big] \\
&= E[\beta + \beta^2] + Var[\beta] \\
&= E[\beta] + E[\beta^2] + Var[\beta] \\
&= E[\beta] + (Var[\beta] + E[\beta]^2) + Var[\beta] \\
&= 2Var[\beta] + E[\beta] + E[\beta]^2 \\
&= 2Var[\beta] + E[\beta](1 + E[\beta])
\end{align*}$$

(ii) $a = Var[\beta]$ and $E[\beta] = E[X]$

So $Var(X) = 2a + E[X](1 + E[X])$

So that

$$a = \frac{Var(X) - E[X](1 + E[X])}{2}$$

### Examiner Report
Some candidates omitted one or both parts of (c), but those who attempted it generally did fairly well. Most candidates were able to write down the variance decomposition formula and substitute in the correct values for the mean and variance of $X|\beta$. The most common mistake was to confuse $E[\beta^2]$ with $E[\beta]^2$ or confuse $E[\beta(1 + \beta)]$ with $E[\beta](1 + E[\beta])$. On both subparts, some candidates failed to show enough work for full credit.

## Part d (3 points)

You are given the following annual claims data for the portfolio

| Number of Claims in a policy year | Number of Policies |
|---|---|
| 0 | 2,230 |
| 1 | 209 |
| 2 | 41 |
| 3 | 12 |
| 4 | 8 |
| **Total** | **2,500** |

(i) Show that $\hat\mu = 0.14$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

(ii) Calculate the standard deviation of the claim frequency for the portfolio.

(iii) Show that $\hat a = 0.03$ to the nearest 0.01. You should calculate the value to the nearest 0.001.

(iv) Calculate $\hat v$.

### Explanation
(i)

$$\hat\mu = \bar X = \frac{(0)(2230) + 1(209) + 2(41) + 3(12) + 4(8)}{2500} = 0.1436$$

(ii)

$$s^2 = \frac{(0^2)(2230) + 1^2(209) + 2^2(41) + 3^2(12) + 4^2(8)}{2500} - (0.1436)^2\left(\frac{2500}{2499}\right) = 0.22307$$

so that the standard deviation is $\sqrt{0.22307} = 0.4723$

(iii)

$$\hat a = \frac{0.22307 - 0.1436(1.1436)}{2} = 0.02942$$

(iv)

$$\hat\nu + \hat a = s^2 \quad \textit{so that} \quad \hat\nu = s^2 - \hat a = 0.22307 - 0.02942 = 0.193645$$

Alternatively, $\hat\nu = E[X](1 + E[X]) + \hat a = (0.1436)(1.1436) + 0.02942 = 0.19364$

### Examiner Report
Part (i) of (d) was in general done very well, as was, to a lesser extent, part (ii). The most common errors for (ii) were giving the variance but not the standard deviation, and not showing sufficient work. No points were deducted for omitting the factor of (2500/2499).

For full credit, it is expected to show any formulas used. It is insufficient to write "Used calculator" or "Used Excel".

For (d) (iv), many candidates tried to use $\nu = E[\beta(1 + \beta)]$, but approximated this quantity as $\hat\nu = \hat\beta(1 + \hat\beta) = 0.1436(1.1436)$.

## Part e (2 points)

(i) Calculate the Bühlmann Credibility estimate of the expected claim frequency for a policy which has been in force for 1 year and had 1 claim in that year.

(ii) Calculate the Bühlmann Credibility estimate of the expected claim frequency for a policy that has been in force for 5 years and had 1 claim each year in that period.

(iii) Explain why the expected claim frequency for the policy in (e)(i) is less than the expected claim frequency for the policy in (e)(ii), even though the historical claim frequencies are the same.

### Explanation
(i)

$$Z = \frac{1}{1 + \frac{\hat\nu}{\hat a}} = \frac{1}{1 + \frac{0.193645}{0.02942}} = 0.1319$$

$$P = Z \times \bar X + (1 - Z) \times \hat\mu = 0.1319(1) + (1 - 0.1319)(0.1436) = 0.2566$$

(ii)

$$Z = \frac{5}{5 + \hat\nu/\hat a} = \frac{5}{5 + \frac{0.193645}{0.02942}} = 0.4317$$

$$P = Z \times \bar X + (1 - Z) \times \hat\mu = 0.4317(1) + (1 - 0.4317)(0.1436) = 0.5133$$

(iii) A claim frequency of 1 per year is much higher than the portfolio average, of around 1 every 7 years. After only 1 year, this claim frequency is not given much weight, it might just be bad luck. With 5 claims in 5 years, the high claim frequency now looks more systematic, indicating that this driver is particularly high risk. More data means higher weight/credibility on their individual experience, lass on the prior.

### Examiner Report
A significant minority of candidates omitted part (e), though the candidates who attempted it generally did well on this part.

Some candidates misunderstood the data to be one claim total over five years rather than one claim in each of the last five years (five claims total).
