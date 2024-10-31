import axios from "axios";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

export interface User {
    name: string
    id: number
    status: number
    profile: 'motorista' | 'filial'
}

export default function UserCard({ user }: { user: User }) {

    const [enabled, setEnabled] = useState(user.status === 1);


    const handleSwitch = async () => {
        const newStatus = enabled ? 0 : 1;
        try {
            await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/users/${user.id}/toggle-status`, { status: newStatus });
            setEnabled(!enabled); // Alterna o estado do switch
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
        }
    };

    const iconName = user.profile === 'motorista' ? 'directions-car' : 'business';

    return (
        <View style={[styles.card, enabled ? styles.activeCard : styles.inactiveCard]}>
            <Icon name={iconName} size={50} color={'#ccc'} style={styles.icon} />
            <Text>{user.name}</Text>
            <Switch value={enabled} onValueChange={handleSwitch} />
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 18,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'space-between',

    },

    activeCard: {
        // backgroundColor: '#baf5bd',
        borderColor: 'green',
        borderWidth: 2,
    },

    inactiveCard: {
        // backgroundColor: '#fcb1b1',
        borderColor: 'red',
        borderWidth: 2,
    },

    icon: {
        marginRight: 10,
    },


})