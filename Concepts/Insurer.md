---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:088decad34eb3fb00908577fe545fdc2acf4cf128dc2c28946f3370a0bbdc057
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, preamble (ICA ss. 515(1), 608(1)); §1.1.1, §1.1.2 (target-level requirements less diversification credit, divided by 1.5; MCT ratio = capital available / minimum capital required); §1.2.1 (100% minimum, 150% supervisory target, internal target); §4.2.1, §4.3.3.2, sha256:34c28477cae162661beec2d0b80b23314746df6b488fe6b959fe0606177fc60e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "Odomirok et al., Financial Reporting Through the Lens of a Property/Casualty Actuary (CAS, 2020), PDF pp.10-11 (U.S. insurers regulated by the states they are licensed in; NAIC not a regulator; SAP prescribed or permitted by the domiciliary state), p.26 (Annual Statement on SAP), p.35 (Admitted Assets = Liabilities + Surplus), pp.40-41 (stock and mutual insurers), p.104 (Schedule T: licensed, RRG, eligible surplus lines), p.109 (Schedule F, regulators' focus on reinsurance collectability), pp.303-304 (regulators' tools: RBC, IRIS/FAST, SAO, used together), p.351 (tax-basis incurred losses use discounted reserves), pp.358-359 (Canada: federal or provincial registration, OSFI, provincial licensing and market conduct, IFRS), sha256:d35e87ed0e674d7e0d52b225dcc1683f6553073e1c89f106f05f5cb80cea8aa7 — https://www.casact.org/sites/default/files/2021-03/6C_CAS_Financial_Reporting.pdf"
    - "PACICC, guide to the compensation plan for property and casualty insurers, PDF pp.1-2 (Plan comes into operation on the insolvency of a P&C insurer; covers most claims under most P&C policies), sha256:5f983f23846df2d2d36fdc6a8b20578b058eed910e3c96d2f9be30162b229441 — https://www.casact.org/sites/default/files/2021-03/6C_PACICC.pdf"
    - "CIA, Educational Note: Comparison of IFRS 17 to current CIA standards, PDF p.6, Introduction (IFRS 17 effective in Canada January 1, 2023), sha256:dad0c798ecf3320c7887ed8bdb2820811617951a5c94c1ede6b05da9706560db — https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf"
    - "NAIC White Paper, The U.S. National State-Based System of Insurance Financial Regulation and the Solvency Modernization Initiative (2013), PDF p.4 n.3 (receivership in the domiciliary state), pp.17-18 (domiciliary states prioritise review; others may rely on the accredited domiciliary state's exams), p.44 (surplus lines = unlicensed companies), sha256:77020d3a75a8043a1c773a26bb3b750c65274d68e764757c018e9e0099621e77 — https://casact.org/sites/default/files/2021-03/6U_NAIC_Solvency_Regulatory_Framework.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurer.md
---

**An insurer** (insurance company, insurance entity) is the party to an [[Insurance Policy|insurance policy]] that, in exchange for [[Insurance Premium|premium]], takes on the obligation to pay the covered [[Claim|claims]] of its [[Policyholder|policyholders]]. Its economic job is to pool many risks so that their combined cost can be predicted well enough to promise, and to hold [[Capital|capital]] against the part that cannot.

> $$\text{SD}\!\left(\frac{S_n}{n}\right) = \frac{\sigma}{\sqrt{n}}$$

> $$\text{Assets} = \text{Liabilities} + \text{Capital}$$

- **Pooling.** For $n$ independent policies, each with loss standard deviation $\sigma$, the standard deviation of the average loss per policy falls as $\sigma/\sqrt{n}$ ([[Law of Large Numbers]]), and the pool's coefficient of variation tends to zero as $n$ grows. That needs the losses to be reasonably independent: one policyholder's loss should not have a major effect on whether others have one. An insurer would not insure every store in one area against fire, because a fire in one store could spread to the others and produce many large claim payments at once. Losses that move together this way, such as a [[Catastrophe Loss|catastrophe]], don't pool away across the [[Insurance Portfolio|portfolio]].
- **Self-insurance.** Friedland's basic techniques for estimating [[Unpaid Claims|unpaid claims]] are written for any risk bearer: insurance companies, and [[Self-Insured Retention|self-insurers]] such as funded self-insured programs, captive insurers and pooling associations.
- **Why capital is costly (Exam 9).** Capital held inside an insurer carries frictional costs: investment income on it is taxed twice, and it also bears agency costs and the costs of financial distress and regulation. Those [[Insurance Market Imperfections|market imperfections]] give capital a [[Cost of Capital|cost]], and that cost is why premiums include a [[Risk Loads|risk load]]. They are also why the [[Capital Structure|capital structure]] (equity, debt, [[Reinsurance|reinsurance]]) matters to policyholders, who are the insurer's largest creditors.
- **Forms.** An insurer can be a stock company, a mutual (owned by its policyholders), a reciprocal exchange, a Lloyd's syndicate, a captive, or, in the US, a [[Risk Retention Groups|risk retention group]].
- **Canada (Exam 6C).** The [[Insurance Companies Act]] requires federally regulated P&C companies to maintain adequate capital, and foreign P&C companies operating in Canada on a branch basis to maintain an adequate margin of assets in Canada over liabilities in Canada. [[OSFI]]'s [[MCT]] guideline is the framework within which the Superintendent assesses that capital (for branches, through its Branch Adequacy of Assets Test). The MCT ratio is capital available divided by minimum capital required, which is the capital required at the target level divided by $1.5$. Insurers must hold at least $100\%$, and OSFI's $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] is a cushion above that minimum that facilitates early intervention. An insurer can instead be registered separately in each province where it does business, though most are federally regulated by OSFI. Every insurer also needs a licence in each province where it writes, and market conduct is provincial ([[Federal-Provincial Jurisdiction]]). [[PACICC]] protects policyholders if a P&C insurer fails, and financial reporting follows [[IFRS 17]].
- **United States (Exam 6U).** Insurance is regulated by the states. The state of domicile leads solvency oversight, and an insurer must be admitted in each state where it writes, apart from [[Excess and Surplus Lines|surplus lines]] business placed with non-admitted insurers. The [[NAIC Annual Statement]] is prepared on [[Statutory Accounting Principles|SAP]]. Regulators judge [[Financial Health|financial health]] through [[Risk-Based Capital|RBC]], [[IRIS Ratios]], the actuarial opinion and [[Schedule F]]. For federal income tax, loss reserves are deducted on a discounted basis ([[Loss Reserve Discounting]], [[Insurance Income Tax]]).

> [!example]- Pooling and Capital per Policy {Example}
> An insurer writes $n$ independent homeowners policies. Each has an expected annual loss of $\$800$ and a standard deviation of $\$4{,}000$. It charges expected loss and holds capital large enough that losses are covered with probability $99.5\%$ ($z = 2.576$, normal approximation).
>
> Find the capital per policy for $n = 400$ and for $n = 40{,}000$.
>
> > [!answer]-
> > Total losses have standard deviation $\$4{,}000\sqrt{n}$, so capital is $2.576 \times \$4{,}000\sqrt{n}$. Per policy:
> >
> > $$
> > \begin{align*}
> > \text{Capital per policy} &= \frac{2.576 \times \$4{,}000}{\sqrt{n}} \\
> > &= \frac{\$10{,}304}{\sqrt{n}}
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \frac{\$10{,}304}{\sqrt{400}} &= \$515.20 \\
> > \frac{\$10{,}304}{\sqrt{40{,}000}} &= \$51.52
> > \end{align*}
> > $$
> >
> > A book 100 times larger needs one tenth the capital per policy. That only works because the risks are independent. Homes that share a hurricane exposure fail that condition, and this calculation no longer applies (see [[Insurance Portfolio]]).

> [!example]- A Reserve Deficiency Hits Capital {Example}
> An insurer has assets of $\$1{,}200$M, claim liabilities of $\$700$M and other liabilities of $\$200$M. A review finds the claim liabilities are $10\%$ deficient. It is a Canadian P&C company whose minimum capital required under the MCT is $\$150$M, and you may treat its capital available as its assets less its liabilities.
>
> Ignoring tax and any change in minimum capital required, what happens to its capital and its MCT ratio?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Capital} &= 1{,}200 - 700 - 200 \\
> > &= \$300\text{M} \\[4pt]
> > \text{Strengthening} &= 0.10 \times 700 \\
> > &= \$70\text{M} \\[4pt]
> > \text{New capital} &= \$230\text{M}
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{MCT before} &= \frac{300}{150} \\
> > &= 200\% \\[4pt]
> > \text{MCT after} &= \frac{230}{150} \\
> > &= 153\%
> > \end{align*}
> > $$
> >
> > A $10\%$ reserve error took out $23\%$ of capital, because reserves are $2.33$ times capital. The ratio is still above the $100\%$ minimum, but it now sits just above OSFI's $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], the cushion OSFI keeps for early intervention.
