$$X' = (1 + r)\,X$$
$$\text{where } r = \text{annual inflation rate},\quad X = \text{original ground-up loss}$$

Inflation (in an insurance context) is the phenomenon by which the ground-up loss random variable grows by a factor $(1+r)$ over time, increasing both the frequency of losses exceeding fixed policy thresholds and the average severity of covered losses.

Unlike uniform scaling, inflation interacts non-linearly with fixed deductibles and benefit limits: the same dollar deductible covers a smaller share of an inflated loss, and more claims breach the deductible. This effect is called **leveraged impact of inflation**.

> [!example]- Effect of Inflation on Expected Payment {💡 Example}
> Ground-up losses $X \sim \text{Exponential}(\theta = 1000)$ with ordinary deductible $d = 500$. After 10% inflation, losses become $X' = 1.1X$. Find the new expected payment $E[(X'-500)_+]$.
>
> > [!answer]- Answer
> > After inflation $X' \sim \text{Exponential}(\theta' = 1100)$. The expected excess payment is:
> > $$E[(X'-d)_+] = \theta'\, e^{-d/\theta'} = 1100\, e^{-500/1100} = 1100\, e^{-0.4545} \approx 1100 \times 0.6346 \approx 698.1$$
> > Before inflation, $E[(X-500)_+] = 1000\,e^{-0.5} \approx 606.5$. The 10% inflation rate increased expected insurer payments by about 15% — a leveraged effect due to the fixed deductible.
