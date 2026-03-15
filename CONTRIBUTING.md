# Contributing to the Actuarial Notes Wiki

Thank you for your interest in contributing! This guide covers how to add and edit content.

## Content Types

### Concept Pages

Concept pages live in the `Concepts/` directory. Each page follows this template:

```markdown
---
aliases:
  - Alternate Name
---
[[Wiki]] / [[Concepts]] / **Concept Name**

<div class="concept-nav"
     data-color="#2563eb"
     data-current="Concept Name"
     data-prev="Previous Concept|Concepts/Previous Concept"
     data-next="Next Concept|Concepts/Next Concept"
     data-objectives="P-1|Probability|1. General Probability|Exam P-1 (SOA)">
</div>

# Concept Name

## Definition

A ==concept name== is [formal definition here].

$$ \text{Key formula in LaTeX} $$

> [!example]- <u>Example Title</u>
> Worked example with concrete numbers.
```

#### Concept Navigation Chaining

Concepts are chained via `data-prev` and `data-next` attributes within their learning objective group. The format is `Display Name|Concepts/File Name`. If a concept has no predecessor or successor, use an empty string `""`.

Chains must be consistent: if page A has `data-next="B|Concepts/B"`, then page B must have `data-prev="A|Concepts/A"`.

### Exam Pages

Exam pages live in the root directory and follow this structure:

```markdown
---
aliases:
  - Exam X
  - X
---
[[Actuarial Notes Wiki|Wiki]] / [[Actuarial Certifications]] / [[Society of Actuaries (SOA)]] / **Exam Name**

<div class="exam-nav"
     data-color="#2563eb"
     data-prev="PREV-CODE|Prev Name|prev-file.md"
     data-current="CODE|Exam Name"
     data-next="NEXT-CODE|Next Name|next-file.md"
     data-tracks="ASA|Associate of the Society of Actuaries (ASA).md">
</div>
```

## Formatting Conventions

### Math

- Inline math: `$P(A) = 0.5$`
- Display math: `$$ P(A \cup B) = P(A) + P(B) - P(A \cap B) $$`
- Use standard LaTeX commands

### Wikilinks

- Root-level pages: `[[Page Name]]`
- Display text: `[[Page Name|Display Text]]`
- Concept pages from non-concept pages: `[[Concept Name]]` (Obsidian resolves automatically)
- Concept pages referencing other concepts with path: `[[Concepts/Name|Name]]` (only when needed for disambiguation)

### Callouts

Use Obsidian callout syntax for collapsible sections:

```markdown
> [!example]- Section Title {badge text}
> Content here
```

### Definitions

Highlight the term being defined with `==double equals==` marks.

## File Naming

- **Proper nouns and formal concepts**: Title Case (e.g., `Bayes Theorem.md`, `Sample Space.md`)
- **Generic terms matching lowercase wikilinks**: lowercase (e.g., `variance.md`, `calculus.md`)
- Match the casing used in the `[[wikilink]]` from the exam page

## Local Development

1. Open this repository as a vault in [Obsidian](https://obsidian.md/)
2. Edit and preview pages using Obsidian's live preview mode
3. Verify wikilinks resolve correctly (no broken links)
4. Test that `concept-nav` and `exam-nav` data attributes are valid
