'use client'
import { GrowthLines } from './GrowthLines'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--page-bg)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Orb 1 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          top: '-10%',
          left: '-8%',
          background: 'var(--orb1)',
          filter: 'blur(60px)',
          animation: 'orbDrift1 16s ease-in-out infinite',
        }}
      />

      {/* Orb 2 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          top: '30%',
          right: '-12%',
          background: 'var(--orb2)',
          filter: 'blur(70px)',
          animation: 'orbDrift2 20s ease-in-out infinite',
        }}
      />

      {/* Orb 3 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          bottom: '10%',
          left: '20%',
          background: 'var(--orb3)',
          filter: 'blur(55px)',
          animation: 'orbDrift3 14s ease-in-out infinite',
        }}
      />

      {/* Orb 4 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: '60%',
          left: '55%',
          background: 'var(--orb1)',
          filter: 'blur(50px)',
          opacity: 0.6,
          animation: 'orbDrift4 18s ease-in-out infinite',
        }}
      />

      {/* Rising growth lines at bottom */}
      <GrowthLines />

      {/* CSS keyframes for orb drift */}
      <style>{`
        @keyframes orbDrift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.05); }
          66%      { transform: translate(-20px,15px) scale(0.97); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(-35px,25px) scale(1.08); }
          70%     { transform: translate(25px,-15px) scale(0.95); }
        }
        @keyframes orbDrift3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(20px,30px) scale(1.06); }
        }
        @keyframes orbDrift4 {
          0%,100% { transform: translate(0,0) scale(1); }
          45%     { transform: translate(-25px,-20px) scale(1.04); }
          80%     { transform: translate(15px,25px) scale(0.96); }
        }
      `}</style>
    </div>
  )
}
