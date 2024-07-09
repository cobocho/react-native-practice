import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {z} from 'zod';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {TextInput} from 'react-native-gesture-handler';
import {useAuth} from '../../api/auth';

const signUpScheme = z
  .object({
    email: z.string().email({
      message: '이메일 형식이 아닙니다.',
    }),
    password: z.string().min(1, {
      message: '비밀번호를 입력해주세요.',
    }),
    passwordConfirm: z.string().min(1, {
      message: '비밀번호를 입력해주세요.',
    }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export const SignUpScreen = () => {
  const form = useForm({
    resolver: zodResolver(signUpScheme),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const {signupMutation, loginMutation} = useAuth();

  const passwordRef = React.useRef<TextInput>(null);
  const passwordConfirmRef = React.useRef<TextInput>(null);

  const handleSubmit = async () => {
    console.log('signup success');
    await form.trigger();

    if (form.formState.errors) {
      signupMutation.mutate(
        {
          email: form.watch('email'),
          password: form.watch('password'),
        },
        {
          onSuccess: () => {
            console.log('signup success');
            loginMutation.mutate({
              email: form.watch('email'),
              password: form.watch('password'),
            });
          },
        },
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>회원가입 스크린</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={form.control}
          name="email"
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <Input
                onChangeText={onChange}
                placeholder="이메일"
                inputMode="email"
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                value={value}
                error={error ? error.message : undefined}
              />
            );
          }}
        />
        <Controller
          control={form.control}
          name="password"
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <Input
                onChangeText={onChange}
                placeholder="비밀번호"
                inputMode="text"
                textContentType="oneTimeCode"
                secureTextEntry
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmRef.current?.focus();
                }}
                value={value}
                ref={passwordRef}
                error={error ? error.message : undefined}
              />
            );
          }}
        />
        <Controller
          control={form.control}
          name="passwordConfirm"
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <Input
                onChangeText={onChange}
                placeholder="비밀번호"
                inputMode="text"
                textContentType="oneTimeCode"
                secureTextEntry
                value={value}
                ref={passwordConfirmRef}
                returnKeyType="join"
                onSubmitEditing={handleSubmit}
                error={error ? error.message : undefined}
              />
            );
          }}
        />
        <Button onPress={handleSubmit}>로그인</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 48,
  },
});
