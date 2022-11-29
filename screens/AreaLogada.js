import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react';

import { auth, db } from "../config/firebaseConfig"
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const AreaLogada = ({ navigation }) => {
    const user = auth.currentUser;
    const [dados, setDados] = useState();

    // console.log(user.email);
    console.log("Usuário logado: " + user.uid);

    useEffect(() => {

        async function obterDadosDeUm() {
            const docRef = doc(db, "users", "xrX8NsrDJ72zt6jb8T0D");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }


        async function obterDados() {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(`ID documento: ${doc.id}`);
                console.log(`Nome: ${doc.data().nome}`);
                console.log(`ID usuário: ${doc.data().id}`);
                console.log("--")
            });

            console.log(querySnapshot.docChanges());
        }

        obterDadosDeUm();
    }, [])

    const [loading, setLoading] = useState(false)

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
                <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
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