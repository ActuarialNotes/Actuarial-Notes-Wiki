---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0d095e60da80bcdb2f706a2db68b90880bc1eeb317f39707242edc98fbe5d1b7
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §9, PDF pp.13-14, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 pp.289, 297-298, 323 (PDF pp.301, 309-310, 335); Ch.5 p.73 (PDF p.85); Ch.2 p.16 (PDF p.28), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Schedule Rating.md
---

![[Media/Figures/Schedule_Rating.svg|340]]

**Schedule Rating** applies underwriter-assigned debits and credits to the manual premium for characteristics of the individual risk that the classification system does not capture, such as the physical condition of premises, management quality, safety programs, employee selection and training, and loss-control practices. With schedule debits and credits $s_k$, the premium is

> $$\text{Schedule-Rated Premium} = \text{Manual Premium} \times \left(1 + \sum_k s_k\right)$$

- $s_k$ is positive for a debit and negative for a credit.

Where [[Experience Rating|experience rating]] looks at what happened, schedule rating looks at characteristics expected to have a material effect on future losses that are not reflected in the manual rate. If experience rating applies, they are the characteristics not adequately reflected in the past experience. Schedule rating alters the manual rate, or the manual rate as modified by experience rating, as the filed [[Rating Algorithm|rating algorithm]] sets out.

> [!example]- A commercial general liability risk has a manual premium of $\$20{,}000$ and an experience modification of 0.90. The underwriter gives a 10% credit for an excellent safety program and a 5% debit for the age and condition of the building. What is its standard premium? {Example}
> - The net schedule modification is $-0.10 + 0.05 = -0.05$.
> - The schedule-rated premium is $20{,}000 \times 0.95 = \$19{,}000$.
> - The standard premium is $19{,}000 \times 0.90 = \$17{,}100$, which is 14.5% below manual.

## Schedule rating alongside experience rating

When both apply, the underwriter must avoid double-counting, because a new program will eventually show up in the loss experience too. If a risk has made a recent change that will likely impact its loss experience, then it is appropriate to use a schedule credit or debit, because the change is not yet reflected in the experience period. A newly implemented loss control program is Werner and Modlin's example.

A risk that has always had the characteristic, such as a full-time safety manager throughout the experience period, gets no schedule credit for it. Its effect is already reflected in the loss experience, and crediting it again would count it twice, once by the schedule credit and once by the experience mod. If that risk is too small to have fully credible experience, some schedule credit may still be appropriate, but less than for a risk whose change is new, since the experience mod already credits part of the effect.

> [!example]- Two experience-rated risks each have a full-time safety manager. Risk A hired one last month, and Risk B has had one throughout the experience period. Which should get a schedule credit for it? {Example}
> - Risk A's safety manager has not yet affected its loss experience, so a schedule credit is appropriate.
> - Risk B's safety manager is already reflected in its losses and so in its experience mod.
> - **Risk B gets no credit for it**, or only a small one if its experience is not fully credible.

## Filed schedules

The filed schedule lists eligible categories with maximum credits and debits, and credits and debits are typically subject to an overall maximum modification, 25% in Werner and Modlin's illustrative workers compensation plan. State laws and regulations generally require the filed guidelines to be applied consistently, and documentation is often required to support each credit and debit.

Characteristics can be objective, such as the years a physician has been licensed, or subjective, such as the quality of management. Objective ones are easier to quantify and validate, but schedule rating often requires significant underwriting judgment.

## Schedule rating and rate level

Because credits are judgmental, they are also a source of **rate level leakage**. The filed manual rate can be adequate while the *achieved* rate is not. Subjective debits and credits complicate putting premium on-level, and the actuary may measure how credit and debit practices have changed by reviewing their distributions over recent years.

> [!example]- An insurer files an 8% manual rate increase. Over the same period, the average schedule credit on its book moves from 6% to 13%. What is the achieved rate change? {Example}
> - The schedule factor moves from $1 - 0.06 = 0.94$ to $1 - 0.13 = 0.87$.
> - The achieved factor is $1.08 \times 0.87/0.94 = 0.9996$.
> - **The achieved rate change is essentially zero**, although the filing suggests an 8% increase.
> - On-level factors that reflect the filed 8% would over-adjust the historical premium, so the next indication would understate the rate need.

> [!trap] Crediting a characteristic the experience already reflects
> A schedule credit for a long-standing characteristic double-counts it. Its effect is in the losses of the experience period, and so in the experience mod, already.
