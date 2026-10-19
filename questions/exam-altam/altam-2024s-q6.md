---
id: "altam-2024s-q6"
exam: "Exam ALTAM"
topic: "Universal Life Insurance"
learning_objective: "Universal Life Insurance"
difficulty: hard
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Universal+Life+Insurance
  - Concepts/Equity-Linked+Insurance
  - Concepts/Guaranteed+Minimum+Death+Benefit
  - Concepts/Guaranteed+Minimum+Maturity+Benefit
  - Concepts/Guaranteed+Minimum+Income+Benefit
points: 11
---

A policyholder age 70 purchases two policies:

- A Type B Universal Life (UL) policy with an additional death benefit of 100,000.
- A 10-year equity-linked (EL) insurance policy with a guaranteed minimum death benefit equal to the value of the premiums accumulated at 5% interest, and a guaranteed minimum maturity benefit of the total premiums paid.

You are given the following information about the policies.

UL policy information:

- The policyholder pays premiums of 20,000 at the start of each year.
- The death benefits are paid at the end of the year of death.
- The policy uses a COI rate of 150% of the Standard Ultimate Mortality Model, and an interest rate $i_q = 0\%$ for calculating the cost of insurance.
- Expense charges of 1.5% of the account value (before the premium) plus 2% of the premium are payable at the start of each year.
- There is a level corridor factor of 1.5.
- Each year the insurer sets an anticipated rate that it expects to earn on its EL funds. The credited rate for the UL policy is set at 65% of this anticipated rate, with a minimum credited rate of 2.5%.
- Account values are calculated annually.

EL policy information:

- The policyholder pays premiums of 20,000 at the start of each year.
- The death benefits are paid at the end of the year of death.
- Management charges of 2% of the fund value (before the premium) plus 2% of the premium are payable at the start of each year.
- An additional management charge of 4,000 is payable at the start of the first year.

## Part a (2 points)

The anticipated rate earned and actual rate earned on the EL funds in the first year are both 9%.

(i) Calculate the account value at time 1 for the UL policy.

(ii) Calculate the fund value at time 1 for the EL policy.

### Explanation
**(i)** Start by assuming corridor factor does not apply (noting that $0.65(0.09) = 0.0585 > 0.025$):

$$
\begin{align*}
AV_1 &= \left(P - E - q^*_{70} \times ADB \times v_{i_q}\right) \times \left(1 + i^c_1\right) \\
&= \left(20{,}000(0.98) - (1.50)(0.010413)(100{,}000)\right)(1 + 0.65 \times 0.09)
\end{align*}
$$

$$\Rightarrow AV_1 = 19{,}093.3$$

Check that the death benefit exceeds 150% of the year end account value because of the corridor factor. The total death benefit is 119,093.3 while 150% of the year end AV is 28,640.

Predictably, the corridor factor does not apply.

**(ii)**

$$F_1 = \left((0.98)20{,}000 - 4{,}000\right)(1.09) = 17{,}004$$

### Examiner Report
Overall, candidates found this question challenging, with very few achieving maximum points.

In both part (a) and part (b), quite a few candidates did not check the corridor factor. Whenever a UL question specifies that there is a corridor factor requirement, it should be checked whenever calculating an account value or cost of insurance. Failure to check this was more critical in part (b) than part (a).

## Part b (3 points)

The policyholder survives to time 9. You are given:

- The account value for the UL policy at time 9 before the premium payment is 196,840.
- The fund value for the EL policy at time 9 before the premium payment is 212,000.
- The anticipated rate and the actual rate earned on the EL funds in the 10th year are both 3%.

(i) Show that the account value at time 10 for the UL policy is 214,000 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Show that the fund value at time 10 for the EL policy is 234,200 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
**(i)** Again start by assuming the corridor factor does not apply, noting that the crediting rate will be the minimum guaranteed value (2.5%):

$$
\begin{align*}
AV_{10} &= \left(AV_9 + P - E - q^*_{79}\left(FV - AV_{10}\right)v_{i_q}\right) \times \left(1 + i^c_9\right) \\
&= \left(196{,}840(0.985) + 20{,}000(0.98) - 1.50(0.029132)(100{,}000)\right)(1.025) \\
&= 214{,}345.5
\end{align*}
$$

The total death benefit (without the corridor factor) is 314,345 while 150% of the AV is 321,519.

$\text{Death Benefit} < 150\% \text{ of the Account Value}$ so the corridor factor applies.

So

$$
\begin{align*}
AV_{10} &= \left(AV_9 + P - E - q^*_{79}\left(1.50AV_{10} - AV_{10}\right)v_{i_q}\right)\left(1 + i^c_9\right) \\
&= \left(196{,}840(0.985) + 20{,}000(0.98) - 1.50(0.029132)\left(0.50AV_{10}\right)\right)(1.025)
\end{align*}
$$

$$\Rightarrow AV_{10} = 214{,}031$$

**(ii)**

$$F_{10} = \left((0.98)(212{,}000) + (0.98)(20{,}000)\right)(1.03) = 234{,}181$$

(Note that this is greater than the GMMB = 10(20,000)=200,000 )

### Examiner Report
Most, but not all candidates spotted that the UL policy's minimum crediting rate applies in part (b), though a few also wrongly applied it to the EL policy as well as the UL.

## Part c (2 points)

Calculate the payout from each policy if the policyholder dies during the 10th year.

### Explanation
The payout from the UL policy is $1.50(214{,}031) = 321{,}047$

For the EL policy we need to check the GMDB:

The accumulated premiums are

$$20{,}000\,\ddot{s}_{\overline{10}|} = 20{,}000\left(\frac{(1.05)^{10} - 1}{d_{5\%}}\right) = 264{,}136$$

Since the GMDB is greater than the fund value, the death benefit is 264,136.

### Examiner Report
Although many candidates correctly identified that the corridor factor applied in part (b), most did not follow through to use the corridor factor to determine the UL death benefit in part (c). The EL death benefit was done correctly by most candidates.

## Part d (2 points)

Describe two advantages and two disadvantages of the UL policy compared with the EL policy, from the perspective of the policyholder.

### Explanation
**Advantages**

1. Early withdrawal: there are guarantees on the UL, as the credited rate is at least 2.5%, but there are none for the EL.
2. The death benefit is higher in earlier years on the UL policy, and is likely higher in all years.
3. Lower "expense charges" on UL (except premium charges, which are the same), but higher cost of insurance.

**Disadvantages**

1. In good years, credited interest on the UL will only be 65% of the performance on the EL.
2. Because of the COI, the amount of premium "invested" in the UL is lower than in the EL each year.
3. The GMDB on the EL could be higher than the UL death benefit, if EL/UL returns are consistently low.
4. The UL premium deductions (expenses and COI) may not be guaranteed.
5. The UL typically would have higher surrender charges in the early years of the contract.

### Examiner Report
Part (d) was done reasonably well by most candidates who attempted it.

## Part e (2 points)

The policyholder decides to annuitize the EL proceeds at policy maturity (calculated in (b)(ii)). The policy has a Guaranteed Minimum Income Benefit (GMIB) option, allowing the policyholder to annuitize the Benefit Base amount at time 10, at a guaranteed annuitization rate of 11.2% for a life age 80. The Benefit Base is the value of the premiums accumulated at 5% interest.

(i) Calculate the annual annuity payout under the GMIB.

(ii) Explain why the policyholder might choose to annuitize the policy proceeds without exercising the GMIB.

### Explanation
**(i)** The Benefit Base is equal to the GMDB, i.e.

$$BB = 264{,}136$$

$$\Rightarrow \text{Annuity benefit} = 0.112 \times 264{,}136 = 29{,}583 \text{ per year}$$

**(ii)** The policyholder might get a higher benefit by annuitizing the final fund value at time 10 at the market rate, if the market rate is high enough.

OR

Let $c$ denote the market rate, then the p/h should annuitize at market rates (without exercising the GMIB) if

$$cF_{10} > (0.112)\left(BB_{10}\right)$$

i.e. if

$$c > \frac{29{,}583}{234{,}181} = 12.64\%$$

### Examiner Report
Part (e) was more challenging. Quite a few candidates correctly determined the amount of guaranteed annuity, but the understanding of why a policyholder might not annuitize through the GMIB was less common. Many candidates suggested reasons why the policyholder might not annuitize at all, but that did not answer the question asked, which was why a policyholder might annuitize without exercising the GMIB. The key here is that even though the benefit base is greater than the fund value at maturity, the market annuitization rate at maturity might be sufficiently higher than the GMIB rate as to provide a greater amount of annuity.
