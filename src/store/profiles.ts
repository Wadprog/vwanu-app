import apiSlice from './api-slice'
import { Profile } from '../../types'
import { endpoints, HttpMethods } from '../config'

interface UpdateProfile extends Partial<Profile> {
  [key: string]: any
}

const Profiles = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchProfiles: build.query<Profile[], void>({
      query: () => ({
        url: endpoints.USERS,
        method: HttpMethods.GET,
      }),
      providesTags: ['Profile'],
    }),
    fetchProfile: build.query<Profile, string>({
      query: (profileId) => ({
        url: `${endpoints.USERS}/${profileId}`,
        method: HttpMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: 'Profile', id }],
    }),
    updateProfile: build.mutation<Profile, { id: string; data: UpdateProfile }>(
      {
        query: ({ id, data }) => ({
          url: `${endpoints.USERS}/${id}`,
          method: HttpMethods.PATCH,
          body: data,
        }),
        invalidatesTags: ['Profile'],
      }
    ),
  }),
})

const {
  useFetchProfilesQuery,
  useFetchProfileQuery,
  useUpdateProfileMutation,
} = Profiles

export { useFetchProfilesQuery, useFetchProfileQuery, useUpdateProfileMutation }

export default Profiles.reducer
