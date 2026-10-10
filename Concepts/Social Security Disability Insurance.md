---
aliases:
  - Social Security Disability Income Benefit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef1867fac4a38739da2f250019bfc45d0bf14c8074892e713372a7fcaf9f35a7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Social Security Disability Insurance.md
---
**Social Security Disability Insurance** (SSDI) is the part of the U.S. Social Security program that pays a monthly income to insured workers who can't engage in any substantial gainful activity because of a medically determinable impairment expected to last at least 12 months or to end in death. The benefit equals the worker's primary insurance amount (PIA), computed as if the worker had reached full retirement age, and it starts after a five-month waiting period. Dependents can receive benefits too, and Medicare follows after 24 months of entitlement. It is [[Social Insurance|social insurance]], and group [[Disability Income Insurance|long-term disability]] plans are built on top of it.

> $$\begin{aligned} \text{PIA} = {} & 0.90\min(A, b_1) \\ & + 0.32\left(\min(A, b_2) - b_1\right)_+ \\ & + 0.15\,(A - b_2)_+ \end{aligned}$$

> $$\text{FM} = \max\Big(\min\big(0.85\,A,\ 1.5\,\text{PIA}\big),\ \text{PIA}\Big)$$

> $$B_{\text{LTD}} = \max\Big(\min(pW,\ M) - O_{\text{SS}} - O_{\text{other}},\ B_{\min}\Big)$$

- **Symbols:** $A$ is the worker's average indexed monthly earnings (AIME), and $b_1$ and $b_2$ are the bend points, which are \$1,286 and \$7,749 for a worker first eligible in 2026. The PIA is rounded down to the next lower multiple of 10 cents. $\text{FM}$ is the family maximum for a disabled worker's family. In the long-term disability formula, $W$ is pre-disability monthly earnings, $p$ the replacement percentage, $M$ the plan's monthly maximum, $O_{\text{SS}}$ the Social Security offset, $O_{\text{other}}$ other offsets such as workers compensation, and $B_{\min}$ the plan's minimum benefit.
- **Insured status:** The worker must be fully insured, with enough work credits for their age, and disability insured. For a worker aged 31 or over, being disability insured generally means having 20 credits in the 40 calendar quarters ending with the quarter in which disability began, and younger workers need fewer.
- **Definition of disability:** The test is the inability to do any substantial gainful activity (SGA), not just the worker's own job, which makes it much stricter than most group LTD definitions. SGA is defined by monthly earnings, \$1,690 for non-blind people in 2026. The impairment must be expected to last at least 12 months or to result in death.
- **Waiting period and Medicare:** Benefits start with the sixth full calendar month of disability, after a waiting period of five full months. Entitlement to [[Medicare]] begins after 24 months of entitlement to benefits, so about 29 months after the onset of disability.
- **Family benefits:** An eligible child, or a spouse caring for a child, can receive up to 50% of the worker's PIA, subject to the family maximum. The family maximum for a disabled worker is the lesser of 85% of AIME and 150% of PIA, but not less than the PIA.
- **Work incentives:** A beneficiary can test a return to work through a trial work period of nine months without losing benefits, followed by an extended period of eligibility in which benefits restart in any month earnings fall below SGA. At full retirement age the disability benefit converts to a retirement benefit of the same amount.
- **Integration with group LTD:** Most group LTD plans reduce their benefit by the SSDI the claimant receives, either the primary benefit alone or the family benefit too, so the employer's plan only tops up to the target replacement ratio. The offset is usually frozen at its first amount, so Social Security cost-of-living increases go to the claimant. Because SSDI awards often take more than a year, insurers help claimants apply and appeal, estimate the offset or pay unreduced benefits while the claim is pending, and recover the overpayment from the retroactive award.
- **Pricing effect:** The offset is a large part of LTD claim cost for long claims. The LTD insurer's cost therefore depends on assumptions about the probability of an SSDI award, its timing and its amount, and a change in SSA's approval rates changes LTD claim costs.

> [!example]- LTD Benefit Net of the SSDI Offset {Example}
> A disabled worker first eligible in 2026 has an AIME of \$6,000 and one child. The group LTD plan pays 60% of pre-disability earnings of \$8,000 a month, with a monthly maximum of \$10,000, and a minimum benefit of the greater of \$100 and 10% of the gross benefit. Find the worker's PIA, the family benefit, and the LTD benefit if the plan offsets the primary benefit only and if it offsets the family benefit.
>
> > [!answer]-
> > The AIME is between the two bend points.
> > $$
> > \begin{align*}
> > \text{PIA} &= 0.90(1{,}286) + 0.32(6{,}000 - 1{,}286) \\
> > &= 1{,}157.40 + 1{,}508.48 \\
> > &= 2{,}665.88 \\
> > \text{FM} &= \min\big(5{,}100.00,\ 3{,}998.70\big) \\
> > &= 3{,}998.70
> > \end{align*}
> > $$
> > The PIA rounds down to \$2,665.80. The child's benefit is 50% of the PIA, or \$1,332.90, which fits exactly within the family maximum, so the family receives \$3,998.70 a month. The gross LTD benefit is $\min(0.60 \times 8{,}000,\ 10{,}000) = 4{,}800$ dollars.
> > $$
> > \begin{align*}
> > B_{\text{primary}} &= 4{,}800.00 - 2{,}665.80 \\
> > &= 2{,}134.20 \\
> > B_{\text{family}} &= 4{,}800.00 - 3{,}998.70 \\
> > &= 801.30
> > \end{align*}
> > $$
> > Both are above the \$480 minimum. Under the primary offset the family keeps the child's benefit and receives \$6,132.90 a month in all. Under the family offset it receives \$4,800.00, and the LTD plan pays only 17% of its gross benefit, with Social Security paying the rest.

> [!example]- The Timeline and the Retroactive Award {Example}
> The worker above became disabled on January 15, 2026. The LTD plan has a 90-day elimination period and pays the unreduced \$4,800 while the SSDI claim is pending, under an agreement to repay any overpayment. SSDI is awarded in January 2027, with the family benefit payable from the first month allowed. When do SSDI and Medicare begin, and how much does the LTD insurer recover?
>
> > [!answer]-
> > The waiting period is five full calendar months, February to June 2026, so SSDI is payable from July 2026. Medicare starts after 24 months of entitlement, in July 2028. The LTD benefit started in mid-April 2026, and the offset applies from July.
> > $$
> > \begin{align*}
> > \text{Overpayment} &= 6 \times 3{,}998.70 \\
> > &= 23{,}992.20
> > \end{align*}
> > $$
> > The six months of July to December 2026 were overpaid by the family benefit each month, so the insurer recovers \$23,992.20 from the retroactive award and pays \$801.30 a month from January 2027.

> [!tip]- How it appears on the exam
> - **CP-321 objective 1d:** Written questions ask candidates to describe Social Security disability income benefits in the United States, covering eligibility, the definition of disability, the waiting period, the benefit amount, family benefits and Medicare, from Skwire's chapter on government health plans.
> - **LTD pricing and reserving:** Calculation questions give an LTD plan's formula and the claimant's Social Security benefits and ask for the net benefit, or ask how an assumed SSDI award rate and timing change the LTD claim cost or reserve.
> - **Comparison:** Some questions ask how the SSDI definition of disability differs from an own-occupation or any-occupation group LTD definition, and what that means for claims that the LTD plan pays but SSA denies.

> [!warning]- Exam traps
> - **The waiting period counts full months:** Benefits start with the sixth full calendar month of disability. A disability that begins in the middle of January has its first full month in February, so benefits start in July, not June.
> - **Medicare timing:** Medicare starts after 24 months of benefit entitlement, not 24 months after disability began. Adding the five-month waiting period gives about 29 months from onset.
> - **Primary versus family offset:** Whether the LTD plan offsets dependents' benefits changes the net benefit a lot. Offsetting the family benefit under a plan that offsets only the primary benefit understates the plan's claim cost.
> - **The family maximum:** Dependents' benefits are capped by the family maximum, so each child's 50% of the PIA can't simply be added. Check the total against the lesser of 85% of AIME and 150% of PIA.
> - **Any gainful activity:** SSDI's definition is much stricter than an own-occupation LTD definition. Assuming every LTD claimant will receive SSDI overstates the offset and understates the LTD cost.
