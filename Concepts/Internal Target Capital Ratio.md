---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e08cbdfc4d0f050844c25d648facf7cc2f0e4d6a6224d453d18de9b4b69ecd85
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Target Capital Ratio.md
---

**The Internal Target Capital Ratio** is the [[MCT]] ratio an insurer sets for **itself**, above [[OSFI]]'s $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], reflecting risks the standardised formula does not fully capture and the volatility of its own results. It is established through the insurer's **[[ORSA]]**, approved by the board, and it is the level at which management is expected to operate.

- **Why it must exceed the supervisory target.** The supervisory target is a floor for a typical insurer; a particular insurer may carry catastrophe concentration, long-tail reserve uncertainty, a growth plan, thin reinsurance, or a volatile investment portfolio that the standardised [[Capital Required]] formula treats generically. The internal target is where those specifics are priced.
- **How it is derived.** Working backwards from the insurer's own adverse scenarios: identify the plausible severe events ([[Probable Maximum Loss|PML]], a reserve strengthening, a market decline, a reinsurer failure), quantify their after-tax effect on [[Capital Available]] and on the [[Base Solvency Buffer]], and set the target so that the ratio stays above the supervisory target afterwards.
- **It is the first tripwire.** Breaching the internal target should trigger management action — a capital plan, reduced distributions, moderated growth — while the insurer is still well above supervisory attention. An internal target that gives no early warning has failed its purpose.
- **[[FCT]] tests it; [[ORSA]] sets it.** ORSA is the forward-looking process that determines *how much* capital the insurer needs; FCT is the scenario testing that checks whether the target holds up. The two are complementary and OSFI expects both.
- **A target set too low is a governance finding.** OSFI reviews internal targets and challenges those that do not follow from the insurer's own scenarios — an insurer whose ORSA identifies a $\$50$ million catastrophe exposure and sets a target providing $\$20$ million of headroom has not done the work.

> [!example]- Deriving an Internal Target {Example}
> An insurer's ORSA identifies three severe but plausible events, each assessed at roughly a $1$-in-$100$ annual likelihood, with after-tax effects on capital available of: catastrophe $\$52$ million; reserve strengthening $\$38$ million; equity market decline $\$24$ million. Its base solvency buffer is $\$190$ million.
>
> Set the internal target.
>
> > [!answer]-
> > **Single largest event.** To remain at the supervisory target after a $\$52$ million catastrophe:
> >
> > $$\begin{align*}
> > \text{Required CA} &= 1.50 \times \$190\text{M} + \$52\text{M} \\
> > &= \$337\text{M} \\[4pt]
> > \text{Implied target} &= \frac{\$337\text{M}}{\$190\text{M}} = 177\%
> > \end{align*}$$
> >
> > **A combination.** Events are not perfectly independent — a catastrophe can coincide with a market decline, and a hard year often produces both losses and reserve deterioration. Testing the catastrophe together with the reserve strengthening:
> >
> > $$\begin{align*}
> > \text{Required CA} &= \$285\text{M} + \$52\text{M} + \$38\text{M} \\
> > &= \$375\text{M} \\[4pt]
> > \text{Implied target} &= \frac{\$375\text{M}}{\$190\text{M}} = 197\%
> > \end{align*}$$
> >
> > **A defensible internal target is around $190$–$200\%$**, with the reasoning documented: the single-event test gives the floor, the combined test gives the target, and the difference is a judgement about correlation the board should be asked to approve explicitly.
> >
> > **What would make this wrong.** Setting $160\%$ "because peers are around there" fails the ORSA requirement — the target must follow from *this* insurer's scenarios. And note the buffer itself would rise after a catastrophe (reinsurance exhausted, risk profile changed), so these calculations are, if anything, optimistic. A careful ORSA models both sides of the ratio.
