import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView, Text, Touchable, TouchableOpacity, View } from "react-native";
import MovimentacaoCard, { Movimentacao } from "../components/MovimentacaoCard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";

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
            <Header navigation={navigation} />

            <TouchableOpacity onPress={() => navigation.navigate('NovaMovimentacao')}>
                <Text>Adicionar Movimentação</Text>
            </TouchableOpacity>


            <FlatList
                data={movements}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <MovimentacaoCard movimentacao={item} />}

                ListEmptyComponent={
                    <Text>Nenhum dado encontrado.</Text>
                }


            />

            {/* <MovimentacaoCard /> */}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
    }

})