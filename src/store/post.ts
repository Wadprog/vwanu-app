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
      const filename = uri.split('/').pop() || 'postMedia.jpg'
      let mimeType = 'image/jpeg' // default

      // Determine mime type based on file extension
      if (filename.endsWith('.png')) {
        mimeType = 'image/png'
      } else if (filename.endsWith('.gif')) {
        mimeType = 'image/gif'
      } else if (filename.endsWith('.mp4')) {
        mimeType = 'video/mp4'
      } else if (filename.endsWith('.mov')) {
        mimeType = 'video/quicktime'
      } else if (filename.endsWith('.avi')) {
        mimeType = 'video/x-msvideo'
      } else if (filename.endsWith('.webm')) {
        mimeType = 'video/webm'
      } else if (uri.includes('video')) {
        mimeType = 'video/mp4' // fallback for video
      }

      const mediaBlob = {
        uri,
        type: mimeType,
        name: filename,
      } as any
      formData.append('postImage', mediaBlob)
    })
  }
  return formData
}
// type Post = Response<PostProps>;

interface FetchPostsParams {
  userId?: string | number
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

        if (params?.userId) {
          queryParams.append('userId', params.userId.toString())
        }
        if (params?.postId) {
          queryParams.append('PostId', params.postId.toString())
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

          // Update all active fetchPosts queries by invalidating the cache
          // This will trigger a refetch for all active queries
          dispatch(apiSlice.util.invalidateTags([{ type: 'Post', id: 'LIST' }]))

          // Alternatively, update specific known query patterns
          // Update the main timeline query (most common case)
          const timelineQueryArgs = {
            $limit: 10,
            $skip: 0,
            $sort: { createdAt: -1 as const },
          }

          dispatch(
            post.util.updateQueryData(
              'fetchPosts',
              timelineQueryArgs,
              (draft) => {
                // Insert the new post at the top of the 'data' array
                draft.data.unshift(newPost)
              }
            )
          )

          // Also update the query without parameters (for profile pages, etc.)
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
        // Define the query parameters that match the timeline
        const timelineQueryArgs = {
          $limit: 10,
          $skip: 0,
          $sort: { createdAt: -1 as const },
        }

        // Optimistic update for the main timeline query
        const patchResult = dispatch(
          post.util.updateQueryData(
            'fetchPosts',
            timelineQueryArgs,
            (draft) => {
              const postIndex = draft.data.findIndex(
                (post) => post.id.toString() === postId
              )

              if (postIndex !== -1) {
                const currentPost = draft.data[postIndex]

                // Toggle the isReactor status and adjust count
                if (currentPost.isReactor) {
                  currentPost.isReactor = false
                  currentPost.amountOfKorems = Math.max(
                    0,
                    currentPost.amountOfKorems - 1
                  )
                } else {
                  currentPost.isReactor = true
                  currentPost.amountOfKorems = currentPost.amountOfKorems + 1
                }
              } else {
                console.log('❌ Post not found in cache for ID:', postId)
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch (error) {
          console.log(
            '❌ Toggle kore API call failed, reverting optimistic update'
          )
          // Revert optimistic update on failure
          patchResult.undo()
          console.error('Toggle kore failed:', error)
        }
      },
    }),
    deletePost: build.mutation<PostProps, string | number>({
      query: (id) => ({
        url: `${endpoints.POSTS}/${id.toString()}`,
        method: HttpMethods.DELETE,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(post.util.invalidateTags([{ type: 'Post' as const, id }]))
        } catch (error) {
          console.error('Delete post failed:', error)
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
  useDeletePostMutation,
} = post

export {
  useFetchPostsQuery,
  useCreatePostMutation,
  useFetchLikesQuery,
  useUpdatePostMutation,
  useCreateCommentMutation,
  useToggleKoreMutation,
  useFetchPostQuery,
  useDeletePostMutation,
}
