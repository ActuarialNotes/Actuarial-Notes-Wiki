A **portfolio** is a collection of financial assets (bonds, stocks, cash flows) held together. In the context of Exam FM, portfolio analysis focuses on:

- **[[Yield Rate]] of a portfolio**: the internal rate of return of the combined cash flows
- **[[Duration]] of a portfolio**: the weighted average of individual asset durations, weighted by market values
- **[[Convexity]] of a portfolio**: the weighted average of individual convexities
- **[[Immunization]]**: structuring a portfolio so its value is protected against interest rate changes

Portfolio duration is additive by market value:
$$D_{Mod}^{\text{portfolio}} = \frac{\sum_i P_i \cdot D_{Mod,i}}{\sum_i P_i}$$

> [!example]- Portfolio Duration {💡 Example}
> A portfolio has $\$40{,}000$ in a bond with modified duration 3 years and $\$60{,}000$ in a bond with modified duration 8 years. Find the portfolio's modified duration.
>
> > [!answer]- Answer
> > $$D_{Mod}^{\text{portfolio}} = \frac{40000 \times 3 + 60000 \times 8}{40000 + 60000} = \frac{120000 + 480000}{100000} = 6.0 \text{ years}$$
