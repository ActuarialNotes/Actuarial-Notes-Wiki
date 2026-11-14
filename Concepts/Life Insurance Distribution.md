---
aliases:
  - Annuity Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d9bcbfc612957d7c529dd93913024e3e62bca77e49edc0da38853a1d4533df43
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance Distribution.md
---
**Life Insurance Distribution** is the set of channels through which a [[Life Insurance Company|life insurer]] finds customers, sells and places [[Life Insurance|life insurance]] and [[Annuity Contract|annuity]] contracts, and keeps them in force, together with the way it pays the people who do that work. The choice of channel and of its compensation decides who the insurer reaches, how much control it has over the sale, and how much of the premium is spent before the policy has earned anything.

The main channels are:

1. **Affiliated agents.** Career agents are recruited, trained and supervised by one insurer, or by general agencies it contracts with, and sell mainly that insurer's products. Multiline exclusive agents of property and casualty insurers sell their carrier's life products alongside auto and home cover.
2. **Independent agents and brokers.** They can place business with many carriers, supported by brokerage general agencies and, for annuities and some life products, by independent marketing organizations (IMOs).
3. **Banks and broker-dealers.** They sell mainly annuities, with registered representatives selling variable products.
4. **Worksite marketing.** It sells individual or group-like products through the employer, often with payroll deduction and simplified enrollment, alongside [[Group Life Insurance|group life]].
5. **Direct and digital.** Direct response and online sales reach customers without an agent, usually for simple term products with simplified or accelerated [[Underwriting|underwriting]].

The property and casualty counterpart is described under [[Insurance Distribution Systems|insurance distribution systems]].

## Strengths and weaknesses of the channels

Affiliated channels give the insurer control over the sale and the customer, at a high fixed cost of recruiting and training agents, many of whom leave within their first years.

With independent channels the insurer pays only for the business it gets, but it competes for each case on price, underwriting and compensation. IMOs recruit producers, offer case design and contracting, and receive overrides on their producers' sales. They are the main route to market for [[Indexed Annuity|fixed indexed annuities]].

Direct and digital sales swap commission for advertising and technology costs that are largely fixed, so they need volume to pay off.

The cost of a channel includes overrides, expense allowances, bonuses and the insurer's field support, not just the producer's commission. Lapse rates also differ by channel, and a channel with heaped compensation and weak service often shows high early lapses.

## Heaped and levelized commissions

Traditional life compensation is heaped, with a large first-year commission and small renewals, plus overrides and expense allowances to the agency or IMO. A levelized scale pays the same rate every year, and annuity contracts often offer a lower upfront commission with a trail paid on the account value. Chargebacks recover part of a first-year commission from the producer when a policy lapses early.

The present value of a commission scale per policy issued is

> $$\text{PV}(C) = G\sum_{t=1}^{n} c_t\, v^{t-1}\,{}_{t-1}p^{(\tau)}$$

- $G$ is the annual premium, or the commissionable target premium on a [[Universal Life Insurance|universal life]] policy.
- $c_t$ is the commission rate paid with the premium at the start of policy year $t$.
- ${}_{t-1}p^{(\tau)}$ is the probability that the policy is still in force at the start of year $t$ after both deaths and [[Lapse|lapses]], as in a [[Multiple Decrement Model|multiple decrement model]].
- $v$ is the discount factor.

UL commissions are usually a percentage of a target premium up to that target, with a much lower rate on any excess. The level commission rate with the same present value as the scale $c_t$ is

> $$c^{*} = \frac{\sum_{t=1}^{n} c_t\, v^{t-1}\,{}_{t-1}p^{(\tau)}}{\sum_{t=1}^{n} v^{t-1}\,{}_{t-1}p^{(\tau)}}$$

> [!example]- What is the present value of this heaped scale per policy issued, and the equivalent level commission rate? {Example}
> A 10-year premium term policy has an annual premium of $\$1{,}000$. The heaped scale pays 90% of the first premium and 5% of each renewal premium. Illustratively, 10% of policies lapse in year 1 and 6% a year after that, mortality is ignored, and the insurer discounts at 6%, so the premium annuity is $\ddot{a} = 5.95634$.
>
> > [!answer]-
> > - The renewal commissions are 5% of every premium after the first, whose present value is $\ddot{a} - 1 = 4.95634$.
> > - The present value is $1{,}000(0.90 + 0.05 \times 4.95634) = \$1{,}147.82$.
> > - The level rate is $c^{*} = 1{,}147.82/(1{,}000 \times 5.95634) = 19.27\%$.
> > - The heaped scale pays $\$900$ at issue and the level scale $\$192.71$, so the heaped scale puts about $\$707$ more cash out at issue for the same expected cost.

## Who bears the lapse risk

A heaped scale creates acquisition strain, because the insurer pays out more than the first premium and recovers it only if the policy persists. Profit then depends heavily on the lapse assumption in [[Profit Testing|profit testing]]. A heaped scale also rewards a producer for replacing an existing policy with a new one. A levelized scale moves part of the lapse risk to the producer, but producers prefer heaped scales, so a carrier that levelizes alone may lose business.

> [!example]- If lapses double, what do the heaped scale and the 19.27% level scale now cost the insurer? {Example}
> In the policy above, 20% of policies lapse in year 1 and 12% a year after that, so $\ddot{a}$ falls to 4.61190.
>
> > [!answer]-
> > - The heaped scale costs $1{,}000(0.90 + 0.05 \times 3.61190) = \$1{,}080.59$, down only $\$67$, because the $\$900$ paid at issue is already spent.
> > - The level scale costs $0.19271 \times 1{,}000 \times 4.61190 = \$888.74$, down $\$259$ with the premiums it is paid from.
> > - As a share of the premiums now expected, the heaped scale costs $1{,}080.59/4{,}611.90 = 23.4\%$ against 19.3%.
> > - Under heaped compensation the insurer bears most of the lapse risk, and under levelized compensation the producer shares it.

## Market conduct

Distribution is where most sales practice risk arises, such as unsuitable sales and churning of in-force policies, so it is subject to [[Market Conduct Regulation|market conduct regulation]]. U.S. annuity sales are held to suitability and best-interest standards.

> [!trap] Comparing channels on commission rates alone
> A channel's cost includes overrides, expense allowances, bonuses and field support, and its own lapse rates. Comparing the agency or IMO channel with another on the producer's commission rate alone understates its cost.
