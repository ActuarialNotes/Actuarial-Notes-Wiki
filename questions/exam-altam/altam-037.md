---
id: "altam-037"
exam: "Exam ALTAM"
topic: "Defined Benefit Plan"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Defined+Benefit+Plan
  - Concepts/Pension+Plan
  - Concepts/Salary+Scale
  - Concepts/Present+Value
  - Concepts/Annuities
points: 7
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:dfcb79270fdeaabeddbe1783842062e376c4091ae3c4a99b035cacf468d1c092
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q37, pp.70 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q37, pp.76 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-037.md
---

(This is a modified version of Question 7 from the Spring 2014 Written Answer exam.)

## Part a (1 point)

List three reasons why employers sponsor pensions for their employees.

### Explanation
Reasons include:

- To compete for new employees
- To retain employees in productive years
- To facilitate turnover of employees at older ages
- To offer tax efficient remuneration
- As a tool in negotiations with unions (or other employee collective bargaining units)
- To fulfill responsibility to provide for long-serving employees.
- To improve morale of employees

## Part b (3 points)

A benefit plan provides a retirement benefit if the employee lives to age 65, and a death benefit if the employee dies prior to age 65.

- The retirement benefit is an annual whole life annuity-due of 3% of the final 3-year average salary for each year of service.
- The death benefit is a lump sum payable at the end of the year of death equal to two times the employee's annual salary in the year of death.

You are given:

- A person started the employment on January1 (as printed), 1990 at exact age 38 with a starting salary of 50,000.
- The company gives salary increases of 3% on January 1 each year.
- Employees can terminate employment only by retirement at 65 or death.

You are given the following:

- $q_{62+k} = 0.08 + 0.01k$ for $k = 0, 1, 2, 3$
- The expected present value on January 1, 2017 of an annuity-due of 1 per year payable annually to the person, if they survive, will be 4.7491.
- $i = 0.04$

Calculate the actuarial present value on January 1, 2014 of the person's death benefit.

### Explanation
Let $S_x$ denote the salary earned in year of age $x$ to $x+1$. We have

$$S_x = (50{,}000)(1.03)^{x-38}.$$

The EPV of the death benefit is:

$$(2S_{62})\,q_{62}(1.04)^{-1} + (2S_{63})\,{}_{1|}q_{62}(1.04)^{-2} + (2S_{64})\,{}_{2|}q_{62}(1.04)^{-3}$$

Where $q_{62} = 0.08$; ${}_{1|}q_{62} = (0.92)(0.09) = 0.0828$; ${}_{2|}q_{62} = (0.92)(0.91)(0.10) = 0.08372$

So the EPV of the death benefit is

$$
\begin{align*}
&(2)(50{,}000)(1.03)^{24}\left[0.08(1.04)^{-1} + (1.03)(0.0828)(1.04)^{-2} + (1.03)^2(0.08372)(1.04)^{-3}\right] \\
&= 47{,}716
\end{align*}
$$

### Examiner Report
*Graders' Comments:* Parts (b) and (c) were answered well. The most common minor error was counting years of service incorrectly, which resulted in a small penalty for part (b), and none for (c) if the answer was consistent with (b).

## Part c (3 points)

Calculate the actuarial present value on January 1, 2014 of the person's retirement benefit.

### Explanation
The EPV of the retirement benefit is

$$(0.03)(27)(FAS)\left({}_3p_{62}\right)(1.04)^{-3}\,\ddot{a}_{65}$$

Where $FAS$ is the final average salary =

$$FAS = 50{,}000\left(\frac{(1.03)^{24} + (1.03)^{25} + (1.03)^{26}}{3}\right) = 104{,}719$$

So EPV is

$$(0.03)(27)(104{,}719)(0.75348)(0.88900)(4.7491) = 269{,}833$$
