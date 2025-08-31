import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { setIsDarkMode } from '../store/ui-slice'
import { createAppTheme } from 'themes/themeUtils'

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>()
  const systemColorScheme = useColorScheme()
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode)
  const currentTheme = createAppTheme(isDarkMode)

  useEffect(() => {
    const shouldBeDark = systemColorScheme === 'dark'
    dispatch(setIsDarkMode(shouldBeDark))
  }, [systemColorScheme, dispatch])

  return {
    isDarkMode,
    systemColorScheme,
    currentTheme,
  }
}
