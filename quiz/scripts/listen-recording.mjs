#!/usr/bin/env node
// Make a concept's recorded voice-over for the Listen view.
//
//   node scripts/listen-recording.mjs script   "Probability"
//       Print the narration — exactly what the voice is given. The same speech
//       the browser voice speaks (src/lib/listenTokens.ts), equations read by
//       src/lib/mathSpeech.ts.
//
//   node scripts/listen-recording.mjs generate "Probability" --voice <voice_id> [--model eleven_v4]
//       Record it with ElevenLabs' /with-timestamps endpoint, which returns the
//       audio with the time every character begins — a token starts when its
//       first character does. Needs ELEVENLABS_API_KEY.
//
//   node scripts/listen-recording.mjs build   "Probability" --audio take.mp3 --words words.json
//                                              [--voice-id <id>] [--voice-name <name>] [--model <id>]
//       Build the manifest for audio made some other way (the ElevenLabs app, the
//       MCP connector), from a word-level transcript of it — Scribe's `words`
//       ({text, start}) — which is lined up with the script word by word.
//
// Both write quiz/public/listen/<slug>.mp3 and <slug>.json. The manifest carries
// a hash of the script it was made from; edit the page and the recording is
// ignored (the live voices read the page instead) until it is made again.

import { copyFile, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const VAULT = path.resolve(ROOT, '..')
const OUT_DIR = path.join(ROOT, 'public', 'listen')

// The app's own TypeScript, bundled so this script reads a page the way the app does.
async function loadApp() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'listen-recording-'))
  const outfile = path.join(dir, 'app.mjs')
  await build({
    stdin: {
      contents: `
        export { buildListenContent, toSegments } from '@/lib/listenTokens'
        export { alignTranscript, buildNarration, listenSlug, marksFromCharacterAlignment, narrationHash } from '@/lib/listenNarration'
      `,
      resolveDir: ROOT,
      loader: 'ts',
    },
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile,
    alias: { '@': path.join(ROOT, 'src') },
    loader: { '.css': 'empty', '.svg': 'empty' },
    // The app reads Vite's env at import time; nothing here depends on it.
    define: { 'import.meta.env': '{}' },
    logLevel: 'error',
  })
  return import(pathToFileURL(outfile).href)
}

function parseArgs(argv) {
  const [command, name, ...rest] = argv
  const flags = {}
  for (let i = 0; i < rest.length; i++) {
    if (!rest[i].startsWith('--')) throw new Error(`Unexpected argument: ${rest[i]}`)
    flags[rest[i].slice(2)] = rest[++i]
  }
  return { command, name, flags }
}

function need(flags, key) {
  if (!flags[key]) throw new Error(`Missing --${key}`)
  return flags[key]
}

async function narrationFor(app, name) {
  const file = path.join(VAULT, 'Concepts', `${name}.md`)
  const markdown = await readFile(file, 'utf8').catch(() => {
    throw new Error(`No concept page at ${path.relative(VAULT, file)}`)
  })
  const segments = app.toSegments(app.buildListenContent(markdown).blocks)
  return app.buildNarration(segments)
}

async function writeRecording(app, name, narration, audioFile, marks, extra) {
  const slug = app.listenSlug(name)
  await mkdir(OUT_DIR, { recursive: true })
  const audio = `${slug}.mp3`
  await copyFile(audioFile, path.join(OUT_DIR, audio))
  const manifest = {
    v: 1,
    hash: app.narrationHash(narration.text),
    audio,
    duration: extra.duration,
    voice: extra.voice,
    model: extra.model,
    marks,
  }
  await writeFile(path.join(OUT_DIR, `${slug}.json`), JSON.stringify(manifest) + '\n')
  console.log(`Wrote public/listen/${slug}.mp3 and ${slug}.json (${marks.length} tokens, ${extra.duration.toFixed(1)} s)`)
}

async function main() {
  const { command, name, flags } = parseArgs(process.argv.slice(2))
  if (!command || !name) {
    console.error('Usage: listen-recording.mjs <script|generate|build> "<Concept Name>" [--flag value …]')
    process.exit(2)
  }
  const app = await loadApp()
  const narration = await narrationFor(app, name)

  if (command === 'script') {
    process.stdout.write(narration.text + '\n')
    return
  }

  if (command === 'build') {
    const words = JSON.parse(await readFile(need(flags, 'words'), 'utf8'))
    const list = (Array.isArray(words) ? words : words.words).filter(w => w.type !== 'spacing')
    const { marks, unmatched, spokenTokens } = app.alignTranscript(narration, list)
    const coverage = 1 - unmatched.length / Math.max(1, spokenTokens)
    console.log(`Matched ${spokenTokens - unmatched.length} of ${spokenTokens} spoken tokens (${(coverage * 100).toFixed(1)}%)`)
    if (unmatched.length) {
      const text = n => narration.text.slice(narration.tokens[n].start, narration.tokens[n].end)
      console.log(`Not heard: ${unmatched.map(text).join(' · ')}`)
    }
    if (coverage < 0.9) throw new Error('Less than 90% of the script was heard in this audio — it is not a recording of this page.')
    const duration = Number(flags.duration ?? list[list.length - 1].end ?? 0)
    await writeRecording(app, name, narration, need(flags, 'audio'), marks, {
      duration,
      voice: { id: flags['voice-id'] ?? '', name: flags['voice-name'] ?? '' },
      model: flags.model ?? '',
    })
    return
  }

  if (command === 'generate') {
    const key = process.env.ELEVENLABS_API_KEY
    if (!key) throw new Error('Set ELEVENLABS_API_KEY to generate; use `build` for audio made elsewhere.')
    if (narration.text.length > 4500) {
      throw new Error(`The script is ${narration.text.length} characters; one request takes at most 4,500. Splitting a long page is not built yet.`)
    }
    const voice = need(flags, 'voice')
    const model = flags.model ?? 'eleven_v4'
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_64`,
      {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: narration.text, model_id: model }),
      },
    )
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`)
    const body = await res.json()
    const dir = await mkdtemp(path.join(os.tmpdir(), 'listen-take-'))
    const take = path.join(dir, 'take.mp3')
    await writeFile(take, Buffer.from(body.audio_base64, 'base64'))
    const ends = body.alignment.character_end_times_seconds
    await writeRecording(
      app,
      name,
      narration,
      take,
      app.marksFromCharacterAlignment(narration, body.alignment),
      { duration: ends[ends.length - 1], voice: { id: voice, name: flags['voice-name'] ?? '' }, model },
    )
    return
  }

  throw new Error(`Unknown command: ${command}`)
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})
