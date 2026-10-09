---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:579c7a5599e81f7a3d9b2682a7fd5a7143f2897091dd8a2b068d4d182e1821a2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/No-Lapse Guarantee.md
---

**A No-Lapse Guarantee** is a secondary guarantee on a [[Universal Life Insurance|universal life]] policy that keeps the death benefit in force as long as the policyholder pays specified premiums, even if the account value falls to zero. Without it, a policy whose account value cannot pay the year's charges [[Lapse|lapses]]. With it, the insurer keeps paying death claims after the account is empty, with nothing left to deduct charges from, so it must hold a [[Reserve|reserve]] beyond the account value.

> $$AV_t = \frac{\left(AV_{t-1} + G - EC_t\right)(1+i^c) - q^{*}_{x+t-1}\,FA}{1 - q^{*}_{x+t-1}}$$

> $${}_{t-1}V = \frac{q_{x+t-1}\,S + p_{x+t-1}\,{}_tV}{1+i} - \left(G - E_t\right)$$

- **Symbols:** The first block is the Type A account value recursion when the cost of insurance is discounted at the credited rate $i^c$, with specified premium $G$, expense charge $EC_t$, cost of insurance rate $q^{*}$ and face amount $FA$. Under the guarantee, the account value is floored at zero. The second block is the insurer's own reserve recursion once the account is empty, with its best-estimate mortality $q$, earned rate $i$, expenses $E_t$, guaranteed death benefit $S$, and ${}_nV = 0$ at the end of the guarantee period.
- **Why a reserve is needed:** The specified premium is set below the charges the policy incurs at older ages, so the account value runs down while the guarantee is in force. After it reaches zero, the insurer receives only $G$ each year but still pays the full death benefit, and the account value no longer measures what the insurer owes.
- **Valuing it by profit testing:** A [[Profit Testing|profit test]] projects the policy with the policyholder paying exactly the specified premiums, holds the account value as the reserve while it lasts, and records the negative profits that follow once it is gone. Zeroizing those profits gives the second block. While every year would otherwise show a loss, the result is the gross premium [[Policy Value|policy value]] of the guaranteed cover less the specified premiums, at the earned rate.
- **The reserve to hold:** The insurer needs enough both for a policyholder who surrenders and for one who keeps the guarantee, so it holds at least the larger of the account value and the value of the guarantee. Because policyholders with an empty account and a valuable guarantee have every reason to keep paying, the lapse assumption has a large effect on that value.

> [!example]- When the Account Value Runs Out {Example}
> A Type A universal life policy has face amount \$100,000 and an account value of \$2,000 at age 75. It carries a no-lapse guarantee to age 80 for a specified premium of \$1,500 a year, paid in advance. The expense charge is 5% of premium, the cost of insurance rates are 120% of the SULT ($q^{*}_{75} = 0.022120$, $q^{*}_{76} = 0.024802$, $q^{*}_{77} = 0.027810$), and both the credited rate and the cost of insurance discount rate are 4%. Project the account value over three years if the policyholder pays only the specified premium.
>
> > [!answer]-
> > Each year the premium less the 75 expense charge adds 1,425 to the account.
> > $$
> > \begin{align*}
> > AV_1 &= \frac{3{,}425(1.04) - 2{,}212.00}{0.977880} \\
> > &= \frac{1{,}350.00}{0.977880} \\
> > &= 1{,}380.54 \\
> > AV_2 &= \frac{2{,}805.54(1.04) - 2{,}480.20}{0.975198} \\
> > &= \frac{437.56}{0.975198} \\
> > &= 448.69 \\
> > AV_3 &= \frac{1{,}873.69(1.04) - 2{,}781.00}{0.972190} \\
> > &= -856.17
> > \end{align*}
> > $$
> > In year 3 the account cannot pay the charges, so the formula gives a negative value. Without the guarantee, the policy would lapse unless the policyholder paid more. With the guarantee, the account value is set to 0 at age 78 and the \$100,000 of cover stays in force for the specified premium alone.

> [!example]- Reserve for the Guarantee After the Account Is Empty {Example}
> Continue the policy above from age 78, when the account value is 0 and two years of the guarantee remain. The insurer pays expenses of 3% of each premium, earns 5%, and expects mortality to follow the SULT at 5%, with $q_{78} = 0.025984$ and $q_{79} = 0.029132$. Find the profit vector with no reserve, then the zeroized reserves for the guarantee.
>
> > [!answer]-
> > With no reserve, each year's profit is $1{,}455(1.05) - 100{,}000\,q = 1{,}527.75 - 100{,}000\,q$, which is $-1{,}070.65$ at age 78 and $-1{,}385.45$ at age 79. Zeroizing works backward from the end of the guarantee, where ${}_2V = 0$.
> > $$
> > \begin{align*}
> > {}_1V &= \frac{2{,}913.20}{1.05} - 1{,}455 \\
> > &= 1{,}319.48 \\
> > {}_0V &= \frac{2{,}598.40 + 0.974016(1{,}319.48)}{1.05} - 1{,}455 \\
> > &= \frac{3{,}883.59}{1.05} - 1{,}455 \\
> > &= 2{,}243.66
> > \end{align*}
> > $$
> > The same value comes from the gross premium policy value at 5%: $100{,}000\,A^{1}_{78:\overline{2}|} - 1{,}455\,\ddot{a}_{78:\overline{2}|} = 5{,}048.37 - 2{,}804.71 = 2{,}243.66$. At age 78 the account value is 0, but the guarantee needs a reserve of \$2,243.66 per policy, and this amount has to be built up in the earlier years, while the account value still covers the charges.

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate reserves for no-lapse guarantees. The calculation projects the account value under the specified premium and then values the death benefits that the account can no longer pay for.
> - **Profit tests:** The guarantee also enters deterministic profit tests of universal life policies, where a question may ask for the extra reserve that removes the negative profits after the account is exhausted, under best-estimate or stress-test assumptions.

> [!warning]- Exam traps
> - **Two mortality bases:** The account is charged at the cost of insurance rates, but the insurer pays claims at its own best-estimate mortality. Using the cost of insurance rates in the reserve for the guarantee overstates the expected claims.
> - **Two interest rates:** The account is credited at $i^c$, while the insurer's reserve earns its own rate $i$. A question that gives both expects the account projection at $i^c$ and the reserve at $i$.
> - **A negative account value:** A projected account value below zero means that the guarantee has taken over. The account is set to zero, and the shortfall is the insurer's cost, not a debt of the policyholder.
> - **Amount at risk after the account is gone:** Once the account value is zero, the insurer's amount at risk is the full face amount less its own reserve, not the face amount less the account value.
