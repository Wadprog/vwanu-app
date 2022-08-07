import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login.screen';
import RegisterScreen from '../screens/Register.screen';
import SignUpScreen from '../screens/Registration/RegistrationFristStep.screen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={RegisterScreen} />
    <Stack.Screen name="SignUpStep" component={SignUpScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
