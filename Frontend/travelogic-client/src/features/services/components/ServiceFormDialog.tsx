import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { ServiceDto, SupplierDto } from '../../../shared/types/models'
import {
  serviceFormSchema,
  serviceUpdateFormSchema,
  type ServiceFormValues,
  type ServiceUpdateFormValues,
} from '../serviceSchema'

interface ServiceFormDialogProps {
  open: boolean
  service?: ServiceDto | null
  suppliers: SupplierDto[]
  defaultSupplierId?: number
  loading?: boolean
  onClose: () => void
  onCreate: (values: ServiceFormValues) => void
  onUpdate: (values: ServiceUpdateFormValues) => void
}

export function ServiceFormDialog({
  open,
  service,
  suppliers,
  defaultSupplierId,
  loading,
  onClose,
  onCreate,
  onUpdate,
}: ServiceFormDialogProps) {
  const isEdit = Boolean(service)

  const createForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: '',
      description: '',
      supplierId: defaultSupplierId ?? 0,
    },
  })

  const updateForm = useForm<ServiceUpdateFormValues>({
    resolver: zodResolver(serviceUpdateFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  useEffect(() => {
    if (!open) return
    if (service) {
      updateForm.reset({
        title: service.title,
        description: service.description,
      })
    } else {
      createForm.reset({
        title: '',
        description: '',
        supplierId: defaultSupplierId ?? suppliers[0]?.id ?? 0,
      })
    }
  }, [open, service, defaultSupplierId, suppliers, createForm, updateForm])

  const submitCreate = createForm.handleSubmit(onCreate)
  const submitUpdate = updateForm.handleSubmit(onUpdate)

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
      {isEdit ? (
        <form onSubmit={submitUpdate} noValidate>
          <DialogTitle>Edit service</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Title"
                fullWidth
                {...updateForm.register('title')}
                error={Boolean(updateForm.formState.errors.title)}
                helperText={updateForm.formState.errors.title?.message}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                {...updateForm.register('description')}
                error={Boolean(updateForm.formState.errors.description)}
                helperText={updateForm.formState.errors.description?.message}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" loading={loading}>
              Save changes
            </Button>
          </DialogActions>
        </form>
      ) : (
        <form onSubmit={submitCreate} noValidate>
          <DialogTitle>Create service</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Controller
                name="supplierId"
                control={createForm.control}
                render={({ field }) => (
                  <Autocomplete
                    options={suppliers}
                    value={suppliers.find((supplier) => supplier.id === field.value) ?? null}
                    onChange={(_event, supplierOption) =>
                      field.onChange(supplierOption?.id ?? 0)
                    }
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(a, b) => a.id === b.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Supplier"
                        error={Boolean(createForm.formState.errors.supplierId)}
                        helperText={createForm.formState.errors.supplierId?.message}
                      />
                    )}
                  />
                )}
              />
              <TextField
                label="Title"
                fullWidth
                {...createForm.register('title')}
                error={Boolean(createForm.formState.errors.title)}
                helperText={createForm.formState.errors.title?.message}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                {...createForm.register('description')}
                error={Boolean(createForm.formState.errors.description)}
                helperText={createForm.formState.errors.description?.message}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" loading={loading}>
              Create
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  )
}
