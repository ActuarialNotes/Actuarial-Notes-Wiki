---
id: "discrm-an-217"
exam: "Exam DISC-RM"
topic: "Probable Maximum Loss"
learning_objective: "9. Underwriting Commercial Property Coverage"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Probable+Maximum+Loss
  - Concepts/COPE
  - Concepts/Commercial+Property+Insurance
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4110678d0b73ca19241b13dc02138dd1a4d4163fa37f375481f2bf1f6f7b19c5
  sources:
    - "Risk & Insurance Education Alliance, Insurance Glossary, 'Probable Maximum Loss (PML)', entry, sha256:5afb6a900dd760a9c0b0b5488990f7f36ec8779ac2ff1b18bf67d4918d6e9b14 — https://www.riskeducation.org/insurance-glossary/probable-maximum-loss-pml/"
    - "M. Korn, '6 Fire Loss Scenarios to Review Before It's Too Late', Risk & Insurance (NLE/PML/MFL/EML/MPL definitions), entry, sha256:63e30fa759800ffc8283e3d82f56542677192cac9820af605fb5fbcc8a88319c — https://riskandinsurance.com/6-fire-loss-scenarios-to-review-before-its-too-late/"
    - "IRMI Glossary, 'maximum possible loss (MPL)', entry, sha256:5216b2a4bb6e2fd2293be9003732c8549708b87e7e3be408b39de7a8a93e50e9 — https://www.irmi.com/term/insurance-definitions/maximum-possible-loss"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-rm/discrm-an-217.md
---

A loss control engineer surveys a fire-resistive warehouse valued at \$40 million, protected by two automatic sprinkler systems and a paid fire department. The insurer's loss estimates use these definitions:

- **Normal loss expectancy (NLE):** the loss expected with all fire protection in place and operating as intended.
- **Probable maximum loss (PML):** the loss expected with some impairment of protection, normally one sprinkler system out of service, but not a shutdown of all protection.
- **Maximum foreseeable loss (MFL):** the worst-case fire, with no sprinkler system working and no effective fire department response, stopped only by fire walls or space separation.

The engineer estimates three figures: (I) \$6 million, with both sprinkler systems and the fire department working; (II) \$15 million, with one sprinkler system's control valve closed and everything else working; (III) \$28 million, with neither sprinkler system working and the fire department not arriving, the fire stopped by an interior fire wall. Which figure is which?

- A) I is the NLE, II the PML, III the MFL
- B) I is the PML, II the MFL, III the NLE
- C) I is the PML, II the NLE, III the MFL
- D) I is the NLE, II the MFL, III the PML

## Explanation

Apply each definition to the protection each figure assumes:

- **(I) \$6 million:** all protection works, so it is the normal loss expectancy.
- **(II) \$15 million:** one sprinkler system is impaired and the rest of the protection works, which is the probable maximum loss.
- **(III) \$28 million:** no sprinklers and no fire department, a free burn stopped only by a fire wall, which is the maximum foreseeable loss.

The answer is **A**. Each estimate assumes less of the protection works than the one before, so the figures rise from NLE to PML to MFL. None of them is the maximum possible loss, the total destruction of the \$40 million building, because the fire wall stops the worst foreseeable fire.

**Why not the others**

- **B** — Calls the all-protection-working figure the PML. Under these definitions the PML assumes some impairment; protection working as intended is the NLE.
- **C** — Same mistake for (I), and it calls the impaired-sprinkler figure the NLE, which assumes nothing is impaired.
- **D** — Swaps PML and MFL. One closed valve with the fire department responding is a partial impairment, not the worst case.
