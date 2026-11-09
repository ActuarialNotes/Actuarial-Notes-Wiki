---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:1e64f72c2f8df97ad0d5d9bc0e1c9e4ec43714df69fc62207a9785ff08591506
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9 Bornhuetter-Ferguson Technique, PDF pp.158, 162 (printed 152, 156): same patterns as development technique; CDFs less than 1.00, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Bornhuetter-Ferguson Method.md
---

![[Media/Figures/Bornhuetter-Ferguson_Method.svg|340]]

The **Bornhuetter-Ferguson Method** is the reserving method that estimates an accident year's [[Ultimate Loss|ultimate claims]] as its actual reported claims plus its expected unreported claims. The expected unreported claims come from an a priori estimate of [[Expected Loss Method|expected claims]] and the [[Cumulative Development Factor|cumulative development factor]] of the [[Chain Ladder Method|development technique]]. The reported Bornhuetter-Ferguson ultimate claims are

> $$\text{Ultimate Claims} = \text{Reported Claims} + \text{Expected Claims} \times \left(1 - \frac{1}{\text{CDF}}\right)$$

- $\text{Reported Claims}$ are the actual reported claims to date.
- $\text{Expected Claims}$ are the a priori expected ultimate claims, usually the expected claim ratio times the earned premium.
- $1/\text{CDF}$ is the percent reported, so $1 - 1/\text{CDF}$ is the percent unreported.

The paid Bornhuetter-Ferguson method adds the expected unpaid claims to the paid claims, with the paid CDF, and uses the same expected claims. The expected unreported claims are the [[IBNR]]. A year with a CDF of 1.000 has no expected unreported claims, and its ultimate is its reported claims.

> [!example]- AY 2023 has earned premium of $\$2{,}000{,}000$, an expected claim ratio of 65%, reported claims of $\$600{,}000$ and a reported CDF of 1.896. What are its Bornhuetter-Ferguson IBNR and ultimate claims? {Example}
> - The expected claims are $0.65 \times 2{,}000{,}000 = \$1{,}300{,}000$.
> - The percent reported is $1/1.896 = 52.7\%$, so the percent unreported is 47.3%.
> - The IBNR is the expected unreported claims, $1{,}300{,}000 \times 0.4726 = \$614{,}346$.
> - The ultimate claims are $600{,}000 + 614{,}346 = \$1{,}214{,}346$.

## Credibility weighting of the development and expected claims techniques

The Bornhuetter-Ferguson method is a credibility weighting of the development technique and the expected claims technique. The ultimate claims are also

> $$\text{Ultimate Claims} = Z \times (\text{Reported Claims} \times \text{CDF}) + (1 - Z) \times \text{Expected Claims}$$

- $Z = 1/\text{CDF}$ is the credibility given to the development technique, the percent reported.

The development technique gives the claims to date full credibility, $Z = 1$, and the expected claims technique none, $Z = 0$. The Bornhuetter-Ferguson method gives more weight to the expected claims in immature years and more to the development technique in mature years, where it converges to the development estimate. It also equals the development estimate whenever the reported claims equal the expected reported claims.

> [!example]- For the same AY 2023, what are the development technique's ultimate and the credibility-weighted ultimate? {Example}
> - The development technique's ultimate is $600{,}000 \times 1.896 = \$1{,}137{,}600$.
> - The credibility is $Z = 1/1.896 = 0.5274$.
> - The weighted ultimate is $0.5274 \times 1{,}137{,}600 + 0.4726 \times 1{,}300{,}000 = \$1{,}214{,}346$, the Bornhuetter-Ferguson ultimate.
> - It is above the development estimate because the claims reported so far, $\$600{,}000$, are below the $1{,}300{,}000 \times 0.527 = \$685{,}654$ expected by now, and the method does not extrapolate the shortfall.

Where salvage and subrogation lag the claims, or conservative case reserves settle for less, the CDF can be below 1.00 and $Z$ above 1, outside the range of a credibility. Actuaries then limit the CDFs to a minimum of 1.00 when applying the method, or calculate it with the lower factors and rely on another technique to select those years' ultimates.

## Key assumption and when it works

The key assumption is that unreported (or unpaid) claims will develop based on expected claims. The claims reported to date carry no information about the claims yet to be reported. The development technique assumes the opposite.

- **Random fluctuations early in a year do not distort it.** A large or unusual claim is added to the ultimate dollar for dollar, not multiplied by the CDF, so large and catastrophe claims distort it less than the development technique.
- **It suits immature years of [[Long Tail Lines|long-tail lines]]**, whose CDFs are highly leveraged, and thin or volatile data, such as a new line or territory with benchmark patterns and claim ratios.
- **It suits very short-tail lines too.** Setting IBNR at a multiple of the last few months' earned premium is essentially a Bornhuetter-Ferguson calculation.
- **It does not respond to a changing claim ratio.** When claim ratios rise, the expected unreported claims stay where they were unless the expected claim ratio is changed, so the IBNR is too low. The paid method understates more than the reported one, because the percent unpaid is larger than the percent unreported.
- **A change in case adequacy distorts the reported method less.** Stronger case reserves raise the reported CDFs, so the reported method overstates the IBNR, but by less than the development technique, because the higher percent unreported multiplies the unchanged expected claims rather than the inflated reported claims. The paid method is unaffected.
- **A change in mix needs new assumptions.** Growth in a segment with a higher claim ratio and a longer pattern leaves both the expected claim ratio and the CDFs too low.

The expected claim ratio is the weak point. If the Bornhuetter-Ferguson ultimates drift steadily away from the other methods' estimates as the years get younger, the expected claim ratio is out of line, too low if they drift down. Where no reliable a priori exists, the [[Cape Cod Method|Cape Cod method]] derives it from the data.

> [!example]- Two accident years each have $\$14{,}000{,}000$ of earned premium, a 65% expected claim ratio and a 12-month CDF of 3.20. AY A has reported $\$3{,}000{,}000$, and AY B has reported $\$4{,}500{,}000$, including one $\$1{,}500{,}000$ shock claim. How do the development and Bornhuetter-Ferguson ultimates respond? {Example}
> - The expected claims are $0.65 \times 14{,}000{,}000 = \$9{,}100{,}000$, and the percent unreported is $1 - 1/3.20 = 68.75\%$.
> - The development ultimates are $3{,}000{,}000 \times 3.20 = \$9{,}600{,}000$ for A and $4{,}500{,}000 \times 3.20 = \$14{,}400{,}000$ for B.
> - The Bornhuetter-Ferguson ultimates are $3{,}000{,}000 + 0.6875 \times 9{,}100{,}000 = \$9{,}256{,}250$ for A and $4{,}500{,}000 + 0.6875 \times 9{,}100{,}000 = \$10{,}756{,}250$ for B.
> - The shock claim moves the development ultimate by $\$4{,}800{,}000$ and the Bornhuetter-Ferguson ultimate by $\$1{,}500{,}000$, the size of the claim itself.

> [!trap] Multiplying by the percent reported
> The expected claims are multiplied by the percent **unreported**, $1 - 1/\text{CDF}$, not the percent reported. For AY 2023, $1{,}300{,}000 \times 0.527 = \$685{,}654$ is the claims expected to be reported by now. Added to the reported claims it gives $\$1{,}285{,}654$ in place of the correct $\$1{,}214{,}346$.
