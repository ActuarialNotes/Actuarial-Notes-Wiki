---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:a2083102c3c8db247730bdb283fccc4b269b7dee55a629607478dc4949d3c873
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.1 claim, claimant (insured or third party), accident date/occurrence date PDF p.14; IBNR, reported, open, closed, re-opened, loss = compensation paid or payable, losses and claims used interchangeably, case reserve PDF p.15, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS), diagonals = valuation dates PDF p.59; claim counts closed without payment PDF p.58; reported claim count triangle PDF pp.66-67, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "IRMI Insurance Glossary, 'claim' (fetched 2026-11-06), sha256:07e7c9d640f175c7a9e736d0a2ad88be731fa58ab45e32df7b3c2395ff62f028 — https://www.irmi.com/term/insurance-definitions/claim"
    - "IRMI Insurance Glossary, 'first-party insurance' (fetched 2026-11-06), sha256:a41e00034f37b805e5d9f13fee16018103f77cf28f02599630afc7bf903a20cc — https://www.irmi.com/term/insurance-definitions/first-party-insurance"
    - "IRMI Insurance Glossary, 'liability insurance' (fetched 2026-11-06), sha256:c4e2f9d568f2f438ac3a03574c356593d8808d6a0971743f3d4abe799c8edbd7 — https://www.irmi.com/term/insurance-definitions/liability-insurance"
    - "ISO HO 00 03 05 11 Homeowners 3 Special Form (Maine Bureau of Insurance copy), Section I Conditions C.8 signed sworn proof of loss (p.14), I Our Option 30 days, J Loss Payment 60 days / agreement, final judgment, appraisal award (p.16), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf"
    - "ISO CP 00 10 10 12 Building and Personal Property Coverage Form, F.1 Coinsurance steps (1)-(4): coinsurance on the loss before deductible, then subtract deductible, pay the lesser of that and the Limit (p.13), sha256:b46b0929e7effc6cfcfde0493f5a363dc32053b3afd56632776432f596a1e106 — https://www.propertyinsurancecoveragelaw.com/wp-content/uploads/2017/05/CP00101012-1.pdf"
    - "CAS DISC-IA course outline, property damage claim valuation topics: replacement cost/ACV, coinsurance, property limits and deductibles, book value applied to a property damage claim (p.2), sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch.5 Aggregate Loss Models, §5.1 collective risk model (frequency and severity; N counts losses or payments); §5.3 X_i iid independent of N, E(S_N) = lambda E(X) for compound Poisson, sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "Siegrist, Random: Conditional Expected Value, §3.7 Random Sums: E(Y_N|N) = N mu, var(Y_N|N) = N sigma^2, var(Y_N) = E(N) sigma^2 + var(N) mu^2, sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "Siegrist, Random: Compound Poisson Processes, §13.6 compound Poisson: var = (mu^2 + sigma^2) rt, sha256:6c5a27a1dc417fbb651a6271f8bb72c6e6f9790ae3c59c781f8f51c29961afd6 — https://www.randomservices.org/random/poisson/Compound.html"
    - "Pishro-Nik, Introduction to Probability, §11.1.3 splitting (thinning) of a Poisson process, sha256:419b160f4aada1dd2b4d46ab366a6f3284ec976d4224a012ca03d01fd87c5fdd — https://www.probabilitycourse.com/chapter11/11_1_3_merging_and_splitting_poisson_processes.php"
    - "Frees et al., Loss Data Analytics (open text), Ch.3 Modeling Loss Severity, §3.4.1 E(Y^P) = E(Y^L)/(1 - F(d)); exponential memoryless Y^P, sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05), §VI losses vs claim payments PDF p.7, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
    - "SOA, Tables for Exam C (Fall 2009), A.3.3.1 exponential E[X^x] = theta(1 - e^(-x/theta)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim.md
---

A **Claim** is a demand to an [[Insurer|insurer]] for payment under an [[Insurance Policy|insurance policy]] after an event the policy covers. The claimant can be the [[Policyholder|insured]], another person the policy provides for, or a third party alleging injuries or damages that the policy covers.

A claim comes with its own terms:

- The **loss** is the amount paid or payable to the claimant under the policy.
- The **accident date**, also called the date of loss, is when the covered event happened.
- The **report date** is when the insurer learned of the claim.

> [!example]- A homeowner's kitchen burns on 3 March, the homeowner calls the insurer on 10 March, and repairs cost 18,000. What are the claim, the loss and the accident date? {Example}
> - The homeowner's demand that the insurer pay for the repairs is the claim.
> - The 18,000 the policy pays for is the loss, before any deductible.
> - The accident date is 3 March, the day of the fire. The report date is 10 March.

## Aggregate claims

The total of a period's claims, the aggregate claims, is

> $$S = X_1 + X_2 + \cdots + X_N$$

- $N$ is the number of claims, its [[Frequency|frequency]].
- $X_i$ is the size of the $i$th claim, its [[Severity|severity]].

The claim sizes are independent and identically distributed, and independent of $N$. This is the collective risk model of the [[Aggregate Loss Model|aggregate loss model]]. Given the number of claims, the expected aggregate claims are $E[S \mid N] = N\,E[X]$. The expected aggregate claims is

> $$E[S] = E[N]\,E[X]$$

> [!example]- Claims arrive as a Poisson count with mean 40 a year, and each claim has mean 5,000. What are the expected aggregate claims for the year? {Example}
> - $E[N] = 40$ and $E[X] = 5{,}000$.
> - The expected aggregate claims are $40 \times 5{,}000 = 200{,}000$.

## Variance of aggregate claims

The total varies because the claim sizes vary and because the count varies. The variance of the aggregate claims is

> $$\text{Var}(S) = E[N]\,\text{Var}(X) + \text{Var}(N)\,E[X]^2$$

When $N$ is [[Poisson Distribution|Poisson]] with mean $\lambda$, $E[N] = \text{Var}(N) = \lambda$, and the two terms combine into the second moment of a claim:

> $$\text{Var}(S) = \lambda\,E[X^2]$$

> [!example]- Claims arrive as a Poisson count with mean 40 a year. Each claim has mean 5,000 and standard deviation 10,000. What is the standard deviation of the aggregate claims? {Example}
> - The second moment of a claim is $10{,}000^2 + 5{,}000^2$, which is $1.25 \times 10^8$.
> - The variance and standard deviation of the total are
>
> $$
> \begin{aligned}
> \text{Var}(S) &= 40 \times 1.25 \times 10^8 \\
> &= 5 \times 10^9 \\
> \text{SD}(S) &\approx 70{,}711
> \end{aligned}
> $$

## Claims after a deductible

A [[Deductible|deductible]] $d$ turns some losses into no payment at all. The payment per loss $Y^L$ includes those zeros. The payment per payment $Y^P$ averages only over losses above $d$. Their means are related by

> $$E[Y^L] = P(X > d)\,E[Y^P]$$

If losses are Poisson with mean $\lambda$, the number of payments is Poisson with mean $\lambda\,P(X > d)$ ([[Poisson Thinning]]).

> [!example]- Losses are Poisson with mean 100 a year, each exponential with mean 2,000, and the policy has a deductible of 500. What are the expected number of payments and the expected total paid? {Example}
> - A loss exceeds the deductible with probability $e^{-0.25} = 0.7788$, so there are 77.88 payments on average.
> - The exponential is memoryless, so the part of a loss above the deductible has the same mean as the loss itself. Each payment averages $E[Y^P] = 2{,}000$.
> - The expected payment per loss is $0.7788 \times 2{,}000 = 1{,}557.60$.
> - Both views give the same total: 100 losses times 1,557.60, or 77.88 payments times 2,000, is 155,760.

> [!trap] Mixing per loss and per payment
> A count of losses pairs with the payment per loss, and a count of payments with the payment per payment. Multiplying 100 losses by 2,000 per payment gives 200,000, which overstates the total.

## Claims on other exams

**Exam 5** follows each claim through its life for reserving. A claim is reported, given a [[Case Reserves|case reserve]], paid and closed, and some reopen. Claims that have occurred but not yet been reported are [[IBNR]].

**DISC-IA** follows the steps of a property claim under the ISO homeowners form:

1. The insured submits a signed, sworn proof of loss.
2. Once it has the proof of loss, the insurer may, by written notice within 30 days of receiving it, choose to repair or replace the damaged property with property of like kind and quality.
3. The loss is payable 60 days after the proof of loss once the parties agree, a final judgment is entered or an appraisal award is filed.

The amount paid turns first on the policy's valuation basis, [[Actual Cash Value|actual cash value]] or [[Replacement Cost|replacement cost]]. Any coinsurance penalty and the deductible then reduce it, and the limit caps it.
