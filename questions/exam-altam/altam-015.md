---
id: "altam-015"
exam: "Exam ALTAM"
topic: "Disability Income Insurance"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Disability+Income+Insurance
  - Concepts/Multiple+State+Model
  - Concepts/Equivalence+Principle
  - Concepts/Transition+Intensity
  - Concepts/State-Dependent+Insurance
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d15ff43682abc1cc203ec48d5eaeb5f06c7353304249f828071ee5c9e6f9ba65
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-015.md
---

You are using the following model to price a 10-year Disability Income Insurance policy issued to $(x)$.

![State diagram: Healthy (0), Sick (1) and Dead (2); arrows run 0 to 1, 1 to 0, 0 to 2 and 1 to 2.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-015-state-diagram.png)

The product has the following features.

(i) Policyholders are healthy at the issue date.

(ii) A benefit of 20,000 is payable immediately on death within 10 years.

(iii) A continuous benefit of 1000 per year is paid while the policyholder is in the Sick state, during the 10-year term.

(iv) Premiums are payable continuously while the life is in the Healthy state.

(v) Maintenance expenses are paid at a continuous rate of 60 per year while the insured is alive.

(vi) Commissions are payable continuously at a rate of 5% of gross premium.

(vii) No benefits, premiums or expenses are payable beyond 10 years.

You are also given:

(viii) $\mu_{x+t}^{01} = 0.03$; $\mu_{x+t}^{02} = 0.02$; $\mu_{x+t}^{10} = 0.01$; $\mu_{x+t}^{12} = 0.05$, for $t > 0$

(ix) $\delta = 0.07$.

(x) $\bar{a}_{x:\overline{10}|}^{00} = 5.844$; $\bar{a}_{x:\overline{10}|}^{01} = 0.684$; $\bar{A}_{x:\overline{10}|}^{01} = 0.175$; $\bar{A}_{x:\overline{10}|}^{02} = 0.151$.

## Part a (2 points)

Show that the gross premium rate, calculated using the equivalence principle, is 738 to the nearest 1. You should calculate the value to the nearest 0.1.

### Explanation
EPV(Death Benefit): $20{,}000\,\bar{A}_{x:\overline{10}|}^{02} = 3020$

EPV(Sickness Benefit): $1000\,\bar{a}_{x:\overline{10}|}^{01} = 684$

EPV(expenses): $60\left(\bar{a}_{x:\overline{10}|}^{00} + \bar{a}_{x:\overline{10}|}^{01}\right) = 391.68$

EPV(Premiums – Commission): $0.95P\,\bar{a}_{x:\overline{10}|}^{00} = 5.5518P$

So
$$P = \frac{4095.68}{5.5518} = 737.72$$

## Part b (2 points)

Calculate the probability that the life dies without becoming sick, within the 10-year term.

### Explanation
Pr(death within 10 years without becoming sick) is

$$\int_0^{10} {}_tp_x^{\overline{00}}\,\mu_{x+t}^{02}\,dt = \int_0^{10} 0.02\,e^{-(0.03+0.02)t}\,dt = 0.02\,\frac{1-e^{-0.5}}{0.05} = 0.15739$$

## Part c (1 point)

The insurer offers a new product with the following features:

- For any period of sickness that starts within the 10-year term, the benefit of 1000 per year is paid until death or recovery, even if that occurs after the 10-year term.
- There is an elimination period of 1 year.
- All other policy features and assumptions are the same as given above.

Define the term **elimination period** in the context of a disability income insurance product.

### Explanation
The *elimination period* or *waiting period* is the time between the beginning of a period of disability/sickness and the start of the disability income payments.

## Part d (2 points)

Show that the expected present value of a 1-year continuous sojourn annuity in State 1 is $\bar{a}_{x:\overline{1}|}^{\overline{11}} = 0.94$ to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation
$$\begin{align*}
\bar{a}_{x:\overline{1}|}^{\overline{11}} &= \int_0^1 {}_tp_x^{\overline{11}}\,e^{-\delta t}\,dt \\
&= \int_0^1 e^{-(0.01+0.05)t}\,e^{-0.07t}\,dt \\
&= \int_0^1 e^{-0.13t}\,dt \\
&= \frac{1-e^{-0.13}}{0.13} \\
&= 0.93773
\end{align*}$$

## Part e (2 points)

Calculate the premium for this new policy, using the model and parameters given above.

(LTAM, Spring 2020, Question 4)

### Explanation
The only change is the duration of the sickness benefit.

$$\text{EPV(Sickness benefit)} = 1000\int_0^{10} {}_tp_x^{00}\,\mu_{x+t}^{01}\left(\bar{a}_{x+t}^{\overline{11}} - \bar{a}_{x+t:\overline{1}|}^{\overline{11}}\right)e^{-\delta t}\,dt$$

where
$$\bar{a}_{x+t}^{\overline{11}} = \int_0^{\infty} {}_sp_{x+t}^{\overline{11}}\,e^{-\delta s}\,ds = \int_0^{\infty} e^{-0.13s}\,ds = \frac{1}{0.13} = 7.6923$$

$\Rightarrow$ EPV(Sickness benefit)

$$\begin{align*}
&= 1000(7.6923-0.93773)1000\int_0^{10} {}_tp_x^{00}\,\mu_{x+t}^{01}\left(\bar{a}_{x+t}^{\overline{11}} - \bar{a}_{x+t:\overline{1}|}^{\overline{11}}\right)e^{-\delta t}\,dt \\
&= 6754.58\int_0^{10} {}_tp_x^{00}\,\mu_{x+t}^{01}\,e^{-\delta t}\,dt \\
&= 6754.58\,\bar{A}_{x:\overline{10}|}^{01} \\
&= 1182.05
\end{align*}$$

$$\Rightarrow P = \frac{3020 + 1182.05 + 391.68}{5.5518} = 827.43$$

### Examiner Report
Graders' Comments: This part was challenging, and few candidates achieved full marks, but many candidates achieved partial credit for answers that indicated some understanding.
