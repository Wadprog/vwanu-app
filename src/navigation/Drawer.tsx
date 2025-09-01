/**
 * Main Drawer Navigator
 * Provides side drawer navigation with swipe gesture support
 */
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Configuration
import { drawerConfig } from './config/navigationConfig'
import routes from './routes'

// Components
import DrawerContent from '../screens/DrawerContent'
import BottomTabNavigator from './Bottom'

const Drawer = createDrawerNavigator()

/**
 * Main drawer navigator component
 * Accessible via swipe gestures from left edge
 */
const DrawerNavigator: React.FC = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={drawerConfig}
  >
    <Drawer.Screen
      name={routes.BOTTOM_TAB}
      component={BottomTabNavigator}
      options={{ title: 'Main' }} // Better accessibility
    />
  </Drawer.Navigator>
)

export default DrawerNavigator
