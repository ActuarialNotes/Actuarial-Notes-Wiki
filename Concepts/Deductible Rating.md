---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:c730c9dedd4b55639b09e6facfc1b5e3c09698b35d6768fd7c17ddbc6436b069
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.197-204 (PDF pp.209-216); Ch.9 p.161 (PDF p.173); Ch.15 p.303 (PDF p.315), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Palmer, Increased Limits Ratemaking for Liability Insurance (CAS study note, 2006), PDF pp.13-14, sha256:44fcc71dbf33647fd07be04e515239989907eb894fc8df5fb18b541ebe301cf7 — https://www.casact.org/sites/default/files/database/studynotes_palmer.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deductible Rating.md
---

![[Media/Figures/Deductible_Rating.svg|340]]

**Deductible Rating** is the pricing of policies under which the insured retains the first $d$ dollars of each loss. The rate credit is derived from the [[Loss Elimination Ratio|loss elimination ratio]], the share of expected losses the deductible removes. For a ground-up loss $X$, the loss elimination ratio of a deductible $d$ is

> $$\text{LER}(d) = \frac{E[X \wedge d]}{E[X]}$$

- $E[X \wedge d]$ is the [[Limited Expected Value|expected loss limited to $d$]], the expected amount of each loss that falls below the deductible.
- $E[X]$ is the expected ground-up loss.

If all expenses are variable and the variable expense and profit provisions are a constant percentage of premium, the indicated deductible relativity to full coverage is

> $$\text{Deductible Relativity} = 1 - \text{LER}(d)$$

A lower deductible eliminates less, so more small losses become claims. Claim frequency rises, and the average severity per claim falls.

When the ground-up loss of every claim is known, the loss elimination ratio is the sum of each loss capped at the deductible divided by the sum of the losses. The losses below $d$ are eliminated in full, and $d$ is eliminated from every loss at or above it.

> [!example]- A homeowners book has 10,000 claims with $\$13{,}604{,}390$ of ground-up losses. 4,425 claims, with $\$447{,}953$ of losses, are below $\$250$, and the other 5,575 are at least $\$250$. What are the loss elimination ratio and the relativity for a $\$250$ deductible? {Example}
> - The claims below $\$250$ are eliminated in full, which is $\$447{,}953$.
> - Each of the 5,575 larger claims has $\$250$ eliminated, which is $5{,}575 \times 250 = \$1{,}393{,}750$.
> - The losses eliminated are $447{,}953 + 1{,}393{,}750 = \$1{,}841{,}703$.
> - The loss elimination ratio is $1{,}841{,}703/13{,}604{,}390 = 0.135$.
> - The rate credit for moving from full coverage to a $\$250$ deductible is 13.5%, and the deductible relativity is $1 - 0.135 = 0.865$.

## Losses eliminated by a fitted distribution

If losses follow a continuous distribution with density $f(x)$ and cdf $F(x)$, the expected loss eliminated by a deductible $d$ is

> $$E[X \wedge d] = \int_0^d x f(x)\,dx + d\,[1 - F(d)]$$

- The integral is the losses below the deductible, eliminated in full.
- $d\,[1 - F(d)]$ is the deductible eliminated from every loss that exceeds it.

Each extra dollar of deductible eliminates $1 - F(d)$ per claim, the probability that a loss exceeds $d$. That probability can only fall as $d$ rises. The credit per dollar of deductible must therefore *decrease* as the deductible rises, and a schedule that violates this is not consistent with any size-of-loss distribution.

> [!example]- Losses are exponential with mean $\$1{,}000$. What is the loss elimination ratio of a $\$500$ deductible? {Example}
> - For an exponential distribution with mean $\theta$, the limited expected value is $E[X \wedge d] = \theta\,(1 - e^{-d/\theta})$.
> - With $\theta = 1{,}000$ and $d = 500$, it is $1{,}000\,(1 - e^{-0.5}) = \$393.47$.
> - The loss elimination ratio is $393.47/1{,}000 = 0.393$.

## Loss elimination ratios from net losses

Insureds may not report claims that are obviously below their deductible, so the data may hold only net losses, the part of each reported loss above the deductible. When the data hold only losses net of the deductible, policies with a deductible *higher* than the one being priced cannot be used. Policies with a lower deductible can, and the data of all lower-deductible policies are combined to add volume. The loss elimination ratio of a move from deductible $d_1$ to a higher $d_2$ is the losses eliminated between them divided by the losses at $d_1$.

> [!example]- Policies with full coverage, a $\$100$ deductible and a $\$250$ deductible have $\$4{,}705{,}075$ of net losses restated to a $\$250$ deductible. Restating them to a $\$500$ deductible eliminates $\$505{,}682$. What is the loss elimination ratio for moving from $\$250$ to $\$500$, and why are the $\$500$ and $\$1{,}000$ policies left out? {Example}
> - The loss elimination ratio is $505{,}682/4{,}705{,}075 = 0.107$.
> - The $\$500$ and $\$1{,}000$ policies report only losses above their own deductibles, so their losses between $\$250$ and $\$500$ are unknown.

## Deductible relativities with fixed expenses

[[Fixed Expenses|Fixed expenses]] do not fall because the insured takes a deductible. Where they are material and are not charged as a separate fee, the credit applies to the loss portion only, and the rate at deductible $d$ is

> $$\text{Rate}(d) = \frac{\text{Pure Premium} \times (1 - \text{LER}(d)) + F}{1 - V - Q_T}$$

- $\text{Pure Premium}$ is the full-coverage [[Pure Premium|pure premium]].
- $F$ is the fixed expense per exposure, $V$ the [[Variable Expenses|variable expense]] provision and $Q_T$ the target profit provision.

> [!example]- A homeowners program has a full-coverage pure premium of $\$620$. The loss elimination ratios are 0.145 at $\$500$, 0.225 at $\$1{,}000$ and 0.360 at $\$2{,}500$. Fixed expenses are $\$70$ per policy, variable expenses 24% and the target profit 5%. What is the rate at each deductible? {Example}
> - The share of premium left after variable expenses and profit is $1 - 0.24 - 0.05 = 0.71$.
> - At $\$500$, the rate is $(620 \times 0.855 + 70)/0.71 = \$845.21$.
> - At $\$1{,}000$, it is $(620 \times 0.775 + 70)/0.71 = \$775.35$.
> - At $\$2{,}500$, it is $(620 \times 0.640 + 70)/0.71 = \$657.46$.
> - The credit per dollar of deductible falls, from $(845.21 - 775.35)/500 = 14.0$ cents to $(775.35 - 657.46)/1{,}500 = 7.9$ cents, as it must.
> - Raising the deductible from $\$500$ to $\$2{,}500$ eliminates $25\%$ of losses but only $22\%$ of premium, because the $\$70$ of fixed expense rides on regardless.

## Practical considerations

The loss elimination ratio approach assumes that claiming behavior is the same at every deductible. Werner and Modlin note two ways it is not:

1. **Claim reporting.** An insured with a higher deductible may not report a claim whose small net payment is not worth a claim surcharge.
2. **Self-selection.** Where insureds choose freely, lower-risk insureds tend to choose higher deductibles, so higher-deductible policies may end up more profitable than lower-deductible ones.

A [[Classification Ratemaking|classification analysis]] of the historical data reflects these differences, and the actuary may look at both sets of indications before selecting the relativities.

Deductibles erode with [[Inflation|inflation]]. A fixed $d$ eliminates a falling share of a growing loss, so relativities must be refreshed or higher-deductible business becomes under-priced.

A percentage credit can also exceed the deductible itself. A 13.5% credit on a $\$3{,}000$ policy is $\$405$, more than a $\$250$ deductible, so the insured is better off taking the deductible unless they expect several losses. An insurer may cap the dollar credit, vary the credits by the value of the home, or use a percentage deductible, which grows with the amount of insurance.

On a [[Large Deductible Policy|large deductible policy]] the insurer may pay the whole claim and seek reimbursement below the deductible from the insured, the [[Deductible Recovery|deductible recovery]]. The premium must then cover invoicing and monitoring and a provision for the credit risk that the insured cannot pay, which collateral rarely covers fully.

> [!example]- A filing proposes credits of 8% at a $\$2{,}500$ deductible, 14% at $\$5{,}000$ and 28% at $\$10{,}000$, against a $\$1{,}000$ base. Is the schedule consistent? {Example}
> - From $\$1{,}000$ to $\$2{,}500$, the credit is $8\%/1{,}500 = 0.53\%$ per $\$100$ of deductible.
> - From $\$2{,}500$ to $\$5{,}000$, it is $6\%/2{,}500 = 0.24\%$ per $\$100$.
> - From $\$5{,}000$ to $\$10{,}000$, it is $14\%/5{,}000 = 0.28\%$ per $\$100$, a rise.
> - The layer from $\$5{,}000$ to $\$10{,}000$ cannot hold more expected loss per dollar than the layer below it, so **the schedule is not consistent**, and the credits should be re-derived from one size-of-loss distribution.

> [!trap] Applying the loss elimination ratio to the whole rate
> $1 - \text{LER}(d)$ is the relativity of the whole rate only if every expense is variable. With a fixed expense, applying it to the whole rate over-credits the deductible. In the program above, moving from a $\$500$ to a $\$2{,}500$ deductible cuts the loss cost by 25%, but the rate by only 22%.
