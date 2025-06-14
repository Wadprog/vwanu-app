import apiSlice from './api-slice'
import { User } from '../../types'
import { endpoints, HttpMethods } from '../config'

interface Profiles extends User {
  id: 'string'
}

interface UpdateProfile extends Partial<Profiles> {
  [key: string]: any
}

const Profiles = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchProfiles: build.query<Profiles[], void>({
      query: () => ({
        url: endpoints.USERS,
        method: HttpMethods.GET,
      }),
      providesTags: ['Profile'],
    }),
    fetchProfile: build.query<Profiles, string>({
      query: (profileId) => ({
        url: `${endpoints.USERS}/${profileId}`,
        method: HttpMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: 'Profile', id }],
    }),
    updateProfile: build.mutation<
      Profiles,
      { id: string; data: UpdateProfile }
    >({
      query: ({ id, data }) => ({
        url: `${endpoints.USERS}/${id}`,
        method: HttpMethods.PATCH,
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

const {
  useFetchProfilesQuery,
  useFetchProfileQuery,
  useUpdateProfileMutation,
} = Profiles

export { useFetchProfilesQuery, useFetchProfileQuery, useUpdateProfileMutation }

export default Profiles.reducer
