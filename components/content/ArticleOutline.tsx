import { OutlineSection } from '@/types/content'
import { ChevronRight } from 'lucide-react'

interface ArticleOutlineProps {
  outline: OutlineSection[]
}

export function ArticleOutline({ outline }: ArticleOutlineProps) {
  return (
    <div className="flex flex-col gap-3">
      {outline.map((section, i) => (
        <div key={i}>
          <p className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent-bg)] w-5 h-5 rounded-md flex items-center justify-center">
              {i + 1}
            </span>
            {section.heading}
          </p>
          <ul className="mt-1.5 flex flex-col gap-1 pl-7">
            {section.points.map((pt, j) => (
              <li key={j} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                <ChevronRight size={11} className="mt-0.5 shrink-0 text-[var(--text-tertiary)]" />
                {pt}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
