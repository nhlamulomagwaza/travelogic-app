import { configureStore } from '@reduxjs/toolkit'
import '../features/services/servicesApi'
import '../features/suppliers/suppliersApi'
import { baseApi } from '../shared/api/baseApi'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
