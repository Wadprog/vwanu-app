import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './index'

import env from '../config/environnement'

const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      const idToken = (getState() as RootState).auth.idToken
      console.log('[idToken]', idToken)
      if (token && idToken) {
        headers.set('authorization', `Bearer ${token}`)
        headers.set('x-id-token', idToken)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default apiSlice
