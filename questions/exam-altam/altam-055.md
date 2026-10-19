---
id: "altam-055"
exam: "Exam ALTAM"
topic: "Equity-Linked Insurance"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Equity-Linked+Insurance
  - Concepts/Guaranteed+Minimum+Death+Benefit
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Black-Scholes+Model
  - Concepts/Profit+Testing
  - Concepts/Profit+Signature
points: 7
---

An insurer issues a 3-year equity-linked insurance policy to ($x$). The policyholder pays a single premium of 5000, and an additional policy fee of 350. The insurer invests 100% of the premium in a separate account, with management charges of 2.5% of the fund value deducted at the start of each year including the first.

The policy offers a Guaranteed Minimum Death Benefit and a Guaranteed Minimum Maturity Benefit of 100% of the initial premium (excluding the policy fee).

The insurer stress tests the profitability of the contract using the following assumptions:

- Pre-contract expenses are 200
- Renewal expenses are 30 at the start of the 2<sup>nd</sup> and 3<sup>rd</sup> years.
- Fund management expenses are 2% of the policyholder's fund value at the start of the first year, and 1% of the policyholder's fund value at the start of the 2<sup>nd</sup> and 3<sup>rd</sup> years, before management charge deductions in each case.
- $q_{x+t} = 0.05 + 0.01t$ for $t = 0, 1, 2$.
- There are no lapses
- Interest of 5% per year is earned on the insurer's funds.
- No reserve is held for the contract guarantees in the insurer's assets.
- The insurer uses a risk discount rate of 10% per year.
- The return on the assets in the policyholder's fund for each of the three years (before any management charge deductions) are:

| | |
|---|---|
| Year 1 | –14% |
| Year 2 | –5% |
| Year 3 | + 4% |

## Part a

Show that the projected fund value at time 3 is 3940 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

*Note: This question is on a new topic. It is particularly suited to the use of Excel for calculations. The candidate would be expected to include all the detail given here, at a minimum, for full credit. It will not be sufficient to write down the numerical answers without explanation. Excel workbooks will not be submitted or graded.*

| $t$ | $F_t$ | MC<sub>t</sub> | $F_{t+1}$ |
|---|---|---|---|
| 0 | 5000.0 | 125.0 | 4192.5 |
| 1 | 4192.5 | 104.8 | 3883.3 |
| 2 | 3883.3 | 97.1 | 3937.7 |

Where $\mathrm{MC}_t = 0.025F_t$ and $F_{t+1} = \left(F_t - MC_t\right)\left(1 + R_t\right)$, and $R_t$ is the return on assets in the $t$-th year.

## Part b

Calculate the profit vector for the contract.

### Explanation

| $t$ | Income | Expenses | Interest | EDB<sub>t</sub> | EMB<sub>t</sub> | Pr<sub>t</sub> |
|---|---|---|---|---|---|---|
| 0* | | 200.0 | | | | -200.0 |
| 1 | 475.0 | 100.0 | 18.8 | 40.4 | | 353.4 |
| 2 | 104.8 | 71.9 | 1.6 | 67.0 | | -32.5 |
| 3 | 97.1 | 68.8 | 1.4 | 74.4 | 988.0 | -1032.7 |

Explanation:

- The income is the MC from part (a), plus 350 policy fee in the first year.
- Expenses at time 0 are the 200 pre-contract costs; in year 1 the expenses are 2% of F<sub>0</sub>; in year 2 and 3 the expenses are 1% of F<sub>t</sub>. plus 30.
- Interest is 5% of income – expenses.
- The expected death benefit cost, EDB<sub>t</sub>, is $q_{x+t-1}\left(5000 - F_t\right)^+$
- The expected maturity benefit cost, EMB<sub>t</sub> is 0 in the first two years. In the third year is is $p_{x+2}\left(5000 - F_3\right)^+$
- The Profit vector value for the t-th year is $\Pr_t = \text{Income}_t - \text{Expenses}_t + \text{Interest}_t - \text{EDB}_t - \text{EMB}_t$

## Part c

Show that the net present value of this contract, based on the stress test assumptions given, is –600 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation

| $t$ | Pr<sub>t</sub> | ${}_{t-1}p_x$ | $\Pi_t$ | NPV($t$) |
|---|---|---|---|---|
| 0 | -200.0 | | -200.0 | -200 |
| 1 | 353.4 | 1 | 353.4 | 121.2 |
| 2 | -32.5 | 0.95 | -30.8 | 95.8 |
| 3 | -1032.7 | 0.893 | -922.2 | -597.1 |

Explanation:

- Pr<sub>t</sub> is the profit vector from (b)
- ${}_{t-1}p_x$ is the survival probability to the start of the $t$-th year
- The profit signature at $t$ is $\Pi_t = {}_{t-1}p_x\,\Pr_t$ for $t \ge 1$; $\Pi_0 = \Pr_0$.
- NPV(t) is the partial NPV:

$$\begin{align*}
NPV(0) &= \Pi_0; \\
NPV(t) &= NPV(t-1) + \Pi_t\,v_{\text{rdr}}^t
\end{align*}$$

Where the discount factor uses the risk discount rate of 10%.

The NPV is NPV(3)= –597.1.

## Part d

The insurer can purchase options on the underlying fund assets to hedge the guarantees, using the following parameters:

- (i) Volatility, $\sigma = 0.25$
- (ii) The risk free rate is 4% per year compounded continuously
- (iii) Management charge deductions are 2.5% per year

Show that the price of a 3-year put option guaranteeing a return of premium is 0.136 per unit of premium, to the nearest 0.001. You should calculate the value to the nearest 0.0001.

### Explanation

The Black Scholes Price for a put option on a premium of $P$ with a guarantee of $kP$, is

$$\mathrm{BSP}(t) = P\left(k e^{-r(T-t)}\,\Phi(-d_2) - \xi\,\Phi(-d_1)\right)$$

where $\xi$ is the expense deduction factor, and

$$d_1 = \frac{\log(\xi/k) + (r + \sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}, \qquad d_2 = d_1 - \sigma\sqrt{T-t}.$$

In this case:

$$P = 1,\ k = 1,\ \xi = (1 - 0.025)^3 = 0.92686$$

$$\begin{align*}
d_1 &= \frac{\log(0.92686) + (0.04 + 0.25^2/2)3}{0.25\sqrt{3}} \\
    &= 0.318228 \\
d_2 &= 0.318228 - 0.25\sqrt{3} \\
    &= -0.114785
\end{align*}$$

$$\Rightarrow \mathrm{BSP} = e^{-3(0.04)}\,\Phi(0.114785) - 0.92686\,\Phi(-0.318228) = 0.13627$$

## Part e

You are given the following market prices at time 0 for 1 and 2 year put options on the underlying fund assets, based on the pricing assumptions above, and a premium of 5000.

| Term | Put Option Price |
|---|---|
| 1-year | 446.7 |
| 2-year | 590.8 |

Assume that mortality follows the profit test assumptions above. Show that the total cost at issue of hedging the guaranteed minimum death benefit and the guaranteed minimum maturity benefit is 665 to the nearest 5. You should calculate the value to the nearest 0.1.

### Explanation

The GMDB option cost is

$$q_x(446.7) + {}_{1|}q_x(590.8) + {}_{2|}q_x\left(5000 \times 0.13627\right) = 98.60$$

as $q_x = 0.05$, ${}_{1|}q_x = 0.95 \times 0.06 = 0.057$, and ${}_{2|}q_x = 0.95 \times 0.94 \times 0.07 = 0.0625$

The GMMB cost is

$${}_{3}p_x \times 5000 \times 0.13627 = 565.85$$

So the total cost is 664.45

## Part f

Calculate the net present value of the contract under the same stress test as in (a), but assuming that the insurer hedges the guarantees by purchasing options at a cost of 665 at the start of the first year.

### Explanation

| $t$ | Income | Expenses | Interest | EDB<sub>t</sub> | EMB<sub>t</sub> | Pr<sub>t</sub> |
|---|---|---|---|---|---|---|
| 0* | | 200.0 | | | | -200.0 |
| 1 | 475.0 | 765.0 | -14.5 | | | -304.5 |
| 2 | 104.8 | 71.9 | 1.6 | | | 34.5 |
| 3 | 97.1 | 68.8 | 1.4 | | | 29.7 |

$$\mathrm{NPV} = -200 - 304.5v + p_x(34.5)v^2 + {}_{2}p_x(29.7)v^3 = -429.8, \quad \text{at 10\%}$$

## Part g

Describe one advantage and one disadvantage for the insurer of purchasing put options to hedge the guarantee costs.

### Explanation

<u>Advantage:</u> Hedging the guarantees limits the downside risk; we see from this stress test that we are replacing the uncertain and potentially very serious future loss from guarantees, with the certain cost of buying the options.

<u>Disadvantage</u>: The cost of the options is substantial. The income for this policy is 350 from the policy fee, plus around 1.5% of the fund annually (the management charge minus the fund management costs) , which even on optimistic assumptions is unlikely to be greater than 550 in total. This is insufficient to cover the hedge costs. (This is a sign that the guarantees are under-priced, rather than an argument against hedging.).
