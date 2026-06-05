import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const APP_ORIGIN = 'https://quiz.actuarialnotes.com'

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

// Mirror of the client-side isActivePremium check (useSubscription.ts) so quota
// is only spent for genuinely premium users.
function isActivePremium(tier: string, status: string, periodEnd: string | null): boolean {
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
    if (!apiKey) return json({ error: 'Configuration error: GOOGLE_CLOUD_TTS_API_KEY is not set' }, 500)

    const admin = createClient(supabaseUrl, serviceRoleKey)
    const { data: { user }, error: userErr } = await admin.auth.getUser(token)
    if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

    // Enforce active premium server-side before calling the paid API.
    const { data: sub } = await admin
      .from('user_subscriptions')
      .select('tier, status, current_period_end')
      .eq('user_id', user.id)
      .maybeSingle()
    if (!sub || !isActivePremium(sub.tier, sub.status, sub.current_period_end)) {
      return json({ error: 'Premium subscription required' }, 403)
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
      return json({ error: 'Text-to-speech provider error' }, 502)
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
    const message = err instanceof Error ? err.message : 'TTS error'
    return json({ error: message }, 500)
  }
})
