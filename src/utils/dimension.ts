import {Dimensions} from 'react-native';

export const vw = (value: number) =>
  Dimensions.get('screen').width * (value / 100);

export const vh = (value: number) =>
  Dimensions.get('screen').height * (value / 100);
