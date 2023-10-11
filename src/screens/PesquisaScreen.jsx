import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  startAt,
  endAt,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";

import { styles } from "../utils/styles";
import { Image } from "expo-image";

export default function PesquisaScreen({ navigation }) {
  const [palavraChave, setPalavraChave] = useState("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState([]);

  async function buscarServico() {
    const usuarioRef = collection(db, "usuario");
    const buscaServico = query(usuarioRef, where('servicos_usu', '||', 'servicos_usu1', '||', 'servicos_usu2', '==', busca));
    const resultadoSnapshot = await getDocs(buscaServico);

    const listaUsuarios = resultadoSnapshot.docs.map(doc => doc.data());
    console.log(listaUsuarios);
    setResultado(listaUsuarios);
    // const usuarioRef = collection(db, "usuario");
    // const buscaServico = query(
    //   usuarioRef,
    //   orderBy("servicos_usu"),
    //   startAt(palavraChave),
    //   endAt(palavraChave + "\uf8ff")
    // );

    // const resultadoSnapshot = await getDocs(buscaServico);

    // const listaServicos = resultadoSnapshot.docs.map((doc) => doc.data());
    // console.log(listaServicos);
    // setResultadoPesquisa(listaServicos);
    // if (palavraChave === "") {
    //   setResultadoPesquisa([]);
    // }
  }

  useEffect(() => {
    buscarServico();
  }, [busca]);

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
          {/* CONTEÚDO */}
          <TextInput
            placeholder="Faça sua busca"
            value={busca}
            onChangeText={setBusca}
            style={styles.input}
          />
          <FlatList
            data={resultado}
            renderItem={({ item }) => (
              <View>
                <Text>{item.nome_usu}</Text>
                <Text>{item.servicos_usu}</Text>
                <Text>{item.bio_usu}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}