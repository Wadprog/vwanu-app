import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import env from "../config/environnement";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: env.apiUrl }),
  endpoints: () => ({}),
});

export default apiSlice;
