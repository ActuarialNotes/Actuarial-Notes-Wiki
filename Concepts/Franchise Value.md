---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:df06987dc3ec1e1b308b29d7c21ea0c28502c77bb693dbaceea52a20a37aba4b
  sources:
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re, July 2006), pp.5-11 (model assumptions and notation pp.5-6; P - L - E + (S+P-E)y = kS, P = [S(k-y)+L]/(1+y)+E and C = S+P-E-L/(1+y) p.6; P, L, E followed by P*cr, L*cr, E*cr, d = cr/(1+y), P*d/(1-d) = P*cr/(1+y-cr), perpetuity at cr = 1, F = [P-E-L/(1+y)]*d/(1-d) p.7; k = a + b*y, b = 0 fixed, b = 1 risk-free plus premium, F = cr*S*(a+(b-1)y)/[(1+y)(1+y-cr)] p.8 and D = (a-b+1)/[(1+y)(a+by-y)] + 1/(1+y-cr) p.9, both read from the rendered pages; Table 1, duration of a total = dollar duration / PV, double impact of rates on interest-sensitive premiums p.9; D_V 6.70, 5.18, zero or negative asset duration infeasible and invisible to regulators and rating agencies p.10; pricing strategy a = 10%, b = 1 gives 7.62 and 3.27 p.10), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
    - "CAS Exam 9 Spring 2017 — sample answers and examiner's report, Q12 part a, PDF pp.61-62 (FV with first-year retention 90% then 80%: first-year term then later years scaled by it and multiplied by d/(1-d); examiner: 'how to apply it when the client retention rates vary from one year to the next'), sha256:bca96aba31c0e64a7b054e54622485f16ed3195dcce4b2c7bf94505134ab7176 — https://www.casact.org/sites/default/files/2021-03/17-9.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Franchise Value.md
---

**Franchise Value** ($F$) is the present value of the cash flows an insurer expects from future renewals of the business it already writes — an asset that accounting does not show, but that can be a large part of the firm's market value. Panning adds it to the firm's **current economic value** $C$ (its surplus plus the business already written) to give its total economic value $C + F$, and shows that it carries a long [[Duration|duration]] — so it shapes the firm's [[Interest Rate Risk|interest rate risk]].

> $$F = \left[P - E - \frac{L}{1+y}\right]\frac{d}{1-d}$$

> $$d = \frac{cr}{1+y}$$

- Panning's simplified insurer writes all its business on January 1, pays its expenses $E$ that day and pays its expected losses $L$ (with loss adjustment expense) on December 31; $E$ and $L$ are the same every year, the term structure is flat at the risk-free rate $y$, and surplus $S$ is held constant by dividends and recapitalisation. $P$ is the premium written each year and $cr$ the **client retention**, the share of clients who renew from one year to the next.
- **Where $d/(1-d)$ comes from.** With rates and the target return unchanged, a year's $P$, $L$ and $E$ are followed by $P\cdot cr$, $L\cdot cr$ and $E\cdot cr$ the next year. Discounting as well gives the multiplier $d = cr/(1+y)$, so future premiums are worth $P(d + d^2 + \dots) = P\,d/(1-d) = P\,cr/(1+y-cr)$ — a [[Perpetuity|perpetuity]] when $cr = 1$. Expenses are worth $E\,d/(1-d)$, and losses, paid a year later, $[L\,d/(1-d)]/(1+y)$. The multiplier inverts directly: $cr = d(1+y)$.
- **Premium and current value.** The firm prices to a target return $k$ on surplus: $P - L - E + (S + P - E)y = kS$, so $P = [S(k-y) + L]/(1+y) + E$. Its current economic value is $C = S + P - E - L/(1+y)$. Since $P - E - L/(1+y) = S(k-y)/(1+y)$, franchise value can be written from the surplus alone.
- **Pricing strategy.** Panning lets the target return depend on the interest rate, $k = a + b\,y$: $b = 0$ is a fixed target return of $a$; $b = 1$ is the risk-free rate plus a risk premium $a$. Then $F = \dfrac{cr\cdot S\,\big(a + (b-1)\,y\big)}{(1+y)(1+y-cr)}$, which, for any $a$ and $b$ giving the same $k$ today, is the same franchise value.
- **Duration of franchise value**, $D = -(dF/dy)/F$, is $D_F = \dfrac{a - b + 1}{(1+y)(a + b\,y - y)} + \dfrac{1}{1 + y - cr}$. The duration of the firm's total economic value is the value-weighted average, $(C\,D_C + F\,D_F)/(C+F)$ — the dollar duration of the total over its value.

> [!idea] The idea
> Franchise value is a perpetuity of next year's economic profit, shrunk each year by the clients who leave. When premiums are set to a fixed target return, a rise in rates hits it twice — each future dollar is discounted harder *and* fewer premium dollars are needed to earn the target — so its duration is far longer than its cash flows suggest. Tying the target return to the interest rate changes the size of the second effect, which is why Panning manages this risk through pricing rather than through the asset portfolio.

> [!trap] Discounting at the target return
> The multiplier is $d = cr/(1+y)$ with the **risk-free** rate $y$, and the current economic value discounts losses at $y$ too. The target return $k$ enters only through the premium (or through $a$ and $b$). Using $k$ in $d$ understates $F$.

> [!example]- Franchise Value and Its Duration Under Two Pricing Strategies {Example}
> An insurer holds surplus $S = 200$, expects losses $L = 300$ and expenses $E = 90$ a year, retains $85\%$ of its clients, and the risk-free rate is $4\%$. It prices to a target return on surplus of $12\%$. Find its premium, current economic value, franchise value and the duration of franchise value if the target is (a) a fixed $12\%$, (b) the risk-free rate plus $8\%$. Assume its current economic value has duration $1$ and find the duration of total economic value in each case.
>
> > [!answer]-
> > **Plan:** price, then value the current book, then the renewals; the strategy changes only the duration.
> >
> > $$
> > \begin{align*}
> > P &= \frac{200(0.12 - 0.04) + 300}{1.04} + 90 \\
> > &= 393.85 \\
> > C &= 200 + 393.85 - 90 - \frac{300}{1.04} \\
> > &= 215.38 \\
> > d &= \frac{0.85}{1.04} = 0.81731 \\
> > F &= \left[393.85 - 90 - 288.46\right]\frac{0.81731}{0.18269} \\
> > &= 15.385 \times 4.4737 \\
> > &= 68.83
> > \end{align*}
> > $$
> >
> > The closed form agrees for both strategies, since each gives $k = 12\%$ today: $0.85(200)(0.08)/[(1.04)(0.19)] = 68.83$.
> >
> > **(a)** $a = 0.12$, $b = 0$:
> >
> > $$
> > \begin{align*}
> > D_F &= \frac{1.12}{(1.04)(0.08)} + \frac{1}{0.19} \\
> > &= 13.46 + 5.26 \\
> > &= 18.72
> > \end{align*}
> > $$
> >
> > **(b)** $a = 0.08$, $b = 1$:
> >
> > $$
> > \begin{align*}
> > D_F &= \frac{0.08}{(1.04)(0.08)} + \frac{1}{0.19} \\
> > &= 0.96 + 5.26 \\
> > &= 6.22
> > \end{align*}
> > $$
> >
> > Total economic value is $215.38 + 68.83 = 284.21$, with duration $(215.38 + 68.83 \times 18.72)/284.21 = 5.29$ under (a) and $(215.38 + 68.83 \times 6.22)/284.21 = 2.27$ under (b). The same franchise value, priced the second way, carries about a third of the interest rate sensitivity.

> [!example]- When Retention Differs in the First Renewal Year {Example}
> A book earns an economic profit of $P - E - L/(1+y) = 10$ a year at the risk-free rate $y = 4\%$. $75\%$ of clients renew at the first renewal, and $92\%$ of those remaining renew each year after that. Find the franchise value.
>
> > [!answer]-
> > **Plan:** follow Panning's series, but let the first year's retention differ. The profit from renewal year $n$ is $10 \times 0.75 \times 0.92^{\,n-1}$, discounted $n$ years.
> >
> > $$
> > \begin{align*}
> > \text{First renewal} &= 10 \times \frac{0.75}{1.04} \\
> > &= 7.212 \\
> > d_2 &= \frac{0.92}{1.04} = 0.88462 \\
> > \text{Later renewals} &= 7.212 \times \frac{d_2}{1 - d_2} \\
> > &= 7.212 \times 7.6667 \\
> > &= 55.29 \\
> > F &= 7.212 + 55.29 \\
> > &= 62.50
> > \end{align*}
> > $$
> >
> > The later renewals are a perpetuity at the steady retention, but they start from the clients who survived the first renewal, so the whole tail is scaled by $0.75$ and discounted one more year — that is what multiplying by the first-renewal term does. Equivalently, $F = 7.212/(1 - d_2)$.

> [!tip]- How it appears on the exam
> - Exam 9 (Panning): compute current, franchise and total economic value from premium, losses, expenses, surplus, retention and the risk-free rate; or work backwards from a market value to the implied retention, through $d$ and $cr = d(1+y)$.
> - The closed form and the duration of franchise value under a pricing strategy $k = a + b\,y$, and the duration of total economic value as a value-weighted average.
> - The practical dilemma — hedging a long-duration franchise value through asset duration alone, invisibly to regulators and rating agencies — and the pricing-strategy answer to it. See [[Interest Rate Risk]].

> [!warning]- Exam traps
> - Discounting with the target return instead of the risk-free rate, in $d$ or in the current economic value.
> - Sign slips in the duration: the numerator is $a - b + 1$, and the first denominator holds $a + b\,y - y$, the target return less the risk-free rate.
> - Leaving the surplus or the first year's profit out of the current economic value, or adding an investment-income term to it.
> - Reading $b$ from a strategy described in words: "a fixed target return" is $b = 0$; "the risk-free rate plus a risk premium" is $b = 1$.
