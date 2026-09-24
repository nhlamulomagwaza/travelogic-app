import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { getApiErrorMessage } from '../utils/apiError'

interface QueryStateProps {
  isLoading: boolean
  isError: boolean
  error?: unknown
  isEmpty?: boolean
  emptyMessage?: string
  children: ReactNode
}

export function QueryState({
  isLoading,
  isError,
  error,
  isEmpty,
  emptyMessage = 'No records found.',
  children,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <Stack sx={{ py: 8, alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading…
        </Typography>
      </Stack>
    )
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {getApiErrorMessage(error)}
      </Alert>
    )
  }

  if (isEmpty) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    )
  }

  return <>{children}</>
}
