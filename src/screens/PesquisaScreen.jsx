import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, FlatList } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default function PesquisaScreen() {
  const [palavraChave, setPalavraChave] = useState("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState([]);

  const handlePesquisa = async () => {
    try {
      const usuarioRef = collection(db, "usuario");
      const buscaServico = query(usuarioRef, where('servicos_usu', '==', palavraChave));
      const resultadoSnapshot = await getDocs(buscaServico);

      const listaServicos = resultadoSnapshot.docs.map(doc => doc.data());
      setResultadoPesquisa(listaServicos);
    } catch (error) {
      console.error("Erro ao buscar serviço:", error);
    }
  };

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
          mode="flat"
        />
      </View>
    </View>
  </View>
  )
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