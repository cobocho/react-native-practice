import { axiosInstance, removeHeader } from '@/utils/axios'
import { getStorage } from '@/utils/storage'

import {
  LoginDto,
  LoginResponse,
  ProfileResponse,
  SignupDto,
  SignupResponse,
  TokenResponse,
} from './model'

export const authService = {
  login: async (dto: LoginDto) => {
    const { data } = await axiosInstance.post<LoginResponse>(
      '/auth/signin',
      dto,
    )
    return data
  },
  signup: async (dto: SignupDto) => {
    removeHeader('Authorization')
    const { data } = await axiosInstance.post<SignupResponse>(
      '/auth/signup',
      dto,
    )
    return data
  },
  profile: async () => {
    const { data } = await axiosInstance.get<ProfileResponse>('/auth/me')
    return data
  },
  refresh: async () => {
    const refreshToken = await getStorage('refreshToken')

    console.log('/auth/refresh')

    const { data } = await axiosInstance.get<TokenResponse>('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    return data
  },
  logout: async () => {
    await axiosInstance.post('/auth/logout')
  },
}
