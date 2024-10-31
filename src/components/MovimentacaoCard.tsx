import { StyleSheet, Text, View } from "react-native";

export interface Movimentacao {
    id: number;
    produto: {
        nome: string;
        imagem: string;
    };
    quantidade: number;
    // status: string;
    origem: {
        nome: string;
    };
    destino: {
        nome: string;
    };
    status: string;
}

interface MovimentacaoCardProps {
    movimentacao: Movimentacao;
}

export default function MovimentacaoCard({ movimentacao }: MovimentacaoCardProps) {
    return (
        <View style={[styles.card, movimentacao.status === "created" ? styles.created : movimentacao.status === "em transito" ? styles.inTransit : styles.finalized]}>

            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 }}>
                <Text>Movimentação </Text>
                <Text style={{ fontWeight: 'bold' }}># {movimentacao.id} </Text>
            </View>


            <View style={styles.itemsCard}>
                <Text style={{ fontWeight: 'bold' }}>Origem: </Text>
                <Text>{movimentacao.origem.nome} </Text>
            </View>
            <View style={styles.itemsCard}>
                <Text style={{ fontWeight: 'bold' }}>Destino:  </Text>
                <Text>{movimentacao.destino.nome}</Text>
            </View>
            <View style={styles.itemsCard}>
                <Text style={{ fontWeight: 'bold' }}>Produto:  </Text>
                <Text>{movimentacao.produto.nome}</Text>
            </View>
            <View style={styles.itemsCard}>
                <Text style={{ fontWeight: 'bold' }}>Quantidade:  </Text>
                <Text>{movimentacao.quantidade}</Text>
            </View>
            <View style={styles.itemsCard}>
                <Text style={{ fontWeight: 'bold' }}>Status:  </Text>
                <Text>{movimentacao.status}</Text>
            </View>


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
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ccc'
    },

    itemsCard: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4
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

})