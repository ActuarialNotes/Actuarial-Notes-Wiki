---
target: Concepts/Lee Diagram.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Read Fisher Ch.3 §2.1-2.2 (PDF pp.52-63), Table L areas (PDF pp.84-85), answers PDF pp.116-117, 120 before re-reading the page. Definition, axes, unit-width ordering, vertical strip x dF / horizontal strip S(x)dx, size vs layer method and both layer expressions (int_a^b S dx = int_a^b x dF + bS(b) - aS(a), re-derived by parts), Tables M/L built by the layer method (p.57); limits and deductibles as areas (p.55); phi/psi areas, phi(0)=1, phi'=-S, Formula 3.1 rectangle, Formula 3.2 (pp.58-60); T/U/W/X areas, k, Table M = W+X, Table L = T+W+X, overlap (pp.84-85, 116-117); per-occurrence limit shifting severe claims from the aggregate to the per-occurrence charge (p.120 Q20b). Writer-flagged sentences: 'Changing only the limited curve' kept — with 1 = T+U+W+X and phi*_D = T+W+X (p.85), the insurer's cost is 1 - U, so a change above the aggregate line leaves it unchanged: a plain consequence of the reading's areas, and the bullet states its condition. 'Excess of a retention by layers' and 'many limits at once' are the discretised layer formula, kept. Example recomputed blind: Y ~ U(0,2), phi(1.2) = 0.8^2/4 = 0.16, psi = 0.16 + 0.2 = 0.36, matches. Rule 10: the example's U(0,100) is not any question's computation (2014-q18 re-balances on U(0,90k); 2015-q14 uses 400/800); no question figures on the page. Links resolve.
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1-2.2 PDF pp.52-63, Table L Lee diagram PDF pp.84-85, Ch.3 answers 12 and 20 PDF pp.116-117, 120, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: New page; every claim found in Fisher Ch.3 or a plain consequence of its areas. No findings.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:58Z/2de4
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: Delta only: the appended sentence on the size method against PDF pp.56-57 (vertical strip area x dF(x); the size-method layer expression 'is the form commonly found in the literature'; the layer method's S(x) 'generally more difficult to integrate'). 'Avoids integrating S(x)' is the converse of that stated drawback, read off the two integrals. No question's numbers.
- sources_checked: Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §2.1 pp.51-52 (PDF pp.56-57), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf
- note: Older content verified this morning; only the delta re-checked.
