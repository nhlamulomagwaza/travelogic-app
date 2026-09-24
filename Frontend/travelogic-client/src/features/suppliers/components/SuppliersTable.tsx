import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import {
  IconButton,
  Link as MuiLink,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  Chip,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { getCountryLabel } from '../../../shared/constants/countries'
import type { SupplierDto } from '../../../shared/types/models'

interface SuppliersTableProps {
  suppliers: SupplierDto[]
  onEdit: (supplier: SupplierDto) => void
  onDelete: (supplier: SupplierDto) => void
}

export function SuppliersTable({ suppliers, onEdit, onDelete }: SuppliersTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell align="center">Services</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id} hover>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{getCountryLabel(supplier.country)}</TableCell>
              <TableCell>{supplier.phoneNumber}</TableCell>
              <TableCell sx={{ maxWidth: 280 }}>
                <Tooltip title={supplier.website}>
                  <MuiLink
                    href={supplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {supplier.website}
                  </MuiLink>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Chip
                  size="small"
                  label={supplier.services?.length ?? 0}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                  <Tooltip title="Manage services">
                    <IconButton
                      component={RouterLink}
                      to={`/services?supplierId=${supplier.id}`}
                      size="small"
                      aria-label={`Services for ${supplier.name}`}
                    >
                      <OpenInNewOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(supplier)} aria-label="Edit">
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(supplier)}
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
