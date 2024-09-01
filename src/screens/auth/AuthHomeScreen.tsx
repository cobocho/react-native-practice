import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator'
import { authNavigation } from '../../constants/navigation'
import { Button } from '../../components/Button/Button'
import { dvw } from '../../utils/style'
import logo from '../../assets/MATZIP.png'

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>

export const AuthHomeScreen = ({ navigation }: AuthHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={logo as ImageSourcePropType}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate(authNavigation.LOGIN)}>
          로그인 화면으로 이동
        </Button>
        <Button
          variant="outlined"
          onPress={() => navigation.navigate(authNavigation.SIGN_UP)}
        >
          회원가입 화면으로 이동
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    width: dvw(50),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    gap: 10,
  },
})
