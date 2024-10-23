import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import { ProductOptions } from "../interfaces/ProductOptions";
import { BranchOptions } from "../interfaces/BranchOptions";

export default function NovaMovimentacao() {

    const [products, setProducts] = useState<ProductOptions[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductOptions | null>(null);

    const [branches, setBranches] = useState<BranchOptions[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<BranchOptions | null>(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<ProductOptions[]>(`${process.env.EXPO_PUBLIC_API_URL}/products/options`);
                setProducts(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    // useEffect(() => {

    //     const fetchBranches = async () => {
    //         try {
    //             const response = await axios.get<string[]>(`${process.env.EXPO_PUBLIC_API_URL}/branches/options`);
    //             setBranches(response.data.map((branch, index) => ({ id: index, branch_name: branch })));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchBranches();
    // }, [])



    return (
        <View>

            <Text>Nova Movimentação</Text>

            <Text>Selecione o produto</Text>
            <Picker
                selectedValue={selectedProduct}
                onValueChange={(itemValue, itemIndex) => setSelectedProduct(itemValue)}
            >
                <Picker.Item label="Selecione o produto" value="" />
                {products.map(product => (
                    <Picker.Item key={product.product_id} label={product.product_name} value={product.product_name} />
                ))}
            </Picker>

            {/* <Text>Selecione a filial de origem</Text>
            <Picker
                selectedValue={selectedBranch}
                onValueChange={(itemValue, itemIndex) => setSelectedBranch(itemValue)}
            >
                <Picker.Item label="Selecione a filial" value="" />
                {branches.map(item => (
                    <Picker.Item key={item.id} label={item.id} value={item.id} />
                ))}
            </Picker> */}




        </View>
    )
}