import { Button, Text } from "react-native-paper";
import { TextInput, View } from "react-native";
import { Image } from "expo-image";
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
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro

  // Função para verificar e exibir erros de login
  function checkLoginErrors(errorCode) {
    switch (errorCode) {
      case "auth/wrong-password":
        setError("Senha incorreta");
        break;
      case "auth/invalid-email":
        setError("E-mail inválido");
        break;
      case "auth/user-not-found":
        setError("Usuário não encontrado");
        break;
      default:
        setError("Erro desconhecido");
    }
  }

  // Função para lidar com o login do Usuário
  function handleLogin() {
    setError(""); // Limpar mensagens de erro

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Usuário logado com sucesso!");
        navigation.navigate("TabsNavigation");
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);
        // Código de erro
        const errorCode = error.code;

        if (email === "" || senha === "") {
          setError("Preencha todos os campos");
          return;
        }
        if (senha.length < 6) {
          setError("A senha deve ter no mínimo 6 caracteres");
          return;
        }
        if (!email.includes("@") || !email.includes(".")) {
          setError("E-mail inválido");
          return;
        }
        if (email.includes(" ")) {
          setError("E-mail inválido");
          return;
        }

        // Verificar e exibir erros específicos de autenticação
        checkLoginErrors(errorCode);
      });
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
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Button onPress={handleLogin} style={styles.botao} textColor="white">
            ENTRAR
          </Button>
          <View style={styles.linha}>
            <View style={styles.coluna}>
              <Text>Não tem conta?</Text>
              <Button
                textColor={"black"}
                onPress={() => navigation.navigate("CadPasso1")}
              >
                <Text style={styles.botaoPreto}>Cadastre-se!</Text>
              </Button>
            </View>
            <View style={styles.coluna}>
              <Text>Esqueceu a senha?</Text>
              <Button
                textColor={"black"}
                onPress={() => navigation.navigate("RecuperarSenha")}
              >
                <Text style={styles.botaoPreto}>Recuperar Senha</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
