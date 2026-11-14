---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e57c14d118fea7c824aa2d221559ac062c9b587f4b15afbdd9bd52623ecf7a63
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Coverage.md
---

An **Insurance Coverage** is the protection an [[Insurance Policy|insurance policy]] provides: the insured event, the benefit the [[Insurer|insurer]] pays when it occurs, the period over which the promise runs, and the limits, exclusions and conditions that bound it. Every coverage is either an **indemnity**, which reimburses a measured loss, or a **fixed benefit**, which pays a stated amount when the event happens.

## Indemnity

If the insured event causes a loss $X$, an indemnity coverage pays an amount $Y$ that never exceeds the loss:

> $$0 \le Y = g(X) \le X$$

- $g$ is the payment function set by the [[Deductible|deductible]], [[Coinsurance|coinsurance]] and limits ([[Coverage Modifications|coverage modifications]]).

## Fixed benefit

A fixed benefit coverage pays

> $$Y = b \cdot \mathbf{1}\{\text{insured event occurs}\}$$

- $b$ is the stated benefit, such as a life insurance sum insured or a monthly disability income.
- $\mathbf{1}\{\cdot\}$ is 1 if the event occurs and 0 otherwise.

A fixed benefit is paid whatever the loss, so it needs [[Insurable Interest|insurable interest]] and underwriting of the amount rather than loss adjustment. The same event can be covered either way: a hospital stay can trigger an expense-reimbursing indemnity and a fixed daily cash benefit at once.

> [!example]- What does each of this policyholder's two coverages pay? {Example}
> A policyholder incurs $\$12{,}000$ of medical expenses. Her medical expense coverage has a $\$1{,}000$ deductible and pays $80\%$ above it. She also holds a critical illness policy paying a fixed $\$25{,}000$ on diagnosis.
>
> > [!answer]-
> > - The medical coverage is an indemnity: it pays $0.80(12{,}000 - 1{,}000) = \$8{,}800$.
> > - It leaves her $\$3{,}200$ of the expense, and it could never pay more than $\$12{,}000$.
> > - The critical illness policy is a fixed benefit: it pays $\$25{,}000$ whatever the illness cost.

## Short-term and long-term coverages

[[Short-Term Insurance Coverage|Short-term coverages]], such as property, liability, auto and group health, run a year or less and are repriced at renewal. Their pricing and reserving work is in frequency, severity and outstanding claims.

[[Long-Term Insurance Coverage|Long-term coverages]] fix premiums and benefits for many years. They include [[Life Insurance|life insurance]] (whole life, term, endowment), [[Annuity Contract|annuities]], long-term health and disability cover, and [[Defined Benefit Plan|defined benefit]] and [[Defined Contribution Plan|defined contribution]] [[Pension Plan|pension plans]]. Interest and survival dominate their values, and the insurer must hold [[Reserve|reserves]].

> [!trap] Treating a fixed benefit as an indemnity
> A life or critical illness benefit is not reduced to the loss the event caused. Capping it at the expenses incurred is wrong.
