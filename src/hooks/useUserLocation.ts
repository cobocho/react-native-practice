import { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'

import { useAppState } from './useAppState'

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  }>({
    longitude: 127.10659665561894,
    latitude: 37.506825463525566,
  })
  const [isUserLocationError, setIsUserLocationError] = useState(false)
  const { isComeback } = useAppState()

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
