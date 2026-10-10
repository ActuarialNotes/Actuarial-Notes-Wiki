---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e17cc04edadc658bfd9839ad54a1dab9b238798bc5d3d48f89c1bb9266fab8f1
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
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claim.md
---

**A claim** is a demand to an [[Insurer|insurer]] for indemnification under an [[Insurance Policy|insurance policy]] after an event the policy covers. The person making it, the claimant, can be the [[Policyholder|insured]], another individual the policy provides for, or a third party alleging injuries or damages that the policy covers. In loss models, the claim is what [[Frequency|frequency]] counts ($N$) and what [[Severity|severity]] measures ($X$).

> $$S = X_1 + X_2 + \cdots + X_N$$

> $$E[S] = E[N]\,E[X]$$

- $S$ is aggregate claims for a period, $N$ the claim count, and $X_i$ the claim sizes. The $X_i$ are i.i.d. and independent of $N$. This is the collective risk model of the [[Aggregate Loss Model]]. With Poisson $N$ it becomes the [[Compound Poisson Process]], where claims arrive at random and each has a random size.
- **Claim, loss, accident date.** The claim is the demand, and the *loss* is the amount of compensation paid or payable to the claimant under the policy. The date of the event that caused the loss is the accident date, also called the date of loss or occurrence date. Actuaries occasionally use *losses* and *claims* interchangeably, so check which one a source means.
- **Per loss or per payment.** Under a [[Deductible|deductible]], a loss doesn't always produce a payment. The payment per loss $Y^L$ includes zeros. The payment per payment $Y^P$ is conditional on $X > d$, and $E[Y^L] = P(X > d)\,E[Y^P]$. The number of payments is a thinned count: if losses are Poisson with rate $\lambda$, payments are Poisson with rate $\lambda\,P(X > d)$ ([[Poisson Thinning]]).
- **The claim's life.** A claim is reported, given a [[Case Reserves|case reserve]], paid in one or more instalments and closed. Some close without payment and some reopen. Claims that have occurred but not yet been reported are [[IBNR]]. Counts at each stage feed the [[Claim Count Triangle|claim count triangles]] used in reserving.
- **Property damage claims.** A claim is a demand to recover, under a policy, for a loss that may come within it. On a property policy the insured claims for damage to its own property, a first-party claim; on a liability policy a third party claims for injury or damage it says the insured caused. The ISO homeowners form (HO 00 03 05 11) sets out the property claim's steps: the insured submits a signed, sworn proof of loss; the insurer may, by written notice within 30 days of receiving it, choose to repair or replace the damaged property with property of like kind and quality; and loss is payable 60 days after the proof of loss once the parties agree, a final judgment is entered or an appraisal award is filed. The amount turns on the policy's valuation basis, [[Actual Cash Value|actual cash value]], [[Replacement Cost|replacement cost]] or another of the [[Loss Settlement Provisions|loss settlement provisions]], and then on the limit and deductible ([[Property Insurance Limits and Deductibles]]).

> [!example]- Per Loss or Per Payment {Example}
> Losses are exponential with mean $\$2{,}000$, and a $\$500$ deductible applies.
>
> Find the probability that a loss produces a claim payment, the expected payment per loss and the expected payment per payment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P(X > 500) &= e^{-500/2000} \\
> > &= 0.7788 \\[6pt]
> > E[Y^L] &= 2000\,e^{-0.25} \\
> > &= 1{,}557.60 \\[6pt]
> > E[Y^P] &= \frac{1{,}557.60}{0.7788} \\
> > &= 2{,}000
> > \end{align*}
> > $$
> >
> > The exponential is memoryless, so the part of a loss above the deductible has the same mean as the loss itself. Both views give the same total: $100$ losses $\times\ \$1{,}557.60$ equals $77.88$ payments $\times\ \$2{,}000$. The trap is mixing them, for example multiplying a count of *losses* by the mean per *payment*.

> [!example]- Aggregate Claims and the Large-Claim Count {Example}
> Claims arrive as a Poisson process at $\lambda = 40$ a year. Claim size has mean $\$5{,}000$ and standard deviation $\$10{,}000$, and $10\%$ of claims exceed $\$20{,}000$.
>
> Find the mean and standard deviation of annual aggregate claims, and the probability of no claim above $\$20{,}000$ in a year.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[S] &= 40 \times 5{,}000 \\
> > &= 200{,}000 \\[4pt]
> > E[X^2] &= 10{,}000^2 + 5{,}000^2 \\
> > &= 1.25 \times 10^{8} \\[4pt]
> > \text{Var}(S) &= 40 \times 1.25 \times 10^{8} \\
> > &= 5 \times 10^{9} \\[4pt]
> > \text{SD}(S) &= 70{,}711
> > \end{align*}
> > $$
> >
> > Claims above $\$20{,}000$ form a thinned Poisson process with rate $40 \times 0.10 = 4$:
> >
> > $$P(\text{no large claim}) = e^{-4} = 0.0183$$
> >
> > A year with no large claim happens less than $2\%$ of the time, so an analyst should expect several large claims every year. The compound variance uses $E[X^2]$ rather than $\text{Var}(X)$.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The common policy concepts section values property damage claims, for example by applying book value, actual cash value or replacement cost to a damaged item and then the deductible and limit. The claim page is the starting point; the valuation is on [[Loss Settlement Provisions]].
> - **Exam P:** Claims are the counts and sizes of the collective risk model, as in the examples above.

> [!warning]- Exam traps
> - **Per loss or per payment:** On Exam P, a loss below the deductible produces no payment. Mixing a count of losses with the mean per payment is the classic error.
> - **Valuation before limits:** On a property damage claim, the loss is first valued on the policy's basis, then reduced for any coinsurance penalty and the deductible, and capped by the limit.

