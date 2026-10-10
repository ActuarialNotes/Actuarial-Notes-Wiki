---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eddcebbeada408b6c78bbc8364ab4c381d72834434822a1265f3f66204077769
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Data/United States Life Tables (NCHS).md
---

# United States Life Tables (NCHS)

The **United States Life Tables** are published by the National Center for Health Statistics (CDC) in its *National Vital Statistics Reports*. The edition read here is **United States Life Tables, 2024** (NVSR volume 75, number 5): complete period life tables by single year of age, from 0 to 100 and over, for the total population, males and females.

> [!info] In Actuarial Tools
> The **Life Table** data source reads this table: $q_x$, $l_x$ and $e_x$ at each age, and ${}_tp_x = l_{x+t}/l_x$ between two ages. See [[Life Table]] and [[Mortality]].

## What each table holds

- Age (years): single years from 0–1 to 99–100, then 100 and over
- $q_x$: probability of dying between ages $x$ and $x+1$
- $l_x$: number surviving to age $x$, of 100,000 born
- $d_x$: number dying between ages $x$ and $x+1$
- $L_x$: person-years lived between ages $x$ and $x+1$
- $T_x$: total person-years lived above age $x$
- $e_x$: expectation of life at age $x$

The tool reads $q_x$, $l_x$ and $e_x$ from Tables 1 (total population), 2 (males) and 3 (females).

## Licence

A work of the US federal government, in the public domain.

## Sources

- Report: <https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-05.pdf>
- Table 1. Life table for the total population: United States, 2024 — <https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/75-05/Table01.xlsx> (read 2026-10-10, sha256 `d9ce558840343366…`)
- Table 2. Life table for males: United States, 2024 — <https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/75-05/Table02.xlsx> (read 2026-10-10, sha256 `f7908e92f47f6250…`)
- Table 3. Life table for females: United States, 2024 — <https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Publications/NVSR/75-05/Table03.xlsx> (read 2026-10-10, sha256 `3024d85dc0566dfa…`)
