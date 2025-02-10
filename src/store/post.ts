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

const post = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<Response, void>({
      query: () => ({
        url: endpoints.POSTS,
        method: HttpMethods.GET,
      }),
      // transformResponse: (response: { data: PostProps[] }) => response.data,
    }),

    createComment: build.mutation<PostProps, CommentType>({
      query: (data) => ({
        url: endpoints.COMMENTS,
        method: HttpMethods.POST,
        body: data,
      }),
    }),
    createPost: build.mutation<PostProps, Partial<PostCreationProps>>({
      query: (values) => ({
        url: endpoints.POSTS,
        method: HttpMethods.POST,
        body: _toFormData(values),
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'multipart/form-data')
          return headers
        },
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log('query Started')
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
    }),

    fetchLikes: build.query<Rep, string | number>({
      query: (id) => ({
        url: `${endpoints.POSTKOREMS}?postId=${id.toString()}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
})

const {
  useFetchPostsQuery,
  useCreatePostMutation,
  useFetchLikesQuery,
  useUpdatePostMutation,
  useCreateCommentMutation,
} = post

export {
  useFetchPostsQuery,
  useCreatePostMutation,
  useFetchLikesQuery,
  useUpdatePostMutation,
  useCreateCommentMutation,
}
