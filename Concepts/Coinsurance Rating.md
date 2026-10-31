---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7027428c9426d8dd3af4c58fc8cc024e0c506bb350581acb90193be6d72d3275
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.206-215 (PDF pp.218-227; pp.210-212 read as page images), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02), p.4 task A14, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance Rating.md
---

**Coinsurance Rating** is how property ratemaking keeps premiums equitable when insureds carry different levels of [[Insurance to Value|insurance to value]] (ITV): either a **coinsurance clause** cuts the loss payment of an insured who carries less than a required share of value, or the **rate per amount of insurance** is set by the face amount chosen, as expected indemnity divided by face value (Werner & Modlin, *Basic Ratemaking*, Ch. 11, pp.206–213).

> $$I = \min\!\left(L \times \frac{F}{cV},\; F\right)$$

> $$\text{Rate} = \frac{f \times \text{E}\big[\min(L, F)\big]}{F}$$

- where $I$ is the indemnity, $L$ the loss after any deductible, $F$ the face value (amount of insurance selected), $V$ the value of the property, $c$ the required [[Coinsurance Percentage|coinsurance percentage]] and $f$ the frequency of loss (pp.209, 212). Werner's formula also holds $I \le L$ (p.210): an insured who carries at least $cV$ is paid the loss, up to $F$.
- **The clause.** $cV$ is the coinsurance requirement and $a = \min(F/cV,\,1)$ the apportionment ratio. The penalty $e$ is what the clause takes away: $L - I$ for $L \le F$, $F - I$ for $F < L < cV$, and $0$ for $L \ge cV$. It arises only when $L > 0$, $F < cV$ and $L < cV$, rises linearly to its largest at $L = F$, falls back to zero at $L = cV$ — and above $cV$ the insured is still unpaid for whatever exceeds $F$ (pp.209–211). The clause works only if the property's value can be established when a loss is settled (p.211).
- **The rate approach.** In empirical form, $\text{E}[\min(L,F)] = \sum_{L \le F} L\,s(L) + F \sum_{L > F} s(L)$, with $s(L)$ the probability of a loss of size $L$ (p.212). Where partial losses are possible, the rate per amount of insurance *falls* as $F$ approaches $V$ — at a decreasing rate when small losses predominate (right-skewed), a constant rate for a uniform distribution, and an increasing rate when large losses predominate (left-skewed). The coinsurance is then whatever part of a loss exceeds the face value; the major difficulty is knowing the loss distribution (p.212).
- **Why ITV matters.** On an underinsured home, the payment doesn't cover the whole loss when one exceeds the face value, and a rate set for full ITV collects too little premium for its expected payments — the rates are *inequitable*. If every home is underinsured by the same percentage, premium may be inadequate but stays equitable, and the base rate drifts over time to the book's actual ITV. Both problems exist only because partial losses are possible: if every loss were total, the rates would be equitable and adequate (pp.208–209).
- **ITV initiatives** (pp.212–213): guaranteed replacement cost lets the payment exceed the limit for a home insured to 100% of value — capped (e.g., 125% of the limit) after the catastrophes of the 1990s; component-based property estimation tools, used at new business and at renewal; inspections, indexation clauses and educating insureds. Raising underinsured homes to the ITV the rates assume brings in premium without a rate increase, and because small losses predominate in homeowners, more premium than added loss. The actuary estimates each initiative's effect on results.
- Compared with a [[Deductible Rating|deductible]], which removes the small end of every loss and is priced with a [[Loss Elimination Ratio|loss elimination ratio]], and [[Increased Limits|increased limits]], which price the top: coinsurance concerns how the face value chosen relates to the property's *value*.

> [!idea] The idea
> Because partial losses are possible, a policy with a face value of 60% of the home's value still pays every loss up to that face value in full — its expected payment is more than 60% of the full-value policy's. Charge both the same rate per \$1,000 and the underinsured one is undercharged. The insurer can fix that on the loss side (pay underinsured claims at $F/cV$) or on the premium side (charge a higher rate per \$1,000 for a lower face value).

> [!trap] The penalty between $F$ and $cV$
> For a loss above the face value but below the requirement, the penalty is $F - I$, not $L - I$: without the clause the insured would have received $F$, not $L$. Using $L - I$ there overstates it by $L - F$.

![[Media/Figures/Coinsurance_Rating.svg|340]]

> [!example]- The Clause at Three Loss Sizes {Example}
> A home valued at $\$640{,}000$ carries a face value of $\$480{,}000$ under a $90\%$ coinsurance requirement. There is no deductible.
>
> Find the indemnity and the coinsurance penalty for losses of $\$120{,}000$, $\$540{,}000$ and $\$600{,}000$, and the largest penalty possible.
>
> > [!answer]-
> > Find the requirement and the apportionment ratio first, then place each loss against $F$ and $cV$.
> >
> > $$\begin{align*}
> > cV &= 0.90 \times \$640{,}000 = \$576{,}000 \\[4pt]
> > a &= \frac{\$480{,}000}{\$576{,}000} = \tfrac{5}{6}
> > \end{align*}$$
> >
> > **$L = \$120{,}000$** (below $F$): $I = \tfrac56 \times \$120{,}000 = \$100{,}000$; $e = L - I = \$20{,}000$.
> >
> > **$L = \$540{,}000$** (between $F$ and $cV$): $\tfrac56 \times \$540{,}000 = \$450{,}000 < F$, so $I = \$450{,}000$; $e = F - I = \$30{,}000$.
> >
> > **$L = \$600{,}000$** (above $cV$): $\tfrac56 \times \$600{,}000 = \$500{,}000$ is capped at $F$, so $I = \$480{,}000$; $e = 0$ — yet the insured still bears $\$120{,}000$ above the face value.
> >
> > **Largest penalty**, at $L = F$:
> >
> > $$e = \$480{,}000 \times \left(1 - \tfrac56\right) = \$80{,}000$$
> >
> > *Why is the penalty on \$540,000 only \$30,000, not a sixth of the loss?* Above $F$ the face value would have capped the payment anyway, so the clause takes only the gap between $F$ and $aL$, which shrinks to zero at $cV$.

> [!example]- Rates by Amount of Insurance {Example}
> A home is valued at $\$400{,}000$. Expected claim frequency is $2\%$, and losses are uniformly distributed within each band:
>
> | Size of loss (\$000) | Share | Average (\$000) |
> |---|---|---|
> | 0–100 | 50% | 50 |
> | 100–200 | 25% | 150 |
> | 200–300 | 15% | 250 |
> | 300–400 | 10% | 350 |
>
> With no expenses or profit, find the rate per \$1,000 at face values of $\$200{,}000$, $\$300{,}000$ and $\$400{,}000$.
>
> > [!answer]-
> > The rate is the expected indemnity — each loss limited to $F$ — times frequency, divided by $F$.
> >
> > **Expected indemnity per loss** (\$000); every band above $F$ pays $F$:
> >
> > $$\begin{align*}
> > F = 200{:}\;\; & 0.50(50) + 0.25(150) + 0.25(200) = 112.5 \\
> > F = 300{:}\;\; & 0.50(50) + 0.25(150) + 0.15(250) + 0.10(300) = 130.0 \\
> > F = 400{:}\;\; & 0.50(50) + 0.25(150) + 0.15(250) + 0.10(350) = 135.0
> > \end{align*}$$
> >
> > **Pure premium and rate per \$1,000:**
> >
> > $$\begin{align*}
> > F = 200{:}\;\; & 0.02 \times \$112{,}500 = \$2{,}250;\;\; \$2{,}250 / 200 = \$11.25 \\
> > F = 300{:}\;\; & 0.02 \times \$130{,}000 = \$2{,}600;\;\; \$2{,}600 / 300 = \$8.67 \\
> > F = 400{:}\;\; & 0.02 \times \$135{,}000 = \$2{,}700;\;\; \$2{,}700 / 400 = \$6.75
> > \end{align*}$$
> >
> > The rate falls from $\$11.25$ to $\$8.67$ to $\$6.75$ (rounded to the cent) — by $\$2.58$, then $\$1.92$: decreasing at a decreasing rate, as Werner says it will when small losses predominate.
> >
> > *Why does doubling the face value add only 20% to the pure premium?* Three-quarters of losses are under \$200,000 and are paid in full either way; the extra face value only buys the top of the larger losses.

> [!example]- An ITV Initiative {Example}
> Continuing the last example, the insurer charges every home the full-ITV rate of $\$6.75$ per \$1,000. This home is insured for $\$300{,}000$, and a property estimation tool moves it to its full $\$400{,}000$ at renewal.
>
> What happens to its premium and its expected losses?
>
> > [!answer]-
> > Compare premium at the flat rate with the expected losses from the last example, before and after.
> >
> > $$\begin{align*}
> > \text{At } \$300{,}000{:}\;\; & 300 \times \$6.75 = \$2{,}025 \text{ premium vs } \$2{,}600 \text{ losses} \\
> > \text{At } \$400{,}000{:}\;\; & 400 \times \$6.75 = \$2{,}700 \text{ premium vs } \$2{,}700 \text{ losses}
> > \end{align*}$$
> >
> > Premium rises $\$675$; expected losses rise only $\$100$. The underinsured home had been $\$575$ short — the inequity — and full ITV closes the gap with no change to the rate.
> >
> > *Why so lopsided?* The added \$100,000 of cover is reached only by the 10% of losses above \$300,000, but it is charged at the rate per \$1,000 the full-value home pays.

> [!tip]- How it appears on the exam
> - Exam 5 (objective A14, alternative ratemaking procedures): the indemnity and the coinsurance penalty at several loss sizes, usually one below $F$, one between $F$ and $cV$ and one above $cV$ — or the amount the policyholder pays at two coinsurance percentages.
> - The penalty drawn as a function of loss amount, with the critical points ($F$, $cV$, the largest penalty) labelled.
> - Run backwards: the indemnity and penalty given, the required coinsurance percentage asked for.
> - The rate per \$1,000 at two or three amounts of insurance from a banded loss distribution, sometimes with a follow-up on what an ITV initiative does to premium and losses.
> - Written: discuss overall adequacy, territorial adequacy and equity when part of a book is uniformly underinsured and no coinsurance clause or guaranteed replacement cost applies.

> [!warning]- Exam traps
> - Paying $L \times F/cV$ above the face value: the indemnity never exceeds $F$, so cap it before computing a penalty.
> - Reading "no penalty above $cV$" as "fully paid": the clause stops penalizing, but the insured still bears everything over $F$ (p.211).
> - Rate per \$1,000 *falls* as the face value rises — not constant — whenever partial losses are possible. Only if every loss were total would it be flat (p.209).
> - Uniform underinsurance is an adequacy problem, not an equity one: when every home is underinsured by the same percentage the rates stay equitable (p.208).
> - Werner calls homeowners losses "left-skewed (i.e., small losses predominate)" on p.213, while p.212 calls a small-loss distribution right-skewed. Reason from "small losses predominate", which is what drives both results.
> - $L$ is the loss *after* the deductible; apply the deductible before the clause.
