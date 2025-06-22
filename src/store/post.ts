import apiSlice from './api-slice'
import { endpoints, HttpMethods } from '../config'

import { PostProps, PostKoremProps } from '../../types'

interface Response {
  data: PostProps[]
  limit: number
  skip: number
}

interface Rep {
  data: PostKoremProps[]
  limit: number
  skip: number
}

type PostCreationProps = PostProps & { postImage: string[] }
type CommentType = Partial<PostProps> & { postId: number }
const _toFormData = (values: Partial<PostCreationProps>): FormData => {
  const formData = new FormData()
  formData.append('postText', values.postText || '')
  formData.append('privacyType', values?.privacyType || 'public')
  if (values?.postImage?.length) {
    values.postImage.forEach((uri) => {
      const filename = uri.split('/').pop() || 'postImage.jpg'
      const mimeType = filename.endsWith('.png')
        ? 'image/png'
        : filename.endsWith('.gif')
        ? 'image/gif'
        : 'image/jpeg'
      const imageBlob = {
        uri,
        type: mimeType,
        name: filename,
      } as any
      formData.append('postImage', imageBlob)
    })
  }
  return formData
}
// type Post = Response<PostProps>;

interface FetchPostsParams {
  postId?: string | number
  $limit?: number
  $skip?: number
  $sort?: Record<string, 1 | -1>
}

const post = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<Response, FetchPostsParams | void>({
      query: (params) => {
        const baseUrl = `${endpoints.POSTS}`
        const queryParams = new URLSearchParams()

        if (params?.postId) {
          queryParams.append('postId', params.postId.toString())
        }
        if (params?.$sort) {
          Object.entries(params.$sort).forEach(([key, value]) => {
            queryParams.append(`$sort[${key}]`, value.toString())
          })
        } else {
          queryParams.append('$sort[createdAt]', '-1')
        }
        if (params?.$limit) {
          queryParams.append('$limit', params.$limit.toString())
        }
        if (params?.$skip) {
          queryParams.append('$skip', params.$skip.toString())
        }

        return `${baseUrl}?${queryParams.toString()}`
      },
      providesTags: (result, error, params) => {
        if (!result) return [{ type: 'Post' as const, id: 'LIST' }]
        return [
          { type: 'Post' as const, id: 'LIST' },
          ...result.data.map((post) => ({
            type: 'Post' as const,
            id: post.id.toString(),
          })),
        ]
      },
    }),

    createComment: build.mutation<PostProps, CommentType>({
      query: (data) => ({
        url: endpoints.COMMENTS,
        method: HttpMethods.POST,
        body: data,
      }),
      async onQueryStarted(comment, { dispatch, queryFulfilled }) {
        try {
          const { data: newComment } = await queryFulfilled
          // Update the comments list for this post
          dispatch(
            post.util.updateQueryData(
              'fetchPosts',
              { postId: comment.postId },
              (draft) => {
                // Insert the new comment at the top of the 'data' array
                draft.data.unshift(newComment)
              }
            )
          )
          // Invalidate both the single post and the post in the timeline
          dispatch(
            apiSlice.util.invalidateTags([
              { type: 'Post' as const, id: comment.postId },
              { type: 'Post' as const, id: 'LIST' },
            ])
          )
        } catch (error) {
          console.error('Create comment failed:', error)
        }
      },
    }),
    createPost: build.mutation<PostProps, Partial<PostCreationProps>>({
      query: (values) => {
        const formData = _toFormData(values)
        return {
          url: endpoints.POSTS,
          method: HttpMethods.POST,
          body: formData,
          prepareHeaders: (headers: Headers) => {
            headers.set('Content-Type', 'multipart/form-data')
            console.log('Headers set:', headers)
            return headers
          },
        }
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: newPost } = await queryFulfilled
          dispatch(
            post.util.updateQueryData('fetchPosts', undefined, (draft) => {
              // Insert the new post at the top of the 'data' array
              draft.data.unshift(newPost)
            })
          )
        } catch (error) {
          console.error('Create post failed:', error)
        }
      },
    }),

    updatePost: build.mutation<
      PostProps,
      { id: string | number; data: Partial<PostProps> }
    >({
      query: ({ id, data }) => ({
        url: `${endpoints.POSTS}/${id.toString()}`,
        method: HttpMethods.PATCH,
        body: data,
      }),
    }),

    fetchPost: build.query<PostProps, string | number>({
      query: (id) => ({
        url: `${endpoints.POSTS}/${id.toString()}`,
        method: HttpMethods.GET,
      }),
      providesTags: (result, error, id) => [{ type: 'Post' as const, id }],
    }),

    fetchLikes: build.query<Rep, string | number>({
      query: (id) => ({
        url: `${endpoints.POSTS}/${id}/kore`,
        method: HttpMethods.GET,
      }),
    }),
    toggleKore: build.mutation<PostProps, string>({
      query: (id) => ({
        url: `${endpoints.POSTS}/${id}/kore`,
        body: {
          entityId: id,
          entityType: 'Post',
        },
        method: HttpMethods.POST,
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled
          // Update posts list cache
          dispatch(
            post.util.updateQueryData('fetchPosts', undefined, (draft) => {
              const postIndex = draft.data.findIndex(
                (post) => post.id.toString() === postId
              )
              if (postIndex !== -1) {
                draft.data[postIndex] = updatedPost
              }
            })
          )
          // Invalidate the single post query
          dispatch(
            apiSlice.util.invalidateTags([
              { type: 'Post' as const, id: postId },
            ])
          )
        } catch (error) {
          console.error('Toggle kore failed:', error)
        }
      },
    }),
  }),
})

const {
  useFetchPostsQuery,
  useCreatePostMutation,
  useFetchLikesQuery,
  useUpdatePostMutation,
  useCreateCommentMutation,
  useToggleKoreMutation,
  useFetchPostQuery,
} = post

export {
  useFetchPostsQuery,
  useCreatePostMutation,
  useFetchLikesQuery,
  useUpdatePostMutation,
  useCreateCommentMutation,
  useToggleKoreMutation,
  useFetchPostQuery,
}
