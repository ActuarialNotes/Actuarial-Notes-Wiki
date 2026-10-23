---
id: "altam-009"
exam: "Exam ALTAM"
topic: "Long-Term Insurance Coverage"
learning_objective: "Premium and Policy Valuation for Long-Term State-Dependent Coverages"
difficulty: easy
type: multi-part
wiki_link:
  - Concepts/Long-Term+Insurance+Coverage
  - Concepts/Health+Insurance
  - Concepts/Multiple+State+Model
  - Concepts/State-Dependent+Insurance
points: 7
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:708f7ba2e4c5dfef7e77759aabdd913f5d7da9575a1919986559ab571e051047
  sources:
    - "SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q9, p.18, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q9, pp.17-18, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-altam/altam-009.md
---

On 1/1/2009, a person purchased a 10-year hybrid long term care and life insurance product. The product has the following features:

(i) The product uses a reimbursement approach where the caregiver is reimbursed up to a maximum rate of 2000 per month when the insured requires assistance to perform 2 or more activities of daily living (ADLs), of the 6 commonly used ADLs.

(ii) The product has a 3 month waiting period and a 6 month off period.

(iii) The sum insured for the life insurance portion of the product is 100,000.

(iv) Premiums are payable at a continuous rate of 150 per month while the insured is active (able to perform at least 5 of 6 ADLs).

The insured's experience during the term of this policy was as follows:

- From 1/1/2012 to 6/30/2012, the insured was only able to perform 4 ADLs, and required outpatient care costing 1000 per month.
- From 3/31/2013 to 11/30/2013, the insured was only able to perform 3 ADLs, and required inpatient care costing 2500 per month.
- For the remainder of the time from 1/1/2009 through 6/30/2018, the insured was able to perform at least 5 ADLs.
- The insured died on 7/1/2018.

## Part a (1 point)

List the six ADLs in common use for long term care products.

### Explanation
The six common ADLs are

- Bathing
- Dressing
- Eating
- Toileting
- Continence
- Transferring

## Part b (2 points)

Draw a sketch of a Markov model that could be used to model this hybrid insurance product.

### Explanation
One model is given below. Others may also be appropriate.

![State diagram: Active, at least 5 ADLs (0); Impaired, 4 ADLs (1); Severely impaired, at most 3 ADLs (2); Dead (3). Arrows run 0 to 1, 1 to 0, 1 to 2, 2 to 1, and from each of 0, 1 and 2 to 3.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/altam-009-state-diagram.png)

## Part c (2 points)

Calculate the amount of the death benefit payable upon the insured's death, assuming:

(i) The long term care and life insurance benefits are combined using the "return of premium" approach.

(ii) The long term care and life insurance benefits are combined using the "accelerated benefit" approach.

### Explanation
(i) Over the course of the policy, the insured was active for 12 + 12 + 12 + 6 + 4 + 12 + 12 + 12 + 12 + 6 = 100, months, thereby paying a total of 100 × 150 = 15,000 in premium. For the first disability, (6 - 3) × 1000 = 3000 in benefits were paid; for the second disability, (8-3) × 2000 = 10,000 in benefits were paid. Since the sum of the premiums paid exceeds the disability benefits paid out under the policy, under the "return of premium" approach, the remainder of 15,000-13,000 = 2000 is added to the death benefit, for a total death benefit of 102,000.

(ii) As before, over the course of the policy, 13,000 in benefits were paid. This amount is deducted from the sum insured of 100,000, leaving a death benefit payment of 87,000.

## Part d (2 points)

Now suppose that instead of using a 6 month off period, the insurer uses a 12 month off period.

Calculate the change in total benefits paid as a result of this change, assuming:

(i) The long term care and life insurance benefits are combined using the "return of premium" approach.

(ii) The long term care and life insurance benefits are combined using the "accelerated benefit" approach.

### Explanation
(i) With a 12 month off period, the second disability, which starts 9 months after the end of the first disability period, is not subject to the 3 month waiting period. Hence, benefit payments will commence immediately for this disability, increasing the long term care benefits paid by 3×2000 = 6000. However, since the total long term care benefits paid (19,000) would now exceed the total premium paid (15,000), there would no longer be a return of premium added to the death benefit, lowering it by 2000. Hence, the total benefits paid would increase by 4000.

(ii) Again, in this scenario, the long term care benefits paid would increase by 6000. However, the death benefit paid would be 6,000 less than before. Hence, there is no net change in total benefits paid by the policy.
