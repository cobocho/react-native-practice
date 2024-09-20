import './gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import RootNavigator from '@/navigation/RootNavigator'

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={new QueryClient()}>
        <RootNavigator />
      </QueryClientProvider>
    </NavigationContainer>
  )
}

export default App
