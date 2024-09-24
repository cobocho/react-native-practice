import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import CalendarHomeScreen from '@/screens/CalendarHomeScreen'
import FeedHomeScreen from '@/screens/FeedHomeScreen'
import { vw } from '@/utils/dimension'

import MapStackNavigator from '../stack/MapStackNavigator'

import { CustomDrawer } from './CustomDrawer'

export const MAIN_NAVIGATION = {
  MAP: 'Map',
  Calender: 'Calender',
  Feed: 'Feed',
} as const

function DrawerIcons(roueName: string, focused: boolean) {
  let iconName = ''

  switch (roueName) {
    case MAIN_NAVIGATION.MAP:
      iconName = 'location-on'
      break
    case MAIN_NAVIGATION.Calender:
      iconName = 'event-note'
      break
    case MAIN_NAVIGATION.Feed:
      iconName = 'book'
      break
    default:
      iconName = 'location-on'
  }

  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? 'black' : 'gray'}
    />
  )
}

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
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: vw(60),
        },
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'gray',
        drawerInactiveBackgroundColor: '#f4f4f4',
        drawerActiveBackgroundColor: '#FAE2E9',
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({ focused }) => DrawerIcons(route.name, focused),
      })}
      drawerContent={CustomDrawer}
    >
      <Drawer.Screen
        name={MAIN_NAVIGATION.MAP}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
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
