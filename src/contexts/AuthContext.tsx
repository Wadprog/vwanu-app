import React, { createContext, useReducer, ReactNode } from 'react'
import {
  signUp,
  confirmSignUp,
  signIn,
  fetchAuthSession,
} from 'aws-amplify/auth'
import { useAuthenticator } from '@aws-amplify/ui-react-native'
import {
  clearTokens,
  storeTokens,
  getStoredRefreshToken,
} from 'lib/secureCache'

// Define authentication states

export enum AuthState {
  BOARDED = 'BOARDED',
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_UP = 'SIGNED_UP',
  CONFIRMED_SIGNUP = 'CONFIRMED_SIGNUP',
  SIGNED_IN_SIGNED_UP = 'SIGNED_IN_SIGNED_UP',
  AUTH_COMPLITED = 'AUTH_COMPLITED',
}
export const ALLSTATE = {
  ...AuthState,
  SIGNED_UP: 'SIGNED_UP',
}

// Define user type (replace `any` with your actual user model)
interface User {
  email: string
  password: string
  firstName: string
  lastName: string
}
interface UserType extends Omit<User, 'password'> {
  id: string
}

// Define the state structure
interface AuthStateType {
  user: UserType | null
  loading: boolean
  error: Error | null
  token: string | null
  nextAction: AuthState
}

// Define actions for reducer
type AuthAction =
  | { type: 'SIGN_IN' }
  | { type: 'SIGN_UP'; payload: UserType }
  | { type: 'SIGN_OUT' }
  | { type: 'SIGN_UP_CONFIRM' }
  | { type: 'PROFILE_UPDATE'; payload: UserType }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: AuthState.SIGNED_IN }
  | { type: AuthState.SIGNED_UP }
  | { type: AuthState.SIGNED_IN_SIGNED_UP }

// Initial state
const initialState: AuthStateType = {
  user: null,
  loading: false,
  error: null,
  token: null,
  nextAction: AuthState.BOARDED,
}

// Reducer function to handle actions
const authReducer = (
  state: AuthStateType,
  action: AuthAction
): AuthStateType => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, nextAction: AuthState.AUTH_COMPLITED }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'SIGN_UP':
      return {
        ...state,
        user: action.payload,
        nextAction: AuthState.CONFIRMED_SIGNUP,
      }
    case 'SIGN_OUT':
      return { ...state, token: null, nextAction: AuthState.SIGNED_IN }
    case 'SIGN_UP_CONFIRM':
      return { ...state, nextAction: AuthState.SIGNED_IN }

    case 'SET_ERROR':
      return { ...state, error: new Error(action.payload) }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case AuthState.SIGNED_IN:
      return { ...state, nextAction: AuthState.SIGNED_IN }
    case AuthState.SIGNED_UP:
      return { ...state, nextAction: AuthState.SIGNED_UP }
    case AuthState.SIGNED_IN_SIGNED_UP:
      return { ...state, nextAction: AuthState.SIGNED_IN_SIGNED_UP }
    default:
      return state
  }
}

// Define the context type
interface AuthContextType extends AuthStateType {
  signOut: () => Promise<void>
  dispatch: React.Dispatch<AuthAction>
  signup: (user: User) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  confirmSignup: (confirmationCode: string) => Promise<void>
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const { signOut } = useAuthenticator((context) => [context.user])

  const handleSignup = async (user: User) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    const { email, firstName, lastName, password } = user
    try {
      const response = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            given_name: firstName,
            family_name: lastName,
          },
        },
      })
      const newUser = { email, firstName, lastName, id: response.userId! }
      dispatch({ type: 'SIGN_UP', payload: newUser })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Sign-up failed' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleConfirmSignup = async (confirmationCode: string) => {
    if (!state.user || !state.user.email) throw new Error('User not found')
    const { email } = state.user
    try {
      await confirmSignUp({ username: email, confirmationCode })
      dispatch({ type: 'SIGN_UP_CONFIRM' })
    } catch (error) {
      console.error(error)
      dispatch({ type: 'SET_ERROR', payload: 'Confirm sign-up failed' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const r = await signIn({ username: email, password })
      console.log({ r })
      const t = await getValidAccessToken()
      console.log({ t })
      dispatch({ type: 'SIGN_IN' })
    } catch (error) {
      console.log({ error })
      dispatch({ type: 'SET_ERROR', payload: 'Sign-in failed' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const getValidAccessToken = async () => {
    try {
      const session = await fetchAuthSession()

      if (!session.tokens) {
        throw new Error('No session tokens available.')
      }

      const { accessToken } = session.tokens

      // // **Check Token Expiration**
      // const decodedToken = JSON.parse(atob(accessToken/*.split(".")[1]*/)); // Decode JWT payload
      // const tokenExpiration = decodedToken.exp * 1000; // Convert to milliseconds
      // const currentTime = Date.now();

      // if (currentTime >= tokenExpiration) {
      //   console.log("Access token expired. Attempting refresh...");

      //   // **Check if Refresh Token is Available**
      //   const storedRefreshToken = await getStoredRefreshToken();
      //   if (!storedRefreshToken) {
      //     console.log("Refresh token missing. Logging out...");
      //     await handleLogout();
      //     return null;
      //   }

      //   // **Fetch new session (Amplify handles refresh automatically)**
      //   const newSession = await fetchAuthSession();

      //   if (!newSession.tokens?.accessToken) {
      //     console.log("Failed to refresh token. Logging out...");
      //     await handleLogout();
      //     return null;
      //   }

      //   // **Store New Tokens**
      //   await storeTokens(newSession.tokens.accessToken, newSession.tokens.refreshToken);

      //   return newSession.tokens.accessToken;
      // }

      if (state.token !== accessToken.toString())
        dispatch({ type: 'SET_TOKEN', payload: accessToken.toString() })

      return accessToken
    } catch (error) {
      console.error('Error refreshing token:', error)
      await handleLogout()
      return null
    }
  }

  const handleLogout = async () => {
    dispatch({ type: 'SET_TOKEN', payload: null })
    await signOut()
    await clearTokens()
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        signup: handleSignup,
        confirmSignup: handleConfirmSignup,
        signIn: handleSignIn,
        signOut: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
