import React, { useState } from "react";
import { Image } from "expo-image";
import { View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { styles } from "../utils/styles";

export default function RecuperarSenha2({ navigation }) {
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
          <Text style={styles.titulo}>E-MAIL ENVIADO!</Text>
          <Text style={styles.subtitulo}>Verfique seu e-mail e redefina sua senha!</Text>
          <Button style={styles.botao} textColor="white" onPress={() => navigation.navigate("LoginScreen")}>
            Voltar ao login
          </Button>
        </View>
      </View>
    </View>
  );
}
