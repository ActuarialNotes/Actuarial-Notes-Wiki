---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d17937a0c7ead0ec365871cc9d5d6ee6db209f6c88eb4ddf890f71eaa451b49a
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 11 pp.193-198 (PDF pp.205-210), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.2-4, 13, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Increased Limits.md
---

![[Media/Figures/Increased_Limits.svg|340]]

An **Increased Limits Factor** (ILF) is the multiplicative factor that converts a basic-limits loss cost into the loss cost for a higher policy limit, reflecting the additional expected loss in the layer above the basic limit. The lowest limit offered is the basic limit, and higher limits are increased limits. If all underwriting expenses are variable, the variable expense and profit provisions do not vary by limit, [[Frequency|frequency]] and [[Severity|severity]] are independent, and frequency is the same whatever limit is chosen, the indicated ILF at limit $L$ is

> $$\text{ILF}(L) = \frac{E[X \wedge L]}{E[X \wedge B]}$$

- $B$ is the basic limit, so $\text{ILF}(B) = 1.000$ by construction and $\text{ILF}(L) > 1$ for $L > B$.
- $E[X \wedge L]$ is the **limited expected value**, the expected loss capped at $L$.

The limited expected value at a limit is also called the limited average severity, $\text{LAS}(L)$. It is the severity with every loss capped at $L$, whatever the actual policy limit. Actuaries may vary the profit provision by limit for the volatility of high limits, which departs from the assumption above.

> [!example]- 5,000 uncensored claims have these losses: 2,324 claims of at most $\$100{,}000$ total $\$117{,}629{,}223$, 1,923 claims between $\$100{,}000$ and $\$250{,}000$ total $\$307{,}599{,}929$, and 753 claims exceed $\$250{,}000$. What is the ILF for a $\$250{,}000$ limit over a $\$100{,}000$ basic limit? {Example}
> - Capped at $\$100{,}000$, the 2,676 claims above it contribute $2{,}676 \times 100{,}000 = \$267{,}600{,}000$.
> - $\text{LAS}(\$100\text{K}) = (117{,}629{,}223 + 267{,}600{,}000)/5{,}000 = \$77{,}046$.
> - Capped at $\$250{,}000$, the 753 claims above it contribute $753 \times 250{,}000 = \$188{,}250{,}000$.
> - $\text{LAS}(\$250\text{K}) = (117{,}629{,}223 + 307{,}599{,}929 + 188{,}250{,}000)/5{,}000 = \$122{,}696$.
> - The ILF is $122{,}696/77{,}046 = 1.59$.

## Pricing a layer of coverage

The loss cost of the layer between limits $M$ and $L$ is

> $$\text{Layer } (M, L] \text{ cost} = \text{Basic LC} \times \left[\text{ILF}(L) - \text{ILF}(M)\right]$$

- $\text{Basic LC}$ is the basic-limits loss cost.
- $M < L$.

> [!example]- The basic limit is $\$100{,}000$ with a loss cost of $\$800$. The ILFs are 1.25 at $\$300{,}000$ and 1.35 at $\$500{,}000$. What are the loss costs of a $\$500{,}000$ policy and of the layer $\$200{,}000$ excess of $\$300{,}000$? {Example}
> - The loss cost at $\$500{,}000$ is $800 \times 1.35 = \$1{,}080$.
> - The layer between $\$300{,}000$ and $\$500{,}000$ costs $800 \times (1.35 - 1.25) = \$80$.
> - The first $\$100{,}000$ of limit costs $\$800$, the next $\$200{,}000$ costs $\$200$, and the $\$200{,}000$ above that costs $\$80$.
> - Each successive layer is cheaper per dollar of limit, which is the consistency property.

## Limited average severity from censored data

Claim data are usually censored at each policy's limit, so the full amount of a loss above the limit is not known. Building the limited average severity layer by layer, so that losses censored at policy limits introduce no bias, the actuary:

1. Computes the limited average severity at the basic limit from the claims of all policies, whatever their limits, each capped at the basic limit, divided by the total number of claims.
2. Computes each layer's losses from the policies whose limits are as high as or higher than the top of the layer. A claim puts into the layer its amount capped at the top of the layer minus the bottom of the layer, zero if it is below the bottom, and the full width of the layer if it is above the top.
3. Divides the layer's losses by the number of those policies' claims reaching the layer, then multiplies by the probability that a claim exceeds the bottom of the layer, estimated from the same policies. That is the same as dividing the layer's losses by the total claim count of those policies.
4. Adds the result to the limited average severity below it, and each further layer the same way, like the layers of a [[Layer of Insurance|tower]].

> [!example]- The 5,000 claims come from policies with $\$100{,}000$, $\$250{,}000$ and $\$500{,}000$ limits, and $\text{LAS}(\$100\text{K}) = \$77{,}046$. The 2,981 claims of the $\$250{,}000$ and $\$500{,}000$ policies put $\$65{,}467{,}479$, $\$32{,}609{,}422$ and $232 \times 150{,}000$ into the layer from $\$100{,}000$ to $\$250{,}000$. What is $\text{LAS}(\$250\text{K})$? {Example}
> - The $\$100{,}000$ policies are left out, because their losses above $\$100{,}000$ are unknown.
> - The 232 claims above $\$250{,}000$ each put the layer's full width into it, which is $232 \times 150{,}000 = \$34{,}800{,}000$.
> - The layer's losses are $65{,}467{,}479 + 32{,}609{,}422 + 34{,}800{,}000 = \$132{,}876{,}901$.
> - Divided by the 2,981 claims of the policies that reach the layer, the layer adds $\$44{,}575$.
> - $\text{LAS}(\$250\text{K}) = 77{,}046 + 44{,}575 = \$121{,}621$, and the ILF is $121{,}621/77{,}046 = 1.579$.

## Limited average severity from a fitted distribution

The empirical approach is volatile because large claims are rare, so actuaries may fit a curve to the losses, such as a lognormal, a Pareto or a truncated Pareto. If losses have density $f(x)$ and cdf $F(x)$, the limited average severity at limit $L$ is

> $$\text{LAS}(L) = \int_0^L x f(x)\,dx + L\,[1 - F(L)]$$

- The integral is the losses below the limit.
- $L\,[1 - F(L)]$ is the limit paid on every loss that exceeds it.

ISO's mixed exponential methodology and [[Generalized Linear Model|generalized linear models]] are also used. A GLM copes better with sparse data, and it does not assume that frequency is the same at every limit.

> [!example]- Losses are exponential with mean $\$50{,}000$. What is the ILF for a $\$250{,}000$ limit over a $\$100{,}000$ basic limit? {Example}
> - For an exponential distribution with mean $\theta$, $\text{LAS}(L) = \theta\,(1 - e^{-L/\theta})$.
> - $\text{LAS}(\$100\text{K}) = 50{,}000\,(1 - e^{-2}) = \$43{,}233$.
> - $\text{LAS}(\$250\text{K}) = 50{,}000\,(1 - e^{-5}) = \$49{,}663$.
> - The ILF is $49{,}663/43{,}233 = 1.149$.

## Consistency of increased limits factors

Written with the survival function $S(x) = 1 - F(x)$, the limited average severity is $\text{LAS}(L) = \int_0^L S(x)\,dx$. Each additional dollar of limit at $x$ adds $S(x)$, the probability a loss exceeds $x$, which cannot rise as $x$ rises. The *marginal* indemnity cost per dollar of additional limit must therefore not increase as the limit rises. An indemnity ILF table whose marginal cost increases is not consistent with any size-of-loss distribution.

> [!example]- A filing proposes ILFs of 1.00 at $\$100{,}000$, 1.30 at $\$250{,}000$, 1.45 at $\$500{,}000$ and 1.75 at $\$1{,}000{,}000$. Is the table consistent? {Example}
> - From $\$100{,}000$ to $\$250{,}000$, the marginal cost per $\$1{,}000$ of limit is $0.30/150 = 0.00200$.
> - From $\$250{,}000$ to $\$500{,}000$, it is $0.15/250 = 0.00060$.
> - From $\$500{,}000$ to $\$1{,}000{,}000$, it is $0.30/500 = 0.00060$, flat.
> - A flat marginal cost means $S(x)$ does not fall anywhere between $\$250{,}000$ and $\$1{,}000{,}000$, so no loss could end in that range.
> - As indemnity-only factors, **the table is not realistic**: either the $\$1{,}000{,}000$ factor is too high or the $\$500{,}000$ factor is too low.

## Data, trend and development

Data at high limits is sparse and volatile, which is why ILFs are calculated from a broader body of experience (class group, state group or countrywide) and applied to class-, state- and territory-specific basic limit loss costs.

ILFs are **leveraged by inflation**. As losses grow, more of them pierce the basic limit and the excess layers grow faster than the ground-up trend, so ILF tables must be reviewed through inflationary periods. The losses are trended to the period the factors will be used in, and developed to ultimate first, because larger claims often develop differently than smaller ones. A deductible also truncates the data from below, and the number of claims it eliminated entirely may not be known.

The equal-frequency assumption fails for some lines. Personal auto insureds who choose very high limits tend to have lower accident frequencies. A GLM reflects that behavior, so it can give different, even counter-intuitive, factors, and actuaries may use both approaches to guide the selection.

## Increased limits factors with expenses and risk load

Palmer builds the expenses and a risk load into the factor, so the ILF at limit $L$ is

> $$\text{ILF}(L) = \frac{\text{LAS}(L) + \text{ALAE}(L) + \text{ULAE}(L) + \text{RL}(L)}{\text{LAS}(B) + \text{ALAE}(B) + \text{ULAE}(B) + \text{RL}(B)}$$

- $\text{ALAE}(L)$ and $\text{ULAE}(L)$ are the allocated and unallocated loss adjustment expenses at limit $L$.
- $\text{RL}(L)$ is the **risk load**, which covers process and parameter risk, both of which vary by limit.

A risk load that increases with the limit can lift the higher factors, so the consistency test is run on the indemnity component before the load is added. How ALAE and ULAE are loaded onto indemnity is on [[Loss and Loss Adjustment Expense]].

> [!trap] Applying the ILF to fixed expenses
> The ILF scales the whole rate only if every expense is variable. Fixed expenses do not rise with the limit, so where they are loaded into the rate, the premium at a higher limit rises by less than the ILF.
