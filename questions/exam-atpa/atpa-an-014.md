---
id: "atpa-an-014"
exam: "Exam ATPA"
topic: "Relational Database"
learning_objective: "Working with Data"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Relational+Database
  - Concepts/Data+Validation
answer: "A"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6377bccbc35c1022d99c2a82f5a998a3582488c795909efbb62858a141b89cba
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-014.md
---

An analyst left joins a claim table onto a policy table on `policy_id`, with the policies on the left. In the policy table the key is stored as a number (`123`), and in the claim table as text with leading zeros (`000123`). The query runs without an error. After the null claim fields are set to zero, every one of the 40,000 policies shows zero claims, although the claim table holds 3,100 claims. What should the analyst conclude and do?

- A) The key formats differ, so no claim matched. Count the unmatched rows on each side and put both keys in one format before joining again.
- B) The join type is wrong. An inner join would match the claims to their policies and keep the claim counts.
- C) The book had no claims in the period after all. The claim table belongs to another period, and the data set is ready.
- D) The claim table's key is not unique, so the join duplicated rows. Aggregate the claims to one row per policy first.
- E) The nulls were set to zero too early. Leave them as nulls so the model drops those rows when it is fitted.

## Explanation

Keys stored in different formats, such as `00123` against `123`, leave rows unmatched without any error message. Every policy found no matching claim, so the left join filled the claim fields with null, and setting those to zero made the whole book look claim-free. Counting the unmatched rows on each side after the join exposes the problem at once: all 3,100 claims are unmatched. The analyst puts both keys in one format and joins again. The answer is **A**.

**Why not the others**

- **B** changes the join type, but an inner join on mismatched keys matches nothing either, and it would drop every policy.
- **C** ignores the reconciliation. The claim table holds 3,100 claims, and a data set showing none of them is a failed join, not a fact about the book.
- **D** describes a one-to-many join, which adds rows. The symptom here is the opposite, claims that never matched.
- **E** would drop every row from the model, since software treats a null as missing. Setting a genuine no-claim policy's nulls to zero is correct. The fault is that the claims never matched.
