---
id: "altam-039"
exam: "Exam ALTAM"
topic: "Replacement Ratio"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Replacement+Ratio
  - Concepts/Defined+Benefit+Plan
  - Concepts/Accrued+Benefit
  - Concepts/Deferred+Annuity
  - Concepts/Salary+Scale
points: 6
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:13a916dec7757fc3455df078ecbfc87cf7975aecfdb4e0b8817fbacbba00e3e5
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q39, pp.72 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q39, pp.79 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-039.md
---

A person begins work at age 40 at ABC Life on January 1, 2014, with a starting salary of 30,000. The person will switch jobs to XYZ Re at some time before age 55 at the then-current salary and will remain at XYZ Re until retirement.

- Both companies offer 2% annual salary raises on January 1 of each year.
- The annual retirement benefit at ABC Life is 900 per year of service.
- The annual retirement benefit at XYZ Re is 3% of the final 3-year average salary for each year of service.

The person will retire on the 65th birthday, and will receive retirement benefits from both companies.

(This is a modified version of Question 7 from the Spring 2015 Written Answer exam.)

## Part a (2 points)

Assume the person stays at ABC Life for 9.5 years and then switches to XYZ Re. Show that the replacement ratio would be 63% to the nearest 1%. You should calculate the replacement ratio to the nearest 0.1%.

### Explanation
$RR$ denotes the replacement ratio, $FAS$ denotes the final average salary, $S_x$ denotes salary in the year of age $x$ to $x+1$. Then

$$RR = \frac{(9.5)(900) + (15.5)(FAS)(0.03)}{S_{64}}$$

$$S_{64} = (30{,}000)(1.02)^{24} = 48{,}253$$

$$FAS = (30{,}000)\left(\frac{1.02^{22} + 1.02^{23} + 1.02^{24}}{3}\right) = 47{,}313$$

$$\Rightarrow RR = \frac{30{,}551}{48{,}253} = 63.3\%$$

## Part b (1 point)

Calculate the maximum length of time that the person can remain at ABC Life and still attain a replacement ratio of at least 65%.

### Explanation
$$RR = \frac{900n + (25 - n)(47{,}313)(0.03)}{48{,}253} \ge 0.65$$

$$\Rightarrow \frac{35{,}485 - 519.4n}{48{,}253} \ge 0.65 \Rightarrow n \le 7.9 \text{ years}$$

## Part c (3 points)

The person switches to XYZ Re after seven years on January 1, 2021 (and gets the annual raise). Later, on January 1, 2029, XYZ Re decides to stop all benefit accruals. No further benefits accrue after this date. On retirement, the benefit in respect of service before 2029 will be based on the final average salary as at January 1 2029.

On January 1, 2029, the person purchases a 10-year deferred whole life annuity due, with premiums payable annually during the deferred period. The annuity payments, combined with the accrued retirement benefits, will give the person a replacement ratio of 65%.

You are given:

- The person's mortality follows the Standard Ultimate Life Table
- $i = 5\%$

Calculate the annual net premium for the annuity.

### Explanation
The total accrued benefit based on the first 15 years of employment is

$$(7)(900) + (8)(0.03)\left(\frac{S_{52} + S_{53} + S_{54}}{3}\right) = 15{,}615$$

The required benefit is $(0.65)(S_{64}) = 31{,}364$

So the annuity payments are 15,749 per year, requiring premium of $P$ where

$$P\ddot{a}_{55:\overline{10}|} = \left({}_{10}E_{55}\right)(15{,}749)\left(\ddot{a}_{65}\right)$$

$$\Rightarrow P(8.0192) = (0.59342)(15{,}749)(13.5498)$$

$$\Rightarrow P = 15{,}791$$
