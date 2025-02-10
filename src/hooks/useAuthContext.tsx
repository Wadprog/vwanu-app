import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'
export { AuthState } from '../contexts/AuthContext'

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthContext must be used within a AuthProvider')
  }

  return context
}

export default useAuthContext
