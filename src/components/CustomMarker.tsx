import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LatLng, MapMarkerProps, Marker } from 'react-native-maps'

import { COLORS } from '@/constants/colors'

const COLOR_HEX = {
  RED: COLORS.PINK_400,
  BLUE: COLORS.BLUE_400,
  GREEN: COLORS.GREEN_400,
  YELLOW: COLORS.YELLOW_400,
  PURPLE: COLORS.PURPLE_400,
} as const

interface CustomMarkerProps extends MapMarkerProps {
  coordinate: LatLng
  color: keyof typeof COLOR_HEX
  score: number
}

const CustomMarker = ({
  coordinate,
  color,
  score,
  ...props
}: CustomMarkerProps) => {
  return (
    <Marker coordinate={coordinate} {...props}>
      <View style={styles.container}>
        <View
          style={[
            styles.marker,
            {
              backgroundColor: COLOR_HEX[color],
            },
          ]}
        >
          <View style={[styles.eye, styles.leftEye]} />
          <View style={[styles.eye, styles.rightEye]} />
          {score < 3 && <View style={[styles.mouth, styles.bad]} />}
          {score === 3 && <View style={[styles.soso]} />}
          {score > 3 && <View style={[styles.mouth, styles.good]} />}
        </View>
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: 'black',
    transform: [{ rotate: '45deg' }],
  },
  eye: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    right: 9,
  },
  mouth: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  good: {
    position: 'absolute',
    borderLeftColor: 'transparent',
  },
  bad: {
    top: 12,
    left: 12,
    borderRightColor: 'transparent',
  },
  soso: {
    width: 8,
    height: 1,
    top: 14,
    left: 11,
    backgroundColor: 'black',
    transform: [{ rotate: '-45deg' }],
  },
})

export default CustomMarker
