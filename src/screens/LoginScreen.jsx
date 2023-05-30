import { Button, Paragraph, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
/**
 * Tela de login
 * @auth Gabrieli Eduarda Lembeck
 * @name LoginScreen
 * @description Tela de login do aplicativo
 * @function LoginScreen faaz a autenticação do usuário
 * @param {Object} navigation
 * @export RootNavigation - navegação principal
 * @return {React.Component} Tela de login  do aplicativo
 * @since 1.0.0

 */

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handleSenhaFocus = () => {
    setIsSenhaFocused(true);
  };

  const handleSenhaBlur = () => {
    setIsSenhaFocused(false);
  };

  const inputEmailStyle = [
    styles.input,
    isEmailFocused && styles.inputFocus,
  ];

  const inputSenhaStyle = [
    styles.input,
    isSenhaFocused && styles.inputFocus,
  ];

  function handleRegister() {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredencial) => {
        console.log("Usuário logado com sucesso!");
        navigation.navigate("TabsNavigation");
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);
        // ...
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Paragraph>Login</Paragraph>
        <View>
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={inputEmailStyle}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
          />
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
            mode="outlined"
            style={inputSenhaStyle}
            onFocus={handleSenhaFocus}
            onBlur={handleSenhaBlur}
          />
          <Button onPress={handleRegister}>Entrar</Button>
        </View>
      </View>
    </View>
  );
}
