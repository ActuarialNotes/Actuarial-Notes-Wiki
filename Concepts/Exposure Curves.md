---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:b9e18b31a3e53958c77031ee7fd85cc6b02cdaf200d21e9e81030cc55ebbf60d
  sources:
    - "Bernegger, The Swiss Re Exposure Curves and the MBBEFD Distribution Class (ASTIN Bulletin 27(1), 1997), pp.99-111 read from page images (OCR): §2.1 eq (2.1), §2.2 eqs (2.2)-(2.3) 'With F(0) = 0 and G'(0) = 1/E[x]', §2.3 eq (2.4), §3 (3.10)-(3.12), §4.1 iterative b, §4.2 first two moments, §4.3 eqs (4.5)-(4.6), c = 0, 1.5-4 (Y1-Y4), 5 (Lloyd's industrial), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf"
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), §2A pp.17-19 (exposure curve P(p); layer P((R+L)/IV) - P(R/IV); limits profile per location basis, else distortions; all locations at the midpoint of the range; scale independence, homeowners vs large commercial risks), pp.27-29 (casualty ILFs as exposure factors), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 8 Fall 2012 — sample answers and examiner's report, Q10(a)-(b), PDF pp.53-54 (PP/IV at band midpoints; homogeneity of homes vs commercial construction and occupancy; per-risk profile vs per-location curve), sha256:f0a8a4e1060ad54d4a69208dd574d53dbcafc29ceddbabe7be0a2da2e0f9232b — https://www.casact.org/sites/default/files/2021-03/f12-8.pdf"
    - "CAS Exam 8 Fall 2016 — sample answers and examiner's report, Q21, PDF p.80 (even distribution of insured values, midpoint, citing Clark; G(8/8)-G(4/8) overstates), sha256:ad67f56b0e090f8c283c58e728d656f4685a6e2b3ff8219144ecb46facbeac2e — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_16-8.pdf"
    - "CAS Exam 8 Fall 2017 — sample answers and examiner's report, Q18(a)-(b), PDF p.88 (exposure distribution restated to a loss distribution; g = 1/p; Sample 2 computes the same G points without the restatement), sha256:9496e4d8e8eeea922abcb05728d8df22b73ca717b8bde0ee5e877f6d33bc3a65 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam8_17-8.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (tasks A1-A5, readings Clark, Bernegger, Grossi & Kunreuther), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Exposure Curves.md
---

An **Exposure Curve** gives, for a class of property risks, the share of expected loss that falls below a retention expressed as a fraction $d$ of each risk's maximum possible loss. It is used to split a risk's expected loss between the cedent's retention and a per-risk [[Excess of Loss|excess-of-loss]] layer. For a risk with ground-up loss $X$, the exposure curve is

> $$G(d) = \frac{E[X \wedge dM]}{E[X]}$$

- $M$ is the maximum possible loss (MPL), or the sum insured or EML.
- $d = D/M$ is the retention $D$ as a fraction of $M$, capped at $1$.
- $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]] of $X$ at $u$.

The cedent keeps $E[X]\,G(d)$ and the layer above cedes the rest. The expected loss in a layer from $D_1$ to $D_2$ is

> $$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M}\right)\right]$$

In exposure rating, the risk profile is banded by MPL, each band's expected loss is estimated as $\text{ELR} \times \text{premium}$, and $G$ is applied band by band. For casualty lines, [[Increased Limits|ILFs]] play the role of $G$ ([[Reinsurance Pricing]]). The curve prices a *per-risk* cover and says nothing about catastrophe accumulation.

> [!example]- What is the expected loss to this per-risk layer? {Example}
> A per-risk treaty covers $\$3$M xs $\$2$M, with an ELR of $60\%$. On the Swiss Re $c = 3$ curve, $G(0.10) = 0.4056$, $G(0.25) = 0.6002$ and $G(0.40) = 0.7163$.
>
> | Band | MPL | Premium |
> | :--- | ---: | ---: |
> | A | $\$5$M | $\$400{,}000$ |
> | B | $\$20$M | $\$600{,}000$ |
>
> > [!answer]-
> > - In band A the layer runs from $2/5 = 0.40$ to $\min(5/5, 1) = 1$ of MPL. In band B it runs from $2/20 = 0.10$ to $5/20 = 0.25$.
> > - Band A's expected loss is $0.60 \times 400{,}000 = \$240{,}000$, and its layer loss is $240{,}000 \times (1 - 0.7163) = \$68{,}088$.
> > - Band B's expected loss is $0.60 \times 600{,}000 = \$360{,}000$, and its layer loss is $360{,}000 \times (0.6002 - 0.4056) = \$70{,}056$.
> > - The expected layer loss is $68{,}088 + 70{,}056 = \$138{,}144$, which is $13.8\%$ of subject premium and $23.0\%$ of expected loss.

## The curve from the loss-degree distribution

The **loss degree** $y = X/M$, on $[0, 1]$, has CDF $F$. The exposure curve is its normalised limited expected value function:

> $$G(d) = \frac{\int_0^d \left(1 - F(y)\right) dy}{\int_0^1 \left(1 - F(y)\right) dy}$$

Bernegger gives its properties:

1. $G(0) = 0$ and $G(1) = 1$, and $G$ is increasing and concave.
2. $G'(0) = 1/E[y]$, so the slope at the origin gives the mean damage ratio.
3. $p = G'(1)/G'(0)$ is the probability of a total loss.
4. $F(y) = 1 - G'(y)/G'(0)$ for $y < 1$, so the curve and the distribution determine each other.

> [!example]- What share of this class's expected loss falls between $20\%$ and $50\%$ of MPL? {Example}
> For a class of warehouses, $10\%$ of losses are total, and below a total loss $1 - F(y) = 1 - 0.9y$ for $0 \le y < 1$.
>
> > [!answer]-
> > - The mean loss degree is $E[y] = \int_0^1 (1 - 0.9y)\,dy = 0.55$.
> > - The curve is $G(d) = (d - 0.45d^2)/0.55$.
> > - $G'(0) = 1/0.55 = 1/E[y]$ and $G'(1) = 0.1/0.55$, so $p = 0.10$, the total-loss share.
> > - $G(0.2) = 0.182/0.55 = 0.3309$ and $G(0.5) = 0.3875/0.55 = 0.7045$.
> > - The layer from $20\%$ to $50\%$ of MPL carries $0.7045 - 0.3309 = 0.3736$, or $37\%$, of expected loss.

Bernegger derives $F$ from $G$ with $F(0) = 0$, so $F$ describes the losses that occur, with no mass at zero. An exposure distribution that includes risks with no loss is restated first: each positive loss degree's probability is divided by $1 - P(\text{no loss})$. The values of $G$ come out the same either way, since the zero losses add nothing to $E[y \wedge d]$ or to $E[y]$. The mean $\mu = E[y]$ and the total-loss probability $p$ are the conditional ones. If $90\%$ of risks have no loss, $6\%$ lose $20\%$ of MPL, $3\%$ lose $60\%$ and $1\%$ are total losses, the conditional probabilities are $60\%$, $30\%$ and $10\%$. Then $\mu = 0.12 + 0.18 + 0.10 = 0.40$ and $p = 0.10$, not $\mu = 0.04$ and $p = 0.01$.

## The MBBEFD class

Bernegger's loss-distribution-based family of curves has two parameters, $b > 0$ and $g > 1$, with separate limiting forms when $b = 1$ or $gb = 1$. Its curve is

> $$G_{b,g}(d) = \frac{\ln\!\left[\dfrac{(g-1)b + (1-gb)\,b^{d}}{1-b}\right]}{\ln(gb)}$$

The curve is fitted to the total-loss probability and the mean. Match $g = 1/p$ directly, then solve for $b$ iteratively from $\mu = E[y]$, which falls as $b$ rises. It can also be fitted to $\mu$ and the standard deviation.

The one-parameter family $b(c) = e^{3.1 - 0.15(1+c)c}$, $g(c) = e^{(0.78 + 0.12c)c}$ reproduces the Swiss Re curves Y1–Y4 at $c = 1.5$, $2$, $3$, $4$ and a Lloyd's industrial curve at $c = 5$. At $c = 0$ every loss is a total loss. Higher $c$ gives a more concave curve, with small partial losses relative to the MPL, typical of large industrial risks.

## Applying the curve to a limits profile

The limits profile is the distribution of premium by ranges of insured value. Clark warns that it must be checked to verify that the size-of-risk ranges are on a per location basis. A curve built from per-location values, applied to a profile banded by each policy's total value, reads every multi-location policy as one large risk and misplaces its losses on the curve.

Exposure rating also assumes that the same curve applies regardless of the size of the insured value. The likelihood of a $\$10{,}000$ loss on a $\$100{,}000$ risk equals the likelihood of a $\$100{,}000$ loss on a $\$1{,}000{,}000$ risk. Clark says this may be appropriate for homeowners business, for which the technique was first developed, but may be a serious problem for large commercial risks. The reason CAS's examiners credit is homogeneity. Homes are much alike across a wide range of sizes, while commercial risks differ in construction and occupancy, and so in contents, as their size changes.

If the same curve holds in every band and loss frequency per location is similar, expected loss per location grows in proportion to insured value. Dividing each band's pure premium per location by its midpoint insured value tests this. Roughly equal ratios across bands support pooling the bands into one curve, and a ratio that rises or falls with size says the bands behave differently. Bands with midpoints $\$200{,}000$ and $\$800{,}000$ and pure premiums of $\$3{,}000$ and $\$12{,}000$ both give $1.5\%$.

> [!trap] Reading a band's factor at the top of the range
> Clark's exposure-rating example assumes that all locations within a range are exactly equal to the midpoint of the range. For a band of $\$2$M to $\$6$M of insured value, a layer of $\$2$M xs $\$1$M uses $G(3/4) - G(1/4)$. Using the band's maximum, $G(3/6) - G(1/6)$, treats every risk as the largest in the band.
