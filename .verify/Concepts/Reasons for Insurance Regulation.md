---
target: Concepts/Reasons for Insurance Regulation.md
created: 2026-10-10
---

## [F-001] The McCarran-Ferguson summary omits the 2021 health-insurance carve-out
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'The rule above' bullet and 'McCarran-Ferguson is not a full antitrust exemption' trap
- claim: Federal antitrust laws apply to insurance only to the extent state law does not regulate it (boycott, coercion and intimidation excepted).
- evidence: 15 U.S.C. s.1013(c)(1), added by Pub. L. 116-327 (Jan. 13, 2021), via LII: 'Nothing contained in this chapter shall modify, impair, or supersede the operation of any of the antitrust laws with respect to the business of health insurance (including the business of dental insurance and limited-scope dental benefits)', with safe harbours in (c)(2) for loss data, loss development factors, actuarial services and standard policy forms. The page's statement is correct for property and casualty insurance, which is what DISC-IA tests, but not for health insurance.
- source_rank: 2
- proposed_action: Add that since 2021 the exemption no longer covers health insurance (15 U.S.C. 1013(c)).
- applied: false
- fingerprint: 1023f12cefe5

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every statement against the statute, NAIC testimony, Harrington testimony and LII; links resolve; U.S. framing
- sources_checked: 15 U.S.C. s.1011 (McCarran-Ferguson Act), via LII, section text and notes, sha256:4a241b15f73f03c4968717b2c27837c5a518e5a1b9a8101e583645654d615b23 — https://www.law.cornell.edu/uscode/text/15/1011; 15 U.S.C. s.1012 (McCarran-Ferguson Act), via LII, section text and notes, sha256:535ac29a8bf43a413de01cd9bf4496970aff48d88a47c87cfbf296696012ef32 — https://www.law.cornell.edu/uscode/text/15/1012; 15 U.S.C. s.1013 (McCarran-Ferguson Act), via LII, section text and notes, sha256:12aef39131def2a132d65c7de84d47975d9938b1a5765a660f036c6b1efa0e6c — https://www.law.cornell.edu/uscode/text/15/1013; NAIC testimony (Csiszar), Senate Commerce Committee, Oct 22 2003, PDF p.3 ("one overriding reason"); p.5 (UCAA), sha256:b465c2a47d11ff54d304ff2c91a26987265d74208a77e37fdb2c6c65157c1d1a — https://content.naic.org/sites/default/files/naic_archive/testimony_0310_csiszar.pdf; S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1; NAIC Life Insurance Buyer's Guide (2026), p.2 (NAIC governance), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf; NAIC P&C Commercial Rate and Policy Form Model Law (Condensed) (#777, 2002), s.3A, 3B(4)-(5) and drafting note, 3C(1), 3I, 3J, s.4, sha256:811c7c1579aaf33f16ab03f1ac27d474e93744e1aed89e452ee847938a385f84 — https://content.naic.org/sites/default/files/model-law-777.pdf; Cornell LII Wex, "contra proferentem", whole entry, sha256:e17e688d536be7c5603d1061dd780ba795f218487fddb7b78bff817bb6f654f1 — https://www.law.cornell.edu/wex/contra_proferentem; Cornell LII Wex, "adhesion contract", whole entry, sha256:6cb7999ec8c8f828d339722af1b7e4a3944886565464c14ef86ac9571e590b6f — https://www.law.cornell.edu/wex/adhesion_contract_(contract_of_adhesion); NAIC Unfair Trade Practices Act (#880, Spring 2024), ss.1, 4A, 4B, 4D-4F, 4H, 4I, 4K-4M, 6, 8A, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf
- note: McCarran-Ferguson (1011, 1012(a)-(b), 1013(b)), the NAIC's 'one overriding reason' and solvency-first account (Csiszar), Harrington's market-failure rationale, domiciliary lead and NAIC financial-reporting/certification program, limited ex post guaranty assessments and moral hazard, NAIC governance (50 states, DC, five territories), contract of adhesion and contra proferentem all agree. Harrington's uninsured-motorist point is made about rating restrictions encouraging compliance with compulsory insurance; the page's compulsory-insurance sentence is a fair paraphrase. Open: one minor finding (2021 health carve-out). The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Added the 2021 carve-out: 'Since a 2021 amendment (15 U.S.C. 1013(c)) the exemption no longer covers the business of health insurance, including dental insurance', and the same in the trap.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: 15 U.S.C. s.1011 (McCarran-Ferguson Act), via LII, section text and notes, sha256:4a241b15f73f03c4968717b2c27837c5a518e5a1b9a8101e583645654d615b23 — https://www.law.cornell.edu/uscode/text/15/1011; 15 U.S.C. s.1012 (McCarran-Ferguson Act), via LII, section text and notes, sha256:535ac29a8bf43a413de01cd9bf4496970aff48d88a47c87cfbf296696012ef32 — https://www.law.cornell.edu/uscode/text/15/1012; 15 U.S.C. s.1013 (McCarran-Ferguson Act), via LII, section text and notes, sha256:12aef39131def2a132d65c7de84d47975d9938b1a5765a660f036c6b1efa0e6c — https://www.law.cornell.edu/uscode/text/15/1013; NAIC testimony (Csiszar), Senate Commerce Committee, Oct 22 2003, PDF p.3 ("one overriding reason"); p.5 (UCAA), sha256:b465c2a47d11ff54d304ff2c91a26987265d74208a77e37fdb2c6c65157c1d1a — https://content.naic.org/sites/default/files/naic_archive/testimony_0310_csiszar.pdf; S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1; NAIC Life Insurance Buyer's Guide (2026), p.2 (NAIC governance), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf; NAIC P&C Commercial Rate and Policy Form Model Law (Condensed) (#777, 2002), s.3A, 3B(4)-(5) and drafting note, 3C(1), 3I, 3J, s.4, sha256:811c7c1579aaf33f16ab03f1ac27d474e93744e1aed89e452ee847938a385f84 — https://content.naic.org/sites/default/files/model-law-777.pdf; Cornell LII Wex, "contra proferentem", whole entry, sha256:e17e688d536be7c5603d1061dd780ba795f218487fddb7b78bff817bb6f654f1 — https://www.law.cornell.edu/wex/contra_proferentem; Cornell LII Wex, "adhesion contract", whole entry, sha256:6cb7999ec8c8f828d339722af1b7e4a3944886565464c14ef86ac9571e590b6f — https://www.law.cornell.edu/wex/adhesion_contract_(contract_of_adhesion); NAIC Unfair Trade Practices Act (#880, Spring 2024), ss.1, 4A, 4B, 4D-4F, 4H, 4I, 4K-4M, 6, 8A, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf
- note: Re-verified after the clean-up edits (all open findings resolved in this run). McCarran-Ferguson (1011, 1012(a)-(b), 1013(b)), the NAIC's 'one overriding reason' and solvency-first account (Csiszar), Harrington's market-failure rationale, domiciliary lead and NAIC financial-reporting/certification program, limited ex post guaranty assessments and moral hazard, NAIC governance (50 states, DC, five territories), contract of adhesion and contra proferentem all agree. Harrington's uninsured-motorist point is made about rating restrictions encouraging compliance with compulsory insurance; the page's compulsory-insurance sentence is a fair paraphrase.
