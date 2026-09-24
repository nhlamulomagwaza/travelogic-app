import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { filterSuppliers } from '../features/suppliers/filterSuppliers'
import { SupplierFormDialog } from '../features/suppliers/components/SupplierFormDialog'
import { SuppliersTable } from '../features/suppliers/components/SuppliersTable'
import { useDeleteSupplierMutation, useGetSuppliersQuery } from '../features/suppliers/suppliersApi'
import { useSupplierEditor } from '../features/suppliers/useSupplierEditor'
import { ConfirmDeleteDialog } from '../shared/components/ConfirmDeleteDialog'
import { PageHeader } from '../shared/components/PageHeader'
import { QueryState } from '../shared/components/QueryState'
import { SearchField } from '../shared/components/SearchField'
import { normalizeSearchQuery } from '../shared/utils/search'
import { useSnackbarFeedback } from '../shared/hooks/useSnackbarFeedback'
import type { SupplierDto } from '../shared/types/models'

export function SuppliersPage() {
  const { data: suppliers = [], isLoading, isError, error } = useGetSuppliersQuery()
  const [deleteSupplier, deleteState] = useDeleteSupplierMutation()
  const { showSuccess, showError } = useSnackbarFeedback()
  const {
    formOpen,
    selectedSupplier,
    isSaving,
    openCreate,
    openEdit,
    closeForm,
    handleSubmit,
  } = useSupplierEditor()

  const [supplierToDelete, setSupplierToDelete] = useState<SupplierDto | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const sortedSuppliers = useMemo(
    () => [...suppliers].sort((a, b) => a.name.localeCompare(b.name)),
    [suppliers],
  )

  const visibleSuppliers = useMemo(
    () => filterSuppliers(sortedSuppliers, searchQuery),
    [sortedSuppliers, searchQuery],
  )

  const hasSearch = normalizeSearchQuery(searchQuery).length > 0

  const handleDelete = async () => {
    if (!supplierToDelete) return
    try {
      await deleteSupplier(supplierToDelete.id).unwrap()
      showSuccess('Supplier deleted successfully.')
      setSupplierToDelete(null)
    } catch (deleteError) {
      showError(deleteError)
    }
  }

  return (
    <>
      <PageHeader
        title="Manage suppliers"
        subtitle="Create, update, or remove suppliers from the catalog."
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add supplier
          </Button>
        }
      />

      <Stack spacing={2} sx={{ mb: 3 }}>
        <SearchField
          value={searchQuery}
          onValueChange={setSearchQuery}
          label="Search suppliers"
          placeholder="Name, country, address, phone, website…"
          fullWidth
          sx={{ maxWidth: 480 }}
        />
      </Stack>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={visibleSuppliers.length === 0}
        emptyMessage={
          hasSearch
            ? 'No suppliers match your search.'
            : 'No suppliers yet. Click “Add supplier” to create one.'
        }
      >
        <SuppliersTable
          suppliers={visibleSuppliers}
          onEdit={openEdit}
          onDelete={setSupplierToDelete}
        />
      </QueryState>

      <SupplierFormDialog
        open={formOpen}
        supplier={selectedSupplier}
        loading={isSaving}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteDialog
        open={Boolean(supplierToDelete)}
        title="Delete supplier?"
        description={`This will remove “${supplierToDelete?.name ?? ''}” and its linked services.`}
        loading={deleteState.isLoading}
        onClose={() => setSupplierToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
