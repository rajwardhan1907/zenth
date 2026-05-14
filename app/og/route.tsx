import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(135deg, #020709 0%, #0d0f1a 50%, #0a0518 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 60px),' +
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 60px)',
            display: 'flex',
          }}
        />

        {/* Left content */}
        <div
          style={{
            position: 'absolute',
            left: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '700px',
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: '24px',
              color: '#6366f1',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            set it. it grows.
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: '96px',
              color: '#ffffff',
              fontFamily: 'serif',
              letterSpacing: '-3px',
              lineHeight: 0.9,
              marginBottom: '24px',
              display: 'flex',
            }}
          >
            Zenth
          </div>

          {/* Subheading */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '48px',
              display: 'flex',
            }}
          >
            Your autonomous SEO agent.
          </div>

          {/* Metric pills */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['3× traffic', '94% time saved', '1-2hr setup'].map((label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '100px',
                  padding: '10px 24px',
                  fontSize: '20px',
                  color: '#e8f0f4',
                  display: 'flex',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right — glowing Z monogram */}
        <div
          style={{
            position: 'absolute',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '260px',
            color: 'rgba(99,102,241,0.15)',
            fontFamily: 'serif',
            textShadow: '0 0 120px rgba(99,102,241,0.4)',
            display: 'flex',
            lineHeight: 1,
          }}
        >
          Z
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
