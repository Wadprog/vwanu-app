import React, { createContext, useReducer, ReactNode } from 'react'
import { Profile } from '../../types'

import { useFetchProfileQuery } from '../store/profiles'

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
  profile: Partial<Profile> | null
  nextAction: ProfileCreateSteps
  error: Error | null
}

// **Initial State**
const initialState: ProfileStateType = {
  loading: false,
  profile: null,
  nextAction: ProfileCreateSteps.START,
  error: null,
}

// **Action Types**
type ProfileAction =
  | { type: ProfileCreateSteps.START }
  | { type: ProfileCreateSteps.FIND_FRIENDS }
  | { type: ProfileCreateSteps.PROFILE_PICTURE }
  | { type: ProfileCreateSteps.PROFILE_COMPLETE }
  | { type: 'SET_PROFILE'; payload: Partial<Profile> }
  | { type: 'SET_ERROR'; payload: Error }
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
  followFriends: (friendsIds: string[]) => Promise<void>
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
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
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
  const updateProfile = async (user: Partial<Profile>) => {
    console.log({ user })
  }
  const getProfile = async () => {
    const { data: profile, isLoading, error } = useFetchProfileQuery(undefined)

    if (error) {
      console.log({ error })
      dispatch({
        type: 'SET_ERROR',
        payload: new Error('Error fetching profile'),
      })
      return
    }
    if (profile) dispatch({ type: 'SET_PROFILE', payload: profile })
    setNextAction()
  }
  const followFriends = async (friendsIds: string[]) => {
    setNextAction()
  }
  const updateAddressGenderAndInterests = async (
    values: AddressGenderAndInterests
  ) => {
    setNextAction()
  }
  const setNextAction = () => {
    if (!state.profile) {
      state.nextAction !== ProfileCreateSteps.START &&
        dispatch({ type: ProfileCreateSteps.START })
      return
    }
    if (state.profile?.dob) {
      state.nextAction !== ProfileCreateSteps.FIND_FRIENDS &&
        dispatch({ type: ProfileCreateSteps.FIND_FRIENDS })
      return
    }
    if (state.profile?.profilePicture) {
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
        followFriends,
        updateAddressGenderAndInterests,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
