# Redesign consistency review

_Written 2026-11-24, after Phases A to E and G to I of `docs/redesign-spec.md` were built
(roadmap X11). The app was run and every main screen and popup looked at on a phone in the
dark theme, signed out, and held to the spec's §2 and `docs/style-guide.md` §13. This is the
backlog of what still disagrees with them. The feedback after an answer and the results
screen were not reached in that pass and are not covered._

The redesigned screens hold to the spec: Today, the question screen, the exam and concept
pages, Practice, search, You, League, Settings, Apply, the Tools list and the exam switcher.
What disagrees is what they open, what sits beside them, and the screens not yet rebuilt.

Each item names the rule it breaks:

| Rule | Where |
|---|---|
| **Ground** | No filled card surfaces; a card is an outline (§2.1, style guide §13.1) |
| **One text colour** | Hierarchy is size and weight, never grey text (§2.1) |
| **Hue** | Green, red, amber and grey for answers only; the exam's colour on its logo only (§2.1) |
| **13px** | Nothing under 13px (§2.3) |
| **One filled button** | One main action a screen (§2.4) |
| **Popup** | Black, a 1.5px edge, no blur (§2.3, R14) |
| **Levels** | Neutral squares, never the green ladder (§2.2, R13) |

---

## 1. Done: the info popups (2026-11-24)

`InfoSheet` and everything built from it now draws the redesign's popup: Question info, the
question bank's info, Quiz settings, the keyboard shortcuts, Learning Progress, Fact Check,
and the exam page's Dates and fees (which was its own hand-made sheet and is an `InfoSheet`
now). The banner's tint, the exam-coloured figures, the blur and the filled rows are gone;
`GroupedList` is an outline with hairlines; the sitting's banner, ruler and markers are in
the text and line colours; Learning Progress shows the level as a `LevelSquare` and its dots
in the answer colours. Style guide §7.2c and §13.5 describe it.

Left open by that pass:

- **Fact Check's verdict colours.** The verdict tile, the severity pills and the tinted
  section tiles still use `lib/factCheckTone.ts` (green, amber, red). Under the spec green
  means a correct answer. A decision for the maintainer: keep the palette as the one
  exception, or draw verdicts in the text colour with their icon and word.
- **Learning Progress's graph** (`ui/LearningProgressGraph.tsx`) still draws its level line
  in its own colours.
- **The Store's registration sheet** shares `SittingTimeline`, so its banner is outlined
  while the sheet around it is still filled.

## 2. Old pieces inside redesigned screens

Highest priority: the reader moves from black outline to grey fill in one tap.

| # | Opened from | What | Breaks |
|---|---|---|---|
| 2.1 | Starting a quiz | **New concepts in this quiz** (`components/PreQuizConcepts.tsx`): a filled grey card, blue document icons, a small grey caption, and its own filled Start on a screen reached from a filled Start | Ground, Hue, One text colour |
| 2.2 | Practice | The **Games** row (`components/landing/`): a filled grey card with a gradient icon tile and a grey caption, under three hairline rows | Ground, Hue. Two systems on one screen |
| 2.3 | Concept page → more | `ConceptActionMenu` with `rows="more"`: a small grey dropdown, text under 13px, an orange "Re-check" pill | Ground, 13px, Hue |
| 2.4 | Concept page | The figure sits in a filled card, and the generated figures use blue and red, close to the answer colours | Ground, Hue. Spec §10 question 4, undecided |
| 2.5 | Quiz setup popup | Three solid difficulty buttons and solid checkboxes beside the solid Start | One filled button; a chosen option is a 2px outline (style guide §13.4) |
| 2.6 | Results | The overlays after a quiz (`ConceptLevelUpCeremony`, `StreakCompleteOverlay`, `QuestCompleteOverlay`) kept their look in Phase C | Not reviewed here; check them against Popup and Hue |

## 3. Screens still in the old system

| # | Screen | What | Breaks |
|---|---|---|---|
| 3.1 | **Study Guides home** (`pages/wiki/WikiHome.tsx`) | Filled `ListPanel` cards, an uppercase "CREDENTIALS" label, grey captions, "Exam: Jan 27" in the exam's blue. It is the way into Learn | Ground, One text colour, Hue, 13px |
| 3.2 | **Resources** and a resource page (`WikiResources.tsx`, `ResourceReferenceCard`, `ResourceMetaCard`) | Filled cards, metadata pills under 13px, a green "Fact checked" pill, two solid controls at once (the exam and the vintage) | Ground, 13px, Hue, One filled button |
| 3.3 | **Store** (`pages/Store.tsx`, `components/store/`) | Filled cards throughout; green "Free option"; three solid controls on the kit (the exam, "Your kit", Register); the exam's colour on the kit's ticks and bars | Ground, Hue, One filled button, 13px |
| 3.4 | **Gem Shop** | Filled cards, a green "FREE" tag | Ground, Hue |
| 3.5 | **Upgrade** | A filled price card; green ticks drawn by hand where `CheckMark` in the text colour belongs | Ground, Hue |
| 3.6 | **A tool's page** (`components/tools/ToolTemplate.tsx`) | Only the answer card was outlined, as Phase I decided. The chain strip, "Takes from" and the input groups are filled grey, and a chosen value is solid in the exam's colour | Ground, Hue. Needs a decision: Phase I kept the sheets' colour |
| 3.7 | **Data Sources**, **Workflows** | Filled cards and grey captions; Workflows' own screens were left out of the design | Ground, One text colour |
| 3.8 | **Projects' views** (workspace, report, results, submit) | Filled panels, much text under 13px | Ground, 13px |
| 3.9 | **Community** | A gradient hero and coloured topic chips | Hue. Preview, one account |
| 3.10 | **Sign in** | A filled card | Ground |
| 3.11 | **Quiz Battle**, **Concept Craft** | Their own look by design (player colours, a dark board) | A decision, not a fix |

## 4. Patterns that disagree across screens

- **4.1 The top row.** Four versions: the exam switcher (Today, Practice); "Search concepts"
  over a hairline (Learn); the wordmark over a hairline (Apply, Projects, Games, Upgrade);
  a cross or back arrow alone (You, Settings). Settle it with Phase F.
- **4.2 Search.** R18 says one search. Learn, Tools, the Store and Data Sources each keep a
  bar of their own, styled differently from Practice's outlined row. Spec §10 question 8.
- **4.3 The chosen state.** Five treatments: a 2px outline with `CheckMark` (the switcher,
  style guide §13.4); a solid pill (tabs, filters); solid tiles (the setup popup's
  difficulty); solid in the exam's colour (tools); a segmented switch (Theme). Pick one for
  a choice among options and one for a tab.
- **4.4 Back.** "‹ Exam P-1" as text; a small grey "‹ All resources" and "‹ Store"; a chevron
  beside a title; Battle's filled square button.
- **4.5 Names.** The sidebar says Dashboard and Quiz where the screens say Today and
  Practice. Phase F.
- **4.6 Small text.** About 750 uses of text under 13px remain, nearly all in the screens of
  §3 (`ProductSheet`, `StoreCards`, `ConceptDetailModal`, `WorkflowPanels`, the tool template).
- **4.7 The check mark.** `CheckMark` defaults to the exam's colour, or green
  (`CHECK_COLOR`). On a redesigned screen every caller has to pass `text-foreground`; the
  default should be the text colour once the old screens are gone.

## 5. Suggested order

1. §2.1 and §2.2: the pre-quiz list and the Games row.
2. §3.1 and §3.2: Study Guides home and Resources.
3. The decisions: Fact Check's colours (§1), a tool's chosen value (§3.6), the concept
   figures (§2.4), one chosen state (§4.3).
4. Phase F, with §4.1, §4.2, §4.4 and §4.5.
5. §3.3 to §3.5, then the rest of §3.
