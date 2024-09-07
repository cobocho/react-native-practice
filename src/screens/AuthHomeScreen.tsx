import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import {
  AUTH_NAVIGATION,
  AuthStackParamList,
} from '../navigation/stack/AuthStackNavigator';

interface AuthHomeScreenProps extends StackScreenProps<AuthStackParamList> {}

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView>
      <Button
        onPress={() => navigation.push(AUTH_NAVIGATION.LOGIN)}
        title="로그인 화면으로 이동"
      />
      <Button
        onPress={() => navigation.push(AUTH_NAVIGATION.SIGNUP)}
        title="회원가입 화면으로 이동"
      />
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
