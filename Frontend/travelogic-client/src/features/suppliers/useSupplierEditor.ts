import { useState } from 'react'
import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from './suppliersApi'
import type { SupplierFormValues } from './supplierSchema'
import { useSnackbarFeedback } from '../../shared/hooks/useSnackbarFeedback'
import type { SupplierDto } from '../../shared/types/models'

export function useSupplierEditor() {
  const [formOpen, setFormOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDto | null>(null)

  const [createSupplier, createState] = useCreateSupplierMutation()
  const [updateSupplier, updateState] = useUpdateSupplierMutation()
  const { showSuccess, showError } = useSnackbarFeedback()

  const isSaving = createState.isLoading || updateState.isLoading

  const openCreate = () => {
    setSelectedSupplier(null)
    setFormOpen(true)
  }

  const openEdit = (supplier: SupplierDto) => {
    setSelectedSupplier(supplier)
    setFormOpen(true)
  }

  const closeForm = () => {
    if (isSaving) return
    setFormOpen(false)
    setSelectedSupplier(null)
  }

  const handleSubmit = async (values: SupplierFormValues) => {
    try {
      if (selectedSupplier) {
        await updateSupplier({ id: selectedSupplier.id, body: values }).unwrap()
        showSuccess('Supplier updated successfully.')
      } else {
        await createSupplier(values).unwrap()
        showSuccess('Supplier created successfully.')
      }
      setFormOpen(false)
      setSelectedSupplier(null)
    } catch (submitError) {
      showError(submitError)
    }
  }

  return {
    formOpen,
    selectedSupplier,
    isSaving,
    openCreate,
    openEdit,
    closeForm,
    handleSubmit,
  }
}
