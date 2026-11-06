---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:94943cb7f994e79c6b42d9225d592eb9d2642a104c0d1c00fd470e44543f9800
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II policyholder or designated beneficiary PDF p.2; §VI reasons for deductibles PDF p.7, benefit limits and maximum claim payment PDF pp.8-9; §VII inflation PDF pp.10-11"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.1 claim and claimant PDF p.14, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA, Tables for Exam C (Fall 2009), exponential entry E[X^x] = theta(1 - e^(-x/theta)), PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policyholder.md
---

**A policyholder** is the person or organisation that buys an [[Insurance Policy|insurance policy]], pays its [[Insurance Premium|premium]] and holds the rights under it. The [[Insurer|insurer]] pays covered [[Claim|claims]] to the policyholder or on its behalf. On Exam P, the policyholder keeps whatever part of a loss $X$ the insurer's payment $Y$ does not cover.

> $$X = Y + (X - Y)$$

> $$Y = \min\!\big(c\,(X - d)^+,\ u\big)$$

- $X$ is the ground-up [[Loss Random Variable|loss]], $Y$ the insurer's [[Payment|payment]], and $X - Y$ the amount the policyholder retains.
- $d$ is the [[Deductible|deductible]], $c$ the insurer's [[Coinsurance Percentage|coinsurance percentage]] and $u$ the [[Benefit Limit|benefit limit]], the maximum payment.
- The [[Policy Information|policy information]] says in which order the terms apply.

> [!idea] The idea
> Every dollar of a loss is paid by someone. Whatever the policy terms don't send to the insurer stays with the policyholder, so the policyholder's share is found by subtracting the payment from the loss. The terms decide the split, and which party a change in the loss lands on.

## Who keeps what on one loss

A policyholder's policy has a deductible of 500, the insurer pays $75\%$ of the loss above it, and the insurer's maximum payment is 6,000.

| Loss $X$ | Insurer pays $Y$ | Policyholder keeps |
|---|---|---|
| 300 | 0 | 300 |
| 2,500 | 1,500 | 1,000 |
| 6,500 | 4,500 | 2,000 |
| 10,000 | 6,000 | 4,000 |

On the loss of 2,500, the insurer pays $0.75 \times 2000 = 1500$. The policyholder keeps the deductible of 500 plus $25\%$ of the 2,000 above it.

## The three pieces the policyholder keeps

The policyholder's share has up to three parts.

- **The deductible**, the first $d$ of the loss.
- **The coinsurance share**, $(1 - c)(X - d)$, until the payment reaches the limit.
- **Anything above the limit.** The insurer's payment reaches 6,000 when $0.75(X - 500) = 6000$, that is at a loss of 8,500. The policyholder keeps every dollar of loss beyond that.

On the loss of 10,000, the policyholder keeps the full 4,000 that the insurer doesn't pay.

The study note P-21-05 gives the reasons for a deductible. It saves the expense of processing small claims, lowers the premium, and gives the policyholder an economic incentive to prevent losses ([[Moral Hazard|moral hazard]]).

> [!trap] Capping the loss instead of the payment
> With coinsurance, capping the payment at $u$ and capping the covered loss at $u$ give different answers. Read whether the policy states a maximum payment or a maximum covered loss.

## When losses grow

Next year every loss is $10\%$ larger, but the deductible and the maximum payment stay the same. Who absorbs the growth?

| Loss next year | Insurer pays | Policyholder keeps |
|---|---|---|
| 2,750 | 1,687.50 | 1,062.50 |
| 7,150 | 4,987.50 | 2,162.50 |
| 11,000 | 6,000 | 5,000 |

- On the loss that grew from 2,500, the insurer's payment rises $12.5\%$ and the policyholder's share only $6.25\%$. The fixed deductible doesn't grow, so the insurer's payment grows faster than the loss.
- On the loss that grew from 10,000, the limit already binds. The insurer pays nothing more, and the policyholder's share rises $25\%$.

This leverage is the reason [[Inflation|inflation]] questions inflate the losses first and then apply the terms.

## The expected amount retained

With only a deductible, the policyholder keeps $\min(X, d)$ on every loss. Its mean is the [[Limited Expected Value|limited expected value]] at the deductible.

> $$E[X - Y] = E[X \wedge d]$$

## Policyholder, beneficiary and claimant

The policyholder, the beneficiary and the claimant can be different people. The insurer pays the policyholder *or a designated beneficiary*. The claimant, who makes the demand for payment, can be an insured or a third party alleging injuries or damages that the policy covers. The person paid need not be the policyholder.

## On other exams

The life, health and investment exams name the policyholder in their objectives on risk and capital.

- **Policyholder behaviour** is a risk to the insurer. Policyholders decide whether to keep paying premiums, to [[Lapse|lapse]] or to use a guarantee, and those choices can be only partly hedged.
- **Stakeholders.** Group benefits separate the policyholder, often an employer, from the insureds, such as employees and their dependents.
- **Capital.** Policyholders are one of the parties, with regulators, investors and management, whose view of an insurer's [[Capital|capital]] the exams ask candidates to compare.

## Try it

> [!example]- Two losses before and after inflation {Example}
> A policy has a deductible of 500, $80\%$ coinsurance and a maximum payment of 8,000. This year the policyholder has losses of 6,000 and 12,000. Next year every loss is $10\%$ larger. Split each loss between insurer and policyholder in both years.
>
> > [!answer]-
> > **Plan:** apply the deductible, then the coinsurance, then the cap, and subtract from the loss.
> > $$
> > \begin{align*}
> > Y_{6000} &= 0.80 \times 5500 \\
> > &= 4400 \\
> > Y_{6600} &= 0.80 \times 6100 \\
> > &= 4880
> > \end{align*}
> > $$
> > The policyholder keeps 1,600 this year and 1,720 next year. The insurer's payment rises $10.9\%$ and the policyholder's share $7.5\%$.
> > $$
> > \begin{align*}
> > Y_{12000} &= \min(0.80 \times 11500,\ 8000) \\
> > &= 8000 \\
> > Y_{13200} &= \min(0.80 \times 12700,\ 8000) \\
> > &= 8000
> > \end{align*}
> > $$
> > The policyholder keeps 4,000, then 5,200, a $30\%$ increase. Below the limit, inflation lands mostly on the insurer. Above it, all of the inflation lands on the policyholder.

> [!example]- Expected amount the policyholder retains {Example}
> A policyholder's loss is exponential with mean 1,000. The policy has a deductible of 250 and no other terms. Find the insurer's expected payment and the policyholder's expected retained loss.
>
> > [!answer]-
> > **Plan:** find the insurer's expected payment, then subtract it from the expected loss.
> > $$
> > \begin{align*}
> > E[Y] &= \int_{250}^{\infty} (x - 250)\,\frac{1}{1000}\,e^{-x/1000}\,dx \\
> > &= 1000\,e^{-0.25} \\
> > &\approx 778.80 \\
> > E[X - Y] &= 1000 - 778.80 \\
> > &= 221.20
> > \end{align*}
> > $$
> > This is $E[X \wedge 250]$. The deductible removes $22.1\%$ of the expected loss. Separately, a share $1 - e^{-0.25} \approx 22.1\%$ of all losses produce no claim payment at all.

> [!warning]- Exam traps
> - **Retained amount or payment.** Read whether the question asks what the insurer pays or what the policyholder keeps. The two always add to the loss.
> - **The order of the terms.** Deductible, then coinsurance, then the cap on the payment, unless the policy caps the covered loss.
> - **Inflation with fixed terms.** Inflate the loss first. Below the limit the insurer's payment grows faster than the loss, and above it the policyholder takes all of the growth.
> - **Policyholder versus payee.** The insurer may pay a beneficiary or a third-party claimant rather than the policyholder.
