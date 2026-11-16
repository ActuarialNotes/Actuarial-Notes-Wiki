/** The avatar of a reader who hasn't signed in: an empty, dashed ring. */
export function GuestAvatar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3.5 2.5" />
    </svg>
  )
}
