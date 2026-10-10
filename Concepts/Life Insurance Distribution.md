---
aliases:
  - Annuity Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:597051356f849d863b1f36ce45d6c8bce574b7b0d650a8a1ae95010c693e200e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance Distribution.md
---
**Life Insurance Distribution** is the set of channels through which a [[Life Insurance Company|life insurer]] finds customers, sells and places [[Life Insurance|life insurance]] and [[Annuity Contract|annuity]] contracts, and keeps them in force, together with the way it pays the people who do that work. The choice of channel and of its compensation decides who the insurer reaches, how much control it has over the sale, and how much of the premium is spent before the policy has earned anything. The property and casualty counterpart is described under [[Insurance Distribution Systems|insurance distribution systems]].

> $$\text{PV}(C) = G\sum_{t=1}^{n} c_t\, v^{t-1}\,{}_{t-1}p^{(\tau)}$$

> $$c^{*} = \frac{\sum_{t=1}^{n} c_t\, v^{t-1}\,{}_{t-1}p^{(\tau)}}{\sum_{t=1}^{n} v^{t-1}\,{}_{t-1}p^{(\tau)}}$$

- **Symbols:** $G$ is the annual premium, or the commissionable target premium on a [[Universal Life Insurance|universal life]] policy, and $c_t$ is the commission rate paid with the premium at the start of policy year $t$. ${}_{t-1}p^{(\tau)}$ is the probability that the policy is still in force at the start of year $t$ after both deaths and [[Lapse|lapses]], as in a [[Multiple Decrement Model|multiple decrement model]], and $v$ is the discount factor. $c^{*}$ is the level commission rate that has the same present value as the scale $c_t$.
- **Affiliated channels:** Career agents are recruited, trained and supervised by one insurer, or by general agencies it contracts with, and sell mainly that insurer's products. Multiline exclusive agents of property and casualty insurers sell their carrier's life products alongside auto and home cover. These channels give the insurer control over the sale and the customer, at a high fixed cost of recruiting and training agents, many of whom leave within their first years.
- **Independent channels:** Independent agents and brokers can place business with many carriers. They are supported by brokerage general agencies and, for annuities and some life products, by independent marketing organizations (IMOs), which recruit producers, offer case design and contracting, and receive overrides on their producers' sales. IMOs are the main route to market for [[Indexed Annuity|fixed indexed annuities]]. The insurer pays only for the business it gets, but it competes for each case on price, underwriting and compensation.
- **Banks, broker-dealers and worksite:** Banks and broker-dealers sell mainly annuities, with registered representatives selling variable products. Worksite marketing sells individual or group-like products through the employer, often with payroll deduction and simplified enrollment, alongside [[Group Life Insurance|group life]].
- **Direct and digital:** Direct response and online sales reach customers without an agent, usually for simple term products with simplified or accelerated [[Underwriting|underwriting]]. They swap commission for advertising and technology costs that are largely fixed, so they need volume to pay off.
- **Heaped and levelized commissions:** Traditional life compensation is heaped, with a large first-year commission and small renewals, plus overrides and expense allowances to the agency or IMO. A levelized scale pays the same rate every year, and annuity contracts often offer a lower upfront commission with a trail paid on the account value. Chargebacks recover part of a first-year commission from the producer when a policy lapses early.
- **Economics:** A heaped scale creates acquisition strain, because the insurer pays out more than the first premium and recovers it only if the policy persists, so profit depends heavily on the lapse assumption in [[Profit Testing|profit testing]]. It also rewards a producer for replacing an existing policy with a new one. A levelized scale moves part of the lapse risk to the producer, but producers prefer heaped scales, so a carrier that levelizes alone may lose business.
- **Conduct:** Distribution is where most sales practice risk arises, such as unsuitable sales and churning of in-force policies, so it is subject to [[Market Conduct Regulation|market conduct regulation]]. U.S. annuity sales are held to suitability and best-interest standards.

> [!example]- Present Value of Heaped and Levelized Commissions {Example}
> A 10-year premium term policy has an annual premium of \$1,000. The heaped commission scale pays 90% of the first premium and 5% of each renewal premium. With illustrative assumptions, 10% of policies lapse in year 1 and 6% a year after that, mortality is ignored, and the insurer discounts at 6%, so that $\ddot{a} = \sum_{t=1}^{10} v^{t-1}\,{}_{t-1}p^{(\tau)} = 5.95634$. Find the present value of the heaped commissions per policy issued and the equivalent level commission rate.
>
> > [!answer]-
> > The renewal commissions are 5% of every premium after the first, whose present value is $\ddot{a} - 1$.
> > $$
> > \begin{align*}
> > \text{PV}(C) &= 1{,}000\left[0.90 + 0.05(5.95634 - 1)\right] \\
> > &= 1{,}000(0.90 + 0.24782) \\
> > &= 1{,}147.82 \\
> > c^{*} &= \frac{1{,}147.82}{1{,}000(5.95634)} \\
> > &= 0.19271
> > \end{align*}
> > $$
> > A level commission of 19.27% of every premium costs the insurer the same in present value as the heaped scale, on these lapse rates. The heaped scale pays \$900 at issue, while the level scale pays \$192.71, so the heaped scale puts about \$707 more cash out at issue for the same expected cost.

> [!example]- Who Bears the Lapse Risk {Example}
> Continuing the example, experience turns out worse than priced: 20% of policies lapse in year 1 and 12% a year after that, so $\ddot{a}$ falls to 4.61190. Compare the present value of the insurer's commission cost under the heaped scale and under the level scale of 19.27%.
>
> > [!answer]-
> > Each scale is applied to the premiums that are now expected to be paid.
> > $$
> > \begin{align*}
> > \text{PV}_{\text{heaped}} &= 1{,}000\left[0.90 + 0.05(4.61190 - 1)\right] \\
> > &= 1{,}080.59 \\
> > \text{PV}_{\text{level}} &= 0.19271(1{,}000)(4.61190) \\
> > &= 888.74
> > \end{align*}
> > $$
> > The heaped cost falls by only \$67, because the \$900 paid at issue is already spent, while the level cost falls by \$259 with the premiums it is paid from. As a share of the premiums now expected, the heaped scale costs $1{,}080.59/4{,}611.90 = 23.4\%$ against 19.3%. Under heaped compensation the insurer bears most of the lapse risk, and under levelized compensation the producer shares it.

> [!tip]- How it appears on the exam
> - **ILA-101 distribution questions:** Candidates describe the main life and annuity distribution channels and assess their strengths and weaknesses for a given product and target market, drawing on Bennett and Zultowski's *The Art and Science of Life Insurance Distribution*, which covers the channels, the functions of distribution, compensation and the economics of distribution.
> - **Compensation and economics:** Questions ask how heaped, levelized and trail compensation affect acquisition strain, lapse risk, replacement incentives and profitability, and a short calculation may compare their present values.
> - **Digital distribution:** Some questions use the *Life Insurance for the Digital Age* reading to ask how direct and digital channels, paired with accelerated underwriting, change cost, placement rates and the customers reached.

> [!warning]- Exam traps
> - **Same present value, different risk:** A level rate set to match a heaped scale's present value matches it only on the lapse assumption used. When lapses are higher, the heaped scale costs the insurer more, so the two scales are not interchangeable in a stress test.
> - **Commission on the right premium:** UL commissions are usually a percentage of a target premium up to that target, with a much lower rate on any excess. Applying the first-year rate to a large dump-in premium overstates the commission.
> - **Overrides and allowances count:** The cost of a channel includes overrides, expense allowances, bonuses and the insurer's field support, not just the producer's commission. Comparing channels on commission rates alone understates the cost of the agency and IMO channels.
> - **Persistency belongs to the channel:** Lapse rates differ by channel, and a channel with heaped compensation and weak service often shows high early lapses. Pricing every channel on one lapse assumption misstates the profit of each.
