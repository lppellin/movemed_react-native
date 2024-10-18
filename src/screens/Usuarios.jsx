import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "../components/UserCard";

export default function Usuarios() {

    const [users, setUsers] = useState([]);

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

            <TouchableOpacity style={styles.btn}>
                <Text>Novo usuário</Text>
            </TouchableOpacity>


            {/* <View style={styles.card}>
                <Image />
                <Switch />
                <Text>Nome</Text>
            </View> */}


            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <UserCard item={item} />}

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