import * as SecureStore from 'expo-secure-store'
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth'
import type { AuthTokens } from 'aws-amplify/auth'

const ACCESS_TOKEN_KEY = 'vwanu_access_token'
const ID_TOKEN_KEY = 'vwanu_id_token'
const REFRESH_TOKEN_KEY = 'vwanu_refresh_token'
const TOKEN_EXPIRY_KEY = 'vwanu_token_expiry'
const USER_ID_KEY = 'vwanu_user_id'

export interface StoredTokens {
  accessToken: string | null
  idToken: string | null
  refreshToken: string | null
  userId: string | null
  expiresAt: number | null
}

export class AuthTokenService {
  private static refreshPromise: Promise<StoredTokens | null> | null = null

  /**
   * Store tokens securely with expiration time
   */
  static async storeTokens(tokens: AuthTokens, userId: string): Promise<void> {
    try {
      const accessToken = tokens.accessToken?.toString()
      const idToken = tokens.idToken?.toString()

      if (!accessToken || !idToken) {
        throw new Error('Invalid tokens provided')
      }

      // Calculate expiration time (typically 1 hour for access tokens)
      const expiresAt = Date.now() + 55 * 60 * 1000 // 55 minutes to be safe

      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
        SecureStore.setItemAsync(ID_TOKEN_KEY, idToken),
        SecureStore.setItemAsync(USER_ID_KEY, userId),
        SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, expiresAt.toString()),
      ])

      console.log('✅ Tokens stored successfully')
    } catch (error) {
      console.error('❌ Error storing tokens:', error)
      throw error
    }
  }

  /**
   * Get stored tokens from secure storage
   */
  static async getStoredTokens(): Promise<StoredTokens> {
    try {
      const [accessToken, idToken, userId, expiryString] = await Promise.all([
        SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.getItemAsync(ID_TOKEN_KEY),
        SecureStore.getItemAsync(USER_ID_KEY),
        SecureStore.getItemAsync(TOKEN_EXPIRY_KEY),
      ])

      const expiresAt = expiryString ? parseInt(expiryString, 10) : null

      return {
        accessToken,
        idToken,
        refreshToken: null, // Cognito handles refresh tokens internally
        userId,
        expiresAt,
      }
    } catch (error) {
      console.error('❌ Error retrieving tokens:', error)
      return {
        accessToken: null,
        idToken: null,
        refreshToken: null,
        userId: null,
        expiresAt: null,
      }
    }
  }

  /**
   * Check if tokens are expired or about to expire
   */
  static async areTokensExpired(): Promise<boolean> {
    const { expiresAt } = await this.getStoredTokens()
    if (!expiresAt) return true

    // Consider tokens expired if they expire in the next 5 minutes
    const bufferTime = 5 * 60 * 1000
    return Date.now() >= expiresAt - bufferTime
  }

  /**
   * Refresh tokens using AWS Cognito's built-in refresh mechanism
   */
  static async refreshTokens(): Promise<StoredTokens | null> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    this.refreshPromise = this._performTokenRefresh()

    try {
      const result = await this.refreshPromise
      return result
    } finally {
      this.refreshPromise = null
    }
  }

  private static async _performTokenRefresh(): Promise<StoredTokens | null> {
    try {
      console.log('🔄 Attempting to refresh tokens...')

      // Check if user is still authenticated with Cognito
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        throw new Error('No authenticated user found')
      }

      // Fetch fresh session from Cognito (this automatically uses refresh token)
      const session = await fetchAuthSession({ forceRefresh: true })

      if (!session.tokens) {
        throw new Error('No tokens in refreshed session')
      }

      // Store the new tokens
      await this.storeTokens(session.tokens, currentUser.userId)

      const storedTokens = await this.getStoredTokens()
      console.log('✅ Tokens refreshed successfully')

      return storedTokens
    } catch (error) {
      console.error('❌ Token refresh failed:', error)

      // If refresh fails, clear stored tokens and force re-authentication
      await this.clearTokens()
      return null
    }
  }

  /**
   * Get valid tokens, refreshing if necessary
   */
  static async getValidTokens(): Promise<StoredTokens | null> {
    try {
      const tokens = await this.getStoredTokens()

      // If no tokens exist, return null
      if (!tokens.accessToken || !tokens.idToken) {
        return null
      }

      // If tokens are not expired, return them
      if (!(await this.areTokensExpired())) {
        return tokens
      }

      // Tokens are expired, attempt to refresh
      console.log('🔄 Tokens expired, attempting refresh...')
      return await this.refreshTokens()
    } catch (error) {
      console.error('❌ Error getting valid tokens:', error)
      return null
    }
  }

  /**
   * Clear all stored tokens
   */
  static async clearTokens(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
        SecureStore.deleteItemAsync(ID_TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_ID_KEY),
        SecureStore.deleteItemAsync(TOKEN_EXPIRY_KEY),
      ])
      console.log('✅ Tokens cleared successfully')
    } catch (error) {
      console.error('❌ Error clearing tokens:', error)
    }
  }

  /**
   * Force sign out and clear all tokens
   */
  static async forceSignOut(): Promise<void> {
    try {
      await Promise.all([signOut({ global: true }), this.clearTokens()])
      console.log('✅ Force sign out completed')
    } catch (error) {
      console.error('❌ Error during force sign out:', error)
      // Still clear tokens even if signOut fails
      await this.clearTokens()
    }
  }

  /**
   * Validate token format and structure
   */
  static validateTokenFormat(token: string): boolean {
    try {
      // Basic JWT format validation
      const parts = token.split('.')
      return parts.length === 3
    } catch {
      return false
    }
  }
}
