import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function Home({ navigation }: { navigation: NavigationProp<any> }) {


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>

            <StatusBar style="auto" />

            <Header navigation={navigation} />

            <View style={styles.card}>

                <View style={styles.title}>
                    <Image
                        source={require('../../assets/open-box.png')}
                        style={{ width: 70, height: 70, }}

                    />
                    <Text style={styles.titleText}>Estoque</Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Estoque')}
                    style={styles.btn}>
                    <Text style={styles.buttonText}> Gerenciar</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.card}>

                <View style={styles.title}>

                    <Image
                        source={require('../../assets/users.png')}
                        style={{ width: 70, height: 70, }}

                    />
                    <Text style={styles.titleText}>Usuários</Text>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Usuarios')}
                    style={styles.btn}>
                    <Text style={styles.buttonText}>Gerenciar</Text>
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
        alignItems: 'center',
        minWidth: 300,

        borderColor: '#ccc',
        borderWidth: 1,

    },

    btn: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "green",
        margin: 8,
        borderRadius: 10,
        height: 50,
        width: 120,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold'
    },

    title: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    }
})