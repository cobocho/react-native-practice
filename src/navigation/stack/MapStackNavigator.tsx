import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import MapScreen from '@/screens/MapScreen'

export const MAP_NAVIGATION = {
  MAP_HOME: 'MapHome',
} as const

export interface MapStackParamList {
  [MAP_NAVIGATION.MAP_HOME]: undefined
  [key: string]: undefined
}

function MapStackNavigator() {
  const Stack = createStackNavigator<MapStackParamList>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MAP_NAVIGATION.MAP_HOME}
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default MapStackNavigator
