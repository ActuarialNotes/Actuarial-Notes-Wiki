---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:910e18aba562917258f2ece74090585b6a57b8e9e0334e3d6f063a1d4b5f524e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurtech.md
---

**Insurtech** is the use of digital technology to change how insurance is designed, sold, underwritten, serviced and claimed, and the term also names the start-up firms built around that technology. The digitization of insurance reaches every [[Insurance Operations|insurance function]], through telematics and connected devices, artificial intelligence, digital distribution and, more experimentally, blockchain, and it is pursued by established insurers as well as by new entrants.

> $$M = P(1 - d) - L(1 - b)(1 - s) - c$$

> $$V = n \times r \times M$$

- **Symbols:** For a telematics or other data-driven programme, $M$ is the margin per participating policy. $P$ is the premium before the programme, $d$ the average discount, $L$ the expected loss of the participants, $b$ the reduction in losses from changed behaviour, $s$ the reduction in claim severity from faster or cheaper claims handling, and $c$ the cost per policy of devices, data and analysis. In the second block, $V$ is the value of a block of $n$ such policies of which a share $r$ is retained.
- **Telematics and usage-based insurance:** Devices and phone apps record how, when and how much a vehicle is driven, which supports [[Usage-Based Insurance|usage-based insurance]] and pay-per-mile pricing. The data price risk more accurately and can also change behaviour, since drivers who know they are measured tend to drive more carefully.
- **The Internet of Things:** Connected sensors in homes, buildings and equipment report water leaks, fire, temperature and machine faults as they happen. They shift the insurer from paying for losses toward preventing them, which extends traditional [[Risk Control|risk control]].
- **Artificial intelligence and analytics:** [[Predictive Analytics|Predictive models]] and machine learning support underwriting and pricing with more variables, flag suspicious claims, read documents and photographs, and power chatbots. Aerial and satellite images let an underwriter assess a roof without an inspection.
- **Digital distribution:** Customers can compare, buy and service policies online or through apps, and insurance can be embedded in the purchase of another product, such as travel insurance with a flight. This changes the role of the [[Insurance Producer|producer]] and the choice among [[Insurance Distribution Systems|distribution systems]].
- **Blockchain and smart contracts:** A shared ledger can record policies and claims among several parties, and a smart contract can pay a parametric claim, such as flight-delay cover, automatically once a trusted data source reports the trigger. Uses so far are mostly pilots and specialty lines.
- **Effects on the insurer:** Underwriting becomes more granular, so an insurer that does not use the new data risks [[Adverse Selection|adverse selection]] as competitors take its better risks. Claims handling becomes faster and cheaper through automated notice of loss and straight-through processing. New risks appear as well, including cyber risk, privacy and [[Data Ethics|data ethics]] concerns, [[Model Risk|model risk]] and regulatory scrutiny of new rating variables.
- **Incumbents and start-ups:** Some insurtechs compete directly as insurers or agencies, while many sell technology to established insurers or partner with them. Incumbents bring capital, licences and claims experience, so partnership is common.

> [!example]- A Telematics Programme Across the Value Chain {Example}
> An auto insurer has 10,000 low-risk drivers paying \$1,500 a year with expected losses of \$900 each. Without a telematics programme, it expects to retain 75% of them as competitors offer usage-based discounts. With a programme, participants get a 10% average discount, their losses fall 5% through safer driving and a further 3% through crash detection and faster claims handling, the device and data cost \$20 a year each, and retention rises to 92%. Ignoring other expenses, compare the value of the block with and without the programme.
>
> > [!answer]-
> > Without the programme, the margin per policy is the premium less the expected losses.
> > $$
> > \begin{align*}
> > M_0 &= 1{,}500 - 900 \\
> > &= 600 \\
> > V_0 &= 10{,}000 \times 0.75 \times 600 \\
> > &= 4{,}500{,}000
> > \end{align*}
> > $$
> > With the programme, the discount, the two loss reductions and the device cost all enter the margin.
> > $$
> > \begin{align*}
> > M_1 &= 1{,}500(0.90) - 900(0.95)(0.97) - 20 \\
> > &= 1{,}350 - 829.35 - 20 \\
> > &= 500.65 \\
> > V_1 &= 10{,}000 \times 0.92 \times 500.65 \\
> > &= 4{,}605{,}980
> > \end{align*}
> > $$
> > The programme earns less on each policy, because the discount costs more than the loss savings, but it keeps more of the good drivers, and the block is worth about \$106,000 more. The example shows the programme touching three parts of the value chain: underwriting through the discount and better risk selection, claims through the severity saving, and distribution through retention. It also shows the risk, since a smaller retention gain would make the programme a loss.

> [!example]- Automated Claims Estimating {Example}
> An insurer handles 20,000 auto physical damage claims a year at an adjusting expense of \$600 per claim. A photo-based estimating app lets 60% of claimants submit images instead of waiting for an appraiser, and it cuts the expense on those claims to \$450. Find the annual saving.
>
> > [!answer]-
> > The saving applies only to the claims that use the app.
> > $$
> > \begin{align*}
> > \text{Saving} &= 20{,}000 \times 0.60 \times (600 - 450) \\
> > &= 1{,}800{,}000
> > \end{align*}
> > $$
> > The insurer saves \$1,800,000 a year, and claimants are paid sooner. Against it the insurer must weigh the app's cost, the risk of fraud from altered photographs, and the 40% of claims that still need an appraiser.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask how a technology such as telematics, connected devices, artificial intelligence or blockchain affects a named insurance function, or what advantages and risks digitization brings to an insurer. Scenario questions describe a new programme and ask which function changes most, often alongside the functional view of insurance and [[Insurer Goals and Constraints|insurer goals and constraints]] from the same topic.
> - **Linked topics:** Distribution questions in the marketing topic may ask how direct online channels and embedded insurance change the role of producers. Data questions on DISC-DA return to the privacy and fairness side of the same technologies.

> [!warning]- Exam traps
> - **Insurtech is not only start-ups:** The term covers established insurers adopting technology as well as new firms, and many insurtechs work in partnership with incumbents rather than against them.
> - **A discount is not a saving:** Giving good drivers a telematics discount reduces premium on risks the insurer already had. The programme pays only through loss reduction, cheaper claims, better selection or retention, so a question that equates the discount with profit is wrong.
> - **Technology creates risks too:** More data brings privacy, cyber, model and regulatory risk. An answer that lists only benefits misses half of what the topic asks.
> - **Blockchain's role is narrow:** Smart contracts suit claims with an objective, externally verified trigger, such as parametric cover. They do not replace claims adjustment where loss must be assessed.
