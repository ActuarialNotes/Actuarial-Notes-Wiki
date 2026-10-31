---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:638766a663f7eb2aeccc511207247187f60f4d6b56c63f5e7e1281d7741e66eb
  sources:
    - "Bernegger, The Swiss Re Exposure Curves and the MBBEFD Distribution Class (ASTIN Bulletin 27(1), 1997), pp.99-111 (§2.1-2.3 eqs (2.1)-(2.6), §3.2 eq (3.3), §4.1, §4.3 eqs (4.5)-(4.6), Fig. 4.2), sha256:5c07f557257622c9dd5f1886705a55de9f368fef1839dd405c87a8550f8a7c89 — https://www.casact.org/sites/default/files/2021-03/8_Bernegger.pdf"
    - "Clark, Basics of Reinsurance Pricing (CAS Study Note, revised 2014), pp.17-19 (exposure curve P(p), layer = P((R+L)/IV) - P(R/IV)), pp.27-29 (casualty ILFs / exposure factor), sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/old/studynotes_clark_2014.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.3, 7 (task A1-A3, readings Clark and Bernegger), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Exposure Curves.md
---

**Exposure Curves** give, for a class of property risks, the share of expected loss that falls below a retention expressed as a fraction $d$ of each risk's maximum possible loss. An exposure curve is the normalised [[Limited Expected Value|limited expected value]] function of the loss-degree distribution, and it is used to split a risk's expected loss between the cedent's retention and a per-risk [[Excess of Loss|excess-of-loss]] layer.

> $$G(d) = \frac{E[X \wedge dM]}{E[X]}$$

> $$G(d) = \frac{\int_0^d \left(1 - F(y)\right) dy}{\int_0^1 \left(1 - F(y)\right) dy}$$

> $$E[\text{loss in } (D_1, D_2]] = E[X]\left[G\!\left(\tfrac{D_2}{M}\right) - G\!\left(\tfrac{D_1}{M}\right)\right]$$

- $X$ is the ground-up loss, $M$ the MPL (or sum insured or EML), $y = X/M \in [0, 1]$ the **loss degree** with CDF $F$, and $d = D/M$ the normalised retention, capped at $1$. The cedent keeps $E[X]\,G(d)$ and the layer above cedes the rest.
- **Properties (Bernegger).**
  - $G(0) = 0$ and $G(1) = 1$, and $G$ is increasing and concave.
  - $G'(0) = 1/E[y]$, so the slope at the origin gives the mean damage ratio.
  - $p = G'(1)/G'(0)$ is the probability of a total loss.
  - $F(y) = 1 - G'(y)/G'(0)$ for $y < 1$, so the curve and the distribution determine each other.
- **The MBBEFD class.** Bernegger's loss-distribution-based family of curves has two parameters, $b > 0$ and $g > 1$, with separate limiting forms when $b = 1$ or $gb = 1$:

> $$G_{b,g}(d) = \frac{\ln\!\left[\dfrac{(g-1)b + (1-gb)\,b^{d}}{1-b}\right]}{\ln(gb)}$$

- **Fitting it.** Match the total-loss probability and the mean: $g = 1/p$ directly, then solve for $b$ iteratively from $\mu = E[y]$, which falls as $b$ rises. It can also be fitted to $\mu$ and the standard deviation.
- **The Swiss Re curves.** The one-parameter family $b(c) = e^{3.1 - 0.15(1+c)c}$, $g(c) = e^{(0.78 + 0.12c)c}$ reproduces the Swiss Re curves Y1–Y4 at $c = 1.5$, $2$, $3$, $4$ and a Lloyd's industrial curve at $c = 5$. At $c = 0$ every loss is a total loss. Higher $c$ gives a more concave curve: small partial losses relative to the MPL, typical of large industrial risks.
- **Exposure rating.** Band the risk profile by MPL, estimate each band's expected loss as $\text{ELR} \times \text{premium}$, and apply $G$ band by band. For casualty lines, [[Increased Limits|ILFs]] play the role of $G$ ([[Reinsurance Pricing]]). The curve prices a *per-risk* cover and says nothing about catastrophe accumulation.
- **The limits profile has to match the curve (Clark).** The limits profile is the distribution of premium by ranges of insured value. Clark warns that it must be checked to verify that the size-of-risk ranges are on a per location basis: if it is assembled using total values for policies covering multiple locations, distortions will result. A curve built from per-location values, applied to a profile banded by each policy's total value, reads every multi-location policy as one large risk and so misplaces its losses on the curve.
- **Which value in a band.** Clark's exposure-rating example assumes that all locations within a range are exactly equal to the midpoint of the range, so a band's exposure factor is read at $R/\text{midpoint}$ and $(R+L)/\text{midpoint}$, not at the top of the range. For a band of $\$2$M to $\$6$M of insured value, a layer $\$2$M xs $\$1$M uses $G(3/4) - G(1/4)$; using the band's maximum, $G(3/6) - G(1/6)$, treats every risk as the largest in the band.
- **Scale independence (Clark).** Exposure rating carries the implicit assumption that the same exposure curve applies regardless of the size of the insured value: the likelihood of a $\$10{,}000$ loss on a $\$100{,}000$ risk equals the likelihood of a $\$100{,}000$ loss on a $\$1{,}000{,}000$ risk. Clark says this assumption may be appropriate for homeowners business, for which the technique was first developed, but may be a serious problem when applied to large commercial risks. The reason CAS's examiners credit is homogeneity: homes are much alike across a wide range of sizes, while commercial risks differ in construction and occupancy (and so contents) as their size changes.
  - *Checking it in a book.* If the same curve holds in every band and loss frequency per location is similar, expected loss per location grows in proportion to insured value. So divide each band's pure premium per location by the band's midpoint insured value: roughly equal ratios across bands support pooling the bands into one curve, while a ratio that rises or falls with size says the bands behave differently. For example, bands with midpoints $\$200{,}000$ and $\$800{,}000$ and pure premiums of $\$3{,}000$ and $\$12{,}000$ both give $1.5\%$.
- **The loss-degree distribution is conditional on a loss.** Bernegger derives $F$ from $G$ with $F(0) = 0$ and $G'(0) = 1/E[x]$, so $F$ describes the losses that occur, with no mass at zero. An exposure distribution that includes risks with no loss is restated first: divide each positive loss degree's probability by $1 - P(\text{no loss})$. The values of $G$ come out the same either way, since the zero losses add nothing to $E[x \wedge d]$ or to $E[x]$, but the mean $\mu = E[x]$ and the total-loss probability $p$ (and hence $g = 1/p$ for an MBBEFD fit) are the conditional ones. For example, if $90\%$ of risks have no loss, $6\%$ lose $20\%$ of MPL, $3\%$ lose $60\%$ and $1\%$ are total losses, the conditional probabilities are $60\%$, $30\%$ and $10\%$, so $\mu = 0.12 + 0.18 + 0.10 = 0.40$ and $p = 0.10$, $g = 10$ — not $\mu = 0.04$ and $p = 0.01$.

> [!example]- Building a Curve from a Loss-Degree Distribution {Example}
> For a class of warehouses, $10\%$ of losses are total, and below a total loss $1 - F(y) = 1 - 0.9y$ for $0 \le y < 1$. Derive $G$, check the slope properties, and find the share of expected loss between $20\%$ and $50\%$ of MPL.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[y] &= \int_0^1 (1 - 0.9y)\,dy \\
> > &= 0.55 \\[4pt]
> > G(d) &= \frac{d - 0.45d^2}{0.55}
> > \end{align*}
> > $$
> >
> > $G'(0) = 1/0.55 = 1.818 = 1/E[y]$, and $G'(1) = 0.1/0.55$, so $p = G'(1)/G'(0) = 0.10$, the total-loss share, as it should be.
> >
> > $$
> > \begin{align*}
> > G(0.2) &= \frac{0.2 - 0.018}{0.55} \\
> > &= 0.3309 \\[4pt]
> > G(0.5) &= \frac{0.5 - 0.1125}{0.55} \\
> > &= 0.7045 \\[4pt]
> > \text{Layer share} &= 0.7045 - 0.3309 \\
> > &= 0.3736
> > \end{align*}
> > $$
> >
> > The layer from $20\%$ to $50\%$ of MPL carries $37\%$ of expected loss.

> [!example]- Exposure Rating a Per-Risk Layer {Example}
> A per-risk treaty covers $\$3$M xs $\$2$M, with an ELR of $60\%$ and the Swiss Re $c = 3$ curve, where $G(0.10) = 0.4056$, $G(0.25) = 0.6002$ and $G(0.40) = 0.7163$. Band A has MPL $\$5$M and $\$400{,}000$ of premium. Band B has MPL $\$20$M and $\$600{,}000$ of premium. Find the expected layer loss.
>
> > [!answer]-
> > Band A: $d_1 = 2/5 = 0.40$ and $d_2 = \min(5/5, 1) = 1$. Band B: $d_1 = 2/20 = 0.10$ and $d_2 = 5/20 = 0.25$.
> >
> > $$
> > \begin{align*}
> > \text{Band A} &= 240{,}000 \times (1 - 0.7163) \\
> > &= \$68{,}088 \\[4pt]
> > \text{Band B} &= 360{,}000 \times (0.6002 - 0.4056) \\
> > &= \$70{,}056 \\[4pt]
> > \text{Total} &= \$138{,}144
> > \end{align*}
> > $$
> >
> > That is $13.8\%$ of subject premium, or $23.0\%$ of expected loss. For band A the layer reaches the MPL, so it absorbs the whole top of the curve, total losses included. For band B it is a thin slice low on the curve, but the band's larger expected loss makes the dollars similar. The reinsurer then adds its expense and risk load, and checks the result against experience rating.
