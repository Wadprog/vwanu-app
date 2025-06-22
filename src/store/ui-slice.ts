import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

interface UIState {
  isTabBarVisible: boolean
}

const initialState: UIState = {
  isTabBarVisible: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTabBarVisibility: (state, action: PayloadAction<boolean>) => {
      state.isTabBarVisible = action.payload
    },
  },
})

export const { setTabBarVisibility } = uiSlice.actions
export const selectTabBarVisibility = (state: RootState) =>
  state.ui.isTabBarVisible
export const uiReducer = uiSlice.reducer
