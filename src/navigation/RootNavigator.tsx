import React from 'react';
import AuthStackNavigator from './stack/AuthStackNavigator';
import MainDrawerNavigator from './drawer/MainDrawerNavigator';

export const AUTH_NAVIGATION = {
  LOGIN: 'Login',
  AUTH_HOME: 'AuthHome',
} as const;

export interface AuthStackParamList {
  [AUTH_NAVIGATION.AUTH_HOME]: undefined;
  [AUTH_NAVIGATION.LOGIN]: undefined;
  [key: string]: undefined;
}

const RootNavigator = () => {
  const isLogin = false;

  return isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />;
};

export default RootNavigator;
