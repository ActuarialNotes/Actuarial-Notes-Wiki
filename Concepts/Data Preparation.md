---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:172d9f9899debeac6ca5587f2f0e10d240ede54bcc3f2aa4102fbe030831b7b8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Preparation.md
---

**Data Preparation** is the work of turning raw source tables into a data set ready for analysis or modelling: selecting the records and fields needed, cleaning them, transforming them and creating features, aggregating them to the unit of observation, and joining them into one table. For an insurance model the result has one row per unit of observation, such as a policy term or a claim, holding the target, the predictors and the exposure. In practice most of it is written as SQL queries against a [[Relational Database|relational database]] or a [[Data Warehouse|data warehouse]].

> $$e_i = \frac{\min\left(t_i^{\text{exp}},\ t^{\text{eval}}\right) - t_i^{\text{eff}}}{365}$$

> $$N_i = \sum_{j} \mathbf{1}\left\{p_j = i,\ t_i^{\text{eff}} \le a_j < \min\left(t_i^{\text{exp}},\ t^{\text{eval}}\right)\right\}$$

> $$\hat{\lambda} = \frac{\sum_i N_i}{\sum_i e_i}$$

- **Symbols:** Row $i$ is a policy term with effective date $t_i^{\text{eff}}$ and expiration date $t_i^{\text{exp}}$, and $t^{\text{eval}}$ is the date the data are cut off. $e_i$ is the term's [[Earned Exposure|earned exposure]] in years, and $N_i$ counts the distinct claims $j$ whose policy $p_j$ is term $i$ and whose accident date $a_j$ falls within the earned part of the term. $\hat{\lambda}$ is the claim [[Frequency|frequency]] per unit of exposure. Days are counted with the end date excluded and a 365-day year.
- **Select:** Keep the records in scope, such as one line of business and the experience period, and only the fields the analysis needs. Records excluded at this step must be excluded for a reason that is written down, because a filter such as "policies in force today" quietly drops every policy that lapsed and biases the data.
- **Clean:** Remove duplicate records, find impossible or inconsistent values, such as a negative exposure or an accident date outside every policy term, and decide how to treat [[Missing Data|missing data]]. Cleaning fixes or flags problems; it does not delete inconvenient records without recording why. The [[Data Issues|common data issues]] and [[Data Quality|data quality]] principles set out what to look for.
- **Transform and create features:** Convert fields to usable forms and derive new ones, such as driver age from date of birth at the term's effective date, age bands, vehicle age, or a prior-claims count from the claim history before the term began. A [[User-Defined Function|user-defined function]] keeps a rule like the age bands identical everywhere it is used, and [[Feature Engineering|feature engineering]] covers the choices involved.
- **Aggregate, then join:** Summarize the "many" side to the unit of observation before joining it, such as counting claims and summing losses by policy term. Then [[Table Join|left join]] the summary onto the table that defines the units, so units with no claims stay in with a count of zero rather than dropping out.
- **Exposure alignment:** Each claim must be matched to the term in force on its accident date, and exposure must be earned only up to the evaluation date, as in the formulas above. A claim counted in a term whose exposure is not, or the other way round, biases every frequency computed from the data.
- **Validate:** After each step, check row counts and totals against the sources, such as the number of policy terms, the total earned exposure and the number of valid claims. These checks are part of [[Data Validation|testing data]], and the finished data set should be [[Tidy Data|tidy]], one row per observation and one column per variable, the end product of a [[Data Pipeline|data pipeline]].

> [!example]- From Raw Tables to a Frequency Data Set {Example}
> Data are evaluated at 2025-12-31, so earning stops at 2026-01-01. The policy term table holds:
>
> | policy | eff_date | exp_date |
> | :--- | :--- | :--- |
> | P1 | 2025-01-01 | 2026-01-01 |
> | P2 | 2025-04-01 | 2026-04-01 |
> | P3 | 2025-01-01 | 2025-07-01 |
> | P4 | 2025-07-01 | 2026-07-01 |
>
> The claim transaction table has one row per transaction: claim C1 on P1 (accident 2025-03-10) appears twice, for its reserve and its payment; C3 on P2 has accident date 2025-02-15; C4 on P3 has accident date 2025-05-20; C5 on P4 has accident date 2025-11-02; and C6 cites policy P9. Build the frequency data set.
>
> > [!answer]-
> > Count distinct claims, not transaction rows, and count only accidents inside the earned part of the term, in one aggregation by term that is then joined onto the terms. In MySQL-style SQL:
> >
> > ```sql
> > SELECT t.policy, t.eff_date, COALESCE(c.n, 0) AS claims,
> >        DATEDIFF(LEAST(t.exp_date, '2026-01-01'), t.eff_date) / 365 AS expo
> > FROM policy_term t
> > LEFT JOIN (
> >   SELECT p.policy, p.eff_date, COUNT(DISTINCT k.claim_id) AS n
> >   FROM claim_txn k JOIN policy_term p ON k.policy = p.policy
> >    AND k.acc_date >= p.eff_date
> >    AND k.acc_date < LEAST(p.exp_date, '2026-01-01')
> >   GROUP BY p.policy, p.eff_date
> > ) c ON t.policy = c.policy AND t.eff_date = c.eff_date
> > ```
> >
> > C1 counts once for P1. C3's accident precedes P2's term, so it belongs to an earlier term that is not in the extract and is listed for investigation. C6 is an orphan with no policy, and is also listed. The exposures are
> > $$
> > \begin{align*}
> > e_{P2} &= \frac{275}{365} \\
> > &= 0.7534 \\
> > e_{P3} &= \frac{181}{365} \\
> > &= 0.4959 \\
> > e_{P4} &= \frac{184}{365} \\
> > &= 0.5041
> > \end{align*}
> > $$
> > with $e_{P1} = 1.0000$. The data set has four rows: P1 with 1 claim and 1.0000, P2 with 0 claims and 0.7534, P3 with 1 claim and 0.4959, and P4 with 1 claim and 0.5041, for 3 claims on 2.7534 car-years. P2 is kept with a zero, which is what the left join and `COALESCE` are for.

> [!example]- Reconciling a Finished Data Set {Example}
> A policy term table has 120,000 terms with 96,300 car-years of earned exposure. The claim table has 9,850 transaction rows for 9,200 distinct claims, of which 40 are orphans and 75 have accident dates outside every term. An analyst's finished data set has 120,600 rows and 96,780 car-years. What went wrong, and how far off is the frequency?
>
> > [!answer]-
> > The finished data set should have one row per term, 96,300 car-years and the valid claims.
> > $$
> > \begin{align*}
> > \text{Valid claims} &= 9{,}200 - 40 - 75 \\
> > &= 9{,}085 \\
> > \hat{\lambda} &= \frac{9{,}085}{96{,}300} \\
> > &= 0.09434 \\
> > \hat{\lambda}_{\text{analyst}} &= \frac{9{,}085}{96{,}780} \\
> > &= 0.09387
> > \end{align*}
> > $$
> > The 600 extra rows show that claims were joined at claim level instead of being aggregated first: each term with two or more claims was repeated once per extra claim, and its exposure with it, adding 480 car-years. The frequency is understated by about 0.5%, small enough to pass unnoticed. A check of the row count against the 120,000 terms after the join would have caught it.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Topic 9 covers preparing data for insurance applications using SQL, then creating data sets for claims models and for underwriting models ([[Claims Modeling Dataset]], [[Underwriting Modeling Dataset]]). Application questions describe raw tables and a model's purpose and ask which step comes next, what the unit of observation should be, or which query produces the needed data set.
> - **DISC-DA:** Questions draw on the tools of Topic 3, such as joins, null values and functions, and on the data issues of Topic 4. A typical question gives a symptom, such as too many rows or a frequency that looks too low, and asks for the preparation error that caused it.

> [!warning]- Exam traps
> - **Joining before aggregating:** Joining a claim-level table to policy terms repeats each term once per claim, inflating rows and exposure. Aggregate claims to the term first, as the second example shows.
> - **Inner join drops the zeros:** An inner join of claims onto terms removes every claim-free term, so the frequency computed afterwards is roughly the number of claims divided by the exposure of the terms that had them. The left join from the terms keeps them.
> - **Transactions are not claims:** A claim transaction table has a row for each payment and reserve change. Counting rows instead of distinct claim numbers overstates the claim count.
> - **Exposure and claims on the same basis:** Exposure earned only to the evaluation date must be paired with claims occurring by that date. Counting full-term exposure for a policy still in force, or a claim outside the term, misaligns the numerator and denominator.
> - **Features from the future:** A predictor must use only information available at the start of the term. A prior-claims count that includes claims during the term itself leaks the target into the model and makes it look better than it is.
