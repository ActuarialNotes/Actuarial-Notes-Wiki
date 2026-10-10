---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f388b0aca4e871eb36f79553af5f4a5d6624b7d2d6d47922492f2f3b67c3692e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table Join.md
---

A **Table Join** combines two tables into one by pairing each row of the first with the rows of the second whose **join key** matches, under a join condition written in SQL's `ON` clause. The join type decides what happens to rows that find no match: an inner join drops them, a left or right join keeps those of one table, and a full outer join keeps those of both, filling the missing side with null. It is the step that brings policy, claim, vehicle and driver data stored in separate tables of a [[Relational Database|relational database]] into one data set.

> $$I = \sum_{k} n_R(k)\, n_S(k)$$

> $$\lvert R \text{ LEFT JOIN } S \rvert = I + u_R$$

> $$\lvert R \text{ RIGHT JOIN } S \rvert = I + u_S$$

> $$\lvert R \text{ FULL JOIN } S \rvert = I + u_R + u_S$$

- **Symbols:** $R$ is the left table and $S$ the right table, $n_R(k)$ and $n_S(k)$ count the rows of each that carry key value $k$, and $I$ is the number of rows of the inner join. $u_R$ is the number of rows of $R$ with no match in $S$, and $u_S$ the number of rows of $S$ with no match in $R$. Each unmatched row appears exactly once in an outer join that keeps its table, with nulls in the other table's fields.
- **The four types:** An inner join keeps only matched pairs. A left join keeps every row of the left table, a right join keeps every row of the right table and is a left join with the tables swapped, and a full outer join keeps every row of both. A cross join has no condition and pairs every row with every row, giving $\lvert R \rvert \times \lvert S \rvert$ rows, which is rarely wanted and is what a forgotten condition produces.
- **Keys and cardinality:** When the key is unique in one table, as a policy number is in the policy table, the join is one-to-many and each row of the other table matches at most once. When the key repeats in both tables the join is many-to-many and multiplies rows within each key value, which inflates any sum taken afterwards. [[Relational Database]] works through both cases with exposure.
- **Orphan records:** A row whose foreign key has no match, such as a claim citing a policy number that is not in the policy table, is an orphan. An inner join drops it without any message, so the orphans are found deliberately with an anti-join: a left join from the claims followed by `WHERE policy.policy_id IS NULL`.
- **Conditions beyond equality:** A join condition can combine several columns or a range. A claim belongs to a policy term only when its accident date falls between that term's effective and expiration dates, so joining claims to a table with one row per policy term needs both the policy number and the date range in the `ON` clause.
- **The unit of observation decides the type:** The table whose rows are the units being studied goes on the left of a left join, so that none of them is lost. For a claim [[Frequency|frequency]] data set that table is the policy or exposure table, because a policy with no claims is an observation with zero claims, not a missing one. This choice is part of [[Data Preparation|data preparation]] and the result should be [[Tidy Data|tidy]].

> [!example]- Joining Claims to the Right Policy Term {Example}
> A policy table has one row per annual term. Policy 501 has a 2024 term (effective 2024-03-01, expiring 2025-03-01) and a 2025 term (effective 2025-03-01, expiring 2026-03-01), with exposure 1.0 each. The claim table holds claim K1 on policy 501 with accident date 2024-11-14 and claim K2 on policy 501 with accident date 2025-06-30. An analyst writes:
>
> ```sql
> SELECT t.policy_id, t.eff_date, c.claim_id
> FROM policy_term t
> LEFT JOIN claim c ON t.policy_id = c.policy_id
> ```
>
> How many rows does this give for policy 501, what goes wrong, and what condition fixes it?
>
> > [!answer]-
> > Policy 501 has 2 term rows and 2 claim rows with the same key, so the join pairs every term with every claim.
> > $$
> > \begin{align*}
> > I_{501} &= n_R(501)\, n_S(501) \\
> > &= 2 \times 2 \\
> > &= 4
> > \end{align*}
> > $$
> > Each term now shows both claims, so a count by term gives 2 claims in each year when there was one, and the 2025 term carries a claim from before it began. The fix is to add the accident date to the condition:
> >
> > ```sql
> > ON t.policy_id = c.policy_id
> > AND c.acc_date >= t.eff_date
> > AND c.acc_date < t.exp_date
> > ```
> >
> > Now K1 matches only the 2024 term and K2 only the 2025 term, and the join gives 2 rows. Writing the upper bound as strictly less than the expiration date matters, because a claim on 2025-03-01 would otherwise match both terms.

> [!example]- Counting Rows Under Each Join Type {Example}
> A policy table has 50,000 rows, one per policy. A claim table has 4,200 rows, one per claim. Of the claims, 60 cite policy numbers that are not in the policy table, and the other 4,140 belong to 3,550 different policies. With the policy table on the left, how many rows does each join type return, and what checks follow?
>
> > [!answer]-
> > The policy number is unique in the policy table, so each matched claim pairs with exactly one policy and the inner join has one row per matched claim. The policies with no claim are the unmatched left rows, and the 60 orphans are the unmatched right rows.
> > $$
> > \begin{align*}
> > I &= 4{,}140 \\
> > u_R &= 50{,}000 - 3{,}550 \\
> > &= 46{,}450 \\
> > u_S &= 60
> > \end{align*}
> > $$
> > The inner join returns 4,140 rows, the left join $4{,}140 + 46{,}450 = 50{,}590$, the right join $4{,}140 + 60 = 4{,}200$ and the full outer join $4{,}140 + 46{,}450 + 60 = 50{,}650$. The right join returning exactly the 4,200 claims confirms that no claim was duplicated, which is what a unique policy key guarantees. The 60 orphans need to be investigated before any losses are summarized, since the left join used to build a policy-level data set drops them and their losses with them.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Topic 3, Preparing Data for Analysis, covers joining data tables. Application questions give two small tables and a join type and ask which rows the result contains, how many rows it has, or which fields are null. Others describe an analysis, such as a claim frequency study, and ask which join type keeps the right records.
> - **DISC-DA:** Topic 9 builds claims and underwriting modelling data sets, where a join is one step of several. A question can ask why the record count changed after a join, which points to duplicated keys, orphan records or the wrong join type.

> [!warning]- Exam traps
> - **Left and right are about position:** In `A LEFT JOIN B`, every row of A survives and B's fields may be null. Reading it as keeping B's rows reverses the answer, so identify the left table from the order of the `FROM` clause before counting.
> - **Null keys never match:** A row whose key is null has no match even against another null, because null equals nothing in SQL. Such rows drop out of an inner join and come through an outer join unmatched, which can look like orphans.
> - **A left join can still add rows:** A left join keeps every left row at least once, but a left row with three matches appears three times. The left join returns exactly as many rows as the left table only when the key is unique on the right.
> - **A filter on the right table undoes a left join:** Putting a condition on a right-table field in the `WHERE` clause, such as `WHERE c.paid > 0`, removes the rows where that field is null, which turns the left join into an inner join. Put such a condition in the `ON` clause to keep the unmatched rows.
