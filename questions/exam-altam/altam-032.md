---
id: "altam-032"
exam: "Exam ALTAM"
topic: "Analysis of Surplus"
learning_objective: "Profit Analysis"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Analysis+of+Surplus
  - Concepts/Whole+Life+Insurance
  - Concepts/Policy+Value
  - Concepts/Future+Lifetime+Random+Variable
  - Concepts/Expected+Value
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b3d7f033a532124e77b03aaa0eaba0217ae1b7b4497063a3b986abfe8bae2a05
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-032.md
---

NED Life issues a fully discrete whole life insurance of 100,000 on (50) with a return of premium benefit subject to the following conditions:

- If death occurs in the first 10 years, no premiums are returned.
- If death occurs after 10 years, all premiums, including the first 10, are returned without interest at the end of the year of death.

You are given:

(i) The gross premium is 2,000.

(ii) Premium expenses, payable at the beginning of the year, are 80% of the first year's premium and 5% of premium in subsequent years.

(iii) Termination expenses of 1,000 are paid at the end of the year of death.

(iv) Mortality follows the Standard Ultimate Life Table.

(v) $i = 0.05$

(vi) $L^g$ is the gross loss at issue random variable.

(vii) $(IA)_{60} = 6.63303$

(viii) ${}_kV^g$ denotes the gross premium policy value at the end of year $k$.

(This is Question 1 from the Fall 2021 Form A Written Answer exam.)
(Part (a), (b) and (c) are covered by the FAM-L exam.)

## Part a (1 point)

Show that if $T_{50} = 11.8$, then $L^g$ is 53,420 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
For $T_{50} = 11.8$, we have $K_{50} = 11$ which means that 12 premiums would be returned without interest.

Let $S = 100{,}000$ and $P = 2000$.

$$L^g = (S + 12P + 1000)v^{12} + 0.75P - 0.95P\,\ddot{a}_{\overline{12}|}$$

$$\ddot{a}_{\overline{12}|} = \frac{1 - 1.05^{-12}}{0.05/1.05} = 9.306414$$

$$
\begin{align*}
L^g &= (100{,}000 + 12(2000) + 1000)\,1.05^{-12} + 0.75(2000) - 0.95(2000)(9.306414) \\
&= 69{,}604.6773 + 1500 - 17{,}682.187 \\
&= 53{,}422.49
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Candidates generally did well in this part. Common mistakes were using 11.8 or 11 as the number of premiums or not properly including the return of premium benefit.

## Part b (2 points)

Calculate $E[L^g]$.

### Explanation
$$
\begin{align*}
E\left[L^g\right] &= (S + 1000)A_{50} + P\,{}_{10}E_{50}\left(10A_{60} + (IA)_{60}\right) + 0.05P\ddot{a}_{50} + 0.75P - P\ddot{a}_{50} \\
&= -248.53
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Many candidates did not correctly allow for the return of premium benefit.

## Part c (2 points)

Show that ${}_{10}V^g$ is 20,070 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
$${}_{10}V^g = (S + 1000)A_{60} + 10P\,A_{60} + P(IA)_{60} - 0.95P\,\ddot{a}_{60}$$

$$
\begin{align*}
{}_{10}V^g &= (100{,}000 + 1000)(0.029028) + 10(1000)(0.229028) + (2000)(6.63303) - 0.95(2000)(14.9041) \\
&= 29{,}318.28 + 5805.60 + 13{,}266.06 - 28{,}317.79 \\
&= 20{,}072.15
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Candidates did better on this part than on Part (b) although the return of premium benefit was still a stumbling block for many.

## Part d (4 points)

NED Life had 1000 such policies in force at the end of 15 years. You are given:

(i) ${}_{15}V^g = 34{,}333.78$ and ${}_{16}V^g = 37{,}480.51$

(ii) During year 16:

- There were 7 deaths.
- i = 0.052
- Premium expenses were 4% of premium.
- Termination expenses were 2,000 per death.

(i) Calculate the total gain in the 16th year.

(ii) Calculate the gain by source in the following order: expenses (E), interest (I) and mortality (M).

### Explanation
**(i)** Total gain: using the actual experience (\*) during year 16,

$$1000\left({}_{15}V^g + P - e^*_{15}\right)\left(1 + i^*_{15}\right) - 1000\,q^*_{65}\left(S + 16P + E^*_{15}\right) - 1000\,p^*_{65}\,{}_{16}V^g$$

$$
\begin{align*}
&= 1000(34{,}333.78 + 0.96(2000))(1.052) - 7(100{,}000 + 32{,}000 + 2000) - 993(37{,}480.51) \\
&= 38{,}138{,}976.56 - 938{,}000 - 37{,}218{,}146.43 \\
&= -17{,}169.87
\end{align*}
$$

i.e. a loss of 17,169.87

**(ii)** Gain by source:

**Gain from expenses (E):**

Expected expenses – Actual expenses, valued at year end

$$
\begin{align*}
&\left[1000(0.05P)(1.05) + 1000\,q_{65}(1000)\right] - \left[1000(0.04P)(1.05) + 1000\,q_{65}(2000)\right] \\
&= \left[105{,}000 + 1000(0.005915)(1000)\right] - \left[84{,}000 + 1000(0.005915)(2000)\right] \\
&= 110{,}915 - 95{,}830 \\
 &= \mathbf{15{,}085}
\end{align*}
$$

$\Rightarrow$ a gain from expenses of 15,085

**Gain from interest (I):**

Actual interest earned – expected interest earned, using the actual expenses

$$1000\left({}_{15}V^g + 0.96P\right)\left(i^*_{15} - 0.05\right) = 1000\left[34{,}333.78 + 0.96(2000)\right](.002) = \mathbf{72{,}507.56}$$

$\Rightarrow$ a gain from interest of 72,507.56

So the gain from interest is 87,553.78 – 15,046.22 = 72,507.56

**Gain from mortality (M):**

Expected mortality cost – actual mortality cost, using the actual expenses and interest

$$\left[1000\,q_{65}\left(S + 16P + E^*_{15}\right) + 1000\,p_{65}\,{}_{16}V^g\right] - \left[1000(0.007)\left(S + 16P + E^*_{15}\right) + 1000(0.993)\,{}_{16}V^g\right]$$

$$= 792{,}610 + 37{,}258{,}812.78 - 938{,}000 - 37{,}218{,}146.43 = \mathbf{-104{,}723.65}$$

$\Rightarrow$ a loss from mortality of 104,723.65

### Examiner Report
*Graders' Comments:* Gain by interest was done the best while gain by mortality was done the worst. Some candidates answered part (d).ii before part (d).i and used the sum of the gains from part (d).ii to answer part (d).i, if done correctly, this received full credit. Some candidates forgot to multiply their gains by 1000 policies - a small deduction was made for this.

## Part e (1 point)

An actuary at NED Life was asked to calculate the gain by source. He wasn't sure which order to use, so he calculated the gain based on all six possible orders. Referring to the sources of gain in order by their first letters, the order you did in part (d) was EIM.

Without further calculation, state, using the three-letter ids, which, if any, of the other 5 orders had the same gain from interest as EIM. Justify your response.

### Explanation
The orders **MEI and EMI** had the same interest gain as EIM.

This can be justified a number of ways.

- The mortality cost is incurred at year end and has no impact of the interest earned during the year.
- Since actual premium expenses are different than expected, the gain from expenses (E) must be calculated before that from interest (I) to get the same value. So, E must precede I.
- Expenses affect the interest earned, so E must be calculated before I.

### Examiner Report
*Graders' Comments:* Some candidates mistakenly commented on the total gain (i.e. stated that regardless of the order, the total gain will not change) - this did not receive any credit.
