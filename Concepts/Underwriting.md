---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:05b4eac169c29a44824731c964d6af86e8126de5bc72a018076199d3aecc3662
  sources:
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals (Saylor, CC BY-NC-SA), ch. 7 'Insurance Operations' §7.1, §7.1 'Underwriting', sha256:ca16a568fa570ed4aade53cffc55f5c3eba724e809d13c0a24a8f1edddeb56f5 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-insurance-operations.html"
    - "Risk & Insurance Education Alliance (National Alliance), 'Six Steps of the Underwriting Process' (Research Academy, 30 Jan 2023), Steps 1-6, sha256:ee0156096b5f8c331aae216b138dcade35da2127854d0bee28423df26c0d2ba0 — https://www.riskeducation.org/six-steps-of-the-underwriting-process/"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), permissible loss ratio, PDF p.151; schedule rating, PDF pp.39-45, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "42 U.S.C. §300gg-1 guaranteed availability (LII), (a), sha256:781a602e3d157aa9b24f335a56689aa8bc4226ee8b43bb2fe96eddaadbfd4977 — https://www.law.cornell.edu/uscode/text/42/300gg-1"
    - "42 U.S.C. §300gg fair health insurance premiums (LII), (a)(1), sha256:dde28caaab7c36bb6496f4a69905a9a8664ed6ff4949fa98c24f13394b77b6e8 — https://www.law.cornell.edu/uscode/text/42/300gg"
    - "42 U.S.C. §18063 risk adjustment (LII), (a)-(b), sha256:9cddbe7ffedcd439f672ffffe462725bd2623d9ce16c49377c23e9839767dd6b — https://www.law.cornell.edu/uscode/text/42/18063"
    - "SOA Product Matters!, 'Accelerated Underwriting: Mortality Slippage Study and Monitoring Best Practices' (Aug 2024), whole article, sha256:c2f42898e75af19b0fc7cc05cbd4be683e7da784e00b1da9a85dc94e7c9c00c1 — https://soa.org/sections/product-dev/product-dev-newsletter/2024/august/pm-2024-08-seeman"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting.md
---
**Underwriting** is an insurer's process of evaluating, selecting and classifying the risks offered to it, deciding whether to accept each one, on what terms and at what premium, so that the business actually written matches the assumptions built into the rates. It is the insurer's defence against [[Adverse Selection|adverse selection]]: pricing assumes an average risk in each class, and underwriting is what keeps the risks in the class average.

A risk is acceptable at premium $P_i$ when its expected loss ratio is within the permissible loss ratio, that is, when

> $$\frac{E[L_i]}{P_i} \leq \text{PLR}$$

- $E[L_i]$ is the underwriter's estimate of expected losses for risk $i$.
- $P_i$ is the premium it would be written at.
- $\text{PLR}$ is the permissible [[Loss Ratio|loss ratio]], one minus the expense and profit provisions.

The premium a risk needs to meet the PLR is

> $$P_i^{\text{req}} = \frac{E[L_i]}{\text{PLR}}$$

A risk whose expected loss ratio at the offered price exceeds the PLR is declined, re-priced or written on different terms (a higher deductible, a sublimit, required risk control).

> [!example]- Should this commercial property account be written at manual, and if not, at what premium? {Example}
> The account rates to a manual premium of $\$80{,}000$. After reviewing its [[COPE]] details and loss history, the underwriter estimates expected losses of $\$58{,}000$. The permissible loss ratio is $65\%$, and schedule rating allows debits up to $25\%$.
>
> > [!answer]-
> > - At manual the expected loss ratio is $58{,}000/80{,}000 = 72.5\%$, which is $7.5$ points above the PLR.
> > - The required premium is $58{,}000/0.65 = \$89{,}231$.
> > - The debit is $89{,}231/80{,}000 - 1 = 11.5\%$, applied to manual and inside the $25\%$ limit.
> > - Write it at $\$89{,}231$ with an $11.5\%$ schedule debit. If the market will not bear that price, the alternatives are terms that reduce expected loss (a higher deductible, sprinklers as a condition) or declining it.

## The underwriting process

In property and casualty insurance (DISC-RM, GI-201) the process runs in six steps:

1. Evaluate the submission: physical, moral and morale hazards, [[COPE]] for property, and loss history.
2. Develop alternatives.
3. Select one.
4. Set the premium.
5. Implement the decision.
6. Monitor it.

See [[Underwriting Process]] for the steps, and [[Underwriting Guidelines]] for the rules each decision applies. [[Workers Compensation Underwriting]], [[General Liability Classification]] and [[Personal Auto Underwriting]] apply the process to particular coverages. Results are measured by [[Underwriting Profit|underwriting profit]], and [[Underwriting Changes|changes in underwriting]] shift the mix of risks and distort loss development and trend.

## Life underwriting

Life underwriting (ILA-101) classifies individual applicants by [[Mortality|mortality]]. A product that pays on death needs it because mortality above what was priced raises the present value of the benefits. Full medical, simplified issue, guaranteed issue and data-driven accelerated programs trade underwriting cost and speed against mortality slippage. Underwritten lives show **select** mortality, lower than ultimate, that wears off with duration, so an underwriting saving is largest in early durations.

> [!example]- Is full underwriting worth its $\$300$ cost on this $\$250{,}000$ ten-year term policy? {Example}
> Standard rates assume $q = 0.002$ a year. Without full medical underwriting, $5\%$ of the applicants now placed as standard would be impaired lives with $q = 0.010$. Ignore lapses and changes in $q$ over the term, and discount at $4\%$ with claims at the start of each year.
>
> > [!answer]-
> > - The pooled mortality rate is $0.95(0.002) + 0.05(0.010) = 0.0024$.
> > - The extra expected claims are $(0.0024 - 0.002)(250{,}000) = \$100$ a year.
> > - Over ten years, $\ddot{a}_{\overline{10}|4\%} = 8.4353$, so the present value of the slippage is $100 \times 8.4353 = \$843.53$.
> > - Dropping full underwriting saves $\$300$ but adds about $\$844$ of expected claims per policy, so at this face amount full underwriting pays for itself. At small face amounts the slippage shrinks in proportion while the cost does not, which is why simplified issue and accelerated programs are offered below a face-amount limit.

## Group health underwriting

Group health underwriting (GH-101, CP-321) looks at the group rather than the person: size, industry, participation and contribution rules, prior claims experience and its [[Credibility|credibility]], large claimants and pooling levels. Where law forbids health-status underwriting, as in the ACA individual and small group markets, products are guaranteed issue, and risk adjustment (GH-301) transfers money between insurers for the risks underwriting can no longer price.

> [!trap] Comparing expected losses with the whole premium
> A $72.5\%$ expected loss ratio is profitable only if expenses and profit need less than $27.5\%$. Compare the loss ratio with the PLR, not with 100%.
