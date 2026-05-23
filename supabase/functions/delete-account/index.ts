import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://quiz.actuarialnotes.com',
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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return json({ error: 'Unauthorized' }, 401)

  const token = authHeader.replace(/^Bearer\s+/i, '')

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const adminClient = createClient(supabaseUrl, serviceRoleKey)

  const { data: { user }, error: userErr } = await adminClient.auth.getUser(token)
  if (userErr || !user) return json({ error: 'Unauthorized' }, 401)

  const { error: deleteErr } = await adminClient.auth.admin.deleteUser(user.id)
  if (deleteErr) return json({ error: deleteErr.message }, 500)

  return json({ success: true })
})
