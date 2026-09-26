---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b7541fbdb3d38ef9e1161a73739eb3ac651b6aaa75ae777e550724eb4ffcceb8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurer.md
---

**An insurer** (insurance company, insurance entity) is the party to an [[Insurance Policy|insurance policy]] that, in exchange for [[Insurance Premium|premium]], takes on the obligation to pay the covered [[Claim|claims]] of its [[Policyholder|policyholders]]. Its economic job is to pool many risks so that their combined cost can be predicted well enough to promise, and to hold [[Capital|capital]] against the part that cannot.

> $$\text{SD}\!\left(\frac{S_n}{n}\right) = \frac{\sigma}{\sqrt{n}}$$

> $$\text{Assets} = \text{Liabilities} + \text{Capital}$$

- **Pooling.** For $n$ independent policies, each with loss standard deviation $\sigma$, the standard deviation of the average loss per policy falls as $\sigma/\sqrt{n}$ ([[Law of Large Numbers]]). Correlated losses (a [[Catastrophe Loss|catastrophe]], an inflation shock) don't diversify away like that. The capital has to absorb what remains across the [[Insurance Portfolio|portfolio]].
- **Why capital is costly (Exam 9).** Capital held inside an insurer carries frictional costs: investment income on it is taxed twice, and it also bears agency costs and the costs of financial distress and regulation. Those [[Insurance Market Imperfections|market imperfections]] give capital a [[Cost of Capital|cost]], and that cost is why premiums include a [[Risk Loads|risk load]]. They are also why the [[Capital Structure|capital structure]] (equity, debt, [[Reinsurance|reinsurance]]) matters to policyholders, who are the insurer's largest creditors.
- **Forms.** An insurer can be a stock company, a mutual (owned by its policyholders), a reciprocal exchange, a Lloyd's syndicate, a captive, or, in the US, a [[Risk Retention Groups|risk retention group]]. A [[Self-Insured Retention|self-insured]] entity keeps its risk without being an insurer. Exam 5 reserving methods estimate its [[Unpaid Claims|unpaid claims]] the same way, but from thinner data and for different users.
- **Canada (Exam 6C).** Federally incorporated insurers and the Canadian branches of foreign insurers are supervised for solvency by [[OSFI]] under the [[Insurance Companies Act]], and P&C companies are held to the [[MCT]]. Insurers incorporated in a province are supervised by that province. Every insurer also needs a licence in each province where it writes, and market conduct is provincial ([[Federal-Provincial Jurisdiction]]). [[PACICC]] protects policyholders if a P&C insurer fails, and financial reporting follows [[IFRS 17]].
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
> > A book 100 times larger needs one tenth the capital per policy. That only works because the risks are independent. If the homes share a hurricane exposure, the covariance terms don't shrink (see [[Insurance Portfolio]]).

> [!example]- A Reserve Deficiency Hits Capital {Example}
> An insurer has assets of $\$1{,}200$M, claim liabilities of $\$700$M and other liabilities of $\$200$M. A review finds the claim liabilities are $10\%$ deficient. It is a Canadian P&C company with capital required under the MCT of $\$150$M, and you may treat its capital available as equal to its capital.
>
> Ignoring tax and any change in capital required, what happens to its capital and its MCT ratio?
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
> > A $10\%$ reserve error took out $23\%$ of capital, because reserves are $2.33$ times capital. The ratio now sits just above OSFI's $150\%$ [[Supervisory Target Capital Ratio|supervisory target]]. Reserve adequacy dominates any assessment of an insurer's financial health for this reason, in the MCT and in RBC and Schedule P alike.
