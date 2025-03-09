import { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import { AsyncThunk } from '@reduxjs/toolkit'
import { useMessage } from 'contexts/MessageContext'

interface ActionOptions {
  successMessage?: string
}

/**
 * A hook that wraps any Redux action with message handling
 * @returns A function that can execute any action with message handling
 */
export const useActionWithMessage = () => {
  const { addMessage } = useMessage()
  const dispatch = useDispatch<AppDispatch>()

  /**
   * Executes an action and displays appropriate messages
   * @param action The Redux action creator function to execute
   * @param payload The payload to pass to the action
   * @param options Message options
   * @returns A promise that resolves to the action result with a success flag
   */
  const executeAction = async <ReturnType, PayloadType>(
    action: AsyncThunk<ReturnType, PayloadType, any>,
    payload: PayloadType,
    options: ActionOptions = {}
  ) => {
    const { successMessage = 'Operation completed successfully' } = options

    await dispatch(action(payload)).unwrap()
    addMessage(successMessage, 'info')
  }

  return { executeAction }
}
