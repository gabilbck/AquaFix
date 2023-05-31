import { Button, Paragraph, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

<<<<<<< HEAD

/**
 * @function RegisterScreen
 * @author Gabrieli Eduarda Lembeck 
 * @since 0.1.0
 * 
 * @description Tela de cadastro do aplicativo
 * @param {Object} navigation Objeto de navegação 
 * @export {Function} RegisterScreen
 * @return {React.Component} 
 */


=======
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

>>>>>>> f906246 (add)
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
    function handleLogin() {
      navigation.navigate("LoginScreen");
    }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Paragraph>Realize o seu cadastro {email}</Paragraph>
        <TextInput
          label="Email"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
        />
        <TextInput
          label={"Senha"}
          placeholder={"Digite sua senha"}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true} //faz com que o texto pareça uma senha
          mode="outlined"
        />
        <Button onPress={handleRegister}>Registre-se</Button>
        <Button onPress={handleLogin}>Já tenho uma conta</Button>
      </View>
    </View>
  );
}
