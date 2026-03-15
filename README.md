# Actuarial Notes Wiki

An interactive knowledge base for actuarial exam preparation, built on [Obsidian Publish](https://obsidian.md/publish).

## About

This wiki provides structured study notes for actuarial certification exams, covering probability theory, financial mathematics, and actuarial-specific concepts. Each concept page includes formal definitions, key formulas, and worked examples.

## Content Structure

- **Exam Pages** — Syllabus breakdowns with learning objectives for each SOA/CAS exam
- **Concept Pages** (`Concepts/`) — Individual mathematical and actuarial concepts with definitions, formulas, and examples
- **Source Pages** — Textbook references with chapter coverage mappings
- **Structural Pages** — Navigation indices for certifications, organizations, and concept categories

## Interactive Features

The site includes custom JavaScript components (in `publish.js`):

1. **Exam Navigation** — prev/next navigation between exams with certification track badges
2. **Download Dropdown** — styled resource download buttons
3. **Callout Badges** — percentage and count badges on collapsible sections
4. **Question Browser** — modal for browsing practice questions
5. **Concept Navigation** — prev/next concept chaining with learning objective panels
6. **Exam Journey Tracker** — sidebar widget for tracking certification progress
7. **Sound Effects Engine** — synthesized UI sounds via Web Audio API
8. **High Contrast Toggle** — accessibility toggle in the sidebar
9. **Read-Aloud** — text-to-speech for section content

## Tech Stack

- **Content:** Obsidian Markdown (wikilinks, callouts, frontmatter, LaTeX math)
- **Platform:** Obsidian Publish
- **Custom JS:** `publish.js` (~4100 lines, 10 IIFE components)
- **Custom CSS:** `publish.css` (~4960 lines)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding content.

## License

This work is licensed under [CC BY-SA 4.0](LICENSE). See [LICENSE](LICENSE) for details.
