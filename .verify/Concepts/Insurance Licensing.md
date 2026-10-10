---
target: Concepts/Insurance Licensing.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every rule against the NAIC model acts, NRRA and NAIC glossary; examples recomputed; links resolve
- sources_checked: NAIC Nonadmitted Insurance Model Act (#870, Summer 2023), s.3 definitions (exempt commercial purchaser, CPI adjustment), s.5A diligent search, s.5C(2) eligibility, s.5D home state, sha256:00383df09c6d2d91bce6836f20c24d591be44649acae74fc0ed50c01083da04f — https://content.naic.org/sites/default/files/model-law-870.pdf; 15 U.S.C. s.8202 (NRRA), via LII, (a), sha256:cf4e57fcddec7fd2f98ed13c40e1ef9b71228f42bdb68e9bf9cfcb55c5321808 — https://www.law.cornell.edu/uscode/text/15/8202; 15 U.S.C. s.8201 (NRRA), via LII, (a), sha256:0b1eb5ec89a52bc7a819e3e1308158542a156880973a2e1ed07c65562d5c8465 — https://www.law.cornell.edu/uscode/text/15/8201; NAIC Producer Licensing Model Act (#218, 2005), ss.2, 4, 6, 7, 8, 12, 14, 15, sha256:5b1eafdc7b1a841a97440f0e1e7c98e30c935855de4add58838c0f76aee37a34 — https://content.naic.org/sites/default/files/model-law-218.pdf; NAIC Public Adjuster Licensing Model Act (#228, Spring 2025), s.2 definition, s.3, s.12 bond, s.15 contract, sha256:9d317f813d94b58570ffcf2396dbbf9040c5a8b594e06b29e389fb98303c2b28 — https://content.naic.org/sites/default/files/model-law-228.pdf; NAIC Glossary of Insurance Terms, Domestic Insurer, Foreign Insurer, Alien Company, Admitted Company, Nonadmitted Insurer, Public Adjuster, Independent Adjuster, Prior Approval Law, read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://content.naic.org/glossary-insurance-terms; NAIC testimony (Csiszar), Senate Commerce Committee, Oct 22 2003, PDF p.3 ("one overriding reason"); p.5 (UCAA), sha256:b465c2a47d11ff54d304ff2c91a26987265d74208a77e37fdb2c6c65157c1d1a — https://content.naic.org/sites/default/files/naic_archive/testimony_0310_csiszar.pdf
- note: Surplus lines eligibility (greater of state minimum and $15M; commissioner finding allowed, never below $4.5M; alien insurers on the Quarterly Listing; diligent search; ECP: risk manager, >$100k premium, revenue >$50M etc., CPI adjustment), home-state rule, producer licensing (age 18, exam, lines of authority incl. personal lines and credit, licence creates no authority to bind, exemptions s.4, nonresident reciprocity s.8, grounds s.12, termination notice 30 days), public adjuster model and the domestic/foreign/alien/admitted definitions all agree. Examples recomputed: max(5M,15M)=15M>12M>4.5M; ECP thresholds met. No findings. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.
