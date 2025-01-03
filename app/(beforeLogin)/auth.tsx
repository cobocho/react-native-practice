import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const AuthHomeScreen = () => {
	return (
		<View>
			<Text>Auth Home</Text>
			<Button
				title="Login"
				onPress={() => router.push('/(auth)/login')}
			/>
			<Button
				title="Signup"
				onPress={() => router.push('/(auth)/signup')}
			/>
		</View>
	);
};

export default AuthHomeScreen;
