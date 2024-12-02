import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";
import { CommunityInterface } from "../../types";

const community = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchCommunity: build.query<CommunityInterface[], void>({
      query: () => ({
        url: endpoints.COMMUNITY,
        method: HttpMethods.GET,
      }),
    }),
    fetchCommunityById: build.query<CommunityInterface, string>({
      query: (id) => ({
        url: `${endpoints.COMMUNITY}/${id}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

const { useFetchCommunityQuery, useFetchCommunityByIdQuery } = community;

export { useFetchCommunityQuery, useFetchCommunityByIdQuery };
