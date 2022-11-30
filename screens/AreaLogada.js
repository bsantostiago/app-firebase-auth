import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import { auth } from "../config/firebaseConfig"
import { signOut } from 'firebase/auth';

const AreaLogada = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    const user = auth.currentUser;
    console.log("Usuário logado: " + user.uid, user.email, user.displayName);

    const logout = () => {
        setLoading(true);
        signOut(auth).then(() => {
            navigation.replace("Inicial", { deslogado: true });
        }).catch(error => {
            console.log(error);
            Alert.alert("Atenção", "Houve um erro ao sair do sistema. Tente novamente");
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <View style={estilos.container}>
            <View style={estilos.topo}>
                <Text style={estilos.bemVindo}>Bem-vindo(a) {user.displayName || ""}</Text>
                <Button disabled={loading} title='Logout' onPress={logout} color="#D35400" />
                {loading && <ActivityIndicator size="small" color="#D35400" />}
            </View>
            <View style={estilos.geral}>
                <Text>Você está na área logada.</Text>
            </View>
        </View>
    )
}

export default AreaLogada

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF3CF',
        padding: 16
    },
    topo: {
        marginVertical: 32
    },
    bemVindo: {
        fontSize: 24,
        marginVertical: 16
    }

})