---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:ea8cf846f167a3ad464f1729010b11d75e817de7ad1d439bd643d01acfaca7f9
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, §4.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Financial Health.md
---
**Financial Health** is an insurer's capacity to keep its promises: to pay claims as they fall due, today and under adverse conditions, while remaining a going concern. It is judged from capital adequacy, reserve adequacy, profitability, leverage, liquidity and reinsurance quality read together, using the tools each jurisdiction's regulators and [[Rating Agency|rating agencies]] supply.

The dimensions of financial health are:

1. Capital, its level and its trend.
2. Reserve adequacy: how prior-year estimates have developed.
3. Profitability: the combined and operating ratios.
4. Leverage: premium and reserves to surplus.
5. Liquidity.
6. Reinsurance collectability.
7. Asset quality.

[[Key Financial Measures]] defines the measures. Both the Canadian and the U.S. regimes compress capital adequacy into a ratio of capital held to the capital the risk profile requires, but that ratio is only one dimension.

> [!idea] The idea
> No single measure diagnoses distress: it shows as a pattern of rapid growth, high leverage, adverse development and a falling capital ratio together.

The NAIC's own IRIS manual says a ratio outside its usual range is not necessarily adverse. The pattern is also what [[PACICC]]'s failure research finds.

## Canada

In Canada, the capital ratio is the [[MCT]] ratio:

> $$\text{MCT ratio} = \frac{\text{Capital Available}}{\text{Minimum Capital Required}}$$

It is read against the $100\%$ minimum, the $150\%$ [[Supervisory Target Capital Ratio|supervisory target]] and the insurer's own [[Internal Target Capital Ratio|internal target]]. The other Canadian tools are the forward-looking tests ([[FCT]], [[ORSA]], [[Stress Testing]] and [[Reverse Stress Testing]]), the claims development exhibit and [[MSA Ratios]] from the [[Canadian Annual Return]], and the [[Statement of Actuarial Opinion]].

Capital ratios inherit reserve error. Under-reserving overstates capital, so an insurer with light reserves looks healthier on every capital measure than it is. Reserve adequacy is therefore read before the capital ratio.

> [!example]- What is Insurer B's MCT ratio if its claim liabilities prove $10\%$ deficient? {Example}
> Two Canadian insurers each report an MCT ratio of $210\%$. Insurer A has claim liabilities of $1.5$ times capital available and favourable development. Insurer B has claim liabilities of $3.2$ times capital available, adverse development in each of the last three years, and $28\%$ premium growth. Treat capital available as moving dollar for dollar with the deficiency, and ignore the change in minimum capital required.
>
> > [!answer]-
> > - Let capital available be $C$, so B's liabilities are $3.2C$ and a $10\%$ deficiency is $0.32C$.
> > - Capital available falls to $C - 0.32C = 0.68C$.
> > - The new MCT ratio is $210\% \times 0.68 = 142.8\%$, below the $150\%$ supervisory target.
> > - The figure is overstated, since strengthening reserves also raises minimum capital required.
> > - The same $10\%$ error at Insurer A costs $0.15C$ and leaves it at $210\% \times 0.85 = 178.5\%$.
> > - The ratios are identical, but the reserves-to-capital leverage and the development trend separate the two insurers' health.

## United States

In the United States, the capital ratio is the [[Risk-Based Capital|RBC]] ratio:

> $$\text{RBC ratio} = \frac{\text{Total Adjusted Capital}}{\text{Authorized Control Level RBC}}$$

It is read against its action levels, each a percentage of Authorized Control Level RBC:

| Action level | RBC ratio |
| :--- | ---: |
| Company Action Level | $200\%$ |
| Regulatory Action Level | $150\%$ |
| Authorized Control Level | $100\%$ |
| Mandatory Control Level | $70\%$ |

The other U.S. tools are the $13$ [[IRIS Ratios]] and their usual ranges, [[Schedule P]] for reserve development, [[Schedule F]] for reinsurance recoverables, overdue balances and the provision for reinsurance, the [[Insurance Expense Exhibit]] for profitability by line, and the SAO. The SAO's comment on the risk of material adverse deviation states a materiality standard in dollars.

> [!example]- What is this U.S. insurer's financial health? {Example}
> A U.S. insurer reports Total Adjusted Capital of $\$180$ million and Authorized Control Level RBC of $\$100$ million. Its IRIS results are net premiums written to surplus $340\%$, change in net premiums written $+45\%$, and one-year reserve development to surplus $28\%$. The SAO is a determination of reasonable provision, with the carried amount near the low end of the range and a "yes" on risk of material adverse deviation.
>
> > [!answer]-
> > - The RBC ratio is $180/100 = 180\%$.
> > - That is between $150\%$ and $200\%$, a Company Action Level event: the insurer must file an RBC plan with its domiciliary commissioner explaining how it will restore capital.
> > - Three IRIS ratios are outside their usual ranges: premium leverage (usual range below $300\%$), premium growth (usual range $-33\%$ to $+33\%$) and one-year reserve development (usual range below $20\%$).
> > - The insurer is growing fast on thin capital, and its reserves are already developing adversely.
> > - A low-end carried reserve with a declared risk of material adverse deviation makes further strengthening plausible, and each dollar of it comes out of the $\$180$ million.
> > - Read together, this is the classic pre-failure profile, not a one-ratio blip.

> [!trap] Reading the capital ratio before the reserves
> A strong capital ratio on light reserves overstates health. Check how prior-year estimates have developed before relying on the MCT or RBC ratio.
