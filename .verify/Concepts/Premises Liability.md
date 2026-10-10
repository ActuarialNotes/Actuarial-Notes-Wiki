---
target: Concepts/Premises Liability.md
created: 2026-10-10
---

## [F-001] Spring-gun rule stated as absolute
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Trespassers bullet
- claim: The occupier owes a trespasser only a duty not to injure willfully or wantonly, 'so setting a trap or spring gun is never allowed'.
- evidence: Katko v. Briney, 183 N.W.2d 657 (Iowa 1971), affirms instructions that a spring gun is prohibited 'for the purpose of harming trespassers' and that the only justification is where 'the trespasser was committing a felony of violence or a felony punishable by death, or where the trespasser was endangering human life'. 'Never' overstates the rule; LII 'defense of property' says deadly force cannot be used to protect property alone, which is the narrower point.
- source_rank: 3
- proposed_action: Qualify the clause (deadly force or a spring gun may not be used merely to protect property), or drop 'never'.
- applied: false
- fingerprint: 365e66539e75

## [F-002] Medical payments link lands on the auto coverage
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Insurance bullet, [[Medical Payments Coverage|Medical payments]]
- claim: On a CGL, medical payments coverage pays a member of the public's medical expenses after an accident on the premises without proof of fault; the text links [[Medical Payments Coverage]].
- evidence: The sentence is right for CGL Coverage C (CG 00 01 04 13, Coverage C insuring agreement: medical expenses for bodily injury caused by an accident on premises you own or rent; payable regardless of fault). The linked page, Concepts/Medical Payments Coverage.md, is 'Part B of the personal auto policy', so the link sends a reader to the wrong coverage.
- source_rank: 2
- proposed_action: Point the link at a CGL Coverage C treatment, or unlink it.
- applied: false
- fingerprint: 77d5f54f0be0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links; Restatement categories traced through court opinions
- sources_checked: Rowland v. Christian, 69 Cal. 2d 108 (1968) (Caselaw Access Project), opinion text, sha256:6637138ee1290c3ab8819bc096f5e472c37adcfcee21300471aa2cc33b72398d — https://static.case.law/cal-2d/69/cases/0108-01.json; Demag v. Better Power Equipment, 2014 VT 78 (Vt. Supreme Court), pp.3-6, 10-11, sha256:e74830ed35c819710cc75a2f6dddfa11e62a058e9cdbe78b138129b13b4be43f — https://www.vtcourts.gov/media/4343; Tucker v. Sullivan, 307 Ark. 440 (1991), headnote 1 and Restatement s.332 quotation; licensee duty p.6, sha256:b256211bc2f79087a7eadd66b09be99fe0b33772ef89d0074b44c796221a25e3 — https://opinions.arcourts.gov/ark/supremecourt/en/264597/1/document.do; Cornell LII Wex, "licensee", whole entry, sha256:d86ad3f8db08b9ab3e11a6ae00eafc9fdae2ba189937012163de40632c97b36d — https://www.law.cornell.edu/wex/licensee; Cornell LII Wex, "invitee", whole entry, sha256:1e19ea6629325da9163cdd4b29730e43bc2419b0ab635ec5f9c3e899503a4c83 — https://www.law.cornell.edu/wex/invitee; Cornell LII Wex, "attractive nuisance doctrine", whole entry, sha256:14b9a76d9034736e1d4249572e7bf7fd8ce01093011f84c851c44c7403d1956a — https://www.law.cornell.edu/wex/attractive_nuisance_doctrine; Cornell LII Wex, "trespass", whole entry, sha256:15930f12119cc6a499137f69e35855f7a780e6f0e3de7f95942c31a35c3c86cc — https://www.law.cornell.edu/wex/trespass; Katko v. Briney, 183 N.W.2d 657 (Iowa 1971) (Caselaw Access Project), instructions 2, 5 and 6, sha256:db0baf0b78caa8615295b5b37ca669f9da0f03c07d1cc814470080147ca83c31 — https://static.case.law/nw2d/183/cases/0657-01.json; S.D. Codified Laws s.20-9-11.6 (known trespassers), full section, sha256:97e6c9fe1ee9edffd01b73813ada4e59db71cd36eb8165257748dcd896122dbe — https://sdlegislature.gov/api/Statutes/20-9-11.6.html?all=true; Sargent v. Ross, 113 N.H. 388 (1973) (Caselaw Access Project), landlord exceptions, Restatement ss.358-62, sha256:b07612aa291c0ae00e53ad4ba7df85cfd02d3584966480af9bb6404731c50f09 — https://static.case.law/nh/113/cases/0388-01.json; Wikipedia, "Invitee" (rank 3), scope of invitation paragraph, sha256:768ff583937f2cd6528372280b7c5f028e6c5a68ae57603de3e52257d0349f78 — https://en.wikipedia.org/wiki/Invitee; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), Coverage C insuring agreement and regardless-of-fault clause, p.8, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Categories and duties checked against Rowland v. Christian (social guest is a licensee; licensee duties under Restatement ss.341-342; 1968 abolition) and Demag (Vt. 2014: slight majority of states have abolished the licensee/invitee distinction). Note a conflict inside LII: its 'invitee' entry calls a social-event guest an invitee while its 'licensee' entry and the Restatement-based opinions call a social guest a licensee; the page follows the Restatement and the courts. Public invitee: Tucker v. Sullivan quoting s.332. Known-trespasser warning duty: S.D. Codified Laws 20-9-11.6. Landlord exceptions: Sargent v. Ross (Restatement ss.358-62). Example arithmetic: 0.8*60,000=48,000. Open: two minor findings. The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Spring-gun clause restated to Katko v. Briney (Iowa 1971): a landowner was liable for wounding a burglar with a spring gun guarding an unoccupied farmhouse; such force is justified only against a trespasser committing a violent felony or endangering human life.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Medical payments link retargeted to [[CGL Coverage C]], the coverage the sentence describes.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: Rowland v. Christian, 69 Cal. 2d 108 (1968) (Caselaw Access Project), opinion text, sha256:6637138ee1290c3ab8819bc096f5e472c37adcfcee21300471aa2cc33b72398d — https://static.case.law/cal-2d/69/cases/0108-01.json; Demag v. Better Power Equipment, 2014 VT 78 (Vt. Supreme Court), pp.3-6, 10-11, sha256:e74830ed35c819710cc75a2f6dddfa11e62a058e9cdbe78b138129b13b4be43f — https://www.vtcourts.gov/media/4343; Tucker v. Sullivan, 307 Ark. 440 (1991), headnote 1 and Restatement s.332 quotation; licensee duty p.6, sha256:b256211bc2f79087a7eadd66b09be99fe0b33772ef89d0074b44c796221a25e3 — https://opinions.arcourts.gov/ark/supremecourt/en/264597/1/document.do; Cornell LII Wex, "licensee", whole entry, sha256:d86ad3f8db08b9ab3e11a6ae00eafc9fdae2ba189937012163de40632c97b36d — https://www.law.cornell.edu/wex/licensee; Cornell LII Wex, "invitee", whole entry, sha256:1e19ea6629325da9163cdd4b29730e43bc2419b0ab635ec5f9c3e899503a4c83 — https://www.law.cornell.edu/wex/invitee; Cornell LII Wex, "attractive nuisance doctrine", whole entry, sha256:14b9a76d9034736e1d4249572e7bf7fd8ce01093011f84c851c44c7403d1956a — https://www.law.cornell.edu/wex/attractive_nuisance_doctrine; Cornell LII Wex, "trespass", whole entry, sha256:15930f12119cc6a499137f69e35855f7a780e6f0e3de7f95942c31a35c3c86cc — https://www.law.cornell.edu/wex/trespass; Katko v. Briney, 183 N.W.2d 657 (Iowa 1971) (Caselaw Access Project), instructions 2, 5 and 6, sha256:db0baf0b78caa8615295b5b37ca669f9da0f03c07d1cc814470080147ca83c31 — https://static.case.law/nw2d/183/cases/0657-01.json; S.D. Codified Laws s.20-9-11.6 (known trespassers), full section, sha256:97e6c9fe1ee9edffd01b73813ada4e59db71cd36eb8165257748dcd896122dbe — https://sdlegislature.gov/api/Statutes/20-9-11.6.html?all=true; Sargent v. Ross, 113 N.H. 388 (1973) (Caselaw Access Project), landlord exceptions, Restatement ss.358-62, sha256:b07612aa291c0ae00e53ad4ba7df85cfd02d3584966480af9bb6404731c50f09 — https://static.case.law/nh/113/cases/0388-01.json; Wikipedia, "Invitee" (rank 3), scope of invitation paragraph, sha256:768ff583937f2cd6528372280b7c5f028e6c5a68ae57603de3e52257d0349f78 — https://en.wikipedia.org/wiki/Invitee; ISO CGL Coverage Form CG 00 01 04 13 (specimen copy), Coverage C insuring agreement and regardless-of-fault clause, p.8, sha256:78739f04c6b7b183d1c2e5cd1dd34411cc7f6585760096a2eddb63d0ea904869 — https://cooperscully.com/uploads/file/Commercial%20General%20Liability%20Coverage%20Form.pdf
- note: Re-verified after the clean-up edits (all open findings resolved in this run). Categories and duties checked against Rowland v. Christian (social guest is a licensee; licensee duties under Restatement ss.341-342; 1968 abolition) and Demag (Vt. 2014: slight majority of states have abolished the licensee/invitee distinction). Note a conflict inside LII: its 'invitee' entry calls a social-event guest an invitee while its 'licensee' entry and the Restatement-based opinions call a social guest a licensee; the page follows the Restatement and the courts. Public invitee: Tucker v. Sullivan quoting s.332. Known-trespasser warning duty: S.D. Codified Laws 20-9-11.6. Landlord exceptions: Sargent v. Ross (Restatement ss.358-62). Example arithmetic: 0.8*60,000=48,000.
