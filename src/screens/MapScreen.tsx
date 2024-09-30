import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  LongPressEvent,
} from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { DrawerParamList } from '@/navigation/drawer/MainDrawerNavigator'
import { useUserLocation } from '@/hooks/useUserLocation'
import { usePermission } from '@/hooks/usePermission'
import CustomMarker from '@/components/CustomMarker'

function MapScreen() {
  const inset = useSafeAreaInsets()
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>()

  const { userLocation, isUserLocationError } = useUserLocation()

  const mapRef = useRef<MapView>(null)
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  usePermission('LOCATION')

  const onClickUserLocation = () => {
    if (!mapRef.current) {
      return
    }

    mapRef.current.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }

  const handleLongPress = ({ nativeEvent }: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate)
  }

  const handlePressAddPost = () => {
    if (!selectedLocation) {
      Alert.alert(
        '추가할 위치를 선택해주세요.',
        '지도를 길게 누르면 위치를 선택할 수 있습니다.',
      )
    }
  }

  console.log(userLocation)

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        ref={mapRef}
        onLongPress={handleLongPress}
      >
        <Marker
          coordinate={{
            longitude: 127.10659665561894,
            latitude: 37.506825463525566,
          }}
        />
        {selectedLocation && (
          <CustomMarker score={3} coordinate={selectedLocation} color="BLUE" />
        )}
      </MapView>
      <Pressable
        style={[
          styles.drawerButton,
          {
            top: inset.top + 20,
          },
        ]}
        onPress={() => navigation.openDrawer()}
        className="bg-primary"
      >
        <Ionicons name="menu" size={24} color="white" />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable
          style={[styles.buttonItem]}
          onPress={handlePressAddPost}
          className="bg-pink-700"
        >
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
        {!isUserLocationError && (
          <Pressable
            onPress={onClickUserLocation}
            style={[styles.buttonItem]}
            className="bg-pink-700"
          >
            <MaterialIcons name="my-location" size={24} color="white" />
          </Pressable>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  drawerButton: {
    alignItems: 'flex-end',
    position: 'absolute',
    left: -30,
    width: 75,
    paddingVertical: 10,
    paddingRight: 14,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 4,
  },
  buttonList: {
    position: 'absolute',
    gap: 12,
    bottom: 30,
    right: 15,
  },
  buttonItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    width: 45,
    height: 45,
  },
})

export default MapScreen
