import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../../screens/auth/LoginScreen';
import {SignUpScreen} from '../../screens/auth/SignUpScreen';
import {AuthHomeScreen} from '../../screens/auth/AuthHomeScreen';
import {authNavigation} from '../../constants/navigation';

export interface AuthStackParamList {
  [authNavigation.AUTH_HOME]: undefined;
  [authNavigation.LOGIN]: undefined;
  [authNavigation.SIGN_UP]: undefined;
  [key: string]: undefined;
}

export const AuthStackNavigator = () => {
  const Stack = createStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {color: 'black'},
      }}>
      <Stack.Screen
        name={authNavigation.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigation.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigation.SIGN_UP}
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
