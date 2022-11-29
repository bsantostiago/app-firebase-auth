import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { auth, db } from "../config/firebaseConfig"
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { collection, getDocs, addDoc } from "firebase/firestore";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [loading, setLoading] = useState(false)

    const cadastrar = async () => {

        try {
            const docRef = await addDoc(collection(db, "users"), {
                first: "Alan",
                middle: "Mathison",
                last: "Turing",
                born: 1912
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setLoading(true);
        /* createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                const currentUser = auth.currentUser;                

            })
            .catch((error) => {
                // console.log(error.code);
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        Alert.alert('Ops!', 'E-mail já cadastrado');
                        break;
                    default:
                        break;
                }
            })
            .finally(() => {
                setLoading(false)
            }) */
    }



    return (
        <View style={estilos.container}>
            <View style={estilos.formulario}>
                <TextInput
                    placeholder='Nome'
                    style={estilos.input}
                    onChangeText={valor => setNome(valor)}
                    keyboardType="default"
                />
                <TextInput
                    placeholder='E-mail'
                    style={estilos.input}
                    onChangeText={valor => setEmail(valor)}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder='Senha'
                    style={estilos.input}
                    onChangeText={valor => setSenha(valor)}
                    secureTextEntry
                />
                <View style={estilos.botoes}>
                    <Button disabled={loading} title='Cadastre-se' color="blue" onPress={cadastrar} />
                    {loading && <ActivityIndicator size="small" color="blue" />}
                </View>

            </View>
        </View>
    )
}

export default Cadastro

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formulario: {
        marginVertical: 16,
        width: "80%"
    },
    input: {
        backgroundColor: "white",
        marginVertical: 8,
        padding: 8,
        borderRadius: 4
    },
    botoes: {
        marginVertical: 8,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})