import { useSnackbar } from 'notistack'
import { useCallback } from 'react'
import { getApiErrorMessage } from '../utils/apiError'

export function useSnackbarFeedback() {
  const { enqueueSnackbar } = useSnackbar()

  const showSuccess = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: 'success' })
    },
    [enqueueSnackbar],
  )

  const showError = useCallback(
    (error: unknown, fallback?: string) => {
      enqueueSnackbar(getApiErrorMessage(error, fallback), { variant: 'error' })
    },
    [enqueueSnackbar],
  )

  return { showSuccess, showError }
}
