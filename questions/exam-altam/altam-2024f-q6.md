---
id: "altam-2024f-q6"
exam: "Exam ALTAM"
topic: "Guaranteed Minimum Maturity Benefit"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
year: 2024
session: Fall
wiki_link:
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Black-Scholes+Model
  - Concepts/Equity-Linked+Insurance
  - Concepts/Embedded+Option
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e4bf4a8bb06cc266bb2430fccec63efe3565b50467ad60763b23f7d8775dd1ea
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2024f-q6.md
---

A 10-year equity-linked policy is issued to a life age 60. The policyholder pays a single premium of 1000. The policy offers a guaranteed minimum maturity benefit (GMMB) of 100% of the single premium. The insurer deducts a management charge at a rate of 2% per year, payable continuously, from the policyholder's funds. There are no other expense deductions.

The insurer constructs a hedge portfolio at the issue date based on the Black-Scholes option valuation. You are given the following assumptions.

(i) The risk free rate is $r = 0.03$ continuously compounded.

(ii) The volatility is $\sigma = 0.20$

(iii) Mortality follows the Standard Ultimate Mortality Model.

(iv) There are no exits other than death.

(v) $\bar{a}_{60:\overline{10}|\,\delta=0.02} = 8.8569$

## Part a (4 points)

(i) Show that the GMMB hedge portfolio value at the issue date is 150 to the nearest 10. You should calculate the value to the nearest 0.01.

(ii) Let $c$ denote the cost of the hedge portfolio expressed as a continuous risk premium. Show that $c = 0.017$ to the nearest 0.001. You should calculate the value to the nearest 0.0001.

### Explanation
**(i)** The hedge cost is $\pi(0) = \left({}_{10}p_{60}\right)p(0)$

$$p(0) = Ke^{-rT}\Phi\left(-d_2(0)\right) - P\xi\,\Phi\left(-d_1(0)\right)$$

$K = 1000$; $T = 10$; $r = 0.03$; $\sigma = 0.20$; $\xi = e^{-0.02(10)} = 0.81873$

$$d_1 = \frac{\ln(P\xi/K) + \left(r + \sigma^2/2\right)T}{\sigma\sqrt{T}} = \frac{\ln(0.81873) + \left(0.03 + 0.2^2/2\right)10}{0.2\sqrt{10}} = 0.47434$$

$$d_2 = d_1 - \sigma\sqrt{T} = d_1 - 0.2\sqrt{10} = -0.158115$$

$$
\begin{align*}
\Rightarrow p(0) &= 1000e^{-0.03(10)}\,\Phi(0.15811) - 818.73\,\Phi(-0.47432) \\
&= 1000e^{-0.03(10)}(0.562815) - 818.73(0.317636) \\
&= 156.89
\end{align*}
$$

$$\Rightarrow \pi(0) = {}_{10}p_{60}\,p(0) = \left(\frac{91{,}082.4}{96{,}634.1}\right)(156.89) = 0.94255(156.89) = 147.88$$

**(ii)** The continuous management charge to fund the hedge cost is

$$c = \frac{147.88}{1000\,\bar{a}_{60:\overline{10}|\,\delta=0.02}} = \frac{147.88}{1000(8.8569)} = 0.0167$$

### Examiner Report
Overall, candidates who attempted this part did acceptable on it. Many candidates omitted the entire question. Overall, candidates did a good job of documenting their work which helps in awarding partial credit.

The Black-Sholes formulas are given in the Formula Sheet. The hedge cost is a slight modification of this formula. Many candidates forgot to include the ${}_np_x$ in the calculation. Also, since the interest rate was a continuous interest rate, the proper adjustment was $e^{-0.02}$ instead of 0.98. Use of 0.98 resulted in a small deduction on the question. Part (ii) was an easy calculation even if you could not get the correct answer to part (i). You were given the value of 150 and could use it to get full credit for part (ii). Candidates are encouraged to read the entire question and answer easier parts even if they cannot get the harder parts.

## Part b (3 points)

Over the first 3 years, the price of the underlying stocks in the policyholder's fund increases by 50%.

(i) Calculate the policyholder's fund value at $t = 3$.

(ii) Calculate the value of the total GMMB hedge portfolio required at $t = 3$.

(iii) You are given that $\bar{a}_{63:\overline{7}|\,\delta=0.02} = 6.4021$. State with reasons whether the charge determined in (a)(ii) is sufficient to pay the future costs of the GMMB as of $t = 3$.

### Explanation
**(i)**

$$F_3 = 1000e^{-0.02 \times 3}(1.5) = 1412.65$$

**(ii)** The hedge cost is $\pi(3) = {}_7p_{63}\,p(3)$ where

$$p(3) = Ke^{-7r}\Phi\left(-d_2(3)\right) - P\xi\,1.5\,\Phi\left(-d_1(3)\right)$$

OR

$$p(3) = Ke^{-7r}\Phi\left(-d_2(3)\right) - F_3e^{-0.02(7)}\,\Phi\left(-d_1(3)\right)$$

$$
\begin{align*}
d_1(3) &= \frac{\ln\left(F_3e^{-7(0.02)}/K\right) + \left(r + \sigma^2/2\right)7}{\sigma\sqrt{7}} \\
&= \frac{\ln\left((1412.65)e^{-7(0.02)}/1000\right) + \left(0.03 + 0.2^2/2\right)7}{0.2\sqrt{7}} \\
&= 1.04973
\end{align*}
$$

$$d_2 = d_1 - \sigma\sqrt{7} = 1.04973 - (0.2)\sqrt{7} = 0.52058$$

$$
\begin{align*}
\Rightarrow p(3) &= 1000e^{-0.03(7)}\,\Phi(-0.52058) - P\xi\,1.5\,\Phi(-1.04973) \\
&= 1000e^{-0.03(7)}(0.30133) - (1228.10)(0.14692) \\
&= 63.81
\end{align*}
$$

$$\Rightarrow \pi(3) = {}_7p_{63}\,p(3) = \left(\frac{91{,}082.4}{95{,}534.4}\right)p(3) = 0.95340(63.81) = 60.84$$

**(iii)** The value of the future risk charge of 0.0167 is

$$F_3\,c\,\bar{a}_{63:\overline{7}|\,\delta=0.02} = (1412.65)(0.0167)(6.4021) = 151.03 > \pi(3)$$

The value of risk charge income > value of the guarantee.

Therefore the charge is sufficient.

### Examiner Report
Candidates did not do as well on this part. Quite a few candidates used 10 years in the calculations instead of the remaining 7 years. Also, candidates used the 1.5 increase in value without adjusting for the 2% annual charge. Unlike Part A, many candidates did not show sufficient work to earn much partial credit.

Some candidates attempted to use the replicating portfolio instead of the B-S formula to answer this question. A few candidates were successful, but most were not.

"State with reasons" means you must state the reasons to receive the credit. A lot of candidates just stated that the charge was sufficient with stating why.

## Part c (2 points)

The insurer is considering introducing a reset option. The minimum contract term is 10 years. Resets would be allowed at any policy anniversary.

(i) Assume that the policyholder exercised the reset option at $t = 3$. Explain in words the effect of the reset on the policy.

(ii) Describe one advantage and one disadvantage of the reset option from the insurer's perspective.

### Explanation
**(i)** If the p/h resets at time 3:

- Their maturity date would be reset to time 13 (minimum 10 year contract)
- Their GMMB would increase to $F_3 = 1412.65$.
- All other policy conditions would (typically) remain the same.

**(ii)** Advantages:

- Encourage p/h not to surrender the policy when the guarantee is far out of the money.
- Discourage costly lapse and re-entry strategies.
- Useful for marketing, compared with policies that do not offer resets

Disadvantages:

- Keeps outdated contracts on the books
- Many p/h may reset at the same time, eg after a period of very strong returns, which means reset maturity dates will be set to around the same time, creating a time-concentration risk.
- If many p/h reset at the same time, it can create a spike in the guarantee cost of the portfolio, which could be a liquidity or solvency risk.

### Examiner Report
Candidates actually did the best on part of the question with those attempting the question getting most or all of the points. This is another example where candidates are encouraged to read the entire question and answer easier parts even if they cannot get the harder parts.

Many candidates did not state that the maturity date would be reset to 13 years. This was necessary to receive full credit.

Part (ii) could be answered from the insurer's standpoint or the annuitant's standpoint. Please note that the question asks for the answer from the insurer's standpoint.
