import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";

import { PostProps } from "../../types";

const post = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<PostProps[], void>({
      query: () => ({
        url: endpoints.POSTS,
        method: HttpMethods.GET,
      }),
    }),
    // fetchPost: build.query<Post, string>({
    //     query: (id) => ({
    //         url: `${endpoints.POSTS}/${id}`,
    //         method: HttpMethods.GET,
    //     }),
    // }),
  }),
});

const { useFetchPostsQuery } = post;

export { useFetchPostsQuery };
