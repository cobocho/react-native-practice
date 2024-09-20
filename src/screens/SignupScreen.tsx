import React, { useRef } from 'react'
import { SafeAreaView, TextInput } from 'react-native'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/Input'
import Button from '@/components/Button'
import { useAuth } from '@/services/auth/query'

const signupScheme = z
  .object({
    email: z.string().email('이메일 형식이 올바르지 않습니다'),
    password: z.string().min(8, {
      message: '비밀번호는 최소 8자 이상이어야 합니다',
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  })

function SignupScreen() {
  const signupForm = useForm({
    resolver: zodResolver(signupScheme),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const { signupMutation, loginMutation } = useAuth()

  const onSubmit = async () => {
    await signupForm.trigger()

    if (signupForm.formState.isValid) {
      const { email, password } = signupForm.getValues()
      signupMutation.mutate(
        { email, password },
        {
          onSuccess: () => {
            loginMutation.mutate(
              { email, password },
              {
                onSuccess: () => {
                  console.log('login success')
                },
              },
            )
          },
        },
      )
    }
  }

  const pwRef = useRef<TextInput>(null)
  const pwConfirmRef = useRef<TextInput>(null)

  return (
    <SafeAreaView className="m-[30px]" style={styles.container}>
      <Controller
        control={signupForm.control}
        name="email"
        render={({ field }) => (
          <Input
            placeholder="이메일"
            inputMode="email"
            autoCapitalize="none"
            onBlur={() => signupForm.trigger('email')}
            onChangeText={field.onChange}
            value={field.value}
            errorMessage={signupForm.formState.errors.email?.message}
            blurOnSubmit={false}
            onSubmitEditing={() => pwRef.current?.focus()}
            returnKeyType="next"
          />
        )}
      />
      <Controller
        control={signupForm.control}
        name="password"
        render={({ field }) => (
          <Input
            placeholder="비밀번호"
            secureTextEntry
            autoCapitalize="none"
            onBlur={() => signupForm.trigger('password')}
            onChangeText={field.onChange}
            value={field.value}
            blurOnSubmit={false}
            textContentType="oneTimeCode"
            onSubmitEditing={() => pwConfirmRef.current?.focus()}
            returnKeyType="next"
            errorMessage={signupForm.formState.errors.password?.message}
            ref={pwRef}
          />
        )}
      />
      <Controller
        control={signupForm.control}
        name="passwordConfirm"
        render={({ field }) => (
          <Input
            placeholder="비밀번호 확인"
            secureTextEntry
            autoCapitalize="none"
            textContentType="oneTimeCode"
            onBlur={() => signupForm.trigger('passwordConfirm')}
            onChangeText={field.onChange}
            value={field.value}
            errorMessage={signupForm.formState.errors.passwordConfirm?.message}
            returnKeyType="join"
            ref={pwConfirmRef}
          />
        )}
      />
      <Button onPress={onSubmit}>로그인</Button>
    </SafeAreaView>
  )
}

const styles = {
  container: {
    gap: 30,
  },
}

export default SignupScreen
