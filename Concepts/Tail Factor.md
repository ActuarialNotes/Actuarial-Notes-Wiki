**Tail Factor** is a development factor applied beyond the last observable age in the loss triangle, accounting for losses that will continue to emerge after the data window ends; it is the final multiplier in the CDF chain from the last triangle age to ultimate.

> $$\text{CDF}_{\text{last age} \to \text{ult}}$$
>
> $$= f_{\text{last observable}} \times \text{Tail Factor}$$

- Sources for selecting the tail: industry benchmark data (ISO, rating bureaus), curve-fitting the observed age-to-age factor pattern to extrapolate (exponential or inverse power decay), the **Bondy method** (tail $\approx$ last observable factor), or actuarial judgment based on line-of-business settlement characteristics
- The tail is most significant for **long-tail lines** (workers compensation, general liability, medical malpractice) and near 1.000 for short-tail lines (auto physical damage, property)
- Underestimating the tail is a common source of reserve deficiency, particularly in lines with latent exposures (asbestos, environmental, long-term disability)
- Tail factor $= 1.000$ means all development is captured within the observable triangle; any value $> 1.000$ implies additional emergence beyond the last age

> [!example]- Tail Factor Impact {Example}
> Last observable age is 120 months. Reported at 120 months: \$$2{,}000{,}000$. Two tail estimates are under consideration: 1.030 and 1.050.
>
> > [!answer]-
> > With tail $= 1.030$: Ultimate $= 2{,}000{,}000 \times 1.030 = \$2{,}060{,}000$; IBNR $= \$60{,}000$
> >
> > With tail $= 1.050$: Ultimate $= 2{,}000{,}000 \times 1.050 = \$2{,}100{,}000$; IBNR $= \$100{,}000$
> >
> > The \$$40{,}000$ difference illustrates that even a 2-point tail uncertainty translates directly into reserve uncertainty — especially material when aggregated across many accident years
