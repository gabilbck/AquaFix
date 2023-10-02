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

  async function buscarServico() {
    const usuarioRef = collection(db, "usuario");
    const buscaServico = query(
      usuarioRef,
      orderBy("servicos_usu"),
      startAt(palavraChave),
      endAt(palavraChave + "\uf8ff")
    );

    const resultadoSnapshot = await getDocs(buscaServico);

    const listaServicos = resultadoSnapshot.docs.map((doc) => doc.data());
    console.log(listaServicos);
    setResultadoPesquisa(listaServicos);
    if (palavraChave === "") {
      setResultadoPesquisa([]);
    }
  }

  useEffect(() => {
    buscarServico();
  }, [palavraChave]);

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
            value={palavraChave}
            onChangeText={setPalavraChave}
            style={styles.input}
          />
          <FlatList
            data={resultadoPesquisa}
            renderItem={({ item }) => (
              <View>
                <Text>{item.nom_usu}</Text>
                <Text>{item.servicos_usu}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

/*
  
  Apocalipse 6:1-8 

   Vi quando o Cordeiro abriu o primeiro dos sete selos. Então ouvi um dos quatro seres viventes dizer com voz de trovão: "Venha!"
   Olhei, e diante de mim estava um cavalo branco! Seu cavaleiro tinha um arco e foi-lhe dada uma coroa, e ele saiu vencendo e para vencer.
   Quando o Cordeiro abriu o segundo selo, ouvi o segundo ser vivente dizer: "Venha!"
   Então saiu outro cavalo, vermelho. Seu cavaleiro recebeu poder para tirar a paz da terra e fazer os homens se matarem uns aos outros. Foi-lhe dada uma grande espada.
   Quando o Cordeiro abriu o terceiro selo, ouvi o terceiro ser vivente dizer: "Venha!" Olhei, e diante de mim estava um cavalo preto! Seu cavaleiro tinha uma balança na mão.
   Ouvi então o que parecia ser uma voz no meio dos quatro seres viventes, dizendo: "Uma medida de trigo por um denário, e três medidas de cevada por um denário; mas não danifique o vinho nem o azeite."
   Quando o Cordeiro abriu o quarto selo, ouvi a voz do quarto ser vivente dizer: "Venha!" Olhei, e diante de mim estava um cavalo amarelo! Seu cavaleiro chamava-se Morte, e o Inferno o seguia de perto. Foi-lhes dado poder sobre a quarta parte da terra para matar pela espada, pela fome, pela peste e pelas feras da terra.
*/
