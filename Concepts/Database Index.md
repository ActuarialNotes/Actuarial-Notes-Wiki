---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5a608677531dbe8ad247de5d573f2e9035548c8f00882be7e0c46261aaeae30b
  sources:
    - "PostgreSQL 17 Documentation, §11.1 index like a book index; system keeps it synchronized, adding overhead to data manipulation; planner uses it when more efficient than a sequential scan, sha256:b219b13fcf65d35c8e57807d74748dc57041a7275dc7e531c82d226df937208e — https://www.postgresql.org/docs/17/indexes-intro.html"
    - "PostgreSQL 17 Documentation, §11.2.1 B-tree default, equality and range on sortable data, sha256:e8a6dbd4c0f3eb97b50d916d4b9bc6fc38329b0827e015ce929f66a0f6fad3d5 — https://www.postgresql.org/docs/17/indexes-types.html"
    - "PostgreSQL 17 Documentation, §11.3 multicolumn index most efficient with constraints on leading (leftmost) columns, sha256:a65316abe78b1d29e58bf8da90e7993c967758a10c085cdd8deb168cf366aabf — https://www.postgresql.org/docs/17/indexes-multicolumn.html"
    - "PostgreSQL 17 Documentation, §11.7 index on an expression needed to index a function of a column, sha256:fd3493d2effa9046566d392567b4790e94614cd2d0e869034286bcf5b2568738 — https://www.postgresql.org/docs/17/indexes-expressional.html"
    - "PostgreSQL 17 Documentation, §11.13 selectivity decides whether an index beats a sequential scan, sha256:7953c0e55f8e7fe508d28151fb30629509f288a181d642b1255370563a3f4b8e — https://www.postgresql.org/docs/17/indexes-examine.html"
    - "PostgreSQL 17 Documentation, §5.5.4 primary key unique and not null, creates a unique B-tree index; a table has at most one primary key, sha256:f3797f1e000c84ee57bcb411cbffa458be90b2adb69889d243abfa090b0b8224 — https://www.postgresql.org/docs/17/ddl-constraints.html"
    - "MySQL 8.4 Reference Manual §17.6.2.1 Clustered and Secondary Indexes, clustered index stores row data, typically the primary key; all other indexes are secondary indexes, sha256:542622d6a2ee72ee2b714af2d13dac62107187c3460678191300976e6935d3e1 — https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Database Index.md
---

A **Database Index** is a separate, sorted lookup structure built on one or more columns of a table, which stores each value of those columns with a pointer to the rows that hold it. A query that filters, joins or sorts on an indexed column can go straight to the matching rows instead of scanning the whole table, at the cost of extra storage and of updating the index every time the table changes.

> $$C_{\text{scan}} = n$$

> $$C_{\text{binary}} = \lceil \log_2 (n + 1) \rceil$$

> $$h = \lceil \log_f n \rceil$$

- **Symbols:** $n$ is the number of rows in the table. A full table scan reads all $n$ rows to find those meeting a condition, so $C_{\text{scan}}$ is the number of rows examined without an index. $C_{\text{binary}}$ is the most comparisons a binary search of a sorted list of $n$ keys needs, and $h$ is roughly the number of levels, and so of page reads, in a B-tree index whose pages each point to $f$ pages below them. The matching rows are then read through their pointers.
- **How it works:** An index is like the index of a book: the keys are kept in order, so the search halves or narrows the candidates at each step instead of reading every row. Most relational databases store indexes as balanced trees with a large fan-out, which is why even a table of millions of rows is searched in a handful of page reads.
- **Primary index:** The primary index is built on the table's primary key, such as the policy number in a policy table. It enforces that the key is unique and present. A table has one primary key and so one primary index, and in many systems the table's rows are stored in that index's order.
- **Secondary index:** A secondary index is built on any other column used to find rows, such as the policy number in a claim table, the claim's accident date or the agent code. A table can have several, and an index on two or more columns together, such as (policy number, term effective date), is a composite index that serves searches on its leading column or on its columns together.
- **The trade-off:** Every index takes storage, and every insert, update or delete must also change each index on the table, so indexes slow down loading and writing. A table that is read far more often than it is written, as an analytical table in a [[Data Warehouse|data warehouse]] is, benefits most.
- **Which columns to index:** Indexes pay off on columns used in `WHERE` conditions and in [[Table Join|join]] keys, and on columns with many distinct values. A column with only a few values, such as a claim status of open, closed or reopened, returns a large share of the table for each value, and reading those rows is most of the work whether or not the index is used.
- **Index use is decided by the database:** SQL says what to retrieve, not how, and the database's query planner decides whether an index helps. In many systems, wrapping an indexed column in a function, as in `WHERE YEAR(acc_date) = 2024`, stops the planner from using an index on `acc_date`, while the equivalent range `acc_date >= '2024-01-01' AND acc_date < '2025-01-01'` can use it.

> [!example]- Finding One Policy With and Without an Index {Example}
> A policy table holds 1,000,000 rows, and an underwriter's query asks for the row of one policy number. Compare the rows examined with no index, the comparisons a binary search of a sorted index needs, and the levels of a B-tree index whose pages each point to 200 pages below them.
>
> > [!answer]-
> > Without an index the database cannot know where the policy is, so it scans every row.
> > $$
> > \begin{align*}
> > C_{\text{scan}} &= 1{,}000{,}000 \\
> > C_{\text{binary}} &= \lceil \log_2 (1{,}000{,}001) \rceil \\
> > &= 20 \\
> > h &= \lceil \log_{200} 1{,}000{,}000 \rceil \\
> > &= 3
> > \end{align*}
> > $$
> > Since $200^2 = 40{,}000$ and $200^3 = 8{,}000{,}000$, three levels are enough to reach any of the million keys. The index turns a million row reads into about 20 comparisons, or three page reads in a B-tree, plus one read of the matching row. The saving grows with the table: doubling the table doubles the scan but adds only one comparison to the binary search.

> [!example]- The Cost of Indexing a Claim Table {Example}
> A claim table of 2,000,000 rows has five indexes: on claim number, policy number, accident date, adjuster code and claim status. Each index entry takes about 20 bytes for its key and pointer, and every night 40,000 new claim rows are loaded. Find the storage taken by one index and the number of writes the nightly load makes. Which index adds the least value?
>
> > [!answer]-
> > Each index holds one entry per row, and each new row is written to the table and to every index.
> > $$
> > \begin{align*}
> > \text{Storage per index} &= 20 \times 2{,}000{,}000 \\
> > &= 40{,}000{,}000 \text{ bytes} \\
> > \text{Writes per load} &= 40{,}000 \times (1 + 5) \\
> > &= 240{,}000
> > \end{align*}
> > $$
> > Each index takes about 40 MB, and the load makes six times the 40,000 writes it would make on an unindexed table. The claim status index adds the least value. With three values, a query for open claims returns a large share of the table, so the database gains little from the index and may scan the table anyway. The policy number index is the valuable one, because claims are joined to policies on it in nearly every analysis.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Topic 3 covers indexes together with null values and user-defined functions. Application questions describe a slow query or a table design and ask which column an index should be built on, or what a primary index is compared with a secondary index.
> - **DISC-DA:** A question can also set out the trade-off, asking what an analyst gives up by indexing every column of a table that is loaded daily. The answer is storage and slower inserts and updates.

> [!warning]- Exam traps
> - **An index does not change the result:** An index changes how fast a query runs, never which rows it returns. An answer saying that an index filters, sorts or deduplicates the data confuses the index with the query.
> - **More indexes are not always better:** Each index speeds reads on its own columns but slows every write to the table. Indexing every column of a frequently loaded table can make the load the bottleneck.
> - **A primary key is not just any indexed column:** The primary index requires a unique, non-null key. A secondary index allows repeated values, so an index on the policy number in a claim table is secondary, because one policy can have many claims.
> - **Low-cardinality columns gain little:** An index on a column with few distinct values, such as a yes-or-no flag, still leaves a large share of the table to read for each value. The benefit depends on how few rows a condition selects, not on the column being indexed.
