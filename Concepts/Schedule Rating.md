---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a1a5d46174a534a6446c93e33c4cff6b6149214f17a9b990df0d2f0f0d9060b
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.289, 297-298, 323 (PDF pp.301, 309-310, 335); Ch.5 p.73 (PDF p.85); Ch.2 p.16 (PDF p.28), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Schedule Rating.md
---

**Schedule Rating** applies underwriter-assigned debits and credits to the manual premium for characteristics of the individual risk that the classification system does not capture — the physical condition of premises, management quality, safety programmes, employee selection and training, loss-control practices.

> $$\text{Schedule-Rated Premium} = \text{Manual Premium} \times \left(1 + \sum_k s_k\right)$$

- Where [[Experience Rating|experience rating]] looks at what happened, schedule rating looks at characteristics expected to have a material effect on future losses that are not reflected in the manual rate — or, if experience rating applies, not adequately reflected in the past experience. A newly implemented loss control programme is Werner's example. When both apply, the underwriter must avoid double-counting: the new programme will eventually show up in the loss experience too.
- The filed schedule lists eligible categories with maximum credits and debits, and credits and debits are typically subject to an overall maximum modification — $25\%$ in Werner's illustrative workers compensation plan. State laws and regulations generally require the filed guidelines to be applied consistently, and documentation is often required to support each credit and debit.
- Order of application: schedule rating alters the manual rate, or — where experience rating applies — the manual rate as modified by experience rating, as the filed [[Rating Algorithm|rating algorithm]] sets out.
- The weakness is **judgment**. Characteristics can be objective (years a physician has been licensed) or subjective (quality of management); objective ones are easier to quantify and validate, but schedule rating often requires significant underwriting judgment — which is why consistent application and documentation are required.
- Because credits are judgmental, they are also a source of **rate level leakage**: the filed manual rate can be adequate while the *achieved* rate is not. Subjective debits and credits complicate putting premium on-level, and the actuary may measure how credit and debit practices have changed by reviewing their distributions over recent years.

![[Media/Figures/Schedule_Rating.svg|340]]

> [!example]- Applying a Schedule Modification {Example}
> A commercial general liability risk has a manual premium of $\$20{,}000$. The underwriter assigns a $-10\%$ credit for an excellent safety programme and a $+5\%$ debit for the age and condition of the building. The risk also carries an experience modification of $0.90$.
>
> Compute the standard premium.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Net schedule modification} &= -10\% + 5\% = -5\% \\[4pt]
> > \text{Schedule-rated} &= \$20{,}000 \times 0.95 = \$19{,}000 \\[4pt]
> > \text{Standard premium} &= \$19{,}000 \times 0.90 = \$17{,}100
> > \end{align*}$$
> >
> > The two modifications together deliver a $14.5\%$ reduction from manual. Note that the discount rests on two different kinds of evidence: the $0.90$ is what this risk's losses actually were, while the $-5\%$ is what an underwriter expects them to be — and only the first is auditable after the fact.

> [!example]- Schedule Credits Eroding Rate Adequacy {Example}
> An insurer files a $+8\%$ manual rate increase. Over the same period the average schedule credit on its book moves from $-6\%$ to $-13\%$.
>
> What is the achieved rate change, and what should the actuary do?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Achieved factor} &= 1.08 \times \frac{1 - 0.13}{1 - 0.06} \\
> > &= 1.08 \times \frac{0.87}{0.94} \\
> > &= 1.08 \times 0.9255 \\
> > &= 0.9995
> > \end{align*}$$
> >
> > The achieved rate change is essentially **zero**. The filed increase was given back entirely through underwriting discretion, and the book's rate adequacy is unchanged while the filing suggests it improved by $8\%$.
> >
> > Three consequences follow:
> >
> > 1. The **on-level factors** used in the next indication are wrong. They reflect the filed $+8\%$, not the achieved $0\%$, so historical premium is being over-adjusted and the next indication will understate the rate need. Schedule credits must be tracked and reflected in the rate level history.
> > 2. The next indication will therefore ask for less than the book needs — an error that compounds each cycle it goes unnoticed.
> > 3. The pattern itself is the finding worth escalating: a seven-point swing in average credit across a book is a pricing decision being made outside the pricing process.
