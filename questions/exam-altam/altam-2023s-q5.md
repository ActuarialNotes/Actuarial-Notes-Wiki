---
id: "altam-2023s-q5"
exam: "Exam ALTAM"
topic: "Defined Contribution Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
year: 2023
session: Spring
wiki_link:
  - Concepts/Defined+Contribution+Plan
  - Concepts/Replacement+Ratio
  - Concepts/Pension+Plan
  - Concepts/Annuities
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:526c3f1a3b4809050bec987caa63e3ea1fa6ecc374d4b4a6a4468454885386d2
  sources:
    - "SOA Exam ALTAM Spring 2023 — exam (question paper), Q5, pp.10-11, sha256:22d9ab9530cb311d979dada69c2af9c6f87cba7fd854e2da29793aa3d2715095 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/exams/spring-2023-exam-altam.pdf"
    - "SOA Exam ALTAM Spring 2023 — model solutions and examiners' comments, Q5, pp.11-12, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-2023s-q5.md
---

A company has a defined contribution (DC) pension plan with the following features:

(i) The company matches the employee's contributions to their DC fund, up to 4% of the employee's salary. The employee may contribute more than this, but these additional contributions are not matched.

(ii) The employee's salary is paid at the end of each month; employee and employer contributions to the fund are made at this time.

(iii) The investment returns on the fund are $i^{(12)} = 0.06$.

You are given the following information regarding an employee.

(i) The employee entered the plan at age 25.

(ii) Their starting salary was 60,000 per year.

(iii) The employee is currently age 45.

(iv) The employee has received annual pay increases of 3% at the start of each subsequent year of employment.

(v) The employee has contributed 7% of their salary to their DC fund since entering the plan.

## Part a (3 points)

Show that the accumulated amount in the DC fund (including the employee and employer contributions which have just been paid) is 322,000, to the nearest 1000. You should calculate the value to the nearest 50.

### Explanation
The accumulated amount is as follows, where $i = (1 + 0.06/12)^{12} - 1 = 6.1678\%$

$$
\begin{align*}
V = 60{,}000(0.11)\frac{1}{12}\Big\{&\left((1+i)^{11/12} + (1+i)^{10/12} + \dots + 1\right)(1+i)^{19} \\
&+ (1.03)\left((1+i)^{11/12} + (1+i)^{10/12} + \dots + 1\right)(1+i)^{18} \\
&+ (1.03)^2\left((1+i)^{11/12} + (1+i)^{10/12} + \dots + 1\right)(1+i)^{17} \\
&+ \cdots + (1.03)^{19}\left((1+i)^{11/12} + (1+i)^{10/12} + \dots + 1\right)\Big\}
\end{align*}
$$

$$
= 6{,}600\,s_{\overline{1}|}^{(12)}\left\{(1+i)^{19} + (1.03)(1+i)^{18} + \cdots + (1.03)^{19}\right\}
$$

$$
V = 6{,}600\,s_{\overline{1}|}^{(12)}(1+i)^{19}\left(\frac{1 - (1.03v)^{20}}{1 - (1.03v)}\right) = 322{,}128 \text{ (as printed)}
$$

where $s_{\overline{1}|}^{(12)} = \dfrac{i}{i^{(12)}} = 1.02796$

### Examiner Report
This question required candidates to recall the material from earlier exams on annuities-certain, or to work the problem out in Excel from first principles. It proved very challenging to many candidates.

Candidates who used Excel and recorded the correct answer, earned full credit (they were expected to note that they had used Excel in their answer sheets). If the value transcribed from Excel was incorrect, partial credit was only awarded if the candidate wrote down a correct formula on their answer sheet. Note that the graders do not have access to the candidate's excel workbook.

The most common error (other than Excel calculations) was to ignore the fact that payments are monthly and/or that increases are annual.

## Part b (2 points)

The employee is reviewing their retirement preparation, based on the following assumptions.

(i) They will continue to receive annual salary increases of 3%.

(ii) They will retire at age 65.

(iii) They will receive a benefit of 18,000 at the start of each year from their government's retirement program, starting at age 65.

(iv) At age 65 they will use the accumulated amount in their DC fund to purchase a whole life annuity due, payable annually.

(v) The individual is targeting a replacement ratio of 65%, including both the government and annuity benefits.

Show that the yearly annuity payment required to meet the target replacement ratio is 105,500 to the nearest 100. You should calculate the value to the nearest 1.

### Explanation
The projected final year salary is $S_{64} = 60{,}000(1.03)^{39} = 190{,}022$

The target income is therefore $0.65 \times 190{,}022 = 123{,}514$

The net annuity after government benefits is $123{,}514 - 18{,}000 = 105{,}514$

### Examiner Report
This part was well done with most candidates earning full credit.

## Part c (3 points)

You are given that future investment returns will be $i^{(12)} = 0.06$, and that $\ddot{a}_{65} = 13.600$.

Calculate the level contribution rate needed by the employee over the next 20 years to accumulate sufficient funds to purchase this annuity,

### Explanation
The funds needed at retirement are $105{,}514 \times 13.60 = 1{,}434{,}990$.

The salary at age 45 is $S_{45} = 60{,}000(1.03)^{20} = 108{,}367$

Let $C$ denote the total (employer and employee) contribution rate. Then the equation of value is

$$
\begin{align*}
1{,}434{,}990 &= 322{,}128(1+i)^{20} + S_{45}\,C\,s_{\overline{1}|}^{(12)}(1+i)^{19}\left(\frac{1 - (1.03v)^{20}}{1 - (1.03v)}\right) \\
&= 1{,}066{,}341 \text{ (as printed)} + 108{,}367(1.02796)(3.11790)(15.2285)C \\
&= 1{,}066{,}341 + 5{,}289{,}237C
\end{align*}
$$

$$
\Rightarrow C = \frac{1{,}434{,}990 - 1{,}066{,}341}{5{,}289{,}237} = 0.069698
$$

As this is less than 8%, the contribution is split evenly between the employee and employer, each paying 3.485%.

### Examiner Report
This part was not well done, with many candidates skipping it, or offering only a minimal attempt. Candidates were expected to recognize that they should use the calculation (or given value) from (a), but only a minority did so.

## Part d (1 point)

Suppose that the employee wishes to use the fund to purchase a life-and-10-year-guaranteed annuity due instead of a whole life annuity due. State with reasons whether their replacement ratio will increase, decrease, or stay the same.

### Explanation
The 10-year guarantee increases the cost of the annuity, which will decrease the amount of the annuity for a fixed purchase price. Thus, the replacement ratio will decrease.

### Examiner Report
This part was generally well done.
