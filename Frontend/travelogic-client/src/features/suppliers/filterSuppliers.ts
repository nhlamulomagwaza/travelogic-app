import { getCountryLabel } from '../../shared/constants/countries'
import { matchesAnySearch } from '../../shared/utils/search'
import type { SupplierDto } from '../../shared/types/models'

export function filterSuppliers(suppliers: SupplierDto[], query: string): SupplierDto[] {
  return suppliers.filter((supplier) =>
    matchesAnySearch(
      [
        supplier.name,
        supplier.address,
        supplier.website,
        supplier.phoneNumber,
        getCountryLabel(supplier.country),
      ],
      query,
    ),
  )
}
