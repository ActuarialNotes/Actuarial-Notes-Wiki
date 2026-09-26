import { useRef, useState } from 'react'
import { Copy, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckMark } from '@/components/CheckMark'
import { cn } from '@/lib/utils'
import { SKILL_ASSET, connectorUrl } from '@/lib/aiConnector'

/**
 * Settings → AI assistants: where a reader connects Actuarial Notes to Claude or
 * ChatGPT (docs/ai-connector.md). The address shown is always the public one —
 * a preview deployment or a dev server would hand out a URL no assistant can
 * reach.
 */
export function AiConnectorCard() {
  const url = connectorUrl()
  const [copied, setCopied] = useState(false)
  const addressRef = useRef<HTMLElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // No clipboard (an insecure context, a denied permission): select the
      // address so a manual copy is one keystroke away.
      const node = addressRef.current
      if (node) window.getSelection()?.selectAllChildren(node)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI assistants</CardTitle>
        <CardDescription>
          Study with the notes inside Claude or ChatGPT: syllabi, concept pages, and past exam questions
          marked against the official solutions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <code
            ref={addressRef}
            className="flex-1 min-w-0 break-all rounded-md bg-muted px-3 py-2 font-mono text-sm select-all"
          >
            {url}
          </code>
          <Button variant="outline" onClick={copy} className="shrink-0" aria-live="polite">
            {copied ? <CheckMark className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied' : 'Copy address'}
          </Button>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="font-medium">Claude</dt>
          <dd>Customize → Connectors → + → Add custom connector, and paste the address.</dd>
          <dt className="font-medium">ChatGPT</dt>
          <dd>Turn on Developer mode (Settings → Security and login), then add an app for the address with No authentication.</dd>
        </dl>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Study coach skill</p>
            <p className="text-xs text-muted-foreground">Upload it to Claude or ChatGPT to have them tutor from the notes.</p>
          </div>
          {/* Same-origin, so `download` saves the file on every deployment (a
              cross-origin link is navigated instead); the zip is the same everywhere. */}
          <a href={`/${SKILL_ASSET}`} download className={cn(buttonVariants({ variant: 'outline' }), 'shrink-0')}>
            <Download className="h-4 w-4 mr-2" />
            Download skill
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
