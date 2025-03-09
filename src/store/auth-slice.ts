import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchAuthSession,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword as confirmReset,
  getCurrentUser,
} from 'aws-amplify/auth'

export enum NextActions {
  INITIALIZING = 'INITIALIZING',
  BOARDED = 'BOARDED',
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_UP = 'SIGNED_UP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CONFIRMED_SIGNUP = 'CONFIRMED_SIGNUP',
  RESET_PASSWORD = 'RESET_PASSWORD',
  AUTH_COMPLETED = 'AUTH_COMPLETED',
  SIGNED_IN_SIGNED_UP = 'SIGNED_IN_SIGNED_UP',
}

interface User {
  email: string
  firstName: string
  lastName: string
}

interface AuthState {
  username: string | null
  token: string | null
  idToken: string | null
  loading: boolean
  error: string | null
  nextAction: NextActions
  previousAction: NextActions
  userId: string | null
}

const initialState: AuthState = {
  username: null,
  token: null,
  idToken: null,
  loading: true,
  error: null,
  userId: null,
  nextAction: NextActions.INITIALIZING,
  previousAction: NextActions.INITIALIZING,

  // nextAction: NextActions.BOARDED,
  // previousAction: NextActions.BOARDED,
}

// Define a simplified response interface
interface SignInResponse {
  token: string | null
  idToken: string | null
  userId: string | null
  // Add other necessary fields if needed
}

interface ForgotPasswordResponse {
  username: string | null
}

export const resendPasscode = createAsyncThunk(
  'auth/resendPasscode',
  async (email: string) => {
    await resendSignUpCode({ username: email })
    return email
  }
)

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({
    email,
    password,
    firstName,
    lastName,
  }: User & { password: string }) => {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          given_name: firstName,
          family_name: lastName,
        },
      },
    })
    return email
  }
)

export const confirmSignUpUser = createAsyncThunk<
  SignInResponse,
  { email: string; code: string }
>('auth/confirmSignUp', async ({ email, code }) => {
  console.log(`[debug] confirming sign up for ${email} with code ${code}`)
  await confirmSignUp({ username: email, confirmationCode: code })
  console.log(`[debug] confirmed sign up great success`)

  // Get the session to retrieve tokens
  try {
    const session = await fetchAuthSession()
    console.log(`[debug] fetched session after confirmation`, session)

    return {
      token: session.tokens?.accessToken?.toString() || null,
      idToken: session.tokens?.idToken?.toString() || null,
      userId: session.tokens?.idToken?.payload.sub || null,
    }
  } catch (error) {
    console.log(`[debug] error fetching session after confirmation`, error)

    // Check if it's a network error
    if (error instanceof Error) {
      if (
        error.message.includes('Network Error') ||
        error.message.includes('network') ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network request failed')
      ) {
        throw new Error(
          'Network connection error. Please check your internet connection and try again.'
        )
      }
    }
    throw error
  }
})

export const signInUser = createAsyncThunk<
  SignInResponse,
  { email: string; password: string }
>('auth/signIn', async ({ email, password }) => {
  try {
    console.log(`['Debug'] before checking for session`)
    // const currentSession = await fetchAuthSession()
    // if (currentSession.tokens?.accessToken) {
    //   await signOut()
    // }

    const s1 = await signIn({
      username: email,
      password,
    })
    console.log({ s1 })
    const session = await fetchAuthSession()
    console.log(`[debug], signing invoked`)
    console.log({ s1, session })
    return {
      token: session.tokens?.accessToken?.toString() || null,
      idToken: session.tokens?.idToken?.toString() || null,
      userId: session.tokens?.idToken?.payload.sub || null,
      ...session,
    }
  } catch (error) {
    console.log(`[debug error signing in]`)
    console.log(error)
    if (error instanceof Error && !error.message.includes('current user')) {
      throw error
    }
    const s = await signIn({ username: email, password })
    const session = await fetchAuthSession()
    console.log({ s, session })
    return {
      token: session.tokens?.accessToken?.toString() || null,
      idToken: session.tokens?.idToken?.toString() || null,
      userId: session.tokens?.idToken?.payload.sub || null,
    }
  }
})

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      // Sign out from Cognito (this will clear the persistent session)
      await signOut({ global: true })

      // Also clear any tokens from secure storage
      // await clearTokens();

      return null
    } catch (error) {
      console.error('Error signing out:', error)
      return rejectWithValue('Failed to sign out')
    }
  }
)

export const forgotPassword = createAsyncThunk<ForgotPasswordResponse, string>(
  'auth/forgotPassword',
  async (email: string) => {
    await resetPassword({ username: email })
    return { username: email }
  }
)

export const confirmResetPassword = createAsyncThunk(
  'auth/confirmResetPassword',
  async (
    {
      username,
      code,
      newPassword,
    }: {
      username: string
      code: string
      newPassword: string
    },
    { rejectWithValue }
  ) => {
    try {
      // First try to confirm the password reset
      await confirmReset({ username, confirmationCode: code, newPassword })

      // Password reset was successful, now try to sign out globally
      try {
        await signOut({ global: true })
      } catch (signOutError) {
        // If sign out fails, log it but still consider the password reset successful
        // This prevents a sign out failure from causing the entire operation to fail
        console.warn(
          'Password reset successful but sign out failed:',
          signOutError
        )
      }

      return null
    } catch (resetError) {
      // This is a password reset error (the primary operation failed)
      console.error('Error confirming password reset:', resetError)

      // TypeScript assertion to extract error message or provide a fallback
      let errorMessage = 'Failed to confirm password reset'
      if (resetError instanceof Error) {
        errorMessage = resetError.message
      } else if (typeof resetError === 'string') {
        errorMessage = resetError
      }

      return rejectWithValue(errorMessage)
    }
  }
)

export const checkExistingSession = createAsyncThunk(
  'auth/checkExistingSession',
  async (_, { rejectWithValue }) => {
    try {
      // First get the current user, this will throw if not signed in
      const currentUser = await getCurrentUser()

      // Then fetch the auth session to get tokens
      const { tokens } = await fetchAuthSession()

      // Return session data
      return {
        username: currentUser.username,
        userId: currentUser.userId,
        token: tokens?.accessToken?.toString() || null,
        idToken: tokens?.idToken?.toString() || null,
        nextAction: NextActions.SIGNED_IN,
      }
    } catch (error) {
      console.log('No existing session found', error)
      return rejectWithValue('No authenticated user')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNextAction: (state, action: PayloadAction<NextActions>) => {
      state.nextAction = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false
        state.username = action.payload
        state.previousAction = state.nextAction
        state.nextAction = NextActions.CONFIRMED_SIGNUP
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log('signUpUser.rejected', action.error)
        state.loading = false
        state.error = action.error.message || 'Sign up failed'
      })
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.idToken = action.payload.idToken
        state.userId = action.payload.userId
        // state.nextAction = action.payload?.email_confirmed_at
        //   ? 'AUTH_COMPLETE'
        //   : 'CONFIRM_SIGNUP';
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Sign in failed'
      })
      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        // Reset auth state to initial values
        state.username = null
        state.token = null
        state.idToken = null
        state.userId = null
        state.error = null
        state.loading = false
        state.nextAction = NextActions.SIGNED_IN_SIGNED_UP // Or whatever your initial state should be
        state.previousAction = NextActions.BOARDED
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Sign out failed'
        state.loading = false
      })
      // Resend Passcode
      .addCase(resendPasscode.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resendPasscode.fulfilled, (state) => {
        state.loading = false
        state.previousAction = state.nextAction
        state.nextAction = NextActions.CONFIRMED_SIGNUP
      })
      .addCase(resendPasscode.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to resend passcode'
      })
      // Confirm Sign Up
      .addCase(confirmSignUpUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(confirmSignUpUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.idToken = action.payload.idToken
        state.userId = action.payload.userId
        state.previousAction = state.nextAction
        state.nextAction = NextActions.AUTH_COMPLETED
      })
      .addCase(confirmSignUpUser.rejected, (state, action) => {
        state.loading = false
        if (action.error.message?.toLowerCase().includes('confirmed')) {
          state.previousAction = state.nextAction
          state.nextAction = NextActions.SIGNED_IN
        } else if (
          action.error.message
            ?.toLowerCase()
            .includes('network connection error')
        ) {
          state.error =
            'Unable to reach the server. Please check your internet connection and try again.'
          state.previousAction = state.nextAction
        } else {
          state.error = action.error.message || 'Failed to confirm sign up'
          state.previousAction = state.nextAction
        }
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true
        state.error = null
        state.username = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.username = action.payload.username
        state.previousAction = state.nextAction
        state.nextAction = NextActions.RESET_PASSWORD
        // You might want to set a specific nextAction here if needed
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to initiate password reset'
        state.username = null
      })
      .addCase(confirmResetPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(confirmResetPassword.fulfilled, (state) => {
        state.loading = false
        state.previousAction = state.nextAction
        state.nextAction = NextActions.SIGNED_IN
        state.username = null
        state.token = null
        state.idToken = null
        state.userId = null
        state.error = null
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Failed to reset password'
      })
      .addCase(checkExistingSession.pending, (state) => {
        state.loading = true
      })
      .addCase(checkExistingSession.fulfilled, (state, action) => {
        state.loading = false
        state.username = action.payload.username
        state.userId = action.payload.userId
        state.token = action.payload.token
        state.idToken = action.payload.idToken
        state.nextAction = action.payload.nextAction
      })
      .addCase(checkExistingSession.rejected, (state) => {
        state.loading = false
        // When no existing session is found, transition to BOARDED
        state.nextAction = NextActions.BOARDED
        state.previousAction = NextActions.INITIALIZING
        // Don't set an error, this is an expected case
      })
  },
})

export const { setNextAction } = authSlice.actions

export default authSlice.reducer
