import { StyleSheet, Text, View } from "react-native";

interface Movimentacao {
    id: number;
    origin: string;
    destination: string;
    product: string;
    status: string;
}

export default function MovimentacaoCard() {
    return (
        <View style={styles.card}>
            <Text>#</Text>
            <Text>Origem:</Text>
            <Text>Destino:</Text>
            <Text>Produto:</Text>
            <Text>Status:</Text>

        </View>
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