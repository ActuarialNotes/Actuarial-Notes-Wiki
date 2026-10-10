---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8749742e666f07d3d272be1f9f4c8690a8f77a3ed75d1be7f3f5a4e99f74250c
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 pp.47-54 (PDF pp.66-73): risk control and financing, retention, captives, RRGs, noninsurance transfers, insurance, matrix, market conditions, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-04 matrix Table 4.4; incorporation incl. courts caveat; warranties; hold-harmless; surety, sha256:5da3c20b87e2a72ff64a492c44f23e70c966629c990a5dfd9739b0ec09c59eb8 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-04-risk-management-alternatives-t.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-05 overlaying maps; residual $140M vs $100M, sha256:dce7d26c3b00af3545e85a525938f4313aa3e7063eae4e71c8d2bc616fa2edf2 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-05-comparisons-to-current-risk-ha.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-01 treasurer, CRO, sha256:d4360b972503a96e37389598cccade396a0e3625ed78dad905726181812db468 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-01-the-risk-management-function.html"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 114 (PDF pp.7, 16), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Nebraska DAS State Accounting, Risk Assessment (rev. 11/01/2014), \"Segregate Losses\" (separation, duplication), sha256:b464a63ed39a0d3fe31011f621eb1b191595c6f52c207d25ffe7c2733b2cb093 — https://das.nebraska.gov/accounting/risk-assesment.html"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Risk Treatment.md
---

**Risk treatment** is the step of the [[Risk Management Process|risk management process]] that selects and carries out the techniques for dealing with each risk that has been identified and assessed. The techniques fall into two groups: [[Risk Control|risk control]], which changes the frequency, severity or predictability of losses (avoidance, loss prevention, loss reduction, separation, duplication and diversification), and risk financing, which pays for the losses that still occur (retention, and [[Risk Transfer|transfer]] by insurance or by noninsurance means). [[Enterprise Risk Management|Enterprise risk management]] adds a fifth response for risks with an upside: exploiting them.

> $$S_{\text{ret}} = \min(S, d) + \max(S - d - \ell,\ 0)$$

> $$S_{\text{ins}} = S - S_{\text{ret}}$$

- **Symbols:** $S$ is the size of a loss, $d$ is the part retained at the bottom (a [[Deductible|deductible]] or self-insured layer), and $\ell$ is the limit of insurance above it. $S_{\text{ret}}$ is what the organization pays itself and $S_{\text{ins}}$ is what the insurer pays. A treatment program is usually a combination: risk control on the exposure, retention of small losses, transfer of a middle layer, and the loss above the limit retained again, whether the organization meant to keep it or not.
- **Risk control techniques:** Avoidance gives up the activity, so the chance of that loss is zero, though it can create another exposure. Loss prevention lowers frequency, and loss reduction lowers severity. Separation spreads activities or assets among several locations, and duplication keeps spares or backups used only after a loss. Diversification spreads activity across products, customers or regions whose losses are not perfectly correlated. See [[Risk Control]] for each in detail.
- **Retention:** The organization pays its own losses, from current funds, a deductible or a formal self-insurance plan. Large organizations may form a captive, an insurer owned by the parent to insure its own risks, and small businesses in one industry can join a [[Risk Retention Groups|risk retention group]] to retain risk together. Retention is feasible only as far as losses can be predicted and paid.
- **Transfer by insurance:** Insurance pays another party, the insurer, to bear the financial consequences of losses that cannot be avoided or reduced to acceptable levels, and the insurer pools them with many similar exposures ([[Law of Large Numbers]]). It works best for exposures with the characteristics of an [[Insurable Risk|insurable risk]].
- **Noninsurance transfer:** Risk can be shifted by contract other than insurance: hold-harmless and indemnity clauses in leases and service contracts, warranties that make a manufacturer pay for defects, and surety bonds that guarantee a contractor's performance. Forming a separate corporation limits the owners' loss to their investment, though courts may not accept it for dangerous activities. Financial risks are transferred through the capital markets by [[Hedging|hedging]] with derivatives and by securitization.
- **The evolution of treatment:** Risk management began as corporate insurance buying, usually under the treasurer, with the risk manager responsible for buying insurance and running loss control for pure risks. Insurance remained the main transfer mechanism for hazard risks, with alternative risk transfer markets developing to balance retention and transfer, while capital markets grew to handle commodity, interest rate and currency risk. Operational and strategic risks long had no transfer market, so they could only be avoided or retained. Under ERM, a chief risk officer treats all the risks together, recognizes natural hedges between them and may choose to exploit a risk for competitive advantage.
- **Choosing a technique by frequency and severity:** The traditional risk management matrix for one exposure points to retention for losses of low frequency and low severity, retention with loss control for high frequency and low severity, transfer by insurance for low frequency and high severity, and avoidance for high frequency and high severity. The matrix is a starting point: the organization's financial condition and size, the price of insurance in the [[Underwriting Cycle|underwriting cycle]], legal requirements and the cost-benefit test all affect the choice.
- **Treating risks holistically:** Plotting the current treatment of every risk on the same frequency-severity map as the risks themselves shows where the two disagree, such as an expensive policy on a minor exposure, and what residual risk is left after all treatment. Managing the risks as one portfolio avoids paying to hedge exposures that offset each other ([[Risk Mitigation]]).

> [!example]- Choosing Techniques With the Matrix {Example}
> A regional fitness chain has four exposures, with these estimates: (1) towels and small equipment stolen from locker rooms, many times a year, a few hundred dollars each; (2) a fire that destroys a club, perhaps once in 50 years, costing \$3 million; (3) minor strains and sprains among its trainers, frequent, about \$2,000 each; (4) a proposal to run an overnight rock-climbing excursion business, where its insurer and its own loss data both point to frequent, serious injuries. Use the risk management matrix to suggest a primary treatment for each, then say what could change the answer.
>
> > [!answer]-
> > - **(1) Low severity, high frequency:** Retain the losses and use loss control, such as lockers and attendants, to cut their frequency.
> > - **(2) Low frequency, high severity:** Transfer by insurance, since one fire could threaten the chain's survival.
> > - **(3) High frequency, low severity:** Retention with loss control, such as training and warm-up routines; the costs are predictable and can be budgeted.
> > - **(4) High frequency, high severity:** Avoid it by not starting the business.
> >
> > The matrix ignores other factors. If insurance is very expensive in a hard market, the chain might retain more of the fire exposure with a high deductible. If the chain were large, with many clubs in different places, separation would also cut the worst case, and a high frequency of small losses would make them more predictable.

> [!example]- What a Treatment Program Leaves Retained {Example}
> A manufacturer insures its plant with a \$250,000 deductible and a \$10 million limit above it. Find how much it retains and how much the insurer pays for losses of \$60,000, \$2,000,000 and \$14,000,000.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > S = 60{,}000:\quad S_{\text{ret}} &= \min(60{,}000,\ 250{,}000) + 0 \\
> > &= 60{,}000 \\
> > S = 2{,}000{,}000:\quad S_{\text{ret}} &= 250{,}000 + \max(2{,}000{,}000 - 10{,}250{,}000,\ 0) \\
> > &= 250{,}000 \\
> > S = 14{,}000{,}000:\quad S_{\text{ret}} &= 250{,}000 + (14{,}000{,}000 - 10{,}250{,}000) \\
> > &= 4{,}000{,}000
> > \end{align*}
> > $$
> > The insurer pays \$0, \$1,750,000 and \$10,000,000. The small loss is retained entirely, which is the purpose of the deductible. The largest loss leaves \$4 million retained, most of it above the limit, so the program treats the plant's worst case only partly. The manufacturer must decide whether to buy more limit, add risk control such as sprinklers or separation, or accept that residual risk.

> [!example]- Two Divisions, One Currency {Example}
> A manufacturer has two divisions. One sells in euros and will receive €10 million in six months; the other buys components priced in euros and will pay €8 million in six months. Each division head proposes buying a currency hedge for their own exposure. How should the company treat the risk as a whole?
>
> > [!answer]-
> > The two exposures largely offset: a fall in the euro cuts the first division's receipts in dollars but also cuts the second division's costs. The company's net exposure is a receipt of €2 million, so at most that needs hedging. Hedging each division separately pays for two hedges that cancel each other, and leaves the company with a net hedge of the same €2 million it could have bought once. This is treating risk holistically: the risk that matters is the organization's net exposure, not each division's.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The section on treating risk covers the fundamentals of the techniques, the evolution of risk treatment, its applications and treating risk holistically. Questions describe an action, such as signing a lease with a hold-harmless clause or keeping backup servers at a second site, and ask which technique it is.
> - **Applications:** Scenarios give an exposure's frequency and severity and ask for the most appropriate technique, or ask which factor, such as the cost of insurance or the organization's size, would justify departing from the matrix.
> - **Evolution and holistic treatment:** Questions ask how ERM differs from the traditional insurance-buying approach, or why treating risks one department at a time can waste money.

> [!warning]- Exam traps
> - **Control versus financing:** Risk control changes the losses; risk financing pays for them. A deductible is retention, a form of financing, not loss reduction, even though it can encourage the insured to prevent losses.
> - **Separation versus duplication:** Separation splits an exposure among locations that are all in use. Duplication keeps a backup that is used only after a loss. Two active warehouses are separation; an idle standby generator is duplication.
> - **Insurance is not the only transfer:** Hold-harmless clauses, warranties, surety bonds, incorporation and hedges also transfer risk. An answer that treats transfer and insurance as the same thing misses the noninsurance techniques.
> - **Unplanned retention:** Losses above the limit, excluded losses and risks no one identified are retained whether or not anyone chose to keep them. A program is not complete until its residual risk is known.
