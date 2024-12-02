import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";
import { BlogsInterface } from "../../types";

const blog = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchBlog: build.query<BlogsInterface[], void>({
      query: () => ({
        url: endpoints.BLOG,
        method: HttpMethods.GET,
      }),
    }),
    fetchBlogById: build.query<BlogsInterface, string>({
      query: (id) => ({
        url: `${endpoints.BLOG}/${id}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

const { useFetchBlogByIdQuery, useFetchBlogQuery } = blog;

export { useFetchBlogByIdQuery, useFetchBlogQuery };
