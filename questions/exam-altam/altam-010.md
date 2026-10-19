---
id: "altam-010"
exam: "Exam ALTAM"
topic: "Long-Term Insurance Coverage"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Long-Term+Insurance+Coverage
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Multiple+State+Model
  - Concepts/Transition+Intensity
  - Concepts/Annuities
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:53e0063bb06783f032dc9cd6b026850a78a02145f65d7dc72853fca5cb516e8d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-010.md
---

You are using the following multiple state Markov model to analyze a long term care product which provides coverage until the death of the insured. Assume all relevant transition intensities exist.

![State diagram: Active, at least 5 ADLs (State 0); Mildly impaired, 4 ADLs (State 1); Severely impaired, at most 3 ADLs (State 2); Cognitive Impairment (State 3); Dead (State 4). Arrows run 0 to 1, 1 to 2, from each of States 0, 1 and 2 to State 3 and to State 4, and 3 to 4.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-010-state-diagram.png)

You are given the following information:

(i) The insurance pays a benefit of 3000 per year, payable continuously, while the policyholder is in State 2.

(ii) Policyholders may opt to have benefits start immediately on transition into State 2 or, for a lower premium, may select a 6-month waiting period before benefits begin.

(iii) Benefits are valued at a force of interest of $\delta = 0.05$

(iv) Transition intensities for all ages $x \ge 90$ are

$$\mu_x^{12} = 0.10 \quad \mu_x^{13} = 0.04 \quad \mu_x^{14} = 0.10$$

$$\mu_x^{23} = 0.04 \quad \mu_x^{24} = 0.30 \quad \mu_x^{34} = 0.20$$

## Part a (2 points)

Derive the Kolmogorov forward differential equation for ${}_tp_x^{12}$.

### Explanation
$$\begin{align*}
{}_{t+h}p_x^{12} &= {}_tp_x^{11}\,{}_hp_{x+t}^{12} + {}_tp_x^{12}\,{}_hp_{x+t}^{22} \quad \text{(Markov property)} \\
&= {}_tp_x^{11}\,{}_hp_{x+t}^{12} + {}_tp_x^{12}\left(1 - {}_hp_{x+t}^{23} - {}_hp_{x+t}^{24}\right) \quad \text{(complete probability)} \\
&= {}_tp_x^{12} + {}_tp_x^{11}\,{}_hp_{x+t}^{12} - {}_tp_x^{12}\,{}_hp_{x+t}^{23} - {}_tp_x^{12}\,{}_hp_{x+t}^{24}
\end{align*}$$

$$\Rightarrow \frac{{}_{t+h}p_x^{12} - {}_tp_x^{12}}{h} = {}_tp_x^{11}\left(\frac{{}_hp_{x+t}^{12}}{h}\right) - {}_tp_x^{12}\left(\frac{{}_hp_{x+t}^{23}}{h}\right) - {}_tp_x^{12}\left(\frac{{}_hp_{x+t}^{24}}{h}\right)$$

and, where the transition intensity exists, $\mu_{x+t}^{ij} = \lim_{h\to 0}\dfrac{{}_hp_{x+t}^{ij}}{h}$, and taking limits gives

$$\frac{d}{dt}\,{}_tp_x^{12} = {}_tp_x^{11}\,\mu_{x+t}^{12} - {}_tp_x^{12}\,\mu_{x+t}^{23} - {}_tp_x^{12}\,\mu_{x+t}^{24}$$

## Part b (1 point)

Show that ${}_tp_{90}^{12} = e^{-0.24t} - e^{-0.34t}$

### Explanation
$$\begin{align*}
{}_tp_x^{12} &= \int_0^t {}_rp_x^{11}\,\mu_{x+r}^{12}\,{}_{t-r}p_{x+r}^{22}\,dr \\
&= \int_0^t e^{-0.24r}\times 0.10\times e^{-0.34(t-r)}\,dr \\
&= 0.10\left(e^{-0.34t}\right)\int_0^t e^{0.1r}\,dr \\
&= 0.10\left(e^{-0.34t}\right)\frac{e^{0.1t} - 1}{0.1} \\
&= e^{-0.24t} - e^{-0.34t}
\end{align*}$$

## Part c (2 points)

Calculate the expected present value of the LTC benefit in State 2 for a life currently age 90 and in State 1, assuming benefits begin immediately on transition.

### Explanation
The EPV is $3000\bar{a}_{90}^{12}$ where

$$\begin{align*}
\bar{a}_{90}^{12} &= \int_0^\infty {}_tp_{90}^{12}\,e^{-\delta t}\,dt \\
&= \int_0^\infty \left(e^{-0.24t} - e^{-0.34t}\right)e^{-0.05t}\,dt \\
&= \int_0^\infty \left(e^{-0.29t} - e^{-0.39t}\right)dt \\
&= \frac{1}{0.29} - \frac{1}{0.39} \\
&= 0.88417
\end{align*}$$

So the EPV is $3000(0.88417) = 2652.5$.

## Part d (1 point)

$\bar{a}_{90:\overline{0.5}|}^{\overline{22}} = 0.45$ to the nearest 0.01. Calculate $\bar{a}_{90:\overline{0.5}|}^{\overline{22}}$ to the nearest 0.001.

### Explanation
$$\bar{a}_{90:\overline{0.5}|}^{\overline{22}} = \int_0^{0.5} {}_tp_{90}^{\overline{22}}\,e^{-\delta t}\,dt = \int_0^{0.5} e^{-0.34t}\,e^{-0.05t}\,dt = \frac{1 - e^{-0.5\times 0.39}}{0.39} = 0.4543$$

## Part e (2 points)

Calculate the expected present value of the LTC benefit in State 2 for a life currently age 90 and in State 1, assuming a waiting period of 6 months between transition to State 2 and the start of the benefit payments.

### Explanation
The EPV of a benefit of 1 per year payable continuously after the waiting period is

$$\int_0^\infty {}_rp_{90}^{11}\,\mu_{90+r}^{12}\left(\bar{a}_{90+r}^{\overline{22}} - \bar{a}_{90+r:\overline{0.5}|}^{\overline{22}}\right)e^{-\delta r}\,dr \quad\text{where}\quad \bar{a}_{90+r}^{\overline{22}} = \frac{1}{0.39} = 2.5641$$

So the EPV is

$$\begin{align*}
\int_0^\infty e^{-0.24r}\times 0.10\times\left(2.5641 - 0.4542\right)e^{-0.05r}\,dr &= 0.21099\int_0^\infty e^{-0.29r}\,dr \\
&= \frac{0.21099}{0.29} \\
&= 0.7276
\end{align*}$$

So for a benefit of 3000 per year the EPV is $3000\times 0.7276 = 2182.7$.

## Part f (2 points)

Suggest two reasons why an insurer uses waiting periods in long term health products.

### Explanation
Reason 1: Short term payments involve relatively high expenses. Once the illness has extended beyond the waiting period, it is likely to be more significant and less costly relative to the benefits

Reason 2: In some cases the policyholders will have other sources of income for short term sickness, eg sick pay from employment.

Reason 3: Offer policyholders a choice, for the same premium they will receive higher benefits for long term sickness in return for giving up benefit for shorter bouts.
