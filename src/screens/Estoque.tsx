import axios from "axios";
import { CommonActions, NavigationProp, useFocusEffect } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
    id: number;
    product_name: string;
    branch_name: string;
    quantity: number;
    description: string;
    image_url: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>(`${process.env.EXPO_PUBLIC_API_URL}/products`);
                const productsWithIds = response.data.map((product, index) => ({
                    ...product,
                    id: Date.now() + index,
                }));
                setProducts(productsWithIds);
                setFilteredProducts(productsWithIds);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Lista de produtos</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise um produto ou uma filial"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Pesquisar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image_url }} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.productName}>{item.product_name}</Text>
                            <Text style={styles.branchName}>{item.branch_name}</Text>
                            <Text style={styles.quantity}>Estoque: {item.quantity} un</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhum produto encontrado.</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginLeft: 8,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    branchName: {
        fontSize: 14,
        color: '#555',
    },
    quantity: {
        fontSize: 14,
        color: '#555',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});