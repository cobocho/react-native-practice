import React from 'react';
import {AuthStackNavigator} from '../stack/AuthStackNavigator';
import {MainDrawerNavigator} from '../drawer/MainDrawerNavigator';

export const RootNavigator = () => {
  const isLoggedIn = false;

  return isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />;
};
