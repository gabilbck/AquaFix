import { Button, Text } from "react-native-paper";
import { Image, TextInput, View } from "react-native";
import { styles } from "../utils/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";

/**
 * Tela de login
 * @auth Gabrieli Eduarda Lembeck
 * @name LoginScreen
 * @description Tela de login do aplicativo
 * @function LoginScreen faz a autenticação do usuário
 * @param {Object} navigation
 * @export RootNavigation - navegação principal
 * @return {React.Component} Tela de login  do aplicativo
 * @since 1.0.0
 */

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // função para lidar com o login do Usuário
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredencial) => {
        console.log("Usuário logado com sucesso!");
        navigation.navigate("IniciarJogo");
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);
        //código de erro
        const errorCode = error.code;
        if (email === "" || senha === "") {
          console.log("Preencha todos os campos");
          return;
        }
        if (senha.length < 6) {
          console.log("A senha deve ter no mínimo 6 caracteres");
          return;
        }
        if (!email.includes("@")) {
          console.log("E-mail inválido");
          return;
        }
        if (!email.includes(".")) {
          console.log("E-mail inválido");
          return;
        }
        if (email.includes(" ")) {
          console.log("E-mail inválido");
          return;
        }
        if (errorCode === "auth/invalid-email") {
          console.log("E-mail inválido");
        }
        if (errorCode === "auth/user-not-found") {
          console.log("Usuário não encontrado");
        }
        if (errorCode === "auth/wrong-password") {
          console.log("Senha incorreta");
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
          <Text style={styles.titulo}>LOGIN</Text>
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
            onPress={handleLogin}
            style={styles.botao}
            textColor="white"
          >
            ENTRAR
          </Button>
          <View style={styles.linha}>
            <View style={styles.coluna}>
              <Text>Não tem conta?</Text>
              <Button textColor={'black'} onPress={() => navigation.navigate("RegisterScreen")}>
                <Text style={styles.botaoPreto}>Cadastre-se!</Text>
              </Button>
            </View>
            <View style={styles.coluna}>
              <Text>Esqueceu a senha?</Text>
              <Button textColor={'black'} onPress={() => navigation.navigate("HomeScreen")}>
                <Text style={styles.botaoPreto}>Recuperar Senha</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
