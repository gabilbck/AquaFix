import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { styles } from "../utils/styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  deleteDoc, // Importe deleteDoc para excluir documentos do Firestore.
} from "firebase/firestore";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

export default function LojaScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({});
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [publicacoes, setPublicacoes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário UID: ", user.uid);
        setUsuario({ uid: user.uid });
        const usuarioRef = doc(db, "usuario", user.uid);
        getDoc(usuarioRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setIsAdmin(userData.adm === true ? true : false);
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar usuário:", error);
          });
      } else {
        setIsAdmin(false);
      }
    });

    carregarPublicacoes();
    carregarProdutos();

    return () => {
      unsub();
    };
  }, []);

  const carregarProdutos = async () => {
    try {
      const produtosQuerySnapshot = await getDocs(collection(db, "produto"));

      const produtosData = produtosQuerySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // Adicione o ID do documento do produto.
          desc_prod: data.desc_prod,
          foto_prod: data.foto_prod,
          nome_prod: data.nome_prod,
          preco_prod: data.preco_prod,
        };
      });

      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

  const carregarPublicacoes = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "publi_adm"), orderBy("id", "desc"))
      );
      const publicacoesData = querySnapshot.docs.map((doc) => doc.data());
      setPublicacoes(publicacoesData);
    } catch (error) {
      console.error("Erro ao buscar publicações: ", error);
    }
  };

  const handleCadastro = async () => {
    // ... código existente ...
  };

  const handleExcluirProduto = async (produto) => {
    try {
      const produtoRef = doc(db, "produto", produto.id); // Substitua "produto" pelo nome da sua coleção de produtos no Firestore.
      await deleteDoc(produtoRef);
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
    }
  };

  const handleAdicionarAoCarrinho = (produto) => {
    // Adicione o produto ao seu carrinho (estado ou contexto global).
    // Por exemplo, você pode criar um estado para o carrinho e adicionar o produto a ele.
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
          <View style={{ ...styles.conteudo, flex: 1 }}>
            <View style={styles.containerInner}>
              <Text style={styles.titulo}>PRODUTOS</Text>
              {isAdmin && (
                <Button style={styles.botaoverde} onPress={handleCadastro}>
                  CADASTRAR
                </Button>
              )}
              <View>
                {produtos.map((produto, index) => (
                  <View key={index}>
                    <Card style={styles.card}>
                      <View style={{ flexDirection: "row" }}>
                        <Card.Cover
                          source={{ uri: produto.foto_prod }}
                          style={styles.imagemProduto2}
                        />
                        <Card.Content style={styles.cardContent}>
                          <Text style={styles.cardProduto}>
                            {produto.nome_prod}
                          </Text>
                          <Text style={styles.cardValor}>
                            Preço: {produto.preco_prod}
                          </Text>
                        </Card.Content>
                      </View>
                      <Card.Actions>
                        <Button
                          style={{
                            backgroundColor: "lightgray",
                            borderRadius: 8,
                            border: 0,
                            marginTop: 0,
                            width: "100%",
                          }}
                          onPress={() =>
                            navigation.navigate("VerProdScreen", {
                              foto_prod: produto.foto_prod,
                              preco_pro: produto.preco_prod,
                              nome_prod: produto.nome_prod,
                              desc_prod: produto.desc_prod,
                            })
                          }
                        >
                          <Text style={{ color: "black", fontWeight: "bold" }}>
                            VER
                          </Text>
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "red",
                            borderRadius: 8,
                            border: 0,
                            marginTop: 8,
                            width: "100%",
                          }}
                          onPress={() => handleExcluirProduto(produto)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            EXCLUIR
                          </Text>
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "green",
                            borderRadius: 8,
                            border: 0,
                            marginTop: 8,
                            width: "100%",
                          }}
                          onPress={() => handleAdicionarAoCarrinho(produto)}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            ADICIONAR AO CARRINHO
                          </Text>
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
