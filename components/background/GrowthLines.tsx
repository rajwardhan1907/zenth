'use client'

export function GrowthLines() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      height="200"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Line 1 — organic upward curve */}
      <polyline
        className="rising-line"
        points="0,180 120,165 240,158 360,140 480,120 600,100 720,88 840,72 960,60 1080,50 1200,38 1320,28 1440,15"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.18"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Line 2 — slightly different trajectory */}
      <polyline
        className="rising-line-2"
        points="0,195 120,188 240,178 360,162 480,150 600,132 720,118 840,104 960,92 1080,78 1200,62 1320,48 1440,32"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
