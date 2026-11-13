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
//       A current clip in an older encoding is re-encoded from its own audio
//       first (no voice needed), all of them before the index is written, so
//       an index never mixes encodings.
//       Then prunes (below) — skipped with --no-prune or --dry-run.
//
//   node scripts/podcast-segments.mjs prune [--grace-hours 24] [--local] [--dry-run]
//       Delete the audio the index no longer names. A clip outside the index
//       is first marked in retired.json with the time it was seen there, and
//       deleted by a later run once it has been out for the grace period, so a
//       reader whose episode was planned off a recent index still gets every
//       clip it names. A clip back in the index is unmarked.
//
// Providers:
//   kokoro      Kokoro-82M via scripts/podcast_tts_kokoro.py (kokoro-onnx on the
//               CPU). Needs KOKORO_MODEL and KOKORO_VOICES (the model files) and a
//               Python with kokoro-onnx + soundfile (PODCAST_PYTHON, default python3).
//   elevenlabs  ElevenLabs' text-to-speech API, mp3_44100_64. Needs
//               ELEVENLABS_API_KEY; --voice is a voice id, --model a model id
//               (default eleven_multilingual_v2). Untested until there's a key.
//
// Every clip is written as CBR 48 kb/s mono MP3 at 44.1 kHz with no ID3 tag
// and no Xing header (ffmpeg), so the app can join clips byte for byte into
// one track (lib/podcast.ts, joinClips).
//
// Where: the public Supabase Storage bucket `podcast` (SUPABASE_URL +
// SUPABASE_SERVICE_ROLE_KEY — the legacy service_role key or a new secret key,
// `sb_secret_…`), or with --local quiz/public/podcast/ (git
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
const RETIRED = 'retired.json'
const DEFAULT_GRACE_HOURS = 24
// The clips' bitrate, and the encoding the index and the file names carry
// (lib/podcast.ts, clipAudioFile). Changing it is a new encoding: the next
// sync re-encodes every clip under new names and the prune clears the old.
const CLIP_KBPS = 48
const CLIP_ENCODING = `${CLIP_KBPS}k`

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

// The service-role credential, as Supabase wants it sent. A legacy key is a
// JWT and goes in both headers; a new secret key (`sb_secret_…`) is not a JWT
// and goes in `apikey` alone — the gateway turns it into the service role.
function authHeaders(key) {
  return key.startsWith('sb_') ? { apikey: key } : { Authorization: `Bearer ${key}`, apikey: key }
}

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
      async readJson(file) {
        return JSON.parse(await readFile(path.join(LOCAL_DIR, file), 'utf8').catch(() => 'null'))
      },
      async get(file) {
        return readFile(path.join(LOCAL_DIR, file))
      },
      async listAudio() {
        const files = await readdir(LOCAL_DIR, { recursive: true }).catch(() => [])
        return files.map(f => f.split(path.sep).join('/')).filter(f => f.endsWith('.mp3'))
      },
      async remove(files) {
        for (const f of files) await rm(path.join(LOCAL_DIR, f), { force: true })
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
          ...authHeaders(key),
          'Content-Type': contentType,
          'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=60',
          'x-upsert': 'true',
        },
        body,
      })
      if (!res.ok) throw new Error(`Upload of ${file} failed: ${res.status} ${await res.text()}`)
    },
    async readJson(file) {
      const res = await fetch(`${base}/storage/v1/object/${BUCKET}/${file}?t=${Date.now()}`, { headers: authHeaders(key) })
      return res.ok ? res.json() : null
    },
    async get(file) {
      const res = await fetch(`${base}/storage/v1/object/${BUCKET}/${file}`, { headers: authHeaders(key) })
      if (!res.ok) throw new Error(`Download of ${file} failed: ${res.status}`)
      return Buffer.from(await res.arrayBuffer())
    },
    // Storage lists one folder at a time; a folder comes back with no id.
    async listAudio(prefix = '') {
      const files = []
      for (let offset = 0; ; offset += 1000) {
        const res = await fetch(`${base}/storage/v1/object/list/${BUCKET}`, {
          method: 'POST',
          headers: { ...authHeaders(key), 'Content-Type': 'application/json' },
          body: JSON.stringify({ prefix, limit: 1000, offset, sortBy: { column: 'name', order: 'asc' } }),
        })
        if (!res.ok) throw new Error(`Listing ${prefix || 'the bucket'} failed: ${res.status} ${await res.text()}`)
        const page = await res.json()
        for (const item of page) {
          const full = prefix ? `${prefix}/${item.name}` : item.name
          if (item.id == null) files.push(...await this.listAudio(full))
          else if (full.endsWith('.mp3')) files.push(full)
        }
        if (page.length < 1000) return files
      }
    },
    async remove(files) {
      for (let i = 0; i < files.length; i += 500) {
        const res = await fetch(`${base}/storage/v1/object/${BUCKET}`, {
          method: 'DELETE',
          headers: { ...authHeaders(key), 'Content-Type': 'application/json' },
          body: JSON.stringify({ prefixes: files.slice(i, i + 500) }),
        })
        if (!res.ok) throw new Error(`Delete failed: ${res.status} ${await res.text()}`)
      }
    },
  }
}

/**
 * Which audio files to delete, and the retired list to keep: a file outside
 * `live` is marked at `now` the first time it is seen, and deleted once it
 * has been marked for `graceMs`. Marks for files back in `live`, or gone, drop.
 */
export function planPrune(files, live, retired, now, graceMs) {
  const keep = {}
  const remove = []
  for (const file of files) {
    if (live.has(file)) continue
    const since = Date.parse(retired?.[file] ?? '')
    if (Number.isNaN(since)) keep[file] = new Date(now).toISOString()
    else if (now - since >= graceMs) remove.push(file)
    else keep[file] = retired[file]
  }
  return { remove, retired: keep }
}

async function prune(app, flags, store = storage(Boolean(flags.local))) {
  const graceHours = Number(flags['grace-hours'] ?? DEFAULT_GRACE_HOURS)
  if (!(graceHours >= 0)) throw new Error('--grace-hours must be a number of hours.')
  const index = app.parsePodcastIndex(await store.readIndex())
  // No index read means nothing can be called live — never prune blind.
  if (!index) { console.log('Prune: no index to prune against; skipped.'); return }
  const live = new Set(Object.values(index).map(clip => clip.a))
  const files = await store.listAudio()
  const { remove, retired } = planPrune(files, live, await store.readJson(RETIRED), Date.now(), graceHours * 3_600_000)
  const waiting = Object.keys(retired).length
  console.log(`Prune: ${files.length} audio file(s), ${live.size} in the index, ${remove.length} to delete, ${waiting} waiting out the ${graceHours} h grace.`)
  if (flags['dry-run']) {
    for (const f of remove) console.log(`  ${f}`)
    return
  }
  // Mark before deleting, so a failed delete is retried rather than re-marked.
  await store.put(RETIRED, JSON.stringify(retired) + '\n', 'application/json')
  if (remove.length) await store.remove(remove)
}

// ── What the plans need ─────────────────────────────────────────────────────

async function rest(base, key, query) {
  const res = await fetch(`${base}/rest/v1/${query}`, { headers: authHeaders(key) })
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

/** Any audio → CBR 48 kb/s mono 44.1 kHz MP3, no tags, no Xing header — joinable byte for byte. */
async function toClipMp3(input, output) {
  await run('ffmpeg', [
    '-loglevel', 'error', '-y', '-i', input,
    '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', `${CLIP_KBPS}k`,
    '-write_xing', '0', '-id3v2_version', '0', '-write_id3v1', '0', '-map_metadata', '-1',
    output,
  ])
  const bytes = (await stat(output)).size
  return { bytes, seconds: (bytes * 8) / (CLIP_KBPS * 1000) }
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
  const reencode = []
  for (const [key, clip] of Object.entries(index)) {
    const now = scripts.get(key)
    if (!(now && now.hash === clip.h && clip.voice === voiceId && clip.model === modelName)) continue
    kept[key] = clip
    if (clip.enc !== CLIP_ENCODING) reencode.push(key)
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
  console.log(`${Object.keys(kept).length} clip(s) current, ${dropped} dropped as out of date, ${reencode.length} to re-encode at ${CLIP_ENCODING}, ${todo.length} to record (${provider}, ${voiceId}).`)
  if (flags['dry-run']) {
    for (const key of todo) console.log(`  ${key}`)
    return
  }

  const writeIndex = async () => {
    await store.put('index.json', JSON.stringify(app.podcastIndexFile(kept)) + '\n', 'application/json')
  }

  // Re-encode before anything is recorded or the index is written, so every
  // index this run writes is in one encoding. A clip that fails is dropped
  // from the index (and recorded again below if it is wanted).
  if (reencode.length) {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'podcast-reencode-'))
    let done = 0
    try {
      for (const key of reencode) {
        const clip = kept[key]
        try {
          const input = path.join(tmp, 'in.mp3')
          const out = path.join(tmp, 'out.mp3')
          await writeFile(input, await store.get(clip.a))
          const { bytes, seconds } = await toClipMp3(input, out)
          const audio = app.clipAudioFile(key, clip.h, voiceId, CLIP_ENCODING)
          await store.put(audio, await readFile(out), 'audio/mpeg')
          kept[key] = { h: clip.h, a: audio, d: seconds, b: bytes, voice: clip.voice, model: clip.model, enc: CLIP_ENCODING }
          if (++done % 250 === 0) console.log(`  re-encoded ${done} of ${reencode.length}`)
        } catch (err) {
          delete kept[key]
          console.error(`  ${key} could not be re-encoded: ${err.message}`)
        }
      }
    } finally {
      await rm(tmp, { recursive: true, force: true })
    }
    console.log(`Re-encoded ${done} clip(s) at ${CLIP_ENCODING}.`)
    for (const key of wanted) if (!kept[key] && !todo.includes(key)) todo.push(key)
    await writeIndex()
  }

  if (todo.length === 0) {
    if (dropped) await writeIndex()
    if (!flags['no-prune']) await prune(app, flags, store)
    return
  }

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
        const audio = app.clipAudioFile(key, hash, voiceId, CLIP_ENCODING)
        // Audio first: the index must never name a file that isn't there.
        await store.put(audio, await readFile(out), 'audio/mpeg')
        kept[key] = { h: hash, a: audio, d: seconds, b: bytes, voice: voiceId, model: voice.model, enc: CLIP_ENCODING }
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
  if (!flags['no-prune']) await prune(app, flags, store)
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
  if (command === 'prune') return prune(app, flags)
  console.log('Usage: podcast-segments.mjs script "<Concept>" [--refresher] | sync [--plans] [--concepts "A,B"] [--all] [--local] [--dry-run] [--no-prune] | prune [--grace-hours 24] [--local] [--dry-run]')
  process.exitCode = 1
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(err => {
  console.error(err.message ?? err)
  process.exitCode = 1
})
