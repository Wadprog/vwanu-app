import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";

interface Profiles {
  id: "string";
  firstName: "string";
  lastName: "string";
  profilePictrue: "string";
}

const Profiles = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchProfiles: build.query<Profiles[], void>({
      query: () => ({
        url: endpoints.USERS,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

const { useFetchProfilesQuery } = Profiles;

export { useFetchProfilesQuery };
