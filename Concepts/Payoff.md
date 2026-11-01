---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:dcc01f7abbe6cf8cf323765b2bdd872283135a9378eefa2e9e9b9729f659524d
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

A **Payoff** is the amount a derivative or an embedded guarantee pays its holder at the time it pays, written as a function of the underlying price or rate at that time, ignoring what was paid for the contract. Profit is the payoff less the accumulated premium, and the price is the [[Risk-Neutral Valuation|risk-neutral]] expected [[Present Value|present value]] of the payoff.

> $$\text{Call: } (S_T - K)^+ = \max(S_T - K,\,0)$$

> $$\text{Put: } (K - S_T)^+ = \max(K - S_T,\,0)$$

> $$\text{Long forward: } S_T - F_{0,T}$$

> $$\text{GMMB: } \mathbb{1}\{T_x > n\}\,(G - F_n)^+$$

- $S_T$ is the underlying's price at expiry, $K$ the strike, $F_{0,T}$ the forward price, $G$ the guaranteed amount and $F_n$ the policyholder's fund at maturity $n$; $(\cdot)^+$ keeps only the positive part, so an option's payoff is never negative while a forward's can be
- **Interest-rate options (INV-201):** a caplet pays $N\,\tau\,(L - K)^+$ and a floorlet $N\,\tau\,(K - L)^+$, where $N$ is the notional, $\tau$ the accrual fraction and $L$ the reference rate set at the start of the period. The payment is made at the end of the period, in arrears. A cap is a strip of caplets
- **Embedded guarantees (ALTAM):** a GMDB pays $(G_t - F_t)^+$ at death; a GMMB pays $(G - F_n)^+$ at maturity if alive. A GMIB guarantees an annuity rate. $G$ may be the premium, a roll-up or a ratchet to past fund highs
- Each guarantee is in effect a put option on the fund, which is why its value comes from the [[Black-Scholes Model]] and its risk is managed by [[Hedging|hedging]]

> [!example]- Bull Call Spread at Three Prices {Example}
> An investor buys a call with $K = 100$ for $8.00$ and sells a call with $K = 120$ for $2.50$, both expiring together. Find the payoff and the profit (ignoring interest on the premiums) if $S_T = 90$, $110$ or $130$.
>
> > [!answer]-
> > Payoff $= (S_T - 100)^+ - (S_T - 120)^+$; net premium $= 8.00 - 2.50 = 5.50$.
> > - $S_T = 90$: payoff $0$, profit $-5.50$
> > - $S_T = 110$: payoff $10$, profit $4.50$
> > - $S_T = 130$: payoff $30 - 10 = 20$, profit $14.50$
> >
> > The payoff is capped at $120 - 100 = 20$: the investor gives up gains above 120 to cheapen the bet on a rise.

> [!example]- GMDB and GMMB Payoffs on a Variable Annuity {Example}
> A single premium of $1{,}000$ buys a 3-year variable annuity. At the end of each year the fund earns the index return and then a $2\%$ management charge is deducted. Index returns are $+10\%$, $-30\%$ and $+5\%$. On death the contract pays, at the end of the year of death, the larger of the fund and the premium rolled up at $3\%$ a year. At maturity a living policyholder receives at least the premium. Find the guarantee payoff for death in each year and at maturity.
>
> > [!answer]-
> > Fund values:
> > - $F_1 = 1{,}000(1.10)(0.98) = 1{,}078.00$
> > - $F_2 = 1{,}078.00(0.70)(0.98) = 739.51$
> > - $F_3 = 739.51(1.05)(0.98) = 760.95$
> >
> > The GMDB guarantee is $G_t = 1{,}000(1.03)^t$: $1{,}030.00$, $1{,}060.90$, $1{,}092.73$.
> > - Death in year 1: $(1{,}030.00 - 1{,}078.00)^+ = 0$
> > - Death in year 2: $1{,}060.90 - 739.51 = 321.39$
> > - Death in year 3: $1{,}092.73 - 760.95 = 331.77$
> > - Survival to maturity (GMMB): $1{,}000 - 760.95 = 239.05$
> >
> > The insurer's cost is the guarantee payoff only; the fund itself belongs to the policyholder.

> [!example]- Caplet Payoffs on a Floating-Rate Loan {Example}
> A borrower holds a cap on a $\$10$ million quarterly floating-rate loan with cap rate $4\%$. The reference rates set at the start of three quarters are $3.6\%$, $4.3\%$ and $4.8\%$. Find each caplet's payoff, taking $\tau = 0.25$.
>
> > [!answer]-
> > - $3.6\%$: $10{,}000{,}000 \times 0.25 \times (0.036 - 0.04)^+ = 0$
> > - $4.3\%$: $10{,}000{,}000 \times 0.25 \times 0.003 = \$7{,}500$
> > - $4.8\%$: $10{,}000{,}000 \times 0.25 \times 0.008 = \$20{,}000$
> >
> > Each is paid at the end of its quarter, so together with the loan the borrower's interest never exceeds $4\%$.

> [!tip]- How it appears on the exam
> - **INV-201** asks for the payoff of forwards, futures, swaps, calls, puts, caps, floors and swaptions, alone or combined into a strategy (spread, straddle, collar), often as a payoff table or diagram, and asks what view the strategy expresses.
> - **ALTAM** gives a fund path (index returns and charges) and asks for the GMDB, GMMB, GMIB or GMWB payoff, as the first step before valuing it with the [[Black-Scholes Model]] or profit testing it.
> - Written parts ask which guarantee behaves like which option, and why a roll-up or ratchet makes it more expensive.

> [!warning]- Exam traps
> - Reporting profit when payoff is asked, or the reverse: a long call that expires out of the money has payoff $0$ but profit equal to minus the accumulated premium.
> - Projecting the fund without its charges: $1{,}000(1.10)(0.70)(1.05) = 808.50$ instead of $760.95$ in the second example, which understates every guarantee payoff.
> - Paying the caplet at the reset date instead of in arrears, or forgetting the accrual fraction $\tau$ — a payoff four times too large on a quarterly cap.
> - Adding the GMMB to the GMDB on a death in the final year: only one benefit is triggered, by the way the contract ends.
