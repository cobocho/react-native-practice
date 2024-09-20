import React from 'react'
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default MapScreen
