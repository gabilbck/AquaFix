import React, { useState } from "react";
import { Image } from "expo-image";
import { View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { styles } from "../utils/styles";

export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handlePasswordReset() {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email de redefinição de senha enviado!");
      navigation.navigate("RecuperarSenha2");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        console.log("Usuário não encontrado");
        setError("Usuário não encontrado");
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
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            style={styles.botao}
            textColor="white"
            onPress={handlePasswordReset}
          >
            Enviar código de verificação
          </Button>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Button
              textColor={"black"}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.botaoPreto}>Voltar ao Login</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
