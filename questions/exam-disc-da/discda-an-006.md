---
id: "discda-an-006"
exam: "Exam DISC-DA"
topic: "Insurer Operational Data"
learning_objective: "Collecting Data for Insurer Models"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Insurer+Operational+Data
  - Concepts/Rating+Variable
  - Concepts/Table+Join
answer: "D"
points: 1
---

An analyst joins a personal auto insurer's claims database to its policy database to look for new rating variables for a claim frequency model. Which field could be used in the rating algorithm?

- A) Whether an attorney represents the claimant, from the claims database
- B) The type of injury coded on each bodily injury claim
- C) The number of days between each claim's accident and report dates
- D) The driver's date of birth, from the policy database

## Explanation

A rating variable has to be known for every policyholder when the policy is quoted. Claim characteristics exist only for policies that have had a claim, and only after it happens, so they can help explain claim size in a reserving study but cannot price a policy. The driver's date of birth is on the policy record for every driver, and it is the stable field from which the driver's age, a common rating variable, is derived each term. The answer is **D**.

**Why not the others**

- **A** — attorney representation is known only after a claim is made, and only for claimants.
- **B** — the type of injury is a claim characteristic, unknown at quotation.
- **C** — the report lag is measured on a claim, so it does not exist for a prospective policyholder.
