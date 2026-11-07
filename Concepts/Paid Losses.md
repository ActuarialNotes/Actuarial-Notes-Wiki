---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:05a08d6f736b0bc989acc90203799c0fccd1c00868bf8fe33eed1ba820a04ad5
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Ch.1 p.15 (PDF 21); Ch.3 data types (PDF 37-44); Ch.6 pp.68-69 (PDF 74-75); Ch.7 pp.98-104 (PDF 104-110); Ch.13 pp.283-288 (PDF 289-294), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Paid Losses.md
---

![[Media/Figures/Paid_Losses.svg|340]]

**Paid Losses**, or paid claims, are the cumulative payments made on claims through a valuation date: the sum of every payment made on or before it. They are the one claim figure that contains no estimate. Paid claims and [[Case Reserves|case outstanding]] together are the [[Incurred Losses|reported claims]], so

> $$\text{Paid Claims} = \text{Reported Claims} - \text{Case Outstanding}$$

- $\text{Reported Claims}$ are the cumulative paid claims plus the case outstanding at the valuation date.
- $\text{Case Outstanding}$ is the total of the case reserves on reported claims at the valuation date.

A paid triangle can therefore be built from the reported and case outstanding triangles, cell by cell. Over a period, the incremental reported claims are the incremental paid claims plus the change in case outstanding. The [[Unpaid Claims|unpaid claims]] are ultimate claims minus paid claims.

> [!example]- An accident year has $\$4{,}300{,}000$ of reported claims and $\$1{,}900{,}000$ of case outstanding at 24 months, and its ultimate claims are $\$5{,}000{,}000$. What are its paid claims and its unpaid claims? {Example}
> - The paid claims are $4{,}300{,}000 - 1{,}900{,}000 = \$2{,}400{,}000$.
> - The unpaid claims are $5{,}000{,}000 - 2{,}400{,}000 = \$2{,}600{,}000$.
> - They are the $\$1{,}900{,}000$ of case outstanding plus $\$700{,}000$ of IBNR.

## Paid claim development

The paid development technique projects ultimate claims from the latest paid claims, so

> $$\text{Ultimate Claims} = \text{Paid Claims} \times \text{CDF}_{n \to \text{ult}}$$

- $\text{CDF}_{n \to \text{ult}}$ is the paid [[Cumulative Development Factor|cumulative development factor]] from the accident year's age $n$ to ultimate.

The share paid at age $n$ is $1/\text{CDF}_{n \to \text{ult}}$, so paid claims are also the ultimate claims times the share paid. Paid claims lag reported claims, so the paid CDF is larger than the reported CDF at the same age, and the share paid is smaller than the share reported.

> [!example]- A liability line is 55% reported and 20% paid at 12 months. Its 12-month figures for one accident year are each overstated by $\$100{,}000$ because one large claim was reserved and paid early. How far does each development estimate of ultimate claims move? {Example}
> - The reported CDF at 12 months is $1/0.55 = 1.818$, and the paid CDF is $1/0.20 = 5.000$.
> - The reported estimate moves by $100{,}000 \times 1.818 = \$181{,}800$.
> - The paid estimate moves by $100{,}000 \times 5.000 = \$500{,}000$, nearly three times as much.

## Case adequacy and settlement rate

Paid development uses paid claims only, so it is not affected by a change in [[Case Adequacy|case adequacy]]. It can be used in place of reported development when case reserving practices have changed. It does assume that the speed of claim settlement is stable. When claims settle faster, the paid claims on the latest diagonal are further along than the history, and applying the historical paid CDFs to them overstates ultimate claims. The [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment restates the historical paid triangle to the current [[Settlement Rate|settlement rate]], using closed claim counts, before the factors are selected.

Paid development also overstates an accident year that holds unusually large paid claims, because its CDF develops those settled claims as if they would keep growing. At early ages the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] technique, which develops only the unpaid portion, is less leveraged.

## Comparing paid and reported projections

Running paid and reported methods side by side is standard practice. A large gap between their ultimate claims for an accident year signals that case adequacy or settlement speed has changed, which breaks the stable-pattern assumption of the development methods. The ratio of paid to reported claims tests for it. A ratio falling along the latest diagonals points to strengthened case outstanding or slower payment, and a rising ratio to faster settlement or weaker case outstanding. The ratio alone cannot tell the two causes apart, so the claim count and average case outstanding triangles are read with it.

> [!example]- An accident year at 24 months has $\$2{,}400{,}000$ of paid claims and $\$1{,}900{,}000$ of case outstanding. The selected CDFs are 2.05 on paid claims and 1.28 on reported claims. What do the two projections say? {Example}
> - The reported claims are $2{,}400{,}000 + 1{,}900{,}000 = \$4{,}300{,}000$.
> - The paid projection is $2{,}400{,}000 \times 2.05 = \$4{,}920{,}000$.
> - The reported projection is $4{,}300{,}000 \times 1.28 = \$5{,}504{,}000$, which is $\$584{,}000$ higher.
> - Either case outstanding has been strengthened, so the reported factors over-develop, or claims are settling more slowly, so the paid factors under-develop.
> - The average case outstanding and closed-to-reported count triangles decide between them before any selection is made.

The paid claims are also what the payment pattern is built from, which is used to discount unpaid claims.
