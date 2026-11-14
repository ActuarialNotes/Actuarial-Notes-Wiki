---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4e1a4d5d11301a50db0a7ddf6c1210249b6c337bc3d4a0b6a0fb47d39f69e149
  sources:
    - "PostgreSQL 17 Documentation, §11.1 index like a book index; system keeps it synchronized, adding overhead to data manipulation; planner uses it when more efficient than a sequential scan, sha256:b219b13fcf65d35c8e57807d74748dc57041a7275dc7e531c82d226df937208e — https://www.postgresql.org/docs/17/indexes-intro.html"
    - "PostgreSQL 17 Documentation, §11.2.1 B-tree default, equality and range on sortable data, sha256:e8a6dbd4c0f3eb97b50d916d4b9bc6fc38329b0827e015ce929f66a0f6fad3d5 — https://www.postgresql.org/docs/17/indexes-types.html"
    - "PostgreSQL 17 Documentation, §11.3 multicolumn index most efficient with constraints on leading (leftmost) columns, sha256:a65316abe78b1d29e58bf8da90e7993c967758a10c085cdd8deb168cf366aabf — https://www.postgresql.org/docs/17/indexes-multicolumn.html"
    - "PostgreSQL 17 Documentation, §11.7 index on an expression needed to index a function of a column, sha256:fd3493d2effa9046566d392567b4790e94614cd2d0e869034286bcf5b2568738 — https://www.postgresql.org/docs/17/indexes-expressional.html"
    - "PostgreSQL 17 Documentation, §11.12 selectivity decides whether an index beats a sequential scan, sha256:7953c0e55f8e7fe508d28151fb30629509f288a181d642b1255370563a3f4b8e — https://www.postgresql.org/docs/17/indexes-examine.html"
    - "PostgreSQL 17 Documentation, §5.5.4 primary key unique and not null, creates a unique B-tree index; a table has at most one primary key, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html"
    - "MySQL 8.4 Reference Manual §17.6.2.1 Clustered and Secondary Indexes, clustered index stores row data, typically the primary key; all other indexes are secondary indexes, sha256:542622d6a2ee72ee2b714af2d13dac62107187c3460678191300976e6935d3e1 — https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Database Index.md
---

A **Database Index** is a separate, sorted lookup structure built on one or more columns of a table, which stores each value of those columns with a pointer to the rows that hold it. A query that filters, joins or sorts on an indexed column can go straight to the matching rows instead of scanning the whole table, at the cost of extra storage and of updating the index every time the table changes.

An index changes how fast a query runs, never which rows it returns. SQL says what to retrieve, not how, and the database's query planner decides whether an index helps. In many systems, wrapping an indexed column in a function, as in `WHERE YEAR(acc_date) = 2024`, stops the planner from using an index on `acc_date`, while the equivalent range `acc_date >= '2024-01-01' AND acc_date < '2025-01-01'` can use it.

## Primary and secondary indexes

A table's indexes are of two kinds:

| | Primary index | Secondary index |
| :--- | :--- | :--- |
| Built on | The table's primary key | Any other column used to find rows |
| Values | Unique and non-null | May repeat |
| Number per table | One | Several |

The primary index is built on the table's primary key, such as the policy number in a policy table. It enforces that the key is unique and present. A table has one primary key and so one primary index, and in many systems the table's rows are stored in that index's order.

A secondary index is built on any other column used to find rows, such as the policy number in a claim table, the claim's accident date or the agent code. A secondary index allows repeated values, so an index on the policy number in a claim table is secondary, because one policy can have many claims. An index on two or more columns together, such as (policy number, term effective date), is a composite index that serves searches on its leading column or on its columns together.

## Rows read with and without an index

Without an index, a query scans all $n$ rows of the table to find those meeting a condition. Most relational databases store indexes as balanced trees (B-trees). If each page of a B-tree index points to $f$ pages below it, the number of levels, and so of page reads, needed to find a key is roughly

> $$h = \lceil \log_f n \rceil$$

The matching rows are then read through their pointers. A large fan-out $f$ is why even a table of millions of rows is searched in a handful of page reads.

> [!example]- How many reads does this query make with and without an index? {Example}
> A policy table holds 1,000,000 rows, and an underwriter's query asks for the row of one policy number. The B-tree index on policy number has pages that each point to 200 pages below them.
>
> > [!answer]-
> > - Without an index the database cannot know where the policy is, so it scans all 1,000,000 rows.
> > - Since $200^2 = 40{,}000$ and $200^3 = 8{,}000{,}000$, the B-tree needs $h = 3$ levels to reach any of the million keys.
> > - The index turns a million row reads into three page reads, plus one read of the matching row.

## Which columns to index

Indexes pay off on columns used in `WHERE` conditions and in [[Table Join|join]] keys, and on columns with many distinct values. A column with only a few values, such as a claim status of open, closed or reopened, returns a large share of the table for each value, and reading those rows is most of the work whether or not the index is used.

Every index takes storage, and every insert, update or delete must also change each index on the table, so indexes slow down loading and writing. A table that is read far more often than it is written, as an analytical table in a [[Data Warehouse|data warehouse]] is, benefits most. Indexing every column of a frequently loaded table can make the load the bottleneck.

> [!example]- What do this claim table's indexes cost, and which one adds the least value? {Example}
> A claim table of 2,000,000 rows has five indexes: on claim number, policy number, accident date, adjuster code and claim status. Each index entry takes about 20 bytes for its key and pointer, and every night 40,000 new claim rows are loaded.
>
> > [!answer]-
> > - Each index holds one entry per row, so one index takes $20 \times 2{,}000{,}000 = 40{,}000{,}000$ bytes, about 40 MB.
> > - Each new row is written to the table and to every index, so the load makes $40{,}000 \times (1 + 5) = 240{,}000$ writes, six times what it would make on an unindexed table.
> > - The claim status index adds the least value. With three values, a query for open claims returns a large share of the table, so the database gains little from the index and may scan the table anyway.
> > - The policy number index is the valuable one, because claims are joined to policies on it in nearly every analysis.

> [!trap] Thinking an index changes the result
> An answer saying that an index filters, sorts or deduplicates the data confuses the index with the query. The same query returns the same rows with or without the index.
