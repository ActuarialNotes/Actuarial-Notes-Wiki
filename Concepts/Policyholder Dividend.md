---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6a079d701af65adc6b051798fa5d6512e18d74d2a415e61536a6b60b77978917
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder Dividend.md
---

**A Policyholder Dividend** is the share of divisible surplus that an insurer returns each year to the owner of a participating (par) policy. The premium for a par policy is set conservatively, and the dividend hands back the part of it that the actual interest, mortality and expense experience did not need. It is a non-guaranteed element: the company declares a dividend scale each year and can change it as experience changes. Under the **contribution principle**, surplus is distributed among policies in the same proportion as they contributed to it, and the three-factor formula is the usual way of measuring that contribution.

> $$D_t = I_t + M_t + E_t$$

> $$I_t = \left({}_{t-1}V + P\right)(i' - i)$$

> $$M_t = (q_{x+t-1} - q'_{x+t-1})\left(S - {}_tV\right)$$

> $$E_t = (G - P - e')(1 + i')$$

- **Symbols:** ${}_{t-1}V$ and ${}_tV$ are the [[Reserve|reserves]] per policy at the start and end of policy year $t$, $P$ is the valuation net premium, and $G$ is the gross premium. $i$ and $q_{x+t-1}$ are the interest rate and mortality rate in the reserve basis, $i'$ and $q'_{x+t-1}$ are the rates the company actually experiences or chooses for the dividend scale, $e'$ is the actual expense per policy, and $S$ is the sum insured.
- **Where the formula comes from:** The reserve satisfies $({}_{t-1}V + P)(1 + i) = {}_tV + q(S - {}_tV)$. Replacing the reserve basis with actual experience and the net premium with the gross premium, and then subtracting the reserve recursion, leaves the surplus the policy earned, which splits exactly into the interest, mortality and expense factors above.
- **Each factor:** The interest factor credits the excess of the earned rate over the reserve rate on the funds held for the policy. The mortality factor credits the mortality saved on the net amount at risk, $S - {}_tV$, so a policy with a large reserve has little mortality factor. The expense factor returns the loading in the gross premium not used by expenses, with a year's interest.
- **Dividend options:** The owner can take the dividend in cash, use it to reduce the next premium, leave it to accumulate at interest, or buy paid-up additions or one-year term insurance. Paid-up additions increase the death benefit and the cash value, and they are themselves participating.
- **Setting the scale:** The company projects an asset share for each cell on its current experience and checks that the scale moves the asset share toward its target surplus without leaving it short. A scale is changed when the anticipated experience changes, and changes are often phased in or smoothed so that dividends do not swing from year to year. The illustrated scale matters because illustrations sell the policy, so a cut affects the policyholders' reasonable expectations and the company's reputation.
- **Other forms:** A dividend cannot be negative, so a negative factor reduces the others rather than charging the policyholder. Outside North America, with-profits policies usually share surplus through reversionary and terminal bonuses that are added to the sum insured, rather than cash dividends.

> [!example]- Three-Factor Dividend on a Whole Life Policy {Example}
> A participating [[Whole Life Insurance|whole life]] policy has a sum insured of \$100,000. In policy year $t$, the reserve basis uses $i = 4\%$ and $q = 0.006$, the valuation net premium is \$1,800, and the reserves are \$12,000 at the start of the year and \$13,835 at the end. The gross premium is \$2,300. The dividend scale assumes the company earns 5.5%, experiences mortality of 0.0045, and spends \$180 per policy. Find the dividend.
>
> > [!answer]-
> > The reserves satisfy the recursion to within a cent, so the three factors capture all the surplus.
> > $$
> > \begin{align*}
> > I_t &= (12{,}000 + 1{,}800)(0.055 - 0.04) \\
> > &= 207.00 \\
> > M_t &= (0.006 - 0.0045)(100{,}000 - 13{,}835) \\
> > &= 129.25 \\
> > E_t &= (2{,}300 - 1{,}800 - 180)(1.055) \\
> > &= 337.60 \\
> > D_t &= 207.00 + 129.25 + 337.60 \\
> > &= 673.85
> > \end{align*}
> > $$
> > The dividend is \$673.85. The surplus the policy earns over the year, $(12{,}000 + 2{,}300 - 180)(1.055) - 0.0045(86{,}165) - 13{,}835 = 673.86$, agrees to within the cent by which the reserves miss the recursion. As the policy ages the reserve grows, so the interest factor takes over from the mortality factor.

> [!example]- Recommending a Change to the Scale {Example}
> New money yields fall, and the company now expects to earn 4.8% on the assets backing this block, with mortality and expenses unchanged. Find the revised dividend for the same policy and year, and say what the company should consider before cutting the scale.
>
> > [!answer]-
> > Both the interest factor and the expense factor use $i'$.
> > $$
> > \begin{align*}
> > I_t &= 13{,}800(0.048 - 0.04) \\
> > &= 110.40 \\
> > E_t &= 320(1.048) \\
> > &= 335.36 \\
> > D_t &= 110.40 + 129.25 + 335.36 \\
> > &= 575.01
> > \end{align*}
> > $$
> > The dividend falls by \$98.84, or 14.7%. The cut is justified by a change in anticipated experience, which is the right reason for changing a non-guaranteed element. Before declaring it, the company should check the effect on the asset share against its target, decide whether to phase the cut in, compare its scale with competitors' to judge the lapse risk, and explain the change to policyholders whose illustrations showed the old scale.

> [!tip]- How it appears on the exam
> - **ILA-201I:** Questions ask candidates to recommend and justify changes to policyholder dividends. A case gives the block's emerging experience, and the answer computes the revised dividend or the factor that changed, then weighs the change against the contribution principle, the asset share and policyholder expectations.
> - **ILA-201U:** The same objective covers non-guaranteed elements more broadly, so dividend changes appear alongside changes to cost of insurance charges and crediting rates on [[Universal Life Insurance|universal life]], under the same requirement that changes follow anticipated experience. See [[In-Force Management]].

> [!warning]- Exam traps
> - **Net amount at risk:** The mortality factor multiplies by $S - {}_tV$, not by $S$. Using the full sum insured overstates the mortality factor, most of all on older policies with large reserves.
> - **Net premium in two places:** The interest factor uses the valuation net premium $P$, and the expense factor uses the loading $G - P$. Using the gross premium in the interest factor counts the loading twice.
> - **Interest on the loading:** The expense factor earns a year's interest at $i'$, so a change in the earned rate moves both the interest factor and the expense factor.
> - **Reasons for a change:** A scale change is justified by anticipated experience, not by a wish to recover past losses or to fund growth. An answer that cuts dividends to pay for new business breaks the contribution principle.
