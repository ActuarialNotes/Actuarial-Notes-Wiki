---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b0f6cc034f498f39c5edd0d21bd570a36a8307049ec544ae12b5e92a4e759f3b
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics (open textbook), Ch.3 §3.4.2 Policy Limits (X ^ u definition; X = (X-u)+ + X ^ u; Y^L = (X^u) - (X^d)), §3.4.3 Y^L = alpha[(X^u) - (X^d)], piecewise in X, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "SOA Exam FAM-S sample solutions (Oct 2024), Q33 p.16; Q60 p.27, sha256:7b3f61d8c385f486f3dbc586cdaab035fe9c45a055710e8327d213c4d3e71b48 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-s-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coverage Modifications.md
---

A **Coverage Modification** is a policy provision, such as a [[Deductible|deductible]], a [[Policy Limit|policy limit]] or [[Coinsurance|coinsurance]], that changes how a ground-up loss $X$ becomes the amount the insurer pays. With an ordinary deductible $d$, a maximum covered loss $u$ and coinsurance $\alpha$, the payment per loss is

> $$Y^L = \alpha\left[(X \wedge u) - (X \wedge d)\right]$$

- $X \wedge u = \min(X, u)$ is the loss limited at $u$.
- $\alpha$ is the share of the covered loss that the insurer pays, with $0 < \alpha \le 1$.

The payment is 0 when $X \le d$, and it stops growing at $X = u$, so the largest payment is $\alpha(u - d)$. The expected payment per loss is

> $$E[Y^L] = \alpha\left(E[X \wedge u] - E[X \wedge d]\right)$$

- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] of $X$ at $u$.

> [!example]- Losses are exponential with mean 1,000. A policy has an ordinary deductible of 500, a maximum covered loss of 5,000 and 80% coinsurance. What is the expected payment per loss? {Example}
> - $E[X \wedge 500] = 1{,}000\left(1 - e^{-0.5}\right) = 393.47$.
> - $E[X \wedge 5{,}000] = 1{,}000\left(1 - e^{-5}\right) = 993.26$.
> - $E[Y^L] = 0.8\,(993.26 - 393.47) = 479.83$.

## Payment per payment

The payment per loss is 0 for every loss at or below the deductible. The payment per payment, $Y^P$, is the [[Payment Random Variable|payment]] given that a payment is made, $Y^P = Y^L \mid X > d$. Its expected value is

> $$E[Y^P] = \frac{E[Y^L]}{S(d)}$$

- $S(d) = 1 - F(d)$ is the probability that a loss exceeds the deductible.

> [!example]- For the policy in the first example, what is the expected payment per payment? {Example}
> - The probability that a loss exceeds the deductible is $S(500) = e^{-0.5} = 0.6065$.
> - $E[Y^P] = 479.83/0.6065 = 791.11$.

## Number of payments

Each loss produces a payment with probability $S(d)$, independently of the other losses. If the number of losses is [[Poisson Distribution|Poisson]] with mean $\lambda$, then by [[Poisson Thinning|thinning]] the number of payments is Poisson with mean

> $$\lambda\,S(d)$$

A negative binomial $\beta$ becomes $\beta\,S(d)$, and a binomial $q$ becomes $q\,S(d)$. Coinsurance and a limit change the amount of each payment but not the number of payments. The expected total payment is the same counted either way, $E[N^L]\,E[Y^L] = E[N^P]\,E[Y^P]$, where $N^L$ and $N^P$ are the numbers of losses and of payments.

> [!example]- For the policy in the first example, the number of losses per year is Poisson with mean 0.3. What are the expected number of payments and the expected total payment per year? {Example}
> - The number of payments is Poisson with mean $0.3 \times 0.6065 = 0.1820$.
> - The expected total payment is $0.3 \times 479.83 = 143.95$.
> - Counted per payment, it is the same: $0.18196 \times 791.11 = 143.95$.

## Franchise deductible

A franchise deductible $d$ pays nothing when $X \le d$ and pays the whole loss when $X > d$. With no limit or coinsurance, the expected payment per loss is

> $$E[Y^L] = E[(X - d)_+] + d\,S(d)$$

- $E[(X - d)_+] = E[X] - E[X \wedge d]$ is the expected payment per loss under an ordinary deductible $d$.

> [!example]- Losses are exponential with mean 1,000. What is the expected payment per loss under a franchise deductible of 500? {Example}
> - Under an ordinary deductible of 500, $E[(X - 500)_+] = 1{,}000 - 393.47 = 606.53$.
> - The franchise deductible adds 500 for each loss above 500, $500 \times 0.6065 = 303.27$.
> - $E[Y^L] = 606.53 + 303.27 = 909.80$.

## Inflation

If losses inflate at the rate $r$ while $d$ and $u$ stay fixed, the inflated loss is $(1+r)X$. Dividing the deductible and the limit by $1 + r$ instead, the expected payment per loss is

> $$
> \begin{aligned}
> E[Y^L] = \alpha(1+r)\Big(&E\big[X \wedge \tfrac{u}{1+r}\big] \\
> -\ &E\big[X \wedge \tfrac{d}{1+r}\big]\Big)
> \end{aligned}
> $$

For the payment per payment, divide by $S\big(\frac{d}{1+r}\big)$. A distribution with a scale parameter $\theta$ keeps its family, with $\theta$ multiplied by $1 + r$: an exponential with mean $\theta$ becomes an exponential with mean $(1+r)\theta$, and a [[Pareto Distribution|Pareto]] keeps its shape. Under coinsurance alone, the expected payment inflates at exactly the rate $r$.

> [!example]- For the policy in the first example, losses inflate by 10% while the deductible and the maximum covered loss stay fixed. What are the new expected payments per loss and per payment? {Example}
> - The inflated losses are exponential with mean 1,100.
> - $E[X \wedge 500] = 1{,}100\left(1 - e^{-500/1{,}100}\right) = 401.79$ and $E[X \wedge 5{,}000] = 1{,}100\left(1 - e^{-5{,}000/1{,}100}\right) = 1{,}088.32$.
> - $E[Y^L] = 0.8\,(1{,}088.32 - 401.79) = 549.23$, an increase of 14.5%.
> - $S(500) = e^{-500/1{,}100} = 0.6347$, so $E[Y^P] = 549.23/0.6347 = 865.28$, an increase of 9.4%.

## Benefits in bands

A plan may pay a different share $\alpha_j$ of the losses in each band between $b_{j-1}$ and $b_j$. Its expected payment per loss is the sum over the bands:

> $$\sum_j \alpha_j\left(E[X \wedge b_j] - E[X \wedge b_{j-1}]\right)$$

A threshold stated as an amount the insured has paid, such as an out-of-pocket maximum, is first converted into the ground-up loss at which the insured's cumulative share reaches it.

> [!example]- Annual medical costs are exponential with mean 2,000. The insured pays the first 500, then 30% of costs from 500 to 3,000, then all costs above 3,000 until the insured has paid 2,000 in the year, after which the plan pays everything. What is the expected annual plan payment? {Example}
> - At a loss of 3,000 the insured has paid $500 + 0.3 \times 2{,}500 = 1{,}250$, so the insured reaches 2,000 at a loss of $3{,}000 + 750 = 3{,}750$.
> - The plan pays 70% from 500 to 3,000, nothing from 3,000 to 3,750 and 100% above 3,750.
> - The limited expected values are $E[X \wedge 500] = 442.40$, $E[X \wedge 3{,}000] = 1{,}553.74$ and $E[X \wedge 3{,}750] = 1{,}693.29$, and $E[X] = 2{,}000$.
> - The expected annual plan payment is
>
> $$
> \begin{aligned}
> &0.7\,(1{,}553.74 - 442.40) + (2{,}000 - 1{,}693.29) \\
> &= 777.94 + 306.71 \\
> &= 1{,}084.65
> \end{aligned}
> $$

> [!trap] Inflating the deductible along with the losses
> The deductible and the maximum covered loss stay fixed when losses inflate. In the inflation example the expected payment per loss rises to 549.23. Inflating the policy terms too would give $0.8 \times 1.1 \times (993.26 - 393.47) = 527.82$, an increase of exactly 10%.
