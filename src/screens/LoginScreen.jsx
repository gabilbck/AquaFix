import { Button, Paragraph, TextInput } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../utils/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegister() {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredencial) => {
        console.log("Usuário logado com sucesso!");
        navigation.navigate('TabsNavigation');
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
      <View style={styles.box}>
        {/* <Image
          source={{uri: 'https://picsum.photos/200/200'}}
          style={{ width: 200, height: 200 }}
        /> */}
        <Paragraph>Login</Paragraph>
        <View>
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
          />
          <TextInput
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry={true} //faz com que o texto pareça uma senha
            value={senha}
            onChangeText={setSenha}
            mode="outlined"
          />
          <Button onPress={handleRegister}>Entrar</Button>
        </View>
      </View>
    </View>
  );
}