import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";
import { Medias } from "../components/ImageGrid";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string;
}
export interface CommunityInterface {
  name: string;
  bacgroundImage: string;
  createdAt: string;
  members: User[];
  id: number;
}

const community = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchCommunity: build.query<CommunityInterface[], void>({
      query: () => ({
        url: endpoints.POSTS,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

const { useFetchCommunityQuery } = community;

export { useFetchCommunityQuery };
