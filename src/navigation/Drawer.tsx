/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

// Custom imports
import DrawerContent from '../screens/DrawerContent'
import BottomTabNavigator from './Bottom'
import routes from './routes'

const Drawer = createDrawerNavigator()

const DrawerNav = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{
      headerTransparent: true,
      headerTitle: '',
    }}

    //    screenOptions={({ route }) => ({
    //   headerShown: false,
    //   headerTransparent: true,
    //   headerTitle: "",

    //   tabBarStyle: {
    //     display: getTabBarVisibility(route) ? 'none' : 'flex',
    //   },
    // })}
  >
    <Drawer.Screen name={routes.BOTTOM_TAB} component={BottomTabNavigator} />
  </Drawer.Navigator>
)

export default DrawerNav

const getTabBarVisibility = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Timeline'
  return routeName === 'Gallery'
}
