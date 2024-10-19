import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CadastrarUsuario() {


    const [profile, setProfile] = useState('motorista') //inicia com motorista
    const [document, setDocument] = useState('') //cpf ou cnpj
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (



        <SafeAreaView style={styles.container}>

            <Text>Cadastrar Usuário</Text>



            <ScrollView >

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
                    <Text> Digite o {profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
                    <TextInput
                        placeholder=""
                        value={document}
                        onChangeText={setDocument}
                        keyboardType="numeric"
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
                        value={address}
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

                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.btn}
                >
                    <Text>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>


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