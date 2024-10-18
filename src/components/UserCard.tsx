import { Image, StyleSheet, Switch, Text, View } from "react-native";

interface User {
    name: string
}


export default function UserCard({ item }: { item: User }) {
    return (
        <View style={styles.card}>
            <Image />
            <Switch />
            <Text>{item.name}</Text>
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
    },


})