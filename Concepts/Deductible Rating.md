---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:06fb060d184ee603ffa5053899697ea97fba72fdaa24ebc91fab5ec0b40fd554
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.197-204 (PDF pp.209-216); Ch.9 p.161 (PDF p.173); Ch.15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.13-14, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deductible Rating.md
---

**Deductible Rating** is the pricing of policies under which the insured retains the first $d$ dollars of each loss. The rate credit is derived from the [[Loss Elimination Ratio|loss elimination ratio]] — the share of expected losses the deductible removes.

> $$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$

> $$\text{Deductible Relativity} = 1 - \text{LER}(d)$$

- Werner derives the relativity $(1 - \text{LER})$ assuming **all expenses are variable** and the variable expense and profit provisions are a constant percentage of premium, so under that assumption it applies to the whole rate. [[Fixed Expenses|Fixed expenses]] do not fall because the insured took a deductible: where they are material and are not charged as a separate fee, Werner's general rule for relativities is to include the fixed-expense loading, which flattens the indicated relativity — in effect the credit applies to the loss portion only.
- LERs are computed from the size-of-loss distribution — empirically when ground-up losses are known, or from a fitted continuous distribution. When the data hold only losses net of the deductible, policies with a deductible *higher* than the one being priced cannot be used.
- Deductible credits must satisfy a **consistency** requirement. Werner writes the losses eliminated by a deductible $D$ as $\int_0^D x f(x)\,dx + D\,[1 - F(D)]$, so each extra dollar of deductible eliminates $1 - F(D)$ per claim — the chance a loss exceeds $D$ — which can only fall as $D$ rises. The credit per dollar of deductible must therefore *decrease* as the deductible rises; a schedule that violates this is not consistent with any size-of-loss distribution.
- The LER approach assumes **claiming behaviour is the same at every deductible**, and Werner notes two ways it is not: an insured with a higher deductible may not report a claim whose small net payment is not worth a claim surcharge, and where insureds choose freely, lower-risk insureds tend to choose higher deductibles — so higher-deductible policies may end up more profitable than lower ones. A classification analysis of the historical data reflects these differences, and the actuary may look at both sets of indications before selecting.
- Deductibles erode with [[Inflation|inflation]]: a fixed $d$ eliminates a falling share of a growing loss, so relativities must be refreshed or higher-deductible business becomes under-priced.
- On a large deductible policy the insurer may pay the whole claim and seek reimbursement below the deductible from the insured — the [[Deductible Recovery|deductible recovery]] — so the premium must cover invoicing and monitoring and a provision for the credit risk that the insured cannot pay, which collateral rarely covers fully.

![[Media/Figures/Deductible_Rating.svg|340]]

> [!example]- Pricing a Deductible Option {Example}
> A homeowners programme has a full-coverage loss cost of $\$620$ per house-year. LERs from the fitted severity distribution are:
>
> | Deductible | LER |
> |---|---|
> | $\$500$ | $0.145$ |
> | $\$1{,}000$ | $0.225$ |
> | $\$2{,}500$ | $0.360$ |
>
> Fixed expenses are $\$70$ per policy, variable expenses $24\%$, target profit $5\%$. Compute the rate at each deductible and check consistency.
>
> > [!answer]-
> > Apply the relativity to the **loss cost only**, then load expenses:
> >
> > | Deductible | Loss cost | Rate $= (\text{LC} + 70)/0.71$ |
> > |---|---|---|
> > | $\$500$ | $620 \times 0.855 = \$530.10$ | $\$845.21$ |
> > | $\$1{,}000$ | $620 \times 0.775 = \$480.50$ | $\$775.35$ |
> > | $\$2{,}500$ | $620 \times 0.640 = \$396.80$ | $\$657.46$ |
> >
> > **Consistency check** — the extra credit per extra dollar of deductible must fall:
> >
> > $$\begin{align*}
> > \$500 \to \$1{,}000: \; \frac{845.21 - 775.35}{500} &= \$0.140 \text{ per \$1} \\[6pt]
> > \$1{,}000 \to \$2{,}500: \; \frac{775.35 - 657.46}{1{,}500} &= \$0.079 \text{ per \$1}
> > \end{align*}$$
> >
> > The marginal credit falls from $14.0$ cents to $7.9$ cents per dollar of retention, as it must — the second, wider layer contains proportionally less expected loss.
> >
> > Note also that the rate does **not** fall by the full LER: raising the deductible from $\$500$ to $\$2{,}500$ eliminates $25\%$ of losses but only $22\%$ of premium, because the $\$70$ of fixed expense rides on regardless — the variable expense and profit loads scale with the loss cost, so they fall in proportion.

> [!example]- An Inconsistent Credit Schedule {Example}
> A commercial property filing proposes these deductible credits against a $\$1{,}000$-deductible base:
>
> | Deductible | Proposed credit |
> |---|---|
> | $\$1{,}000$ | — |
> | $\$2{,}500$ | $8\%$ |
> | $\$5{,}000$ | $14\%$ |
> | $\$10{,}000$ | $28\%$ |
>
> Is the schedule sound?
>
> > [!answer]-
> > Marginal credit per dollar of additional retention:
> >
> > $$\begin{align*}
> > \$1{,}000 \to \$2{,}500: \; \frac{8\%}{1{,}500} &= 0.53\% \text{ per \$100} \\[6pt]
> > \$2{,}500 \to \$5{,}000: \; \frac{6\%}{2{,}500} &= 0.24\% \text{ per \$100} \\[6pt]
> > \$5{,}000 \to \$10{,}000: \; \frac{14\%}{5{,}000} &= 0.28\% \text{ per \$100}
> > \end{align*}$$
> >
> > The marginal credit falls, then **rises** at the top step. That is inconsistent: the $\$5{,}000$–$\$10{,}000$ layer cannot contain more expected loss per dollar than the $\$2{,}500$–$\$5{,}000$ layer beneath it.
> >
> > The practical consequence is arbitrage. An insured whose expected loss in the top layer is below average buys the $\$10{,}000$ deductible and captures a credit exceeding the loss it retains; the insurer loses on every such sale, and the insureds who take the option are precisely the ones for whom it is mispriced.
> >
> > The fix is to re-derive the credits from a single consistent size-of-loss distribution rather than setting them competitively step by step — the same consistency test applied to [[Increased Limits|increased limits factors]], run in the opposite direction.
