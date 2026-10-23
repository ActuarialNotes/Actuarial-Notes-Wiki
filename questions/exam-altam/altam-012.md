---
id: "altam-012"
exam: "Exam ALTAM"
topic: "Multiple State Model"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Multiple+State+Model
  - Concepts/Policy+Value
  - Concepts/Annuities
  - Concepts/State-Dependent+Insurance
  - Concepts/Transition+Intensity
points: 10
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:bf9caeb723e97af2f2ffd451a9bd37db75af63aae67effd68cfacbed60f57353
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q12, pp.23-24, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q12, pp.22-23, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-012.md
---

Person G, who is age 45, has recently suffered a disabling injury on the job. G's prognosis is uncertain. His annual salary before the accident was 100,000

Person G receives a structured settlement from MRH Insurance. The settlement is a life annuity, starting immediately, and payable continuously at a rate of 90,000 per year while G is disabled. An additional annuity of 20,000 per year is payable continuously while G's prognosis is uncertain for up to two years, to offset medical expenses.

## Part a (1 point)

State two reasons why structured settlements often use an annuity format rather than a lump sum.

### Explanation
1) To better replicate the loss to the injured party ($IP$):

- lost wages, medical and other expenses due to injury, offset inflation (if increasing annuity).

2) To relieve the $IP$ from the investment/interest risk, or from the burden of managing funds.

3) To reduce the dissipation risk:

- risk of running out of funds from squandering/over spending.

## Part b (1 point)

State two possible reasons why the long term annuity would replace less than 100% of G's pre-injury earnings.

### Explanation
1) **Tax:** The structured settlement annuity might not be taxed, or taxed at a lower rate than salary. Less than 100% is needed to replace the net pre-injury earnings.

2) **Incentive to return to work:** The $IP$ may choose to return to work if that would increase his/her (net) income.

3) **$IP$ at fault:** The payments may be reduced if the $IP$ is (partially) at fault.

### Examiner Report
Graders' Comments: Performance on parts (a) and (b) was mixed. Some candidates did not answer those two parts, others provided only one relevant reason for each part and/or repeated the same reasons for both parts. A number of candidates discussed pricing or underwriting issues, in one or both parts, for which no credit was awarded.

## Part c (2 points)

MRH uses the following multiple state model:

![State diagram: Disabled; prognosis uncertain (State 0), Recovered (State 1), Permanently disabled (State 2) and Dead (State 3); arrows run 0 to 1, 0 to 2, 0 to 3, 1 to 3 and 2 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-012-state-diagram.png)

You are given:

(i) MRH calculates policy values equal to the expected present value of future benefits.

(ii) $i = 0.04$

You have calculated the following table of annuity values and transition probabilities:

| $x$ | $\bar{a}_x^{00}$ | $\bar{a}_x^{01}$ | $\bar{a}_x^{02}$ | $\bar{a}_x^{11}$ | $\bar{a}_x^{22}$ | ${}_2p_x^{00}$ | ${}_2p_x^{01}$ | ${}_2p_x^{02}$ |
|---|---|---|---|---|---|---|---|---|
| 45 | 0.559 | 5.540 | 7.161 | 19.948 | 10.703 | 0.0301 | 0.2766 | 0.6164 |
| 47 | 0.559 | 5.420 | 7.104 | 19.528 | 10.623 | 0.0301 | 0.2766 | 0.6162 |

Show that the expected present value of future benefits at $t = 0$, the start date for the annuity payments, is 705,700 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
The benefits are 90,000 when in States 0 or 2 plus 20,000 when in State 0 for up to 2 years. So,

$$EPV = 90{,}000\left(\bar{a}_x^{00} + \bar{a}_x^{02}\right) + 20{,}000\,\bar{a}_{x:\overline{2}|} \text{ (as printed)}.$$

Since returning to State 0 after leaving it is impossible, we have

$$\bar{a}_{x:\overline{2}|}^{00} = \bar{a}_x^{00} - v^2\,{}_2p_x^{00}\,\bar{a}_{x+2}^{00} = 0.543444$$

$$\Rightarrow EPV = 90{,}000\left(0.559 + 7.161\right) + 20{,}000(0.543444) = 705{,}669$$

## Part d (4 points)

(i) Show that ${}_2V^{(0)}$, the policy value at $t = 2$ if G is in State 0 at that time, is 689,700 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate ${}_2V^{(2)}$, the policy value at $t = 2$ if G is in State 2 at that time.

(iii) Show that the expected present value at $t = 0$ of the policy value at $t = 2$ is 564,000 to the nearest 1,000. You should calculate the value to the nearest 10.

(iv) Calculate the expected present value at $t = 0$ of the payments during the first two years.

### Explanation
(i)

$${}_2V^{(0)} = 90{,}000\left(\bar{a}_{x+2}^{00} + \bar{a}_{x+2}^{02}\right) = 698{,}670 \text{ (as printed)}$$

(ii)

$${}_2V^{(2)} = 90{,}000\,\bar{a}_{x+2}^{22} = 956{,}070$$

(iii) Let $\mathrm{E}_0\left[{}_2V\right]$ denote the EPV at $t = 0$ of the policy value at $t = 2$. Note that there is no policy value in State 1 or State 3. Then

$$\mathrm{E}_0\left[{}_2V\right] = v^2\,{}_2p_x^{00}\,{}_2V^{(0)} + v^2\,{}_2p_x^{02}\,{}_2V^{(2)} = 564{,}054$$

(iv) The EPV at $t = 0$ of payments in the first two years plus the EPV at $t = 0$ of the policy value at $t = 2$ is equal to the EPV at $t = 0$ of all future payments. That is

$$\text{EPV(First two years payments)} = EPV - E_0\left[{}_2V\right] = 141{,}615$$

### Examiner Report
Graders' Comments: Most candidates did well on this part. Some candidates calculated the EPV in (iv) directly, which was an acceptable alternative solution.

## Part e (2 points)

The chief actuary of MRH reviews your assumptions. The chief actuary asks you to redo your calculations, increasing $\mu_{45+t}^{01}$ by 0.01 for all $t$, with no other changes.

(i) State with reasons whether the value of ${}_2V^{(2)}$ will increase, decrease, or stay the same as a result of this change.

(ii) State with reasons whether the expected present value, at age 45, of the policy value at the end of two years will increase, decrease or stay the same as a result of this change.

(LTAM, Spring 2019, Question 2)

### Explanation
(i) The reserve at time 2 given State 2, ${}_2V^{(2)}$ will stay the same.

This reserve is conditional on $IP$ being in State 2 and transitions out of State 2 are not affected.

(ii) Increasing $\mu_{x+t}^{01}$ will lead to a decrease in ${}_tp_x^{00}$ as lives are more likely to move from State 0 to State 1 in the interval from time 0 to time $t$. It will also lead to a decrease in ${}_tp_x^{02}$, as it means that lives are more likely to recover, and so less likely to become permanently disabled. That means that ${}_2V^{(0)}$ will be smaller, and hence $\mathrm{E}_0\left[{}_2V\right] = v^2\,{}_2p_x^{00}\,{}_2V^{(0)} + v^2\,{}_2p_x^{02}\,{}_2V^{(2)}$ will also be smaller.

### Examiner Report
Graders' Comments: Most candidates determined that the reserve would stay the same in part (i). Part (ii) proved to be more challenging. Candidates were expected to address each of the terms in $\mathrm{E}_0\left[{}_2V\right]$.
