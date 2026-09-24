import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { ApiProblemDetails } from '../types/models'

export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (!error || typeof error !== 'object') {
    return fallback
  }

  const fetchError = error as FetchBaseQueryError
  if ('status' in fetchError) {
    if (fetchError.status === 'FETCH_ERROR') {
      return 'Unable to reach the server. Is the API running?'
    }
    if (fetchError.status === 'PARSING_ERROR') {
      return 'Unexpected response from the server.'
    }
    const data = fetchError.data
    if (data && typeof data === 'object') {
      const problem = data as ApiProblemDetails
      if (problem.detail) return problem.detail
      if (problem.title) return problem.title
    }
    if (typeof fetchError.status === 'number') {
      return `Request failed (${fetchError.status}).`
    }
  }

  return fallback
}
