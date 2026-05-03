The **1st-order linear approximation** (or first-order Taylor approximation) estimates the change in bond price for a small change in [[Yield Rate]] $\Delta j$:

$$\Delta P \approx \frac{dP}{dj} \cdot \Delta j = -D_{Mod} \cdot P \cdot \Delta j$$

**Based on [[Modified Duration]]** (standard form):
$$\frac{\Delta P}{P} \approx -D_{Mod} \cdot \Delta j$$

**Based on [[Macaulay Duration]]** (equivalent form):
$$\frac{\Delta P}{P} \approx -\frac{D_{Mac}}{1+j} \cdot \Delta j$$

This approximation is accurate for small $\Delta j$ but underestimates price increases and overestimates price decreases for large shifts, because the price-yield relationship is convex. The [[Convexity]] term corrects for this curvature.

> [!example]- Estimating Price Change {💡 Example}
> A bond has price $\$950$, modified duration $8.5$ years. Yields fall by 25 basis points ($\Delta j = -0.0025$).
>
> > [!answer]- Answer
> > $$\Delta P \approx -8.5 \times 950 \times (-0.0025) = 8.5 \times 950 \times 0.0025 = 20.19$$
> > The bond price increases by approximately $\$20.19$.
