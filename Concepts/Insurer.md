---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b7541fbdb3d38ef9e1161a73739eb3ac651b6aaa75ae777e550724eb4ffcceb8
  sources:
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §II How insurance works PDF pp.2-3; §III pooling theorem, CV of the pool tends to zero PDF pp.4-5"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Ch.6: V(cX) = c^2 V(X) (PDF p.267), E((xbar - mu)^2) = sigma^2/n (PDF p.274), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurer.md
---

**An insurer** (insurance company, insurance entity) is the party to an [[Insurance Policy|insurance policy]] that, in exchange for [[Insurance Premium|premium]], takes on the obligation to pay the covered [[Claim|claims]] of its [[Policyholder|policyholders]]. Its economic job is to pool many risks so that their combined cost can be predicted well enough to promise, and to hold [[Capital|capital]] against the part that cannot.

> $$\text{SD}\!\left(\frac{S_n}{n}\right) = \frac{\sigma}{\sqrt{n}}$$

- **Pooling.** For $n$ independent policies, each with loss standard deviation $\sigma$, the standard deviation of the average loss per policy falls as $\sigma/\sqrt{n}$ ([[Law of Large Numbers]]), and the pool's coefficient of variation tends to zero as $n$ grows. That needs the losses to be reasonably independent: one policyholder's loss should not have a major effect on whether others have one, which is why an insurer would not insure every store in one area against fire. Losses that move together, such as a [[Catastrophe Loss|catastrophe]], don't diversify away, and capital has to absorb what remains across the [[Insurance Portfolio|portfolio]].
- **Self-insurance.** Friedland's basic techniques for estimating [[Unpaid Claims|unpaid claims]] are written for any risk bearer: insurance companies, and [[Self-Insured Retention|self-insurers]] such as funded self-insured programs, captive insurers and pooling associations.
- **Canada (Exam 6C).** The [[Insurance Companies Act]] requires federally regulated P&C companies to maintain adequate capital, and foreign P&C companies operating in Canada on a branch basis to maintain an adequate margin of assets in Canada over liabilities in Canada. [[OSFI]]'s [[MCT]] guideline is the framework within which the Superintendent assesses that capital (for branches, through its Branch Adequacy of Assets Test). The MCT ratio is capital available divided by minimum capital required, which is the capital required at the target level divided by $1.5$. Insurers must hold at least $100\%$, and OSFI's $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] is a cushion above that minimum that facilitates early intervention.

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
