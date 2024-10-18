import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function Header({ navigation }: { navigation: NavigationProp<any> }) {

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

    const [userName, setUserName] = useState<string | null>(null);


    useEffect(() => {
        AsyncStorage.getItem('userProfile').then(setUserName)
        //verificar se fica userProfile mesmo

    }, []);



    return (
        <View style={styles.header}>
            
            <Image />
            {/* adicionar imagem */}

            <Text>Olá, {userName}</Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    btn: {
        backgroundColor: '#baafe0',
    }
});