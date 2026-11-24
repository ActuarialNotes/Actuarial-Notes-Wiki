---
id: "atpa-an-011"
exam: "Exam ATPA"
topic: "Data Warehouse"
learning_objective: "Working with Data"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Data+Warehouse
answer: "D"
points: 1
---

A policyholder lived in territory 1 from 2021 to 2023, had two claims there, and moved to territory 3 at the start of 2024. The policy system overwrote the address with the new one. An analyst builds 2021–2025 territory experience directly from the policy system. What is the effect on the territory experience?

- A) Territory 1 is credited with the claims and exposure from after the move, overstating its experience.
- B) None, because the exposure and the claims both move to territory 3, so the ratio of claims to exposure is unchanged.
- C) The two claims drop out of the extract, because their territory no longer matches the policy's territory.
- D) Territory 3 is credited with the 2021–2023 exposure and both claims, overstating its experience.
- E) Only the 2024–2025 experience is misallocated, since that is when the address changed.

## Explanation

An operational database holds the current state of each record, and a change can overwrite the old value. The policy system now shows territory 3 for the whole history, so the 2021–2023 exposure and both claims are credited to territory 3, where the risk was never located. Territory 3's experience is overstated and territory 1's understated, and many such moves bias the territory relativities. A data warehouse prevents this by keeping a row for each policy period, or the address history, so each claim and car-year is matched to the territory in force on its own date. The answer is **D**.

**Why not the others**

- **A** has the direction backwards. The overwrite moves the old years to the new territory.
- **B** looks at one policy's ratio, but the experience used to rate territory 3 now contains claims from territory 1's conditions, and territory 1 loses them.
- **C** confuses the overwrite with a failed join. The claims still attach to the policy, and the territory they get is the wrong one.
- **E** has it backwards too. The 2024–2025 experience is in territory 3, which is correct. It is the earlier years that are misallocated.
