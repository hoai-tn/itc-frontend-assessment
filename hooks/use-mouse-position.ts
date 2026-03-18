"use client"

import { useEffect, useState } from "react"

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
    document.addEventListener("mousemove", mouseMoveHandler)

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler)
    }
  }, [])

  return mousePosition
}
