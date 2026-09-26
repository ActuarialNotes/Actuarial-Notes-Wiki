---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f8eb056f0ca51bc7451afb6d8fdda9818eb69bd400ca097eb7a5003a93cf38fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Recoveries.md
---

**Recoveries** are amounts an insurer collects that offset the claims it pays — deductibles billed back to insureds, [[Salvage and Subrogation|salvage and subrogation]], [[Reinsurance Recovery|reinsurance]], and collateral sources. In reserving they are estimated alongside the gross claims, and their unreceived portion (the recoverable) reduces the estimate of net [[Unpaid Claims|unpaid claims]].

> $$\begin{aligned} \text{Net Ultimate} &= \text{Gross Ultimate} \\ &\quad - \text{Ultimate Recoveries} \end{aligned}$$

> $$\begin{aligned} \text{Recoverable} &= \text{Ultimate Recoveries} \\ &\quad - \text{Recoveries Received} \end{aligned}$$

- **Know how the data record them** (Friedland Ch. 3). Some insurers keep separate payment and case-outstanding data by recovery type; others combine them, record payments only, or book recoveries as negative claim payments. [[Deductible Recovery|Deductibles]] differ by line: first-party auto physical damage payments are made *net* of the deductible, while general liability claims are paid in full and the deductible recovered afterwards; case reserves may be set net or gross. A change in any of these conventions is a [[Changing Conditions|changing condition]].
- **Salvage and subrogation** (Friedland Ch. 14) are projected either by the development technique on reported or received S&S, or by the **ratio approach**: develop the ratio of received S&S to paid claims to an ultimate ratio, and multiply by selected ultimate claims gross of S&S. The ratio's development factors are less leveraged than those of S&S dollars, and the ultimate ratio is easier to select for immature years. Salvage (property) arrives quickly; subrogation (liability) can arrive years after the claim is paid, giving age-to-age factors below $1.000$ at older ages.
- **Reinsurance.** Analyze gross and ceded and derive net, or gross and net and derive ceded — then test what is implied. Checks: net claims and premium do not exceed gross; a quota share shows up as a stable net-to-gross ratio triangle; large claims are ceded consistently with each year's retention; net development and tail factors are generally no larger than gross; and net IBNR is generally no larger than gross (exceptions include provisions for uncollectible reinsurance and disputed runoff). Aggregate or stop-loss covers are usually applied as a final step. See [[Net of Reinsurance]], [[Ceded Losses]].
- **Consistency across years.** A change in retention makes historical net data non-comparable; restate history at the current retention where claim-level data allow, or project gross and ceded separately.
- Recoveries carry **collection risk** — insured insolvency on deductibles, reinsurer insolvency or disputes on cessions — which is why the recoverable is reported and assessed as a separate item rather than netted away silently.

> [!example]- The S&S Ratio Approach {Example}
> Auto physical damage. Historical ratios of cumulative received S&S to cumulative paid claims settle at $0.108$, having been $0.060$ at $12$ months and $0.095$ at $24$ months.
>
> - AY $2023$ at $24$ months: paid claims $\$9{,}600{,}000$, received S&S $\$912{,}000$, selected ultimate claims $\$12{,}000{,}000$.
> - AY $2024$ at $12$ months: paid claims $\$6{,}000{,}000$, received S&S $\$312{,}000$, selected ultimate claims $\$12{,}500{,}000$.
>
> Estimate ultimate S&S and the S&S recoverable for each year.
>
> > [!answer]-
> > Ratio development to ultimate: $0.108 / 0.095 = 1.137$ from $24$ months; $0.108 / 0.060 = 1.800$ from $12$ months.
> >
> > $$
> > \begin{align*}
> > \text{AY 2023 ratio} &= 912{,}000 / 9{,}600{,}000 = 0.0950 \\
> > \text{Ultimate ratio} &= 0.0950 \times 1.137 = 0.1080 \\
> > \text{Ultimate S\&S} &= 0.1080 \times \$12{,}000{,}000 = \$1{,}296{,}000 \\
> > \text{Recoverable} &= \$1{,}296{,}000 - \$912{,}000 = \$384{,}000
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{AY 2024 ratio} &= 312{,}000 / 6{,}000{,}000 = 0.0520 \\
> > \text{Developed} &= 0.0520 \times 1.800 = 0.0936
> > \end{align*}
> > $$
> >
> > AY $2024$'s developed ratio is well below the $0.108$ of every mature year. Before accepting it, ask whether recording or recovery practice changed or one large claim is distorting the ratio. Absent a reason, a selection near the historical level is typical — at $0.107$, ultimate S&S is $\$1{,}337{,}500$ and the recoverable $\$1{,}025{,}500$, against $\$858{,}000$ from the mechanical projection. Friedland makes the same kind of judgmental selection for her most recent year.

> [!example]- Gross, Net and Implied Ceded {Example}
> AY $2024$ under a per-occurrence excess of loss treaty: gross reported $\$8{,}000{,}000$ with a selected gross CDF of $1.50$; net reported $\$6{,}500{,}000$ with a selected net CDF of $1.35$. Derive ceded ultimate and check the result.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Gross ultimate} &= \$8{,}000{,}000 \times 1.50 = \$12{,}000{,}000 \\
> > \text{Net ultimate} &= \$6{,}500{,}000 \times 1.35 = \$8{,}775{,}000 \\
> > \text{Ceded ultimate} &= \$12{,}000{,}000 - \$8{,}775{,}000 \\
> > &= \$3{,}225{,}000 \\
> > \text{Implied ceded CDF} &= 3{,}225{,}000 / 1{,}500{,}000 = 2.15
> > \end{align*}
> > $$
> >
> > Net IBNR ($\$2{,}275{,}000$) is below gross IBNR ($\$4{,}000{,}000$), and the ceded layer develops far more than gross ($2.15$ vs. $1.50$) — as expected, since the reinsurer takes the large, late-developing part of claims. Had the retention risen from $\$500{,}000$ to $\$1{,}000{,}000$ for AY $2024$, the net CDF of $1.35$ — selected from years capped at $\$500{,}000$ — would be too low, and net IBNR understated; the net history would need restating at the new retention.
