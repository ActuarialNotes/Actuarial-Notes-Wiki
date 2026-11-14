---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4239df8d1e19ea890018cdb1024024974ae4ea7f5d11f33189b82b7e48053879
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.47-54, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-04 matrix; incorporation; warranties; hold-harmless; surety, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-05 overlaying maps, sha256:dce7d26c3b00af3545e85a525938f4313aa3e7063eae4e71c8d2bc616fa2edf2 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-05-comparisons-to-current-risk-ha.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-01 treasurer, CRO, sha256:d4360b972503a96e37389598cccade396a0e3625ed78dad905726181812db468 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-01-the-risk-management-function.html"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 114, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Nebraska DAS State Accounting, Risk Assessment (rev. 11/01/2014), \"Segregate Losses\" (separation, duplication), sha256:b464a63ed39a0d3fe31011f621eb1b191595c6f52c207d25ffe7c2733b2cb093 — https://das.nebraska.gov/accounting/risk-assesment.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Treatment.md
---

**Risk Treatment** is the step of the [[Risk Management Process|risk management process]] that selects and carries out the techniques for dealing with each risk that has been identified and assessed. Its techniques are grouped by what they do to a loss:

1. [[Risk Control|Risk control]], which reduces the frequency or severity of losses (avoidance, loss prevention, loss reduction, separation and duplication).
2. Risk financing, which pays for the losses that still occur:
   - retention,
   - [[Risk Transfer|transfer]] by insurance,
   - noninsurance transfer.
3. Exploitation, the response [[Enterprise Risk Management|enterprise risk management]] adds for risks with an upside.

A treatment program is usually a combination: risk control on the exposure, retention of small losses, transfer of a middle layer, and the loss above the limit retained again, whether the organization meant to keep it or not.

## Risk control techniques

Avoidance gives up the activity, so the chance of that loss is zero, though it can create another exposure. Loss prevention lowers frequency, and loss reduction lowers severity. Separation spreads activities or assets among several locations, and duplication keeps spares or backups used only after a loss. Two active warehouses are separation, and an idle standby generator is duplication. [[Risk Control]] covers each technique in detail.

## Retention

The organization pays its own losses, from current funds, a deductible or a formal self-insurance plan. Large organizations may form a captive, an insurer owned by the parent to insure its own risks, and small businesses in one industry can join a [[Risk Retention Groups|risk retention group]] to retain risk together. Retention is feasible only as far as losses can be predicted and paid.

## Transfer by insurance

Insurance pays another party, the insurer, to bear the financial consequences of losses that cannot be avoided or reduced to acceptable levels, and the insurer pools them with many similar exposures ([[Law of Large Numbers]]). It works best for exposures with the characteristics of an [[Insurable Risk|insurable risk]].

## Noninsurance transfer

Risk can be shifted by contract other than insurance: hold-harmless and indemnity clauses in leases and service contracts, warranties that make a manufacturer pay for defects, and surety bonds that guarantee a contractor's performance. Forming a separate corporation limits the owners' loss to their investment, though courts may not accept it for dangerous activities. Financial risks are transferred through the capital markets by [[Hedging|hedging]] with derivatives and by securitization.

## Retained and insured layers of a loss

When a loss of size $S$ falls on a program that retains a layer $d$ at the bottom, a [[Deductible|deductible]] or self-insured layer, and buys a limit of insurance $\ell$ above it, the amount the organization pays itself is

> $$S_{\text{ret}} = \min(S, d) + \max(S - d - \ell,\ 0)$$

The amount the insurer pays is

> $$S_{\text{ins}} = S - S_{\text{ret}}$$

Losses above the limit, excluded losses and risks no one identified are retained whether or not anyone chose to keep them. A program is not complete until its residual risk is known.

> [!example]- A plant is insured with a \$250,000 deductible and a \$10 million limit above it. What does the manufacturer retain on losses of \$60,000, \$2 million and \$14 million? {Example}
> - The \$60,000 loss is below the deductible, so all \$60,000 is retained and the insurer pays nothing.
> - The \$2 million loss is within the layer, so the manufacturer retains the \$250,000 deductible and the insurer pays \$1,750,000.
> - The \$14 million loss exceeds $250{,}000 + 10{,}000{,}000 = 10{,}250{,}000$ by \$3,750,000.
> - So the manufacturer retains $250{,}000 + 3{,}750{,}000 = \$4{,}000{,}000$ and the insurer pays its \$10 million limit.
> - The program treats the plant's worst case only partly, so the manufacturer must decide whether to buy more limit, add risk control such as sprinklers or separation, or accept that residual risk.

## The risk management matrix

The traditional risk management matrix for one exposure points to retention for losses of low frequency and low severity, retention with loss control for high frequency and low severity, transfer by insurance for low frequency and high severity, and avoidance for high frequency and high severity.

| Frequency | Low severity | High severity |
| :--- | :--- | :--- |
| Low | Retention | Transfer by insurance |
| High | Retention with loss control | Avoidance |

The matrix is a starting point: the organization's financial condition and size, the price of insurance in the [[Underwriting Cycle|underwriting cycle]], legal requirements and the cost-benefit test all affect the choice.

> [!example]- What primary treatment does the matrix suggest for each of this fitness chain's exposures, and what could change it? {Example}
> A regional fitness chain has four exposures:
>
> | Exposure | Frequency | Severity |
> | :--- | :--- | :--- |
> | Towels and small equipment stolen from locker rooms | Many times a year | A few hundred dollars each |
> | A fire that destroys a club | Perhaps once in 50 years | \$3 million |
> | Minor strains and sprains among its trainers | Frequent | About \$2,000 each |
> | A proposed overnight rock-climbing excursion business | Frequent, by its insurer's and its own data | Serious injuries |
>
> > [!answer]-
> > - Thefts are high frequency and low severity, so retain them and use loss control, such as lockers and attendants, to cut their frequency.
> > - The fire is low frequency and high severity, so transfer it by insurance, since one fire could threaten the chain's survival.
> > - The strains are high frequency and low severity, so retain them with loss control such as training and warm-up routines, because the costs are predictable and can be budgeted.
> > - The excursion business is high frequency and high severity, so avoid it by not starting the business.
> > - If insurance is very expensive in a hard market, the chain might retain more of the fire exposure with a high deductible.
> > - If the chain were large, with many clubs in different places, separation would also cut the worst case, and a high frequency of small losses would make them more predictable.

## The evolution of risk treatment

Risk management began as corporate insurance buying, usually under the treasurer, with the risk manager responsible for buying insurance and running loss control for pure risks. Insurance remained the main transfer mechanism for hazard risks, with alternative risk transfer markets developing to balance retention and transfer, while capital markets grew to handle commodity, interest rate and currency risk. Operational and strategic risks long had no transfer market, so they could only be avoided or retained. Under ERM, a chief risk officer treats all the risks together, recognizes natural hedges between them and may choose to exploit a risk for competitive advantage.

## Treating risks holistically

Plotting the current treatment of every risk on the same frequency-severity map as the risks themselves shows where the two disagree, such as an expensive policy on a minor exposure, and what residual risk is left after all treatment. Managing the risks as one portfolio avoids paying to hedge exposures that offset each other ([[Risk Mitigation]]).

> [!example]- How should this manufacturer treat its currency risk as a whole? {Example}
> One division sells in euros and will receive €10 million in six months. The other buys components priced in euros and will pay €8 million in six months. Each division head proposes buying a currency hedge for their own exposure.
>
> > [!answer]-
> > - A fall in the euro cuts the first division's receipts in dollars but also cuts the second division's costs, so the two exposures largely offset.
> > - The company's net exposure is a receipt of €2 million, so at most that needs hedging.
> > - Hedging each division separately pays for two hedges that cancel each other, and leaves the company with a net hedge of the same €2 million it could have bought once.
> > - The risk that matters is the organization's net exposure, not each division's.

> [!trap] A deductible is financing, not control
> Risk control changes the losses, and risk financing pays for them. A deductible is retention, a form of financing, not loss reduction, even though it can encourage the insured to prevent losses.
