import React from "react";
import { Image, View, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState({});
  const navigation = useNavigation(); // Initialize navigation

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

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigation.navigate('LoginScreen'); // Navigate to the LoginScreen
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Parte que aparece a imagem: azul e logo */}
        <View style={styles.usuTopo}>
          <Image
            source={usuario.foto_usu}
            style={{
              width: 103,
              height: 103,
              borderRadius: 50,
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 10,
              borderColor: "white",
              borderWidth: 4
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              marginTop: 7,
            }}
          >
            {usuario.nome_usu}
          </Text>
        </View>
        {/* Parte que aparece o conteúdo: cinza/branco */}
        <View style={styles.conteudo}>
          <View style={styles.containerInner}>
            <Text style={styles.titulo2}>Nome: </Text>
            <Text style={styles.subtitulo2}>{usuario?.nome_real_usu}</Text>
            <Text style={styles.titulo2}>Apelido: </Text>
            <Text style={styles.subtitulo2}>{usuario?.nome_usu}</Text>
            <Text style={styles.titulo2}>Email: </Text>
            <Text style={styles.subtitulo2}>{usuario?.email_usu}</Text>
            <Text style={styles.titulo2}>Biografia: </Text>
            <Text style={styles.subtitulo2}>{usuario?.bio_usu}</Text>
            <Text style={styles.titulo2}>Telefone para contato:</Text>
            <Text style={styles.subtitulo2}>{usuario?.whatsapp_usu}</Text>
            <Text style={styles.titulo2}>Serviços que você oferece:</Text>
            {usuario?.servicos_usu ? (
              <Text style={styles.subtitulo2}>{usuario.servicos_usu}</Text>
            ) : (
              <Text style={styles.subtitulo2}>Nenhum serviço cadastrado</Text>
            )}
            <Text style={styles.titulo2}>Redes sociais:</Text>
            <Image></Image>
            <Text style={styles.titulo2}>Você deseja editar o seu perfil? </Text>
            <Button
              style={styles.botaoedit}
              labelStyle={{ color: "white", fontSize: 15 }}
              onPress={() => navigation.navigate("EditUsu")}
            >
              EDITAR PERFIL
            </Button>
            <Text style={styles.titulo2}>Você deseja sair da conta? </Text>
            <Button
              style={styles.botaovermelho}
              labelStyle={{ color: "white", fontSize: 15 }}
              onPress={handleSignOut}
            >
              SAIR DA CONTA
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
