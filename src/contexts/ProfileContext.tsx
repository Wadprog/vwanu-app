import React, { createContext, useReducer, ReactNode } from 'react'
import { Profile } from '../../types'
import { hasIn, has, isNil } from 'lodash'

// **Enum for Profile Creation Steps**
export enum ProfileCreateSteps {
  START = 'START',
  FIND_FRIENDS = 'FIND_FRIENDS',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  PROFILE_COMPLETE = 'PROFILE_COMPLETE',
}

// **Context Provider Props**
interface ProfileContextProviderProps {
  children: ReactNode
}

// **State Type**
export interface ProfileStateType {
  loading: boolean
  user: Partial<Profile> | null
  nextAction: ProfileCreateSteps
  error: Error | null
}

// **Initial State**
const initialState: ProfileStateType = {
  loading: false,
  user: null,
  nextAction: ProfileCreateSteps.START,
  error: null,
}

// **Action Types**
type ProfileAction =
  | { type: ProfileCreateSteps.START }
  | { type: ProfileCreateSteps.FIND_FRIENDS }
  | { type: ProfileCreateSteps.PROFILE_PICTURE }
  | { type: ProfileCreateSteps.PROFILE_COMPLETE }

type AddressGenderAndInterests = {
  dob: Date
  gender: 'm' | 'f'
  state: string
  country: string
  city: string
  interests: number[]
}
// **Context Type**
export interface ProfileContextType extends ProfileStateType {
  dispatch: React.Dispatch<ProfileAction>
  updateProfile: (user: Partial<Profile>) => Promise<void>
  getProfile: () => Promise<void>
  followFriens: (friendsIds: string[]) => Promise<void>
  inViteFriens: (phoneNumbers: string[]) => Promise<void>
  updateAddressGenderAndInterests: (
    values: AddressGenderAndInterests
  ) => Promise<void>
}

// **Reducer Function**
const reducer = (
  state: ProfileStateType,
  action: ProfileAction
): ProfileStateType => {
  switch (action.type) {
    case ProfileCreateSteps.START:
      return { ...state, nextAction: ProfileCreateSteps.START }
    case ProfileCreateSteps.FIND_FRIENDS:
    case ProfileCreateSteps.PROFILE_PICTURE:
    case ProfileCreateSteps.PROFILE_COMPLETE:
      return { ...state, nextAction: action.type }
    default:
      return state
  }
}

// **Create Context**
export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
)

// **Context Provider with Proper Return Type**
export const ProfileContextProvider: React.FC<ProfileContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // **Update Profile Functions**
  const updateProfile = async (user: Partial<Profile>) => {}
  const getProfile = async () => {
    setNextAction()
  }
  const followFriens = async (friendsIds: string[]) => {
    setNextAction()
  }
  const inViteFriens = async (phoneNumbers: string[]) => {
    setNextAction()
  }
  const updateAddressGenderAndInterests = async (
    values: AddressGenderAndInterests
  ) => {
    setNextAction()
  }
  const setNextAction = () => {
    if (!state.user) {
      state.nextAction !== ProfileCreateSteps.START &&
        dispatch({ type: ProfileCreateSteps.START })
      return
    }
    if (state.user?.dob && !isNil(state.user.dob)) {
      state.nextAction !== ProfileCreateSteps.FIND_FRIENDS &&
        dispatch({ type: ProfileCreateSteps.FIND_FRIENDS })
      return
    }
    if (state.user?.profilePicture && !isNil(state.user.profilePicture)) {
      state.nextAction !== ProfileCreateSteps.PROFILE_PICTURE &&
        dispatch({ type: ProfileCreateSteps.PROFILE_COMPLETE })
      return
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        dispatch,
        updateProfile,
        getProfile,
        followFriens,
        inViteFriens,
        updateAddressGenderAndInterests,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
