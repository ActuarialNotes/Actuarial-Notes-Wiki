---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:53c775dcb4c33bd9befdfe63b85a330611ab96108ffba5ceda4f3279d89da87a
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.7 Development Technique, PDF pp.90-103 (printed 84-97): key assumptions, mechanics, when it works, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.9, PDF p.158-159 (printed 152-153), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Chain Ladder Method.md
---

![[Media/Figures/Chain_Ladder_Method.svg|340]]

The **Chain Ladder Method**, or development technique, is the reserving method that estimates an accident year's [[Ultimate Loss|ultimate claims]] by developing its claims to date with a [[Cumulative Development Factor|cumulative development factor]] read off a [[Development Triangle|development triangle]]. Applied to reported claims it is the reported development technique, and applied to paid claims it is the paid development technique. The ultimate claims of an accident year are

> $$\text{Ultimate Claims} = \text{Reported Claims} \times \text{CDF}$$

- $\text{Reported Claims}$ are the year's cumulative reported claims at its current age, the latest diagonal of the triangle.
- $\text{CDF}$ is the cumulative development factor from that age to ultimate.
- For the paid development technique, paid claims and the paid CDF take their places.

The same method develops claim counts, ALAE or any other cumulative amount with a triangle of its own. Since the percent reported at an age is $1/\text{CDF}$, the ultimate is also the reported claims divided by the percent reported.

> [!example]- Accident year 2024 has $\$625{,}000$ of reported claims at 12 months, and the reported CDF from 12 months to ultimate is 1.859. What are its ultimate claims? {Example}
> - The 12-month CDF applies, because the year is 12 months old.
> - The ultimate claims are $625{,}000 \times 1.859 = \$1{,}161{,}875$.
> - Equivalently, the year is $1/1.859 = 53.8\%$ reported, and $625{,}000/0.538 \approx \$1{,}162{,}000$.

## Age-to-age factors and the cumulative development factor

An [[Age to Age Factor|age-to-age factor]] is the ratio of an accident year's cumulative claims at two successive ages. From age $n$ to age $n+1$ it is

> $$f_{n \to n+1} = \frac{\text{Claims at age } n+1}{\text{Claims at age } n}$$

- Both amounts belong to the same accident year, one column apart in the triangle.

One factor is selected for each age from the column of observed factors, usually an average (simple, volume-weighted, latest years, or excluding the high and low). The CDF at age $n$ is the product of the selected factors from age $n$ onward and the [[Tail Factor|tail factor]], which covers development beyond the last age of the triangle:

> $$\text{CDF}_n = f_{n \to n+1} \times f_{n+1 \to n+2} \times \cdots \times \text{Tail}$$

- The tail factor is 1.000 when no development is expected after the last age.
- The CDF at a later age is the CDF at the earlier age divided by the factor between them, $\text{CDF}_{n+1} = \text{CDF}_n / f_{n \to n+1}$.

> [!example]- Cumulative reported claims ($000) are 575, 875 and 1,025 for AY 2022 at 12, 24 and 36 months, 600 and 900 for AY 2023, and 625 for AY 2024. With simple-average factors and a tail of 1.050, what are each year's ultimate claims and the total IBNR? {Example}
> The triangle, in $000:
>
> | AY | 12 mo | 24 mo | 36 mo |
> | --- | --- | --- | --- |
> | 2022 | 575 | 875 | 1,025 |
> | 2023 | 600 | 900 | |
> | 2024 | 625 | | |
>
> - The 12–24 factors are $875/575 = 1.522$ and $900/600 = 1.500$, so the selected $f_{12 \to 24}$ is their average, 1.511.
> - The only 24–36 factor is $1{,}025/875 = 1.171$.
> - The CDFs are built from the tail back:
>
> > $$
> > \begin{align*}
> > \text{CDF}_{36} &= 1.050 \\
> > \text{CDF}_{24} &= 1.171 \times 1.050 \\
> > &= 1.230 \\
> > \text{CDF}_{12} &= 1.511 \times 1.230 \\
> > &= 1.859
> > \end{align*}
> > $$
>
> - The ultimates are $1{,}025 \times 1.050 = 1{,}076$, $900 \times 1.230 = 1{,}107$ and $625 \times 1.859 = 1{,}162$.
> - The IBNR is $51 + 207 + 537 = \$795$ thousand. Two-thirds of it sits on AY 2024, the year with the largest CDF.

## IBNR and unpaid claims

IBNR is measured from reported claims, and the total unpaid claims from paid claims. Under the chain ladder the [[IBNR]] of an accident year is

> $$\text{IBNR} = \text{Reported Claims} \times (\text{CDF} - 1)$$

- This is the ultimate claims minus the reported claims.
- The total IBNR is the sum over the accident years, and a year at the last age with no tail has none.

The [[Unpaid Claims|unpaid claims]] are the ultimate claims minus the paid claims, which is the case outstanding plus the IBNR.

> [!example]- AY 2023 has $\$900{,}000$ of reported claims and $\$600{,}000$ of paid claims at 24 months, and its reported CDF is 1.230. What are its IBNR and its unpaid claims? {Example}
> - The ultimate claims are $900{,}000 \times 1.230 = \$1{,}107{,}000$.
> - The IBNR is $900{,}000 \times 0.230 = \$207{,}000$.
> - The case outstanding is $900{,}000 - 600{,}000 = \$300{,}000$.
> - The unpaid claims are $1{,}107{,}000 - 600{,}000 = \$507{,}000$, the case outstanding plus the IBNR.

## Key assumptions

The key assumption is that claims recorded to date will continue to develop in a similar manner in the future. The method also assumes that the claims observed so far in an immature year say something about the claims yet to come. It holds only while these stay stable over the experience period:

1. **Case reserve adequacy**, for reported claims. A [[Case Adequacy|strengthening of case reserves]] raises the latest diagonal and the factors built after it, so the reported projection overstates ultimate claims.
2. **Speed of claim closure and payment**, for paid claims. A [[Settlement Rate|faster settlement rate]] raises the paid diagonal, so historical paid factors overstate ultimate claims, and a slowdown understates them.
3. **Claim processing and reporting.** A new claims system or faster recording speeds up reporting, so the historical factors are too high.
4. **The mix of claims, policy limits and reinsurance retentions.** A shift in [[Mix of Business|mix]] toward longer-tailed or larger claims makes the old factors too low.
5. **The external environment.** A tort reform or a change in the statute of limitations makes the historical pattern unrepresentative.

When an assumption fails, the actuary adjusts the factors (or restates the triangle with the [[Berquist-Sherman Method|Berquist-Sherman]] adjustments) or turns to a method the change does not distort. The method uses no premium, exposure or a priori expectation, so a rate change does not affect it. Selecting the factors still takes judgment, and a small or new book uses benchmark patterns from similar lines or the industry.

> [!example]- Reported claims at 12 months have jumped in the latest accident year while paid claims at 12 months are in line with prior years. Average case outstanding per open claim rose much faster than severity trend. Which development projection can be trusted? {Example}
> - Reported claims rose without paid claims, and average case outstanding outran trend, so case reserves have been strengthened.
> - The reported projection applies factors from weaker-reserved years to a stronger-reserved diagonal, so it overstates ultimate claims.
> - Settlement speed has not changed, so the paid projection is not distorted.
> - The paid projection can be relied on, or the reported triangle restated for the change in case adequacy.

## Large claims and immature years

At an immature age the CDF is large, so the projection is highly leveraged: every dollar on the diagonal becomes CDF dollars of ultimate. A large claim, a catastrophe or a burst of early payments in a young year is multiplied by the full CDF, and in a [[Long Tail Lines|long-tail line]] the paid CDF at 12 months can exceed 10. The method works best for high-frequency, low-severity lines with stable, timely reporting and a large volume of data. For immature years of long-tail lines, or thin and volatile data, the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] or [[Expected Loss Method|expected claims]] technique is preferred.

A known [[Large Loss|large claim]] is handled separately. It is removed from the triangle, the remaining claims are developed, and the claims department's estimate of the large claim's ultimate is added back. The total is the sum of the two segments.

> [!example]- AY 2024 at 12 months has $\$4{,}500{,}000$ of reported claims, including one claim reserved at its $\$1{,}500{,}000$ policy limit. The 12-month CDF is 3.20, from years with no such claim. Earned premium is $\$14{,}000{,}000$. What are the ultimate claims, with and without separate treatment of the large claim? {Example}
> - Developed as reported, the ultimate is $4{,}500{,}000 \times 3.20 = \$14{,}400{,}000$, a claim ratio of 103%.
> - That projects the limit claim to grow to $1{,}500{,}000 \times 3.20 = \$4{,}800{,}000$, which it cannot do.
> - Without the large claim, the other claims develop to $3{,}000{,}000 \times 3.20 = \$9{,}600{,}000$.
> - Adding the large claim at its limit gives an ultimate of $9{,}600{,}000 + 1{,}500{,}000 = \$11{,}100{,}000$, a claim ratio of 79%.

## The chain ladder in Exam 7

In Exam 7's readings the chain ladder is a statistical model. The expected claims emerging in the next development period are proportional to the claims to date, through the age-to-age factor. Testing the model checks that this factor, the slope of next-age claims on current claims, is significant, and that the factors show no trend or shift in level across accident years. An additive model, in which the future emergence does not depend on the claims to date, is the Bornhuetter-Ferguson alternative, and an unusually high diagonal does not leverage it.

> [!trap] Applying the CDF for the wrong age
> Each accident year takes the CDF for its own current age, applied to its own latest diagonal. In the triangle example, AY 2023 is 24 months old, so its ultimate is $900 \times 1.230 = 1{,}107$. Applying the 12-month CDF instead gives $900 \times 1.859 = 1{,}673$, which develops 12 months of claims that have already emerged a second time.
