# Listen recordings — a studio voice for a concept page

The Listen view reads a concept aloud with the browser's voice (or Google's, for Pro) and
highlights each word as it is spoken. A **recording** is a pre-made voice-over (ElevenLabs) for
one concept that Listen plays *instead*, with the same highlight. Probability is the first.

## How it fits together

```
Concepts/<Name>.md ──► listenTokens.ts ──► SpeechSegment[] ──► listenNarration.ts ──► the script
                         (words, math tokens)   (mathSpeech.ts reads the equations)      │
                                                                                         ▼
                                     public/listen/<slug>.json  ◄── scripts/listen-recording.mjs ◄── ElevenLabs
                                     public/listen/<slug>.mp3         (generate, or build from a transcript)
```

- **One script, three readers.** The browser voice, the Google voice and the recording all speak
  the same `SpeechSegment`s, so an equation is read the way `lib/mathSpeech.ts` says it, whichever
  voice is on. Fix how an equation sounds *there*, then re-record.
- **The manifest** (`<slug>.json`): `hash` of the script, the audio file, and `marks` — for every
  token, `[tokenIndex, startSeconds]`. A token's start is when the voice begins its first word.
- **The player** (`useListenRecording` → `useListenSpeech`'s `studio` engine) plays the mp3 and
  reads the highlight off `audio.currentTime` every animation frame (`timeupdate` is too slow for
  a short word). Skip / back seek to a paragraph's first mark; speed changes in place.
- **A stale recording is never played.** `readRecording` checks the manifest's `hash` against the
  script the page produces *now*; edit the page (or `mathSpeech.ts`) and Listen falls back to the
  live voices until the recording is made again. Concepts with no recording are untouched.

## Making one

```bash
cd quiz
node scripts/listen-recording.mjs script "Probability"        # the exact text the voice is given

# A. API key: audio + per-character timestamps in one call (mp3_44100_64, ≤ 4,500 characters)
ELEVENLABS_API_KEY=… node scripts/listen-recording.mjs generate "Probability" --voice <voice_id>

# B. Audio made elsewhere (ElevenLabs app / MCP connector) + a Scribe word transcript of it
node scripts/listen-recording.mjs build "Probability" --audio take.mp3 --words words.json \
  --voice-id <id> --voice-name "<name>" --model eleven_v4
```

`build` lines the script's words up with the transcript (longest common subsequence), prints how
many spoken tokens it matched and which it didn't hear, and refuses below 90%. Probability's
recording matched 153 / 153.

## Status and open decisions

- **Voice / model:** Bella (`hpp4J3VqNfWAUOO0d1Us`), `eleven_v4`. A test, not a decision.
- **`generate` is untested** — there was no API key in the build environment; `build` is what
  produced Probability's recording. The alignment maths both use is unit-tested.
- **Hosting:** the mp3 is committed under `quiz/public/listen/` (≈ 0.7 MB for 85 s at 64 kbps).
  Fine for a test; for hundreds of concepts it belongs in object storage (Supabase Storage / a
  CDN) with `recordingManifestUrl` / `audioUrl` pointed there.
- **Access:** recordings play for everyone. Make it Pro-only in `ListenView` if that's the plan.
- **Long pages:** `generate` refuses a script over 4,500 characters; splitting (with
  `previous_text` / `next_text` for continuity) is not built.
- **Known reading quirk:** `your $|S|$` is spoken "your the size of S" — a possessive before an
  inline set size. Rare; fixing it means rewording the page or special-casing the article.
