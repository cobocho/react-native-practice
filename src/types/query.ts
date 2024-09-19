import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export type ResponseError = AxiosError<{
  statusCode: string
  message: string
  error: string
}>

export type UseMutationCustomOptions<TD = unknown> = Omit<
  UseMutationOptions<TD, ResponseError, unknown>,
  'mutationFn'
>

export type UseQueryCustomOptions<TD = unknown> = Omit<
  UseQueryOptions<TD, unknown, TD>,
  'queryFn' | 'queryKey'
>
