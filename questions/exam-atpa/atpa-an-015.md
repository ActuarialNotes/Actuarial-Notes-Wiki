---
id: "atpa-an-015"
exam: "Exam ATPA"
topic: "Data Validation"
learning_objective: "Working with Data"
difficulty: easy
type: multi-part
bloom: apply
wiki_link:
  - Concepts/Data+Validation
points: 5
---

Before building a modelling data set, an analyst runs the validation checks on an auto policy file and its claim file. Match each finding to the kind of check that flags it. An option may be used more than once or not at all.

## Part a (1 point)
A claim's report date is three weeks before its accident date.

- A) Type and format check
- B) Range check
- C) Completeness check
- D) Consistency check
- E) Duplicate detection

### Answer
D

### Explanation
Fields within a record must agree with one another, and a claim cannot be reported before its accident. Each date is valid on its own, so a type check (**A**) and a range check (**B**) pass it.

## Part b (1 point)
The file holds about 12,000 new policies a month, except March, which holds 5,900.

- A) Type and format check
- B) Range check
- C) Completeness check
- D) Consistency check
- E) Duplicate detection

### Answer
C

### Explanation
Completeness checks compare record counts with the expected volume. A month with half the usual records points to a failed extract.

## Part c (1 point)
A one-year policy shows 3.2 car-years of earned exposure for a single vehicle.

- A) Type and format check
- B) Range check
- C) Completeness check
- D) Consistency check
- E) Duplicate detection

### Answer
B

### Explanation
A range check tests that a field's value lies in a plausible range, such as an exposure between 0 and the policy's written exposure. The value is a valid number, so a type check (**A**) passes it.

## Part d (1 point)
The same claim number and transaction date appear on two rows with identical amounts, after a rerun of the nightly load.

- A) Type and format check
- B) Range check
- C) Completeness check
- D) Consistency check
- E) Duplicate detection

### Answer
E

### Explanation
Duplicate detection finds records that repeat a key. A double load inflates both the claim count and the amount.

## Part e (1 point)
A policy's effective date reads `2025-02-30`.

- A) Type and format check
- B) Range check
- C) Completeness check
- D) Consistency check
- E) Duplicate detection

### Answer
A

### Explanation
A date field must hold valid dates, and 30 February does not exist, so the value fails a type and format check before any comparison with other fields is possible.
