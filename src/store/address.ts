import { createSlice } from "@reduxjs/toolkit";

// Core components
import * as action from "./apiAction";
import { endpoints } from "../config";
import { Country, State, City } from "../models/address";

import { RootState } from "./index";

interface StateInterface {
  loadingCountry: boolean;
  loadingState: boolean;
  loadingCity: boolean;
  countries: Country[];
  states: State[];
  cities: City[];
  lastFetch: Date | null;
  error: Error | null;
}
const initialState: StateInterface = {
  loadingCountry: false,
  loadingState: false,
  loadingCity: false,
  countries: [],
  states: [],
  cities: [],
  lastFetch: null,
  error: null,
};

export const address = createSlice({
  name: "address",
  initialState,
  reducers: {
    getCountriesRequest: (state) => {
      state.loadingCountry = true;
    },
    getCountriesSucceed: (state, action) => {
      state.loadingCountry = false;
      state.lastFetch = new Date();
      state.countries = action.payload;
    },

    getCountriesFailed: (state, action) => {
      state.loadingCountry = false;
      state.error = action.payload;
    },

    getStatesRequest: (state) => {
      state.loadingState = true;
    },
    getStatesSucceed: (state, action) => {
      state.loadingState = false;
      state.lastFetch = new Date();
      state.states = action.payload;
    },

    getStatesFailed: (state, action) => {
      state.loadingState = false;
      state.error = action.payload;
    },
    getCitiesRequest: (state) => {
      state.loadingCity = true;
    },
    getCitiesSucceed: (state, action) => {
      state.loadingCity = false;
      state.lastFetch = new Date();
      state.cities = action.payload;
    },

    getCitiesFailed: (state, action) => {
      state.loadingCity = false;
      state.error = action.payload;
    },
  },
});

export default address.reducer;
// @ts-ignore
export const getCountries = () => (dispatch) => {
  dispatch(
    // @ts-ignore
    action.apiCallBegan({
      url: endpoints.COUNTRIES,
      method: "GET",
      onSuccess: address.actions.getCountriesSucceed.type,
      onStart: address.actions.getCountriesRequest.type,
      onError: address.actions.getCountriesFailed.type,
    })
  );
};
// @ts-ignore
export const getStates = (id: string) => (dispatch) => {
  dispatch(
    // @ts-ignore
    action.apiCallBegan({
      url: `${endpoints.STATES}?countryId=${id}`,
      // url: endpoints.STATES,
      method: "GET",
      onSuccess: address.actions.getStatesSucceed.type,
      onStart: address.actions.getCitiesRequest.type,
      onError: address.actions.getCitiesFailed.type,
    })
  );
};

export const getCities = (id: string) => (dispatch) => {
  dispatch(
    // @ts-ignore
    action.apiCallBegan({
      url: `${endpoints.CITIES}?stateId=${id}`,
      // url: endpoints.STATES,
      method: "GET",
      onSuccess: address.actions.getCitiesSucceed.type,
      onStart: address.actions.getCitiesRequest.type,
      onError: address.actions.getCitiesFailed.type,
    })
  );
};

export const getLoc = (state: RootState) => state.address;
