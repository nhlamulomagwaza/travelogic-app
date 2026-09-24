import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SupplierFormDialog } from '../features/suppliers/components/SupplierFormDialog'
import { filterSuppliers } from '../features/suppliers/filterSuppliers'
import { useGetSuppliersQuery } from '../features/suppliers/suppliersApi'
import { useSupplierEditor } from '../features/suppliers/useSupplierEditor'
import { getCountryLabel } from '../shared/constants/countries'
import { PageHeader } from '../shared/components/PageHeader'
import { QueryState } from '../shared/components/QueryState'
import { SearchField } from '../shared/components/SearchField'
import { normalizeSearchQuery } from '../shared/utils/search'

export function HomePage() {
  const { data: suppliers = [], isLoading, isError, error } = useGetSuppliersQuery()
  const { formOpen, selectedSupplier, isSaving, openEdit, closeForm, handleSubmit } =
    useSupplierEditor()
  const [searchQuery, setSearchQuery] = useState('')

  const visibleSuppliers = useMemo(
    () => filterSuppliers(suppliers, searchQuery),
    [suppliers, searchQuery],
  )

  const hasSearch = normalizeSearchQuery(searchQuery).length > 0

  return (
    <>
      <PageHeader
        title="Suppliers"
        subtitle="Browse travel suppliers and their services at a glance."
        action={
          <Button component={RouterLink} to="/suppliers" variant="contained">
            Manage suppliers
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
            : 'No suppliers yet. Create your first supplier to get started.'
        }
      >
        <Grid container spacing={2}>
          {visibleSuppliers.map((supplier) => (
            <Grid key={supplier.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                  >
                    <Typography variant="h6" component="h2">
                      {supplier.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={`${supplier.services?.length ?? 0} services`}
                      color="primary"
                      variant="outlined"
                    />
                  </Stack>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <LocationOnOutlinedIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {getCountryLabel(supplier.country)} · {supplier.address}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <PhoneOutlinedIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {supplier.phoneNumber}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/services?supplierId=${supplier.id}`}
                  >
                    View services
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button size="small" onClick={() => openEdit(supplier)}>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </QueryState>

      <SupplierFormDialog
        open={formOpen}
        supplier={selectedSupplier}
        loading={isSaving}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />
    </>
  )
}
