---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:2164b4264bada773b871ad1a418d9c584f0589bf99aa51b2d26580c42f2f76a9
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 70-71 (PDF pp. 82-83), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam 5 Fall 2019 — sample answers and examiner's report, Q2(d), report pp.36-37, sha256:51609658f7f72676944585c38f8eb3bbb52fcdafc58070de5524051435100df0 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f19-5.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/In-Force.md
---

![[Media/Figures/In-Force.svg|340]]

**In-Force** describes a policy that is providing coverage at a given date: its effective date is on or before the date, and it has neither expired nor been cancelled. In-force premium and exposures are a snapshot at that date, where [[Written Premium|written]] and [[Earned Premium|earned]] premium and exposures are measured over a period. The in-force premium at a date is

> $$\text{In-Force Premium} = \sum \text{Full-Term Premium}$$

- $\text{Full-Term Premium}$ is the premium for the whole term of each policy in force at the date, at its own term.

The in-force exposures at a date are the number of insured units exposed to loss then, with no regard to the duration of the exposure. Most companies count items exposed to loss, so a policy insuring three cars is three in-force exposures. Others count policies, or written exposures.

> [!example]- At 6/30/2024, an auto book has policy A (1/1/2024 to 12/31/2024, $\$1{,}200$), policy B (3/1/2024 to 2/28/2025, $\$900$), policy C (7/1/2024 to 6/30/2025, $\$1{,}000$) and policy D (4/1/2024 to 9/30/2024, a six-month policy for $\$500$). What are its in-force policy count and in-force premium? {Example}
> - Policies A, B and D took effect before 6/30/2024 and have not expired, so they are in force.
> - Policy C takes effect on 7/1/2024, so it is not in force on 6/30/2024, although it is written in 2024.
> - The in-force count is 3.
> - Each policy in force contributes its full-term premium, D its six-month $\$500$. The in-force premium is $1{,}200 + 900 + 500 = \$2{,}600$.

## Mid-term changes

A mid-term change replaces the full-term premium of the policy from the date of the change. The in-force premium at any date is the full-term premium applicable on that date, while the written and earned premium are split by the time the policy spends under each premium.

> [!example]- An annual policy runs from 7/1/2011 to 6/30/2012 at a full-term premium of $\$400$. On 1/1/2012 a change raises its full-term premium to $\$800$. What is its in-force premium before and after the change, and what will the policyholder pay? {Example}
> - From 7/1/2011 to 12/31/2011, the in-force premium is the full-term premium then applicable, $\$400$.
> - From 1/1/2012 to 6/30/2012, the in-force premium is $\$800$.
> - Half the term is at each premium, so the policyholder pays $400 \times 0.5 + 800 \times 0.5 = \$600$.

## Policy terms other than annual

In-force premium counts each policy's own full-term premium, so books written on different terms are not directly comparable. If two insurers write the same written premium, one on annual policies and one on semi-annual policies, the semi-annual insurer's in-force premium is half the other's. A six-month policy is one-half of a written car-year, so its premium per car-year is its six-month premium times 2.

## Uses of in-force data

In-force premium is the best estimate of the company's [[Mix of Business|mix of business]] at a date. The most recent in-force premium is often used to measure the impact of a rate change on the existing portfolio of customers. When earned premium is not available at the level needed, such as by territory, in-force premium by territory may be used to estimate it. Successive in-force snapshots also separate the growth of a book into a change in the number of policies and a change in average premium. The [[Lifetime Value|retention ratio]] is measured on the in-force book: the policies renewed divided by the potential renewal policies.

> [!example]- A homeowners book had 40,000 policies in force with $\$52{,}000{,}000$ of in-force premium at 12/31/2023, and 42,000 policies with $\$58{,}800{,}000$ at 12/31/2024. How much of the premium growth is policy count and how much is average premium? {Example}
> - The average premium per policy in force is $52{,}000{,}000/40{,}000 = \$1{,}300$ in 2023 and $58{,}800{,}000/42{,}000 = \$1{,}400$ in 2024.
> - The policy count grew $42{,}000/40{,}000 - 1 = 5.0\%$.
> - The average premium grew $1{,}400/1{,}300 - 1 = 7.7\%$.
> - Together they give $1.050 \times 1.077 = 1.131$, the 13.1% growth in in-force premium.

> [!trap] Reading average premium growth as rate
> The 7.7% growth in average premium above is rate changes together with changes in the mix of business, such as higher amounts of insurance ([[Premium Trend|premium trend]]). Only after the premium is restated at current rate level does the change in average premium measure the change in mix.
