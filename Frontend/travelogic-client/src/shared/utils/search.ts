export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase()
}

export function matchesSearch(haystack: string, query: string): boolean {
  const normalized = normalizeSearchQuery(query)
  if (!normalized) return true
  return haystack.toLowerCase().includes(normalized)
}

export function matchesAnySearch(values: string[], query: string): boolean {
  const normalized = normalizeSearchQuery(query)
  if (!normalized) return true
  return values.some((value) => value.toLowerCase().includes(normalized))
}
