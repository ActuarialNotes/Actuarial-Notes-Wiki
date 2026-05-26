**Parameter Estimate Tables** (also called **coefficient tables** or **output tables**) are standard output from statistical software when fitting regression or [[Generalized Linear Model]]s. They summarize the estimated model coefficients, their uncertainty, and hypothesis test results.

**Typical columns in a parameter estimate table:**

| Column | Description |
| :--- | :--- |
| **Parameter** | Predictor name or level |
| **Estimate** ($\hat{\beta}$) | Maximum likelihood estimate of the coefficient |
| **Std. Error** | Estimated standard deviation of $\hat{\beta}$ |
| **z-value** or **t-value** | $\hat{\beta} / \text{SE}(\hat{\beta})$; test statistic for $H_0: \beta = 0$ |
| **p-value** | $P(\lvert Z \rvert \geq \lvert z\text{-value}\rvert)$; significance of the predictor |
| **95% CI** | $\hat{\beta} \pm 1.96 \cdot \text{SE}(\hat{\beta})$ |

- A small p-value (e.g., $< 0.05$) indicates the predictor is statistically significant
- For a log-[[Link Function]] model (Poisson or Gamma GLM), $e^{\hat{\beta}}$ is the **multiplicative factor** on the mean per unit increase in the predictor
- The **reference level** of a categorical predictor is absorbed into the intercept; other levels are interpreted relative to it
- Standard errors from GLMs are based on the **Fisher information matrix**

> [!example]- Interpreting GLM Output {Example}
> A Poisson GLM output shows: Intercept $\hat{\beta}_0 = -1.8$ (SE = 0.2) and Territory B $\hat{\beta}_1 = 0.45$ (SE = 0.15, p = 0.003). The reference is Territory A. Interpret the territory coefficient.
>
> > [!answer]-
> > The p-value of 0.003 < 0.05 indicates that Territory B is significantly different from Territory A. With a log link, the expected claim count in Territory B is $e^{0.45} \approx 1.57$ times that in Territory A — i.e., approximately **57% more claims** in Territory B, all else equal.
