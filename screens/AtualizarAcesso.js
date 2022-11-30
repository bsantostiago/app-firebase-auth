import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { useState } from 'react'
import { auth } from "../config/firebaseConfig"
import { updateCurrentUser, updateEmail, updatePassword } from 'firebase/auth';

const AtualizarAcesso = ({ navigation, route }) => {
    const { idAuth, emailAuth } = route.params;
    const [email, setEmail] = useState(emailAuth);
    const [userId] = useState(idAuth);
    const [loading, setLoading] = useState(false)

    const atualizarDados = () => {

        setLoading(true);
        createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                Alert.alert("Conta criada com sucesso", "Desejar entrar?", [
                    {
                        text: "Cancelar",
                        onPress: () => {
                            return false;
                        },
                        style: "cancel",
                    },
                    {
                        text: "Sim, leve-me ao seu líder",
                        onPress: () => {
                            navigation.replace("AreaLogada")
                        },
                        style: "default",
                    },
                ]);
            })
            .catch((error) => {
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
            })
    }

    return (
        <View style={estilos.container}>
            <View style={estilos.formulario}>
                <TextInput
                    placeholder='E-mail'
                    style={estilos.input}
                    onChangeText={valor => setEmail(valor)}
                    keyboardType="email-address"
                    value={email}
                />
                <TextInput
                    placeholder='Senha'
                    style={estilos.input}
                    onChangeText={valor => setSenha(valor)}
                    secureTextEntry
                />
                <View style={estilos.botoes}>
                    <Button disabled={loading} title='Atualizar dados' color="blue" onPress={atualizarDados} />
                    {loading && <ActivityIndicator size="small" color="blue" />}
                </View>

            </View>
        </View>
    )
}

export default AtualizarAcesso

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