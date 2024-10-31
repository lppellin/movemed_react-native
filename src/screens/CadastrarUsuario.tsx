import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CadastrarUsuario() {


    const [profile, setProfile] = useState('motorista') //inicia com motorista
    const [document, setDocument] = useState('') //cpf ou cnpj
    const [name, setName] = useState('')
    const [full_address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleSubmit = async () => {
        if (!name || !document || !full_address || !email || !password || !confirmPassword) {
            Alert.alert('Todos os campos são obrigatórios!');
            return;
        }

        // Verifica se as senhas são iguais
        if (password !== confirmPassword) {
            Alert.alert('As senhas não correspondem!');
            return;
        }

        // Validação de CPF/CNPJ 
        if (profile === 'motorista' && document.length !== 11) {
            Alert.alert('CPF deve ter 11 dígitos!');
            return;
        } else if (profile === 'filial' && document.length !== 14) {
            Alert.alert('CNPJ deve ter 14 dígitos!');
            return;
        }

        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/register`, {
                profile,
                name,
                document,
                full_address,
                email,
                password,
            });
            Alert.alert('Usuário cadastrado com sucesso!');
            // Limpar os campos após o sucesso
            setName('');
            setDocument('');
            setAddress('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao cadastrar o usuário!');
        }
    }

    // Definindo os ícones com base no perfil selecionado
    const motoristaIconColor = profile === 'motorista' ? 'green' : '#ccc';
    const filialIconColor = profile === 'filial' ? 'green' : '#ccc';

    return (

        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Cadastrar Usuário</Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Comportamento diferente para iOS e Android
            >
                <View style={styles.formContainer}>

                    <ScrollView
                        showsVerticalScrollIndicator={false} // Oculta a barra de rolagem
                    >

                        <View style={styles.iconRow}>
                            <Icon
                                name="directions-car"
                                size={50}
                                color={motoristaIconColor} // Cor controlada pela lógica de seleção
                                style={styles.icon}
                            />
                            <Icon
                                name="business"
                                size={50}
                                color={filialIconColor} // Cor controlada pela lógica de seleção
                                style={styles.icon}
                            />
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text>Selecione o perfil</Text>
                            <Picker
                                selectedValue={profile}
                                onValueChange={(itemValue) => setProfile(itemValue)}
                            >
                                <Picker.Item label="Motorista" value="motorista" />
                                <Picker.Item label="Filial" value="filial" />
                            </Picker>
                        </View>



                        <View>
                            <Text> {profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
                            <TextInput
                                placeholder=""
                                value={document}
                                onChangeText={setDocument}
                                keyboardType="numeric"
                                maxLength={profile === 'motorista' ? 11 : 14} // Limita o número de caracteres
                                style={styles.input}
                            />

                            <Text>Nome completo</Text>
                            <TextInput
                                placeholder=""
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />

                            <Text>Endereço completo</Text>
                            <TextInput
                                placeholder=""
                                value={full_address}
                                onChangeText={setAddress}
                                style={styles.input}
                            />


                            <Text>E-mail</Text>
                            <TextInput
                                placeholder=""
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                style={styles.input}
                            />


                            <Text>Senha</Text>
                            <TextInput
                                placeholder=""
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>

                        <Text>Confirme a Senha</Text>
                        <TextInput
                            placeholder=""
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={styles.input}
                        />


                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={styles.btn}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>



        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexGrow: 1, // Isso permite que o ScrollView cresça conforme necessário
        marginTop: 60,
    },

    formContainer: {
        margin: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "#ccc",
        padding: 10,

    },

    input: {
        height: 40,
        margin: 12,
        marginHorizontal: 'auto',
        borderWidth: 1,
        padding: 10,
        width: 300,
        borderRadius: 8,
        borderColor: "#ccc",
    },

    btn: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: "green",
        margin: 8,
        padding: 8,
        borderRadius: 10,
        height: 50,
        width: 150,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },

    pickerContainer: {
        // borderWidth: 1,
        // borderRadius: 5,
        justifyContent: 'center',
        marginVertical: 8,
    },

    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
    },

    icon: {
        marginHorizontal: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});