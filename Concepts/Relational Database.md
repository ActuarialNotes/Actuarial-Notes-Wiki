---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:94ab5aaa0c3ac5ce5778f36a963fde2fd9708c86bd33976b11a5307666ef15bb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Relational Database.md
---

A **Relational Database** stores data in tables, called relations, whose rows are records and whose columns are fields. Each table's rows are identified by a **primary key**, and tables are linked by **foreign keys** that hold another table's primary key. Data from several tables are combined with a **join** on a common key, which is how a policy table, a claim table and a vehicle table are merged into one data set for a model.

> $$R \bowtie S = \{(r, s) : r \in R,\ s \in S,\ r.k = s.k\}$$

> $$\lvert R \bowtie S \rvert = \sum_{k} n_R(k)\, n_S(k)$$

- **Symbols:** $R$ and $S$ are two tables, $k$ is the key they share, and $n_R(k)$ and $n_S(k)$ count the rows with key value $k$ in each table. The first block is an inner join, which pairs rows only when their keys match, and the second counts the rows it produces.
- **Keys:** A primary key is unique and never empty, such as a policy number, and a composite key uses several columns together, such as a policy number with a vehicle number. A foreign key in the claim table holds the policy number of the policy each claim belongs to, which makes the relationship between the two tables one-to-many: one policy can have many claims.
- **Joins:** An inner join keeps only the rows with a match in both tables. A left join keeps every row of the left table and fills the right table's fields with null where there is no match, so its row count is $\sum_k n_R(k)\max\{n_S(k), 1\}$. In SQL, a left join of claims onto policies is written `FROM policy LEFT JOIN claim ON policy.policy_id = claim.policy_id`.
- **Normalization:** A relational design stores each fact once, such as the policyholder's address in one table rather than on every claim, which avoids conflicting copies. A modelling data set does the opposite and repeats policy fields on every row that needs them, which is why it is built with joins at the end of a [[Data Pipeline|data pipeline]].

> [!example]- Joining Claims to Policies {Example}
> A policy table holds policies 101 (territory 1, exposure 1.0), 102 (territory 2, exposure 1.0) and 103 (territory 1, exposure 0.5). A claim table holds claims C1 (policy 101, paid \$2,000), C2 (policy 101, paid \$500), C3 (policy 103, paid \$8,000) and C4 (policy 109, paid \$1,200). List the rows of the inner join and of the left join with policies on the left, and find the total exposure in the left join.
>
> > [!answer]-
> > The inner join keeps the three claims whose policy is in the policy table: C1 and C2 with policy 101, and C3 with policy 103. Policy 102 has no claim, so it drops out. Claim C4 refers to policy 109, which does not exist, so it is an orphan record that should be investigated, since its \$1,200 would otherwise vanish from the losses.
> >
> > The left join keeps every policy.
> >
> > | policy | terr | exposure | claim | paid |
> > | ---: | ---: | ---: | :--- | ---: |
> > | 101 | 1 | 1.0 | C1 | 2,000 |
> > | 101 | 1 | 1.0 | C2 | 500 |
> > | 102 | 2 | 1.0 | null | null |
> > | 103 | 1 | 0.5 | C3 | 8,000 |
> >
> > The row count agrees with the formula: policy 101 gives $1 \times 2 = 2$ rows, and policies 102 and 103 give one each. Summing exposure over these rows gives $1.0 + 1.0 + 1.0 + 0.5 = 3.5$, but the three policies have only 2.5 car-years, because policy 101's exposure is counted twice. The fix is to aggregate the claims to one row per policy first (2 claims and 2,500 paid for policy 101) and then join, which gives three rows and 2.5 car-years.

> [!example]- Counting the Rows of a Many-to-Many Join {Example}
> Of 10,000 auto policies, 6,000 have one vehicle and one driver, 3,000 have two vehicles and two drivers, and 1,000 have two vehicles and three drivers. An analyst joins the vehicle table directly to the driver table on the policy number. How many rows result, and what happens to the exposure if each vehicle row carries 1.0 vehicle-year?
>
> > [!answer]-
> > The vehicle table has $6{,}000 + 6{,}000 + 2{,}000 = 14{,}000$ rows and the driver table $6{,}000 + 6{,}000 + 3{,}000 = 15{,}000$. Within each policy, every vehicle is paired with every driver.
> > $$
> > \begin{align*}
> > \lvert V \bowtie D \rvert &= 6{,}000(1)(1) + 3{,}000(2)(2) + 1{,}000(2)(3) \\
> > &= 6{,}000 + 12{,}000 + 6{,}000 \\
> > &= 24{,}000
> > \end{align*}
> > $$
> > Summing exposure over the result gives 24,000 vehicle-years instead of 14,000. The join is many-to-many, because the policy number is not unique in either table. The fix is to choose the unit of observation first: for a vehicle-level model, either assign each vehicle its principal driver or summarize the drivers to the policy (for example, the youngest driver's age), so that each vehicle row matches at most one row.

> [!tip]- How it appears on the exam
> - **ATPA** asks candidates to explain the terminology and structure of relational databases and to use common keys between collections of data to merge information from multiple sources. A task can supply several related tables and ask for one modelling data set, with the join type chosen and the record counts checked.

> [!warning]- Exam traps
> - **One-to-many duplication:** Joining a one-to-many table repeats the fields of the "one" side on every matching row, so summing exposure or premium after the join overstates it. Aggregate the "many" side to the key first, or sum only fields that belong to the many side.
> - **An inner join drops records:** An inner join of claims onto policies removes every policy without a claim, which is most of a book, and a frequency computed afterwards is far too high. Use a left join from the table that defines the unit of observation.
> - **Orphans and key formats:** A foreign key with no matching primary key, or keys stored in different formats (`00123` against `123`, or trailing spaces), leaves rows unmatched without any error message. Count the unmatched rows on each side after every join.
> - **Null is not zero:** A left join gives null claim fields to a policy with no claims. They must be set to zero claims and zero losses before modelling, because software treats a null as missing and may drop the row.
