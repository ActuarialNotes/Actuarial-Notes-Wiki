---
id: "altam-061"
exam: "Exam ALTAM"
topic: "Guaranteed Minimum Death Benefit"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Guaranteed+Minimum+Death+Benefit
  - Concepts/Equity-Linked+Insurance
  - Concepts/Black-Scholes+Model
  - Concepts/Replicating+Portfolio
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
points: 4
---

Your company issues 2-year equity-linked policies to lives age 85. Policyholders pay a single premium of 10,000. The insurer deducts a management charge of 3% of the fund value at the start of each year, including the first. There are no other expense deductions. The fund price is 1 per share at inception. There is no guaranteed minimum maturity benefit.

If the policyholder dies during the contract term, the death benefit, payable at the end of the year of death, is the fund value at the end of the year, or the guaranteed minimum death benefit (GMDB) if larger. The GMDB is the premium accumulated at 6% compounded continuously.

## Part a

Let $\{S_t\}_{t>=0}$ denotes the stock price process. Calculate the highest ratio of $S_2/S_0$ such that the benefit payable for a death at time 1.3 would be the GMDB. Your answer should be 1.20 to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation

Fund value at time 2 is $\left(\frac{S_2}{S_0}\right)10{,}000(0.97^2) = 9409\left(\frac{S_2}{S_0}\right)$

GMDB during year 2 is $10{,}000e^{2(0.06)} = 11{,}274.97$.

Those are equal if $\left(\frac{S_2}{S_0}\right) = \frac{11{,}274.97}{9409} = 1.1983$. Anything higher, and the death benefit will be the fund value.

## Part b

The insurer constructs a hedge portfolio at the issue date, after deduction of the management charge, based on the Black-Scholes option valuation.

You are given the following assumptions:

- (i) The risk-free rate is $r = 0.04$ continuously compounded.
- (ii) The volatility is $\sigma = 0.30$.
- (iii) Mortality follows the Standard Ultimate Mortality Model.
- (iv) There are no exits other than death.

- (i) Show that, in the calculation of the contribution of year 1 to the cost of the hedge portfolio at issue, $d_1$ is -0.018 to the nearest 0.001. You should calculate the value to the nearest 0.0001.
- (ii) Show that the cost of the contribution of year 1 to the cost of the hedge portfolio at issue is 77 to the nearest 1. You should calculate the value to the nearest 0.01.
- (iii) Calculate the cost of the hedge portfolio at issue.
- (iv) Let $c$ denote the component of the annual 3% management charge that is required to fund the GMDB guarantee. You are given that $c$ is a portion of the 3% annual charge at the start of each year, not an additional charge. Calculate $c$.
- (v) Without further calculation, state with reason whether the cost of the hedge portfolio at issue would decrease if the fund price were 2 per share at inception.

### Explanation

The Death Benefit for death in year 1 is

$$\begin{align*}
\max(10{,}000e^{0.06}, F_1) &= \max\left(10{,}000e^{0.06},\ 0.97(10{,}000)\frac{S1}{S0}\right) \\
&= 9{,}700\max\left(\frac{e^{0.06}}{0.97} - \frac{S_1}{S_0},\ 0\right)
\end{align*}$$

which is 9,700 times the payoff of a put option with strike price $\frac{e^{0.06}}{0.97} = 1.09468$.

**(i)**

$$d_1(0,1) = \frac{\left[\ln\left(\frac{(1-0.03)^1}{e^{0.06(1)}}\right) + \left(0.04 + \frac{0.30^2}{2}\right)(1)\right]}{\left[(0.30)1^{0.5}\right]} = -0.018197$$

**(ii)**

$$\begin{align*}
d_2(0,1) &= d_1(0,1) - \left[(0.30)1^{0.5}\right] \\
         &= -0.318197 \\
v(0,1) &= 9{,}700\left[1.09468\,e^{-0.04}\,NORM.S.DIST(0.318197,1) - NORM.S.DIST(0.018197,1)\right] \\
       &= 1{,}454.13
\end{align*}$$

Contribution to hedge portfolio $= q_{85}\,(1{,}454.13) = 0.057665(1{,}454.13) = 83.85$

**(iii)**

$$\begin{align*}
d_1(0,2) &= \frac{\left[\ln\left(\frac{(1-0.03)^2}{e^{0.06(2)}}\right) + \left(0.04 + \frac{0.30^2}{2}\right)(2)\right]}{\left[(0.30)2^{0.5}\right]} \\
         &= -0.025735 \\
d_2(0,2) &= d_1(0,2) - \left[(0.30)2^{0.5}\right] \\
         &= -0.449999 \\
v(0,2) &= 10{,}000(0.97^2)\left[1.09468^2\,e^{-0.04(2)}\,NORM.S.DIST(0.44999,1) - NORM.S.DIST(0.025735,1)\right] \\
       &= 2{,}210.27
\end{align*}$$

Contribution to hedge portfolio $= {}_{1|}q_{85}\,(2{,}210.27) = 0.060831(2{,}210.27) = 134.45$

Hedge portfolio $= 83.85 + 134.45 = 218.30$

**(iv)** (See solution to Example 17.6 for how this formula arises)

$$\begin{align*}
218.30 &= 10{,}000\,c\,(1 + (1 - 0.03)p_{85}) \\
       &= 10{,}000(1 + 0.97(0.942335))\,c \\
&= 19{,}140.65\,c
\end{align*}$$

$$c = 0.0114$$

**(v)** The cost would not change. Chapter 17 of <u>AMLCR</u> uses the convention that $S_0 = 1$, but $S_0$ is an index of stock prices. (As noted on page 632, "We interpret the stock price process as an index for the fund assets; as an index. We can arbitrarily set $S_0$ to any convenient value.)

## Part c

At the end of year 1, the fund price per share has doubled from its initial value. The insurer offers, and the policyholder accepts, a reset. Future GMDBs are based on the fund value at the end of year 1, accumulated as before. The insurer calculates a new hedge portfolio

- (i) Let $D$ be the value of d<sub>1</sub> in the calculation of the first year after reset to the cost of the hedge portfolio. Show that the ratio of $D$ to your answer to (b)(i) is 1.00 to the nearest 0.01.
- (ii) Calculate the value of the hedge portfolio at time 1.

### Explanation

**(i)**

$$d_1 = \left[\ln\left(\frac{(1-0.03)^1}{e^{0.06(1)}}\right) + \left(0.04 + \frac{0.30^2}{2}\right)(1)\right] \Big/ \left[(0.30)1^{0.5}\right] = -0.018197$$

Exactly the same as before. The exact value of the assets on the calculation of the hedge portfolio does not appear, because it is irrelevant. Asset values follow the same lognormal price process from that point, and the GMDBs (the strike prices) are the same multiples of the starting assets)

So, the ratio of the $d_1$'s is 1.000000000...

**(ii)** Similarly, $d_2$ is the same as before.

The assets at the end of year 1 are $10{,}000(2)(0.97) = 19{,}400$

The Reset Death Benefit for death in year 1 is

$$\begin{align*}
max(10{,}000e^{0.06}, F_2) &= max\left(19{,}400e^{0.06},\ 0.97(19{,}400)\frac{S_2}{S_1}\right) \\
&= 18{,}818\,max\left(\frac{e^{0.06}}{0.97} - \frac{S_2}{S_1},\ 0\right)
\end{align*}$$

which is 18,818 times the payoff of a 1-year put option at time 1 with strike price $\frac{e^{0.06}}{0.97} = 1.09468$

$$v(1,2) = 18{,}818\left[1.09468\,e^{-0.04}\,NORM.S.DIST(0.318197,1) - NORM.S.DIST(0.018197,1)\right] = 2821.02$$

Contribution to hedge portfolio is $q_{86}\,(2{,}821.02) = 0.064555(2{,}821.02) = 182.11$

$$v(1,3) = 18{,}818(0.97)\left[1.09468^2\,e^{-0.04(2)}\,NORM.S.DIST(0.44999,1) - NORM.S.DIST(0.025735,1)\right] = 4{,}287.93$$

Contribution to hedge portfolio is $= {}_{1|}q_{86}\,(4{,}287.93) = 0.067574(4{,}287.93) = 289.76$

Hedge portfolio $= 182.11 + 289.76 = 471.87$

## Part d

The insurer decides it will also offer these policies with a GMMB as an option, either with no GMDB or with the existing GMDB.

Let Value<sup>GMDB</sup>, Value<sup>GMMB</sup>, and Value<sup>both</sup> denote the corresponding values of the hedge fund at time 0. Your colleague suggests that Value<sup>both</sup> < Value<sup>GMDB</sup> + Value<sup>GMMB</sup>, since the GMDB and GMMB payouts are negatively correlated.

State whether you agree with your colleague. Justify your response.

### Explanation

Your colleague is wrong. Expected values are additive, whether or not the underlying events are independent.
