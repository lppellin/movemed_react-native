import { StyleSheet, Text, View } from "react-native";

export interface Movimentacao {
    id: number;
    produto: {
        nome: string;
    };
    quantidade: number;
    // status: string;
    origem: {
        nome: string;
    };
    destino: {
        nome: string;
    };
}

interface MovimentacaoCardProps {
    movimentacao: Movimentacao;
}

export default function MovimentacaoCard({ movimentacao }: MovimentacaoCardProps) {
    return (
        <View style={styles.card}>
            <Text># {movimentacao.id} </Text>
            <Text>Origem:{movimentacao.origem.nome}</Text>
            <Text>Destino:{movimentacao.destino.nome}</Text>
            <Text>Produto:{movimentacao.produto.nome}</Text>
            <Text>Quantidade:{movimentacao.quantidade}</Text>
            <Text>Status: Aguardando coleta</Text>
            {/* <Text>Status:{movimentacao.status}</Text> */}

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