import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const APP_ORIGIN = 'https://quiz.actuarialnotes.com'
// What the reader sees when the voice can't play; the cause goes to the log.
const VOICE_UNAVAILABLE = 'This voice isn’t available right now. Try again later.'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': APP_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Vary': 'Origin',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

// Mirror of the client-side isActivePro check (useSubscription.ts) so quota
// is only spent for genuinely Pro users. The stored tier value is still
// `premium` — see the note on SubscriptionTier in useSubscription.ts.
function isActivePro(tier: string, status: string, periodEnd: string | null): boolean {
  if (tier !== 'premium') return false
  if (status !== 'active') return false
  if (!periodEnd) return true
  return new Date(periodEnd).getTime() > Date.now()
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Unauthorized' }, 401)
    const token = authHeader.replace(/^Bearer\s+/i, '')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const apiKey = Deno.env.get('GOOGLE_CLOUD_TTS_API_KEY')
    if (!apiKey) {
      console.error('google-cloud-tts: GOOGLE_CLOUD_TTS_API_KEY is not set')
      return json({ error: VOICE_UNAVAILABLE }, 500)
    }

    const admin = createClient(supabaseUrl, serviceRoleKey)
    const { data: { user }, error: userErr } = await admin.auth.getUser(token)
    if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

    // Enforce active Pro server-side before calling the paid API.
    const { data: sub } = await admin
      .from('user_subscriptions')
      .select('tier, status, current_period_end')
      .eq('user_id', user.id)
      .maybeSingle()
    if (!sub || !isActivePro(sub.tier, sub.status, sub.current_period_end)) {
      return json({ error: 'Read-aloud with this voice is part of Pro.' }, 403)
    }

    const { ssml, rate } = await req.json().catch(() => ({}))
    if (!ssml || typeof ssml !== 'string') return json({ error: 'Missing ssml' }, 400)

    const speakingRate = typeof rate === 'number' && rate >= 0.25 && rate <= 4 ? rate : 1

    const ttsResp = await fetch(
      `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { ssml },
          voice: { languageCode: 'en-US', name: 'en-US-Neural2-D' },
          audioConfig: { audioEncoding: 'MP3', speakingRate },
          enableTimePointing: ['SSML_MARK'],
        }),
      },
    )

    if (!ttsResp.ok) {
      const detail = await ttsResp.text()
      console.error('google-cloud-tts upstream error:', ttsResp.status, detail)
      return json({ error: VOICE_UNAVAILABLE }, 502)
    }

    const result = await ttsResp.json() as {
      audioContent?: string
      timepoints?: Array<{ markName: string; timeSeconds: number }>
    }

    return json({
      audioContent: result.audioContent ?? '',
      timepoints: result.timepoints ?? [],
    })
  } catch (err) {
    console.error('google-cloud-tts error:', err)
    return json({ error: VOICE_UNAVAILABLE }, 500)
  }
})
