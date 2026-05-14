'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ROADMAP_PROMPTS } from '@/lib/roadmap-prompts'

if (process.env.NODE_ENV !== 'development') {
  throw new Error('PromptPanel must only be loaded in development')
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  claude: { bg: '#EDE9FE', color: '#5B21B6' },
  api:    { bg: '#E0F2FE', color: '#0369A1' },
  ui:     { bg: '#DCFCE7', color: '#166534' },
  infra:  { bg: '#FEF3C7', color: '#92400E' },
}

const ALL_TAGS = ['claude', 'api', 'ui', 'infra'] as const
type Tag = typeof ALL_TAGS[number]

export default function PromptPanel() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<Tag | 'all'>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'P' && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filteredPhases = useMemo(() => {
    const q = search.toLowerCase()
    return ROADMAP_PROMPTS.map((phase) => ({
      ...phase,
      tasks: phase.tasks.filter((task) => {
        const matchesTag = activeTag === 'all' || task.tags.includes(activeTag)
        const matchesSearch = !q || task.name.toLowerCase().includes(q) || task.prompt.toLowerCase().includes(q)
        return matchesTag && matchesSearch
      }),
    })).filter((phase) => phase.tasks.length > 0)
  }, [search, activeTag])

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          fontSize: '12px',
          padding: '8px 14px',
          background: '#1a1a2e',
          border: '0.5px solid rgba(99,102,241,0.4)',
          color: '#818cf8',
          borderRadius: '100px',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        ⌘ Prompts
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '420px',
              height: '100vh',
              zIndex: 9998,
              background: '#0d0d1a',
              borderLeft: '0.5px solid rgba(99,102,241,0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '16px 16px 12px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#fff', fontWeight: 500, margin: 0 }}>
                    Claude Code prompts
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: '2px 0 0' }}>
                    Zenth roadmap — 36 tasks across 8 phases
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '0 0 0 8px',
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '7px 10px',
                  fontSize: '13px',
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />

              {/* Filter pills */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                {/* All pill */}
                <button
                  onClick={() => setActiveTag('all')}
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    border: activeTag === 'all' ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
                    background: activeTag === 'all' ? '#6366f1' : 'transparent',
                    color: activeTag === 'all' ? '#fff' : 'rgba(255,255,255,0.45)',
                  }}
                >
                  All
                </button>
                {ALL_TAGS.map((tag) => {
                  const tc = TAG_COLORS[tag]
                  const isActive = activeTag === tag
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      style={{
                        fontSize: '11px',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontWeight: 500,
                        border: isActive ? 'none' : `0.5px solid ${tc.color}40`,
                        background: isActive ? tc.bg : 'transparent',
                        color: isActive ? tc.color : `${tc.color}99`,
                      }}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Task list */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredPhases.length === 0 ? (
                <div style={{ padding: '40px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
                  No tasks match your search.
                </div>
              ) : (
                filteredPhases.map((phase) => (
                  <div key={phase.id}>
                    {/* Sticky phase header */}
                    <div
                      style={{
                        position: 'sticky',
                        top: 0,
                        background: '#0d0d1a',
                        zIndex: 1,
                        padding: '8px 16px',
                        borderLeft: `3px solid ${phase.color}`,
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.35)',
                        fontWeight: 600,
                        borderBottom: '0.5px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      {phase.name}
                    </div>

                    {/* Tasks */}
                    {phase.tasks.map((task) => (
                      <div
                        key={task.id}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '0.5px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        {/* Task name */}
                        <p style={{ fontSize: '13px', color: '#fff', fontWeight: 500, margin: '0 0 3px' }}>
                          {task.name}
                        </p>

                        {/* Description */}
                        <p style={{
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.35)',
                          margin: '0 0 7px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {task.desc}
                        </p>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          {task.tags.map((tag) => {
                            const tc = TAG_COLORS[tag] ?? { bg: '#f1f5f9', color: '#475569' }
                            return (
                              <span
                                key={tag}
                                style={{
                                  fontSize: '10px',
                                  padding: '2px 7px',
                                  borderRadius: '100px',
                                  background: tc.bg,
                                  color: tc.color,
                                  fontWeight: 500,
                                }}
                              >
                                {tag}
                              </span>
                            )
                          })}
                        </div>

                        {/* Prompt block */}
                        <pre
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '6px',
                            padding: '10px 12px',
                            fontSize: '11px',
                            color: '#a5b4fc',
                            whiteSpace: 'pre-wrap',
                            maxHeight: '100px',
                            overflowY: 'auto',
                            margin: '0 0 8px',
                            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                            wordBreak: 'break-word',
                          }}
                        >
                          {task.prompt}
                        </pre>

                        {/* Copy button */}
                        <button
                          onClick={() => copyPrompt(task.id, task.prompt)}
                          style={{
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: copiedId === task.id ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)',
                            border: '0.5px solid rgba(255,255,255,0.1)',
                            color: copiedId === task.id ? '#818cf8' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 150ms ease',
                          }}
                        >
                          {copiedId === task.id ? 'Copied ✓' : 'Copy prompt'}
                        </button>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
