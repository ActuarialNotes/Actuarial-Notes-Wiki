---
id: "altam-040"
exam: "Exam ALTAM"
topic: "Projected Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Traditional+Unit+Credit+Method
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Service+Table
  - Concepts/Woolhouse's+Formula
points: 8
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:94c21ede73f6bc85ab6f87f8e482e9a4a085129d4bea983ed86d6e0bcf29e7b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-040.md
---

On December 31, 2015, an individual, who is age 55, has 25 years of service. The individual's salary in 2015 was 50,000.

The annual accrued benefit as of any date is 1.6% of the three-year final average salary as of that date, multiplied by years of service as of that date. The pension is payable only to retired participants as a monthly single life annuity, with the first payment due at retirement.

The valuation assumptions are as follows:

- There are no benefits paid upon death.
- There are no benefits paid upon disability prior to age 60.
- Exits from employment follow the Standard Service Table, except that all lives surviving in employment to age 61 retire at that time.
- There are retirements at age 60 that occur at exact age 60 while other decrements at age 60 occur throughout the year after the retirement at exact age 60 and prior to exact age 61. Those that retire or become disabled between exact age 60 and exact age 61 are assumed to retire at exact age 61.
- After retirement, mortality follows the Standard Ultimate Life Table.
- Annuities are valued using the 2-term Woolhouse formula.
- The individual has received a 3% salary increase on January 1 of each year for the last five years.
- Future salaries are expected to increase by 3% each year on January 1.
- All contributions are paid on January 1 each year.
- $i = 0.05$

## Part a (1 point)

A pension plan may be classified as a Defined Contribution plan or a Defined Benefit plan. State which type of plan the individual has and briefly describe the other type of plan.

### Explanation
The individual has a Defined Benefit plan. A Defined Contribution pension plan specifies how much an employer will contribute, usually as a percentage of salary, into a plan. The plan may allow employees to also contribute. The contributions are accumulated in a notional account which is available to the employee when they leave the company. The contributions may be set to meet a target benefit level, but the actual retirement income may be well below or above the target, depending on investment experience.

## Part b (3 points)

(i) Show that the actuarial accrued liability for the individual at December 31, 2015 using the Projected Unit Credit (PUC) funding method is 220,000 to the nearest 1000. Calculate the actuarial accrued liability to the nearest 1.

(ii) Calculate the normal cost for 2016 using PUC.

### Explanation
To complete Parts (b) and (c), we note that the individual will retire at age 60 or 61. Therefore we will need to know how much benefit has been accrued for both 60 and 61. We will also need to know the monthly annuity values at age 60 and 61. Using the 2-term Woolhouse approximation we have

$$\ddot{a}^{(12)}_{60} = \ddot{a}_{60} - \frac{11}{24} = 14.4458 \quad \text{and} \quad \ddot{a}^{(12)}_{61} = \ddot{a}_{61} - \frac{11}{24} = 14.1908$$

**(i)**

Under the Projected Unit Credit cost method, the actuarial accrued liability is the actuarial present value of the projected benefit. The projected benefit is equal to the final average salary at the decrement date multiplied by service as of the valuation date and by the accrual rate.

We have the following information.

| | |
|---|---|
| Projected Final Average Salary at 60 | $50{,}000\left[(1.03)^3 + (1.03)^4 + (1.03)^5\right]/3 = 56{,}292$ |
| Projected Final Average Salary at 61 | $50{,}000\left[(1.03)^4 + (1.03)^5 + (1.03)^6\right]/3 = (56{,}292)(1.03) = 57{,}981$ |
| Service at valuation date | 25 |
| Accrual Rate | 0.016 |
| Projected Benefit for retirement at 60 (PB$_{60}$) | (56,292)(0.016)(25) = 22,517 |
| Projected Benefit for retirement at *61* (PB$_{61}$) | (57,981)(0.016)(25) = 23,192 |

The actuarial accrued liability is the actuarial present value (as of the valuation date) of the projected benefit and is given by

$$
\begin{align*}
\text{AAL}_{55} &= PB_{60}\cdot\ddot{a}^{(12)}_{60}\cdot\frac{r^{exact}_{60}}{l^{(\tau)}_{55}}\cdot v^5 + PB_{61}\cdot\ddot{a}^{(12)}_{61}\cdot\frac{r^{During}_{60} + i_{60} + l^{(\tau)}_{61}}{l^{(\tau)}_{55}}\,v^6 \\
&= (22{,}517)(14.4458)\left(\frac{27{,}925.6}{104{,}687.7}\right)(1.05)^{-5} + (23{,}192)(14.1908)\left(\frac{6187.6 + 61.9 + 58{,}699.9}{104{,}687.7}\right)(1.05)^{-6} \\
&= 220{,}351
\end{align*}
$$

**(ii)**

We now need the accrued benefit at age 56

| | |
|---|---|
| Projected Benefit for retirement at 60 (PB$_{60}$) | (56,292)(0.016)(26) = 23,417 |
| Projected Benefit for retirement at 61 (PB$_{61}$) | (57,981)(0.016)(26) = 24,120 |

The actuarial accrued liability at December 31, 2016 is given by

$$
\begin{align*}
\text{AAL}_{56} &= PB_{60}\cdot\ddot{a}^{(12)}_{60}\cdot\frac{r^{exact}_{60}}{l^{(\tau)}_{56}}\cdot v^4 + PB_{61}\cdot\ddot{a}^{(12)}_{61}\cdot\frac{r^{During}_{60} + i_{60} + l^{(\tau)}_{61}}{l^{(\tau)}_{56}}\,v^5 \\
&= (23{,}417)(14.4458)\left(\frac{27{,}925.6}{102{,}307.9}\right)(1.05)^{-4} + (24{,}120)(14.1908)\left(\frac{6187.6 + 61.9 + 58{,}699.9}{102{,}307.9}\right)(1.05)^{-5} \\
&= 246{,}221
\end{align*}
$$

Then

$${}_tV + C_t = EPV \text{ of benefits for mid-year exits} + v\cdot{}_1p_x^{(\tau)}\cdot{}_{t+1}V \quad \text{where:}$$

$C_t$ = Normal Cost for year $t$ to $t+1$ and ${}_tV$ is the Actuarial Accrued Liability at time $t$

Note that EPV of benefits for mid-year exits is zero. Then:

$${}_tV + C_t = EPV \text{ of benefits for mid-year exits} + v\cdot{}_1p_x^{(\tau)}\cdot{}_{t+1}V$$

$$220{,}351 + C_t = 0 + (1.05)^{-1}\left(\frac{102{,}307.9}{104{,}687.7}\right)(246{,}221)$$

$$C_t = 8815$$

## Part c (3 points)

(i) Show that the actuarial accrued liability for the individual at December 31, 2015 using the Traditional Unit Credit (TUC) funding method is 186,000 to the nearest 1000. Calculate the actuarial accrued liability to the nearest 1.

(ii) Calculate the normal cost for 2016 using TUC.

### Explanation
**(i)**

Under the Traditional Unit Credit cost method the actuarial accrued liability (AAL) is the actuarial present value of the accrued benefit on the valuation date.

The formula for the accrued benefit, $B$, is

$$B_{55} = 0.016\cdot 25\cdot 50{,}000\cdot\left(\frac{1 + (1.03)^{-1} + (1.03)^{-2}}{3}\right) = 19{,}423$$

and thus

$$
\begin{align*}
\text{AAL}_{55} &= B_{55}\cdot\ddot{a}^{(12)}_{60}\cdot\frac{r^{exact}_{60}}{l^{(\tau)}_{55}}\cdot v^5 + B_{55}\cdot\ddot{a}^{(12)}_{61}\cdot\frac{r^{during}_{60} + i_{60} + l^{(\tau)}_{61}}{l^{(\tau)}_{55}}\,v^6 \\
&= B_{55}\left(\ddot{a}^{(12)}_{60}\cdot\frac{r^{exact}_{60}}{l^{(\tau)}_{55}}\cdot v^5 + \ddot{a}^{(12)}_{61}\cdot\frac{r^{during}_{60} + i_{60} + l^{(\tau)}_{61}}{l^{(\tau)}_{55}}\,v^6\right) \\
&= 19{,}423\left[(14.4458)\left(\frac{27{,}925.6}{104{,}687.7}\right)(1.05)^{-5} + (14.1908)\left(\frac{6{,}187.6 + 61.9 + 58{,}699.9}{104{,}687.7}\right)(1.05)^{-6}\right] \\
&= 186{,}248
\end{align*}
$$

**(ii)**

For the NC, we must calculate the expected accrued benefit, $B_{61}$, one year after the valuation date.

$$B_{56} = 0.016\cdot 26\cdot 50{,}000\cdot\left(\frac{1.03 + 1 + 1.03^{-1}}{3}\right) = 20{,}806$$

$$
\begin{align*}
\text{AAL}_{56} &= B_{56}\cdot\left(\ddot{a}^{(12)}_{60}\cdot\frac{r^{exact}_{60}}{l^{(\tau)}_{56}}\cdot v^4 + \ddot{a}^{(12)}_{61}\cdot\frac{r^{during}_{60} + i_{60} + l^{(\tau)}_{61}}{l^{(\tau)}_{56}}\,v^5\right) \\
&= 20{,}806\left[(14.4458)\left(\frac{27{,}925.6}{102{,}307.9}\right)(1.05)^{-4} + (14.1908)\left(\frac{6{,}187.6 + 61.9 + 58{,}699.9}{102{,}307.9}\right)(1.05)^{-5}\right] \\
&= 214{,}358
\end{align*}
$$

Then:

$${}_tV + C_t = EPV \text{ of benefits for mid-year exits} + v\cdot{}_1p_x^{(\tau)}\cdot{}_{t+1}V \quad \text{where:}$$

$C_t$ = Normal Cost for year $t$ to $t+1$ and ${}_tV$ is the Actuarial Accrued Liability at time $t$

Note that EPV of benefits for mid-year exits is zero. Then:

$${}_tV + C_t = EPV \text{ of benefits for mid-year exits} + v\cdot{}_1p_x^{(\tau)}\cdot{}_{t+1}V$$

$$186{,}248 + C_t = 0 + (1.05)^{-1}\left(\frac{102{,}307.9}{104{,}687.7}\right)(214{,}358)$$

$$C_t = 13{,}262$$

## Part d (1 point)

For the individual, the normal cost during 2016 using PUC is less than the normal cost during 2016 using TUC. Explain why this will be true for all employees near retirement.

### Explanation
Under both funding approaches, the contribution rate tends to increase as the member acquires more service and gets closer to retirement. The TUC contributions start smaller than the PUC contributions and, rise more steeply, ending at considerably more than the PUC contribution. This is true because the TUC contributions do not project future salary increases or future service credit while PUC contributions are based on salary with projected future salary increases. Therefore, the TUC contributions in any given year must reflect the full increase in the salary and the additional year of service now reflected in the accrued benefit at the end of the year of service which were not reflected in the accrued benefit at the end of the year of service. The PUC contribution will only reflect the additional year of service; it does not need to reflect the salary increase as this is already allowed for in the accrued liability at the beginning of the year.
