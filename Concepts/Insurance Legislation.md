---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:d5dc70b859f9f7ab5ee8d4dec326d59acf8e437552b4a4a57ac383ced005d573
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Legislation.md
---

![[Media/Figures/Insurance_Legislation.svg|340]]

**Insurance Legislation** in Canada is the layered body of statutes, regulations and guidelines that governs insurers. The federal [[Insurance Companies Act]] governs their corporate existence and solvency, provincial *Insurance Acts* govern the contract, licensing and [[Market Conduct Regulation|market conduct]], and subordinate regulations, such as Ontario Regulation 664, set the operational detail.

The layers, from the hardest to change to the easiest, are:

1. **Statutes**, passed by a legislature, which change slowly.
2. **Regulations**, made by cabinet under authority the statute delegates, which change far more easily.
3. **Guidelines**, such as OSFI's B- and E- series and the [[MCT]], which are supervisory expectations and not law.
4. **Bulletins**, which are also supervisory expectations and not law.

Because regulations change more easily, most auto insurance product design in Ontario lives in regulations rather than in the *Insurance Act* itself. An insurer that departs from a guideline must be able to explain itself, and OSFI's practical enforcement tools, such as capital add-ons, heightened supervision and staging, do not require legislation.

> [!example]- Is each of these instruments a statute, a regulation or a guideline, and how hard is it to change? {Example}
> 1. The requirement that a federally regulated insurer appoint an actuary.
> 2. The [[Fault Determination Rules]] used to assign fault in an Ontario auto collision.
> 3. The formula for a P&C insurer's minimum capital required under the [[MCT]].
>
> > [!answer]-
> > - The requirement to appoint an actuary is in a statute, the [[Insurance Companies Act]], so changing it requires an Act of Parliament.
> > - The Fault Determination Rules are a regulation, Ontario Regulation 664 under the Ontario *Insurance Act*, so cabinet can amend them without a legislative session.
> > - The minimum capital formula is in a guideline, OSFI's MCT Guideline, so OSFI can revise it after consultation with no legislative step at all.
> > - The pace of change in Canadian insurance is therefore set at the regulation and guideline layers.

## Statutory conditions

Provincial *Insurance Acts* contain statutory conditions that are deemed part of every policy of a given class. They cannot be contracted out of to the insured's detriment, which is why policy wordings across insurers look so alike.

## Legislation and the courts

A [[Court Case|court case]] interpreting a statutory condition effectively rewrites its meaning until the legislature responds. Much of what candidates study as the law is a statute as the courts have construed it.

## Standards of practice

The [[Canadian Institute of Actuaries (CIA)]]'s [[Standards of Practice]] are not legislation. The [[Insurance Companies Act]] gives them force indirectly by requiring valuation in accordance with [[Accepted Actuarial Practice|accepted actuarial practice]].

> [!trap] Treating a guideline as law
> OSFI's guidelines are supervisory expectations, not statutes or regulations. They still bind in practice, because OSFI's enforcement tools, such as capital add-ons and heightened supervision, need no legislation.
