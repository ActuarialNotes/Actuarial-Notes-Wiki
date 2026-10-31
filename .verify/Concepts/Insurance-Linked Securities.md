---
target: Concepts/Insurance-Linked Securities.md
created: 2026-10-10
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: in_review
- checks_run: Recomputed the sidecar example (premium 75M; returns 15.0%, -58.3%, -100% with 25M back to the sponsor) and the ILW example (50M / 0 / 0). Checked: cat bonds via SPRV, trust collateral, minimal credit risk, basis risk vs moral hazard, failed CBOT catastrophe options (GAO-02-941); triggers, uncorrelated returns, dual-trigger ILWs (SOA 2017 report); sidecars as SPVs through which reinsurers cede premium, tactical, post-Katrina (NAIC ILS topic page via WebFetch); ILS complement rather than replace reinsurance and spread to life (Cummins 2008 abstract, IDEAS/RePEc).
- note: Left in_review: the page's named source, Cummins (2008) RMIR 11(1), is paywalled. Not confirmed in any source read: collateralised reinsurance as described, catastrophe equity puts issuing preferred shares (IRMI defines the put only generally), catastrophe risk swaps between insurers, the swap form of an ILW, sidecars being quota shares of a year or two. Sources read: U.S. GAO, Catastrophe Insurance Risks: The Role of Risk-Linked Securities (GAO-02-941, 2002), pp.16–23, App. II p.36: SPRV and trust, basis risk, minimal credit risk, CBOT catastrophe options ceased 1999, sha256:14de86f282f00ef14b4382979e503f0a202138d57bc482017228da5d9a200d24 — https://www.gao.gov/assets/gao-02-941.pdf; Blanchet, Lam, Tang & Yuan, Mitigating Extreme Risks Through Securitization (SOA research report, Mar 2017), §§1.2–1.4 pp.2–7: ILS, CAT bond triggers, basis risk vs moral hazard, dual-trigger ILWs, sha256:674f956d74f5f5bae9ad9f92126ebf0a8c47693af78dfbf2bd12454f5d9b3d66 — https://www.soa.org/globalassets/assets/files/research/projects/2017-03-mitigating-risks-through-securitization.pdf

## [F-001] Claims not found in any readable source deleted or restated
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Sidecars, ILW, collateralised reinsurance and other instruments bullets; ILW example (c) and its closing note
- claim: The page described sidecars as quota shares for a year or two, quick and cheap; ILWs in swap form; collateralised reinsurance posting the full limit in a trust; catastrophe risk swaps between insurers; catastrophe equity puts issuing preferred shares; extreme-mortality deals; exchange-traded options failing for lack of liquidity.
- evidence: Cummins (2008), the page's source, is paywalled. Read this run: NAIC ILS page (sidecars are SPVs through which reinsurers cede premium, tactical, limited duration, popular after Katrina), Artemis (sidecars collateralised, can be established quickly), IRMI 'catastrophe equity put' (option to raise equity when losses exceed a level), GAO-02-941 App. II (CBOT catastrophe options from 1995, trading ceased 1999 due to lower-than-expected demand), SOA 2017 §1.4 (ILWs standardized, low transaction costs; with an indemnity trigger regulators treat the purchase as reinsurance), Cummins abstract (spread to life insurance and annuities). Nothing read supports the swap form, collateralised reinsurance as described, risk swaps between insurers or preferred shares.
- source_rank: 1
- proposed_action: Delete the unconfirmed claims and restate the rest to the sources (done on the lead's authorization).
- applied: true
- fingerprint: 17eb051a3318

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in this run on the lead's authorization: Delete the unconfirmed claims and restate the rest to the sources (done on the lead's authorization).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after the edits: cat bonds (SPRV, trust, Rule 144A placements, multi-year, triggers, minimal credit risk, basis risk vs moral hazard) against GAO-02-941 and SOA 2017; ILWs against SOA 2017 §1.4; sidecars against the NAIC ILS topic page and Artemis (both read via WebFetch this run, no file hash); catastrophe equity put against IRMI; CBOT options against GAO App. II; complement-not-replace and spread to life against the Cummins 2008 abstract (IDEAS/RePEc via WebFetch). Examples recomputed (75M; 15.0%, -58.3%, -100%; ILW 50M/0/0).
- sources_checked: U.S. GAO, Catastrophe Insurance Risks: The Role of Risk-Linked Securities (GAO-02-941, 2002), pp.16–23, App. II p.36: SPRV and trust, basis risk, minimal credit risk, CBOT catastrophe options ceased 1999, sha256:14de86f282f00ef14b4382979e503f0a202138d57bc482017228da5d9a200d24 — https://www.gao.gov/assets/gao-02-941.pdf; Blanchet, Lam, Tang & Yuan, Mitigating Extreme Risks Through Securitization (SOA research report, Mar 2017), §§1.2–1.4 pp.2–7: ILS, CAT bond triggers, basis risk vs moral hazard, dual-trigger ILWs, sha256:674f956d74f5f5bae9ad9f92126ebf0a8c47693af78dfbf2bd12454f5d9b3d66 — https://www.soa.org/globalassets/assets/files/research/projects/2017-03-mitigating-risks-through-securitization.pdf; IRMI glossary, 'catastrophe equity put', sha256:56057e1690baa552363dd829ca041e48efa39f4718e93e5b6a493d488a3605fc — https://www.irmi.com/term/insurance-definitions/catastrophe-equity-put
- note: Medium: GAO is a primary U.S. government report; the rest rank 3.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:40Z/c56a
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: whole page: cat bonds (SPRV, trust, Rule 144A, multiyear, triggers, minimal credit risk, basis risk vs moral hazard — GAO PDF pp.21, 23); sidecars (NAIC); ILWs and dual triggers, regulator treatment (SOA 2017 §1.4); new catastrophe-swap bullet against IAA Risk Book §11.3 (exchange of exposures, modelled exchange rate, peak exposures in different parts of the world, European windstorm for Japanese earthquake) and, for not prefunded / counterparty default risk / strong counterparty / diversification to both parties but none to a cat bond's issuer / trigger-dependent basis risk, the Spring 2013 Q13 model solutions and examiner's report (source of last resort; Cummins 2008, the assigned reading, is study-kit only, D22); catastrophe equity put (IRMI); CBOT options 1995-1999 (GAO PDF pp.21, 39); complement-not-replace and spread to life and annuities (Cummins abstract); both examples recomputed (sidecar premium 75M, returns 15.0%, -58.3%, -100% with 25M back to the sponsor; ILW 50M / 0 / 0); rule 10: the swap passage uses the IAA's example, not the 2013 Q13 stem (which gives no regions)
- sources_checked: International Actuarial Association, IAA Risk Book: Reinsurance (May 2023), §11.2 Catastrophe Bonds and §11.3 Catastrophe Swaps, printed pp.21-22 (PDF pp.26-27: exchange different exposures directly between two parties at a modelled 'exchange rate' acceptable to both, usually through accepted natural catastrophe models; two undertakings with 'peak' exposures in different parts of the world swap, e.g. x units of European windstorm for y units of Japanese earthquake within a given period), sha256:925844f73a5c5e99698a5e26b44452702123c186e60f9fcfb27a645ca8036780 — https://actuaries.org/app/uploads/2025/08/IAARiskBook_Reinsurance_2023-05.pdf; CAS Exam 9 Spring 2013 — exam, model solutions and examiner's report, Q13: model solutions PDF p.46 (CAT bond fully collateralised, no credit risk; swap only an agreement to pay, not prefunded, counterparty default risk; pairing uncorrelated risks on opposite sides of the world; low counterparty risk by a financially strong participant; basis risk depends on the trigger for both; a CAT bond gives the issuing company no diversification), examiner's report PDF p.95 (diversification of a CAT bond accrues to its investors, not the issuer; both instruments can limit basis risk by trigger selection), sha256:8cad072030f7457e0220739fd8af1f74ce23873efd78efdd1d99021816131e75 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam9_13-9.pdf; U.S. GAO, Catastrophe Insurance Risks: The Role of Risk-Linked Securities (GAO-02-941, 2002), PDF pp.8, 10 (fn.10: U.S. capital markets about $31 trillion), 21 (CBOT catastrophe options from 1995, trading ceased 1999 for lower-than-expected demand; nonindemnity triggers limit moral hazard and expose the sponsor to basis risk; multiyear pricing; Rule 144A placements), 23 (SPRV holds proceeds in a trust in Treasuries; sponsor has minimal credit risk because the bond is fully collateralized; basis risk), 39 (App. II), sha256:14de86f282f00ef14b4382979e503f0a202138d57bc482017228da5d9a200d24 — https://www.gao.gov/assets/gao-02-941.pdf (read this session through WebFetch's saved copy; same sha256); Blanchet, Lam, Tang & Yuan, Mitigating Extreme Risks Through Securitization (SOA research report, Mar 2017), PDF pp.6, 8 (indemnity triggers: moral hazard, disclosure, slow settlement; Lehman as total return swap counterparty in four of ten principal losses; §1.4 ILWs: dual triggers, standardized, low transaction costs, indemnity-triggered ILW treated as reinsurance by regulators), sha256:674f956d74f5f5bae9ad9f92126ebf0a8c47693af78dfbf2bd12454f5d9b3d66 — https://www.soa.org/globalassets/assets/files/research/projects/2017-03-mitigating-risks-through-securitization.pdf; IRMI glossary, 'catastrophe equity put' (option to raise additional equity capital if losses exceed a predetermined level), sha256:d086aee105beabe45b755f8ab70b368c8195593973328df13ab168418e345058 (this session's fetch) — https://www.irmi.com/term/insurance-definitions/catastrophe-equity-put; NAIC, Insurance Topics: Insurance-Linked Securities (read this session via WebFetch, no file hash): sidecars are special-purpose vehicles through which reinsurers cede premiums on a book of business, investors place funds in the vehicle, 'tactical instruments of limited duration during a hard market', 'became very popular in the aftermath of Hurricane Katrina' — https://content.naic.org/insurance-topics/insurance-linked-securities; Cummins (2008), CAT Bonds and Other Risk-Linked Securities, RMIR 11(1) pp.23-47 — abstract as IDEAS/RePEc prints it (read via WebFetch this session: not expected to replace reinsurance but to complement it; spreading to automobile insurance, life insurance and annuities) — https://ideas.repec.org/a/bla/rmgtin/v11y2008i1p23-47.html
- note: Verified at medium (D22/D27). Rule 6: this whole-page check is also the re-check owed to CAS DISC-RM (ready), SOA GI-201 and CIA F2FIE.
