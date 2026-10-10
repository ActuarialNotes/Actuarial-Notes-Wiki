---
target: Concepts/Defenses Against Negligence.md
created: 2026-10-10
---

## [F-001] Charitable immunity dates rest on Wikipedia only
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Immunities bullet, charitable immunity sentence
- claim: Charitable immunity: almost every state abrogated or limited it between the 1940s and 1992.
- evidence: The substance is confirmed by primary sources read this run: Picher v. Roman Catholic Bishop of Portland, 2009 ME 67, paras 12-17, quotes Prosser & Keeton that by 1984 virtually all states with decisions had rejected complete charitable immunity, and Restatement (Second) of Torts s.895E; IRMI's glossary says most states have eliminated or severely limited it. The date range '1940s and 1992' appears only in Wikipedia's lead (citing secondary works), which is rank 3 and not enough on its own.
- source_rank: 3
- proposed_action: Either drop 'between the 1940s and 1992' or cite a primary source for it. The same clause is in discia-an-224's explanation of option B.
- applied: false
- fingerprint: 86005df919b1

## [F-002] Links a Canadian limitation-period page for U.S. statutes of limitations
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- severity: minor
- status: open
- locus: Statutes of limitations bullet, 'See [[Limitation Period]]'
- claim: The U.S. statutes-of-limitations bullet points the reader to [[Limitation Period]].
- evidence: DISC-IA is a U.S. course. The linked page is written for Exam 6C: Concepts/Limitation Period.md is built on 'the modern Canadian model (Ontario's Limitations Act, 2002 is the template)'. The U.S. rule the bullet states is from LII Wex 'statute of limitations' and CTS Corp. v. Waldburger.
- source_rank: 3
- proposed_action: Drop the cross-reference or point it at a U.S. treatment.
- applied: false
- fingerprint: 75615738b496

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, rule and list against the sources cited; worked examples recomputed; every [[link]] resolves; U.S. framing of links
- sources_checked: Cornell LII Wex, "contributory negligence", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence; Cornell LII Wex, "comparative negligence", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence; Cornell LII Wex, "last clear chance", whole entry, sha256:d75968f2adf4d2ba5f99c9f140845273ed20c5655d7e459ea49845078d08c7ae — https://www.law.cornell.edu/wex/last_clear_chance; Cornell LII Wex, "assumption of risk", whole entry, sha256:7d1a8b51f5c9e813c2400cea1e0f97d008b86d4774b3df78c8d3547bb1213a05 — https://www.law.cornell.edu/wex/assumption_of_risk; Cornell LII Wex, "sovereign immunity", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity; Cornell LII Wex, "statute of limitations", whole entry, sha256:204224ba9aaf2d0435a55bfcbda5d125a170752530f15e50677a921839782bf9 — https://www.law.cornell.edu/wex/statute_of_limitations; Cornell LII Wex, "statute of repose", whole entry, sha256:6ae5fa0e18758b179bab831e21ebce635107ea0b903c83fd73203f03e21a4305 — https://www.law.cornell.edu/wex/statute_of_repose; CTS Corp. v. Waldburger, 573 U.S. 1 (2014), via LII, opinion Part II-A, sha256:30cdfdc9b2ea45f8b22dcd057cefa53457c2de03c06a56fc95ae8f3182caab7c — https://www.law.cornell.edu/supremecourt/text/13-339; Picher v. Roman Catholic Bishop of Portland, 2009 ME 67 (Me. SJC), paras 12-17 (Restatement s.895E; Prosser & Keeton), read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://caselaw.findlaw.com/court/me-supreme-judicial-court/1010006.html; IRMI Glossary, "charitable immunity", whole entry, sha256:47ebf562ed2ec4097fd4bc0536f6cab0fdaf2f5a419d9b0f82903cbf112fe6c1 — https://www.irmi.com/term/insurance-definitions/charitable-immunity; Wikipedia, "Charitable immunity" (rank 3), lead, sha256:c5c858f200396511907d662f8c47c5fade366dea21cdf8cffb637848e3235084 — https://en.wikipedia.org/wiki/Charitable_immunity; Heino v. Harper, 306 Or. 347 (1988) (Caselaw Access Project), Restatement s.895F discussion, sha256:da9c72437d9d8a0b53f37086f9e6e6a6d03bea17d44f218c15ac0d68f4a76e5c — https://static.case.law/or/306/cases/0347-01.json
- note: Fault-rule formula and every defence checked; repose 'not delayed by estoppel or tolling' is CTS quoting Wright & Miller; interspousal immunity confirmed by Heino v. Harper (overwhelming number of jurisdictions; Restatement s.895F). Examples recomputed (p=0.50: 200k/0/200k/0; 2010+10=2020<2024; repose expired at year 10, suit at year 11). Open: two minor findings (charitable-immunity dates; Canadian link). The syllabus reading (The Institutes, Insurance Accounting, Coverage Analysis, Insurance Law, and Insurance Regulation, 2023) is sold, not published, and was not read; confidence is held at medium for that reason.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Wikipedia-only dates deleted. Sentence now reads 'virtually every state with decisions on it has rejected complete charitable immunity or limited it', restating Picher v. Roman Catholic Bishop of Portland (2009 ME 67) quoting Prosser & Keeton and Restatement s.895E.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: 'See [[Limitation Period]]' deleted.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv08
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-read the edited passages against the sources cited; links resolve; question_lint clean
- sources_checked: Cornell LII Wex, "contributory negligence", whole entry, sha256:43c1fd0c3cba3b96f36050e083387b1fef7a79d117cc943b600de65e130958b6 — https://www.law.cornell.edu/wex/contributory_negligence; Cornell LII Wex, "comparative negligence", whole entry, sha256:2f19566fa7f19db3c57ce3d0147aeaeebb7535d5e7d45ea9e111281973b8a240 — https://www.law.cornell.edu/wex/comparative_negligence; Cornell LII Wex, "last clear chance", whole entry, sha256:d75968f2adf4d2ba5f99c9f140845273ed20c5655d7e459ea49845078d08c7ae — https://www.law.cornell.edu/wex/last_clear_chance; Cornell LII Wex, "assumption of risk", whole entry, sha256:7d1a8b51f5c9e813c2400cea1e0f97d008b86d4774b3df78c8d3547bb1213a05 — https://www.law.cornell.edu/wex/assumption_of_risk; Cornell LII Wex, "sovereign immunity", whole entry, sha256:16b2651a31fd3dce1d1d950f2aaac31dd411e62af79901dc93a001da76ca1cbc — https://www.law.cornell.edu/wex/sovereign_immunity; Cornell LII Wex, "statute of limitations", whole entry, sha256:204224ba9aaf2d0435a55bfcbda5d125a170752530f15e50677a921839782bf9 — https://www.law.cornell.edu/wex/statute_of_limitations; Cornell LII Wex, "statute of repose", whole entry, sha256:6ae5fa0e18758b179bab831e21ebce635107ea0b903c83fd73203f03e21a4305 — https://www.law.cornell.edu/wex/statute_of_repose; CTS Corp. v. Waldburger, 573 U.S. 1 (2014), via LII, opinion Part II-A, sha256:30cdfdc9b2ea45f8b22dcd057cefa53457c2de03c06a56fc95ae8f3182caab7c — https://www.law.cornell.edu/supremecourt/text/13-339; Picher v. Roman Catholic Bishop of Portland, 2009 ME 67 (Me. SJC), paras 12-17 (Restatement s.895E; Prosser & Keeton), read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://caselaw.findlaw.com/court/me-supreme-judicial-court/1010006.html; IRMI Glossary, "charitable immunity", whole entry, sha256:47ebf562ed2ec4097fd4bc0536f6cab0fdaf2f5a419d9b0f82903cbf112fe6c1 — https://www.irmi.com/term/insurance-definitions/charitable-immunity; Wikipedia, "Charitable immunity" (rank 3), lead, sha256:c5c858f200396511907d662f8c47c5fade366dea21cdf8cffb637848e3235084 — https://en.wikipedia.org/wiki/Charitable_immunity; Heino v. Harper, 306 Or. 347 (1988) (Caselaw Access Project), Restatement s.895F discussion, sha256:da9c72437d9d8a0b53f37086f9e6e6a6d03bea17d44f218c15ac0d68f4a76e5c — https://static.case.law/or/306/cases/0347-01.json
- note: Re-verified after the clean-up edits (all open findings resolved in this run). Fault-rule formula and every defence checked; repose 'not delayed by estoppel or tolling' is CTS quoting Wright & Miller; interspousal immunity confirmed by Heino v. Harper (overwhelming number of jurisdictions; Restatement s.895F). Examples recomputed (p=0.50: 200k/0/200k/0; 2010+10=2020<2024; repose expired at year 10, suit at year 11).
