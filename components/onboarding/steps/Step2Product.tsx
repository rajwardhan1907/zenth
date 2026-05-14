import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface StepProps {
  onUpdate: (data: Record<string, unknown>) => void
}

const categories = ['SaaS / Software', 'E-commerce', 'Fintech', 'Healthcare', 'Education', 'Agency', 'Blog / Media', 'Other']

export function Step2Product({ onUpdate }: StepProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Describe your product</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">The more context you give, the smarter the agent&apos;s keyword and content strategy will be.</p>
      <div className="flex flex-col gap-4">
        <Input label="Product / Company name" placeholder="e.g. ClearTax" onChange={(e) => onUpdate({ productName: e.target.value })} />
        <Textarea
          label="What does your product do?"
          placeholder="We help small businesses file GST returns, manage invoices, and handle TDS compliance in India."
          rows={3}
          onChange={(e) => onUpdate({ description: e.target.value })}
        />
        <div>
          <label className="text-sm font-medium text-[var(--text-primary)] block mb-2">Industry / Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onUpdate({ category: cat })}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all duration-150"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <Input label="Target audience" placeholder="e.g. Indian SMBs, CA firms, freelance accountants" onChange={(e) => onUpdate({ audience: e.target.value })} />
      </div>
    </div>
  )
}
