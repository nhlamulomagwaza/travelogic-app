import { matchesAnySearch } from '../../shared/utils/search'
import type { ServiceDto, SupplierDto } from '../../shared/types/models'

export function filterServices(
  services: ServiceDto[],
  query: string,
  suppliersById: Map<number, SupplierDto>,
): ServiceDto[] {
  return services.filter((service) => {
    const supplierName = suppliersById.get(service.supplierId)?.name ?? ''
    return matchesAnySearch(
      [service.title, service.description, supplierName],
      query,
    )
  })
}
