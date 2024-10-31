import axios from "axios";
import { CommonActions, NavigationProp, useFocusEffect } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard, { User } from "../components/UserCard";

export default function Usuarios({ navigation }: { navigation: NavigationProp<any> }) {

    const [users, setUsers] = useState<User[]>([]);

    //atualização dinamica toda vez que abre a tela
    useFocusEffect(
        React.useCallback(() => {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/users');
                    setUsers(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchUsers();
        }, [])
    );



    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.header}>

                <Text style={styles.title}>Usuários</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('CadastrarUsuario')}
                    style={styles.btn}>
                    <Text style={styles.buttonText}>Novo usuário</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false} // Oculta a barra de rolagem
                data={users}
                keyExtractor={user => user.id.toString()}
                renderItem={({ item }) => <UserCard user={item} />}

                ListEmptyComponent={
                    <Text>Nenhum dado encontrado.</Text>
                }


            />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginLeft: 40,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    btn: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "green",
        padding: 10,
        margin: 8,
        borderRadius: 10,
        height: 50,
        width: 120,
    },
    buttonText: {
        color: "white",
    },

})