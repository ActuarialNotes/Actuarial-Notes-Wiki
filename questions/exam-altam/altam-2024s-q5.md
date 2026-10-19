---
id: "altam-2024s-q5"
exam: "Exam ALTAM"
topic: "Defined Benefit Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Defined+Benefit+Plan
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Pension+Plan
  - Concepts/Fractional+Age+Assumption
  - Concepts/Pension+Risk+Transfer
points: 10
---

You are the actuary for a small defined benefit pension plan. At the valuation on 1/1/2024 there are 5 members, all of whom retired at age 65 as detailed below. All benefits are paid in the form of a monthly annuity-due payable during the life of the member with payments guaranteed for 10 years following retirement (that is, up to the attainment of age 75).

| Member | Exact Age as of 1/1/2024 | Annual Pension (000s) |
|---|---|---|
| A | 69 | 42.0 |
| B | 69 | 48.0 |
| C | 69 | 60.0 |
| D | 72 | 36.0 |
| E | 72 | 42.0 |
| Total | | 228.0 |

The valuation assumptions are as follows:

- Mortality follows the Standard Ultimate Mortality Model.
- Deaths are assumed to be uniformly distributed between integer ages.
- There are no expenses paid from the pension assets.
- $i = 0.05$

## Part a (1 point)

Show that $\ddot{a}^{(12)}_{\overline{72:\overline{3}|}} = 10.94$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation
$$\ddot{a}^{(12)}_{\overline{72:\overline{3}|}} = \ddot{a}^{(12)}_{\overline{3}|} + v^3\,{}_3p_{72}\,\ddot{a}^{(12)}_{75}$$

$$\ddot{a}^{(12)}_{\overline{3}|} = \frac{1-v^3}{0.04869} = 2.79652$$

$$\ddot{a}^{(12)}_{75} = 1.00020\,\ddot{a}_{75} - 0.46651 = 9.85335$$

$$\Rightarrow \ddot{a}^{(12)}_{\overline{72:\overline{3}|}} = 2.79652 + v^3\,\frac{85{,}203.5}{89{,}082.1}(9.85335) = 10.9376$$

### Examiner Report
Many candidates mistakenly calculated a 3-year term annuity due, perhaps stemming from a lack of experience with this notation.

## Part b (2 points)

Show that the Total Actuarial Liability (in 000s) for the accrued benefits at the valuation date is 2660 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
$$AL_{2024} = 150\left(\ddot{a}^{(12)}_{\overline{69:\overline{6}|}}\right) + 78\left(\ddot{a}^{(12)}_{\overline{72:\overline{3}|}}\right)$$

$$\ddot{a}^{(12)}_{\overline{69:\overline{6}|}} = \frac{1-v^6}{0.04869} + v^6\,\frac{85{,}203.5}{91{,}936.9}(9.85335) = 12.0263$$

$$AL_{2024} = 150(12.0263) + 78(10.9376) = 2657.1$$

### Examiner Report
Some candidates mentioned they used Excel to calculate a final answer, but this Excel work should be transcribed into their papers as both the work and answer are graded. For questions 2 through 6, only the information on the written paper is graded. Any work in Excel is not graded.

## Part c (1 point)

Briefly explain why there is no Normal Cost for this plan.

### Explanation
The Normal Cost is the amount required to support the increase in accrued benefits in the year(s) following the valuation. As there are no active members, there is no increase in accrued benefits.

### Examiner Report
Most candidates understood part C well.

## Part d (4 points)

Three years later you are asked to perform a new valuation for the same pension plan. You are given the following information:

- The valuation basis on 1/1/2027 is the same as the basis on 1/1/2024.
- Member B died on 12/31/2026.
- There have been no other changes in membership.
- The plan was 100% funded as of 1/1/2024 (that is, the value of assets in the pension fund was exactly equal to liabilities at that time).
- The plan assets earned a constant rate of return of 3% per year between 1/1/2024 and 1/1/2027.

(i) Show that the value of the plan assets (in 000s) on 1/1/2027 is 2190 to the nearest 10. You should calculate the value to the nearest 1.

(ii) Show that the Total Actuarial Liability (in 000s) for all members' accrued benefits on 1/1/2027 is 2020 to the nearest 10. You should calculate the value to the nearest 1.

(iii) Calculate the aggregate gain or loss on the plan between 1/1/2024 and 1/1/2027.

(iv) State with reasons whether the mortality experience of the plan generated a gain or loss between 1/1/2024 and 1/1/2027.

### Explanation
**(i)** Let $\mathrm{VA}_{yr}$ denote the value of the assets at yr

$$
\begin{align*}
\mathrm{VA}_{2027} &= \mathrm{VA}_{2024}(1.03)^3 - 228\,\ddot{s}^{(12)}_{\overline{3}|} \\
&= 2657.1(1.03)^3 - 228\left(\frac{1.03^3 - 1}{12\left(1 - 1.03^{-1/12}\right)}\right) \\
&= 2187.4
\end{align*}
$$

**(ii)**

$$
\begin{align*}
\mathrm{AL}_{2027} &= 102\,\ddot{a}^{(12)}_{\overline{72:\overline{3}|}} + 78\,\ddot{a}^{(12)}_{75} + 48\,\ddot{a}^{(12)}_{\overline{3}|} \\
&= 102(10.9376) + 78(9.85335) + 48(2.7965) \\
&= 2018.43
\end{align*}
$$

**(iii)** Gain $= 2187.4 - 2018.4 = 169.0$

**(iv)** The expected number of deaths from the plan members is $3\,{}_3q_{69} + 2\,{}_3q_{72} = 0.18$. The actual number of deaths was 1. As excess deaths generate gain in an annuity portfolio, the plan experienced a mortality gain over the period.

OR:

The plan has made a gain, despite earning only 3% per year on investments instead of the 5% assumed in the valuation. As there are no other sources of profit or loss, the plan must have had a gain from mortality.

### Examiner Report
Part D was challenging. Many candidates used annual discounting in parts I. and II. Parts III. and IV. were generally handled well. Some calculated the gain correctly but misinterpreted it as a loss.

## Part e (2 points)

The plan sponsor is considering purchasing annuities to provide the remaining benefits to the retired members. Briefly describe two advantages and two disadvantages to the sponsor of buying annuities at this time.

### Explanation
**Advantages**

1. Protect the sponsor from investment and survivorship risks;
2. Eliminate the need for expenses of administering plan (i.e., no more valuations required);
3. Retirees may feel better protected by guaranteed insured benefit.
4. Get the employer out of the business of managing an annuity portfolio (overlaps with item (2)?).

**Disadvantages**

1. Annuity prices will likely exceed plan liabilities as they will include loadings for profit, expenses, and risk.
2. Annuity prices will likely exceed plan liabilities as the interest rate the last two years has been 3% which is lower than the assumed rate of 5%.
3. Loss of potential future gains from investment which might improve retirees' benefits or be returned to the sponsor.

### Examiner Report
Part E was often misunderstood as being from the retiree's perspective when they were asked about the sponsor's perspective. Many candidates wrote that "high cost" of annuities are a disadvantage to the sponsor, but in order to receive credit, we needed more explanation and clarity.
