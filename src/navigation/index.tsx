/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AppNavigation from './Drawer'
import AuthNavigator from './Auth.navigation'
import * as storage from '../lib/secureCache'
import BoardingNavigator from './boarding.navigation'
import { getCurrentUser, logged } from '../store/auth'

function Routes() {
  const auth = useSelector(getCurrentUser)
  const dispatch = useDispatch()

  const { boarded } = auth

  const restoreUser = async () => {
    const token = await storage.get('auth')
    if (!token) return
    dispatch({ type: logged, payload: { token } })
  }

  React.useEffect(() => {
    restoreUser()
  }, [])
  return (
    <>
      {!auth?.registered ? (
        <>{boarded ? <AuthNavigator /> : <BoardingNavigator />}</>
      ) : (
        <AppNavigation />
      )}
    </>
  )
}

export default Routes
