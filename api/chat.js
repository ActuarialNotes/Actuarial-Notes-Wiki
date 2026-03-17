// Vercel serverless function — proxies AI requests to Anthropic
// Environment variables required:
//   ANTHROPIC_API_KEY  — your Anthropic API key
//   INVITE_CODES       — comma-separated list of valid invite codes

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 16384;
const MAX_CHARS = 100000;
const RATE_LIMIT = 5;           // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const SYSTEM_PROMPT = `You are an expert actuarial exam content analyst. Analyze the provided document and extract structured learning content.

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{
  "examTitle": "Short exam or course name",
  "examDescription": "1-2 sentence overview of the exam/document",
  "objectives": [
    {
      "title": "Learning Objective Title",
      "weight": 25,
      "concepts": [
        {
          "name": "Concept Name",
          "description": "Clear 1-3 sentence description of this concept"
        }
      ]
    }
  ],
  "sources": [
    {
      "title": "Source Title",
      "author": "Author Name",
      "chapters": "Relevant chapters/sections",
      "type": "textbook"
    }
  ]
}

Rules:
- weight is a percentage (number) if found in the document, otherwise null
- Each objective should have 2-8 relevant concepts
- Sources type should be one of: textbook, paper, manual, online, syllabus
- Extract ALL learning objectives you can identify
- Be thorough but accurate — only include what the document supports`;

// In-memory rate limit store (resets on cold start — acceptable)
const rateLimitMap = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;

  // Clean stale entries
  for (const [key, timestamps] of rateLimitMap) {
    const filtered = timestamps.filter(t => t > cutoff);
    if (filtered.length === 0) rateLimitMap.delete(key);
    else rateLimitMap.set(key, filtered);
  }

  const timestamps = (rateLimitMap.get(ip) || []).filter(t => t > cutoff);
  if (timestamps.length >= RATE_LIMIT) return false;

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Invite-Code');
}

export default async function handler(req, res) {
  setCors(res);

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth
  const inviteCode = (req.headers['x-invite-code'] || '').trim();
  const validCodes = (process.env.INVITE_CODES || '')
    .split(',')
    .map(c => c.trim())
    .filter(Boolean);

  if (!inviteCode || !validCodes.includes(inviteCode)) {
    return res.status(401).json({ error: 'Invalid invite code' });
  }

  // Rate limit
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded. You can make 5 requests per hour. Please wait and try again.' });
  }

  // Validate body
  const { text, systemPrompt } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "text" field in request body' });
  }

  // Use custom system prompt if provided, else fall back to default
  const hasCustomPrompt = (systemPrompt && typeof systemPrompt === 'string' && systemPrompt.trim());
  const activePrompt = hasCustomPrompt ? systemPrompt.trim() : SYSTEM_PROMPT;

  // Truncate
  let truncated = text;
  if (truncated.length > MAX_CHARS) {
    truncated = truncated.substring(0, MAX_CHARS) + '\n\n[Document truncated at ' + MAX_CHARS + ' characters]';
  }

  // When a custom system prompt is provided, use the raw text as the user message
  // to avoid conflicting instructions. Default flow keeps the exam-specific prefix.
  const userMessage = hasCustomPrompt
    ? truncated
    : 'Analyze this document and extract the learning content:\n\n' + truncated;

  // Proxy to Anthropic
  try {
    const anthropicRes = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: activePrompt,
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!anthropicRes.ok) {
      const status = anthropicRes.status;
      if (status === 429) {
        return res.status(429).json({ error: 'AI service is busy. Please wait a moment and try again.' });
      }
      return res.status(502).json({ error: 'AI service error (' + status + '). Please try again later.' });
    }

    const data = await anthropicRes.json();
    const content = data.content && data.content[0] && data.content[0].text;
    if (!content) {
      return res.status(502).json({ error: 'Empty response from AI. Please try again.' });
    }

    // Parse JSON — try direct parse first, then strip fences/prose
    let jsonStr = content.trim();
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e1) {
      // Strip markdown fences (may appear anywhere in the response)
      const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (fenceMatch) {
        jsonStr = fenceMatch[1];
      } else {
        // Find JSON object boundaries in surrounding prose
        const objStart = jsonStr.indexOf('{');
        const objEnd = jsonStr.lastIndexOf('}');
        if (objStart !== -1 && objEnd > objStart) {
          jsonStr = jsonStr.substring(objStart, objEnd + 1);
        }
      }
      try {
        parsed = JSON.parse(jsonStr);
      } catch (e2) {
        return res.status(502).json({ error: 'Failed to parse AI response. The document may be too complex. Please try again.' });
      }
    }

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach AI service: ' + (err.message || 'Unknown error') });
  }
}
