#!/usr/bin/env node
// Record the daily podcast's clips (docs/daily-podcast.md).
//
//   node scripts/podcast-segments.mjs script "Bayes Theorem" [--refresher]
//       Print a clip's script — exactly what the voice is given.
//
//   node scripts/podcast-segments.mjs sync [--plans] [--concepts "A,B"] [--all]
//                                          [--budget-minutes 300] [--provider kokoro|elevenlabs]
//                                          [--voice af_heart] [--local] [--dry-run]
//       Record what is missing or out of date, most needed first, until the
//       budget runs out, then rewrite the index:
//         1. the three fixed bridges (intro, the refreshers' link, outro);
//         2. --plans: every concept on a Pro reader's plan in the next 7 days,
//            and their refreshers (read with the service role — needs
//            SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY);
//         3. --concepts: the ones named;
//         4. --all: every concept page, brief then refresher.
//       A clip is out of date when its page's script has changed, or it was
//       made with another voice. The index lists only clips current with the
//       vault this runs on, so a page's old recording drops out of it.
//
// Providers:
//   kokoro      Kokoro-82M via scripts/podcast_tts_kokoro.py (kokoro-onnx on the
//               CPU). Needs KOKORO_MODEL and KOKORO_VOICES (the model files) and a
//               Python with kokoro-onnx + soundfile (PODCAST_PYTHON, default python3).
//   elevenlabs  ElevenLabs' text-to-speech API, mp3_44100_64. Needs
//               ELEVENLABS_API_KEY; --voice is a voice id, --model a model id
//               (default eleven_multilingual_v2). Untested until there's a key.
//
// Every clip is written as CBR 64 kb/s mono MP3 at 44.1 kHz with no ID3 tag
// and no Xing header (ffmpeg), so the app can join clips byte for byte into
// one track (lib/podcast.ts, joinClips).
//
// Where: the public Supabase Storage bucket `podcast` (SUPABASE_URL +
// SUPABASE_SERVICE_ROLE_KEY), or with --local quiz/public/podcast/ (git
// ignores it; serve it with VITE_PODCAST_BASE_URL=/podcast npm run dev).

import { spawn, execFile } from 'node:child_process'
import { createInterface } from 'node:readline'
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const run = promisify(execFile)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const VAULT = path.resolve(ROOT, '..')
const LOCAL_DIR = path.join(ROOT, 'public', 'podcast')
const BUCKET = 'podcast'
const PLAN_DAYS_AHEAD = 7

// ── The app's own code ──────────────────────────────────────────────────────

async function loadApp() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'podcast-segments-'))
  const outfile = path.join(dir, 'app.mjs')
  await build({
    stdin: {
      contents: `
        export * from '@/lib/podcast'
        export * from '@/lib/podcastScripts'
        export { deriveTodaysConcepts } from '@/lib/dailyEmail'
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
    define: { 'import.meta.env': '{}' },
    logLevel: 'error',
  })
  return import(pathToFileURL(outfile).href)
}

function parseArgs(argv) {
  const [command, ...rest] = argv
  const positional = []
  const flags = {}
  for (let i = 0; i < rest.length; i++) {
    if (!rest[i].startsWith('--')) { positional.push(rest[i]); continue }
    const key = rest[i].slice(2)
    const next = rest[i + 1]
    if (next === undefined || next.startsWith('--')) flags[key] = true
    else { flags[key] = next; i++ }
  }
  return { command, positional, flags }
}

async function conceptPages() {
  const dir = path.join(VAULT, 'Concepts')
  const pages = []
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue
    pages.push({ name: file.slice(0, -3), markdown: await readFile(path.join(dir, file), 'utf8') })
  }
  return pages
}

/** Every clip the vault can make now: key → { text, hash, label }. */
function allScripts(app, pages) {
  const scripts = new Map()
  for (const [id, text] of Object.entries(app.PODCAST_BRIDGES)) {
    scripts.set(app.podcastClipKey('bridge', id), { text, hash: app.scriptHash(text), label: `bridge: ${id}` })
  }
  for (const { name, markdown } of pages) {
    const brief = app.briefScript(name, markdown)
    if (brief) scripts.set(app.podcastClipKey('brief', name), { text: brief, hash: app.scriptHash(brief), label: name })
    const refresher = app.refresherScript(name, markdown)
    if (refresher) scripts.set(app.podcastClipKey('refresher', name), { text: refresher, hash: app.scriptHash(refresher), label: `${name} (refresher)` })
  }
  return scripts
}

// ── Storage ─────────────────────────────────────────────────────────────────

function storage(local) {
  if (local) {
    return {
      where: 'public/podcast/',
      async readIndex() {
        return JSON.parse(await readFile(path.join(LOCAL_DIR, 'index.json'), 'utf8').catch(() => 'null'))
      },
      async put(file, body) {
        const target = path.join(LOCAL_DIR, file)
        await mkdir(path.dirname(target), { recursive: true })
        await writeFile(target, body)
      },
    }
  }
  const base = (process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '').replace(/\/+$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!base || !key) throw new Error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or pass --local.')
  return {
    where: `the ${BUCKET} bucket`,
    async readIndex() {
      const res = await fetch(`${base}/storage/v1/object/public/${BUCKET}/index.json?t=${Date.now()}`)
      return res.ok ? res.json() : null
    },
    // Audio is named by its script hash and voice, so it is cached for a year;
    // the index is the one file that changes under a name, cached for a minute.
    async put(file, body, contentType) {
      const immutable = file.endsWith('.mp3')
      const res = await fetch(`${base}/storage/v1/object/${BUCKET}/${file}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          apikey: key,
          'Content-Type': contentType,
          'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=60',
          'x-upsert': 'true',
        },
        body,
      })
      if (!res.ok) throw new Error(`Upload of ${file} failed: ${res.status} ${await res.text()}`)
    },
  }
}

// ── What the plans need ─────────────────────────────────────────────────────

async function rest(base, key, query) {
  const res = await fetch(`${base}/rest/v1/${query}`, { headers: { Authorization: `Bearer ${key}`, apikey: key } })
  if (!res.ok) throw new Error(`${query.split('?')[0]}: ${res.status} ${await res.text()}`)
  return res.json()
}

// The same active-Pro rule as useSubscription.ts and the edge functions.
function isActivePro(row) {
  if (row.tier !== 'premium' || row.status !== 'active') return false
  return !row.current_period_end || new Date(row.current_period_end).getTime() > Date.now()
}

function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Concepts on Pro readers' plans over the next week, soonest first: [names for briefs, names for refreshers]. */
async function planConcepts(app) {
  const base = (process.env.SUPABASE_URL ?? '').replace(/\/+$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!base || !key) throw new Error('--plans needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  const subs = await rest(base, key, 'user_subscriptions?select=user_id,tier,status,current_period_end&tier=eq.premium&status=eq.active')
  const pro = subs.filter(isActivePro).map(r => r.user_id)
  const today = new Date().toISOString().slice(0, 10)
  const byDay = new Map()   // day offset → Set of names
  const refreshers = new Set()
  for (let i = 0; i < pro.length; i += 100) {
    const ids = pro.slice(i, i + 100).join(',')
    const rows = await rest(base, key, `exam_progress?select=study_plan_cache&status=eq.in_progress&study_plan_cache=not.is.null&user_id=in.(${ids})`)
    for (const { study_plan_cache: plan } of rows) {
      if (!plan || typeof plan !== 'object') continue
      for (let day = 0; day <= PLAN_DAYS_AHEAD; day++) {
        const date = addDays(today, day)
        const names = day === 0
          ? app.deriveTodaysConcepts(plan, date)
          : (plan.assignments ?? []).filter(a => a?.scheduledDate === date).map(a => a.conceptName)
        if (!byDay.has(day)) byDay.set(day, new Set())
        for (const n of names) if (typeof n === 'string') byDay.get(day).add(n)
      }
      for (const n of plan.reviewConcepts ?? []) if (typeof n === 'string') refreshers.add(n)
    }
  }
  const briefs = [...new Set([...byDay.keys()].sort((a, b) => a - b).flatMap(d => [...byDay.get(d)]))]
  console.log(`Plans: ${pro.length} Pro account(s), ${briefs.length} concept(s) in the next ${PLAN_DAYS_AHEAD} days, ${refreshers.size} refresher(s).`)
  return { briefs, refreshers: [...refreshers] }
}

// ── Voices ──────────────────────────────────────────────────────────────────

async function kokoroVoice() {
  const model = process.env.KOKORO_MODEL
  const voices = process.env.KOKORO_VOICES
  if (!model || !voices) throw new Error('Set KOKORO_MODEL and KOKORO_VOICES to the Kokoro model files.')
  const child = spawn(process.env.PODCAST_PYTHON ?? 'python3', [path.join(ROOT, 'scripts', 'podcast_tts_kokoro.py'), '--model', model, '--voices', voices], {
    stdio: ['pipe', 'pipe', 'inherit'],
  })
  const lines = createInterface({ input: child.stdout })[Symbol.asyncIterator]()
  const next = async () => {
    const { value, done } = await lines.next()
    if (done) throw new Error('The Kokoro process exited.')
    return JSON.parse(value)
  }
  const ready = await next()
  if (!ready.ready) throw new Error('The Kokoro process did not start.')
  return {
    model: 'kokoro-82m',
    async speak(text, voice, wavOut) {
      child.stdin.write(JSON.stringify({ text, voice, out: wavOut }) + '\n')
      const reply = await next()
      if (!reply.ok) throw new Error(reply.error)
      return wavOut
    },
    close: () => child.stdin.end(),
  }
}

function elevenLabsVoice(modelId) {
  const key = process.env.ELEVENLABS_API_KEY
  if (!key) throw new Error('Set ELEVENLABS_API_KEY.')
  return {
    model: modelId,
    async speak(text, voice, _wav, mp3Raw) {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_64`, {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        // Lines are the script's blocks; a blank line between gives the voice its pause.
        body: JSON.stringify({ text: text.split('\n').join('\n\n'), model_id: modelId }),
      })
      if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`)
      await writeFile(mp3Raw, Buffer.from(await res.arrayBuffer()))
      return mp3Raw
    },
    close() {},
  }
}

/** Any audio → CBR 64 kb/s mono 44.1 kHz MP3, no tags, no Xing header — joinable byte for byte. */
async function toClipMp3(input, output) {
  await run('ffmpeg', [
    '-loglevel', 'error', '-y', '-i', input,
    '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k',
    '-write_xing', '0', '-id3v2_version', '0', '-write_id3v1', '0', '-map_metadata', '-1',
    output,
  ])
  const bytes = (await stat(output)).size
  return { bytes, seconds: (bytes * 8) / 64000 }
}

// ── Commands ────────────────────────────────────────────────────────────────

async function sync(app, flags) {
  const started = Date.now()
  const budgetMs = Number(flags['budget-minutes'] ?? 300) * 60_000
  const provider = flags.provider ?? 'kokoro'
  const voiceId = flags.voice ?? (provider === 'kokoro' ? 'af_heart' : null)
  if (!voiceId) throw new Error('--voice is required for ElevenLabs (a voice id).')
  const store = storage(Boolean(flags.local))
  const scripts = allScripts(app, await conceptPages())

  const index = app.parsePodcastIndex(await store.readIndex()) ?? {}
  const modelName = provider === 'kokoro' ? 'kokoro-82m' : (flags.model ?? 'eleven_multilingual_v2')
  // Keep only what is still current: a changed page, a deleted page or a
  // switched voice drops a clip from the index (its audio stays, unnamed).
  const kept = {}
  for (const [key, clip] of Object.entries(index)) {
    const now = scripts.get(key)
    if (now && now.hash === clip.h && clip.voice === voiceId && clip.model === modelName) kept[key] = clip
  }

  const wanted = []
  const want = (key) => { if (scripts.has(key) && !wanted.includes(key)) wanted.push(key) }
  for (const id of Object.keys(app.PODCAST_BRIDGES)) want(app.podcastClipKey('bridge', id))
  if (flags.plans) {
    const { briefs, refreshers } = await planConcepts(app)
    for (const n of briefs) want(app.podcastClipKey('brief', n))
    for (const n of refreshers) want(app.podcastClipKey('refresher', n))
  }
  if (typeof flags.concepts === 'string') {
    for (const n of flags.concepts.split(',').map(s => s.trim()).filter(Boolean)) {
      want(app.podcastClipKey('brief', n))
      want(app.podcastClipKey('refresher', n))
    }
  }
  if (flags.all) {
    for (const key of scripts.keys()) if (key.startsWith('brief/')) want(key)
    for (const key of scripts.keys()) if (key.startsWith('refresher/')) want(key)
  }
  const todo = wanted.filter(key => !kept[key])
  const dropped = Object.keys(index).length - Object.keys(kept).length
  console.log(`${Object.keys(kept).length} clip(s) current, ${dropped} dropped as out of date, ${todo.length} to record (${provider}, ${voiceId}).`)
  if (flags['dry-run']) {
    for (const key of todo) console.log(`  ${key}`)
    return
  }

  const writeIndex = async () => {
    await store.put('index.json', JSON.stringify(app.podcastIndexFile(kept)) + '\n', 'application/json')
  }
  if (todo.length === 0) { if (dropped) await writeIndex(); return }

  const voice = provider === 'kokoro' ? await kokoroVoice() : elevenLabsVoice(modelName)
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'podcast-clip-'))
  let made = 0
  let failed = 0
  try {
    for (const key of todo) {
      if (Date.now() - started > budgetMs) {
        console.log(`Budget reached; ${todo.length - made - failed} left for the next run.`)
        break
      }
      const { text, hash, label } = scripts.get(key)
      try {
        const raw = await voice.speak(text, voiceId, path.join(tmp, 'clip.wav'), path.join(tmp, 'clip-raw.mp3'))
        const out = path.join(tmp, 'clip.mp3')
        const { bytes, seconds } = await toClipMp3(raw, out)
        const audio = app.clipAudioFile(key, hash, voiceId)
        // Audio first: the index must never name a file that isn't there.
        await store.put(audio, await readFile(out), 'audio/mpeg')
        kept[key] = { h: hash, a: audio, d: seconds, b: bytes, voice: voiceId, model: voice.model }
        made++
        console.log(`  ${label} — ${seconds.toFixed(1)} s`)
        if (made % 25 === 0) await writeIndex()
      } catch (err) {
        failed++
        console.error(`  ${label} failed: ${err.message}`)
      }
    }
  } finally {
    voice.close()
    await rm(tmp, { recursive: true, force: true })
    await writeIndex()
  }
  console.log(`Recorded ${made} clip(s) into ${store.where}${failed ? `, ${failed} failed` : ''}; the index lists ${Object.keys(kept).length}.`)
  if (failed && made === 0) process.exitCode = 1
}

async function main() {
  const { command, positional, flags } = parseArgs(process.argv.slice(2))
  const app = await loadApp()
  if (command === 'script') {
    const name = positional[0]
    if (!name) throw new Error('Name a concept.')
    const markdown = await readFile(path.join(VAULT, 'Concepts', `${name}.md`), 'utf8')
    const text = flags.refresher ? app.refresherScript(name, markdown) : app.briefScript(name, markdown)
    if (!text) throw new Error(`${name} has no ${flags.refresher ? 'refresher' : 'brief'} — its page has no opening.`)
    console.log(text)
    console.error(`\n${text.split(/\s+/).length} words, hash ${app.scriptHash(text)}`)
    return
  }
  if (command === 'sync') return sync(app, flags)
  console.log('Usage: podcast-segments.mjs script "<Concept>" [--refresher] | sync [--plans] [--concepts "A,B"] [--all] [--local] [--dry-run]')
  process.exitCode = 1
}

main().catch(err => {
  console.error(err.message ?? err)
  process.exitCode = 1
})
