---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:09524865494129ee62e5fa5b97cc703d0150b4ada71229501f1569668e48c721
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "IRMI Insurance Definitions, facultative reinsurance, definition, Understanding, Key Features, Challenges (each risk submitted and agreed separately; fac cert; reinsurer not obliged to accept; high-value or unusual risks; time-consuming and resource-intensive), sha256:ef2717da70a3776f94c5fda195ef5b5acc2d5b9a4f831acc1f8493bc27f1f6bd — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance"
    - "Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf"
    - "Singapore Reinsurers' Association, Glossary of Reinsurance Terms, entries Automatic Treaty, Facultative Reinsurance (proportional and excess of loss; faculty to accept or reject), Obligatory Treaty, sha256:b953321c537f6d447ae917f92e3e6e2315942bd5ce2e76aedffb5f6bdedf45aa — https://sg-reinsurers.org.sg/glossary-reinsurance-terms"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Facultative Reinsurance.md
---

**Facultative Reinsurance** is reinsurance negotiated risk by risk: a submission, acceptance and agreement for **each individual risk (or portion of one)** the cedant wants to reinsure. The cedant offers the risk, and the reinsurer underwrites and prices it on its own and is free to accept or decline. The cover is documented in a *facultative certificate* and is either **pro rata** (a share of the policy) or **excess** (a layer above the cedant's retention).

> $$\text{Casualty XS share} = \frac{\text{ILF}\big(\min(PL,\, AP + Lim)\big) - \text{ILF}\big(\min(PL,\, AP)\big)}{\text{ILF}(PL)}$$

> $$\text{Property XS share} = G\!\left(\frac{AP + Lim}{IV}\right) - G\!\left(\frac{AP}{IV}\right)$$

- $PL$ is the policy limit, $AP$ the cedant's retention (the certificate's attachment), $Lim$ the certificate limit and $IV$ the property's insured value. [[Increased Limits|ILFs]] are ratios of [[Limited Expected Value|limited expected values]]. $G$ is a property [[Exposure Curves|exposure curve]]: the share of expected loss below a given percentage of insured value. The share multiplies the policy's expected loss to give the certificate's [[Loss Cost|loss cost]].
- **Uses.** Individual risks that the cedant's treaties do not cover, or do not cover adequately — typically high-value or unusual risks that do not fit the treaties. Facultative certificates also *inure* to the benefit of the cedant's other covers: a catastrophe cover typically applies to the retained exposure net of them.
- **Pricing** is per risk: the formulas above are Clark's exposure-rating factors applied to a single policy, which is how Clark works the property curve for one risk. Clark does not price facultative covers explicitly but treats them as "variations on the same themes" as treaty pricing, differing in accounting, loss sensitive features and the amount of judgment needed.
- **Each submission is underwritten.** The cedant must represent the risk with all relevant data, and the reinsurer assesses it and is not obliged to accept it. Negotiating every risk separately is time-consuming and resource-intensive, unlike a [[Treaty Reinsurance|treaty]], which covers a range of policies under one contract.
- Pro rata facultative works like a one-policy [[Quota Share]]. Excess facultative works like a one-policy [[Excess of Loss]] layer. See [[Types of Reinsurance]].

> [!example]- Pricing a Casualty Excess Certificate with ILFs {Example}
> A general liability policy has a $\$5$ million limit, premium $\$200{,}000$ and an expected loss and ALAE ratio of $65\%$ (ALAE pro rata with loss). The cedant keeps the first $\$1$ million and buys a facultative certificate for $\$4$M xs $\$1$M. Loss-only ILFs are $\text{ILF}(1\text{M}) = 1.60$ and $\text{ILF}(5\text{M}) = 2.10$. The reinsurer allows a $20\%$ ceding commission. Find the certificate's premium, expected loss and the reinsurer's net premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Share} &= \frac{2.10 - 1.60}{2.10} \\
> > &= 0.2381
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Fac premium} &= 0.2381 \times \$200{,}000 \\
> > &= \$47{,}619
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Expected loss} &= 0.65 \times \$47{,}619 \\
> > &= \$30{,}952
> > \end{align*}
> > $$
> >
> > The reinsurer keeps $0.80 \times \$47{,}619 = \$38{,}095$ after commission.
> >
> > The certificate carries $80\%$ of the policy limit but only $23.8\%$ of its expected loss, because most liability losses are settled well below $\$1$ million. Premium is split in the same proportion as expected loss, so the certificate runs at the policy's own $65\%$ loss ratio. That holds only if the ILFs fit this risk.

> [!example]- Property Certificate: Pro Rata or Excess? {Example}
> A $\$10$ million building has premium $\$40{,}000$ and an expected loss ratio of $50\%$. The cedant keeps $\$2$ million. Compare the reinsurer's expected loss under (a) an $80\%$ pro rata certificate and (b) an $\$8$M xs $\$2$M excess certificate. An illustrative exposure curve gives $G(0.2) = 0.49$ and $G(1.0) = 0.93$.
>
> > [!answer]-
> > Expected loss on the building: $0.50 \times \$40{,}000 = \$20{,}000$.
> >
> > **(a) Pro rata 80%:** $0.80 \times \$20{,}000 = \$16{,}000$.
> >
> > **(b) Excess** — the layer runs from $2/10 = 20\%$ to $10/10 = 100\%$ of insured value:
> >
> > $$
> > \begin{align*}
> > \text{Share} &= G(1.0) - G(0.2) \\
> > &= 0.93 - 0.49 \\
> > &= 0.44
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{Expected loss} &= 0.44 \times \$20{,}000 \\
> > &= \$8{,}800
> > \end{align*}
> > $$
> >
> > Both certificates cover the same $\$8$ million of value, but the pro rata one cedes $80\%$ of every partial loss while the excess one pays only on losses above $\$2$ million. Most property losses are partial, so the excess certificate carries a little over half the expected loss. The curve's remaining $7\%$ above $G(1.0)$ reflects exposure beyond insured value (e.g. business interruption), which neither certificate covers.
