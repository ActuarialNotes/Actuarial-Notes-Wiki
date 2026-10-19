---
id: "altam-050"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Joint+Life
  - Concepts/Annuities
  - Concepts/Policy+Value
  - Concepts/Woolhouse's+Formula
points: 8
---

(*8 points*) An insurer issues a Type A universal life policy with a face amount of 100,000 and an annual premium of 50,000.

You are given:

| Policy Year | Percent of Premium Charge | Annual Expense Charge | COI Rate per 1 of Insurance | Annual Discount Rate for COI | Annual Credited Interest Rate | Corridor Factor |
|---|---|---|---|---|---|---|
| 1 | 20% | 75 | 0.025 | 4.5% | 6.50% | 1.5 |
| 2 | 8% | 75 | 0.030 | 4.5% | 5.75% | 1.4 |

(This is Question 3 from the Spring 2017 Written Answer exam.)

## Part a (3 points)

Show that the account value at the end of two years is 91,000 to the nearest 1000. You should calculate the account value to the nearest 1.

### Explanation

For each year, we assume first that the corridor factor does not apply, and then check to see whether the Death Benefit: Account Value ratio is sufficient. For the first year we have

$$\begin{align*}
AV_1 &= \left(50{,}000(0.8) - 75 - (0.025)(100{,}000 - AV_1)\,v_{4.5\%}\right)(1.065) \\
\Rightarrow AV_1\left(1 - 0.025\,v_{4.5\%}(1.065)\right) &= 39{,}972 \\
\Rightarrow AV_1 &= 41{,}017
\end{align*}$$

Check corridor factor: $\dfrac{DB}{AV_1} = \dfrac{100{,}000}{41{,}017} = 2.44 > CF_1$

Since the ratio of the DB to the AV is greater than the corridor factor, not adjustment to the DB is required.

For the second year, we have

$$\begin{align*}
AV_2 &= \left(41{,}017 + 50{,}000(0.92) - 75 - (0.03)(100{,}000 - AV_2)\,v_{4.5\%}\right)(1.0575) \\
\Rightarrow AV_2\left(1 - 0.03\,v_{4.5\%}(1.0575)\right) &= 88{,}906 \\
\Rightarrow AV_2 &= 91{,}689
\end{align*}$$

Check corridor factor: $\dfrac{DB}{AV_2} = \dfrac{100{,}000}{91{,}689} = 1.09 < CF_1$

The ratio is too small, and the corridor factor applies. We must recalculate the account value.

$$\begin{align*}
AV_2 &= \left(41{,}017 + 50{,}000(0.92) - 75 - (0.03)(0.4 \times AV_2)\,v_{4.5\%}\right)(1.0575) \\
\Rightarrow AV_2\left(1 + 0.03(0.4)\,v_{4.5\%}(1.0575)\right) &= 91{,}9416 \\
\Rightarrow AV_2 &= 90{,}838
\end{align*}$$

### Examiner Report

*Graders' Comments:* The most common errors were ignoring the corridor factor, or assuming the corridor factor applied in both years.

## Part b (3 points)

The policyholder surrenders the policy at the end of the second year, when she is age 60. The policy does not have a surrender charge. She uses the surrender value as a net single premium to purchase a special last-survivor life annuity-due with her husband, who is 10 years older than the policyholder.

This annuity provides the following payments at the beginning of each quarter:

- For the first ten years, a guaranteed payment of $Q$
- After the first ten years, a payment of $Q$ if the policyholder is alive
- After the first ten years, a payment of $0.6Q$ if the policyholder is dead, but her husband is alive.

You are given that the net single premium and reserves for this annuity are calculated based on the following information and assumptions.

- (i) The future lifetimes of the couple are independent.
- (ii) Mortality follows the Standard Ultimate Life Table.
- (iii) $i = 0.05$
- (iv) The two-term Woolhouse formula

Show that $Q$ is 1630 to the nearest 10. You should calculate $Q$ to the nearest 1.

### Explanation

The EPV of the annuity is

$$4Q\left(\ddot{a}_{\overline{10|}}^{(4)} + {}_{10}E_{60:70}\left(\ddot{a}_{70}^{(4)} + 0.6\,\ddot{a}_{70|80}^{(4)}\right) + \left({}_{10}E_{70}\right)\left({}_{10}q_{60}\right)\left(0.6\,\ddot{a}_{80}^{(4)}\right) + \left({}_{10}E_{60}\right)\left({}_{10}q_{70}\right)\ddot{a}_{70}^{(4)}\right)$$

$$\ddot{a}_{\overline{10|}}^{(4)} = \frac{1 - v^{10}}{d^{(4)}} = 7.96219$$

$$\ddot{a}_{70}^{(4)} = \ddot{a}_{70} - \frac{3}{8} = 11.6333; \quad \ddot{a}_{70:80}^{(4)} = \ddot{a}_{70:80} - \frac{3}{8} = 7.3458$$

$$\ddot{a}_{80}^{(4)} = \ddot{a}_{80} - \frac{3}{8} = 8.1734; \quad \ddot{a}_{70|80}^{(4)} = \ddot{a}_{80}^{(4)} - \ddot{a}_{70:80}^{(4)} = 0.82761$$

$${}_{10}q_{60} = 0.05745; \quad {}_{10}q_{70} = 0.16935$$

$${}_{10}E_{60} = 0.57864; \quad {}_{10}E_{70} = 0.50994; \quad {}_{10}E_{60:70} = {}_{10}E_{60}\;{}_{10}p_{70} = 0.48064$$

Thus, $EPV = 4Q(15.0759)$

Set this equal to $AV_2$ to get $Q = 1506.34$.

### Examiner Report

*Graders' Comments:* Most candidates used Q instead of 4Q throughout.

## Part c (1 point)

You are given that the policyholder's husband dies during the first 10 years of the annuity.

Calculate the net premium reserve immediately prior to the payment of $Q$ at the start of the eleventh year.

### Explanation

$${}_{10}V = 4Q\,\ddot{a}_{70}^{(4)} = 70095$$

## Part d (1 point)

In the eleventh year, Person S decides that they no longer needs the annuity and asks the company to pay the reserve. The insurance company refuses to pay the full reserve.

Explain why the insurance company would not agree to S's request.

### Explanation

It is uncommon to offer surrender values for annuities because of adverse selection. Lives who are in poor health are more likely to surrender, reducing the pool available for survivors. The objective of an annuity pool is that any excess funds arising from early deaths are used to support the continuing payments to the surviving lives.

### Examiner Report

*Graders' Comments:* Most candidates seemed unaware that traditional annuities cannot generally be surrendered, and few mentioned the adverse selection problem.
