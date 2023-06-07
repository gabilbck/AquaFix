import { Button, Paragraph } from "react-native-paper";
import { Image, Text, View, TextInput } from "react-native";
import { styles } from "../utils/styles";
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

/**
 * Tela de cadastro
 * @auth Gabrieli Eduarda Lembeck
 * @name RegisterScreen
 * @description Tela de cadastro do aplicativo
 * @function RegisterScreen faz o cadastro do usuário
 * @param {Object} navigation
 * @export RootNavigation - navegação principal
 * @return {React.Component} Tela de cadastro do aplicativo
 * @since 1.0.0
 */

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegister() {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredencial) => {
        console.log("Usuário criado com sucesso!");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);

        //código de erro
        const errorCode = error.code;
        //mensagem de erro
        if (errorCode === "auth/weak-password") {
          console.log("A senha deve ter no mínimo 6 caracteres");
        }
        if (errorCode === "auth/email-already-in-use") {
          console.log("Este e-mail já está em uso");
        }
        if (errorCode === "auth/invalid-email") {
          console.log("E-mail inválido");
        }
        if (errorCode === "auth/operation-not-allowed") {
          console.log("Operação não permitida");
        }
        if (errorCode === "auth/argument-error") {
          console.log("Argumento inválido");
        }
        if (errorCode === "auth/invalid-credential") {
          console.log("Credencial inválida");
        }
        if (errorCode === "auth/internal-error") {
          console.log("Erro interno");
        }
      });
  }

  return (
<View style={styles.container}>
      {/* Parte que aparece a imagem: azul e logo */}
      <View style={styles.imagemTopo}>
        <Image
          source={require("/assets/img/logocomp-branca.png")}
          style={{ width: 200, height: 127 }}
        />
      </View>
      {/* Parte que aparece o conteúdo: cinza/branco */}
      <View style={styles.conteudo}>
        <View style={styles.containerInner}>
          <Text style={styles.titulo}>REGISTRE-SE</Text>
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            mode="disabled"
            style={styles.input}
          />
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
            mode="disabled"
            style={styles.input}
          />
          <Button
            onPress={handleRegister}
            style={styles.botao}
            textColor="white"
          >
            REGISTRAR
          </Button>

        </View>
      </View>
    </View>
    // AaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa
  );
}