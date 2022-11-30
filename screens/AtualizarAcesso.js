import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { useState } from 'react'
import { auth } from "../config/firebaseConfig"
import { onAuthStateChanged, updateCurrentUser, updateEmail, updatePassword } from 'firebase/auth';

const AtualizarAcesso = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.uid, user.email);
            setEmail(user.email);
            setUserId(user.uid);
        } else {
            // User is signed out
            // ...
        }
    });

    const atualizarDados = () => {
        setLoading(true);

        updateEmail(auth.currentUser, email).then(() => {
            Alert.alert('Informação', 'E-mail alterado com sucesso!');
        }).catch((error) => {
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
                // value={email}
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