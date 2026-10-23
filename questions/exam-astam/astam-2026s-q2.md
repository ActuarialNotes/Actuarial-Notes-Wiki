---
id: "astam-2026s-q2"
exam: "Exam ASTAM"
topic: "Deductible"
learning_objective: "Coverage Modifications"
difficulty: medium
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Deductible
  - Concepts/Coverage+Modifications
  - Concepts/Mean+Excess+Loss
  - Concepts/Excess+of+Loss
  - Concepts/Policy+Limit
points: 9
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:186460c56520dc3c7d1d9840600bcfaf1efc17ece44f45dfb29d9e0156e3d20b
  sources:
    - "SOA Exam ASTAM Spring 2026 — exam questions, Q2, pp.6-7, sha256:2d067bc99c3437f3791bb61c595db1e2cc8794b876f88dd9b506a5a543cac511 — https://www.soa.org/globalassets/assets/files/edu/2026/astam/april-2026-astam-exam.pdf"
    - "SOA Exam ASTAM Spring 2026 — model solutions and examiners' comments, Q2, pp.2-3, sha256:3930c2d38ba3d08955f65aededeb3bbb1c1eab5191b4f11c7481ceb177a7522f — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2026s-q2.md
---

NED Insurance Company sells a liability insurance policy. The policyholder can select a deductible of 0, 500, or 1000.

You have the following data from 2024.

| Ground-Up Loss | Count | Total Ground-Up Losses |
|---|---|---|
| 0-500 | 770 | 172,000 |
| 500-1000 | 450 | 328,000 |
| 1000-2000 | 520 | 748,000 |
| 2000-4000 | 450 | 1,276,000 |
| 4000-6000 | 140 | 687,000 |
| 6000+ | 170 | 1,914,000 |
| **Total** | **2,500** | **5,125,000** |

## Part a (2 points)

(i) Calculate the expected payment per loss.

(ii) Calculate the expected insurance payment per loss with a deductible of 500.

(iii) Calculate the expected insurance payment per loss with a deductible of 1000.

### Explanation
(i) Expected Loss:

$$\frac{5{,}125{,}000}{2{,}500} = 2{,}050.0$$

(ii) 500 deductible:

$$\frac{5{,}125{,}000 - 172{,}000 - (500)(2500 - 770)}{2{,}500} = \frac{4{,}088{,}000}{2{,}500} = 1{,}635.2$$

(iii) 1000 Deductible:

$$\frac{5{,}125{,}000 - 172{,}000 - 328{,}000 - (1000)(2500 - 770 - 450)}{2{,}500} = \frac{3{,}345{,}000}{2{,}500} = 1{,}338.0$$

## Part b (1 point)

NED develops their base rate using a deductible of 500.

(i) Determine the indicated deductible relativity for a zero deductible policy.

(ii) Determine the indicated deductible relativity for a policy with a deductible of 1000.

### Explanation
Since 500 is the base deductible:

(i) $$IDR_0 = \frac{2050}{1635} = 1.254$$

(ii) $$IDR_{1000} = \frac{1338}{1635} = 0.818$$

### Examiner Report
1. Candidates generally did well on parts (a) and (b).
2. It is important for candidates to understand the difference between cost per loss and cost per payment.

## Part c (2 points)

NED is concerned about the tail risk for this portfolio.

(i) Calculate the mean excess loss of the ground-up losses for a threshold of $x = 6000$.

(ii) State with reasons the implications of this result with respect to the tail of this distribution.

### Explanation
(i)

$$\begin{align*}
e(6000) &= E\left[X \mid X > 6000\right] - 6000 \\
&= \frac{1{,}914{,}000}{170} - 6000 \\
&= 5{,}258.82
\end{align*}$$

(ii) The expected value of all the claims is 2050. The expected excess amount of claims over 6000 is 5259. When the tail mean excess loss is greater than the overall mean, that signals a heavy tailed distribution.

### Examiner Report
1. Performance on this part was mixed. Many candidates achieved full credit. A significant number forgot to deduct the threshold value in the mean excess loss calculation.
2. The Examiners were pleased that most of the candidates who were able to calculate the MEL were also able to interpret the results.

## Part d (3 points)

NED has requested a reinsurance company quote the cost of two different reinsurance contracts for this policy. The coverages are:

- Contract A: excess of loss insurance with retention of 4000; that is, for each loss the reinsurer will pay any excess of the ground-up loss over 4000.
- Contract B: pays 50% of the excess of the ground-up loss over 2000, with a maximum reinsurance payment of 2000.

(i) Calculate the reinsurer's expected cost per loss for each of these reinsurance contracts.

(ii) NED is primarily concerned about tail risk for this policy. State with reasons which of these two reinsurance coverages is more appropriate.

### Explanation
(i) Contract A:

$$\frac{\left(687{,}000 + 1{,}914{,}000 - (140 + 170)(4{,}000)\right)}{2{,}500} = \frac{1{,}361{,}000}{2{,}500} = 544.4$$

Contract B:

$$\frac{0.5\left(\left(1{,}276{,}000 + 687{,}000\right) - (450 + 140)(2{,}000)\right) + (170)(2{,}000)}{2{,}500} = \frac{731{,}500}{2{,}500} = 292.6$$

(ii) NED should select the excess loss insurance (option A) as that largely eliminates the tail risk since the maximum that NED would have to payout on each claim is 4000. The max for option B is unlimited, as the insurer is responsible for all but 2000 of any loss over 6000.

### Examiner Report
1. The main point of (i) is to test whether candidates can correctly interpret the reinsurance cover, and extract the relevant information from the data table. Contract A was done fairly well, Contract B proved more of a challenge.
2. In part (ii), a coherent explanation was necessary for any credit.
3. The Examiners are looking for candidates to demonstrate not only that they can do calculations, but also that they can understand and interpret the information given, and numerical results, in an insurance context.

## Part e (1 point)

NED is considering offering a policy with no deductible but with an upper limit of 6000. Describe one advantage and one disadvantage to the insurer of offering this policy, compared with a policy with no upper limit and with a 1000 deductible.

### Explanation
Advantages (only one required):

- This eliminates the tail risk which we can see from above is significant.
- This would eliminate the need for reinsurance.

Disadvantages (only one required):

- Having no deductible means that NED will need to deal with all claims, even those that are very small. This will increase the expenses per unit of claims settled.
- There will be a significant portion of the insureds (about 170/2500) who will have claims exceeding the upper limit. It is probable that many of these insureds will not have understood the implications of the upper limit and will be very dissatisfied with the policy and with NED as the insurance company. There is a reputational risk involved here.

### Examiner Report
This part was generally well done.
