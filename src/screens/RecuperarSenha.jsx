import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { auth } from "../config/firebase";
import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { styles } from "../utils/styles";
import { Image } from "react-native";

export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState("");

  async function handlePasswordReset() {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email de redefinição de senha enviado!");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        console.log("Usuário não encontrado");
        setEmail("");
      }
    }
  }

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
          <Text style={styles.titulo}>RECUPERAR SENHA</Text>
          <TextInput
            placeholder="Digite seu e-mail"
            value={email}
            mode="disabled"
            style={styles.input}
            onChangeText={setEmail}
          />

          <Button textColor={'white'}  style={styles.botao} onPress={handlePasswordReset}>
            Enviar código de verificação
          </Button>
        </View>
      </View>
    </View>
  );
}
