---
id: "altam-2025f-q6"
exam: "Exam ALTAM"
topic: "Pension Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: hard
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Pension+Plan
  - Concepts/Defined+Benefit+Plan
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Early+Retirement
points: 10
---

Lin is a member of a final average salary pension plan. On December 31, 2024, Lin is exactly 50 years old, with 20 years of pensionable service. Lin's salary in 2024 was 100,000.

You are given the following information for a plan funding valuation on January 1, 2025:

1. The accrual rate is 1.5% per year of service.
2. Final average salary is defined as the average salary in the two years before retirement.
3. The benefit on retirement is a pension payable monthly in advance for life. There are no spousal benefits.
4. Annual salaries are assumed to increase by 3% each year on January 1. Salaries are paid in level installments at the end of each month within each calendar year of employment.
5. Pension payments are assumed to increase monthly at an annual effective rate of 2%.
6. The pension plan uses the projected unit credit method to determine pension reserves and funding.
7. You are given the following valuation assumptions:
   - All lives remain in service until retirement (that is, there are no deaths or withdrawals before retirement).
   - $i = 0.06$
   - At an interest rate of $i^* = \dfrac{1.06}{1.02} - 1$, $\ddot{a}_{60|i^*}^{(12)} = 16.2437$ and $\ddot{a}_{65|i^*}^{(12)} = 14.5260$

Lin is considering two retirement options.

- **Option A:** Retire at age 60 with an actuarial reduction of 0.3% per month up to age 65.
- **Option B:** Retire at age 65 with no actuarial reduction.

## Part a (2 points)

(i) Calculate the amount of the first month's pension payment under Option A.

(ii) Calculate the amount of the first month's pension payment under Option B.

### Explanation
**(i)** Under Option A the annual rate of pension benefit at retirement is

$$FAS_{60} = 100{,}000\left(\frac{1.03^9 + 1.03^{10}}{2}\right) = 132{,}434.5$$

$$B_{60} = FAS_{60} \times 0.015 \times 30 \times (1 - 5 \times 12 \times 0.003) = 48{,}868.32$$

$$\Rightarrow \text{first month's pension is } \frac{48{,}868.32}{12} = \mathbf{4072.36}$$

**(ii)** Under Option B:

$$FAS_{65} = 100{,}000\left(\frac{1.03^{14} + 1.03^{15}}{2}\right) = 153{,}528$$

$$B_{65} = FAS_{65} \times 0.015 \times 35 = 80{,}602$$

$$\Rightarrow \text{first month's pension is } \frac{80{,}602}{12} = \mathbf{6{,}716.84}$$

### Examiner Report
1. Overall, candidates found this question challenging, which is often the case for pension questions. Some marks were lost by candidates who answered a different question to the one asked, adding complexity. Candidates are advised that in this exam, they should re-read the question several times as they work through it, to ensure that they are answering the correct question with the correct information. This is particularly true for pension questions, where the questions tend to have a long list of information and assumptions, all of which will be relevant to the question.
2. Candidates are encouraged to use Excel for pension questions, which are often quite calculation-heavy. If you do use Excel, you should note in your answer booklet what calculations you have done in Excel, with enough detail for graders to be able to assess whether partial credit is merited if the answer is incorrect.
3. Part (a) was generally done well, apart from most common mistake in pension questions, which is allowing for 1 year too few or too many salary increases. Some candidates only used past service for this part of the question. When projecting final benefits, it is appropriate to use past and future service. We use past service when we are valuing the liability associated with the accrued benefits at the valuation date.

## Part b (1 point)

Describe briefly the circumstances that would justify the valuation assumption that there are no pre-retirement exits.

### Explanation
The assumption of no exits is valid if the cost to the plan of deaths or withdrawals is similar to, or less than the cost of retirements. That means that if early exits were explicitly allowed for, the resulting liability would be similar or less than the liability assuming all lives survive to retirement.

### Examiner Report
4. Part (b) was not done well. Many candidates suggested that the assumption would be valid of no members died or withdrew, which is true technically, but not relevant in a practical discussion of assumptions.

## Part c (3 points)

(i) Calculate the actuarial liability assuming Lin will choose Option A.

(ii) Calculate the actuarial liability assuming Lin will choose Option B.

(iii) State with reasons whether the actuarial reduction factor appears to be appropriate.

### Explanation
Note that the value at age $x$ of a pension starting at a rate of $B$ per year, payable monthly, and increasing monthly at a rate of 2% per year is:

$$\frac{B}{12}\left(1 + {}_{\frac{1}{12}}p_x(1.02v)^{\frac{1}{12}} + {}_{\frac{2}{12}}p_x(1.02v)^{\frac{2}{12}} + \cdots\right) = B\,\ddot{a}_{x|i^*}^{(12)}$$

where

$$i^* = \frac{1 + i}{1.02} - 1 = \frac{1.06}{1.02} - 1 = 3.9216\%$$

**(i)** Assuming Option A:

$$
\begin{align*}
AL_A &= FAS_{60} \times 0.015 \times 20 \times 0.82 \times v^{10} \times \ddot{a}_{60|i^*}^{(12)} \\
&= (132{,}434.5)(0.015)(20)(0.82)(1.06)^{-10}(16.2437) \\
&= \mathbf{295{,}503}
\end{align*}
$$

**(ii)** Assuming Option B:

$$
\begin{align*}
AL_B &= FAS_{65} \times 0.015 \times 20 \times v^{15} \times \ddot{a}_{65|i^*}^{(12)} \\
&= (153{,}528)(0.015)(20)(1.06)^{-15}(14.5260) \\
&= \mathbf{279{,}169}
\end{align*}
$$

**(iii)** The EPV of the accrued benefit for early retirement is significantly higher than the age 65 retirement (even though the age 65 value allows for 5 more years of salary increases) indicating that the reduction factor appears generous in this case.

OR

The proportionate reduction factor for age 60, based on actuarial equivalence, would be calculated as

$$\frac{v^5\,\ddot{a}_{65}^{(12)}}{\ddot{a}_{60}^{(12)}} = \frac{(1.06)^{-5} \times 14.5260}{16.2437} = 0.6682389$$

and, as it is quite lower than $1 - 0.003 \times 60 = 0.82$, the actuarial reduction factor offered by then plan seems too generous.

### Examiner Report
5. In part (c), many candidates wrongly valued the benefit based on past and future service – possibly because they had used both in part (a). In (c)(iii), for full credit, candidates were required to state and justify their opinion on whether the actuarial reduction factor is reasonable. No credit was given to answers that merely defined the actuarial reduction factor.

## Part d (2 points)

You are also given:

- Lin pays contributions of 8% of her salary at the end of each month. The balance of the cost of her benefits is paid by her employer.
- Employer contributions are deposited into the pension plan each month, at the same time as the employee contributions.

(i) Calculate the EPV at the valuation date of Lin's pension contributions in 2025.

(ii) Calculate the employer's net normal contribution rate for Lin's retirement benefits in 2025, after taking Lin's contributions into consideration, assuming Lin will choose Option B.

### Explanation
**(i)** EPV of contributions $= 0.08(100{,}000)(1.03)\,a_{\overline{1}|}^{(12)}$,

where

$$a_{\overline{1}|}^{(12)} = \left(\frac{1 - v}{12\left((1.06)^{1/12} - 1\right)}\right) = 0.969067$$

$$\Rightarrow \text{EPV} = 0.08(100{,}000)(1.03)(0.969067) = \mathbf{7985.11}$$

**(ii)** NC gross is $AL_B/20 = 13{,}958.4$

Net NC rate is $c$ s.t. $c(1.03)(100{,}000)\,a_{\overline{1}|}^{(12)} + 7985.1 = 13{,}958.4$

$$\Rightarrow c = \frac{5973.3}{(1.03)(100{,}000)(0.969067)} = \mathbf{5.98\%}$$

### Examiner Report
6. Most candidates omitted part (d), or attempted it but did not earn any points. Some of those who did attempt it valued all future contributions instead of just one year. Others ignored the monthly frequency, either because they did not know how to handle it, or because they did not notice that payments were monthly. As ignoring the frequency made this part very much easier, the partial credit available was small if payments in either or both parts were assumed to be annual. Only a small minority of candidates earned most or all of the points on this part.

## Part e (2 points)

(i) The plan actuary currently assumes that all plan members choose Option B. Critique this assumption.

(ii) The plan actuary currently assumes that the mortality after age 65 of retirees who chose option A is the same as the mortality of those who chose option B. Critique this assumption.

### Explanation
**(i)** The actuary should either model exits more precisely, based on data from the company itself, and other similar firms, or they should assume the safe-side assumption to ensure that contributions are sufficient if all employees select the more expensive option – in this case Option A.

**(ii)** The members who choose Option A may be those at higher income levels, who can afford to support their lifestyle with other sources of income, e.g. savings/inheritance. Higher income individuals tend to have lower mortality.

On the other hand, if early retirement is used largely by employees in failing health, e.g. in physically demanding jobs, then the mortality may be worse for early retirees than for those staying to age 65.

### Examiner Report
7. Part (e) attracted a range of answers, some quite insightful. Most of those who did not skip this part earned at least 1 exam point, but very few earned full credit,
