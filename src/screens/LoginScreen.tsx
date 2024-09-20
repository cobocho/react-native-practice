import React from 'react'
import { SafeAreaView } from 'react-native'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@/components/Input'
import Button from '@/components/Button'

const loginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginScreen() {
  const loginForm = useForm({
    resolver: zodResolver(loginScheme),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async () => {
    await loginForm.trigger()
  }

  return (
    <SafeAreaView className="m-[30px]" style={styles.container}>
      <Controller
        control={loginForm.control}
        name="email"
        render={({ field }) => (
          <Input
            placeholder="이메일"
            inputMode="email"
            onBlur={() => loginForm.trigger('email')}
            onChangeText={field.onChange}
            value={field.value}
            errorMessage={loginForm.formState.errors.email?.message}
          />
        )}
      />
      <Controller
        control={loginForm.control}
        name="password"
        render={({ field }) => (
          <Input
            placeholder="비밀번호"
            secureTextEntry
            onBlur={() => loginForm.trigger('password')}
            onChangeText={field.onChange}
            value={field.value}
            errorMessage={loginForm.formState.errors.password?.message}
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

export default LoginScreen
