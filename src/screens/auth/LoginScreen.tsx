import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {z} from 'zod';
import {useForm,Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {TextInput} from 'react-native-gesture-handler';

import {Button} from '../../components/Button/Button';
import {Input} from '../../components/Input/Input';

const loginScheme = z.object({
  email: z.string().email({
    message: '이메일 형식이 아닙니다.',
  }),
  password: z.string().min(1, {
    message: '비밀번호를 입력해주세요.',
  }),
});

export const LoginScreen = () => {
  const form = useForm({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const passwordRef = React.useRef<TextInput>(null);

  const handleSubmit = async () => {
    await form.trigger();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>로그인 스크린</Text>
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
                ref={passwordRef}
                returnKeyType="next"
                blurOnSubmit={false}
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
                id="password"
                secureTextEntry
                value={value}
                ref={passwordRef}
                onSubmitEditing={() => {
                  handleSubmit();
                }}
                error={error ? error.message : undefined}
              />
            );
          }}
        />
      </View>
      <Button onPress={handleSubmit}>로그인</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 28,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 48,
  },
});
