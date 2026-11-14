---
aliases:
  - Social Security Disability Income Benefit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dd8798a27c71aa5c78ccfee52ae79753c997c314bef4bcd43cdb8a2daaeb5762
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Social Security Disability Insurance.md
---
**Social Security Disability Insurance** (SSDI) is the part of the U.S. Social Security program that pays a monthly income to insured workers who can't engage in any substantial gainful activity because of a medically determinable impairment expected to last at least 12 months or to end in death. It is [[Social Insurance|social insurance]], and group [[Disability Income Insurance|long-term disability]] (LTD) plans are built on top of it.

The benefit equals the worker's primary insurance amount (PIA), computed as if the worker had reached full retirement age. For a worker whose average indexed monthly earnings (AIME) are $A$, the PIA is

> $$\begin{aligned} \text{PIA} = {} & 0.90\min(A, b_1) \\ & + 0.32\left(\min(A, b_2) - b_1\right)_+ \\ & + 0.15\,(A - b_2)_+ \end{aligned}$$

- $b_1$ and $b_2$ are the bend points, which are $\$1{,}286$ and $\$7{,}749$ for a worker first eligible in 2026.
- $(\cdot)_+$ is the larger of the amount and zero.
- The PIA is rounded down to the next lower multiple of 10 cents.

## Insured status and the definition of disability

The worker must be fully insured, with enough work credits for their age, and disability insured. For a worker aged 31 or over, being disability insured generally means having 20 credits in the 40 calendar quarters ending with the quarter in which disability began. Younger workers need fewer.

The test is the inability to do any substantial gainful activity (SGA), not just the worker's own job, which makes it much stricter than most group LTD definitions. SGA is defined by monthly earnings, $\$1{,}690$ for non-blind people in 2026. Assuming every LTD claimant will receive SSDI overstates the offset and understates the LTD cost.

## Waiting period and Medicare

Benefits start with the sixth full calendar month of disability, after a waiting period of five full months. Entitlement to [[Medicare]] begins after 24 months of entitlement to benefits, so about 29 months after the onset of disability. Medicare's 24 months count from benefit entitlement, not from the onset of disability.

## Family benefits

An eligible child, or a spouse caring for a child, can receive up to 50% of the worker's PIA, subject to the family maximum. The family maximum for a disabled worker's family is the lesser of 85% of AIME and 150% of PIA, but not less than the PIA:

> $$\text{FM} = \max\Big(\min\big(0.85\,A,\ 1.5\,\text{PIA}\big),\ \text{PIA}\Big)$$

Dependents' benefits are capped by the family maximum, so each child's 50% of the PIA can't simply be added.

## Work incentives

A beneficiary can test a return to work through a trial work period of nine months without losing benefits. It is followed by an extended period of eligibility in which benefits restart in any month earnings fall below SGA. At full retirement age the disability benefit converts to a retirement benefit of the same amount.

## Integration with group long-term disability

Most group LTD plans reduce their benefit by the SSDI the claimant receives, either the primary benefit alone or the family benefit too, so the employer's plan only tops up to the target replacement ratio. The LTD benefit is

> $$B_{\text{LTD}} = \max\Big(\min(pW,\ M) - O_{\text{SS}} - O_{\text{other}},\ B_{\min}\Big)$$

- $W$ is pre-disability monthly earnings.
- $p$ is the replacement percentage.
- $M$ is the plan's monthly maximum.
- $O_{\text{SS}}$ is the Social Security offset.
- $O_{\text{other}}$ is any other offset, such as workers compensation.
- $B_{\min}$ is the plan's minimum benefit.

The offset is usually frozen at its first amount, so Social Security cost-of-living increases go to the claimant. Because SSDI awards often take more than a year, insurers help claimants apply and appeal, estimate the offset or pay unreduced benefits while the claim is pending, and recover the overpayment from the retroactive award.

The offset is a large part of LTD claim cost for long claims. The LTD insurer's cost therefore depends on assumptions about the probability of an SSDI award, its timing and its amount, and a change in SSA's approval rates changes LTD claim costs.

> [!example]- What is this worker's LTD benefit if the plan offsets the primary benefit only, and if it offsets the family benefit? {Example}
> A disabled worker first eligible in 2026 has an AIME of $\$6{,}000$ and one child. The group LTD plan pays 60% of pre-disability earnings of $\$8{,}000$ a month, with a monthly maximum of $\$10{,}000$, and a minimum benefit of the greater of $\$100$ and 10% of the gross benefit.
>
> > [!answer]-
> > - The AIME is between the two bend points, so $\text{PIA} = 0.90(1{,}286) + 0.32(6{,}000 - 1{,}286) = 1{,}157.40 + 1{,}508.48 = 2{,}665.88$.
> > - The PIA rounds down to $\$2{,}665.80$.
> > - The family maximum is $\min(0.85 \times 6{,}000,\ 1.5 \times 2{,}665.80) = \min(5{,}100.00,\ 3{,}998.70) = 3{,}998.70$.
> > - The child's benefit is 50% of the PIA, $\$1{,}332.90$, which fits exactly within the family maximum, so the family receives $\$3{,}998.70$ a month.
> > - The gross LTD benefit is $\min(0.60 \times 8{,}000,\ 10{,}000) = 4{,}800$, and the minimum benefit is $\$480$.
> > - Offsetting the primary benefit, the LTD plan pays $4{,}800.00 - 2{,}665.80 = \$2{,}134.20$, and the family receives $\$6{,}132.90$ a month in all.
> > - Offsetting the family benefit, it pays $4{,}800.00 - 3{,}998.70 = \$801.30$, and the family receives $\$4{,}800.00$. The LTD plan then pays only 17% of its gross benefit.

> [!example]- When do SSDI and Medicare begin for this worker, and how much does the LTD insurer recover? {Example}
> The worker above became disabled on January 15, 2026. The LTD plan has a 90-day elimination period and offsets the family benefit of $\$3{,}998.70$. It pays the unreduced $\$4{,}800$ while the SSDI claim is pending, under an agreement to repay any overpayment. SSDI is awarded in January 2027, with the family benefit payable from the first month allowed.
>
> > [!answer]-
> > - The first full calendar month of disability is February 2026, so the waiting period runs February to June and SSDI is payable from July 2026.
> > - Medicare starts after 24 months of entitlement, in July 2028.
> > - The LTD benefit started in mid-April 2026, and the offset applies from July.
> > - July to December 2026 were each overpaid by the family benefit, so the insurer recovers $6 \times 3{,}998.70 = \$23{,}992.20$ from the retroactive award.
> > - From January 2027 the insurer pays $\$801.30$ a month.

> [!trap] Counting the waiting period from the onset date
> Benefits start with the sixth full calendar month of disability. A disability that begins in the middle of January has its first full month in February, so benefits start in July, not June.
