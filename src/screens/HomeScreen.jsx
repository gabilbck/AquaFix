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
  where,
  addDoc,
} from "firebase/firestore";
import { Image } from "expo-image";

export default function HomeScreen() {
  const [usuario, setUsuario] = useState({});
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [link, setLink] = useState("");
  const [publicacoes, setPublicacoes] = useState([]);

  const handleCadastro = async () => {
    if (titulo && texto && link) {
      try {
        // Adicione os dados ao Firestore
        const docRef = await addDoc(collection(db, "publi_adm"), {
          titulo_puli_adm: titulo,
          texto,
          link,
        });
        console.log("Documento cadastrado com ID: ", docRef.id);
        // Limpe os campos após o cadastro
        setTitulo("");
        setTexto("");
        setLink("");
        // Recarregue as publicações após o cadastro
        carregarPublicacoes();
      } catch (error) {
        console.error("Erro ao cadastrar documento: ", error);
      }
    } else {
      console.warn("Preencha todos os campos.");
    }
  };

  const carregarPublicacoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "publi_adm"));
      const publicacoesData = querySnapshot.docs.map((doc) => doc.data());
      setPublicacoes(publicacoesData);
    } catch (error) {
      console.error("Erro ao buscar publicações: ", error);
    }
  };

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

    return () => {
      unsub();
    };
  }, []);

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
        <ScrollView>
        <View style={styles.containerInner}>
          <Text style={styles.titulo}>Bom dia, {usuario?.nome_usu}?</Text>
          <Text style={styles.subtitulo}>
            Venha conhecer as novidades do momento:
          </Text>

          {/* Formulário de cadastro */}
          <TextInput
            placeholder="Título"
            value={titulo}
            onChangeText={(text) => setTitulo(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Texto"
            value={texto}
            onChangeText={(text) => setTexto(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Link"
            value={link}
            onChangeText={(text) => setLink(text)}
            style={styles.input}
          />
          <Button onPress={handleCadastro} style={styles.botao} textColor="white">
            PUBLICAR
          </Button>

          {/* Lista de publicações */}
          <View>
            {publicacoes.map((publicacao, index) => (
              <Card key={index} style={styles.card}>
                <Card.Title title={publicacao.titulo_puli_adm} />
                <Card.Content>
                  <Text>{publicacao.texto}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => Linking.openURL(publicacao.link)}>Acessar</Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}
