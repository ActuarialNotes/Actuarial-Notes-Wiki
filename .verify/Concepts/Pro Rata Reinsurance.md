---
target: Concepts/Pro Rata Reinsurance.md
created: 2026-10-10
---

## [F-001] Unsourced claim on how a line guide sets retentions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Surplus share bullet, last sentence
- claim: 'A line guide can set different retentions by class, so a more hazardous class is retained at a lower amount.'
- evidence: NAMIC Reinsurance Overview p.12 says only 'Line Guide can set the retention by class'; Clark §1A and IRMI 'surplus share' do not mention line guides. The second clause (more hazardous class, lower retention) is in no source read this run.
- source_rank: 3
- proposed_action: Cite a source for the hazard-to-retention direction, or cut the clause after 'by class'.
- applied: false
- fingerprint: 6d07ce972868

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Quota share and surplus share mechanics, ceding commission for underwriting expenses, 'not excess insurance', fixed/variable QS on excess business, sliding scale terms (30% provisional; 25% at 65%; 1:1 to 35% at 55%; 0.5:1 to 45% at 35%) and profit commission against Clark §1A-1B; surplus formula reproduces Clark's table (e.g. 1,000,000 value, 100,000 line, 4 lines -> 40%); functions, 100% QS withdrawal, line guide, commission as price against NAMIC; definitions against IRMI. Recomputed: s_A=0, s_B=66.67% (200,000 ceded), s_C=50% (200,000 ceded; cedant net 1,000,000 = half the value; XS comparison 50,000); QS ceded 12,000,000, commission 3,840,000, ceded losses 7,440,000, P/S 3.33 -> 2.33.
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf; IRMI glossary, 'surplus share', sha256:ed71737b7b895e79a3c5a11fdd70d35675c6d78baf97a62dd3ae544c84f66d13 — https://www.irmi.com/term/insurance-definitions/surplus-share; IRMI glossary, 'ceding commission', sha256:88a3389009b6868cb1b320484faec2ea1d2e744f5e74e14631b2cebe31600323 — https://www.irmi.com/term/insurance-definitions/ceding-commission; IRMI glossary, 'pro rata reinsurance', sha256:87029130ba567ffc15e84988e1569b5582477b2cb4c4f27db17e5717c4a85c6f — https://www.irmi.com/term/insurance-definitions/pro-rata-reinsurance
- note: Medium: Clark is rank 2 but the functions rest on NAMIC (rank 3). One minor finding open.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Clause cut after 'by class', matching NAMIC p.12 ('Line Guide can set the retention by class').

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the one-clause cut; all else as checked earlier this run (examples recomputed).
- sources_checked: Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf; Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf; IRMI glossary, 'surplus share', sha256:ed71737b7b895e79a3c5a11fdd70d35675c6d78baf97a62dd3ae544c84f66d13 — https://www.irmi.com/term/insurance-definitions/surplus-share; IRMI glossary, 'ceding commission', sha256:88a3389009b6868cb1b320484faec2ea1d2e744f5e74e14631b2cebe31600323 — https://www.irmi.com/term/insurance-definitions/ceding-commission; IRMI glossary, 'pro rata reinsurance', sha256:87029130ba567ffc15e84988e1569b5582477b2cb4c4f27db17e5717c4a85c6f — https://www.irmi.com/term/insurance-definitions/pro-rata-reinsurance
- note: Medium.
