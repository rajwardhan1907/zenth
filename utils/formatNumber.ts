export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

export function formatCurrency(amount: number, currency = '₹'): string {
  return `${currency}${amount.toLocaleString('en-IN')}`
}
