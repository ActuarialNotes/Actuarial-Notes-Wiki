---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:1ecc1440a371d383660f7c955fd7b61e024896e09ed0a2ed4b58db9c8a118d8e
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 printed pp.161-168 (PDF 173-180); Ch.10 pp.171-174 (PDF 183-186), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 8 pp.141-142 and 145-147 (PDF pp.153-154, 157-159), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 2 p.29 (PDF p.41) — NCCI loss costs adjusted by each insurer for its own expenses, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pure Premium Method.md
---

![[Media/Figures/Pure_Premium_Method.svg|340]]

The **Pure Premium Method** is the [[Overall Rate Level Indication|rate level indication]] that derives the indicated average rate directly: project loss and LAE per exposure, add the fixed expense per exposure, and gross up for variable expenses and profit. The indicated average rate per exposure is

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q_T}$$

- $\text{Pure Premium}$ is the projected [[Pure Premium|pure premium]]: the ultimate losses and LAE, developed and trended, divided by the [[Earned Exposure|earned exposures]].
- $F$ is the [[Fixed Expenses|fixed expense]] per exposure.
- $V$ is the [[Variable Expenses|variable expense]] provision and $Q_T$ the target [[Profit and Contingency Provision|profit provision]], both as shares of premium.

The denominator $1 - V - Q_T$ is the variable permissible loss ratio. The method divides losses by exposures and never by premium, so it uses no premium at current rate level and needs no on-levelling. Exposures are trended to the projected period when the exposure base is inflation sensitive ([[Exposure Trend|exposure trend]]). Overstated projected ultimate losses overstate the pure premium, and so the indicated rate.

> [!example]- An accident year has $\$1{,}200{,}000$ of reported losses and LAE at 24 months on 5,000 earned exposures. The CDF is 1.15, the loss trend is $4\%$ a year, the exposure trend is $1\%$ a year and the trend period is 2.5 years. The fixed expense is $\$25$ per exposure, variable expenses are $22\%$ and the target profit provision is $5\%$. What is the indicated rate? {Example}
> - The ultimate losses and LAE are $1{,}200{,}000 \times 1.15 = \$1{,}380{,}000$.
> - Trended at $1.04^{2.5} = 1.1030$, they are $\$1{,}522{,}167$.
> - The exposure base inflates, so the exposures are trended at $1.01^{2.5}$, to 5,126.
> - The pure premium is $1{,}522{,}167/5{,}126 = \$296.95$.
> - The indicated rate is $321.95/0.73 = \$441.03$, with $1 - 0.22 - 0.05 = 0.73$.

## Indicated change

The method gives a rate, so the indicated change compares it with the current average rate:

> $$\text{Indicated Change} = \frac{\text{Indicated Rate}}{\text{Current Rate}} - 1$$

- $\text{Current Rate}$ is the current average premium per exposure at current rates.

> [!example]- The current average rate is $\$425.00$. What is the indicated change, and what would it be with the exposures left untrended? {Example}
> - The indicated change is $441.03/425.00 - 1 = +3.8\%$.
> - Untrended, the pure premium would be $1{,}522{,}167/5{,}000 = \$304.43$.
> - The indicated change would then be $+6.2\%$, an increase the insurer would collect anyway as its inflating exposure base grows.

## Other provisions per exposure

Every provision in the numerator is per exposure. A full indication adds the catastrophe pure premiums and the net reinsurance cost per exposure to the non-catastrophe pure premium, with the ULAE load applied to the losses and ALAE:

> $$\text{Indicated Rate} = \frac{\text{Non-Cat PP} \times (1 + \text{ULAE Ratio}) + \text{Cat PP} + F + R}{1 - V - Q_T}$$

- $\text{Non-Cat PP}$ is the non-catastrophe pure premium of losses and ALAE.
- $\text{Cat PP}$ is the non-modeled and modeled [[Catastrophe Loss|catastrophe]] pure premium, each already carrying its own LAE load.
- $R$ is the projected net [[Reinsurance|reinsurance]] cost per exposure.

The net cost of reinsurance is divided by the exposures projected to the reinsurance contract period. The latest year's exposures are trended at the expected exposure growth from the midpoint of the latest year to the midpoint of the contract term.

> [!example]- A homeowners insurer expects reinsurance recoveries of $\$458{,}673$ on a contract costing $\$673{,}248$ that runs for one year from January 1, 2017. The latest year, 2015, had 13,411 exposures, and exposures are expected to grow $1\%$ a year. What is the net reinsurance cost per exposure? {Example}
> - The net cost of reinsurance is $673{,}248 - 458{,}673 = \$214{,}575$.
> - The projection period runs from July 1, 2015 to July 1, 2017, two years.
> - The projected exposures are $13{,}411 \times 1.01^{2} = 13{,}681$.
> - The net reinsurance cost per exposure is $214{,}575/13{,}681 = \$15.68$.

## Pure premium method versus loss ratio method

Given consistent data and assumptions, the pure premium method and the [[Loss Ratio Method|loss ratio method]] are mathematically equivalent, since a loss ratio is the pure premium divided by the average premium. They differ in what they need and what they give:

| | Pure premium method | Loss ratio method |
| --- | --- | --- |
| Main statistic | Pure premium | Loss ratio |
| Needs | Well-defined exposures | Premium at current rate level |
| Gives | An indicated rate | An indicated change |
| Preferred when | The premium at current rate level is hard to calculate, or there are no current rates | Exposures are not clearly defined, or the change itself matters most |

The pure premium method must be used for a new line of business or territory, which has no current rates to change. It cannot be used without a well-defined, consistently measured exposure base. Advisory organizations file loss costs, which are pure premiums, and each insurer adds its own expense and profit provisions to them.

> [!example]- The same book has trended on-level earned premium of $\$2{,}178{,}550$, which is 5,126 trended exposures at the current $\$425$ rate. Its fixed expenses are taken as $5.7\%$ of premium. What does the loss ratio method indicate, and why does it differ from $+3.8\%$? {Example}
> - The projected loss and LAE ratio is $1{,}522{,}167/2{,}178{,}550 = 69.87\%$.
> - The indicated change is $0.7557/0.73 - 1 = +3.5\%$.
> - At $5.7\%$ of the current $\$425$ premium, the fixed expense is $\$24.23$, not the $\$25$ the pure premium method used.
> - With a consistent fixed expense ratio, $25/425 = 5.88\%$, the loss ratio method also gives $+3.8\%$.

## Pure premium method in classification ratemaking

The same approach gives a rating variable's relativities in a one-way analysis. Each level's losses and ALAE divided by its exposures is its pure premium, and its indicated relativity is

> $$\text{Relativity} = \frac{\text{Pure Premium of the Level}}{\text{Pure Premium of the Base Level}}$$

The one-way analysis assumes each level's exposures are spread the same way across the levels of every other rating variable. Where they are not, such as a territory with a disproportionate share of high-value homes, the relativities are distorted by distributional bias. The adjusted pure premium approach divides each level's losses by its exposures weighted by the current relativities of the other variables. It minimizes the distortion and gives the same relativities as the loss ratio approach, but it is only an approximation to a proper reflection of all exposure correlations ([[Classification Ratemaking|classification ratemaking]]).

> [!trap] Forgetting to trend an inflating exposure base
> When the exposure base inflates, such as payroll, the losses are trended and so must the exposures be. Dividing trended losses by untrended exposures overstates the pure premium, as the $+6.2\%$ against $+3.8\%$ above shows.
