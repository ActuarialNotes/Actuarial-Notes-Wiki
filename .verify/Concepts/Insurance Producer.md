---
target: Concepts/Insurance Producer.md
created: 2026-10-10
---

## [F-001] Producer function list only partly sourced
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- severity: minor
- status: open
- locus: Functions of producers bullet; Licensing bullet
- claim: Producers prospect, review exposures, sell, issue policies, collect premium, give service, help with and sometimes settle claims, and consult; producers must keep licenses current through continuing education.
- evidence: Saylor s11-01 supports binding, delivering policies, premium collection by some agents and brokers' risk-management surveys and claims services; Rejda Ch.8 p.145 that states license agents and brokers. Prospecting as a listed function, settling small claims and continuing-education requirements are not in any source read (DISC-RM 7.e is taught from The Institutes' text).
- source_rank: 3
- proposed_action: Cite a source for the full function list and the CE requirement.
- applied: false
- fingerprint: b90d43cd1724

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: every definition, list, rule and attribution checked against the sources listed; every worked example recomputed; all [[links]] resolve; U.S. framing reviewed
- sources_checked: Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 agents vs brokers; binding; x-date; half the states, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.93-99; Ch.8 p.145 (licensing of agents and brokers), sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; IRMI Glossary, "producer", definition, sha256:ab86f978b17bbaa40dcb8086817cd5a3fa812fc527a86b508f7d5412ecdeb1ea — https://www.irmi.com/term/insurance-definitions/producer; IRMI Glossary, "contingent commission", definition, sha256:5f3bd9ede066a8144c57ce4b896a8611d06972318b0a2c2cf56f740e64cb4ad1 — https://www.irmi.com/term/insurance-definitions/contingent-commission
- note: Agent/broker distinction, binding authority, expirations by system, producer as synonym for agent/broker, contingent commission based on profitability of placed business, state licensing confirmed. Examples recomputed (LR 50%; 300,000 + 47,500 = 347,500, 17.4%). Minor finding open on the function list.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Restated the functions bullet to Rejda Ch.6 p.108 (producers) and Saylor s11-01 (agent binds, sends underwriting information, delivers the policy, may collect premium; brokerage firms provide risk management surveys and claim services to self-insurers); restated licensing to Saylor s12-02 (licensing of agents, brokers and adjusters; commissioner grants, denies, suspends; unfair practices and misappropriation can cost a license) and Rejda Ch.8 p.146; deleted the examination, continuing-education and per-state producer licence claims.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv03
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: re-check after this run's authorized edits: every changed sentence checked against the sources listed; links resolve; earlier checks of unchanged content carried forward
- sources_checked: Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 agents vs brokers; binding; x-date, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s12-02 licensing; unfair practices; misappropriation, sha256:d6b9f53c3fd3c106c652f9ef8b46b21ee9199f1fda6e8951f64e4cf4b09bb021 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-02-insurance-regulation.html; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.93-99; Ch.6 p.108; Ch.8 pp.145-146, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; IRMI Glossary, "producer", definition, sha256:ab86f978b17bbaa40dcb8086817cd5a3fa812fc527a86b508f7d5412ecdeb1ea — https://www.irmi.com/term/insurance-definitions/producer; IRMI Glossary, "contingent commission", definition, sha256:5f3bd9ede066a8144c57ce4b896a8611d06972318b0a2c2cf56f740e64cb4ad1 — https://www.irmi.com/term/insurance-definitions/contingent-commission
- note: Re-verified after the edit that closed F-001.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: g8-discrm-chk
- date: 2026-10-30
- status_set: verified
- confidence: medium
- checks_run: delta check after commit 98828b63: the two sentences added to the Functions of producers bullet checked clause by clause against NAIC pp.25-27, IRMI prospect and hold harmless agreement, RIEA pp.3-4 and Saylor s11-01 (re-read this run, hashes match); Wikipedia 'Insurance broker' (sha256:afaf14fe…) read as corroboration only, not relied on; rest of page re-read, unchanged since C-002; no question wording or numbers on the page (rule 10)
- sources_checked: NAIC, A Regulator's Introduction to the Insurance Industry (2005), §C Production and Distribution, printed pp.25-27 incl. fn 7 (PDF pp.39-41): producer contacts or is contacted by potential buyers, assists them in determining insurance needs and selecting insurer and coverages, may bind, assists in filing and adjusting claims; agents may advise consumers; brokers provide risk-management advice, sha256:7d6e4fce110253b59c6c38f3abfa4e38c561d4f521c24fdc65e0884718e0f264 — https://content.naic.org/sites/default/files/inline-files/prod_serv_marketreg_rii_zb.pdf; IRMI Glossary, "prospect", definition (a potential buyer of insurance), sha256:ba3067383315c28ee5ccfb0286327ec51b2dce3095962d2a19723ad253ae7217 — https://www.irmi.com/term/insurance-definitions/prospect; IRMI Glossary, "hold harmless agreement", definition (one contracting party responds to the other's legal liabilities), sha256:0fd9ef7429c6ef8f70faf6da387394ec48b8df30513beffb85d5ee0b4ac51a70 — https://www.irmi.com/term/insurance-definitions/hold-harmless-agreement; Risk & Insurance Education Alliance, Risk Identification (ELR course reading), pp.3-4: physical inspections, which agents can provide, may find unreported hazards and assets; non-insurance contract review of leases and hold-harmless or indemnification agreements reveals exposures, sha256:1592f41132ab2c9854a94b3de7c237a84442678d065a545621991fda4d6148cc — https://riskeducation.org/pub/media/elr/Risk-Identification.pdf; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 agents vs brokers; binding; x-date; brokerage firms' risk management surveys, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html; Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s12-02 licensing; unfair practices; misappropriation, sha256:d6b9f53c3fd3c106c652f9ef8b46b21ee9199f1fda6e8951f64e4cf4b09bb021 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-02-insurance-regulation.html; Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.93-99; Ch.6 p.108; Ch.8 pp.145-146, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0; IRMI Glossary, "producer", definition, sha256:ab86f978b17bbaa40dcb8086817cd5a3fa812fc527a86b508f7d5412ecdeb1ea — https://www.irmi.com/term/insurance-definitions/producer; IRMI Glossary, "contingent commission", definition, sha256:5f3bd9ede066a8144c57ce4b896a8611d06972318b0a2c2cf56f740e64cb4ad1 — https://www.irmi.com/term/insurance-definitions/contingent-commission
- note: Added text confirmed. Prospecting, which F-001's resolution deleted as unsourced, is now supported: NAIC p.25 'a producer will contact or be contacted by potential insurance buyers and assist buyers in determining their insurance needs and selecting an insurer and the appropriate coverages', with IRMI defining a prospect as a potential buyer of insurance; binding 'under certain conditions' and 'assisting in the filing and adjusting of claims' are NAIC pp.25-26. Consultant role: NAIC fn 7 (agents may advise consumers) and p.27 (brokers provide risk-management advice), Saylor s11-01 (risk management surveys). Exposure finding: RIEA p.3 (inspections, which agents can provide, 'may be able to find unreported hazards and assets') and p.4 (non-insurance contract review of leases, hold-harmless or indemnification agreements reveals exposures); IRMI hold harmless agreement supports 'liability taken on by contract'. 'Reviewing loss exposures' as a general producer function is a fair synthesis of these rather than one source's words, hence medium. Rejda, Saylor s12-02 and the two IRMI entries are carried forward from C-002 for the unchanged lines (not re-read this run; Rejda is a commercial text).
