import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { useState } from 'react'
import { db } from "../config/firebaseConfig"
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";

const CompletarCadastro = ({ navigation, route }) => {
    const { user } = route.params;
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState(user.email);
    const [userId] = useState(user.uid);

    const [loading, setLoading] = useState(false)

    const cadastrarTudo = async () => {
        // setLoading(true);
        const docRef = doc(db, "users", userId);
        const dados = {
            nome,
            email,
            telefone
        };

        setDoc(docRef, dados)
            .then(() => {
                console.log("Document has been added successfully");
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <View style={estilos.container}>
            <View style={estilos.formulario}>
                <TextInput
                    style={estilos.input}
                    keyboardType="email-address"
                    value={email}
                    editable={false}
                />
                <TextInput
                    style={estilos.input}
                    keyboardType="default"
                    value={userId}
                    editable={false}
                />
                <TextInput
                    placeholder='Nome completo'
                    style={estilos.input}
                    onChangeText={valor => setNome(valor)}
                    keyboardType="default"
                />
                <TextInput
                    placeholder='Telefone'
                    style={estilos.input}
                    onChangeText={valor => setTelefone(valor)}
                    keyboardType="phone-pad"
                />

                <View style={estilos.botoes}>
                    <Button disabled={loading} title='Atualizar' color="blue" onPress={cadastrarTudo} />
                    {loading && <ActivityIndicator size="small" color="blue" />}
                </View>

            </View>
        </View>
    )
}

export default CompletarCadastro

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