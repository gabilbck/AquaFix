import { View } from "react-native"
import { Text } from "react-native-paper"
import { styles } from "../utils/styles";
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export default function HomeScreen() {
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("Usuário UID: ", user.uid)
                setUsuario({ uid: user.uid })
            } else {
                console.log("Usuário não logado")
            }
        })

        return () => { unsub() }
    }, [])

    useEffect(() => {

        // verifica se uid não é vazio
        if (!usuario.uid) return

        // seleciona a coleção usuarios
        const usuariosRef = collection(db, "usuario");

        // começa a preparar a busca
        const q = query(
            usuariosRef,
            // define a cláusula where
            where("userUID", "==", usuario.uid)
        )

        // executa a busca
        getDocs(q)
            .then((querySnapshot) => {
                // caso não esteja vazio
                if (!querySnapshot.empty) {
                    // pega o primeiro documento
                    const userData = querySnapshot.docs[0].data()
                    // define o usuário
                    setUsuario(userData)
                    // ou se preferir pode definir assim:
                    setUsuario({
                        nome: userData.nome_usu,
                        telefone: userData.whatsapp_usu,
                        email: userData.email_usu,
                        uid: userData.uid
                    })
                } else {
                    console.log("Usuário não encontrado")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [usuario.uid])

    return (
      <View style={styles.container}>
      {/* Parte que aparece a imagem: azul e logo */}
      <View style={styles.imagemTopo}>
        <Image
          source={require("../../assets/img/logocomp-branca.png")}
          style={{ width: 200, height: 127 }}
        />
      </View>
      {/* Parte que aparece o conteúdo: cinza/branco */}
      <View style={styles.conteudo}>
        <View style={styles.containerInner}>
          <Text style={styles.titulo}>Bom dia, {usuario?.nome_usu}?</Text>
          <Text style={styles.subtitulo}>Venha conhecer as novidades do momento:</Text>
        </View>
      </View>
    </View>
    )
}