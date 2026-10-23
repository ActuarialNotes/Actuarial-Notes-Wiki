---
id: "altam-022"
exam: "Exam ALTAM"
topic: "Joint Life"
learning_objective: "Joint Life Insurance and Annuities"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Joint+Life
  - Concepts/Woolhouse's+Formula
  - Concepts/Equivalence+Principle
  - Concepts/Policy+Value
  - Concepts/Fractional+Age+Assumption
points: 10
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:b207cca8ebe74a45772ec5bcf3c640c1a4fe0b6031fa3802b6dc09a2da36a582
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q22, p.42, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q22, pp.41-43, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-022.md
---

D and M are each aged 50, and have independent future lifetimes. They purchase a fully discrete last survivor whole life insurance of 100,000. You are given:

(i) Mortality for each life follows the Standard Ultimate Life Table (SULT).

(ii) $i = 0.05$

(iii) Premiums of $G$ per year are payable until the second death.

(iv) Premiums are payable semi-annually for the first 20 years, then annually thereafter.

(v) $G$ is calculated using the equivalence principle.

(vi) Commissions are 10% of each premium.

(vii) Other acquisition expenses, payable at issue, are 70% of $G$.

(viii) The two-term Woolhouse formula is used to value single and joint life annuities.

## Part a (1 point)

Show that the probability that exactly one of D and M survives 20 years, is 0.14 to the nearest 0.01. You should calculate the probability to the nearest 0.0001.

### Explanation
The probability is:

$$\Pr\left[\text{1 alive}\right] = 2 \times {}_{20}p_{50}\left(1 - {}_{20}p_{50}\right)$$

$${}_{20}p_{50} = \frac{l_{70}}{l_{50}} = \frac{91{,}082.4}{98{,}576.4} = 0.92398$$

$$\Rightarrow (2)(0.92398)(1 - 0.92398) = 0.1405$$

## Part b (2 points)

Show that $\ddot{a}_{\overline{50:50}:\overline{20}|}^{(2)}$ is 12.92 to the nearest 0.01. You should calculate the value to the nearest 0.0001.

### Explanation
$$\ddot{a}_{\overline{50:50}:\overline{20}|}^{(2)} = 2\ddot{a}_{50:\overline{20}|}^{(2)} - \ddot{a}_{50:50:\overline{20}|}^{(2)}$$

$$\ddot{a}_{50:\overline{20}|}^{(2)} = \ddot{a}_{50:\overline{20}|} - \frac{1}{4}\left(1 - {}_{20}E_{50}\right) = 12.8428 - 0.25(1 - 0.34824) = 12.6799$$

$$\begin{align*}
\ddot{a}_{50:50:\overline{20}|}^{(2)} &= \ddot{a}_{50:50}^{(2)} - {}_{20}E_{50} \text{ (as printed)} \times \ddot{a}_{70:70}^{(2)} \\
&= \left(\ddot{a}_{50:50} - \frac{1}{4}\right) - \left({}_{20}p_{50}\right)^2(1.05)^{-20}\left(\ddot{a}_{70:70} - \frac{1}{4}\right) \\
&= (15.8195 - 0.25) - (0.92398)^2(1.05)^{-20}(9.9774 - 0.25) \\
&= 12.4396
\end{align*}$$

$$\Rightarrow \ddot{a}_{\overline{50:50}:\overline{20}|}^{(2)} = (2)(12.6799) - 12.4396 = 12.9202$$

### Examiner Report
**Graders' Comments:** *Many students attempted this part, and most of them received partial credit for correct intermediate steps. The most common errors were (i) incorrect application of Woolhouse's formula; (ii) using a joint endowment instead of a last survivor when calculating the adjusted last survivor term annuity; (iii) Incorrect Woolhouse coefficients (11/24 or $\frac{1}{2}$ instead of 1/4)*

## Part c (2 points)

Show that $G$ is 850 to the nearest 10. You should calculate the value to the nearest 0.1.

### Explanation
EPV Benefits:

$$100{,}000\,A_{\overline{50:50}} = 100{,}000\left(2A_{50} - A_{50:50}\right) = 100{,}000(2 \times 0.18931 - 0.24669) = 13{,}193$$

EPV Prems - Exp:

$$G\left\{\left(\ddot{a}_{\overline{50:50}:\overline{20}|}^{(2)} + 0.1405\,v^{20}\,\ddot{a}_{70} + {}_{20}p_{50:50}\,v^{20}\,\ddot{a}_{\overline{70:70}}\right) \times 0.9 - 0.7\right\}$$

$$\ddot{a}_{\overline{70:70}} = 2 \times \ddot{a}_{70} - \ddot{a}_{70:70} = (2)(12.0083) - 9.9774 = 14.0392$$

$$\begin{align*}
\Rightarrow \text{EPV Prems} - \text{Exp} &= G\left\{\left(12.9202 + 0.1405 \times v^{20} \times 12.0083 + (0.92398)^2(v^{20})(14.0392)\right)0.9 - 0.7\right\} \\
&= G\left\{0.9 \times 18.0734 - 0.7\right\} \\
&= 15.5661G
\end{align*}$$

$$\Rightarrow G = \frac{13{,}193}{15.5661} = 847.55$$

### Examiner Report
**Graders' Comments:** *Not many candidates received full credit, but most of those that attempted this part received the majority of points for correctly setting up the EPV formulas. Common mistakes included : (as printed)*

- *Incorrect expense payment (60% vs. 70%)*
- *Missing the annuity portion due when exactly 1 person is alive*
- *Multiplying the first annuity term by 2 (incorrect treatment of semi-annual premium payment)*

## Part d (2 points)

(i) Show that the policy value at time 20, if both lives are alive, is 22,400 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate the policy value at time 20 if only one of the lives is alive at that time.

### Explanation
(i) Let ${}_{20}V^{(2)}$ denote the reserve conditional on both surviving:

$${}_{20}V^{(2)} = 100000\,A_{\overline{70:70}} - (0.9)(847.55)\,\ddot{a}_{\overline{70:70}}$$

$$A_{\overline{70:70}} = 1 - d\,\ddot{a}_{\overline{70:70}} = 1 - \left(\frac{0.05}{1.05}\right)(14.0392) = 0.33147$$

or $(2)A_{70} - A_{70:70} = (2)(0.42818) - 0.52488 = 0.33148$

$$\Rightarrow {}_{20}V^{(2)} = 22{,}437.6$$

(ii) Let ${}_{20}V^{(1)}$ denote the reserve conditional on exactly one surviving:

$$\begin{align*}
{}_{20}V^{(1)} &= 100{,}000\,A_{70} - (0.9)(847.55)\,\ddot{a}_{70} \\
&= (100{,}000)(0.42818) - (0.9)(847.55)(12.0083) \\
&= 33{,}658
\end{align*}$$

### Examiner Report
**Graders' Comments:** *Candidates who attempted this part generally received the majority of the credit. The most common mistake was neglecting the 90% coefficient on the annuity portion of the calculation.*

## Part e (3 points)

Calculate the policy value at time 19.5 if both D and M are alive at that time. Assume a constant force of mortality between ages 69 and 70 for the individual lives.

(This is Question 4 from the Fall 2020 Written Answer exam.)

### Explanation
$$\begin{align*}
\left({}_{19.5}V^{(2)} + 0.9 \times G/2\right)(1.05)^{0.5} = {} & \underbrace{\left({}_{0.5}q_{69.5}\right)^2 \times 100{,}000}_{\text{Both Insureds Die}} + \underbrace{\left({}_{0.5}p_{69.5}\right)^2\,{}_{20}V^{(2)}}_{\text{Both Insureds Live}} \\
& + \underbrace{2\left({}_{0.5}q_{69.5}\;{}_{0.5}p_{69.5}\right){}_{20}V^{(1)}}_{\text{One Insured Lives and One Dies}}
\end{align*}$$

(The (2) in front is because either could die.)

Also, ${}_{0.5}p_{69.5} = \left(p_{69}\right)^{0.5} = (1 - 0.009294)^{0.5} = 0.99534$

$$\Rightarrow {}_{19.5}V^{(2)} = 21{,}619$$

### Examiner Report
**Graders' Comments:** *Not many candidates attempted this part, and very few received full credit. When they attempted to solve for the survival probability, students generally performed the calculation correctly, the majority of mistakes came from the recursion equation.*
