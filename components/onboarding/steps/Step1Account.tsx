import { Input } from '@/components/ui/Input'

interface StepProps {
  onUpdate: (data: Record<string, unknown>) => void
}

export function Step1Account({ onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Create your account</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Tell us who you are so the agent knows whose site it&apos;s working on.</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Input label="First name" placeholder="Rahul" onChange={(e) => onUpdate({ firstName: e.target.value })} />
          <Input label="Last name" placeholder="Sharma" onChange={(e) => onUpdate({ lastName: e.target.value })} />
        </div>
        <Input label="Work email" type="email" placeholder="rahul@company.in" onChange={(e) => onUpdate({ email: e.target.value })} />
        <Input label="Password" type="password" placeholder="Create a strong password" onChange={(e) => onUpdate({ password: e.target.value })} />
      </div>
      <p className="text-xs text-[var(--text-tertiary)] mt-4">
        By continuing you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
