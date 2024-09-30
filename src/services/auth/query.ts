import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/query'
import { removeStorage, setStorage } from '@/utils/storage'
import { removeHeader, setHeader } from '@/utils/axios'

import { authService } from './service'
import { ProfileResponse, TokenResponse } from './model'

export const authOptions = {
  signup: () => ({ mutationFn: authService.signup }),
  login: () => ({ mutationFn: authService.login }),
  refresh: () => ({
    queryFn: authService.refresh,
    queryKey: ['auth', 'access'],
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  }),
  profile: () => ({
    queryFn: authService.profile,
    queryKey: ['auth', 'profile'],
    staleTime: 1000 * 60 * 60,
  }),
}

export const useSignupMutation = (options: UseMutationCustomOptions = {}) => {
  return useMutation({
    ...authOptions.signup(),
    ...options,
  })
}

export const useLogoutMutation = (options: UseMutationCustomOptions = {}) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      removeHeader('Authorization')
      removeStorage('refreshToken')
      client.resetQueries({
        queryKey: ['auth'],
      })
    },
    ...options,
  })
}

export const useLoginMutation = (options: UseMutationCustomOptions = {}) => {
  const client = useQueryClient()

  return useMutation({
    ...authOptions.login(),
    ...options,
    onSuccess: (data, v, c) => {
      setHeader('Authorization', `Bearer ${data.accessToken}`)
      setStorage('accessToken', data.accessToken)
      setStorage('refreshToken', data.refreshToken)

      options?.onSuccess?.(data, v, c)
    },
    onSettled: (d, e, v, c) => {
      client.refetchQueries({
        queryKey: authOptions.refresh().queryKey,
      })
      client.invalidateQueries({
        queryKey: authOptions.profile().queryKey,
      })

      options?.onSettled?.(d, e, v, c)
    },
  })
}

export const useRefreshQuery = (
  options?: UseQueryCustomOptions<TokenResponse>,
) => {
  const refreshQuery = useQuery({ ...authOptions.refresh(), ...options })

  useEffect(() => {
    if (refreshQuery.isSuccess) {
      setHeader('Authorization', `Bearer ${refreshQuery.data.accessToken}`)
      setStorage('accessToken', refreshQuery.data.accessToken)
      setStorage('refreshToken', refreshQuery.data.refreshToken)
    }
  }, [refreshQuery.isSuccess])

  useEffect(() => {
    if (refreshQuery.isError) {
      removeStorage('accessToken')
      removeStorage('refreshToken')
      removeHeader('Authorization')
    }
  }, [refreshQuery.isError])

  return refreshQuery
}

export const useProfileQuery = (
  options?: UseQueryCustomOptions<ProfileResponse>,
) => {
  return useQuery<ProfileResponse>({
    ...authOptions.profile(),
    ...options,
  })
}

export const useAuth = () => {
  const signupMutation = useSignupMutation()
  const loginMutation = useLoginMutation()
  const refreshQuery = useRefreshQuery()
  const getProfileQuery = useProfileQuery({
    enabled: refreshQuery.isSuccess,
  })
  const isLogin = getProfileQuery.isSuccess
  const logoutMutation = useLogoutMutation()

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    refreshQuery,
    getProfileQuery,
    isLogin,
  }
}
