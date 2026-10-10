---
target: Concepts/Terrorism Risk Insurance Program.md
created: 2026-10-10
---

## [F-001] Certification wording: statute says in consultation with
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: nit
- status: open
- locus: 'Certification' bullet
- claim: The Secretary of the Treasury, in concert with the Secretary of Homeland Security and the Attorney General, decides whether an act is certified.
- evidence: TRIA §102(1)(A) as amended (15 U.S.C. 6701 note, LII, sha256:ab50d06a...): an act of terrorism is one 'certified by the Secretary, in consultation with the Secretary of Homeland Security, and the Attorney General'; §102(1)(E) bars delegating the determination. 'In concert with' implies a joint decision the statute does not make.
- source_rank: 1
- proposed_action: Replace 'in concert with' by 'in consultation with'.
- applied: true
- fingerprint: 7bd2f0a6dad8

## [F-002] The Secretary, not the FIO, administers the program
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: nit
- status: open
- locus: lead, second sentence
- claim: It is administered by the Treasury's Federal Insurance Office.
- evidence: TRIA §103(a)(1): 'the Secretary shall administer the Program' (LII, sha256:ab50d06a...); Treasury's program page: 'The Secretary of the Treasury administers the program with the assistance of the Federal Insurance Office' (sha256:77d33494...).
- source_rank: 1
- proposed_action: Transcribe Treasury's sentence: the Secretary of the Treasury administers it with the assistance of the Federal Insurance Office.
- applied: true
- fingerprint: 2cca2b4388f0

## [F-003] Not every reauthorization raised the private share
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Extensions' bullet
- claim: Each reauthorization, in 2005, 2007, 2015 and 2019, raised the private sector's share, through larger deductibles, a smaller federal share or a higher trigger.
- evidence: TRIPRA 2007 (Pub. L. 110-160, sha256:541366d8...) §§2-5 struck the foreign-person requirement from the definition, extended the program to 2014 with program-year conforming amendments, rewrote the $100B cap provisions and added reports; it changed no deductible percentage, federal share or trigger. The 2019 Act (Pub. L. 116-94 div. I title V §502, PDF pp.494-495, sha256:d724cc18...) extended the termination date to 2027 and changed recoupment timing only. The 2015 Act's phase-ins (share 85% falling to 80%, trigger rising to $200M by 2020) are visible in current §103(e)(1); the 2005 Act was not read.
- source_rank: 1
- proposed_action: Limit the statement to the reauthorizations that did raise the private share (2015, and 2005 once checked), and say 2007 and 2019 mainly extended the program.
- applied: false
- fingerprint: 813ad2e60d91

## [F-004] 'Congress decides' the excess above the cap is no longer in the statute
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Program trigger and cap' bullet ('Congress decides how any excess is handled') and the trap 'The cap is not reinsurance'
- claim: Annual losses above $100 billion are covered by neither the government nor insurers that have met their deductibles, and Congress decides how any excess is handled.
- evidence: TRIPRA 2007 §4 (Pub. L. 110-160, sha256:541366d8...) struck '(until such time as the Congress may act otherwise with respect to such losses)' from §103(e)(2)(A) and struck 'and the Congress shall' through the end of §103(e)(3). Current §103(e)(2)-(3) (LII, sha256:ab50d06a...) has the Secretary determine each insurer's pro rata share and notify Congress; nothing assigns the excess to Congress. The first half of the sentence matches §103(e)(2)(A).
- source_rank: 1
- proposed_action: Delete 'and Congress decides how any excess is handled' or replace it with the statute's pro rata share and notice to Congress.
- applied: false
- fingerprint: 8793f8b96b58

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Corrected in the working tree: 'in consultation with the Secretary of Homeland Security and the Attorney General', TRIA §102(1)(A).

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Corrected in the working tree to Treasury's sentence: 'The Secretary of the Treasury administers it with the assistance of the Federal Insurance Office.'

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Every mechanism against TRIA as amended (15 U.S.C. 6701 note): certification, affiliates as one insurer, 20% deductible on prior-year DEP, 80% share, $200M trigger, annual aggregate by calendar year, $100B cap, make-available and disclosure, IMARA, mandatory recoupment at 140% and discretionary recoupment, surcharge collected and remitted, termination 2027; surcharge not premium against 31 C.F.R. 50.94(c)(3); reauthorization history against Treasury's page and Pub. L. 110-160 and 116-94. Examples recomputed before reading: D = 200,000,000, F = 160,000,000, retained 240,000,000, per-act 40,000,000, understatement 120,000,000; M = min(25, 45 - 35) = 10, surcharges 14, discretionary 15 (billions); IMARA - U cannot exceed F because IMARA is capped at aggregate insured losses.
- sources_checked: Terrorism Risk Insurance Act of 2002 as amended, 15 U.S.C. 6701 note (LII): §102(1)(A) certification by the Secretary in consultation with DHS and the Attorney General; §102(6) insurer includes affiliates; §102(7) deductible 20% of prior-year DEP; §103(a) Secretary administers; §103(b)-(c) disclosure and make available; §103(e)(1) federal share 80%, trigger $200M from 2020; §103(e)(2)-(3) $100B cap, pro rata, notice to Congress; §103(e)(6)-(8) IMARA, mandatory recoupment at 140%, discretionary recoupment, policyholder surcharge collected and remitted; §108(a) termination Dec. 31, 2027, sha256:ab50d06aef460fe2adc0d74c45beb59bece7c4f966777cbcf9af2714ad29f0b6 — https://www.law.cornell.edu/uscode/text/15/6701; 31 C.F.R. part 50 (eCFR, read 2026-10-10): §50.4(q) mandatory recoupment amount; §50.90 140% and discretionary recoupment; §50.94(c)(3) 'The Federal terrorism policy surcharge is not considered premium', sha256:f283053648fa0161e09f5741e242364bf2025cd1e3b58939edace0dcd04ac0c5 — https://www.ecfr.gov/current/title-31/part-50; U.S. Treasury, Terrorism Risk Insurance Program page (Secretary administers with the assistance of FIO; TRIEA 2005 to 2007, TRIPRA 2007 to 2014, 2015 Act to 2020, 2019 Act to 2027), sha256:77d334948b2f89aeabe7679a53269fd8269bf52d8ad862767bc2c6a01ab8096e — https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/federal-insurance-office/terrorism-risk-insurance-program; Pub. L. 110-160 (TRIPRA 2007), §§2-5, 121 Stat. 1839-1841, sha256:541366d8707b0160ed0d4fad9d6c7190e8bbae12cf73647d76fa668a2558f53d — https://www.govinfo.gov/content/pkg/PLAW-110publ160/pdf/PLAW-110publ160.pdf; Pub. L. 116-94, div. I, title V, §§501-502 (TRIP Reauthorization Act of 2019), PDF pp.494-495, sha256:d724cc183016bdd5408a523a4fbed5326399decae4e50a4315cead2475c47aa8 — https://www.congress.gov/116/plaws/publ94/PLAW-116publ94.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium: F-001 and F-002 (nits) fixed and resolved this run; F-003 (not every reauthorization raised the private share) and F-004 ('Congress decides' the excess, struck in 2007) open as minor.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-003
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): Extensions bullet now gives the extension dates from Treasury (2005 to 2007, 2007 to 2014, 2015 to 2020, 2019 to 2027), says the 2015 Act phased the share from 85% to 80% and the trigger from $100M to $200M by 2020, and that the 2007 and 2019 Acts changed neither (Pub. L. 110-160; 116-94 §502). The unsourced renewal-debate sentence deleted.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- resolves: F-004
- status: resolved
- note: Fixed in the working tree (clean-up round, lead-authorized): 'Congress decides how any excess is handled' replaced by the statute: the Secretary determines pro rata shares above the cap and must notify Congress if losses are estimated to exceed $100 billion (§103(e)(2)(B), (3)); the trap now ends 'depends on the pro rata shares the Secretary determines'.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Re-verify after the clean-up edits: Extensions bullet against Treasury's TRIP page, current §103(e)(1) and Pub. L. 110-160, 116-94; cap bullet and trap against §103(e)(2)(B), (3); the rest as in the earlier pass; examples unchanged.
- sources_checked: Terrorism Risk Insurance Act of 2002 as amended, 15 U.S.C. 6701 note (LII): §102(1)(A) certification by the Secretary in consultation with DHS and the Attorney General; §102(6) insurer includes affiliates; §102(7) deductible 20% of prior-year DEP; §103(a) Secretary administers; §103(b)-(c) disclosure and make available; §103(e)(1) federal share 80%, trigger $200M from 2020; §103(e)(2)-(3) $100B cap, pro rata, notice to Congress; §103(e)(6)-(8) IMARA, mandatory recoupment at 140%, discretionary recoupment, policyholder surcharge collected and remitted; §108(a) termination Dec. 31, 2027, sha256:ab50d06aef460fe2adc0d74c45beb59bece7c4f966777cbcf9af2714ad29f0b6 — https://www.law.cornell.edu/uscode/text/15/6701; 31 C.F.R. part 50 (eCFR, read 2026-10-10): §50.4(q) mandatory recoupment amount; §50.90 140% and discretionary recoupment; §50.94(c)(3) 'The Federal terrorism policy surcharge is not considered premium', sha256:f283053648fa0161e09f5741e242364bf2025cd1e3b58939edace0dcd04ac0c5 — https://www.ecfr.gov/current/title-31/part-50; U.S. Treasury, Terrorism Risk Insurance Program page (Secretary administers with the assistance of FIO; TRIEA 2005 to 2007, TRIPRA 2007 to 2014, 2015 Act to 2020, 2019 Act to 2027), sha256:77d334948b2f89aeabe7679a53269fd8269bf52d8ad862767bc2c6a01ab8096e — https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/federal-insurance-office/terrorism-risk-insurance-program; Pub. L. 110-160 (TRIPRA 2007), §§2-5, 121 Stat. 1839-1841, sha256:541366d8707b0160ed0d4fad9d6c7190e8bbae12cf73647d76fa668a2558f53d — https://www.govinfo.gov/content/pkg/PLAW-110publ160/pdf/PLAW-110publ160.pdf; Pub. L. 116-94, div. I, title V, §§501-502 (TRIP Reauthorization Act of 2019), PDF pp.494-495, sha256:d724cc183016bdd5408a523a4fbed5326399decae4e50a4315cead2475c47aa8 — https://www.congress.gov/116/plaws/publ94/PLAW-116publ94.pdf; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: F-003 and F-004 resolved (F-001, F-002 earlier in this run). Every claim now rests on the statute, the regulation, the public laws or Treasury's own page.
