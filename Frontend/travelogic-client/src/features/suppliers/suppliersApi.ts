import { baseApi } from '../../shared/api/baseApi'
import type {
  CreateSupplierDto,
  SupplierDto,
  UpdateSupplierDto,
} from '../../shared/types/models'

export const suppliersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSuppliers: build.query<SupplierDto[], void>({
      query: () => '/suppliers',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Supplier' as const, id })),
              { type: 'Supplier', id: 'LIST' },
            ]
          : [{ type: 'Supplier', id: 'LIST' }],
    }),
    getSupplierById: build.query<SupplierDto, number>({
      query: (id) => `/suppliers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Supplier', id }],
    }),
    createSupplier: build.mutation<SupplierDto, CreateSupplierDto>({
      query: (body) => ({
        url: '/suppliers',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Supplier', id: 'LIST' }],
    }),
    updateSupplier: build.mutation<void, { id: number; body: UpdateSupplierDto }>({
      query: ({ id, body }) => ({
        url: `/suppliers/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Supplier', id },
        { type: 'Supplier', id: 'LIST' },
        { type: 'Service', id: 'LIST' },
      ],
    }),
    deleteSupplier: build.mutation<void, number>({
      query: (id) => ({
        url: `/suppliers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Supplier', id },
        { type: 'Supplier', id: 'LIST' },
        { type: 'Service', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi
