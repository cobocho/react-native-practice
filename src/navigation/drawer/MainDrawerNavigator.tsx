import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import MapScreen from '../../screens/MapScreen';
import CalendarHomeScreen from '../../screens/CalendarHomeScreen';
import FeedHomeScreen from '../../screens/FeedHomeScreen';

export const MAIN_NAVIGATION = {
  MAP: 'Map',
  Calender: 'Calender',
  Feed: 'Feed',
} as const;

export interface AuthStackParamList {
  [MAIN_NAVIGATION.MAP]: undefined;
  [MAIN_NAVIGATION.Calender]: undefined;
  [MAIN_NAVIGATION.Feed]: undefined;
  [key: string]: undefined;
}

const MainDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name={MAIN_NAVIGATION.MAP} component={MapScreen} />
      <Drawer.Screen
        name={MAIN_NAVIGATION.Calender}
        component={CalendarHomeScreen}
      />
      <Drawer.Screen name={MAIN_NAVIGATION.Feed} component={FeedHomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
