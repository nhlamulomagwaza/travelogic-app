import AddIcon from '@mui/icons-material/Add'
import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { filterServices } from '../features/services/filterServices'
import { ServiceFormDialog } from '../features/services/components/ServiceFormDialog'
import { ServicesTable } from '../features/services/components/ServicesTable'
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from '../features/services/servicesApi'
import type {
  ServiceFormValues,
  ServiceUpdateFormValues,
} from '../features/services/serviceSchema'
import { useGetSuppliersQuery } from '../features/suppliers/suppliersApi'
import { ConfirmDeleteDialog } from '../shared/components/ConfirmDeleteDialog'
import { PageHeader } from '../shared/components/PageHeader'
import { QueryState } from '../shared/components/QueryState'
import { SearchField } from '../shared/components/SearchField'
import { useSnackbarFeedback } from '../shared/hooks/useSnackbarFeedback'
import { normalizeSearchQuery } from '../shared/utils/search'
import type { ServiceDto } from '../shared/types/models'

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const supplierFilterParam = searchParams.get('supplierId')
  const supplierFilterId = supplierFilterParam ? Number(supplierFilterParam) : null

  const { data: services = [], isLoading, isError, error } = useGetServicesQuery()
  const { data: suppliers = [] } = useGetSuppliersQuery()

  const [createService, createState] = useCreateServiceMutation()
  const [updateService, updateState] = useUpdateServiceMutation()
  const [deleteService, deleteState] = useDeleteServiceMutation()
  const { showSuccess, showError } = useSnackbarFeedback()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceDto | null>(null)
  const [serviceToDelete, setServiceToDelete] = useState<ServiceDto | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const isSaving = createState.isLoading || updateState.isLoading

  const suppliersById = useMemo(
    () => new Map(suppliers.map((supplier) => [supplier.id, supplier])),
    [suppliers],
  )

  const filteredServices = useMemo(() => {
    const bySupplier = supplierFilterId
      ? services.filter((service) => service.supplierId === supplierFilterId)
      : services
    const bySearch = filterServices(bySupplier, searchQuery, suppliersById)
    return [...bySearch].sort((a, b) => a.title.localeCompare(b.title))
  }, [services, supplierFilterId, searchQuery, suppliersById])

  const hasSearch = normalizeSearchQuery(searchQuery).length > 0

  const selectedFilterSupplier =
    supplierFilterId != null
      ? suppliers.find((supplier) => supplier.id === supplierFilterId) ?? null
      : null

  const openCreate = () => {
    setSelectedService(null)
    setFormOpen(true)
  }

  const openEdit = (service: ServiceDto) => {
    setSelectedService(service)
    setFormOpen(true)
  }

  const closeForm = () => {
    if (isSaving) return
    setFormOpen(false)
    setSelectedService(null)
  }

  const handleCreate = async (values: ServiceFormValues) => {
    try {
      await createService(values).unwrap()
      showSuccess('Service created successfully.')
      setFormOpen(false)
      setSelectedService(null)
    } catch (submitError) {
      showError(submitError)
    }
  }

  const handleUpdate = async (values: ServiceUpdateFormValues) => {
    if (!selectedService) return
    try {
      await updateService({ id: selectedService.id, body: values }).unwrap()
      showSuccess('Service updated successfully.')
      setFormOpen(false)
      setSelectedService(null)
    } catch (submitError) {
      showError(submitError)
    }
  }

  const handleDelete = async () => {
    if (!serviceToDelete) return
    try {
      await deleteService(serviceToDelete.id).unwrap()
      showSuccess('Service deleted successfully.')
      setServiceToDelete(null)
    } catch (deleteError) {
      showError(deleteError)
    }
  }

  return (
    <>
      <PageHeader
        title="Manage services"
        subtitle="Create and maintain services offered by each supplier."
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
            disabled={suppliers.length === 0}
          >
            Add service
          </Button>
        }
      />

      <Stack spacing={2} sx={{ mb: 3 }}>
        <SearchField
          value={searchQuery}
          onValueChange={setSearchQuery}
          label="Search services"
          placeholder="Title, description, supplier name…"
          fullWidth
          sx={{ maxWidth: 480 }}
        />
        <Autocomplete
          options={suppliers}
          value={selectedFilterSupplier}
          onChange={(_event, supplier) => {
            if (supplier) {
              setSearchParams({ supplierId: String(supplier.id) })
            } else {
              setSearchParams({})
            }
          }}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          renderInput={(params) => (
            <TextField {...params} label="Filter by supplier" placeholder="All suppliers" />
          )}
          sx={{ maxWidth: 420 }}
        />
      </Stack>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={filteredServices.length === 0}
        emptyMessage={
          suppliers.length === 0
            ? 'Add a supplier before creating services.'
            : hasSearch || supplierFilterId != null
              ? 'No services match your search or filter.'
              : 'No services yet. Click “Add service” to create one.'
        }
      >
        <ServicesTable
          services={filteredServices}
          suppliersById={suppliersById}
          onEdit={openEdit}
          onDelete={setServiceToDelete}
        />
      </QueryState>

      <ServiceFormDialog
        open={formOpen}
        service={selectedService}
        suppliers={suppliers}
        defaultSupplierId={supplierFilterId ?? undefined}
        loading={isSaving}
        onClose={closeForm}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <ConfirmDeleteDialog
        open={Boolean(serviceToDelete)}
        title="Delete service?"
        description={`This will permanently remove “${serviceToDelete?.title ?? ''}”.`}
        loading={deleteState.isLoading}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
