---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:b0c2bfccfdf975913fa7edbc6b166aff25573eb20aeb5aa82dd58863375b1c16
  sources:
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶20, ¶27, ¶30-38, ¶54 (PDF pp.35-41); SSAP No. 1 ¶7 (PDF p.48); SSAP No. 41 ¶3-6 (PDF pp.266-267); SSAP No. 62R ¶31, ¶77, ¶85 (PDF pp.441-442, 450-451); SSAP No. 65 ¶10-15 (PDF pp.493-494); SSAP No. 6 ¶9 (PDF p.83), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "Odomirok, McFarlane, Kennedy & Brenden, Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2014), Ch.1 pp.8-10; p.22; pp.66-67; Ch.22 pp.302-306, sha256:eee4cf26c25cc24d4802029ecc44bbc9b419f2bfa9d1859e6e808884a0ec04e6 — https://www.casact.org/sites/default/files/database/studynotes_odomirok-etal_financial-reportingv4.pdf"
    - "IFRS 17 Insurance Contracts as adopted by Commission Regulation (EU) 2021/2036 (OJ L 416, 23.11.2021), ¶37, ¶59(a), ¶78, ¶82, B65(a), sha256:c3fd00c0bff726d1886fffc0404815217cba23a84d155d681cfbf9fa631ec315 — https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32021R2036"
    - "PwC Viewpoint, Loans and investments guide §7.8 'Application of CECL to insurance receivables' (fetched 2026-10-10), sha256:8b9973dbc73b4470cf6b0094f5db54cea781bf3d7ba1c0473b79c139f5a92a23 — https://viewpoint.pwc.com/dt/us/en/pwc/accounting_guides/loans_and_investment/loans_and_investment_US/chapter_7_current_ex_US/7_8-Application-of-CECL-to-insurance-receivables.html"
    - "SEC EDGAR, CIK 876437 10-Q (2020) note on ASC 326 and premium receivable (fetched 2026-10-10), sha256:6399a4ac9c4c86512fd70472ca5e708e8eea84009c3506a5460faec2f3dc0353 — https://www.sec.gov/Archives/edgar/data/876437/000087643720000031/R9.htm"
    - "SEC EDGAR, CIK 1401521 filing (2014) note on statutory vs GAAP differences, surplus notes (fetched 2026-10-10), sha256:2b6c27d739b4b61513d3f3c1300fb55a5661fb23009771aac560c0de293d30f9 — https://www.sec.gov/Archives/edgar/data/1401521/000140152114000125/R13.htm"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Accounting Standards.md
---

**Accounting Standards** are the authoritative rules that decide how transactions are recognised, measured, presented and disclosed in financial statements. A U.S. P&C insurer reports under several at once — [[Statutory Accounting Principles|statutory accounting (SAP)]] for regulators, [[GAAP]] for investors if it is SEC-registered, a tax basis for the IRS, and sometimes [[IFRS]] for a foreign parent — because each is built for a different user asking a different question.

> $$\begin{aligned} \text{State SAP} = {} & \text{NAIC AP\&P Manual} \\ & \pm \text{Prescribed or permitted practices} \end{aligned}$$

- **Who sets them.** SAP: the NAIC, through the Statements of Statutory Accounting Principles (SSAPs) in its *Accounting Practices and Procedures Manual*, with each state's law the final authority. GAAP: FASB's Accounting Standards Codification, enforced for public companies by the SEC. IFRS: the IASB. Tax: the Internal Revenue Code, which for a P&C insurer starts from the annual statement ([[Insurance Income Tax]]).
- **Objectives explain every difference.** SAP's primary users are regulators judging solvency, and the Preamble to the Manual rests it on three concepts: **conservatism** (surplus should not be overstated, and valuation should damp swings over economic cycles), **recognition** (only assets available to pay policyholder obligations are admitted; the rest are charged against surplus) and **consistency** (comparable across companies and over time). GAAP serves investors in a going concern, so it matches costs to the revenue they earn.
- **How GAAP enters SAP.** New GAAP guidance becomes statutory only when the NAIC adopts it or adopts it with modification. A state may **prescribe** a departure for all its domestic insurers or **permit** one for a single insurer; the notes must describe it and quantify its effect on surplus and income.
- **Principles versus rules.** IFRS 17 is principles-based (an entity-specific risk adjustment, judgement on discount rates); SAP leans rules-based (admissibility tests, the [[Schedule F]] provision formula), which buys comparability for regulators at the cost of economic realism.
- **Where this sits on the DISC-IA syllabus.** The concepts behind these standards are on [[Qualitative Characteristics of Accounting Information]], the frameworks and their users on [[Accounting Frameworks]], and which source of guidance governs within each framework on [[Accounting Rule Hierarchy]].
- The actuary's own [[Actuarial Standards of Practice]] sit alongside these: they govern how the actuary estimates, not how the entity books. See [[Financial Statements]] for how the statements themselves differ.

> [!example]- Recognition, Measurement or Presentation? {Example}
> For each item, say how the regimes differ and which principle drives the difference:
>
> 1. Premiums receivable more than 90 days past due.
> 2. Commissions paid on policies with ten months of coverage remaining.
> 3. Reinsurance recoverable on unpaid claims.
> 4. Unpaid claims to be paid over five years.
> 5. $\$50$M of surplus notes.
>
> > [!answer]-
> > 1. **Recognition.** SAP nonadmits the balance — it is not reliably available to pay claims — and charges it to surplus; GAAP carries it net of an allowance for credit losses, and IFRS 17 folds it into the measurement of the insurance contract itself.
> > 2. **Recognition (timing).** SAP expenses acquisition costs as incurred; GAAP defers them as DAC; IFRS 17 nets them in the liability for remaining coverage or, for one-year coverage, may expense them.
> > 3. **Presentation.** SAP nets it against the loss reserve, with a provision for reinsurance where it is unsecured or overdue; GAAP and IFRS 17 gross it up as an asset.
> > 4. **Measurement.** SAP and GAAP carry the undiscounted estimate; IFRS 17 discounts and adds a risk adjustment; the tax return discounts at IRS-prescribed rates and patterns ([[Loss Reserve Discounting]]).
> > 5. **Classification.** SAP counts surplus notes as surplus — interest and principal need the regulator's approval, so they stand behind policyholders like equity; GAAP reports them as debt.
> >
> > The pattern: the statutory differences trace to recognition and conservatism — what a regulator could count on if the company had to be wound up — while the GAAP ones trace to matching revenue and expense for an investor.

> [!example]- Reading a Permitted Practice {Example}
> A domiciliary regulator permits an insurer to discount its non-tabular workers compensation reserves, which the NAIC Manual does not allow. The practice adds $\$30$M to surplus, which is $\$280$M on the permitted basis.
>
> What must the insurer disclose, and how should an analyst treat the $\$30$M?
>
> > [!answer]-
> > The statements are filed on the state basis, but the notes must describe the practice, reconcile net income and surplus to the NAIC basis — here $280 - 30 = \$250$M of surplus — and state whether risk-based capital would have triggered regulatory action without it. The discounting disclosures give the rate used and the non-tabular discount by line.
> >
> > An analyst comparing insurers should restate to the NAIC basis. Surplus that exists only by one regulator's permission is not the same quality as surplus under the common standard, and it is exactly the kind of difference [[Financial Health|financial health]] reviews are meant to surface.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The objective on selected accounting concepts asks how the statutory concepts of conservatism, consistency and recognition, and the distinction between recognition, measurement and presentation, explain the way an insurer accounts for an item. Expect an item such as overdue premium, acquisition costs or reinsurance recoverables and a question asking how SAP treats it and why.
> - **Exams 6C and 6U:** The comparisons above, between SAP, GAAP, tax and IFRS 17, return in the financial reporting objectives.

> [!warning]- Exam traps
> - **Recognition is not measurement:** Whether an item appears at all (recognition) is a different question from the amount it appears at (measurement) and from where it is shown (presentation).
> - **Permitted practices change surplus, not the standard:** A state's permitted practice applies to one insurer, and the notes must quantify its effect against the NAIC basis.

