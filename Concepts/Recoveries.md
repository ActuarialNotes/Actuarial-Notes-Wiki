---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b42fd8ea828ed77699376a2909363aee1b9ebfb3d759f763c6a063fe203c7e7a
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 3 pp.33-34 (PDF pp.39-40); Ch. 14 pp.329-332 (PDF pp.335-338), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Recoveries.md
---

**Recoveries** are amounts an insurer collects that reduce its net cost of claims: [[Deductible Recovery|deductibles]] recovered from insureds, [[Salvage and Subrogation|salvage and subrogation]] (S&S), collateral sources and [[Reinsurance Recovery|reinsurance]]. The part not yet collected, the recoverable, reduces the estimate of net [[Unpaid Claims|unpaid claims]], and is

> $$\text{Recoverable} = \text{Ultimate Recoveries} - \text{Recoveries Received}$$

Insurers record recoveries in one of four ways:

1. Separate payments and case outstanding for each type of recovery.
2. All types of recovery combined.
3. Payments only, with no case outstanding for recoveries.
4. Recoveries as negative claim payments, with no separate data.

The actuary needs to know which, and whether paid claims are net or gross of recoveries. A change in the recording is a [[Changing Conditions|changing condition]]. A large negative paid claim is not necessarily an error, since it may be a recovery such as salvage and subrogation or a correcting entry, so it is examined before it is deleted.

## The ratio approach to salvage and subrogation

S&S can be projected by applying the [[Chain Ladder Method|development technique]] to the received S&S on its own. In the ratio approach, the ratio developed is instead S&S to claims. At each age it is

> $$\text{S\&S Ratio} = \frac{\text{Received S\&S}}{\text{Paid Claims}}$$

- $\text{Received S\&S}$ and $\text{Paid Claims}$ are cumulative, at the same age, with the paid claims gross of S&S.

The ratios are developed like claims: age-to-age factors of the ratio triangle are selected and multiplied into a CDF for the ratio. An accident year's ultimate S&S is then

> $$\text{Ultimate S\&S} = \text{S\&S Ratio} \times \text{CDF} \times \text{Ultimate Claims}$$

- $\text{S\&S Ratio} \times \text{CDF}$ is the ultimate S&S ratio, the year's latest ratio developed to ultimate.
- $\text{Ultimate Claims}$ are the selected ultimate claims gross of S&S, from any technique.

> [!example]- The ratios of received S&S to paid claims were $0.060$, $0.095$ and $0.108$ at $12$, $24$ and $36$ months for accident year $2021$, $0.062$, $0.096$ and $0.108$ for $2022$, and $0.058$ and $0.094$ at $12$ and $24$ months for $2023$, with no development after $36$ months. Accident year $2023$ has paid $\$9{,}600{,}000$, and its ultimate claims are $\$12{,}000{,}000$. What are its ultimate S&S and its S&S recoverable? {Example}
> - The $24$-to-$36$ factors are $0.108/0.095 = 1.137$ and $0.108/0.096 = 1.125$, with average $1.131$.
> - With no development after $36$ months, the CDF from $24$ months is $1.131$.
> - The ultimate S&S ratio is $0.094 \times 1.131 = 0.1063$.
> - The ultimate S&S is $0.1063 \times 12{,}000{,}000 = \$1{,}275{,}600$.
> - The received S&S is $0.094 \times 9{,}600{,}000 = \$902{,}400$, so the recoverable is $1{,}275{,}600 - 902{,}400 = \$373{,}200$.

The ratio approach has two advantages over developing S&S dollars. Its development factors are less leveraged and less volatile, because the recoveries arise from the paid claims the ratio divides by. Its ratios also serve as a benchmark across accident years, which exposes an unreasonable value and supports the selection for the most recent years. A projected ratio for an immature year that is out of line with consistent mature years is usually random fluctuation or a timing lag, magnified by a large CDF. The actuary then selects a ratio consistent with the mature years, unless a real change, such as in the recording of S&S, supports the different one.

> [!example]- Accident year $2024$, at $12$ months, has paid $\$6{,}000{,}000$ and received $\$312{,}000$ of S&S. Its ultimate claims are $\$12{,}500{,}000$, the ratio CDF from $12$ months is $1.79$, and the mature years' ultimate ratios average $0.108$. What ultimate S&S ratio should be selected? {Example}
> - The latest ratio is $312{,}000/6{,}000{,}000 = 0.052$.
> - Developed, it is $0.052 \times 1.79 = 0.0931$, well below every mature year.
> - A large CDF applied to an unusual early ratio is more likely noise than a new level, so a ratio near the mature years', $0.108$, is selected.
> - The ultimate S&S is $0.108 \times 12{,}500{,}000 = \$1{,}350{,}000$, and the recoverable is $1{,}350{,}000 - 312{,}000 = \$1{,}038{,}000$.

Ultimate claims net of S&S are the gross ultimate claims minus the ultimate S&S, which is the gross ultimate times one minus the ultimate S&S ratio.
