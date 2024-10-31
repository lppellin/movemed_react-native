import { useEffect, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header({ navigation }: { navigation: NavigationProp<any> }) {


    const [userProfile, setUserProfile] = useState<string | null>(null);

    const iconName = userProfile === 'motorista' ? 'directions-car' : 'business';



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
        AsyncStorage.getItem('userName').then(setUserName)
        AsyncStorage.getItem('userProfile').then(setUserProfile)

    }, []);



    return (
        <View style={styles.header}>

            <Icon name={iconName} size={50} color={'#ccc'} />

            <Text style={{ fontSize: 16 }}>Olá, {userName}</Text>

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
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10,
        padding: 8,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,

    },

    btn: {
        backgroundColor: '#c7c7c7',
        borderRadius: 10,
        padding: 8,
        justifyContent: 'center',
    },

});