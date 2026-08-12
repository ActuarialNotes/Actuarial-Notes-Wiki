**In-Force** describes the policies, exposures or premium that are actively providing coverage at a single point in time — a *stock* measured at a date, as opposed to the *flows* of written and earned business measured over a period.

> $$\text{In-force at date } t = \sum_{\text{policies}} \mathbf{1}\{\text{effective} \le t < \text{expiration}\}$$

> $$\text{In-force premium} = \sum \text{annualized premium of policies in force}$$

- Written, earned and in-force answer three different questions. **Written** counts what was sold during the period, **earned** counts the coverage actually provided during the period, and **in-force** counts what is on the books right now — see [[Written Premium]] and [[Earned Premium]].
- In-force premium is quoted on an **annualized** basis, so a six-month policy carrying $\$400$ of premium counts $\$800$ of in-force premium. That makes in-force comparable across policy terms but means it never ties to any accounting period.
- The in-force snapshot is the right exposure measure whenever the question is *"what am I exposed to today"*: catastrophe accumulation and PML work, reinsurance treaty placement, capacity and concentration monitoring by territory or peril.
- Comparing successive in-force snapshots isolates growth from rate: the change in policy count is pure volume, and the change in average in-force premium is rate plus [[Mix of Business|mix]].
- In-force counts also feed retention and renewal analysis (policies in force at renewal $\div$ policies eligible), which drives [[Lifetime Value|customer lifetime value]] work.

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
> > Annualizing D's six-month premium ($\$500 \times 2 = \$1{,}000$):
> >
> > $$\text{In-force premium} = 1{,}200 + 900 + 1{,}000 = \$3{,}100$$
> >
> > Note that C is already *written* premium in CY 2024 even though it is not yet in force, and D is earning premium right now — three different answers from the same four policies.

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
> > The $+7.7\%$ is **not** all rate. It is rate change plus [[Premium Trend|premium trend]] from drift in amounts of insurance and mix. Attributing all of it to rate — and therefore assuming the book is $7.7\%$ better priced — is the error the two-step premium trend procedure exists to prevent.
