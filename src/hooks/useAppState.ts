import { useRef, useState, useEffect } from 'react'
import { AppState } from 'react-native'

export const useAppState = () => {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const [isComeback, setIsComeback] = useState(false)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/background/) && nextAppState === 'active') {
        setIsComeback(true)
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return { appStateVisible, isComeback }
}
