---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:580b724f25c846b310e81393e25c3469dd9413d28894139599d2652440df712d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term Conversion.md
---

**Term Conversion** is the exercise of a conversion privilege in a [[Term Life Insurance|term life]] policy, which lets the owner exchange the term cover for a permanent policy, such as [[Whole Life Insurance|whole life]] or [[Universal Life Insurance|universal life]], without new evidence of insurability. Because the owners most likely to convert are those whose health has worsened, converted policies have higher [[Mortality|mortality]] than newly underwritten policies, and that extra mortality is a cost the insurer must price and reserve for.

The conversion rate in policy year $t$ is

> $$c_t = \frac{\text{conversions in policy year } t}{\text{exposure in policy year } t}$$

## The conversion privilege

A conversion option usually runs until a stated age or policy duration, and some products limit it to the first part of the level premium period. The new policy is issued at the attained age, at the permanent product's standard premium rates, and generally in the original underwriting class.

Conversion rates are low during the level premium period and rise sharply at its end, when the term premium jumps and the owner must choose between paying it, lapsing or converting. They also rise just before the conversion privilege expires.

## Anti-selection in conversions

Healthy owners can buy new underwritten cover at select rates, so they lapse or replace. Owners in poor health cannot, so they convert. This [[Adverse Selection|adverse selection]] makes converted mortality a multiple of select mortality, highest in the first years after conversion and wearing off with duration. Applying one multiple to every duration overstates the long-run cost and misstates its timing.

## Extra mortality cost

For a policy converted at attained age $y$ for sum insured $S$, with converted mortality above select mortality for $n$ years, the expected present value of the extra mortality cost is

> $$\text{EMC} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp^{c}_{y}\left(q^{c}_{y+k} - q^{s}_{[y]+k}\right) S$$

- $q^{c}_{y+k}$ is the mortality of converted policies.
- $q^{s}_{[y]+k}$ is the select mortality of newly underwritten policies of the same age, on which the permanent product's premiums are based.
- ${}_kp^{c}_{y}$ is the converted policy's survival probability.

> [!example]- What is the extra mortality cost of these conversions, per converted policy and for the block? {Example}
> A block of 1,000 ten-year level term policies of $\$250{,}000$ each reaches the end of its level period with the insureds aged 55, and 4% of the policies convert to whole life. With illustrative assumptions, converted mortality is 200% of the select new-issue rates of 0.0030, 0.0035, 0.0040, 0.0045 and 0.0050 for the first five years after conversion, and the same as select mortality after that. Use $i = 4\%$.
>
> > [!answer]-
> > - Converted mortality is twice the select rate, so the extra mortality in each year equals the select rate.
> > - The converted survival probabilities are $1$, $0.994$, $0.98704$, $0.97915$ and $0.97033$.
> > - The five discounted extra costs are $250{,}000(0.0030)/1.04 = 721.15$, then $804.13$, $877.48$, $941.60$ and $996.93$.
> > - Their sum is $\text{EMC} = \$4{,}341.29$ per converted policy.
> > - There are $1{,}000 \times 0.04 = 40$ conversions, so the block's extra mortality cost is $40 \times 4{,}341.29 = \$173{,}651.60$ in present value at the conversion date.
> > - The permanent premiums assume select mortality, so this amount is a loss on the permanent block unless it is charged to the term product.

## Pricing the option into the term premium

The extra mortality emerges on the permanent block, but the option is part of the term product. Many companies charge the term product for the expected cost and credit it to the permanent product, so that each product's profitability reflects its own risks. Per policy in force at the conversion date, the cost is

> $$\text{Cost per term policy} = c_t \times \text{EMC}$$

Charged per term policy issued, it is also multiplied by the probability of being in force at the conversion date and discounted to issue.

> [!example]- What is the present value at issue of the conversion cost per term policy issued? {Example}
> In the block above, with an EMC of $\$4{,}341.29$ and a 4% conversion rate, the term product is priced so that 55% of issued policies are expected to be in force at the end of the 10-year level period. Use $i = 4\%$.
>
> > [!answer]-
> > - The cost arises only for policies still in force that convert, 10 years after issue.
> > - The present value is $0.55 \times 0.04 \times 4{,}341.29 \times 1.04^{-10} = \$64.52$ per policy issued, which has to come from the term premiums.
> > - The conversion rate is the assumption with the least data, so a pricing actuary would test the cost at higher rates, such as those that follow a larger premium jump.

## Setting the assumptions

Conversion rates come from [[Experience Study|experience studies]] by duration, attained age, premium jump at the end of the level period, face amount and risk class. The SOA's 2017 study of predictive models for conversions in level premium term plans uses these variables in [[Generalized Linear Model|generalized linear models]]. Converted mortality is measured as an [[Actual vs Expected Analysis|A/E ratio]] against a select table, by duration since conversion.

At the end of the level period, healthy lives lapse and impaired lives convert or keep the term cover. Assuming the converted and persisting lives have the same mortality as the whole block before the jump understates both costs.

## Reserving for conversions

Reserves must recognize the cost as well as the price. The cost is incurred on the term product but emerges on the permanent block, so a reserve that ignores the option on the term product, or values converted policies on new-issue select mortality, is too small.

> [!trap] Measuring extra mortality against ultimate rates
> The extra cost is measured against the select mortality the permanent premiums assume. Ultimate rates are already higher, so measuring against them understates the cost.
