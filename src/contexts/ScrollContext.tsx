import React, { createContext, useContext, useRef, useCallback } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useDispatch } from 'react-redux'
import { setTabBarVisibility } from '../store/ui-slice'

interface ScrollContextType {
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  scrollRef: React.RefObject<any>
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch()
  const lastScrollY = useRef(0)
  const scrollRef = useRef(null)

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down & past threshold
        dispatch(setTabBarVisibility(false))
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        // Scrolling up or near top
        dispatch(setTabBarVisibility(true))
      }

      lastScrollY.current = currentScrollY
    },
    [dispatch]
  )

  return (
    <ScrollContext.Provider value={{ handleScroll, scrollRef }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}
