---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:60db0eb98602ebc6284742cd5c4104c7640ebe0833eb6ce27a7979de7fd00ee2
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Target Capital Ratio.md
---

**The Internal Target Capital Ratio** is the [[MCT]] ratio an insurer sets for **itself**, above [[OSFI]]'s $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], reflecting risks the standardised formula does not fully capture and the volatility of its own results. It is established through the insurer's **[[ORSA]]**, approved by the board, and it is the level at which management is expected to operate.

- **Why it must exceed the supervisory target.** The supervisory target is a floor for a typical insurer; a particular insurer may carry catastrophe concentration, long-tail reserve uncertainty, a growth plan, thin reinsurance, or a volatile investment portfolio that the standardised [[Capital Required]] formula treats generically. The internal target is where those specifics are priced.
- **How it is derived.** Working backwards from the insurer's own adverse scenarios: identify the plausible severe events ([[Probable Maximum Loss|PML]], a reserve strengthening, a market decline, a reinsurer failure), quantify their after-tax effect on [[Capital Available]] and on minimum capital required, and set the target so that the ratio stays above the supervisory target afterwards.
- **It is the first tripwire.** Breaching the internal target should trigger management action — a capital plan, reduced distributions, moderated growth — while the insurer is still well above supervisory attention. An internal target that gives no early warning has failed its purpose.
- **[[FCT]] tests it; [[ORSA]] sets it.** ORSA is the forward-looking process that determines *how much* capital the insurer needs; FCT is the scenario testing that checks whether the target holds up. The two are complementary and OSFI expects both.
- **A target set too low is a governance finding.** OSFI reviews internal targets and challenges those that do not follow from the insurer's own scenarios — an insurer whose ORSA identifies a $\$50$ million catastrophe exposure and sets a target providing $\$20$ million of headroom has not done the work.

![[Media/Figures/Internal_Target_Capital_Ratio.svg|340]]

> [!example]- Deriving an Internal Target {Example}
> An insurer's ORSA identifies three severe but plausible events, each assessed at roughly a $1$-in-$100$ annual likelihood, with after-tax effects on capital available of: catastrophe $\$52$ million; reserve strengthening $\$38$ million; equity market decline $\$24$ million. Its minimum capital required is $\$190$ million.
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
> > **What would make this wrong.** Setting $160\%$ "because peers are around there" fails the ORSA requirement — the target must follow from *this* insurer's scenarios. And note minimum capital required itself would rise after a catastrophe (reinsurance exhausted, risk profile changed), so these calculations are, if anything, optimistic. A careful ORSA models both sides of the ratio.
