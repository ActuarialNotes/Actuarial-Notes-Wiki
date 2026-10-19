---
id: "altam-2026s-q5"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: hard
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/No-Lapse+Guarantee
  - Concepts/Joint+Life
  - Concepts/Reserve
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f7bf957e8b952c4238110bed3378ec16199658b5992a80449fa512dd8b75c5f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2026s-q5.md
---

You are developing a Type A last survivor universal life policy of 1,000,000 on a couple, Xiaobai and Yvette. At the issue date Xiaobai is 51 and Yvette is 61. You are given:

(i) The death benefit is paid at the end of the year of the second death.

(ii) Premiums are payable at the start of each year.

(iii) Account values are calculated annually; $AV_t$ denotes the account value at $t$.

(iv) Xiaobai and Yvette have independent future lifetimes.

(v) The cost of insurance (COI) is based on 100% of the mortality in the Standard Ultimate Survival Model (SUSM).

(vi) The interest rate for calculating the COI is $i_q = 0.03$.

(vii) Initial expense charges are 200 plus 40% of the first premium.

(viii) Renewal expense charges for the second and subsequent policy years are 50 plus 10% of the premium.

## Part a (1 point)

Show that $1000 \times q_{\overline{51:61}} = 0.005$ to the nearest 0.001. You should calculate the value to the nearest 0.00001.

### Explanation
$$1000\,q_{\overline{51:61}} = 1000\left(q_{51}\,q_{61}\right) = 0.00505$$

### Examiner Report
This part was done well by almost all candidates who attempted it.

## Part b (3 points)

The couple pays a premium of 14,400 at the start of the first year. The crediting rate in the first year is 5%.

(i) Calculate $AV_1$ if both insureds remain alive at the end of the first year.

(ii) State with reasons whether $AV_1$ would be larger, smaller, or the same, if only Yvette survives to the end of the first year.

### Explanation
**(i)** We have

$$
\begin{align*}
AV_1 &= \left(0.6P - 200 - q_{\overline{51:61}}\,v_{3\%}\left(FA - AV_1\right)\right)(1.05) \\
&= \left(14{,}400(0.6) - 200 - \left(\frac{0.00505}{1000}\,v_{3\%}\right)\left(1{,}000{,}000 - AV_1\right)\right)(1.05) \\
&= \frac{8{,}856.86}{1 - \left(0.00505\,v_{3\%}/1000\right)(1.05)} \\
&= 8{,}856.90
\end{align*}
$$

**(ii)** The first-year cash flows are not affected by the death of either X or Y (as long as they don't both die). Hence the AV at $t = 1$ would be the same.

### Examiner Report
1. Part (i) was done well by most candidates who attempted it.
2. Part (ii) was done less well. Many candidates claimed that the AV at t =1 would change because the COI would change, but that would only affect future AV's not the AV at t=1.

## Part c (2.5 points)

You are given that $AV_6 = 92{,}000$, a premium of 14,400 is paid at $t = 6$, and the crediting rate in the 7th year is 5%.

(i) Calculate $AV_7$ if both lives are alive at $t = 6$.

(ii) Calculate $AV_7$ if only Xiaobai is alive at $t = 6$.

### Explanation
**(i)** If both lives are alive at $t = 6$ then the discounted COI rate is

$$q_{\overline{57:67}}\,v_{3\%} = \left(q_{57}\right)\left(q_{67}\right)v_{3\%} = 1.7690 \times 10^{-5}.$$

In this case, we have

$$
\begin{align*}
AV_7 &= \left(AV_6 + 0.9P - 50 - q_{\overline{57:67}}\,v_{3\%}\left(FA - AV_7\right)\right)(1.05) \\
&= \left(92{,}000 + 14{,}400(0.9) - 50 - \left(1.769 \times 10^{-5}\right)\left(1{,}000{,}000 - AV_7\right)\right)(1.05) \\
&= \frac{110{,}136.9}{1 - \left(1.769 \times 10^{-5}\right)(1.05)} \\
&= 110{,}139.0
\end{align*}
$$

**(ii)** If X survives to $t = 6$ and Y does not, then we have

$$AV_7 = \left(AV_6 + 0.9P - 50 - q_{57}\,v_{3\%}\left(FA - AV_7\right)\right)(1.05)$$

$$q_{57}\,v_{3\%} = 0.002388$$

$$\Rightarrow AV_7 = \frac{107{,}648.6}{1 - (0.002388)(1.05)} = 107{,}919.1$$

### Examiner Report
1. The Examiners expected this part to be easy, and many candidates achieved full credit, but a surprising number did not.
2. Many candidates lost credit by trying to plug numbers into a memorized formula, rather than setting out the beginning year cash flows and accumulating them, from first principles, as shown in the solution.
3. A number of candidates treated the Face Amount as the Additional Death Benefit, i.e. did not deduct the year-end AV when calculating the insurance cost.
4. A few candidates showed no formulas or calculations, but presented an answer apparently from Excel work. Candidates are required to show their work. If Excel is used, for full credit, candidates must at least briefly explain how Excel was used. In this case, we would expect candidates using Excel to write down their formula and inputs, as well as the final answer.

## Part d (3.5 points)

The policy has a no lapse guarantee. At the end of year 10, based on this policy's premium history, it cannot lapse before the end of year 20.
The reserve for the no lapse guarantee is based on the following assumptions:

- Mortality follows the SUSM.
- $i = 0.05$

You are given that $AV_{10} = 127{,}000$.

(i) Show that $A^{\;1}_{\overline{61:71}:\overline{10}|} = 0.008$ to the nearest 0.001. You should calculate the value to the nearest 0.0001.

(ii) Determine the reserve for the no lapse guarantee at the end of year 10 if both lives are alive at time 10.

(iii) Determine the reserve for the no lapse guarantee at the end of year 10 if only Yvette is alive at time 10.

### Explanation
**(i)**

$$A^{\;1}_{\overline{61:71}:\overline{10}|} = A^{\;1}_{61:\overline{10}|} + A^{\;1}_{71:\overline{10}|} - A^{\;1}_{\overgroup{61:71}:\overline{10}|}$$

Using $A^{\;1}_{x:\overline{n}|} = A_{x:\overline{n}|} - {}_nE_x$ we have

$$A^{\;1}_{61:\overline{10}|} = 0.62201 - 0.57457 = 0.04744$$

$$A^{\;1}_{71:\overline{10}|} = 0.63828 - 0.49848 = 0.13980$$

$$
\begin{align*}
A^{\;1}_{\overgroup{61:71}:\overline{10}|} &= \left(1 - d\,\ddot{a}_{61:71:\overline{10}|}\right) - (1.05)^{10}\left({}_{10}E_{61}\ {}_{10}E_{71}\right) \\
&= 0.64554 - 0.46654 \\
&= 0.17900
\end{align*}
$$

$$\Rightarrow A^{\;1}_{\overline{61:71}:\overline{10}|} = 0.04744 + 0.13890 - 0.17900 = 0.008236$$

OR

$$
\begin{align*}
A^{\;1}_{\overline{61:71}:\overline{10}|} &= A_{\overline{61:71}} - \left({}_{10}p_{61}\right)\left({}_{10}p_{71}\right)v^{10}A_{\overline{71:81}} - \left({}_{10}p_{61}\right)\left({}_{10}q_{71}\right)v^{10}A_{71} - \left({}_{10}q_{61}\right)\left({}_{10}p_{71}\right)v^{10}A_{81} \\
&= 0.008236
\end{align*}
$$

**(ii)** If both lives are alive at t = 10, then the reserve is

$$\max\left(1{,}000{,}000\,A^{\;1}_{\overline{61:71}:\overline{10}|} - AV_{10},\ 0\right)$$

$$\Rightarrow {}_{10}V = \max\left((8236 - 127{,}000),\ 0\right) = 0$$

**(iii)** If only Y is alive at t = 10, then the reserve is

$$
\begin{align*}
{}_{10}V &= \max\left(1{,}000{,}000\,A^{\;1}_{71:\overline{10}|} - AV_{10},\ 0\right) \\
&= \max\left((139{,}800.5 - 127{,}000),\ 0\right) \\
&= 12{,}800.5
\end{align*}
$$

### Examiner Report
1. Candidates generally found this to be the most challenging part of the question. Many candidates omitted this part completely.
2. A fairly small number of candidates correctly calculated the last survivor insurance factor in part (i).
3. In parts (ii) and (iii) many candidates did not deduct the AV. The AV is available to pay for the guaranteed insurance until it is fully depleted. The reserve for the secondary guarantee is the amount required to supplement the AV to ensure that the guaranteed term insurance is fully funded.
