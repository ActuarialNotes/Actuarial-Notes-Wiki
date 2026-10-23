---
id: "altam-043"
exam: "Exam ALTAM"
topic: "Projected Unit Credit Method"
learning_objective: "Pension Plans and Retirement Benefits"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Projected+Unit+Credit+Method
  - Concepts/Actuarial+Accrued+Liability
  - Concepts/Normal+Cost
  - Concepts/Salary+Scale
  - Concepts/Joint+Life
  - Concepts/Woolhouse's+Formula
points: 8
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b689940b1d54f311c0a09c6853d490b30986f2549b67086cf2a6c03e0915cef3
  sources:
    - "SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q43, pp.78-79 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q43, pp.87-88 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-043.md
---

Person X is a member of a defined benefit pension plan which offers an annual pension of 2% of the final one year's salary for each year of service. The benefit is a whole life annuity-due paid monthly. At the valuation date, 1/1/2020, X is 40 years old with 20 years' service. X's salary during the 12 months prior to the valuation was 110,000.

You are given:

- (i) All members in service at age 65 retire immediately.
- (ii) There are no other retirements or withdrawals (other than death).
- (iii) Mortality follows the Standard Ultimate Life Table.
- (iv) $i = 0.05$
- (v) Salary increases occur annually on 1 January each year.
- (vi) Salaries are assumed to increase by 3% each year up to and including age 54, and by 2.5% each year from age 55.
- (vii) Woolhouse's 2-term formula is used for monthly annuity functions.
- (viii) The benefits are funded using the Projected Unit Credit method.

## Part a (3 points)

- (i) Show that the Actuarial Liability for X's retirement benefits is 323,000 to the nearest 1,000. You should calculate the value to the nearest 1.
- (ii) Calculate the Normal Contribution rate for X's retirement benefits.

### Explanation

**(i)** Final Average Salary (FAS) between ages 64 and 65 is projected to be

$$S_{39}(1.03)^{54-39}(1.025)^{64-54} = 110{,}000(1.557967)(1.2800845) = 219{,}376.23$$

$$AL = 219{,}376.23(0.02)(20)\,{}_{25}E_{40}\,\ddot{a}_{65}^{(12)} = (87{,}750.49)\,{}_{25}E_{40}\,\ddot{a}_{65}^{(12)}$$

where

$$\begin{align*}
{}_{25}E_{40} &= v^{25}\,{}_{25}p_{40} \\
              &= {}_{20}E_{40}\;{}_{5}E_{60} \\
              &= (0.36663)(0.76687) \\
              &= 0.281158 \\
\ddot{a}_{65}^{(12)} &= \ddot{a}_{65} - \frac{11}{24} \\
                     &= 13.5498 - \frac{11}{24} \\
                     &= 13.09147
\end{align*}$$

$$\Rightarrow AL = (87{,}750.49)(0.281158)(13.09147) = 322{,}989.50$$

**(ii)** $AL_0 = 322{,}989.50$ and $AL_1 = 219{,}376.23(0.02)(21)\,{}_{24}E_{41}\,\ddot{a}_{65}^{(12)}$

$$NC = v\,p_{40}\,AL_1 - AL_0 = \frac{AL_0}{20} = 16{,}149.48;$$

$$NC\ rate = \frac{NC}{S_{40}} = \frac{16{,}149.48}{110{,}000(1.03)} = 0.142537$$

### Examiner Report

*Graders' Comments:* Candidates did very well on both parts, up to the normal cost. Many candidates made errors concerning the normal cost to a normal cost rate.

## Part b (4 points)

The plan proposes the following enhancement:

- A reversionary annuity benefit to the member's partner at 50% of the member's pension benefit, or
- For members who do not have a partner at their retirement dates, the pension would be increased by 5%.

Assume:

- (i) 90% of members have partners at their retirement dates.
- (ii) Partners are the same age as the member, for members with partners.
- (iii) The mortality of members and their partners follows the Standard Ultimate Life Table.
- (iv) Members and their partners have independent future lifetimes.

- (i) Calculate the revised Actuarial Liability for X's enhanced retirement benefits (including the partner benefit).
- (ii) Calculate the revised Normal Contribution rate for X's enhanced retirement benefits.

### Explanation

**(i)** Per unit of FAS, the EPV of the retirement benefits are

- With partner at retirement, $EPV^p = \ddot{a}_{65}^{(12)} + 0.5\,\ddot{a}_{65|65}^{(12)} = 13.09147 + 0.93335 = 14.02482$

  where

$$\begin{align*}
\ddot{a}_{65|65}^{(12)} &= \ddot{a}_{65}^{(12)} - \ddot{a}_{65:65}^{(12)} \\
&= \left(\ddot{a}_{65} - \frac{11}{24}\right) - \left(\ddot{a}_{65:65} - \frac{11}{24}\right) \\
&= \left(13.5498 - \frac{11}{24}\right) - \left(11.6831 - \frac{11}{24}\right) \\
 &= 1.8667
\end{align*}$$

- Single, $EPV^s = 1.05\,\ddot{a}_{65}^{(12)} = 13.74604$

$$\begin{align*}
AL &= 219{,}376.23(0.02)(20)\,{}_{25}E_{40}\left((0.9)EPV^p + (0.1)EPV^s\right) \\
&= 219{,}376.23(0.02)(20)(0.281158)\left((0.9)(14.02482) + (0.1)(13.74604)\right) \\
&= 219{,}376.23(0.02)(20)(0.281158)(13.99694) \\
&= 345{,}329.04
\end{align*}$$

**(ii)** The revised NC rate is

$$NC = AL/20 = 345{,}329.04/20 = 17{,}266.45$$

$$NC\ rate = \frac{NC}{S_{40}} = \frac{17{,}266.45}{110{,}000(1.03)} = 0.1524$$

### Examiner Report

*Graders' Comments:* This part was challenging. It required candidates to use the information in a new context. Many candidates did not use the 90% married at retirement information. A number discounted the benefit using ${}_{25}E_{40:40}$ instead of ${}_{25}E_{40}$, as if the member and partner had to survive to age 65 to receive any retirement benefit.

## Part c (1 point)

The plan actuary is concerned that couples may have future lifetimes which are positively correlated. State with reasons whether the expected present value of the reversionary partner benefits would increase, decrease, or stay the same, in this case.

(This is Question 6 from the Spring 2020 Written Answer exam.)

### Explanation

The EPV of the reversionary partner benefits would decrease.

*Sample explanation:*

Since $\ddot{a}_{x|y} = \ddot{a}_y - \ddot{a}_{x:y}$ where $\ddot{a}_y$ does not change, the change in $\ddot{a}_{x|y}$ would be the opposite of the change in $\ddot{a}_{x:y}$.

Fixing the time of death of (x) and considering the two cases:

- (x) dies before (y): positive correlation means (y) will now tend to die younger than under the independence case but since payments stop at the death of (x) => no change
- (y) dies before (x): positive correlation means (y) will now tend to die older (closer to (x)). Here payments stop at the death of (y) => EPV increases on average.

Conclusion: $\ddot{a}_{x|y}$ decreases.

### Examiner Report

*Graders' Comments:* Many candidates used the broken heart syndrome as an example of positively correlated lifetimes and argued that the value of the reversionary annuity would decrease. This is answer (as printed) (if complete) was awarded full credit. A few presented a more general argument to justify the decrease in EPV when lifetimes are positively correlated.
