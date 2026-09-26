---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5738195af31278225ec671271201cafbd56cdd04ecaecd2ae240a2d63c3fcde5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess and Surplus Lines.md
---

**Excess and Surplus Lines** (E&S, or surplus lines) is the U.S. **nonadmitted** insurance market: coverage placed, through a licensed surplus lines broker, with an insurer that is not licensed in the insured's home state but is *eligible* to write there, for risks the admitted market will not or cannot cover. In exchange for escaping the admitted market's rate and form regulation, the placement is regulated through the broker — and, since 2011, by the insured's **home state** alone.

> $$\text{Surplus lines tax} = t_{\text{home state}} \times \text{Premium}_{\text{all states}}$$

- **Freedom of rate and form.** E&S insurers do not file rates or policy forms for approval, so they can write what the admitted market is not built for: unusual, hazardous, high-limit or new risks — coastal property, excess casualty, cannabis, emerging technology. Capacity flows into E&S in hard markets, when admitted insurers restrict, which makes it the market's shock absorber.
- **Diligent search.** Before placing a risk with a nonadmitted insurer, the broker must show that coverage is not available from admitted insurers — typically by documenting a stated number of declinations, commonly three. Many states publish **export lists** of coverages deemed unavailable in the admitted market, for which no search is needed.
- **The NRRA 2010** — the Nonadmitted and Reinsurance Reform Act, part of [[Dodd-Frank]], effective July 2011 — replaced fifty sets of overlapping rules:
  - *Home-state rule:* only the insured's home state (normally its principal place of business) may regulate the placement and require premium tax, even on exposures in other states.
  - *Uniform eligibility:* a state may not impose eligibility requirements on a U.S. nonadmitted insurer beyond the NAIC's Non-Admitted Insurance Model Act standards, and alien insurers on the NAIC's Quarterly Listing of Alien Insurers are eligible.
  - *Exempt commercial purchasers:* a large commercial buyer with a qualified risk manager, meeting size thresholds, may be placed without a diligent search if the broker discloses that admitted coverage may be available and the buyer requests the placement in writing.
- **Weaker policyholder protection.** Solvency is regulated by the insurer's own domicile, not by the insured's state, and E&S policyholders are generally **not** protected by state guaranty funds (a few states have made exceptions). The policy must carry a notice saying so. This is the trade the E&S buyer makes for availability.
- E&S sits beside [[Risk Retention Groups]] as the two routes to coverage outside the admitted market, and is one of the [[Specialized Insurance Topics]] on Exam 6U; see also [[State and Federal Insurance Regulation]].

> [!example]- Multistate Premium Tax After the NRRA {Example}
> A manufacturer's principal place of business is in State A; $60\%$ of its exposure is in State A, $25\%$ in State B and $15\%$ in State C. Its property program is placed in the surplus lines market for a premium of $\$400{,}000$. Suppose State A's surplus lines tax rate is $5\%$.
>
> Who taxes the placement, and how much is due?
>
> > [!answer]-
> > Under the NRRA only the **home state** — State A, the principal place of business — may require payment of premium tax, and it taxes the **whole** premium:
> >
> > $$
> > \begin{align*}
> > \text{Tax} &= 0.05 \times \$400{,}000 \\
> > &= \$20{,}000
> > \end{align*}
> > $$
> >
> > States B and C collect nothing from this placement, although $40\%$ of the exposure is theirs.
> >
> > **What changed.** Before the NRRA, each state could tax its allocated share at its own rate and apply its own diligent-search, filing and broker-licensing rules, so one multistate placement meant compliance in three states. The NRRA gave one state all of it. It also invited states to share taxes by compact, but whether State A shares any of the $\$20{,}000$ with B and C now depends on State A's own law.

> [!example]- Can This Risk Go to the Surplus Lines Market? {Example}
> A broker in the insured's home state receives two submissions:
>
> 1. A regional restaurant group needs liquor liability. Two admitted insurers have declined; the home state requires three declinations and liquor liability is not on its export list.
> 2. A national retailer with a full-time risk manager, well above the exempt-commercial-purchaser size thresholds, wants its excess liability tower placed with a Lloyd's syndicate.
>
> What must happen before each placement?
>
> > [!answer]-
> > 1. **Not yet.** The broker needs a third declination from an admitted insurer (or a documented search the home state accepts) before placing the risk with an eligible nonadmitted insurer. The broker then files the placement, collects and remits the home-state tax, and ensures the policy carries the notice that guaranty-fund protection is not available.
> > 2. **Yes, without a diligent search**, provided the broker discloses that the coverage may be available from admitted insurers, with more regulatory protection, and the retailer then requests the surplus lines placement in writing. The Lloyd's syndicates are alien insurers on the NAIC Quarterly Listing, so they are eligible without the home state adding requirements of its own.
> >
> > The contrast shows the design: diligent search protects **small** buyers from being sent to a less-protected market unnecessarily, and the NRRA removes that protection only for buyers deemed sophisticated enough not to need it.
