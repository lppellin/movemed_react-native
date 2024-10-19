import axios from "axios";
import { CommonActions, NavigationProp } from "@react-navigation/native";

import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard, { User } from "../components/UserCard";

export default function Usuarios({ navigation }: { navigation: NavigationProp<any> }) {

    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        axios
            .get(process.env.EXPO_PUBLIC_API_URL + '/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    return (
        <SafeAreaView>
            <Text>Usuarios</Text>

            <TouchableOpacity 
            onPress={() => navigation.navigate('CadastrarUsuario')}
            style={styles.btn}>
                <Text>Novo usuário</Text>
            </TouchableOpacity>


            {/* <View style={styles.card}>
                <Image />
                <Switch />
                <Text>Nome</Text>
            </View> */}


            <FlatList
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
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },

    btn: {
        backgroundColor: '#cecece',
    }
})