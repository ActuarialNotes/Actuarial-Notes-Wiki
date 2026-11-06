---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:0d74b77f0d86dc492fcc9863e86ae3a1e3620407b000298e57cceaa223c11557
  sources:
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Limits on policy benefits: percentage reimbursed PDF p.7, deductible PDF p.7, benefit limit PDF p.8, maximum on a claim payment PDF p.9"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Information.md
---

**Policy Information** (or provisions) refers to the contractual terms of an insurance policy that determine how much of a ground-up loss $X$ the insurer pays. The main provisions are the [[Deductible|deductible]] $d$, the [[Coinsurance Percentage|coinsurance percentage]] $\alpha$ and the [[Benefit Limit|benefit limit]] $u$.

> $$\text{Payment} = g(X;\ d,\ \alpha,\ u)$$

> $$Y = \min\!\big(\alpha\,(X - d)_+,\ u\big)$$

- The provisions transform the [[Loss Random Variable|loss random variable]] $X$ into a [[Payment Random Variable|payment random variable]] $Y$.
- The second formula applies the deductible first, then the coinsurance, then the cap on the payment. A policy that caps the covered loss instead applies them in a different order.
- The provisions allocate financial responsibility between the insured and the insurer. They change both the expected payment and the insurer's risk.

> [!idea] The idea
> Each provision cuts the loss at a different place. The deductible removes the bottom of every loss, coinsurance shares the middle, and the limit removes the top. The payment is what survives all three, so the order in which they apply decides the answer.

![[Media/Figures/Policy_Information.svg|340]]

## Reading the provisions from a contract

A health policy states that the insured pays the first 500 of any claim, the insurer covers $80\%$ of the amount above 500, and the insurer's maximum payment is 10,000. Each phrase names one provision.

- The insured absorbs the first 500, so the deductible is $d = 500$.
- The insurer pays $80\%$ of the excess over the deductible, so $\alpha = 0.80$.
- The insurer never pays more than 10,000, so the benefit limit is $u = 10{,}000$ on the payment.

## From loss to payment

Apply the three provisions in order to a few losses.

| Loss $X$ | $0.80(X - 500)_+$ | Payment $Y$ |
|---|---|---|
| 400 | 0 | 0 |
| 3,000 | 2,000 | 2,000 |
| 10,000 | 7,600 | 7,600 |
| 15,000 | 11,600 | 10,000 |

The payment reaches the limit when $0.80(X - 500) = 10{,}000$, that is at a loss of 13,000. So the payment is a piecewise function of the loss.

> $$
> Y = \begin{cases}
> 0, & X \le 500 \\
> 0.80\,(X - 500), & 500 < X \le 13000 \\
> 10000, & X > 13000
> \end{cases}
> $$

The general breakpoints are $d$ and $d + u/\alpha$.

## Does the limit cap the payment or the loss?

Suppose the contract said instead that the insurer covers losses up to 10,000, then pays $80\%$ of the covered amount above 500. Now the limit caps the loss before the coinsurance applies.

> $$Y = \alpha\,\big(\min(X, u) - d\big)_+$$

On the loss of 15,000, this pays $0.80 \times (10{,}000 - 500) = 7600$, not 10,000. The same three numbers give a different payment, because the provisions apply in a different order. With no coinsurance, the two orders agree.

> [!trap] Forgetting to add the deductible back
> The loss at which the payment reaches the limit is $d + u/\alpha$, not $u/\alpha$. Dividing the limit by the coinsurance gives the excess over the deductible, so the deductible must be added back.

## A coinsurance that changes with the loss

Some policies pay different shares of different layers. A policy might reimburse $100\%$ of costs between its deductible and some level, and $50\%$ of the costs above that level.

- The payment is then a sum over the layers, each layer's width times its share.
- To find the loss behind a given payment, fill the layers in order until the payment is used up.

## Try it

> [!example]- The smallest loss that reaches the limit {Example}
> A policy has an ordinary deductible of 250, a coinsurance percentage of $90\%$ and a maximum payment by the insurer of 4,500. Find the smallest loss for which the insurer pays the maximum.
>
> > [!answer]-
> > **Plan:** set the coinsured excess equal to the maximum payment, then add the deductible back.
> > $$
> > \begin{align*}
> > 0.90\,(X - 250) &= 4500 \\
> > X - 250 &= 5000 \\
> > X &= 5250
> > \end{align*}
> > $$
> > Every loss of 5,250 or more pays exactly 4,500.

> [!example]- Two coinsurance layers {Example}
> A policy has a deductible of 200. It reimburses $100\%$ of costs between 200 and 1,200, and $50\%$ of costs above 1,200. Find the cost that produces a reimbursement of 1,300.
>
> > [!answer]-
> > **Plan:** fill the $100\%$ layer first, then find how far into the $50\%$ layer the rest reaches.
> >
> > The first layer pays $1200 - 200 = 1000$ in full. The remaining 300 of reimbursement comes from the $50\%$ layer.
> > $$
> > \begin{align*}
> > X &= 1200 + \frac{300}{0.50} \\
> > &= 1800
> > \end{align*}
> > $$
> > So a reimbursement of at most 1,300 is the same event as a cost of at most 1,800. That is how a probability about the payment becomes a probability about the cost.

> [!example]- Expected payment under all three provisions {Example}
> Losses are uniform on $(0, 5000)$. A policy has a deductible of 500, pays $80\%$ of the excess, and has a maximum payment of 2,000. Find the expected payment per loss and per payment.
>
> > [!answer]-
> > **Plan:** find the breakpoints, integrate the middle piece, and add the limit times the chance of reaching it.
> >
> > The payment reaches 2,000 at $X = 500 + 2000/0.80 = 3000$, and $P(X > 3000) = 0.4$.
> > $$
> > \begin{align*}
> > E[Y] &= \int_{500}^{3000} \frac{0.80\,(x - 500)}{5000}\,dx + 2000 \times 0.4 \\
> > &= 500 + 800 \\
> > &= 1300
> > \end{align*}
> > $$
> > Only losses above 500 produce a payment, and $P(X > 500) = 0.9$. The expected payment per payment is $1300/0.9 \approx 1444.44$.

> [!warning]- Exam traps
> - **The order of the provisions.** Deductible, then coinsurance, then the cap on the payment, unless the policy caps the covered loss.
> - **Dropping the deductible.** The limit is reached at $d + u/\alpha$, not at $u/\alpha$ or $u + d$.
> - **A maximum payment read as a maximum loss.** A cap of 10,000 on the payment and a cap of 10,000 on the covered loss give different payments whenever $\alpha < 1$.
> - **Per loss or per payment.** Losses below the deductible count in the expected payment per loss but not per payment.
