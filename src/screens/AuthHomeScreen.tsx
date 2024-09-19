import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'

import {
  AUTH_NAVIGATION,
  AuthStackParamList,
} from '../navigation/stack/AuthStackNavigator'
import Button from '../components/Button'
import Logo from '../assets/matzip.png'

interface AuthHomeScreenProps extends StackScreenProps<AuthStackParamList> {}

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
  return (
    <SafeAreaView className="flex-1 mx-30">
      <View className="w-[50vw] mx-auto flex-[1.5]">
        <Image className="w-full h-full" resizeMode="contain" source={Logo} />
      </View>
      <View className="flex-1 gap-10">
        <Button onPress={() => navigation.push(AUTH_NAVIGATION.LOGIN)}>
          로그인
        </Button>
        <Button
          variant="secondary"
          onPress={() => navigation.push(AUTH_NAVIGATION.SIGNUP)}
        >
          회원가입
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default AuthHomeScreen
