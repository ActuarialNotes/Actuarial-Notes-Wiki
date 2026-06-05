A **Deductible** is the initial amount of a loss that the policyholder must pay before insurance coverage begins.
- If the loss $X$ is less than or equal to the deductible $d$, the insurer pays nothing
- There are two types of deductibles:
  - An **ordinary deductible** eliminates small claims entirely
  - A **franchise deductible** pays the full loss $X$ once it exceeds $d$
- Deductibles reduce moral hazard and lower premiums by transferring some risk back to the insured

> $$Y = (X - d)_+ = \max(X - d,\ 0)$$
>
> $$d = \text{deductible}, \quad X = \text{ground-up loss}$$

> [!example]- Expected Payment with an Ordinary Deductible {Example}
> Ground-up losses $X \sim \text{Exponential}(\theta = 1000)$. An ordinary deductible of $d = 200$ applies. Find $E[Y]$ where $Y = (X - 200)_+$.
>
> > [!answer]-
> > For an exponential distribution, the expected payment with deductible $d$ is:
> > $$E[Y] = E[(X-d)_+] = \theta\, e^{-d/\theta} = 1000\, e^{-200/1000} = 1000\, e^{-0.2} \approx 818.73$$
> > The insurer expects to pay approximately \$818.73 per loss (including the zero payments when $X \leq 200$).

> [!example]- Insurer Payment at Different Loss Levels {Example}
> Under a policy with a \$$500$ deductible, what does the insurer pay on losses of \$$300$ and \$$2{,}000$?
>
> > [!answer]-
> > - For a \$$300$ loss: $(300 - 500)^+ = 0$. The insurer pays nothing.
> > - For a \$$2{,}000$ loss: $(2000 - 500)^+ = 1500$. The insurer pays \$$1{,}500$.
