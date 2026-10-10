---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b4c76f4db99fbaa28d8d336077fa92dc2a22e4dcd3c1bb6e1fec2a98f708f728
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term Conversion.md
---

**Term Conversion** is the exercise of a conversion privilege in a [[Term Life Insurance|term life]] policy, which lets the owner exchange the term cover for a permanent policy, such as [[Whole Life Insurance|whole life]] or [[Universal Life Insurance|universal life]], without new evidence of insurability. Because the owners most likely to convert are those whose health has worsened, converted policies have higher [[Mortality|mortality]] than newly underwritten policies, and that extra mortality is a cost the insurer must price and reserve for.

> $$c_t = \frac{\text{conversions in policy year } t}{\text{exposure in policy year } t}$$

> $$\text{EMC} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp^{c}_{y}\left(q^{c}_{y+k} - q^{s}_{[y]+k}\right) S$$

> $$\text{Cost per term policy} = c_t \times \text{EMC}$$

- **Symbols:** $c_t$ is the conversion rate. $\text{EMC}$ is the expected present value of the extra mortality cost per converted policy, issued at attained age $y$ for sum insured $S$. $q^{c}_{y+k}$ is the mortality of converted policies and $q^{s}_{[y]+k}$ the select mortality of newly underwritten policies of the same age, on which the permanent product's premiums are based, and ${}_kp^{c}_{y}$ is the converted policy's survival probability.
- **The privilege:** A conversion option usually runs until a stated age or policy duration, and some products limit it to the first part of the level premium period. The new policy is issued at the attained age, at the permanent product's standard premium rates, and generally in the original underwriting class.
- **When conversions happen:** Conversion rates are low during the level premium period and rise sharply at its end, when the term premium jumps and the owner must choose between paying it, lapsing or converting. They also rise just before the conversion privilege expires.
- **Anti-selection:** Healthy owners can buy new underwritten cover at select rates, so they lapse or replace. Owners in poor health cannot, so they convert. This [[Adverse Selection|adverse selection]] makes converted mortality a multiple of select mortality, highest in the first years after conversion and wearing off with duration.
- **Who pays:** The extra mortality emerges on the permanent block, but the option is part of the term product. Many companies charge the term product for the expected cost and credit it to the permanent product, so that each product's profitability reflects its own risks.
- **Setting the assumptions:** Conversion rates come from [[Experience Study|experience studies]] by duration, attained age, premium jump at the end of the level period, face amount and risk class. The SOA's 2017 study of predictive models for conversions in level premium term plans uses these variables in [[Generalized Linear Model|generalized linear models]]. Converted mortality is measured as an [[Actual vs Expected Analysis|A/E ratio]] against a select table, by duration since conversion.
- **Reserving:** Reserves must recognize the cost as well as the price. The cost is incurred on the term product but emerges on the permanent block, so a reserve that ignores the option on the term product, or values converted policies on new-issue select mortality, is too small.

> [!example]- Extra Mortality Cost of Conversions at the End of the Level Period {Example}
> A block of 1,000 ten-year level term policies of \$250,000 each reaches the end of its level period with the insureds aged 55, and 4% of the policies convert to whole life. With illustrative assumptions, converted mortality is 200% of the select new-issue rates of 0.0030, 0.0035, 0.0040, 0.0045 and 0.0050 for the first five years after conversion, and the same as select mortality after that. Using $i = 4\%$, find the expected present value of the extra mortality cost per converted policy and for the block.
>
> > [!answer]-
> > The extra mortality in each year equals the select rate, because converted mortality is twice it. The converted survival probabilities are $1$, $0.994$, $0.98704$, $0.97915$ and $0.97033$.
> > $$
> > \begin{align*}
> > \text{EMC} &= 250{,}000\left[\frac{0.0030}{1.04} + \frac{0.994(0.0035)}{1.04^2} + \frac{0.98704(0.0040)}{1.04^3}\right. \\
> > &\quad \left. + \frac{0.97915(0.0045)}{1.04^4} + \frac{0.97033(0.0050)}{1.04^5}\right] \\
> > &= 721.15 + 804.13 + 877.48 + 941.60 + 996.93 \\
> > &= 4{,}341.29
> > \end{align*}
> > $$
> > There are $1{,}000 \times 0.04 = 40$ conversions, so the block's extra mortality cost is $40 \times 4{,}341.29 = \$173{,}651.70$ in present value at the conversion date. The permanent premiums assume select mortality, so this amount is a loss on the permanent block unless it is charged to the term product.

> [!example]- Pricing the Option Into the Term Premium {Example}
> Continuing the example, the term product is priced so that 55% of issued policies are expected to be in force at the end of the 10-year level period. Find the present value at issue, at 4%, of the conversion cost per term policy issued.
>
> > [!answer]-
> > The cost arises only for policies still in force that convert, 10 years after issue.
> > $$
> > \begin{align*}
> > \text{PV} &= 0.55 \times 0.04 \times 4{,}341.29 \times 1.04^{-10} \\
> > &= 64.52
> > \end{align*}
> > $$
> > About \$64.52 per policy issued has to come from the term premiums. The cost is sensitive to the conversion rate, which is the assumption with the least data, so a pricing actuary would test it at higher conversion rates, such as the rates that follow a larger premium jump at the end of the level period.

> [!tip]- How it appears on the exam
> - **ILA-101 assumption questions:** Candidates describe how conversion rates and converted mortality are set, which policy features drive them, and why converted mortality exceeds new-issue mortality, drawing on the 2017 *Product Matters* article on pricing and reserving term conversions and the SOA's conversion study.
> - **Calculation:** A short calculation gives conversion rates and an extra mortality assumption and asks for the cost of conversions per converted policy or per term policy issued.
> - **Evaluation:** Some questions describe a product change, such as a larger premium jump, a longer conversion period or a new preferred class, and ask how conversion rates and their cost would change.

> [!warning]- Exam traps
> - **Pricing against the wrong mortality:** The extra cost is measured against the select mortality the permanent premiums assume, not against ultimate mortality. Measuring against ultimate rates, which are already higher, understates the cost.
> - **Converters versus all policies:** The extra mortality cost per converted policy must be multiplied by the probability of converting, and by the probability of being in force at the conversion date, before it is charged per term policy issued. Skipping either step overstates the charge.
> - **Shock lapse and conversions together:** At the end of the level period, healthy lives lapse and impaired lives convert or keep the term cover. Assuming the converted and persisting lives have the same mortality as the whole block before the jump understates both costs.
> - **Wear-off:** Converted mortality is highest just after conversion and falls with duration. Applying one multiple to every duration overstates the long-run cost and misstates its timing.
