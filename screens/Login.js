import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { useState } from 'react'

import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false)


    // LOGIN
    const iniciarLogin = () => {
        if (!email || !senha) {
            Alert.alert("Atenção", "Você deve preencher o e-mail e a senha.");
            return;
        }

        setLoading(true);
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('logado');
                navigation.replace("AreaLogada")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);

                switch (errorCode) {
                    case "auth/user-not-found":
                        Alert.alert("Ops!", "Usuário não encontrado!")
                        break;
                    case "auth/wrong-password":
                        Alert.alert("Ops!", "Senha incorreta!")
                        break;
                    case "auth/too-many-requests":
                        Alert.alert("Ops", "Acesso bloqueado devido ao excesso de tentativas! Fale com o administrador.")
                        break;
                    default: break;
                }
            })
            .finally(() => {
                setLoading(false)
            });
    }

    // RECUPERAR SENHA
    const recuperarSenha = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert("Recuperar senha", "Verifique sua caixa de entrada")
            }).catch((error) => {
                Alert.alert("Ops!", "Deu ruim: " + error)
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
                />
                <TextInput
                    placeholder='Senha'
                    style={estilos.input}
                    onChangeText={valor => setSenha(valor)}
                    secureTextEntry
                />
                <View style={estilos.botoes}>
                    <Button disabled={loading} title='Entre' color="green" onPress={iniciarLogin} />
                    {loading && <ActivityIndicator size="small" color="green" />}
                    <Button title="Esqueci a senha" onPress={recuperarSenha} color="#566573" />
                </View>
            </View>
        </View>
    )
}

export default Login

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formulario: {
        marginBottom: 32,
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