---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c83cf7a2e298228516ed76622de68c144d759133258c645256b7a3e174fc1bd0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accounting Standards.md
---

**Accounting Standards** are the authoritative rules that decide how transactions are recognised, measured, presented and disclosed in financial statements. A U.S. P&C insurer reports under several at once — [[Statutory Accounting Principles|statutory accounting (SAP)]] for regulators, [[GAAP]] for investors if it is SEC-registered, a tax basis for the IRS, and sometimes [[IFRS]] for a foreign parent — because each is built for a different user asking a different question.

> $$\begin{aligned} \text{State SAP} = {} & \text{NAIC AP\&P Manual} \\ & \pm \text{Prescribed or permitted practices} \end{aligned}$$

- **Who sets them.** SAP: the NAIC, through the Statements of Statutory Accounting Principles (SSAPs) in its *Accounting Practices and Procedures Manual*, with each state's law the final authority. GAAP: FASB's Accounting Standards Codification, enforced for public companies by the SEC. IFRS: the IASB. Tax: the Internal Revenue Code, which for a P&C insurer starts from the annual statement ([[Insurance Income Tax]]).
- **Objectives explain every difference.** SAP's primary users are regulators judging solvency, and the Preamble to the Manual rests it on three concepts: **conservatism** (surplus should not be overstated, and valuation should damp swings over economic cycles), **recognition** (only assets available to pay policyholder obligations are admitted; the rest are charged against surplus) and **consistency** (comparable across companies and over time). GAAP serves investors in a going concern, so it matches costs to the revenue they earn.
- **How GAAP enters SAP.** New GAAP guidance becomes statutory only when the NAIC adopts it, adopts it with modification, or rejects it. A state may **prescribe** a departure for all its domestic insurers or **permit** one for a single insurer; the notes must describe it and quantify its effect on surplus and income.
- **Principles versus rules.** IFRS 17 is principles-based (an entity-specific risk adjustment, judgement on discount rates); SAP leans rules-based (admissibility tests, the [[Schedule F]] provision formula), which buys comparability for regulators at the cost of economic realism.
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
