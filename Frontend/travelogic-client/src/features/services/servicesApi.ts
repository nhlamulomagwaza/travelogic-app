import { baseApi } from '../../shared/api/baseApi'
import type {
  CreateServiceDto,
  ServiceDto,
  UpdateServiceDto,
} from '../../shared/types/models'

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<ServiceDto[], void>({
      query: () => '/services',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Service' as const, id })),
              { type: 'Service', id: 'LIST' },
            ]
          : [{ type: 'Service', id: 'LIST' }],
    }),
    getServiceById: build.query<ServiceDto, number>({
      query: (id) => `/services/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Service', id }],
    }),
    createService: build.mutation<ServiceDto, CreateServiceDto>({
      query: (body) => ({
        url: '/services',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Service', id: 'LIST' },
        { type: 'Supplier', id: 'LIST' },
      ],
    }),
    updateService: build.mutation<void, { id: number; body: UpdateServiceDto }>({
      query: ({ id, body }) => ({
        url: `/services/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Service', id },
        { type: 'Service', id: 'LIST' },
        { type: 'Supplier', id: 'LIST' },
      ],
    }),
    deleteService: build.mutation<void, number>({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Service', id },
        { type: 'Service', id: 'LIST' },
        { type: 'Supplier', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi
