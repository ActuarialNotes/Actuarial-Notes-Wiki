# The Daily Podcast — Today's Study Plan, read aloud

A Pro reader's study plan, as an episode they can play on a commute: today's concepts, each read
from its page, then a few worth a refresher. It is reached from **Today's Study Plan** on the
Dashboard and from a **Listen** button in the [daily email](daily-plan-email.md), and it keeps
playing as the reader moves around the app, with controls on a phone's lock screen.

## User experience

- **Pro only**, like the plan it reads. The button sits on the Pro Today's Study Plan card; a
  free account sees that card locked, as before.
- **The button**: *Listen to today's plan · 5 concepts · 9 min*. It appears only when there is an
  episode — none of today's concepts recorded yet is no button, not a disabled one.
- **The player** is a pill in the resume dock (beside the quiz's and Quiz Battle's pills) and,
  opened, a panel above it: the exam and the facts the audio can't say (*Day 12 of 56 · 45 days to
  go · On track*), a scrubber, ±15 s, speed, and one row per chapter — tap to jump, **Read** to open
  the concept's page. Concepts on today's plan the episode doesn't read (not recorded yet, or past
  the caps) are listed under *Also on today's plan*, each a link.
- **The email**: each exam's section gets *🎧 Listen to today's plan · 9 min*, linking to
  `/dashboard?episode=<exam key>` — the Dashboard switches to that exam and opens its episode.

## What an episode says

Nothing is written by a model (the maintainer's decision, 2026-11-02): every word is the concept
page's own, read through the Listen pipeline (`listenTokens` → `mathSpeech`, so an equation is
spoken the way Listen speaks it), with fixed sentences around them.

| Part | Script (`lib/podcastScripts.ts`) | Typical length |
|---|---|---|
| Intro (shared) | `PODCAST_BRIDGES.intro` | 5 s |
| Each concept on today's plan — a **brief** | the name; the definition paragraph; the first **two** formula boxes; up to three of the opening's bullets or later paragraphs (~110 words); *The idea* card, if any; the first of its *Exam traps* | ~70 s (median 170 words) |
| The link to the refreshers (shared) | `PODCAST_BRIDGES.refreshers` | 4 s |
| Each concept worth a refresher — a **refresher** | the name and the definition paragraph | ~15 s |
| Outro (shared) | `PODCAST_BRIDGES.outro` | 6 s |

Rules the script keeps: the opening ends at the first heading, callout, figure or all-bold line;
once a formula is left out the opening stops (what follows may refer to it — "the third is
GARCH…"); a "See also" bullet is skipped; Obsidian footnotes (`^[…]`) are dropped. The episode
reads at most 12 of today's concepts and 5 refreshers and stops adding concepts at 15 minutes
(always reading at least one); a plan in review mode reads only its refreshers. The intro and
outro are the same for everyone, so they can't name the exam or the day — the panel shows those.
Once the voice can be generated per reader (ElevenLabs, below), a personal intro is the next step.

`node scripts/podcast-segments.mjs script "Bayes Theorem" [--refresher]` prints any clip's script.

## How it is built

**A clip is shared; only the order is personal.** Bayes' Theorem's brief is the same in every
reader's episode, so each clip is recorded once and named by a hash of its script and its voice.
An episode is the clips its plan calls for, joined end to end in the browser.

```
Concepts/*.md ──► podcastScripts.ts ──► scripts/podcast-segments.mjs sync ──► Kokoro (or ElevenLabs)
                     │ (vite build)                     │                         │
                     ▼                                  ▼                         ▼
          virtual:podcast-scripts          podcast/index.json  ◄──  podcast/<kind>/<slug>-<hash>-<voice>.mp3
          (every page's script hashes)          (public Supabase Storage bucket `podcast`)
                     │                                  │
                     └──────────► usePodcastEpisode ◄───┘  today's plan → planEpisode → the player
```

| Piece | Where |
|---|---|
| Scripts from a page (pure, tested over the real vault) | `quiz/src/lib/podcastScripts.ts` |
| Index, episode planning, chapters (pure, tested) | `quiz/src/lib/podcast.ts`, `podcastPlayback.ts` |
| Script hashes at build time | `virtual:podcast-scripts` (`podcastScriptsPlugin` in `vite.config.ts`) |
| Today's plan → an episode | `quiz/src/hooks/usePodcastEpisode.ts` |
| The one `<audio>`, Media Session, analytics | `quiz/src/stores/podcastStore.ts` |
| Button / player | `quiz/src/components/podcast/PodcastButton.tsx` (in `ReadinessCard`), `PodcastPlayer.tsx` (in `ResumeDock`), both lazy |
| Recorder | `quiz/scripts/podcast-segments.mjs` + `podcast_tts_kokoro.py` |
| Nightly job | `.github/workflows/podcast-segments.yml` |
| Bucket | `supabase/migrations/20261102_podcast_bucket.sql` |
| Email button | `supabase/functions/daily-plan-email/index.ts` (mirrors `planEpisode`) |
| Flag | `PODCAST_ENABLED` in `quiz/src/lib/featureFlags.ts` |
| End to end | `quiz/e2e/podcast.spec.ts` |

### A stale clip is never played

Listen's rule, kept twice over:

- **The index lists only current clips.** Each `sync` drops from `index.json` every clip whose
  page's script has changed, whose page is gone, or that was made in another voice, before
  recording anything. The email reads the index alone, so it never counts a stale clip.
- **The app checks again.** The build carries every page's script hashes
  (`virtual:podcast-scripts`, ~60 KB, its own chunk), and `isCurrentClip` rejects a clip made
  from any other script — so a deploy that edits a page silences that concept's clip at once,
  until the job records it again (a push to `main` that changes `Concepts/**` runs the job).

### Joining clips

Every clip is CBR 64 kb/s mono MP3 at 44.1 kHz with **no ID3 tag and no Xing header**
(`ffmpeg -write_xing 0 -id3v2_version 0 -write_id3v1 0 -map_metadata -1`). That lets the player
join clips byte for byte (`joinClips`) into one track the browser measures by its bitrate — one
track to scrub, and one track a phone keeps playing with the screen locked (a playlist of
separate files stalls between tracks in a background tab on iOS). A clip's length is exact from
its size: `bytes × 8 / 64000`.

### The index

`podcast/index.json`, compact because the Dashboard reads it (cached a minute; audio a year):

```json
{ "v": 1, "voices": [["af_heart", "kokoro-82m"]],
  "clips": { "brief/bayes-theorem": ["22q9qqw6i92", 52.17, 417332, 0], … } }
```

Each clip is `[script hash, seconds, bytes, voice index]`; its file is
`<key>-<hash>-<voice slug>.mp3`. The byte size is kept for the RSS feed (below), which needs
an enclosure's length.

## The voice

**Now: Kokoro-82M**, voice `af_heart` (the maintainer's pick, 2026-11-02) — Apache-2.0 model
and voices, run with `kokoro-onnx` (MIT) on the CPU, no PyTorch. On a 4-core machine it reads
about 4× faster than real time; the whole vault (~1,380 briefs and refreshers, ~35 hours of
audio) is about 9 hours of recording, so the nightly job's 5-hour budget backfills it in two
nights. Each run records, in order: the three bridges; every concept on a Pro reader's plan in
the next 7 days, soonest first; then (nightly) the rest of the vault. Coqui XTTS was ruled out
(non-commercial licence) and Piper (voices' licences vary, lower quality).

**Later: ElevenLabs.** `--provider elevenlabs --voice <voice id> [--model <id>]` with
`ELEVENLABS_API_KEY` set records the same scripts through the text-to-speech API
(`mp3_44100_64`, re-encoded to the clip format). The voice is part of every clip's name and
index entry, so switching drops the Kokoro clips from the index as their replacements are made —
nothing needs deleting first. *Untested*: there was no key in the build environment. With
ElevenLabs the intro can also become personal — an edge function recording each reader's ~200
characters on demand.

## Running it

```bash
cd quiz
# Hear a script
node scripts/podcast-segments.mjs script "Loss Ratio"

# Record locally (no Supabase): quiz/public/podcast/, git-ignored
KOKORO_MODEL=…/kokoro-v1.0.onnx KOKORO_VOICES=…/voices-v1.0.bin \
  node scripts/podcast-segments.mjs sync --local --concepts "Loss Ratio,Pure Premium"
VITE_PODCAST_BASE_URL=/podcast npm run dev

# What a run would record, without recording
node scripts/podcast-segments.mjs sync --plans --all --dry-run
```

The model files are the kokoro-onnx release's `kokoro-v1.0.onnx` and `voices-v1.0.bin`; the
workflow downloads them and checks their sha256.

## Setup checklist (one-time)

1. Apply `20261102_podcast_bucket.sql` (creates the public `podcast` bucket).
2. Add the repository secrets the workflow reads (Settings → Secrets and variables → Actions):
   `SUPABASE_SERVICE_ROLE_KEY` — a dedicated secret key (`sb_secret_…`, Supabase → Project
   Settings → API Keys → New secret key) or the legacy `service_role` key — and the project:
   `SUPABASE_PROJECT_REF` (already set for `deploy-functions.yml`; the URL is built from it) or
   `SUPABASE_URL`.
3. Run **Actions → Podcast Segments → Run workflow** once (scope `all`), or wait for the nightly
   run. The Dashboard button and the email's Listen button appear as soon as today's concepts
   are recorded.
4. Redeploy `daily-plan-email` (it deploys on merge to `main`).

## Measuring it

`podcast_play` (once per episode per page load, with `source`: `dashboard` or `email`) and
`podcast_complete` (played to the end), each with the exam, the minutes and the number of
concepts. The email's Listen link carries `utm_source=daily-plan-email` and
`utm_content=podcast`, so it counts as a `reminder_opened` like the session link, told apart by
its content.

## Not yet

- **A private RSS feed** per account, so episodes arrive in Apple Podcasts, Overcast or Pocket
  Casts. Needs a secret feed token per account (a table and a Settings row to copy or replace it),
  an endpoint that joins the clips server side with byte-range support (Apple requires it — the
  index's byte sizes make that a matter of mapping a range onto clips), and each day's episode
  frozen when first built (a `podcast_episodes` row), since a podcast app may fetch yesterday's
  episode tomorrow. Podcasting 2.0 chapters come almost free from `episodeChapters`.
- **A personal intro**, once the voice is ElevenLabs.
- **A transcript with the word highlighted**, as Listen does: Kokoro gives no timestamps through
  kokoro-onnx; ElevenLabs' `/with-timestamps` would.
- **Long-tail pages**: 19 concept pages have no opening paragraph (they start with a callout or a
  heading) and so no clip; they are listed under *Also on today's plan*.
