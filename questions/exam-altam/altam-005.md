---
id: "altam-005"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Health+Insurance
  - Concepts/Transition+Intensity
  - Concepts/Annuities
  - Concepts/Present+Value
points: 9
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:528ad088b6608a8a666791845446520e23ad33cbd1fbf258953ff597f968deb7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-005.md
---

You are analyzing costs associated with a medical condition. You model the progression of the condition after a new diagnosis using the following 4-state model.

![State diagram: Diagnosed (State 0), Severe symptoms (State 1), Remission (State 2) and Surgery (State 3); arrows run 0 to 1, 1 to 2, 2 to 1 and 1 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-005-state-diagram.png)

You are given the following information. Time $t$ is measured in years from the date of diagnosis.

(i) $\mu_t^{01} = a + be^{ct}$ where $a = 0.4$, $b = 2.0$, and $c = 0.7$;

(ii) $\mu_t^{12} = 0.2; \quad \mu_t^{21} = 0.4; \quad \mu_t^{13} = 0.1$

(iii) $\delta = 0.04$

(iv) $\bar{a}_0^{01} = 2.930; \quad \bar{A}_0^{01} = 1.5185$

## Part a (3 points)

(i) Show that, in this case, $\dfrac{\bar{A}_0^{03}}{\bar{a}_0^{01}} = \mu_0^{13}$.

(ii) Calculate the value of $\bar{a}_t^{\overline{11}}$.

(iii) State with reasons whether $\bar{a}_t^{\overline{11}}$ is bigger, smaller or the same as $\bar{a}_t^{11}$.

### Explanation
(i) Let $\mu^{13} = \mu_t^{13}$ represent the constant transition force from State 1 to State 3. Then we have

$$\bar{a}_x^{01} = \int_0^\infty {}_tp_0^{01}\,e^{-\delta t}\,dt$$

$$\bar{A}_0^{03} = \int_0^\infty {}_tp_0^{01}\,\mu_t^{13}\,e^{-\delta t}\,dt = \mu^{13}\int_0^\infty {}_tp_0^{01}\,e^{-\delta t}\,dt$$

$$\Rightarrow \frac{\bar{A}_0^{03}}{\bar{a}_x^{01}} = \mu^{13}$$

(ii)

$$\bar{a}_t^{\overline{11}} = \int_0^\infty {}_rp_t^{\overline{11}}\,e^{-\delta r}\,dr \quad\text{where}\quad {}_rp_t^{\overline{11}} = e^{\int_0^r \mu_{t+s}^{12} + \mu_{t+s}^{13}\,ds} = e^{-0.3r}$$

$$\Rightarrow \bar{a}_t^{\overline{11}} = \int_0^\infty e^{-0.34r}\,dr = \frac{1}{0.34} = 2.941$$

(iii) $\bar{a}_t^{\overline{11}} < \bar{a}_t^{11}$ since $\bar{a}_t^{11}$ also includes the (positive) EPV of payments made on returning to State 1 after visiting State 2.

### Examiner Report
Graders' Comments: Most candidates completed Part i correctly. For all parts, some candidates had minor expression errors where their variables and/or integral limits were not consistent.

Almost all candidates were able to correctly justify that annuity factor $\bar{a}_t^{\overline{11}}$ is smaller than $\bar{a}_t^{11}$.

## Part b (4 points)

The cost of nursing care in State 1 is 12,000 per year, incurred continuously. The cost of surgery is 22,000. There are no nursing care costs in State 0 or State 2.

(i) Calculate the expected present value of the cost of surgery for a newly diagnosed patient.

(ii) Calculate the expected present value of the nursing care costs for a newly diagnosed patient.

(iii) COVID-19 precautions result in additional costs at a rate of 8,000 per year for the first 4 months of each period in State 1.

Write down an integral expression for the additional expected present value, using continuous sojourn annuities.

### Explanation
(i)

$$\begin{align*}
22{,}000\,\bar{A}_0^{03} &= 22{,}000\,(0.1)\,\bar{a}_0^{01} \quad \text{from (a) (i)} \\
&= 22{,}000\,(0.1)\,(2.930) \\
&= 6446
\end{align*}$$

(ii)

$$12{,}000\,\bar{a}_0^{01} = 12{,}000\,(2.930) = 35{,}160$$

(iii) The EPV is the sum of EPV of additional costs during first sojourn in State 1 (from State 0) up to 4 months, plus the EPV of additional costs during returning sojourns in State 1 from State 2 up to 4 months. That is:

$$EPV = 8000\left(\int_0^\infty {}_tp_0^{00}\,\mu_t^{01}\,\bar{a}_{t:\overline{1/3}|}^{\overline{11}}\,e^{-\delta t}\,dt + \int_0^\infty {}_tp_0^{02}\,\mu_t^{21}\,\bar{a}_{t:\overline{1/3}|}^{\overline{11}}\,e^{-\delta t}\,dt\right)$$

$$\bar{a}_{t:\overline{1/3}|}^{\overline{11}} = \int_0^{1/3} {}_rp_t^{\overline{11}}\,e^{-\delta r}\,dr = \frac{1 - e^{-0.34/3}}{0.34} = 0.3151$$

## Part c (2 points)

As a result of reorganization, the value of $\mu_t^{13}$ is increased to 0.2. All other transition intensities stay the same.

(i) State with reasons whether the expected present value of the cost of nursing care will increase, decrease, or stay the same.

(ii) State with reasons whether the expected present value of the cost of surgery will increase, decrease, or stay the same.

(LTAM, Fall 2021 Form A, Question 3)

### Explanation
The expected time of the first transition to State 1 is unchanged.

i) **Decrease**

With a larger value of $\mu_t^{13}$, the **expected time spent in State 1 will decrease.** With less time spent in State 1, the EPV of the cost in nursing care in State 1 will **decrease**.

ii) **Increase**

With a larger value of $\mu_t^{13}$, the transition to State 3 **(surgery) will happen sooner, on average**. With surgery happening earlier, the EPV of the cost of surgery will **increase**.

### Examiner Report
Graders' Comments: For part (i), most candidates were able to answer and justify that higher $\mu_t^{13}$ will cause higher probability (and thus shorter time) from State 1 to State 3.

For part (ii), while most candidates were able to correctly answer that a higher $\mu_t^{13}$ will increase EPV of surgery, they were not able to clearly express that the increased cost was due to shorter travel time to State 3 (absorbing state) and thus the EPV with less discounting is higher.
