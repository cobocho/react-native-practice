import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';

import {MapHomeScreen} from '../../screens/map/MapHomeScreen';
import {CalendarHomeScreen} from '../../screens/calendar/CalendarHomeScreen';
import {FeedHomeScreen} from '../../screens/feed/FeedHomeScreen';

export const MainDrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="CalenderHome" component={CalendarHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
    </Drawer.Navigator>
  );
};
