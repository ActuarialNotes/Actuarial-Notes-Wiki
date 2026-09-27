---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5ad4c130bf947d0893f81d09c699e3b5ace9219bc2e8bcfcb2736b1cda3e451e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Merit Rating.md
---

**Merit Rating** rates an individual private passenger car on its own recent accident record. In the Canadian plan that Bailey and Simon studied, the rating is the number of full years since the insured's most recent accident or since licensing. It is [[Experience Rating|experience rating]] applied to one car, and the claim-free groups' later claim frequency measures its [[Credibility|credibility]] directly.

> $$\text{Mod} = Z R + (1 - Z)$$

> $$Z = 1 - \text{Mod}_{\text{claim-free}}$$

> $$\text{Mod}_g = \frac{\text{Claims}_g / P_g}{\text{Claims}_{\text{class}} / P_{\text{class}}}$$

> $$P_g = \frac{\text{Earned premium}_g}{\text{Merit relativity}_g}$$

- $\text{Mod}_g$ is group $g$'s **relative claim frequency**: its claims per unit of premium in the rated policy period, over the whole class's. $R$ is the group's prior experience relative to the class average, and a claim-free group has $R = 0$, which leaves $Z = 1 - \text{Mod}$. The Canadian ratings A, X, Y and B mean three or more, two, one and no claim-free years, so A + X + Y measures one year's credibility, A + X two years' and A three years'.
- **Premium, not car years.** $P_g$ is earned premium restated at the base (B) rates by dividing out the merit relativities, A:X:Y:B = 65:80:90:100. High-frequency [[Territorial Rating|territories]] produce more X, Y and B risks and also charge higher premiums, so a premium base avoids that maldistribution. Hazam's discussion adds that this works only if high-frequency territories are also high-premium territories and the territorial differentials are proper.
- **Credibility measures the spread within the class.** If individual hazards varied equally in every class, credibility would be roughly proportional to the class's claim frequency. The narrowly defined classes had three-year credibility of only .54–.61 times their annual frequency, against .92 for the broad Class 1. So the more refined the [[Rating Class|classification]], the less a merit plan adds.
- **Extra years add less and less.** With constant individual hazards and nobody entering or leaving the class, credibility would grow roughly in proportion to the years. Instead, a second year added roughly two-fifths to the credibility and a third year one-sixth of the two-year value (Class 1: .046, .068 and .080). Risks entering and leaving the class explain part of the shortfall. The rest needs each insured's accident chance to change over time ([[Shifting Risk Parameters]]), or a markedly skewed spread of accident proneness. Hazam notes that even $Z = P/(P + K)$ gives less than proportional growth.
- **Individual versus class.** Experience rating measures one risk's deviation from the class average. Class ratemaking estimates the average itself, whose reliability grows only with the square root of the volume.
- **Checking with the B group.** Under a [[Poisson Distribution|Poisson]] approximation, cars with one or more claims last year averaged $m/(1 - e^{-m})$ claims, where $m$ is the class frequency. This gives $R_B = 1/(1 - e^{-m})$, and $\text{Mod}_B = Z R_B + 1 - Z$ then yields a second estimate of $Z$. Hazam concluded that credibility this low did not justify the size of credits many U.S. plans then offered; compare the level structure of a [[Bonus-Malus System]].

> [!example]- Credibility of One, Two and Three Claim-Free Years {Example}
> A private passenger class has two policy years of experience under a Canadian-style merit rating plan. Rates are in the ratio A:X:Y:B = 65:80:90:100, and the class earned $1{,}250{,}000$ car years.
>
> | Merit rating | Earned premium at own rates (\$000) | Claims |
> |---|---|---|
> | A | $52{,}000$ | $92{,}800$ |
> | X | $4{,}800$ | $8{,}400$ |
> | Y | $4{,}500$ | $7{,}400$ |
> | B | $9{,}000$ | $16{,}400$ |
>
> (a) Compute the credibility of one, two and three years of a single car's experience, and the relative credibilities.
>
> (b) Assuming Poisson claim counts, estimate the one-year credibility from the B risks and compare it with (a).
>
> > [!answer]-
> > **(a)** Restate premium at B rates (in \$000):
> >
> > $$
> > \begin{align*}
> > P_A &= 52{,}000 / 0.65 \\
> > &= 80{,}000 \\
> > P_X &= 4{,}800 / 0.80 \\
> > &= 6{,}000 \\
> > P_Y &= 4{,}500 / 0.90 \\
> > &= 5{,}000 \\
> > P_B &= 9{,}000
> > \end{align*}
> > $$
> >
> > The class has $125{,}000$ claims on $\$100{,}000{,}000$ of B-rate premium, which is $1.250$ claims per \$1,000. For each claim-free group:
> >
> > $$
> > \begin{align*}
> > Z_3 &= 1 - \frac{92{,}800 / 80{,}000}{1.250} \\
> > &= 1 - \frac{1.1600}{1.250} \\
> > &= 0.0720 \\[4pt]
> > Z_2 &= 1 - \frac{101{,}200 / 86{,}000}{1.250} \\
> > &= 1 - \frac{1.1767}{1.250} \\
> > &= 0.0586 \\[4pt]
> > Z_1 &= 1 - \frac{108{,}600 / 91{,}000}{1.250} \\
> > &= 1 - \frac{1.1934}{1.250} \\
> > &= 0.0453
> > \end{align*}
> > $$
> >
> > Relative to one year, the credibilities are $0.0586/0.0453 = 1.29$ for two years and $0.0720/0.0453 = 1.59$ for three, well short of $2$ and $3$.
> >
> > **(b)** The class frequency is $m = 125{,}000/1{,}250{,}000 = 0.10$ per car year. The B group's relative frequency is $(16{,}400/9{,}000)/1.250 = 1.4578$. Its average prior-year claims, relative to the class, are:
> >
> > $$
> > \begin{align*}
> > R_B &= \frac{0.10 / (1 - e^{-0.10})}{0.10} \\
> > &= \frac{1.0508}{0.10} \\
> > &= 10.508
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > 1.4578 &= Z(10.508) + 1 - Z \\
> > Z &= \frac{0.4578}{9.508} \\
> > &= 0.048
> > \end{align*}
> > $$
> >
> > The B risks imply a one-year credibility of $0.048$, close to the $0.045$ from the A + X + Y group. The two routes roughly agree, as Bailey and Simon found for Class 1 ($.043$ against $.046$).

> [!example]- Why Credibility Grows Slowly, and Differs by Class {Example}
> Two private passenger classes show these merit-rating credibilities:
>
> | Class | Frequency per car year | 1 year | 2 years | 3 years |
> |---|---|---|---|---|
> | 1 | $0.080$ | $0.050$ | $0.070$ | $0.080$ |
> | 2 | $0.150$ | $0.040$ | $0.062$ | $0.075$ |
>
> (a) Following Hazam, suppose Class 1's one-year credibility comes from $Z = P/(P + K)$ with $P = 100$ claims a year. Find $K$, the two- and three-year credibilities the formula predicts, and the relative credibilities. Compare them with the observed values.
>
> (b) Give the reasons the observed relative credibilities fall short.
>
> (c) Class 2 has almost twice Class 1's claim frequency but a lower three-year credibility. What does that suggest?
>
> > [!answer]-
> > **(a)**
> >
> > $$
> > \begin{align*}
> > 0.050 &= \frac{100}{100 + K} \\
> > K &= \frac{100}{0.050} - 100 \\
> > &= 1{,}900
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > Z_2 &= \frac{200}{200 + 1{,}900} \\
> > &= 0.0952 \\[4pt]
> > Z_3 &= \frac{300}{300 + 1{,}900} \\
> > &= 0.1364
> > \end{align*}
> > $$
> >
> > The predicted relative credibilities are $0.0952/0.050 = 1.90$ and $0.1364/0.050 = 2.73$. The observed ones are $0.070/0.050 = 1.40$ and $0.080/0.050 = 1.60$.
> >
> > **(b)** Part of the shortfall from $2$ and $3$ is built into the formula itself: each year adds to $P$ while $K$ stays fixed, which is Hazam's point. The rest, most of it here, is what Bailey and Simon identified. Risks enter and leave the class. Beyond that, the gap can be fully explained only if an insured's chance of an accident changes within a year and from one year to the next, so older years say less about next year, or if accident proneness is markedly skewed across insureds.
> >
> > **(c)** Compare three-year credibility with annual frequency. Class 1 has $0.080/0.080 = 1.00$ and Class 2 has $0.075/0.150 = 0.50$. With equal variation of individual hazards in both classes, Class 2's credibility should be roughly proportional to its frequency, about $0.080 \times 0.150/0.080 = 0.150$. It is half that, so Class 2 is more narrowly defined: its cars differ less from one another, and a merit plan has less to find within it. The classification already captures much of the hazard that merit rating would otherwise pick up.
