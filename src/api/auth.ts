import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Category, Profile} from '../types/domain';
import {axiosInstance} from '../utils/axios';
import {
  getEncryptStorage,
  removeEncryptStorage,
  setEncryptStorage,
} from '../utils/encryptStorage';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '../types/query';
import {useEffect} from 'react';

interface SignupDto {
  email: string;
  password: string;
}

export const postSignup = async ({
  email,
  password,
}: SignupDto): Promise<void> => {
  await axiosInstance.post('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({email, password}),
  });
};

interface LoginDto {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const postLogin = async ({
  email,
  password,
}: LoginDto): Promise<LoginResponse> => {
  const {data} = await axiosInstance.post<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({email, password}),
  });

  return data;
};

export const useSignup = (options?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...options,
  });
};

export const useLogin = (options?: UseMutationCustomOptions<LoginResponse>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async data => {
      const {accessToken, refreshToken} = data;

      await setEncryptStorage('refreshToken', refreshToken);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth', 'accessToken'],
      });
      queryClient.invalidateQueries({
        queryKey: ['auth', 'profile'],
      });
    },
    ...options,
  });
};

type ProfileResponse = Profile & Category;

export const getProfile = async () => {
  const {data} = await axiosInstance.get<ProfileResponse>('/auth/me');
  return data;
};

export const useGetProfile = (
  options?: UseQueryCustomOptions<ProfileResponse>,
) => {
  return useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: getProfile,
    ...options,
  });
};

export const getAccessToken = async () => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get<LoginResponse>('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

export const useGetRefreshToken = (
  options?: UseQueryCustomOptions<LoginResponse>,
) => {
  const {data, isSuccess, isError, ...rest} = useQuery({
    queryKey: ['auth', 'accessToken'],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    ...options,
  });

  useEffect(() => {
    if (isSuccess) {
      const {accessToken, refreshToken} = data;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      setEncryptStorage('refreshToken', refreshToken);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      axiosInstance.defaults.headers.common.Authorization = undefined;
      removeEncryptStorage('refreshToken');
    }
  });

  return {data, isSuccess, isError, ...rest};
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

const useLogout = (options?: UseMutationCustomOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeEncryptStorage('refreshToken');
      axiosInstance.defaults.headers.common.Authorization = undefined;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth'],
      });
    },
    ...options,
  });
};

export const useAuth = () => {
  const signupMutation = useSignup();
  const refreshQuery = useGetRefreshToken();
  const loginMutation = useLogin();
  const getProfileQuery = useGetProfile({
    enabled: refreshQuery.isSuccess,
  });
  const logoutMutation = useLogout();
  const isLogin = getProfileQuery.isSuccess;

  return {
    signupMutation,
    refreshQuery,
    loginMutation,
    getProfileQuery,
    logoutMutation,
    isLogin,
  };
};
