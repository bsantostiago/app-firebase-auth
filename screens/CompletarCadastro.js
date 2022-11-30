import { ActivityIndicator, Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'
import { db } from "../config/firebaseConfig"
import { doc, setDoc, getDoc, onSnapshot, collection, getDocs, addDoc } from "firebase/firestore";
import { async } from '@firebase/util';

const CompletarCadastro = ({ navigation, route }) => {
    const { idAuth, emailAuth } = route.params;
    // console.log("PARÂMETRO");
    // console.log(idAuth, emailAuth);

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState(emailAuth);
    const [userId] = useState(idAuth);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // const dbRef = collection(db, "users");
        // onSnapshot(dbRef, docsSnap => {
        //     docsSnap.forEach(doc => {
        //         console.log(doc.data());
        //     })
        // });

        async function obterDadosRealTime() {
            try {
                const dbRef = collection(db, "users");
                onSnapshot(dbRef, docsSnap => {
                    docsSnap.forEach(doc => {
                        console.log(doc.data());
                    })
                });

            } catch (error) {
                console.log(error)
            }
        }

        async function obterDados() {
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data());
                    setNome(docSnap.data().nome)
                    setTelefone(docSnap.data().telefone)
                } else {
                    console.log("Document does not exist")
                }
            } catch (error) {
                console.log(error)
            }
        }
        obterDados();
        obterDadosRealTime();
    }, [])


    const cadastrarTudo = async () => {
        setLoading(true);
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
            }).finally(() => {
                setLoading(false)
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
                    value={nome}
                />
                <TextInput
                    placeholder='Telefone'
                    style={estilos.input}
                    onChangeText={valor => setTelefone(valor)}
                    keyboardType="phone-pad"
                    value={telefone}
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