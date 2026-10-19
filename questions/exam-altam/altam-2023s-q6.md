---
id: "altam-2023s-q6"
exam: "Exam ALTAM"
topic: "Guaranteed Minimum Maturity Benefit"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Guaranteed+Minimum+Income+Benefit
  - Concepts/Black-Scholes+Model
  - Concepts/Replicating+Portfolio
  - Concepts/Delta+Hedging
  - Concepts/Equity-Linked+Insurance
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bf27a094ad129e2dc3de6274ff072de97584d3f4879eeb9a67267e00496f102b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023s-q6.md
---

## Part a (2 points)

In the context of a Variable Annuity policy, describe the difference between a Guaranteed Minimum Maturity Benefit (GMMB) and a Guaranteed Minimum Income Benefit (GMIB).

### Explanation
A Guaranteed Minimum Maturity Benefit offers a guaranteed lump sum payment if the policyholder survives in force to the contract maturity date.

At maturity, if the policyholder's account value is less than the GMMB, the insurer must fund the difference.

A GMIB offers a guaranteed lifetime income at maturity. The amount of income is usually specified in terms of a Benefit Base (BB) and a guaranteed annuitization rate.

The guaranteed annuity rate multiplied by the BB gives the annual income under the guarantee. This is typically paid as a life annuity, often with a guaranteed minimum payment period. At maturity, the insurer must fund the difference, if greater than 0, between the value of the annuity benefit and the policyholder's account value.

The GMIB is typically added to a VA contract as a rider, additional to the GMMB. The policyholder can select whether to take the GMMB lump sum or the GMIB income at maturity.

### Examiner Report
This proved to be a challenging question for many candidates.

In (a), most candidates gave answers that were incorrect, or that were too brief for substantial credit. Many skipped this part.

## Part b (4 points)

An insurer issues a 10-year Variable Annuity with a single premium of 10,000 to (50).

You are given:

(i) The GMMB is 90% of the single premium. There are no other guarantees.

(ii) The initial expense charge is 6% of the premium.

(iii) The management charge is 0.2% of the policyholder's fund, deducted at the end of each month, including at time 10.

(iv) The underlying fund asset value follows a geometric Brownian motion, with volatility $\sigma = 0.25$.

(v) The risk-free rate is $r = 4\%$ per year, compounded continuously.

(vi) There are no exits other than death.

(vii) Mortality is assumed to follow the Standard Ultimate Life Table.

The insurer uses the Black-Scholes formula to construct a hedge portfolio of 10-year zero-coupon bonds and the underlying fund assets.

(i) (3 points) Show that the value of the hedge portfolio at time 0 is 1400 to the nearest 100. You should calculate the value to the nearest 1.

(ii) (1 point) Write down the value of the bond portion of the hedge portfolio at time 0.

### Explanation
**(i)** $\pi(0) = {}_{10}p_{50}\,p(0)$ where $p(0)$ is the put option price.

$$
{}_{10}p_{50} = l_{60}/l_{50} = 0.980297
$$

$$
p(0) = Ke^{-10r}\,\Phi(-d_2(0)) - S_0(0.94)(0.998)^{120}\,\Phi(-d_1(0))
$$

$K = 9000$; $S_0(0.94)(0.998)^{120} = 7392.5$; $\sigma = 0.25$; $r = 0.04$

$$
d_1(0) = \frac{\log(7392.5/K) + \left(r + \sigma^2/2\right)(10)}{\sigma\sqrt{10}} = 0.6524 \qquad d_2(0) = d_1(0) - \sigma\sqrt{10} = -0.1382
$$

$$
\begin{align*}
\Rightarrow p(0) &= 9000e^{-0.4}\,\Phi(0.1382) - 7392.5\,\Phi(-0.6524) \\
&= 9000e^{-0.4}(0.55496) - 7392.5(0.25708) \\
&= 3348.0 - 1900.5 \\
&= 1447.5
\end{align*}
$$

$$
\Rightarrow \pi(0) = 0.980297(3348.0 - 1900.5) = 3282.0 - 1863.0 = 1419.0
$$

**(ii)** The bond portion is 3282.0 (i.e. the first term in $\pi(0)$)

### Examiner Report
In (b) most candidates earned substantial partial credit, but very few earned the maximum points. The 90% guarantee was omitted by many candidates, or was applied incorrectly. A few candidates did not realize that they needed to use Excel to determine the required Normal Distribution probabilities.

## Part c (4 points)

The insurer does not rebalance the hedge portfolio until time 1. At that time the policy is still in force and the price of the underlying fund assets has increased by 5%.

Calculate the rebalancing cost for the hedge portfolio.

### Explanation
The cost of the hedge required at time 1 is

$\pi(1) = {}_9p_{51}\,p(1)$ where $p(1)$ is the put option price.

$$
{}_9p_{51} = l_{60}/l_{51} = 0.981483
$$

$$
p(1) = Ke^{-9r}\,\Phi(-d_2(1)) - S_1(0.94)(0.998)^{120}\,\Phi(-d_1(1))
$$

$$
S_1(0.94)(0.998)^{120} = 1.05S_0(0.94)(0.998)^{120} = 7762.2
$$

$$
d_1(1) = \frac{\log(7762.2/K) + \left(r + \sigma^2/2\right)(9)}{\sigma\sqrt{9}} = 0.6577
$$

$$
d_2(1) = d_1(1) - \sigma\sqrt{9} = -0.09229
$$

$$
\begin{align*}
\Rightarrow p(1) &= 9000e^{-0.36}\,\Phi(0.09229) - 7762.2\,\Phi(-0.6577) \\
&= 9000e^{-0.36}(0.53677) - 7762.2(0.25536) \\
&= 1388.2
\end{align*}
$$

$$
\Rightarrow \pi(1) = 0.98148(3370.4 - 1982.2) = 1362.5
$$

The hedge brought forward (allowing for survival bonus) is

$$
\left(3282.0e^{0.04} - 1863.0(1.05)\right)\frac{l_{50}}{l_{51}} = 1461.5
$$

The rebalancing cost is therefore $1362.5 - 1461.5 = -99.0$ (gain)

### Examiner Report
In (c), some candidates did not calculate the rolled forward value of the time 0 hedge portfolio, and few candidates recognized the need to adjust for the survival bonus. Many candidates skipped this part altogether.
