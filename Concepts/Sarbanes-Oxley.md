---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b31316a476c5d1a81c152349fefa3c136e3d4749360a82e7dd7f89be38b85102
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Sarbanes-Oxley.md
---

**Sarbanes-Oxley** (the Sarbanes-Oxley Act of 2002, SOX) is the federal statute that tightened financial reporting by SEC-registered companies through executive certification of reports, management assessment of internal control over financial reporting (ICFR), auditor independence and public oversight of the audit profession. It reaches an insurer directly only if the insurer or its parent is publicly traded.

The sections that matter are:

| Section | Requirement |
| :--- | :--- |
| Title I | Creates the **PCAOB** to register, inspect and set standards for public-company auditors |
| §201 | Bars auditors from providing listed non-audit services to audit clients |
| §203 | Rotates the lead and reviewing audit partners every five years |
| §301 | Makes an independent audit committee responsible for the auditor |
| §302 | Requires the CEO and CFO to certify each periodic report |
| §404(a) | Requires management's annual ICFR assessment |
| §404(b) | Requires the auditor's attestation on that assessment, for larger, accelerated filers |
| §906 | Attaches criminal penalties to knowingly false certifications |

[[Dodd-Frank]] made smaller companies' exemption from §404(b) permanent.

## The NAIC Model Audit Rule

Mutuals, reciprocals and privately held insurers are outside SOX. The NAIC's *Annual Financial Reporting Model Regulation* (#205), the **Model Audit Rule** (MAR), was revised on the SOX pattern, effective 2010, and carries its core ideas to every statutory filer. It requires:

1. An annual audit of the statutory statements by an independent CPA, filed by June 1.
2. Lead audit partner rotation after five consecutive years, then five years off.
3. Audit committee independence scaled to prior-year direct written and assumed premium: no minimum up to $\$300$ million, a majority above that, and at least $75\%$ above $\$500$ million.
4. **Management's report of ICFR** for insurers with $\$500$ million or more of premium, with **no auditor attestation**. The auditor instead reports any unremediated material weaknesses it finds.
5. An **internal audit function**, independent and reporting to the audit committee, for insurers above $\$500$ million or groups above $\$1$ billion.

## Coordination with SOX

An insurer that is, or is wholly owned by, a SOX-compliant entity is exempt from the Model Audit Rule's audit-committee section. It may meet the ICFR requirement with its own or its parent's §404 report plus an addendum confirming that the controls over the **statutory** statements were in scope. GAAP-focused SOX testing does not automatically cover the statutory statements regulators rely on, which is the gap the Model Audit Rule closes.

> [!example]- What internal-control and audit requirements does each of these insurers face? {Example}
> Insurer A is a mutual with $\$800$ million of direct written and assumed premium. Insurer B, with $\$650$ million, is a wholly owned subsidiary of an NYSE-listed accelerated filer.
>
> > [!answer]-
> > - Insurer A is not an SEC registrant, so SOX does not apply, and the Model Audit Rule governs it.
> > - A needs an annual CPA audit of the statutory statements, with the lead partner rotating after five years.
> > - A's premium of $\$800$ million exceeds $\$500$ million, so its audit committee must be at least $75\%$ independent, management files an ICFR report without an auditor's attestation, and it needs an independent internal audit function reporting to the audit committee.
> > - For Insurer B, SOX applies at the parent: §302 certifications and a §404 assessment with auditor attestation covering the group.
> > - B still needs its own CPA audit of the statutory statements, but it is exempt from the audit-committee section as a wholly owned subsidiary of a SOX-compliant entity.
> > - B may file the parent's §404 report plus an addendum for its ICFR requirement. If statutory-only processes (statutory reserve adjustments, Schedule P, the annual statement itself) were outside the §404 scope, it must file a separate Model Audit Rule report covering those controls.
> > - B's internal audit requirement can likewise be met at the parent level.

## The reserving process as a key control

Loss and LAE reserves are the largest estimate on a P&C balance sheet, so the reserving process is a key control that auditors test. That process covers data reconciliation to the claim system and to [[Schedule P]], documented assumptions, and review and sign-off. [[Insurance Governance]] covers the broader framework.

> [!trap] Expecting an auditor attestation under the Model Audit Rule
> Only SOX §404(b) requires the auditor to attest to management's ICFR assessment. The Model Audit Rule requires management's ICFR report alone, and the auditor reports only unremediated material weaknesses it finds.
