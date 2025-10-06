import apiSlice from './api-slice'
import { CommunityInterface, CommunityPrivacyType, User } from '../../types'
import { HttpMethods } from '../config'

// Types for the community API
interface Interest {
  id: number
  name: string
}

interface CreateCommunityRequest {
  name: string
  description: string
  coverPicture?: string
  interests: Interest[]
  privacyType: CommunityPrivacyType
  requireApproval: boolean
}

interface CreateCommunityResponse {
  id: number
  name: string
  description: string
  coverPicture?: string
  interests: Interest[]
  privacyType: CommunityPrivacyType
  requireApproval: boolean
  memberCount: number
  createdAt: string
  updatedAt: string
}

interface FetchCommunitiesResponse {
  data: CommunityInterface[]
  total: number
  page: number
  limit: number
}

interface FetchCommunitiesParams {
  page?: number
  limit?: number
  search?: string
  interestId?: string
  userId?: string
}

interface Member extends User {
  role: 'admin' | 'moderator' | 'member'
}

interface FetchCommunityMembersResponse {
  data: Member[]
  total: number
  page: number
  limit: number
}

type CommunityCreationProps = CreateCommunityRequest & { coverPicture?: string }

const _toFormData = (values: Partial<CommunityCreationProps>): FormData => {
  const formData = new FormData()
  formData.append('name', values.name || '')
  formData.append('description', values.description || '')
  formData.append('privacyType', values.privacyType || 'public')

  if (values.interests) {
    values.interests.forEach((interest) => {
      formData.append('interests', interest.toString())
    })
  }

  if (values.coverPicture) {
    const filename = values.coverPicture.split('/').pop() || 'coverPicture.jpg'
    let mimeType = 'image/jpeg' // default

    // Determine mime type based on file extension
    if (filename.endsWith('.png')) {
      mimeType = 'image/png'
    } else if (filename.endsWith('.gif')) {
      mimeType = 'image/gif'
    } else if (filename.endsWith('.webp')) {
      mimeType = 'image/webp'
    }

    const imageBlob = {
      uri: values.coverPicture,
      type: mimeType,
      name: filename,
    } as any
    formData.append('coverPicture', imageBlob)
  }
  console.log('🚀 formData:', formData)
  return formData
}

// Community API endpoints
export const communitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new community
    createCommunity: builder.mutation<
      CreateCommunityResponse,
      Partial<CommunityCreationProps>
    >({
      query: (communityData) => {
        const formData = _toFormData(communityData)
        return {
          url: '/communities',
          method: HttpMethods.POST,
          body: formData,
          prepareHeaders: (headers: Headers) => {
            headers.set('Content-Type', 'multipart/form-data')
            return headers
          },
        }
      },
      invalidatesTags: ['Community'],
    }),

    // Fetch communities with optional filters
    fetchCommunities: builder.query<
      FetchCommunitiesResponse,
      FetchCommunitiesParams
    >({
      query: ({ page = 1, limit = 10, search, interestId, userId } = {}) => {
        const params: Record<string, string> = {}

        // Add pagination params
        // params.page = page.toString()
        // params.limit = limit.toString()

        // Add search param if provided
        if (search && search.trim()) {
          params.name = search.trim()
        }

        // Add interest filter if provided
        if (interestId) {
          params.interests = interestId
        }

        // Add userId filter if provided (for "my communities")
        if (userId) {
          params.userId = userId
        }

        return {
          url: '/communities',
          params,
        }
      },
      providesTags: ['Community'],
    }),

    // Fetch single community (for future use)
    fetchCommunity: builder.query<CommunityInterface, string>({
      query: (id) => `/communities/${id}`,
      providesTags: (result, error, id) => [{ type: 'Community', id }],
    }),

    // Update community (for future use)
    updateCommunity: builder.mutation<
      CreateCommunityResponse,
      { id: number; data: Partial<CreateCommunityRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/communities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Community', id }],
    }),

    // Delete community (for future use)
    deleteCommunity: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/communities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Community', id }],
    }),

    // Join community (for future use)
    joinCommunity: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/communities/${id}/join`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Community', id }],
    }),

    // Leave community (for future use)
    leaveCommunity: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/communities/${id}/leave`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Community', id }],
    }),
    fetchCommunityMembers: builder.query<FetchCommunityMembersResponse, string>(
      {
        query: (id) => ({
          url: `/community_users?communityId=${id}`,
          method: 'GET',
        }),
        providesTags: (result, error, id) => [{ type: 'Community', id }],
      }
    ),
  }),
})

// Export hooks for usage in functional components
export const {
  useCreateCommunityMutation,
  useFetchCommunitiesQuery,
  useFetchCommunityQuery,
  useUpdateCommunityMutation,
  useDeleteCommunityMutation,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
  useFetchCommunityMembersQuery,
} = communitiesApiSlice

export default communitiesApiSlice
