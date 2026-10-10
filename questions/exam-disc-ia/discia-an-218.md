---
id: "discia-an-218"
exam: "Exam DISC-IA"
topic: "International Insurance"
learning_objective: "13. Specialty Coverages Part 2"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/International+Insurance
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:ffbe92e556fe824602642ded0c51766123bdc21e99830ca19cd9b0d2cad2f068
  sources:
    - "Swiss Re Corporate Solutions, 'The importance of DIC, DIL and Financial Interest Coverage in international programs' (CMP = master policy in home country + local admitted policies; DIC/DIL respond only where a local policy exists; FINC reimburses the parent where non-admitted cover is not permitted; admitted vs non-admitted definitions), sha256:2252d9392876610ffb97be28f59f5d0f2f21de8237a33926e1dbf0bca3977c77 — https://corporatesolutions.swissre.com/insights/knowledge/importance-difference-conditions-difference-limits-financial-interest-coverage-international-programs.html"
    - "Swiss Re Corporate Solutions, 'Understanding your insurance options as a multinational' (master policy fills gaps by DIC/DIL; FINC paid to parent), sha256:8406248fd1870138166482694739422df199a0ec1e40f1faf747cfae9ba66de2 — https://corporatesolutions.swissre.com/insights/knowledge/multinational-benefits-international-program.html"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-218.md
---

A U.S. company's global program has a controlled master policy with a \$10,000,000 limit and broad terms, and a local admitted policy in a country where its factory sits. The local policy excludes flood. A flood causes \$6,000,000 of damage to the factory, a loss the master policy's terms cover. Local law allows the master policy's payment to reach the parent. How much does the master policy pay?

- A) \$0
- B) \$4,000,000
- C) \$6,000,000
- D) \$10,000,000

## Explanation

The master policy pays what it would pay alone less what the local policy pays. The local policy excludes flood, so it pays nothing, and the master policy's difference in conditions cover pays the whole loss:

$$
\begin{align*}
P_{\text{loc}} &= 0 \\
P_{\text{m}} &= \min(6{,}000{,}000,\ 10{,}000{,}000) - 0 \\
&= \mathbf{6{,}000{,}000}
\end{align*}
$$

- **A** treats the master policy as following the local policy's exclusions. Filling gaps in local terms is the point of DIC.
- **B** is the master limit less the loss, $10{,}000{,}000 - 6{,}000{,}000$: the limit left unused, not what the master policy pays.
- **D** pays the master limit rather than the loss.
