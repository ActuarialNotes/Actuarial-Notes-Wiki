---
target: Concepts/Insurtech.md
created: 2026-10-10
---

## [C-001] Pass incomplete: most specifics unsourced
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Checked: IRMI 'InsurTech' (technology players, blockchain and AI 'yet to be proven in most scenarios', focus on personal lines moving into commercial); adverse selection when a competitor refines classification (Werner & Modlin Ch.9, PDF p.163). Examples recomputed (V0 4,500,000; M1 500.65; V1 4,605,980; saving 1,800,000). Not verified: telematics/UBI, IoT, aerial imagery, embedded insurance and smart-contract parametric claims - NAIC's UBI topic page 404'd and no other source was read. Left in_review.

## [C-002] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: in_review
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: IRMI Glossary, "InsurTech", definition, sha256:ae3f4ceef56193ec758a516763ace35e031c385ee96b926ce556b5fbc4258081 — https://www.irmi.com/term/insurance-definitions/insurtech; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.9 (PDF p.163) adverse selection, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: Left in_review (see comment).

## [C-003] Still unsourced after clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- note: Baranoff (2012) predates telematics/insurtech and has no such section (s11-01 covers only Internet marketing); IRMI 'InsurTech' supports only the definition-level claims. Stays in_review.

## [F-001] Insurer's-licence point stated as general fact; the IAIS gives it in a scenario
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- severity: minor
- status: open
- locus: Business models bullet, last two sentences; trap 'The customer-facing firm isn't always the insurer'
- claim: 'A customer-facing firm that is not an insurer relies on an insurer's licence to issue policies.' Trap: 'An aggregator, digital broker or managing general agent relies on an insurer's licence to issue the policy, and the insurer stays the risk carrier.'
- evidence: IAIS 2017 p.23 of 45, scenario 1 (incumbents in control), ¶(d): 'customer-facing product distributers will rely on insurers' licenses to issue policies'; p.24, scenario 2 ¶66: 'The insurer continues to be the ultimate risk carrier'. Both are scenario-analysis statements, not findings about all aggregators, brokers and MGAs, and no source read names those three as relying on the licence.
- source_rank: 3
- proposed_action: Attribute both statements to the IAIS's scenarios, as the next sentence already does for the fragmented chain.
- applied: false
- fingerprint: f87094bd5a0b

## [F-002] Accreditation exclusion stated as absolute
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- severity: nit
- status: open
- locus: Regulatory sandboxes bullet, 'A waiver can never cover ... the laws needed for NAIC accreditation'
- claim: A waiver can never cover ... the laws needed for NAIC accreditation.
- evidence: NCOIL Sandbox Model Act §2(g)(1)(E), p.4: no waiver of 'any law, regulation, or bulletin required for the Department to maintain its accreditation by the National Association of Insurance Commissioners unless the law or regulation permits variances or waivers'.
- source_rank: 1
- proposed_action: Add the exception: 'unless that law itself permits a waiver'.
- applied: false
- fingerprint: 1a434e723963

## [F-003] 'every insurance function' overstates the NAIC's 'nearly every part'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- severity: nit
- status: open
- locus: lead, last sentence
- claim: It says insurtech now affects nearly every part of the insurance process ... and so it reaches every insurance function.
- evidence: NAIC Insurtech topic page (Background): technology-driven innovation 'influences nearly every part of the insurance process'.
- source_rank: 1
- proposed_action: Restate as 'nearly every insurance function'.
- applied: false
- fingerprint: 0cf3be0c12fb

## [C-004] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/dv14a
- date: 2026-10-11
- status_set: in_review
- checks_run: D6 rewrite checked sentence by sentence against the eight sources (PDFs fetched and hashed this run, all hashes matching the writer's; NAIC topic page via WebFetch); adoption map entries counted (25 incl. DC = 24 states + DC; CA, CO, NY, TX listed separately); examples recomputed from scratch (rate 800; 7,200,000 vs 7,400,000; 822.22; 6,920,000/8,200=843.90; parametric 25,000/25,000/0 vs 40,000/0/15,000); links resolved and checked for country framing
- sources_checked: NAIC, Insurance Topics: Insurtech (Last Updated 2/18/2026), Background and Actions, read via WebFetch 2026-10-11 (curl refused; no hash) — https://content.naic.org/insurance-topics/insurtech; NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (adopted Dec 4, 2023), pp.1-2 (Background, Legislative Authority #1780), §3 and Guidelines 1.1-1.4, 4.0-4.2, §4, sha256:d260c950d67fa0cc60cfcabf7df9f8de1dcff0ba84b32b6a711bd5c0b76d28f8 — https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf; NAIC, Implementation of NAIC Model Bulletin: Use of AI Systems by Insurers (status as of April 1, 2026), p.2 reference list, sha256:19b539af567047d5b7d1500ce98032606b90b6344d6fac1029fc79270e73b07d — https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-map-ai-model-bulletin.pdf; IAIS, FinTech Developments in the Insurance Industry (21 Feb 2017), pp.4, 7-9, 11-12, 15-17, 23-24, 31 of 45 (¶¶2, 6, 14, 17(b), 21, 29-30, 37, 40-41, 5.3(d), 66, 112-113, 115(e)), sha256:77093852bc029745a2482c969ecf7f18c2b563e40f3a70fcfa88d75daa44f72c — https://iaisweb.org/file/65625/report-on-fintech-developments-in-the-insurance-industry; IAIS, Application Paper on the supervision of artificial intelligence (July 2025), Executive Summary ¶¶2-4, Box 1 pp.8-9, Table 1 p.11, sha256:db32138a559492d4a9f6e41587876fd1e87e6e315cc2d2c2dec8f1396b7bd9f0 — https://www.iais.org/uploads/2025/07/Application-Paper-on-the-supervision-of-artificial-intelligence.pdf; U.S. Treasury, Federal Insurance Office, Annual Report on the Insurance Industry (September 2025), p.6 (AI surveys, model bulletin) and p.72 (Parametric Insurance), sha256:a1ba63f18d5a6c3f0bf499d5f055b3d76ed54ee5d608e5480222569e1b248e47 — https://home.treasury.gov/system/files/311/Final%20FIO%202025%20Annual%20Report.pdf; NCOIL, Insurance Regulatory Sandbox Model Act (adopted Nov 19, 2022), §2(a), (c), (d), (e), (g), sha256:230115f18554e7ac1552a7edc895c8a9619f86bfbaa96983ec0d4634f228a5b8 — https://ncoil.org/wp-content/uploads/2025/12/NCOIL-Sandbox-Model-Adopted-Nov.-2022.pdf; Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.9 'Importance of Equitable Rates' and 'Adverse Selection', p.151 (PDF p.163), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf
- note: One minor and two nits open for the clean-up run.
