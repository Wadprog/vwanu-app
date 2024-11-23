import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";

interface Profiles {
  id: "string";
  firstName: "string";
  lastName: "string";
  profilePicture: "string";
}

const Profiles = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchProfiles: build.query<Profiles[], void>({
      query: () => ({
        url: endpoints.USERS,
        method: HttpMethods.GET,
      }),
    }),
    fetchProfile: build.query<Profiles[], string>({
      query: (profileId) => ({
        url: `${endpoints.USERS}?id=${profileId}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

const { useFetchProfilesQuery, useFetchProfileQuery } = Profiles;

export { useFetchProfilesQuery, useFetchProfileQuery };
