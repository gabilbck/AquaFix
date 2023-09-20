import { Button, RadioButton } from "react-native-paper";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { styles } from "../utils/styles";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [nomeUsu, setNomeUsu] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [isValid, setValid] = useState(null);
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [whatsappUsu, setWhatsappUsu] = useState("");

  function handleRegister() {
    if (senha !== confirmSenha) {
      console.log("A senha e a confirmação de senha não correspondem");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Usuário criado com sucesso!", userCredential);
        const uid = userCredential.user.uid;

        setDoc(doc(db, "usuario", uid), {
          adm: false,
          bio_usu: "Olá, eu sou " + nomeUsu,
          cep_usu: zipCode,
          cpf_usu: "",
          cnpj_usu: "",
          email_usu: email,
          foto_usu: "",
          nome_real_usu: nomeCompleto,
          nome_usu: nomeUsu,
          senha_usu: senha,
          whatsapp_usu: whatsappUsu,
        }).then(() => {
          console.log("Cadastrado!");
          navigation.navigate("LoginScreen");
        });
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);
        // Handle error codes
      });
  }

  function retornaLogradouro() {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.logradouro);
        return data.logradouro;
      });
  }

  function formatPhoneNumber(value) {
    // Apply the desired phone number mask here
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{2})(\d)/, "($1) $2") // Add parentheses to the area code
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValue;
  }

  function formatPhoneNumberCep(value) {
    // Apply the desired phone number mask here
    const formattedValueCep = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValueCep;
  }

  // function validar(texto){
  //   if(texto.length > 14) return;
  //   setCpf(cpf);
  //   setCnpj(cnpj);
  //   setValid(
  //     texto.length === 11 ? cpf.isValid(texto) : cnpj.isValid(texto)
  //   )
  //   console.log();
  // }

  // function mask(texto){
  //   if (texto.length === 11) {
  //     return cpf.format(texto);
  //   } else if (texto.length === 14) {
  //     return cnpj.format(texto);
  //   } else {
  //     return texto;
  //   }
  // }

  return (
    // <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imagemTopo}>
          <Image
            source={require("../../assets/img/logocomp-branca.png")}
            style={{ width: 200, height: 127 }}
          />
        </View>
        <View style={styles.conteudo}>
          <View style={styles.containerInner}>
            <Text style={styles.titulo_register}>CADASTRE-SE</Text>
            <Text style={styles.subtitulo_register}>Para iniciar seu cadastro, preencha asseguintes informações:</Text>
            <TextInput
              placeholder="Digite seu nome completo"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu nome de usuário"
              value={nomeUsu}
              onChangeText={setNomeUsu}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {/* <TextInput
              placeholder="Digite seu CPF"
              value={cpf}
              onChangeText={validar}
              maxLength={14}
              style={styles.input}
            />
            {isValid ? null : (<Text style={styles.error}>CPF inválido</Text>)}
            <TextInput
              placeholder="Digite seu CNPJ"
              value={cnpj}
              onChangeText={validar}
              maxLength={18}
              style={styles.input}
            /> */}
            <TextInput
              placeholder="Digite seu telefone"
              value={whatsappUsu}
              onChangeText={(value) => setWhatsappUsu(formatPhoneNumber(value))}
              maxLength={15}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu CEP"
              value={zipCode}
              onChangeText={(e) => setZipCode(formatPhoneNumberCep(e))}
              maxLength={9}
              style={styles.input}
              onBlur={retornaLogradouro}
            />
            <TextInput
              placeholder="Digite sua senha"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
            />
            <TextInput
              placeholder="Confirme sua senha"
              secureTextEntry={true}
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              style={styles.input}
            />
            <Button
              textColor={"white"}
              onPress={handleRegister}
              style={styles.botao}
            >
              REGISTRAR
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
    // </KeyboardAvoidingView>
  );
}
