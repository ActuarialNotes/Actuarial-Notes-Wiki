---
id: "atpa-an-009"
exam: "Exam ATPA"
topic: "Data Quality"
learning_objective: "Working with Data"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Quality
  - Concepts/Missing+Data
answer: "A"
points: 1
---

Reviewing a personal auto file before modelling, an actuary plots driver age. The distribution is smooth from 16 to 95, except for a spike of 3,800 policies, about 4% of the file, at an age of exactly 0. Which response is most appropriate?

- A) Learn the field's definition from the data owner, correct the ages from source where practical, treat the rest as missing, and disclose what was done.
- B) Delete the 3,800 records, since an age of 0 is impossible and the remaining 96% of the file is enough to fit the model.
- C) Keep the ages as recorded, since the model will fit a separate relativity to them and the fit will absorb the problem.
- D) Replace each 0 with the file's mean age, with no indicator, so that the variable has no gaps when the model is fitted.
- E) Audit every transaction in the policy administration system before using any part of the file for the model.

## Explanation

A spike at one round or extreme value, out of line with an otherwise smooth distribution, is a typical sign of a placeholder code. An age of 0 is often a default written when the field was left blank, so these are missing values in disguise. The actuary first learns why the values occur, corrects them from the source where practical, and otherwise sets them to missing and handles them explicitly, for example with an imputed value and a missing-value flag. The questionable values and the steps taken are disclosed. The answer is **A**.

**Why not the others**

- **B** deletes whole records, discarding their other information, and removes whichever group tends to leave age blank. Setting the value to missing keeps the record.
- **C** lets the model fit a relativity to "age 0", which describes no driver.
- **D** imputes without a flag, so the model cannot tell the filled values from real ones, and the treatment goes unrecorded when it must be stated and applied the same way to new business.
- **E** overstates what is required. ASOP No. 23 asks for a review of the data for reasonableness and consistency, not an audit.
