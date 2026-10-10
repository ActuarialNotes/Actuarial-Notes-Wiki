---
target: Concepts/Risk Management Objectives.md
created: 2026-10-10
---

## [F-001] Lender insurance requirement not in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Externally imposed obligations bullet, last sentence
- claim: Lenders and other contracting parties can impose insurance requirements of their own.
- evidence: Rejda & McNamara 12th ed. Ch.3 p.45 (PDF p.64) lists the third pre-loss objective as meeting legal obligations, with examples only of government safety rules, hazardous waste disposal, product labeling and workers compensation; Bonga Ch.2 p.2 ('externally imposed obligations') gives only the government safety-device example. Neither mentions lenders or other contracting parties. A web-search snippet attributes a creditor/collateral example to Rejda 13th ed., but that edition could not be read this run (O'Reilly 403). The claim is plausible but unsourced in anything read.
- source_rank: 3
- proposed_action: Cite a readable source for the creditor/contract example (Rejda 13th ed. Ch.3) or delete the sentence.
- applied: false
- fingerprint: e2eb10ebce5f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.44-45, 54-55 (PDF pp.63-64, 73-74): pre-/post-loss objectives, policy statement, benefits, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s09-01 Tables 5.1-5.2 value model (Doherty), sha256:fb6132c902587c0b9c1303ce5a29fa0cb6addb19de40716dfcbec5dee0779559 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s09-01-enterprise-risk-management-wit.html; COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), pp.4-5 benefits of ERM, sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf; Biniam G., Bonga University, Risk Management and Insurance Chapter Two (lecture notes, 2020), pp.2-3, 10, sha256:37410f48587eebe39188d15f5aa51af832d85f8179229edc0b3d9dd322165f01 — http://ndl.ethernet.edu.et/bitstream/123456789/79433/7/RISK-%20Ch@2.pdf
- note: The pre-/post-loss objectives (economy; reduction of anxiety; legal/externally imposed obligations; survival = resume at least partial operations in a reasonable time; continued operation; stability of earnings incl. EPS; continued growth; social responsibility) are confirmed in Rejda & McNamara 12th ed. Ch.3, an authoritative university risk-management text, replacing the writer's thismatter.com basis; Bonga notes agree. The value model follows Saylor s09-01; example recomputed (V 3,000 -> 3,200; 3,520 at multiple 11). COSO 2017 benefits list confirmed. One minor finding open (lender clause).
