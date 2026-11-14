---
aliases:
  - International Reinsurance Regulatory Framework
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3da327671795d3557bc0c90b2cb963fccd080e979b50489f23ba18f15a588316
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Offshore Reinsurance.md
---
**Offshore Reinsurance** is the cession of life and annuity business by a U.S. or Canadian insurer to a reinsurer domiciled in another jurisdiction, chiefly Bermuda and, to a lesser extent, the Cayman Islands. Most of the volume is asset-intensive business, such as fixed and indexed annuities, ceded under coinsurance or funds withheld, often to an affiliate or to a [[Private Equity-Backed Insurer|private equity-backed reinsurer]].

It is governed by the international reinsurance regulatory framework: the cedant's [[Credit for Reinsurance|credit for reinsurance]] rules, the reinsurer's home supervisor, and the agreements that let one regime rely on another.

## Why business goes offshore

U.S. statutory reserves for annuities are largely formulaic and discount at prescribed rates. Bermuda's economic balance sheet (EBS) values liabilities on a best-estimate basis, and under its scenario-based approach the discount rate reflects the yield on the assets actually held. A portfolio with higher-yielding assets therefore supports a smaller liability offshore. The reinsurer also gains investment flexibility and capital charges that differ from [[Risk-Based Capital|RBC]].

For a regime that requires a reserve, or technical provisions, $V$ and capital $K$, the total asset requirement for the liabilities is

> $$\text{TAR} = V + K$$

What the group frees by holding the business under the offshore regime instead is

> $$\text{Release} = \text{TAR}_{\text{home}} - \text{TAR}_{\text{offshore}}$$

The release comes mainly from the smaller liability on the EBS. The offshore capital requirement is often higher than the onshore one.

> [!example]- What does the group release by ceding this annuity block to Bermuda? {Example}
> A U.S. insurer holds a fixed annuity block with a statutory reserve of $\$1{,}000$ million and required capital of $\$50$ million. A Bermuda reinsurer would hold technical provisions of $\$940$ million on the EBS and target capital of $\$70$ million on the same block. The figures are illustrative.
>
> > [!answer]-
> > - The total asset requirement at home is $1{,}000 + 50 = \$1{,}050$ million.
> > - Offshore it is $940 + 70 = \$1{,}010$ million.
> > - The release is $1{,}050 - 1{,}010 = \$40$ million.
> > - The offshore reinsurer holds more capital but a smaller liability, so the group needs $\$40$ million less in assets on the same block.

## Bermuda supervision

The Bermuda Monetary Authority (BMA) licenses commercial long-term insurers in classes, the largest being Class E. It sets capital through the Bermuda Solvency Capital Requirement (BSCR), with a target capital level above the enhanced capital requirement, and requires a commercial insurer's own risk and solvency assessment. Since 2024 it has added tighter rules on the scenario-based approach, on illiquid and complex assets, and on liquidity.

## U.S. credit for reinsurance

Credit follows the NAIC Credit for Reinsurance Model Law. A reinsurer that is licensed or accredited in the cedant's state gets full credit, and a certified reinsurer posts reduced collateral. One domiciled in a reciprocal jurisdiction that meets the model's capital and solvency standards posts none. Bermuda is among the jurisdictions the NAIC treats as reciprocal, so a qualifying Bermuda reinsurer can give full credit without collateral. Cedants often still require a trust or funds withheld for their own protection.

For an unauthorized reinsurer, the credit on a ceded reserve $V_{\text{ceded}}$ is

> $$\text{Credit} = \min\left(V_{\text{ceded}},\ C\right)$$

- $C$ is the acceptable collateral securing the cession.

Full credit removes the reserve from the cedant's balance sheet, but the cedant stays liable to the policyholders. Recapture after a reinsurer fails brings the liabilities back at the U.S. reserve.

> [!example]- What credit and net reserve does the cedant have under each of these three deals? {Example}
> The insurer in the previous example coinsures its $\$1{,}000$ million block to the Bermuda reinsurer. In (a) the reinsurer qualifies under a reciprocal jurisdiction and posts no collateral. In (b) it is unauthorized and funds a trust for the cedant with $\$940$ million, its EBS technical provisions. In (c) the deal is written as funds withheld, so the cedant keeps $\$1{,}000$ million of assets.
>
> > [!answer]-
> > - In (a) the reciprocal jurisdiction reinsurer earns full credit, $\$1{,}000$ million, and the net reserve is $0$.
> > - In (b) the credit is $\min(1{,}000,\ 940) = \$940$ million, so the net reserve is $1{,}000 - 940 = \$60$ million, with no assets coming back to support it.
> > - In (c) the credit is $\min(1{,}000,\ 1{,}000) = \$1{,}000$ million and the net reserve is $0$, because the cedant already holds the assets.
> > - Case (b) wipes out the relief the cedant wanted. Funds withheld gives full credit at the cost of a funds-withheld payable on which the reinsurer bears the credit risk.

## Canada

Under [[OSFI]]'s LICAT and Guideline B-3, a cession to an [[Unregistered Reinsurance|unregistered reinsurer]] earns capital credit only for collateral held in Canada under a reinsurance security agreement. OSFI also expects every cedant to assess the reinsurer and its home regime, whatever the collateral.

## Solvency II equivalence

The European Union can find a third country's regime equivalent to [[Solvency II]] for reinsurance, group solvency and group supervision. Bermuda's commercial regime holds full equivalence, so an EU cedant may treat a Bermuda reinsurer like an EU reinsurer and cannot require collateral from it. Solvency II equivalence and NAIC reciprocal status are separate decisions by separate authorities, and one does not imply the other.

## Collateral structures

Security comes from funds withheld or modco, where the cedant keeps the assets, or from a trust for the cedant's benefit funded at a stated percentage of the ceded reserve. Letters of credit are the third option. The terms usually fix the eligible assets and the recapture triggers.

## Regulator concerns

U.S. regulators and the American Academy of Actuaries have pointed to the fall in total asset requirement on the same liabilities, to concentrations in private credit and structured assets, and to affiliated transactions and their fees. They also cite recapture risk, since the cedant could get the liabilities back with assets worth less than the U.S. reserve. The NAIC's response includes requiring [[Asset Adequacy Analysis|asset adequacy testing]] of asset-intensive business ceded under reinsurance, and more scrutiny of affiliated and offshore deals.

> [!trap] Funding a trust at the offshore liability
> Collateral for an unauthorized reinsurer is measured against the U.S. statutory reserve, not the reinsurer's own EBS liability. Funding a trust at the EBS figure leaves the cedant short of full credit, so unauthorized reinsurers fund trusts at 100% or more of the U.S. statutory reserve, which ties up most of the release.
