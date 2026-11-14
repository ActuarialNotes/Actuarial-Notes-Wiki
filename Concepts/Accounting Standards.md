---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e6c4ef7a74e19e49f7cc7ad605ac6e8b741eb0af6a3058b62aa3906b4391f608
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶20, ¶27, ¶30-38, ¶54 (PDF pp.35-41); SSAP No. 1 ¶7 (PDF p.48); SSAP No. 41 ¶3-6 (PDF pp.266-267); SSAP No. 62R ¶31, ¶77, ¶85 (PDF pp.441-442, 450-451); SSAP No. 65 ¶10-15 (PDF pp.493-494); SSAP No. 6 ¶9 (PDF p.83), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.1 pp.8-10; p.22; pp.66-67; Ch.22 pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶37, ¶59(a), ¶78, ¶82, B65(a), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036"
    - "PwC Viewpoint, Loans and investments guide §7.8 'Application of CECL to insurance receivables' (fetched 2026-10-10), sha256:8b9973dbc73b4470cf6b0094f5db54cea781bf3d7ba1c0473b79c139f5a92a23 — https://viewpoint.pwc.com/dt/us/en/pwc/accounting_guides/loans_and_investment/loans_and_investment_US/chapter_7_current_ex_US/7_8-Application-of-CECL-to-insurance-receivables.html"
    - "SEC EDGAR, CIK 876437 10-Q (2020) note on ASC 326 and premium receivable (fetched 2026-10-10), sha256:6399a4ac9c4c86512fd70472ca5e708e8eea84009c3506a5460faec2f3dc0353 — https://www.sec.gov/Archives/edgar/data/876437/000087643720000031/R9.htm"
    - "SEC EDGAR, CIK 1401521 filing (2014) note on statutory vs GAAP differences, surplus notes (fetched 2026-10-10), sha256:2b6c27d739b4b61513d3f3c1300fb55a5661fb23009771aac560c0de293d30f9 — https://www.sec.gov/Archives/edgar/data/1401521/000140152114000125/R13.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accounting Standards.md
---

An **Accounting Standard** is an authoritative rule that decides how transactions are recognised, measured, presented and disclosed in financial statements. A U.S. property-casualty insurer reports under several sets at once, [[Statutory Accounting Principles|statutory accounting (SAP)]] and [[GAAP]] among them, each built for the user of its [[Accounting Frameworks|accounting framework]].

| Standards | Set by |
| --- | --- |
| Statutory accounting (SAP) | The NAIC, through the Statements of Statutory Accounting Principles (SSAPs) in its *Accounting Practices and Procedures Manual*, with each state's law the final authority |
| GAAP | The FASB's Accounting Standards Codification, enforced for public companies by the SEC |
| [[IFRS]] | The IASB |
| Tax basis | The Internal Revenue Code, which for a property-casualty insurer starts from the annual statement ([[Insurance Income Tax]]) |

Which source governs within each set is on [[Accounting Rule Hierarchy]]. The actuary's own [[Actuarial Standards of Practice]] sit alongside these: they govern how the actuary estimates, not how the entity books.

## Recognition, measurement and presentation

Whether an item appears at all (recognition) is a different question from the amount it appears at (measurement) and from where it is shown (presentation). The differences between the standards fall into these three kinds, and each traces to the standard's objective.

SAP's primary users are regulators judging solvency, and the Preamble to the Manual rests it on three concepts:

1. **Conservatism:** surplus should not be overstated, and valuation should damp swings over economic cycles.
2. **Recognition:** only assets available to pay policyholder obligations are admitted; the rest are charged against surplus.
3. **Consistency:** statements are comparable across companies and over time.

GAAP serves investors in a going concern, so it matches costs to the revenue they earn.

> [!example]- How do the standards differ on each of these items, and which kind of difference is it? {Example}
> 1. Premiums receivable more than 90 days past due.
> 2. Commissions paid on policies with ten months of coverage remaining.
> 3. Reinsurance recoverable on unpaid claims.
> 4. Unpaid claims to be paid over five years.
> 5. $\$50$M of surplus notes.
>
> > [!answer]-
> > - The overdue premium is a recognition difference. SAP nonadmits the balance, because it is not reliably available to pay claims, and charges it to surplus. GAAP carries it net of an allowance for credit losses, and IFRS 17 folds it into the measurement of the insurance contract itself.
> > - The commissions are a recognition (timing) difference. SAP expenses acquisition costs as incurred; GAAP defers them as DAC; IFRS 17 nets them in the liability for remaining coverage or, for one-year coverage, may expense them.
> > - The recoverable is a presentation difference. SAP nets it against the loss reserve, with a provision for reinsurance where it is unsecured or overdue. GAAP and IFRS 17 gross it up as an asset.
> > - The unpaid claims are a measurement difference. SAP and GAAP carry the undiscounted estimate. IFRS 17 discounts and adds a risk adjustment, and the tax return discounts at IRS-prescribed rates and patterns ([[Loss Reserve Discounting]]).
> > - The surplus notes are a classification difference. SAP counts them as surplus, because interest and principal need the regulator's approval, so they stand behind policyholders like equity. GAAP reports them as debt.
> > - The statutory treatments trace to recognition and conservatism, and the GAAP ones to matching revenue and expense for an investor.

## Prescribed and permitted practices

New GAAP guidance becomes statutory only when the NAIC adopts it or adopts it with modification. A state may **prescribe** a departure from the Manual for all its domestic insurers or **permit** one for a single insurer. The notes must describe the departure and quantify its effect on surplus and income against the NAIC basis.

> [!example]- What must this insurer disclose, and how should an analyst treat the $\$30$M? {Example}
> A domiciliary regulator permits an insurer to discount its non-tabular workers compensation reserves, which the NAIC Manual does not allow. The practice adds $\$30$M to surplus, which is $\$280$M on the permitted basis.
>
> > [!answer]-
> > - The statements are filed on the state basis.
> > - The notes must describe the practice and reconcile net income and surplus to the NAIC basis, here $280 - 30 = \$250$M of surplus.
> > - They must also state whether risk-based capital would have triggered regulatory action without the practice.
> > - The discounting disclosures give the rate used and the non-tabular discount by line.
> > - An analyst comparing insurers should restate to the NAIC basis, $\$250$M, because surplus that exists only by one regulator's permission is not under the common standard.

## Principles versus rules

[[IFRS 17]] measures with entity-specific judgements, such as a risk adjustment equal to the compensation the entity requires for bearing non-financial risk. SAP relies on prescribed tests, such as admissibility and the [[Schedule F]] provision for reinsurance. Odomirok frames the trade-off: rules-based guidance may be easier to understand and to audit, while a principles-based approach is generally more adaptable to changes in the business environment.

> [!trap] Treating a permitted practice as the standard
> A permitted practice applies to one insurer and changes its surplus, not the standard. Compare insurers on the NAIC basis, using the effect the notes quantify.
