---
id: "altam-056"
exam: "Exam ALTAM"
topic: "Guaranteed Minimum Maturity Benefit"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Equity-Linked+Insurance
  - Concepts/Black-Scholes+Model
  - Concepts/Replicating+Portfolio
  - Concepts/Risk-Neutral+Valuation
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:2583eeb946638edd9098919596cd6302b919f59b05f54afe68cb7441353dcc9f
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q56, pp.103 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q56, pp.111-112 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-056.md
---

A 10-year equity-linked policy is issued to ($x$). The policy offers a guaranteed minimum maturity benefit of 100% of the initial single premium. After an initial expense charge of 5% of the premium, the remainder is invested in separate fund. The insurer deducts a 0.2% management charge from the policyholder's fund at the end of each month, if the policyholder survives.

You are given:

- An investment at $t = 0$ of 1 in the underlying asset will have value $S_t$ at $t$, where $S_t$ follows a geometric Brownian motion, with volatility σ, and $S_0 = 1$.
- $\mathrm{BSP}(K) = \mathrm{E}_0^Q\left[e^{-10r}\left(K - S_{10}\right)^+\right]$ is the Black-Scholes option price formula for a put option on an investment of 1 in the underlying stock at time 0, with strike price K.
- There are no exits other than death.

## Part a

Show that the risk-neutral value of the GMMB option at issue is

$$\pi(0) = P\left({}_{10}p_x\,\xi\,\mathrm{BSP}(K^*)\right)$$

You should state any assumptions you need, and you should define the parameters ξ and $K^*$ in terms of the information given about this specific contract.

### Explanation

$\pi(0) = \mathrm{E}_0^Q\left[e^{-10r}\left(kP - F_{10}\right)^+\,\mathrm{I}(T_x > 10)\right]$ where $P$ is the premium, $k$ is the proportion of premium guaranteed under the GMMB, $r$ is the risk free rate, $F_{10}$ is the fund value at time 10, and I($T_x$ >10) is an indicator random variable taking the value 1 if ($x$) survives 10 years, 0 otherwise. The Q superscript indicates that we are taking expectations under the risk neutral measure, and the 0 subscript indicates that we are valuing based on the information available at time 0.

In our case, $k = 1$, and $F_t = P(0.95)e^{-12(0.002)t}S_t$, for $t = 0, \tfrac{1}{12}, \tfrac{2}{12}, \tfrac{3}{12}, \cdots, 10$.

We assume that the $T_x$ and $F_t$ random variables are independent, and that the Q and P measure expectations for the future lifetime are the same. Then

$$\mathrm{E}_0^Q\left[I(T_x > 10)\right] = \Pr\left[T_x > 10\right] = {}_{10}p_x.$$

Also let $\xi = 0.95\left(e^{-120 * 0.002}\right) \Rightarrow F_{10} = P\xi S_{10}$

Then

$$\begin{align*}
\pi(0) &= {}_{10}p_x\,\mathrm{E}_0^Q\left[e^{-10r}\left(P - P\xi S_{10}\right)\right] \\
&= {}_{10}p_x\,P\,\xi\,\mathrm{E}_0^Q\left[e^{-10r}\left(\frac{1}{\xi} - S_{10}\right)\right] \\
&= {}_{10}p_x\,P\,\xi\,\mathrm{BSP}\left(1/\xi\right)
\end{align*}$$

as required, with $\xi = 0.74730$ and $K^* = \xi^{-1}$.

## Part b

Given σ = 0.25, $x = 60$, $P = 100{,}000$, Standard Ultimate Life Table mortality, and $r = 0.04$, show that $\pi(0) = 17{,}100$ to the nearest 100.

### Explanation

$${}_{10}p_{60} = 0.94255; \quad P = 100{,}000; \quad \xi = 0.747230 \text{ (as printed)}$$

$$\begin{align*}
{}_{10}p_{60}\,P\,\xi\,BSP\left(1/\xi\right) &= {}_{10}p_{60}\,P\,\xi\left(\frac{1}{\xi}e^{-10r}\,\Phi(-d_2) - \Phi(-d_1)\right) \\
&= {}_{10}p_{60}\,P\left(e^{-10r}\,\Phi(-d_2) - \xi\,\Phi(-d_1)\right)
\end{align*}$$

$$d_1 = \frac{\log(\xi) + (r + \sigma^2/2)(10)}{\sigma\sqrt{10}} = 0.53279; \quad d_2 = d_1 - \sigma\sqrt{10} = -0.25778$$

$$\begin{align*}
\Rightarrow \pi(0) &= 0.94255(100{,}000)\left(e^{-10 \times 0.04}\,\Phi(0.25778) - 0.74723\text{ (as printed)}\,\Phi(-0.53279)\right) \\
&= 0.94255(100{,}000)(0.181325) \\
 &= 17{,}091
\end{align*}$$

The normal cdf values are found using Excel.

## Part c

Assume that the insurer constructs a hedge portfolio at $t = 0$ based on the Black Scholes option valuation. The insurer does not rebalance the hedge until one month later. You are given that in the first month, the underlying asset values fell by 3%. Calculate the value of the hedge portfolio at the end of the first month, before rebalancing.

### Explanation

The bond part of the hedge at $t = 0$ is ${}_{10}p_{60}\,P\,e^{-10(0.04)}\,\Phi(-d_2) = 38017$.

The stock part of the hedge at $t = 0$ is $-{}_{10}p_{60}\,P\,\xi\,\Phi(-d_1) = -20926$.

After one month, the bond part of the hedge is worth $38{,}017e^{0.04/12} = 38{,}144$

After one month, the stock part of the hedge is worth $-20{,}926(0.97) = -20{,}298$

The total hedge value before rebalancing is 17,846.

## Part d

You are given that, at $\delta = 2.40\%$, $a_{60:\overline{10|}}^{(12)} = 8.679$. Calculate the cost of the option as a monthly deduction from the fund, assuming no lapses.

### Explanation

Let c denote the annual rate of payment, and let $m = 12 \times 0.002$ denote the annual management charge rate. The equation of value, under the Q measure, is

$$\begin{align*}
17{,}091 &= \mathrm{E}_0^Q\left[\frac{c}{12}F_{1/12}\,e^{-r/12}\,I\left(T_{60} > 1/12\right)\right] + \mathrm{E}_0^Q\left[\frac{c}{12}F_{2/12}\,e^{-2r/12}\,I\left(T_{60} > 2/12\right)\right] + \ldots \\
&\quad \ldots + \mathrm{E}_0^Q\left[\frac{c}{12}F_{9\,11/12}\,e^{-9\,11/12 \times r}\,I\left(T_{60} > 9\,11/12\right)\right] + \mathrm{E}_0^Q\left[\frac{c}{12}F_{10}\,e^{-10r}\,I\left(T_{60} > 10\right)\right] \\
&= \left(\frac{c}{12}\right)P(0.95)\Big\{{}_{1/12}p_{60}\,\mathrm{E}_0^Q\left[S_{1/12}\,e^{-r/12}\,e^{-m/12}\right] + {}_{2/12}p_{60}\,\mathrm{E}_0^Q\left[S_{2/12}\,e^{-2r/12}\,e^{-2m/12}\right] + \cdots \\
&\quad + \cdots + {}_{9\,11/12}p_{60}\,\mathrm{E}_0^Q\left[S_{9\,11/12}\,e^{-9\,11/12 \times r}\,e^{-9\,11/12 \times m}\right] + {}_{10}p_{60}\,\mathrm{E}_0^Q\left[S_{10}\,e^{-10r}\,e^{-10m}\right]\Big\}
\end{align*}$$

Note that under the risk neutral measure, $\mathrm{E}_0^Q\left[S_t e^{-rt}\right] = S_0$, and in this case $S_0 = 1$, so we have

$$\begin{align*}
17{,}091 &= \frac{c}{12}(0.95)P\left\{{}_{1/12}p_{60}\,e^{-m/12} + {}_{2/12}p_{60}\,e^{-2m/12} + {}_{3/12}p_{60}\,e^{-3m/12} + \cdots + {}_{10}p_{60}\,e^{-10m}\right\} \\
&= \frac{c}{12}(0.95)P\left(12a_{60:\overline{10|}}^{(12)}\right)
\end{align*}$$

at $i = e^m - 1 = 2.429\%$

$$\Rightarrow c = \frac{17{,}091}{0.95Pa_{60:\overline{10|}}^{(12)}} = 0.0207$$

The monthly rate of deduction is thus $\frac{0.0207}{12} = 0.0017$.
