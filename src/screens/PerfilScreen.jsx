import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";


export default function PerfilScreen() {
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Usuário UID: ", user.uid);
          setUsuario({ uid: user.uid });
        } else {
          console.log("Usuário não logado");
        }
      });
  
      return () => {
        unsub();
      };
    }, []);
  
    useEffect(() => {
      // verifica se uid não é vazio
      if (!usuario.uid) return;
  
      // referência ao documento no Firestore usando o UID do usuário
      const usuarioRef = doc(db, "usuario", usuario.uid);
  
      console.log("Buscando usuário com UID: ", usuario.uid);
  
      // busca o documento
      getDoc(usuarioRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // pega os dados do documento
            const userData = docSnapshot.data();
            setUsuario(userData);
          } else {
            console.log("Usuário não encontrado !!!");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    }, [usuario.uid]);



    return (
        <View style={styles.container}>
          {/* Parte que aparece a imagem: azul e logo */}
          
          <View style={styles.usuTopo}
          >
            <Image source={require("../../assets/img/usuiconbranco.png" )} 
            style={{ width: 105, height: 105 , color: 'white'}}/>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', marginTop: 5,}}>AAAAAAAAAAAA</Text>
          </View>
          {/* Parte que aparece o conteúdo: cinza/branco */}
          <View style={styles.conteudo}>
            <View style={styles.containerInner}>
              <Text style={styles.titulo}>Nome: {usuario?.nome_usu}</Text>
            </View>
          </View>
        </View>
      );

}
