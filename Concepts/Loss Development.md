---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea030fb3f3071cdb88fa1f9eb8c84bef875de5763ddaf09e3f5b171895316f40
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 7 pp.85-90 (PDF pp.91-96), Ch. 6 p.68 (PDF p.74), Ch. 9 p.153 (PDF p.159), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 6 pp.93-95 (PDF pp.105-107), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Loss Development.md
---

**Loss Development** is the change in the reported or paid value of a cohort of claims as it matures — the difference between losses valued at an early age and their eventual [[Ultimate Loss|ultimate]] settled value. Because a ratemaking or reserving analysis must compare cohorts at a common (ultimate) basis, immature [[Accident Year]]s must be developed before they can be used.

> $$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$

> $$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$

- Development has two drivers: **pure IBNR** (claims that occurred but have not yet been reported) and **IBNER** (incurred but not enough reported — development on claims already known, as [[Case Reserves|case reserves]] are re-estimated toward settlement). Reported triangles capture both; paid triangles also capture the lag between a case reserve being set and the cheque clearing.
- **Reported (incurred) development** is normally faster and less volatile than **paid development**, so reported CDFs are smaller. Comparing the two is a standard diagnostic: a widening paid-to-reported ratio signals speeding settlement, a narrowing one signals strengthening case reserves (see [[Case Adequacy]], [[Settlement Rate]]).
- Development can be **downward**. Lines dominated by salvage/subrogation recoveries or by conservative initial case reserving produce age-to-age factors below $1.000$; capping factors at $1.000$ because "losses only go up" is a classic error.
- **Long-tail lines** ([[Long Tail Lines|liability, workers compensation]]) have large CDFs at early maturities and need a [[Tail Factor]] beyond the observed triangle; **short-tail lines** ([[Short Tail Insurance|property, auto physical damage]]) are close to ultimate within a year or two.
- The mechanics live in the [[Development Triangle]] → [[Age to Age Factor]] → [[Cumulative Development Factor]] chain; the [[Chain Ladder Method]] applies them directly, while the [[Bornhuetter-Ferguson Method]] uses the *complement* $(1 - 1/\text{CDF})$ to weight an a priori expectation.
- In **ratemaking**, developing losses to ultimate is a distinct step from trending: development moves an immature year to its own ultimate value, while [[Loss Trend|trend]] moves that ultimate value forward to the future policy period. Applying one without the other under-states the indication; overlapping them double-counts.

![[Media/Figures/Loss_Development.svg|340]]

> [!example]- Developing an Immature Accident Year {Example}
> Reported losses for AY 2024 at $12$ months are $\$4{,}200{,}000$. Selected age-to-age factors are $12\text{–}24: 1.650$, $24\text{–}36: 1.220$, $36\text{–}48: 1.080$, $48\text{–}60: 1.030$, with a tail factor of $1.015$ beyond $60$ months.
>
> Estimate ultimate losses and the implied [[IBNR]].
>
> > [!answer]-
> > Chain the factors to get the cumulative development factor from age $12$ to ultimate:
> >
> > $$\text{CDF}_{12 \to \text{ult}} = 1.650 \times 1.220 \times 1.080 \times 1.030 \times 1.015$$
> >
> > $$= 2.2729$$
> >
> > Apply it to reported losses:
> >
> > $$\text{Ultimate} = \$4{,}200{,}000 \times 2.2729 = \$9{,}546{,}180$$
> >
> > IBNR is the portion of ultimate not yet reported:
> >
> > $$\text{IBNR} = \$9{,}546{,}180 - \$4{,}200{,}000 = \$5{,}346{,}180$$
> >
> > > [!tip] Leverage at early maturities
> > > A CDF of $2.27$ means more than half the ultimate estimate is unreported. A $5\%$ error in the $12\text{–}24$ factor moves ultimate by roughly $\$450{,}000$ — which is why actuaries lean on the [[Bornhuetter-Ferguson Method]] or [[Expected Loss Method]] at the immature end of the triangle rather than on the [[Chain Ladder Method]] alone.

> [!example]- Reported vs. Paid Development as a Diagnostic {Example}
> For AY 2022 at $36$ months, paid losses are $\$6{,}300{,}000$ and reported losses are $\$9{,}000{,}000$. At $36$ months the historical average paid-to-reported ratio for this line is $0.58$.
>
> What does the comparison suggest?
>
> > [!answer]-
> > $$\text{Paid-to-reported ratio} = \frac{\$6{,}300{,}000}{\$9{,}000{,}000} = 0.70$$
> >
> > At $0.70$ against a $0.58$ benchmark, AY 2022 has paid out a materially larger share of its reported losses than history would suggest. Two readings are consistent with this:
> >
> > - **Faster settlement** — claims are closing sooner, so historical *paid* development factors (built on slower settlement) will over-develop this year.
> > - **Weaker case reserving** — case reserves are lower relative to eventual payments, so historical *reported* factors will under-develop this year.
> >
> > Either way the historical factors are biased for this cohort. The standard responses are the [[Berquist-Sherman Method]] (restate the triangle for the changed settlement rate or case adequacy) or a shift toward the method less sensitive to the change.
