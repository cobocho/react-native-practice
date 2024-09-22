import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'

import CalendarHomeScreen from '@/screens/CalendarHomeScreen'
import FeedHomeScreen from '@/screens/FeedHomeScreen'

import MapStackNavigator from '../stack/MapStackNavigator'

export const MAIN_NAVIGATION = {
  MAP: 'Map',
  Calender: 'Calender',
  Feed: 'Feed',
} as const

export interface DrawerParamList {
  [MAIN_NAVIGATION.MAP]: undefined
  [MAIN_NAVIGATION.Calender]: undefined
  [MAIN_NAVIGATION.Feed]: undefined
  [key: string]: undefined
}

function MainDrawerNavigator() {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen
        name={MAIN_NAVIGATION.MAP}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={MAIN_NAVIGATION.Calender}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
      <Drawer.Screen
        name={MAIN_NAVIGATION.Feed}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
    </Drawer.Navigator>
  )
}

export default MainDrawerNavigator
