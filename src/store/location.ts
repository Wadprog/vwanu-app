import apiSlice from './api-slice'
import { endpoints, HttpMethods } from '../config'

interface LocationSuggestion {
  text: string
}

interface LocationSearchParams {
  text: string
  maxResults?: number
  language?: string
  countries?: string
}

const location = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    searchLocation: build.query<LocationSuggestion[], LocationSearchParams>({
      query: (params) => {
        console.log('Searching location with params:', params)
        // Validate that text is not empty
        if (!params.text || params.text.trim().length < 2) {
          throw new Error(
            'Text parameter is required and must be at least 2 characters long'
          )
        }

        const queryParams = new URLSearchParams()
        queryParams.append('text', params.text.trim())

        if (params.maxResults && params.maxResults > 0) {
          queryParams.append('maxResults', params.maxResults.toString())
        }
        if (params.language && params.language.trim()) {
          queryParams.append('language', params.language)
        }
        if (params.countries && params.countries.trim()) {
          queryParams.append('countries', params.countries)
        }

        return {
          url: `${endpoints.LOCATION}?${queryParams.toString()}`,
          method: HttpMethods.GET,
        }
      },
    }),
  }),
})

const { useSearchLocationQuery } = location

export { useSearchLocationQuery }
export type { LocationSuggestion, LocationSearchParams }
