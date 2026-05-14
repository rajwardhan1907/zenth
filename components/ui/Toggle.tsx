'use client'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: '36px',
        height: '20px',
        borderRadius: '10px',
        background: checked ? 'var(--accent)' : 'rgba(0,0,0,0.12)',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'background 200ms ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '18px' : '2px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 200ms ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }}
      />
    </button>
  )
}
