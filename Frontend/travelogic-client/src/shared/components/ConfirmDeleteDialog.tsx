import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

interface ConfirmDeleteDialogProps {
  open: boolean
  title: string
  description: string
  loading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmDeleteDialog({
  open,
  title,
  description,
  loading,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
