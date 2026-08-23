---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef03b0eee6c92f9cb4174227c46a0b7d01816a5f79bc9a50aeb2fab4f2d372f8
  sources: []
  open_findings: 0
  log: .verify/Concepts/Ratemaking Constraints.md
---

**Ratemaking Constraints** are the regulatory, competitive, operational and legal limits that cause the **filed** rate change to differ from the **indicated** one. The actuary's obligation is not that the two agree, but that the indication is computed properly and the departure is identified and documented.

> $$\text{Selected Change} = f\!\left(\text{Indication},\; \text{Credibility},\; \text{Constraints}\right)$$

- **Regulatory.** Prior-approval jurisdictions can delay or deny a filing; some cap the size of a single change, restrict changes in particular territories, or require rate capping at the individual policy level. Approval timing alone can push an effective date months out — a reason indications reach so far forward in the [[Loss Trend|trend period]].
- **Legal.** Certain rating variables are prohibited or restricted: credit-based insurance scores, gender, occupation and education in various jurisdictions, and territory in some lines. A variable that is actuarially sound and operationally practical can still be unusable.
- **Competitive.** A fully indicated increase above the market costs retention, and the policyholders who leave are disproportionately the ones with alternatives — the better risks. The indication does not model that; [[Lifetime Value|retention modelling]] does.
- **Operational.** Systems, filing capacity, agent notification and policyholder communication all bound how granular and how fast a change can be.
- **Consumer disruption.** Rate capping and phasing limit individual premium movement. They buy acceptance at the cost of delayed adequacy and a book carrying two rate levels at once — which must be tracked for [[On-Leveling|on-levelling]].

The professional position: [[Principles of Ratemaking|CAS Principle 4]] and the actuarial standards require the actuary to *estimate* the expected cost. If a constraint prevents charging it, the rate is inadequate and the actuary should say so — quantify the shortfall, state the assumptions, and record that the selection departs from the indication. Re-deriving the indication until it matches the desired filing is what the standards exist to prevent.

![[Media/Figures/Ratemaking_Constraints.svg|340]]

> [!example]- A Regulatory Cap {Example}
> The indication is $+18\%$; the regulator caps a single filing at $+10\%$. The book earns $\$25{,}000{,}000$.
>
> What are the insurer's options and what is the cost of the constraint?
>
> > [!answer]-
> > Filing $+10\%$ leaves a residual inadequacy of
> >
> > $$\frac{1.18}{1.10} - 1 = +7.3\%$$
> >
> > Against $\$25{,}000{,}000$ of earned premium, the annual shortfall is roughly
> >
> > $$\$25{,}000{,}000 \times \frac{0.073}{1.18} \approx \$1{,}550{,}000$$
> >
> > Options, none of which requires the regulator's agreement on rate:
> >
> > - **File again next cycle** for the residual $+7.3\%$, plus whatever the intervening trend adds.
> > - **Non-pricing action** — tighten eligibility, raise minimum deductibles, restrict new business in the worst territories. These reach adequacy through the loss side rather than the premium side ([[Considerations for Implementing Rates]]).
> > - **Re-file with better support.** A cap is often a response to inadequate documentation as much as to the number; a filing that demonstrates the trend and development selections may clear a higher threshold.
> >
> > What the actuary records either way: the indication is $+18\%$, the selection is $+10\%$, the reason is the regulatory cap, and the expected underwriting result at the filed rate is a loss of about $\$1.55$M a year until the gap is closed.

> [!example]- When a Rating Variable Is Prohibited {Example}
> A jurisdiction bans the use of credit-based insurance scores. The insurer's GLM shows the variable is highly predictive: the worst credit tier has a pure premium relativity of $1.62$ against the best.
>
> What happens to the book, and what should the actuary do?
>
> > [!answer]-
> > Removing the variable does not remove the cost difference — it removes the ability to charge for it. Two consequences follow immediately:
> >
> > 1. **Cross-subsidy.** Good-credit insureds are over-charged relative to their expected cost and poor-credit insureds under-charged. In a competitive market the over-charged group is the one with alternatives, so the book drifts toward the under-priced segment and the average loss ratio deteriorates — [[Mix of Business|mix]] change caused by the pricing structure itself.
> > 2. **Rate level.** The overall indication must anticipate that drift. An indication built on the historical mix will be inadequate by the time the new mix arrives.
> >
> > The actuarial responses are to **re-fit the model without the variable** — so that the remaining variables absorb what correlated signal they legitimately can, rather than leaving the effect unmodelled — and to monitor the mix shift explicitly rather than waiting for it to appear as adverse experience.
> >
> > What is *not* an actuarial response is proxying the prohibited variable through a correlated substitute chosen for that purpose. That is a legal question with an obvious answer, and the professional standards treat compliance as a constraint on the work, not an input to be optimized against.
