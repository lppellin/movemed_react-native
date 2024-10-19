import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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

    return (

        <SafeAreaView style={styles.container}>
            <Text>Cadastrar Usuário</Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Comportamento diferente para iOS e Android
            >
                <ScrollView >

                    <Image />

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
                        <Text>Salvar</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexGrow: 1, // Isso permite que o ScrollView cresça conforme necessário
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },

    btn: {
        backgroundColor: '#cecece',
    },

    pickerContainer: {
        borderColor: '#304ed6',
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
    },


});