import { useActionWithMessage } from './useActionWithMessage'
import {
  signUpUser,
  confirmSignUpUser,
  signInUser,
  resendPasscode,
  signOutUser,
  forgotPassword,
  confirmResetPassword,
  setRequiredData,
} from 'store/auth-slice'
import { Profile, User } from '../../types.d'

// Define action configuration with types
interface ActionConfig<T> {
  action: any // The Redux action
  successMessage: string
  params?: T // Optional default params
}

export const useAuthActions = () => {
  const { executeAction } = useActionWithMessage()

  // Create a mapping of all our actions with their messages
  const actionConfigs = {
    signUp: {
      action: signUpUser,
      successMessage:
        'Sign up successful! Please check your email for the confirmation code.',
    },
    setBirthdate: {
      action: setRequiredData,
      successMessage: 'You are ready to go!',
    },
    confirmSignUp: {
      action: confirmSignUpUser,
      successMessage: 'Email confirmed successfully!',
    },
    signIn: {
      action: signInUser,
      successMessage: 'Welcome Back!!',
    },
    resendPasscode: {
      action: resendPasscode,
      successMessage: 'Passcode sent successfully! Please check your email.',
    },
    signOut: {
      action: signOutUser,
      successMessage: 'Signed out successfully!',
    },
    forgotPassword: {
      action: forgotPassword,
      successMessage: 'Password reset email sent! Please check your inbox.',
    },
    confirmResetPassword: {
      action: confirmResetPassword,
      successMessage:
        'Password reset successfully! You can now sign in with your new password.',
    },
  } as const

  // Create a generic function factory for all our action methods
  function createActionMethod<T>(config: ActionConfig<T>) {
    return (payload: T) => {
      // Return a thunk function that Redux can dispatch
      return (dispatch: any) => {
        return executeAction(config.action, payload, {
          successMessage: config.successMessage,
        })
      }
    }
  }

  // Generate our methods from the configuration
  return {
    signUpUserWithMessage: createActionMethod<
      Partial<Profile> & { password: string }
    >(actionConfigs.signUp),
    confirmSignUpUserWithMessage: createActionMethod<{
      email: string
      code: string
    }>(actionConfigs.confirmSignUp),
    signInUserWithMessage: createActionMethod<{
      email: string
      password: string
    }>(actionConfigs.signIn),
    resendPasscodeWithMessage: createActionMethod<string>(
      actionConfigs.resendPasscode
    ),
    signOutUserWithMessage: () =>
      executeAction(actionConfigs.signOut.action, undefined, {
        successMessage: actionConfigs.signOut.successMessage,
      }),
    setBirthdateWithMessage: createActionMethod<{
      birthdate: string
      location: string
    }>(actionConfigs.setBirthdate),
    forgotPasswordWithMessage: createActionMethod<string>(
      actionConfigs.forgotPassword
    ),
    confirmResetPasswordWithMessage: createActionMethod<{
      username: string
      code: string
      newPassword: string
    }>(actionConfigs.confirmResetPassword),
  }
}
