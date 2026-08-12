**Experience Rating** modifies an individual insured's manual premium prospectively, using its own past loss experience, weighted by [[Credibility|credibility]]. The output is an **experience modification factor** (mod): above $1.0$ for worse-than-expected experience, below for better.

> $$M = Z \times \frac{A}{E} + (1 - Z)$$

> $$\text{Modified Premium} = \text{Manual Premium} \times M$$

- $A$ is the insured's actual losses over the experience period and $E$ the losses expected for a risk of its size and class. A mod is therefore a **relative** measure: it says how this risk compares with the average risk already reflected in the manual rate.
- Credibility rises with size. A small risk's mod stays near $1.0$ however good or bad its recent record, because a few claims say little; a large risk approaches $Z = 1$ and effectively self-rates.
- Losses are **capped** at a per-claim limit before entering $A$. A single catastrophic claim should not dominate a mod, and the split between primary (capped) and excess losses is the mechanism the NCCI workers compensation formula uses to weight frequency more heavily than severity — the theory being that frequency is more predictive of future experience than severity.
- Experience rating is **prospective**: it uses a completed experience period (typically three years, excluding the most recent, incomplete one) to modify the *coming* policy's premium. [[Retrospective Rating|Retrospective rating]] instead adjusts the *current* policy's premium after the fact.
- It creates a real incentive for loss control, and an equally real incentive for **claim suppression** — paying small claims outside the policy to keep them out of the mod. Both are consequences of the same mechanism.
- Order of application: schedule and experience modifications apply to the manual premium to give **standard premium**, which is then the base for a retro plan or a large-deductible programme.

> [!example]- Computing an Experience Modification {Example}
> An insured has expected losses $E = \$200{,}000$, actual capped losses $A = \$280{,}000$, and credibility $Z = 0.60$. The manual premium is $\$100{,}000$.
>
> Compute the mod and the modified premium.
>
> > [!answer]-
> > $$\begin{align*}
> > M &= 0.60 \times \frac{\$280{,}000}{\$200{,}000} + 0.40 \\
> > &= 0.60 \times 1.40 + 0.40 \\
> > &= 0.84 + 0.40 \\
> > &= 1.24
> > \end{align*}$$
> >
> > $$\text{Modified premium} = \$100{,}000 \times 1.24 = \$124{,}000$$
> >
> > The insured's raw loss ratio was $40\%$ worse than expected; credibility passes $60\%$ of that through, giving a $24\%$ surcharge. Had $Z$ been $0.25$ — a much smaller risk with the same relative experience — the mod would be $1.10$ and the surcharge only $10\%$.

> [!example]- Why Losses Are Capped {Example}
> Two insureds in the same class each have $\$200{,}000$ of expected losses and $Z = 0.50$. Over the experience period:
>
> - **Insured A**: $40$ claims totalling $\$300{,}000$, largest claim $\$25{,}000$.
> - **Insured B**: $4$ claims totalling $\$300{,}000$, of which one is $\$250{,}000$.
>
> Compute the mods with and without a $\$50{,}000$ per-claim cap, and comment.
>
> > [!answer]-
> > **Uncapped** — both have $A = \$300{,}000$:
> >
> > $$M = 0.50 \times 1.50 + 0.50 = 1.25 \text{ for both}$$
> >
> > **Capped at $\$50{,}000$** — A is unaffected; B's large claim is cut to $\$50{,}000$, so $A_B = \$100{,}000$. Expected losses must be capped on the same basis; suppose the capped expectation is $\$150{,}000$:
> >
> > $$\begin{align*}
> > M_A &= 0.50 \times \frac{300}{150} + 0.50 = 1.50 \\[4pt]
> > M_B &= 0.50 \times \frac{100}{150} + 0.50 = 0.83
> > \end{align*}$$
> >
> > The uncapped calculation treats these two risks as identical. They are not: **A has a frequency problem** — forty claims where the class expects far fewer — which is persistent, controllable and highly predictive of next year. **B had one bad accident**, which is largely luck and says little about its future.
> >
> > Capping is what lets the mod respond to the signal (frequency) rather than the noise (one severity outcome). It is the same reasoning that caps [[Large Loss|large losses]] in a class rate indication, applied at the level of the individual risk.
