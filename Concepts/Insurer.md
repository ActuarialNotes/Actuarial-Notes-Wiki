---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:e538893f19e448a3538f74b13b620bf9c69a1d0dac6b9bc5cca88baa7da97c12
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II insurer pays claims for premium PDF p.2; §V losses should be reasonably independent, stores in one area against fire PDF p.6; §III CV of the pool tends to zero PDF pp.4-5"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OSFI, Minimum Capital Test Guideline (2026), Guideline A, dated November 20, 2025, effective January 1, 2026: preamble (ICA subsections 515(1) and 608(1), BAAT) and Chapter 1 §1.1 (target requirements divided by 1.5; MCT ratio = capital available over minimum capital required; 100% minimum; 150% supervisory target, cushion facilitating early intervention), fetched 2026-09-28, sha256:ea844a609d445629333542801b8a08562093647a1c69cf6865c10e17e35db864 — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS study note), insurers vs self-insurers (funded self-insured programs, captive insurers, pooling associations) PDF p.19, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "SOA Exam P normal distribution table (rev. 4/29/21), Pr(Z<z) = 0.995 at z = 2.5758, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
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
- **Canada (Exam 6C).** The [[Insurance Companies Act]] requires federally regulated P&C companies to maintain adequate capital, and foreign P&C companies operating in Canada on a branch basis to maintain an adequate margin of assets in Canada over liabilities in Canada. [[OSFI]]'s [[MCT]] guideline is the framework within which the Superintendent assesses that capital (for branches, through its Branch Adequacy of Assets Test). The MCT ratio is capital available divided by minimum capital required, which is the capital required at the target level divided by $1.5$. Insurers must hold at least $100\%$, and OSFI's $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] is a cushion above that minimum that facilitates early intervention. Insurers incorporated in a province are supervised by that province. Every insurer also needs a licence in each province where it writes, and market conduct is provincial ([[Federal-Provincial Jurisdiction]]). [[PACICC]] protects policyholders if a P&C insurer fails, and financial reporting follows [[IFRS 17]].
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
