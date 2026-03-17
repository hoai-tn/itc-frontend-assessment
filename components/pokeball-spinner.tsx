import { cn } from "@/lib/utils"

export function PokeballSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        className="size-30 animate-spin"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top half - red */}
        <path
          d="M 5,50 A 45,45 0 0,1 95,50"
          fill="hsl(0, 70%, 50%)"
          stroke="hsl(0, 0%, 20%)"
          strokeWidth="5"
        />
        {/* Bottom half - white */}
        <path
          d="M 5,50 A 45,45 0 0,0 95,50"
          fill="white"
          stroke="hsl(0, 0%, 20%)"
          strokeWidth="5"
        />
        {/* Center line */}
        <line
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          stroke="hsl(0, 0%, 20%)"
          strokeWidth="5"
        />
        {/* Center button outer */}
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="white"
          stroke="hsl(0, 0%, 20%)"
          strokeWidth="5"
        />
        {/* Center button inner */}
        <circle cx="50" cy="50" r="5" fill="hsl(0, 0%, 20%)" />
      </svg>
    </div>
  )
}
