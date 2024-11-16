import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";

interface Interest {
  id: string;
  name: string;
}

const interests = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchInterests: build.query<Interest[], void>({
      query: () => ({
        url: endpoints.INTERESTS,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

const { useFetchInterestsQuery } = interests;

export { useFetchInterestsQuery };
