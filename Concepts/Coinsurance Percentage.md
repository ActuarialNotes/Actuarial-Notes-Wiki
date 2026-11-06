---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce7a53ad9e58a685afae54eef348e0a9c6fd032599bfd58650fda64a8329a9e1
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI only a certain percentage of each loss may be reimbursed, often referred to as coinsurance PDF p.7; reimburse 80% of costs PDF pp.8-9"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 2016), Ch.11 coinsurance notation and apportionment ratio PDF p.221; indemnity formula and 500,000 / 300,000 / 80% example PDF p.222, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Probability Exam syllabus, November 2026, objective \"Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation\", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance Percentage.md
---

A **Coinsurance Percentage** $\alpha$ is the share of each covered loss, after any [[Deductible|deductible]], that the [[Insurer|insurer]] pays. The insured pays the remaining share $1 - \alpha$.

> $$Y = \alpha\,(X - d)_+$$

- $X$ is the ground-up loss, $d$ the deductible and $Y$ the insurer's payment. The coinsurance percentage $\alpha$ lies in $(0, 1]$, and $\alpha = 1$ means no coinsurance.
- The payment is a fixed multiple of the excess over the deductible. Its mean is scaled by $\alpha$ and its variance by $\alpha^2$.
- On Exam 5 the word means something else: the insurance-to-value percentage that a property [[Coinsurance Rating|coinsurance clause]] requires. That meaning has its own section below.

> [!idea] The idea
> Coinsurance keeps the insured paying part of every covered dollar, so the insured still has a reason to keep the loss small. Because the payment is a fixed fraction of the excess, every figure about it scales: amounts and the mean by $\alpha$, the variance by $\alpha^2$.

![[Media/Figures/Coinsurance_Percentage.svg|340]]

## One loss: who pays what

Take a policy with a deductible of 200 and a coinsurance percentage of 80%.

| Loss $X$ | Excess $(X - 200)_+$ | Insurer pays $0.8 \times$ excess | Insured keeps |
|---|---|---|---|
| 50 | 0 | 0 | 50 |
| 350 | 150 | 120 | 230 |
| 900 | 700 | 560 | 340 |

The insured keeps the deductible part and 20% of the excess. The three pieces always add back to the loss.

> $$X = (X \wedge d) + (1 - \alpha)(X - d)_+ + \alpha(X - d)_+$$

- With no deductible, the insured's unreimbursed loss is $(1 - \alpha)X$. Every percentile of it is $1 - \alpha$ times the same percentile of the loss.

## The mean and variance scale

Let the loss be uniform on $(0, 1000)$. The [[Deductible]] page found the expected excess $E[(X - 200)_+] = 320$. The insurer's expected payment is 80% of that.

> $$E[Y] = \alpha\,E[(X - d)_+]$$

- For the running example, $E[Y] = 0.8 \times 320 = 256$.

The variance scales by the square of the coinsurance percentage.

> $$\text{Var}(Y) = \alpha^2\,\text{Var}\big((X - d)_+\big)$$

- The excess has $E[(X - 200)_+^2] = 170{,}666.67$, so its variance is $170{,}666.67 - 320^2 = 68{,}266.67$.
- The payment's variance is $0.64 \times 68{,}266.67 = 43{,}690.67$. Its standard deviation, 209.02, is 80% of the excess's 261.28.

> [!trap] $\alpha$ on the variance
> Multiplying the variance by $0.8$ gives 54,613, which is too large. The variance takes $\alpha^2 = 0.64$.

The same scaling holds for the payment per payment. Given a loss above 200, the excess is uniform on $(0, 800)$, with variance 53,333.33. The payment per payment has variance $0.64 \times 53{,}333.33 = 34{,}133.33$.

## Choosing the percentage

Because the expected payment is linear in $\alpha$, a target for the mean gives $\alpha$ directly. For an expected payment per loss of 200 under the running example, $\alpha = 200 / 320 = 0.625$.

A target for the variance gives $\alpha^2$, so take a square root at the end.

## Coinsurance with a benefit limit

When a [[Benefit Limit|benefit limit]] $u$ caps the insurer's payment, the payment is $\min(\alpha(X - d)_+, u)$. The cap binds once the coinsured excess reaches $u$, at the loss $d + u/\alpha$.

- With $d = 200$, $\alpha = 0.8$ and $u = 400$, the insurer pays the maximum on every loss above $200 + 400/0.8 = 700$.
- Some policies cap the covered loss instead and apply coinsurance after the cap. The order changes the answer, as shown on [[Payment Random Variable]].

## On Exam 5: the coinsurance clause

On a property policy, the coinsurance percentage $c$ is the insurance-to-value the insured must carry. The insured must buy insurance of at least $cV$, where $V$ is the property's value ([[Insurance to Value]]). An underinsured policy pays losses in proportion to the shortfall, through the apportionment ratio $a$ (Werner & Modlin).

> $$a = \min\!\left(\frac{F}{cV},\ 1\right)$$

> $$I = \min(a\,L,\ F)$$

- $F$ is the face value of the policy, $L$ the loss after the deductible and $I$ the indemnity.
- A home worth 500,000 insured for 300,000 under an 80% requirement has $cV = 400{,}000$ and $a = 0.75$. A loss of 200,000 is paid 150,000. The coinsurance penalty is the other 50,000.
- The Exam 5 percentage $c$ is a requirement on the amount of insurance. It is not the insurer's share of each loss. Pricing it is on [[Coinsurance Rating]].

## Try it

> [!example]- Mean and variance with coinsurance {Example}
> Ground-up losses $X$ have $E[(X - 500)_+] = 1{,}200$ and $\text{Var}((X - 500)_+) = 4{,}000{,}000$. The insurer pays 80% of the excess over the deductible of 500. Find $E[Y]$ and $\text{Var}(Y)$.
>
> > [!answer]-
> > **Plan:** scale the mean by $\alpha$ and the variance by $\alpha^2$.
> > $$
> > \begin{align*}
> > E[Y] &= 0.80 \times 1200 \\
> > &= 960 \\[4pt]
> > \text{Var}(Y) &= 0.64 \times 4{,}000{,}000 \\
> > &= 2{,}560{,}000
> > \end{align*}
> > $$

> [!example]- Solving for the percentage {Example}
> Losses are uniform on $(0, 600)$. A policy pays a percentage $\alpha$ of the excess over a deductible of 200. The insurer wants the variance of the payment per loss to be 10,000. Find $\alpha$.
>
> > [!answer]-
> > **Plan:** find the variance of the excess, then solve $\alpha^2 \times$ that variance $= 10{,}000$.
> > $$
> > \begin{align*}
> > E[(X - 200)_+] &= \frac{400^2}{2 \times 600} \\
> > &= 133.33 \\[4pt]
> > E[(X - 200)_+^2] &= \frac{400^3}{3 \times 600} \\
> > &= 35{,}555.56 \\[4pt]
> > \text{Var}\big((X - 200)_+\big) &= 35{,}555.56 - 133.33^2 \\
> > &= 17{,}777.78
> > \end{align*}
> > $$
> > Then $\alpha^2 = 10{,}000 / 17{,}777.78 = 0.5625$, so $\alpha = 0.75$.
> >
> > Why the square root? The variance carries $\alpha^2$, so a variance target fixes $\alpha^2$ first.

> [!example]- An underinsured home {Example}
> A home is worth 400,000 and insured for 240,000 under an 80% coinsurance clause. Find the indemnity on a loss of 100,000 and on a loss of 360,000, after the deductible.
>
> > [!answer]-
> > **Plan:** find the apportionment ratio, apply it, then cap at the face value.
> >
> > - The requirement is $cV = 0.8 \times 400{,}000 = 320{,}000$, so $a = 240{,}000 / 320{,}000 = 0.75$.
> > - On the loss of 100,000, $I = 0.75 \times 100{,}000 = 75{,}000$.
> > - On the loss of 360,000, $0.75 \times 360{,}000 = 270{,}000$ exceeds the face value, so $I = 240{,}000$.

> [!warning]- Exam traps
> - **$\alpha$ instead of $\alpha^2$ on the variance.** The standard deviation scales by $\alpha$, the variance by $\alpha^2$.
> - **Coinsurance before the deductible.** Take the deductible off first, then apply $\alpha$ to the excess.
> - **The two meanings.** On Exam P, $\alpha$ is the insurer's share. On Exam 5, $c$ is a required insurance-to-value, and a policy that meets it pays the full loss up to the face value.
> - **Where the limit binds.** With coinsurance, the payment cap $u$ is reached at the loss $d + u/\alpha$, not $d + u$.
