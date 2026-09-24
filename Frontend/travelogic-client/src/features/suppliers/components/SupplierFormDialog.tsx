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
import { COUNTRY_OPTIONS } from '../../../shared/constants/countries'
import type { SupplierDto } from '../../../shared/types/models'
import { supplierFormSchema, type SupplierFormValues } from '../supplierSchema'

const defaultValues: SupplierFormValues = {
  name: '',
  address: '',
  website: '',
  phoneNumber: '',
  country: 161,
}

interface SupplierFormDialogProps {
  open: boolean
  supplier?: SupplierDto | null
  loading?: boolean
  onClose: () => void
  onSubmit: (values: SupplierFormValues) => void
}

export function SupplierFormDialog({
  open,
  supplier,
  loading,
  onClose,
  onSubmit,
}: SupplierFormDialogProps) {
  const isEdit = Boolean(supplier)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (!open) return
    if (supplier) {
      reset({
        name: supplier.name,
        address: supplier.address,
        website: supplier.website,
        phoneNumber: supplier.phoneNumber,
        country: supplier.country,
      })
    } else {
      reset(defaultValues)
    }
  }, [open, supplier, reset])

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>{isEdit ? 'Edit supplier' : 'Create supplier'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              {...register('name')}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <TextField
              label="Address"
              fullWidth
              multiline
              minRows={2}
              {...register('address')}
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />
            <TextField
              label="Website"
              fullWidth
              placeholder="https://travelogic.co.za"
              {...register('website')}
              error={Boolean(errors.website)}
              helperText={errors.website?.message}
            />
            <TextField
              label="Phone number"
              fullWidth
              {...register('phoneNumber')}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={COUNTRY_OPTIONS}
                  value={COUNTRY_OPTIONS.find((option) => option.value === field.value) ?? null}
                  onChange={(_event, option) => field.onChange(option?.value ?? 0)}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(a, b) => a.value === b.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      error={Boolean(errors.country)}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" loading={loading}>
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
