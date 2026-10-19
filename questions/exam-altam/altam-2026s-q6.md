---
id: "altam-2026s-q6"
exam: "Exam ALTAM"
topic: "Guaranteed Minimum Maturity Benefit"
learning_objective: "Embedded Options in Life Insurance and Annuity Products"
difficulty: hard
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Guaranteed+Minimum+Income+Benefit
  - Concepts/Black-Scholes+Model
  - Concepts/Delta+Hedging
  - Concepts/Equity-Linked+Insurance
  - Concepts/Lognormal+Distribution
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fd545e868f16b3394dc903daef60a1a5723de872d10c19cdad2dc57868df7013
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2026s-q6.md
---

An insurer issues a 10-year equity-linked contract to (70). The single premium is 100,000. You are given the following information and assumptions.

(i) There is a Guaranteed Minimum Maturity Benefit (GMMB) of 100% of the premium.

(ii) An initial expense charge of 500 is deducted at the start of the contract.

(iii) Management charges of 2% of the policyholder's account value are deducted at the start of each year of the contract including the first (after the initial expense deduction).

(iv) The underlying asset values of the policyholder's account follow a lognormal process with parameters $\mu = 0.05$ and $\sigma = 0.25$.

(v) Mortality is assumed to follow the Standard Ultimate Survival Model (SUSM).

(vi) There are no lapses.

(vii) The risk free rate of interest is $r = 0.04$ per year, compounded continuously.

## Part a (3 points)

Show that the cost of the GMMB is 13,540 to the nearest 10. You should calculate the cost to the nearest 1.

### Explanation
From the formula sheet: $p(0) = kPe^{-10r}\,\Phi\left(-d_2(0)\right) - F_0(1-m)^{10}\,\Phi\left(-d_1(0)\right)$. In this case, the inputs to this formula are:

$$F_0 = (P - 500), \quad kP = P = 100{,}000, \quad m = 0.02, \quad r = 0.04, \quad \sigma = 0.25, \quad n = 10$$

$$d_1(0) = \frac{\ln\left(F_0(1-m)^{10}/P\right) + \left(r + \sigma^2/2\right)(10)}{\sigma\sqrt{10}} = 0.63936$$

$$\Rightarrow \Phi\left(-d_1(0)\right) = 0.26129$$

$$d_2(0) = d_1(0) - \sigma\sqrt{10} = -0.15121 \quad \Rightarrow \Phi\left(-d_2(0)\right) = 0.56009$$

$$\Rightarrow p(0) = 37{,}544.2 - 121{,}242.8 = 16{,}301.4$$

$${}_{10}p_{70} = \frac{l_{80}}{l_{70}} = 0.83064$$

$$\pi(0) = {}_{10}p_{70}\ p(0) = 13{,}540.6$$

ALTERNATIVE APPROACH

Work with the price of a put option on a unit of underlying stock, denoted $\tilde{p}(0)$. Then

$$\text{Let } \xi P = (P - 500)(1-m)^{10} \Rightarrow \xi = 0.812987$$

$$p(0) = P\xi\,\tilde{p}(0) \quad \text{where } \tilde{p}(0) = \frac{1}{\xi}e^{-10r}\,\Phi\left(-d_2(0)\right) - \Phi\left(-d_1(0)\right)$$

$$d_1(0) = \frac{\ln(\xi) + (r + \sigma^2/2)(10)}{\sigma\sqrt{(10)}} = 0.63936; \quad \Phi\left(-d_1(0)\right) = 0.26129$$

$$d_2 = d_1 - \sigma\sqrt{10} = -0.15121; \quad \Phi\left(-d_2(0)\right) = 0.56009$$

$$\Rightarrow \tilde{p}(0) = 0.20051$$

$$\Rightarrow p(0) = 100{,}000(0.812987)\,\tilde{p}(0) = 16301.37$$

$$\Rightarrow \pi(0) = {}_{10}p_{70}\,p(0) = 13540.65$$

### Examiner Report
1. Questions involving option valuation are usually the poorest scoring questions on ALTAM exams, and this was not an exception.
2. Nevertheless, part (i) was done reasonably well by most of the candidates who attempted it.
3. The most common error was ignoring, or partially ignoring the initial 500 expense. Candidates were awarded partial credit if the calculation was otherwise correct.

## Part b (1.5 points)

(i) Determine the value of the stock part of the initial delta hedge portfolio (that is, the value of the investment in the underlying asset).

(ii) Explain briefly why the GMMB hedge portfolio takes a short position in the underlying assets.

### Explanation
**(i)** The investment in the underlying assets is the short part of the delta hedge, with a market value of

$$\left(-F_0(1-m)^{10}\,\Phi\left(-d_1(0)\right)\right){}_{10}p_{70} = -21{,}242.8 \times 0.830645 = -17{,}645$$

**(ii)** A short position in stocks means that the hedge portfolio gains value when the underlying risky asset value falls. Falling underlying asset values mean increasing GMMB value, so the short position in the hedge portfolio allows it to track the GMMB value.

### Examiner Report
1. Many candidates lost partial credit in (i) by not including the minus sign (it is important that the stock position is a short position) and/or by not including the survival probability in the calculation.
2. Few candidates earned full credit for (ii). The examiners were looking for candidates to show that they understand the underlying principle of the hedging approach, i.e. replicating the cost of the guarantee. Shorting the stock means that the hedge portfolio value increases as the stock decreases, and hence as the guarantee cost increases.
3. Answers that simply said, for example, that the position was short because the sign was negative earned no credit.

## Part c (2.5 points)

Calculate the probability that the GMMB matures in-the-money (that is, the probability, under the real world measure, that the contract is in force at maturity, and that the policyholder's fund value at that time is less than the GMMB).

### Explanation
First assume the life survives to maturity. Let $S_t$ denote the value of the underlying assets at $t$. We can assume that $S_0 = 1$ (if it does not, we can just scale $S_t$ appropriately).

$$
\begin{align*}
\Pr\left[F_{10} \le P\right] &= \Pr\left[F_0(0.98)^{10}\frac{S_{10}}{S_0} \le P\right] \\
&= \Pr\left[S_{10} \le \frac{100{,}000}{81{,}299}\right] \\
&= \Pr\left[S_{10} \le 1.2300\right]
\end{align*}
$$

We are given that $S_t$ follows a lognormal process, with parameters $\mu = 0.05$ and $\sigma = 0.25$. That means that for a fixed $t$, $S_t$ has a lognnormal distribution with parameters $t\mu$ and $\sqrt{t}\sigma$,

$$\Rightarrow S_{10} \sim \text{logN}\left(10\mu,\ \sqrt{10}\sigma\right) \text{ i.e. } S_{10} \sim \text{logN}(0.5,\ 0.790569)$$

$$\Rightarrow \Pr\left[F_{10} \le P\right] = \Pr\left[S_{10} \le 1.2300\right] = \Phi\left(\frac{\ln(1.2300) - 0.5}{0.790569}\right) = 0.35548$$

The joint probability that the life survives to age 80 and that the guarantee is in the money at that time is then

$${}_{10}p_{70}\,(0.35548) = 0.29528$$

### Examiner Report
1. This part, relates to material from FAM, where it is explained that underlying the Black Scholes formula is an assumption that the risky asset price follows a lognormal process.
2. A small number of stronger candidates correctly identified the random variable ($S_{10}$) and also correctly identified the threshold for triggering the guarantee, but almost none were able to calculate the probability.
3. The key misunderstanding was how to convert the information about the lognnormal process into information about the probability distribution of $S_{10}$

## Part d (2 points)

The contract has an additional Guaranteed Minimum Income Benefit (GMIB). At time 10 the policyholder may annuitize the greater of the policyholder's fund value at maturity, and the policy's Benefit Base at maturity. You are given the following additional information.

- The Benefit Base is defined as 100% of the premium with interest at 4% per year.
- The guaranteed annuitization rate at age 80 is 10.5%.
- The annuity benefit is paid annually at the start of each year.

(i) Calculate the guaranteed minimum amount of annual annuity income payable from age 80, based on the information available at the policy inception.

(ii) The insurer calculated the guaranteed annuitization rate using the SUSM at a rate of interest of $j$ per year effective. State with reasons whether $j$ is greater than or less than 5%.

### Explanation
**(i)** The minimum projected BB at time 10 is

$$BB_{10} = P\left(1.04^{10}\right) = 148{,}024$$

$$\Rightarrow \text{GMIB} = 0.105(148{,}024) = 15{,}543 \text{ p.y.}$$

**(ii)** The annuitization rate at age 80 is 0.105, that is

$$0.105 = \frac{1}{\ddot{a}_{80_j}} \Rightarrow \ddot{a}_{80_j} = 9.524.$$

From the tables, at $i = 0.05$, $\ddot{a}_{80_i} = 8.5484$. As the annuity value is a decreasing function of the interest rate, it follows that $j < 0.05$

### Examiner Report
1. Part (i) was done well by those that attempted it.
2. Part (ii) was also done fairly well.

## Part e (1 point)

Explain briefly why the cost to the insurer of the GMIB at maturity could be less than the Benefit Base at maturity, even if the GMIB is exercised.

### Explanation
The cost to the insurer of the GMIB is $\left(BB(0.105)\right)\ddot{a}_{80\,i}$, where $i$ is the market rate of interest at maturity. This will be less than $BB$ if interest rates are sufficiently high such that

$$\ddot{a}_{80\,i} < \frac{1}{0.105} = 9.5238.$$

### Examiner Report
1. This part was omitted by many candidates.
2. Examiners were looking for an understanding that the cost to the insurer of the GMIB depends on market rates at maturity, which will generally differ from the rate used in the guaranteed annuitization rate. The insurer pays less than the BB if interest rates are higher than j at maturity.
