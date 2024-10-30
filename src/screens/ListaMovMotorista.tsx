import { Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { Movimentacao } from "../components/MovimentacaoCard";
import axios from "axios";
import { Camera } from "react-native-maps";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ListaMovMotorista({ navigation }: { navigation: NavigationProp<any> }) {


    const [movements, setMovements] = useState<Movimentacao[]>([]);
    const [motorista, setMotorista] = useState("");

    // const [camera, setCamera] = useState<Camera | null>(null);
    // const cameraRef = useRef<Camera>(null);


    const fetchMotorista = async () => {
        const storedMotorista = await AsyncStorage.getItem("userName");
        if (storedMotorista) setMotorista(storedMotorista);
    };
    // console.log("Motorista:", motorista);


    const fetchMovements = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/movements`);
            setMovements(response.data);
        } catch (error) {
            console.error("Erro ao buscar movimentações:", error);
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchMovements();
            fetchMotorista();
        }, [])
    );


    const handleStartDelivery = async (id: number) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária para acessar a câmera');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const photoUri = result.assets[0].uri;
            const formData = new FormData();
            formData.append("file", {
                uri: photoUri,
                name: `delivery_${id}.jpg`,
                type: "image/jpeg"
            } as any);
            formData.append("motorista", motorista);
            try {
                await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/movements/${id}/start`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Alert.alert("Entrega iniciada com sucesso");
                fetchMovements();  // Atualizar a lista após a requisição
            } catch (error) {
                console.error("Erro ao iniciar a entrega:", error);
            }
        }
    };


    const handleFisnishDelivery = async (id: number) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária para acessar a câmera');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const photoUri = result.assets[0].uri;
            const formData = new FormData();
            formData.append("file", {
                uri: photoUri,
                name: `delivery_${id}.jpg`,
                type: "image/jpeg"
            } as any);
            try {
                await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/movements/${id}/end`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Alert.alert("Entrega finalizada com sucesso");
                fetchMovements();  // Atualizar a lista após a requisição
            } catch (error) {
                console.error("Erro ao finalizar a entrega:", error);
            }
        }
    };

    const renderItem = ({ item }: { item: Movimentacao }) => (
        <View style={[styles.card, item.status === "created" ? styles.created : item.status === "em transito" ? styles.inTransit : styles.finalized]}>

            <Text style={{ alignSelf: 'flex-end', fontWeight: "bold" }}>#{item.id}</Text>

            <View style={styles.cardHeader}>
                <Image source={{ uri: item.produto.imagem }} style={styles.image} />
                <View style={{ gap: 5 }}>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Produto: </Text>
                        {item.produto.nome}</Text>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Quantidade: </Text>
                        {item.quantidade}</Text>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Status: </Text>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={{ gap: 5 }}>
                <Text>
                    <Text style={{ fontWeight: "bold" }}>Origem: </Text>
                    {item.origem.nome}</Text>
                <Text>
                    <Text style={{ fontWeight: "bold" }}>Destino: </Text>
                    {item.destino.nome}</Text>
            </View>

            <View style={styles.buttonsCard}>

                {item.status === "created" && (
                    <TouchableOpacity
                        onPress={() => handleStartDelivery(item.id)}
                        style={styles.button}
                    >
                        <Text style={{ color: 'white' }}>Iniciar Entrega</Text>
                    </TouchableOpacity>
                )}

                {item.status === "em transito" && (
                    <TouchableOpacity
                        onPress={() => handleFisnishDelivery(item.id)}
                        style={styles.button}
                    >
                        <Text style={{ color: 'white' }}>Finalizar Entrega</Text>
                    </TouchableOpacity>
                )}

                {(item.status === "created" || item.status === "em transito") && (
                    <TouchableOpacity onPress={() => navigation.navigate("Mapa", { origem: item.origem, destino: item.destino })}
                        style={styles.button}
                    >
                        <Text style={{ color: 'white' }}>Ver Mapa</Text>
                    </TouchableOpacity>
                )}
            </View>

        </View >
    );

    return (
        <SafeAreaView>

            <Header navigation={navigation} />
            <Text
                style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginVertical: 8 }}
            >
                Movimentações
            </Text>

            <FlatList
                data={movements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Nenhuma movimentação encontrada.</Text>}
            />



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
    },
    created: {
        backgroundColor: "#d3d3d3",
    },
    inTransit: {
        backgroundColor: "#f3ac8f",
    },
    finalized: {
        backgroundColor: "#90d490",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8,
        borderRadius: 10,
    },


    buttonsCard: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8,
    },
    button: {
        backgroundColor: "green",
        padding: 8,
        borderRadius: 8,
    },

    cardHeader: {
        flexDirection: "row",
        marginBottom: 8,
        gap: 8,
        alignItems: "center",

    },

});