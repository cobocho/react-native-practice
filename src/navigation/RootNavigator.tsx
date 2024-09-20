import React from 'react'

import { useAuth } from '@/services/auth/query'

import AuthStackNavigator from './stack/AuthStackNavigator'
import MainDrawerNavigator from './drawer/MainDrawerNavigator'

export const AUTH_NAVIGATION = {
  LOGIN: 'Login',
  AUTH_HOME: 'AuthHome',
} as const

export interface AuthStackParamList {
  [AUTH_NAVIGATION.AUTH_HOME]: undefined
  [AUTH_NAVIGATION.LOGIN]: undefined
  [key: string]: undefined
}

function RootNavigator() {
  const { isLogin } = useAuth()

  return isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />
}

export default RootNavigator
