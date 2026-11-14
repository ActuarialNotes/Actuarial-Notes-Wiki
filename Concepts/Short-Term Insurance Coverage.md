---
aliases:
  - Short-Term Insurance
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6b46fb505394780c94ee97fcd25556151cba58a93534198cd5b1c803278cd548
  sources:
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.1, 1.1.3 Insurance Processes (short-term: a year or six months; one-period model), 1.2.2 Renewing Insurance (decline, new premium at renewal), sha256:2c2039e91e3cd3a8b02d046160e76b59b69c79c3b891b63adf8f7900f48421dc — https://openacttexts.github.io/Loss-Data-Analytics/ChapIntro.html"
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.7, 7.2.1 Pure Premium Method: Premium = (Losses + Fixed)/(1 - V - Q), sha256:e2b442d46d43ea67112f4a7a8f3b2cbb8e6437db8600722d5ea1a1c5f19c8408 — https://openacttexts.github.io/Loss-Data-Analytics/ChapPremiumFoundations.html"
    - "Frees et al., Loss Data Analytics (open text, openacttexts.github.io), ch.11, 11.1.1 IBNR and RBNS claims; 11.3.1 deterministic chain-ladder, sha256:040c5904f5d17dccd17772da19b8d45cf2a23fbec75661549d5168e6e611e939 — https://openacttexts.github.io/Loss-Data-Analytics/ChapLossReserves.html"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9 Bornhuetter-Ferguson: Ultimate = Actual Paid + Expected Claims x % Unpaid; Z = 1/CDF; unpaid claims develop on expected claims, PDF pp.158-159 (printed 152-153), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.8 pure premium vs loss ratio methods, indicated change vs current rate, PDF p.158; unearned premium definition, PDF p.78, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam FAM Syllabus, February 2027, Topic 5 (ELR, chain-ladder, BF; ratemaking adjustments; loss cost and loss ratio methods), p.5, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Short-Term Insurance Coverage.md
---

A **Short-Term Insurance Coverage** is an [[Insurance Coverage|insurance coverage]] written for a short term, usually one year or less, after which the [[Insurer|insurer]] may reprice, change or decline to renew it. Property, liability, auto, workers compensation and group health coverages are short-term.

Because the premium covers one period's claims, the actuarial work is to model that period's aggregate losses, price the next term, and estimate what is still owed on terms already expired. Long-term coverages (life insurance, annuities) differ: their premiums and benefits are fixed for decades, and interest and mortality, not claim development, dominate.

## Aggregate losses for one term

The [[Aggregate Loss Model|aggregate loss]] for one term is

> $$S = X_1 + X_2 + \cdots + X_N$$

- $N$ is the number of claims, its [[Frequency|frequency]].
- $X_i$ is the size of claim $i$, its [[Severity|severity]].

Each $X_i$ is net of [[Coverage Modifications|coverage modifications]] such as a [[Deductible|deductible]] or a limit.

## Pricing

Historical data are adjusted before they are used: losses are [[Loss Development|developed]] and [[Trend|trended]], and premium is brought to the current rate level ([[On-Leveling|on-leveling]]). By the [[Pure Premium Method|pure premium method]], the indicated rate is

> $$\text{Indicated Rate} = \frac{\text{Pure Premium} + F}{1 - V - Q}$$

- $\text{Pure Premium}$ is the expected loss per exposure.
- $F$ is the fixed expense per exposure.
- $V$ is the variable expense ratio.
- $Q$ is the profit and contingencies provision.

The [[Loss Ratio Method|loss ratio method]] gives the same indication as a change to the current rate, the [[Overall Rate Level Indication|overall rate change]].

> [!example]- What are the indicated rate and rate change for this auto coverage? {Example}
> Losses per exposure are Poisson with mean $0.08$, and ground-up loss size is exponential with mean \$5,000. The coverage has a \$1,000 ordinary deductible. Fixed expenses are \$25 per exposure, variable expenses $20\%$ of premium and the profit provision $5\%$. The current rate is \$440.
>
> > [!answer]-
> > - For an exponential, the expected payment per loss is $E[(X - 1{,}000)_+] = 5{,}000\,e^{-0.2} = 4{,}093.65$.
> > - The pure premium is $0.08 \times 4{,}093.65 = 327.49$.
> > - The indicated rate is $(327.49 + 25)/(1 - 0.20 - 0.05) = 469.99$.
> > - The indicated change is $469.99/440 - 1 = +6.8\%$.

## Reserving

The period of cover is short but settlement is not. Claims are reported and paid after the term ends, so the insurer holds [[Unpaid Claims|outstanding claims]] (case reserves plus [[IBNR]]). For an accident year, they are

> $$\text{Unpaid} = \text{Ultimate} - \text{Paid}$$

The ultimate is estimated by the [[Expected Loss Method|expected loss ratio]], [[Chain Ladder Method|chain-ladder]] and [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] methods. The insurer also holds [[Unearned Premium|unearned premium]] for the unexpired part of each term.

Bornhuetter-Ferguson estimates the unpaid claims from the expected claims alone, as

> $$\text{BF Unpaid} = \text{ELR} \times \text{EP} \times \left(1 - \frac{1}{\text{CDF}}\right)$$

- $\text{ELR}$ is the expected loss ratio.
- $\text{EP}$ is the earned premium.
- $\text{CDF}$ is the cumulative development factor from the current age to ultimate.

Adding the paid claims gives the Bornhuetter-Ferguson ultimate.

> [!example]- What are the outstanding claims by the chain-ladder and Bornhuetter-Ferguson methods? {Example}
> An accident year at 12 months has earned premium \$10,000,000, paid claims \$3,000,000, a paid cumulative development factor to ultimate of $2.5$, and an expected loss ratio of $65\%$.
>
> > [!answer]-
> > - The chain-ladder ultimate is $3{,}000{,}000 \times 2.5 = 7{,}500{,}000$, so its outstanding claims are $7{,}500{,}000 - 3{,}000{,}000 = 4{,}500{,}000$.
> > - The Bornhuetter-Ferguson outstanding claims are $0.65 \times 10{,}000{,}000 \times (1 - 1/2.5) = 3{,}900{,}000$.
> > - Paid claims are running ahead of expectation, with a chain-ladder ultimate loss ratio of $75\%$ against $65\%$.
> > - Bornhuetter-Ferguson gives that early emergence no weight in the unpaid portion, so it reserves \$600,000 less.

> [!trap] Using ground-up severity with a deductible
> With a deductible, the pure premium is the expected payment per loss, $E[(X-d)_+]$, times the loss frequency, or the severity per payment times the reduced payment frequency. Ground-up severity times loss frequency overstates it.
