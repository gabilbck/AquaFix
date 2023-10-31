import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
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
} from "firebase/firestore";
import { Image } from "expo-image";
import { Linking } from "react-native";

export default function LojaScreen() {
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
      } else {
        console.log("Usuário não logado");
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
          desc_prod: data.desc_prod,
          url_imagem: data.url_imagem, // URL da imagem do produto
          nome_prod: data.nome_prod,
          preco_prod: data.preco_prod,
        };
      });

      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  }

  const carregarPublicacoes = async () => {// 
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "publi_adm"), orderBy("id", "desc"))
      );
      const publicacoesData = querySnapshot.docs.map((doc) => doc.data());
      setPublicacoes(publicacoesData);
    } catch (error) {
      console.error("Erro ao buscar publicações: ", error);
    }
  }

  const handleCadastro = async () => {
    if (titulo && texto && link) {
      try {
        const publicacaoId = Date.now();

        const docRef = await addDoc(collection(db, "publi_adm"), {
          id: publicacaoId,
          titulo_puli_adm: titulo,
          texto,
          link,
        });

        console.log("Documento cadastrado com ID: ", docRef.id);
        setTitulo("");
        setTexto("");
        setLink("");
        carregarPublicacoes();
      } catch (error) {
        console.error("Erro ao cadastrar documento: ", error);
      }
    } else {
      console.warn("Preencha todos os campos.");
    }
  }

  return (
    <ScrollView>
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

            {isAdmin && (
              <Button style={styles.botaoverde} onPress={handleCadastro}>
                CADASTRAR
              </Button>
            )}
            {produtos.map((produto, index) => (
              <View style={styles.card2} key={index}>
                <Image
                  source={{ uri: produto.url_imagem }} // Use a URL da imagem do produto
                  style={styles.imagemProduto} // Estilo para a imagem do produto
                />
                <View style={styles.textoProduto}>
                  <Text style={styles.cardProduto}>{produto.nome_prod}</Text>
                  <Text style={styles.cardValor}>Preço: {produto.preco_prod}</Text>
                </View>
                <Button style={styles.cardButton}>VER</Button>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
