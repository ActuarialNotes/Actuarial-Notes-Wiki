---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5eb7b98ebc2fba3e12a3d6ff0fb0bc36530cf6f9b6d28035eda893c76f53e865
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/No-Lapse Guarantee.md
---

A **No-Lapse Guarantee** is a secondary guarantee on a [[Universal Life Insurance|universal life]] policy that keeps the death benefit in force as long as the policyholder pays specified premiums, even if the account value falls to zero. Without it, a policy whose account value cannot pay the year's charges [[Lapse|lapses]].

## The account value under the guarantee

When the cost of insurance is discounted at the credited rate $i^c$, the Type A account value recursion is

> $$AV_t = \frac{\left(AV_{t-1} + G - EC_t\right)(1+i^c) - q^{*}_{x+t-1}\,FA}{1 - q^{*}_{x+t-1}}$$

- $G$ is the specified premium, paid at the start of the year.
- $EC_t$ is the expense charge for year $t$.
- $q^{*}_{x+t-1}$ is the cost of insurance rate.
- $FA$ is the face amount.

The specified premium is set below the charges the policy incurs at older ages, so the account value runs down while the guarantee is in force. A projected account value below zero means the guarantee has taken over. The account is set to zero, and the shortfall is the insurer's cost, not a debt of the policyholder.

> [!example]- How does this policy's account value run down under the specified premium? {Example}
> A Type A universal life policy has face amount \$100,000 and an account value of \$2,000 at age 75. It carries a no-lapse guarantee to age 80 for a specified premium of \$1,500 a year, paid in advance. The expense charge is 5% of premium, the cost of insurance rates are 120% of the SULT ($q^{*}_{75} = 0.022120$, $q^{*}_{76} = 0.024802$, $q^{*}_{77} = 0.027810$), and both the credited rate and the cost of insurance discount rate are 4%. The policyholder pays only the specified premium.
>
> > [!answer]-
> > - Each year the premium less the 75 expense charge adds 1,425 to the account.
> > - $AV_1 = \big(3{,}425(1.04) - 2{,}212.00\big)/0.977880 = 1{,}350.00/0.977880 = 1{,}380.54$.
> > - $AV_2 = \big(2{,}805.54(1.04) - 2{,}480.20\big)/0.975198 = 437.56/0.975198 = 448.69$.
> > - $AV_3 = \big(1{,}873.69(1.04) - 2{,}781.00\big)/0.972190 = -856.17$.
> > - In year 3 the account cannot pay the charges. Without the guarantee, the policy would lapse unless the policyholder paid more.
> > - With the guarantee, the account value is set to 0 at age 78 and the \$100,000 of cover stays in force for the specified premium alone.

## The reserve for the guarantee

After the account value reaches zero, the insurer receives only $G$ each year but still pays the full death benefit, so it must hold a [[Reserve|reserve]] beyond the account value. A [[Profit Testing|profit test]] projects the policy with the policyholder paying exactly the specified premiums, holds the account value as the reserve while it lasts, and records the negative profits that follow once it is gone. Zeroizing those profits gives the reserve recursion

> $${}_{t-1}V = \frac{q_{x+t-1}\,S + p_{x+t-1}\,{}_tV}{1+i} - \left(G - E_t\right)$$

- $q_{x+t-1}$ is the insurer's best-estimate mortality, and $p_{x+t-1} = 1 - q_{x+t-1}$.
- $S$ is the guaranteed death benefit.
- $i$ is the rate the insurer earns.
- $E_t$ is the insurer's expense in year $t$.
- ${}_nV = 0$ at the end of the guarantee period.

While every year would otherwise show a loss, the result is the gross premium [[Policy Value|policy value]] of the guaranteed cover less the specified premiums, at the earned rate. The account is credited at $i^c$ while the reserve earns $i$, so a question that gives both expects the account projection at $i^c$ and the reserve at $i$.

> [!example]- What reserve does the guarantee need at age 78, once the account is empty? {Example}
> Continue the policy above from age 78, when the account value is 0 and two years of the guarantee remain. The insurer pays expenses of 3% of each premium, earns 5%, and expects mortality to follow the SULT at 5%, with $q_{78} = 0.025984$ and $q_{79} = 0.029132$.
>
> > [!answer]-
> > - With no reserve, each year's profit is $1{,}455(1.05) - 100{,}000\,q = 1{,}527.75 - 100{,}000\,q$. This is $-1{,}070.65$ at age 78 and $-1{,}385.45$ at age 79.
> > - Zeroizing works backward from the end of the guarantee, where ${}_2V = 0$.
> > - ${}_1V = 2{,}913.20/1.05 - 1{,}455 = 1{,}319.48$.
> > - ${}_0V = \big(2{,}598.40 + 0.974016(1{,}319.48)\big)/1.05 - 1{,}455 = 3{,}883.59/1.05 - 1{,}455 = 2{,}243.66$.
> > - The gross premium policy value at 5% agrees: $100{,}000\,A^{1}_{78:\overline{2}|} - 1{,}455\,\ddot{a}_{78:\overline{2}|} = 5{,}048.37 - 2{,}804.71 = 2{,}243.66$.
> > - At age 78 the account value is 0, but the guarantee needs a reserve of \$2,243.66 per policy. This amount has to be built up in the earlier years, while the account value still covers the charges.

The insurer needs enough both for a policyholder who surrenders and for one who keeps the guarantee, so it holds at least the larger of the account value and the value of the guarantee. Policyholders with an empty account and a valuable guarantee have every reason to keep paying, so the lapse assumption has a large effect on that value.

> [!trap] Using the cost of insurance rates in the reserve
> The account is charged at the cost of insurance rates, but the insurer pays claims at its own best-estimate mortality. Using the cost of insurance rates in the reserve for the guarantee overstates the expected claims.
