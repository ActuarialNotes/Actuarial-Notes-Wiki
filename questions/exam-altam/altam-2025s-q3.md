---
id: "altam-2025s-q3"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Endowment+Insurance
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Insurance+Premium
points: 10
---

A fully discrete 20-year last survivor endowment insurance policy is issued to Kim (60) and Alex (70). You are given:

1. A death benefit of 10,000 is paid at the end of the year of the second death if it occurs within 20 years of the issue date.
2. A survival benefit of 10,000 is paid at time 20 if at least one of Kim or Alex is alive at that time.
3. Level annual premiums are payable while the policy is in force.
4. Mortality follows the Standard Ultimate Mortality Model.
5. $i = 5\%$
6. The future lifetimes of Kim and Alex are independent.

## Part a (1 point)

Calculate the probability that the survival benefit will be paid.

### Explanation
The probability is:

$$
\begin{align*}
1 - {}_{20}q_{60}\;{}_{20}q_{70} &= 1 - \left(1 - \frac{75{,}657.2}{96{,}634.1}\right)\left(1 - \frac{41841.1}{91{,}082.4}\right) \\
&= 1 - 0.21708 \times 0.54062 \\
&= 0.88264
\end{align*}
$$

### Examiner Report
Most candidates earned full credit on this part. A few students calculated the present value of the endowment instead of the probability.

## Part b (3 points)

(i) Show that the expected present value of the benefits under this policy is 3,865 to the nearest 5. You should calculate the value to the nearest 0.1.

(ii) Show that the net premium for this policy is 300 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
**(i)** The EPV is:

$$10{,}000\,A_{\overline{60:70}:\overline{20}|} = 10{,}000\left(A_{60:\overline{20}|} + A_{70:\overline{20}|} - A_{60:70:\overline{20}|}\right)$$

$A_{60:\overline{20}|} = 0.41040$; $A_{70:\overline{20}|} = 0.47091$ from tables.

$$
\begin{align*}
A_{60:70:\overline{20}|} &= A_{60:70} - {}_{20}p_{60}\,{}_{20}p_{70}\,v^{20}A_{80:90} + {}_{20}p_{60}\,{}_{20}p_{70}\,v^{20} \\
&= 0.46562 - (1 - 0.21708)(1 - 0.54062)(1.05)^{-20}(0.78538) + (1 - 0.21708)(1 - 0.54062)(1.05)^{-20} \\
&= 0.49471
\end{align*}
$$

$$\Rightarrow A_{\overline{60:70}:\overline{20}|} = 0.41040 + 0.47091 - 0.49471 = 0.386596$$

$$\Rightarrow \text{EPV of benefits is } 10{,}000(0.386596) = 3{,}865.96$$

Or

$$A_{60:70:\overline{20}|} = 1 - d\,\ddot{a}_{60:70:\overline{20}|} = 1 - \left(\frac{0.05}{1.05}\right)(10.61105) = 0.49471$$

where:

$$
\begin{align*}
\ddot{a}_{60:70:\overline{20}|} &= \ddot{a}_{60:70} - {}_{20}p_{60}\,{}_{20}p_{70}\,v^{20}\,\ddot{a}_{80:90} \\
&= 11.2220 - (1 - 0.21708)(1 - 0.54062)(1.05)^{-20}(4.5071) \\
&= 10.61105
\end{align*}
$$

**(ii)** The premium is $P$:

$$P\,\ddot{a}_{\overline{60:70}:\overline{20}|} = 3865.96$$

$$\ddot{a}_{\overline{60:70}:\overline{20}|} = \frac{1 - A_{\overline{60:70}:\overline{20}|}}{d} = 12.8815$$

$$\Rightarrow P = 300.12$$

### Examiner Report
1. This part was generally done pretty well, not as well as part (a) but still quite well.
2. An answer not supported by the candidate's work was not given any credit since the answer was given.
3. The most common error was to double count the endowment by adding the pure endowment to the value of the endowment insurance which already include the pure endowment. The candidate was equating the value of the endowment insurance to be the value of the term insurance.

## Part c (3 points)

You are given that $\ddot{a}_{\overline{70:80}:\overline{10}|} = 7.9879$.

(i) Calculate the net premium policy value at the end of 10 years if both Kim and Alex are alive.

(ii) Calculate the net premium policy value at the end of 10 years if only Kim is alive.

### Explanation
**(i)** Let 0 denote the initial state.

$${}_{10}V^{(0)} = 10{,}000\,A_{\overline{70:80}:\overline{10}|} - P\,\ddot{a}_{\overline{70:80}:\overline{10}|}$$

$\ddot{a}_{\overline{70:80}:\overline{10}|} = 7.9879$ (given)

$$A_{\overline{70:80}:\overline{10}|} = 1 - d\,\ddot{a}_{\overline{70:80}:\overline{10}|} = 0.61962$$

$$\Rightarrow {}_{10}V^{(0)} = 10{,}000(0.61962) - 300.12(7.9879) = 3{,}798.93$$

Or

$$
\begin{align*}
A_{\overline{70:80}:\overline{10}|} &= A_{70:\overline{10}|} + A_{80:\overline{10}|} - A_{70:80:\overline{10}|} \\
&= 0.63576 + 0.67674 - \left[1 - d(6.4497)\right] \\
&= 0.61963
\end{align*}
$$

**(ii)** Let 1 denote the state in which only Kim is alive:

$${}_{10}V^{(1)} = 10{,}000\,A_{70:\overline{10}|} - P\,\ddot{a}_{70:\overline{10}|} = (10{,}000)(0.63576) - (300.12)(7.6491) = 4061.95$$

### Examiner Report
1. Most candidates did not get part (i) correct. Once again, many students double counted the pure endowment benefit.
2. Candidates did better on part (ii). Most candidates did understand that the reserve was just a single life reserve since only Kim was alive.

## Part d (3 points)

At the issue date, policyholders may select a waiver of premium rider. In this case, the policyholders would pay a higher premium while both lives survive but would pay no premiums after the first death.

(i) Calculate the additional net premium for the rider.

(ii) Describe two factors that Kim and Alex might take into consideration when deciding whether to purchase the rider.

### Explanation
**(i)** The extra premium is $R$ such that

$$(P + R)\,\ddot{a}_{60:70:\overline{20}|} = 3865.96$$

$$\ddot{a}_{60:70:\overline{20}|} = \frac{1 - A_{60:70:\overline{20}|}}{d} = \frac{1 - 0.49471}{0.047619} = 10.6110$$

or

$$\ddot{a}_{60:70:\overline{20}|} = \ddot{a}_{60:70} - {}_{20}E_{60}\cdot{}_{20}E_{70}(1.05)^{20}\,\ddot{a}_{70:80} = 11.2220 - 0.13555(4.5071) = 10.6110$$

$$\Rightarrow R = \frac{3865.96}{10.6110} - P = 64.21$$

**(ii)** Relevant factors include:

- Whether it might be a burden for the survivor to continue paying premiums after the first life dies
- Are there other options for investing/utilizing the extra 64.21 per year up to the first death that could compensate for paying an extra 300.12 per year after the first death.
- What cash value (or viatical market value) would be paid if the policy is surrendered (or transferred) before maturity – ie how much risk is there if they do not select the contract in which the premiums stop on first death?

### Examiner Report
1. For part (i), many candidates got most of the points. Quite a few candidates did not understand that question asked for the additional amount instead of the total premium.
2. For part (ii), candidates did very well although some candidates did not explain why a consideration should be taken into account.
