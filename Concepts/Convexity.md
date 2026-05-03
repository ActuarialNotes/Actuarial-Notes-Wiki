$$\text{Convexity} = \frac{1}{P} \cdot \frac{d^2P}{dj^2} = \frac{\displaystyle\sum_{t=1}^{n} t(t+1) \cdot C_t \cdot v^{t+2}}{P}$$

**Convexity** measures the curvature of the price–yield relationship for a bond or portfolio. While [[Modified Duration]] gives the linear (first-order) approximation of price sensitivity to yield changes, convexity captures the second-order effect. In the formula, $C_t$ is the cash flow at time $t$, $v = 1/(1+j)$, and $P$ is the bond price; the $(1+j)^2$ factor in the denominator of $v^{t+2}$ distinguishes this from the Macaulay duration formula. The combined price change approximation using both duration and convexity is:
$$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j + \tfrac{1}{2} \cdot \text{Convexity} \cdot (\Delta j)^2$$
Higher convexity is beneficial: for the same duration, a more convex bond rises more when yields fall and falls less when yields rise.

> [!example]- Convexity Price Approximation {💡 Example}
> A bond has modified duration $D_{Mod} = 7.5$ years and convexity $= 68$. If yields rise by $0.5\%$ ($\Delta j = 0.005$), estimate the percentage price change.
>
> > [!answer]- Answer
> > $$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j + \tfrac{1}{2} \cdot \text{Convexity} \cdot (\Delta j)^2$$
> > $$= -(7.5)(0.005) + \tfrac{1}{2}(68)(0.005)^2$$
> > $$= -0.0375 + \tfrac{1}{2}(68)(0.000025)$$
> > $$= -0.0375 + 0.00085 = -0.03665$$
> > The bond price decreases by approximately $3.67\%$. Without the convexity term the estimate would be $-3.75\%$; convexity reduces the actual price decline slightly.
