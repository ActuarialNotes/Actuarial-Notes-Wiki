---
aliases:
  - International Reinsurance Regulatory Framework
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:daf595e32a994ede7511b1d248963fa2a53656633eefc83b6a88c947e6915fd4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Offshore Reinsurance.md
---
**Offshore Reinsurance** is the cession of life and annuity business by a U.S. or Canadian insurer to a reinsurer domiciled in another jurisdiction, chiefly Bermuda and, to a lesser extent, the Cayman Islands. Most of the volume is asset-intensive business, such as fixed and indexed annuities, ceded under coinsurance or funds withheld, often to an affiliate or to a [[Private Equity-Backed Insurer|private equity-backed reinsurer]]. It is governed by the international reinsurance regulatory framework: the cedant's [[Credit for Reinsurance|credit for reinsurance]] rules, the reinsurer's home supervisor, and the agreements that let one regime rely on another.

> $$\text{TAR} = V + K$$

> $$\text{Release} = \text{TAR}_{\text{home}} - \text{TAR}_{\text{offshore}}$$

> $$\text{Credit} = \min\left(V_{\text{ceded}},\ C\right)$$

- **Symbols:** $V$ is the reserve, or technical provisions, a regime requires and $K$ the capital it requires, so $\text{TAR}$ is the total asset requirement for the same liabilities. $\text{Release}$ is what the group frees by holding the business under the offshore regime instead. $V_{\text{ceded}}$ is the reserve the cedant cedes and $C$ is the acceptable collateral securing it, where the reinsurer has to post any.
- **Why offshore:** U.S. statutory reserves for annuities are largely formulaic and discount at prescribed rates, while Bermuda's economic balance sheet (EBS) values liabilities on a best-estimate basis. Under its scenario-based approach, the discount rate reflects the yield on the assets actually held. A portfolio with higher-yielding assets therefore supports a smaller liability offshore. The reinsurer also gains investment flexibility and capital charges that differ from [[Risk-Based Capital|RBC]].
- **Bermuda supervision:** The Bermuda Monetary Authority (BMA) licenses commercial long-term insurers in classes, the largest being Class E. It sets capital through the Bermuda Solvency Capital Requirement (BSCR), with a target capital level above the enhanced capital requirement, and requires a commercial insurer's own risk and solvency assessment. Since 2024 it has added tighter rules on the scenario-based approach, on illiquid and complex assets, and on liquidity.
- **U.S. credit for reinsurance:** Credit follows the NAIC Credit for Reinsurance Model Law. A reinsurer that is licensed or accredited in the cedant's state gets full credit, a certified reinsurer posts reduced collateral, and one domiciled in a reciprocal jurisdiction that meets the model's capital and solvency standards posts none. Bermuda is among the jurisdictions the NAIC treats as reciprocal, so a qualifying Bermuda reinsurer can give full credit without collateral, although cedants often still require a trust or funds withheld for their own protection.
- **Canada:** Under [[OSFI]]'s LICAT and Guideline B-3, a cession to an [[Unregistered Reinsurance|unregistered reinsurer]] earns capital credit only for collateral held in Canada under a reinsurance security agreement. OSFI also expects every cedant to assess the reinsurer and its home regime, whatever the collateral.
- **Solvency II equivalence:** The European Union can find a third country's regime equivalent to [[Solvency II]] for reinsurance, group solvency and group supervision. Bermuda's commercial regime holds full equivalence, so an EU cedant may treat a Bermuda reinsurer like an EU reinsurer and cannot require collateral from it.
- **Collateral structures:** Security comes from funds withheld or modco, where the cedant keeps the assets, or from a trust for the cedant's benefit funded at a stated percentage of the ceded reserve. Letters of credit are the third option. The terms usually fix the eligible assets and the recapture triggers.
- **Regulator concerns:** U.S. regulators and the American Academy of Actuaries have pointed to the fall in total asset requirement on the same liabilities, to concentrations in private credit and structured assets, and to affiliated transactions and their fees. They also cite recapture risk, since the cedant could get the liabilities back with assets worth less than the U.S. reserve. The NAIC's response includes requiring asset adequacy testing of asset-intensive business ceded under reinsurance, and more scrutiny of affiliated and offshore deals.

> [!example]- Total Asset Requirement Onshore and in Bermuda {Example}
> A U.S. insurer holds a fixed annuity block with a statutory reserve of \$1,000 million and required capital of \$50 million. A Bermuda reinsurer would hold technical provisions of \$940 million on the EBS and target capital of \$70 million on the same block. The figures are illustrative. Find each total asset requirement and the release from ceding the block offshore.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{TAR}_{\text{home}} &= 1{,}000 + 50 \\
> > &= 1{,}050 \\
> > \text{TAR}_{\text{offshore}} &= 940 + 70 \\
> > &= 1{,}010 \\
> > \text{Release} &= 1{,}050 - 1{,}010 \\
> > &= 40
> > \end{align*}
> > $$
> > The offshore reinsurer holds more capital but a smaller liability, so the group needs \$40 million less in assets on the same block. That difference, not lower capital, is what regulators mean when they warn about a basis difference.

> [!example]- Cedant's Reserve Credit With and Without Full Credit {Example}
> The insurer in the previous example coinsures the whole block to the Bermuda reinsurer. Find the credit and the cedant's net reserve if (a) the reinsurer qualifies under a reciprocal jurisdiction and posts no collateral, (b) it is unauthorized and funds a trust for the cedant with \$940 million, its EBS technical provisions, or (c) the deal is written as funds withheld, so the cedant keeps \$1,000 million of assets.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Credit}_{(a)} &= 1{,}000 \\
> > \text{Credit}_{(b)} &= \min(1{,}000,\ 940) \\
> > &= 940 \\
> > V_{\text{net},(b)} &= 1{,}000 - 940 \\
> > &= 60 \\
> > \text{Credit}_{(c)} &= \min(1{,}000,\ 1{,}000) \\
> > &= 1{,}000
> > \end{align*}
> > $$
> > In case (b) the cedant keeps a \$60 million reserve with no assets coming back to support it, which wipes out the relief it wanted. Unauthorized reinsurers therefore fund trusts at 100% or more of the U.S. statutory reserve, which ties up most of the release. Funds withheld gives full credit because the cedant already holds the assets, at the cost of a funds-withheld payable that the reinsurer bears the credit risk on.

> [!tip]- How it appears on the exam
> - **CP-341:** Written questions ask why U.S. insurers cede asset-intensive annuities to Bermuda and what the cedant, the reinsurer and the regulator each gain or risk. They also ask how credit for reinsurance, reciprocal jurisdictions, Solvency II equivalence and the BMA's rules apply to a stated deal.
> - **Calculations:** A short calculation gives the reserve and capital under each regime and the collateral posted. It asks for the release, the cedant's reserve credit and its net reserve.

> [!warning]- Exam traps
> - **Lower capital is not the point:** The release comes mainly from a smaller liability under the EBS. The offshore capital requirement is often higher than the onshore one.
> - **Credit is not risk transfer:** Full credit removes the reserve from the cedant's balance sheet, but the cedant stays liable to the policyholders. Recapture after a reinsurer fails brings the liabilities back at the U.S. reserve.
> - **Collateral basis:** Collateral for an unauthorized reinsurer is measured against the U.S. statutory reserve, not the reinsurer's own EBS liability. Funding a trust at the EBS figure leaves the cedant short of full credit.
> - **Equivalence is regime-specific:** Solvency II equivalence and NAIC reciprocal status are separate decisions by separate authorities. One does not imply the other.
