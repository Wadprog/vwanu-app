// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import  apiSlice  from './api-slice'

// interface Profile {
//   id: string
//   // Add other profile fields
// }

// interface ProfileState {
//   data: Profile | null
//   loading: boolean
//   error: string | null
// }

// const initialState: ProfileState = {
//   data: null,
//   loading: false,
//   error: null
// }

// export const profileApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProfile: builder.query<Profile, void>({
//       query: () => 'profile',
//     }),
//     createProfile: builder.mutation<Profile, Partial<Profile>>({
//       query: (profile) => ({
//         url: 'profile',
//         method: 'POST',
//         body: profile,
//       }),
//     }),
//   }),
// })

// export const { useGetProfileQuery, useCreateProfileMutation } = profileApi

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // Add any additional profile state management here
//   },
// })

// export default profileSlice.reducer

export default {}
