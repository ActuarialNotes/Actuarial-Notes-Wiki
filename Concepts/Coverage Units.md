---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fe3165b38ca6d38d41536bea00eb2385f77522c987757cce1e9ab5b9e55ddd54
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coverage Units.md
---

**Coverage Units** are the [[IFRS 17]] measure of the **quantity of service** a group of contracts provides in a period, used to allocate the [[Contractual Service Margin]] to [[Insurance Revenue|revenue]]. Each period's CSM release is the CSM available divided across the coverage units provided this period and expected in future periods.

> $$\text{CSM released} = \text{CSM} \times \frac{\text{Coverage units this period}}{\text{Total coverage units remaining}}$$

- **What a coverage unit is:** the quantity of coverage provided, determined by considering **the amount of benefits** the contracts could provide and their **expected duration**. IFRS 17 does not prescribe a formula — the insurer selects a driver that reflects the service and applies it consistently.
- **Common drivers:** the number of contracts in force (simplest, appropriate where each provides similar coverage), sum insured or policy limit (where amounts differ materially), expected claims, or time. The choice is a significant judgement and must be disclosed.
- **Expected duration is included**, so coverage units must reflect **expected lapses** — units are counted for the coverage actually expected to be provided, not for the full contractual term ignoring cancellation.
- **Revised each period.** The pattern of expected future coverage units is updated, which changes the release rate prospectively. A group whose expected duration shortens releases CSM faster.
- **Not applicable under the [[Premium Allocation Approach|PAA]]** for the [[Liability for Remaining Coverage|LRC]], since there is no CSM to release. Coverage units matter to a Canadian P&C insurer mainly on [[General Measurement Model|GMM]]-measured multi-year contracts and on some [[Reinsurance Contracts Held|reinsurance held]].
- The choice can change reported profit substantially: a limit-weighted driver front-loads profit on a group with large early-expiring policies, while a contract-count driver spreads it evenly.

> [!example]- Choosing the Coverage Unit Driver {Example}
> A three-year group contains two sub-blocks: $1{,}000$ contracts with a $\$1$ million limit each, all running the full three years; and $4{,}000$ contracts with a $\$100{,}000$ limit each, expected to lapse evenly so that only $50\%$ remain in year 2 and $25\%$ in year 3. The CSM at inception is $\$15$ million.
>
> Compute the year-1 CSM release under a contract-count driver and under a limit-weighted driver.
>
> > [!answer]-
> > **Contract count.** Contracts in force: year 1, $1{,}000 + 4{,}000 = 5{,}000$; year 2, $1{,}000 + 2{,}000 = 3{,}000$; year 3, $1{,}000 + 1{,}000 = 2{,}000$. Total $10{,}000$.
> >
> > $$\begin{align*}
> > \text{Year 1 release} &= \$15\text{M} \times \frac{5{,}000}{10{,}000} \\
> > &= \$7.5\text{M}
> > \end{align*}$$
> >
> > **Limit-weighted.** Limits in force, in millions: year 1, $1{,}000 + 400 = 1{,}400$; year 2, $1{,}000 + 200 = 1{,}200$; year 3, $1{,}000 + 100 = 1{,}100$. Total $3{,}700$.
> >
> > $$\begin{align*}
> > \text{Year 1 release} &= \$15\text{M} \times \frac{1{,}400}{3{,}700} \\
> > &= \$5.68\text{M}
> > \end{align*}$$
> >
> > **A $\$1.8$ million difference in year-1 profit from a single judgement**, with no difference in cash, claims or coverage.
> >
> > **Which is right?** The limit-weighted driver, on these facts. The large-limit contracts provide far more coverage per contract, and they persist while the small ones lapse — so counting contracts treats a $\$100{,}000$ policy as equal service to a $\$1$ million one, which does not reflect "the amount of benefits the contracts could provide." The contract-count driver would be defensible only if the limits were similar.
> >
> > This is why the coverage-unit driver must be **disclosed**: it is a lever on reported profit, and a reader cannot interpret the CSM release without knowing which one was pulled.
