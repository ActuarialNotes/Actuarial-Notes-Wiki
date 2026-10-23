---
id: "astam-002"
exam: "Exam ASTAM"
topic: "Parallelogram Method"
learning_objective: "Reserving and Pricing for Short-Term Insurance Coverages"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Principles+of+Ratemaking
  - Concepts/Parallelogram+Method
  - Concepts/Rate+Change
  - Concepts/Loss+Ratio+Method
  - Concepts/Loss+Cost
  - Concepts/Classification+Ratemaking
points: 4
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:a6cad7c14da03b5a341eeef5141642260100805027df3914aa732ad3d6fb8859
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q2, pp.4-5, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q2, pp.4-6, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-astam/astam-002.md
---

## Part a

There are four essential objectives of Ratemaking. Describe each one and explain why these objectives are essential.

### Explanation

The rates must cover the expected losses and expenses. Clearly, for the insurer to stay in business, income (premiums and investment income) must at least equal outgo (losses and expenses).

Ratemaking should produce rates that make adequate provision for contingencies. While the rates should cover the expected losses, there should be the cost of the unexpected (unusual weather patterns, wildfires, 100-year floods, etc.) also built into the rates. This is difficult to do while maintaining competitive rates.

The rates should encourage loss control. An appropriate risk categorization process will reduce claim frequency and/or severity. Such process not only allows that insurer to lower rates but to provide a service to society by reducing accidents, injuries, and property damage.

Rates must satisfy rate regulators. Almost all rates must be filed with and approved by state insurance department or other agencies. The basic requirement of the rate regulators is that rates must be adequate, not excessive, and not unfairly discriminatory.

## Part b

You are the rate making actuary for ABC Auto. You are setting rates for the auto coverage, which is a short-term insurance product. You are given the following data:

| Calendar Year | Earned Premium |
|---|---|
| 2017 | 10,000 |
| 2018 | 12,000 |
| 2019 | 8,000 |

Assume that all policies are one-year policies and that policies are issued uniformly throughout the year.

The following rate changes have occurred:

| Date | Rate Change |
|---|---|
| March 15, 2017 | 10% Increase |
| July 30, 2018 | 8% Increase |
| October 31, 2019 | 4% Decrease |

- (i) Graphically display the parallelogram that would be used to apply the parallelogram method.
- (ii) Using the parallelogram method, calculate the earned premium for 2017, 2018, and 2019 based on current rates.

### Explanation

(i) The SOA's solution draws the parallelogram as a figure. In words: calendar years 2017, 2018 and 2019 are drawn as three adjacent squares (time across, the portion of policies earned up the side). Each rate change is a diagonal line rising from the date it took effect: from 5/24 of the way through 2017 (March 15) into 2018, from 7/12 of the way through 2018 (July 30) into 2019, and from 10/12 of the way through 2019 (October 31). The regions between the lines are labelled, oldest first, $P$, $1.10P$, $(1.1)(1.08)P$ and, in the corner of 2019 after the last line, $(1.10)(1.08)(0.96)P$.

(ii) **2017**

$$\text{Weighted Premium} = \left[\frac{\left(\frac{19}{24}\right)\left(\frac{19}{24}\right)}{2}\right]1.10P + \left\{1 - \left[\frac{\left(\frac{19}{24}\right)\left(\frac{19}{24}\right)}{2}\right]\right\}P = 1.031337P$$

$$\text{Current Rate Earned Premium} = (10{,}000)\left(\frac{(1.10)(1.08)(0.96)}{1.031337}\right) = 11{,}058.27$$

**2018**

$$\begin{aligned}
\text{Weighted Premium} &= \left[\frac{\left(\frac{5}{24}\right)\left(\frac{5}{24}\right)}{2}\right]P + \left[\frac{\left(\frac{5}{12}\right)\left(\frac{5}{12}\right)}{2}\right](1.10)(1.08)P \\
&\quad + \left\{1 - \left[\frac{\left(\frac{5}{24}\right)\left(\frac{5}{24}\right)}{2}\right] - \left[\frac{\left(\frac{5}{12}\right)\left(\frac{5}{12}\right)}{2}\right]\right\}1.10P = 1.105469P
\end{aligned}$$

$$\text{Current Rate Earned Premium} = (12{,}000)\left(\frac{(1.10)(1.08)(0.96)}{1.105469}\right) = 12{,}380.05$$

**2019**

$$\begin{aligned}
\text{Weighted Premium} &= \left[\frac{\left(\frac{7}{12}\right)\left(\frac{7}{12}\right)}{2}\right](1.10)P + \left[\frac{\left(\frac{2}{12}\right)\left(\frac{2}{12}\right)}{2}\right](1.10)(1.08)(0.96)P \\
&\quad + \left\{1 - \left[\frac{\left(\frac{7}{12}\right)\left(\frac{7}{12}\right)}{2}\right] - \left[\frac{\left(\frac{2}{12}\right)\left(\frac{2}{12}\right)}{2}\right]\right\}(1.10)(1.08)P = 1.172368 \text{ (as printed)}
\end{aligned}$$

$$\text{Current Rate Earned Premium} = (8000)\left(\frac{(1.10)(1.08)(0.96)}{1.172368}\right) = 7782.40$$

## Part c

There are two methods for determining the overall change in rates – the loss cost method and the loss ratio method. Prove that both methods will always provide the same answer.

### Explanation

See the proof on Page 127 and 128 of Brown and Lennox.

## Part d

For collision coverage for ABC Auto, rate differentials for 2019 are developed using the following information:

| Type | Proportion of Total Drivers | Claim Frequency Poisson Annual | Severity Gamma |
|---|---|---|---|
| Safe | 0.5 | 0.04 | $\alpha = 3, \theta = 1000$ |
| Not So Safe | 0.3 | 0.10 | $\alpha = 4, \theta = 1000$ |
| Reckless | 0.2 | 0.25 | $\alpha = 5, \theta = 1000$ |

- (i) Calculate the indicated differentials for each Type, given that Safe is the base rate.
- (ii) During 2019, ABC Auto experienced the following loss ratios for collision coverage based on the indicated differentials developed in Question 16 (as printed):

   | Type | Loss Ratio |
   |---|---|
   | Safe | 60% |
   | Not So Safe | 63% |
   | Reckless | 51% |

   Use the loss ratio method to determine the new indicated differentials for 2020 for the Not So Safe and Reckless categories.

### Explanation

(i) We need to calculate the expected loss for each Type which $= E(S) = E(N)E(S)$ (as printed)

- Safe $\Rightarrow (0.04)(3000) = 120$
- Not So Safe $\Rightarrow (0.10)(4000) = 400$
- Reckless $\Rightarrow (0.25)(5000) = 1250$

Differential for Safe $= 1.00$ since it is the base type

$$\text{Differential for Not So Safe} = \frac{400}{120} = 3.33333$$

$$\text{Differential for Reckless} = \frac{1250}{120} = 10.41666$$

(ii)

$$\text{Indicated Differential for Not So Safe} = (3.33333)\left(\frac{0.63}{0.60}\right) = 3.50000$$

$$\text{Indicated Differential for Class C (as printed)} = (10.41666)\left(\frac{0.51}{0.60}\right) = 8.85416$$
