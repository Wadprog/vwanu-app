export interface Country {
  id: string | number
  name: string
  iso2?: string
  iso3?: string
  numeric_code?: string
  phone_code?: string
  capital?: string
  currency?: string
  currency_name?: string
  currency_symbol?: string
  region?: string
  subregion?: string
}

export interface State {
  id: string | number
  name: string
  country_id: string | number
  country_code?: string
  country_name?: string
  state_code?: string
  type?: string
  latitude?: string
  longitude?: string
}

export interface City {
  id: string | number
  name: string
  state_id: string | number
  state_code?: string
  state_name?: string
  country_id: string | number
  country_code?: string
  country_name?: string
  latitude?: string
  longitude?: string
  wikiDataId?: string
}
