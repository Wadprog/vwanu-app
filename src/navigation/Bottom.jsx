/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// // Importing the App Navigators.
import AccountNavigator from './Account';
import ChatNavigator from './Chat';
import FeedNavigator from './Feed';

// import MiddleButton from './MainButton'
import routes from './routes';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    {/*

<Tab.Screen
        name={routes.HOME}
        component={MiddleNavigator}
        options={({ navigation }) => ({
          tabBarButton: ({ size, color }) => (
            <MiddleButton
              size={size}
              color={color}
              onPress={() => navigation.navigate(routes.HOME)}
            />
          ),
        })}
      />
*/}
    <Tab.Screen
      name={routes.TIMELINE}
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.ACCOUNT}
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name={routes.INBOX}
      component={ChatNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="chat" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
