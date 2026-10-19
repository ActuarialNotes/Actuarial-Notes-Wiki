---
id: "altam-2024s-q3"
exam: "Exam ALTAM"
topic: "Policy Value"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: hard
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Thiele's+Differential+Equation
  - Concepts/Equivalence+Principle
  - Concepts/Woolhouse's+Formula
  - Concepts/Adverse+Selection
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:75f9d5a2e309f4ce4646ade0ede14888d1cfe36f5b7d10eddbcf4c6a08ded4f0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2024s-q3.md
---

NED Life sells special whole life insurances of 100,000 that include a sickness benefit. You are given:

- Pricing and valuation is based on the Standard Sickness-Death Model.
- In the Standard Sickness-Death Model:

$$\mu_x^{01} = a_1 + b_1 e^{c_1 x}; \quad \mu_x^{02} = a_2 + b_2 e^{c_2 x}; \quad \mu_x^{10} = b_1 e^{c_1(110-x)}; \quad \mu_x^{12} = 1.4\mu_x^{02}$$

where $a_1 = 4 \times 10^{-4}$; $b_1 = 3.47 \times 10^{-6}$; $c_1 = 0.138$; $a_2 = 5 \times 10^{-4}$; $b_2 = 7.85 \times 10^{-5}$; $c_2 = 0.087$

- Death benefits are payable at the moment of death.
- Sickness benefits are payable continuously at a rate of 12,000 per year while Sick.
- Level premiums are payable continuously while the insured is Healthy.
- All insureds are age 55 and Healthy at purchase.
- $i = 0.05$
- The net premium rate is 6,622 per year.
- ${}_tV^{(j)}$ denotes the net premium policy value for a policy in state $j$ at time $t$.
- ${}_{10}V^{(0)} = 44{,}250$

## Part a (1 point)

Show that ${}_{10}V^{(1)} = 162{,}300$ to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
$$
\begin{align*}
{}_{10}V^{(1)} &= 12{,}000\,\bar{a}^{11}_{65} + 100{,}000\,\bar{A}^{12}_{65} - 6{,}622\,\bar{a}^{10}_{65} \\
&= 12{,}000(8.8123) + 100{,}000(0.56810) - 6{,}622(0.0395) \\
&= 162{,}296.0
\end{align*}
$$

### Examiner Report
Most candidates were able to successfully calculate the reserve at time 10, yet some candidates failed to realize that inputs needed to solve the problem were in the Excel tables.. As a result, there was no need to do any integration to determine the continuous actuarial present values.

## Part b (3 points)

(i) Show that $\left.\dfrac{d}{dt}\,{}_tV^{(1)}\right|_{t=10} = -1950$ to the nearest 25. You should calculate the value to the nearest 1.

(ii) Using Euler's backward method with a step size of $h = 0.25$, estimate ${}_{9.75}V^{(1)}$.

### Explanation
**(i)**

$$
\begin{align*}
\left.\frac{d}{dt}\,{}_tV^{(1)}\right|_{t=10} &= \delta\,{}_{10}V^{(1)} - 12{,}000 - \mu^{10}_{65}\left({}_{10}V^{(0)} - {}_{10}V^{(1)}\right) - \mu^{12}_{65}\left(100{,}000 - {}_{10}V^{(1)}\right) \\
&= (0.048790)(162{,}296) - 12{,}000 - 0.001727(-118{,}046) - 0.03102(-62{,}296) \\
&= -1945.3
\end{align*}
$$

Note: These numbers are correct based on the Standard Sickness Table parameters. However, one of the parameters given in the exam was written as $7.85 \times 10^{-5}$ when it should have been $7.58 \times 10^{-5}$.

The answer using the number given in the exam is

$$
\begin{align*}
&= (0.048790)(162{,}296) - 12{,}000 - 0.00229(-118{,}046) - 0.03102(-62{,}296) \\
&= -1878.0
\end{align*}
$$

**(ii)**

$${}_{9.75}V^{(1)} \approx {}_{10}V^{(1)} - 0.25(-1945.13) = 162{,}783$$

OR:

$${}_{9.75}V^{(1)} \approx {}_{10}V^{(1)} - 0.25(-1950) = 161{,}810$$

OR:

$${}_{9.75}V^{(1)} \approx {}_{10}V^{(1)} - 0.25(-1878) = 162{,}765$$

### Examiner Report
Most candidates were successful at applying both Thiele's differential equation and Euler's backward method to solve each part of the problem. Given the number of terms and variables included within the formula, some candidates seemed to get tripped up by trying to take shortcuts in the calculation. Showing your work and writing out your steps in the calculation not only makes it easier for the grader, but allows partial credit to be given.

## Part c (1 point)

NED introduces a new product, called Product Q, with the same features as the original policy except that:

- Death benefits are payable at the end of the quarter of death.
- Premiums are payable quarterly if the insured is Healthy at the start of the quarter.
- A sickness benefit of 3,000 is payable at the beginning of each quarter if the insured is Sick then.

You are given that:

(i) $A^{(4)02}_{55} = 0.39127$; $A^{(4)02}_{65} = 0.53233$; $A^{(4)12}_{65} = 0.56465$

(ii) $\ddot{a}^{(4)00}_{55} = 10.2478$; $\ddot{a}^{(4)01}_{55} = 2.3057$; $\ddot{a}^{(4)10}_{65} = 0.0395$; $\ddot{a}^{(4)11}_{65} = 8.9373$

(iii) ${}_{10}V^{(0)} = 43{,}792$

Show that the annualized net premium is 6,520 to the nearest 10. You should calculate the value to the nearest 1.

### Explanation
$$P = \frac{12{,}000(2.3057) + 100{,}000(0.39127)}{10.2478} = 6518.0$$

### Examiner Report
The vast majority of candidates were able to calculate the proper annualized net premium.

## Part d (1 point)

Show that ${}_{10}V^{(1)}$ for this new policy is 163,450 to the nearest 25. You should calculate the value to the nearest 1.

### Explanation
$$
\begin{align*}
{}_{10}V^{(1)} &= 100{,}000\,A^{(4)12}_{65} + 12{,}000\,\ddot{a}^{(4)11}_{65} - 6{,}518\,\ddot{a}^{(4)10}_{65} \\
&= (100{,}000)(0.56465) + (12{,}000)(8.9373) - (6518)(0.0395) \\
&= 163{,}455
\end{align*}
$$

### Examiner Report
The majority of candidates were also able to calculate the appropriate reserve at time 10 for the new product, called Product Q. However, some candidates failed to recognize that they still needed to subtract out the premium payment if the policyholder returned to state 0, in which case the policyholder would be required to make the premium payment.

## Part e (2 points)

You are also given:

| $x$ | ${}_{0.25}p_x^{01}$ | ${}_{0.25}p_x^{02}$ | ${}_{0.25}p_x^{10}$ | ${}_{0.25}p_x^{12}$ |
|---|---|---|---|---|
| 64.75 | 0.00674 | 0.00547 | 0.00043 | 0.00764 |

Using backwards recursion with a step size of $h = 0.25$, calculate:

(i) ${}_{9.75}V^{(0)}$

(ii) ${}_{9.75}V^{(1)}$

### Explanation
$$
\begin{align*}
\left({}_{9.75}V^{(1)} - 3{,}000\right)(1.05)^{0.25} &= {}_{0.25}p^{10}_{64.75}\left({}_{10}V^{(0)}\right) + {}_{0.25}p^{11}_{64.75}\left({}_{10}V^{(1)}\right) + {}_{0.25}p^{12}_{64.75}(100{,}000) \\
&= 0.00043(43{,}792) + 0.99193(163{,}455) + 0.00764(100{,}000)
\end{align*}
$$

$$\Rightarrow {}_{9.75}V^{(1)} = 163{,}944$$

$$
\begin{align*}
\left({}_{9.75}V^{(0)} + 0.25P\right)(1.05)^{0.25} &= {}_{0.25}p^{00}_{64.75}\left({}_{10}V^{(0)}\right) + {}_{0.25}p^{01}_{64.75}\left({}_{10}V^{(1)}\right) + {}_{0.25}p^{02}_{64.75}(100{,}000) \\
&= 0.98779(43{,}792) + 0.00674(163{,}455) + 0.00547(100{,}000)
\end{align*}
$$

$$\Rightarrow {}_{9.75}V^{(0)} = 42{,}732$$

### Examiner Report
While most candidates did well utilizing backwards recursion to calculate both reserves at time 9.75, some candidates were unsure how to adjust the reserve to account for the sickness benefit and premium payments that were to be paid. For example, the quarterly premium payment instead of the annual premium amount should have been added to the reserve at time 9.75 in the healthy status. Likewise, the quarterly sickness benefit versus the annual amount should have been subtracted from the reserve at time 9.75 in the sick status.

## Part f (2 points)

NED Life believes policyholders care more about the sickness benefits in the early years and the death benefits thereafter. They introduce a new variation of Product Q, called Product Q+:

- The quarterly net premium for Product Q+ is the same as for Product Q.
- Death and sickness benefits in the first 10 years for Product Q+ are the same as for Product Q.
- No sickness benefits are paid after 10 years under Product Q+.
- The death benefit after 10 years for Product Q+ is increased to $F$.

Calculate $F$.

### Explanation
Equate the EPV of the post 65 sickness benefits with the value of the additional death benefit.

Let $D = F - 100{,}000$

$$D\left({}_{10}p^{00}_{55}v^{10}A^{(4)02}_{65} + {}_{10}p^{01}_{55}v^{10}A^{(4)12}_{65}\right) = 12{,}000\left({}_{10}p^{00}_{55}v^{10}\ddot{a}^{(4)01}_{65} + {}_{10}p^{01}_{55}v^{10}\ddot{a}^{(4)11}_{65}\right)$$

where (using Woolhouse) $\ddot{a}^{(4)01}_{65} \approx \bar{a}^{01}_{65} = 2.8851$

$$
\begin{align*}
&\Rightarrow D\left(0.7409v^{10}(0.53233) + 0.11682v^{10}(0.56465)\right) \\
&\qquad = 12{,}000\left(0.7409v^{10}(2.885) + 0.11682v^{10}(8.9373)\right)
\end{align*}
$$

$$\Rightarrow D = 82{,}930$$

$$\Rightarrow F = 182{,}930$$

### Examiner Report
Most candidates did not do well on this part, although several different approaches could have been taken. The most straight forward approach would have been to write the new product out in its basic elements. Essentially the new product included a 10-year annuity if the policyholder became sick and a death benefit that could have been written formulaically as a whole life policy on age 55 that paid out 100,000 and another whole life policy on age 65 that paid out (F – 100,000), given the policyholder survived either in state 0 or 1 for those first 10 years. Since the premium was set equal to the prior product's design, one could then reapply the equivalence principle to solve for F having already known the premium for the new product Q+.

## Part g (1 point)

The head of marketing proposes that since the premiums and benefits of Product Q and Product Q+ are the same for the first 10 years, any policyholder request to switch between the policies within the 10 years should be granted. State with reasons whether you agree or disagree with the proposal.

### Explanation
Disagree

The problem is adverse selection (or anti-selection).

At issue, the EPV of future benefits is the same, but as policy approaches the end of the initial 10-years the value of the future sickness benefits is much greater if the insured is sick then than if they are healthy.

An insured who is sick would want to keep the sickness benefit, one who is not would want the larger death benefits.

### Examiner Report
Most candidates were correct in identifying that they should disagree with the proposal. Candidates that received the most points for this part were also able to communicate that allowing policyholders to switch between products Q and Q+ would create an adverse selection issue where the policyholder could switch between products and select the product that would ultimately benefit the policyholder the most. If the company decided to move forward with this approach, they should consider the anti-selection issue within the pricing of the products.
