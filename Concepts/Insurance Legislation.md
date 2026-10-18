---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9751942a93bd7d7a2a759eafe284a122881945e7ebdaa299e038e82ea498af6c
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Legislation.md
---

**Insurance Legislation** in Canada is the layered body of statutes, regulations and guidelines that governs insurers: the federal [[Insurance Companies Act]] for corporate existence and solvency, provincial *Insurance Acts* for the contract, licensing and [[Market Conduct Regulation|market conduct]], and subordinate regulations (such as Ontario Regulation 664) that set the operational detail.

> $$\text{Statute} \; \rightarrow \; \text{Regulation} \; \rightarrow \; \text{Guideline} \; \rightarrow \; \text{Bulletin}$$

- **Statutes** are passed by a legislature and change slowly; **regulations** are made by cabinet under authority delegated in the statute and change far more easily, which is why most auto insurance product design in Ontario lives in regulations rather than in the *Insurance Act* itself.
- **Guidelines** (OSFI's B- and E- series, [[MCT]]) and **bulletins** are not law but are supervisory expectations; an insurer that departs from them must be able to explain itself, and OSFI's practical enforcement tools — capital add-ons, heightened supervision, staging — do not require legislation.
- Provincial *Insurance Acts* contain **statutory conditions** deemed part of every policy of a given class. They cannot be contracted out of to the insured's detriment, which is why policy wordings across insurers look so alike.
- Legislation interacts constantly with the courts: a [[Court Case]] interpreting a statutory condition effectively rewrites its meaning until the legislature responds, and much of what candidates study as "the law" is statute *as construed*.
- The [[Canadian Institute of Actuaries (CIA)]]'s [[Standards of Practice]] are not legislation, but the [[Insurance Companies Act]] gives them force indirectly by requiring valuation "in accordance with [[Accepted Actuarial Practice|accepted actuarial practice]]."

![[Media/Figures/Insurance_Legislation.svg|340]]

> [!example]- Statute, Regulation or Guideline? {Example}
> Classify each instrument and say how hard it is to change.
>
> 1. The requirement that a federally regulated insurer appoint an actuary.
> 2. The [[Fault Determination Rules]] used to assign fault in an Ontario auto collision.
> 3. The formula for a P&C insurer's minimum capital required under the [[MCT]].
>
> > [!answer]-
> > 1. **Statute** — [[Insurance Companies Act]], s. 357. Changing it requires an Act of Parliament.
> > 2. **Regulation** — Ontario Regulation 664 under the Ontario *Insurance Act*. Cabinet can amend it without a legislative session, which is why the auto product changes so often.
> > 3. **Guideline** — OSFI's [[MCT]] Guideline. OSFI can revise it after consultation with no legislative step at all, which is why capital requirements evolve annually while the statute behind them has not changed in years.
> >
> > The practical lesson: the pace of change in Canadian insurance is set at the *regulation and guideline* layer, not the statute layer.
