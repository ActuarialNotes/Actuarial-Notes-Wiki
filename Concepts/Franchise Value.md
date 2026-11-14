---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:10117f3eeb4b873ed5e1b5817ee44b9eccb19272ad0b23bbf4966c86482fdcfe
  sources:
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.5-11 (model assumptions and notation pp.5-6; P - L - E + (S+P-E)y = kS, P = [S(k-y)+L]/(1+y)+E and C = S+P-E-L/(1+y) p.6; P, L, E followed by P*cr, L*cr, E*cr, d = cr/(1+y), P*d/(1-d) = P*cr/(1+y-cr), perpetuity at cr = 1, F = [P-E-L/(1+y)]*d/(1-d) p.7; k = a + b*y, b = 0 fixed, b = 1 risk-free plus premium, F = cr*S*(a+(b-1)y)/[(1+y)(1+y-cr)] p.8 and D = (a-b+1)/[(1+y)(a+by-y)] + 1/(1+y-cr) p.9, both read from the rendered pages; Table 1, duration of a total = dollar duration / PV, double impact of rates on interest-sensitive premiums p.9; D_V 6.70, 5.18, zero or negative asset duration infeasible and invisible to regulators and rating agencies p.10; pricing strategy a = 10%, b = 1 gives 7.62 and 3.27 p.10), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
    - "CAS Exam 9 Spring 2017 — sample answers and examiner's report, Q12 part a, PDF pp.61-62 (FV with first-year retention 90% then 80%: first-year term then later years scaled by it and multiplied by d/(1-d); examiner: 'how to apply it when the client retention rates vary from one year to the next'), sha256:bca96aba31c0e64a7b054e54622485f16ed3195dcce4b2c7bf94505134ab7176 — https://www.casact.org/sites/default/files/2021-03/17-9.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Franchise Value.md
---

**Franchise Value** ($F$) is the present value of the cash flows an insurer expects from future renewals of the business it already writes. It is an asset that accounting does not show, but it can be a large part of the firm's market value. Panning adds it to the firm's **current economic value** $C$ (its surplus plus the business already written) to give its total economic value $C + F$, and shows that it carries a long [[Duration|duration]], so it shapes the firm's [[Interest Rate Risk|interest rate risk]].

Panning's simplified insurer writes all its business on January 1, pays its expenses $E$ that day and pays its expected losses $L$ (with loss adjustment expense) on December 31. $E$ and $L$ are the same every year, the term structure is flat at the risk-free rate $y$, and surplus $S$ is held constant by dividends and recapitalisation. Its franchise value is

> $$F = \left[P - E - \frac{L}{1+y}\right]\frac{d}{1-d}$$

- $P$ is the premium written each year.
- $d$ is the multiplier for one year of retention and discounting.

The multiplier is

> $$d = \frac{cr}{1+y}$$

- $cr$ is the **client retention**, the share of clients who renew from one year to the next.

With rates and the target return unchanged, a year's $P$, $L$ and $E$ are followed by $P\cdot cr$, $L\cdot cr$ and $E\cdot cr$ the next year. Discounting as well gives the multiplier $d$, so future premiums are worth $P(d + d^2 + \dots) = P\,d/(1-d) = P\,cr/(1+y-cr)$. This is a [[Perpetuity|perpetuity]] when $cr = 1$. Expenses are worth $E\,d/(1-d)$, and losses, paid a year later, $[L\,d/(1-d)]/(1+y)$. The multiplier inverts directly to $cr = d(1+y)$, which recovers the retention implied by a market value.

> [!idea] The idea
> Franchise value is a perpetuity of next year's economic profit, shrunk each year by the clients who leave.

## Premium and current economic value

The firm prices to a target return $k$ on surplus, so its premium satisfies

> $$P - L - E + (S + P - E)y = kS$$

Solved for the premium, this is

> $$P = \frac{S(k-y) + L}{1+y} + E$$

The firm's current economic value is

> $$C = S + P - E - \frac{L}{1+y}$$

Since $P - E - L/(1+y) = S(k-y)/(1+y)$, franchise value can be written from the surplus alone.

> [!example]- What are this insurer's premium, current economic value and franchise value? {Example}
> An insurer holds surplus $S = 200$, expects losses $L = 300$ and expenses $E = 90$ a year, and retains $85\%$ of its clients. The risk-free rate is $4\%$, and it prices to a target return on surplus of $12\%$.
>
> > [!answer]-
> > - The premium is $P = [200(0.12 - 0.04) + 300]/1.04 + 90 = 393.85$.
> > - The current economic value is $C = 200 + 393.85 - 90 - 300/1.04 = 215.38$.
> > - The multiplier is $d = 0.85/1.04 = 0.81731$, so $d/(1-d) = 4.4737$.
> > - A year's economic profit is $393.85 - 90 - 288.46 = 15.385$.
> > - The franchise value is $F = 15.385 \times 4.4737 = 68.83$.

## Retention that differs by year

When the first renewal's retention differs from later years', the profit from renewal year $n$ follows the first year's retention and then the steady one. The later renewals are a perpetuity at the steady retention, but they start from the clients who survived the first renewal. So the whole tail is scaled by the first renewal's term and discounted one more year.

> [!example]- What is the franchise value of this book? {Example}
> A book earns an economic profit of $P - E - L/(1+y) = 10$ a year at the risk-free rate $y = 4\%$. $75\%$ of clients renew at the first renewal, and $92\%$ of those remaining renew each year after that.
>
> > [!answer]-
> > - The profit from renewal year $n$ is $10 \times 0.75 \times 0.92^{\,n-1}$, discounted $n$ years.
> > - The first renewal is worth $10 \times 0.75/1.04 = 7.212$.
> > - At the steady retention, $d_2 = 0.92/1.04 = 0.88462$ and $d_2/(1 - d_2) = 7.6667$.
> > - The later renewals are worth $7.212 \times 7.6667 = 55.29$.
> > - The franchise value is $F = 7.212 + 55.29 = 62.50$, which is also $7.212/(1 - d_2)$.

## Pricing strategy and the duration of franchise value

Panning lets the target return depend on the interest rate, and it is

> $$k = a + b\,y$$

- $b = 0$ is a fixed target return of $a$.
- $b = 1$ is the risk-free rate plus a risk premium $a$.

The franchise value is then

> $$F = \frac{cr\cdot S\,\big(a + (b-1)\,y\big)}{(1+y)(1+y-cr)}$$

For any $a$ and $b$ giving the same $k$ today, this is the same franchise value. Its duration, $D = -(dF/dy)/F$, is

> $$D_F = \frac{a - b + 1}{(1+y)(a + b\,y - y)} + \frac{1}{1 + y - cr}$$

The duration of the firm's total economic value is the value-weighted average, which is the dollar duration of the total over its value:

> $$D_{C+F} = \frac{C\,D_C + F\,D_F}{C+F}$$

- $D_C$ is the duration of the current economic value.

When premiums are set to a fixed target return, a rise in rates hits franchise value twice: each future dollar is discounted harder, and fewer premium dollars are needed to earn the target. Its duration is therefore far longer than its cash flows suggest. Hedging it through asset duration alone can call for an asset duration that is zero or negative, which is infeasible and invisible to regulators and rating agencies. Tying the target return to the interest rate changes the size of the second effect, so Panning manages this risk through pricing rather than through the asset portfolio.

> [!example]- What are the durations of this insurer's franchise value and total economic value under each pricing strategy? {Example}
> The insurer above has $C = 215.38$ and $F = 68.83$, with $S = 200$, $cr = 0.85$ and $y = 4\%$. Its current economic value has duration $1$. Its $12\%$ target return is either (a) a fixed $12\%$ or (b) the risk-free rate plus $8\%$.
>
> > [!answer]-
> > - Both strategies give $k = 12\%$ today, so both give $F = 0.85(200)(0.08)/[(1.04)(0.19)] = 68.83$.
> > - Under (a), $a = 0.12$ and $b = 0$, so $D_F = 1.12/[(1.04)(0.08)] + 1/0.19 = 13.46 + 5.26 = 18.72$.
> > - Under (b), $a = 0.08$ and $b = 1$, so $D_F = 0.08/[(1.04)(0.08)] + 1/0.19 = 0.96 + 5.26 = 6.22$.
> > - Total economic value is $215.38 + 68.83 = 284.21$.
> > - Its duration is $(215.38 + 68.83 \times 18.72)/284.21 = 5.29$ under (a) and $(215.38 + 68.83 \times 6.22)/284.21 = 2.27$ under (b).
> > - The same franchise value, priced the second way, carries about a third of the interest rate sensitivity.

> [!trap] Discounting at the target return
> The multiplier is $d = cr/(1+y)$ with the **risk-free** rate $y$, and the current economic value discounts losses at $y$ too. The target return $k$ enters only through the premium (or through $a$ and $b$). Using $k$ in $d$ understates $F$.
