---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce861b2f2d37005df4e92a765d4831758f7b73ab01351dbdd1a4628c39ec87f4
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
    - "Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf"
    - "IRMI glossary, 'surplus share', sha256:ed71737b7b895e79a3c5a11fdd70d35675c6d78baf97a62dd3ae544c84f66d13 — https://www.irmi.com/term/insurance-definitions/surplus-share"
    - "IRMI glossary, 'ceding commission', sha256:88a3389009b6868cb1b320484faec2ea1d2e744f5e74e14631b2cebe31600323 — https://www.irmi.com/term/insurance-definitions/ceding-commission"
    - "IRMI glossary, 'pro rata reinsurance', sha256:87029130ba567ffc15e84988e1569b5582477b2cb4c4f27db17e5717c4a85c6f — https://www.irmi.com/term/insurance-definitions/pro-rata-reinsurance"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Pro Rata Reinsurance.md
---

**Pro Rata Reinsurance** (proportional reinsurance) is reinsurance in which the reinsurer takes a stated percentage of the premium on the business reinsured and pays the same percentage of every loss on it, usually returning part of the premium to the ceding insurer as a ceding commission. Its two main forms are [[Quota Share|quota share]], where the percentage is the same for every policy, and [[Surplus Share|surplus share]], where the percentage depends on how far each risk's value exceeds the cedant's retained line.

> $$\text{Ceded}_{\text{QS}} = a \times X$$

> $$s = \frac{\min\big(\max(V - R,\ 0),\ N R\big)}{V}$$

> $$\text{Ceded}_{\text{SS}} = s \times X$$

> $$\text{Commission} = c \times \text{Ceded premium}$$

- **Symbols:** $X$ is a loss and $a$ is the quota share percentage ceded. For a surplus share, $V$ is the risk's insured value, $R$ is the retained line, $N$ is the number of lines the treaty provides, and $s$ is the risk's cession percentage. The treaty's capacity is $NR$, and a risk worth more than $R + NR$ leaves the excess with the cedant unless it buys more reinsurance. $c$ is the ceding commission rate, applied to the premium ceded, which is ceded in the same percentage as the losses.
- **Quota share:** The reinsurer receives a flat percentage of the premium for the book reinsured and pays that percentage of its losses, usually including allocated loss adjustment expense. Because every policy is shared alike, a quota share reduces the cedant's net premium and net losses in proportion without changing the shape of its results. It is also how an insurer can leave a territory or line, by ceding 100% of the business until the policies run off.
- **Surplus share:** The cedant keeps up to a fixed amount of each risk, its retained line, and cedes the part of the insured value above it, up to the treaty's number of lines. Small risks are retained entirely and large ones are mostly ceded, which evens out the cedant's net amount at risk per policy. A line guide can set different retentions by class, so a more hazardous class is retained at a lower amount.
- **Not excess of loss:** In a surplus share the retention is used only to fix the risk's cession percentage. Once that is fixed, the reinsurer pays its share of every loss on the risk, however small. [[Excess of Loss|Excess of loss]] reinsurance, by contrast, pays only the part of a loss above the retention.
- **Ceding commission:** The reinsurer pays the cedant a ceding commission to compensate it for the underwriting and acquisition expenses it incurred to write the business. The commission offsets the cedant's expenses on the ceded share, and in practice it is the price of a proportional treaty.
- **Adjustable commissions:** A sliding scale commission moves with the treaty's loss experience between a minimum and a maximum. In Clark's illustration the provisional commission is 30%, the minimum 25% at a 65% loss ratio, rising one point per point of loss ratio to 35% at a 55% loss ratio, then half a point per point to a maximum of 45% at a 35% loss ratio. A profit commission instead pays the cedant a share of the treaty's profit after losses, the ceding commission and the reinsurer's margin.
- **What it does for the cedant:** Proportional reinsurance supplies capacity, because surplus supports only so much premium and ceding part of it lowers the net premium the insurer carries against its surplus. It gives surplus relief to a growing insurer whose premium and unearned premium are outpacing its surplus, with the commission offsetting the expenses on the share ceded. It also makes the risks the cedant retains more alike, which stabilizes its results. Surplus share also adds large-line capacity, letting an insurer write a risk far larger than it could retain alone.

> [!example]- Three Risks Under a Surplus Share {Example}
> A property insurer has a surplus share treaty with a retained line of \$250,000 and 4 lines. It has three risks: (A) insured value \$200,000, with a \$50,000 loss; (B) insured value \$750,000, with a \$300,000 loss; (C) insured value \$2,000,000, with a \$400,000 loss. Find each risk's cession percentage and the ceded and retained loss.
>
> > [!answer]-
> > The treaty's capacity is $4 \times 250{,}000 = 1{,}000{,}000$, so it covers risks up to \$1,250,000 in full.
> > $$
> > \begin{align*}
> > s_A &= \frac{\max(200{,}000 - 250{,}000,\ 0)}{200{,}000} \\
> > &= 0 \\
> > s_B &= \frac{750{,}000 - 250{,}000}{750{,}000} \\
> > &= 66.67\% \\
> > s_C &= \frac{\min(1{,}750{,}000,\ 1{,}000{,}000)}{2{,}000{,}000} \\
> > &= 50\%
> > \end{align*}
> > $$
> > - **A:** below the retained line, so nothing is ceded and the cedant keeps the \$50,000 loss.
> > - **B:** the reinsurer pays $0.6667 \times 300{,}000 = \$200{,}000$ and the cedant keeps \$100,000.
> > - **C:** the reinsurer pays $0.50 \times 400{,}000 = \$200{,}000$ and the cedant keeps \$200,000. The cedant's net share of C is its \$250,000 line plus the \$750,000 above the treaty's capacity, half the value. It would need facultative reinsurance or a second surplus treaty to cede more.
> >
> > Risk B's loss of \$300,000 is less than its value, yet two-thirds of it is ceded. An excess of loss treaty with the same \$250,000 retention would have ceded only \$50,000.

> [!example]- Capacity from a Quota Share {Example}
> An insurer writes \$40 million of premium a year on a book with an expected loss ratio of 62%, and has \$12 million of surplus. It considers a 30% quota share with a 32% ceding commission. Find the ceded premium, the commission, the expected ceded losses and the insurer's net premium-to-surplus ratio before and after the treaty, ignoring the treaty's effect on surplus itself.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Ceded premium} &= 0.30 \times 40{,}000{,}000 \\
> > &= 12{,}000{,}000 \\
> > \text{Commission} &= 0.32 \times 12{,}000{,}000 \\
> > &= 3{,}840{,}000 \\
> > \text{Ceded losses} &= 0.30 \times 0.62 \times 40{,}000{,}000 \\
> > &= 7{,}440{,}000 \\
> > \text{Net premium} &= 40{,}000{,}000 - 12{,}000{,}000 \\
> > &= 28{,}000{,}000
> > \end{align*}
> > $$
> > The premium-to-surplus ratio falls from $40/12 = 3.33$ to $28/12 = 2.33$, so the same surplus now supports more new writing. The \$3.84 million commission offsets the expenses the insurer paid to write the ceded share. The price is that 30% of the book's expected profit goes to the reinsurer too.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The reinsurance section asks for the types of pro rata reinsurance and how each shares premium and losses. Calculation questions find a surplus share cession percentage and split a loss, or split premium, commission and losses under a quota share.
> - **Choice** questions ask which treaty fits a need: a quota share for surplus relief or to leave a line, a surplus share for a book with a few very large risks.

> [!warning]- Exam traps
> - **Surplus share is not excess:** The reinsurer pays its percentage of every loss on a ceded risk, including small ones. Subtracting the retention from the loss treats it as excess of loss.
> - **Lines are multiples of the retention:** Four lines on a \$250,000 retention give \$1,000,000 of treaty capacity, on top of the \$250,000 retained. Reading "4 lines" as four times the risk's value overstates the cession.
> - **Premium follows the percentage too:** In both forms the premium is ceded in the same proportion as the losses, and the commission comes back on the ceded premium. Ceding losses without ceding the matching premium misstates both sides.
> - **Above capacity stays net:** A risk larger than the retention plus the treaty's lines leaves the excess with the cedant. The cession percentage is capped, not the cedant's share.
