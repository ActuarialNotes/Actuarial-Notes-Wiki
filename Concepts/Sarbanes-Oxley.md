---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e9fbdd3f902fa955be320d92cf459ffc81d0c7a04fa921acbe0bc6ddcd03500b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sarbanes-Oxley.md
---

**The Sarbanes-Oxley Act of 2002** (SOX) is the federal statute, passed after the Enron and WorldCom accounting failures, that tightened financial reporting by SEC-registered companies: executive certification of reports, management assessment of internal control over financial reporting (ICFR), auditor independence, and public oversight of the audit profession. It reaches an insurer directly only if the insurer or its parent is publicly traded; the NAIC's **Model Audit Rule** (MAR) carries its core ideas to every statutory filer.

> $$\begin{aligned} \text{ICFR}_{\text{SOX 404}} &= \text{management assessment} \\ &\quad + \text{auditor attestation} \\[4pt] \text{ICFR}_{\text{MAR}} &= \text{management report only} \end{aligned}$$

- **The sections that matter:** Title I creates the **PCAOB** to register, inspect and set standards for public-company auditors; §201 bars auditors from providing listed non-audit services to audit clients; §203 rotates the lead and reviewing audit partners every five years; §301 makes an independent audit committee responsible for the auditor; §302 requires the CEO and CFO to certify each periodic report; §404(a) requires management's annual ICFR assessment and §404(b) the auditor's attestation on it (for larger, accelerated filers — [[Dodd-Frank]] made smaller companies' exemption permanent); §906 attaches criminal penalties to knowingly false certifications.
- **Why insurers needed more than SOX.** Mutuals, reciprocals and privately held insurers are outside it. The NAIC's *Annual Financial Reporting Model Regulation* (#205) — the **Model Audit Rule** — was revised on the SOX pattern, effective 2010:
  - an annual audit of the statutory statements by an independent CPA, filed by June 1;
  - lead audit partner rotation after five consecutive years, then five years off;
  - audit committee independence scaled to prior-year direct written and assumed premium: no minimum up to $\$300$ million, a majority above that, at least $75\%$ above $\$500$ million;
  - **management's report of ICFR** for insurers with $\$500$ million or more of premium — with **no auditor attestation**; the auditor instead reports any unremediated material weaknesses it finds;
  - an **internal audit function**, independent and reporting to the audit committee, for insurers above $\$500$ million or groups above $\$1$ billion.
- **Coordination.** An insurer that is, or is wholly owned by, a SOX-compliant entity is exempt from the rule's audit-committee section, and may meet the ICFR requirement with its own or its parent's §404 report plus an addendum confirming that the controls over the **statutory** statements were in scope.
- **Where the actuary sits.** Loss and LAE reserves are the largest estimate on a P&C balance sheet, so the reserving process — data reconciliation to the claim system and to [[Schedule P]], documented assumptions, review and sign-off — is a key control that auditors test. See [[Insurance Governance]] for the broader framework.

> [!example]- Which Requirements Apply? {Example}
> Insurer **A** is a mutual with $\$800$ million of direct written and assumed premium. Insurer **B**, with $\$650$ million, is a wholly owned subsidiary of an NYSE-listed accelerated filer. Set out the internal-control and audit requirements each faces.
>
> > [!answer]-
> > **Insurer A** — not an SEC registrant, so SOX does not apply. Under the Model Audit Rule:
> >
> > - annual CPA audit of the statutory statements, with the lead partner rotating after five years;
> > - an audit committee at least $75\%$ independent, since $\$800$ million exceeds $\$500$ million;
> > - management's ICFR report filed with the commissioner, **without** an auditor's attestation;
> > - an independent internal audit function reporting to the audit committee.
> >
> > **Insurer B** — SOX applies at the parent: §302 certifications and a §404 assessment with auditor attestation covering the group. Under the Model Audit Rule it still needs its own CPA audit of the statutory statements; it is exempt from the audit-committee section as a wholly owned subsidiary of a SOX-compliant entity; and it may file the parent's §404 report plus an addendum for its ICFR requirement. If statutory-only processes — statutory reserve adjustments, Schedule P, the annual statement itself — were outside the §404 scope, it must file a separate Model Audit Rule report covering those controls.
> >
> > B's internal audit requirement can likewise be met at the parent level.
> >
> > The gap that remains even for B is the reason the Model Audit Rule exists: GAAP-focused SOX testing does not automatically cover the statutory statements regulators rely on.
