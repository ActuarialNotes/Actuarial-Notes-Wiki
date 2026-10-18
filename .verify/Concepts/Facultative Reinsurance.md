---
target: Concepts/Facultative Reinsurance.md
created: 2026-10-18
---

## [F-001] Facultative definition, uses and selection not in the Exam 9 reading
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- severity: minor
- status: open
- locus: lead paragraph and bullets 'Uses' and 'Selection runs against the reinsurer'
- claim: Facultative Reinsurance is reinsurance negotiated risk by risk ... documented in a facultative certificate and is either pro rata or excess ... Uses: a risk too large for treaty capacity ... Selection runs against the reinsurer ... It also costs more to administer per premium dollar than a treaty.
- evidence: Clark (sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63) p.2 excludes facultative pricing ('will not be addressed explicitly, but may be viewed as variations on the same themes'), and mentions facultative certificates only as inuring to a catastrophe cover (p.43). The definition, the pro rata/excess forms, the uses, anti-selection and administrative cost are in no Exam 9 reading. The page is also linked from Exam CP-341 (SOA), whose reading (Tiller & Tiller, ch. 3 Facultative Reinsurance) is a purchased book not reachable this session.
- source_rank: 2
- proposed_action: Check the definition and uses against a reading that covers facultative reinsurance (Tiller ch. 3 for CP-341, or a P&C reinsurance primer) and cite it.
- applied: false
- fingerprint: e07b4f601f85

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T15:01Z/0103
- date: 2026-10-18
- status_set: in_review
- checks_run: both XS-share formulas against Clark's exposure factor (p.29) and exposure-curve layer (p.17); Clark's illustrative curve values; 'variation on treaty techniques' attribution p.2; both examples recomputed (share 0.2381, $47,619, $30,952, $38,095; $16,000 vs $8,800)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as a variation on treaty themes), pp.17-18 (exposure curve and illustrative table: 20% -> 49%, 100% -> 93%, exposure above IV), p.29 (casualty exposure factor), p.43 (facultative certificates inure to cat cover), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: The pricing formulas, the Clark attribution and the examples check out. Left in_review because the page's definitional content appears in no Exam 9 reading (F-001), and the CP-341 side (Tiller & Tiller, life reinsurance) could not be reached this session.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Resolved under D22 with open sources that define facultative reinsurance: IRMI ('each exposure the ceding company wishes to reinsure is offered to the reinsurer ... submission, acceptance, and resulting agreement is required on each individual risk or portion of an individual risk ... the reinsurer is not obliged to accept every or any submission'; fac cert; high-value or unusual risks; negotiation 'time-consuming and resource-intensive'), Odomirok et al. glossary p.412 ('negotiated separately for each insurance policy ... purchased for individual risks that are not covered, or not adequately covered, by the insurer's treaty reinsurance'), the Singapore Reinsurers' Association glossary (proportional and excess of loss facultative; the 'faculty' to accept or reject). Page edited in place: 'or a defined group of risks' → 'or portion of one'; Uses restated to Odomirok/IRMI plus Clark p.43's inuring; the second-opinion use, 'protecting treaty results' and the adverse-selection and cost-per-premium-dollar claims cut (see F-002); Pricing restated to Clark p.2/p.18. Outline p.3 task A2 names facultative among the contracts whose loss cost is examined. IRMI Insurance Definitions, facultative reinsurance, definition, Understanding, Key Features, Challenges (each risk submitted and agreed separately; fac cert; reinsurer not obliged to accept; high-value or unusual risks; time-consuming and resource-intensive), sha256:ef2717da70a3776f94c5fda195ef5b5acc2d5b9a4f831acc1f8493bc27f1f6bd — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance; Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf; Singapore Reinsurers' Association, Glossary of Reinsurance Terms, entries Automatic Treaty, Facultative Reinsurance (proportional and excess of loss; faculty to accept or reject), Obligatory Treaty, sha256:b953321c537f6d447ae917f92e3e6e2315942bd5ce2e76aedffb5f6bdedf45aa — https://sg-reinsurers.org.sg/glossary-reinsurance-terms

## [F-002] Adverse selection and per-premium-dollar cost claims unsourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: minor
- status: open
- locus: bullets 'Uses' and 'Selection runs against the reinsurer'
- claim: an unusual risk the cedant wants a second opinion on ... The cedant chooses which risks to offer, so a facultative account tends to be worse than the cedant's average ... It also costs more to administer per premium dollar than a treaty.
- evidence: IRMI says the cedant must represent the risk with all relevant data, the reinsurer evaluates it and is not obliged to accept, and the per-risk negotiation is 'time-consuming and resource-intensive'; none of IRMI, Odomirok, the SRA glossary or Clark states that a facultative account is worse than average, that cedants seek a second opinion, or a per-premium-dollar cost comparison. IRMI Insurance Definitions, facultative reinsurance, definition, Understanding, Key Features, Challenges (each risk submitted and agreed separately; fac cert; reinsurer not obliged to accept; high-value or unusual risks; time-consuming and resource-intensive), sha256:ef2717da70a3776f94c5fda195ef5b5acc2d5b9a4f831acc1f8493bc27f1f6bd — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance; Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf
- source_rank: 3
- proposed_action: Cut the three claims; restate the bullet as 'Each submission is underwritten' in IRMI's terms.
- applied: true
- fingerprint: 4507f6896fe3

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-002
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Cut the three claims; restate the bullet as 'Each submission is underwritten' in IRMI's terms.

## [F-003] Casualty exposure factor dropped Clark's min() at the attachment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- severity: nit
- status: open
- locus: formula 'Casualty XS share'
- claim: ILF(min(PL, AP+Lim)) − ILF(AP), over ILF(PL)
- evidence: Clark p.29 (rendered): Exposure Factor = {E[x; min(PL, AP+Lim)] − E[x; min(PL, AP)]} / E[x; PL]. The page's ILF(AP) equals Clark's term only when AP ≤ PL. Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf
- source_rank: 2
- proposed_action: Transcribe Clark: ILF(min(PL, AP)).
- applied: true
- fingerprint: 36982d668bd7

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- resolves: F-003
- status: resolved
- note: Corrected in place this run as proposed; the page now says only what the cited sources state: Transcribe Clark: ILF(min(PL, AP)).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T18:41Z/034f
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: definition, certificate and pro rata/excess forms against IRMI, Odomirok glossary p.412 and the SRA glossary; uses against Odomirok and IRMI, inuring against Clark p.43; both formulas against Clark p.18 and p.29 (rendered) — ILF(AP) corrected to ILF(min(PL,AP)); Clark p.2 attribution quoted; outline p.3 task A2 scope; both examples recomputed blind (0.5/2.1=0.2381, $47,619, $30,952, $38,095; $20,000, $16,000, 0.93−0.49=0.44, $8,800; the 7% above G(1.0) against Clark p.18's business-interruption note)
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), p.2 (facultative as variations on the same themes), p.3 (proportional treaty), p.4 (losses occurring / risks attaching), p.9 (follow the fortunes, adjustable features), p.14 (per risk excess; GNEPI/GNWPI net of inuring reinsurance), pp.14-21 (experience and exposure rating), p.18 (single-risk exposure factor 93%-49% = 44%; exposure above IV), p.29 (casualty exposure factor E[x;min(PL,AP+Lim)] - E[x;min(PL,AP)] over E[x;PL]), pp.36-43 (aggregate covers), p.43 (facultative certificates inure to cat cover), pp.45-46 (risks attaching cat cover, interlocking clause), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf; IRMI Insurance Definitions, facultative reinsurance, definition, Understanding, Key Features, Challenges (each risk submitted and agreed separately; fac cert; reinsurer not obliged to accept; high-value or unusual risks; time-consuming and resource-intensive), sha256:ef2717da70a3776f94c5fda195ef5b5acc2d5b9a4f831acc1f8493bc27f1f6bd — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance; Odomirok, Kennedy & Pantaleo, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), printed pp.63-66 (reinsurance note: unsecured recoverables incl. paid losses billed not collected, ceded reserves and ceded UPR; LOC, trust, funds withheld; disputes; commutation; concentration), pp.111-112 and 119-127 (Schedule F: provision for reinsurance as a liability, change to surplus; authorized/unauthorized; overdue; RBC credit charge), p.244 (RBC R1 fixed income incl. interest rates and default; R3 receivables and reinsurance recoverables), p.376 (treaty and facultative reinsurance; unregistered reinsurance collateral), p.412 glossary (facultative reinsurance), sha256:74917dcb2ca8b1cf210a7fd66b08d4c90d844a13dd14b2c71690a18e51eb4a5c — https://www.casact.org/sites/default/files/2021-03/6U_CAS_Financial_Reporting.pdf; Singapore Reinsurers' Association, Glossary of Reinsurance Terms, entries Automatic Treaty, Facultative Reinsurance (proportional and excess of loss; faculty to accept or reject), Obligatory Treaty, sha256:b953321c537f6d447ae917f92e3e6e2315942bd5ce2e76aedffb5f6bdedf45aa — https://sg-reinsurers.org.sg/glossary-reinsurance-terms; CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.3 Domain A task 2 (loss cost of treaty, facultative and other contracts; reading Clark), p.5 Domain C task C5 'Estimate and manage interest rate and credit risk (e.g., default, prepayment, reinsurance)' and C6-C7; pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf
- note: Verified at medium (D22): the definitional content rests on rank-3 open references (IRMI, SRA glossary) and the CAS's financial reporting text, the pricing on Clark (rank 2). F-001 resolved; adverse selection, second-opinion use and per-premium-dollar cost cut (F-002); min() restored in the casualty formula (F-003). CP-341's Tiller & Tiller (life reinsurance) not read; the page's definitions match the general usage IRMI gives.
