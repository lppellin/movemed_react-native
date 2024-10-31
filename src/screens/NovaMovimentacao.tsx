import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { ProductOptions } from "../interfaces/ProductOptions";
import { BranchOptions } from "../interfaces/BranchOptions";

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
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Nova Movimentação</Text>

            <ScrollView>
                <View style={styles.card}>

                    <Text style={styles.subtitle}>Origem</Text>
                    <RNPickerSelect
                        placeholder={{ label: "Selecione a filial", value: null }}
                        value={originBranch}
                        onValueChange={handleOriginBranchChange}
                        items={branches.map(branch => ({ label: branch.name, value: branch.id }))}
                        style={picker}
                    />

                    <Text style={styles.subtitle}>Destino</Text>
                    <RNPickerSelect
                        placeholder={{ label: "Selecione a filial", value: null }}
                        value={destinationBranch}
                        onValueChange={setDestinationBranch}
                        items={branches.map(branch => ({ label: branch.name, value: branch.id }))}
                        style={picker}
                    />


                    <Text style={styles.subtitle}>Produto</Text>
                    <RNPickerSelect
                        placeholder={{ label: "Selecione o produto", value: null }}
                        value={selectedProduct}
                        onValueChange={handleProductChange}
                        items={products.map(product => ({ label: product.product_name, value: product.product_id }))}
                        style={picker}
                    />

                    <Text style={{ marginLeft: 16 }}>Disponível: {availableQuantity}</Text>
                    {/* quantidade disponivel do produto na filial de origem */}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.subtitle}>Quantidade desejada:</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={value => setQuantity(value === "" ? 0 : parseInt(value))}
                            // placeholder="Digite a quantidade"
                            style={styles.input}
                        />
                    </View>


                    <Text>Observações</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        placeholder=""
                        value={description}
                        onChangeText={setDescription}
                        style={styles.inputObs}
                    />

                </View>


                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.btn}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexGrow: 1, //  permite que o ScrollView cresça conforme necessário
        marginTop: 30,
        backgroundColor: '#fff',
    },

    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        padding: 16,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f1f1f1',

    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: 60,
        textAlign: 'center',
        fontSize: 16,
    },
    inputObs: {
        height: 80,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
        textAlignVertical: 'top',
    },
    btn: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: "green",
        padding: 10,
        margin: 12,
        borderRadius: 10,
        height: 60,
        width: 200,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 12,
    },

    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },



});

const picker = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 12,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
});