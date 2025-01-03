import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				screenOptions={{
					headerShown: false,
				}}
			>
				<Drawer.Screen
					name="(home)/home"
					options={{
						drawerLabel: 'Home',
						title: 'Home',
					}}
				/>
				<Drawer.Screen
					name="(feed)/feed"
					options={{
						drawerLabel: 'Feed',
						title: 'Feed',
					}}
				/>
				<Drawer.Screen
					name="(calendar)/calendar"
					options={{
						drawerLabel: 'Calendar',
						title: 'Calendar',
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
