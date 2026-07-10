import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { value: 'bug', label: 'Bug report' },
  { value: 'feature', label: 'Feature request' },
  { value: 'billing', label: 'Billing question' },
  { value: 'content', label: 'Content / exam question' },
  { value: 'general', label: 'General question' },
]

const fieldClass =
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] sm:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

interface ContactDialogProps {
  onClose: () => void
}

export function ContactDialog({ onClose }: ContactDialogProps) {
  const [category, setCategory] = useState('general')
  const [message, setMessage] = useState('')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const categoryLabel = CATEGORIES.find(c => c.value === category)?.label ?? category
    const subject = encodeURIComponent(`[${categoryLabel}] Actuarial Notes`)
    const body = encodeURIComponent(message)
    const a = document.createElement('a')
    a.href = `mailto:jordan@actuarialnotes.com?subject=${subject}&body=${body}`
    a.click()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
    >
      <div
        className="w-full max-w-md rounded-lg bg-card text-card-foreground shadow-lg p-5 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div>
          <h2 id="contact-dialog-title" className="text-base font-semibold">Contact us</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            We'll reply to jordan@actuarialnotes.com
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="contact-category">Category</Label>
            <select
              id="contact-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={fieldClass}
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact-message">Message</Label>
            <textarea
              id="contact-message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Describe your issue or question…"
              rows={5}
              required
              className={cn(fieldClass, 'resize-none h-auto')}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!message.trim()}>
              Send message
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
