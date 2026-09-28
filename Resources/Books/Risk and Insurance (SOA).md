---
Title: "Risk and Insurance"
Authors: "Judy Feldman Anderson and Robert L. Brown"
Publisher: "Society of Actuaries"
Year: "2005"
date: "2005"
Type: "Study Note"
Code: "P-21-05"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ae8ecd0f4c290e4f47d3be751098dc931a6aeaf2aef8a966b4a8a60d04f73be
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA Education and Examination Committee study note P-21-05, copyright 2005, second printing), 16 pp.: title page and Sections I-X read in full (text layer, plus page images of pp.4 and 12-14 for the math) — sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA Probability Exam syllabus, November 2026, p.1 (purpose paragraph) and p.7 (REFERENCES > Other Resources) — sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Resources/Books/Risk and Insurance (SOA).md
---
![[Risk and Insurance (SOA) - Cover.svg]]

An introduction to the ideas and concepts behind actuarial work, with its examples restricted to insurance. This SOA study note (P-21-05, issued by the Education and Examination Committee) defines economic risk and measures it by the standard deviation of outcomes, shows why pooling independent risks makes an insurer's results more predictable, and follows a car-accident example and a continuous hospital-charge example through deductibles, benefit limits and inflation to the claim payments an insurer makes.

## I Introduction
- [[Risk|Economic risk]] is the possibility of losing economic security; most of it derives from variation from the expected outcome.
- The note measures risk by the [[Standard Deviation|standard deviation]] of the possible outcomes: with expected repairs of 2500 for both cars, a Porsche (standard deviation 1000) has a 31% chance of repairs over 3000 and a Toyota (400) an 11% chance, if repair costs are normally distributed.
- Risk was historically managed by informal pooling within a community; formal insurance keeps the pooling without any policyholder needing a connection to any other.

## II How Insurance Works
- Insurance is an agreement where, for a stipulated premium, the insurer agrees to pay the policyholder or a designated beneficiary a defined claim payment or benefit on the occurrence of a specific loss.
- Each policyholder exchanges an unknown loss for a known premium, transferring the risk to the insurer; the larger the pool, the more predictable its results.
- A peril is a potential cause of a loss; a hazard is a condition that increases the probability or expected magnitude of a loss.

## III A Mathematical Explanation
- Losses depend on two random variables — the number of losses in a period (frequency) and the amount of a loss given one occurs (severity) — which combine into the [[Loss Random Variable|loss distribution]].
- A car owner with a 20% chance of one accident, and repairs of 500, 5000 or 15,000 with probabilities 0.5, 0.4 and 0.1, has an [[Expected Value|expected loss]] of 750 and a standard deviation of 2442.
- For independent $X_1, \dots, X_n$, each with mean $\mu$ and variance $\sigma^2$, and $S_n = X_1 + \dots + X_n$:

> $$E[S_n] = n\mu, \qquad Var[S_n] = n\sigma^2$$

- The standard deviation of $S_n$, $\sigma\sqrt{n}$, is less than the sum $n\sigma$ of the individual ones, and the [[Coefficient of Variation|coefficient of variation]] $\sigma/(\mu\sqrt{n})$ tends to zero as $n$ grows: for 100 car owners, 0.326 against 3.26 for one.
- The expected claim payment is the net or benefit premium; the gross premium adds the insurer's expenses and a margin for unanticipated claim payments.

## IV Characteristics of an Insurable Risk
- The potential loss must be significant enough that substituting a known premium for an unknown economic outcome is desirable.
- The loss and its economic value must be well-defined and out of the policyholder's control.
- Covered losses should be reasonably independent; a risk that does not fully satisfy these criteria may still be insured with special care or risk sharing with other insurers.

## V Examples of Insurance
- Auto: liability, collision, and damage from causes other than collision, such as hailstones or vandalism.
- Coverage of a residence and its contents against covered perils; life insurance; annuities, whose peril is survival; disability income insurance and health insurance.

## VI Limits on Policy Benefits
- Benefits may be limited by a maximum, a minimum, a percentage of each loss, or different limits for particular types of loss; the policyholder then covers part of the loss, often referred to as [[Coinsurance|coinsurance]].
- Deductibles
    - A [[Deductible|deductible]] reimburses losses only in excess of a stated threshold; the reasons given are no processing of small claims, premium savings, and an incentive for the policyholder to prevent losses.
    - The problems given are policyholder disappointment, misunderstandings and bad public relations, harder marketing, and overstating losses to recover the deductible.
    - With a 500 deductible, the car example's expected claim payment falls from 750 to 650 per policy and the probability of a claim from 20% to 10%.
- Benefit Limits
    - A [[Benefit Limit|benefit limit]] sets an upper bound on how much the insurer will pay for any loss; it keeps claim payments within the insurer's financial capacity, lessens its risk, and lets policyholders choose coverage at a price.
    - Adding a 12,500 maximum claim payment to the 500 deductible lowers the expected claim payment to 610 per policy.

## VII Inflation
- Many deductibles and benefit limits are fixed amounts that do not rise with [[Inflation|inflation]], so they alter its effect on claim payments.
- At 10% annual inflation with a 500 deductible, expected losses grow 46% from year 1 to year 5 but expected claim payments grow 54%: a fixed deductible exaggerates the effect of inflation.
- Adding a fixed 12,500 maximum limits it: expected claim payments grow 34% over the same years.

## VIII A Continuous Severity Example
- Hospital charges for an individual with a 15% chance of hospitalization in a year, and charges given hospitalization with density $0.1e^{-0.1x}$, have mean 1.5, standard deviation 5.27 and coefficient of variation 3.51; a pool of 200 independent individuals has coefficient of variation 0.25.
- A deductible of 5 makes the [[Payment Random Variable|claim payment]] $Y = \max(0, X - 5)$, with $E[Y] = 0.91$ and standard deviation 4.17; reimbursing only 80% of charges above the deductible cuts the pool's expected claim payments from 182 to 146.

## IX The Role of the Actuary
- Actuaries determine expected costs and risks wherever there is financial uncertainty and data to model it; for insurance, net and gross premiums and the assets an insurer should hold.
- The actuary estimates frequency and severity distributions from past experience as similar to the insured pool as possible, judging its reliability — by the [[Central Limit Theorem]], the larger the sample the smaller the variation around the true value — and watching for fundamental changes.
- The claim payment distribution is derived by adjusting the loss distribution for policy provisions such as deductibles and benefit limits, with inflation and investment returns estimated where they apply.
- Actuaries also test whether assets are sufficient for risks already committed to, project claim payments, premiums and cash flows, and project the insurer's future financial position.

## X Conclusion
- Many of the concepts can be applied to any situation where uncertain events create financial risks.
- Later SOA exams cover adjustment for investment earnings, frequency, severity and aggregate loss models, survival models, fitting models to data, and credibility.

## Sources
- [Risk and Insurance (Society of Actuaries, 2005)](https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf) — the study note (P-21-05, second printing; copyright 2005 by the Society of Actuaries): title page and Sections I–X
- [SOA Exam P Syllabus, July 2026](https://www.soa.org/globalassets/assets/files/edu/2026/july/syllabi/2026-07-p-syllabus.pdf) — names "Risk and Insurance" as the concepts an Exam P candidate is expected to be familiar with
