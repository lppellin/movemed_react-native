import { useCallback, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import MovimentacaoCard, { Movimentacao } from "../components/MovimentacaoCard";
import Header from "../components/Header";

export default function ListaMovimentacoes({ navigation }: { navigation: NavigationProp<any> }) {

    const [movements, setMovements] = useState<Movimentacao>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchMovements = async () => {
                try {
                    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements');
                    const sortedMovements = response.data.sort((a, b) => a.id - b.id); // Ordena pelo id em ordem crescente
                    setMovements(sortedMovements);
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