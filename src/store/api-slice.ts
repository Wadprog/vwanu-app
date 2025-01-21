import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './index'

import env from '../config/environnement'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authentication.token

      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default apiSlice
