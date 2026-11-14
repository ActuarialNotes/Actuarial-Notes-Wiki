---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9f44fed1ae6db302e71f684f742283415db6e05731e51d366458cee7483f4849
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder Dividend.md
---

A **Policyholder Dividend** is the share of divisible surplus that an insurer returns each year to the owner of a participating (par) policy. The premium for a par policy is set conservatively, and the dividend hands back the part of it that the actual interest, mortality and expense experience did not need.

The dividend is a non-guaranteed element: the company declares a dividend scale each year and can change it as experience changes. Under the **contribution principle**, surplus is distributed among policies in the same proportion as they contributed to it. The three-factor formula is the usual way of measuring that contribution, and under it the dividend for policy year $t$ is

> $$D_t = I_t + M_t + E_t$$

- $I_t$, $M_t$ and $E_t$ are the interest, mortality and expense factors.

The interest factor credits the excess of the earned rate over the reserve rate on the funds held for the policy, and is

> $$I_t = \left({}_{t-1}V + P\right)(i' - i)$$

- ${}_{t-1}V$ is the [[Reserve|reserve]] per policy at the start of policy year $t$.
- $P$ is the valuation net premium.
- $i$ is the interest rate in the reserve basis.
- $i'$ is the rate the company actually earns, or chooses for the dividend scale.

The mortality factor credits the mortality saved on the net amount at risk, and is

> $$M_t = (q_{x+t-1} - q'_{x+t-1})\left(S - {}_tV\right)$$

- $q_{x+t-1}$ is the mortality rate in the reserve basis.
- $q'_{x+t-1}$ is the mortality rate the company actually experiences, or chooses for the scale.
- $S$ is the sum insured.
- ${}_tV$ is the reserve at the end of the year, so $S - {}_tV$ is the net amount at risk.

A policy with a large reserve has a small net amount at risk, so its mortality factor is small. As the policy ages, the interest factor takes over from the mortality factor.

The expense factor returns the loading in the gross premium not used by expenses, with a year's interest, and is

> $$E_t = (G - P - e')(1 + i')$$

- $G$ is the gross premium, so $G - P$ is the loading.
- $e'$ is the actual expense per policy.

The interest factor uses the valuation net premium $P$, not the gross premium, so the loading is counted once. Both the interest and the expense factor use $i'$, so a change in the earned rate moves both.

The formula comes from the reserve recursion $({}_{t-1}V + P)(1 + i) = {}_tV + q(S - {}_tV)$. Replacing the reserve basis with actual experience and the net premium with the gross premium, and then subtracting the recursion, leaves the surplus the policy earned. That surplus splits exactly into the three factors. A dividend cannot be negative, so a negative factor reduces the others rather than charging the policyholder.

> [!example]- What dividend does this participating whole life policy earn in policy year $t$? {Example}
> A participating [[Whole Life Insurance|whole life]] policy has a sum insured of $\$100{,}000$. The reserve basis uses $i = 4\%$ and $q = 0.006$. The valuation net premium is $\$1{,}800$ and the gross premium is $\$2{,}300$. The reserves are $\$12{,}000$ at the start of the year and $\$13{,}835$ at the end. The dividend scale assumes the company earns $5.5\%$, experiences mortality of $0.0045$ and spends $\$180$ per policy.
>
> > [!answer]-
> > - The interest factor is $I_t = (12{,}000 + 1{,}800)(0.055 - 0.04) = 207.00$.
> > - The net amount at risk is $100{,}000 - 13{,}835 = 86{,}165$.
> > - The mortality factor is $M_t = (0.006 - 0.0045)(86{,}165) = 129.25$.
> > - The expense factor is $E_t = (2{,}300 - 1{,}800 - 180)(1.055) = 337.60$.
> > - The dividend is $D_t = 207.00 + 129.25 + 337.60 = \$673.85$.
> > - As a check, the surplus earned is $(12{,}000 + 2{,}300 - 180)(1.055) - 0.0045(86{,}165) - 13{,}835 = 673.86$. It agrees to within the cent by which the reserves miss the recursion.

## Dividend options

The owner can take the dividend in cash, use it to reduce the next premium, leave it to accumulate at interest, or buy paid-up additions or one-year term insurance. Paid-up additions increase the death benefit and the cash value, and they are themselves participating.

Outside North America, with-profits policies usually share surplus through reversionary and terminal bonuses added to the sum insured, rather than through cash dividends.

## Setting the dividend scale

The company projects an asset share for each cell on its current experience. It checks that the scale moves the asset share toward its target surplus without leaving it short. A scale is changed when the anticipated experience changes, not to recover past losses or to fund growth, since cutting dividends to pay for new business breaks the contribution principle. Changes are often phased in or smoothed so that dividends do not swing from year to year.

The illustrated scale matters because illustrations sell the policy. A cut affects the policyholders' reasonable expectations and the company's reputation.

> [!example]- What is this policy's revised dividend, and what should the company consider before cutting the scale? {Example}
> The whole life policy in the example above has $\$12{,}000$ of reserve at the start of the year, a valuation net premium of $\$1{,}800$, a gross premium of $\$2{,}300$ and expenses of $\$180$. The reserve basis uses $i = 4\%$, and its mortality factor is $129.25$. New money yields fall, and the company now expects to earn $4.8\%$ on the assets backing the policy.
>
> > [!answer]-
> > - Both the interest factor and the expense factor use $i'$.
> > - The interest factor is $13{,}800(0.048 - 0.04) = 110.40$.
> > - The expense factor is $320(1.048) = 335.36$.
> > - The mortality factor is unchanged at $129.25$, so the dividend is $110.40 + 129.25 + 335.36 = \$575.01$.
> > - The dividend falls by $\$98.84$, or $14.7\%$.
> > - A change in anticipated experience is the right reason for changing a non-guaranteed element, so the cut is justified.
> > - Before declaring it, the company should check the effect on the asset share against its target and decide whether to phase the cut in.
> > - It should also compare its scale with competitors' to judge the lapse risk, and explain the change to policyholders whose illustrations showed the old scale.

On [[Universal Life Insurance|universal life]], the same requirement that changes follow anticipated experience applies to the other non-guaranteed elements, cost of insurance charges and crediting rates. See [[In-Force Management]].

> [!trap] Multiplying the mortality saving by the full sum insured
> The mortality factor multiplies by $S - {}_tV$, not by $S$. Using the full sum insured overstates it, most of all on older policies with large reserves. In the example, $0.0015 \times 100{,}000 = 150$ against the correct $129.25$.
