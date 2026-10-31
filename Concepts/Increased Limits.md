---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:367a587c6fecdac063843f9a7997e70f1422ba4e34749c5aae0dae044fe0776d
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.193-198 (PDF pp.205-210), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.2-4, 13, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Increased Limits.md
---

**Increased Limits Factors** (ILFs) are the multiplicative factors that convert a basic-limits loss cost into the loss cost for a higher policy limit, reflecting the additional expected loss in the layer above the basic limit.

> $$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$

> $$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\right]$$

- $B$ is the basic limit (ISO uses $\$100{,}000$ for general liability and commercial auto liability), so $\text{ILF}(B) = 1.000$ by construction and $\text{ILF}(L) > 1$ for $L > B$. $E[X \wedge L]$ is the **limited expected value**, the expected loss capped at $L$.
- Werner's indicated ILF is the ratio of losses and LAE at the two limits, assuming all underwriting expenses are variable and the variable expense and profit provisions do not vary by limit. Actuaries may vary the profit provision by limit for the volatility of high limits — a departure Werner notes from that assumption, not part of his formula. Palmer's fuller formulation puts it inside the factor: $\text{ILF}(L) = \dfrac{\text{LAS}(L) + \text{ALAE}(L) + \text{ULAE}(L) + \text{RL}(L)}{\text{LAS}(B) + \text{ALAE}(B) + \text{ULAE}(B) + \text{RL}(B)}$, where the **risk load** covers process and parameter risk, both of which vary by limit.
- ILFs are estimated from a **size-of-loss distribution** — empirically, building the limited average severity layer by layer so that losses censored at policy limits introduce no bias, or from a fitted curve (lognormal, Pareto, truncated Pareto); ISO's mixed exponential method and GLMs are also used. Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of experience (class group, state group or countrywide) and applied to class-, state- and territory-specific basic limit loss costs.
- **Layer by layer from censored data** (Werner & Modlin, Ch. 11). Claim data is usually censored at each policy's limit, so the limited average severity of each layer is based only on loss data from policies with limits as high as or higher than the top of the layer. The limited average severities of the layers are then stacked, like the layers of a [[Layer of Insurance|tower]].
- The limited average severity at the basic limit uses the claims from all policies, whatever their limits, each capped at the basic limit, and divides the total by the total number of claims.
- A layer's losses are what each claim puts into it: the claim capped at the top of the layer minus the bottom of the layer, or zero for a claim below the bottom, so a claim above the top contributes the full width of the layer.
- The average severity of a layer is its losses divided by the number of claims reaching the layer (those exceeding its bottom), using only the policies whose limits reach the top of the layer. Before it is added to the limited average severity below it, it is multiplied by the probability that a claim exceeds the bottom of the layer, estimated from the same policies. That is the same as dividing the layer's losses by the total claim count of those policies.
- The limited average severity at a higher limit is the limited average severity at the lower limit plus that weighted layer severity, and each further layer is added the same way. The ILF is then the ratio of the limited average severities.
- **Consistency.** Since $\text{LAS}(k) = \int_0^k S(x)\,dx$ (Palmer), each additional dollar of limit at $x$ adds $S(x)$ — the probability a loss exceeds $x$ — which cannot rise as $x$ rises. So the *marginal* indemnity cost per dollar of additional limit must not increase as the limit rises; an indemnity ILF table whose marginal cost increases is not consistent with any size-of-loss distribution.
- ILFs are **leveraged by inflation**. As losses grow, more of them pierce the basic limit and the excess layers grow faster than the ground-up trend — so ILF tables must be reviewed, not left in place, through inflationary periods.
- The **assumptions** behind Werner's ILF matter: all underwriting expenses are variable and the variable expense and profit provisions do not vary by limit; frequency and severity are independent; and frequency is the same whatever limit is chosen. The last fails for some lines — personal auto insureds who choose very high limits tend to have lower accident frequencies — which is one reason a GLM, which does not assume equal frequency, can give different (even counter-intuitive) factors.
- ILFs here are on loss and LAE; how ALAE and ULAE are loaded onto indemnity is on [[Loss and Loss Adjustment Expense]].

![[Media/Figures/Increased_Limits.svg|340]]

> [!example]- Pricing a Higher Limit {Example}
> The basic limit is $\$100{,}000$, with $\text{ILF}(100\text{K}) = 1.00$, $\text{ILF}(300\text{K}) = 1.25$, $\text{ILF}(500\text{K}) = 1.35$, $\text{ILF}(1\text{M}) = 1.45$. The basic-limits loss cost is $\$800$.
>
> Price the $\$500$K policy, and the $\$200$K excess of $\$300$K layer.
>
> > [!answer]-
> > $$\text{Loss cost at } \$500\text{K} = \$800 \times 1.35 = \$1{,}080$$
> >
> > The layer between $\$300$K and $\$500$K:
> >
> > $$\begin{align*}
> > \text{Layer cost} &= \$800 \times (1.35 - 1.25) \\
> > &= \$80
> > \end{align*}$$
> >
> > Note how little the top of the tower costs: the first $\$100$K costs $\$800$, the next $\$200$K costs $\$200$, and the $\$200$K above that costs $\$80$. Each successive layer is cheaper per dollar of limit — which is exactly the consistency property.
> >
> > Note also that Werner's ILF applies to the whole rate only under its all-expenses-variable assumption. Fixed expenses do not rise with the limit, so where they are loaded into the rate the final premium rises by less than the ILF.

> [!example]- Testing an ILF Table for Consistency {Example}
> A filing proposes:
>
> | Limit | ILF |
> |---|---|
> | $\$100$K | $1.00$ |
> | $\$250$K | $1.30$ |
> | $\$500$K | $1.45$ |
> | $\$1$M | $1.75$ |
>
> Is the table consistent?
>
> > [!answer]-
> > Marginal cost per $\$1{,}000$ of additional limit:
> >
> > $$\begin{align*}
> > \$100\text{K} \to \$250\text{K}: \; \frac{0.30}{150} &= 0.00200 \\[6pt]
> > \$250\text{K} \to \$500\text{K}: \; \frac{0.15}{250} &= 0.00060 \\[6pt]
> > \$500\text{K} \to \$1\text{M}: \; \frac{0.30}{500} &= 0.00060
> > \end{align*}$$
> >
> > The marginal cost falls from $0.00200$ to $0.00060$, then stays **flat**. Flat is acceptable only in a degenerate case: it implies the expected loss in the $\$500$K–$\$1$M layer is the same per dollar as in the $\$250$K–$\$500$K layer, so $S(x)$ could not fall anywhere between $\$250$K and $\$1$M — no loss could end in that range.
> >
> > If these are indemnity-only factors, either the $\$1$M factor is too high or the $\$500$K factor is too low. If they include a **risk load**, which Palmer describes as increasing with the policy limit, the load can legitimately lift the higher factors — so the test should be run on the indemnity component before the load is added.
