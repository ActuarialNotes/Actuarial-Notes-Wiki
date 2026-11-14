---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7dbe19305dded1558dde41e3cb7d329bd68c9e633309d73dafc8aed8c3c3b618
  sources:
    - "PostgreSQL 17 Documentation, §7.2.1.1 Joined Tables: CROSS JOIN N x M rows; INNER; LEFT OUTER (inner join then a row with nulls for each unmatched T1 row); RIGHT; FULL; ON vs WHERE restriction with outer joins, sha256:69486ac181f941b65eb886f28d243b950ba891431dee9efada046a430ae2a566 — https://www.postgresql.org/docs/17/queries-table-expressions.html"
    - "PostgreSQL 17 Documentation, §9.2 null = null yields null, sha256:7c49c06dfe1ddba8fa5e113dc4f0a3541e7e9534916aa0aaffb02f5da91030b2 — https://www.postgresql.org/docs/17/functions-comparison.html"
    - "PostgreSQL 17 Documentation, §5.5.5 foreign keys and referential integrity, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html"
    - "Wickham, Çetinkaya-Rundel & Grolemund, R for Data Science (2e), Ch.19 Joins, §19.2 primary and foreign keys; §19.3.1 mutating joins (left_join etc.); §19.3.3 filtering joins (anti_join); §19.4 row matching (many-to-many), sha256:27708095875a55fe556f715fa31bef17d6c0bfdf5b8f6b36d1c1cafdce46dd21 — https://r4ds.hadley.nz/joins.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Table Join.md
---
A **Table Join** combines two tables into one by pairing each row of the first with the rows of the second whose **join key** matches, under a join condition written in SQL's `ON` clause. It is the step that brings policy, claim, vehicle and driver data stored in separate tables of a [[Relational Database|relational database]] into one data set.

The join type decides what happens to rows that find no match. With $R$ the left table and $S$ the right table:

| Join type | Rows kept |
| :--- | :--- |
| Inner join | Matched pairs only |
| Left join | Every row of $R$, with nulls in $S$'s fields where there is no match |
| Right join | Every row of $S$, with nulls in $R$'s fields where there is no match |
| Full outer join | Every row of both, filling the missing side with null |

A right join is a left join with the tables swapped. A cross join has no condition and pairs every row with every row, giving $\lvert R \rvert \times \lvert S \rvert$ rows, which is rarely wanted and is what a forgotten condition produces.

If $n_R(k)$ and $n_S(k)$ count the rows of $R$ and $S$ that carry key value $k$, the number of rows of the inner join is

> $$I = \sum_{k} n_R(k)\, n_S(k)$$

> [!trap] Reading a left join as keeping the right table
> In `A LEFT JOIN B`, every row of A survives and B's fields may be null. Identify the left table from the order of the `FROM` clause before counting.

## Row counts of outer joins

Each unmatched row appears exactly once in an outer join that keeps its table, with nulls in the other table's fields. The number of rows of a left join is

> $$\lvert R \text{ LEFT JOIN } S \rvert = I + u_R$$

- $u_R$ is the number of rows of $R$ with no match in $S$.

The number of rows of a right join is

> $$\lvert R \text{ RIGHT JOIN } S \rvert = I + u_S$$

- $u_S$ is the number of rows of $S$ with no match in $R$.

The number of rows of a full outer join is

> $$\lvert R \text{ FULL JOIN } S \rvert = I + u_R + u_S$$

A condition on a right-table field in the `WHERE` clause, such as `WHERE c.paid > 0`, removes the rows where that field is null, which turns a left join into an inner join. Put such a condition in the `ON` clause to keep the unmatched rows.

> [!example]- With the policy table on the left, how many rows does each join type return? {Example}
> A policy table has 50,000 rows, one per policy. A claim table has 4,200 rows, one per claim. Of the claims, 60 cite policy numbers that are not in the policy table, and the other 4,140 belong to 3,550 different policies.
>
> > [!answer]-
> > - The policy number is unique in the policy table, so each matched claim pairs with exactly one policy and $I = 4{,}140$.
> > - The policies with no claim are the unmatched left rows, $u_R = 50{,}000 - 3{,}550 = 46{,}450$.
> > - The 60 orphan claims are the unmatched right rows, $u_S = 60$.
> > - The inner join returns 4,140 rows and the left join $4{,}140 + 46{,}450 = 50{,}590$.
> > - The right join returns $4{,}140 + 60 = 4{,}200$ rows, exactly the claims, which confirms that no claim was duplicated.
> > - The full outer join returns $4{,}140 + 46{,}450 + 60 = 50{,}650$ rows.
> > - The left join drops the 60 orphans and their losses, so they need investigating before any losses are summarized.

## Keys and cardinality

When the key is unique in one table, as a policy number is in the policy table, the join is one-to-many and each row of the other table matches at most once. A left join keeps every left row at least once, but a left row with three matches appears three times. So a left join returns exactly as many rows as the left table only when the key is unique on the right. When the key repeats in both tables the join is many-to-many and multiplies rows within each key value, which inflates any sum taken afterwards. [[Relational Database]] works through both cases with exposure.

## Orphan records and null keys

A row whose foreign key has no match, such as a claim citing a policy number that is not in the policy table, is an orphan. An inner join drops it without any message, and so does a left join from the policy table. Only a right or full outer join from the policy table keeps it. The orphans are found deliberately with an anti-join: a left join from the claims followed by `WHERE policy.policy_id IS NULL`.

A row whose key is null has no match even against another null, because null equals nothing in SQL. Such rows drop out of an inner join and come through an outer join unmatched, which can look like orphans.

## Join conditions beyond equality

A join condition can combine several columns or a range. A claim belongs to a policy term only when its accident date falls between that term's effective and expiration dates. Joining claims to a table with one row per policy term needs both the policy number and the date range in the `ON` clause.

> [!example]- How many rows does this join give for policy 501, and what condition fixes it? {Example}
> A policy table has one row per annual term. Policy 501 has a 2024 term (effective 2024-03-01, expiring 2025-03-01) and a 2025 term (effective 2025-03-01, expiring 2026-03-01). The claim table holds claim K1 on policy 501 with accident date 2024-11-14 and claim K2 on policy 501 with accident date 2025-06-30. An analyst writes:
>
> ```sql
> SELECT t.policy_id, t.eff_date, c.claim_id
> FROM policy_term t
> LEFT JOIN claim c ON t.policy_id = c.policy_id
> ```
>
> > [!answer]-
> > - Policy 501 has 2 term rows and 2 claim rows with the same key, so the join pairs every term with every claim.
> > - The join gives $2 \times 2 = 4$ rows for policy 501.
> > - Each term now shows both claims, so a count by term gives 2 claims in each year when there was one, and the 2025 term carries a claim from before it began.
> > - The fix adds the accident date to the condition: `AND c.acc_date >= t.eff_date AND c.acc_date < t.exp_date`.
> > - Now K1 matches only the 2024 term and K2 only the 2025 term, and the join gives 2 rows.
> > - The upper bound must be strictly less than the expiration date, because a claim on 2025-03-01 would otherwise match both terms.

## The unit of observation

The unit of observation is what each row of the analysis data set represents, such as a policy term. The table whose rows are those units goes on the left of a left join, so that none of them is lost. For a claim [[Frequency|frequency]] data set that table is the policy or exposure table, because a policy with no claims is an observation with zero claims, not a missing one. This choice is part of [[Data Preparation|data preparation]], and the result should be [[Tidy Data|tidy]].

After such a join, a policy with no claims has one row with null claim fields. `COUNT(*)` counts every row and gives that policy 1. `COUNT(c.claim_id)` counts only the rows where the field is not null and gives it the correct 0.
