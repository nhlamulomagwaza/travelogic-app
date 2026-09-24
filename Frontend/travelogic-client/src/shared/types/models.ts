//These types mimick our backend entities

export interface ServiceDto {
  id: number
  title: string
  description: string
  supplierId: number
}

export interface SupplierDto {
  id: number
  name: string
  address: string
  country: number
  website: string
  phoneNumber: string
  services: ServiceDto[]
}

export interface CreateSupplierDto {
  name: string
  address: string
  website: string
  phoneNumber: string
  country: number
}

export type UpdateSupplierDto = CreateSupplierDto

export interface CreateServiceDto {
  title: string
  description: string
  supplierId: number
}

export interface UpdateServiceDto {
  title: string
  description: string
}

export interface ApiProblemDetails {
  title?: string
  detail?: string
  status?: number
}
