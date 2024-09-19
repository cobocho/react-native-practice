import { Category } from '../map/model'

export interface SignupDto {
  email: string
  password: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}

export interface LoginDto extends SignupDto {}

export interface SignupResponse {}

export interface LoginResponse extends TokenResponse {}

export interface Profile {
  id: number
  email: string
  nickname: string | null
  imageUri: string | null
  kakaoImageUri: string | null
  loginType: 'email' | 'kakao' | 'apple'
}

export interface ProfileResponse extends Profile, Category {}
