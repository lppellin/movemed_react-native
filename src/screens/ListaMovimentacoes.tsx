import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView, Text, Touchable, TouchableOpacity, View } from "react-native";
import MovimentacaoCard, { Movimentacao } from "../components/MovimentacaoCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function ListaMovimentacoes({ navigation }: { navigation: NavigationProp<any> }) {

    const [movements, setMovements] = useState<Movimentacao>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchMovements = async () => {
                try {
                    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements');
                    setMovements(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchMovements();
        }, [])
    )


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar style="auto" />

            <Header navigation={navigation} />

            <FlatList
                data={movements}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <MovimentacaoCard movimentacao={item} />}

                ListEmptyComponent={
                    <Text>Nenhum dado encontrado.</Text>
                }
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('NovaMovimentacao')}
            >
                <Text style={styles.buttonText}>Adicionar Movimentação</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({


    btn: {
        alignItems: "center",
        textAlignVertical: "center",
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: "green",
        margin: 8,
        borderRadius: 10,
        height: 50,
        width: 250,
    },
    buttonText: {
        color: "white",
        textAlignVertical: "center",
    },

})