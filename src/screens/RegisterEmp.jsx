import { View, TextInput } from "react-native";
import { Image } from "expo-image";
import { Button, Text } from "react-native-paper";
import { styles } from "../utils/styles";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import InputCCValidator from "../components/InputCPFValidator";
import { useState } from "react";
// import InputCNPJValidator from "../components/InputCNPJValidator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { cnpj } from "cpf-cnpj-validator";
import { ScrollView } from "react-native-web";

export default function RegisterEmp({ navigation }) {
  const [nomeUsu, setNomeUsu] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cnpjUsu, setCnpjUsu] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [whatsappUsu, setWhatsappUsu] = useState("");
  // const [cnpj, setCnpj] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [erroCnpj, setErroCnpj] = useState("");

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
          cnpj: cnpjUsu,
          email_usu: email,
          foto_usu: "",
          nome_completo: nomeCompleto,
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

  function numeroCelular(value) {
    // Apply the desired phone number mask here
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{2})(\d)/, "($1) $2") // Add parentheses to the area code
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValue;
  }

  function cep(value) {
    // Apply the desired phone number mask here
    const formattedValueCep = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .slice(0, 15); // Limit the length of the input
    return formattedValueCep;
  }

  function validar(texto) {
    if (texto.length > 14) return;

    setCnpjUsu(texto);
    if (texto.length === 14) {
      if (!cnpj.isValid(texto)) {
        setErroCnpj("CNPJ inválido");
        setIsValid(false);
        return;
      } else {
        setCnpjUsu(cnpj.format(texto));
        setIsValid(true);
        setErroCnpj("CNPJ válido");
      }
    }

    console.log(texto);
  }

  return (
    <ScrollView>
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
            <Text style={styles.titulo}>CADASTRE-SE</Text>
            <Text style={styles.subtitulo}>
              Preencha as seguintes informações:
            </Text>
            <TextInput
              placeholder="Nome da Empresa"
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome de usuário da empresa"
              value={nomeUsu}
              onChangeText={setNomeUsu}
              style={styles.input}
            />
            <TextInput
              placeholder="E-mail da empresa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              style={styles.input}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirmar senha"
              value={confirmSenha}
              onChangeText={setConfirmSenha}
              style={styles.input}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder={`Digite seu CNPJ`}
              value={cnpjUsu}
              onChangeText={validar}
              error={!isValid}
            />
            <Text>{erroCnpj}</Text>
            <TextInput
              placeholder="CEP"
              value={zipCode}
              onChangeText={(value) => setZipCode(cep(value))}
              style={styles.input}
              onBlur={retornaLogradouro}
            />
            <TextInput
              placeholder="Número de WhatsApp da empresa"
              value={whatsappUsu}
              onChangeText={(value) => setWhatsappUsu(numeroCelular(value))}
              style={styles.input}
            />

            <Button
              onPress={handleRegister}
              style={styles.botao}
              textColor="white"
            >
              CADASTRAR
            </Button>
            <View style={styles.linha}>
              <View style={styles.coluna}>
                <Text>Escolheu a opção errada?</Text>
                <Button
                  textColor={"black"}
                  onPress={() => navigation.navigate("CadPasso2")}
                >
                  <Text style={styles.botaoPreto}>Voltar ao passo anterior</Text>
                </Button>
              </View>
              <View style={styles.coluna}>
                <Text>Já tem uma conta?</Text>
                <Button
                  textColor={"black"}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.botaoPreto}>Entrar agora!</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
