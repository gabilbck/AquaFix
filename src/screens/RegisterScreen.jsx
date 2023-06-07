import { Button, Paragraph } from "react-native-paper";
import { Image, Text, View, TextInput } from "react-native";
import { styles } from "../utils/styles";
import { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

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
          bio_usu: "",
          cep_usu: zipCode,
          // cpf_usu: "",
          email_usu: email,
          // foto_usu: "",
          // nome_real_usu: "",
          nome_usu: name,
          senha_usu: senha,
          whatsapp_usu: phone,
        }).then(() => {
          console.log("Document successfully written!");
          navigation.navigate("LoginScreen");
        });
      })
      .catch((error) => {
        console.log("Erro ao criar usuário", error);
        // Handle error codes
      });
  }

  function formatPhoneNumber(value) {
    // Apply the desired phone number mask here
    const formattedValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{2})(\d)/, "($1) $2") // Add parentheses to the area code
      .replace(/(\d{5})(\d)/, "$1-$2") // Add hyphen to the main number
      .replace(/(\d{4})(\d)/, "$1-$2") // Add hyphen to the main number (for 9-digit numbers)
      .slice(0, 15); // Limit the length of the input
    return formattedValue;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imagemTopo}>
          <Image
            source={require("/assets/img/logocomp-branca.png")}
            style={{ width: 200, height: 127 }}
          />
        </View>
        <View style={styles.conteudo}>
          <View style={styles.containerInner}>
            <Text style={styles.titulo}>REGISTRE-SE</Text>
            <TextInput
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu telefone"
              value={phone}
              onChangeText={(value) => setPhone(formatPhoneNumber(value))}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu bairro"
              value={neighborhood}
              onChangeText={setNeighborhood}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu endereço"
              value={streetAddress}
              onChangeText={setStreetAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite seu CEP"
              value={zipCode}
              onChangeText={setZipCode}
              style={styles.input}
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
            <Button onPress={handleRegister} style={styles.botao}>
              REGISTRAR
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
