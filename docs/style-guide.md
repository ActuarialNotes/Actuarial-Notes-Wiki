# App Style Guide

The visual and interaction design system for the quiz app (`quiz/`). Read this before
adding UI, and prefer the tokens and patterns below over inventing new ones. The goal is a
**consistent, minimalistic, information-hierarchy-aware** interface: a calm neutral surface
where colour and weight are spent deliberately on the few things that matter on each screen.

This is a *descriptive-then-prescriptive* guide — it documents what the codebase already does
(so new work matches it) and, where the codebase is inconsistent, it picks one convention and
says so explicitly. Those spots are marked **⚠️ Convention**.

---

## 1. Design Principles

1. **Neutral by default, colour by exception.** The base theme is a grayscale surface. Colour
   is a signal, not decoration — reserve it for state (correct/incorrect, mastery, warnings),
   the single primary action on a view, and the gamification moments that are *meant* to feel
   special. A screen where everything is coloured has no hierarchy.
2. **One primary action per view.** Exactly one `variant="default"` (solid) button should
   dominate a screen or dialog. Everything else is `outline`, `secondary`, `ghost`, or a link.
3. **Hierarchy through weight and muting, not size.** The scale is deliberately shallow
   (§3). Most differentiation comes from `font-medium`/`font-semibold` vs
   `text-muted-foreground`, not from large type. Body text is `text-sm`; secondary text is
   `text-xs text-muted-foreground`.
4. **Tokens over raw values.** Use the semantic CSS-variable tokens (`bg-card`,
   `text-muted-foreground`, `border-border`, …) so every one of the app's themes and both
   light/dark modes keep working. Raw palette colours (`text-green-600`) are allowed **only**
   for the semantic-state families in §4.2.
5. **Motion confirms, it doesn't perform.** Animations mark a state change (a card collected,
   a level gained, a streak extended) and then get out of the way. Everything decorative must
   respect `prefers-reduced-motion` (§9).
6. **Respect the reader's focus.** On dense content (wiki, quiz), dim what isn't active
   rather than adding more chrome — see the concept focus-mode and TTS highlight patterns.

---

## 2. Colour & Theming

### 2.1 The token system

All colour flows through HSL CSS variables defined in `quiz/src/index.css` and exposed to
Tailwind in `tailwind.config.ts`. **Never hard-code a hex or `hsl()` for themeable surface,
text, or border colour** — use the token utilities.

| Token | Utility | Use for |
|---|---|---|
| `--background` | `bg-background` | App canvas (the page behind cards) |
| `--foreground` | `text-foreground` | Primary text |
| `--muted-foreground` | `text-muted-foreground` | Secondary / supporting text, icons, meta |
| `--card` / `--card-foreground` | `bg-card` / `text-card-foreground` | Card & panel surfaces |
| `--popover` / `--popover-foreground` | `bg-popover` | Popovers, dropdowns, menus |
| `--primary` / `--primary-foreground` | `bg-primary` / `text-primary` | Primary actions, active states, focus signal |
| `--secondary` / `--secondary-foreground` | `bg-secondary` | Low-emphasis fills, chips |
| `--muted` | `bg-muted` | Subtle fills, track backgrounds, hover rests |
| `--accent` / `--accent-foreground` | `bg-accent` | Hover/active backgrounds for ghost items |
| `--destructive` | `bg-destructive` / `text-destructive` | Destructive actions & error text |
| `--border` | `border-border` | All hairlines & dividers |
| `--input` | `border-input` | Form field borders |
| `--ring` | `ring-ring` | Focus rings |

`text-muted-foreground` is the single most-used colour utility in the app (~800 uses) — this
is the intended hierarchy: **foreground for the thing, muted-foreground for everything that
supports it.** If new text isn't the primary content of its block, it's almost certainly muted.

### 2.2 Themes

The app ships four colour themes × light/dark, all driven by swapping the same variables via
`data-color-theme` / `.dark` on the root (managed by `useTheme`, catalogue in
`lib/colorThemes.ts`):

- **default** — grayscale; near-black primary in light, near-white in dark. The reference look.
- **colourful** — violet primary + teal accent, with four sub-variants
  (`blue-orange`, `rose-amber`, `emerald-pink`, `sky-indigo`) that override only
  `--primary`/`--accent`/`--ring` and inherit the colourful backgrounds.
- **high-contrast** — pure black/white with black/white borders for maximum legibility (a11y).

**Implication for new UI:** because `--primary` can be near-black, violet, blue, emerald, …,
never assume primary is dark or that it contrasts with a specific background. Always pair
`bg-primary` with `text-primary-foreground`, and don't put `text-primary` on a coloured fill.
The background canvas is a *cool* gray (`220 15%`), not pure white — use `bg-background` /
`bg-card`, never `bg-white`.

### 2.3 Focus & selection

- Focus ring is standardized: `focus-visible:ring-2 focus-visible:ring-ring
  focus-visible:ring-offset-2`. Never remove focus outlines without an equivalent replacement.
- The "active/selected" signal across wiki links, highlights, and rings is `--primary`
  (e.g. `.wiki-link--active`, `.tts-tok--active`, onboarding spotlight). Keep new
  selection states in the primary family so they read consistently.

---

## 3. Typography

The app uses the system UI font stack. The scale is intentionally **shallow and small** —
big type is rare and reserved for hero numbers and empty-state headings.

| Role | Classes | Notes |
|---|---|---|
| Page / section hero number | `text-3xl`/`text-4xl font-bold` | Rare — readiness %, big stats only |
| Card title | `text-2xl font-semibold tracking-tight` | This is `CardTitle`'s default; often overridden smaller |
| Section heading | `text-lg`/`text-xl font-semibold` | Sub-sections within a page |
| **Body (default)** | `text-sm` | The workhorse — most UI text |
| Emphasis in body | `text-sm font-medium` | Labels, active nav, list item titles |
| **Secondary / meta** | `text-xs text-muted-foreground` | Captions, counts, timestamps, helper text |

**Guidance**

- Default to `text-sm`. Reach for `text-base`+ only for genuine reading content or a
  deliberate focal point. `text-sm` (~540 uses) and `text-xs` (~465) dominate for a reason.
- Weight is the primary emphasis lever: `font-medium` (labels/active) and `font-semibold`
  (titles/headings) are the two you'll use constantly. `font-bold` is for numeric heroes and
  badges only; avoid `font-extrabold`.
- Prefer `tracking-tight` on large semibold/bold headings (matches `CardTitle`).
- One heading level of contrast per block is enough. Don't stack `text-2xl` + `text-xl` +
  `text-lg` in the same card — pick the title size and let muted body carry the rest.
- Long-form wiki/markdown content renders through `@tailwindcss/typography` (`prose`);
  don't restyle prose internals ad hoc.

---

## 4. Semantic State Colours

This is the one place raw Tailwind palette colours are correct — the app encodes meaning in a
small, fixed set of hue families. Keep to these families and their established shade pairings
so a colour always means the same thing.

### 4.1 The meaning map

| Meaning | Hue family | Where it appears |
|---|---|---|
| **Correct / positive / mastered / growth** | `green` (with `emerald` as a sibling) | Correct answers, mastery levels, streak grew, success flashes |
| **Incorrect / error / destructive** | `red` (→ `--destructive` for actions) | Wrong answers, delete actions, error text |
| **Warning / caution / "at risk"** | `amber` (with `yellow`/`orange` siblings) | Forgotten/decaying concepts, cautions, "due" nudges |
| **Info / neutral highlight** | `blue` | Informational callouts, neutral tips |
| **Reward / premium / rare** | `amber`/gold + the rainbow **foil** gradient | Gems, L3 mastery, collected cards, premium |
| **Streak / energy** | `orange` (flame) | Streak flame & celebrations |

### 4.2 Standard shade pairings (light / dark)

Match these so state colours have consistent contrast. Pattern: a very light tinted background
with a dark-tinted text in light mode, inverted in dark mode.

```
Correct   bg-green-50  text-green-900   dark:bg-green-950  dark:text-green-100
Incorrect bg-red-50    text-red-900     dark:bg-red-950    dark:text-red-100
Warning   bg-amber-50  text-amber-900   dark:bg-amber-950  dark:text-amber-100
Info      bg-blue-50   text-blue-900    dark:bg-blue-950   dark:text-blue-100
```

For text-only state signals use the mid shades: `text-green-600 dark:text-green-400`,
`text-amber-600 dark:text-amber-400`, `text-red-600 dark:text-red-400`.

**Mastery ladder** (canonical, from `LearningProgressModal.tsx`) — intensity climbs with level:

```
New        muted / neutral (no colour)
Level 1    bg-green-100 text-green-800   dark:bg-green-950/40 dark:text-green-300
Level 2    bg-green-200 text-green-800   dark:bg-green-900/60 dark:text-green-200
Level 3    bg-green-400 text-green-950   dark:bg-green-800    dark:text-green-100  (+ gold shimmer)
Forgotten  amber family (the "at risk" signal)
```

⚠️ **Convention — destructive:** for *actions* (buttons, delete) use the `destructive`
token, not raw `red`. Reserve raw `red-*` for the incorrect-answer / error-text state pairings
above. The two overlap visually but the token keeps action colour themeable.

⚠️ **Convention — green vs emerald:** the codebase uses both. **Default to `green`** for the
correct/mastery signal (it's the canonical ladder colour); use `emerald` only where an
existing local cluster already does (e.g. gem economy). Don't mix them within one component.

### 4.3 The "foil" reward material

Rarity/reward gets a distinct **material**, not just a colour: a travelling rainbow gradient
border (`sky → fuchsia → gold`) applied via the padding + `mask-composite: exclude` ring trick.
Reuse the existing classes (`.flashcard-collected` + `.flashcard-sheen-l2/l3`, `.lock-foil-ring`,
`.pack-foil`) rather than re-authoring the gradient. Intensity must scale with value: subtle
glint for common, static foil for L2, animated saturated foil for L3/hero only.

---

## 5. Spacing & Layout

Spacing uses the default Tailwind 4px scale. A few defaults carry most screens:

| Context | Default |
|---|---|
| Inline gap (icon ↔ label, chips) | `gap-2` (or `gap-1` for tight) |
| Related group of controls | `gap-3` |
| Stacked cards / major sections | `space-y-4` (→ `space-y-6` for looser pages) |
| List rows within a card | `space-y-2` / `space-y-3` |
| Card padding | `p-6` (via `CardHeader`/`CardContent`); `p-4` for dense cards |
| Dialog padding | `p-6` |

**Guidance**

- Prefer `gap-*` on flex/grid parents over margins on children.
- Establish a rhythm and stick to it within a view: one gap value for peers, one larger value
  between groups. Don't hand-tune every gap.
- Page content is centred with a `max-w-*` container: `max-w-4xl` for content pages,
  `max-w-2xl`/`max-w-lg` for focused flows, `max-w-md`/`max-w-sm` for dialogs. Pad the page
  gutter (`px-4`) so content never touches the viewport edge on mobile.
- Layout is responsive with a **desktop sidebar / mobile bottom-nav** shell (`Sidebar.tsx`,
  `BottomNav.tsx`). The sidebar width is published as `--sidebar-width` (16rem expanded /
  3.5rem collapsed) — fixed overlays that must clear the sidebar read that variable (see the
  concept-popup and gallery-panel rules in `index.css`). Reuse it; don't hard-code 16rem.

---

## 6. Radius, Borders & Elevation

### 6.1 Corner radius

`--radius` is `0.5rem`; Tailwind's `rounded-lg/md/sm` derive from it. Usage is consistent by
element type — match it:

| Element | Radius |
|---|---|
| Pills, badges, avatars, icon buttons, rings | `rounded-full` |
| Buttons, inputs, nav items, small controls | `rounded-md` |
| **Cards & panels** | `rounded-lg` |
| Larger feature cards / sheets | `rounded-xl` |
| Modals / dialogs | `rounded-2xl` |

Pick radius by *element role* from this table rather than by eye — that's what keeps the app
coherent.

### 6.2 Borders

- One hairline token: `border` + `border-border`. Dividers use `<Separator />` or
  `border-t border-border`. Form fields use `border-input`.
- Borders and shadows are alternatives, not partners — a card gets the card shadow; a flat
  inset region gets a border. Avoid heavy `border-2` except the high-contrast theme and
  focus/active rings.

### 6.3 Elevation (shadows)

Elevation is quiet by design. Four levels, from the ground up:

| Level | Class | Use |
|---|---|---|
| Subtle | `shadow-sm` | Inputs, low-lift chips |
| **Card** | `shadow-[var(--shadow-card)]` | The default `Card` shadow — soft, theme-aware, dark-mode-tuned |
| Raised | `shadow-md` / `shadow-lg` | Popovers, dropdowns, hover-lifted cards |
| Overlay | `shadow-xl` / `shadow-2xl` | Modals & dialogs |

Prefer the `--shadow-card` variable for cards (it's tuned separately for dark mode) over a
raw `shadow-md`. Don't invent new shadow recipes for standard surfaces.

---

## 7. Component Patterns

Use the primitives in `quiz/src/components/ui/` (shadcn-style, CVA variants). Extend a variant
before writing a bespoke element.

### 7.1 Buttons (`button.tsx`)

Variants: `default` (solid primary), `destructive`, `outline`, `secondary`, `ghost`, `link`.
Sizes: `default` (h-10), `sm` (h-9), `lg` (h-11), `icon` (h-10 w-10).

- **One `default` per view.** Secondary actions → `outline`/`secondary`; tertiary → `ghost` or
  `link`. Cancel in a dialog is `ghost`/`outline`, confirm is `default` (or `destructive`).
- Icon-only buttons use `size="icon"` and **must** carry an `aria-label`.
- Icons inside buttons are `h-4 w-4` (or `h-5 w-5` for `lg`), with `gap-2` to the label.

### 7.2 Cards (`card.tsx`)

`Card` → `CardHeader` (`CardTitle` + `CardDescription`) → `CardContent` → `CardFooter`.
This is the primary content container. `CardDescription` is `text-sm text-muted-foreground`
by default — lean on it for the supporting line under a title. Keep one clear title per card;
if you need multiple headings, you probably need multiple cards.

### 7.3 Badges & chips (`badge.tsx`)

`rounded-full`, `text-xs font-semibold`. Variants: `default`, `secondary`, `destructive`,
`outline`. Use for status/counts/labels — not as buttons. State badges (mastery, difficulty)
use the §4 semantic families. `TopicBadge`/`StreakBadge`/`LevelBadge` are the domain-specific
wrappers — reuse them rather than restyling a raw badge.

### 7.4 Inputs & forms (`input.tsx`, `label.tsx`)

`h-10 rounded-md border border-input bg-background`. Always pair with a `<Label>`. Note the
input text is `text-base` (prevents iOS zoom-on-focus) — keep it. Disabled state is
`opacity-50 cursor-not-allowed`. Errors: `border-destructive` + `text-destructive` helper text.

### 7.5 Progress & gauges

`Progress`, `ProgressBar`, `RadialGauge`, `MiniReadiness Ring` — reuse these for any
"X of Y / percent" display so progress reads consistently. Tracks use `bg-muted`; fills use
the semantic colour for what's being measured (green for mastery/readiness).

### 7.6 Empty, loading & error states

- **Loading:** `Loader2` spinner with `animate-spin`, `h-4 w-4`, beside muted text
  (`text-sm text-muted-foreground`) — see `WikiFallback`.
- **Empty:** centered icon in a soft `bg-primary/10 rounded-2xl` tile + short heading +
  one muted explanatory line + a single primary action (see the Dashboard welcome/empty cards).
- **Error:** route-level `ErrorBoundary` for crashes; inline errors use `text-destructive`.

---

## 8. Overlays: Modals, Popovers & Layering

### 8.1 Modal / dialog anatomy

Standard scrim + panel:

```
Scrim:  fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm
Panel:  relative bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4
Close:  absolute top-4 right-4 text-muted-foreground hover:text-foreground  (aria-label="Dismiss")
```

⚠️ **Convention — scrim:** use `bg-black/50 backdrop-blur-sm` as the default modal backdrop
(the most common in the app). Reserve heavier `bg-black/70`+ for immersive/ceremony overlays.
Dialogs must be dismissible (close button + backdrop click + `Esc`), trap focus, and restore
focus on close.

### 8.2 The z-index layer map

The codebase has accumulated many arbitrary `z-[NN]` values (44–122). To stop the sprawl, place
new overlays on this ladder and comment the intent rather than picking a free number:

| Band | Range | Layer |
|---|---|---|
| Base | `z-0`–`z-20` | In-flow raised bits (sticky headers, floating search, nav) |
| Chrome | `z-40`–`z-50` | Sidebar, bottom-nav, standard modals/scrims |
| Popup stack | `z-[55]`–`z-[70]` | Concept popup, its action menus, gallery panel |
| Onboarding | `z-[72]` | Tour spotlight (must sit above the popup stack) |
| Ceremony | `z-[120]`+ | Full-screen celebrations that must cover everything |

Keep a portalled element and the thing it visually sits *above* only a few steps apart, and
leave a comment (as the existing code does) explaining what a non-obvious value is clearing.

---

## 9. Motion & Animation

Motion is defined as named keyframes in `index.css` and triggered by adding a class. Principles:

- **Purposeful & brief.** UI feedback lands in ~120–320ms; celebration moments in ~400–700ms.
  Use the app's easings: `cubic-bezier(0.34, 1.56, 0.64, 1)` for a satisfying pop/overshoot,
  `cubic-bezier(0.4, 0, 0.2, 1)` for smooth position transitions.
- **Transitions for the mundane** (`transition-colors` on hover/active, position transitions
  on the popup); **keyframe animations for events** (collect, level-up, streak, gem, ceremony).
- **`prefers-reduced-motion` is mandatory.** Every decorative/looping animation must have an
  `@media (prefers-reduced-motion: reduce)` fallback that disables or degrades it to a plain
  fade — follow the pattern already used throughout `index.css`. Never gate essential feedback
  (that a card *was* collected) purely on motion; keep a static end state.
- **Reuse existing keyframes.** The foil-shift, pop-in, pulse-ring, and bloom animations are
  parameterized via CSS variables — extend those before adding new ones.

---

## 10. Iconography

- **lucide-react** is the single icon set. Don't mix in other icon libraries or inline SVGs
  for standard glyphs.
- Sizes: `h-4 w-4` inline with text / in buttons; `h-5 w-5` in nav and standalone controls;
  `h-7 w-7`+ only for feature/empty-state tiles. Keep an icon and its label vertically centered
  with `gap-2`.
- Icons inherit `currentColor` — colour them via text tokens (`text-muted-foreground`,
  `text-primary`, semantic state colours), not fills.
- Decorative icons get `aria-hidden`; an icon that *is* the control needs an `aria-label`.

---

## 11. Accessibility Baseline

- **Contrast:** the semantic shade pairings in §4.2 are chosen for contrast in both modes; the
  high-contrast theme exists for users who need more — don't defeat it with hard-coded colours.
- **Focus:** keep the standard `focus-visible` ring on every interactive element.
- **Keyboard:** all actions reachable and operable by keyboard; dialogs trap and restore focus;
  `Esc` closes overlays. There's a `KeyboardShortcutsHelp` surface — register new shortcuts
  there.
- **Labels:** icon-only controls need `aria-label`; form controls need a `<Label>`; live
  regions for async status (`aria-live`) where a spinner alone isn't enough.
- **Motion & touch:** honour reduced-motion (§9); mobile tap targets ≥ 40px (the `h-10`
  control height and `size="icon"` already satisfy this).

---

## 12. Quick Checklist for New UI

Before shipping a screen or component, confirm:

- [ ] Uses semantic tokens for surface/text/border — no `bg-white`, no hard-coded hex.
- [ ] Exactly one primary (`default`) action; the rest are lower-emphasis.
- [ ] Body is `text-sm`; supporting text is `text-xs`/`text-muted-foreground`; hierarchy comes
      from weight + muting, not many sizes.
- [ ] Colour appears only for real signals (§4) or the single primary action.
- [ ] Radius matches the element's role (§6.1); elevation uses a standard level (§6.3).
- [ ] Reuses a `components/ui` primitive / existing domain component before anything bespoke.
- [ ] Overlays use the standard scrim and sit correctly on the z-index ladder (§8).
- [ ] Any animation is purposeful and has a reduced-motion fallback.
- [ ] Icons are lucide, sized 4/5, coloured via `currentColor`, labelled where interactive.
- [ ] Works in light **and** dark, and doesn't break the colourful / high-contrast themes.
- [ ] `npm run build` (strict TS) and `npm run lint` pass — no unused imports.
