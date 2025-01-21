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
    createPost: build.mutation<PostProps, Partial<PostProps>>({
      query: (data) => ({
        url: endpoints.POSTS,
        method: HttpMethods.POST,
        body: data,
      }),
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
} = post

export {
  useFetchPostsQuery,
  useCreatePostMutation,
  useFetchLikesQuery,
  useUpdatePostMutation,
}
