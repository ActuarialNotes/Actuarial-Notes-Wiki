---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c263112fd7159ccb4fe5bb6bb7786e4c463ecdfebc816bfc9365445a021bb368
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Target Capital Ratio.md
---

![[Media/Figures/Internal_Target_Capital_Ratio.svg|340]]

The **Internal Target Capital Ratio** is the [[MCT]] ratio an insurer sets for itself, above [[OSFI]]'s $150\%$ [[Supervisory Target Capital Ratio|supervisory target]], reflecting risks the standardised formula does not fully capture and the volatility of its own results. It is established through the insurer's [[ORSA]], approved by the board, and it is the level at which management is expected to operate.

The supervisory target is a floor for a typical insurer. A particular insurer may carry catastrophe concentration, long-tail reserve uncertainty, a growth plan, thin reinsurance or a volatile investment portfolio that the standardised [[Capital Required]] formula treats generically. The internal target is where those specifics are priced, so it must exceed the supervisory target.

The target is derived by working backwards from the insurer's own adverse scenarios:

1. Identify the plausible severe events, such as a [[Probable Maximum Loss|PML]] event, a reserve strengthening, a market decline or a reinsurer failure.
2. Quantify their after-tax effect on [[Capital Available]] and on minimum capital required.
3. Set the target so that the ratio stays above the supervisory target afterwards.

If a scenario reduces capital available by $L$ and leaves minimum capital required $M$ unchanged, the internal target that keeps the ratio at the supervisory target after it is

> $$\text{Internal target} = 150\% + \frac{L}{M}$$

> [!example]- What internal target should this insurer set? {Example}
> An insurer's ORSA identifies three severe but plausible events, each at roughly a $1$-in-$100$ annual likelihood. Their after-tax effects on capital available are $\$52$ million for a catastrophe, $\$38$ million for a reserve strengthening and $\$24$ million for an equity market decline. Its minimum capital required is $\$190$ million.
>
> > [!answer]-
> > - At the supervisory target the insurer needs capital available of $1.50 \times 190 = \$285$ million.
> > - To stay there after the largest single event, the catastrophe, it needs $285 + 52 = \$337$ million, an implied target of $337/190 = 177\%$.
> > - Events are not perfectly independent, since a hard year often brings both losses and reserve deterioration. The catastrophe together with the reserve strengthening needs $285 + 52 + 38 = \$375$ million, an implied target of $375/190 = 197\%$.
> > - The single-event test gives the floor and the combined test gives the target, so a defensible internal target is around $190\%$ to $200\%$. The difference between the two is a judgement about correlation the board should approve explicitly.
> > - Minimum capital required would itself rise after a catastrophe (reinsurance exhausted, risk profile changed), so these figures are, if anything, optimistic. A careful ORSA models both sides of the ratio.

## ORSA and FCT

[[ORSA]] sets the target and [[FCT]] tests it. ORSA is the forward-looking process that determines how much capital the insurer needs, and FCT is the scenario testing that checks whether the target holds up. The two are complementary, and OSFI expects both.

## The internal target as an early warning

Breaching the internal target should trigger management action, such as a capital plan, reduced distributions or moderated growth, while the insurer is still well above supervisory attention. An internal target that gives no early warning has failed its purpose.

OSFI reviews internal targets and challenges those that do not follow from the insurer's own scenarios. An insurer whose ORSA identifies a $\$50$ million catastrophe exposure and sets a target providing $\$20$ million of headroom has not done the work, and a target set too low is a governance finding.

> [!trap] Setting the target from peers
> A target of $160\%$ chosen "because peers are around there" fails the ORSA requirement. The target must follow from this insurer's own scenarios.
