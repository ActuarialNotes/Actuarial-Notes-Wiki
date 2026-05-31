**Experience Rating** is an individual risk pricing modification that adjusts the manual (class) rate based on the insured's own historical loss experience, weighted by a credibility factor that reflects how much statistical weight the individual's data deserves.

> $$\text{Experience Mod}$$
>
> $$= Z \times \frac{A}{E} + (1 - Z) \times 1.0$$

- $A$ = actual losses, $E$ = expected losses (from manual rate), $Z$ = credibility weight ($0 \leq Z \leq 1$); a mod greater than 1.0 indicates worse-than-average experience
- Credibility $Z$ increases with exposure size; small risks receive low credibility and their mod stays near 1.0, while large risks approach $Z = 1$ and their mod fully reflects their own experience
- Workers compensation uses the Experience Modification Rating (EMR) system extensively; a mod below 1.0 produces a premium discount, above 1.0 a surcharge
- Experience rating creates incentive for loss control: insureds with good safety practices earn lower mods and pay less premium

> [!example]- Computing an Experience Modification {Example}
> An insured has expected losses $E = \$200{,}000$, actual losses $A = \$280{,}000$, and credibility $Z = 0.60$. What is the experience mod and adjusted premium if the manual premium is $\$100{,}000$?
>
> > [!answer]-
> > $$\text{Mod} = 0.60 \times \frac{\$280{,}000}{\$200{,}000} + 0.40 \times 1.0 = 0.60 \times 1.40 + 0.40 = 0.84 + 0.40 = 1.24$$
> > $$\text{Adjusted Premium} = \$100{,}000 \times 1.24 = \$124{,}000$$
