---
aliases:
  - Mean Excess
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:23d197cd039962f601977d0a77568271de80090587b6eb681d742f7829b55b73
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mean Excess Loss.md
---

The **Mean Excess Loss** $e_X(d)$ is the expected amount by which a loss exceeds $d$, given that it does exceed $d$. In insurance terms, it is the expected payment per payment under an ordinary [[Deductible|deductible]] of $d$. As a function of $d$, it is one of the measures used to compare the [[Tail Weight|tails]] of two severity distributions.

> $$e_X(d) = E[X - d \mid X > d]$$

> $$e_X(d) = \frac{\int_d^{\infty} S_X(x)\,dx}{S_X(d)}$$

> $$e_X(d) = \frac{E[X] - E[X \wedge d]}{S_X(d)}$$

- **Symbols:** $S_X = 1 - F_X$ is the survival function and $E[X \wedge d]$ is the [[Limited Expected Value|limited expected value]]. For a positive loss, $e_X(0) = E[X]$. The cost per loss is $E[(X - d)_+] = e_X(d)\,S_X(d)$, which is the [[Payment Random Variable|per-loss]] counterpart of this per-payment quantity.
- **Standard shapes:** The [[Exponential Distribution|exponential]] has a constant mean excess, $e_X(d) = \theta$, because it is memoryless. The [[Pareto Distribution|Pareto]] has $e_X(d) = (d + \theta)/(\alpha - 1)$ for $\alpha > 1$, which increases linearly, and a uniform loss on $(0, \omega)$ has $e_X(d) = (\omega - d)/2$, which decreases to zero.
- **Tail comparison:** An increasing mean excess function signals a heavy tail and a decreasing one a light tail. It moves opposite to the [[Hazard Rate|hazard rate]]: a decreasing hazard rate gives an increasing mean excess, and an increasing hazard rate a decreasing one. When the limits exist, L'Hôpital's rule gives $\lim_{d \to \infty} e_X(d) = \lim_{d \to \infty} 1/h_X(d)$.
- **Extreme values:** The [[Generalized Pareto Distribution|generalized Pareto distribution]] has a mean excess function that is a straight line. That is why the empirical mean excess function, the average of the observations above $x_{(j)}$ minus $x_{(j)}$, is plotted to choose the threshold for a peaks-over-threshold fit.

> [!example]- Mean Excess for a Bounded Loss {Example}
> A loss has survival function $S_X(x) = (1 - x/10{,}000)^2$ for $0 \le x \le 10{,}000$. Find the mean excess loss at $d = 1{,}000$ by the limited expected value formula, then find $e_X(d)$ in general and describe the tail.
>
> > [!answer]-
> > Integrating the survival function gives $E[X \wedge d] = \frac{10{,}000}{3}\left[1 - (1 - d/10{,}000)^3\right]$, so $E[X] = 3{,}333.33$.
> > $$
> > \begin{align*}
> > E[X \wedge 1{,}000] &= 3{,}333.33\,(1 - 0.9^3) \\
> > &= 903.33 \\
> > e_X(1{,}000) &= \frac{3{,}333.33 - 903.33}{0.81} \\
> > &= 3{,}000
> > \end{align*}
> > $$
> > In general, $\int_d^{10{,}000} S_X(x)\,dx = \frac{10{,}000}{3}(1 - d/10{,}000)^3$, so $e_X(d) = (10{,}000 - d)/3$. With a deductible of 1,000, the average payment is 3,000, and with a deductible of 4,000, it falls to 2,000. The mean excess falls to zero at the maximum loss, and the hazard rate $2/(10{,}000 - x)$ increases, so this tail is light.

> [!example]- Mixed Exponentials Versus a Pareto {Example}
> Model A is an equal mixture of exponentials with means 500 and 5,000. Model B is Pareto with $\alpha = 3$ and $\theta = 5{,}500$. Both have mean 2,750. Compare their mean excess losses at 1,000 and at 20,000, and decide which tail is heavier.
>
> > [!answer]-
> > For Model A, $E[X \wedge 1{,}000] = 0.5(500)(1 - e^{-2}) + 0.5(5{,}000)(1 - e^{-0.2}) = 669.34$ and $S(1{,}000) = 0.5e^{-2} + 0.5e^{-0.2} = 0.477033$.
> > $$
> > \begin{align*}
> > e_A(1{,}000) &= \frac{2{,}750 - 669.34}{0.477033} \\
> > &= 4{,}361.67 \\
> > e_B(1{,}000) &= \frac{1{,}000 + 5{,}500}{2} \\
> > &= 3{,}250
> > \end{align*}
> > $$
> > At 20,000, the short-mean component of Model A has all but vanished, so $e_A(20{,}000) = 5{,}000$, while $e_B(20{,}000) = 12{,}750$. The two survival probabilities there are close, 0.0092 for A and 0.0100 for B. Model A's mean excess rises and then levels off at 5,000, while Model B's grows without limit, so Model B has the heavier tail even though Model A's mean excess is larger at 1,000. A layer high above 20,000 costs far more under Model B.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to compare two distributions based on characteristics of their tails, including moments, the limiting ratio of tails, hazard rate functions and mean excess functions. A question gives two severity models and asks for each measure and for which tail is heavier.
> - **FAM** uses the mean excess loss as the expected payment per payment under an ordinary deductible, so it appears in coverage-modification questions through $E[X] - E[X \wedge d]$ divided by $S_X(d)$.
> - **Choosing a threshold:** In ASTAM's extreme value reading, a question gives the largest observations and asks for the empirical mean excess function at a point, or asks where its plot becomes linear enough to fit a generalized Pareto distribution.

> [!warning]- Exam traps
> - **Per payment, not per loss:** $e_X(d)$ averages over losses above $d$ only. The expected cost per loss is $e_X(d)\,S_X(d)$, which is smaller.
> - **The excess, not the loss:** $e_X(d)$ is the amount above $d$, so the average size of a loss that exceeds $d$ is $d + e_X(d)$. The Expected Shortfall uses that larger quantity at $d = \text{VaR}$.
> - **Directions:** A heavy tail has an increasing mean excess and a decreasing hazard rate. Swapping the two directions reverses the conclusion.
> - **Increasing is not enough:** A mixture of exponentials has an increasing mean excess function, yet every moment exists and it stays light-tailed. The limit of $e_X(d)$, not its direction over a short range, is what separates a Pareto-type tail.
