---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:85f66791c4c85406ea537e5b9c5c439b1c6be556fd15232664002442e35e424f
  sources:
    - "IRMI Glossary, 'capacity', entry, sha256:a21b8c9f170b484498d12e8c2f5152feb16596960b298365c36d227ee54b91bd — https://www.irmi.com/term/insurance-definitions/capacity"
    - "IRMI Glossary, 'underwriting capacity', entry, sha256:2ebab1745fa85c796d55db07af95f952f3954ba6d1539cede8f126bd6feab02e — https://www.irmi.com/term/insurance-definitions/underwriting-capacity"
    - "IRMI Glossary, 'surplus relief', entry, sha256:a566036b62b517dad05c5eb731c16cdeb11a341f9d702ad7aecaa373fe995610 — https://www.irmi.com/term/insurance-definitions/surplus-relief"
    - "IRMI Glossary, 'underwriting guidelines', entry, sha256:0ebdd2f245496dfc1f32b8a478a7daf0a89ee1494cda4ffa445471b5d33ac113 — https://www.irmi.com/term/insurance-definitions/underwriting-guidelines"
    - "IRMI Glossary, 'staff underwriter', entry, sha256:b2d2b0aacfead61f6ee5debe5c8f13fdd6475253d2bba76b5ee7a148cf45b632 — https://www.irmi.com/term/insurance-definitions/staff-underwriter"
    - "NAIC, IRIS Ratios Means and Medians (2025), P&C ratio 2 Net Premium to Surplus, 'Unusual if Equal to or Over' 300, P&C ratio 2 threshold, sha256:0cb14c7a1f73bee94056296833cce0b70659e23b43842df033819fb962fde0ba — https://content.naic.org/sites/default/files/publication-iris-means-median-2025.pdf"
    - "NAIC Accounting Practices and Procedures Manual (Mar 2025, Indiana DOI copy), SSAP No. 71 ¶2, SSAP No. 71 ¶2, PDF p.525, sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
    - "SOA Exam GIINT Introduction to General Insurance, February 10, 2014, with answers (NAIC-hosted copy), Q11 and Q12 (p.7), answer key p.32: Q11 A, Q12 D, sha256:7e0e508af4eb9322d2b05593cb8c1eca3e43a8838e3ea10fdb51b923bdfde7f3 — https://content.naic.org/sites/default/files/inline-files/committees_c_catf_related_five.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Policy.md
---

**Underwriting Policy** is the set of decisions, made by an insurer's senior management, about the business it will write: which lines, classes and territories, at what limits, on what forms and at what prices. It turns the insurer's goals for profit, growth and stability ([[Insurer Goals and Constraints]]) into rules that line underwriters apply account by account. It is shaped by four constraints:

1. **Financial capacity.** The amount of business the insurer can write given its surplus.
2. **Regulation.** States regulate the rates and forms an insurer may use, the classes it may refuse, and when it may cancel or nonrenew.
3. **Personnel.** An insurer avoids classes of business that its people lack the marketing and underwriting expertise to write, so entering a specialized line needs people with that expertise.
4. **Reinsurance.** Treaties state which classes are covered, the limits the insurer may cede, and sometimes classes that are excluded altogether.

The mix the policy chooses affects the loss ratio, the expense ratio and the volatility of results, so changing it is a strategic decision rather than an account-level one.

## Financial capacity

Management caps the ratio of net [[Written Premium|written premium]] to policyholders' surplus $S$ ([[Capital and Surplus]]) at a multiple $k$, so the most premium the surplus can support is

> $$\text{NWP}_{\max} = k \times S$$

- $k$ is the largest premium-to-surplus ratio that management, its regulators and the rating agencies will accept.

Writing more premium per dollar of surplus raises the return on surplus but leaves a thinner cushion against adverse results ([[Insurance Leverage]]), so management sets the limit and allocates the capacity it allows among lines.

New business uses up surplus in its first year, because statutory accounting charges acquisition expenses when they are paid while the [[Unearned Premium|unearned premium]] reserve is held in full. With $R$ of premium expected to renew, the new net premium $N$ the insurer can add satisfies $k(S - eN) \ge R + N$, so

> $$N \le \frac{kS - R}{1 + k\,e}$$

- $e$ is the acquisition expense ratio on new business.

Reinsurance adds capacity. A [[Quota Share|quota share]] cedes part of the premium, and its ceding commission offsets the acquisition expense on what is ceded.

> [!example]- How much new business can this insurer write, with and without a quota share? {Example}
> An insurer has surplus of \$400 million and expects to renew \$1,050 million of net written premium next year. Its policy caps net written premium at 3 times surplus, an illustrative limit at the top of the usual range for the [[IRIS Ratios|IRIS]] premium-to-surplus test. New business carries acquisition expenses of 25% of premium, paid when it is written. A quota share would cede 30% of the new business, with a ceding commission equal to the acquisition expense on the ceded share. Surplus changes only by the acquisition expense on the new writings.
>
> > [!answer]-
> > - Without the expense strain, the room under the limit would be $3(400) - 1{,}050 = 150$ million.
> > - The strain reduces surplus as new premium is written, so $N \le (1{,}200 - 1{,}050)/(1 + 0.75) = 85.7$ million.
> > - That leaves surplus of $\$378.6$ million against $\$1{,}135.7$ million of premium, exactly 3 to 1.
> > - With the quota share, the net premium and the net strain are both 70% of the gross writings $G$, so $0.70\,G \le 85.7$.
> > - The insurer can write $G \le 85.7/0.70 = 122.4$ million of gross new business, 43% more, at the cost of ceding 30% of its profit on that business. That is the surplus relief that makes quota shares popular with fast-growing insurers.

## Regulation, personnel and reinsurance

States prohibit unfairly discriminatory selection and may require participation in residual markets, so underwriting policy can't simply withdraw from a class or territory that loses money. Market conduct examinations check that the insurer's actual practice matches its filings ([[Market Conduct Regulation]]).

Underwriting policy must stay inside the reinsurance treaties, because a risk outside the treaty is retained in full unless facultative cover is bought.

## Implementing underwriting policy

The policy is put into practice through underwriting guidelines and underwriting audits. The guidelines are the rules and requirements the insurer gives its agents and underwriters for accepting, modifying or rejecting a prospective insured ([[Underwriting Guidelines]]). Staff underwriters develop and interpret them, which keeps underwriting decisions consistent, and line underwriters apply them to each submission. Who may decide what is [[Underwriting Authority|underwriting authority]].

Staff underwriters analyze loss experience, follow market and regulatory developments, conduct underwriting audits and train line underwriters, and they recommend changes to forms, rates, eligibility rules and authority levels, so what an audit finds feeds back into the guidelines.

> [!example]- What should the underwriting department do about this restaurant class? {Example}
> An insurer's guidelines list restaurants as an acceptable class for commercial property. Over three years the class earned premium of \$18 million and incurred losses of \$14.4 million, against a [[Permissible Loss Ratio|permissible loss ratio]] of 62%. An audit finds that a third of the restaurant files lacked the required inspection of kitchen fire suppression.
>
> > [!answer]-
> > - The class's loss ratio is $14.4/18 = 80\%$, 18 points above what the rates allow.
> > - The audit shows that part of the problem is implementation, so the first step is a change to the guidelines that moves restaurants to the borderline list, which requires referral and a documented suppression inspection.
> > - The department may also file a rate increase, and if results do not improve it can withdraw the class, subject to the state's rules on nonrenewal.

> [!trap] Forgetting that growth uses surplus
> Writing new business reduces statutory surplus in the first year, because acquisition expenses are charged at once. Taking the room under the limit, $kS - R$, as the new premium overstates the capacity for new writings. Divide it by $1 + ke$.
