---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:05fff20984386ffc7e0616aa3c097c99fe37f9a3f40e3ea429fc7fbd30fa94df
  sources:
    - "SOA Exam FAM syllabus, October 2026, Topic 6 (a)-(d), p.5; readings p.8 (AMLCR Ch.16), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "K. Foster (CCNY), Lecture Notes 5: Option Values (Hull Ch 9), Spring 2010, Upper/Lower Bounds, Put-Call Parity, Early Exercise of American Options, sha256:5d6ea3740ce0bd304c4bb3cb04a77fc163b043dd385ab2a9390ee1bc567acc04 — https://kfoster.ccny.cuny.edu/classes/spring2010/eco275/lecturenotes5.html"
    - "Wikipedia, Forward contract (rank 3), Payoffs, sha256:fdc482d7cdd12b7546a7d48063003949a714a0518a8569445eac48631000a425 — https://en.wikipedia.org/wiki/Forward_contract"
    - "Wikipedia, Interest rate cap and floor (rank 3), Interest rate cap: caplet payoff, payment at end of period, sha256:27f214df7f24d378a9b60624b4dbf367e52ffd2bdf548194238fdbd0a8fdf9e6 — https://en.wikipedia.org/wiki/Interest_rate_cap_and_floor"
    - "SOA ALTAM Spring 2023 model solutions, Q6(a)-(b), p.13, sha256:7808fbbb76bc8d54d394976603e8123a3fdb44a6020cfd126cc95f3c6814b512 — https://www.soa.org/globalassets/assets/files/edu/2023/spring/solutions/spring-2023-solutions-altam.pdf"
    - "SOA ALTAM Spring 2025 model solutions, Q6(b)-(e), pp.19-20, sha256:6371e71ec29b9d7997e03348d4455e4d3e7418660261b36ddd4dd5a2fa0edf66 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-altam-solutions.pdf"
    - "SOA ALTAM syllabus, October 2026, Topic 7 (a)-(d), p.6, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "SOA INV-201 syllabus, Nov 2026-Jul 2027, Topic 1(a); Topic 3(c), p.4; hedging topic (c), p.7, sha256:8b5d280585ae9d0e35943729f861ac13ada7462be850c328da93645b7bbd9bc1 — https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payoff.md
---

A **Payoff** is the amount a derivative or an embedded guarantee pays its holder at the time it pays, written as a function of the underlying price or rate at that time and ignoring what was paid for the contract. For an option with strike $K$ on an underlying whose price at expiry is $S_T$, the payoffs of a call and a put are

> $$\text{Call: } (S_T - K)^+ = \max(S_T - K,\,0)$$

> $$\text{Put: } (K - S_T)^+ = \max(K - S_T,\,0)$$

- $(\cdot)^+$ keeps only the positive part, so an option's payoff is never negative.

Profit is the payoff less the premium paid, accumulated with interest to expiry. The price of a payoff is its [[Risk-Neutral Valuation|risk-neutral]] expected [[Present Value|present value]].

> [!example]- What are this bull call spread's payoff and profit at $S_T = 90$, $110$ and $130$? {Example}
> An investor buys a call with $K = 100$ for $8.00$ and sells a call with $K = 120$ for $2.50$, both expiring together. Ignore interest on the premiums.
>
> > [!answer]-
> > - The payoff is $(S_T - 100)^+ - (S_T - 120)^+$, and the net premium is $8.00 - 2.50 = 5.50$.
> > - At $S_T = 90$ the payoff is $0$ and the profit is $-5.50$.
> > - At $S_T = 110$ the payoff is $10$ and the profit is $4.50$.
> > - At $S_T = 130$ the payoff is $30 - 10 = 20$ and the profit is $14.50$.
> > - The payoff is capped at $120 - 100 = 20$. The investor gives up gains above 120 to cheapen the bet on a rise.

## Payoff of a forward

The payoff of a long forward is

> $$S_T - F_{0,T}$$

- $F_{0,T}$ is the forward price.

A forward's payoff can be negative, unlike an option's.

## Payoff of a caplet and a floorlet

An interest-rate cap is a strip of caplets. With notional $N$, accrual fraction $\tau$ and reference rate $L$ set at the start of the period, a caplet with cap rate $K$ pays

> $$N\,\tau\,(L - K)^+$$

and a floorlet pays $N\,\tau\,(K - L)^+$. The payment is made at the end of the period, in arrears.

> [!example]- A $\$10$ million quarterly loan has a cap at $4\%$, and the rates set are $3.6\%$, $4.3\%$ and $4.8\%$. What does each caplet pay? {Example}
> - Each quarter has $\tau = 0.25$.
> - At $3.6\%$ the caplet pays $10{,}000{,}000 \times 0.25 \times (0.036 - 0.04)^+ = 0$.
> - At $4.3\%$ it pays $10{,}000{,}000 \times 0.25 \times 0.003 = \$7{,}500$.
> - At $4.8\%$ it pays $10{,}000{,}000 \times 0.25 \times 0.008 = \$20{,}000$.
> - Each is paid at the end of its quarter, so with the loan the borrower's interest never exceeds $4\%$.

## Payoff of an embedded guarantee

A variable annuity's guarantee pays only the shortfall of the policyholder's fund below the guaranteed amount. A guaranteed minimum death benefit (GMDB) pays $(G_t - F_t)^+$ at death at time $t$, and a guaranteed minimum maturity benefit (GMMB) on a life $(x)$ with term $n$ pays

> $$\mathbb{1}\{T_x > n\}\,(G - F_n)^+$$

- $G$ is the guaranteed amount, which may be the premium, the premium rolled up at a rate or a ratchet to past fund highs.
- $F_n$ is the policyholder's fund at maturity.
- $\mathbb{1}\{T_x > n\}$ is 1 if the life survives the term and 0 otherwise.

A guaranteed minimum income benefit (GMIB) guarantees an annuity rate. Each guarantee is in effect a put option on the fund, so its value comes from the [[Black-Scholes Model]] and its risk is managed by [[Hedging|hedging]].

> [!example]- What does this variable annuity's guarantee pay for death in each year and at maturity? {Example}
> A single premium of $1{,}000$ buys a 3-year variable annuity. At the end of each year the fund earns the index return and then a $2\%$ management charge is deducted. Index returns are $+10\%$, $-30\%$ and $+5\%$. On death the contract pays, at the end of the year of death, the larger of the fund and the premium rolled up at $3\%$ a year. At maturity a living policyholder receives at least the premium.
>
> > [!answer]-
> > - The fund values are $F_1 = 1{,}000(1.10)(0.98) = 1{,}078.00$, $F_2 = 1{,}078.00(0.70)(0.98) = 739.51$ and $F_3 = 739.51(1.05)(0.98) = 760.95$.
> > - The GMDB guarantee is $G_t = 1{,}000(1.03)^t$, which is $1{,}030.00$, $1{,}060.90$ and $1{,}092.73$.
> > - For death in year 1 the guarantee pays $(1{,}030.00 - 1{,}078.00)^+ = 0$.
> > - For death in year 2 it pays $1{,}060.90 - 739.51 = 321.39$.
> > - For death in year 3 it pays $1{,}092.73 - 760.95 = 331.77$.
> > - On survival to maturity the GMMB pays $1{,}000 - 760.95 = 239.05$.
> > - The insurer's cost is the guarantee payoff only, because the fund belongs to the policyholder.

> [!trap] Reporting profit when the payoff is asked
> The payoff ignores the premium. A long call that expires out of the money has a payoff of $0$, but its profit is minus the accumulated premium.
