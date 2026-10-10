---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cb3f065f48528829dabc4d3196ccf42a3a87a928513a6f8becaa8f731d6cb441
  sources:
    - "NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf"
    - "NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unfair Claims Settlement Practices.md
---

**Unfair Claims Settlement Practices** are claim-handling acts that state law prohibits, such as misrepresenting policy provisions, refusing to pay without a reasonable investigation, or failing to settle in good faith once liability is reasonably clear. Most states base their rules on the NAIC's Unfair Claims Settlement Practices Act (model #900) and its Unfair Property/Casualty Claims Settlement Practices Model Regulation (model #902), which set minimum standards for investigating and disposing of claims and give the insurance commissioner the power to examine claim files and penalize violations.

> $$t_{\text{ack}} \le t_{\text{notice}} + 15$$

> $$t_{\text{decision}} \le t_{\text{proof}} + 21$$

> $$t_{\text{pay}} \le t_{\text{affirm}} + 30$$

- **Symbols:** Times are in calendar days under the model regulation. $t_{\text{notice}}$ is when the insurer or its agent receives notification of a claim, and $t_{\text{ack}}$ is its acknowledgment, which isn't needed if the claim is paid within the 15 days. $t_{\text{proof}}$ is receipt of a properly executed proof of loss, and $t_{\text{decision}}$ is when the first-party claimant is told the claim is accepted or denied. $t_{\text{affirm}}$ is when the insurer affirms liability on a claim whose amount is determined and not in dispute, and $t_{\text{pay}}$ is when it tenders payment. States that adopt the model often change the periods, so the state's own rule governs.
- **When an act is a violation:** Under the model act, a listed act is an improper claims practice if it is committed flagrantly and in conscious disregard of the act, or so often that it indicates a general business practice. A single mistake on one claim is not, by itself, a violation of the act.
- **The prohibited acts:** The act lists fourteen. In summary, an insurer may not:
  - knowingly misrepresent relevant facts or policy provisions to claimants;
  - fail to acknowledge claim communications with reasonable promptness;
  - fail to adopt reasonable standards for prompt investigation and settlement;
  - fail to attempt in good faith a prompt, fair and equitable settlement once liability is reasonably clear;
  - force insureds to sue by offering substantially less than they later recover in suits;
  - refuse to pay without a reasonable investigation;
  - fail to affirm or deny coverage within a reasonable time after investigating;
  - settle for less than a reasonable person would expect from the insurer's advertising, or on the basis of an application altered without the insured's knowledge;
  - make payments without saying which coverage each is under;
  - delay by requiring a formal proof of loss and then duplicate verification of the same information;
  - fail to promptly explain the basis for a denial or a compromise offer;
  - fail to provide claim forms within 15 calendar days of a request;
  - fail to ensure that repairs by a repairer it owns or requires are done in a workmanlike manner.
- **Scope:** The model act covers claims under policies issued to the state's residents, but not workers compensation, fidelity, suretyship or boiler and machinery claims. It creates no private cause of action: it is enforced by the commissioner. A claimant who sues an insurer for bad faith does so under other law, which the act does not create.
- **Files and records:** Under the regulation, claim files are subject to examination by the commissioner. The insurer must be able to produce each claim's number, line of coverage, date of loss and date of payment, denial or closing for the current year and the two before it. Each file must contain enough documentation to reconstruct the insurer's handling of the claim, with every document dated when received, processed or mailed.
- **Communications:** Besides acknowledging a claim within 15 days, the insurer must answer an inquiry from the insurance department within 21 days, reply within 15 days to other claimant communications that expect a response, and promptly give first-party claimants the forms, instructions and reasonable help they need.
- **Disclosure and releases:** The insurer must fully disclose to a first-party claimant all pertinent benefits and coverages. It may not deny a claim for failure to exhibit property unless the file documents a breach of the policy. It may not mark a payment "final" or a "release" unless the policy limit has been paid or a compromise has been agreed.
- **Decisions and payment:** A denial must be in writing and must cite the provision, condition or exclusion it relies on. If the insurer needs more time, it must say why within 21 days of the proof of loss, and then every 45 days while the investigation continues. The deadlines give way to a reasonable time for full investigation when specific information gives the insurer a reasonable basis to suspect the claimant fraudulently caused or contributed to the loss. An unrepresented claimant whose rights may be cut off by a statute of limitations must be warned in writing at least 30 days (first party) or 60 days (third party) before it expires. A claimant who objects to a denial must be told in writing that the insurance department can review it.
- **Auto total losses:** The regulation sets how a first-party auto total loss is settled on actual cash value: a comparable replacement vehicle, or cash based on the cost of comparable vehicles, dealer quotations or a qualifying valuation source, with taxes and fees included. Where liability and damages are reasonably clear, an insurer may not tell a third-party claimant to claim under their own policy just to avoid paying.
- **Penalties:** After a hearing, the commissioner may order the insurer to cease and desist and may impose a penalty of up to \$1,000 a violation, with a \$100,000 aggregate. For flagrant violations in conscious disregard of the act, the caps are \$25,000 a violation and \$250,000 in total. Violating a cease and desist order carries up to \$25,000 a violation, \$250,000 in total, and license suspension or revocation is available in both cases.

> [!example]- Checking a Claim File Against the Deadlines {Example}
> A homeowner reports a fire to her agent on day 0. The insurer's first contact is a letter on day 18. The properly executed proof of loss arrives on day 40, and on day 66 the insurer affirms that it owes \$42,000, an amount not in dispute. It pays on day 101. Under the model regulation's periods, which steps were late?
>
> > [!answer]-
> > Notice to the agent is notice to the insurer, so the clock starts on day 0.
> > $$
> > \begin{align*}
> > t_{\text{ack}} &\le 0 + 15 \\
> > &= 15 \\
> > t_{\text{decision}} &\le 40 + 21 \\
> > &= 61 \\
> > t_{\text{pay}} &\le 66 + 30 \\
> > &= 96
> > \end{align*}
> > $$
> > - **Acknowledgment late:** day 18 is after day 15, and no payment was made in that time.
> > - **Decision late:** day 66 is after day 61. If the insurer needed more time it had to tell her why by day 61.
> > - **Payment late:** day 101 is after day 96.
> >
> > One late file is a compliance failure for the claims department to fix. If an examination finds the same delays across many files, they indicate a general business practice, which is what the model act penalizes. The NAIC separated these practices into their own act in 1990 to focus market conduct surveillance on claims.

> [!example]- How Large Can the Penalty Be? {Example}
> A market conduct examination finds that an insurer denied claims without citing the policy provision relied on. After a hearing, the commissioner finds (a) 40 violations, not flagrant; (b) 160 violations, not flagrant; (c) 15 violations committed flagrantly and in conscious disregard of the act. What is the largest monetary penalty the model act allows in each case?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{(a)}\quad &\min(40 \times 1{,}000,\ 100{,}000) \\
> > &= 40{,}000 \\
> > \text{(b)}\quad &\min(160 \times 1{,}000,\ 100{,}000) \\
> > &= 100{,}000 \\
> > \text{(c)}\quad &\min(15 \times 25{,}000,\ 250{,}000) \\
> > &= 250{,}000
> > \end{align*}
> > $$
> > The commissioner can also order the insurer to cease and desist and, where it knew or should have known of the violation, suspend or revoke its license. State versions of the act often set different amounts.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The claims section asks for the measures a claims department uses to ensure regulatory compliance. Questions describe a practice and ask whether it is unfair under the model act, or which standard a file breaches.
> - **Timing** questions give the dates on a claim file and ask which step missed a deadline, or what the insurer had to send to extend its time.
> - **Concept** questions ask why one isolated error differs from a general business practice, and who enforces the act.

> [!warning]- Exam traps
> - **Frequency or flagrancy:** The model act penalizes a listed act only when it is flagrant and in conscious disregard of the act, or frequent enough to be a general business practice. Treating every late letter as an automatic violation misreads it.
> - **No private lawsuit under the act:** The model act is enforced by the commissioner. A claimant's lawsuit for bad faith rests on other law, so the act is not the claimant's cause of action.
> - **Denials must cite the policy:** A written denial that gives no provision, condition or exclusion breaches the regulation, even if the denial itself is correct.
> - **Excluded lines:** Workers compensation, fidelity, suretyship and boiler and machinery claims are outside the model act, so its standards don't govern them.
