import apiSlice from "./api-slice";
import { endpoints, HttpMethods } from "../config";
import { Medias } from "../components/ImageGrid";

interface Banner {
  title: string;
  tagLine: string;
  backgroundImage: string;
}

const banner = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetcBanners: build.query<Banner[], void>({
      query: () => ({
        url: endpoints.BANNER,
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

const { useFetcBannersQuery } = banner;

export { useFetcBannersQuery };
