import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import { styles } from "../utils/styles";
import { Button, Card } from "react-native-paper";
import {
  doc,
  query,
  where,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
 
export default function VerProdScreen({ route, navigation }) {
  const { nome_prod, foto_prod, desc_prod, preco_prod, user_id } = route.params;
  const [usuario, setUsuario] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
 
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

          console.log("Usuário encontrado: ", userData);

          // precisa verificar se user.adm é do FIRESTORE
          setIsAdmin(userData.adm === true ? true : false); // Defina como true se for um administrador
          console.log("Usuário é admin: ", userData.adm);
          console.log("Usuário é: ", userData);
          setUsuario(userData);
        } else {
          console.log("Usuário não encontrado !!!");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  }, [usuario.uid]);
 
  const handleDeleteProduct = async () => {
    try {
      if (isAdmin) {
        const querySnapshot = await getDocs(
          query(collection(db, "produto"), where("nome_prod", "==", nome_prod))
        );
 
        if (!querySnapshot.empty) {
          const docToDelete = querySnapshot.docs[0];
          await deleteDoc(doc(db, "produto", docToDelete.id));
          console.log("Produto excluído com sucesso!");
          navigation.navigate("LojaScreen");
        } else {
          console.error("Document not found based on nome_prod:", nome_prod);
        }
      } else {
        Alert.alert(
          "Permission Denied",
          "You do not have permission to delete products."
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
 
  const handleAddToCart = () => {
    navigation.navigate("CarrinhoScreen", {
      nome_prod,
      foto_prod,
      desc_prod,
      preco_prod,
      user_id,
    });
    console.log("Produto adicionado ao carrinho!");
    navigation.navigate("CarrinhoScreen");
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.imagemTopo}>
        <Image
          source={require("../../assets/img/logocomp-branca.png")}
          style={{ width: 200, height: 127 }}
        />
      </View>
      <View style={styles.conteudo}>
        <View style={styles.containerInner}>
          <Text style={styles.titulo}>PRODUTOS</Text>
          <Card style={styles.card}>
            <Card.Content>
              <Image
                style={styles.imagemProduto3}
                source={{ uri: foto_prod }}
              />
              <Text style={styles.subtitulo3}>Nome: {nome_prod}</Text>
              <Text style={styles.subtitulo3}>Preço: {preco_prod}</Text>
              <Text style={styles.subtitulo3}>Descrição: {desc_prod}</Text>
              {isAdmin && usuario.uid === user_id && (
                <Button
                  style={styles.botaovermelho3}
                  labelStyle={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                  onPress={handleDeleteProduct}
                >
                  EXCLUIR PRODUTO
                </Button>
              )}
              <Button
                style={{
                  backgroundColor: "lightgray",
                  borderRadius: 8,
                  border: 0,
                  marginTop: 0,
                  width: "100%",
                }}
                labelStyle={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                onPress={addToCart}
              >
                ADICIONAR AO CARRINHO
              </Button>
            </Card.Content>
          </Card>
          <Button
            style={{
              backgroundColor: "#16337E",
              borderRadius: 8,
              border: 0,
              marginTop: 0,
              width: "100%",
            }}
            labelStyle={{ color: "white", fontSize: 15, fontWeight: "bold" }}
            onPress={() => navigation.goBack()}
          >
            VOLTAR
          </Button>
        </View>
      </View>
    </View>
  );
}