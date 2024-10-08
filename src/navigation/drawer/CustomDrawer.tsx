import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import React from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useAuth } from '@/services/auth/query'

interface CustomDrawerProps extends DrawerContentComponentProps {}

export const CustomDrawer = (props: CustomDrawerProps) => {
  const { getProfileQuery, logoutMutation } = useAuth()
  const profile = getProfileQuery.data

  const isBlankImage =
    profile?.imageUri === null && profile?.kakaoImageUri === null

  const handleLogout = () => {
    logoutMutation.mutate({})
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {isBlankImage && (
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
        <View style={styles.menuContainer}>
          <DrawerItemList {...props} />
        </View>
        <Pressable
          onPress={handleLogout}
          style={{
            alignItems: 'flex-end',
            padding: 10,
          }}
        >
          <Text>로그아웃</Text>
        </Pressable>
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
  },
  menuContainer: {
    flex: 1,
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
