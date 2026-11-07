---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea4e678b6a1666c00ad7077361d7890de05f3836df5c1c5f331aa7a350b82015
  sources:
    - "Patrik, Reinsurance, Ch.7 of Foundations of Casualty Actuarial Science (4th ed., CAS 2001) — Exam 7's reading before Friedland (2022), printed pp.451-458 (PDF pp.109-116: CL and BF disadvantages; Stanard-Bühlmann method, earned risk pure premium net of commissions, brokerage and internal expenses, Formula 7.64, used-up premium, Table 7.65 and the accuracy comparison; Credibility IBNR, Formula 7.66), sha256:26f2fc8441b1a2f8b335a9bfc9e20f0c742fa340c4b7f6eff93376c3c340cf06 — https://www.casact.org/sites/default/files/database/studynotes_ch7.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.10 Cape Cod Technique, PDF pp.180-185 (printed 174-179: Cape Cod = reported BF with the expected claim ratio from reported experience; used-up premium = EP x % reported; % reported = 1/CDF; not as appropriate as BF for thin or volatile data; on-level premium and trended claims required in theory; Scenario 3 case-strength overstatement), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Gluck, Balancing Development and Trend in Loss Reserve Analysis (PCAS LXXXIV, 1997), printed pp.482, 494-496 (PDF pp.1, 13-15: Generalized Cape Cod; Cape Cod gives excessive weight to out-of-date results; decay weight D^|i-j| decreases with the trending period, so each year of origin gets its own drifting expected pure premium, eq. 6.1), sha256:98aa10a8d79b378de986f403150d498778088c48a9d0d5f4f18689e664a9da1c — https://casact.org/sites/default/files/database/proceed_proceed97_97482.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cape Cod Method.md
---

![[Media/Figures/Cape_Cod_Method.svg|340]]

The **Cape Cod Method**, or Stanard-Bühlmann method, is the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson method]] with the expected claim ratio derived from the reported claims experience instead of selected by judgment. One expected claim ratio is derived for all the accident years together, as their total reported claims over their total used-up premium:

> $$\text{Expected Claim Ratio} = \frac{\sum \text{Reported Claims}}{\sum \text{Used-Up Premium}}$$

- $\text{Reported Claims}$ are each year's reported claims to date, not developed to ultimate.
- $\text{Used-Up Premium}$ is each year's earned premium times its percent reported, $\text{Earned Premium}/\text{CDF}$. It is the premium whose claims are expected to have been reported by the valuation date.

Each year's ultimate claims are then the reported claims plus the expected unreported claims, as in the Bornhuetter-Ferguson method:

> $$\text{Ultimate Claims} = \text{Reported Claims} + \text{Expected Claim Ratio} \times \text{Earned Premium} \times \left(1 - \frac{1}{\text{CDF}}\right)$$

- $1 - 1/\text{CDF}$ is the year's percent unreported, and the last term is its [[IBNR]].

The total IBNR is the sum over the accident years. With paid claims and the paid CDF, the same steps give a paid Cape Cod estimate. Exposures and pure premiums can replace premium and claim ratios, with used-up exposures in the denominator.

> [!example]- Three accident years have earned premium ($000) of 10,000, 10,500 and 11,000, reported claims of 6,300, 5,600 and 3,500, and reported CDFs of 1.050, 1.230 and 1.859 at 36, 24 and 12 months. What are the Cape Cod expected claim ratio and IBNR? {Example}
> - The used-up premiums are $10{,}000/1.050 = 9{,}524$, $10{,}500/1.230 = 8{,}537$ and $11{,}000/1.859 = 5{,}917$, a total of 23,978.
> - The reported claims total 15,400, so the expected claim ratio is $15{,}400/23{,}978 = 64.2\%$.
> - The percents unreported are $1 - 1/1.050 = 4.76\%$, $1 - 1/1.230 = 18.70\%$ and $1 - 1/1.859 = 46.21\%$.
> - The IBNRs are $0.642 \times 10{,}000 \times 0.0476 = 306$, $0.642 \times 10{,}500 \times 0.1870 = 1{,}261$ and $0.642 \times 11{,}000 \times 0.4621 = 3{,}263$.
> - The total IBNR is $\$4{,}830$ thousand. The immature year contributes only 5,917 of the 23,978 used-up premium, so the mature years set most of the ratio.

## Adjusting claims and premium to a common level

One ratio is applied to every year, so the claims and premium of all years must be on a common level first. The premium is brought to the current rate level ([[On Level Premium|on-level premium]]), and the reported claims are trended to a common cost level and adjusted for tort reform or benefit changes. The ratio derived from them is then restated to each year's own rate, cost and legal level before it multiplies that year's premium. For a year whose premium has on-level factor $\text{OLF}$ and whose claims are trended $n$ years to the common level, the expected claim ratio at the year's own level is

> $$\text{Year's Claim Ratio} = \frac{\text{Expected Claim Ratio} \times \text{OLF}}{(1 + t)^n \times \text{Reform Factor}}$$

- $t$ is the annual claim trend, and $\text{Reform Factor}$ is the tort reform adjustment applied to the year's claims.

Where the history of rate changes or trend is not available, the method is often run on unadjusted premium and claims. The actuary then keeps that simplification in mind when selecting ultimate claims.

> [!example]- The Cape Cod expected claim ratio at the 2024 rate and cost level is 70.0%. AY 2022 earned $\$10{,}000{,}000$, its on-level factor to 2024 rates is 1.08 and claim trend is 5% a year, with no reform. What are AY 2022's expected claims? {Example}
> - At 2024 rates its premium is $10{,}000{,}000 \times 1.08 = \$10{,}800{,}000$, and its expected claims at the 2024 cost level are $0.700 \times 10{,}800{,}000 = \$7{,}560{,}000$.
> - Two years of trend are removed: $7{,}560{,}000/1.05^2 = \$6{,}857{,}143$.
> - Equivalently, the year's claim ratio is $0.700 \times 1.08/1.1025 = 68.6\%$ of its unadjusted premium.

## Cape Cod against Bornhuetter-Ferguson

The key assumption is that unreported claims will develop based on expected claims, which are derived from the reported claims and earned premium. The two methods differ only in where the expected claims come from, so the comments on the Bornhuetter-Ferguson method apply to both. Reinsurers are among its most frequent users.

- **The expected claim ratio is mechanical.** It comes from the data, not from judgment, so it responds to a change in the claim ratios that is in the data, as the development technique does. A change anticipated but not yet in the data, such as a coming severity increase, can be built into a Bornhuetter-Ferguson ratio and not into a Cape Cod one.
- **One weighted ratio covers every year.** A Bornhuetter-Ferguson analysis can select different ratios for older and recent years; the Cape Cod method cannot. It assumes a single expected claim ratio across all years once they are on a common rate level. Gluck's [[Generalized Cape Cod Method|generalized Cape Cod method]] relaxes that assumption. It gives each year its own expected claim ratio, weighting the other years less the further they lie from it, because the claim ratio level can drift.
- **It needs credible data.** With thin or volatile data, or very high attachment points with sparse experience, the derived ratio is unreliable and the Bornhuetter-Ferguson method with a benchmark ratio is more appropriate.
- **It depends on the CDFs twice.** CDFs that are too high understate the used-up premium, which overstates the expected claim ratio, and they also overstate the percent unreported, so the IBNR is overstated. A strengthening of case reserves does both and also inflates the reported claims in the ratio's numerator.

> [!example]- Case reserves were strengthened two years ago on every open year. Should the reported Cape Cod method or the reported Bornhuetter-Ferguson method with a pricing-based ratio be relied on? {Example}
> - The strengthening raised the reported CDFs, so both methods overstate the percent unreported.
> - The Cape Cod ratio is also computed from the inflated reported claims and the understated used-up premium, so its expected claims are overstated too.
> - The Bornhuetter-Ferguson ratio from pricing never touches the distorted triangle, so it is affected only through the CDFs.
> - The Bornhuetter-Ferguson method is the better of the two, and a [[Berquist-Sherman Method|Berquist-Sherman]] restatement of the triangle before either is run is better still.

## The Cape Cod method in Exam 7

In Clark's growth-curve model, the Cape Cod method uses the expected percent of ultimate reported by age $x$, $G(x)$, in place of $1/\text{CDF}$. The expected loss ratio is the total claims to date over the total of each year's on-level premium times $G(x)$, and each year's reserve is that ratio times its premium times $1 - G(x)$, or $G(T) - G(x)$ when the curve is truncated at age $T$. It has fewer parameters than Clark's LDF method, one expected loss ratio for all years in place of an ultimate for each year. Several treaties can be combined by pooling their premiums, used-up premiums and reported claims into one ratio.

In Patrik's chapter, the premium is each treaty year's earned risk pure premium: the premium net of commissions, brokerage and internal expenses, adjusted to remove rate-level differences between years. As long as those adjustments are reasonably accurate, Stanard-Bühlmann gives more accurate estimates than the chain ladder for the recent, immature years and overall. When those adjustments are not fully trusted, the chain ladder and Stanard-Bühlmann IBNRs are credibility weighted. The weight on the chain ladder is $Z = \text{CF} \times \text{Rlag}$, a credibility factor $0 \le \text{CF} \le 1$ times the year's percent reported, so green years lean on Stanard-Bühlmann and older years on the chain ladder. Each year's IBNR is then $Z$ times its chain ladder IBNR plus $1 - Z$ times its Stanard-Bühlmann IBNR.

> [!trap] Developing the claims in the ratio
> The numerator is reported claims, not ultimate claims. Developing each year's claims and dividing by the full premium weights the years by premium instead of by used-up premium. In the three-year example, total developed claims over total premium give $20{,}010/31{,}500 = 63.5\%$ in place of 64.2%, because the immature year now counts with its full premium.
