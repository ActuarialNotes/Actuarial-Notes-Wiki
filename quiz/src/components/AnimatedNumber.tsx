import { useEffect, useRef, useState } from 'react'
import { motionAllowed } from '@/lib/viewTransition'
import { tweenMs, tweenValue } from '@/lib/countTween'

/**
 * A whole number that counts to its new value when it changes
 * (lib/countTween.ts). It shows the value as given when it first appears, and
 * at once for a reader who asked for less motion. Give it `tabular-nums` from
 * the text around it so the digits don't shift as they change.
 */
export function AnimatedNumber({ value }: { value: number }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)

  useEffect(() => {
    const start = from.current
    const ms = tweenMs(start, value)
    if (ms === 0 || !Number.isFinite(value) || !motionAllowed() || typeof requestAnimationFrame !== 'function') {
      from.current = value
      setShown(value)
      return
    }
    let frame = 0
    const began = performance.now()
    const tick = (now: number) => {
      const next = tweenValue(start, value, (now - began) / ms)
      from.current = next
      setShown(next)
      if (next !== value) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <>{shown}</>
}
