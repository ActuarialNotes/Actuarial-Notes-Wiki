---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4d7fb678862559010c2180d006bbbe4c43f1742351091c6afc69bd851ef47ba2
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Resources/Data/Complete Life Table, Canada (Statistics Canada).md"
---

# Complete Life Table, Canada (Statistics Canada)

Statistics Canada's **Table 13-10-0114-01**, *Life expectancy and other elements of the complete life table, three-year estimates*, for Canada and the provinces. The edition read here is the latest three-year estimate, **2022–2024**, for Canada: single years of age from 0 to 110 and over, for both sexes, males and females.

> [!info] In Actuarial Tools
> The **Life Table** data source reads this table: $q_x$, $l_x$ and $e_x$ at each age, and ${}_tp_x = l_{x+t}/l_x$ between two ages. See [[Life Table]] and [[Mortality]].

## Elements read

- Death probability between age $x$ and $x+1$ ($q_x$)
- Number of survivors at age $x$ ($l_x$)
- Life expectancy (in years) at age $x$ ($e_x$)

The table also publishes $d_x$, $L_x$, $T_x$ and the margins of error of $q_x$ and $e_x$, which the tool does not read.

## Licence

Statistics Canada Open Licence: <https://www.statcan.gc.ca/en/reference/licence>.

## Sources

- Table page: <https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1310011401>
- Table 13-10-0114-01, Life expectancy and other elements of the complete life table, three-year estimates — <https://www150.statcan.gc.ca/n1/tbl/csv/13100114-eng.zip> (read 2026-10-10, sha256 `d6ef90d21f55ea7d…`)
