"use client"

import React from "react"

function Pokeball({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="#fff"
        stroke="#2B2B2B"
        strokeWidth="1.5"
      />
      <path d="M1 10 H19" stroke="#2B2B2B" strokeWidth="1.5" />
      <path
        d="M1 10 A9 9 0 0 0 19 10"
        fill="#E74C3C"
        stroke="#2B2B2B"
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="10"
        r="3.5"
        fill="#fff"
        stroke="#2B2B2B"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="1.8" fill="#2B2B2B" />
    </svg>
  )
}

function LightningBolt({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="8,0 3,8 6,8 2,18 12,7 8,7 12,0"
        fill="#FFCC01"
        stroke="#C4960A"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PikachuFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="pikachu-frame">
      {/* Corner pokeballs */}
      <Pokeball className="pikachu-frame-pokeball pikachu-frame-pokeball-tl" />
      <Pokeball className="pikachu-frame-pokeball pikachu-frame-pokeball-tr" />
      <Pokeball className="pikachu-frame-pokeball pikachu-frame-pokeball-bl" />
      <Pokeball className="pikachu-frame-pokeball pikachu-frame-pokeball-br" />

      {/* Lightning bolts */}
      <LightningBolt className="pikachu-frame-bolt pikachu-frame-bolt-l" />
      <LightningBolt className="pikachu-frame-bolt pikachu-frame-bolt-r" />

      {/* Diagonal stripes at corners */}
      <div className="pikachu-frame-stripe pikachu-frame-stripe-tl" />
      <div className="pikachu-frame-stripe pikachu-frame-stripe-tr" />
      <div className="pikachu-frame-stripe pikachu-frame-stripe-bl" />
      <div className="pikachu-frame-stripe pikachu-frame-stripe-br" />

      {/* Inner content */}
      <div className="pikachu-frame-inner">{children}</div>
    </div>
  )
}
