**Immunization** is a [[Portfolio]] management strategy that protects the value of a surplus (assets minus liabilities) against adverse interest rate movements. The two main types are:

- **[[Redington Immunization]]**: protects against small parallel yield shifts; requires three conditions
- **[[Full Immunization]]**: protects against any single interest rate shift (up or down)

**Redington Immunization conditions** (at current yield $i$):
1. $PV(assets) = PV(liabilities)$
2. $D_{Mac}(assets) = D_{Mac}(liabilities)$ ([[Duration Matching]])
3. $C_{assets} > C_{liabilities}$ ([[Convexity]] of assets exceeds liabilities)

> [!example]- Verifying Redington Immunization {💡 Example}
> Assets: $PV = 10000$, $D_{Mac} = 5$, convexity $= 30$. Liabilities: $PV = 10000$, $D_{Mac} = 5$, convexity $= 25$. Is Redington immunization achieved?
>
> > [!answer]- Answer
> > Condition 1: $PV_A = PV_L = 10000$ ✓
> > Condition 2: $D_{Mac,A} = D_{Mac,L} = 5$ ✓
> > Condition 3: $C_A = 30 > C_L = 25$ ✓
> > All three conditions are met — Redington immunization is achieved.
