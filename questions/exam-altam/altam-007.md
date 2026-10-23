---
id: "altam-007"
exam: "Exam ALTAM"
topic: "Kolmogorov's Forward Equation"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Kolmogorov's+Forward+Equation
  - Concepts/Multiple+State+Model
  - Concepts/Transition+Intensity
  - Concepts/Insurance+Premium
  - Concepts/Equivalence+Principle
points: 7
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:ef612f78671aa206a4a488824c2a607de04b957be737c91b2a28f72b5477e3e6
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q7, pp.13-14, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q7, pp.13-14, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-007.md
---

An actuarial student in your department is using the following 3-state Markov model to price a one-year consumer warranty for a television.

![State diagram: Working (0), Under Repair (1) and Broken Beyond Repair (2); arrows run 0 to 1 (labelled mu_t^01), 1 to 0 (labelled mu_t^10) and 1 to 2 (labelled mu_t^12).](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-007-state-diagram.png)

The product has the following features:

(i) The warranty is sold at the time that a consumer purchases the television and pays a replacement cost of 1000 at the end of the half-year during which the television becomes Broken Beyond Repair.

(ii) Premiums are payable at the beginning of each half-year, but are waived if the television is not Working at the time a premium is due.

(iii) All televisions are in the Working state at time of purchase.

## Part a (2 points)

Write down the Kolmogorov forward differential equations with associated boundary conditions (initial conditions) for ${}_tp_0^{00}$, ${}_tp_0^{01}$, and ${}_tp_0^{02}$ under this model.

### Explanation
$$\frac{d}{dt}\,{}_tp_0^{00} = {}_tp_0^{01}\,\mu_t^{10} - {}_tp_0^{00}\,\mu_t^{01}$$

$$\frac{d}{dt}\,{}_tp_0^{01} = {}_tp_0^{00}\,\mu_t^{01} - {}_tp_0^{01}\left(\mu_t^{10} + \mu_t^{12}\right)$$

$$\frac{d}{dt}\,{}_tp_0^{02} = {}_tp_0^{01}\,\mu_t^{12}$$

Boundary Conditions:

$${}_0p_0^{00} = 1 \quad {}_0p_0^{01} = 0 \quad {}_0p_0^{02} = 0$$

### Examiner Report
Graders' Comments: Most candidates were able to give the differential equations, but quite a few did not provide boundary conditions.

For full credit, candidates were expected to use the specific model given in the question, which meant that subscripts and superscripts needed to correspond with the notation of the question for full credit.

## Part b (2 points)

The forces of transition in this model for a television purchased $t$ years ago are:

$$\mu_t^{01} = 0.5 + 0.6t$$

$$\mu_t^{10} = 0.2$$

$$\mu_t^{12} = 2^t$$

The student has applied the Forward Euler approximation to the Kolmogorov forward differential equations with a step size of $h = 0.5$ to calculate probabilities for this model. You have verified that, using this approach, ${}_{0.5}p_0^{00} = 0.75$.

Using the student's approach:

(i) Calculate ${}_{0.5}p_0^{01}$.

(ii) Show that the probability that a television will become Broken Beyond Repair within a year of purchase is 0.18 to the nearest 0.01. You should calculate the probability to the nearest 0.001.

### Explanation
(i) The Euler equation for ${}_{t+h}p_0^{01}$ is:

$${}_{t+h}p_0^{01} = {}_tp_0^{01} + h\left({}_tp_0^{00}\,\mu_t^{01} - {}_tp_0^{01}\left(\mu_t^{10} + \mu_t^{12}\right)\right)$$

so, using $t = 0$, $h = 0.5$ gives:

$$\begin{align*}
\Rightarrow {}_{0.5}p_0^{01} &= {}_0p_0^{01} + h\left({}_0p_0^{00}\,\mu_0^{01} - {}_0p_0^{01}\left(\mu_0^{10} + \mu_0^{12}\right)\right) \\
&= 0 + 0.5\left((1)(0.5) + (0)\left(0.2 + 2^0\right)\right) \\
&= 0.25
\end{align*}$$

(ii) The Euler equation for ${}_{t+h}p_0^{02}$ is

$${}_{t+h}p_0^{02} = {}_tp_0^{02} + h\left({}_tp_0^{01}\,\mu_t^{12}\right)$$

so, using $t = 0.0$, $h = 0.5$ and then $t = 0.5$, $h = 0.5$ gives

$${}_{0.5}p_0^{02} = {}_0p_0^{02} + h\left({}_0p_0^{01}\,\mu_0^{12}\right) = 0 + 0.5\left((0)(2^0)\right) = 0$$

and

$${}_1p_0^{02} = {}_{0.5}p_0^{02} + h\left({}_{0.5}p_0^{01}\,\mu_{0.5}^{12}\right) = 0 + 0.5\left((0.25)(2^{0.5})\right) = 0.177.$$

### Examiner Report
Graders' Comments: Many candidates' solutions lacked clarity in this part, which made it difficult to award partial credit for incomplete answers.

## Part c (2 points)

Using the probabilities from the student's approach and $i^{(2)} = 8\%$:

(i) Calculate the actuarial present value at issue of the replacement cost payments for this policy.

(ii) Calculate the semi-annual net premium for this policy.

### Explanation
(i)

$$\begin{align*}
APV &= 1000\left(v \times {}_{0.5}p_0^{02} + v^2\left({}_1p_0^{02} - {}_{0.5}p_0^{02}\right)\right) \text{ at } 4\% \\
&= 1000\left[(1.04)^{-1}(0) + (1.04)^{-2}(0.177 - 0)\right] \\
&= 163.64
\end{align*}$$

(ii)

$$P\left(1 + v \times {}_{0.5}p_0^{00}\right) = APV = 163.64$$

$$\Rightarrow P = \frac{163.64}{1 + (1.04)^{-1}(0.75)} = 95.08$$

### Examiner Report
Graders' Comments: This part was done well by most candidates who attempted it. Note that all the probability values required were given in the question, so it was not necessary to answer (b) to answer (c) correctly. Full credit was given for answers using the rounded probability values given in the question.

## Part d (1 point)

Suggest a change to the student's approach that would improve the accuracy of the probability calculations.

(MLC, Spring 2014, Question 2)

### Explanation
Use smaller $h$ for greater accuracy.
