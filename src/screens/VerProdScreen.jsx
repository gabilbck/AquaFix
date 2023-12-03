import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import { styles } from "../utils/styles";
import { Button, Card } from "react-native-paper";
import {
  doc,
  query,
  where,
  getDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { ScrollView } from "react-native-web";

export default function VerProdScreen({ route, navigation }) {
  const { id_prod, nome_prod, foto_prod, desc_prod, preco_prod } = route.params;
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
    if (!usuario.uid) return;

    const usuarioRef = doc(db, "usuario", usuario.uid);

    console.log("Buscando usuário com UID: ", usuario.uid);

    getDoc(usuarioRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();

          console.log("Usuário encontrado: ", userData);

          setIsAdmin(userData.adm === true ? true : false);
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
        Alert.alert(
          "Confirm Deletion",
          "Are you sure you want to delete this product?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: async () => {
                const querySnapshot = await getDoc(
                  query(
                    collection(db, "produto"),
                    where("nome_prod", "==", nome_prod)
                  )
                );

                if (querySnapshot.exists()) {
                  await deleteDoc(doc(db, "produto", querySnapshot.id));
                  console.log("Produto excluído com sucesso!");
                  navigation.navigate("LojaScreen");
                } else {
                  console.error(
                    "Documento não encontrado com base em nome_prod:",
                    nome_prod
                  );
                }
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Permission Denied",
          "You do not have permission to delete products."
        );
      }
    } catch (error) {
      console.error("Erro ao excluir o produto:", error.message);
    }
  };

  const handleAddToCart = () => {
    try {
      if (route.params?.user_id) {
        navigation.navigate("CarrinhoScreen", {
          id_prod,
          nome_prod,
          foto_prod,
          desc_prod,
          preco_prod,
          user_id: route.params.user_id,
        });

        console.log("Produto adicionado ao carrinho!");
        addDoc(collection(db, "carrinho"), {
          id_prod,
          nome_prod,
          foto_prod,
          desc_prod,
          preco_prod,
          user_id: route.params.user_id,
        });
      } else {
        console.error("user_id não está definido em route.params");
      }
    } catch (error) {
      console.error("Erro ao adicionar o produto ao carrinho:", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.imagemTopo}>
            <Image
              source={require("../../assets/img/logocomp-branca.png")}
              style={{ width: 200, height: 127 }}
            />
          </View>
          <View style={styles.conteudo}>
            <View style={styles.containerInner}>
              <Text style={styles.titulo}>{nome_prod}</Text>
              <Card style={styles.card}>
                <Card.Content>
                  <Image
                    style={styles.imagemProduto3}
                    source={{ uri: foto_prod }}
                  />
                  <Text style={styles.subtitulo3}>Nome: {nome_prod}</Text>
                  <Text style={styles.subtitulo3}>Preço: R${[preco_prod]}</Text>
                  <Text style={styles.subtitulo3}>Descrição: {desc_prod}</Text>
                  {isAdmin && usuario.uid === route.params.user_id && (
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
                      marginTop: 15,
                      width: "100%",
                    }}
                    labelStyle={{
                      color: "black",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                    onPress={handleAddToCart}
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
                  marginTop: 20,
                  marginBottom: 20,
                  width: "100%",
                }}
                labelStyle={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                onPress={() => navigation.goBack()}
              >
                VOLTAR
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
