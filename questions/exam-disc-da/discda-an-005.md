---
id: "discda-an-005"
exam: "Exam DISC-DA"
topic: "Insurer Operational Data"
learning_objective: "Collecting Data for Insurer Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Insurer+Operational+Data
  - Concepts/Written+Premium
answer: "C"
points: 1
---

On January 1, 2025 an insurer writes an annual personal auto policy covering one car for \$1,200 (1.00 car-year). The insured cancels on October 1, 2025. Premium and exposure are earned evenly by month, and the policy database records transactions rather than overwriting records. Which records does the database hold for this policy?

- A) One record of 0.75 car-years and \$900, replacing the original record
- B) Two records: +1.00 car-year and +\$1,200, then -0.75 and -\$900
- C) Two records: +1.00 car-year and +\$1,200, then -0.25 and -\$300
- D) Two records: +1.00 car-year and +\$1,200, then -0.25 and -\$1,200

## Explanation

A transactional policy database keeps the original record and adds a cancellation record that reverses the **unearned** part of the term. The policy ran 9 of its 12 months, so 3 months, a quarter of the term, are reversed:

$$
\begin{align*}
\text{Exposure reversed} &= 0.25 \times 1.00 \\
&= 0.25 \\
\text{Premium reversed} &= 0.25 \times 1{,}200 \\
&= 300
\end{align*}
$$

The two records net to 0.75 car-years and \$900. The answer is **C**.

**Why not the others**

- **A** — this is the net result, but a transactional database does not overwrite the issue record; it adds a cancellation record.
- **B** — this reverses the part of the term that was earned (9 months) rather than the part that was not, netting the policy to 0.25 car-years.
- **D** — this prorates the exposure but reverses the whole premium, leaving the policy with 0.75 car-years and no premium.
