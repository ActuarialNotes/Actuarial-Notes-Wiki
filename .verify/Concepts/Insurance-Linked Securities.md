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
