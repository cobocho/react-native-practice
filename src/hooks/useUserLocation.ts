import { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'

import { useAppState } from './useAppState'

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0,
  })
  const [isUserLocationError, setIsUserLocationError] = useState(false)
  const { isComeback } = useAppState()
  console.log(isComeback)

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords
        setUserLocation({
          latitude,
          longitude,
        })
        setIsUserLocationError(false)
      },
      () => {
        setIsUserLocationError(true)
      },
      {
        enableHighAccuracy: true,
      },
    )
  }, [isComeback])

  return {
    userLocation,
    isUserLocationError,
  }
}
