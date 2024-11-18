import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";
import { Medias } from "../components/ImageGrid";

interface User {
  firstName: string;
  lastName: string;
  profilePicture: string;
}
interface Post {
  postText: string;
  medias: Medias[];
  createdAt: string;
  likes: number;
  comments: number;
  likers: User[];
  user: User;
}

const post = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<Post[], void>({
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
