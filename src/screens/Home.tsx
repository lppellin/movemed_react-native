import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Home({ navigation }: { navigation: NavigationProp<any> }) {


    const handleLogout = async () => {
        await AsyncStorage.removeItem('userProfile');
        await AsyncStorage.removeItem('userName');

        console.log('user logged out');

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    };


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <StatusBar style="auto" />

            <Header />

            <Text>Home</Text>

            <Button title="logout" onPress={handleLogout} />

        </SafeAreaView>
    );
}