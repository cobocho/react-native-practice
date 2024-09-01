import React from 'react';

import {AuthStackNavigator} from '../stack/AuthStackNavigator';
import {MainDrawerNavigator} from '../drawer/MainDrawerNavigator';
import {useAuth} from '../../api/auth';

export const RootNavigator = () => {
  const {isLogin} = useAuth();

  return isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />;
};
