import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchAuthSession,
  resendSignUpCode,
} from 'aws-amplify/auth'
import { clearTokens } from 'lib/secureCache'

export enum NextActions {
  BOARDED = 'BOARDED',
  SIGNED_IN = 'SIGNED_IN',
  SIGNED_UP = 'SIGNED_UP',
  CONFIRMED_SIGNUP = 'CONFIRMED_SIGNUP',
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
  userId: string | null
}

const initialState: AuthState = {
  username: null,
  token: null,
  idToken: null,
  loading: false,
  error: null,
  nextAction: NextActions.BOARDED,
  userId: null,
}

// Define a simplified response interface
interface SignInResponse {
  token: string | null
  idToken: string | null
  userId: string | null
  // Add other necessary fields if needed
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

export const confirmSignUpUser = createAsyncThunk(
  'auth/confirmSignUp',
  async ({ email, code }: { email: string; code: string }) => {
    await confirmSignUp({ username: email, confirmationCode: code })
  }
)

export const signInUser = createAsyncThunk<
  SignInResponse,
  { email: string; password: string }
>('auth/signIn', async ({ email, password }) => {
  try {
    const currentSession = await fetchAuthSession()
    if (currentSession.tokens?.accessToken) {
      await signOut()
    }

    await signIn({ username: email, password })
    const session = await fetchAuthSession()
    return {
      token: session.tokens?.accessToken?.toString() || null,
      idToken: session.tokens?.idToken?.toString() || null,
      userId: session.tokens?.idToken?.payload.sub || null,
    }
  } catch (error) {
    if (error instanceof Error && !error.message.includes('current user')) {
      throw error
    }
    await signIn({ username: email, password })
    const session = await fetchAuthSession()
    return {
      token: session.tokens?.accessToken?.toString() || null,
      idToken: session.tokens?.idToken?.toString() || null,
      userId: session.tokens?.idToken?.payload.sub || null,
    }
  }
})

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
  await signOut()
  await clearTokens()
})

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
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Sign in failed'
      })
      // Sign Out
      .addCase(signOutUser.fulfilled, () => initialState)
      // Resend Passcode
      .addCase(resendPasscode.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resendPasscode.fulfilled, (state) => {
        state.loading = false
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
      .addCase(confirmSignUpUser.fulfilled, (state) => {
        state.loading = false
        state.nextAction = NextActions.SIGNED_IN_SIGNED_UP
      })
      .addCase(confirmSignUpUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to confirm sign up'
      })
  },
})

export const { setNextAction } = authSlice.actions

export default authSlice.reducer
