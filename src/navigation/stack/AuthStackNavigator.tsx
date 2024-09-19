import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import AuthHomeScreen from '../../screens/AuthHomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import SignupScreen from '../../screens/SignupScreen'

export const AUTH_NAVIGATION = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const

export interface AuthStackParamList {
  [AUTH_NAVIGATION.AUTH_HOME]: undefined
  [AUTH_NAVIGATION.LOGIN]: undefined
  [key: string]: undefined
}

function AuthStackNavigator() {
  const Stack = createStackNavigator<AuthStackParamList>()

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: 'white', shadowColor: 'gray' },
        headerTitleStyle: { color: 'black' },
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name={AUTH_NAVIGATION.AUTH_HOME}
        component={AuthHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AUTH_NAVIGATION.LOGIN}
        component={LoginScreen}
        options={{
          title: '로그인',
        }}
      />
      <Stack.Screen
        name={AUTH_NAVIGATION.SIGNUP}
        component={SignupScreen}
        options={{
          title: '회원가입',
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthStackNavigator
