import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

interface UIState {
  isTabBarVisible: boolean
  isDarkMode: boolean // follows system theme automatically
}

const initialState: UIState = {
  isTabBarVisible: true,
  isDarkMode: false, // Will be set based on system preference
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTabBarVisibility: (state, action: PayloadAction<boolean>) => {
      state.isTabBarVisible = action.payload
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    },
  },
})

export const { setTabBarVisibility, setIsDarkMode } = uiSlice.actions

export const selectTabBarVisibility = (state: RootState) =>
  state.ui.isTabBarVisible
export const selectIsDarkMode = (state: RootState) => state.ui.isDarkMode

export const uiReducer = uiSlice.reducer
