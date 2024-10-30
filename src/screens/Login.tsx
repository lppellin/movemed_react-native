import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login({ navigation }: { navigation: NavigationProp<any> }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {

        // verifica se o usuario está logado e direciona para a tela correta
        const checkLoginStatus = async () => {
            const userProfile = await AsyncStorage.getItem('userProfile');
            console.log('userProfile:', userProfile);
            if (userProfile) {
                try {
                    let routeName = '';
                    switch (userProfile) {
                        case 'filial':
                            routeName = 'ListaMovimentacoes';
                            break;
                        case 'admin':
                            routeName = 'Home';
                            break;
                        case 'motorista':
                            routeName = 'ListaMovMotorista';
                            break;
                        default:
                            routeName = 'Login';
                            break;
                    }
                    if (routeName !== 'Login') {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: routeName }],
                            })
                        );
                    }
                } catch (error) {
                    console.error('Erro ao obter o perfil do usuaário', error);
                    navigation.navigate('Login');
                }
            } else {
                navigation.navigate('Login');
            }
        };
        checkLoginStatus();
    }, []);

    function handleLogin() {
        console.log('pressed')
        axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
            email,
            password
            // email: 'admin@gmail.com',
            // password: '123456'
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
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'ListaMovimentacoes' },
                            ],
                        })
                    )

                } else {
                    console.log('motorista logado')
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                { name: 'ListaMovMotorista' },
                            ],
                        })
                    )
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

            <Image />
            {/* adicionar imagem */}

            <Text>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text>Senha</Text>
            <TextInput
                style={styles.input}
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

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },
});
