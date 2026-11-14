---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ca4b60c3e90a51b898b72477ca1b97ee1c6bb26df996bf627a1ca1facccbc37b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Relational Database.md
---

A **Relational Database** stores data in tables, called relations, whose rows are records and whose columns are fields. Tables are linked through keys, and data from several tables are combined with a **join** on a common key, which is how a policy table, a claim table and a vehicle table are merged into one data set for a model.

The inner join of two tables $R$ and $S$ on a key $k$ they share pairs rows only when their keys match. It is

> $$R \bowtie S = \{(r, s) : r \in R,\ s \in S,\ r.k = s.k\}$$

and its number of rows is

> $$\lvert R \bowtie S \rvert = \sum_{k} n_R(k)\, n_S(k)$$

- $n_R(k)$ and $n_S(k)$ are the numbers of rows with key value $k$ in $R$ and in $S$.

## Keys

- A **primary key** identifies each row of a table. It is unique and never empty, such as a policy number.
- A **composite key** uses several columns together, such as a policy number with a vehicle number.
- A **foreign key** holds another table's primary key. A foreign key in the claim table holds the policy number of the policy each claim belongs to, which makes the relationship between the two tables one-to-many: one policy can have many claims.

A foreign key with no matching primary key is an orphan record. Keys stored in different formats (`00123` against `123`, or trailing spaces) also leave rows unmatched without any error message, so the unmatched rows on each side are counted after every join.

## Inner and left joins

An inner join keeps only the rows with a match in both tables.

A left join keeps every row of the left table and fills the right table's fields with null where there is no match, so its row count is

> $$\sum_k n_R(k)\max\{n_S(k), 1\}$$

- $R$ is the left table.

In SQL, a left join of claims onto policies is written `FROM policy LEFT JOIN claim ON policy.policy_id = claim.policy_id`. A left join gives null claim fields to a policy with no claims. They must be set to zero claims and zero losses before modelling, because software treats a null as missing and may drop the row.

> [!example]- What do the inner and left joins of these tables hold? {Example}
> A policy table and a claim table hold:
>
> | policy | terr | exposure |
> | ---: | ---: | ---: |
> | 101 | 1 | 1.0 |
> | 102 | 2 | 1.0 |
> | 103 | 1 | 0.5 |
>
> | claim | policy | paid |
> | :--- | ---: | ---: |
> | C1 | 101 | 2,000 |
> | C2 | 101 | 500 |
> | C3 | 103 | 8,000 |
> | C4 | 109 | 1,200 |
>
> > [!answer]-
> > - The inner join keeps C1 and C2 with policy 101, and C3 with policy 103.
> > - Policy 102 has no claim, so it drops out of the inner join.
> > - Claim C4 refers to policy 109, which does not exist. It is an orphan record to investigate, since its $\$1{,}200$ would otherwise vanish from the losses.
> > - The left join with policies on the left keeps every policy:
> >
> > | policy | terr | exposure | claim | paid |
> > | ---: | ---: | ---: | :--- | ---: |
> > | 101 | 1 | 1.0 | C1 | 2,000 |
> > | 101 | 1 | 1.0 | C2 | 500 |
> > | 102 | 2 | 1.0 | null | null |
> > | 103 | 1 | 0.5 | C3 | 8,000 |
> >
> > - The row count agrees with the formula: policy 101 gives $1 \times 2 = 2$ rows, and policies 102 and 103 give one each.
> > - **The left join has four rows**, and policy 102's null claim fields are set to zero before modelling.

## One-to-many joins

Joining a one-to-many table repeats the fields of the "one" side on every matching row, so a left row with several matches appears once per match and the join can have more rows than the left table. Summing exposure or premium after such a join overstates it. Aggregate the "many" side to the key first, or sum only fields that belong to the many side.

> [!example]- Policies 101 (1.0 car-year), 102 (1.0) and 103 (0.5) are left-joined to claims, two of them on policy 101. What is the total exposure? {Example}
> - The left join has two rows for policy 101 and one each for 102 and 103.
> - Summing exposure over these rows gives $1.0 + 1.0 + 1.0 + 0.5 = 3.5$.
> - The three policies have only 2.5 car-years, because policy 101's exposure is counted twice.
> - Aggregating the claims to one row per policy first (2 claims and 2,500 paid for policy 101) and then joining gives three rows.
> - **The correct total exposure is 2.5 car-years.**

## Many-to-many joins

When the key is not unique in either table, every row on one side is paired with every matching row on the other. The fix is to choose the unit of observation first and summarize one side so that each row matches at most one row.

> [!example]- How many rows does joining this vehicle table to this driver table give? {Example}
> Of 10,000 auto policies, 6,000 have one vehicle and one driver, 3,000 have two vehicles and two drivers, and 1,000 have two vehicles and three drivers. An analyst joins the vehicle table directly to the driver table on the policy number, and each vehicle row carries 1.0 vehicle-year.
>
> > [!answer]-
> > - The vehicle table has $6{,}000 + 6{,}000 + 2{,}000 = 14{,}000$ rows.
> > - The driver table has $6{,}000 + 6{,}000 + 3{,}000 = 15{,}000$ rows.
> > - Within each policy, every vehicle is paired with every driver, so the join has $6{,}000(1)(1) + 3{,}000(2)(2) + 1{,}000(2)(3)$ rows.
> > - That is $6{,}000 + 12{,}000 + 6{,}000 = 24{,}000$ rows, and summing exposure gives 24,000 vehicle-years instead of 14,000.
> > - For a vehicle-level model, assign each vehicle its principal driver or summarize the drivers to the policy (the youngest driver's age, for example).
> > - **The join gives 24,000 rows.**

## Normalization

A relational design stores each fact once, such as the policyholder's address in one table rather than on every claim, which avoids conflicting copies. A modelling data set does the opposite and repeats policy fields on every row that needs them, which is why it is built with joins at the end of a [[Data Pipeline|data pipeline]].

> [!trap] Using an inner join to build a modelling data set
> An inner join of claims onto policies removes every policy without a claim, which is most of a book, and a frequency computed afterwards is far too high. Use a left join from the table that defines the unit of observation.
