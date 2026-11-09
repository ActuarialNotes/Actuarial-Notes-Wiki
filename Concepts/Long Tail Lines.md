---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:12387073b43b80239cb85b5db9aeb953de37134781c884ec60cb2633f6b9c46e
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 1 p.15 (PDF p.21); Part 3 intro pp.79-80 (PDF pp.85-86); Ch. 9 p.155 (PDF p.161); Ch. 11 p.194 (PDF p.200); Ch. 14 p.333 (PDF p.339, percent reported = 1/CDF), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 7 p.138 (PDF p.150), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Long Tail Lines.md
---

![[Media/Figures/Long_Tail_Lines.svg|340]]

A **Long Tail Line** is a line of insurance whose claims take many years to be reported and settled, so that at an early maturity most of its [[Ultimate Loss|ultimate claims]] are still unreported or unpaid. U.S. medical malpractice occurrence, workers compensation and general liability, including products liability and errors and omissions, are examples. The share of ultimate claims reported at age $n$ is

> $$\text{Reported \%} = \frac{1}{\text{CDF}_{n \to \text{ult}}}$$

- $\text{CDF}_{n \to \text{ult}}$ is the reported [[Cumulative Development Factor|cumulative development factor]] from age $n$ to ultimate.
- The share unreported is $1 - 1/\text{CDF}_{n \to \text{ult}}$.

Paid claims have their own CDF, and the share paid is its reciprocal. In a long-tail line both CDFs are large at early ages, so [[IBNR]] is a large share of what remains unpaid. Two lags add up: a reporting lag, from latent disease or injuries whose severity is not at first apparent, creates pure IBNR, and a settlement lag, from litigation, creates development on known claims.

> [!example]- A general liability accident year has $\$800{,}000$ of reported claims at 12 months. The selected age-to-age factors are 2.40 from 12 to 24 months, 1.45 from 24 to 36 months and 1.60 from 36 months to ultimate. What share of its ultimate claims is reported, and what is its IBNR? {Example}
> - The CDF from 12 months to ultimate is the product of the factors:
>
> $$\text{CDF}_{12 \to \text{ult}} = 2.40 \times 1.45 \times 1.60 = 5.568$$
>
> - The share reported is $1/5.568 = 18.0\%$.
> - The ultimate claims are $800{,}000 \times 5.568 = \$4{,}454{,}400$.
> - The IBNR is $4{,}454{,}400 - 800{,}000 = \$3{,}654{,}400$, or 82.0% of ultimate.

## Leverage of development factors

Because the [[Cumulative Development Factor|CDF]] at early maturities is large, estimates are highly **leveraged**: a small proportional change in a factor moves ultimate by a large dollar amount. Each dollar on the latest diagonal is multiplied by the CDF, so a single [[Large Loss|large claim]] or a change in [[Case Adequacy|case adequacy]] can make the projection for a recent year unreasonable. Cumulative paid factors above 10 are not unusual in long-tail lines. The [[Tail Factor|tail factor]] multiplies every accident year and is often the single largest judgment.

> [!example]- In the general liability year above, one large claim is reserved a few weeks earlier, so reported claims at 12 months are $\$1{,}100{,}000$ instead of $\$800{,}000$. How much does the development estimate of ultimate claims change? {Example}
> - The development estimate becomes $1{,}100{,}000 \times 5.568 = \$6{,}124{,}800$.
> - A $\$300{,}000$ difference on the diagonal becomes a $\$1{,}670{,}400$ difference in ultimate claims.
> - The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] estimate is the reported claims plus 82.0% of an a priori expected ultimate, so it changes by only the $\$300{,}000$.

BF applies the development factor only to the *unreported* portion and anchors the rest on an a priori expectation, so a one-off reserve entry moves the answer by its own amount rather than by five times its amount. The [[Expected Loss Method|expected claims]] and BF techniques are therefore preferred at immature ages, and the [[Frequency-Severity Method|frequency-severity]] techniques are most often used for long-tail lines, where ultimate severities are not known for a long time.

## Calendar year forces

Long-tail reserves are also exposed to **calendar-year** forces that no accident-year pattern anticipates: [[Inflation|social and economic inflation]], legislative reform, judicial reinterpretation. These hit every open accident year at once. The longer a claim stays open, the longer it is exposed to a change in the law, and some changes apply retroactively to claims already incurred.

## Investment income on long-tail reserves

A long payout pattern means large held reserves and substantial investment income on them before the claims are paid. A claims-made policy shortens the time between collecting premium and paying claims compared with an occurrence policy, so its premium earns less investment income.
