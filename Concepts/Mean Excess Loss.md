---
aliases:
  - Mean Excess
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:77c97e167785d8b6b47fd999282d6327f17dd7f0d1ea0a1c350a8acbff9e128b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mean Excess Loss.md
---

The **Mean Excess Loss** $e_X(d)$ is the expected amount by which a loss exceeds $d$, given that it does exceed $d$. In insurance terms, it is the expected payment per payment under an ordinary [[Deductible|deductible]] of $d$.

For a loss $X$, the mean excess loss at $d$ is

> $$e_X(d) = E[X - d \mid X > d]$$

> $$e_X(d) = \frac{\int_d^{\infty} S_X(x)\,dx}{S_X(d)}$$

> $$e_X(d) = \frac{E[X] - E[X \wedge d]}{S_X(d)}$$

- $S_X = 1 - F_X$ is the survival function.
- $E[X \wedge d]$ is the [[Limited Expected Value|limited expected value]] at $d$.

For a positive loss, $e_X(0) = E[X]$. The mean excess loss is the amount above $d$, so the average size of a loss that exceeds $d$ is $d + e_X(d)$. The Expected Shortfall of a continuous loss uses that larger quantity at $d = \text{VaR}$.

> [!example]- A loss has $S_X(x) = (1 - x/10{,}000)^2$ for $0 \le x \le 10{,}000$. What is its mean excess loss at $d = 1{,}000$, and at any $d$? {Example}
> - Integrating the survival function gives $E[X \wedge d] = \frac{10{,}000}{3}\left[1 - (1 - d/10{,}000)^3\right]$, so $E[X] = 3{,}333.33$.
> - $E[X \wedge 1{,}000] = 3{,}333.33\,(1 - 0.9^3) = 903.33$, and $S_X(1{,}000) = 0.9^2 = 0.81$.
> - $e_X(1{,}000) = (3{,}333.33 - 903.33)/0.81 = 3{,}000$.
> - In general, $\int_d^{10{,}000} S_X(x)\,dx = \frac{10{,}000}{3}(1 - d/10{,}000)^3$, so $e_X(d) = (10{,}000 - d)/3$.
> - With a deductible of 1,000 the average payment is 3,000, and with a deductible of 4,000 it falls to 2,000.

## Payment per loss

The mean excess loss averages over the losses above $d$ only. Averaged over every loss, with the losses below $d$ paying nothing, the [[Payment Random Variable|per-loss]] cost is

> $$E[(X - d)_+] = e_X(d)\,S_X(d)$$

- $(X - d)_+$ is $X - d$ when $X > d$ and 0 otherwise.

The per-loss cost is also $E[X] - E[X \wedge d]$, or $\int_d^{\infty} S_X(x)\,dx$. With no deductible, it is $E[X]$.

## Mean excess loss of common distributions

- The [[Exponential Distribution|exponential]] has a constant mean excess, $e_X(d) = \theta$, because it is memoryless.
- The [[Pareto Distribution|Pareto]] has $e_X(d) = (d + \theta)/(\alpha - 1)$ for $\alpha > 1$, which increases linearly, with slope $1/(\alpha - 1)$ and intercept $\theta/(\alpha - 1)$.
- A uniform loss on $(0, \omega)$ has $e_X(d) = (\omega - d)/2$, which decreases to zero.

A flat empirical mean excess function points to an exponential, with mean equal to the constant. A straight line fitted to a rising one gives a Pareto with $\alpha = 1 + 1/\text{slope}$ and $\theta = \text{intercept}/\text{slope}$.

## Comparing tails

As a function of $d$, the mean excess loss is one of the measures used to compare the [[Tail Weight|tails]] of two severity distributions. An increasing mean excess function signals a heavy tail and a decreasing one a light tail. It moves opposite to the [[Hazard Rate|hazard rate]]: a decreasing hazard rate gives an increasing mean excess, and an increasing hazard rate a decreasing one. When the limits exist, L'Hôpital's rule gives $\lim_{d \to \infty} e_X(d) = \lim_{d \to \infty} 1/h_X(d)$.

A mixture of exponentials has an increasing mean excess function, yet every moment exists and it stays light-tailed. The limit of $e_X(d)$, not its direction over a short range, is what separates a Pareto-type tail.

> [!example]- Which of these two models has the heavier tail? {Example}
> Model A is an equal mixture of exponentials with means 500 and 5,000. Model B is Pareto with $\alpha = 3$ and $\theta = 5{,}500$. Both have mean 2,750.
>
> > [!answer]-
> > - For Model A, $E[X \wedge 1{,}000] = 0.5(500)(1 - e^{-2}) + 0.5(5{,}000)(1 - e^{-0.2}) = 669.34$ and $S(1{,}000) = 0.5e^{-2} + 0.5e^{-0.2} = 0.477033$.
> > - So $e_A(1{,}000) = (2{,}750 - 669.34)/0.477033 = 4{,}361.67$, while $e_B(1{,}000) = (1{,}000 + 5{,}500)/2 = 3{,}250$.
> > - At 20,000, the short-mean component of Model A has all but vanished, so $e_A(20{,}000) = 5{,}000$, while $e_B(20{,}000) = 12{,}750$.
> > - The two survival probabilities there are close, 0.0092 for A and 0.0100 for B.
> > - Model A's mean excess rises and then levels off at 5,000, while Model B's grows without limit, so Model B has the heavier tail even though Model A's mean excess is larger at 1,000.
> > - A layer high above 20,000 costs far more under Model B.

## Empirical mean excess function

The [[Generalized Pareto Distribution|generalized Pareto distribution]] has a mean excess function that is a straight line. That is why the empirical mean excess function, the average of the observations above $x_{(j)}$ minus $x_{(j)}$, is plotted to choose the threshold for a peaks-over-threshold fit.

> [!trap] Per payment, not per loss
> $e_X(d)$ averages over losses above $d$ only. The expected cost per loss is $e_X(d)\,S_X(d)$, which is smaller. For the bounded loss above, the payment per payment at $d = 1{,}000$ is 3,000, but the cost per loss is $3{,}000 \times 0.81 = 2{,}430$.
