import React from 'react'
import { ProfileContext, ProfileContextType } from 'contexts/ProfileContext'

export { ProfileCreateSteps } from 'contexts/ProfileContext'

const useProfileContext = (): ProfileContextType => {
  const context = React.useContext(ProfileContext)
  if (!context) {
    throw new Error(
      'useProfileContext must be used within a ProfileContextProvider'
    )
  }
  return context
}
export default useProfileContext
