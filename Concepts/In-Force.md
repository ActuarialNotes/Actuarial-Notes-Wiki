---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:d0cc0d81642c0b4753f5492f4d6f2d83fd989a71ea69a7223e7d21a215816d84
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 1 pp.2, 8, 10 (PDF pp.14, 20, 22), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 4 pp.57-58 (PDF pp.69-70), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp.66, 70-71 (PDF pp.78, 82-83), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 p.44 (PDF p.56); Ch. 13 pp.257, 259 (PDF pp.269, 271); Ch. 14 p.284 (PDF p.296), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/In-Force.md
---

**In-Force** describes the policies, exposures or premium that are actively providing coverage at a single point in time — a *stock* measured at a date, as opposed to the *flows* of written and earned business measured over a period.

> $$\text{In-force at date } t = \sum_{\text{policies}} \mathbf{1}\{\text{effective} \le t < \text{expiration}\}$$

> $$\text{In-force premium} = \sum \text{full-term premium of policies in force}$$

- Written, earned and in-force answer three different questions. **Written** counts what was sold during the period, **earned** counts the coverage actually provided during the period, and **in-force** counts what is on the books right now — see [[Written Premium]] and [[Earned Premium]].
- In-force premium is the **full-term** premium of each policy in effect at the date — the policy's own term, not an annualized one — so a six-month policy carrying $\$400$ of premium contributes $\$400$. Books written on different terms are therefore not directly comparable: of two insurers writing the same written premium, one on annual and one on semi-annual policies, the semi-annual writer's in-force premium is half the other's. After a mid-term change, in-force premium is the full-term premium applicable on the date.
- In-force exposures count the insured units exposed to loss at the date — a snapshot with no regard to the duration of the exposure. Companies define the insured unit differently: items such as cars (a three-car policy is three in-force exposures), policies, or written exposures.
- As the best estimate of the company's [[Mix of Business|mix of business]] at a date, the latest in-force premium is used to measure the impact of a rate change on the existing portfolio, and the latest in-force distribution is normally the estimate of the distribution expected while new rates are in effect. Where earned premium by territory is unavailable, in-force premium by territory may stand in for it.
- Changes in average premium, once adjusted for rate changes, show changes in the mix of business written; comparing successive in-force snapshots separates the change in volume (policy count) from the change in average premium.
- Renewal analysis works on the in-force book too: the **retention ratio** is policies renewed $\div$ potential renewal policies, and rate scenarios for the renewal portfolio are tested on the in-force distribution — see also [[Lifetime Value|lifetime value analysis]], which allows for the fact that not all insureds renew.

![[Media/Figures/In-Force.svg|340]]

> [!example]- Reading an In-Force Snapshot {Example}
> At $6/30/2024$ an insurer's auto book contains:
>
> | Policy | Term | Premium |
> |---|---|---|
> | A | $1/1/2024$–$12/31/2024$ | $\$1{,}200$ (annual) |
> | B | $3/1/2024$–$2/28/2025$ | $\$900$ (annual) |
> | C | $7/1/2024$–$6/30/2025$ | $\$1{,}000$ (annual) |
> | D | $4/1/2024$–$9/30/2024$ | $\$500$ (six-month) |
>
> Compute the in-force policy count and in-force premium at $6/30/2024$.
>
> > [!answer]-
> > A policy is in force if its effective date is on or before $6/30/2024$ and its expiration is after it.
> >
> > - **A** — in force ($1/1$ to $12/31$) ✓
> > - **B** — in force ($3/1$ to $2/28/2025$) ✓
> > - **C** — **not** in force; coverage begins $7/1/2024$ ✗
> > - **D** — in force ($4/1$ to $9/30$) ✓
> >
> > $$\text{In-force count} = 3$$
> >
> > Each policy in force contributes its full-term premium — D its six-month $\$500$, not an annualized $\$1{,}000$:
> >
> > $$\text{In-force premium} = 1{,}200 + 900 + 500 = \$2{,}600$$
> >
> > Note that C will count in CY 2024 *written* premium (its effective date is in 2024) even though it is not in force on $6/30$, and D is earning premium right now — three different answers from the same four policies.

> [!example]- Separating Growth from Rate {Example}
> An insurer reports the following homeowners in-force figures:
>
> | Date | Policies in force | In-force premium |
> |---|---|---|
> | $12/31/2023$ | $40{,}000$ | $\$52{,}000{,}000$ |
> | $12/31/2024$ | $42{,}000$ | $\$58{,}800{,}000$ |
>
> Decompose the $13.1\%$ premium growth.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Avg premium 2023} &= \frac{\$52{,}000{,}000}{40{,}000} = \$1{,}300 \\[4pt]
> > \text{Avg premium 2024} &= \frac{\$58{,}800{,}000}{42{,}000} = \$1{,}400
> > \end{align*}$$
> >
> > $$\begin{align*}
> > \text{Exposure growth} &= \frac{42{,}000}{40{,}000} - 1 = +5.0\% \\[4pt]
> > \text{Average premium growth} &= \frac{1{,}400}{1{,}300} - 1 = +7.7\%
> > \end{align*}$$
> >
> > Check: $1.050 \times 1.077 = 1.131$, the $+13.1\%$ total.
> >
> > The $+7.7\%$ is **not** all rate. It is rate change plus [[Premium Trend|premium trend]] from shifts in mix such as amounts of insurance. Only once the premium is restated at current rate level does the change in average premium show the change in mix; attributing all of it to rate would assume the book is $7.7\%$ better priced than it is.
