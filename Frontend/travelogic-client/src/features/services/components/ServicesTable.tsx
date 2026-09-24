import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import type { ServiceDto, SupplierDto } from '../../../shared/types/models'

interface ServicesTableProps {
  services: ServiceDto[]
  suppliersById: Map<number, SupplierDto>
  onEdit: (service: ServiceDto) => void
  onDelete: (service: ServiceDto) => void
}

export function ServicesTable({
  services,
  suppliersById,
  onEdit,
  onDelete,
}: ServicesTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id} hover>
              <TableCell>{service.title}</TableCell>
              <TableCell sx={{ maxWidth: 360 }}>{service.description}</TableCell>
              <TableCell>
                {suppliersById.get(service.supplierId)?.name ?? `Supplier #${service.supplierId}`}
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(service)} aria-label="Edit">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(service)}
                      aria-label="Delete"
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
