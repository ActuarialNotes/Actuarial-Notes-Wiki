$$Y = (X - d)_+ = \max(X - d,\; 0)$$
$$\text{where } d = \text{deductible},\quad X = \text{ground-up loss}$$

A Deductible ($d$) is the initial portion of a loss that the insured must pay out-of-pocket before the insurer makes any payment; the insurer pays only the excess $X - d$ when $X > d$.

An **ordinary deductible** (shown above) eliminates small claims entirely. A **franchise deductible** pays the full loss $X$ once it exceeds $d$. Deductibles reduce moral hazard and lower premiums by transferring some risk back to the insured.

> [!example]- Expected Payment with an Ordinary Deductible {💡 Example}
> Ground-up losses $X \sim \text{Exponential}(\theta = 1000)$. An ordinary deductible of $d = 200$ applies. Find $E[Y]$ where $Y = (X - 200)_+$.
>
> > [!answer]- Answer
> > For an exponential distribution, the expected payment with deductible $d$ is:
> > $$E[Y] = E[(X-d)_+] = \theta\, e^{-d/\theta} = 1000\, e^{-200/1000} = 1000\, e^{-0.2} \approx 818.73$$
> > The insurer expects to pay approximately \$818.73 per loss (including the zero payments when $X \leq 200$).
