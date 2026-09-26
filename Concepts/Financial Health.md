---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1a74a95368b2ec9a19b01d0836d24f0c76f35c7ccb7d993d7215305c07d0b3c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Health.md
---

**Financial Health** is an insurer's capacity to keep its promises — to pay claims as they fall due, today and under adverse conditions, while remaining a going concern. It is judged not from one number but from capital adequacy, reserve adequacy, profitability, leverage, liquidity and reinsurance quality read together, using the tools each jurisdiction's regulators and [[Rating Agency|rating agencies]] supply.

> $$\text{MCT ratio} = \frac{\text{Capital Available}}{\text{Base Solvency Buffer}}$$
>
> $$\text{RBC ratio} = \frac{\text{Total Adjusted Capital}}{\text{Authorized Control Level RBC}}$$

- **The dimensions.** Capital (level *and* trend), reserve adequacy (how prior-year estimates have developed), profitability (combined and operating ratios), leverage (premium and reserves to surplus), liquidity, reinsurance collectability and asset quality — see [[Key Financial Measures]]. Both regimes compress capital adequacy into a ratio of capital held to capital the risk profile requires, but the ratio is only one dimension.
- **Canada.** The [[MCT]] ratio against the $100\%$ minimum, the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] and the insurer's own [[Internal Target Capital Ratio|internal target]]; the forward-looking tests — [[FCT]], [[ORSA]], [[Stress Testing]] and [[Reverse Stress Testing]]; the claims development exhibit and [[MSA Ratios]] from the [[Canadian Annual Return]]; and the [[Statement of Actuarial Opinion]].
- **United States.** The [[Risk-Based Capital|RBC]] ratio against its action levels (Company Action Level at $200\%$ of Authorized Control Level RBC, Regulatory Action $150\%$, Authorized Control $100\%$, Mandatory Control $70\%$); the $13$ [[IRIS Ratios]] and their usual ranges; [[Schedule P]] for reserve development; [[Schedule F]] for reinsurance recoverables, overdue balances and the provision for reinsurance; the [[Insurance Expense Exhibit]] for profitability by line; and the SAO, whose risk-of-material-adverse-deviation comment states a materiality standard in dollars.
- **No single measure diagnoses.** The NAIC's own IRIS manual says a ratio outside its usual range is not necessarily adverse. Distress shows as a *pattern* — rapid growth, high leverage, adverse development and a falling capital ratio together — which is also what [[PACICC]]'s failure research finds.
- **Capital ratios inherit reserve error.** Under-reserving overstates capital, so an insurer with light reserves looks healthier on every capital measure than it is. Reserve adequacy is therefore read *before* the capital ratio, not after.

> [!example]- Reading a U.S. Insurer's Solvency Tools {Example}
> A U.S. insurer reports Total Adjusted Capital of $\$180$ million and Authorized Control Level RBC of $\$100$ million. Its IRIS results: net premiums written to surplus $340\%$, change in net premiums written $+45\%$, one-year reserve development to surplus $28\%$. The SAO is a determination of reasonable provision, with the carried amount near the low end of the range and a "yes" on risk of material adverse deviation.
>
> Evaluate its financial health.
>
> > [!answer]-
> > $$\text{RBC ratio} = \frac{180}{100} = 180\%$$
> >
> > That is between $150\%$ and $200\%$: a **Company Action Level event**. The insurer must file an RBC plan with its domiciliary commissioner explaining how it will restore capital.
> >
> > **IRIS:** three ratios are outside their usual ranges — premium leverage (usual range below $300\%$), premium growth (usual range $-33\%$ to $+33\%$) and one-year reserve development (usual range below $20\%$).
> >
> > **Read together:** the insurer is growing fast on thin capital, and its reserves are already developing adversely. The SAO is technically clean, but a low-end carried reserve with a declared risk of material adverse deviation means further strengthening is plausible — and each dollar of it comes straight out of the $\$180$ million. This is the classic pre-failure profile, not a one-ratio blip.

> [!example]- Two Insurers, One MCT Ratio {Example}
> Two Canadian insurers each report an MCT ratio of $210\%$. Insurer A has claim liabilities of $1.5$ times capital available and favourable development. Insurer B has claim liabilities of $3.2$ times capital available, adverse development in each of the last three years, and $28\%$ premium growth.
>
> If B's claim liabilities prove $10\%$ deficient, what is its MCT ratio? (Treat capital available as moving dollar for dollar with the deficiency and ignore the change in the buffer.)
>
> > [!answer]-
> > Let capital available be $C$, so liabilities are $3.2C$. A $10\%$ deficiency is $0.32C$.
> >
> > $$\begin{align*}
> > \text{MCT}_{\text{new}} &= 210\% \times \frac{C - 0.32C}{C} \\
> > &= 210\% \times 0.68 \\
> > &= 142.8\%
> > \end{align*}$$
> >
> > Below the $150\%$ supervisory target — and understated, since strengthening reserves also raises the buffer. The same $10\%$ error at Insurer A costs $0.15C$ and leaves it at $178.5\%$. Identical ratios, very different health: the reserves-to-capital leverage and the development trend are what separate them.
