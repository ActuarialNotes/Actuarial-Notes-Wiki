---
target: Concepts/Insurance Regulator.md
created: 2026-10-10
---

## [F-001] The McCarran-Ferguson summary omits the 2021 health-insurance carve-out
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: United States bullet
- claim: Federal antitrust laws apply to insurance only to the extent state law does not regulate it (boycott, coercion and intimidation excepted).
- evidence: 15 U.S.C. s.1013(c)(1), added by Pub. L. 116-327 (Jan. 13, 2021), via LII: 'Nothing contained in this chapter shall modify, impair, or supersede the operation of any of the antitrust laws with respect to the business of health insurance (including the business of dental insurance and limited-scope dental benefits)', with safe harbours in (c)(2) for loss data, loss development factors, actuarial services and standard policy forms. The page's statement is correct for property and casualty insurance, which is what DISC-IA tests, but not for health insurance.
- source_rank: 2
- proposed_action: Add that since 2021 the exemption no longer covers health insurance (15 U.S.C. 1013(c)).
- applied: false
- fingerprint: 8091aa84d027

## [F-002] OSFI is ending its peer review expectation on 1 January 2027
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'What regulators require of the actuary' bullet, Canada
- claim: Canada: the Appointed Actuary's opinion and report, FCT, the Duty to Report, and OSFI's qualification and peer review expectations.
- evidence: OSFI Backgrounder on Guideline E-15: OSFI is 'eliminating the requirement for peer review of an appointed actuary's work', effective January 1, 2027, while preserving the Superintendent's authority to request a peer review. The sentence is true today and goes stale in under three months.
- source_rank: 1
- proposed_action: After 2027-01-01, drop the peer review expectation (or say the Superintendent may request one).
- applied: false
- fingerprint: f73cb8bb9729

## [F-003] Canadian actuary's statement on revocation is a duty, not an entitlement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: nit
- status: open
- locus: Example 'Why Regulators Watch the Actuary's Replacement', Canada answer
- claim: OSFI must be notified of the change in appointment, and the actuary is entitled to state the reasons.
- evidence: Insurance Companies Act s.363: an actuary who resigns or whose appointment is revoked 'shall submit to the directors of the company and the Superintendent a written statement of the circumstances and reasons'; s.364 bars a replacement from accepting appointment before receiving that statement; s.357 requires notice of appointment to the Superintendent.
- source_rank: 1
- proposed_action: Say the actuary must submit a written statement of the reasons to the directors and the Superintendent.
- applied: false
- fingerprint: 98dd4a6e16a9

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: U.S. and Canadian statements against statutes, NAIC instructions and models, OSFI pages; example recomputed; links resolve
- sources_checked: 15 U.S.C. s.1012 (McCarran-Ferguson Act), via LII, section text and notes, sha256:535ac29a8bf43a413de01cd9bf4496970aff48d88a47c87cfbf296696012ef32 — https://www.law.cornell.edu/uscode/text/15/1012; 15 U.S.C. s.1013 (McCarran-Ferguson Act), via LII, section text and notes, sha256:12aef39131def2a132d65c7de84d47975d9938b1a5765a660f036c6b1efa0e6c — https://www.law.cornell.edu/uscode/text/15/1013; 31 U.S.C. s.313 (Federal Insurance Office), via LII, subsection (c), sha256:9f170b74e80f0454bfd17f9b05bc4b63940b4e9bcc7ea477203b184ac5d64629 — https://www.law.cornell.edu/uscode/text/31/313; Faegre Drinker, "Election Night for Insurance Geeks" (Sept 2018, rank 3), elected vs appointed commissioners, sha256:4fe7458510362a9b5f7ae5c4c68a188c9e8add4a3a2e3c611fce6b38da6618ef — https://www.faegredrinker.com/en/insights/publications/2018/9/election-night-for-insurance-geeks-state-insurance-commissioner-seats-up-for-grabs-in-november; NAIC Risk-Based Capital (RBC) for Insurers Model Act (#312), s.1 definitions (Regulatory Action Level RBC = 1.5 x ACL; P&C trend test band), s.4, sha256:973063eff4e1d044765b1d06e88d025da452d900d587faadd85528ba4c45bf63 — https://content.naic.org/sites/default/files/model-law-312.pdf; NAIC 2025 P&C Statement of Actuarial Opinion Instructions (exposure draft), paras 1 (appointment, replacement letters), Actuarial Report (May 1), sha256:a9e51366f82d79c99aa58d7725c76147e66126313f830d162fb39dd2c691a16d — https://content.naic.org/sites/default/files/call_materials/027_Property_2025_Actuarial_Opinion_01272025_0.pdf; Insurance Companies Act (S.C. 1991, c. 47), Justice Laws full text, ss.357, 363-364, 369, sha256:9c041a9b453cb6cd89fbe883b60546990c43aa794a458cf5fde014225b17b1a2 — https://laws-lois.justice.gc.ca/eng/acts/I-11.8/FullText.html; OSFI Backgrounder: Guideline E-15 changes, whole page, sha256:6d4bab8a248063af7368e4dbf1dd4b1f79e3ea5445dd68e04b73f9ae0a95dc7d — https://www.osfi-bsif.gc.ca/en/news/backgrounder-guideline-e-15-appointed-actuary-legal-requirements-qualifications-peer-review; OSFI Minimum Capital Test Guideline (2026), chapter 1 overview, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026; OSFI Guide to Intervention, overview, sha256:e25219d08ef1ddace65847e66bf6b98dbf122cb09ef3841dadce1d0c672750ee — https://www.osfi-bsif.gc.ca/en/supervision/guide-intervention-federally-regulated-life-insurance-companies; CCIR, About, whole page, sha256:ae0d1b2e5c6521cb423a1785ca96dfb7b38931fcc97a9bd5399089a8bae1c94c — https://www.ccir-ccrra.org/AboutCCIR; S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1; NAIC testimony (Csiszar), Senate Commerce Committee, Oct 22 2003, PDF p.3 ("one overriding reason"); p.5 (UCAA), sha256:b465c2a47d11ff54d304ff2c91a26987265d74208a77e37fdb2c6c65157c1d1a — https://content.naic.org/sites/default/files/naic_archive/testimony_0310_csiszar.pdf
- note: U.S.: commissioners mostly appointed, some elected (Faegre Drinker 2018: CA, DE, GA, KS, LA, MS, MT, NC, ND, OK, WA elect); McCarran-Ferguson; FIO monitors and does not regulate (31 U.S.C. 313(c)); 140% of ACL is a Regulatory Action Level event (RAL RBC = 1.5 x ACL; commissioner requires an RBC plan, examines and may issue a corrective order); SAO replacement letters (5 business days, 10 business days, 24 months, the listed disagreement topics, former actuary's response) and Actuarial Report by May 1 match the 2025 instructions. Canada: ICA ss.357, 363-364, 369 (notice, statement on revocation, report to officers), MCT under ICA s.515 (OSFI MCT 2026), staged intervention (OSFI Guide to Intervention), CCIR as the provincial regulators' forum. FSRA/AMF roles were not separately re-read. Open: two minor and one nit. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.
