---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:dfef0f63233c6c05f709a05a9650a7ed02c171b7690e07b48a1d8b1164f4a93a
  sources:
    - "FASB Statement No. 168, The FASB Accounting Standards Codification and the Hierarchy of GAAP (June 2009), Summary, ¶1-11 (PDF pp.3, 9-11); Topic 105 (PDF p.21), sha256:b0e4014d4ff284e082ac858fc585d9e39a364b30fa53354c472542105f5e6360 — https://storage.fasb.org/fas168.pdf"
    - "NAIC, Accounting Practices and Procedures Manual, as of March 2025, Part 1 (Indiana DOI copy), Preamble ¶12, ¶24, ¶27, ¶42-44 and footnotes 3-4 (PDF pp.34, 36-40); Preamble Q&A Q2-Q3 (PDF p.44); SSAP No. 1 ¶7 (PDF p.48), sha256:a29e7223b53854eff1beb79c3fd6a969c54529d2dacc74510ea122a5c7b4ad13 — https://www.in.gov/idoi/files/INDAP25-Pt-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accounting Rule Hierarchy.md
---

An **Accounting Rule Hierarchy** ranks the sources of accounting guidance within one [[Accounting Frameworks|accounting framework]], so a preparer knows which source governs when two of them disagree and where to look when none of them addresses a transaction. U.S. [[GAAP]] has two levels, authoritative and nonauthoritative. U.S. [[Statutory Accounting Principles|statutory accounting]] rests on state law, then the NAIC's five-level statutory hierarchy.

## The GAAP hierarchy

1. **Authoritative GAAP.** FASB Statement No. 168 made the Codification the source of authoritative U.S. GAAP for nongovernmental entities, for periods ending after September 15, 2009; it is now Topic 105 of the Codification. All content in the Codification carries the same level of authority. The SEC's rules and interpretive releases under the federal securities laws are also authoritative GAAP, but only for SEC registrants.
2. **Nonauthoritative GAAP.** Practices widely recognized in the industry, FASB Concepts Statements, AICPA Issues Papers, IFRS, pronouncements of professional associations or regulatory agencies, AICPA Technical Practice Aids, and accounting textbooks, handbooks and articles.

The FASB now issues Accounting Standards Updates, which are not authoritative in their own right; they only update the Codification and explain the change.

When authoritative GAAP does not address a transaction, an entity first considers authoritative guidance for similar transactions. Only then does it turn to nonauthoritative sources, weighed by their relevance, specificity, the author's standing and how widely they are used.

> [!example]- In what order should this insurer consider these three sources? {Example}
> A privately held insurer preparing GAAP statements finds no guidance in the Codification for an unusual transaction. One adviser points to an IFRS standard, another to guidance in the Codification for a similar transaction, a third to a recent Accounting Standards Update's basis for conclusions.
>
> > [!answer]-
> > - The Codification's guidance for a similar transaction comes first, because authoritative GAAP for an analogous transaction comes before any nonauthoritative source, unless that guidance prohibits its use by analogy.
> > - IFRS comes next, as a nonauthoritative source weighed by its relevance and specificity.
> > - The update's basis for conclusions is not authoritative in its own right, because it only explains a change to the Codification.
> > - As a private company the insurer is not bound by the SEC's rules, which are authoritative only for registrants.

## The statutory hierarchy

Statutory accounting is the accounting prescribed or permitted by the insurer's domiciliary state. The NAIC *Accounting Practices and Procedures Manual* is not intended to preempt state legislative and regulatory authority. It applies where it does not conflict with state statutes or regulations, or where they are silent. Within the Manual, the Preamble (March 2025) ranks the sources in five levels:

1. **Level 1:** the SSAPs, including U.S. GAAP guidance to the extent the NAIC has adopted it;
2. **Level 2:** interpretations of existing SSAPs (INTs) adopted by the NAIC's working groups;
3. **Level 3:** the NAIC *Annual Statement Instructions* and the *Purposes and Procedures Manual of the NAIC Investment Analysis Office*;
4. **Level 4:** the Statutory Accounting Principles Preamble and Statement of Concepts;
5. **Level 5:** nonauthoritative GAAP sources, the same kinds of literature listed above, including FASB Concepts Statements and IFRS.

If the SSAPs do not specify a treatment, the preparer applies a relevant principle from Level 2 or 3, and if those conflict, follows the higher level. If no established statutory principle applies, a principle for an analogous transaction may be used, and after that other literature, of which the Statement of Concepts is the most authoritative. GAAP guidance does not become part of SAP until the NAIC adopts it. FASB Concepts Statements are nonauthoritative under GAAP and Level 5 under SAP.

> [!example]- Which treatment should this statutory accountant use, and what would change the answer? {Example}
> An SSAP is silent on a transaction. The *Annual Statement Instructions* describe one treatment, an INT adopted by the NAIC working group addresses a closely similar question with a different treatment, and a widely used accounting textbook suggests a third. The insurer's domiciliary state has no prescribed practice on the point.
>
> > [!answer]-
> > - With the SSAP silent, the preparer turns to Levels 2 and 3.
> > - The INT is Level 2 and the *Annual Statement Instructions* are Level 3, so where they conflict the INT's treatment governs.
> > - The textbook is Level 5, used only when no established statutory principle applies.
> > - A practice prescribed by the domiciliary state would govern over every NAIC level, because the Manual does not preempt state authority.
> > - The insurer could also ask its regulator for a permitted practice, which it would then disclose in Note 1 with its effect on income and surplus.

## Prescribed and permitted practices

A **prescribed** practice is incorporated directly or by reference in a state's laws, regulations and general administrative rules for all insurers domiciled or licensed there. A **permitted** practice is one an individual insurer asks for that departs from NAIC SAP and the state's prescribed practices, and that its domiciliary regulator approves.

An insurer using a prescribed or permitted practice that affects surplus or risk-based capital must describe it, state that it differs from NAIC SAP, give its monetary effect on net income and surplus, and say whether risk-based capital would have triggered a regulatory event without it (SSAP No. 1). These disclosures are in Note 1 of the notes. The Manual provides the common standard against which departures are measured and disclosed.

> [!trap] Calling a state-wide rule a permitted practice
> A prescribed practice applies to every insurer under the state's rules; a permitted practice is approved for one insurer at its request. A state law that applies to all domestic insurers is prescribed, and it is disclosed as a departure from NAIC SAP all the same.
