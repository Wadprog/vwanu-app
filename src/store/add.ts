import apiSlice from './api-slice'
import { endpoints, HttpMethods } from '../config'

import { Country, State, City } from 'models/address'

const address = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    fetchCountries: build.query<Country[], void>({
      query: () => ({
        url: endpoints.COUNTRIES,
        method: HttpMethods.GET,
      }),
    }),
    fetchCity: build.query<City[], string>({
      query: (stateId) => ({
        url: `${endpoints.CITIES}?state_id=${stateId}`,
        method: HttpMethods.GET,
      }),
    }),
    fetchStates: build.query<State[], string>({
      query: (countryId) => ({
        url: `${endpoints.STATES}?country_id=${countryId}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
})

const { useFetchCountriesQuery, useFetchCityQuery, useFetchStatesQuery } =
  address

export { useFetchCountriesQuery, useFetchCityQuery, useFetchStatesQuery }
