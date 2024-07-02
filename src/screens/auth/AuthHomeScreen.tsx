import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigation} from '../../constants/navigation';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

export const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate(authNavigation.LOGIN)}
        />
        <Button
          title="회원가입 화면으로 이동"
          onPress={() => navigation.navigate(authNavigation.SIGN_UP)}
        />
      </View>
    </SafeAreaView>
  );
};
