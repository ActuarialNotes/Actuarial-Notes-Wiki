---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:aa87309a56c80aa85f27547539c699fa9255aaa54c67c6d713496334b22bbc80
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.11 pp.206-215 (PDF pp.218-227; pp.210-212 read as page images), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "CAS Exam 5 Content Outline, Fall 2026 (Exam_5_CO_2026_F v02), p.4 task A14, sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coinsurance Rating.md
---

![[Media/Figures/Coinsurance_Rating.svg|340]]

**Coinsurance Rating** is the pricing of property insurance so that premiums stay equitable when insureds carry different levels of [[Insurance to Value|insurance to value]] (ITV). Either a **coinsurance clause** cuts the loss payment of an insured who carries less than a required share of value, or the rate per amount of insurance is set by the face amount chosen. Under a coinsurance clause, the indemnity for a loss $L$ after any deductible is

> $$I = \min\!\left(L \times \frac{F}{cV},\; F\right)$$

- $F$ is the face value, the amount of insurance selected.
- $V$ is the value of the property.
- $c$ is the required [[Coinsurance Percentage|coinsurance percentage]].
- $F < cV$. An insured who carries at least $cV$ is paid the loss, up to $F$.

$cV$ is the coinsurance requirement, the minimum amount of insurance the insured must carry to avoid a penalty, and $\min(F/cV,\,1)$ is the apportionment ratio. Fall short and every partial loss is settled at the ratio of insurance carried to insurance required. The clause works only if the value of the property can be established when a loss is settled. The clause is a penalty on underinsurance, applied to the loss payment, and is distinct from a percentage participation under which the insured shares a fixed percentage of every loss.

> [!idea] The idea
> Because most property losses are partial, a policy for 60% of a home's value still pays most losses in full, so it must either pay less on a loss or cost more per $\$1{,}000$ of insurance.

Charged the same rate per $\$1{,}000$ as a full-value policy, the underinsured policy is undercharged. The coinsurance clause fixes this on the loss side, and rating by amount of insurance fixes it on the premium side.

> [!example]- A home valued at $\$640{,}000$ is insured for $\$480{,}000$ under a 90% coinsurance requirement, with no deductible. What is the indemnity for losses of $\$120{,}000$, $\$540{,}000$ and $\$600{,}000$? {Example}
> - The coinsurance requirement is $0.90 \times 640{,}000 = \$576{,}000$.
> - The apportionment ratio is $480{,}000/576{,}000 = 5/6$.
> - For a loss of $\$120{,}000$, the indemnity is $\tfrac{5}{6} \times 120{,}000 = \$100{,}000$.
> - For $\$540{,}000$, it is $\tfrac{5}{6} \times 540{,}000 = \$450{,}000$, below the face value.
> - For $\$600{,}000$, $\tfrac{5}{6} \times 600{,}000 = \$500{,}000$ is capped at the face value, so the indemnity is $\$480{,}000$.

## Coinsurance penalty

The coinsurance penalty $e$ is what the clause takes away from the payment the insured would otherwise receive, so it is

> $$e = \begin{cases} L - I, & L \le F \\ F - I, & F < L < cV \\ 0, & L \ge cV \end{cases}$$

The penalty arises only when $L > 0$, $F < cV$ and $L < cV$. It rises linearly to its largest at $L = F$, where it is $F\,(1 - F/cV)$, and falls back to zero at $L = cV$. Above $cV$ the insured is still unpaid for whatever exceeds $F$.

> [!example]- For the same home, what is the coinsurance penalty on each of the three losses, and what is the largest penalty possible? {Example}
> - On $\$120{,}000$, below the face value, the penalty is $120{,}000 - 100{,}000 = \$20{,}000$.
> - On $\$540{,}000$, between the face value and the requirement, it is $480{,}000 - 450{,}000 = \$30{,}000$.
> - On $\$600{,}000$, above the requirement, it is zero, but the insured still bears the $\$120{,}000$ above the face value.
> - The largest penalty is at a loss equal to the face value, $480{,}000 \times (1 - \tfrac{5}{6}) = \$80{,}000$.

## Rate per amount of insurance

Without a coinsurance clause, the rate varies with the amount of insurance. If losses have probability $s(L)$ of each size $L$, the rate per unit of face value is the expected indemnity divided by the face value:

> $$\text{Rate} = \frac{\text{Frequency} \times E[\min(L, F)]}{F}$$

- $\text{Frequency}$ is the expected number of losses per policy.
- $E[\min(L, F)] = \sum_{L \le F} L\,s(L) + F \sum_{L > F} s(L)$ is the expected indemnity per loss.

Where partial losses are possible, the rate per amount of insurance *falls* as $F$ approaches $V$. It falls at a decreasing rate when small losses predominate, at a constant rate for a uniform distribution, and at an increasing rate when large losses predominate. The coinsurance is then whatever part of a loss exceeds the face value. The major difficulty of the approach is knowing the loss distribution.

> [!example]- A home is valued at $\$400{,}000$ and its claim frequency is 2%. Half its losses average $\$50{,}000$ (in $\$0$–$100{,}000$), a quarter average $\$150{,}000$ (in $\$100{,}000$–$200{,}000$), 15% average $\$250{,}000$ (in $\$200{,}000$–$300{,}000$) and 10% average $\$350{,}000$ (in $\$300{,}000$–$400{,}000$). With no expenses or profit, what is the rate per $\$1{,}000$ at face values of $\$200{,}000$, $\$300{,}000$ and $\$400{,}000$? {Example}
> - Every loss above the face value pays the face value.
> - At $\$200{,}000$, the expected indemnity per loss is $0.50(50) + 0.25(150) + 0.25(200) = \$112.5$ thousand.
> - At $\$300{,}000$, it is $0.50(50) + 0.25(150) + 0.15(250) + 0.10(300) = \$130.0$ thousand.
> - At $\$400{,}000$, it is $0.50(50) + 0.25(150) + 0.15(250) + 0.10(350) = \$135.0$ thousand.
> - The pure premiums are $0.02 \times 112{,}500 = \$2{,}250$, $\$2{,}600$ and $\$2{,}700$.
> - The rates per $\$1{,}000$ are $2{,}250/200 = \$11.25$, $2{,}600/300 = \$8.67$ and $2{,}700/400 = \$6.75$.
> - The rate falls by $\$2.58$, then by $\$1.92$, at a decreasing rate, because small losses predominate.

## Insurance to value and equity

On an underinsured home, the payment does not cover the whole loss when one exceeds the face value, and a rate set for full ITV collects too little premium for its expected payments. The rates are then *inequitable*. If every home is underinsured by the same percentage, the premium may be inadequate but the rates stay equitable, and the base rate drifts over time to the book's actual ITV. Both problems exist only because partial losses are possible. If every loss were total, the rates would be equitable and adequate.

Insurers encourage insurance to value in several ways:

1. **Guaranteed replacement cost** lets the payment exceed the limit for a home insured to 100% of value. It has been capped, for example at 125% of the limit, since the catastrophes of the 1990s.
2. **Component-based property estimation tools** estimate the replacement cost, at new business and at renewal.
3. **Inspections, indexation clauses and educating insureds** keep the amount of insurance up to date.

Raising underinsured homes to the ITV the rates assume brings in premium without a rate increase. Because small losses predominate in homeowners, it brings in more premium than added loss. The actuary estimates each initiative's effect on results.

> [!example]- The insurer charges every home the full-ITV rate of $\$6.75$ per $\$1{,}000$. The home above is insured for $\$300{,}000$, and a property estimation tool moves it to its full $\$400{,}000$ at renewal. What happens to its premium and its expected losses? {Example}
> - At $\$300{,}000$, the premium is $300 \times 6.75 = \$2{,}025$, against expected losses of $\$2{,}600$.
> - At $\$400{,}000$, the premium is $400 \times 6.75 = \$2{,}700$, against expected losses of $\$2{,}700$.
> - The premium rises $\$675$, but the expected losses rise only $\$100$.
> - The underinsured home was $\$575$ short, and **full ITV closes the gap** with no change to the rate.

> [!trap] The penalty between $F$ and $cV$
> For a loss above the face value but below the requirement, the penalty is $F - I$, not $L - I$. Without the clause the insured would have received $F$, not $L$. Using $L - I$ there overstates the penalty by $L - F$.
