import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Home({ navigation }: { navigation: NavigationProp<any> }) {


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <StatusBar style="auto" />

            <Header navigation={navigation} />


            <View style={styles.card}>

                <Image />

                <Text>Estoque</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Estoque')}
                    style={styles.btn}>
                    <Text>Gerenciar</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.card}>

                <Image />

                <Text>Usuários</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Usuarios')}
                    style={styles.btn}>
                    <Text>Gerenciar</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },

    btn: {
        backgroundColor: '#cecece',
    }
})