import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './Auth.navigation';
import AppNavigation from './Drawer';
import { getCurrentUser } from '../store/auth';

// import AppTheme from './theme'
// import storage from '../utility/secureCache'
// import { logged } from '../store/auth'

function Routes() {
  const auth = useSelector(getCurrentUser);
  //   const dispatch = useDispatch()
  //   const restoreUser = async () => {
  // const token = await storage.get('auth')
  // if (!token) return
  // dispatch({ type: logged, payload: { token } })
  //   }

  //   useEffect(() => {
  //     restoreUser()
  //   }, [])
  return (
    <NavigationContainer>
      {auth.user ? <AppNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default Routes;
