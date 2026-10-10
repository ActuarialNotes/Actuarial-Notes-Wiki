---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:330effd9552a24d6424e0c3ea8dcfdcba3fa13997062164c55ac69d713f50764
  sources:
    - "IRMI Glossary, 'capacity', entry, sha256:a21b8c9f170b484498d12e8c2f5152feb16596960b298365c36d227ee54b91bd — https://www.irmi.com/term/insurance-definitions/capacity"
    - "IRMI Glossary, 'underwriting capacity', entry, sha256:2ebab1745fa85c796d55db07af95f952f3954ba6d1539cede8f126bd6feab02e — https://www.irmi.com/term/insurance-definitions/underwriting-capacity"
    - "IRMI Glossary, 'surplus relief', entry, sha256:a566036b62b517dad05c5eb731c16cdeb11a341f9d702ad7aecaa373fe995610 — https://www.irmi.com/term/insurance-definitions/surplus-relief"
    - "IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter"
    - "NAIC, IRIS Ratios Means and Medians (2025), P&C ratio 2 Net Premium to Surplus, 'Unusual if Equal to or Over' 300, P&C ratio 2 threshold, sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf"
    - "NAIC Accounting Practices and Procedures Manual (Mar 2025, Indiana DOI copy), SSAP No. 71 ¶2, SSAP No. 71 ¶2, PDF p.525, sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Underwriting Policy.md
---

**Underwriting Policy** is the set of decisions, made by an insurer's senior management, about the business it will write: which lines, classes and territories, at what limits, on what forms and at what prices. It turns the insurer's goals into rules that line underwriters apply account by account. Underwriting policy is shaped by constraints the insurer cannot ignore, chiefly its financial capacity, regulation, its personnel and its reinsurance, and it is put into practice through underwriting guides, bulletins and audits.

> $$\text{NWP}_{\max} = k \times S$$

> $$N \le \frac{kS - R}{1 + k\,e}$$

- **Symbols:** $S$ is policyholders' surplus ([[Capital and Surplus]]), $k$ is the largest ratio of net [[Written Premium|written premium]] to surplus that management, its regulators and the rating agencies will accept, and $\text{NWP}_{\max}$ is the premium that surplus can support. $R$ is the net premium the insurer expects to renew, $N$ is the new net premium it can add, and $e$ is the acquisition expense ratio on new business.
- **Financial capacity:** Capacity is the amount of business an insurer can write given its surplus. Writing more premium per dollar of surplus raises the return on surplus but leaves a thinner cushion against adverse results ([[Insurance Leverage]]), so management sets a premium-to-surplus limit and allocates the capacity it allows among lines, as a strategic choice. New business uses up surplus in its first year, because statutory accounting charges acquisition expenses when they are paid while the [[Unearned Premium|unearned premium]] reserve is held in full, which is the $1 + ke$ in the second formula.
- **Regulation:** States regulate the rates and forms an insurer may use, the classes it may refuse, and when it may cancel or nonrenew. They prohibit unfairly discriminatory selection and may require participation in residual markets, so underwriting policy can't simply withdraw from a class or territory that loses money. Market conduct examinations check that the insurer's actual practice matches its filings ([[Market Conduct Regulation]]).
- **Personnel:** An insurer can write only what it has people to underwrite, service and adjust. Entering a specialized line, such as aviation or environmental liability, needs underwriters with that expertise, and expanding into a region needs staff and producers there.
- **Reinsurance:** Reinsurance treaties state which classes are covered, the limits the insurer may cede, and sometimes classes that are excluded altogether. Underwriting policy must stay inside them, because a risk outside the treaty is retained in full unless facultative cover is bought. Reinsurance also adds capacity, since a [[Quota Share|quota share]] cedes part of the premium and its ceding commission offsets the acquisition expense on what is ceded.
- **Financial objectives:** Within the constraints, the policy serves the insurer's goals for profit, growth and stability ([[Insurer Goals and Constraints]]). The mix it chooses affects the loss ratio, the expense ratio and the volatility of results, so changing it is a strategic decision rather than an account-level one.
- **Underwriting guides:** The guide, or manual, codifies the policy. It lists acceptable, borderline and prohibited classes, the hazards and information each class requires, the authority each level holds ([[Underwriting Authority]]), rating instructions and procedures. It keeps decisions consistent across underwriters and offices and is how the policy reaches the line.
- **Bulletins and audits:** Underwriting bulletins announce changes to the guide, such as a new form, a class withdrawn after poor results, a rate change, or a response to a court decision or new law. Underwriting audits review a sample of files, either in the field or remotely, to check that underwriters followed the guide and stayed within their authority, and their findings feed back into training and into the guide itself.

> [!example]- Capacity for New Writings Under a Premium-to-Surplus Limit {Example}
> An insurer has surplus of \$400 million and expects to renew \$1,050 million of net written premium next year. Its policy caps net written premium at 3 times surplus, an illustrative limit at the top of the usual range for the [[IRIS Ratios|IRIS]] premium-to-surplus test. New business carries acquisition expenses of 25% of premium, paid when it is written. (a) How much new net premium can it write? (b) If it cedes 30% of the new business under a quota share whose ceding commission equals the acquisition expense on the ceded share, how much gross new premium can it write? Assume, to keep it simple, that surplus changes only by the acquisition expense on the new writings.
>
> > [!answer]-
> > Without the expense strain, the room under the limit would be $3(400) - 1{,}050 = 150$ million. The strain reduces surplus as new premium is written, so the limit must hold after it.
> > $$
> > \begin{align*}
> > 3(400 - 0.25N) &\ge 1{,}050 + N \\
> > N &\le \frac{1{,}200 - 1{,}050}{1 + 0.75} \\
> > &= 85.7
> > \end{align*}
> > $$
> > The insurer can add about \$85.7 million of net new premium, leaving surplus of \$378.6 million against \$1,135.7 million of premium, exactly 3 to 1. With the quota share, the net premium and the net strain are both 70% of the gross writings $G$, so the net limit is the same.
> > $$
> > \begin{align*}
> > 0.70\,G &\le 85.7 \\
> > G &\le \frac{85.7}{0.70} \\
> > &= 122.4
> > \end{align*}
> > $$
> > The quota share lets the insurer write about \$122.4 million of gross new business, 43% more, at the cost of ceding 30% of its profit on that business. That is the surplus relief that makes quota shares popular with fast-growing insurers.

> [!example]- Withdrawing a Class Through a Bulletin {Example}
> An insurer's guide lists restaurants as an acceptable class for commercial property. Over three years the class earned premium of \$18 million and incurred losses of \$14.4 million, against a [[Permissible Loss Ratio|permissible loss ratio]] of 62%. An audit finds that a third of the restaurant files lacked the required inspection of kitchen fire suppression. What should the underwriting department do?
>
> > [!answer]-
> > The class's loss ratio is well above what the rates allow.
> > $$
> > \begin{align*}
> > \text{LR} &= \frac{14.4}{18} \\
> > &= 80\% \\
> > \text{Excess over PLR} &= 0.80 - 0.62 \\
> > &= 18 \text{ points}
> > \end{align*}
> > $$
> > The audit shows that part of the problem is implementation, not the policy itself, so the first step is a bulletin that moves restaurants to the borderline list, which requires referral and a documented suppression inspection. The department may also file a rate increase, and if results do not improve it can withdraw the class, subject to the state's rules on nonrenewal. Reporting the class's results to management closes the loop between the policy and its effect.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask for the constraints on underwriting policy and how each one limits what an insurer writes, such as a premium-to-surplus limit, a treaty exclusion or a regulator's restriction on nonrenewal. Others ask how policy is implemented, by naming the purpose of the underwriting guide, a bulletin and an audit, or by choosing which tool fits a scenario.

> [!warning]- Exam traps
> - **Capacity is surplus, not assets:** The premium-to-surplus ratio uses policyholders' surplus. Using total assets or reserves overstates how much business the insurer can support.
> - **Growth uses surplus:** Writing new business reduces statutory surplus in the first year because acquisition expenses are charged at once. Ignoring that strain overstates the capacity for new writings.
> - **Policy versus authority:** Underwriting policy decides what the insurer will write, and underwriting authority decides who may make each decision under it. A guide contains both, but they answer different questions.
> - **Bulletins change the guide:** A bulletin communicates a change in policy or procedure. An audit checks compliance with the policy that already exists, and neither one is a rate filing.
