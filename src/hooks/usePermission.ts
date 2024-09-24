import { useEffect } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

const androidPermissions = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
} as const

const iosPermissions = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
} as const

type Permission = keyof typeof androidPermissions | keyof typeof iosPermissions

const alerts: Record<
  Permission,
  {
    title: string
    message: string
  }
> = {
  LOCATION: {
    title: '위치 권한이 필요합니다.',
    message: '위치 권한을 허용해주세요.',
  },
  PHOTO: {
    title: '사진 권한이 필요합니다.',
    message: '사진 권한을 허용해주세요.',
  },
}

export const usePermission = (permission: Permission) => {
  useEffect(() => {
    ;(async () => {
      const isAndroid = Platform.OS === 'android'
      const permissionOS = isAndroid ? androidPermissions : iosPermissions

      const checked = await check(permissionOS[permission])

      const showPermissionAlert = () => {
        Alert.alert(alerts[permission].title, alerts[permission].message, [
          {
            text: '설정하기',
            onPress: () => Linking.openSettings(),
          },
          {
            text: '취소',
            style: 'cancel',
            onPress: () => {},
          },
        ])
      }

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert()
            return
          }
          await request(permissionOS[permission])
          break
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert()
      }
    })()
  }, [permission])
}
