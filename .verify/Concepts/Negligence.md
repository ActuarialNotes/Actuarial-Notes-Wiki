---
target: Concepts/Negligence.md
created: 2026-10-10
---

## [F-001] Links a Canadian-framed punitive damages page for a U.S. rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Damages bullet, [[Punitive Damages]] link
- claim: The DISC-IA 14.1 page sends a reader to [[Punitive Damages]] for when punitive damages are awarded in U.S. negligence cases.
- evidence: DISC-IA is a U.S. course. The linked page is written for Exam 6C: Concepts/Punitive Damages.md opens 'In Canadian insurance they arise almost exclusively from an insurer's breach of the Duty of Good Faith' and states the Canadian standard from Whiten v. Pilot. The U.S. rule (punitive damages for intentional or wanton and willful misconduct) is LII Wex 'punitive damages'.
- source_rank: 3
- proposed_action: Point the link at a U.S. treatment (or give Punitive Damages a U.S. section); maintainer decision.
- applied: false
- fingerprint: 05e6e325a405

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links
- sources_checked: Cornell LII Wex, "negligence", whole entry, sha256:83fcfd0343f79398b5caeca4fa538f5e938906edbbbbd01840c24b5988fa3ef5 — https://www.law.cornell.edu/wex/negligence; Cornell LII Wex, "comparative negligence", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence; Cornell LII Wex, "contributory negligence", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence; Cornell LII Wex, "last clear chance", whole entry, sha256:d75968f2adf4d2ba5f99c9f140845273ed20c5655d7e459ea49845078d08c7ae — https://www.law.cornell.edu/wex/last_clear_chance; Cornell LII Wex, "assumption of risk", whole entry, sha256:7d1a8b51f5c9e813c2400cea1e0f97d008b86d4774b3df78c8d3547bb1213a05 — https://www.law.cornell.edu/wex/assumption_of_risk; Cornell LII Wex, "reasonable person", whole entry, sha256:95fd7d2cb35ece8b94eb180ce801dd3c766ed37fcc5f3fa9b2af748750757aea — https://www.law.cornell.edu/wex/reasonable_person; Cornell LII Wex, "negligence per se", whole entry, sha256:39f6a834b3b01a847a3115bf669f8b689041362fca9cbd71ff55e378cff8ed28 — https://www.law.cornell.edu/wex/negligence_per_se; Cornell LII Wex, "res ipsa loquitur", whole entry, sha256:b24e2995dd0ac2e041e444044aa9f45d994083ccaa65eb1bd71615e560688f7a — https://www.law.cornell.edu/wex/res_ipsa_loquitur; Cornell LII Wex, "malpractice", whole entry, sha256:9bc11df876168536a7a5d22b872e5123c74373d81e0dda0b4d5cd36c9d893b4d — https://www.law.cornell.edu/wex/malpractice; Cornell LII Wex, "statute of limitations", whole entry, sha256:204224ba9aaf2d0435a55bfcbda5d125a170752530f15e50677a921839782bf9 — https://www.law.cornell.edu/wex/statute_of_limitations; Cornell LII Wex, "statute of repose", whole entry, sha256:6ae5fa0e18758b179bab831e21ebce635107ea0b903c83fd73203f03e21a4305 — https://www.law.cornell.edu/wex/statute_of_repose; Cornell LII Wex, "sovereign immunity", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity; Cornell LII Wex, "punitive damages", whole entry, sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages; United States v. Carroll Towing Co., 159 F.2d 169 (2d Cir. 1947) (Caselaw Access Project), Hand formula passage, sha256:2c13a0d99f6fad58ed353a70bc9d5c8d4d4f9d9be29526c74fa6b48d58681ef6 — https://static.case.law/f2d/159/cases/0169-01.json; CTS Corp. v. Waldburger, 573 U.S. 1 (2014), via LII, opinion Part II-A, sha256:30cdfdc9b2ea45f8b22dcd057cefa53457c2de03c06a56fc95ae8f3182caab7c — https://www.law.cornell.edu/supremecourt/text/13-339; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), s.V def. 13 "occurrence"; s.I Coverage A exclusion 2.a, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Four elements, Hand test (Carroll Towing 1947, B<PL), reasonable-person standard incl. child and professional, negligence per se, res ipsa, but-for and proximate cause, comparative/contributory rules (AL, MD, NC, VA, DC; 50%/51% bars), assumption of risk, limitations vs repose all agree with the sources. Worked examples recomputed: 240k/150k/120k; P*L=50>40; 26 months and repose to June 2024. The no-duty-to-rescue sentence rests on LII's 'omission is negligent only where there was a duty to act'. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Link to [[Punitive Damages]] dropped; the words 'Punitive damages are rare' kept (U.S.-correct per LII 'punitive damages').

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: Cornell LII Wex, "negligence", whole entry, sha256:83fcfd0343f79398b5caeca4fa538f5e938906edbbbbd01840c24b5988fa3ef5 — https://www.law.cornell.edu/wex/negligence; Cornell LII Wex, "comparative negligence", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence; Cornell LII Wex, "contributory negligence", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence; Cornell LII Wex, "last clear chance", whole entry, sha256:d75968f2adf4d2ba5f99c9f140845273ed20c5655d7e459ea49845078d08c7ae — https://www.law.cornell.edu/wex/last_clear_chance; Cornell LII Wex, "assumption of risk", whole entry, sha256:7d1a8b51f5c9e813c2400cea1e0f97d008b86d4774b3df78c8d3547bb1213a05 — https://www.law.cornell.edu/wex/assumption_of_risk; Cornell LII Wex, "reasonable person", whole entry, sha256:95fd7d2cb35ece8b94eb180ce801dd3c766ed37fcc5f3fa9b2af748750757aea — https://www.law.cornell.edu/wex/reasonable_person; Cornell LII Wex, "negligence per se", whole entry, sha256:39f6a834b3b01a847a3115bf669f8b689041362fca9cbd71ff55e378cff8ed28 — https://www.law.cornell.edu/wex/negligence_per_se; Cornell LII Wex, "res ipsa loquitur", whole entry, sha256:b24e2995dd0ac2e041e444044aa9f45d994083ccaa65eb1bd71615e560688f7a — https://www.law.cornell.edu/wex/res_ipsa_loquitur; Cornell LII Wex, "malpractice", whole entry, sha256:9bc11df876168536a7a5d22b872e5123c74373d81e0dda0b4d5cd36c9d893b4d — https://www.law.cornell.edu/wex/malpractice; Cornell LII Wex, "statute of limitations", whole entry, sha256:204224ba9aaf2d0435a55bfcbda5d125a170752530f15e50677a921839782bf9 — https://www.law.cornell.edu/wex/statute_of_limitations; Cornell LII Wex, "statute of repose", whole entry, sha256:6ae5fa0e18758b179bab831e21ebce635107ea0b903c83fd73203f03e21a4305 — https://www.law.cornell.edu/wex/statute_of_repose; Cornell LII Wex, "sovereign immunity", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity; Cornell LII Wex, "punitive damages", whole entry, sha256:d7d3c177c6bb8aff7989985bdb69ed4452bf7457888735cde1ebf97b7586b7ec — https://www.law.cornell.edu/wex/punitive_damages; United States v. Carroll Towing Co., 159 F.2d 169 (2d Cir. 1947) (Caselaw Access Project), Hand formula passage, sha256:2c13a0d99f6fad58ed353a70bc9d5c8d4d4f9d9be29526c74fa6b48d58681ef6 — https://static.case.law/f2d/159/cases/0169-01.json; CTS Corp. v. Waldburger, 573 U.S. 1 (2014), via LII, opinion Part II-A, sha256:30cdfdc9b2ea45f8b22dcd057cefa53457c2de03c06a56fc95ae8f3182caab7c — https://www.law.cornell.edu/supremecourt/text/13-339; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), s.V def. 13 "occurrence"; s.I Coverage A exclusion 2.a, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the clean-up edits (all open findings resolved in this run). Four elements, Hand test (Carroll Towing 1947, B<PL), reasonable-person standard incl. child and professional, negligence per se, res ipsa, but-for and proximate cause, comparative/contributory rules (AL, MD, NC, VA, DC; 50%/51% bars), assumption of risk, limitations vs repose all agree with the sources. Worked examples recomputed: 240k/150k/120k; P*L=50>40; 26 months and repose to June 2024. The no-duty-to-rescue sentence rests on LII's 'omission is negligent only where there was a duty to act'. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.
