The **term of annuity** is the duration over which an annuity makes payments — the number of periods from the first to the last payment. For a finite-term annuity, the term determines when payments start and stop.

In the standard annuity factor notation, $n$ in $a_{\overline{n}|i}$ is the term. Given sufficient information (present value, payment amount, interest rate), the term can be solved using logarithms:

$$n = \frac{\ln(1 - i \cdot \text{PV}/P)}{\ln(1/(1+i))} = \frac{-\ln(1 - i \cdot \text{PV}/P)}{\ln(1+i)}$$

A [[Perpetuity]] is an annuity with an infinite term.

> [!example]- Solving for Unknown Term {💡 Example}
> A $10{,}000$ loan at $6\%$ is repaid with level annual payments of $1{,}500$. How many full payments are needed?
>
> > [!answer]- Answer
> > $$10000 = 1500 \cdot a_{\overline{n}|6\%} \implies a_{\overline{n}|} = 6.6667$$
> > $$n = \frac{-\ln(1 - 0.06 \times 6.6667)}{\ln(1.06)} = \frac{-\ln(0.60)}{0.05827} = \frac{0.5108}{0.05827} \approx 8.77$$
> > 9 full (annual) payments are needed (with the last being a smaller [[Drop Payment]]).
