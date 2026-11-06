---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:ec0b15882e9bf462a61b638069fcc237b419903bdbb0ec7220d1a9b75eae9b2c
  sources:
    - "IRMI Insurance Glossary, 'claim' (fetched 2026-10-10), sha256:38c7e60380b2dc016b204eaa95c17228c89cf89e57152e7dcc4a37e300651b0b — https://www.irmi.com/term/insurance-definitions/claim"
    - "IRMI Insurance Glossary, 'proof of loss' (fetched 2026-10-10), sha256:4a15c05bdb1431633d387a74200419f35393f5ab6c054c4bcdd72de6782d79f2 — https://www.irmi.com/term/insurance-definitions/proof-of-loss"
    - "IRMI Insurance Glossary, 'first party insurance' (fetched 2026-10-10), sha256:345598aa5e91f2702abb219143b6331af4d3dfe650e779f0fcb151d439a3a9a0 — https://www.irmi.com/term/insurance-definitions/first-party-insurance"
    - "IRMI Insurance Glossary, 'liability insurance' (fetched 2026-10-10), sha256:3d142cd30f5eb36026cf77cd347df7109ee125eedb4c584e9242a19eb7bf7dd2 — https://www.irmi.com/term/insurance-definitions/liability-insurance"
    - "ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Conditions C.8, I, J (pp.14, 16), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO CP 00 10 10 12, Building and Personal Property Coverage Form, D Deductible, F.1 Coinsurance (pp.10, 13), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.1 PDF pp.14-15 — prior-pass source, re-fetched, hash unchanged, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §II, §III, §VI (PDF pp.2-3, 7) — re-fetched, hash unchanged, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 (fetched 2026-10-10), random sums — re-fetched; HTML hash differs from run 919b's copy, sha256:b7c8d711d8ba6910e0226b0beb5046d25a834faeeecc0ef5ce87ead3c15aede8 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §11.1.3 (fetched 2026-10-10), Poisson splitting — re-fetched; HTML hash differs from run 919b's copy, sha256:ee6db1bea6bec9eb05fbf1b8ec21a67b5b37ba380a8b425f8c99576739c86c0f — https://www.probabilitycourse.com/chapter11/11_1_3_merging_and_splitting_poisson_processes.php"
    - "SOA, Tables for Exam C (Fall 2009), exponential E[X^x], PDF p.11 — re-fetched, hash unchanged, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), PDF pp.14, 20, 66 — re-fetched, hash unchanged, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Conditional Expected Value, §3.7 Conditional Expected Value, Random Sums of Random Variables: E(Y_N|N) = N mu, E(Y_N) = E(N) mu, var(Y_N|N) = N sigma^2, var(Y_N) = E(N) sigma^2 + var(N) mu^2, sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "Compound Poisson Processes, §13.6 Compound Poisson Processes: E(N_t) = var(N_t) = rt, var(V_t) = (mu^2 + sigma^2) rt; same with rt replaced by a for a compound Poisson variable, sha256:6c5a27a1dc417fbb651a6271f8bb72c6e6f9790ae3c59c781f8f51c29961afd6 — https://www.randomservices.org/random/poisson/Compound.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim.md
---

**A claim** is a demand to an [[Insurer|insurer]] for indemnification under an [[Insurance Policy|insurance policy]] after an event the policy covers. The claimant can be the [[Policyholder|insured]], another individual the policy provides for, or a third party alleging injuries or damages that the policy covers.

> $$S = X_1 + X_2 + \cdots + X_N$$

> $$E[S] = E[N]\,E[X]$$

- $N$ is the number of claims in a period, its [[Frequency|frequency]]. Each $X_i$ is the size of one claim, its [[Severity|severity]]. $S$ is the aggregate claims for the period.
- The model assumes the $X_i$ are independent and identically distributed, and independent of $N$. This is the collective risk model of the [[Aggregate Loss Model|aggregate loss model]].
- With a Poisson count, $S$ is a [[Compound Poisson Process|compound Poisson]] total.

> [!idea] The idea
> A year's claims total is uncertain in two ways: how many claims arrive and how large each one is. Splitting the total into a count and a size lets each be modelled on its own data. The mean total is then the mean count times the mean size.

## Claim, loss and accident date

A homeowner's kitchen burns on 3 March and the homeowner asks the insurer to pay for the repairs. That demand is the claim.

- The *loss* is the amount of compensation paid or payable to the claimant under the policy.
- The date of the fire is the accident date, also called the date of loss or the occurrence date.
- Actuaries sometimes use *losses* and *claims* interchangeably, so check which one a source means.

## A year of claims

Take a book of homeowners policies. Claims arrive as a Poisson count with mean 40 a year. Each claim size has mean 5,000 and standard deviation 10,000. What does the insurer expect to pay in total?

| Quantity | Value |
|---|---|
| Expected claim count $E[N]$ | 40 |
| Expected claim size $E[X]$ | 5,000 |
| Expected aggregate claims $E[S]$ | 200,000 |

The total is 40 claims times 5,000 a claim. The formula holds whatever the distribution of the count, as long as the sizes are independent of the count.

## How much the total varies

The total varies for two reasons. Given the count, the sizes vary. And the count itself varies. Conditioning on the count separates the two.

> $$E[S \mid N] = N\,E[X]$$

> $$\text{Var}(S \mid N) = N\,\text{Var}(X)$$

The laws of total expectation and total variance then give the compound variance.

> $$\text{Var}(S) = E[N]\,\text{Var}(X) + \text{Var}(N)\,E[X]^2$$

- The first term is the variation in claim sizes. For the running example it is $40 \times 10{,}000^2 = 4 \times 10^9$.
- The second term is the variation in the count. It is $40 \times 5{,}000^2 = 1 \times 10^9$.
- The total variance is $5 \times 10^9$, so the standard deviation is 70,711. If the count were fixed at exactly 40, it would be only 63,246.

For a Poisson count, $E[N] = \text{Var}(N) = \lambda$. The two terms then combine into the second moment of a claim.

> $$\text{Var}(S) = \lambda\,E[X^2]$$

- For the running example, $E[X^2] = 10{,}000^2 + 5{,}000^2 = 1.25 \times 10^8$, and $40 \times 1.25 \times 10^8 = 5 \times 10^9$.

> [!trap] $\text{Var}(X)$ in place of $E[X^2]$
> For a compound Poisson total, $\lambda\,\text{Var}(X) = 4 \times 10^9$ leaves out the variation in the count. Use $\lambda\,E[X^2]$.

## Some claims, not all

Suppose 10% of claims exceed 20,000. How many large claims should the insurer expect? Each claim is large with probability 0.10, independently of the others. The large claims are then a Poisson count of their own, with mean $40 \times 0.10 = 4$ ([[Poisson Thinning]]).

- The probability of no large claim in a year is $e^{-4} = 0.0183$. A year with no large claim happens less than 2% of the time.

A [[Deductible|deductible]] thins claims the same way. A loss below the deductible produces no payment. The expected payment per loss $Y^L$ includes those zeros. The expected payment per payment $Y^P$ averages only over losses above the deductible $d$.

> $$E[Y^L] = P(X > d)\,E[Y^P]$$

- If losses are Poisson with mean $\lambda$, payments are Poisson with mean $\lambda\,P(X > d)$.
- A count of losses pairs with the payment per loss. A count of payments pairs with the payment per payment. Both give the same total.

## On other exams

**Exam 5** follows each claim through its life for reserving.

- A claim is reported, given a [[Case Reserves|case reserve]], paid in one or more instalments and closed. Some close without payment and some reopen.
- Claims that have occurred but have not yet been reported are [[IBNR]].
- Counts of claims at each stage feed the [[Claim Count Triangle|claim count triangles]] used in reserving.

**The DISCs (DISC-IA)** value property damage claims.

- On a property policy the insured claims for damage to its own property. This is a first-party claim. On a liability policy a third party claims for injury or damage it says the insured caused.
- The ISO homeowners form (HO 00 03 05 11) sets out the steps of a property claim. The insured submits a signed, sworn proof of loss.
- By written notice within 30 days of receiving the proof of loss, the insurer may choose to repair or replace the damaged property with property of like kind and quality.
- Loss is payable 60 days after the proof of loss, once the parties agree, a final judgment is entered or an appraisal award is filed.
- The amount turns first on the policy's valuation basis: [[Actual Cash Value|actual cash value]], [[Replacement Cost|replacement cost]] or another of the [[Loss Settlement Provisions|loss settlement provisions]]. Any coinsurance penalty and the deductible then reduce it, and the limit caps it ([[Property Insurance Limits and Deductibles]]).

## Try it

> [!example]- Per loss or per payment {Example}
> Losses are exponential with mean 2,000, and a deductible of 500 applies. Find the probability that a loss produces a claim payment, the expected payment per loss and the expected payment per payment.
>
> > [!answer]-
> > **Plan:** find $P(X > 500)$, integrate the survival function above 500, then divide.
> > $$
> > \begin{align*}
> > P(X > 500) &= e^{-500/2000} \\
> > &= 0.7788 \\[6pt]
> > E[Y^L] &= 2000\,e^{-0.25} \\
> > &= 1557.60 \\[6pt]
> > E[Y^P] &= \frac{1557.60}{0.7788} \\
> > &= 2000
> > \end{align*}
> > $$
> > The exponential is memoryless, so the part of a loss above the deductible has the same mean as the loss. 100 losses at 1,557.60 and 77.88 payments at 2,000 give the same total.

> [!example]- Counting payments, not losses {Example}
> An insurer expects 300 losses next year, each uniform on $(0, 2000)$, under a deductible of 500. Find the expected number of payments and the expected total payment.
>
> > [!answer]-
> > **Plan:** thin the count by $P(X > 500)$, then pair the payment count with the payment per payment.
> >
> > - The probability of a payment is $1500 / 2000 = 0.75$, so the expected number of payments is $300 \times 0.75 = 225$.
> > - Given a payment, the excess is uniform on $(0, 1500)$, with mean 750.
> > - The expected total is $225 \times 750 = 168{,}750$.
> >
> > The check: the payment per loss is $0.75 \times 750 = 562.50$, and $300 \times 562.50 = 168{,}750$.

> [!example]- Aggregate claims and the large-claim count {Example}
> Claims arrive as a Poisson process at 25 a year. Claim size has mean 2,000 and standard deviation 3,000, and 20% of claims exceed 5,000. Find the mean and standard deviation of annual aggregate claims, and the probability of no claim above 5,000 in a year.
>
> > [!answer]-
> > **Plan:** use $E[S] = \lambda E[X]$ and $\text{Var}(S) = \lambda E[X^2]$, then thin the count for the large claims.
> > $$
> > \begin{align*}
> > E[S] &= 25 \times 2000 \\
> > &= 50{,}000 \\[4pt]
> > E[X^2] &= 3000^2 + 2000^2 \\
> > &= 1.3 \times 10^7 \\[4pt]
> > \text{Var}(S) &= 25 \times 1.3 \times 10^7 \\
> > &= 3.25 \times 10^8 \\[4pt]
> > \text{SD}(S) &= 18{,}028
> > \end{align*}
> > $$
> > Claims above 5,000 are Poisson with mean $25 \times 0.20 = 5$, so $P(\text{no large claim}) = e^{-5} = 0.0067$.

> [!warning]- Exam traps
> - **Mixing per loss and per payment.** Multiplying a count of losses by the mean per payment overstates the total.
> - **$\text{Var}(X)$ for $E[X^2]$.** A compound Poisson variance is $\lambda E[X^2]$.
> - **Dropping the count's variance.** For a non-Poisson count, the term $\text{Var}(N)\,E[X]^2$ is still there.
> - **Valuation before limits.** On a property damage claim, value the loss on the policy's basis first. Then reduce it for any coinsurance penalty and the deductible, and cap it at the limit.
