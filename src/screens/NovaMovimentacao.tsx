import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import { ProductOptions } from "../interfaces/ProductOptions";
import { BranchOptions } from "../interfaces/BranchOptions";
import { Button } from "react-native";
import { Alert } from "react-native";

export default function NovaMovimentacao() {

    const [products, setProducts] = useState<ProductOptions[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductOptions | null>(null);
    const [branches, setBranches] = useState<BranchOptions[]>([]);

    const [originBranch, setOriginBranch] = useState<BranchOptions | null>(null);
    const [destinationBranch, setDestinationBranch] = useState<BranchOptions | null>(null);

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [availableQuantity, setAvailableQuantity] = useState(0);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProducts = await axios.get<ProductOptions[]>(`${process.env.EXPO_PUBLIC_API_URL}/products/options`);
                const responseBranches = await axios.get<BranchOptions[]>(`${process.env.EXPO_PUBLIC_API_URL}/branches/options`);

                setProducts(responseProducts.data);
                setBranches(responseBranches.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    ////////////////////////////////// Atualiza a quantidade disponível com base no produto e na filial selecionada

    const handleProductChange = (productId: number) => {
        setSelectedProduct(productId);
        updateAvailableQuantity(productId, originBranch);
    };


    const handleOriginBranchChange = (branchId: number) => {
        setOriginBranch(branchId);
        updateAvailableQuantity(selectedProduct, branchId);
    };

    const updateAvailableQuantity = (productId: number | null, branchId: number | null) => {
        if (productId && branchId) {
            const selectedProductData = products.find(
                product => product.product_id === productId && product.branch_id === branchId
            );
            setAvailableQuantity(selectedProductData ? selectedProductData.quantity : 0);
        } else {
            setAvailableQuantity(0);
        }
    };
    ////////////////////////////////// Atualiza a quantidade disponível com base no produto e na filial selecionada



    // Validações e envio de dados
    const handleSubmit = async () => {
        if (!originBranch || !destinationBranch || !selectedProduct || !quantity) {
            Alert.alert('Todos os campos devem ser preenchidos.');
            return;
        }

        if (originBranch === destinationBranch) {
            Alert.alert('A filial de origem e destino devem ser diferentes.');
            return;
        }

        if (quantity > availableQuantity) {
            Alert.alert('A quantidade não pode ser maior do que a disponível.');
            return;
        }

        console.log(originBranch, destinationBranch, selectedProduct, quantity);


        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/movements`, {
                originBranchId: originBranch,
                destinationBranchId: destinationBranch,
                productId: selectedProduct,
                quantity: quantity,
                // observations,
            });
            console.log('Movmientação cadastrada com sucesso.');
            Alert.alert('Movmientação cadastrada com sucesso.');

            // Limpar o formulário
            setQuantity(0);
            setDescription("");
            setOriginBranch(null);
            setDestinationBranch(null);
            setSelectedProduct(null);
            setAvailableQuantity(0);

        } catch (error) {
            console.error('Erro ao cadastrar movimentação:', error);
            Alert.alert('Falha ao cadastrar a movimentação.');
        }
    };



    return (
        <SafeAreaView>

            <ScrollView>

                <Text>Nova Movimentação</Text>

                <Text>Origem</Text>
                <Picker
                    selectedValue={originBranch}
                    onValueChange={handleOriginBranchChange}
                >
                    <Picker.Item label="Selecione a filial" value="" />
                    {branches.map(item => (
                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                    ))}
                </Picker>


                <Text>Destino</Text>
                <Picker
                    selectedValue={destinationBranch}
                    onValueChange={setDestinationBranch}
                >
                    <Picker.Item label="Selecione a filial" value="" />
                    {branches.map(item => (
                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                    ))}
                </Picker>


                <Text>Produto</Text>
                <Picker
                    selectedValue={selectedProduct}
                    onValueChange={handleProductChange}
                >
                    <Picker.Item label="Selecione o produto" value="" />
                    {products.map(item => (
                        <Picker.Item key={item.product_id} label={item.product_name} value={item.product_id} />
                    ))}
                </Picker>

                <Text>Disponível: {availableQuantity}</Text>
                {/* quantidade disponivel do produto na filial de origem */}

                <Text>Quantidade:</Text>
                <TextInput
                    keyboardType="numeric"
                    value={quantity.toString()}
                    onChangeText={value => setQuantity(value === "" ? 0 : parseInt(value))}
                    // placeholder="Digite a quantidade"
                    style={styles.input}
                />

                {/* ------------------------------------------------- CORRIGIR LAYOUT observacoes e button>touchable*/}

                <Text>Observações</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    placeholder=""
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                />

                <Button title="Cadastrar" onPress={handleSubmit} />

                {/* CORRIGIR LAYOUT -------------------------------------------------------*/}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexGrow: 1, //  permite que o ScrollView cresça conforme necessário
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200
    },


});