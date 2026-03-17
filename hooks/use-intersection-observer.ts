import { useEffect, useRef } from "react"

export function useIntersectionObserver(
  onIntersect: () => void,
  enabled: boolean
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect()
        }
      },
      { threshold: 0, rootMargin: "0px 0px 400px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return ref
}
