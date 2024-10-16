import { useState } from "react";
import { Text } from "react-native";

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <Text>Login</Text>
    )
}