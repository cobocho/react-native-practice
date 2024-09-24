import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { useAuth } from '@/services/auth/query'

interface CustomDrawerProps extends DrawerContentComponentProps {}

export const CustomDrawer = (props: CustomDrawerProps) => {
  const { getProfileQuery } = useAuth()
  const profile = getProfileQuery.data

  const blankImage =
    profile?.imageUri === null && profile?.kakaoImageUri === null

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {blankImage && (
              <Image
                source={require('../../assets/user-default.png')}
                style={styles.userImage}
              />
            )}
            {profile?.imageUri && profile.loginType !== 'kakao' && (
              <Image
                source={{ uri: profile.imageUri }}
                style={styles.userImage}
              />
            )}
            {profile?.kakaoImageUri && profile.loginType === 'kakao' && (
              <Image
                source={{ uri: profile.kakaoImageUri }}
                style={styles.userImage}
              />
            )}
          </View>
          <Text>{profile?.email || ''}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
})
