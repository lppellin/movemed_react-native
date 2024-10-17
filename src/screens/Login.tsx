import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login({ navigation }: { navigation: NavigationProp<any> }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        const checkLoginStatus = async () => {
            const userProfile = await AsyncStorage.getItem('userProfile');
            if (userProfile) {
                // Se o perfil do usuário estiver armazenado, redirecionar para a tela Home
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                );
            }
        };
        checkLoginStatus(); // Chamar a função para verificar o status de login
    }, []);


    function handleLogin() {
        axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
            // email: 'email',
            // password: 'password'
            email: 'admin@gmail.com',
            password: '123456'
        })
            .then(async (response) => {
                console.log(response.data);

                // Salvar nome e perfil no AsyncStorage
                await AsyncStorage.setItem('userName', response.data.name);
                await AsyncStorage.setItem('userProfile', response.data.profile);

                if (response.data.profile === 'admin') {
                    console.log('admin logado')

                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'Home' },
                            ],
                        })
                    )


                } else if (response.data.profile === 'filial') {
                    console.log('filial logado')

                } else {
                    console.log('motorista logado')
                }

            })
            .catch(() => {
                console.log('login error')
                Alert.alert('Email ou senha inválidos')
            })

    }


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <StatusBar style="auto" />

            {/* <Image source={} /> */}

            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
            />

            <Text>Senha</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity onPress={handleLogin}  >
                <Text>Login</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}