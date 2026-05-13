'use client'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <AnimatedBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
          style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(24px)', border: '0.5px solid rgba(255,255,255,0.9)' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: 'var(--logo-color)' }}>Zenth</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Create account</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-5">Start your autonomous SEO journey</p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Input label="First name" placeholder="Rahul" />
              <Input label="Last name" placeholder="Sharma" />
            </div>
            <Input label="Email" type="email" placeholder="you@company.in" />
            <Input label="Password" type="password" placeholder="Create a password" />
            <Button className="w-full mt-1">Create account</Button>
          </div>
          <p className="text-xs text-center text-[var(--text-secondary)] mt-4">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{ color: 'var(--accent)' }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
