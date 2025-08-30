import { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { AuthTokenService } from '../lib/authTokenService'
import { signOutUser } from '../store/auth-slice'

interface UseTokenMonitoringOptions {
  /**
   * Check interval in milliseconds (default: 5 minutes)
   */
  checkInterval?: number
  /**
   * Whether to enable automatic monitoring (default: true)
   */
  enabled?: boolean
}

/**
 * Hook to monitor authentication tokens and handle automatic refresh
 */
export const useTokenMonitoring = (options: UseTokenMonitoringOptions = {}) => {
  const {
    checkInterval = 5 * 60 * 1000, // 5 minutes
    enabled = true,
  } = options

  const dispatch = useDispatch<AppDispatch>()
  const { token, idToken, userId } = useSelector(
    (state: RootState) => state.auth
  )
  const intervalRef = useRef<NodeJS.Timeout>()
  const refreshInProgressRef = useRef(false)

  const isAuthenticated = Boolean(token && idToken && userId)

  /**
   * Check token validity and refresh if needed
   */
  const checkAndRefreshTokens = useCallback(async () => {
    if (!isAuthenticated || refreshInProgressRef.current) {
      return
    }

    try {
      refreshInProgressRef.current = true

      // Check if tokens are expired or about to expire
      const areExpired = await AuthTokenService.areTokensExpired()

      if (areExpired) {
        console.log('🔄 Tokens expired, attempting automatic refresh...')

        const refreshedTokens = await AuthTokenService.refreshTokens()

        if (!refreshedTokens) {
          console.log('❌ Automatic token refresh failed, signing out...')
          dispatch(signOutUser())
        } else {
          console.log('✅ Tokens refreshed automatically')
          // Note: The auth slice will be updated via the next API call
          // which will use the refreshed tokens
        }
      }
    } catch (error) {
      console.error('❌ Error during token monitoring:', error)
      // Don't sign out on monitoring errors, just log them
    } finally {
      refreshInProgressRef.current = false
    }
  }, [isAuthenticated, dispatch])

  /**
   * Start token monitoring
   */
  const startMonitoring = useCallback(() => {
    if (!enabled || !isAuthenticated) {
      return
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set up new interval
    intervalRef.current = setInterval(checkAndRefreshTokens, checkInterval)

    console.log(
      `🔍 Token monitoring started (checking every ${checkInterval / 1000}s)`
    )
  }, [enabled, isAuthenticated, checkAndRefreshTokens, checkInterval])

  /**
   * Stop token monitoring
   */
  const stopMonitoring = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
      console.log('⏹️ Token monitoring stopped')
    }
  }, [])

  /**
   * Manually trigger token check and refresh
   */
  const manualRefresh = useCallback(async () => {
    if (!isAuthenticated) {
      return false
    }

    try {
      const refreshedTokens = await AuthTokenService.refreshTokens()
      return Boolean(refreshedTokens)
    } catch (error) {
      console.error('❌ Manual token refresh failed:', error)
      return false
    }
  }, [isAuthenticated])

  // Start/stop monitoring based on authentication status
  useEffect(() => {
    if (isAuthenticated && enabled) {
      startMonitoring()
    } else {
      stopMonitoring()
    }

    return () => {
      stopMonitoring()
    }
  }, [isAuthenticated, enabled, startMonitoring, stopMonitoring])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMonitoring()
    }
  }, [stopMonitoring])

  return {
    /**
     * Whether token monitoring is active
     */
    isMonitoring: Boolean(intervalRef.current),

    /**
     * Whether a refresh is currently in progress
     */
    isRefreshing: refreshInProgressRef.current,

    /**
     * Manually trigger token refresh
     */
    refreshTokens: manualRefresh,

    /**
     * Start monitoring manually
     */
    startMonitoring,

    /**
     * Stop monitoring manually
     */
    stopMonitoring,
  }
}

export default useTokenMonitoring
